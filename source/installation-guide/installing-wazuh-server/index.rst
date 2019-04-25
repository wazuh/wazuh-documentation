.. Copyright (C) 2019 Wazuh, Inc.

.. _installation:

Installing Wazuh server
=======================

The Wazuh server can be installed on any Unix-like operating system. It is most commonly installed on Linux. The installation process is easier via the packages if one is available for your distribution, however, building and installing from sources is also pretty straightforward.

There are two components that are usually installed on a Wazuh server: the manager and the API. In addition, for distributed architectures (where the Wazuh server sends data to a remote Elastic Stack cluster) **Filebeat** will need to be installed.

There are several options for installing the Wazuh server depending on the operating system and whether or not you wish to build from source. Consult the table below and choose how to proceed:

+------------------------------------------------------------------------+-------------------------------------------------------------+
| Type                                                                   | Description                                                 |
+========================================================================+=============================================================+
| :ref:`RPM packages <wazuh_server_rpm>`                                 | Install Wazuh server on CentOS/RHEL/Fedora.                 |
+------------------------------------------------------------------------+-------------------------------------------------------------+
| :ref:`DEB packages <wazuh_server_deb>`                                 | Install Wazuh server on Debian/Ubuntu.                      |
+------------------------------------------------------------------------+-------------------------------------------------------------+
| :ref:`Sources <sources_installation>`                                  | Install Wazuh server from source code.                      |
+------------------------------------------------------------------------+-------------------------------------------------------------+

There are some related additional configurations that can be applied:

- :ref:`Securing the Wazuh API <securing_api>` 
- :ref:`Insert a Wazuh API entry automatically <automatic_api>` 


.. note::
    Installing Wazuh Server on a 64-bit operating system is highly recommended since the Wazuh API is not available on 32-bit platforms. Without the Wazuh API, much of the functionality of the Wazuh Kibana App will not work. Similarly, if you are using Red Hat or CentOS for your Wazuh Server platform, make sure it is version 6 or higher to properly install Wazuh API.

.. toctree::
   :hidden:
   :maxdepth: 2

   wazuh_server_rpm
   wazuh_server_deb
   sources_installation
   securing_api
   automatic_api
