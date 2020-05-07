.. Copyright (C) 2020 Wazuh, Inc.

.. _wazuh_server_installation:

Installing Wazuh server
========================

The Wazuh server can be installed on any Unix-like operating system. It is most commonly installed on Linux. The installation process is easier via the packages if one is available for your distribution, however, building and installing from sources is also pretty straightforward.

There are two components that are usually installed on a Wazuh server: the manager and the API. In addition, **Filebeat** is needed to forward alerts to Elastic Stack.

There are several options for installing the Wazuh server depending on the operating system and whether or not you wish to build from sources. Consult the table below and choose how to proceed:

+-------------------------------+---------------------------------------------------------------+
| Operative system              | Version                                                       |
+===============================+===============================================================+
| Amazon Linux                  | :ref:`1 or greater <wazuh_server_amazon>`                     |
+-------------------------------+---------------------------------------------------------------+
| CentOS                        | :ref:`6 or greater <wazuh_server_centos>`                     |
+-------------------------------+---------------------------------------------------------------+
| Debian                        | :ref:`7 or greater <wazuh_server_debian>`                     |
+-------------------------------+---------------------------------------------------------------+
| Fedora                        | :ref:`22 or greater <wazuh_server_fedora>`                    |
+-------------------------------+---------------------------------------------------------------+
| Oracle Linux                  | :ref:`6 or greater <wazuh_server_oracle>`                     |
+-------------------------------+---------------------------------------------------------------+
| OpenSUSE                      | :ref:`42 or greater <wazuh_server_opensuse>`                  |
+-------------------------------+---------------------------------------------------------------+
| Red Hat Enterprise Linux      | :ref:`6 or greater <wazuh_server_rhel>`                       |
+-------------------------------+---------------------------------------------------------------+
| SUSE                          | :ref:`12 <wazuh_server_suse>`                                 |
+-------------------------------+---------------------------------------------------------------+
| Ubuntu                        | :ref:`12.10 or greater <wazuh_server_ubuntu>`                 |
+-------------------------------+---------------------------------------------------------------+


There are some related additional configurations that can be applied:

- :ref:`Securing the Wazuh API <securing_api>`


.. note::
    Installing Wazuh server on a 64-bit operating system is highly recommended since the Wazuh API is not available on 32-bit platforms. Without the Wazuh API, much of the functionality of the Wazuh Kibana App will not work. Similarly, if you are using Red Hat or CentOS for your Wazuh server platform, make sure it is version 6 or higher to properly install Wazuh API.

.. toctree::
    :hidden:
    :maxdepth: 2

    linux/amazon/index
    linux/centos/index
    linux/debian/index
    linux/fedora/index
    linux/opensuse/index
    linux/oracle/index
    linux/rhel/index
    linux/suse/index
    linux/ubuntu/index


