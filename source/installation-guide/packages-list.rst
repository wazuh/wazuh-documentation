.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find the packages required for Wazuh installation on this page. Available for Linux, macOS, and Windows.

Packages list
=============

This download page contains packages required for the Wazuh installation.

Wazuh indexer
-------------

.. |Indexer_x86_64_RPM| replace:: `wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_x64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_x64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_x64_RPM|.rpm.sha512>`__)
.. |Indexer_AARCH64_RPM| replace:: `wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_AARCH64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_AARCH64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_AARCH64_RPM|.rpm.sha512>`__)
.. |Indexer_AMD64_DEB| replace:: `wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_x64_DEB|.deb <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-indexer/wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_x64_DEB|.deb>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_x64_DEB|.deb.sha512>`__)
.. |Indexer_ARM64_DEB| replace:: `wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_ARM64_DEB|.deb <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-indexer/wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_ARM64_DEB|.deb>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_ARM64_DEB|.deb.sha512>`__)

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

Wazuh manager
-------------

.. |Amazon_x86_64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.|WAZUH_MANAGER_x64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.|WAZUH_MANAGER_x64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.|WAZUH_MANAGER_x64_RPM|.rpm.sha512>`__)
.. |Amazon_aarch64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.|WAZUH_MANAGER_AARCH64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.|WAZUH_MANAGER_AARCH64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.|WAZUH_MANAGER_AARCH64_RPM|.rpm.sha512>`__)
.. |RHEL_x86_64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.|WAZUH_MANAGER_x64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.|WAZUH_MANAGER_x64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.|WAZUH_MANAGER_x64_RPM|.rpm.sha512>`__)
.. |RHEL_aarch64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.|WAZUH_MANAGER_AARCH64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.|WAZUH_MANAGER_AARCH64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.|WAZUH_MANAGER_AARCH64_RPM|.rpm.sha512>`__)
.. |Ubuntu_x86_64_manager| replace:: `wazuh-manager_|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|_|WAZUH_MANAGER_x64_DEB|.deb <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-manager/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|_|WAZUH_MANAGER_x64_DEB|.deb>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|_|WAZUH_MANAGER_x64_DEB|.deb.sha512>`__)
.. |Ubuntu_aarch64_manager| replace:: `wazuh-manager_|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|_|WAZUH_MANAGER_ARM64_DEB|.deb <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-manager/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|_|WAZUH_MANAGER_ARM64_DEB|.deb>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|_|WAZUH_MANAGER_ARM64_DEB|.deb.sha512>`__)

+-----------------------+-------------------+--------------+------------------------------------------+
| Distribution          | Version           | Architecture | Package                                  |
+=======================+===================+==============+==========================================+
|                       |                   |    x86_64    | |Amazon_x86_64_manager|                  |
+ Amazon Linux          +  2023             +--------------+------------------------------------------+
|                       |                   |    aarch64   | |Amazon_aarch64_manager|                 |
+-----------------------+-------------------+--------------+------------------------------------------+
| Red Hat               |                   |    x86_64    | |RHEL_x86_64_manager|                    |
+ Enterprise Linux      +  9, 10            +--------------+------------------------------------------+
|                       |                   |    aarch64   | |RHEL_aarch64_manager|                   |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |                   |    x86_64    | |Ubuntu_x86_64_manager|                  |
+ Ubuntu                +  22.04, 24.04     +--------------+------------------------------------------+
|                       |                   |    aarch64   | |Ubuntu_aarch64_manager|                 |
+-----------------------+-------------------+--------------+------------------------------------------+

Wazuh dashboard
---------------

.. |Dashboard_x86_64_RPM| replace:: `wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|.|WAZUH_DASHBOARD_x64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|.|WAZUH_DASHBOARD_x64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|.|WAZUH_DASHBOARD_x64_RPM|.rpm.sha512>`__)
.. |Dashboard_AARCH64_RPM| replace:: `wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|.|WAZUH_DASHBOARD_AARCH64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|.|WAZUH_DASHBOARD_AARCH64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|.|WAZUH_DASHBOARD_AARCH64_RPM|.rpm.sha512>`__)
.. |Dashboard_AMD64_DEB| replace:: `wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|_|WAZUH_DASHBOARD_x64_DEB|.deb <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-dashboard/wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|_|WAZUH_DASHBOARD_x64_DEB|.deb>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|_|WAZUH_DASHBOARD_x64_DEB|.deb.sha512>`__)
.. |Dashboard_ARM64_DEB| replace:: `wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|_|WAZUH_DASHBOARD_ARM64_DEB|.deb <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-dashboard/wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|_|WAZUH_DASHBOARD_ARM64_DEB|.deb>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|_|WAZUH_DASHBOARD_ARM64_DEB|.deb.sha512>`__)

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

.. _wazuh_agent_packages_list_linux:

Linux
^^^^^

.. |Amazon_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm.sha512>`__)
.. |Amazon_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm.sha512>`__)
.. |CentOS_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm.sha512>`__)
.. |CentOS_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm.sha512>`__)
.. |CentOSStream_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm.sha512>`__)
.. |CentOSStream_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm.sha512>`__)
.. |Debian_x86_64_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_x64_DEB|.deb <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-agent/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_x64_DEB|.deb>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_x64_DEB|.deb.sha512>`__)
.. |Debian_aarch64_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_ARM64_DEB|.deb <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-agent/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_ARM64_DEB|.deb>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_ARM64_DEB|.deb.sha512>`__)
.. |Fedora_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm.sha512>`__)
.. |Fedora_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm.sha512>`__)
.. |OpenSUSELeap_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm.sha512>`__)
.. |OpenSUSELeap_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm.sha512>`__)
.. |Oracle7_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm.sha512>`__)
.. |Oracle89_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm.sha512>`__)
.. |Oracle89_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm.sha512>`__)
.. |RHEL7_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm.sha512>`__)
.. |RHEL8910_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm.sha512>`__)
.. |RHEL8910_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm.sha512>`__)
.. |SLES_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm.sha512>`__)
.. |SLES_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm.sha512>`__)
.. |Ubuntu_x86_64_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_x64_DEB|.deb <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-agent/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_x64_DEB|.deb>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_x64_DEB|.deb.sha512>`__)
.. |Ubuntu_aarch64_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_ARM64_DEB|.deb <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-agent/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_ARM64_DEB|.deb>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_ARM64_DEB|.deb.sha512>`__)

+--------------------------+---------------------------------+--------------+------------------------------------------+
| Distribution             | Version                         | Architecture | Package                                  |
+==========================+=================================+==============+==========================================+
|                          |                                 |    x86_64    | |Amazon_x86_64_agent|                    |
+ Amazon Linux             +  2023                           +--------------+------------------------------------------+
|                          |                                 |    aarch64   | |Amazon_aarch64_agent|                   |
+--------------------------+---------------------------------+--------------+------------------------------------------+
|                          |                                 |    x86_64    | |CentOS_x86_64_agent|                    |
+ CentOS                   +  7                              +--------------+------------------------------------------+
|                          |                                 |    aarch64   | |CentOS_aarch64_agent|                   |
+--------------------------+---------------------------------+--------------+------------------------------------------+
|                          |                                 |    x86_64    | |CentOSStream_x86_64_agent|              |
+ CentOS Stream            +  8, 9, 10                       +--------------+------------------------------------------+
|                          |                                 |    aarch64   | |CentOSStream_aarch64_agent|             |
+--------------------------+---------------------------------+--------------+------------------------------------------+
|                          |                                 |    x86_64    | |Debian_x86_64_agent|                    |
+ Debian                   +  10, 11, 12, 13                 +--------------+------------------------------------------+
|                          |                                 |    aarch64   | |Debian_aarch64_agent|                   |
+--------------------------+---------------------------------+--------------+------------------------------------------+
|                          |                                 |    x86_64    | |Fedora_x86_64_agent|                    |
+ Fedora                   +  41, 42, 43                     +--------------+------------------------------------------+
|                          |                                 |    aarch64   | |Fedora_aarch64_agent|                   |
+--------------------------+---------------------------------+--------------+------------------------------------------+
|                          |                                 |    x86_64    | |OpenSUSELeap_x86_64_agent|              |
+ OpenSUSE Leap            +  15, 16                         +--------------+------------------------------------------+
|                          |                                 |    aarch64   | |OpenSUSELeap_aarch64_agent|             |
+--------------------------+---------------------------------+--------------+------------------------------------------+
| Oracle Linux             |  7                              |    x86_64    | |Oracle7_x86_64_agent|                   |
+--------------------------+---------------------------------+--------------+------------------------------------------+
|                          |                                 |    x86_64    | |Oracle89_x86_64_agent|                  |
+ Oracle Linux             +  8, 9                           +--------------+------------------------------------------+
|                          |                                 |    aarch64   | |Oracle89_aarch64_agent|                 |
+--------------------------+---------------------------------+--------------+------------------------------------------+
| Red Hat Enterprise Linux |  7                              |    x86_64    | |RHEL7_x86_64_agent|                     |
+--------------------------+---------------------------------+--------------+------------------------------------------+
|                          |                                 |    x86_64    | |RHEL8910_x86_64_agent|                  |
+ Red Hat Enterprise Linux +  8, 9, 10                       +--------------+------------------------------------------+
|                          |                                 |    aarch64   | |RHEL8910_aarch64_agent|                 |
+--------------------------+---------------------------------+--------------+------------------------------------------+
|                          |                                 |    x86_64    | |SLES_x86_64_agent|                      |
+ SLES                     +  15, 16                         +--------------+------------------------------------------+
|                          |                                 |    aarch64   | |SLES_aarch64_agent|                     |
+--------------------------+---------------------------------+--------------+------------------------------------------+
|                          |                                 |    x86_64    | |Ubuntu_x86_64_agent|                    |
+ Ubuntu                   +  18.04, 20.04, 22.04, 24.04     +--------------+------------------------------------------+
|                          |                                 |    aarch64   | |Ubuntu_aarch64_agent|                   |
+--------------------------+---------------------------------+--------------+------------------------------------------+

.. _packages_list_windows:

Windows
^^^^^^^

.. |Windows7Plus_32_64| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.msi <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/windows/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.msi>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.msi.sha512>`__)

+---------------------+--------------+---------------------------+
| Version             | Architecture | Package                   |
+=====================+==============+===========================+
| 10 or later         |   32/64bits  | |Windows7Plus_32_64|      |
+---------------------+--------------+---------------------------+

.. _packages_list_agent_macos:

macOS
^^^^^

.. |macOS_intel_64| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.intel64.pkg <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/macos/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.intel64.pkg>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.x86_64.pkg.sha512>`__)
.. |macOS_arm64| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.arm64.pkg <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/macos/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.arm64.pkg>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.arm64.pkg.sha512>`__)

+---------------+-------------------------+
| Architecture  | Package                 |
+===============+=========================+
|    Intel      | |macOS_intel_64|        |
+---------------+-------------------------+
| Apple silicon | |macOS_arm64|           |
+---------------+-------------------------+
