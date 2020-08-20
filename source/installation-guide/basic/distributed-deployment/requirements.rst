.. Copyright (C) 2020 Wazuh, Inc.

.. _basic_distributed_requirements:

Requirements
============

This section aims to provide guidance about the hardware requirements for the different types of deployments of Wazuh and Elastic Stack.

In a distributed deployment the Wazuh server and the Elastic Stack are installed on separate hosts. This configuration is recommended for productions environments as it provides the high availability and scalability of the services. 

The Wazuh server and the Elastic Stack can each be installed as a single-node or as multi-node cluster. For each node, the minimum hardware recommendations are: 


+----------------------+------------+------------+
| Component            | RAM (GB)   | CPU (cores)|                                                 
+======================+============+============+
| Wazuh server         |     8      |     4      |                                         
+----------------------+------------+------------+
| Elastic Stack        |     16     |     4      |                                         
+----------------------+------------+------------+

Wazuh servers can be installed in 32-bit or 64-bit operating systems. A 64-bit operating system is necessary for Elastic Stack.  

Regarding the disk space, 100 agents are expected to generate around 200 GB of data in 90 days, but depending on the type of monitored endpoints this can vary greatly.
