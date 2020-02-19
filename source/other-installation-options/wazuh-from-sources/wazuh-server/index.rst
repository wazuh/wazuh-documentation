.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Wazuh manager sources installation

.. _wazuh_server_source_installation:

Installing Wazuh server from sources
====================================

The Wazuh server is most commonly installed on Linux. The installation process from sources is pretty straightforward.

There are two components that are usually installed on a Wazuh server: the manager and the API. In addition, Filebeat is needed to forward alerts to Elastic Stack.

In the following table you will find the Wazuh server installation guide for the available operating systems:

+-------------------------------+---------------------------------------------------------+
| Operating system              | Version                                                 |
+===============================+=========================================================+
| Amazon Linux                  | :ref:`1 or greater <wazuh_server_sources_amazon>`       |
+-------------------------------+---------------------------------------------------------+
| CentOS                        | :ref:`6 or greater <wazuh_server_sources_centos>`       |
+-------------------------------+---------------------------------------------------------+
| Debian                        | :ref:`7 or greater <wazuh_server_sources_deb>`          |
+-------------------------------+---------------------------------------------------------+
| Fedora                        | :ref:`22 or greater <wazuh_server_sources_fedora>`      |
+-------------------------------+---------------------------------------------------------+
| Oracle Linux                  | :ref:`6 or greater <wazuh_server_sources_oracle>`       |
+-------------------------------+---------------------------------------------------------+
| OpenSUSE                      | :ref:`42 or greater <wazuh_server_sources_opensuse>`    |
+-------------------------------+---------------------------------------------------------+
| Red Hat Enterprise Linux      | :ref:`6 or greater <wazuh_server_sources_rhel>`         |
+-------------------------------+---------------------------------------------------------+
| SUSE                          | :ref:`12 <wazuh_server_sources_suse>`                   |
+-------------------------------+---------------------------------------------------------+
| Ubuntu                        | :ref:`12.10 or greater <wazuh_server_sources_ubuntu>`   |
+-------------------------------+---------------------------------------------------------+



After the Wazuh server installation, we strongly recommend to secure the Wazuh API:

- :ref:`Securing the Wazuh API <securing_api>`


.. note::
    Installing Wazuh server on a 64-bit operating system is highly recommended since the Wazuh API is not available on 32-bit platforms. Without the Wazuh API, much of the functionality of the Wazuh Kibana App will not work. Similarly, if you are using Red Hat or CentOS for your Wazuh server platform, make sure it is version 6 or higher to properly install Wazuh API.

.. toctree::
    :hidden:
    :maxdepth: 1

    wazuh_server_sources_amazon
    wazuh_server_sources_centos
    wazuh_server_sources_deb
    wazuh_server_sources_fedora
    wazuh_server_sources_oracle
    wazuh_server_sources_opensuse
    wazuh_server_sources_rhel
    wazuh_server_sources_suse
    wazuh_server_sources_ubuntu