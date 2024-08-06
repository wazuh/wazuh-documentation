.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the architecture of Wazuh, our open source cybersecurity platform, in this section of our documentation. 
  
Architecture
============

The Wazuh architecture is based on :doc:`agents <components/wazuh-agent>`, running on the monitored endpoints, that forward security data to a central :doc:`server <components/wazuh-server>`. Agentless devices such as firewalls, switches, routers, and access points are supported and can actively submit log data via Syslog, SSH, or using their API. The central server decodes and analyzes the incoming information and passes the results along to the Wazuh indexer for indexing and storage.

The Wazuh indexer cluster is a collection of one or more nodes that communicate with each other to perform read and write operations on indices. Small Wazuh deployments, which do not require processing large amounts of data, can easily be handled by a single-node cluster. Multi-node clusters are recommended when there are many monitored endpoints, when a large volume of data is anticipated, or when high availability is required.

For production environments, it is recommended to deploy the Wazuh server and Wazuh indexer to different hosts. In this scenario, Filebeat is used to securely forward Wazuh alerts and archived events to the Wazuh indexer cluster (single-node or multi-node) using TLS encryption.

The diagram below represents a Wazuh deployment architecture. It shows the solution components and how the :doc:`Wazuh server <components/wazuh-server>` and the :doc:`Wazuh indexer <components/wazuh-indexer>` nodes can be configured as clusters, providing load balancing and high availability.

.. thumbnail:: /images/getting-started/deployment-architecture.png    
   :title: Deployment architecture
   :alt: Deployment architecture
   :align: center
   :width: 80%

Wazuh agent - Wazuh server communication
----------------------------------------

The :doc:`Wazuh agent <components/wazuh-agent>` continuously sends events to the :doc:`Wazuh server <components/wazuh-server>` for analysis and threat detection. To start shipping this data, the agent establishes a connection with the server service for agent connection, which listens on port 1514 by default (this is configurable). The Wazuh server then decodes and rule-checks the received events, utilizing the analysis engine. Events that trip a rule are augmented with alert data such as rule ID and rule name. Events can be spooled to one or both of the following files, depending on whether or not a rule is tripped:

-  The file ``/var/ossec/logs/archives/archives.json`` contains all events whether they tripped a rule or not.
-  The file ``/var/ossec/logs/alerts/alerts.json`` contains only events that tripped a rule with high enough priority (the threshold is configurable).

The Wazuh messages protocol uses AES encryption by default, with 128 bits per block and 256-bit keys. Blowfish encryption is optional.

.. note::
   
   Read the `Benefits of using AES in the Wazuh communications <https://wazuh.com/blog/benefits-of-using-aes-in-our-communications>`_ document for more information.

Wazuh server - Wazuh indexer communication
------------------------------------------

The Wazuh server utilizes Filebeat to securely transmit alert and event data to the Wazuh indexer via TLS encryption. Filebeat monitors the output data from the Wazuh server and forwards it to the Wazuh indexer, which, by default, listens on port 9200/TCP. After the data is indexed, it can be analyzed and visualized using the Wazuh dashboard.

Similarly, the Vulnerability Detector module generates alerts and updates the vulnerability inventory, providing ongoing insights into system vulnerabilities.

The Wazuh dashboard queries the Wazuh RESTful API (by default listening on port 55000/TCP on the Wazuh server) to display configuration and status-related information of the :doc:`Wazuh server <components/wazuh-server>` and :doc:`agents <components/wazuh-agent>`. It can also modify agents or server configuration settings through API calls. This communication is encrypted with TLS and authenticated with a username and password.

.. _default_ports:
  
Required ports
--------------

Several services are used for the communication of Wazuh components. Below is the list of default ports used by these services. Users can modify these port numbers when necessary.

+-----------------+-----------+----------------+------------------------------------------------+
|  Component      | Port      | Protocol       | Purpose                                        |
+=================+===========+================+================================================+
|                 | 1514      | TCP (default)  | Agent connection service                       |
+                 +-----------+----------------+------------------------------------------------+
|                 | 1514      | UDP (optional) | Agent connection service (disabled by default) |
+                 +-----------+----------------+------------------------------------------------+
| Wazuh server    | 1515      | TCP            | Agent enrollment service                       |
+                 +-----------+----------------+------------------------------------------------+
|                 | 1516      | TCP            | Wazuh cluster daemon                           |
+                 +-----------+----------------+------------------------------------------------+
|                 | 514       | UDP (default)  | Wazuh Syslog collector (disabled by default)   |
+                 +-----------+----------------+------------------------------------------------+
|                 | 514       | TCP (optional) | Wazuh Syslog collector (disabled by default)   |
+                 +-----------+----------------+------------------------------------------------+
|                 | 55000     | TCP            | Wazuh server RESTful API                       |
+-----------------+-----------+----------------+------------------------------------------------+
|                 | 9200      | TCP            | Wazuh indexer RESTful API                      |
+ Wazuh indexer   +-----------+----------------+------------------------------------------------+
|                 | 9300-9400 | TCP            | Wazuh indexer cluster communication            |
+-----------------+-----------+----------------+------------------------------------------------+
| Wazuh dashboard | 443       | TCP            | Wazuh web user interface                       |
+-----------------+-----------+----------------+------------------------------------------------+

Archival data storage
---------------------

Both alerts and non-alert events are stored in files on the Wazuh server, in addition to being sent to the Wazuh indexer. These files can be written in JSON format (``.json``), or plain text format (``.log``). These files are daily compressed and signed using MD5, SHA1, and SHA256 checksums. The directory and filename structure is as follows:

.. code-block:: bash

   root@wazuh-manager:/var/ossec/logs/archives/2022/Jan# ls -l

.. code-block:: none
   :class: output
  
   total 176
   -rw-r----- 1 wazuh wazuh 234350 Jan  2 00:00 ossec-archive-01.json.gz
   -rw-r----- 1 wazuh wazuh    350 Jan  2 00:00 ossec-archive-01.json.sum
   -rw-r----- 1 wazuh wazuh 176221 Jan  2 00:00 ossec-archive-01.log.gz
   -rw-r----- 1 wazuh wazuh    346 Jan  2 00:00 ossec-archive-01.log.sum
   -rw-r----- 1 wazuh wazuh 224320 Jan  2 00:00 ossec-archive-02.json.gz
   -rw-r----- 1 wazuh wazuh    350 Jan  2 00:00 ossec-archive-02.json.sum
   -rw-r----- 1 wazuh wazuh 151642 Jan  2 00:00 ossec-archive-02.log.gz
   -rw-r----- 1 wazuh wazuh    346 Jan  2 00:00 ossec-archive-02.log.sum
   -rw-r----- 1 wazuh wazuh 315251 Jan  2 00:00 ossec-archive-03.json.gz
   -rw-r----- 1 wazuh wazuh    350 Jan  2 00:00 ossec-archive-03.json.sum
   -rw-r----- 1 wazuh wazuh 156296 Jan  2 00:00 ossec-archive-03.log.gz
   -rw-r----- 1 wazuh wazuh    346 Jan  2 00:00 ossec-archive-03.log.sum

Rotation and backups of archive files are recommended according to the storage capacity of the :doc:`Wazuh server <components/wazuh-server>`. By using cron jobs, you can easily manage to keep only a specific time window of archive files locally on the server, for example, last year or the last three months.

On the other hand, you may choose to dispense with storing archive files and simply rely on the Wazuh indexer for archive storage. This alternative might be preferred if you run periodic Wazuh indexer snapshot backups and/or have a multi-node Wazuh indexer cluster with shard replicas for high availability. You could even use a cron job to move snapshotted indices to a final data storage server and sign them using MD5, SHA1, and SHA256 hashing algorithms.
