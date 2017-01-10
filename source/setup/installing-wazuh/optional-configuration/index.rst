.. _optional_configuration:

Optional configuration
===============================

ToDo

Encrypting communications between Wazuh and Elastic servers
-------------------------------------------------------------------------

By default, the communications between Wazuh server (Filebeat) and Elastic Stack server (Logstash) are not encrypted. It’s strongly recommended to configure Logstash to use SSL encryption. Please follow the next guide to setting up SSL for Filebeat and Logstash.

.. toctree::
	:maxdepth: 1

	elastic_ssl
