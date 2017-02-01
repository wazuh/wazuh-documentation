.. _installation_main:

Installation via packages
======================================

This guide describes the installation of Wazuh using packages. We will setup a distributed architecture based on two servers:

 - **Wazuh server**: Runs the Wazuh Manager, API, Filebeat and OpenSCAP scanner.
 - **Elastic Stack server**: Runs the Elasticsearch engine, Logstash server and Kibana (including the Wazuh App).

.. thumbnail:: ../../../images/installation/installing_wazuh.png
    :title: Installing Wazuh Manager
    :align: center
    :width: 100%

Review :ref:`Single-host architecture installation <singlehost_installation>` in case you need a *single-host architecture* (Wazuh Manager and Elastic stack on the same server).

.. warning::
	Some of the following command require to be run with **root privileges**. You may become *root* by executing one of the following command at the begining of the session::

		$ su
		$ sudo -s

.. note::
	Some of the instructions below depend on your machine's init system. If you aren't sure about which init system you have, check it with the following command::

		$ ps -p 1

.. note::
	Before installing the components please configure your **NTP** to sync time.


Follow the next guides to install and configure Wazuh Manager:

Debian-based systems
-------------------------------------------------

.. topic:: Wazuh server

    .. toctree::
        :maxdepth: 1

        wazuh_server_deb
        filebeat_deb

.. topic:: Elastic stack server

    .. toctree::
        :maxdepth: 1

        elastic_server_deb

RPM-based systems
-------------------------------------------------

.. topic:: Wazuh server

    .. toctree::
        :maxdepth: 1

        wazuh_server_rpm
        filebeat_rpm

.. topic:: Elastic stack server

    .. toctree::
        :maxdepth: 1

        elastic_server_rpm
