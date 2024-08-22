.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Agent labels allow the user to customize the alert information from agents to include specific information related to the Wazuh agent generating the alert. Learn more in this section of the documentation.

Agent labels
============

This feature allows the user to customize the alert information from agents to include specific information related to the Wazuh agent generating the alert. This can prove useful when addressing or reviewing alerts. In addition, in large environments, this capability can be used to identify groups of agents by any common characteristic such as time zone, for example.

- `How it works`_
- `Use case`_

How it works
------------

Configuring labels that will be included in alerts is a straightforward process. It can be done using a simple XML structure that adds information to alerts. Labels can be nested by separating "key" terms by a period for inclusion in JSON-formatted alerts.

Information on how to configure labels can be found in the :doc:`labels </user-manual/reference/ossec-conf/labels>` section of the :doc:`ossec.conf </user-manual/reference/ossec-conf/index>` file on the Wazuh agent.

Agent labels can also be centralized using the :doc:`agent.conf </user-manual/reference/centralized-configuration>` file on the Wazuh manager, such that labels can be set for specific Wazuh agents at the Wazuh manager level. When there is a pre-existing label that is the same as one the user has defined in the Wazuh agent :doc:`ossec.conf </user-manual/reference/ossec-conf/index>` file or ``agent.conf``, the second one will override the first.

For more information about centralizing agent configuration, see the :doc:`centralized configuration </user-manual/reference/centralized-configuration>` section.

Additional configuration information is available in the :doc:`internal configuration </user-manual/reference/internal-options>` section.

Use case
--------

Below is a case where the use of labels can prove helpful.

In a large environment deployed in Amazon Web Services (AWS), you might want to have the following information about each Wazuh agent when an alert is triggered:

-  AWS instance-id.
-  AWS Security group.
-  Network IP address.
-  Network MAC.
-  Date of installation (hidden).

To include these labels in alerts from a specific Wazuh agent, the following configuration must be inserted into the Wazuh agent’s :doc:`ossec.conf </user-manual/reference/ossec-conf/index>` file:

.. code-block:: xml

   <labels>
     <label key="aws.instance-id">i-052a1838c</label>
     <label key="aws.sec-group">sg-1103</label>
     <label key="network.ip">172.17.0.0</label>
     <label key="network.mac">02:42:ac:11:00:02</label>
     <label key="installation" hidden="yes">July 1st, 2024</label>
   </labels>

To set the labels at the Wazuh manager level, the following configuration would be added to the ``agent.conf`` file:

.. code-block:: xml

   <agent_config name="92603de31548">
     <labels>
   	<label key="aws.instance-id">i-052a1838c</label>
   	<label key="aws.sec-group">sg-1103</label>
   	<label key="network.ip">172.17.0.0</label>
   	<label key="network.mac">02:42:ac:11:00:02</label>
   	<label key="installation" hidden="yes">July 1st, 2024</label>
     </labels>
   </agent_config>

When an alert is fired for a Wazuh agent with the above configuration applied from the Wazuh manager, the defined labels will add information to alerts as shown below:

.. thumbnail:: /images/manual/agent/alert-with-agent-labels.png
   :title: Alert with agent labels
   :alt: Alert with agent labels
   :align: center
   :width: 80%

The same alert in JSON format shows the advantage of using nested labels:

.. code-block:: json
   :class: none

   {
     "_index": "wazuh-alerts-4.x-2024.07.12",
     "_id": "i74Hp5ABO7i5Oz0kQ5QV",
     "_version": 1,
     "_score": null,
     "_source": {
       "predecoder": {
         "hostname": "ubuntu",
         "program_name": "sshd",
         "timestamp": "Jul 12 15:59:42"
       },
       "input": {
         "type": "log"
       },
       "agent": {
         "ip": "192.168.33.128",
         "name": "Ubuntu-24.04",
         "id": "004",
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
         "name": "wazuh-virtual-machine"
       },
       "data": {
         "srcip": "192.168.33.1",
         "dstuser": "wazuh"
       },
       "rule": {
         "mail": false,
         "level": 10,
         "pci_dss": [
           "10.2.4",
           "10.2.5"
         ],
         "hipaa": [
           "164.312.b"
         ],
         "tsc": [
           "CC6.1",
           "CC6.8",
           "CC7.2",
           "CC7.3"
         ],
         "description": "syslog: User missed the password more than one time",
         "groups": [
           "syslog",
           "access_control",
           "authentication_failed"
         ],
         "nist_800_53": [
           "AU.14",
           "AC.7"
         ],
         "gdpr": [
           "IV_35.7.d",
           "IV_32.2"
         ],
         "firedtimes": 1,
         "mitre": {
           "technique": [
             "Brute Force"
           ],
           "id": [
             "T1110"
           ],
           "tactic": [
             "Credential Access"
           ]
         },
         "id": "2502",
         "gpg13": [
           "7.8"
         ]
       },
       "location": "/var/log/auth.log",
       "decoder": {
         "parent": "sshd",
         "name": "sshd"
       },
       "id": "1720789183.17423",
       "full_log": "Jul 12 15:59:42 ubuntu sshd[16051]: PAM 2 more authentication failures; logname= uid=0 euid=0 tty=ssh ruser= rhost=192.168.33.1  user=wazuh",
       "timestamp": "2024-07-12T15:59:43.612+0300"
     },
     "fields": {
       "timestamp": [
         "2024-07-12T12:59:43.612Z"
       ]
     },
     "highlight": {
       "agent.id": [
         "@opensearch-dashboards-highlighted-field@004@/opensearch-dashboards-highlighted-field@"
       ],
       "manager.name": [
         "@opensearch-dashboards-highlighted-field@wazuh-virtual-machine@/opensearch-dashboards-highlighted-field@"
       ]
     },
     "sort": [
       1720789183612
     ]
   }
