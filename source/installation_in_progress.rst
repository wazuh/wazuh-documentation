.. _installation_in_progress:

Installation guide [in progress]
===================================

This installation guide describes the installation and configuration of Wazuh in two servers:

- Elastic Stack server: Runs the Elasticsearch engine, Logstash server and Kibana (including the Wazuh App).
- Wazuh server: Runs the Wazuh Manager, API and Filebeat.

.. warning::
	Some of the following command require to be run with **root privileges**. You may become *root* by executing one of the following command at the begining of the session::

		$ su
		$ sudo -s

.. note::
	Some of the instructions below depend on your machine's init system. If you aren't sure about which init system you have, check it with the following command::

		$ ps -p 1

.. note::
	Before installing the components please configure your NTP to sync time.

Installing Wazuh server
-----------------------

These services will typically be installed on a machine other than the Elastic server.

.. toctree::
	:maxdepth: 2

	installation/wazuh_server_debian
	installation/wazuh_server_centos

- :ref:`wazuh_server_debian`.
- :ref:`wazuh_server_centos`.

Installing Elastic Stack server
-------------------------------

These are the steps to install Elastic Stack server, and configure it to work with Wazuh. The other server, Wazuh manager, which will usually run in a different machine.

.. toctree::
	:maxdepth: 2

	installation/elastic_server_debian
	installation/elastic_server_centos
	installation/elastic_ssl
	installation/connect_wazuh_app

- :ref:`elastic_server_debian`.
- :ref:`elastic_server_centos`.
- :ref:`elastic_ssl`.
- :ref:`connect_wazuh_app`.

Installing and connecting Wazuh agents
--------------------------------------

.. toctree::
	:maxdepth: 2

	installation/wazuh_agent_debian
	installation/wazuh_agent_centos
	installation/wazuh_agent_connect

- :ref:`wazuh_agent_debian`.
- :ref:`wazuh_agent_centos`.
- :ref:`wazuh_agent_connect`.
