.. _filebeat_deb:

Install Filebeat (deb)
===============================

The deb package is suitable for Debian, Ubuntu, and other Debian-based systems.

1. Install the GPG keys from Elastic and the Elastic repository::

	curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
	apt-get install apt-transport-https
	echo "deb https://artifacts.elastic.co/packages/5.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-5.x.list
	apt-get update

2. Install Filebeat::

	apt-get install filebeat

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

		update-rc.d filebeat defaults 95 10
		service filebeat start

.. warning::
	The default installation of Filebeat doesn't encrypt the communication. It's strongly recommended to configure Filebeat to verify the Logstash server through SSL. Please read :ref:`elastic_ssl`.

.. note::
	You can get more info at the `Filebeat Installation Documentation <https://www.elastic.co/guide/en/beats/libbeat/current/setup-repositories.html>`_.

Next steps
----------

Once you've installed the Wazuh manager and Filebeat, you may want to :ref:`Install an Elastic server <elastic_server_deb>`.
