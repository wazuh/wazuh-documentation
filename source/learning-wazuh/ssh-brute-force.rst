.. Copyright (C) 2021 Wazuh, Inc.
.. meta::
  :description: Looking for how to Detect an SSH brute-force attack? Learn more how Wazuh detects and alerts attacks in this section.
  
.. _learning_wazuh_ssh_brute_force:

Detect an SSH brute-force attack
================================

Here you will wage a small SSH brute force attack against your Linux Agent instance.

You will see how Wazuh detects and alerts on each login failure, and how a higher severity alert
is produced when enough login failures from the same source IP are detected in the same time window.

You will also inspect the actual rules that fire as well as the enriched alert records
that subsequently can be seen in Kibana.

Attack
------

Using the SSH client of your choice, attempt to login as user "*blimey*" to your Linux Agent instance. For example:

  .. code-block:: console

    ssh blimey@13.56.124.147

The attempts may be rejected before you are even prompted for a password since "*blimey*" is not an authorized
SSH user on that system.

Do this a total of eight times, making sure to get all your attempts made in the same 2-minute time window.

The first alert
---------------

Use the file viewer of your choice to look at ``/var/ossec/logs/alerts/alerts.log`` on the Wazuh Manager instance. For example:

  .. code-block:: console

    less /var/ossec/logs/alerts/alerts.log


Search for the text "*blimey*" and the first alert you find should look like this:

.. code-block:: none
    :class: output

    ** Alert 1571166477.30198: - syslog,sshd,invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1,gpg13_7.1,gdpr_IV_35.7.d,gdpr_IV_32.2,hipaa_164.312.b,nist_800_53_AU.14,nist_800_53_AC.7,nist_800_53_AU.6,
    2019 Oct 15 21:09:56 (agent) any->/var/log/secure
    Rule: 5710 (level 5) -> 'sshd: Attempt to login using a non-existent user'
    Src IP: 18.18.18.18
    Oct 15 21:07:56 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928


The really important alert output file Wazuh writes to is ``/var/ossec/logs/alerts/alerts.json``.

It consists of single-line JSON records containing much more detail than what the ``alerts.log`` file shows.

These JSON records are conveyed by Filebeat to Elasticsearch while enriching them so they may be inserted
into the appropriate Elasticsearch index.From there they can then be visualized with Kibana.

Here is a beautified example of the JSON record in ``alerts.json`` that corresponds to the same alert above in ``alerts.log``.

.. code-block:: json
    :class: output

    {
      "timestamp": "2019-10-15T19:07:57.741+0000",
      "rule": {
        "level": 5,
        "description": "sshd: Attempt to login using a non-existent user",
        "id": "5710",
        "firedtimes": 7,
        "mail": false,
        "groups": [
          "syslog",
          "sshd",
          "invalid_login",
          "authentication_failed"
        ],
        "pci_dss": [
          "10.2.4",
          "10.2.5",
          "10.6.1"
        ],
        "gpg13": [
          "7.1"
        ],
        "gdpr": [
          "IV_35.7.d",
          "IV_32.2"
            ],
        "hipaa": [
          "164.312.b"
        ],
        "nist_800_53": [
          "AU.14",
          "AC.7",
          "AU.6"
        ]
      },
      "agent": {
        "id": "001",
        "name": "linux-agent"
      },
      "manager": {
        "name": "wazuh-manager-master-0"
      },
      "id": "1571166477.30198",
      "cluster": {
        "name": "wazuh",
        "node": "wazuh-manager-master-0"
      },
      "full_log": "Oct 15 21:07:56 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928",
      "predecoder": {
        "program_name": "sshd",
        "timestamp": "Oct 15 21:07:56",
        "hostname": "linux-agent"
      },
      "decoder": {
        "parent": "sshd",
        "name": "sshd"
      },
      "data": {
        "srcip": "18.18.18.18",
        "srcport": "48928",
        "srcuser": "blimey"
      },
      "location": "/var/log/auth.log"
    }

Moving on to Kibana
-------------------

It is good to know about the log files, but Kibana is usually the best tool for looking at and analyzing Wazuh alerts.

Log in to Kibana and click on the ``Discover`` icon on the left vertical menu.

In the "*Search..*." field, enter the word "*blimey*" and hit the search button on the right (the magnifying glass).

For better readability, hover over each of these field names on the left and click on **[Add]** to the right of them

    - rule.description
    - full_log

Now you see a nice summary of recent events mentioning "*blimey*".

    .. thumbnail:: ../images/learning-wazuh/labs/brute-1.png
        :title: brute
        :align: center
        :width: 100%

Take a closer look at the full details of the first alert that occurred (bottom record in the list),
by clicking on the triangle to the left of the record.

Notice there is even more information here than in the original JSON record, due to enrichment by **Filebeat**,
most notably including GeoLocation fields that are based on the "attacker's" IP address if this was done over
an external IP.

.. thumbnail:: ../images/learning-wazuh/labs/brute-2.png
    :title: brute
    :align: center
    :width: 100%

To better understand this alert, let's look up rule **5710** (from the ``rule.id`` field above) with the following command:

.. code-block:: console

    [root@wazuh-manager-master-0 ~]# ID=5710; rulefiles=/var/ossec/ruleset/rules/*.xml; grep 'id="'$ID'"' $rulefiles -l; sed -e '/id="'$ID'"/,/\/rule>/!d' $rulefiles;

.. code-block:: none
    :class: output

    /var/ossec/ruleset/rules/0095-sshd_rules.xml
      <rule id="5710" level="5">
        <if_sid>5700</if_sid>
        <match>illegal user|invalid user</match>
        <description>sshd: Attempt to login using a non-existent user</description>
        <group>invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1,gpg13_7.1,gdpr_IV_35.7.d,gdpr_IV_32.2,hipaa_164.312.b,nist_800_53_AU.14,nist_800_53_AC.7,nist_800_53_AU.6,</group>
      </rule>

The rule **5710** looks for matching text "*illegal user*" or "*invalid user*" to appear in
any log event that has already triggered its parent rule **5700**.

Parent rule **5700** simply detects all sshd events and has a number of child rules that are used to fire on specific sshd event patterns, just like rule **5710** does.

Because these rules deal with individual events with no correlation across separate events, they are called ``atomic rules``.

However, after we repeated our SSH logon failure a number of times, another rule fired.

If you scroll back up in **Kibana** and look for an event with the following description: "*sshd: brute force trying to
get access to the system*" which should be the first or nearly the first entry in your **Kibana results**. If not, you will need to repeat the `attack <ssh-brute-force.html#attack>`_
making sure you do it 8 times in less than 2 minutes.

Expand that record to take a closer look.

.. thumbnail:: ../images/learning-wazuh/labs/brute-3.png
    :title: brute
    :align: center
    :width: 100%

Let's look into this new rule **5712** and see why was it triggered.

.. code-block:: console

    [root@wazuh-manager-master-0 ~]# ID=5712; rulefiles=/var/ossec/ruleset/rules/*.xml; grep 'id="'$ID'"' $rulefiles -l; sed -e '/id="'$ID'"/,/\/rule>/!d' $rulefiles;

.. code-block:: none
    :class: output

    /var/ossec/ruleset/rules/0095-sshd_rules.xml
      <rule id="5712" level="10" frequency="8" timeframe="120" ignore="60">
        <if_matched_sid>5710</if_matched_sid>
        <description>sshd: brute force trying to get access to </description>
        <description>the system.</description>
        <same_source_ip />
        <group>authentication_failures,pci_dss_11.4,pci_dss_10.2.4,pci_dss_10.2.5,gdpr_IV_35.7.d,gdpr_IV_32.2,hipaa_164.312.b,nist_800_53_SI.4,nist_800_53_AU.14,nist_800_53_AC.7,</group>
      </rule>

The rule **5712** is a special kind of child rule to rule **5710**.

It is only triggered if its parent rule, **5710**, fires on events involving the same source IP at least eight
times in a **120** second period.

The severity level of this rule is higher (10) than the previous one (only 5) because a cluster of SSH
login failure attempts from the same source is commonly a sign of a brute force attack.

This kind of rule is correlating multiple events over time and is thus called a ``composite rule``.

Testing the rules with ossec-logtest
------------------------------------

The ``ossec-logtest`` tool is very helpful for finding out from the command line what log entries would
fire what rules and why, without actually generating real alerts in your system.

It is an essential tool for developing, tuning, and debugging rules.

The actual log line generated by sshd when we tried to log in via ssh as "*blimey*" looks like this:

.. code-block:: none
    :class: output

    Oct 15 21:07:56 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928

On wazuh-manager, run the ossec-logtest command and then paste in the above line and press <Enter>.

.. code-block:: none

    [root@wazuh-manager centos]# /var/ossec/bin/ossec-logtest
    
You should see an analysis of the event and the resulting rule **5710** match like this:

.. code-block:: none
    :class: output

    2019/10/16 15:55:14 ossec-testrule: INFO: Started (pid: 11223).
    ossec-testrule: Type one log per line.

    **Phase 1: Completed pre-decoding.
           full event: 'Oct 15 21:07:56 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928'
           timestamp: 'Oct 15 21:07:56'
           hostname: 'linux-agent'
           program_name: 'sshd'
           log: 'Invalid user blimey from 18.18.18.18 port 48928'

    **Phase 2: Completed decoding.
           decoder: 'sshd'
           srcuser: 'blimey'
           srcip: '18.18.18.18'
           srcport: '48928'

    **Phase 3: Completed filtering (rules).
           Rule id: '5710'
           Level: '5'
           Description: 'sshd: Attempt to login using a non-existent user'
    **Alert to be generated.

.. note::

    When ossec-logtest indicates ``**Alert to be generated.`` it means that an alert *would* be generated if the tested event were
    to occur outside of the ossec-logtest environment.  The ossec-logtest tool will never cause records to be written to alerts.log or
    alerts.json, and thus you will never see anything in Kibana caused by an ossec-logtest test.

Paste that log record in a number of times.  On the 8th time, you should see a rule **5712** match instead:

.. code-block:: none
    :class: output

    **Phase 1: Completed pre-decoding.
           full event: 'Oct 15 21:07:56 linux-agent sshd[29205]: Invalid user blimey from 18.18.18.18 port 48928'
           timestamp: 'Oct 15 21:07:56'
           hostname: 'linux-agent'
           program_name: 'sshd'
           log: 'Invalid user blimey from 18.18.18.18 port 48928'

    **Phase 2: Completed decoding.
           decoder: 'sshd'
           srcuser: 'blimey'
           srcip: '18.18.18.18'
           srcport: '48928'

    **Phase 3: Completed filtering (rules).
           Rule id: '5712'
           Level: '10'
           Description: 'sshd: brute force trying to get access to the system.'
    **Alert to be generated.

Press Control+C to exit ossec-logtest.  Then restart ``ossec-logtest`` but this time with the ``-v`` parameter for more detail.

.. code-block:: console

    [root@wazuh-manager centos]# /var/ossec/bin/ossec-logtest -v

Paste the same log record in 8 times again, noting especially the output for the last record which
triggers rule **5712** below.


Notice how early on the generic rule **5700** matched, leading to the evaluation of all its child rules.
Then, rule **5710** matched, also leading to the evaluation of its own child rules.
Finally, rule **5712** matched, and because it is the last one to match, its the rule that is triggered.

The verbose output of ``ossec-logtest`` is very helpful for understanding the hierarchical way in which rules are evaluated.

.. code-block::  none
    :class: output

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
        Trying rule: 5100 - Pre-match rule for kernel messages.
        Trying rule: 5200 - Ignoring hpiod for producing useless logs.
        Trying rule: 2830 - Crontab rule group.
        Trying rule: 5300 - Initial grouping for su messages.
        Trying rule: 5905 - useradd failed.
        Trying rule: 5400 - Initial group for sudo messages.
        Trying rule: 9100 - PPTPD messages grouped.
        Trying rule: 9200 - Squid syslog messages grouped.
        Trying rule: 2900 - Dpkg (Debian Package) log.
        Trying rule: 2930 - Yum logs.
        Trying rule: 2931 - Yum logs.
        Trying rule: 2940 - NetworkManager grouping.
        Trying rule: 2943 - nouveau driver grouping.
        Trying rule: 2962 - Perdition custom app group.
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

Congratulations on the completion of your first **Learning Wazuh** lab!

Before moving on, you might be interested in taking a more detailed look at the documentation about Wazuh rules :ref:`here <ruleset>`.
