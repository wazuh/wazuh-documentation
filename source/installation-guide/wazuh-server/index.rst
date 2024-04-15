.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh is a free, open source, and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Wazuh server
============

The Wazuh server is in charge of analyzing the data received from the Wazuh agents, triggering alerts when threats or anomalies are detected. It is also used to manage the agents' configuration remotely and to monitor their status. If you want to learn more about Wazuh components, check the :doc:`Getting started <../../getting-started/components/index>` section.

You can install the Wazuh server on a single host. Alternatively, you can install it distributed in multiple nodes in a cluster configuration. Multi-node configurations provide high availability and improved performance. And if combined with a network load balancer an efficient use of its capacity can be achieved. 

Check the requirements below and choose an installation method to start installing the Wazuh server.

- :doc:`Wazuh installation assistant <installation-assistant>`: Install this component by running an assistant that automates the installation and configuration process.
 
- :doc:`Step-by-step installation <step-by-step>`: Install this component following detailed step-by-step instructions.

.. raw:: html

  <div class="link-boxes-group layout-3" data-step="2">
    <div class="steps-line">
      <div class="steps-number past-step">1</div>
      <div class="steps-number current-step">2</div>
      <div class="steps-number future-step">3</div>
    </div>
    <div class="link-boxes-item past-step">
      <a class="link-boxes-link" href="../wazuh-indexer/index.html">
        <p class="link-boxes-label">Install the Wazuh indexer</p>

.. image:: ../../images/installation/Indexer-Circle.png
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>
  
    <div class="link-boxes-item current-step">
      <div class="link-boxes-link" href="#">
        <p class="link-boxes-label">Install the Wazuh server</p>

.. image:: ../../images/installation/Server-Circle.png
     :align: center
     :height: 61px

.. raw:: html

      </div>
    </div>
  
    <div class="link-boxes-item future-step">
      <a class="link-boxes-link" href="../wazuh-dashboard/index.html">
        <p class="link-boxes-label">Install the Wazuh dashboard</p>

.. image:: ../../images/installation/Dashboard-noBG.png
     :align: center
     :height: 61px
     
.. raw:: html

      </a>
    </div>
  </div>

Requirements
------------

Check the supported operating systems and the recommended hardware requirements for the Wazuh server installation. Make sure that your system environment meets all requirements and that you have root user privileges.

.. _supported_operating_systems:

Recommended operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh can be installed on a 64-bit Linux operating system. Wazuh supports the following operating system versions:

.. list-table::
    :width: 100%
   
    * - Amazon Linux 2
      - CentOS 7, 8
    * - Red Hat Enterprise Linux 7, 8, 9
      - Ubuntu 16.04, 18.04, 20.04, 22.04

Hardware requirements
^^^^^^^^^^^^^^^^^^^^^

The Wazuh server can be installed as a single-node or as a multi-node cluster.

- Hardware recommendations
                          
  +-------------------------+-------------------------+-------------------------------+
  |                         |  Minimum                |   Recommended                 |
  +-------------------------+----------+--------------+--------------+----------------+
  | Component               |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
  +=========================+==========+==============+==============+================+
  | Wazuh server            |     2    |     2        |      4       |       8        |
  +-------------------------+----------+--------------+--------------+----------------+


- Disk space requirements

  The amount of data depends on the generated alerts per second (APS). This table details the estimated disk space needed per agent to store 90 days of alerts on a Wazuh server, depending on the type of monitored endpoints.

  +-------------------------------------------------+-----+-----------------------------+
  | Monitored endpoints                             | APS || Storage in Wazuh Manager   | 
  |                                                 |     || (GB/90 days)               |  
  +=================================================+=====+=============================+
  | Servers                                         | 0.25|    0.1                      |
  +-------------------------------------------------+-----+-----------------------------+
  | Workstations                                    | 0.1 |    0.04                     | 
  +-------------------------------------------------+-----+-----------------------------+
  | Network devices                                 | 0.5 |    0.2                      |
  +-------------------------------------------------+-----+-----------------------------+

  For example, for an environment with 80 workstations, 10 servers, and 10 network devices, the storage needed on the Wazuh server for 90 days of alerts is 6 GB.

Firewall configuration
^^^^^^^^^^^^^^^^^^^^^^

Configure the host and network firewalls to allow ports mentioned in :doc:`Architecture <getting-started/architecture>`. Disabling the host firewall is not recommended for use in production. It is advised to check the firewall configuration after each service installation to prevent possible cluster problems.

Scaling
^^^^^^^

To determine if a Wazuh server requires more resources, monitor these files: 

- ``/var/ossec/var/run/wazuh-analysisd.state``: the variable ``events_dropped`` indicates whether events are being dropped due to lack of resources. 
- ``/var/ossec/var/run/wazuh-remoted.state``: the variable ``discarded_count`` indicates if messages from the agents were discarded.


These two variables should be zero if the environment is working properly. If it is not the case, additional nodes can be added to the cluster. 



.. toctree::
    :hidden:
    :maxdepth: 1

    Wazuh installation assistant <installation-assistant>
    Step-by-step installation <step-by-step>
