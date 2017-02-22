.. _wazuh_server_deb:

Install Wazuh server with Deb packages
===========================================

For Debian/Ubuntu platforms, installing Wazuh server components is a matter of little more than adding the appropriate repositories and installing the relevant packages from them.

Adding Wazuh repositories
-------------------------------------------

The first thing you need to do is to add the Wazuh repository to your Wazuh server. Alternatively, if you prefer to download the wazuh-manager package directly, you can find it :ref:`here <packages>`.

**1.** In order to perform this procedure properly, packages ``curl`` and ``apt-transport-https`` must be installed into your system. If they are not, install them::

	apt-get install curl apt-transport-https

**2.** Install the GPG key::

	curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -

**3.** Add the Wazuh repository depending on your operating system:

.. note::
	To check your version, you can use: ``lsb_release -a``

- Debian 7 "Wheezy"::

    echo "deb https://packages.wazuh.com/apt wheezy main" | tee /etc/apt/sources.list.d/wazuh.list

- Debian 8 "Jessie"::

    echo "deb https://packages.wazuh.com/apt jessie main" | tee /etc/apt/sources.list.d/wazuh.list

- Debian "stretch"::

    echo "deb https://packages.wazuh.com/apt stretch main" | tee /etc/apt/sources.list.d/wazuh.list

- Debian "sid"::

    echo "deb https://packages.wazuh.com/apt sid main" | tee /etc/apt/sources.list.d/wazuh.list

- Ubuntu 12.04 "Precise Pangolin"::

    echo "deb https://packages.wazuh.com/apt precise main" | tee /etc/apt/sources.list.d/wazuh.list

- Ubuntu 14.04 "Trusty Tahr"::

    echo "deb https://packages.wazuh.com/apt trusty main" | tee /etc/apt/sources.list.d/wazuh.list

- Ubuntu 15.04 "Vivid Vervet"::

    echo "deb https://packages.wazuh.com/apt vivid main" | tee /etc/apt/sources.list.d/wazuh.list

- Ubuntu 15.10 "Wily Werewolf"::

    echo "deb https://packages.wazuh.com/apt wily main" | tee /etc/apt/sources.list.d/wazuh.list

- Ubuntu 16.04 "Xenial Xerus"::

    echo "deb https://packages.wazuh.com/apt xenial main" | tee /etc/apt/sources.list.d/wazuh.list

- Ubuntu 16.10 "Yakkety Yak"::

    echo "deb https://packages.wazuh.com/apt yakkety main" | tee /etc/apt/sources.list.d/wazuh.list

**4.** Update the package information::

	apt-get update


Installing manager
-------------------------------------------

On your terminal, install the Wazuh manager::

	apt-get install wazuh-manager

Once the process is completed, you can check the state with

	a) For Systemd::

			systemctl status wazuh-manager

	b) For SysV Init::

			service wazuh-manager status


Installing Wazuh API
-------------------------------------------

**1.** NodeJS >= 4.6.1 is required in order to run the API. If you do not have installed NodeJS or your version is older than 4.6.1, we recommend you add the official repository like this::

	curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

and then, install nodejs::

	apt-get install nodejs

**2.** Install the Wazuh API. It will update NodeJS if it is required::

	apt-get install wazuh-api

**3.** Once the process is completed, you can check the state with

	a) For Systemd::

			systemctl status wazuh-api

	b) For SysV Init::

			service wazuh-api status

**4.** Python >= 2.7 is required in order to run the API. It is installed by default or included in the official repositories in most Linux distributions.

It is possible to set a custom Python path for the API to use in */var/ossec/api/configuration/config.js*, in case the stock version of Python in your distro is too old::

    config.python = [
        // Default installation
        {
            bin: "python",
            lib: ""
        },
        // Package 'python27' for CentOS 6
        {
            bin: "/opt/rh/python27/root/usr/bin/python",
            lib: "/opt/rh/python27/root/usr/lib64"
        }
    ];

Installing Filebeat
-------------------------------------------

Filebeat is the tool on the Wazuh server that will securely forward the alerts and archived events to the Logstash service on the Elastic Stack server(s).  In a single-server configuration, you may entirely skip installing Filebeat, since Logstash will be able to read the event/alert data directly from the local filesystem without the assistance of a forwarder.

The deb package is suitable for Debian, Ubuntu, and other Debian-based systems.

1. Install the GPG keys from Elastic, and the Elastic repository::

	curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
	apt-get install apt-transport-https
	echo "deb https://artifacts.elastic.co/packages/5.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-5.x.list
	apt-get update

2. Install Filebeat::

	apt-get install filebeat

3. Download the Filebeat config file from the Wazuh repository, which is preconfigured to forward Wazuh alerts to Logstash::

	curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/filebeat/filebeat.yml

4. Edit the file ``/etc/filebeat/filebeat.yml`` and replace *ELASTIC_SERVER_IP* with the IP address or the hostname of the Elastic Stack server. For example::

	output:
	  logstash:
	    hosts: ["ELASTIC_SERVER_IP:5000"]

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

Once you have installed the manager, API, and -- if needed -- Filebeat as well, you are ready to :ref:`install Elastic Stack <elastic_server_deb>`.
