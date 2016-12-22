.. _installation_in_progress:

Installation guide [in progress]
===================================

This installation guide describes the installation and configuration of Wazuh in two servers:

- Elastic Stack server: Runs the Elasticsearch engine, Logstash server and Kibana (including the Wazuh App).
- Wazuh server: Runs the Wazuh Manager, API and Filebeat.

.. note:: Before installing the components please configure your NTP to sync time.

.. note:: Some of the instructions below depend on your machine's init system. You can check it with the command: ``ps -p 1``

Installing Wazuh server
-----------------------

These services will typically be installed on a machine other than the Elastic server.

Debian/Ubuntu
^^^^^^^^^^^^^

Wazuh Manager and API
"""""""""""""""""""""

1. Install the GPG key:

::

	curl -s https://s3-us-west-1.amazonaws.com/packages.wazuh.com/key/RPM-GPG-KEY-WAZUH | sudo apt-key add -

2. Add the Wazuh repository depending on your operating system:

+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Debian 7 "Wheezy"               | ``echo "deb http://packages.wazuh.com/apt/debian wheezy main" | sudo tee /etc/apt/sources.list.d/wazuh.list``  |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Debian 8 "Jessie"               | ``echo "deb http://packages.wazuh.com/apt/debian jessie main" | sudo tee /etc/apt/sources.list.d/wazuh.list``  |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Debian "stretch" (testing)      | ``echo "deb http://packages.wazuh.com/apt/debian stretch main" | sudo tee /etc/apt/sources.list.d/wazuh.list`` |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Debian "sid" (unstable)         | ``echo "deb http://packages.wazuh.com/apt/debian sid main" | sudo tee /etc/apt/sources.list.d/wazuh.list``     |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Ubuntu 12.04 "Precise Pangolin" | ``echo "deb http://packages.wazuh.com/apt/ubuntu precise main" | sudo tee /etc/apt/sources.list.d/wazuh.list`` |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Ubuntu 14.04 "Trusty Tahr"      | ``echo "deb http://packages.wazuh.com/apt/ubuntu trusty main" | sudo tee /etc/apt/sources.list.d/wazuh.list``  |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Ubuntu 15.04 "Vivid Vervet"     | ``echo "deb http://packages.wazuh.com/apt/ubuntu vivid main" | sudo tee /etc/apt/sources.list.d/wazuh.list``   |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Ubuntu 15.10 "Wily Werewolf"    | ``echo "deb http://packages.wazuh.com/apt/ubuntu wily main" | sudo tee /etc/apt/sources.list.d/wazuh.list``    |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Ubuntu 16.04 "Xenial Xerus"     | ``echo "deb http://packages.wazuh.com/apt/ubuntu xenial main" | sudo tee /etc/apt/sources.list.d/wazuh.list``  |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Ubuntu 16.10 "Yakkety Yak"      | ``echo "deb http://packages.wazuh.com/apt/ubuntu yakkety main" | sudo tee /etc/apt/sources.list.d/wazuh.list`` |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+

3. Update the package information and install the Wazuh packages:

::

	sudo apt-get update
	sudo apt-get install wazuh-manager wazuh-api

Filebeat
""""""""

1. Install the GPG keys from Elastic and the Elastic repository:

::

	curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
	sudo apt-get install apt-transport-https
	echo "deb https://artifacts.elastic.co/packages/5.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-5.x.list
	sudo apt-get update

2. Install Filebeat:

::

	sudo apt-get install filebeat

3. Download the settings template for Filebeat from the Wazuh repository:

::

	curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/filebeat/filebeat.yml

4. Edit the file ``/etc/filebeat/filebeat.yml`` and and replace *YOUR_ELASTIC_SERVER_IP* for the IP address or the hostname of the Elastic server.

5. Enable and start the Filebeat service:

+-------------+-----------------------------------------------+
| Init system | Commands                                      |
+=============+===============================================+
| SysV Init   || ``sudo update-rc.d filebeat defaults 95 10`` |
|             || ``sudo service filebeat start``              |
+-------------+-----------------------------------------------+
| Systemd     || ``sudo systemctl daemon-reload``             |
|             || ``sudo systemctl enable filebeat.service``   |
|             || ``sudo systemctl start filebeat.service``    |
+-------------+-----------------------------------------------+

.. note:: You can get more info at the `Filebeat Installation Documentation <https://www.elastic.co/guide/en/beats/libbeat/current/setup-repositories.html>`_.

RHEL/CentOS/Fedora
^^^^^^^^^^^^^^^^^^

Wazuh Manager and API
"""""""""""""""""""""

1. First we'll install the Wazuh repository. Run the following command depending on your operating system:

+---------------+----------------------------------------------------------------------+
| RHEL / CentOS || sudo cat > /etc/yum.repos.d/wazuh.repo << EOF                       |
|               || [wazuh_repo]                                                        |
|               || gpgcheck=1                                                          |
|               || gpgkey=https://packages.wazuh.com/key/RPM-GPG-KEY-WAZUH             |
|               || enabled=1                                                           |
|               || name=RHEL-\\$releasever - Wazuh                                     |
|               || baseurl=https://packages.wazuh.com/yum/el/\\$releasever/\\$basearch |
|               || protect=1                                                           |
|               || EOF                                                                 |
+---------------+----------------------------------------------------------------------+
| Fedora        || sudo cat > /etc/yum.repos.d/wazuh.repo << EOF                       |
|               || [wazuh_repo]                                                        |
|               || gpgcheck=1                                                          |
|               || gpgkey=https://packages.wazuh.com/key/RPM-GPG-KEY-WAZUH             |
|               || name=Fedora-\\$releasever - Wazuh                                   |
|               || enabled=1                                                           |
|               || baseurl=https://packages.wazuh.com/yum/fc/\\$releasever/\\$basearch |
|               || protect=1                                                           |
|               || EOF                                                                 |
+---------------+----------------------------------------------------------------------+

2. Install the Wazuh packages:

::

	sudo yum install wazuh-manager wazuh-api

Filebeat
""""""""

1. Install the GPG keys from Elastic and the Elastic repository:

::

	sudo rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch
	echo -e "[elastic-5.x]\nname=Elastic repository for 5.x packages\nbaseurl=https://artifacts.elastic.co/packages/5.x/yum\ngpgcheck=1\ngpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch\nenabled=1\nautorefresh=1\ntype=rpm-md" | sudo tee /etc/yum.repos.d/elastic.repo

2. Install Filebeat:

::

	sudo yum install filebeat

3. Download the settings template for Filebeat from the Wazuh repository:

::

	curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/filebeat/filebeat.yml

4. Edit the file ``/etc/filebeat/filebeat.yml`` and and replace *YOUR_ELASTIC_SERVER_IP* for the IP address or the hostname of the Elastic server.

5. Enable and start the Filebeat service:

+-------------+---------------------------------------------+
| Init system | Commands                                    |
+=============+=============================================+
| SysV Init   || ``sudo chkconfig --add filebeat``          |
|             || ``sudo service filebeat start``            |
+-------------+---------------------------------------------+
| Systemd     || ``sudo systemctl daemon-reload``           |
|             || ``sudo systemctl enable filebeat.service`` |
|             || ``sudo systemctl start filebeat.service``  |
+-------------+---------------------------------------------+

.. note:: You can get more info at the `Filebeat Installation Documentation <https://www.elastic.co/guide/en/beats/libbeat/current/setup-repositories.html>`_.

Installing Elastic Stack server
-------------------------------

These are the steps to install Elastic Stack server, and configure it to work with Wazuh. The other server, Wazuh manager, which will usually run in a different machine.

Debian/Ubuntu
^^^^^^^^^^^^^

Preparation
"""""""""""

Oracle Java JRE is necessary for Logstash and Elasticsearch:

::

	sudo add-apt-repository ppa:webupd8team/java
	sudo apt-get update
	sudo apt-get install oracle-java8-installer

We will also install the Elastic repository and the GPG keys from it:

::

	curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
	sudo apt-get install apt-transport-https
	echo "deb https://artifacts.elastic.co/packages/5.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-5.x.list
	sudo apt-get update

Logstash
""""""""

1. Install the Logstash package:

::

	sudo apt-get install logstash

2. Download the configuration template for Logstash:

::

	curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/logstash/01-wazuh.conf
	curl -so /etc/logstash/wazuh-elastic5-template.json https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/elasticsearch/wazuh-elastic5-template.json

3. Enable and start the Logstash service:

+-------------+-----------------------------------------------+
| Init system | Commands                                      |
+=============+===============================================+
| SysV Init   || ``sudo update-rc.d logstash defaults 95 10`` |
|             || ``sudo service logstash start``              |
+-------------+-----------------------------------------------+
| Systemd     || ``sudo systemctl daemon-reload``             |
|             || ``sudo systemctl enable logstash.service``   |
|             || ``sudo systemctl start logstash.service``    |
+-------------+-----------------------------------------------+

.. note:: You can get more info at the `Logstash Installation Documentation <https://www.elastic.co/guide/en/logstash/current/installing-logstash.html#package-repositories>`_.

Elasticsearch
"""""""""""""

1. Install the Elasticsearch package:

::

	sudo apt-get install elasticsearch

2. Enable and start the Elasticsearch service:

+-------------+----------------------------------------------------+
| Init system | Commands                                           |
+=============+====================================================+
| SysV Ini    || ``sudo update-rc.d elasticsearch defaults 95 10`` |
|             || ``sudo service elasticsearch start``              |
+-------------+----------------------------------------------------+
| Systemd     || ``sudo systemctl daemon-reload``                  |
|             || ``sudo systemctl enable elasticsearch.service``   |
|             || ``sudo systemctl start elasticsearch.service``    |
+-------------+----------------------------------------------------+

.. note:: You can get more info at the `Elasticsearch Installation Documentation <https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html>`_.

Kibana
""""""

1. Install the Kibana package:

::

	sudo apt-get install kibana

2. Install the Wazuh App plugin for Kibana:

::

	sudo /usr/share/kibana/bin/kibana-plugin install http://wazuh.com/resources/wazuh-app.zip

3. **Optional.** Kibana will listen only the loopback interface (localhost) by defualt. To set up Kibana to listen all interfaces, edit the file ``/etc/kibana/kibana.yml``. Uncomment the setting ``server.host`` and change the value to:

::

	server.host: "0.0.0.0"

4. Enable and start the Kibana service:

+-------------+---------------------------------------------+
| Init system | Commands                                    |
+=============+=============================================+
| SysV Init   || ``sudo update-rc.d kibana defaults 95 10`` |
|             || ``sudo service kibana start``              |
+-------------+---------------------------------------------+
| Systemd     || ``sudo systemctl daemon-reload``           |
|             || ``sudo systemctl enable kibana.service``   |
|             || ``sudo systemctl start kibana.service``    |
+-------------+---------------------------------------------+

.. note:: You can get more info at the `Kibana Installation Documentation <https://www.elastic.co/guide/en/kibana/current/install.html>`_.

CentOS
^^^^^^

Preparation
"""""""""""

Oracle Java JRE is necessary for Logstash and Elasticsearch:

::

	curl -Lo jdk-8-linux-x64.rpm --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u111-b14/jdk-8u111-linux-x64.rpm
	sudo yum install jdk-8-linux-x64.rpm
	rm jdk-8-linux-x64.rpm

We will also install the Elastic repository and the GPG keys from it:

::

	sudo rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch

	sudo cat > /etc/yum.repos.d/elastic.repo << EOF
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
""""""""

1. Install the Logstash package:

::

	sudo yum install logstash

2. Download the configuration template for Logstash:

::

	curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/logstash/01-wazuh.conf
	curl -so /etc/logstash/wazuh-elastic5-template.json https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/elasticsearch/wazuh-elastic5-template.json

3. Enable and start the Logstash service:

+-------------+---------------------------------------------+
| Init system | Commands                                    |
+=============+=============================================+
| SysV Init   || ``sudo chkconfig --add logstash``          |
|             || ``sudo service logstash start``            |
+-------------+---------------------------------------------+
| Systemd     || ``sudo systemctl daemon-reload``           |
|             || ``sudo systemctl enable logstash.service`` |
|             || ``sudo systemctl start logstash.service``  |
+-------------+---------------------------------------------+

.. note:: You can get more info at the `Logstash Installation Documentation <https://www.elastic.co/guide/en/logstash/current/installing-logstash.html#package-repositories>`_.

Elasticsearch
"""""""""""""

1. Install the Elasticsearch package:

::

	sudo yum install elasticsearch

2. Enable and start the Elasticsearch service:

+-------------+--------------------------------------------------+
| Init system | Commands                                         |
+=============+==================================================+
| SysV Ini    || ``sudo chkconfig --add elasticsearch``          |
|             || ``sudo service elasticsearch start``            |
+-------------+--------------------------------------------------+
| Systemd     || ``sudo systemctl daemon-reload``                |
|             || ``sudo systemctl enable elasticsearch.service`` |
|             || ``sudo systemctl start elasticsearch.service``  |
+-------------+--------------------------------------------------+

.. note:: You can get more info at the `Elasticsearch Installation Documentation <https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html>`_.

Kibana
""""""

1. Install the Kibana package:

::

	sudo yum install kibana

2. Install the Wazuh App plugin for Kibana:

::

	sudo /usr/share/kibana/bin/kibana-plugin install http://wazuh.com/resources/wazuh-app.zip

3. **Optional.** Kibana will listen only the loopback interface (localhost) by defualt. To set up Kibana to listen all interfaces, edit the file ``/etc/kibana/kibana.yml``. Uncomment the setting ``server.host`` and change the value to:

::

	server.host: "0.0.0.0"

4. Enable and start the Kibana service:

+-------------+-------------------------------------------+
| Init system | Commands                                  |
+=============+===========================================+
| SysV Init   || ``sudo chkconfig --add kibana``          |
|             || ``sudo service kibana start``            |
+-------------+-------------------------------------------+
| Systemd     || ``sudo systemctl daemon-reload``         |
|             || ``sudo systemctl enable kibana.service`` |
|             || ``sudo systemctl start kibana.service``  |
+-------------+-------------------------------------------+

.. note:: You can get more info at the `Kibana Installation Documentation <https://www.elastic.co/guide/en/kibana/current/install.html>`_.

Connect the Wazuh App with the API
----------------------------------

In this section, we'll add the Wazuh manager to the Wazuh App on Kibana.

1. Open a web browser and go to the Elastic server address, port 5601 (by default).
2. Go through the menu to the Wazuh App.
3. Click on *Add new manager*.
4. Fill the blanks with the address and the credentials of the API. The default values appear weak in the placeholders.
5. Click on *Save*.

Installing and connecting Wazuh agents
--------------------------------------

Installation on Debian/Ubuntu
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Install the GPG key:

::

	curl -s https://s3-us-west-1.amazonaws.com/packages.wazuh.com/key/RPM-GPG-KEY-WAZUH | sudo apt-key add -

2. Add the Wazuh repository depending on your operating system:

+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Debian 7 "Wheezy"               | ``echo "deb http://packages.wazuh.com/apt/debian wheezy main" | sudo tee /etc/apt/sources.list.d/wazuh.list``  |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Debian 8 "Jessie"               | ``echo "deb http://packages.wazuh.com/apt/debian jessie main" | sudo tee /etc/apt/sources.list.d/wazuh.list``  |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Debian "stretch" (testing)      | ``echo "deb http://packages.wazuh.com/apt/debian stretch main" | sudo tee /etc/apt/sources.list.d/wazuh.list`` |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Debian "sid" (unstable)         | ``echo "deb http://packages.wazuh.com/apt/debian sid main" | sudo tee /etc/apt/sources.list.d/wazuh.list``     |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Ubuntu 12.04 "Precise Pangolin" | ``echo "deb http://packages.wazuh.com/apt/ubuntu precise main" | sudo tee /etc/apt/sources.list.d/wazuh.list`` |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Ubuntu 14.04 "Trusty Tahr"      | ``echo "deb http://packages.wazuh.com/apt/ubuntu trusty main" | sudo tee /etc/apt/sources.list.d/wazuh.list``  |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Ubuntu 15.04 "Vivid Vervet"     | ``echo "deb http://packages.wazuh.com/apt/ubuntu vivid main" | sudo tee /etc/apt/sources.list.d/wazuh.list``   |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Ubuntu 15.10 "Wily Werewolf"    | ``echo "deb http://packages.wazuh.com/apt/ubuntu wily main" | sudo tee /etc/apt/sources.list.d/wazuh.list``    |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Ubuntu 16.04 "Xenial Xerus"     | ``echo "deb http://packages.wazuh.com/apt/ubuntu xenial main" | sudo tee /etc/apt/sources.list.d/wazuh.list``  |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+
| Ubuntu 16.10 "Yakkety Yak"      | ``echo "deb http://packages.wazuh.com/apt/ubuntu yakkety main" | sudo tee /etc/apt/sources.list.d/wazuh.list`` |
+---------------------------------+----------------------------------------------------------------------------------------------------------------+

3. Update the package information and install the Wazuh packages:

::

	sudo apt-get update
	sudo apt-get install wazuh-agent


Installation on CentOS
^^^^^^^^^^^^^^^^^^^^^^

1. First we'll install the Wazuh repository. Run the following command depending on your operating system:

+---------------+----------------------------------------------------------------------+
| RHEL / CentOS || sudo cat > /etc/yum.repos.d/wazuh.repo << EOF                       |
|               || [wazuh_repo]                                                        |
|               || gpgcheck=1                                                          |
|               || gpgkey=https://packages.wazuh.com/key/RPM-GPG-KEY-WAZUH             |
|               || enabled=1                                                           |
|               || name=RHEL-\\$releasever - Wazuh                                     |
|               || baseurl=https://packages.wazuh.com/yum/el/\\$releasever/\\$basearch |
|               || protect=1                                                           |
|               || EOF                                                                 |
+---------------+----------------------------------------------------------------------+
| Fedora        || sudo cat > /etc/yum.repos.d/wazuh.repo << EOF                       |
|               || [wazuh_repo]                                                        |
|               || gpgcheck=1                                                          |
|               || gpgkey=https://packages.wazuh.com/key/RPM-GPG-KEY-WAZUH             |
|               || name=Fedora-\\$releasever - Wazuh                                   |
|               || enabled=1                                                           |
|               || baseurl=https://packages.wazuh.com/yum/fc/\\$releasever/\\$basearch |
|               || protect=1                                                           |
|               || EOF                                                                 |
+---------------+----------------------------------------------------------------------+

2. Install the Wazuh packages:

::

	sudo yum install wazuh-agent

3. Edit file `/var/ossec/etc/ossec.conf` and replace the text *MANAGER_IP* for the manager's IP address. For example:

::

	<ossec_config>
	  <client>
	    <server-ip>1.2.3.4</server_ip>

Linking agent to manager
^^^^^^^^^^^^^^^^^^^^^^^^

.. note:: At the time to add an agent, you must know it's IP address in respect of the manager, in other words, the IP that the manager will see on the arriving packets from the manager. If don't know that IP, or the agent uses DHCP (dynamic IP addressing), use `any` as IP.

1. On the **manager**, run `manage_agents`:

::

	$ /var/ossec/bin/manage_agents

	****************************************
	* Wazuh v1.2 Agent manager.            *
	* The following options are available: *
	****************************************
	   (A)dd an agent (A).
	   (E)xtract key for an agent (E).
	   (L)ist already added agents (L).
	   (R)emove an agent (R).
	   (Q)uit.
	Choose your action: A,E,L,R or Q:

2. Press `A` and `Enter` to add an agent. You'll be asked for the agent's name (use the agen't hostname or another arbitrary name), its IP and the agent ID (you can left this field empty to auto-assign an ID).

In this example, we'll add an agent with name "Example", dynamic IP (`any`) and automatic ID:

::

	Choose your action: A,E,L,R or Q: A

	- Adding a new agent (use '\q' to return to the main menu).
	  Please provide the following:
	   * A name for the new agent: Example
	   * The IP Address of the new agent: any
	   * An ID for the new agent[001]:
	Agent information:
	   ID:001
	   Name:Example
	   IP Address:any

	Confirm adding it?(y/n): y
	Agent added with ID 001.

3. Extract the new agent's key. You will need it for the agent:

::

	Choose your action: A,E,L,R or Q: E

	Available agents:
	   ID: 001, Name: Example, IP: any
	Provide the ID of the agent to extract the key (or '\q' to quit): 001

	Agent key information for '001' is:
	MDAxIDE4NWVlNjE1Y2YzYiBhbnkgMGNmMDFiYTM3NmMxY2JjNjU0NDAwYmFhZDY1ZWU1YjcyMGI2NDY3ODhkNGQzMjM5ZTdlNGVmNzQzMGFjMDA4Nw==

4. Exit from `manage_agents` by pressing `Q` and `Enter`.

5. Now on the **agent** run `manage_agents`:

::

	$ /var/ossec/bin/manage_agents

	****************************************
	* Wazuh v1.2 Agent manager.            *
	* The following options are available: *
	****************************************
	   (I)mport key from the server (I).
	   (Q)uit.
	Choose your action: I or Q:

6. Press `I` and `Enter` to import a key. Then paste the key that you extracted at the manager:

::

	Choose your action: I or Q: I

	* Provide the Key generated by the server.
	* The best approach is to cut and paste it.
	*** OBS: Do not include spaces or new lines.

	Paste it here (or '\q' to quit): MDAxIDE4NWVlNjE1Y2YzYiBhbnkgMGNmMDFiYTM3NmMxY2JjNjU0NDAwYmFhZDY1ZWU1YjcyMGI2NDY3ODhkNGQzMjM5ZTdlNGVmNzQzMGFjMDA4Nw=

	Agent information:
	   ID:013
	   Name:Example
	   IP Address:any

	Confirm adding it?(y/n): y
	Added.

7. Press `Q` and `Enter` to exit from `manage_agents`.

8. Restart the agent. You'll do it depending on your OS init system:

+-------------+-----------------------------------------------+
| Init system | Command                                       |
+=============+===============================================+
| SysV Init   || ``sudo service wazuh start``                 |
+-------------+-----------------------------------------------+
| Systemd     || ``sudo systemctl restart wazuh``             |
+-------------+-----------------------------------------------+
