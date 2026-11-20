.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh detects hidden processes created by a rootkit in this proof of concept.

Detecting hidden processes
==========================

Rootkits hide malicious activity from standard system tools. The :doc:`Wazuh Rootcheck module </user-manual/capabilities/malware-detection/rootkit-detection>` scans monitored endpoints periodically to detect rootkits, hidden processes, and other anomalies.

In this use case, you load the `Diamorphine kernel-mode rootkit <https://github.com/m0nad/Diamorphine>`__ on the Ubuntu endpoint. It hides itself from the kernel module list and hides selected processes from the ``ps`` command. Wazuh still detects the hidden processes. It compares the results of the ``kill()``, ``getsid()``, and ``getpgid()`` system calls with the ``ps`` output and the entries in ``/proc``.

Endpoints
---------

+--------------+-------------------------------------------------------------------------------------------+
| Endpoint     | Role                                                                                      |
+==============+===========================================================================================+
| Ubuntu 24.04 | You build and load the rootkit on this endpoint, and the Wazuh Rootcheck module scans it. |
+--------------+-------------------------------------------------------------------------------------------+

.. warning::

   This use case loads a rootkit into the kernel. Use a disposable lab endpoint.

Configuration
-------------

Run these steps on the Ubuntu endpoint.

#. Switch to the root user and update the package lists:

   .. code-block:: console

      $ sudo su
      # apt update

#. Install the packages needed to build the rootkit:

   .. code-block:: console

      # apt -y install gcc git make linux-headers-$(uname -r)

#. Configure Rootcheck to scan every 2 minutes. In ``/var/ossec/etc/ossec.conf``, set ``<frequency>`` to ``120`` in the ``<rootcheck>`` block:

   .. code-block:: xml

      <rootcheck>
        <disabled>no</disabled>
        <check_dev>yes</check_dev>
        <check_sys>yes</check_sys>
        <check_pids>yes</check_pids>
        <check_ports>yes</check_ports>
        <check_if>yes</check_if>

        <!-- rootcheck execution frequency - every 12 hours by default -->

        <frequency>120</frequency>
        <skip_nfs>yes</skip_nfs>

        <ignore>/var/lib/containerd</ignore>
        <ignore>/var/lib/docker/overlay2</ignore>
      </rootcheck>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

Verify data ingestion
---------------------

Rootcheck scans when the agent starts and then every 2 minutes. Check that a scan ended:

.. code-block:: console

   # grep "Rootcheck scan ended" /var/ossec/logs/ossec.log

.. _poc_hidden_process_attack_emulation:

Attack emulation
----------------

Run these steps as root on the Ubuntu endpoint.

#. Download the Diamorphine rootkit source code:

   .. code-block:: console

      # git clone https://github.com/m0nad/Diamorphine

#. Go to the Diamorphine directory and compile the source code:

   .. code-block:: console

      # cd Diamorphine
      # make

   Newer kernels rename ``PROC_ROOT_INO`` to ``PROCFS_ROOT_INO``. If ``make`` fails with a ``PROC_ROOT_INO`` error, update the source code and compile again:

   .. code-block:: console

      # sed -i 's/PROC_ROOT_INO/PROCFS_ROOT_INO/g' diamorphine.c
      # make

#. Load the rootkit kernel module:

   .. code-block:: console

      # insmod diamorphine.ko

   .. note::

      If ``insmod`` fails with ``insmod: ERROR: could not insert module diamorphine.ko: Invalid parameters``, restart the endpoint and try again. It can take several tries.

#. Diamorphine hides itself, so ``lsmod`` doesn't show it. Send signal 63 to any PID to unhide it, then check again:

   .. code-block:: console

      # lsmod | grep diamorphine
      # kill -63 <ANY_PID>
      # lsmod | grep diamorphine

   Replace ``<ANY_PID>`` with any number. Diamorphine intercepts signal 63 for any PID, whether or not the process exists, and switches the module between hidden and visible. The first ``lsmod`` command returns no output, and the second one shows the module:

   .. code-block:: none
      :class: output

      diamorphine            16384  0

#. Find the PID of the ``rsyslogd`` process:

   .. code-block:: console

      # ps auxw | grep rsyslogd | grep -v grep

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      syslog     732  0.0  0.7 214452  3572 ?        Ssl  14:53   0:00 /usr/sbin/rsyslogd -n -iNONE

#. Hide ``rsyslogd`` by sending it signal 31, then check that ``ps`` no longer shows it. Replace ``<PID_OF_RSYSLOGD>`` with the PID from the previous step:

   .. code-block:: console

      # kill -31 <PID_OF_RSYSLOGD>
      # ps auxw | grep rsyslogd | grep -v grep

The last command returns no output. The next Rootcheck scan creates a finding about the hidden ``rsyslogd`` process.

View the findings
-----------------

You see a Rootcheck finding about the hidden ``rsyslogd`` process.

#. In the Wazuh dashboard, go to **Threat intelligence** > **Threat Hunting** and enter ``wazuh.integration.name: wazuh-rootcheck`` in the search bar.

   .. thumbnail:: /images/poc/hidden-processes-findings.png
      :title: Hidden processes findings
      :alt: Wazuh dashboard Threat Hunting Findings tab showing the Rootcheck findings about the hidden process on the Ubuntu 24.04 agent
      :align: center
      :width: 80%

#. Click the magnifying glass icon to see the details of a finding.

   .. thumbnail:: /images/poc/hidden-processes-finding-details.png
      :title: Hidden processes finding details
      :alt: Document details of the Rootcheck finding about a process hidden from proc, with the possible kernel level rootkit message
      :align: center
      :width: 80%

Troubleshooting
---------------

+------------------------------------------------+------------------------------------------------------------------------------------------------------------------+
| Check                                          | How                                                                                                              |
+================================================+==================================================================================================================+
| A scan ran after the process was hidden        | A ``Rootcheck scan ended`` message is newer than the ``kill -31`` command.                                       |
+------------------------------------------------+------------------------------------------------------------------------------------------------------------------+
| The process is hidden                          | ``ps auxw | grep rsyslogd | grep -v grep`` returns no output.                                                    |
+------------------------------------------------+------------------------------------------------------------------------------------------------------------------+
| The rootkit is loaded                          | After ``kill -63 <ANY_PID>``, ``lsmod | grep diamorphine`` shows the module. Run ``kill -63`` again to hide it.  |
+------------------------------------------------+------------------------------------------------------------------------------------------------------------------+
| The ``wazuh-rootcheck`` integration is enabled | **Ruleset management** > **Overview** shows it enabled. With it off, Wazuh drops the events without any message. |
+------------------------------------------------+------------------------------------------------------------------------------------------------------------------+

Clean up
--------

#. Make ``rsyslogd`` visible again with the same ``kill -31 <PID_OF_RSYSLOGD>`` command. The next Rootcheck scan no longer reports it.

#. Unload the rootkit module. The module must be visible, and it already is if you ran step 4 of :ref:`Attack emulation <poc_hidden_process_attack_emulation>`:

   .. code-block:: console

      # lsmod | grep diamorphine
      # rmmod diamorphine

If ``lsmod`` shows no output, the module is hidden. Run ``kill -63 <ANY_PID>`` once, then run the commands again. You can also restart the endpoint, because Diamorphine doesn't persist across reboots.
