.. _upgrading_elk:


Update to Elastic 5
===================

#. Add the repositories

	Deb Repositories, install the Elastic repository and its GPG key::

		curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
		apt-get install apt-transport-https
		echo "deb https://artifacts.elastic.co/packages/5.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-5.x.list
		apt-get update

	RPM Repositories, install the Elastic repository and its GPG key::

		rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch

		cat > /etc/yum.repos.d/elastic.repo << EOF
		[elastic-5.x]
		name=Elastic repository for 5.x packages
		baseurl=https://artifacts.elastic.co/packages/5.x/yum
		gpgcheck=1
		gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
		enabled=1
		autorefresh=1
		type=rpm-md
		EOF

Logstash
--------

Logstash is the tool that will collect logs, parse them, and then pass them along to Elasticsearch for indexing and storage. Learn more about `Logstash <https://www.elastic.co/products/logstash>`_

#. Stop the running logstash:

	a) For Systemd::

		systemctl stop logstash.service

	b) For SysV Init::

		service stop start

#. Install the Logstash package:

	Deb Packages::

		apt-get install logstash

	RPM Packages::

		yum install logstash

#. Check the new version of logstash with ``/usr/share/logstash/bin/logstash -V``, the output should be something like::

	$ /usr/share/logstash/bin/logstash -V
	logstash 5.2.2

#. Download the Wazuh config and template files for Logstash::

	curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/logstash/01-wazuh.conf
	curl -so /etc/logstash/wazuh-elastic5-template.json https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/elasticsearch/wazuh-elastic5-template.json

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

	This will set up Logstash to read the Wazuh alerts.json file directly from the local filesystem rather than expecting Filebeat on a separate server to forward the information in that file to Logstash.

	Because Logstash user needs to read ``alerts.json`` file, please add it to OSSEC group by running::

		usermod -a -G ossec logstash

#. If you are running Wazuh server and the Elastic Stack server on separate systems (distributed architecture):

	Configure encryption between Filebeat and Logstash.  To do so, please see :ref:`elastic_ssl`.

#. Enable and start the Logstash service:

	a) For Systemd::

		systemctl daemon-reload
		systemctl enable logstash.service
		systemctl start logstash.service

	b) For SysV Init:

		RPM::

			chkconfig --add logstash
			service logstash start

		Deb::

			update-rc.d logstash defaults 95 10
			service logstash start

Elasticsearch
-------------

Elasticsearch is a highly scalable full-text search and analytics engine. More info `Elastic <https://www.elastic.co/products/elasticsearch>`_.

#. Install the Elasticsearch package:

	Deb Packages::

		apt-get install elasticsearch

	RPM Packages::

		yum install elasticsearch

#. Check the new version of logstash with ``/usr/share/elasticsearch/bin/elasticsearch -V``, the output should be something like::

	$ /usr/share/elasticsearch/bin/elasticsearch -V
	Version: 5.2.2, Build: f9d9b74/2017-02-24T17:26:45.835Z, JVM: 1.8.0_60

#. Remove old configuration:

	To avoid conflicts and errors, we are going to remove old configuration of our elasticsearch.

	Comment the following lines on your ``/etc/elasticsearch/elasticsearch.yml``::

		cluster.name: ossec
		node.name: ossec_node1
		bootstrap.mlockall: true
		index.number_of_shards: 1
		index.number_of_replicas: 0

	Comment the following lines on ``/etc/security/limits.conf``::

		elasticsearch - nofile  65535
		elasticsearch - memlock unlimited

	And finally, comment the following lines on ``/etc/sysconfig/elasticsearch`` ::

		# ES_HEAP_SIZE - Set it to half your system RAM memory
		ES_HEAP_SIZE=8g
		...
		MAX_LOCKED_MEMORY=unlimited
		...
		MAX_OPEN_FILES=65535

#. Enable and start the Elasticsearch service:

	a) For Systemd::

		systemctl daemon-reload
		systemctl enable elasticsearch.service
		systemctl start elasticsearch.service

	b) For SysV Init:

		RPM::

			chkconfig --add elasticsearch
			service elasticsearch start

		Deb::

			update-rc.d elasticsearch defaults 95 10
			service elasticsearch start

Kibana
------
Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch. More info at `Kibana <https://www.elastic.co/products/kibana>`_.

#. Install the Kibana package:

	Deb Packages::

		apt-get install kibana

	RPM Packages::

		yum install kibana

#. Check the new version of logstash with ``/usr/share/kibana/bin/kiban -V``, the output should be something like::

	$ /usr/share/kibana/bin/kibana -V
	5.2.2

#. Install the Wazuh App plugin for Kibana::

	/usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp.zip

#. **Optional.** Kibana will listen only the loopback interface (localhost) by default. To set up Kibana to listen all interfaces, edit the file ``/etc/kibana/kibana.yml``. Uncomment the setting ``server.host`` and change the value to::

	server.host: "0.0.0.0"

#. Enable and start the Kibana service:

	a) For Systemd::

		systemctl daemon-reload
		systemctl enable kibana.service
		systemctl start kibana.service

	b) For SysV Init:

		RPM::

			chkconfig --add kibana
			service kibana start

		Deb::

			update-rc.d kibana defaults 95 10
			service kibana start
