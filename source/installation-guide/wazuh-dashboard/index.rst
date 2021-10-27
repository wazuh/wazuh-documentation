.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_dashboard_installation:

.. meta::
  :description: Wazuh is a free, open source, and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Kibana
===============

This central component is a flexible and intuitive web interface for mining, analyzing, and visualizing data. It includes out-of-the-box dashboards for security events, detected vulnerable applications, file integrity monitoring data, configuration assessment results, cloud infrastructure monitoring events, regulatory compliance, such as PCI DSS, GDPR, CIS, HIPAA, and NIST 800-53 standards, as well as other data visibility purposes.

You can now choose an installation method and start installing Kibana.

- :ref:`Unattended installation <wazuh_dashboard_unattended_installation>`: Install this component by using a script that automates the installation process.  

- :ref:`Step-by-step installation <wazuh_dashboard_step_by_step>`: Install this component manually following detailed step-by-step instructions.


.. thumbnail:: /images/installation/Wazuh-Installation-dashboard-4.png
    :alt: Kibana installation
    :align: center
    :width: 100%


Requirements
------------

Check the supported operating systems and the recommended hardware requirements for the Kibana installation. Make sure that your system environment meets all requirements and that you have root user privileges.

Supported operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Kibana can be installed on a 64-bit Linux operating system.

.. list-table::
   :width: 50%
   
   * - Amazon Linux 2
   * - CentOS 7 and later
   * - Debian 8 ELTS and later
   * - Fedora Linux 33 and later
   * - openSUSE Tumbleweed, Leap 15.2 and later
   * - Oracle Linux 6 Extended and later
   * - Red Hat Enterprise Linux 6 ELS and later
   * - SUSE Linux enterprise server 11 LTSS and later
   * - Ubuntu 14.04 ESM and later




Hardware requirements
^^^^^^^^^^^^^^^^^^^^^

Kibana can be installed on a dedicated node or along with the Elasticsearch.

- Hardware recommendations
                          
  +-------------------------+-------------------------+-------------------------------+
  |                         |  Minimum                |   Recommended                 |
  +-------------------------+----------+--------------+--------------+----------------+
  | Component               |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
  +=========================+==========+==============+==============+================+
  | Kibana         |     4    |     2        |     16       |       8        |
  +-------------------------+----------+--------------+--------------+----------------+




.. toctree::
    :hidden:
    :maxdepth: 1

    Unattended installation <unattended>
    Step-by-step installation <step-by-step>
