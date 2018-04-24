.. Copyright (C) 2018 Wazuh, Inc.

.. _learning_wazuh_ssh_brute_force:

Detect an SSH brute-force attack
================================

Here you will wage a small ssh brute force attack against your Linux Agent instance.  You will see how Wazuh detects and
alerts on each login failure, and how a higher severity alert is produced when enough login failures from the same source IP
are seen in the same time window.  You will also inspect the actual rules that fire as well as the enriched alert records
that subsequently can be seen in Kibana.

Attack
------

Using the ssh client of your choice, attempt to login as user "blimey" to the Elastic IP of your Linux Agent instance.
The attempts will most likely be rejected before you are even prompted for a password since "blimey" is not an authorized
ssh user on that system.  Do this a total of eight times, making sure to get all your attempts made in the same 2-minute
time window.

The first alert
---------------

Use the file viewer of your choice to look at /var/ossec/logs/alerts/alerts.log on the Wazuh Server.  This file is optionally
written to by Wazuh and is mainly useful for learning and debugging purposes.  Search for the text "blimey" and the first alert
you find should look like this:

.. code-block:: console

    ** Alert 1516814147.26474505: - syslog,sshd,invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1,gpg13_7.1,
    2018 Jan 24 17:15:47 (linux-agent) any->/var/log/secure
    Rule: 5710 (level 5) -> 'sshd: Attempt to login using a non-existent user'
    Src IP: 208.103.56.41
    Src Port: 34372
    Jan 24 17:15:47 linux-agent sshd[1635]: Invalid user blimey from 208.103.56.41 port 34372


The really important alert output file written to by Wazuh is /var/ossec/logs/alerts/alerts.json.  It consists of sigle-line JSON
records containing much more detail than what the alerts.log file shows.  These JSON records are conveyed by Filebeat to Logstash
for enrichment and insertion into Elasticsearch.  From there they can then be seen with Kibana.  Here is a beautified example of
the JSON record in alerts.json that corresponds to the same alert above in alerts.log.

.. code-block:: json

    {
    "timestamp": "2018-01-24T17:15:47+0000",
    "rule": {
        "level": 5,
        "description": "sshd: Attempt to login using a non-existent user",
        "id": "5710",
        "firedtimes": 12,
        "mail": false,
        "groups": [
        "syslog",
        "sshd",
        "invalid_login",
        "authentication_failed",
        "gpg13_7.1"
        ],
        "pci_dss": [
        "10.2.4",
        "10.2.5",
        "10.6.1"
        ]
    },
    "agent": {
        "id": "001",
        "name": "linux-agent"
    },
    "manager": {
        "name": "wazuh-server"
    },
    "id": "1516814147.264745",
    "full_log": "Jan 24 17:15:47 linux-agent sshd[1635]: Invalid user blimey from 208.103.56.41 port 34372",
    "predecoder": {
        "program_name": "sshd",
        "timestamp": "Jan 24 17:15:47",
        "hostname": "linux-agent"
    },
    "decoder": {
        "parent": "sshd",
        "name": "sshd"
    },
    "data": {
        "srcip": "208.103.56.41",
        "srcport": "34372",
        "srcuser": "blimey"
    },
    "location": "/var/log/secure"
    }

Moving on to Kibana
-------------------

It is good to know about the log files, but Kibana is usually the best tool for looking at and analyzing Wazuh alerts.

Log in to Kibana.  Click on the Wazuh icon on the left and then on the DISCOVER link at the top.

In the "Search..." field, enter the word "blimey" and hit the search button on the right (the magnifying glass).

For better readability, hover over each of these field names on the left and click **[Add]** to the right of them

    - rule.description
    - full_log

Now you see a nice summary of recent events mentioning "blimey".

    .. thumbnail:: ../images/learning-wazuh/labs/brute-1.png
        :title: brute
        :align: center
        :width: 100%

Take a closer look at the full details of first alert that occurred (bottom record in the list), by clicking on the little triangle
to the left of the record.  Notice there is even more information here than in the original JSON record, due to enrichment by Logstash,
most notably including GeoLocation fields based on the "attacker's" IP address.

.. thumbnail:: ../images/learning-wazuh/labs/brute-2.png
    :title: brute
    :align: center
    :width: 100%

To better understand this alert, let's look up rule 5710 (from the rule.id field above) with the show-wazuh-rule script.

.. code-block:: console

    [root@wazuh-server ~]# show-wazuh-rule 5710

    /var/ossec/ruleset/rules/0095-sshd_rules.xml:  <rule id="5710" level="5">
    /var/ossec/ruleset/rules/0095-sshd_rules.xml:    <if_sid>5700</if_sid>
    /var/ossec/ruleset/rules/0095-sshd_rules.xml:    <match>illegal user|invalid user</match>
    /var/ossec/ruleset/rules/0095-sshd_rules.xml:    <description>sshd: Attempt to login using a non-existent user</description>
    /var/ossec/ruleset/rules/0095-sshd_rules.xml:    <group>invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1,gpg13_7.1,</group>
    /var/ossec/ruleset/rules/0095-sshd_rules.xml:  </rule>

This simple rule 5710 looks for matching text "illegal user" or "invalid user" to appear in any log event that has already triggered parent
rule 5700.  Parent rule 5700 simply detects all sshd events and has a number of child rules that are used to fire on specific sshd event
patterns like 5710 does.  Because these rules deal with individual events with no correlation across separate events, they are called
"atomic" rules.

However, after we repeated our ssh logon failure a number of times, another rule fired.  Scroll back up in Kibana and find the event
with a description
of "sshd: brute force trying to get access to the system"  which will be the first or nearly the first entry is your Kibana results.
Expand that record to have a closer look.

.. thumbnail:: ../images/learning-wazuh/labs/brute-3.png
    :title: brute
    :align: center
    :width: 100%

Let's look up this new rule 5712 and see why it fired.

.. code-block:: console

    [root@wazuh-server ~]# show-wazuh-rule 5712

    /var/ossec/ruleset/rules/0095-sshd_rules.xml:  <rule id="5712" level="10" frequency="6" timeframe="120" ignore="60">
    /var/ossec/ruleset/rules/0095-sshd_rules.xml:    <if_matched_sid>5710</if_matched_sid>
    /var/ossec/ruleset/rules/0095-sshd_rules.xml:    <description>sshd: brute force trying to get access to </description>
    /var/ossec/ruleset/rules/0095-sshd_rules.xml:    <description>the system.</description>
    /var/ossec/ruleset/rules/0095-sshd_rules.xml:    <same_source_ip />
    /var/ossec/ruleset/rules/0095-sshd_rules.xml:    <group>authentication_failures,pci_dss_11.4,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    /var/ossec/ruleset/rules/0095-sshd_rules.xml:  </rule>

This rule 5712 is a special kind of child rule to rule 5710.  It will only fire if rule 5710 fires on events involving the same source IP
at least eight times in a 120 second period.  The severity level of this rule is higher (10) than the previous one (only 5) because a
cluster of ssh login failure attempts from the same source is commonly a sign of a brute force attack.  This kind of rule is correlating
multiple events over time and is thus called a "composite" rule.

.. note::
  While the "frequency" value in a composite rule indicates how many occurrences of the parent rule must be seen in the
  specified time window for the rule to match, for legacy reasons the parent rule actually has to fire two more times than indicated by
  the "frequency" value before the composite rule will fire.

Testing the rules with ossec-logtest
------------------------------------

The ossec-logtest tool is very helpful for finding out from the command line what log entries would fire what rules and why, without
actually generating real alerts in your system.  It is an essential tool for developing, tuning, and debugging rules.

The actual log line generated by sshd when we try to log in via ssh as "blimey" looks like this:

.. code-block:: console

    Jan 21 02:39:54 linux-agent sshd[30449]: Invalid user blimey from 208.103.56.41 port 51498

On wazuh-server, run the ossec-logtest command and then paste in the above line and hit <Enter>.  You should see an analysis of the event
and the resulting rule 5710 match like this:

.. code-block:: console

    **Phase 1: Completed pre-decoding.
        full event: 'Jan 21 02:39:54 linux-agent sshd[30449]: Invalid user blimey from 208.103.56.41 port 51498'
        timestamp: 'Jan 21 02:39:54'
        hostname: 'linux-agent'
        program_name: 'sshd'
        log: 'Invalid user blimey from 208.103.56.41 port 51498'

    **Phase 2: Completed decoding.
        decoder: 'sshd'
        srcuser: 'blimey'
        srcip: '208.103.56.41'
        srcport: '51498'

    **Phase 3: Completed filtering (rules).
        Rule id: '5710'
        Level: '5'
        Description: 'sshd: Attempt to login using a non-existent user'
    **Alert to be generated.

.. note::

    When ossec-logtest indicates "\*\*Alert to be generated." it really means that an alert *would* be generated if the tested event were
    to occur outside of the ossec-logtest environment.  The ossec-logtest tool will never cause records to be written to alerts.log or
    alerts.json, and thus you will never see anything in Kibana caused by an ossec-logtest test.

Paste that log record in a number of times.  On the 8th time, you should see a rule 5712 match instead:

.. code-block:: console

    **Phase 1: Completed pre-decoding.
        full event: 'Jan 21 02:39:54 linux-agent sshd[30449]: Invalid user blimey from 208.103.56.41 port 51498'
        timestamp: 'Jan 21 02:39:54'
        hostname: 'linux-agent'
        program_name: 'sshd'
        log: 'Invalid user blimey from 208.103.56.41 port 51498'

    **Phase 2: Completed decoding.
        decoder: 'sshd'
        srcuser: 'blimey'
        srcip: '208.103.56.41'
        srcport: '51498'

    **Phase 3: Completed filtering (rules).
        Rule id: '5712'
        Level: '10'
        Description: 'sshd: brute force trying to get access to the system.'
    **Alert to be generated.

Hit Control-C to exit ossec-logtest.  Then restart ossec-logtest but this time with the -v parameter for more detail.

.. code-block:: console

    # ossec-logtest -v

Paste the same log record in 8 times again, noting especially the output for the last record which trips rule 5712 below.  See how early on
the very generic rule 5700 matched, leading to the evaluation of all of the child rules of 5700, of which rule 5710 matched, after which
rule 5710's child rules were evaluated, of which rule 5712 matched.  The verbose output of ossec-logtest is very helpful for understanding
the hierarchical way that rules are evaluated.

.. code-block:: console

    **Phase 1: Completed pre-decoding.
        full event: 'Jan 21 02:39:54 linux-agent sshd[30449]: Invalid user blimey from 208.103.56.41 port 51498'
        timestamp: 'Jan 21 02:39:54'
        hostname: 'linux-agent'
        program_name: 'sshd'
        log: 'Invalid user blimey from 208.103.56.41 port 51498'

    **Phase 2: Completed decoding.
        decoder: 'sshd'
        srcuser: 'blimey'
        srcip: '208.103.56.41'
        srcport: '51498'

    **Rule debugging:
        Trying rule: 1 - Generic template for all syslog rules.
        *Rule 1 matched.
        *Trying child rules.
        Trying rule: 600 - Active Response Messages Grouped
        Trying rule: 200 - Grouping of wazuh rules.
        Trying rule: 2100 - NFS rules grouped.
        Trying rule: 2507 - OpenLDAP group.
        Trying rule: 2550 - rshd messages grouped.
        Trying rule: 2701 - Ignoring procmail messages.
        Trying rule: 2800 - Pre-match rule for smartd.
        Trying rule: 5100 - Pre-match rule for kernel messages
        Trying rule: 5200 - Ignoring hpiod for producing useless logs.
        Trying rule: 2830 - Crontab rule group.
        Trying rule: 5300 - Initial grouping for su messages.
        Trying rule: 5905 - useradd failed.
        Trying rule: 5400 - Initial group for sudo messages
        Trying rule: 9100 - PPTPD messages grouped
        Trying rule: 9200 - Squid syslog messages grouped
        Trying rule: 2900 - Dpkg (Debian Package) log.
        Trying rule: 2930 - Yum logs.
        Trying rule: 2931 - Yum logs.
        Trying rule: 2940 - NetworkManager grouping.
        Trying rule: 2943 - nouveau driver grouping
        Trying rule: 3100 - Grouping of the sendmail rules.
        Trying rule: 3190 - Grouping of the smf-sav sendmail milter rules.
        Trying rule: 3300 - Grouping of the postfix reject rules.
        Trying rule: 3320 - Grouping of the postfix rules.
        Trying rule: 3390 - Grouping of the clamsmtpd rules.
        Trying rule: 3395 - Grouping of the postfix warning rules.
        Trying rule: 3500 - Grouping for the spamd rules
        Trying rule: 3600 - Grouping of the imapd rules.
        Trying rule: 3700 - Grouping of mailscanner rules.
        Trying rule: 3800 - Grouping of Exchange rules.
        Trying rule: 3900 - Grouping for the courier rules.
        Trying rule: 4300 - Grouping of PIX rules
        Trying rule: 4500 - Grouping for the Netscreen Firewall rules
        Trying rule: 4700 - Grouping of Cisco IOS rules.
        Trying rule: 4800 - SonicWall messages grouped.
        Trying rule: 5500 - Grouping of the pam_unix rules.
        Trying rule: 5556 - unix_chkpwd grouping.
        Trying rule: 5600 - Grouping for the telnetd rules
        Trying rule: 5700 - SSHD messages grouped.
        *Rule 5700 matched.
        *Trying child rules.
        Trying rule: 5709 - sshd: Useless SSHD message without an user/ip and context.
        Trying rule: 5711 - sshd: Useless/Duplicated SSHD message without a user/ip.
        Trying rule: 5721 - sshd: System disconnected from sshd.
        Trying rule: 5722 - sshd: ssh connection closed.
        Trying rule: 5723 - sshd: key error.
        Trying rule: 5724 - sshd: key error.
        Trying rule: 5725 - sshd: Host ungracefully disconnected.
        Trying rule: 5727 - sshd: Attempt to start sshd when something already bound to the port.
        Trying rule: 5729 - sshd: Debug message.
        Trying rule: 5732 - sshd: Possible port forwarding failure.
        Trying rule: 5733 - sshd: User entered incorrect password.
        Trying rule: 5734 - sshd: sshd could not load one or more host keys.
        Trying rule: 5735 - sshd: Failed write due to one host disappearing.
        Trying rule: 5736 - sshd: Connection reset or aborted.
        Trying rule: 5750 - sshd: could not negotiate with client.
        Trying rule: 5756 - sshd: subsystem request failed.
        Trying rule: 5707 - sshd: OpenSSH challenge-response exploit.
        Trying rule: 5701 - sshd: Possible attack on the ssh server (or version gathering).
        Trying rule: 5706 - sshd: insecure connection attempt (scan).
        Trying rule: 5713 - sshd: Corrupted bytes on SSHD.
        Trying rule: 5731 - sshd: SSH Scanning.
        Trying rule: 5747 - sshd: bad client public DH value
        Trying rule: 5748 - sshd: corrupted MAC on input
        Trying rule: 5702 - sshd: Reverse lookup error (bad ISP or attack).
        Trying rule: 5710 - sshd: Attempt to login using a non-existent user
        *Rule 5710 matched.
        *Trying child rules.
        Trying rule: 5712 - sshd: brute force trying to get access to the system.
        *Rule 5712 matched.

    **Phase 3: Completed filtering (rules).
        Rule id: '5712'
        Level: '10'
        Description: 'sshd: brute force trying to get access to the system.'
    **Alert to be generated.

Congatulations on your completion of your first "Learning Wazuh" lab!

Before moving on, you might be interested to look at  more detailed documentation about Wazuh rules `here <https://documentation.wazuh.com/current/user-manual/ruleset/index.html#field>`_.
