.. _upgrading_elastic_stack:

Upgrading Elastic Stack server
==============================

Although Wazuh v2.0 is compatible both with Elastic Stack 2.X and 5.X, it is recommended to run it with version 5.X. This is because our Wazuh Kibana App it is not compatible with Elastic Stack 2.X. In any case, here is a brief description of the upgrade process, no matter which version of the cluster you decide to keep.

#. `Keep using Elastic Stack 2.X`_
#. `Upgrade from Elastic Stack 2.X to 5.X`_

Keep using Elastic Stack 2.X
----------------------------

In this scenario you will only need to configure Logstash to receive data from Filebeat (or, for single-host architectures, to read it directly from Wazuh) and feed the Elasticsearch using the Wazuh alerts template:

Configure Logstash
^^^^^^^^^^^^^^^^^^

#. Download the new logstash configuration::

    curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/logstash/01-wazuh.conf
    curl -so /etc/logstash/wazuh-elastic2-template.json https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/elasticsearch/wazuh-elastic2-template.json

#. In the output section of ``/etc/logstash/conf.d/01-wazuh.conf``, comment the line for ``elastic5-template`` and uncomment the line for ``elastic2-template``:: 

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

#. *Only if you are using a single-host architecture* (where Wazuh server is running with Elastic Stack in the same host), edit ``/etc/logstash/conf.d/01-wazuh.conf`` commenting out the entire input section titled ``Remote Wazuh Manager - Filebeat input`` and uncommenting the entire input section titled ``Local Wazuh Manager - JSON file input``::

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

   This configuration will set up Logstash to read the Wazuh ``alerts.json`` file directly from the local filesystem rather than expecting Filebeat on a separate server to ship the data to it.


Configure Kibana
^^^^^^^^^^^^^^^^

Below we will configure Kibana index pattern, in order to display Wazuh alerts data.

#. Go to Settings and configure a new wildcard:

  .. image:: ../../images/installation/kibana-elk2-set.png
    :align: center
    :width: 100%

#. Set ``wazuh-*`` as index pattern and choose ``timestamp`` as time field, then click on create:

  .. image:: ../../images/installation/kibana-elk2.png
    :align: center
    :width: 100%

#. Set as default wildcard by clicking on the Star:

  .. image:: ../../images/installation/kibana-elk.png
    :align: center
    :width: 100%

#. Go to the ``Discover`` tab in order to visualize the alerts data.

Upgrade from Elastic Stack 2.X to 5.X
-------------------------------------

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
