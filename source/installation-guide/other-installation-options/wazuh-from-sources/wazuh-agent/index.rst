.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_agent_source_installation:

Installing Wazuh agent from sources
===================================

The Wazuh server can be installed on any Unix-like operating system. It is most commonly installed on Linux. The installation process is easier via the packages if one is available for your distribution, however, building and installing from sources is also pretty straightforward.

There are two components that are usually installed on a Wazuh server: the manager and the API. In addition, **Filebeat** is needed to forward alerts to Elastic Stack.

There are several options for installing the Wazuh server depending on the operating system and whether or not you wish to build from sources. Consult the table below and choose how to proceed:

+------------------------------------------------+-----------------------------------------------------+
| Type                                           | Description                                         |
+================================================+=====================================================+
| :ref:`Linux <wazuh_agent_sources_linux>`       | Install Wazuh agent from sources on Linux.          |
+------------------------------------------------+-----------------------------------------------------+
| :ref:`macOS <wazuh_agent_sources_macos>`       | Install Wazuh agent from sources on macOS.          |
+------------------------------------------------+-----------------------------------------------------+
| :ref:`Solaris <wazuh_agent_sources_solaris>`   | Install Wazuh agent from sources on Solaris         |
+------------------------------------------------+-----------------------------------------------------+
| :ref:`Windows <wazuh_agent_sources_windows>`   | Install Wazuh agent from sources on Windows.        |
+------------------------------------------------+-----------------------------------------------------+

There are some related additional configurations that can be applied:

- :ref:`Securing the Wazuh API <securing_api>`


.. note::
    Installing Wazuh server on a 64-bit operating system is highly recommended since the Wazuh API is not available on 32-bit platforms. Without the Wazuh API, much of the functionality of the Wazuh Kibana App will not work. Similarly, if you are using Red Hat or CentOS for your Wazuh server platform, make sure it is version 6 or higher to properly install Wazuh API.

.. toctree::
    :hidden:
    :maxdepth: 2

    linux/index
    wazuh_agent_sources_macos
    solaris/index
    wazuh_agent_sources_windows

