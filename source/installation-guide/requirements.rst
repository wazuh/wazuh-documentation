.. Copyright (C) 2021 Wazuh, Inc.

.. _installation_requirements:

Requirements
============

This section provides guidance on the supported operating systems, as well as the recommended hardware requirements for the different types of deployments of the Wazuh installation.

Supported operating systems
---------------------------

The Wazuh server and Elastic Stack components can be installed in the following Linux operating systems:

- Amazon Linux 1 and 2.

- CentOS 6 or greater.

- Debian 7 or greater.

- Fedora 31 or greater.

- Oracle Linux 6 or greater.

- Red Hat Enterprise Linux 6 or greater.

- Arch Linux rolling release.

- Ubuntu 12 or greater.


All-in-one deployment
---------------------

In an all-in-one deployment, both the Wazuh server and Elastic Stack are installed on the same host. This type of deployment is suitable for testing and small production environments. A typical use case for this kind of environment supports around 100 agents.

The minimum requirements for this type of deployment are 4 GB of RAM and 2 CPU cores, and the recommended are 16 GB of RAM and 8 CPU cores. A 64-bit operating system is required. 

Disk space requirements depend on the alerts per second (APS) generated. The expected APS vary significantly depending on the amount and type of monitored endpoints. The following table provides an estimate of the storage per agent needed for 90 days of alerts depending on the type of monitored endpoint.

+-------------------------------------------------+-----+-----------------------------+
| Monitored endpoints                             | APS |  Storage (GB/90 days)       |
+=================================================+=====+=============================+
| Servers                                         | 0.25|    3.8                      |
+-------------------------------------------------+-----+-----------------------------+
| Workstations                                    | 0.1 |    1.5                      |
+-------------------------------------------------+-----+-----------------------------+
| Network devices                                 | 0.5 |    7.6                      |
+-------------------------------------------------+-----+-----------------------------+

For example, for an environment with 80 workstations, 10 servers and 10 network devices the storage needed for 90 days of alerts would be around 236 GB.


Distributed deployment
----------------------

In a distributed deployment, both the Wazuh server and Elastic Stack are installed on separate hosts. This configuration is recommended for production environments as it provides the high availability and scalability of the services. 


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

Regarding the disk space requirements, the amount of data depends on the alerts per second (APS) generated. The following table shows an estimate of disk space per agent needed to store 90 days of alerts on a Wazuh server as well as on an Elasticsearch server depending on the type of monitored endpoints.


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

For example, for an environment with 80 workstations, 10 servers and 10 network devices the storage needed for 90 days of alerts would be around 230 GB on the Elasticsearch server and 6 GB on the Wazuh server. 

Scaling
-------

In order to determine if a Wazuh server requires more resources, the following files may be monitored: ``/var/ossec/var/run/ossec-analysisd.state``  and  ``/var/ossec/var/run/ossec-remoted.state`` .

In the ``analysid.state`` file the variable  ``events_dropped`` indicates whether events are being dropped due to lack of resources. Similarly, ``ossec-remoted.state`` has the variable ``discarded_count``, that indicates if messages from the agents have been discarded.  These two variables should be zero if the environment is working properly. If it is not the case, additional nodes can be added to the cluster. 

To monitor if the Elastic Stack environment is working properly, tools such as the performance analyzer are available.

In case that scaling is needed, the following sections describe how to make a distributed deployment of :ref:`Wazuh with Elastic Stack <distributed_index>`.



