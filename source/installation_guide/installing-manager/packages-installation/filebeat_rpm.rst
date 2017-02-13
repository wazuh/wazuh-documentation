.. _filebeat_rpm:

Install Filebeat (rpm)
===============================

Filebeat is the tool that will read the alerts and archived events, forwarding the data to the Logstash server (on the ELK cluster).

The rpm package is suitable for installation on Red Hat, Centos and other RPM-based systems.

1. Install the GPG keys from Elastic and the Elastic repository::

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

2. Install Filebeat::

	yum install filebeat

3. Download the settings template for Filebeat from the Wazuh repository::

	curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/filebeat/filebeat.yml

4. Edit the file ``/etc/filebeat/filebeat.yml`` and replace *ELASTIC_SERVER_IP* for the IP address or the hostname of the Elastic Stack server. For example::

	output:
	  logstash:
	    hosts: ["ELASTIC_SERVER_IP:5000"]

.. warning::
    In case you are setting up a single-host architecture (Wazuh Manager and Elastic stack on the same server, use **localhost** as *ELASTIC_SERVER_IP*.

5. Enable and start the Filebeat service:

	a) For Systemd::

		systemctl daemon-reload
		systemctl enable filebeat.service
		systemctl start filebeat.service

	b) For SysV Init::

		chkconfig --add filebeat
		service filebeat start

Next steps
----------

Once you've installed the Wazuh manager and Filebeat, you need to :ref:`install Elastic Stack <elastic_server_rpm>`.
