.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
    :description: Check out how the Wazuh rootkit detection works and learn how to expose hiding processes with Wazuh. 
    
.. _learning_wazuh_hidden_processes:

Expose hiding processes
=======================

In this exercise, you will safely implement a kernel-mode rootkit on your lab machine as a proof-of-concept for Wazuh rootkit detection.

This rootkit can hide itself from the kernel module list as well as hide selected processes from being visible to ``ps``.

However, Wazuh will still detect it using the system calls ``setsid()``, ``getpid()``, and ``kill()``. This makes
Wazuh a very effective Linux rootkit detection application by looking for general low-level hiding behavior.

#. Log on to your Linux agent instance and become root.

   .. code-block:: console

      $ sudo su -

#. Update your kernel and reboot.  This is necessary for the rootkit build process.

   .. code-block:: console

      # yum -y update
      # shutdown -r now

#. Log back into the Linux agent and become root again.

   .. code-block:: console

      $ sudo su -

#. In your Linux agent ``/var/ossec/etc/local_internal_options.conf`` file, enable debug logging and speed up the rate at which rootcheck commences its first scan for the sake of this lab.

    .. code-block:: console

        # echo "syscheck.debug=2" > /var/ossec/etc/local_internal_options.conf
        # echo "agent.debug=2" >> /var/ossec/etc/local_internal_options.conf
        # echo "rootcheck.sleep=0" >> /var/ossec/etc/local_internal_options.conf
        # echo "syscheck.sleep=0" >> /var/ossec/etc/local_internal_options.conf
        # systemctl restart wazuh-agent

   .. note::
      The ``/var/ossec/etc/internal_options.conf`` file contains all possible internal options that you can change, along with explanations.  While you can edit this file directly, it gets overwritten during Wazuh upgrades, so it is recommended that you copy the sections you want to customize from ``/var/ossec/etc/internal_options.conf`` to ``/var/ossec/etc/local_internal_options.conf`` where the changes will not be overwritten.
      
      The settings in ``local_internal_options.conf`` always take precedence over the settings in ``internal_options.conf``, so editing the ``local_internal_options.conf`` file will ensure your changes will not be overridden.

#. Install certain packages required for building the rootkit:

    .. code-block:: console

        # yum -y install kernel-devel libgcc gcc git

#. Fetch the Diamorphine rootkit source code from GitHub. 

    .. code-block:: console

        # git clone https://github.com/wazuh/Diamorphine.git

#. Change into the Diamorphine directory and compile the source code:

    .. code-block:: console

        # cd Diamorphine
        # make

#. Load the rootkit kernel module and put it to use:

    .. code-block:: console

        # insmod diamorphine.ko

    .. note::
        Depending on the environment the module will sometimes fail to load or function properly.
        If you receive the errors ``insmod: ERROR: could not insert module diamorphine.ko: Invalid parameters``
        or ``bash: kill: (509) - No such process`` in the next step, you can restart the linux-agent machine
        and try again. Sometimes it will take several tries to work.

    The kernel-level rootkit “Diamorphine” is now installed on this system! By default it is hidden so we are not able to detect it by running “lsmod”.  Only with a special "kill" signal can we make Diamorphine unhide itself. Try it out:

    .. code-block:: console

        # lsmod | grep diamorphine
        # kill -63 509
        # lsmod | grep diamorphine

    .. code-block:: console
       :class: output

        diamorphine            13157  0 

    .. code-block:: console

        # kill -63 509
        # lsmod | grep diamorphine

    When using these last commands, an empty output is expected.

    In the case of Diamorphine, any attempt to send a kill signal ``-63`` to any process whether it exists or not, will toggle whether the Diamorphine kernel module hides itself.

    This rootkit also allows you to hide selected processes from being seen by the "ps" command for example.
    Run the following commands to see how the rsyslog process is first visible, then send the ``-31`` signal to its pid and observe how the process is no longer visible.

    .. code-block:: console

        # ps auxw | grep rsyslogd | grep -v grep

    .. code-block:: console
        :class: output

        root       704  0.0  0.5 216680  5120 ?        Ssl  07:18   0:00 /usr/sbin/rsyslogd -n

    .. code-block:: xml

        # kill -31 $(pidof rsyslogd)
        # ps auxw | grep rsyslog | grep -v grep


    When using these last commands, an empty output is expected.

#. Configure the Linux agent to run rootcheck scans every 5 minutes setting the ``frequency`` option the ``<rootcheck>`` section of your agent ``/var/ossec/etc/ossec.conf`` file to **300** with the following:

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

              <!-- Frequency that rootcheck is executed - every 12 hours by default-->

              <frequency>300</frequency>

              <rootkit_files>etc/shared/rootkit_files.txt</rootkit_files>
              <rootkit_trojans>etc/shared/rootkit_trojans.txt</rootkit_trojans>
              <skip_nfs>yes</skip_nfs>
            </rootcheck>

#. Restart the agent.

   .. include:: /_templates/common/restart_agent.rst

   The next rootcheck scan should run shortly and it will alert about the rsyslogd process which we hid with Diamorphine.

#. Watch ``ossec.log`` on the Linux agent for rootcheck activity that should start within 5 minutes of the agent restart.

   .. code-block:: console

      # tail -f /var/ossec/logs/ossec.log | grep rootcheck

   You should see something like this shortly:

      .. code-block:: none
         :class: output

         2022/05/27 08:00:05 rootcheck[15169] run_rk_check.c:105 at run_rk_check(): INFO: Starting rootcheck scan.
         2022/05/27 08:00:05 rootcheck[15169] check_rc_files.c:31 at check_rc_files(): DEBUG: Starting on check_rc_files
         2022/05/27 08:00:05 rootcheck[15169] check_rc_trojans.c:32 at check_rc_trojans(): DEBUG: Starting on check_rc_trojans
         2022/05/27 08:00:06 rootcheck[15169] run_rk_check.c:232 at run_rk_check(): DEBUG: Going into check_rc_dev
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:152 at check_rc_dev(): DEBUG: Starting on check_rc_dev
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/vfio
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/mapper
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/snd
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/snd/by-path
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/net
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/hugepages
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/mqueue
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/disk
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/disk/by-uuid
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/disk/by-path
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/disk/by-id
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/block
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/bsg
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/char
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/pts
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/input
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/input/by-path
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/raw
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/cpu
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/cpu/1
         2022/05/27 08:00:06 rootcheck[15169] check_rc_dev.c:34 at read_dev_file(): DEBUG: Reading dir: /dev/cpu/0
         2022/05/27 08:00:06 rootcheck[15169] run_rk_check.c:238 at run_rk_check(): DEBUG: Going into check_rc_sys
         2022/05/27 08:00:06 rootcheck[15169] check_rc_sys.c:345 at check_rc_sys(): DEBUG: Starting on check_rc_sys
         2022/05/27 08:00:06 rootcheck[15169] run_rk_check.c:244 at run_rk_check(): DEBUG: Going into check_rc_pids
         2022/05/27 08:00:10 rootcheck[15169] run_rk_check.c:250 at run_rk_check(): DEBUG: Going into check_rc_ports
         2022/05/27 08:00:12 rootcheck[15169] run_rk_check.c:254 at run_rk_check(): DEBUG: Going into check_open_ports
         2022/05/27 08:00:12 rootcheck[15169] run_rk_check.c:260 at run_rk_check(): DEBUG: Going into check_rc_if
         2022/05/27 08:00:12 rootcheck[15169] run_rk_check.c:264 at run_rk_check(): DEBUG: Completed with all checks.
         2022/05/27 08:00:17 rootcheck[15169] run_rk_check.c:293 at run_rk_check(): INFO: Ending rootcheck scan.
         2022/05/27 08:00:17 rootcheck[15169] run_rk_check.c:296 at run_rk_check(): DEBUG: Leaving run_rk_check
         

    We see various rootkit scanning measures taking place that correspond to the various ``<check_...>`` options specified in the ``<rootkit>`` section of ``ossec.conf``. The ``check_rc_pids`` scan is the one that will catch Diamorphine.


#. Now switch back to the manager, and look for alerts in ``/var/ossec/logs/alerts/alerts.log`` similar to these ones:

   .. code-block::  none
      :class: output

      ** Alert 1653638721.112484: - ossec,rootcheck,
      2022 May 27 08:05:21 (linux-agent) any->rootcheck
      Rule: 521 (level 11) -> 'Possible kernel level rootkit'
      Process '704' hidden from /proc. Possible kernel level rootkit.
      title: Process '704' hidden from /proc.
      
      ** Alert 1653638721.112742: - ossec,rootcheck,
      2022 May 27 08:05:21 (linux-agent) any->rootcheck
      Rule: 521 (level 11) -> 'Possible kernel level rootkit'
      Process '712' hidden from /proc. Possible kernel level rootkit.
      title: Process '712' hidden from /proc.
      
      ** Alert 1653638721.113000: - ossec,rootcheck,
      2022 May 27 08:05:21 (linux-agent) any->rootcheck
      Rule: 521 (level 11) -> 'Possible kernel level rootkit'
      Process '715' hidden from /proc. Possible kernel level rootkit.
      title: Process '715' hidden from /proc.

#. It is also possible to find the same event in the Wazuh dashboard by searching for "rootkit".

    .. thumbnail:: ../images/learning-wazuh/labs/kibana-rootkit.png
        :title: brute
        :align: center
        :width: 80%

#. Remember, if you run the same ``kill -31`` command as before against rsyslogd, the rsyslogd process will become visible again. The subsequent rootcheck scan would no longer alert about it.

#. Remove the rootkit from the Linux agent since we don’t need it any longer.

   .. code-block:: console

      # rmmod diamorphine
      # kill -63 509
      # rmmod diamorphine

#. Remove the custom internal options on the Linux agent that we used for this lab.

   .. code-block:: console

      # rm -f /var/ossec/etc/local_internal_options.conf

#. In the ``<rootcheck>`` section of the Linux agent ``/var/ossec/etc/ossec.conf`` file, disable rootcheck for now.

   .. code-block:: xml

      <disabled>yes</disabled>

#. Restart the Wazuh agent. 

   .. include:: /_templates/common/restart_agent.rst

Now that you have finished this lab exercise you may be interested in reading the :ref:`Anomaly and Malware detection <manual_anomaly_detection>` section of our documentation for more details.
