.. _configure_logstash:

Configure Logstash
==========================================

#. Download the new logstash configuration:

	.. warning::
		review 01-wazuh.conf to use elastic2-template.

			 ::

				curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/logstash/01-wazuh.conf
				curl -so /etc/logstash/wazuh-elastic2-template.json https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/elasticsearch/wazuh-elastic2-template.json

#. If you are using a single-server architecture:

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
