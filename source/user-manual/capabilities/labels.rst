.. Copyright (C) 2019 Wazuh, Inc.

.. _labels:

Agent labels
============

This feature allows the user to customize the alert information from agents to include specific information related to the agent generating the alert.  This can prove useful when addressing or reviewing alerts. In addition, in large environments this capability can be used to identify groups of agents by any common characteristic like their time zone, for example.

- `How it works`_
- `Use case`_

How it works
------------

Configuring labels that will be included in alerts is a straightforward process. It can be done using a simple XML structure that adds information into alerts. Labels can be nested by separating "key" terms by a period for inclusion in JSON formatted alerts.

Information on how to configure labels can be found in the :doc:`Labels section <../reference/ossec-conf/labels>` of ``ossec.conf``.

Agent labels can also be centralized using the ``agent.conf`` file, such that labels can be set for specific agents at the manager level. When there is pre-existing label that is the same as one the user has defined in ``ossec.conf`` or ``agent.conf``, the second one will override the first.

For more information about on how to centralize agent configuration, see the :doc:`Centralized configuration <../reference/centralized-configuration>` section.

Addition configuration information is available in the :doc:`Internal configuration <../reference/internal-options>` section. This includes information on ``analysisd.label_cache_maxage`` and ``analysisd.show_hidden_labels``.

Use case
--------

Below is a case where the use of labels could prove helpful.

Let's imagine we have a large environment deployed in Amazon Web Service (AWS) and monitored by Wazuh. In this situation, we want the manager to have the following information about
each agent when an alert is triggered:

- AWS instance-id.
- AWS Security group.
- Network IP address.
- Network MAC.
- Date of installation (hidden).

To include these labels in alerts from a specific agent, the following configuration must be inserted into the ``ossec.conf`` file:

.. code-block:: xml

        <labels>
          <label key="aws.instance-id">i-052a1838c</label>
          <label key="aws.sec-group">sg-1103</label>
          <label key="network.ip">172.17.0.0</label>
          <label key="network.mac">02:42:ac:11:00:02</label>
          <label key="installation" hidden="yes">January 1st, 2017</label>
        </labels>

To set the labels at the manager level, the following configuration would be added to the ``agent.conf`` file:

.. code-block:: xml

      <agent_config name="92603de31548">
        <labels>
          <label key="aws.instance-id">i-052a1838c</label>
          <label key="aws.sec-group">sg-1103</label>
          <label key="network.ip">172.17.0.0</label>
          <label key="network.mac">02:42:ac:11:00:02</label>
          <label key="installation" hidden="yes">January 1st, 2017</label>
        </labels>
      </agent_config>

When an alert is fired for an agent with the above configuration applied from the manager, the defined labels will add information to alerts as shown below:

.. code-block:: console
   :emphasize-lines: 3,4,5,6

    ** Alert 1488922301.778562: mail  - ossec,syscheck,pci_dss_11.5,
    2017 Jun 07 13:31:43 (92603de31548) 192.168.66.1->syscheck
    aws.instance-id: i-052a1838c
    aws.sec-group: sg-1103
    network.ip: 172.17.0.0
    network.mac: 02:42:ac:11:00:02
    Rule: 550 (level 7) -> 'Integrity checksum changed.'
    Integrity checksum changed for: '/var/ossec/etc/ossec.conf'
    Size changed from '3663' to '3664'
    Old md5sum was: '98b351df146410f174a967d726f9965e'
    New md5sum is : '7f4f5846dcaa0013a91bd6d3ac4a1915'
    Old sha1sum was: 'c6368b866a835b15baf20976ae5ea7ea2788a30e'
    New sha1sum is : 'c959321244bdcec824ff0a32cad6d4f1246f53e9'

And the same alert in JSON format shows the advantage of using nested labels:

.. code-block:: javascript

  {
    "timestamp": "2017-03-07T13:31:41-0800",
    "rule": {
      "level": 7,
      "description": "Integrity checksum changed.",
      "id": "550",
      "firedtimes": 1,
      "groups": [
        "ossec",
        "syscheck"
      ],
      "pci_dss": [
        "11.5"
      ]
    },
    "agent": {
      "id": "001",
      "name": "92603de31548",
      "ip": "192.168.66.1",
      "labels": {
        "aws": {
          "instance-id": "i-052a1838c",
          "sec-group": "sg-1103"
        },
        "network": {
          "ip": "172.17.0.0",
          "mac": "02:42:ac:11:00:02"
        }
      }
    },
    "manager": {
      "name": "ubuntu"
    },
    "full_log": "Integrity checksum changed for: '/var/ossec/etc/ossec.conf' Size changed from '3663' to '3664' Old md5sum was: '98b351df146410f174a967d726f9965e' New md5sum is : '7f4f5846dcaa0013a91bd6d3ac4a1915' Old sha1sum was: 'c6368b866a835b15baf20976ae5ea7ea2788a30e' New sha1sum is : 'c959321244bdcec824ff0a32cad6d4f1246f53e9'",
    "syscheck": {
      "path": "/var/ossec/etc/ossec.conf",
      "size_before": "3663",
      "size_after": "3664",
      "perm_after": "100640",
      "uid_after": "0",
      "gid_after": "999",
      "md5_before": "98b351df146410f174a967d726f9965e",
      "md5_after": "7f4f5846dcaa0013a91bd6d3ac4a1915",
      "sha1_before": "c6368b866a835b15baf20976ae5ea7ea2788a30e",
      "sha1_after": "c959321244bdcec824ff0a32cad6d4f1246f53e9",
      "event": "modified"
    },
    "decoder": {
      "name": "syscheck_integrity_changed"
    },
    "location": "syscheck"
  }

If email reports have been enabled, the following email notification would then be received:

.. code-block:: console

  Wazuh Notification.
  2017 Mar 07 13:31:41

  Received From: (92603de31548) 192.168.66.1->syscheck
  Rule: 550 fired (level 7) -> "Integrity checksum changed."
  Portion of the log(s):

  aws.instance-id: i-052a1838c
  aws.sec-group: sg-1103
  network.ip: 172.17.0.0
  network.mac: 02:42:ac:11:00:02
  Integrity checksum changed for: '/var/ossec/etc/ossec.conf'
  Old md5sum was: '98b351df146410f174a967d726f9965e'
  New md5sum is : '7f4f5846dcaa0013a91bd6d3ac4a1915'
  Old sha1sum was: 'c6368b866a835b15baf20976ae5ea7ea2788a30e'
  New sha1sum is : 'c959321244bdcec824ff0a32cad6d4f1246f53e9'
