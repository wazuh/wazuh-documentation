.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_server_installation:

Installing Wazuh server
========================

The Wazuh server is most commonly installed on Linux. The installation process is easier via the packages if one is available for your distribution, however, :ref:`building and installing from sources <wazuh_server_source_installation>` is also pretty straightforward.

There are two components that are usually installed on a Wazuh server: the manager and the API. In addition, Filebeat is needed to forward alerts to Elastic Stack.

In the following table you will find the Wazuh server installation guide for the available operating systems:

+-------------------------------+---------------------------------------------------------------+
| Operating system              | Version                                                       |
+===============================+===============================================================+
| Amazon Linux                  | :ref:`1 or greater <wazuh_server_packages_amazon>`            |
+-------------------------------+---------------------------------------------------------------+
| CentOS                        | :ref:`6 or greater <wazuh_server_packages_centos>`            |
+-------------------------------+---------------------------------------------------------------+
| Debian                        | :ref:`7 or greater <wazuh_server_packages_deb>`               |
+-------------------------------+---------------------------------------------------------------+
| Fedora                        | :ref:`22 or greater <wazuh_server_packages_fedora>`           |
+-------------------------------+---------------------------------------------------------------+
| Oracle Linux                  | :ref:`6 or greater <wazuh_server_packages_oracle>`            |
+-------------------------------+---------------------------------------------------------------+
| OpenSUSE                      | :ref:`42 or greater <wazuh_server_packages_opensuse>`         |
+-------------------------------+---------------------------------------------------------------+
| Red Hat Enterprise Linux      | :ref:`6 or greater <wazuh_server_packages_rhel>`              |
+-------------------------------+---------------------------------------------------------------+
| SUSE                          | :ref:`12 <wazuh_server_packages_suse>`                        |
+-------------------------------+---------------------------------------------------------------+
| Ubuntu                        | :ref:`12.10 or greater <wazuh_server_packages_ubuntu>`        |
+-------------------------------+---------------------------------------------------------------+


After the Wazuh server installation, we strongly recommend to secure the Wazuh API:

- :ref:`Securing the Wazuh API <securing_api>`


.. note::
    Installing Wazuh server on a 64-bit operating system is highly recommended since the Wazuh API is not available on 32-bit platforms. Without the Wazuh API, much of the functionality of the Wazuh Kibana App will not work. Similarly, if you are using Red Hat or CentOS for your Wazuh server platform, make sure it is version 6 or higher to properly install Wazuh API.

.. toctree::
    :hidden:
    :maxdepth: 2

    linux/wazuh_server_packages_amazon
    linux/wazuh_server_packages_centos
    linux/wazuh_server_packages_deb
    linux/wazuh_server_packages_fedora
    linux/wazuh_server_packages_oracle
    linux/wazuh_server_packages_opensuse
    linux/wazuh_server_packages_rhel
    linux/wazuh_server_packages_suse
    linux/wazuh_server_packages_ubuntu


