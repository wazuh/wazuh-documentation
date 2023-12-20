.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find the packages required for Wazuh installation on this page. Available for AIX, Linux, HP-UX, macOS, Solaris, and Windows.

Packages list
=============

This download page contains packages required for the Wazuh installation.

Wazuh indexer
-------------

.. |IndexerRPM| replace:: `wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_x64_RPM|.rpm <https://packages.wazuh.com/4.x/yum/wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_x64_RPM|.rpm>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_CURRENT|/wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_x64_RPM|.rpm.sha512>`__)

.. |IndexerDEB| replace:: `wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_x64_DEB|.deb <https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-indexer/wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_x64_DEB|.deb>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_CURRENT|/wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_x64_DEB|.deb.sha512>`__)

+--------------+------------------+
| Package type | Package          |
+==============+==================+
|     RPM      | |IndexerRPM|     |
+--------------+------------------+
|     DEB      | |IndexerDEB|     |
+--------------+------------------+

Wazuh server
------------

Wazuh manager
^^^^^^^^^^^^^

.. |Amazon_x86_64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm.sha512>`__)

.. |Amazon_aarch64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm.sha512>`__)

.. |CentOS7_x86_64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm.sha512>`__)

.. |CentOS7_aarch64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm.sha512>`__)

.. |Debian8_x86_64_manager| replace:: `wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_amd64.deb <|DEB_MANAGER_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_amd64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_amd64.deb.sha512>`__)

.. |Debian8_aarch64_manager| replace:: `wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_AARCH64|_arm64.deb <|DEB_MANAGER_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_AARCH64|_arm64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_AARCH64|_arm64.deb.sha512>`__)

.. |Fedora22_x86_64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm.sha512>`__)

.. |Fedora22_aarch64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm.sha512>`__)

.. |OpenSUSE_x86_64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm.sha512>`__)

.. |OpenSUSE_aarch64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm.sha512>`__)

.. |Oracle7_x86_64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm.sha512>`__)

.. |Oracle7_aarch64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm.sha512>`__)

.. |RHEL7_x86_64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm.sha512>`__)

.. |RHEL7_aarch64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm.sha512>`__)

.. |SUSE12_x86_64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_X86|.x86_64.rpm.sha512>`__)

.. |SUSE12_aarch64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm <|RPM_MANAGER_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_MANAGER_AARCH64|.aarch64.rpm.sha512>`__)

.. |Ubuntu13_x86_64_manager| replace:: `wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_amd64.deb <|DEB_MANAGER_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_amd64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_amd64.deb.sha512>`__)

.. |Ubuntu13_aarch64_manager| replace:: `wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_AARCH64|_arm64.deb <|DEB_MANAGER_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_AARCH64|_arm64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_AARCH64|_arm64.deb.sha512>`__)

.. |Raspbian_x86_64_manager| replace:: `wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_amd64.deb <|DEB_MANAGER_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_amd64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_X86|_amd64.deb.sha512>`__)

.. |Raspbian_aarch64_manager| replace:: `wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_AARCH64|_arm64.deb <|DEB_MANAGER_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_AARCH64|_arm64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_MANAGER_AARCH64|_arm64.deb.sha512>`__)

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
+ Fedora                + 22 and later      +--------------+------------------------------------------+
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
|                       |                   |    x86_64    | |Raspbian_x86_64_manager|                |
+ Raspbian OS           | Buster and later  +--------------+------------------------------------------+
|                       |                   |    aarch64   | |Raspbian_aarch64_manager|               |
+-----------------------+-------------------+--------------+------------------------------------------+

Filebeat
^^^^^^^^

+--------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Package type | Package                                                                                                                                                                                                                                         |
+==============+=================================================================================================================================================================================================================================================+
|     RPM      | `filebeat-oss-|ELASTICSEARCH_LATEST|-x86_64.rpm <https://packages.wazuh.com/4.x/yum/filebeat-oss-|ELASTICSEARCH_LATEST|-x86_64.rpm>`_ (`sha512 <https://packages.wazuh.com/4.x/checksums/elasticsearch/|ELASTICSEARCH_LATEST|/filebeat-oss-|ELASTICSEARCH_LATEST|-x86_64.rpm.sha512>`__)                        |
+--------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|     DEB      | `filebeat-oss-|ELASTICSEARCH_LATEST|-amd64.deb <https://packages.wazuh.com/4.x/apt/pool/main/f/filebeat/filebeat-oss-|ELASTICSEARCH_LATEST|-amd64.deb>`_ (`sha512 <https://packages.wazuh.com/4.x/checksums/elasticsearch/|ELASTICSEARCH_LATEST|/filebeat-oss-|ELASTICSEARCH_LATEST|-amd64.deb.sha512>`__)      |
+--------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Wazuh dashboard
---------------

.. |DashboardRPM| replace:: `wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV_RPM|.|WAZUH_DASHBOARD_x64_RPM|.rpm <https://packages.wazuh.com/4.x/yum/wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV_RPM|.|WAZUH_DASHBOARD_x64_RPM|.rpm>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_CURRENT|/wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV_RPM|.|WAZUH_DASHBOARD_x64_RPM|.rpm.sha512>`__)

.. |DashboardDEB| replace:: `wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV_DEB|_|WAZUH_DASHBOARD_x64_DEB|.deb <https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-dashboard/wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV_DEB|_|WAZUH_DASHBOARD_x64_DEB|.deb>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_CURRENT|/wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV_DEB|_|WAZUH_DASHBOARD_x64_DEB|.deb.sha512>`__)

+--------------+------------------+
| Package type | Package          |
+==============+==================+
|     RPM      | |DashboardRPM|   |
+--------------+------------------+
|     DEB      | |DashboardDEB|   |
+--------------+------------------+

.. _wazuh_agent_packages_list:

Wazuh agent
-----------

Linux
^^^^^

.. |Alpine_i386_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_APK_AGENT_I386|.apk <|APK_AGENT_I386_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_APK_AGENT_I386|.apk>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/|APK_CHECKSUMS_I386_URL|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_APK_AGENT_I386|.apk.sha512>`__)

.. |Alpine_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_APK_AGENT_X86_64|.apk <|APK_AGENT_X86_64_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_APK_AGENT_X86_64|.apk>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/|APK_CHECKSUMS_X86_64_URL|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_APK_AGENT_X86_64|.apk.sha512>`__)

.. |Alpine_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_APK_AGENT_AARCH64|.apk <|APK_AGENT_AARCH64_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_APK_AGENT_AARCH64|.apk>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/|APK_CHECKSUMS_AARCH64_URL|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_APK_AGENT_AARCH64|.apk.sha512>`__)

.. |Alpine_armv7_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_APK_AGENT_ARMV7|.apk <|APK_AGENT_ARMV7_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_APK_AGENT_ARMV7|.apk>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/|APK_CHECKSUMS_ARMV7_URL|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_APK_AGENT_ARMV7|.apk.sha512>`__)

.. |Alpine_armhf_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_APK_AGENT_ARMHF|.apk <|APK_AGENT_ARMHF_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_APK_AGENT_ARMHF|.apk>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/|APK_CHECKSUMS_ARMHF_URL|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_APK_AGENT_ARMHF|.apk.sha512>`__)

.. |Alpine_powerpc_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_APK_AGENT_PPC|.apk <|APK_AGENT_PPC_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_APK_AGENT_PPC|.apk>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/|APK_CHECKSUMS_PPC_URL|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_APK_AGENT_PPC|.apk.sha512>`__)

.. |Amazon_i386_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm.sha512>`__)

.. |Amazon_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm.sha512>`__)

.. |Amazon_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm.sha512>`__)

.. |Amazon_armhf_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm.sha512>`__)

.. |CentOS7_powerpc_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_PPC|.ppc64le.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_PPC|.ppc64le.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_PPC|.ppc64le.rpm.sha512>`__)

.. |CentOS6_i386_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm.sha512>`__)

.. |CentOS6_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm.sha512>`__)

.. |CentOS6_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm.sha512>`__)

.. |CentOS6_armhf_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm.sha512>`__)

.. |CentOS5_i386_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386_EL5|.el5.i386.rpm <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/yum5/i386/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386_EL5|.el5.i386.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386_EL5|.el5.i386.rpm.sha512>`__)

.. |CentOS5_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86_EL5|.el5.x86_64.rpm <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/yum5/x86_64/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86_EL5|.el5.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86_EL5|.el5.x86_64.rpm.sha512>`__)

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

.. |Oracle6_armhf_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm.sha512>`__)

.. |Oracle5_i386_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386_EL5|.el5.i386.rpm <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/yum5/i386/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386_EL5|.el5.i386.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386_EL5|.el5.i386.rpm.sha512>`__)

.. |Oracle5_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86_EL5|.el5.x86_64.rpm <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/yum5/x86_64/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86_EL5|.el5.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86_EL5|.el5.x86_64.rpm.sha512>`__)

.. |RHEL6_i386_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm.sha512>`__)

.. |RHEL6_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm.sha512>`__)

.. |RHEL6_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm.sha512>`__)

.. |RHEL6_armhf_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm.sha512>`__)

.. |RHEL5_i386_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386_EL5|.el5.i386.rpm <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/yum5/i386/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386_EL5|.el5.i386.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386_EL5|.el5.i386.rpm.sha512>`__)

.. |RHEL5_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86_EL5|.el5.x86_64.rpm <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/yum5/x86_64/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86_EL5|.el5.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86_EL5|.el5.x86_64.rpm.sha512>`__)

.. |SUSE12_i386_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386|.i386.rpm.sha512>`__)

.. |SUSE12_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86|.x86_64.rpm.sha512>`__)

.. |SUSE12_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_AARCH64|.aarch64.rpm.sha512>`__)

.. |SUSE12_armhf_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm <|RPM_AGENT_URL|-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_ARMHF|.armv7hl.rpm.sha512>`__)

.. |SUSE11_i386_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386_EL5|.el5.i386.rpm <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/yum5/i386/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386_EL5|.el5.i386.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_I386_EL5|.el5.i386.rpm.sha512>`__)

.. |SUSE11_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86_EL5|.el5.x86_64.rpm <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/yum5/x86_64/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86_EL5|.el5.x86_64.rpm>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_REVISION_YUM_AGENT_X86_EL5|.el5.x86_64.rpm.sha512>`__)

.. |Ubuntu12_i386_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_I386|_i386.deb <|DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_I386|_i386.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_I386|_i386.deb.sha512>`__)

.. |Ubuntu12_x86_64_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_X86|_amd64.deb <|DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_X86|_amd64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_X86|_amd64.deb.sha512>`__)

.. |Ubuntu12_aarch64_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_AARCH64|_arm64.deb <|DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_AARCH64|_arm64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_AARCH64|_arm64.deb.sha512>`__)

.. |Ubuntu12_armhf_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_ARMHF|_armhf.deb <|DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_ARMHF|_armhf.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_ARMHF|_armhf.deb.sha512>`__)

.. |Raspbian_x86_64_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_X86|_amd64.deb <|DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_X86|_amd64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_X86|_amd64.deb.sha512>`__)

.. |Raspbian_aarch64_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_AARCH64|_arm64.deb <|DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_AARCH64|_arm64.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_AARCH64|_arm64.deb.sha512>`__)

.. |Raspbian_armhf_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_ARMHF|_armhf.deb <|DEB_AGENT_URL|_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_ARMHF|_armhf.deb>`__ (`sha512 <|CHECKSUMS_URL||WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_REVISION_DEB_AGENT_ARMHF|_armhf.deb.sha512>`__)

+-----------------------+-------------------+--------------+------------------------------------------+
| Distribution          | Version           | Architecture | Package                                  |
+=======================+===================+==============+==========================================+
|                       |                   |    i386      | |Alpine_i386_agent|                      |
+ Alpine Linux          + v3.12 and later   +--------------+------------------------------------------+
|                       |                   |    x86_64    | |Alpine_x86_64_agent|                    |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    aarch64   | |Alpine_aarch64_agent|                   |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    armv7     | |Alpine_armv7_agent|                     |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    armhf     | |Alpine_armhf_agent|                     |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    powerpc   | |Alpine_powerpc_agent|                   |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       | 2                 |    powerpc   | |CentOS7_powerpc_agent|                  |
+ Amazon Linux          +-------------------+--------------+------------------------------------------+
|                       |                   |    i386      | |Amazon_i386_agent|                      |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    x86_64    | |Amazon_x86_64_agent|                    |
+                       + 1 and later       +--------------+------------------------------------------+
|                       |                   |    aarch64   | |Amazon_aarch64_agent|                   |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    armhf     | |Amazon_armhf_agent|                     |
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
+                       +-------------------+--------------+------------------------------------------+
|                       |                   |    i386      | |CentOS5_i386_agent|                     |
+                       +  5                +--------------+------------------------------------------+
|                       |                   |    x86_64    | |CentOS5_x86_64_agent|                   |
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
+                       +                   +--------------+------------------------------------------+
|                       |                   |    armhf     | |Oracle6_armhf_agent|                    |
+                       +-------------------+--------------+------------------------------------------+
|                       |                   |    i386      | |Oracle5_i386_agent|                     |
+                       +  5                +--------------+------------------------------------------+
|                       |                   |    x86_64    | |Oracle5_x86_64_agent|                   |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |                   |    i386      | |RHEL6_i386_agent|                       |
+ Red Hat               +  6 and later      +--------------+------------------------------------------+
| Enterprise Linux      |                   |    x86_64    | |RHEL6_x86_64_agent|                     |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    aarch64   | |RHEL6_aarch64_agent|                    |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    armhf     | |RHEL6_armhf_agent|                      |
+                       +-------------------+--------------+------------------------------------------+
|                       |                   |    i386      | |RHEL5_i386_agent|                       |
+                       +  5                +--------------+------------------------------------------+
|                       |                   |    x86_64    | |RHEL5_x86_64_agent|                     |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |                   |    i386      | |SUSE12_i386_agent|                      |
+ SUSE                  +  12               +--------------+------------------------------------------+
|                       |                   |    x86_64    | |SUSE12_x86_64_agent|                    |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    aarch64   | |SUSE12_aarch64_agent|                   |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    armhf     | |SUSE12_armhf_agent|                     |
+                       +-------------------+--------------+------------------------------------------+
|                       |                   |    i386      | |SUSE11_i386_agent|                      |
+                       +  11               +--------------+------------------------------------------+
|                       |                   |    x86_64    | |SUSE11_x86_64_agent|                    |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       |                   |    i386      | |Ubuntu12_i386_agent|                    |
+ Ubuntu                +  12 and later     +--------------+------------------------------------------+
|                       |                   |    x86_64    | |Ubuntu12_x86_64_agent|                  |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    aarch64   | |Ubuntu12_aarch64_agent|                 |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    armhf     | |Ubuntu12_armhf_agent|                   |
+-----------------------+-------------------+--------------+------------------------------------------+
|                       | Buster and later  |    powerpc   | |Debian9_powerpc_agent|                  |
+ Raspbian OS           +                   +--------------+------------------------------------------+
|                       |                   |    i386      | |Debian7_i386_agent|                     |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    x86_64    | |Raspbian_x86_64_agent|                  |
+                       |                   +--------------+------------------------------------------+
|                       |                   |    aarch64   | |Raspbian_aarch64_agent|                 |
+                       +                   +--------------+------------------------------------------+
|                       |                   |    armhf     | |Raspbian_armhf_agent|                   |
+-----------------------+-------------------+--------------+------------------------------------------+


Windows
^^^^^^^

.. |WindowsXP_32_64| replace:: `wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_WINDOWS|/windows/wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_WINDOWS|/checksums/wazuh/|WAZUH_CURRENT_WINDOWS|/wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi.sha512>`__)

+-----------------+--------------+---------------------------+
| Version         | Architecture | Package                   |
+=================+==============+===========================+
|  XP or later    |   32/64bits  | |WindowsXP_32_64|         |
+-----------------+--------------+---------------------------+

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

Solaris
^^^^^^^

.. |Solaris10_i386| replace:: `wazuh-agent_v|WAZUH_CURRENT_SOLARIS10_i386|-sol10-i386.pkg <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_SOLARIS10_i386|/solaris/i386/10/wazuh-agent_v|WAZUH_CURRENT_SOLARIS10_i386|-sol10-i386.pkg>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_SOLARIS10_i386|/checksums/wazuh/|WAZUH_CURRENT_SOLARIS10_i386|/wazuh-agent_v|WAZUH_CURRENT_SOLARIS10_i386|-sol10-i386.pkg.sha512>`__)

.. |Solaris10_SPARC| replace:: `wazuh-agent_v|WAZUH_CURRENT_SOLARIS10_SPARC|-sol10-sparc.pkg <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_SOLARIS10_SPARC|/solaris/sparc/10/wazuh-agent_v|WAZUH_CURRENT_SOLARIS10_SPARC|-sol10-sparc.pkg>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_SOLARIS10_SPARC|/checksums/wazuh/|WAZUH_CURRENT_SOLARIS10_SPARC|/wazuh-agent_v|WAZUH_CURRENT_SOLARIS10_SPARC|-sol10-sparc.pkg.sha512>`__)

.. |Solaris11_i386| replace:: `wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_i386|-sol11-i386.p5p <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_SOLARIS11_i386|/solaris/i386/11/wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_i386|-sol11-i386.p5p>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_SOLARIS11_i386|/checksums/wazuh/|WAZUH_CURRENT_SOLARIS11_i386|/wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_i386|-sol11-i386.p5p.sha512>`__)

.. |Solaris11_SPARC| replace:: `wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_SPARC|-sol11-sparc.p5p <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_SOLARIS11_SPARC|/solaris/sparc/11/wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_SPARC|-sol11-sparc.p5p>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_SOLARIS11_SPARC|/checksums/wazuh/|WAZUH_CURRENT_SOLARIS11_SPARC|/wazuh-agent_v|WAZUH_CURRENT_SOLARIS11_SPARC|-sol11-sparc.p5p.sha512>`__)

+---------+--------------+-------------------------+
| Version | Architecture | Package                 |
+=========+==============+=========================+
|         |     i386     | |Solaris10_i386|        |
+  10     +--------------+-------------------------+
|         |     SPARC    | |Solaris10_SPARC|       |
+---------+--------------+-------------------------+
|         |     i386     | |Solaris11_i386|        |
+  11     +--------------+-------------------------+
|         |     SPARC    | |Solaris11_SPARC|       |
+---------+--------------+-------------------------+

AIX
^^^

.. |AIX_powerpc| replace:: `wazuh-agent-|WAZUH_CURRENT_AIX|-|WAZUH_REVISION_AIX|.aix.ppc.rpm <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_AIX|/aix/wazuh-agent-|WAZUH_CURRENT_AIX|-|WAZUH_REVISION_AIX|.aix.ppc.rpm>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_AIX|/checksums/wazuh/|WAZUH_CURRENT_AIX|/wazuh-agent-|WAZUH_CURRENT_AIX|-|WAZUH_REVISION_AIX|.aix.ppc.rpm.sha512>`__)

+-----------------+--------------+----------------------------------------+
| Version         | Architecture | Package                                |
+=================+==============+========================================+
| 6.1 or greater  |    PowerPC   | |AIX_powerpc|                          |
+-----------------+--------------+----------------------------------------+

HP-UX
^^^^^

.. |HPUX_itanium| replace:: `wazuh-agent-|WAZUH_CURRENT_HPUX|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_HPUX|/hp-ux/wazuh-agent-|WAZUH_CURRENT_HPUX|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_HPUX|/checksums/wazuh/|WAZUH_CURRENT_HPUX|/wazuh-agent-|WAZUH_CURRENT_HPUX|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar.sha512>`__)

+-----------------+--------------+-------------------+
| Version         | Architecture | Package           |
+=================+==============+===================+
|  11.31          |   Itanium    | |HPUX_itanium|    |
+-----------------+--------------+-------------------+
