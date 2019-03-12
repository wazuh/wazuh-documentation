.. Copyright (C) 2018 Wazuh, Inc.

.. _learning_wazuh_hidden_processes:

Expose hiding processes
=======================

In this exercise you will safely implement a kernel-mode rootkit as a proof-of-concept for Wazuh rootkit detection.
This rootkit is able to hide itself from the kernel module list as well as hide selected processes from being visible
to "ps".  However, Wazuh will sill detect it using the system calls “setsid()”, “getpid()”, and “kill()”. This makes
Wazuh a very effective Linux rootkit detection application by looking for general low-level hiding behavior..

1. Log on to your Linux Agent instance and become root.

    .. code-block:: console

        # sudo su -

2. Update  your kernel and reboot.  This is necessary for the rootkit build process.

    .. code-block:: console

        # yum -y update
        # shutdown -r now

3. Log back into linux-agent and become root again.

    .. code-block:: console

        # sudo su -

4. In your linux-agent's /var/ossec/etc/local_internal_options.conf file, enable debug logging and speed up the rate
at which rootcheck commences its first scan for the sake of this lab.

    .. code-block:: console

        # echo "syscheck.debug=2" > /var/ossec/etc/local_internal_options.conf
        # echo "agent.debug=2" >> /var/ossec/etc/local_internal_options.conf
        # echo "rootcheck.sleep=0" >> /var/ossec/etc/local_internal_options.conf
        # echo "syscheck.sleep=0" >> /var/ossec/etc/local_internal_options.conf

.. note::
    The /var/ossec/etc/internal_options.conf file contains all possible internal options that you can change, along with
    explanations of them.  While you can edit this file directly, it gets overwritten during Wazuh upgrades, so it is
    recommended that you copy the sections you want to customize from /var/ossec/etc/internal_options.conf to
    /var/ossec/etc/local_internal_options.conf where the changes will not be overwritten.  The settings in
    local_internal_options.conf always take precedence over the settings in internal_options.conf.

5. Install certain packages required for building the rootkit:

    .. code-block:: console

        # yum -y install kernel-devel libgcc gcc git

6. Fetch the Diamorphine rootkit source code from GitHub

    .. code-block:: console

        # git clone https://github.com/wazuh/Diamorphine.git

7. Change into the Diamorphine directory and compile the source code:

    .. code-block:: console

        # cd Diamorphine
        # make

8. Load the rootkit kernel module and put it to use

    .. code-block:: console

        # insmod diamorphine.ko

    The kernel-level rootkit “diamorphine” is now installed on this system! By default it is hidden so we wouldn’t be able to detect it by running “lsmod”.  Only with a special "kill" signal can we make diamorphine unhide itself:  Try it out:

    .. code-block:: console

        # lsmod | grep diamorphine
        # kill -63 509
        # lsmod | grep diamorphine
        diamorphine            13155  0
        # kill -63 509
        # lsmod | grep diamorphine
        #

    In the case of Diamorphine, any attempt to send kill signal -63 to any process whether it exists or not, will toggle whether the Diamorphine kernel module hides itself.

    This rootkit also allows you to hide a selected processes from being seen by the "ps" command for example.  Here we will find the pid of rsyslogd and then hide it.  Your rsyslogd pid will be different than the one in this example.  Substitute the correct pid for 535 below.

    .. code-block:: console

        # ps auxw | grep rsyslog | grep -v grep
        root       535  0.0  0.3 218744  3736 ?        Ssl  Dec07   0:00 /usr/sbin/rsyslogd -n
        # kill -31 535
        # ps auxw | grep rsyslog | grep -v grep
        #

9. Next configure linux-agent to run rootcheck scans every 5 minutes by replacing the entire <rootcheck> section in /var/ossec/etc/ossec.conf with the following:

    .. code-block:: console

        <rootcheck>
            <disabled>no</disabled>
            <frequency>300</frequency>
            <skip_nfs>yes</skip_nfs>
            <check_unixaudit>yes</check_unixaudit>
            <check_files>yes</check_files>
            <check_trojans>yes</check_trojans>
            <check_dev>yes</check_dev>
            <check_sys>yes</check_sys>
            <check_pids>yes</check_pids>
            <check_ports>yes</check_ports>
            <check_if>yes</check_if>
        </rootcheck>

    Restart the agent.

    a. For Systemd:

      .. code-block:: console

        # systemctl restart wazuh-agent

    b. For SysV Init:

      .. code-block:: console

        # service wazuh-agent restart

    Now our next rootcheck scan should run shortly.  It should alert about the ryslogd process which we hid with Diamorphine.

10. Watch ossec.log on linux-agent for rootcheck activity that should commence within 5 minutes of the agent restart.

        .. code-block:: console

            # tailf /var/ossec/logs/ossec.log | grep rootcheck

    You should see something like this shortly:

        .. code-block:: console

            2018/01/22 03:21:49 rootcheck: INFO: Starting rootcheck scan.
            2018/01/22 03:21:49 rootcheck: INFO: No rootcheck_files file configured.
            2018/01/22 03:21:49 rootcheck: INFO: No rootcheck_trojans file configured.
            2018/01/22 03:21:49 rootcheck: DEBUG: Going into check_rc_dev
            2018/01/22 03:21:49 rootcheck: DEBUG: Starting on check_rc_dev
            2018/01/22 03:21:49 rootcheck: DEBUG: Going into check_rc_sys
            2018/01/22 03:21:49 rootcheck: DEBUG: Starting on check_rc_sys
            2018/01/22 03:21:49 rootcheck: DEBUG: Going into check_rc_pids
            2018/01/22 03:21:58 rootcheck: DEBUG: Going into check_rc_ports
            2018/01/22 03:21:59 rootcheck: DEBUG: Going into check_open_ports
            2018/01/22 03:21:59 rootcheck: DEBUG: Going into check_rc_if
            2018/01/22 03:21:59 rootcheck: DEBUG: Completed with all checks.
            2018/01/22 03:21:04 rootcheck: INFO: Ending rootcheck scan.
            2018/01/22 03:21:04 rootcheck: DEBUG: Leaving run_rk_check

    We see above various kinds of rootkit scanning measures being taken that correspond to the various <check\_...> options specified in the <rootkit> section of ossec.conf.  The check_rc_pids scan is the one that should catch Diamorphine.

|

11. Now switch back to the manager, and try to find alerts in /var/ossec/logs/alerts/alerts.log that looks something like this:

        .. code-block:: console

            ** Alert 1516591319.4517361: - ossec,rootcheck,
            2018 Jan 22 03:21:59 (linux-agent) any->rootcheck
            Rule: 510 (level 7) -> 'Host-based anomaly detection event (rootcheck).'
            Process '540' hidden from /proc. Possible kernel level rootkit.
            title: Process '540' hidden from /proc.

            ** Alert 1516591319.4517637: - ossec,rootcheck,
            2018 Jan 22 03:21:59 (linux-agent) any->rootcheck
            Rule: 510 (level 7) -> 'Host-based anomaly detection event (rootcheck).'
            Process '553' hidden from /proc. Possible kernel level rootkit.
            title: Process '553' hidden from /proc.

            ** Alert 1516591319.4517913: - ossec,rootcheck,
            2018 Jan 22 03:21:59 (linux-agent) any->rootcheck
            Rule: 510 (level 7) -> 'Host-based anomaly detection event (rootcheck).'
            Process '554' hidden from /proc. Possible kernel level rootkit.
            title: Process '554' hidden from /proc.

12. Also try to find the same event in Kibana by searching for "rootkit".

    .. thumbnail:: ../images/learning-wazuh/labs/kibana-rootkit.png
        :title: brute
        :align: center
        :width: 80%

|

13. Remember, if you run the same "kill -31" command as before against rsyslogd, the rsyslogd process will become visible again. The subsequent rootcheck scan would no longer alert about it.

|

14. Remove the rootkit from linux-agent since we don’t need it any longer.

        .. code-block:: console

            # rmmod diamorphine
            # kill -63 509
            # rmmod diamorphine

15. Remove the custom internal options on linux-agent's that we used for this lab.

        .. code-block:: console

            # rm -f /var/ossec/etc/local_internal_options.conf

16. In the <rootcheck> section of linux-agent's /var/ossec/etc/ossec.conf file, disable rootcheck for now.

        .. code-block:: console

            <disabled>yes</disabled>

17. Restart the Wazuh agent on linux-agent

  a. For Systemd:

    .. code-block:: console

      # systemctl restart wazuh-agent

  b. For SysV Init:

    .. code-block:: console

      # service wazuh-agent restart
