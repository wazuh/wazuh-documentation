.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_server_installation:

.. meta::
  :description: Wazuh is a free, open source, and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Wazuh server
============

The Wazuh server is in charge of analyzing the data received from the Wazuh agents, triggering alerts when threats or anomalies are detected. It is also used to manage the agents' configuration remotely and to monitor their status. 

This central component can be installed as a single-node or multi-node cluster depending on the environment needs. Small Wazuh deployments, which do not require processing large amounts of data, can easily be handled by a single-node cluster. Multi-node clusters are recommended when there is a large number of monitored endpoints, when a large volume of data is anticipated, or when high availability is required.

You can now choose an installation method and start installing the Wazuh server.

- :ref:`Unattended installation <wazuh_indexer_unattended>`: Install this component by using a script that automates the installation process.  

- :ref:`Step-by-step installation <wazuh_indexer_step_by_step>`: Install this component manually following detailed step-by-step instructions.


.. thumbnail:: /images/installation/Wazuh-Installation-server-2.png
    :alt: Wazuh server installation
    :align: center
    :width: 100%

Requirements
------------

Check the supported operating systems and the recommended hardware requirements for the Wazuh server installation. Make sure that your system environment meets all requirements and that you have root user privileges.

.. _supported_operating_systems:

Supported operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh server can be installed on a 64-bit Linux operating system.

- Amazon Linux 1 and 2

- CentOS 6 or later

- Debian 7 or later

- Fedora 31 or later

- Oracle Linux 6 or later

- Red Hat Enterprise Linux 6 or later

- Ubuntu 12 or later



Hardware requirements
^^^^^^^^^^^^^^^^^^^^^

The Wazuh server can be installed as a single-node or as a multi-node cluster.

- Hardware recommendations
                          
  +-------------------------+-------------------------+-------------------------------+
  |                         |  Minimum                |   Recommended                 |
  +-------------------------+----------+--------------+--------------+----------------+
  | Component               |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
  +=========================+==========+==============+==============+================+
  | Wazuh server            |     2    |     2        |      8       |       4        |
  +-------------------------+----------+--------------+--------------+----------------+


- Disk space requirements

  The amount of data depends on the generated alerts per second (APS). This table details the estimated disk space needed per agent to store 90 days of alerts on an Wazuh server, depending on the type of monitored endpoints.

  +-------------------------------------------------+-----+-----------------------------+
  | Monitored endpoints                             | APS | Storage in Wazuh Manager    | 
  |                                                 |     |  (GB/90 days)               |  
  +=================================================+=====+=============================+
  | Servers                                         | 0.25|    0.1                      |
  +-------------------------------------------------+-----+-----------------------------+
  | Workstations                                    | 0.1 |    0.04                     | 
  +-------------------------------------------------+-----+-----------------------------+
  | Network devices                                 | 0.5 |    0.2                      |
  +-------------------------------------------------+-----+-----------------------------+

  For example, for an environment with 80 workstations, 10 servers, and 10 network devices, the storage needed on the Wazuh server for 90 days of alerts is 6 GB.



Scaling
^^^^^^^

To determine if a Wazuh server requires more resources, monitor these files: 

- ``/var/ossec/var/run/wazuh-analysisd.state``: the variable ``events_dropped`` indicates whether events are being dropped due to lack of resources. 
- ``/var/ossec/var/run/wazuh-remoted.state``: the variable ``discarded_count`` indicates if messages from the agents were discarded.


These two variables should be zero if the environment is working properly. If it is not the case, additional nodes can be added to the cluster. 



.. toctree::
    :hidden:
    :maxdepth: 1

    Unattended installation <unattended>
    Step-by-step installation <step-by-step>
