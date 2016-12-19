.. _installation_in_progress:

Installation guide [in progress]
===================================

This installation guide describes the installation and configuration of Wazuh in two servers:

- Elastic Stack server: Runs the Elasticsearch engine, Logstash server and Kibana (including the Wazuh App).
- Wazuh server: Runs the Wazuh Manager, API and Filebeat.

.. note:: Before installing the components please configure your NTP to sync time.

.. note:: Some of the instructions below depend on your machine's init system. You can check it with the command: ``ps -p 1``

Installing Elastic Stack server
-------------------------------

These are the steps to install Elastic Stack server, and configure it to work with Wazuh. The other server, Wazuh manager, which will usually run in a different machine.

Preparation
^^^^^^^^^^^

Oracle Java JRE is necessary for Logstash and Elasticsearch:

Debian/Ubuntu
"""""""""""""

::

	sudo add-apt-repository ppa:webupd8team/java
	sudo apt-get update
	sudo apt-get install oracle-java8-installer

CentOS
""""""

::

	curl -Lo jdk-8-linux-x64.rpm --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u111-b14/jdk-8u111-linux-x64.rpm
	sudo yum install jdk-8-linux-x64.rpm
	rm jdk-8-linux-x64.rpm

We will also install the Elastic repository and the GPG keys from it:

Debian/Ubuntu
"""""""""""""

::

	curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
	sudo apt-get install apt-transport-https
	echo "deb https://artifacts.elastic.co/packages/5.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-5.x.list
	sudo apt-get update

CentOS
""""""

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
^^^^^^^^

1. Install the Logstash package:

+-----------------------------------+-------------------------------+
| Debian/Ubuntu                     | CentOS                        |
+===================================+===============================+
| ``sudo apt-get install logstash`` + ``sudo yum install logstash`` |
+-----------------------------------+-------------------------------+

2. Download the configuration template for Logstash:

::

	curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/logstash/01-wazuh.conf
	curl -so /etc/logstash/wazuh-elastic5-template.json https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/elasticsearch/wazuh-elastic5-template.json

3. Enable and start the Logstash service:

+-------------+----------------------------------------------------+------------------------------------------+
| Init system | Debian/Ubuntu                                      | CentOS                                   |
+=============+====================================================+==========================================+
| SysV Init   || ``sudo update-rc.d logstash defaults 95 10``      || ``sudo chkconfig --add logstash``       |
|             || ``sudo service logstash start``                   || ``sudo service logstash start``         |
+-------------+----------------------------------------------------+------------------------------------------+
| Systemd     || ``sudo systemctl daemon-reload``                                                             |
|             || ``sudo systemctl enable logstash.service``                                                   |
|             || ``sudo systemctl start logstash.service``                                                    |
+-------------+----------------------------------------------------+------------------------------------------+

You can get more info at the `Logstash Installation Documentation <https://www.elastic.co/guide/en/logstash/current/installing-logstash.html#package-repositories>`_.

Elasticsearch
^^^^^^^^^^^^^

1. Install the Elasticsearch package:

+----------------------------------------+------------------------------------+
| Debian/Ubuntu                          | CentOS                             |
+========================================+====================================+
| ``sudo apt-get install elasticsearch`` + ``sudo yum install elasticsearch`` |
+----------------------------------------+------------------------------------+

2. Enable and start the Elasticsearch service:

+-------------+----------------------------------------------------+------------------------------------------+
| Init system | Debian/Ubuntu                                      | CentOS                                   |
+=============+====================================================+==========================================+
| SysV Ini    || ``sudo update-rc.d elasticsearch defaults 95 10`` || ``sudo chkconfig --add elasticsearch``  |
|             || ``sudo service elasticsearch start``              || ``sudo service elasticsearch start``    |
+-------------+----------------------------------------------------+------------------------------------------+
| Systemd     || ``sudo systemctl daemon-reload``                                                             |
|             || ``sudo systemctl enable elasticsearch.service``                                              |
|             || ``sudo systemctl start elasticsearch.service``                                               |
+-------------+----------------------------------------------------+------------------------------------------+

You can get more info at the `Elasticsearch Installation Documentation <https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html>`_.

Kibana
^^^^^^

1. Install the Kibana package:

+---------------------------------+-----------------------------+
| Debian/Ubuntu                   | CentOS                      |
+=================================+=============================+
| ``sudo apt-get install kibana`` + ``sudo yum install kibana`` |
+---------------------------------+-----------------------------+

2. Install the Wazuh App plugin for Kibana:

::

	sudo /usr/share/kibana/bin/kibana-plugin install http://wazuh.com/resources/wazuh-app.zip

3. **Optional.** Kibana will listen only the loopback interface (localhost) by defualt. To set up Kibana to listen all interfaces, edit the file ``/etc/kibana/kibana.yml``. Uncomment the setting ``server.host`` and change the value to:

::

	server.host: "0.0.0.0"

4. Enable and start the Kibana service:

+-------------+----------------------------------------------------+------------------------------------------+
| Init system | Debian/Ubuntu                                      | CentOS                                   |
+=============+====================================================+==========================================+
| SysV Init   || ``sudo update-rc.d kibana defaults 95 10``        || ``sudo chkconfig --add kibana``         |
|             || ``sudo service kibana start``                     || ``sudo service kibana start``           |
+-------------+----------------------------------------------------+------------------------------------------+
| Systemd     || ``sudo systemctl daemon-reload``                                                             |
|             || ``sudo systemctl enable kibana.service``                                                     |
|             || ``sudo systemctl start kibana.service``                                                      |
+-------------+----------------------------------------------------+------------------------------------------+

You can get more info at the `Kibana Installation Documentation <https://www.elastic.co/guide/en/kibana/current/install.html>`_.

Installing Wazuh server
-----------------------

These services will typically be installed on a machine other than de Elastic server.

Preparation
^^^^^^^^^^^

First we'll install the Wazuh repository.

Debian/Ubuntu
"""""""""""""

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

3. Update the package information:

::

	sudo apt-get update

RHEL/CentOS/Fedora
""""""""""""""""""

Run the following command depending on your operating system:

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

Wazuh Manager and API
^^^^^^^^^^^^^^^^^^^^^

Debian/Ubuntu
"""""""""""""

::

	sudo apt-get install wazuh-manager wazuh-api

RHEL/CentOS/Fedora
""""""""""""""""""

::

	sudo yum install wazuh-manager wazuh-api

Connect the Wazuh App with the API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this section, we'll add the Wazuh manager to the Wazuh App on Kibana.

1. Open a web browser and go to the Elastic server address, port 5601 (by default).
2. Go through the menu to the Wazuh App.
3. Click on *Add new manager*.
4. Fill the blanks with the address and the credentials of the API. The default values appear weak in the placeholders.
5. Click on *Save*.

Filebeat
^^^^^^^^

1. Install the GPG keys from Elastic and the Elastic repository:

Debian/Ubuntu
"""""""""""""

::

	curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
	sudo apt-get install apt-transport-https
	echo "deb https://artifacts.elastic.co/packages/5.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-5.x.list
	sudo apt-get update

CentOS
""""""

::

	sudo rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch
	echo -e "[elastic-5.x]\nname=Elastic repository for 5.x packages\nbaseurl=https://artifacts.elastic.co/packages/5.x/yum\ngpgcheck=1\ngpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch\nenabled=1\nautorefresh=1\ntype=rpm-md" | sudo tee /etc/yum.repos.d/elastic.repo

2. Install Filebeat:

+-----------------------------------+-------------------------------+
| Debian/Ubuntu                     | CentOS                        |
+===================================+===============================+
| ``sudo apt-get install filebeat`` + ``sudo yum install filebeat`` |
+-----------------------------------+-------------------------------+

3. Download the settings template for Filebeat from the Wazuh repository:

::

	curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/filebeat/filebeat.yml

4. Edit the file ``/etc/filebeat/filebeat.yml`` and and replace *YOUR_ELASTIC_SERVER_IP* for the IP address or the hostname of the Elastic server.

5. Enable and start the Filebeat service:

+-------------+-----------------------------------------------+------------------------------------+
| Init system | Debian/Ubuntu                                 | CentOS                             |
+=============+===============================================+====================================+
| SysV Init   || ``sudo update-rc.d filebeat defaults 95 10`` || ``sudo chkconfig --add filebeat`` |
|             || ``sudo service filebeat start``              || ``sudo service filebeat start``   |
+-------------+-----------------------------------------------+------------------------------------+
| Systemd     || ``sudo systemctl daemon-reload``                                                  |
|             || ``sudo systemctl enable filebeat.service``                                        |
|             || ``sudo systemctl start filebeat.service``                                         |
+-------------+-----------------------------------------------+------------------------------------+

You can get more info at the `Filebeat Installation Documentation <https://www.elastic.co/guide/en/beats/libbeat/current/setup-repositories.html>`_.
