.. _elastic_server_rpm:

Install Elastic server (rpm)
================================

We are setting a distributed architecture. Follow this guide in your **ELK Stack server**.

The rpm package is suitable for installation on Red Hat, Centos and other RPM-based systems.

Preparation
-----------

1. Oracle Java JRE is necessary for Logstash and Elasticsearch::

	curl -Lo jdk-8-linux-x64.rpm --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u111-b14/jdk-8u111-linux-x64.rpm
	yum install jdk-8-linux-x64.rpm
	rm jdk-8-linux-x64.rpm

2. We will also install the Elastic repository and the GPG keys from it::

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

Logstash is a tool to collect logs, parse them, and store them for later use. More info `Logstash <https://www.elastic.co/products/logstash>`_

1. Install the Logstash package::

	yum install logstash

2. Download the configuration template for Logstash::

	curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/logstash/01-wazuh.conf
	curl -so /etc/logstash/wazuh-elastic5-template.json https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/elasticsearch/wazuh-elastic5-template.json

3. Enable and start the Logstash service:

	a) For Systemd::

		systemctl daemon-reload
		systemctl enable logstash.service
		systemctl start logstash.service

	b) For SysV Init::

		chkconfig --add logstash
		service logstash start

.. warning::
    By default, the communications between Wazuh server (Filebeat) and Elastic Stack (Logstash) are not encrypted. It’s strongly recommended to configure Filebeat and Logstash to use SSL encryption. Please read :ref:`elastic_ssl`.

Elasticsearch
-------------

Elasticsearch is a highly scalable full-text search and analytics engine. More info `Elastic <https://www.elastic.co/products/elasticsearch>`_

1. Install the Elasticsearch package::

	yum install elasticsearch

2. Enable and start the Elasticsearch service:

	a) For Systemd::

		systemctl daemon-reload
		systemctl enable elasticsearch.service
		systemctl start elasticsearch.service

	b) For SysV Init::

		chkconfig --add elasticsearch
		service elasticsearch start

Kibana
------

Kibana is a flexible and intuitive visualization dashboard (browser front-end). More info `Kibana <https://www.elastic.co/products/kibana>`_

1. Install the Kibana package::

	yum install kibana

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

		chkconfig --add kibana
		service kibana start


Connecting the Wazuh App with the API
---------------------------------------------

Follow the next guide in order to connect the Wazuh App with the API:

.. toctree::
	:maxdepth: 1

	connect_wazuh_app
