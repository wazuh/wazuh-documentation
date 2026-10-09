.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Install the Wazuh manager, which analyzes event data from Wazuh agents, forwards it to the Wazuh indexer, and remotely manages agent configurations.

Wazuh manager
=============

The Wazuh manager analyzes event data received from Wazuh agents and forwards the processed events to the Wazuh indexer. It is also used to remotely manage the configurations of Wazuh agents and monitor their status. If you want to learn more about the Wazuh components, check the :doc:`Getting started </getting-started/index>` section.

You can install the Wazuh manager on a single host or distribute it across multiple nodes in a cluster configuration. Multi-node configurations provide high availability and improved performance. When combined with a network load balancer, you can achieve efficient use of its capacity.

Check the requirements below and choose an installation method to start installing the Wazuh manager.

-  :doc:`Assisted installation <installation-assistant>`: Install this component by running an assistant that automates the installation and configuration process.

-  :doc:`Step-by-step installation <step-by-step>`: Install this component following detailed step-by-step instructions.

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
     :alt: Wazuh indexer logo
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>
  
    <div class="link-boxes-item current-step">
      <div class="link-boxes-link" href="#">
        <p class="link-boxes-label">Install the Wazuh manager</p>

.. image:: ../../images/installation/Server-Circle.png
     :alt: Wazuh manager logo
     :align: center
     :height: 61px

.. raw:: html

      </div>
    </div>
  
    <div class="link-boxes-item future-step">
      <a class="link-boxes-link" href="../wazuh-dashboard/index.html">
        <p class="link-boxes-label">Install the Wazuh dashboard</p>

.. image:: ../../images/installation/Dashboard-noBG.png
     :alt: Wazuh dashboard logo
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

-  Hardware requirements for each node:

   +-------------------------+-------------------------+-------------------------------+
   |                         |  Minimum                |   Recommended                 |
   +-------------------------+----------+--------------+--------------+----------------+
   | Component               |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
   +=========================+==========+==============+==============+================+
   | Wazuh manager           |     8    |     4        |     16       |       8        |
   +-------------------------+----------+--------------+--------------+----------------+

-  Disk space requirements

   The Wazuh manager no longer stores alerts from monitored endpoints. Instead, it stores the content and databases required by its server-side modules. Because the Vulnerability Scanner feed requires at least 15 GB of storage, Wazuh recommends allocating at least 20 GB of disk space for a Wazuh manager.

.. _wazuh_manager_required_ports:

Required ports
^^^^^^^^^^^^^^

The Wazuh manager uses the following ports.

+--------------------+-----------------------------------------------------------------------------------+--------------------------------------------+
| Port               | From                                                                              | Purpose                                    |
+====================+===================================================================================+============================================+
| 1517/TCP           | Wazuh 5.x agents, load balancer                                                   | Agent enrollment and connection over HTTPS |
+--------------------+-----------------------------------------------------------------------------------+--------------------------------------------+
| 1516/TCP           | Other Wazuh manager nodes                                                         | Cluster communication, multi-node only     |
+--------------------+-----------------------------------------------------------------------------------+--------------------------------------------+
| 55000/TCP          | Wazuh dashboard, API clients, and agents removing themselves under anti-tampering | Wazuh manager API, master node             |
+--------------------+-----------------------------------------------------------------------------------+--------------------------------------------+
| 1514/TCP           | Wazuh 4.x agents                                                                  | Legacy agent connection                    |
+--------------------+-----------------------------------------------------------------------------------+--------------------------------------------+
| 1515/TCP           | Wazuh 4.x agents                                                                  | Legacy enrollment                          |
+--------------------+-----------------------------------------------------------------------------------+--------------------------------------------+
| 9200/TCP, outbound | This Wazuh manager                                                                | Connection to the Wazuh indexer            |
+--------------------+-----------------------------------------------------------------------------------+--------------------------------------------+

If no Wazuh 4.x agents connect to this Wazuh manager, you can keep 1514 and 1515 closed. You can also disable them in ``/var/wazuh-manager/etc/wazuh-manager.conf`` with ``<remote><legacy><enabled>`` and ``<auth><disabled>``.

.. _wazuh_manager_agent_connection_address:

Agent connection address
^^^^^^^^^^^^^^^^^^^^^^^^

Agents connect to the Wazuh manager only through an address in its agent listener certificate, and you can create enrollment tokens only for those addresses. The certificates include each Wazuh manager node's name and its ``ip`` and ``dns`` values from ``config.yml``. To add any other address, such as a load balancer, a NAT address, or a public name, use ``-as <ALTERNATE_ADDRESS>`` when you create the certificates. For a cluster behind a load balancer, use a TCP passthrough load balancer on 1517/TCP and add its address with ``-as``.

.. toctree::
   :hidden:
   :maxdepth: 1

   Assisted installation <installation-assistant>
   Step-by-step installation <step-by-step>
