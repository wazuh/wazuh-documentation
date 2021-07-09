.. Copyright (C) 2021 Wazuh, Inc.

.. _central_components:

.. meta::
  :description: Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.

Central components
==================

.. thumbnail:: ../../images/installation/Installation_workflow.png
  :title: Wazuh installation workflow
  :align: center
  :width: 100%


You can install all the central components on the same server, as an all-in-one deployment, or on different servers as a distributed deployment that provides high availability and scalability of the product. 

Install the Wazuh components in the following order.  

#. :ref:`Wazuh indexer <wazuh_indexer_installation>`: A highly scalable, full-text search and analytics engine based on Open Distro for Elasticsearch.
    
    The Wazuh indexer can be installed as a single-node or a multi-node cluster. Select an installation method, unattended or step-by-step and follow the instructions. 

    During the installation of the Wazuh indexer, the Wazuh certificates tool is used to create certificates to encrypt the communications between the different Wazuh central components, these certificates must be distributed to all the servers in the Wazuh installation. 
    
    Random passwords will also be generated for the system's users. 

#. :ref:`Wazuh server <wazuh_server_installation>`:  Is in charge of analyzing the data received from the Wazuh agents, triggering alerts when threats or anomalies are detected. It is also used to manage the agents' configuration remotely and to monitor their status. 

   It includes the Wazuh manager and the Wazuh forwarder, based on Filebeat-OSS. Select an installation method, unattended or step-by-step, and follow the instructions. 

   The Wazuh server can be deployed as a single or multi-node cluster depending on the environment needs. 

#. :ref:`Wazuh interface <wazuh_interface_installation>`: A flexible and intuitive web interface for mining, analyzing, and visualizing data based on Open Distro for Elasticsearch Kibana. It includes out-of-the-box dashboards for security events, regulatory compliance (e.g. PCI DSS, GDPR, CIS, HIPAA, NIST 800-53), detected vulnerable applications, file integrity monitoring data, configuration assessment results, cloud infrastructure monitoring events, and others.

    Select an installation method, unattended or step-by-step, and follow the instructions. 

After these steps, your Wazuh server is ready to use and you can deploy :ref:`Wazuh agents <installation_agents>` on the endpoints you wish to monitor.  

.. _installation_requirements:

Requirements
------------

Check the supported operating systems and the recommended hardware requirements for the different types of deployments of the Wazuh installation. Make sure that your system environment meets all requirements and that you have root user privileges.

Supported operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh central components can be installed in the following Linux operating systems:

- Amazon Linux 1 and 2

- CentOS 6 or later

- Debian 7 or later

- Fedora 31 or later

- Oracle Linux 6 or later

- Red Hat Enterprise Linux 6 or later

- Ubuntu 12 or later


All-in-one deployment
^^^^^^^^^^^^^^^^^^^^^

In an all-in-one deployment, all Wazuh central components are installed on the same host. A typical use case for this kind of environment supports around 100 agents.

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
^^^^^^^^^^^^^^^^^^^^^^

In a distributed deployment, both the Wazuh server and the Wazuh indexer are installed on separate hosts. This configuration is recommended for environments that require high availability and scalability of the services. 

The Wazuh server and the Wazuh indexer can both be installed as a single-node or as a multi-node cluster. The Wazuh interface can either be installed on the same node as the Wazuh indexer or on a dedicated host. Hardware recommendations for each node:
                          
+-------------------------+-------------------------+-------------------------------+
|                         |  Minimum                |   Recommended                 |
+-------------------------+----------+--------------+--------------+----------------+
| Component               |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
+=========================+==========+==============+==============+================+
| Wazuh server            |     2    |     2        |      8       |       4        |
+-------------------------+----------+--------------+--------------+----------------+
| Wazuh indexer           |     4    |     2        |     16       |       8        |
+-------------------------+----------+--------------+--------------+----------------+


A 64-bit operating system is necessary.

Regarding disk space requirements, the amount of data depends on the alerts per second (APS) generated. Estimated disk space per agent needed to store 90 days of alerts on a Wazuh server and on an Wazuh indexer server, depending on the type of monitored endpoints:


+-------------------------------------------------+-----+-----------------------------+---------------------------+
| Monitored endpoints                             | APS | Storage in Wazuh Manager    | Storage in Wazuh indexer  |
|                                                 |     |  (GB/90 days)               |  (GB/90 days)             |
+=================================================+=====+=============================+===========================+
| Servers                                         | 0.25|    0.1                      |           3.7             |
+-------------------------------------------------+-----+-----------------------------+---------------------------+
| Workstations                                    | 0.1 |    0.04                     |           1.5             |
+-------------------------------------------------+-----+-----------------------------+---------------------------+
| Network devices                                 | 0.5 |    0.2                      |           7.4             |
+-------------------------------------------------+-----+-----------------------------+---------------------------+

For example, for an environment with 80 workstations, 10 servers, and 10 network devices, the storage needed for 90 days of alerts is 230 GB on the Wazuh indexer server and 6 GB on the Wazuh server approximately. 

Scaling
^^^^^^^

To determine if a Wazuh server requires more resources, the following files can be monitored:

- ``/var/ossec/var/run/wazuh-analysisd.state``: the variable ``events_dropped`` indicates whether events are being dropped due to lack of resources. 
- ``/var/ossec/var/run/wazuh-remoted.state``: the variable ``discarded_count`` indicates if messages from the agents were discarded.


These two variables should be zero if the environment is working properly. If it is not the case, additional nodes can be added to the cluster. 

  .. toctree::
      :hidden:
      :maxdepth: 2

      wazuh-indexer/index
      wazuh-server/index
      wazuh-interface/index