.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_dashboard_installation:

.. meta::
  :description: Wazuh is a free, open source, and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Wazuh dashboard
===============

This central component is a flexible and intuitive web interface for mining, analyzing, and visualizing data. It provides out-of-the-box dashboards, allowing you to seamlessly navigate through the user interface. 

Users can quickly visualize security events, detect vulnerable applications, file integrity monitoring data, configuration assessment results, cloud infrastructure monitoring events, and regulatory compliance, such as PCI DSS, GDPR, CIS, HIPAA, and NIST 800-53 standards. If you want to learn more about Wazuh components, check the :doc:`Getting started <../../getting-started/components/index>` section.

Check the requirements below and choose an installation method to start installing Wazuh dashboard.

- :ref:`Unattended installation <wazuh_dashboard_unattended_installation>`: You install this component by running a script that automates the installation and configuration process. 

- :ref:`Step-by-step installation <wazuh_dashboard_step_by_step>`: Install this component manually following detailed step-by-step instructions.


.. thumbnail:: /images/installation/Wazuh-Dashboard-Installation-3.png
    :alt: Wazuh dashboard installation
    :align: center
    :width: 100%


Requirements
------------

Check the supported operating systems and the recommended hardware requirements for the Wazuh dashboard installation. Make sure that your system environment meets all requirements and that you have root user privileges.

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

Wazuh dashboard can be installed on a dedicated node or along with Wazuh indexer.

- Hardware recommendations
                          
  +-------------------------+-------------------------+-------------------------------+
  |                         |  Minimum                |   Recommended                 |
  +-------------------------+----------+--------------+--------------+----------------+
  | Component               |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
  +=========================+==========+==============+==============+================+
  | Wazuh dashboard         |     4    |     2        |     16       |       8        |
  +-------------------------+----------+--------------+--------------+----------------+




.. toctree::
    :hidden:
    :maxdepth: 1

    Unattended installation <unattended>
    Step-by-step installation <step-by-step>
