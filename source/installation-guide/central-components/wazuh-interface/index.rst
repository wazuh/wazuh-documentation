.. Copyright (C) 2021 Wazuh, Inc.

.. _wazuh_interface_installation:

.. meta::
  :description: Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.


Wazuh interface
===============

A flexible and intuitive web interface for mining, analyzing, and visualizing data based on Kibana. It includes out-of-the-box dashboards for security events, regulatory compliance (e.g. PCI DSS, GDPR, CIS, HIPAA, NIST 800-53), detected vulnerable applications, file integrity monitoring data, configuration assessment results, cloud infrastructure monitoring events, and others.

Requirements
------------

Check the supported operating systems and the recommended hardware requirements for the Wazuh interface installation. Make sure that your system environment meets all requirements and that you have root user privileges.

Supported operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh interface can be installed in the following Linux operating systems:

- Amazon Linux 1 and 2

- CentOS 6 or later

- Debian 7 or later

- Fedora 31 or later

- Oracle Linux 6 or later

- Red Hat Enterprise Linux 6 or later

- Ubuntu 12 or later




Hardware recommendations
^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh interface can be installed on a dedicated node or along with the Wazuh indexer. Hardware recommendations are:
                          
+-------------------------+-------------------------+-------------------------------+
|                         |  Minimum                |   Recommended                 |
+-------------------------+----------+--------------+--------------+----------------+
| Component               |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
+=========================+==========+==============+==============+================+
| Wazuh interface         |     4    |     2        |     16       |       8        |
+-------------------------+----------+--------------+--------------+----------------+


A 64-bit operating system is necessary.


Wazuh interface installation
--------------------------


Choose between two installation methods:

- :ref:`Unattended installation <wazuh_interface_unattended_installation>`: Install the Wazuh interface by using a script that automates the installation process.  

- :ref:`Step-by-step installation <wazuh_interface_step_by_step>`: Install the Wazuh interface manually following detailed step-by-step instructions.



.. toctree::
    :hidden:
    :maxdepth: 1

    Unattended installation <unattended>
    Step-by-step installation <step-by-step>
