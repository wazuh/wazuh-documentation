.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Check the supported operating systems and the recommended hardware requirements for the different types of deployments of the Wazuh installation.
  
.. _installation_requirements:

Requirements
============

Check the supported operating systems and the recommended hardware requirements for the different types of deployments of the Wazuh installation. Make sure that your system environment meets all requirements and that you have root user privileges.

Supported operating systems
---------------------------

The Wazuh server and Elastic Stack components can be installed in the following Linux operating systems:

* Amazon Linux 2
* CentOS 7 and later
* Debian 8 ELTS and later
* Fedora Linux 31 and later
* openSUSE Tumbleweed, Leap 15.2 and later
* Oracle Linux 6 Extended and later
* Red Hat Enterprise Linux 6 ELS and later
* Ubuntu 14.04 ESM and later

All-in-one deployment
---------------------

In an all-in-one deployment, both the Wazuh server and Elastic Stack are installed on the same host. A typical use case for this kind of environment supports around 100 agents.

The minimum requirements for this type of deployment are 4 GB of RAM and 2 CPU cores, and the recommended are 16 GB of RAM and 8 CPU cores. A 64-bit operating system is required. 

Disk space requirements depend on the alerts per second (APS) generated. The expected APS vary significantly depending on the amount and type of monitored endpoints. Estimated storage per agent needed for 90 days of alerts depending on the type of monitored endpoint:

+-------------------------------------------------+-----+-----------------------------+
| Monitored endpoints                             | APS |  Storage (GB/90 days)       |
+=================================================+=====+=============================+
| Servers                                         | 0.25|    3.8                      |
+-------------------------------------------------+-----+-----------------------------+
| Workstations                                    | 0.1 |    1.5                      |
+-------------------------------------------------+-----+-----------------------------+
| Network devices                                 | 0.5 |    7.6                      |
+-------------------------------------------------+-----+-----------------------------+

For example, for an environment with 80 workstations, 10 servers, and 10 network devices, the storage needed for 90 days of alerts is 236 GB approximately.


Distributed deployment
----------------------

In a distributed deployment, both the Wazuh server and Elastic Stack are installed on separate hosts. This configuration is recommended for environments that require high availability and scalability of the services. 

The Wazuh server and Elastic Stack can both be installed as a single-node or as a multi-node cluster. Kibana can either be installed on the same node as Elasticsearch or on a dedicated host. Hardware recommendations for each node:
                          
+-------------------------+-------------------------+-------------------------------+
|                         |  Minimum                |   Recommended                 |
+-------------------------+----------+--------------+--------------+----------------+
| Component               |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
+=========================+==========+==============+==============+================+
| Wazuh server            |     2    |     2        |      8       |       4        |
+-------------------------+----------+--------------+--------------+----------------+
| Elastic Stack           |     4    |     2        |     16       |       8        |
+-------------------------+----------+--------------+--------------+----------------+


A 64-bit operating system is necessary.

Regarding disk space requirements, the amount of data depends on the alerts per second (APS) generated. Estimated disk space per agent needed to store 90 days of alerts on a Wazuh server and on an Elasticsearch server, depending on the type of monitored endpoints:


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

For example, for an environment with 80 workstations, 10 servers, and 10 network devices, the storage needed for 90 days of alerts is 230 GB on the Elasticsearch server and 6 GB on the Wazuh server approximately. 

Scaling
-------

To determine if a Wazuh server requires more resources, the following files can be monitored:

- ``/var/ossec/var/run/wazuh-analysisd.state``: the variable ``events_dropped`` indicates whether events are being dropped due to lack of resources. 
- ``/var/ossec/var/run/wazuh-remoted.state``: the variable ``discarded_count`` indicates if messages from the agents were discarded.


These two variables should be zero if the environment is working properly. If it is not the case, additional nodes can be added to the cluster. 

To monitor if the Elastic Stack environment is working properly, tools such as the performance analyzer are available.

In case that scaling is needed, a distributed deployment of :ref:`Wazuh with Elastic Stack <distributed_index>` is recommended.
