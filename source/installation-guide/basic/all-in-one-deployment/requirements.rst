.. Copyright (C) 2020 Wazuh, Inc.

.. _basic_all_in_one_requirements:

Requirements
============ 

This section aims to provide guidance about the hardware requirements for the different types of deployments of Wazuh and Elastic Stack.

In an All-in-one deployment, Wazuh server and Elastic Stack are installed on the same host. This type of deployment is suitable for testing and small production environments. For a typical environment, this type of configuration is adequate for around 100 agents or less.  

The minimum hardware specifications recommended are: 

+------------+------------+
| RAM (GB)   | CPU (cores)|                                                 
+============+============+
|     16     |     4      |                                         
+------------+------------+

A 64-bit operating system is necessary. 

Regarding the disk space, 100 agents are expected to generate around 200 GB of data in 90 days, but depending on the type of monitored endpoints this can vary greatly.


