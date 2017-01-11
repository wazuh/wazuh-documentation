.. _pci_dss_log_analysis:

Log analysis
============

Here we will use Wazuh log collection and analysis capabilities to meet the following PCI DSS controls:

| **10.2.4**: Invalid logical access attempts.
| **10.2.5**: Use of and changes to identification and authentication mechanisms —including but not limited to creation of new accounts and escalation of privileges— and all changes, additions, or deletions to accounts with root or administrative privileges.
|

These controls require us to log invalid logical access attempts, multiple invalid login attempts (possible brute force attacks), escalation privileges, changes in accounts, etc. In order to achieve this, we have added PCI DSS tags to OSSEC log analysis rules, mapping them to the corresponding requirement. This way, it will be easy to analyze and visualize our PCI DSS related alerts.

The syntax used for rule tagging is **pci_dss_** followed by the number of the requirement. In this case those would be: **pci_dss_10.2.4** and **pci_dss_10.2.5**.

See below examples of OSSEC rules tagged for PCI requirements 10.2.4 and 10.2.5:

.. code-block:: xml

    <!--apache: access attempt -->
    <rule id="30105" level="5">
        <if_sid>30101</if_sid>
        <match>denied by server configuration</match>
        <description>Attempt to access forbidden file or directory.</description>
        <group>access_denied,pci_dss_6.5.8,pci_dss_10.2.4,</group>
    </rule>

    <!-- syslog-sudo: elevation of privileges -->
    <rule id="5401" level="5">
        <if_sid>5400</if_sid>
        <match>incorrect password attempt</match>
        <description>Failed attempt to run sudo</description>
        <group>pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>

    <rule id="5402" level="3">
        <if_sid>5400</if_sid>
        <regex> ; USER=root ; COMMAND=| ; USER=root ; TSID=\S+ ; COMMAND=</regex>
        <description>Successful sudo to ROOT executed</description>
        <group>pci_dss_10.2.5,pci_dss_10.2.2,</group>
    </rule>

    <!-- ssh: identification and authentication mechanisms -->
    <rule id="5712" level="10" frequency="6" timeframe="120" ignore="60">
        <if_matched_sid>5710</if_matched_sid>
        <description>SSHD brute force trying to get access to </description>
        <description>the system.</description>
        <same_source_ip />
        <group>authentication_failures,pci_dss_11.4,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>

    <rule id="5720" level="10" frequency="6">
        <if_matched_sid>5716</if_matched_sid>
        <same_source_ip />
        <description>Multiple SSHD authentication failures.</description>
        <group>authentication_failures,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_11.4,</group>
    </rule>


Use cases
---------

In this scenario, we try to open the file ``cardholder_data.txt``. Since our current user doesn't have read access to the file, we run  ``sudo`` to elevate privileges.

.. code-block:: console

    [agent@centos ~]$ ls -l
    total 0
    drwxrwxr-x. 2 agent agent  6 Jan  5 18:34 centos
    drwxr-x---  2 root  root  33 Jan  5 18:32 credit_cards
    drwxrwxr-x. 2 agent agent  6 Jan  5 18:34 user_data
    [agent@centos ~]$ sudo cat credit_cards/cardholder_data.txt
    Number: 0000-0000-0000-0000
    Holder: Mr. John Smith

Using ``sudo`` log analysis decoder and rules, OSSEC will generate an alert for this particular action and print it on ``alerts.log``. Using the rule tags we can see which PCI DSS requirements are specifically related to this alert.

.. code-block:: console

    root@ubuntu:~# tail -n10 /var/ossec/logs/alerts/alerts.log

    ** Alert 1483621881.263207: - syslog,sudo,pci_dss_10.2.5,pci_dss_10.2.2,
    2017 Jan 05 14:11:21 (CentOS) 192.168.56.4->/var/log/secure
    Rule: 5402 (level 3) -> 'Successful sudo to ROOT executed'
    User: root
    Jan  5 14:11:12 centos sudo:   agent : TTY=pts/0 ; PWD=/ ; USER=root ; COMMAND=/bin/cat /root/credit_cards/cardholder_data.txt
    tty: pts/0
    pwd: /
    command: /bin/cat

Since we have JSON output enabled, we can also see the alert at ``alerts.json``:

.. code-block:: console

    root@ubuntu:~# tail -n1 /var/ossec/logs/alerts/alerts.json | jq

.. code-block:: json

    {
      "rule": {
        "level": 3,
        "description": "Successful sudo to ROOT executed",
        "id": 5402,
        "firedtimes": 1,
        "groups": [
          "syslog",
          "sudo"
        ],
        "pci_dss": [
          "10.2.5",
          "10.2.2"
        ]
      },
      "agent": {
        "id": "031",
        "name": "CentOS",
        "ip": "192.168.56.4"
      },
      "manager": {
        "name": "ubuntu"
      },
      "srcuser": "agent",
      "dstuser": "root",
      "full_log": "Jan  5 14:11:12 centos sudo:   agent : TTY=pts/0 ; PWD=/ ; USER=root ; COMMAND=/bin/cat /root/credit_cards/cardholder_data.txt",
      "program_name": "sudo",
      "tty": "pts/0",
      "pwd": "/",
      "command": "/bin/cat",
      "decoder": {
        "fts": 1792,
        "parent": "sudo",
        "name": "sudo"
      },
      "timestamp": "2017 Jan 05 14:11:21",
      "location": "/var/log/secure"
    }

Kibana displays information in an organized way, allowing filtering by different type of alert fields, including compliance controls. We have also developed some specific dashboards to display the PCI DSS related alerts.

.. thumbnail:: ../images/pci/log_analysis_1.png
    :title: Alert visualization at Kibana discover
    :align: center
    :width: 100%

.. thumbnail:: ../images/pci/log_analysis_2.png
    :title: Wazuh PCI DSS dashboard for Kibana
    :align: center
    :width: 100%
