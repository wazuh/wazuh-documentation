.. _filebeat_deb:

Install Filebeat (deb)
===============================

Filebeat is the tool that will read the alerts and archived events, forwarding the data to the Logstash server (on the ELK cluster).

The deb package is suitable for Debian, Ubuntu, and other Debian-based systems.

1. Install the GPG keys from Elastic and the Elastic repository::

	curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
	apt-get install apt-transport-https
	echo "deb https://artifacts.elastic.co/packages/5.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-5.x.list
	apt-get update

2. Install Filebeat::

	apt-get install filebeat

3. Download the settings template for Filebeat from the Wazuh repository, this template will let Elasticsearch know which field should be analyzed in which way::

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

		update-rc.d filebeat defaults 95 10
		service filebeat start

Next steps
----------

Once you have installed the manager and Filebeat, you need to :ref:`install Elastic Stack <elastic_server_deb>`.
