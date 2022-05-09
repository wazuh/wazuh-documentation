.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
    :description: Learn more about how to watch for malicious command execution in this section of the Wazuh documentation.
    
.. _learning_wazuh_audit_commands:

Keep watch for malicious command execution
==========================================

Linux systems have a powerful auditing facility called **auditd** which can give
a very detailed accounting of actions and changes in a system, but by default,
no auditd rules are active so we tend to miss out on this detailed history.
In this lab, we will configure auditd on a Linux machine to account for all commands
executed by a given user (it should be "centos" if you built the lab following this guide), including commands run by this user
in a sudo command or after sudo-ing to root.  After causing some audit events
to be generated, we will look them over in the Wazuh dashboard.
Then we will set up several custom Wazuh rules to alert on especially suspicious
command calls, making use of the CDB list lookup capability that allows rules to
look up decoded field values in various lists and to use the results as part of
the alert criteria.

The Linux auditd system is an extensive auditing tool, which we will only touch
on here. Consider reading the :ref:`system_call_monitoring` section to get a
broader picture of the ways you can take advantage of it.

Turn on program call auditing on linux-agent
--------------------------------------------

#. Having already sudo-ed to root on our linux-agent machine, append the following
   audit rules to ``/etc/audit/rules.d/audit.rules``

    .. code-block:: console

        [root@linux-agent centos]# echo "-a exit,always -F auid=1000 -F egid!=994 -F auid!=-1 -F arch=b32 -S execve -k audit-wazuh-c" >> /etc/audit/rules.d/audit.rules
        [root@linux-agent centos]# echo "-a exit,always -F auid=1000 -F egid!=994 -F auid!=-1 -F arch=b64 -S execve -k audit-wazuh-c" >> /etc/audit/rules.d/audit.rules


   Where ``auid=1000`` represents the user ID. If unsure, you may verify this value
   by running: ``grep centos /etc/passwd`` (replacing ``centos`` if you have a
   different user name).

#. Then reload the rules and confirm they are in place:

    .. code-block:: console

        [root@linux-agent centos]# auditctl -R /etc/audit/rules.d/audit.rules
        ...
        [root@linux-agent centos]# auditctl -l

    .. code-block:: none
        :class: output

        -a always,exit -F arch=b32 -S execve -F auid=1000 -F egid!=994 -F auid!=-1 -F key=audit-wazuh-c
        -a always,exit -F arch=b64 -S execve -F auid=1000 -F egid!=994 -F auid!=-1 -F key=audit-wazuh-c


Trigger a few audit events
--------------------------

#. Dropping from **root** back to the unpriviledged user, run a ping.

    .. code-block:: console

        [root@linux-agent centos]# exit

    .. code-block:: none
        :class: output

        logout

    .. code-block:: console

        [centos@linux-agent ~]$ ping -c1 8.8.4.4

    .. code-block:: none
        :class: output

        PING 8.8.4.4 (8.8.4.4) 56(84) bytes of data.
        64 bytes from 8.8.4.4: icmp_seq=1 ttl=51 time=1.09 ms

        --- 8.8.4.4 ping statistics ---
        1 packets transmitted, 1 received, 0% packet loss, time 0ms
        rtt min/avg/max/mdev = 1.093/1.093/1.093/0.000 ms

#. While still **centos**, use sudo to run a privileged commands

    .. code-block:: console

        [centos@linux-agent ~]$ sudo cat /etc/shadow

    .. code-block:: none
        :class: output

        root:!!:17497:0:99999:7:::
        bin:*:17110:0:99999:7:::
        ...

#. Now sudo back to root and run another commands

    .. code-block:: console

        [centos@linux-agent ~]$ sudo su -

    .. code-block:: none
        :class: output

        Last login: Thu Nov 14 12:27:12 UTC 2019 on pts/0

    .. code-block:: console

        [root@linux-agent ~]# df

    .. code-block:: none
        :class: output

        Filesystem     1K-blocks    Used Available Use% Mounted on
        /dev/xvda1       8377344 1616824   6760520  20% /
        devtmpfs          486604       0    486604   0% /dev
        tmpfs             507288       0    507288   0% /dev/shm
        tmpfs             507288   12956    494332   3% /run
        tmpfs             507288       0    507288   0% /sys/fs/cgroup
        tmpfs             101460       0    101460   0% /run/user/1000


Look over the audit events
--------------------------

#. On the monitored linux machine, inspect the content of ``/var/log/audit/audit.log``.
   Auditd writes events here, but it is not very readable.  Thankfully the Linux Wazuh
   agents already monitors this file by default.

#. Search the Wazuh dashboard for ``rule.id:80792``.  That will
   catch all auditd command audit events.

#. Pick the following fields for columnar display:

    - data.audit.command
    - data.audit.auid
    - data.audit.euid
    - full_log

#. Explore the audit records, finding and examining your unprivileged ping, and
   your privileged cat and df calls.  They will be mingled with other commands.

#. The **centos** user has uid 1000.  User **root** has uid 0.  Notice the
   ``auid`` (audited user identity) always traces back to the **centos** user,
   even though the ``euid`` effective user identity is sometimes 0 and sometimes
   1000 depending on whether privileges were escalated.  This allows you to see
   who actually ran the command with sudo or while sudo-ed to **root**.


Look over the relevant Wazuh rule
---------------------------------

#. Here is Wazuh rule 80792:

    .. code-block:: xml

        <rule id="80792" level="3">
            <if_sid>80700</if_sid>
            <list field="audit.key" lookup="match_key_value" check_value="command">etc/lists/audit-keys</list>
            <description>Audit: Command: $(audit.exe)</description>
            <group>audit_command,</group>
        </rule>

    Parent rule 80700 catches all auditd events, while this rule focuses on auditd
    command events.  Notice how the ``<list>`` line in this rule takes the decoded
    ``audit.key`` value which all our auditd rules set to "audit-wazuh-c" presently,
    and looks this up in a CDB list called ``audit-keys`` to see if the ``audit.key``
    value is listed with a value of "command".

#. Look over the key-value pairs in the lookup file.  The file is ``/var/ossec/etc/lists/audit-keys``.

    .. code-block:: none

        audit-wazuh-w:write
        audit-wazuh-r:read
        audit-wazuh-a:attribute
        audit-wazuh-x:execute
        audit-wazuh-c:command

    This CDB list contains keys and values separated colons.  Some lists only
    contain keys, in which case each key exists on a line of its own and is
    directly followed by a colon.

#. Notice that in addition to the text file ``/var/ossec/etc/lists/audit-keys``,
   there is also a binary ``/var/ossec/etc/lists/audit-keys.cdb`` file that
   Wazuh uses for actual lookups.


Create a list of commands that Wazuh will watch for
---------------------------------------------------

Wazuh allows you to maintain flat file CDB lists (key only or key:value) which
are compiled into a special binary format to facilitate high-performance lookups
in Wazuh rules.  Such lists must be created as files, added to the Wazuh
configuration, and then compiled.
After that, rules can be built to look up decoded fields in those CDB lists as
part of their match criteria.  Right now, we want to create a list of commands that Wazuh
will use to give us special alerts when executed.

#. In wazuh-manager, create ``/var/ossec/etc/lists/suspicious-programs`` with this content:

    .. code-block:: none

        ncat:
        nc:
        tcpdump:
        ping:

#. In wazuh-manager, edit the ``<ruleset>`` section of configuration in the ``/var/ossec/etc/manager.conf`` file by adding the following line:

    .. code-block:: xml

        <ruleset>
          <list>etc/lists/suspicious-programs</list>
          ....


    .. note::

       Before Wazuh v3.11.0 it was necessary to run `/var/ossec/bin/ossec-makelists` after changing CDB lists. After v3.11.0 the lists are already compiled when the manager is started.


#. Now let's add a new rule that uses this list as part of its criteria
   to do so add the following to ``/var/ossec/etc/rules/local_rules.xml``
   on the Wazuh Manager.

    .. code-block:: xml

      <group name="audit">
        <rule id="100200" level="8">
            <if_sid>80792</if_sid>
            <list field="audit.command" lookup="match_key">etc/lists/suspicious-programs</list>
            <description>Audit: Suspicious Command: $(audit.exe)</description>
            <group>audit_command,</group>
        </rule>
      </group>

    In this case we are simply checking to see if the decoded ``audit.command``
    value appears in our new CDB lists at all, without checking its value.



#. Compile the CDB list (if your version is inferior to v3.11.0):

    .. code-block:: console

      [root@wazuh-manager centos]# /var/ossec/bin/ossec-makelists

#. Restart the Wazuh manager:

    a. For Systemd:

       .. code-block:: console

        # systemctl restart wazuh-manager

    b. For SysV Init:

       .. code-block:: console

        # service wazuh-manager restart




#. On the linux computer monitored agent, install and run ``tcpdump`` to trip
   our new rule:

    .. code-block:: console

        [root@linux-agent ~]# yum -y install tcpdump
        [root@linux-agent ~]# tcpdump --version

#. Search the Wazuh dashboard for ``data.audit.command:tcpdump`` and expand the record,
   where you should see a ``rule.id`` of 100200.


Make a smarter list and rule
----------------------------

Let's make this list a little smarter by including values that indicate how
alarmed we should be about a given program being run.

#. On The manager, replace the content of ``/var/ossec/etc/lists/suspicious-programs``
   with the following:

    .. code-block:: none

        ncat:red
        nc:red
        tcpdump:orange
        ping:yellow


#. Now that our ``suspicious-programs`` list is more granular, let's create a
   higher severity rule to fire specifically on instances when a "red" program
   is executed.

   Add this new rule to ``/var/ossec/etc/rules/local_rules.xml`` on wazuh-manager,
   directly after rule 100200 and before the closing ``</group>`` tag:

    .. code-block:: xml

        <rule id="100210" level="12">
            <if_sid>80792</if_sid>
            <list field="audit.command" lookup="match_key_value" check_value="red">etc/lists/suspicious-programs</list>
            <description>Audit: Highly Suspicious Command executed: $(audit.exe)</description>
            <group>audit_command,</group>
        </rule>


#. Compile the CDB list (if your version is inferior to v3.11.0):

    .. code-block:: console

      [root@wazuh-manager centos]# /var/ossec/bin/ossec-makelists



#. Restart the Wazuh manager:

   a. For Systemd:

      .. code-block:: console

        # systemctl restart wazuh-manager

   b. For SysV Init:

      .. code-block:: console

        # service wazuh-manager restart

#. On the monitored linux agent install and run a "red" program (netcat):

    .. code-block:: console

        [root@linux-agent ~]# yum -y install nmap-ncat
        [root@linux-agent ~]# nc -v

#. Search the Wazuh dashboard for ``data.audit.command:nc`` and expand the record, noting
   especially the rule.description of "Audit: Highly Suspicious Command executed: /usr/bin/ncat"


Make an exception
-----------------

You have ``ping`` in your CDB list, but perhaps you have several systems that
routinely ping 8.8.8.8 as a connectivity check and you don't want these events
to be logged.  Another child rule of ``80297``, with a level of "0" can provide
such an exception.

#. Add this new rule to ``/var/ossec/etc/rules/local_rules.xml`` on wazuh-manager, directly after rule 100210 and before the closing ``</group>`` tag.:

    .. code-block:: xml

        <rule id="100220" level="0">
            <if_sid>80792</if_sid>
            <description>Ignore pings of 8.8.8.8</description>
            <field name="audit.command">^ping$</field>
            <match>="8.8.8.8"</match>
            <group>audit_command,</group>
        </rule>

    This rule does not do a lookup, it just checks any auditd command records
    in which the ``ping`` command is called and the target IP address 8.8.8.8
    is mentioned.

#. Restart the Wazuh manager:

   a. For Systemd:

      .. code-block:: console

        # systemctl restart wazuh-manager

   b. For SysV Init:

      .. code-block:: console

        # service wazuh-manager restart

#. In you linux-agent, test the rule by pinging both 8.8.8.8 and 8.8.4.4.

    .. code-block:: console

        [root@linux-agent ~]# yum -y install tcpdump
        [root@linux-agent ~]# ping -c1 8.8.8.8
        [root@linux-agent ~]# ping -c1 8.8.4.4

#. Search the Wazuh dashboard for ``data.audit.command:ping``.  Notice that only the ping
   event involving 8.8.4.4 shows up, because the other one was ignored by this
   exception rule.


How to observe correct rules are evaluated
------------------------------------------

#. On your linux-agent, run a mundane command not listed in our CDB.

    .. code-block:: console

            [root@linux-agent ~]# sleep 1

#. Search the Wazuh dashboard for ``data.audit.command:sleep`` to find the resulting event.
   Copy the ``full_log`` value.

#. Run ``/var/ossec/bin/wazuh-logtest`` on the Wazuh Manager and paste in
   the ``full_log`` value from above.

#. Verify rule 100200 matches.

#. Remember that when a rule matches, if it has multiple child rules, they are
   not evaluated in order of ID nor in the order they appear in the rule file.
   Instead, child rules of level "0" are checked first since they are for making
   exceptions.  Then any remaining child rules are checked in the order of highest
   severity to lowest severity.  Keep this in mind as you build child rules of your own.

.. warning:: **Why does my new rule never fire?**

    Sometimes a new rule never matches anything because of a flaw in its criteria.
    Other times it never matches because it is never even evaluated.  Remember,
    ``wazuh-logtest`` is your friend.  Use it to see if your rule is being
    evaluated at all, and if not, what rule might be overshadowing it.


Remember to set your settings back to normal
--------------------------------------------


When testing different things, it is recommended that you reverse the changes to keep your testing Lab clean. In this way, new tests don't interfere with previous ones.

You need to delete the line previously added in the ``<ruleset>`` section of the Wazuh manager configuration file, ``manager.conf``:

.. code-block:: xml

      <list>etc/lists/suspicious-programs</list>

In the linux-agent, delete the two lines we added to ``/etc/audit/rules.d/audit.rules``:

.. code-block:: console

    -a always,exit -F arch=b32 -S execve -F auid=1000 -F egid!=994 -F auid!=-1 -F key=audit-wazuh-c
    -a always,exit -F arch=b64 -S execve -F auid=1000 -F egid!=994 -F auid!=-1 -F key=audit-wazuh-c


Now you would need to reload the auditd rules and restart the manager for changes to take effect:


.. code-block:: console

     [root@linux-agent centos]# auditctl -R /etc/audit/rules.d/audit.rules


.. code-block:: console

    [root@wazuh-manager centos]# systemctl restart wazuh-manager
