.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh is a free, open source, and enterprise-ready security monitoring solution for threat detection, file integrity monitoring, incident response and compliance.

Wazuh manager
=============

The Wazuh manager analyzes event data received from Wazuh agents and forwards the processed events to the Wazuh indexer. It is also used to remotely manage the configurations of Wazuh agents and monitor their status.

You can install the Wazuh manager on a single host or distribute it across multiple nodes in a cluster configuration. Multi-node configurations provide high availability and improved performance. When combined with a network load balancer, you can achieve efficient use of its capacity.

Check the requirements below and choose an installation method to start installing the Wazuh manager.

- :doc:`Assisted installation <installation-assistant>`: Install this component by running an assistant that automates the installation and configuration process.
 
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
        <p class="link-boxes-label">Install the Wazuh manager</p>

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

Check the recommended operating systems and hardware requirements for the Wazuh manager installation. Make sure that your system environment meets all requirements and that you have root user privileges.

.. _supported_operating_systems:

Recommended operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh manager requires a 64-bit Intel, AMD, or ARM Linux processor (x86_64/AMD64 or AARCH64/ARM64 architecture). Wazuh recommends the following operating system versions:

.. include:: /_templates/installations/wazuh/recommended-operating-systems.rst

Hardware requirements
^^^^^^^^^^^^^^^^^^^^^

You can install the Wazuh manager as a single-node or multi-node cluster.

- Hardware recommendations
                          
  +-------------------------+-------------------------+-------------------------------+
  |                         |  Minimum                |   Recommended                 |
  +-------------------------+----------+--------------+--------------+----------------+
  | Component               |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
  +=========================+==========+==============+==============+================+
  | Wazuh manager           |     4    |     8        |      8       |       16       |
  +-------------------------+----------+--------------+--------------+----------------+


- Disk space requirements

  The amount of data depends on the generated alerts per second (APS). This table details the estimated disk space needed per agent to store 90 days of alerts on a Wazuh manager, depending on the type of monitored endpoints.

  +-------------------------------------------------+-----+-----------------------------+
  | Monitored endpoints                             | APS || Storage in Wazuh manager   | 
  |                                                 |     || (GB/90 days)               |  
  +=================================================+=====+=============================+
  | Servers                                         | 0.25|    0.1                      |
  +-------------------------------------------------+-----+-----------------------------+
  | Workstations                                    | 0.1 |    0.04                     | 
  +-------------------------------------------------+-----+-----------------------------+
  | Network devices                                 | 0.5 |    0.2                      |
  +-------------------------------------------------+-----+-----------------------------+

  For example, for an environment with 80 workstations, 10 servers, and 10 network devices, the storage needed on the Wazuh manager for 90 days of alerts is 6 GB.

.. toctree::
    :hidden:
    :maxdepth: 1

    Assisted installation <installation-assistant>
    Step-by-step installation <step-by-step>
