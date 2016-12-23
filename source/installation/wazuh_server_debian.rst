.. _wazuh_server_debian:

Install Wazuh manager on Debian
===============================

Wazuh Manager and API
---------------------

1. Install the GPG key::

	curl -s https://packages.wazuh.com/key/RPM-GPG-KEY-WAZUH | apt-key add -

2. Add the Wazuh repository depending on your operating system:

	- Debian 7 "Wheezy"::

		echo "deb http://packages.wazuh.com/apt/debian wheezy main" | tee /etc/apt/sources.list.d/wazuh.list

	- Debian 8 "Jessie"::

		echo "deb http://packages.wazuh.com/apt/debian jessie main" | tee /etc/apt/sources.list.d/wazuh.list

	- Debian "stretch" (testing)::

		echo "deb http://packages.wazuh.com/apt/debian stretch main" | tee /etc/apt/sources.list.d/wazuh.list

	- Debian "sid" (unstable)::

		echo "deb http://packages.wazuh.com/apt/debian sid main" | tee /etc/apt/sources.list.d/wazuh.list

	- Ubuntu 12.04 "Precise Pangolin"::

		echo "deb http://packages.wazuh.com/apt/ubuntu precise main" | tee /etc/apt/sources.list.d/wazuh.list

	- Ubuntu 14.04 "Trusty Tahr"::

		echo "deb http://packages.wazuh.com/apt/ubuntu trusty main" | tee /etc/apt/sources.list.d/wazuh.list

	- Ubuntu 15.04 "Vivid Vervet"::

		echo "deb http://packages.wazuh.com/apt/ubuntu vivid main" | tee /etc/apt/sources.list.d/wazuh.list

	- Ubuntu 15.10 "Wily Werewolf"::

		echo "deb http://packages.wazuh.com/apt/ubuntu wily main" | tee /etc/apt/sources.list.d/wazuh.list

	- Ubuntu 16.04 "Xenial Xerus"::

		echo "deb http://packages.wazuh.com/apt/ubuntu xenial main" | tee /etc/apt/sources.list.d/wazuh.list

	- Ubuntu 16.10 "Yakkety Yak"::

		echo "deb http://packages.wazuh.com/apt/ubuntu yakkety main" | tee /etc/apt/sources.list.d/wazuh.list

3. Update the package information and install the Wazuh packages::

	apt-get update
	apt-get install wazuh-manager wazuh-api

Filebeat
--------

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

.. note::
	You can get more info at the `Filebeat Installation Documentation <https://www.elastic.co/guide/en/beats/libbeat/current/setup-repositories.html>`_.
