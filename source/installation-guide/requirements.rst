.. Copyright (C) 2020 Wazuh, Inc.

.. _instalation_requirements:

Requirements
============

This section aims to provide guidance about the hardware requirements for the different types of deployments of Wazuh and Elastic Stack or Open Distro for Elasticsearch.

All-in-one deployment
---------------------

In an All-in-one deployment, Wazuh server and Elastic Stack or Open Distro for Elasticsearch, are installed on the same host. This type of deployment is suitable for testing and small production environments. For a typical environment, this type of configuration is adequate for around 100 agents or less.  

The minimum hardware specifications recommended are 16 GB of RAM and 4 CPU cores. Althought Wazuh can be installed in either a 32-bit or 64-bit operating system, a 64-bit operating system is necessary in this type of deployment because of the requirements of Elastic Stack and Open Distro for Elasticsearch.  

Regarding the disk space, 100 agents are expected to generate around 200 GB of data in 90 days, but depending on the type of monitored endpoints this can vary greatly.

Distributed deployment
----------------------

In a distributed deployment the Wazuh server and the Open Distro for Elasticsearch are installed on separate hosts. This configuration is recommended for productions environments as it provides the high availability and scalability of the services. 

The Wazuh server and the Open Distro for Elasticsearch can each be installed as a single-node or as multi-node cluster. Kibana can either be installed in the same node as Elasticsearch or Open Distro for Elasticsearch, or in a dedicated host. For each node, the minimum hardware recommendations are: 

+--------------------------------+------------+------------+
| Component                      | RAM (GB)   | CPU (cores)|                                                 
+================================+============+============+
| Wazuh server                   |     8      |     4      |
+--------------------------------+------------+------------+
| Elastic Stack                  |     16     |     4      |  
+--------------------------------+------------+------------+
| Open Distro for Elasticsearch  |     16     |     4      |                                         
+--------------------------------+------------+------------+
| Kibana                         |     4      |     2      |                                         
+--------------------------------+------------+------------+

Wazuh servers can be installed in 32-bit or 64-bit operating systems. A 64-bit operating system is necessary for Elastic Stack or Open Distro for Elasticsearch.  

Regarding the disk space, 100 agents are expected to generate around 50 GB of data in a Wazuh server and around 150 GB of data in Elasticsearch or Open Distro for Elasticsearch in a period of 90 days. Depending on the type of monitored endpoints this quantity can vary greatly.

Scaling 
-------

In order to determine if your Wazuh server requires more resources you can monitor the following files: ``/var/ossec/var/run/ossec-analysisd.state``  and  ``/var/ossec/var/run/ossec-remoted.state`` .
In the ``analysid.state`` file the variable  ``events_dropped`` indicates wether events are being dropped due to lack of resources. Similarly ``ossed-remoted.state`` has the variable ``discarded_count``, that indicates if messages from the agents have been discarded.  These two variables should be zero if the environment is working properly. If it is not the case, another node can be added to the cluster. 


