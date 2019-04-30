.. Copyright (C) 2019 Wazuh, Inc.

.. _learning_wazuh_audit_commands:

Keep watch for malicious command execution
==========================================

Linux systems have a powerful auditing facility called auditd which can give a very detailed accounting of actions on and changes
to a system, but by default no auditd rules are active so we tend to miss out on this detailed history.  In this lab we will
configure auditd on linux-agent to account for all commands executed by the "centos" user, including commands run by user "centos"
in a sudo command or after sudo-ing to root.  After causing some audit events to be generated, we will look them over in Kibana.
Then we will set up several custom Wazuh rules to alert on especially suspicious command calls, making use of the CDB list lookup
facility that allows rules to look up decoded field values in various lists and to use the results as part of the alert criteria.

The Linux auditd system is an extensive auditing tool, which we will only touch on here. Consider searching the Wazuh
documentation for "Monitoring system calls" to get a broader picture of the ways you can take advantage of it.

Turn on program call auditing on linux-agent
--------------------------------------------

1. Having already sudo-ed to root on linux-agent, append the following audit rules to /etc/audit/rules.d/audit.rules

    .. code-block:: console

        -a exit,always -F auid=1000 -F egid!=994 -F auid!=-1 -F arch=b32 -S execve -k audit-wazuh-c
        -a exit,always -F auid=1000 -F egid!=994 -F auid!=-1 -F arch=b64 -S execve -k audit-wazuh-c

2. Then reload the rules and confirm they are in place:

    .. code-block:: console

        # auditctl -R /etc/audit/rules.d/audit.rules
        ...
        # auditctl -l
        -a always,exit -F arch=b32 -S execve -F auid=1000 -F egid!=994 -F auid!=-1 -F key=audit-wazuh-c
        -a always,exit -F arch=b64 -S execve -F auid=1000 -F egid!=994 -F auid!=-1 -F key=audit-wazuh-c


Trigger a few audit events
--------------------------

1. Dropping from **root** back to the **centos** user, run a ping.

    .. code-block:: console

        [root@linux-agent ~]# exit
        logout
        [centos@linux-agent ~]$ ping -c1 8.8.4.4
        PING 8.8.4.4 (8.8.4.4) 56(84) bytes of data.
        64 bytes from 8.8.4.4: icmp_seq=1 ttl=51 time=1.09 ms

        --- 8.8.4.4 ping statistics ---
        1 packets transmitted, 1 received, 0% packet loss, time 0ms
        rtt min/avg/max/mdev = 1.093/1.093/1.093/0.000 ms

2. While still **centos**, use sudo to run a privileged commands

    .. code-block:: console

        [centos@linux-agent ~]$ sudo cat /etc/shadow
        root:!!:17497:0:99999:7:::
        bin:*:17110:0:99999:7:::
        ...

3. Now sudo back to root and run another commands

    .. code-block:: console

        [centos@linux-agent ~]$ sudo su -
        Last login: Fri Feb  9 10:08:57 UTC 2018 on pts/0
        [root@linux-agent ~]# df
        Filesystem     1K-blocks    Used Available Use% Mounted on
        /dev/xvda1       8377344 1616824   6760520  20% /
        devtmpfs          486604       0    486604   0% /dev
        tmpfs             507288       0    507288   0% /dev/shm
        tmpfs             507288   12956    494332   3% /run
        tmpfs             507288       0    507288   0% /sys/fs/cgroup
        tmpfs             101460       0    101460   0% /run/user/1000


Look over the audit events
--------------------------

1. On linux-agent, inspect the content of ``/var/log/audit/audit.log``.  Auditd writes events here, but it is not very readable.  Thankfully Linux Wazuh agents already monitor this file by default.
2. Search Kibana for ``rule.id:80792`` in the Kibana Discover area.  That will catch all auditd command audit events.

3. Pick the following Kibana fields for columnar display:

    - data.audit.command
    - data.audit.auid
    - data.audit.euid
    - full_log

4. Explore the audit records, finding and examining your unprivileged ping, and your privileged cat and df calls.  They will be mingled with other commands.
5. The **centos** user has uid 1000.  User **root** has uid 0.  Notice the ``auid`` (audited user identity) always traces back to the **centos** user, even though the ``euid`` effective user identity is sometimes 0 and sometimes 1000 depending on whether privileges were escalated.  This allows you to see who actually ran the command with sudo or while sudo-ed to **root**.


Look over the relevant Wazuh rule
---------------------------------

1. Here is Wazuh rule 80792:

    .. code-block:: console

        <rule id="80792" level="3">
            <if_sid>80700</if_sid>
            <list field="audit.key" lookup="match_key_value" check_value="command">etc/lists/audit-keys</list>
            <description>Audit: Command: $(audit.exe)</description>
            <group>audit_command,</group>
        </rule>

    Parent rule 80700 catches all auditd events, while this rule focuses on auditd command events.  Notice how the ``<list>`` line in this
    rule takes the decoded ``audit.key`` value which all our auditd rules set to "audit-wazuh-c" presently, and looks this up in a
    CDB list called ``audit-keys`` to see if the ``audit.key`` value is listed with a value of "command".

2. Look over the key-value pairs in the lookup file.  The file is ``/var/ossec/etc/lists/audit-keys``.

    .. code-block:: console

        audit-wazuh-w:write
        audit-wazuh-r:read
        audit-wazuh-a:attribute
        audit-wazuh-x:execute
        audit-wazuh-c:command

    This CDB list contains keys and values separated colons.  Some lists only contain keys, in which case each key exists
    on a line of its own and is directly followed by a colon.

3. Notice that in addition to the text file ``/var/ossec/etc/lists/audit-keys``, there is also a binary ``/var/ossec/etc/lists/audit-keys.cdb`` file that Wazuh uses for actual lookups.


Create a list of commands that Wazuh will watch for
---------------------------------------------------

Wazuh allows you to maintain flat file CDB lists (key only or key:value) which are compiled into a special binary format to
facilitate high-performance lookups in Wazuh rules.  Such lists must be created as files, added to the Wazuh configuration, and then compiled.
After that, rules can be built that look up decoded fields in those CDB lists as part of their match criteria.  Right now we want
a list of commands that Wazuh should give us a special alert about when they are executed.

1. On wazuh-manager, create ``/var/ossec/etc/lists/suspicious-programs`` with this content:

    .. code-block:: console

        ncat:
        nc:
        tcpdump:
        ping:

2. On wazuh-manager, add this to the ``<ruleset>`` section of ossec.configuration:

    .. code-block:: console

        <list>etc/lists/suspicious-programs</list>

3. Restart the Wazuh manager:

    a. For Systemd:

      .. code-block:: console

        # systemctl restart wazuh-manager

    b. For SysV Init:

      .. code-block:: console

        # service wazuh-manager restart

4. Wazuh now knows to compile this file into a CDB database of the same name but with a ``.cdb`` extension.  Initiate the compile:

    .. code-block:: console

        [root@wazuh-server lists]# ossec-makelists
        * File etc/lists/audit-keys.cdb does not need to be compiled
        * File etc/lists/suspicious-programs.cdb needs to be updated
        * File etc/lists/amazon/aws-sources.cdb does not need to be compiled
        * File etc/lists/amazon/aws-eventnames.cdb does not need to be compiled

    .. note::
        When ossec-makelists says a file "needs to be updated," it means that it actually updated/compiled the file.


Make a rule to watch for the listed programs
--------------------------------------------

1. Add this new rule to ``/var/ossec/etc/rules/local_rules.xml`` on wazuh-manager.

    .. code-block:: console

        <rule id="100200" level="8">
            <if_sid>80792</if_sid>
            <list field="audit.command" lookup="match_key">etc/lists/suspicious-programs</list>
            <description>Audit: Suspicious Command: $(audit.exe)</description>
            <group>audit_command,</group>
        </rule>

    In this case we are simply checking to see if the decoded ``audit.command`` value appears in our new CDB lists at all,
    with no checking of a value.

2. Restart the Wazuh manager:

  a. For Systemd:

    .. code-block:: console

      # systemctl restart wazuh-manager

  b. For SysV Init:

    .. code-block:: console

      # service wazuh-manager restart

3. On linux-agent, install and run tcpdump to trip our new rule:

    .. code-block:: console

        # yum -y install tcpdump
        # tcpdump --version

4. Search Kibana for ``data.audit.command:tcpdump`` and expand the record, where you should see a ``rule.id`` of 100200.


Make a smarter list
-------------------

Let's make this list a little smarter by including values that indicate how alarmed we should be about a given program being run.

1. On wazuh-manager, replace ``/var/ossec/etc/lists/suspicious-programs`` with this content:

    .. code-block:: console

        ncat:red
        nc:red
        tcpdump:orange
        ping:yellow

2. Recompile the CDB list.

    .. code-block:: console

        # ossec-makelists

    .. note::
        The ``ossec-makelists`` program not only recompiles any CDB files that have been changed, but it causes ``ossec-analysisd`` to reload the changed lists without Wazuh manager restarting. You do not need to restart Wazuh after running ``ossec-makelists`` to make it use your updated lists.

Make a smarter rule
-------------------

Now that our ``suspicious-programs`` list is more granular, let's create a higher severity rule to fire specifically on
instances when a "red" program is executed.

1. Add this new rule to ``/var/ossec/etc/rules/local_rules.xml`` on wazuh-manager, directly after rule 100200:

    .. code-block:: console

        <rule id="100210" level="12">
            <if_sid>80792</if_sid>
            <list field="audit.command" lookup="match_key_value" check_value="red">etc/lists/suspicious-programs</list>
            <description>Audit: Highly Suspicious Command: $(audit.exe)</description>
            <group>audit_command,</group>
        </rule>

2. Restart the Wazuh manager:

  a. For Systemd:

    .. code-block:: console

      # systemctl restart wazuh-manager

  b. For SysV Init:

    .. code-block:: console

      # service wazuh-manager restart

3. On linux-agent install and run a "red" program (netcat):

    .. code-block:: console

        # yum -y install nmap-ncat
        # nc -v

4. Search Kibana for ``data.audit.command:nc`` and expand the record, noting especially the rule.description of "Audit: Highly Suspicious Command: /usr/bin/ncat"


Make an exception
-----------------

You have ``ping`` in your CDB list, but perhaps you have several systems that routinely ping 8.8.8.8 as a connectivity check and
you don't want these events to be logged.  Another child rule of 80297, with a level of "0" could provide such an exception.

1. Add this new rule to ``/var/ossec/etc/rules/local_rules.xml`` on wazuh-manager, directly after rule 100210:

    .. code-block:: console

        <rule id="100220" level="0">
            <if_sid>80792</if_sid>
            <description>Ignore pings of 8.8.8.8</description>
            <field name="audit.command">^ping$</field>
            <match>="8.8.8.8"</match>
            <group>audit_command,</group>
        </rule>

    The rule does no lookup.  It just checks any auditd command records in which the ``ping`` command is called and the target IP address 8.8.8.8 is mentioned.

2. Restart the Wazuh manager:

  a. For Systemd:

    .. code-block:: console

      # systemctl restart wazuh-manager

  b. For SysV Init:

    .. code-block:: console

      # service wazuh-manager restart

3. Test the rule by installing tcpdump on linux-agent and then pinging both 8.8.8.8 and 8.8.4.4.

    .. code-block:: console

        # yum -y install tcpdump
        # ping 8.8.8.8
        # ping 8.8.4.4

4. Search Kibana for ``data.audit.command:nc``.  Notice that only the ping event involving 8.8.4.4 shows up, because the other one was dropped by this exception rule.


Observe the order in which our child rules are evaluated
--------------------------------------------------------

1. On linux-agent, run a mundane command not listed in our CDB.

    .. code-block:: console

            # sleep 1

2. Search Kibana for ``data.audit.command:sleep`` to find the resulting event.  Copy the ``full_log`` value.

3. Run ``ossec-logtest -v`` on wazuh-manager and paste in the ``full_log`` value from above.

4. Carefully note the order in which child rules of "80792 - Audit: Command" were evaluated.

    .. code-block:: console

        Trying rule: 80792 - Audit: Command: $(audit.exe)
        *Rule 80792 matched.
        *Trying child rules.
        Trying rule: 100220 - Ignore pings of 8.8.8.8
        Trying rule: 100210 - Audit: Highly Suspicious Command: $(audit.exe)
        Trying rule: 100200 - Audit: Suspicious Command: $(audit.exe)

5. Remember that when a rule matches, if it has multiple child rules, they are not evaluated in id order nor in the order they appear in the rule file.  Instead, child rules of level "0" are checked first since they are for making exceptions.  Then any remaining child rules are checked in the order of highest severity to lowest severity.  Keep this in mind as you build child rules of your own.

.. warning::

    **Why does my new rule never fire?**

    Sometimes a new rule never matches anything because of a flaw in its criteria.  Other times it never matches because it is never even evaluated.  Remember, ``ossec-logtest -v`` is your friend.  Use it to see if your rule is being evaluated at all, and if not, what rule might be overshadowing it.
