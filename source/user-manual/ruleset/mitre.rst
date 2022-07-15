.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the enhancement of Wazuh with MITRE, a feature that allows the user to customize the alert information to include specific information related to MITRE ATT&CK techniques.
  
.. _mitre:

Enhancing with MITRE
====================

This feature allows the user to customize the alert information to include specific information related to MITRE ATT&CK techniques. MITRE ATT&CK matrix stores all possible attacks that can be made and what to do to mitigate and detect them. This can be useful when an attack is detected through an alert and a user wants to know more about it.

- `Configuration example`_
- `Alert example`_
- `Moving on to the Wazuh dashboard`_

Configuration example
---------------------

MITRE ATT&CK assigns each attack technique an ID, which can be consulted on this `link <https://attack.mitre.org>`_. These techniques are grouped by tactics (Defense Evasion, Privilege Escalation, etc.), although some belong to more than one tactic. 

The ID `T1110 <https://attack.mitre.org/techniques/T1110/>`_ is related to the brute force attack. This technique fits in well with the following rule 100002, which detects a force brute attack and generates an alert. Below is an example of how to extend this MITRE ATT&CK technique to that rule.

Add the following lines to /var/ossec/etc/rules/local_rules.xml:

.. code-block:: xml

  <group name="local,syslog,sshd,">

    <rule id="100001" level="5">
      <if_sid>5716</if_sid>
      <srcip>1.1.1.1</srcip>
      <description>sshd: authentication failed from IP 1.1.1.1.</description>
      <group>authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>

    <rule id="100002" level="10" frequency="8" timeframe="120" ignore="60">
      <if_matched_sid>100001</if_matched_sid>
      <description>sshd: brute force trying to get access to the system.</description>
      <same_srcip />
      <mitre>
        <id>T1110</id>
      </mitre>
    </rule>

  </group>

Restart Wazuh, and you will have finished configuring the rule. 

If you want to configure a rule using two o more techniques, you can do it as follows:

.. code-block:: xml

  <mitre>
    <id>T1110</id>
    <id>T1084</id>
    <id>T1057</id>
  </mitre>

Alert example
-------------

A possible event to generate an alert from rule 100002 is:

::

  Dec 10 01:02:02 host sshd[1234]: Failed none for root from 1.1.1.1 port 1066 ssh2

When eight events like this are received by the decoder, the alert will be created. To check it, run this command:

.. code-block:: console

  # cat /var/ossec/logs/alerts/alerts.json

You have to see an alert similar to this one :

.. code-block:: json

  {
    "timestamp": "2020-06-30T06:03:10.057+0000",
    "rule": {
        "level": 10,
        "description": "sshd: brute force trying to get access to the system.",
        "id": "100002",
        "mitre": {
            "id": [
                "T1110"
            ],
            "tactic": [
                "Credential Access"
            ],
            "technique": [
                "Brute Force"
            ]
        },
        "frequency": 8,
        "firedtimes": 1,
        "mail": false,
        "groups": [
            "local",
            "syslog",
            "sshd"
        ]
    },
    "agent": {
        "id": "000",
        "name": "centos7"
    },
    "manager": {
        "name": "centos7"
    },
    "id": "1593496990.8493",
    "previous_output": "Dec 10 01:02:02 host sshd[1234]: Failed none for root from 1.1.1.1 port 1066 ssh2\nDec 10 01:02:02 host sshd[1234]: Failed none for root from 1.1.1.1 port 1066 ssh2\nDec 10 01:02:02 host sshd[1234]: Failed none for root from 1.1.1.1 port 1066 ssh2\nDec 10 01:02:02 host sshd[1234]: Failed none for root from 1.1.1.1 port 1066 ssh2\nDec 10 01:02:02 host sshd[1234]: Failed none for root from 1.1.1.1 port 1066 ssh2\nDec 10 01:02:02 host sshd[1234]: Failed none for root from 1.1.1.1 port 1066 ssh2\nDec 10 01:02:02 host sshd[1234]: Failed none for root from 1.1.1.1 port 1066 ssh2",
    "full_log": "Dec 10 01:02:02 host sshd[1234]: Failed none for root from 1.1.1.1 port 1066 ssh2",
    "predecoder": {
        "program_name": "sshd",
        "timestamp": "Dec 10 01:02:02",
        "hostname": "host"
    },
    "decoder": {
        "parent": "sshd",
        "name": "sshd"
    },
    "data": {
        "srcip": "1.1.1.1",
        "srcport": "1066",
        "dstuser": "root"
    },
    "location": "/var/ossec/logs/test.log"
  }

MITRE information appears inside rule information, as we are seeing. The alert displays the MITRE ATT&CK ID and their associated tactics and technique.

Moving on to the Wazuh dashboard
--------------------------------

We will check the alert is shown correctly on the Wazuh dashboard. Open it and add a filter, as shown in the figure.

.. thumbnail:: ../../images/manual/mitre/mitre-1.png
    :title: mitre
    :align: center
    :width: 100%

We will see the different fields of the alert after selecting it:

.. thumbnail:: ../../images/manual/mitre/mitre-2.png
    :title: mitre
    :align: center
    :width: 100%

As we can see, MITRE information appears correctly in the alert.

Also, it is possible to filter by a specific technique ID or tactic.
