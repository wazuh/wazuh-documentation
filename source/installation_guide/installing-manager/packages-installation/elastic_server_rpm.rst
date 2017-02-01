.. _elastic_server_rpm:

Install Elastic server (rpm)
================================

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
	The default Logstash installation doesn't encrypt the communication. It's strongly recommended to configure Logstash to use SSL encryption. Please read :ref:`elastic_ssl`.

.. note::
	You can get more detailed information at the `Official Logstash Installation Documentation <https://www.elastic.co/guide/en/logstash/current/installing-logstash.html#package-repositories>`_.

Elasticsearch
-------------

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

.. note::
	You can get more detailed information at the `Official Elasticsearch Installation Documentation <https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html>`_.

Kibana
------

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
