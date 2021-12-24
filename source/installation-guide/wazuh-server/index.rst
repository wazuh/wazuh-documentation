.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_server_installation:

.. meta::
  :description: Wazuh is a free, open source, and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Wazuh server
============


The Wazuh server is in charge of analyzing the data received from the Wazuh agents, triggering alerts when threats or anomalies are detected. It is also used to manage the agents' configuration remotely and to monitor their status. If you want to learn more about Wazuh components, check the :doc:`Getting started <../../getting-started/components/index>` section.

You can install Wazuh server on a single host. Alternatively, you can install it distributed in multiple nodes in a cluster configuration. Multi-node configurations provide high availability and improved performance. And if combined with a network load balancer an efficient use of its capacity can be achieved. 

Check the requirements below and choose an installation method to start installing the Wazuh server.

- :ref:`Unattended installation <wazuh_server_unattended>`: You install this component by running a script that automates the installation and configuration process.
 
- :ref:`Step-by-step installation <wazuh_server_step_by_step>`: Install this component manually following detailed step-by-step instructions.


.. thumbnail:: /images/installation/Wazuh-Server-Installation-2.png
    :alt: Wazuh server installation
    :align: center
    :width: 100%

Requirements
------------

Check the supported operating systems and the recommended hardware requirements for the Wazuh server installation. Make sure that your system environment meets all requirements and that you have root user privileges.

.. _supported_operating_systems:

Supported operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh can be installed on a 64-bit Linux operating system. Wazuh supports all the operating systems listed below as well as their later versions:

.. list-table::
   :width: 100%
   :widths: 50 50

   * - Amazon Linux 2
     - CentOS 7
   * - Debian 8 ELTS
     - Fedora Linux 33
   * - openSUSE Tumbleweed, Leap 15.2
     - Oracle Linux 6 Extended
   * - Red Hat Enterprise Linux 6 ELS
     - SUSE Linux enterprise server 11 LTSS
   * - Ubuntu 14.04 ESM
     - 


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

  The amount of data depends on the generated alerts per second (APS). This table details the estimated disk space needed per agent to store 90 days of alerts on a Wazuh server, depending on the type of monitored endpoints.

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
