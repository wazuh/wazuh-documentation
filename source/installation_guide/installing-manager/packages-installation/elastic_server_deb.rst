.. _elastic_server_deb:

Install Elastic server (deb)
================================

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
	The default installation of Logstash doesn't encrypt the communication. It's strongly recommended to configure Logstash to use SSL encryption. Please read :ref:`elastic_ssl`.

.. note::
	You can get more detailed information at the `Official Logstash Installation Documentation <https://www.elastic.co/guide/en/logstash/current/installing-logstash.html#package-repositories>`_.

Elasticsearch
-------------

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

.. note::
	You can get more detailed information at the `Official Elasticsearch Installation Documentation <https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html>`_.

Kibana
------

1. Install the Kibana package::

	apt-get install kibana

2. Install the Wazuh App plugin for Kibana::

	/usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp.zip

3. **Optional.** Kibana will listen only the loopback interface (localhost) by defualt. To set up Kibana to listen all interfaces, edit the file ``/etc/kibana/kibana.yml``. Uncomment the setting ``server.host`` and change the value to::

	server.host: "0.0.0.0"

4. Enable and start the Kibana service:

	a) For Systemd::

		systemctl daemon-reload
		systemctl enable kibana.service
		systemctl start kibana.service

	b) For SysV Init::

		update-rc.d kibana defaults 95 10
		service kibana start

.. note::
	You can get more detailed information at the `Official Kibana Installation Documentation <https://www.elastic.co/guide/en/kibana/current/install.html>`_.

Connecting the Wazuh App with the API
---------------------------------------------

Follow the next guide in order to connect the Wazuh App with the API:

.. toctree::
	:maxdepth: 1

	connect_wazuh_app

Next steps
----------

When you finish installing the Elastic server it's important to configure SSL: :ref:`elastic_ssl`.
