.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_agent_linux:

Install Wazuh agent in Linux
============================

The Wazuh agent can be installed in the most of Linux Distribution. It's possible to use DEB packages or RPM packages depending on the target Operative System flavor. 

Debian based installation guide
-------------------------------

+------------------------------------------------------+--------------------------------------------------+
| Type                                                 | Description                                      |
+======================================================+==================================================+
| :doc:`DEB packages <wazuh_agent_deb>`                | Install Wazuh agents on Debian/Ubuntu.           |
+------------------------------------------------------+--------------------------------------------------+

RPM-based installation guides
-----------------------------

+------------------------------------------------------+--------------------------------------------------+
| Type                                                 | Description                                      |
+======================================================+==================================================+
| :doc:`RPM Centos/RHEL 6 or greater, Amazon Linux and | Install Wazuh agents on CentOS/RHEL 6 or greater,| 
| Oracle Linux <wazuh_agent_rpm>`                      | Amazon Linux and Oracle Linux                    |
+------------------------------------------------------+--------------------------------------------------+
| :doc:`RPM Fedora <wazuh_agent_fedora>`               | Install Wazuh agents on Fedora.                  |
+------------------------------------------------------+--------------------------------------------------+
| :doc:`RPM Centos/RHEL 5 <wazuh_agent_rpm_5>`         | Install Wazuh agents on CentOS/RHEL 5.           |
+------------------------------------------------------+--------------------------------------------------+
| :doc:`RPM SUSE 11 <wazuh_agent_rpm_suse_11>`         | Install Wazuh agents on Suse 11.                 |
+------------------------------------------------------+--------------------------------------------------+
| :doc:`RPM SUSE 12, OpenSUSE 42, OpenSUSE Leap and    | Install Wazuh agents on SUSE 12, OpenSUSE 42,    |
| OpenSUSE Tumbleweed <wazuh_agent_rpm_suse_12>`       | OpenSUSE Leap and OpenSUSE Tumbleweed.           |
+------------------------------------------------------+--------------------------------------------------+

.. toctree::
    :hidden:
    :maxdepth: 2

    wazuh_agent_rpm
    wazuh_agent_deb
    wazuh_agent_fedora
    wazuh_agent_rpm_5
    wazuh_agent_rpm_suse_11
    wazuh_agent_rpm_suse_12