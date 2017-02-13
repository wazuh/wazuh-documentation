.. _elastic_server_deb:

Install Elastic server (deb)
================================

We are setting a distributed architecture. Follow this guide in your **ELK Stack server**.

The deb package is suitable for Debian, Ubuntu, and other Debian-based systems.

Preparation
-----------

1. Oracle Java JRE is necessary for Logstash and Elasticsearch::

	add-apt-repository ppa:webupd8team/java
	apt-get update
	apt-get install oracle-java8-installer

2. We will also install the Elastic repository and the GPG keys from it::

	curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
	apt-get install apt-transport-https
	echo "deb https://artifacts.elastic.co/packages/5.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-5.x.list
	apt-get update

Logstash
--------

Logstash is a tool to collect logs, parse them, and store them for later use. More info `Logstash <https://www.elastic.co/products/logstash>`_

1. Install the Logstash package::

	apt-get install logstash

2. Download the configuration template for Logstash::

	curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/logstash/01-wazuh.conf
	curl -so /etc/logstash/wazuh-elastic5-template.json https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/elasticsearch/wazuh-elastic5-template.json

3. Enable and start the Logstash service:


	a) For Systemd::

		systemctl daemon-reload
		systemctl enable logstash.service
		systemctl start logstash.service

	b) For SysV Init::

		update-rc.d logstash defaults 95 10
		service logstash start

.. warning::
    By default, the communications between Wazuh server (Filebeat) and Elastic Stack (Logstash) are not encrypted. It’s strongly recommended to configure Filebeat and Logstash to use SSL encryption. Please read :ref:`elastic_ssl`.

Elasticsearch
-------------

Elasticsearch is a highly scalable full-text search and analytics engine. More info `Elastic <https://www.elastic.co/products/elasticsearch>`_

1. Install the Elasticsearch package::

	apt-get install elasticsearch

2. Enable and start the Elasticsearch service:

	a) For Systemd::

		systemctl daemon-reload
		systemctl enable elasticsearch.service
		systemctl start elasticsearch.service

	b) For SysV Init::

		update-rc.d elasticsearch defaults 95 10
		service elasticsearch start

Kibana
------
Kibana is a flexible and intuitive visualization dashboard (browser front-end). More info `Kibana <https://www.elastic.co/products/kibana>`_

1. Install the Kibana package::

	apt-get install kibana

2. Install the Wazuh App plugin for Kibana::

	/usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp.zip

3. **Optional.** Kibana will listen only the loopback interface (localhost) by default. To set up Kibana to listen all interfaces, edit the file ``/etc/kibana/kibana.yml``. Uncomment the setting ``server.host`` and change the value to::

	server.host: "0.0.0.0"

4. Enable and start the Kibana service:

	a) For Systemd::

		systemctl daemon-reload
		systemctl enable kibana.service
		systemctl start kibana.service

	b) For SysV Init::

		update-rc.d kibana defaults 95 10
		service kibana start

Connecting the Wazuh App with the API
---------------------------------------------

Follow the next guide in order to connect the Wazuh App with the API:

.. toctree::
	:maxdepth: 1

	connect_wazuh_app
