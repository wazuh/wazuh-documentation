.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find the packages required for Wazuh installation on this page. Available for Linux, macOS, and Windows.

Packages list
=============

This download page contains packages required for the Wazuh installation.

Wazuh indexer
-------------

.. |Indexer_x86_64_RPM| replace:: `wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_x64_RPM|.rpm <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/yum/wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_x64_RPM|.rpm>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_x64_RPM|.rpm.sha512>`__)
.. |Indexer_AARCH64_RPM| replace:: `wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_AARCH64_RPM|.rpm <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/yum/wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_AARCH64_RPM|.rpm>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_AARCH64_RPM|.rpm.sha512>`__)
.. |Indexer_AMD64_DEB| replace:: `wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_x64_DEB|.deb <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-indexer/wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_x64_DEB|.deb>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_x64_DEB|.deb.sha512>`__)
.. |Indexer_ARM64_DEB| replace:: `wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_ARM64_DEB|.deb <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-indexer/wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_ARM64_DEB|.deb>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_ARM64_DEB|.deb.sha512>`__)

+--------------+--------------+---------------------------+
| Package type | Architecture | Package                   |
+==============+==============+===========================+
|     RPM      |    x86_64    | |Indexer_x86_64_RPM|      |
|              +--------------+---------------------------+
|              |    aarch64   | |Indexer_AARCH64_RPM|     |
+--------------+--------------+---------------------------+
|     DEB      |    amd64     | |Indexer_AMD64_DEB|       |
|              +--------------+---------------------------+
|              |    arm64     | |Indexer_ARM64_DEB|       |
+--------------+--------------+---------------------------+

Wazuh server
------------

Wazuh manager
^^^^^^^^^^^^^

.. |Amazon_x86_64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm.sha512>`__)

.. |CentOS7_x86_64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm.sha512>`__)

.. |Debian8_x86_64_manager| replace:: `wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_amd64.deb <|DEB_MANAGER_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_amd64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_amd64.deb.sha512>`__)

.. |Fedora22_x86_64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm.sha512>`__)

.. |OpenSUSE_x86_64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm.sha512>`__)

.. |Oracle7_x86_64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm.sha512>`__)

.. |RHEL7_x86_64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm.sha512>`__)

.. |SUSE12_x86_64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm.sha512>`__)

.. |Ubuntu13_x86_64_manager| replace:: `wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_amd64.deb <|DEB_MANAGER_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_amd64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_amd64.deb.sha512>`__)

.. |Amazon_aarch64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm.sha512>`__)

.. |CentOS7_aarch64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm.sha512>`__)

.. |Debian8_aarch64_manager| replace:: `wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_arm64.deb <|DEB_MANAGER_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_arm64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_arm64.deb.sha512>`__)

.. |Fedora22_aarch64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm.sha512>`__)

.. |OpenSUSE_aarch64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm.sha512>`__)

.. |Oracle7_aarch64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm.sha512>`__)

.. |RHEL7_aarch64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm.sha512>`__)

.. |SUSE12_aarch64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.aarch64.rpm.sha512>`__)

.. |Ubuntu13_aarch64_manager| replace:: `wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_arm64.deb <|DEB_MANAGER_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_arm64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_arm64.deb.sha512>`__)

.. |Raspbian_aarch64_manager| replace:: `wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_arm64.deb <|DEB_MANAGER_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_arm64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_arm64.deb.sha512>`__)

+-----------------------+-------------------+--------------+------------------------------------------+
| Distribution          | Version           | Architecture | Package                                  |
+=======================+===================+==============+==========================================+
|                       |                   |    x86_64    | |Amazon_x86_64_manager|                  |
+ Amazon Linux          +  1 and later      +--------------+------------------------------------------+
|                       |                   |    aarch64   | |Amazon_aarch64_manager|                 |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |                   |    x86_64    | |CentOS7_x86_64_manager|                 |
+ CentOS                +  7 and later      +--------------+------------------------------------------+
|                       |                   |    aarch64   | |CentOS7_aarch64_manager|                |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |                   |    x86_64    | |Debian8_x86_64_manager|                 |
+ Debian                +  8 and later      +--------------+------------------------------------------+
|                       |                   |    aarch64   | |Debian8_aarch64_manager|                |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |                   |    x86_64    | |Fedora22_x86_64_manager|                |
+ Fedora                +  22 and later     +--------------+------------------------------------------+
|                       |                   |    aarch64   | |Fedora22_aarch64_manager|               |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |                   |    x86_64    | |OpenSUSE_x86_64_manager|                |
+ OpenSUSE              +  42 and later     +--------------+------------------------------------------+
|                       |                   |    aarch64   | |OpenSUSE_aarch64_manager|               |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |                   |    x86_64    | |Oracle7_x86_64_manager|                 |
+ Oracle Linux          +  7 and later      +--------------+------------------------------------------+
|                       |                   |    aarch64   | |Oracle7_aarch64_manager|                |
+-----------------------+-------------------+--------------+------------------------------------------+
| Red Hat               |                   |    x86_64    | |RHEL7_x86_64_manager|                   |
+ Enterprise Linux      +  7 and later      +--------------+------------------------------------------+
|                       |                   |    aarch64   | |RHEL7_aarch64_manager|                  |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |                   |    x86_64    | |SUSE12_x86_64_manager|                  |
+ SUSE                  +  12               +--------------+------------------------------------------+
|                       |                   |    aarch64   | |SUSE12_aarch64_manager|                 |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |                   |    x86_64    | |Ubuntu13_x86_64_manager|                |
+ Ubuntu                +  13 and later     +--------------+------------------------------------------+
|                       |                   |    aarch64   | |Ubuntu13_aarch64_manager|               |
+-----------------------+-------------------+--------------+------------------------------------------+
| Raspbian OS           | Buster and later  |    aarch64   | |Raspbian_aarch64_manager|               |
+-----------------------+-------------------+--------------+------------------------------------------+

Filebeat
^^^^^^^^

.. |Filebeat_x86_64_RPM| replace:: `filebeat-|FILEBEAT_LATEST|-|FILEBEAT_CURRENT_REV|.x86_64.rpm <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/yum/filebeat-|FILEBEAT_LATEST|-|FILEBEAT_CURRENT_REV|.x86_64.rpm>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/elasticsearch/|FILEBEAT_LATEST|/filebeat-|FILEBEAT_LATEST|-|FILEBEAT_CURRENT_REV|.x86_64.rpm.sha512>`__)
.. |Filebeat_AARCH64_RPM| replace:: `filebeat-|FILEBEAT_LATEST|-|FILEBEAT_CURRENT_REV|.aarch64.rpm <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/yum/filebeat-|FILEBEAT_LATEST|-|FILEBEAT_CURRENT_REV|.aarch64.rpm>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/elasticsearch/|FILEBEAT_LATEST|/filebeat-|FILEBEAT_LATEST|-|FILEBEAT_CURRENT_REV|.aarch64.rpm.sha512>`__)
.. |Filebeat_AMD64_DEB| replace:: `filebeat_|FILEBEAT_LATEST|-|FILEBEAT_CURRENT_REV|_amd64.deb <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/apt/pool/main/f/filebeat/filebeat_|FILEBEAT_LATEST|-|FILEBEAT_CURRENT_REV|_amd64.deb>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/elasticsearch/|FILEBEAT_LATEST|/filebeat_|FILEBEAT_LATEST|-|FILEBEAT_CURRENT_REV|_amd64.deb.sha512>`__)
.. |Filebeat_ARM64_DEB| replace:: `filebeat_|FILEBEAT_LATEST|-|FILEBEAT_CURRENT_REV|_arm64.deb <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/apt/pool/main/f/filebeat/filebeat_|FILEBEAT_LATEST|-|FILEBEAT_CURRENT_REV|_arm64.deb>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/elasticsearch/|FILEBEAT_LATEST|/filebeat_|FILEBEAT_LATEST|-|FILEBEAT_CURRENT_REV|_arm64.deb.sha512>`__)

+--------------+--------------+----------------------------+
| Package type | Architecture | Package                    |
+==============+==============+============================+
|     RPM      |    x86_64    | |Filebeat_x86_64_RPM|      |
|              +--------------+----------------------------+
|              |    aarch64   | |Filebeat_AARCH64_RPM|     |
+--------------+--------------+----------------------------+
|     DEB      |    amd64     | |Filebeat_AMD64_DEB|       |
|              +--------------+----------------------------+
|              |    arm64     | |Filebeat_ARM64_DEB|       |
+--------------+--------------+----------------------------+

Wazuh dashboard
---------------

.. |Dashboard_x86_64_RPM| replace:: `wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV_RPM|.|WAZUH_DASHBOARD_x64_RPM|.rpm <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/yum/wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV_RPM|.|WAZUH_DASHBOARD_x64_RPM|.rpm>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV_RPM|.|WAZUH_DASHBOARD_x64_RPM|.rpm.sha512>`__)
.. |Dashboard_AARCH64_RPM| replace:: `wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV_RPM|.|WAZUH_DASHBOARD_AARCH64_RPM|.rpm <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/yum/wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV_RPM|.|WAZUH_DASHBOARD_AARCH64_RPM|.rpm>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV_RPM|.|WAZUH_DASHBOARD_AARCH64_RPM|.rpm.sha512>`__)
.. |Dashboard_AMD64_DEB| replace:: `wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV_DEB|_|WAZUH_DASHBOARD_x64_DEB|.deb <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-dashboard/wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV_DEB|_|WAZUH_DASHBOARD_x64_DEB|.deb>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV_DEB|_|WAZUH_DASHBOARD_x64_DEB|.deb.sha512>`__)
.. |Dashboard_ARM64_DEB| replace:: `wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV_DEB|_|WAZUH_DASHBOARD_ARM64_DEB|.deb <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-dashboard/wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV_DEB|_|WAZUH_DASHBOARD_ARM64_DEB|.deb>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV_DEB|_|WAZUH_DASHBOARD_ARM64_DEB|.deb.sha512>`__)

+--------------+--------------+---------------------------+
| Package type | Architecture | Package                   |
+==============+==============+===========================+
|     RPM      |    x86_64    | |Dashboard_x86_64_RPM|    |
|              +--------------+---------------------------+
|              |    aarch64   | |Dashboard_AARCH64_RPM|   |
+--------------+--------------+---------------------------+
|     DEB      |    amd64     | |Dashboard_AMD64_DEB|     |
|              +--------------+---------------------------+
|              |    arm64     | |Dashboard_ARM64_DEB|     |
+--------------+--------------+---------------------------+

.. _wazuh_agent_packages_list:

Wazuh agent
-----------

Linux
^^^^^

.. |Almalinux10_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm.sha512>`__)

.. |AlmaLinux10_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm.sha512>`__)

.. |Amazon_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm.sha512>`__)

.. |Amazon_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm.sha512>`__)

.. |CentOS7_powerpc_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_PPC|.ppc64le.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_PPC|.ppc64le.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_PPC|.ppc64le.rpm.sha512>`__)

.. |CentOS6_i386_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm.sha512>`__)

.. |CentOS6_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm.sha512>`__)

.. |CentOS6_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm.sha512>`__)

.. |CentOS6_armhf_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm.sha512>`__)

.. |Debian9_powerpc_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_PPC|_ppc64el.deb <|DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_PPC|_ppc64el.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_PPC|_ppc64el.deb.sha512>`__)

.. |Debian7_i386_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_I386|_i386.deb <|DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_I386|_i386.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_I386|_i386.deb.sha512>`__)

.. |Debian7_x86_64_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_X86|_amd64.deb <|DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_X86|_amd64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_X86|_amd64.deb.sha512>`__)

.. |Debian7_aarch64_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_AARCH64|_arm64.deb <|DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_AARCH64|_arm64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_AARCH64|_arm64.deb.sha512>`__)

.. |Debian7_armhf_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_ARMHF|_armhf.deb <|DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_ARMHF|_armhf.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_ARMHF|_armhf.deb.sha512>`__)

.. |Fedora22_i386_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm.sha512>`__)

.. |Fedora22_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm.sha512>`__)

.. |Fedora22_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm.sha512>`__)

.. |Fedora22_armhf_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm.sha512>`__)

.. |OpenSUSE_i386_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm.sha512>`__)

.. |OpenSUSE_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm.sha512>`__)

.. |OpenSUSE_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm.sha512>`__)

.. |OpenSUSE_armhf_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm.sha512>`__)

.. |Oracle6_i386_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm.sha512>`__)

.. |Oracle6_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm.sha512>`__)

.. |Oracle6_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm.sha512>`__)

.. |RHEL6_i386_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm.sha512>`__)

.. |RHEL6_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm.sha512>`__)

.. |RHEL6_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm.sha512>`__)

.. |RHEL5_i386_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386_EL5|.el5.i386.rpm <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/yum5/i386/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386_EL5|.el5.i386.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386_EL5|.el5.i386.rpm.sha512>`__)

.. |RHEL5_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86_EL5|.el5.x86_64.rpm <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/yum5/x86_64/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86_EL5|.el5.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86_EL5|.el5.x86_64.rpm.sha512>`__)

.. |RockyLinux10_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm.sha512>`__)

.. |RockyLinux10_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm.sha512>`__)

.. |SUSE12_i386_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm.sha512>`__)

.. |SUSE12_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm.sha512>`__)

.. |SUSE12_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm.sha512>`__)

.. |SUSE12_armhf_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm.sha512>`__)

.. |Ubuntu12_i386_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_I386|_i386.deb <|DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_I386|_i386.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_I386|_i386.deb.sha512>`__)

.. |Ubuntu12_x86_64_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_X86|_amd64.deb <|DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_X86|_amd64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_X86|_amd64.deb.sha512>`__)

.. |Ubuntu12_aarch64_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_AARCH64|_arm64.deb <|DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_AARCH64|_arm64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_AARCH64|_arm64.deb.sha512>`__)

.. |Ubuntu12_armhf_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_ARMHF|_armhf.deb <|DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_ARMHF|_armhf.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_ARMHF|_armhf.deb.sha512>`__)

.. |Raspbian_aarch64_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_AARCH64|_arm64.deb <|DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_AARCH64|_arm64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_AARCH64|_arm64.deb.sha512>`__)

.. |Raspbian_armhf_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_ARMHF|_armhf.deb <|DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_ARMHF|_armhf.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_ARMHF|_armhf.deb.sha512>`__)

+-----------------------+-------------------+--------------+------------------------------------------+
| Distribution          | Version           | Architecture | Package                                  |
+=======================+===================+==============+==========================================+
| AlmaLinux             | 10 and later      |    x86_64    | |AlmaLinux10_x86_64_agent|               |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    aarch64   | |AlmaLinux10_aarch64_agent|              |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       | 2                 |    powerpc   | |CentOS7_powerpc_agent|                  |
+ Amazon Linux          +-------------------+--------------+------------------------------------------+
|                       |                   |    x86_64    | |Amazon_x86_64_agent|                    |
+                       + 1 and later       +--------------+------------------------------------------+
|                       |                   |    aarch64   | |Amazon_aarch64_agent|                   |
+-----------------------+-------------------+--------------+------------------------------------------+
| CentOS                |  7 and later      |    powerpc   | |CentOS7_powerpc_agent|                  |
+                       +-------------------+--------------+------------------------------------------+
|                       |                   |    i386      | |CentOS6_i386_agent|                     |
+                       +  6 and later      +--------------+------------------------------------------+
|                       |                   |    x86_64    | |CentOS6_x86_64_agent|                   |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    aarch64   | |CentOS6_aarch64_agent|                  |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    armhf     | |CentOS6_armhf_agent|                    |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |  9 and later      |    powerpc   | |Debian9_powerpc_agent|                  |
+ Debian                +-------------------+--------------+------------------------------------------+
|                       |                   |    i386      | |Debian7_i386_agent|                     |
+                       +  7 and later      +--------------+------------------------------------------+
|                       |                   |    x86_64    | |Debian7_x86_64_agent|                   |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    aarch64   | |Debian7_aarch64_agent|                  |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    armhf     | |Debian7_armhf_agent|                    |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |                   |    powerpc   | |CentOS7_powerpc_agent|                  |
+ Fedora                + 22 and later      +--------------+------------------------------------------+
|                       |                   |    i386      | |Fedora22_i386_agent|                    |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    x86_64    | |Fedora22_x86_64_agent|                  |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    aarch64   | |Fedora22_aarch64_agent|                 |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    armhf     | |Fedora22_armhf_agent|                   |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |                   |    i386      | |OpenSUSE_i386_agent|                    |
+ OpenSUSE              +  42 and later     +--------------+------------------------------------------+
|                       |                   |    x86_64    | |OpenSUSE_x86_64_agent|                  |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    aarch64   | |OpenSUSE_aarch64_agent|                 |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    armhf     | |OpenSUSE_armhf_agent|                   |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |                   |    i386      | |Oracle6_i386_agent|                     |
+ Oracle Linux          +  6 and later      +--------------+------------------------------------------+
|                       |                   |    x86_64    | |Oracle6_x86_64_agent|                   |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    aarch64   | |Oracle6_aarch64_agent|                  |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |                   |    i386      | |RHEL6_i386_agent|                       |
+ Red Hat               +  6 and later      +--------------+------------------------------------------+
| Enterprise Linux      |                   |    x86_64    | |RHEL6_x86_64_agent|                     |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    aarch64   | |RHEL6_aarch64_agent|                    |
+                       +-------------------+--------------+------------------------------------------+
|                       |                   |    i386      | |RHEL5_i386_agent|                       |
+                       +  5                +--------------+------------------------------------------+
|                       |                   |    x86_64    | |RHEL5_x86_64_agent|                     |
+-----------------------+-------------------+--------------+------------------------------------------+
| RockyLinux            | 10 and later      |    x86_64    | |RockyLinux10_x86_64_agent|              |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    aarch64   | |RockyLinux10_aarch64_agent|             |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |                   |    i386      | |SUSE12_i386_agent|                      |
+ SUSE                  +  12               +--------------+------------------------------------------+
|                       |                   |    x86_64    | |SUSE12_x86_64_agent|                    |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    aarch64   | |SUSE12_aarch64_agent|                   |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    armhf     | |SUSE12_armhf_agent|                     |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |                   |    i386      | |Ubuntu12_i386_agent|                    |
+ Ubuntu                +  12 and later     +--------------+------------------------------------------+
|                       |                   |    x86_64    | |Ubuntu12_x86_64_agent|                  |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    aarch64   | |Ubuntu12_aarch64_agent|                 |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    armhf     | |Ubuntu12_armhf_agent|                   |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |                   |    aarch64   | |Raspbian_aarch64_agent|                 |
+ Raspbian OS           + Buster and later  +--------------+------------------------------------------+
|                       |                   |    armhf     | |Raspbian_armhf_agent|                   |
+-----------------------+-------------------+--------------+------------------------------------------+

Windows
^^^^^^^

.. |Windows7Plus_32_64| replace:: `wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_WINDOWS|/windows/wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_WINDOWS|/checksums/wazuh/|WAZUH_CURRENT_WINDOWS|/wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi.sha512>`__)

+---------------------+--------------+---------------------------+
| Version             | Architecture | Package                   |
+=====================+==============+===========================+
| Windows 7 or later  |   32/64bits  | |Windows7Plus_32_64|      |
+---------------------+--------------+---------------------------+

.. _packages_list_agent_macos:

macOS
^^^^^

.. |macOS_intel_64| replace:: `wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.intel64.pkg <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_OSX|/macos/wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.intel64.pkg>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_OSX|/checksums/wazuh/|WAZUH_CURRENT_OSX|/wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.intel64.pkg.sha512>`__)
.. |macOS_arm64| replace:: `wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.arm64.pkg <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_OSX|/macos/wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.arm64.pkg>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_OSX|/checksums/wazuh/|WAZUH_CURRENT_OSX|/wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.arm64.pkg.sha512>`__)

+---------------+-------------------------+
| Architecture  | Package                 |
+===============+=========================+
|    Intel      | |macOS_intel_64|        |
+---------------+-------------------------+
| Apple silicon | |macOS_arm64|           |
+---------------+-------------------------+
