.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_dashboard_installation:

.. meta::
  :description: Wazuh is a free, open source, and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Wazuh dashboard
===============

This central component is a flexible and intuitive web interface for mining, analyzing, and visualizing data based on Kibana. It includes out-of-the-box dashboards for security events, detected vulnerable applications, file integrity monitoring data, configuration assessment results, cloud infrastructure monitoring events, regulatory compliance, such as PCI DSS, GDPR, CIS, HIPAA, and NIST 800-53 standards, and other data.

Requirements
------------

Check the supported operating systems and the recommended hardware requirements for the Wazuh interface installation. Make sure that your system environment meets all requirements and that you have root user privileges.

Supported operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh interface can be installed on the following Linux operating systems:

- Amazon Linux 1 and 2

- CentOS 6 or later

- Debian 7 or later

- Fedora 31 or later

- Oracle Linux 6 or later

- Red Hat Enterprise Linux 6 or later

- Ubuntu 12 or later




Hardware requirements
^^^^^^^^^^^^^^^^^^^^^

The Wazuh interface can be installed on a dedicated node or along with the Wazuh indexer. A 64-bit operating system is necessary. 

- Hardware recommendations
                          
  +-------------------------+-------------------------+-------------------------------+
  |                         |  Minimum                |   Recommended                 |
  +-------------------------+----------+--------------+--------------+----------------+
  | Component               |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
  +=========================+==========+==============+==============+================+
  | Wazuh interface         |     4    |     2        |     16       |       8        |
  +-------------------------+----------+--------------+--------------+----------------+



Wazuh interface installation
----------------------------


Choose an installation method to install this Wazuh central component.

- :ref:`Unattended installation <wazuh_dashboard_unattended_installation>`: Install the Wazuh interface by using a script that automates the installation process.  

- :ref:`Step-by-step installation <wazuh_dashboard_step_by_step>`: Install the Wazuh interface manually following detailed step-by-step instructions.



.. toctree::
    :hidden:
    :maxdepth: 1

    Unattended installation <unattended>
    Step-by-step installation <step-by-step>
