.. Copyright (C) 2020 Wazuh, Inc.

.. _installation_requirements:


Requirements
============

This section aims to provide guidance about the supported operating systems as well as the minimum hardware requirements  for the different types of deployments of Wazuh and Open Distro for Elasticsearch or Elastic Stack.

Supported operating systems
---------------------------

The Wazuh server and Open Distro for Elasticsearch or Elastic Stack components can be installed in the following Linux operating systems:

- Amazon Linux 1 and 2.

- CentOS 6 or greater.

- Debian 7 or greater.

- Fedora 22 or greater.

- Oracle Linux 6 or greater.

- Red Hat Enterprise Linux 6 or greater.

- Ubuntu 12 or greater.


All-in-one deployment
---------------------

In an all-in-one deployment, Wazuh server and Open Distro for Elasticsearch or Elastic Stack, are installed on the same host. This type of deployment is suitable for testing and small production environments. A typical use case for this type of environment supports around 100 agents.  

The minimum hardware specifications recommended are 16 GB of RAM and 4 CPU cores. A 64-bit operating system is necessary for this type of deployment due to the requirements of Open Distro for Elasticsearch and Elastic Stack. 

Disk space requirements depend on the alerts per seconds (APS) generated. The expected APS vary greatly depending on the amount and type of monitored endpoints, the following table provides an estimate of the storage per agent needed for 90 days of alerts depending on the type of endpoint.

+-------------------------------------------------+-----+-----------------------------+
| Monitored endpoints                             | APS |  Storage (GB/90 days)       | 
+=================================================+=====+=============================+
| Servers                                         | 0.25|    3.8                      |     
+-------------------------------------------------+-----+-----------------------------+
| Workstations                                    | 0.1 |    1.5                      |                   
+-------------------------------------------------+-----+-----------------------------+       
| Network devices                                 | 0.5 |    7.6                      |
+-------------------------------------------------+-----+-----------------------------+


Distributed deployment
----------------------

In a distributed deployment, the Wazuh server and Open Distro for Elasticsearch or Elastic Stack are installed on separate hosts. This configuration is recommended for production environments as it provides the high availability and scalability of the services. 

The Wazuh server and the Open Distro for Elasticsearch or Elastic Stack can each be installed as a single-node or as multi-node cluster. Kibana can either be installed in the same node as Open Distro for Elasticsearch or Elasticsearch, or in a dedicated host. For each node, the minimum hardware recommendations are: 

+-------------------------------------------------+------------+------------+
| Component                                       | RAM (GB)   | CPU (cores)|
+=================================================+============+============+
| Wazuh server                                    |     8      |     4      |
+-------------------------------------------------+------------+------------+
| Open Distro for Elasticsearch / Elastic Stack   |     16     |     4      |  
+-------------------------------------------------+------------+------------+       
| Kibana                                          |     4      |     2      |                                         
+-------------------------------------------------+------------+------------+

A 64-bit operating system is necessary for Open Distro for Elasticsearch or Elastic Stack.  

Regarding the disk space requirements, the amount of data depends on the alerts per seconds (APS) generated. The following table shows an estimate of disk space per agent needed to store 90 days of alerts on a Wazuh server as well as on an Elasticsearch server depending on the type of monitored endpoints. 


+-------------------------------------------------+-----+-----------------------------+---------------------------+
| Monitored endpoints                             | APS | Storage in Wazuh Manager    | Storage in Elasticsearch  |
|                                                 |     |  (GB/90 days)               |  (GB/90 days)             | 
+=================================================+=====+=============================+===========================+
| Servers                                         | 0.25|    0.1                      |           3.7             |       
+-------------------------------------------------+-----+-----------------------------+---------------------------+
| Workstations                                    | 0.1 |    0.04                     |           1.5             |                    
+-------------------------------------------------+-----+-----------------------------+---------------------------+       
| Network devices                                 | 0.5 |    0.2                      |           7.4             |
+-------------------------------------------------+-----+-----------------------------+---------------------------+


Scaling 
-------

In order to determine if a Wazuh server requires more resources the following files may be monitored: ``/var/ossec/var/run/ossec-analysisd.state``  and  ``/var/ossec/var/run/ossec-remoted.state`` .

In the ``analysid.state`` file the variable  ``events_dropped`` indicates whether events are being dropped due to lack of resources. Similarly ``ossec-remoted.state`` has the variable ``discarded_count``, that indicates if messages from the agents have been discarded.  These two variables should be zero if the environment is working properly. If it is not the case, additional nodes can be added to the cluster. 

To monitor if the Open Distro for Elasticsearch or the Elastic Stack environment is working properly, there are tools available like performance analyzer for Open Distro for Elasticsearch and cluster monitoring for Elastic Stack. 

In case that scaling is needed, the following sections describe how to make a distributed deployment with the selected configuration: :ref:`Wazuh and Open Distro for Elasticsearch <distributed_index>` or :ref:`Wazuh and Elastic Stack  <basic_distributed_index>`.  



