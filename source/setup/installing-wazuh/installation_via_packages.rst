.. _installation_main:

Installation via packages
======================================

This installation guide describes the installation and configuration of Wazuh in two servers:

- Elastic Stack server: Runs the Elasticsearch engine, Logstash server and Kibana (including the Wazuh App).
- Wazuh server: Runs the Wazuh Manager, API and Filebeat.

In case you want to install everything in the same server (single-host arquitecture), :ref:`review this section <singlehost_installation>` before continuing.

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

Installing Wazuh server
-----------------------

These services will typically be installed on a machine other than the Elastic server.

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

These are the steps to install Elastic Stack server, and configure it to work with Wazuh. The other server, Wazuh manager, which will usually run in a different machine.

**Debian, Ubuntu, and other Debian-based systems**

.. toctree::
    :maxdepth: 1

    elastic_server_deb


**Red Hat, CentOS and other RPM-based systems**

.. toctree::
    :maxdepth: 1

    elastic_server_rpm


Encrypting communications between Wazuh and Elastic servers
-------------------------------------------------------------------------

By default, the communications between Wazuh server (Filebeat) and Elastic Stack server (Logstash) are not encrypted. It’s strongly recommended to configure Logstash to use SSL encryption. Please follow the next guide to setting up SSL for Filebeat and Logstash.

.. toctree::
	:maxdepth: 1

	elastic_ssl
