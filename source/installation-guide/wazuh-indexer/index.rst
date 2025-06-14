.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh indexer indexes and stores alerts generated by the Wazuh server and provides near real-time data search and analytics capabilities.

Wazuh indexer
=============


The Wazuh indexer is a highly scalable, full-text search and analytics engine. This Wazuh central component indexes and stores alerts generated by the Wazuh server and provides near real-time data search and analytics capabilities. If you want to learn more about the Wazuh components, check the :doc:`Getting started <../../getting-started/components/index>` section.

You can install the Wazuh indexer on a single host. Alternatively, you can install it distributed in multiple nodes, in a cluster configuration. This provides scalability, high availability, and improved performance. 

Check the requirements below and choose an installation method to start installing the Wazuh indexer.

- :doc:`Assisted installation <installation-assistant>`: Install this component by running an assistant that automates the installation and configuration process.

- :doc:`Step-by-step installation <step-by-step>`: Install this component following detailed step-by-step instructions.

.. raw:: html

  <div class="link-boxes-group layout-3" data-step="1">
    <div class="steps-line">
      <div class="steps-number current-step">1</div>
      <div class="steps-number future-step">2</div>
      <div class="steps-number future-step">3</div>
    </div>
    <div class="link-boxes-item current-step">
      <div class="link-boxes-link" href="#">
        <p class="link-boxes-label">Install the Wazuh indexer</p>

.. image:: ../../images/installation/Indexer-Circle.png
     :align: center
     :height: 61px

.. raw:: html

      </div>
    </div>
  
    <div class="link-boxes-item future-step">
      <a class="link-boxes-link" href="../wazuh-server/index.html">
        <p class="link-boxes-label">Install the Wazuh server</p>

.. image:: ../../images/installation/Server-noBG.png
     :align: center
     :height: 61px

.. raw:: html

      </a>
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

Check the supported operating systems and the recommended hardware requirements for the Wazuh indexer installation. Make sure that your system environment meets all requirements and that you have root user privileges.

Recommended operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh indexer requires a 64-bit Intel, AMD, or ARM Linux processor (x86_64/AMD64 or AARCH64/ARM64 architecture) to run. Wazuh supports the following operating system versions:

.. include:: /_templates/installations/wazuh/recommended-operating-systems.rst

Hardware recommendations
^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh indexer can be installed as a single-node or as a multi-node cluster.

- Hardware recommendations for each node
                          
  +-------------------------+-------------------------+-------------------------------+
  |                         |  Minimum                |   Recommended                 |
  +-------------------------+----------+--------------+--------------+----------------+
  | Component               |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
  +=========================+==========+==============+==============+================+
  | Wazuh indexer           |     4    |     2        |     16       |       8        |
  +-------------------------+----------+--------------+--------------+----------------+


- Disk space requirements

  The amount of data depends on the generated alerts per second (APS). This table details the estimated disk space needed per agent to store 90 days of alerts on a Wazuh indexer server, depending on the type of monitored endpoints.

  +-------------------------------------------------+-----+---------------------------+
  | Monitored endpoints                             | APS || Storage in Wazuh indexer |
  |                                                 |     || (GB/90 days)             |
  +=================================================+=====+===========================+
  | Servers                                         | 0.25|           3.7             |
  +-------------------------------------------------+-----+---------------------------+
  | Workstations                                    | 0.1 |           1.5             |
  +-------------------------------------------------+-----+---------------------------+
  | Network devices                                 | 0.5 |           7.4             |
  +-------------------------------------------------+-----+---------------------------+

  For example, for an environment with 80 workstations, 10 servers, and 10 network devices, the storage needed on the Wazuh indexer server for 90 days of alerts is 230 GB. 



.. toctree::
    :hidden:
    :maxdepth: 1

    Assisted installation <installation-assistant>
    Step-by-step installation <step-by-step>
