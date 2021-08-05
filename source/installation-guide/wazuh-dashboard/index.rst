.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_dashboard_installation:

.. meta::
  :description: Wazuh is a free, open source, and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Wazuh dashboard
===============

This central component is a flexible and intuitive web interface for mining, analyzing, and visualizing data based on Kibana. It includes out-of-the-box dashboards for security events, detected vulnerable applications, file integrity monitoring data, configuration assessment results, cloud infrastructure monitoring events, regulatory compliance, such as PCI DSS, GDPR, CIS, HIPAA, and NIST 800-53 standards, and other data.

You can now choose an installation method and start installing the Wazuh server.

- :ref:`Unattended installation <wazuh_indexer_unattended>`: Install this component by using a script that automates the installation process.  

- :ref:`Step-by-step installation <wazuh_indexer_step_by_step>`: Install this component manually following detailed step-by-step instructions.


.. thumbnail:: /images/installation/Wazuh-Installation-dashboard-3.png
    :alt: Wazuh dashboard installation
    :align: center
    :width: 100%


Requirements
------------

Check the supported operating systems and the recommended hardware requirements for the Wazuh dashboard installation. Make sure that your system environment meets all requirements and that you have root user privileges.

Supported operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh dashboard can be installed on a 64-bit Linux operating system.

- Amazon Linux 1 and 2

- CentOS 6 or later

- Debian 7 or later

- Fedora 31 or later

- Oracle Linux 6 or later

- Red Hat Enterprise Linux 6 or later

- Ubuntu 12 or later




Hardware requirements
^^^^^^^^^^^^^^^^^^^^^

The Wazuh dashboard can be installed on a dedicated node or along with the Wazuh indexer.

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
