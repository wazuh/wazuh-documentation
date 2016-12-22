.. _installation:

Installation guide (beta version)
=================================

This installation guide describes the installation and configuration of Wazuh in two servers:

- Elastic Stack server: Runs the elasticsearch engine, logstash server and Kibana (including Wazuh APP).
- Wazuh server: Runs the manager, API and filebeat.

Note: Before installing the components please configure your NTP to sync time.

Installing Elastic Stack server
-------------------------------

These are the steps to install Elastic Stack server, and configure it to work with Wazuh. The other server, Wazuh manager, which will usually run in a different machine. 

Logstash server
^^^^^^^^^^^^^^^

**Install Logstash server**

https://www.elastic.co/guide/en/logstash/5.0/installing-logstash.html

**Configure Logstash Server**

Create a file on /etc/logstash/conf.d/01-wazuh.conf with content:

::

	input {
	    beats {
		port => 5000
		codec => "json_lines"
	    }
	}
	filter {
	    geoip {
		source => "srcip"
		target => "GeoLocation"
	    }
	    mutate {
		remove_field => [ "timestamp", "beat", "fields", "input_type", "tags", "count" ]
	    }
	}
	output {
	    elasticsearch {
		hosts => ["localhost:9200"]
		index => "wazuh-alerts-%{+YYYY.MM.dd}"
		document_type => "wazuh"
		template => "/etc/logstash/wazuh-elastic5-template.json"
		template_name => "wazuh"
		template_overwrite => true
	    }
	}

**Copy templates to Logstash folder**

::
	
	curl -o /etc/logstash/elastic5-ossec-template.json https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/elasticsearch/wazuh-elastic5-template.json

Elasticsearch
^^^^^^^^^^^^^

**Install Elasticsearch**

Debian packages: https://www.elastic.co/guide/en/elasticsearch/reference/5.0/deb.html 

RPM packages: https://www.elastic.co/guide/en/elasticsearch/reference/5.0/rpm.html

**Configure Elasticsearch**

Set the following values in /etc/elasticsearch/elasticsearch.yml (you can uncomment them):

::

	cluster.name: wazuh
	node.name: node-1
	network.host: 0.0.0.0
				
**Start Elasticsearch**

::

	systemctl start elasticsearch

Test that Elasticsearch is running and reachable running:

::

	curl -XGET YOUR_ELASTIC_SERVER_IP:9200


**Start Logstash Server**

::

	systemctl start logstash.service

Kibana
^^^^^^

**Install Kibana**

https://www.elastic.co/guide/en/kibana/current/deb.html

https://www.elastic.co/guide/en/kibana/current/rpm.html

**Publish IP address to access remotely**

Open /etc/kibana/kibana.yml, modify server.host value (uncommenting the line):

::

	# Specifies the address to which the Kibana server will bind. IP addresses and host names are both valid values.
	# The default is 'localhost', which usually means remote machines will not be able to connect.
	# To allow connections from remote users, set this parameter to a non-loopback address.
	server.host: "0.0.0.0"

Restart Kibana:

::

	systemctl restart kibana


**Install Wazuh App**
		
Run on your Elastic Stack server (it can take a few seconds, maybe a minute or two):

::

	/usr/share/kibana/bin/kibana-plugin install http://wazuh.com/resources/wazuh-app.zip

It will take a while, once it finished, restart Kibana service.

::

	systemctl restart kibana

Installing Wazuh server (typically on a different machine)
----------------------------------------------------------

Wazuh server includes the follwing components:

- Wazuh manager (v1.2 beta) integrates the OSSEC server, the agent, and OpenSCAP module.
- Wazuh API is used to monitor deployment status and configuration, as well as for integration with other components (e.g. WUI).
- Filebeat is used to forward alerts data to the Elastic server, where it is indexed and stored.

Installing manager and API components
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**On CENTOS 7.X**

Requires EPEL because Wazuh API depends on nodejs, npm and python-pip packages.

Installation of EPEL repository: 

::

	yum -y install epel-release

Create /etc/yum.repos.d/wazuh.repo with the following content:

::

	[wazuh_repo]
	gpgcheck=1
	gpgkey=https://packages.wazuh.com/key/RPM-GPG-KEY-WAZUH
	enabled=1
	name=CENTOS-$releasever - Wazuh
	baseurl=https://packages.wazuh.com/yumtest/el/$releasever/$basearch
	protect=1

::

	yum install wazuh-manager && yum install wazuh-api

**On RHEL 7.X**

Requires EPEL because Wazuh API depends on nodejs, npm and python-pip packages.

Installation of EPEL repository: 

::

	yum -y install epel-release

Create /etc/yum.repos.d/wazuh.repo with the following content:

::

        [wazuh_repo]
        gpgcheck=1
        gpgkey=https://packages.wazuh.com/key/RPM-GPG-KEY-WAZUH
        enabled=1
        name=RHEL-$releasever - Wazuh
        baseurl=https://packages.wazuh.com/yumtest/rhel/$releasever/$basearch
        protect=1

::

        yum install wazuh-manager && yum install wazuh-api

**On Debian / Ubuntu**

::

	wget -qO - https://s3-us-west-1.amazonaws.com/packages.wazuh.com/key/RPM-GPG-KEY-WAZUH | sudo apt-key add -

::

	echo -e "deb http://packages.wazuh.com.s3-website-us-west-1.amazonaws.com/ossec-repository/replace_here_your_so replace_here_your_distribution main" >> /etc/apt/sources.list.d/wazuh.list

::

	sudo apt-get update && sudo apt-get install wazuh-manager && sudo apt-get install wazuh-api

**Test and configure API**

To test connectivity to the API from outside the box go to

::

	http://YOUR_MANAGER_IP:55000
	
Default username/password is foo/bar.

Optionally, you can configure the API to use HTTPS (by creating a self-signed certificate), and to change the username and password running /var/ossec/api/scripts/configure_api.sh

Installing Filebeat
^^^^^^^^^^^^^^^^^^^

**Install Filebeat**

https://www.elastic.co/guide/en/beats/libbeat/5.0/setup-repositories.html

**Configure Filebeat**

Empty file /etc/filebeat/filebeat.yml, and fill it with the following content (don't forget to specify the ELASTIC server IP address):

::

	filebeat:
	 prospectors:
	  - input_type: log
	    paths:
	     - "/var/ossec/logs/alerts/alerts.json"
	    document_type: json
	    json.message_key: log
	    json.keys_under_root: true
	    json.overwrite_keys: true

	output:
	 logstash:
	   # The Logstash hosts
	   hosts: ["YOUR_ELASTIC_SERVER_IP:5000"]


Start Wazuh manager and Filebeat
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

::

	systemctl start wazuh-manager
	systemctl start filebeat

Configure Wazuh App
-------------------

Access Kibana interface via browser (http://YOUR_ELASTIC_SERVER_IP:5601). On the left menu, click on Wazuh icon.

Note: If you don't find the Wazuh app icon, please refresh your browser and double check that Kibana has restarted successfully by stopping it manually.

Once in Wazuh interface, you will be asked to fill API configuration, "Wazuh API: Managers list", click on "Add new manager".

- API URL: Your API IP adress, usually Wazuh server IP Address.
- API USER: Default: "foo"
- API PASSWORD: Default: "bar"
- API PORT: Default "55000"

Click on save settings. If the connectivity test between Kibana App and API is succesfull, it will add the API entry and now you can use the Wazuh UI.
