.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh detects hidden processes created by a rootkit in this proof of concept.

Detecting hidden processes
==========================

Rootkit detection helps in identifying stealthy, kernel-level compromises that evade standard system monitoring tools. Wazuh Rootcheck module performs periodic scans on a monitored endpoint to detect signs of rootkits, hidden processes, and other host-based anomalies. In this use case, we show how Wazuh detects hidden processes created by a rootkit on a Linux endpoint. You deploy a kernel-mode rootkit on an Ubuntu endpoint. This rootkit hides from the kernel module list. It also hides selected processes from the ``ps`` utility. However, Wazuh detects it using the ``setsid()``, ``getpid()``, and ``kill()`` system calls.

Infrastructure
--------------

+--------------+---------------------------------------------------------------------------------------------------------------------------+
| Endpoint     | Description                                                                                                               |
+==============+===========================================================================================================================+
| Ubuntu 24.04 | On this endpoint, download, compile, and load a rootkit. Then configure the Wazuh rootcheck module for anomaly detection. |
+--------------+---------------------------------------------------------------------------------------------------------------------------+

Configuration
-------------

Perform the following steps on the Ubuntu endpoint to emulate rootkit-like process-hiding behavior. The Wazuh agent runs a RootCheck scan based on the set ``<frequency>`` and detects the rootkit behavior.

#. Switch to the root user and update the kernel of this endpoint:

   .. code-block:: console

      $ sudo su
      # apt update

#. Install the packages required for building the rootkit:

   .. code-block:: console

      # apt -y install gcc git

#. For the purpose of this POC, configure the Wazuh agent to run rootcheck scans every 2 minutes. In the ``/var/ossec/etc/ossec.conf`` file, set the ``frequency`` option in the ``<rootcheck>`` section to ``120``:

   .. code-block:: xml
      :emphasize-lines: 13

      <rootcheck>
        <disabled>no</disabled>
        <check_files>yes</check_files>
        <check_trojans>yes</check_trojans>
        <check_dev>yes</check_dev>
        <check_sys>yes</check_sys>
        <check_pids>yes</check_pids>
        <check_ports>yes</check_ports>
        <check_if>yes</check_if>

        <!-- rootcheck execution frequency - every 12 hours by default -->

        <frequency>120</frequency>
        <rootkit_files>etc/shared/rootkit_files.txt</rootkit_files>
        <rootkit_trojans>etc/shared/rootkit_trojans.txt</rootkit_trojans>
        <skip_nfs>yes</skip_nfs>
      </rootcheck>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

Attack emulation
----------------

We performed the following emulation on the monitored Ubuntu 24.04 endpoint:

#. Fetch the Diamorphine rootkit source code from GitHub:

   .. code-block:: console

      # git clone https://github.com/m0nad/Diamorphine

#. Navigate to the Diamorphine directory and compile the source code:

   .. code-block:: console

      # cd Diamorphine
      # make

#. Load the rootkit kernel module:

   .. code-block:: console

      # insmod diamorphine.ko

   The kernel-level rootkit "Diamorphine" is now installed on the Ubuntu endpoint.

   .. note::

      Depending on the environment, the module sometimes fails to load or function properly. If you receive the error ``insmod: ERROR: could not insert module diamorphine.ko: Invalid parameters`` in the last step; you can restart the Linux endpoint and try again. Sometimes it takes several tries for it to work.

#. Run the kill signal ``63`` with the PID of a random process running on the Ubuntu endpoint. This unhides the Diamorphine rootkit. By default, Diamorphine hides itself so we do not detect it by running the ``lsmod`` command. Try it out:

   .. code-block:: console

      # lsmod | grep diamorphine
      # kill -63 509
      # lsmod | grep diamorphine

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      diamorphine            13155  0

   When using these last commands, you can expect an empty output. In the case of Diamorphine, any kill signal 63 sent to any process, whether it exists or not, toggles the Diamorphine kernel module to hide or unhide.

#. Run the following commands to see how the ``rsyslogd`` process is first visible and then no longer visible. This rootkit allows you to hide selected processes from the ``ps`` command. Sending a kill signal 31 hides or unhides any process:

   .. code-block:: console

      # ps auxw | grep rsyslogd | grep -v grep

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      root       732  0.0  0.7 214452  3572 ?        Ssl  14:53   0:00 /usr/sbin/rsyslogd -n

   .. code-block:: console

      # kill -31 <PID_OF_RSYSLOGD>
      # ps auxw | grep rsyslog | grep -v grep

   -  Replace ``<PID_OF_RSYSLOGD>`` with the PID retrieved from the previous command

   When using this last command, you can expect an empty output. The next rootcheck scan runs and alerts us about the rsyslogd process, which was hidden with the Diamorphine rootkit.

Visualize the findings
-----------------------

You can visualize the findings in the Wazuh dashboard. To do this:

#. Navigate to the **Threat intelligence** > **Threat Hunting** dashboard and add the filters in the search bar to query the findings.

   -  ``wazuh.integration.name: wazuh-rootcheck``

   .. thumbnail:: /images/poc/hidden-processes-findings.png
      :title: Hidden processes findings
      :align: center
      :width: 80%

Click the magnifying glass icon to view the details of the findings.

.. thumbnail:: /images/poc/hidden-processes-finding-details.png
   :title: Hidden processes finding details
   :align: center
   :width: 80%

Remember, if you run the same ``kill -31`` command as before against ``rsyslogd``, the ``rsyslogd`` process becomes visible again. The subsequent rootcheck scan would no longer generate findings about this event.
