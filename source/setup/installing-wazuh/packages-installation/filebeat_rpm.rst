.. _filebeat_rpm:

Install Filebeat (rpm)
===============================

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

4. Edit the file ``/etc/filebeat/filebeat.yml`` and and replace *YOUR_ELASTIC_SERVER_IP* for the IP address or the hostname of the Elastic server. For example::

	output:
	 logstash:
	   hosts: ["1.2.3.4:5000"]

5. Enable and start the Filebeat service:

	a) For Systemd::

		systemctl daemon-reload
		systemctl enable filebeat.service
		systemctl start filebeat.service

	b) For SysV Init::

		chkconfig --add filebeat
		service filebeat start

.. warning::
	The default installation of Filebeat doesn't encrypt the communication. It's strongly recommended to configure Filebeat to verify the Logstash server through SSL. Please read :ref:`elastic_ssl`.

.. note::
	You can get more info at the `Filebeat Installation Documentation <https://www.elastic.co/guide/en/beats/libbeat/current/setup-repositories.html>`_.

Next steps
----------

Once you've installed the Wazuh manager and Filebeat, you may want to :ref:`Install an Elastic server <elastic_server_rpm>`.
