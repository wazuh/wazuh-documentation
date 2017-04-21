.. _upgrading_elk:

Upgrading ELK stack server
=====================================

#. `Keep Elastic 2 with Wazuh 2.0`_
#. `Update from Elastic 2 to Elastic 5`_

Keep Elastic 2 with Wazuh 2.0
-----------------------------------------

If you had Elastic2 in your previous installation and you don't want to update to Elastic 5, you only need to configure Elastic 2 to work with Wazuh 2.0.

Configure Logstash
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Download the new logstash configuration:

	 ::

		curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/logstash/01-wazuh.conf
		curl -so /etc/logstash/wazuh-elastic2-template.json https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/elasticsearch/wazuh-elastic2-template.json

#. In the output section, comment the line for elastic5-template and uncomment the line for elastic2-template on the ``/etc/logstash/conf.d/01-wazuh.conf``:

		::

			output {
			  elasticsearch {
			  hosts => ["localhost:9200"]
			  index => "wazuh-alerts-%{+YYYY.MM.dd}"
			  document_type => "wazuh"
				#      template => "/etc/logstash/wazuh-elastic5-template.json"
				      template => "/etc/logstash/wazuh-elastic2-template.json"
				      template_name => "wazuh"
				      template_overwrite => true
				}
			}

#. If you are using a **single-server** architecture:

	Edit ``/etc/logstash/conf.d/01-wazuh.conf`` commenting out the entire input section titled **Remote Wazuh Manager - Filebeat input** and uncommenting the entire input section titled **Local Wazuh Manager - JSON file input**.
	::

		# Wazuh - Logstash configuration file
		## Remote Wazuh Manager - Filebeat input
		#input {
		#beats {
		#      port => 5000
		#      codec => "json_lines"
		#      ssl => true
		#      ssl_certificate => "/etc/logstash/logstash.crt"
		#      ssl_key => "/etc/logstash/logstash.key"
		#  }
		#}
		# Local Wazuh Manager - JSON file input
		input {
		   file {
		       type => "wazuh-alerts"
		       path => "/var/ossec/logs/alerts/alerts.json"
		       codec => "json"
		   }
		}
		...

	This will set up Logstash to read the Wazuh ``alerts.json`` file directly from the local filesystem rather than expecting Filebeat on a separate server to forward the information in that file to Logstash.


Configure Kibana
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Go to Settings and configure a new wildcard

	.. image:: ../../images/installation/kibana-elk2-set.png
			:align: center
			:width: 100%

#. Set ``wazuh-*`` as wildcard and choose ``timestamp`` as time field:

	.. image:: ../../images/installation/kibana-elk2.png
			:align: center
			:width: 100%

	Click on Create

#. Set as default wildcard by clicking on the Star.

	.. image:: ../../images/installation/kibana-elk.png
			:align: center
			:width: 100%

#. Go to Discover tag

Update from Elastic 2 to Elastic 5
-----------------------------------------

If you had Elastic2 in your previous installation and you want to update it to Elastic 5, you should follow this guide. This will update your current installation.

#. Stop the running Logstash, Elasticsearch and kibana instance

	a) For Systemd::

		systemctl stop logstash.service
		systemctl stop elasticsearch.service
		systemctl stop kibana.service

	b) For SysV Init::

		service logstash stop
		service elasticsearch stop
		service kibana stop

#. Remove logstash old configuration and template files:

	Singlehost Configuration::

		rm /etc/logstash/conf.d/01-ossec-singlehost.conf
		rm /etc/logstash/elastic-ossec-template.json

	Distributed Configuration::

		rm /etc/logstash/conf.d/01-ossec.conf
		rm /etc/logstash/elastic-ossec-template.json

#. Remove old configuration:

	To avoid conflicts and errors, we are going to remove old configuration of our elasticsearch.

	Comment the following lines on your ``/etc/elasticsearch/elasticsearch.yml``::

		index.number_of_shards: 1
		index.number_of_replicas: 0

	``ES_HEAP_SIZE`` option is now deprecated. If you were using that option on your ``/etc/sysconfig/elasticsearch`` you should remove or comment that line::

		# ES_HEAP_SIZE - Set it to half your system RAM memory
		ES_HEAP_SIZE=8g

	And configure it following the Elastic `jvm.options guide <https://www.elastic.co/guide/en/elasticsearch/reference/master/heap-size.html>`_

#. Follow the installation guide:

	 - :ref:`Install ELK stach with RPM packages <elastic_server_rpm>`
	 - :ref:`Install ELK stach with Deb packages <elastic_server_deb>`

#. To check that eveything worked as expected, check the verions

	Logstash
	::

		$ /usr/share/logstash/bin/logstash -V
		logstash 5.2.2

	Elasticsearch
	::

		$ /usr/share/elasticsearch/bin/elasticsearch -V
		Version: 5.2.2, Build: f9d9b74/2017-02-24T17:26:45.835Z, JVM: 1.8.0_60

	Kibana
	::

		$ /usr/share/kibana/bin/kibana -V
		5.2.

Migrating previous alerts
-----------------------------------------

Wazuh 2 uses different indices and templates than Wazuh 1.1.1. For that reason, you will not be able to see the previous alerts using Kibana. It will be necessary to reindex all the previous indices in case you need to consult the alerts previous to the upgrade.
