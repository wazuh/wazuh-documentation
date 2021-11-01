.. Copyright (C) 2021 Wazuh, Inc.

.. _learning_wazuh_audit_commands:

Watch malicious command execution on Linux system
=================================================

`Linux Audit`is a powerful auditing facility to track information relevant to the security of a system. It can provide a very detailed accounting of actions and changes. The component responsible for logging audit records based on pre-configured rules is called `auditd`.

In this lab, we will configure `auditd` to track all the commands executed by the user in a monitored Linux host, including commands you will run with root privileges. We will generate a few events and look them over in Wazuh's web user interface. In addition, we will set up some custom Wazuh rules to alert on especially suspicious command calls. We will do it using the :ref:`CDB list lookup <ruleset_cdb-list>` feature. This feature allows rules to look up decoded field values in various lists and use the findings in their alert criteria.

.. contents:: :local:

In order to use the `Audit system`, you must have the `audit` package installed on your system. You also need to have installed the `tcpdump` and `netcat` packages to complete this lab.

.. include:: /_templates/common/linux/audit_lab_req.rst

After installing `Audit` it is necessary to restart the Wazuh agent.

.. include:: /_templates/common/linux/restart_agent.rst

.. seealso::
  * :ref:`system_call_monitoring` section of the documentation. Consider reading it to learn more about Wazuh's System calls monitoring capability.

Turn on system call auditing
----------------------------

.. hint::
   You can run ``su`` or ``sudo su`` to gain root privileges.

#. Run the following commands with root privileges to add two new audit rules that will persist across reboots and track your user activity.

   .. code-block:: bash

      echo "-a exit,always -F auid=1000 -F egid!=994 -F auid!=-1 -F arch=b32 -S execve -k audit-wazuh-c" >> /etc/audit/rules.d/audit.rules; \
      echo "-a exit,always -F auid=1000 -F egid!=994 -F auid!=-1 -F arch=b64 -S execve -k audit-wazuh-c" >> /etc/audit/rules.d/audit.rules

   .. note::
      The parameter `auid` is the `Audit user ID`. You may verify this value is `1000` for your unprivileged user by executing ``grep <your_user_name> /etc/passwd``.

#. Run the following command to load the new rules information:

   .. code-block:: console

      # auditctl -R /etc/audit/rules.d/audit.rules

#. Run the following command to confirm these new rules are now in place:

   .. code-block:: console

      # auditctl -l

   .. code-block:: none
      :class: output accordion-output

      -a always,exit -F arch=b32 -S execve -F auid=1000 -F egid!=994 -F auid!=-1 -F key=audit-wazuh-c
      -a always,exit -F arch=b64 -S execve -F auid=1000 -F egid!=994 -F auid!=-1 -F key=audit-wazuh-c


Generate security-relevant events
---------------------------------

.. hint::
   ``exit`` to go back to the unprivileged user.

#. Run a command with the unprivileged user.

   .. code-block:: console

      $ ping -c1 8.8.4.4

   .. code-block:: none
      :class: output accordion-output

      PING 8.8.4.4 (8.8.4.4) 56(84) bytes of data.
      64 bytes from 8.8.4.4: icmp_seq=1 ttl=51 time=1.09 ms

      --- 8.8.4.4 ping statistics ---
      1 packets transmitted, 1 received, 0% packet loss, time 0ms
      rtt min/avg/max/mdev = 1.093/1.093/1.093/0.000 ms

#. Use `sudo` to run a privileged command with your unprivileged user.

   .. code-block:: console

      $ sudo cat /etc/shadow

   .. code-block:: none
      :class: output accordion-output

      root:$1$m.FEVNiS$OYiaRNHMHzS85/wnDHccI.::0:99999:7:::
      bin:*:18353:0:99999:7:::
      daemon:*:18353:0:99999:7:::
      adm:*:18353:0:99999:7:::
      lp:*:18353:0:99999:7:::
      sync:*:18353:0:99999:7:::
      shutdown:*:18353:0:99999:7:::
      halt:*:18353:0:99999:7:::
      mail:*:18353:0:99999:7:::
      operator:*:18353:0:99999:7:::
      games:*:18353:0:99999:7:::
      ftp:*:18353:0:99999:7:::
      nobody:*:18353:0:99999:7:::
      systemd-network:!!:18382::::::
      dbus:!!:18382::::::
      polkitd:!!:18382::::::
      rpc:!!:18382:0:99999:7:::
      tss:!!:18382::::::
      rpcuser:!!:18382::::::
      nfsnobody:!!:18382::::::
      sshd:!!:18382::::::
      postfix:!!:18382::::::
      chrony:!!:18382::::::
      centos:$1$gPNBpA.5$5pr.KtXhOx6S/Hc69TUZZ.::0:99999:7:::

#. Run one more command, this time with **root user** again.

   .. code-block:: console

      # df

   .. code-block:: none
      :class: output accordion-output

      Filesystem     1K-blocks    Used Available Use% Mounted on
      /dev/xvda1       8377344 1616824   6760520  20% /
      devtmpfs          486604       0    486604   0% /dev
      tmpfs             507288       0    507288   0% /dev/shm
      tmpfs             507288   12956    494332   3% /run
      tmpfs             507288       0    507288   0% /sys/fs/cgroup
      tmpfs             101460       0    101460   0% /run/user/1000

Look over the audit events
--------------------------

#. Log in to Wazuh's web user interface (Kibana plugin) and filter events by ``rule.id:80792`` in the `Security events` module. Add the following fields as columns:

    * ``data.audit.command``
    * ``data.audit.auid``
    * ``data.audit.euid``
    * ``full_log``

    .. thumbnail:: ../images/learning-wazuh/labs/rule_80792_events.png
        :title: Events for rule id 80792
        :align: center
        :width: 100%

   .. note::
      You can inspect `auditd` logs in ``/var/log/audit/audit.log`` to see the audit records for the generated events.

#. Find the events for the unprivileged command (``ping``) and privileged calls (``cat`` and ``df``) generated before.  They will be mingled with other events.

  .. tip::
    The field `data.audit.euid` is the effective user identity. It is sometimes the root user (`uid 0`) and sometimes your user (`uid 1000`), depending on whether privileges were escalated when issuing the commands. Notice that the audited user identity `auid` is always `1000`, even when `euid` changes. The field `data.audit.auid` allows you to see who actually ran each command.

.. topic:: Wazuh `rule id 80792` definition

    .. code-block:: xml

        <rule id="80792" level="3">
            <if_sid>80700</if_sid>
            <list field="audit.key" lookup="match_key_value" check_value="command">etc/lists/audit-keys</list>
            <description>Audit: Command: $(audit.exe)</description>
            <group>audit_command,</group>
        </rule>

    While parent rule id `80700` catches all `auditd` events, this rule focuses on `auditd` command events. `Rule id 80792` looks up the decoded ``audit.key`` field in a CDB list called ``audit-keys`` to check if the key is found with a value of ``command``. Presently the key used with our audit rules that corresponds to commands execution is ``audit-wazuh-c``. The list ``/var/ossec/etc/lists/audit-keys`` content is as follows:

      .. code-block:: none

          audit-wazuh-w:write
          audit-wazuh-r:read
          audit-wazuh-a:attribute
          audit-wazuh-x:execute
          audit-wazuh-c:command

Create a list of suspicious commands and trip an alert
------------------------------------------------------

#. Create a CDB list for the commands ``ncat``, ``nc``, ``tcpdump``, and ``ping`` using the command names as the key names in the list. CDB lists are stored in the server.

    .. code-block:: console

       # cat > /var/ossec/etc/lists/suspicious-programs << EOF
       ncat:
       nc:
       tcpdump:
       ping:
       EOF

#. Add the list to the ``<ruleset>`` section of the :ref:`ossec.conf <reference_ossec_conf>` local configuration file ``/var/ossec/etc/ossec.conf`` on the server to make the list available to the rules.

   .. code-block:: xml

      <ruleset>
        ...
        <list>etc/lists/suspicious-programs</list>
        ...
      </ruleset>

#. :ref:`Add a rule <ruleset_custom>` to ``/var/ossec/etc/rules/local_rules.xml`` on the server.

   .. code-block:: xml

     <group name="audit">
       <rule id="100200" level="8">
           <if_sid>80792</if_sid>
           <list field="audit.command" lookup="match_key">etc/lists/suspicious-programs</list>
           <description>Audit: Suspicious Command: $(audit.exe)</description>
           <group>audit_command,</group>
       </rule>
     </group>

   The `audit.command` field contains the decoded command reference. The rule will trip if it matches one of the keys in our CDB list of suspicious commands.

#. Restart the Wazuh manager:

   .. include:: /_templates/common/linux/restart_manager.rst

#. Run ``tcpdump`` on the monitored system to trip our new rule.

   .. code-block:: console

      $ tcpdump --version

#. Filter by ``data.audit.command:tcpdump`` in Wazuh's web user interface to find the event with ``rule.id:100200``.

   .. thumbnail:: ../images/learning-wazuh/labs/tcpdump_events.png
      :title: Suspicious command tcpdump event alert
      :align: center
      :width: 100%

Add threat levels to the list and trip a severe threat alert
------------------------------------------------------------

#. Edit our list ``/var/ossec/etc/lists/suspicious-programs`` and add values ``yellow``, ``orange`` or ``red`` to each key according to the corresponding threat level of the command. These values indicate how alarmed we should be about each program execution.

    .. code-block:: none

        ncat:red
        nc:red
        tcpdump:orange
        ping:yellow


#. Add a new rule to ``/var/ossec/etc/rules/local_rules.xml`` on the server. This high severity rule will fire specifically when a "red" threat level program is executed.

   .. code-block:: xml

      <rule id="100210" level="12">
          <if_sid>80792</if_sid>
          <list field="audit.command" lookup="match_key_value" check_value="red">etc/lists/suspicious-programs</list>
          <description>Audit: Highly Suspicious Command executed: $(audit.exe)</description>
          <group>audit_command,</group>
      </rule>

   .. tip::
      You can add it directly after `rule id 100200` and before the closing ``</group>`` tag.

#. Restart the Wazuh manager:

    .. include:: /_templates/common/linux/restart_manager.rst

#. Run ``nc`` to trip a red threat level system call alert on the monitored system.

   .. code-block:: console

      $ nc -v

#. Filter by ``data.audit.command:nc`` in Wazuh's web user interface to find the event with ``rule.id:100210``.

   .. thumbnail:: ../images/learning-wazuh/labs/nc_events.png
      :title: Red threat level suspicious command nc event alert
      :align: center
      :width: 100%

Make an exception and test it
-----------------------------

The `ping` command is listed in our suspicious programs CDB list. Let us assume we have several systems that routinely ``ping`` ``8.8.8.8`` as a connectivity check and we do not want events like these to be logged. Thus, to provide an exception for cases like these, we can do the following:

#. Add a `level 0` rule to ``/var/ossec/etc/rules/local_rules.xml`` on the server.

   .. code-block:: xml

      <rule id="100220" level="0">
          <if_sid>80792</if_sid>
          <description>Ignore pings of 8.8.8.8</description>
          <field name="audit.command">^ping$</field>
          <match>="8.8.8.8"</match>
          <group>audit_command,</group>
      </rule>

   This rule does not do a lookup, it just checks any `auditd` command records in which the `ping` command is called with the target IP address `8.8.8.8` mentioned.

#. Restart the Wazuh manager:

    .. include:: /_templates/common/linux/restart_manager.rst

#. Ping both ``8.8.4.4`` and ``8.8.8.8`` in the monitored system to test the `ping` alert and the exception.

   .. code-block:: bash

    ping -c1 8.8.4.4 && \
    ping -c1 8.8.8.8

#. Filter by ``data.audit.command:ping`` in Wazuh's web user interface to find these events.

   .. thumbnail:: ../images/learning-wazuh/labs/ping_events.png
      :title: Red threat level suspicious command nc event alert
      :align: center
      :width: 100%

   Notice that only one ping event, involving `8.8.4.4`, shows up because the other one was ignored by this exception rule.

  .. note::
    We can check the order in which the rules are evaluated by running a command in the monitored system not listed in our CDB list of suspicious programs such as ``sleep 1``. Then we can filter by ``data.audit.command:sleep`` in Wazuh's web user interface to find the resulting event. Finally, we copy the ``full_log`` value, we run ``/var/ossec/bin/ossec-logtest -v`` on the server and paste in the ``full_log`` value.

     .. code-block:: none
      :class: output accordion-output

      ...
      Trying rule: 80789 - Audit: Watch - Execute access: $(audit.file.name)
      Trying rule: 80792 - Audit: Command: $(audit.exe)
         *Rule 80792 matched.
         *Trying child rules.
      Trying rule: 100220 - Ignore pings of 8.8.8.8
      Trying rule: 100210 - Audit: Highly Suspicious Command: $(audit.exe)
      Trying rule: 100200 - Audit: Suspicious Command: $(audit.exe)

     Exception `rule id 100220` is evaluated first for being `level 0`. `Rule id 100210` is evaluated next for being of the highest severity level. Finally, `rule id 100200` is evaluated last for being the rule of lowest severity level.

.. important::
  Reset the lab to keep your systems clean for new labs:

  #. Remove rules `id` ``100200``, ``100210`` and ``100220`` in group `audit` from ``/var/ossec/etc/rules/local_rules.xml`` on the server.

  #. Remove ``<list>etc/lists/suspicious-programs</list>`` in the ``<ruleset>`` section from ``/var/ossec/etc/ossec.conf`` on the server.

  #. Delete ``/var/ossec/etc/lists/suspicious-programs`` from the server.

  #. Remove the two lines we added to ``/etc/audit/rules.d/audit.rules``.

  #. Reload the `auditd` rules using ``auditctl -R /etc/audit/rules.d/audit.rules``.

  #. Restart the Wazuh manager for changes to take effect.

      .. include:: /_templates/common/linux/restart_manager.rst
