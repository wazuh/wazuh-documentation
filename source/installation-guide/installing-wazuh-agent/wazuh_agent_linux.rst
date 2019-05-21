.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_agent_linux:

Install Wazuh agent on Linux
============================

The Wazuh agent can be installed in the most of Linux Distribution. It's possible to use DEB packages or RPM packages depending on the target Operative System flavor. 


+-------------------------------+---------------------+----------------------------------------------------------------------------------------------+
| Operative system              | Version             | Installation guide                                                                           |
+===============================+=====================+==============================================================================================+
| Amazon Linux                  | 2                   | :doc:`Installation guide on Amazon Linux/CentOS/RHEL/Oracle Linux <wazuh_agent_linux_rpm>`   |
+                               +---------------------+                                                                                              +
|                               | 1                   |                                                                                              |
+-------------------------------+---------------------+                                                                                              +
| CentOS/RHEL/Oracle Linux      | 7                   |                                                                                              |
+                               +---------------------+                                                                                              +
|                               | 6                   |                                                                                              |
+                               +---------------------+----------------------------------------------------------------------------------------------+
|                               | 5                   | :doc:`Installation guide on CentOS/RHEL/Oracle Linux 5 <wazuh_agent_linux_rpm_5>`            |
+-------------------------------+---------------------+----------------------------------------------------------------------------------------------+
| Debian                        | 9                   | :doc:`Installation guide on Debian/Ubuntu<wazuh_agent_linux_deb>`                            |
+                               +---------------------+                                                                                              +
|                               | 8                   |                                                                                              |
+                               +---------------------+                                                                                              +
|                               | 7                   |                                                                                              |
+-------------------------------+---------------------+                                                                                              +
| Ubuntu                        | From 12.10 to 19.04 |                                                                                              |
+-------------------------------+---------------------+----------------------------------------------------------------------------------------------+
| Fedora                        | From 22 to 30       | :doc:`Installation guide on Fedora <wazuh_agent_linux_fedora>`                               |
+-------------------------------+---------------------+----------------------------------------------------------------------------------------------+
| OpenSUSE                      | Tumbleweed          | :doc:`Installation guide on OpenSUSE/SUSE 12 <wazuh_agent_linux_rpm_suse_12>`                |
+                               +---------------------+                                                                                              +
|                               | Leap                |                                                                                              |
+                               +---------------------+                                                                                              +
|                               | 42                  |                                                                                              |
+-------------------------------+---------------------+                                                                                              +
| SUSE                          | 12                  |                                                                                              |
+                               +---------------------+----------------------------------------------------------------------------------------------+
|                               | 11                  | :doc:`Installation guide on SUSE 11 <wazuh_agent_linux_rpm_suse_11>`                         |
+-------------------------------+---------------------+----------------------------------------------------------------------------------------------+

.. toctree::
    :hidden:
    :maxdepth: 2

    wazuh_agent_linux_rpm
    wazuh_agent_linux_deb
    wazuh_agent_linux_rpm_5
    wazuh_agent_linux_fedora
    wazuh_agent_linux_rpm_suse_12
    wazuh_agent_linux_rpm_suse_11