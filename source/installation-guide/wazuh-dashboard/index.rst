.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh is a free, open source, and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Wazuh dashboard
===============

This central component is a flexible and intuitive web interface for mining, analyzing, and visualizing data. It provides out-of-the-box dashboards, allowing you to seamlessly navigate through the user interface. 

Users can quickly visualize security events, detect vulnerable applications, file integrity monitoring data, configuration assessment results, cloud infrastructure monitoring events, and regulatory compliance, such as PCI DSS, GDPR, CIS, HIPAA, and NIST 800-53 standards. If you want to learn more about Wazuh components, see the :doc:`Getting started <../../getting-started/components/index>` section.

Check the requirements below and choose an installation method to start installing the Wazuh dashboard.

- :doc:`Wazuh installation assistant <installation-assistant>`: Install this component by running an assistant that automates the installation and configuration process. 

- :doc:`Step-by-step installation <step-by-step>`: Install this component following detailed step-by-step instructions.


.. raw:: html

  <div class="link-boxes-group layout-3" data-step="3">
    <div class="steps-line">
      <div class="steps-number past-step">1</div>
      <div class="steps-number past-step">2</div>
      <div class="steps-number current-step">3</div>
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
  
    <div class="link-boxes-item past-step">
      <a class="link-boxes-link" href="../wazuh-server/index.html">
        <p class="link-boxes-label">Install the Wazuh server</p>

.. image:: ../../images/installation/Server-Circle.png
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>
  
    <div class="link-boxes-item current-step">
      <div class="link-boxes-link" href="#">
        <p class="link-boxes-label">Install the Wazuh dashboard</p>

.. image:: ../../images/installation/Dashboard-Circle.png
     :align: center
     :height: 61px
     
.. raw:: html

      </div>
    </div>
  </div>


Requirements
------------

Check the supported operating systems and the recommended hardware requirements for the Wazuh dashboard installation. Make sure that your system environment meets all requirements and that you have root user privileges.

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

The Wazuh dashboard can be installed on a dedicated node or along with the Wazuh indexer.

- Hardware recommendations
                          
  +-------------------------+-------------------------+-------------------------------+
  |                         |  Minimum                |   Recommended                 |
  +-------------------------+----------+--------------+--------------+----------------+
  | Component               |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
  +=========================+==========+==============+==============+================+
  | Wazuh dashboard         |     4    |     2        |     8        |       4        |
  +-------------------------+----------+--------------+--------------+----------------+

Firewall configuration
^^^^^^^^^^^^^^^^^^^^^^

Configure the host and network firewalls to allow ports mentioned in :doc:`Architecture <getting-started/architecture>`. Disabling the host firewall is not recommended for use in production. It is advised to check the firewall configuration after each service installation to prevent possible cluster problems.



.. toctree::
    :hidden:
    :maxdepth: 1

    Wazuh installation assistant <installation-assistant>
    Step-by-step installation <step-by-step>
