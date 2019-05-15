.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_agent_linux:

Install Wazuh agent on Linux
============================

The Wazuh agent can be installed in the most of Linux Distribution. It's possible to use DEB packages or RPM packages depending on the target Operative System flavor. 


+-------------------------------+-----------------+----------------------------------------------------------+
| Operative system              | Version         | Installation guide                                       |
+===============================+=================+==========================================================+
| Amazon Linux                  | 2               | :doc:`Installation guide <wazuh_agent_linux_rpm>`        |
+                               +-----------------+----------------------------------------------------------+
|                               | 1               | :doc:`Installation guide <wazuh_agent_linux_rpm>`        |
+-------------------------------+-----------------+----------------------------------------------------------+
| CentOS/Red Hat/Oracle Linux   | 7               | :doc:`Installation guide <wazuh_agent_linux_rpm>`        |
+                               +-----------------+----------------------------------------------------------+
|                               | 6               | :doc:`Installation guide <wazuh_agent_linux_rpm>`        |
+                               +-----------------+----------------------------------------------------------+
|                               | 5               | :doc:`Installation guide <wazuh_agent_linux_rpm_5>`      |
+-------------------------------+-----------------+----------------------------------------------------------+
| Debian                        | 9               | :doc:`Installation guide <wazuh_agent_linux_deb>`        |
+                               +-----------------+----------------------------------------------------------+
|                               | 8               | :doc:`Installation guide <wazuh_agent_linux_deb>`        |
+                               +-----------------+----------------------------------------------------------+
|                               | 7               | :doc:`Installation guide <wazuh_agent_linux_deb>`        |
+-------------------------------+-----------------+----------------------------------------------------------+
| Fedora                        | From 22 to 30   | :doc:`Installation guide <wazuh_agent_linux_fedora>`     |
+-------------------------------+-----------------+----------------------------------------------------------+
| OpenSuse                      | Tumbleweed      | :doc:`Installation guide <wazuh_agent_linux_rpm_suse_12>`|
+                               +-----------------+----------------------------------------------------------+
|                               | Leap 42         | :doc:`Installation guide <wazuh_agent_linux_rpm_suse_12>`|
+-------------------------------+-----------------+----------------------------------------------------------+
| SUSE                          | 12              | :doc:`Installation guide <wazuh_agent_linux_rpm_suse_12>`|
+                               +-----------------+----------------------------------------------------------+
|                               | 11              | :doc:`Installation guide <wazuh_agent_linux_rpm_suse_11>`|
+-------------------------------+-----------------+----------------------------------------------------------+

.. toctree::
    :hidden:
    :maxdepth: 2

    wazuh_agent_linux_rpm
    wazuh_agent_linux_deb
    wazuh_agent_linux_rpm_5
    wazuh_agent_linux_fedora
    wazuh_agent_linux_rpm_suse_12
    wazuh_agent_linux_rpm_suse_11