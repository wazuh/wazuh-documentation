.. Copyright (C) 2019 Wazuh, Inc.

.. _mitre:

Enhancing with MITRE
====================

This feature allows the user to customize the alert information to include specific information related to MITRE ATT&CK techniques. MITRE ATT&CK matrix stores all possible attacks that can be made and what to do to mitigate and detect them. This can be useful when an attack is detected through an alert and a user wants to know more about it.

- `Configuration example`_
- `Alert example`_
- `Moving on to Kibana`_

Configuration example
---------------------

MITRE ATT&CK assigns each attack technique an ID, which can be consulted on this `link <https://attack.mitre.org>`_. These techniques are grouped by tactics (Defense Evasion, Privilege Escalation, etc.) although some of them belong to more than one tactic. 

The ID `T1110 <https://attack.mitre.org/techniques/T1110/>`_ is related to the brute force attack. This technique fits in well with rule 5712, which detects a force brute attack and generates an alert. Below is an example of how to extend this MITRE ATT&CK technique to rule 5712.

Add the following lines to /var/ossec/etc/rules/local_rule.xml:

.. code-block:: xml

  <group name="syslog,sshd,">

    <rule id="100002" level="10">
      <if_sid>5712</if_sid>
      <description>sshd: brute force attack.</description>
      <mitre>
        <id>T1110</id>
      </mitre>
      <group>authentication_failures,pci_dss_11.4,pci_dss_10.2.4,pci_dss_10.2.5,gdpr_IV_35.7.d,gdpr_IV_32.2,hipaa_164.312.b,nist_800_53_SI.4,nist_800_53_AU.14,nist_800_53_AC.7,</group>
    </rule>

  </group>

Restart Wazuh and you will have finished configuring the rule. 

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

  Jan 24 17:15:47 linux-agent sshd[1635]: Invalid user blimey from 208.103.56.41 port 34372

When 8 events like this are received by the decoder, the alert will be created. To check it, run this command:

.. code-block:: console

  # cat /var/ossec/logs/alerts/alerts.json

You have to see an alert similar to this one:

.. code-block:: json

  {
    "timestamp": "2019-10-24T12:16:59.366+0200",
    "rule": {
      "level": 10,
      "description": "sshd: brute force attack.",
      "id": "100002",
      "mitre": {
        "id": [
          "T1110"
        ],
        "tactics": [
          "Credential Access"
        ]
      },
      "firedtimes": 1,
      "mail": false,
      "groups": [
        "syslog",
        "sshd",
        "authentication_failures"
      ],
      "pci_dss": [
        "11.4",
        "10.2.4",
        "10.2.5"
      ],
      "gdpr": [
        "IV_35.7.d",
        "IV_32.2"
      ],
      "hipaa": [
        "164.312.b"
      ],
      "nist_800_53": [
        "SI.4",
        "AU.14",
        "AC.7"
      ]
    },
    "agent": {
      "id": "000",
      "name": "ubuntu"
    },
    "manager": {
      "name": "ubuntu"
    },
    "id": "1571827523.33858990",
    "previous_output": "Jan 24 17:15:47 linux-agent sshd[1635]: Invalid user blimey from 208.103.56.41 port 34372\nJan 24 17:15:47 linux-agent sshd[1635]: Invalid user blimey from 208.103.56.41 port 34372\nJan 24 17:15:47 linux-agent sshd[1635]: Invalid user blimey from 208.103.56.41 port 34372\nJan 24 17:15:47 linux-agent sshd[1635]: Invalid user blimey from 208.103.56.41 port 34372\nJan 24 17:15:47 linux-agent sshd[1635]: Invalid user blimey from 208.103.56.41 port 34372\nJan 24 17:15:47 linux-agent sshd[1635]: Invalid user blimey from 208.103.56.41 port 34372\nJan 24 17:15:47 linux-agent sshd[1635]: Invalid user blimey from 208.103.56.41 port 34372",
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
    "location": "/var/log/auth.log"
  }

MITRE information appears inside rule information, as we are seeing. It is divided into two parts: id and tactics. The former stores all MITRE ATT&CK techniques included in the rule whereas the last stores the tactics associated with these techniques.

Moving on to Kibana
-------------------

We will check the alert is shown correctly on Kibana. Open it and add a filter as shown in the figure.

.. thumbnail:: ../../images/manual/mitre/mitre-1.png
    :title: mitre
    :align: center
    :width: 100%

Open the alert and it will be displayed:

.. thumbnail:: ../../images/manual/mitre/mitre-2.png
    :title: mitre
    :align: center
    :width: 100%

As we can see, MITRE information appears correctly in the alert.

Also, it is possible to filter by a specific technique ID or tactic.


