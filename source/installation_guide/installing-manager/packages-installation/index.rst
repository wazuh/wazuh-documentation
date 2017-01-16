.. _installation_main:

Installation via packages
======================================

This guide describes the installation of Wazuh using packages. We will setup a distributed architecture based on two servers:

 - **Elastic Stack server**: Runs the Elasticsearch engine, Logstash server and Kibana (including the Wazuh App).
 - **Wazuh server**: Runs the Wazuh Manager, API, Filebeat and OpenSCAP scanner.

.. thumbnail:: ../../../images/installation/installing_wazuh.png
    :title: Alert visualization at Kibana discover
    :align: center
    :width: 100%

Review :ref:`Single-host architecture installation <singlehost_installation>` in case you need a *single-host architecture* (Wazuh Manager in the same server).

.. warning::
	Some of the following command require to be run with **root privileges**. You may become *root* by executing one of the following command at the begining of the session::

		$ su
		$ sudo -s

.. note::
	Some of the instructions below depend on your machine's init system. If you aren't sure about which init system you have, check it with the following command::

		$ ps -p 1

.. note::
	Before installing the components please configure your NTP to sync time.


.. _installing_wazuh_server:

Installing Wazuh Manager
------------------------

Follow the next guides to install and configure Wazuh Manager in the first server:

**Debian, Ubuntu, and other Debian-based systems**

.. toctree::
    :maxdepth: 1

    wazuh_server_deb
    filebeat_deb


**Red Hat, CentOS and other RPM-based systems**

.. toctree::
    :maxdepth: 1

    wazuh_server_rpm
    filebeat_rpm


.. _installation_elastic:

Installing Elastic Stack server
-------------------------------

Follow the proper guide to install and configure Elastic Stack in the second server:

**Debian, Ubuntu, and other Debian-based systems**

.. toctree::
    :maxdepth: 1

    elastic_server_deb


**Red Hat, CentOS and other RPM-based systems**

.. toctree::
    :maxdepth: 1

    elastic_server_rpm
