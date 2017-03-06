.. _elastic_server_rpm:

Install Elastic Stack with RPM packages
==========================================

The rpm packages are suitable for installation on Red Hat, CentOS and other RPM-based systems.

Preparation
-----------

1. Oracle Java JRE is required by Logstash and Elasticsearch::

	curl -Lo jdk-8-linux-x64.rpm --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u111-b14/jdk-8u111-linux-x64.rpm
	yum install jdk-8-linux-x64.rpm
	rm jdk-8-linux-x64.rpm

2. We will also install the Elastic repository and its GPG key::

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

1. Install the Logstash package::

	yum install logstash

2. Download the Wazuh config and template files for Logstash::

	curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/logstash/01-wazuh.conf
	curl -so /etc/logstash/wazuh-elastic5-template.json https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/elasticsearch/wazuh-elastic5-template.json

3. **If you are using a single-server architecture**, then edit /etc/logstash/conf.d/01-wazuh.conf, commenting out the entire input section titled "Remote Wazuh Manager - Filebeat input" and uncommenting the entire input section titled "Local Wazuh Manager - JSON file input".  This will set up Logstash to read the Wazuh alerts.json file directly from the local filesystem rather than expecting Filebeat on a separate server to forward the information in that file to Logstash. Because Logstash user needs to read alerts.json file, please add it to OSSEC group by running::

	usermod -a -G ossec logstash

4. Enable and start the Logstash service:

	a) For Systemd::

		systemctl daemon-reload
		systemctl enable logstash.service
		systemctl start logstash.service

	b) For SysV Init::

		chkconfig --add logstash
		service logstash start

.. note::

    If you are running Wazuh server and the Elastic Stack server on separate systems (**distributed architecture**), then it is important to configure encryption between Filebeat and Logstash. To do so, please see :ref:`elastic_ssl`.

Elasticsearch
-------------

Elasticsearch is a highly scalable full-text search and analytics engine. More info at `Elastic <https://www.elastic.co/products/elasticsearch>`_.

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

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch. More info at `Kibana <https://www.elastic.co/products/kibana>`_.

1. Install the Kibana package::

	yum install kibana

2. Install the Wazuh App plugin for Kibana::

	/usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp.zip

3. **Optional.** Kibana will listen only on the loopback interface (localhost) by default. To set up Kibana to listen on all interfaces, edit the file ``/etc/kibana/kibana.yml``. Uncomment the setting ``server.host`` and change the value to::

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
