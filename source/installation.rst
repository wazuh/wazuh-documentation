.. _installation:

Installation guide
==================


Wazuh Manager and API
---------------------

Wazuh manager (v1.2) integrates the OSSEC server, the agent, and OpenSCAP module.

Wazuh API is used to monitor deployment status and configuration, as well as for integration with other components (e.g. WUI).

CENTOS 7.x
^^^^^^^^^^

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

	rpm --import https://s3-us-west-1.amazonaws.com/packages.wazuh.com/key/RPM-GPG-KEY-WAZUH

::

	yum install wazuh-manager && yum install wazuh-api

RHEL
^^^^

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

        rpm --import https://s3-us-west-1.amazonaws.com/packages.wazuh.com/key/RPM-GPG-KEY-WAZUH

::

        yum install wazuh-manager && yum install wazuh-api

Debian / Ubuntu
^^^^^^^^^^^^^^^
::

	wget -qO - https://s3-us-west-1.amazonaws.com/packages.wazuh.com/key/RPM-GPG-KEY-WAZUH | sudo apt-key add -

::

	echo -e "deb http://packages.wazuh.com.s3-website-us-west-1.amazonaws.com/ossec-repository/replace_here_your_so replace_here_your_distribution main" >> /etc/apt/sources.list.d/wazuh.list

::

	sudo apt-get update && sudo apt-get install wazuh-manager && sudo apt-get install wazuh-api

Test and configure API 
^^^^^^^^^^^^^^^^^^^^^^

To test connectivity to the API from outside the box go to

::

	http://YOUR_MANAGER_IP:55000
	
Default username/password is foo/bar.

Optionally, you can configure the API to use HTTPS (by creating a self-signed certificate), and to change the username and password running /var/ossec/api/scripts/configure_api.sh

Filebeat
^^^^^^^^

1. Install Filebeat

https://www.elastic.co/guide/en/beats/libbeat/5.0/setup-repositories.html

2. Configure Filebeat

Empty file /etc/filebeat/filebeat.yml, fill it with:

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
	   hosts: ["your_elastic_host:5000"]


3. Start Filebeat, start Wazuh.

Elastic Stack
---------------------------------
Logstash Server
^^^^^^^^^^^^^^^^^^

1. Install Logstash Server

https://www.elastic.co/guide/en/logstash/5.0/installing-logstash.html

2. Configure Logstash Server

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
		if [SyscheckFile][path] {
			mutate {
				add_field => {"file" => "%{[SyscheckFile][path]}"}
			}
		}
		grok {
			match=> {
				"file" => ["^/.+/(?<audit_file>(.+)$)|^[A-Z]:.+\\(?<audit_file>(.+)$)|^[A-Z]:\\.+/(?<audit_file>(.+)$)"]
			}
		}
		mutate {
			rename => [ "hostname", "AgentName" ]
			rename => [ "agentip", "AgentIP" ]
			rename => [ "[rule][comment]", "[rule][description]" ]
			rename => [ "[rule][level]", "[rule][AlertLevel]" ]
			remove_field => [ "timestamp", "beat", "fields", "input_type", "tags", "count" ]
		}
	}

	output {
		#stdout { codec => rubydebug }
		elasticsearch {
			 hosts => ["localhost:9200"]
			 index => "ossec-%{+YYYY.MM.dd}"
			 document_type => "ossec"
			 template => "/etc/logstash/elastic5-ossec-template.json"
			 template_name => "ossec"
			 template_overwrite => true
		}
	}

3. Copy needed files (mappings/templates) to Logstash folder

::

	curl -o /etc/logstash/elastic5-ossec-template.json https://raw.githubusercontent.com/wazuh/ossec-wazuh/master/extensions/elasticsearch/elastic5-ossec-template.json

Elasticsearch
^^^^^^^^^^^^^^^^^^
1. Install Elasticsearch

https://www.elastic.co/guide/en/elasticsearch/reference/5.0/deb.html deb 

https://www.elastic.co/guide/en/elasticsearch/reference/5.0/rpm.html rpm

2. Modify Elasticsearch configuration, set up network options to listen to 9200 and cluster name (optional)

vi /etc/elasticsearch/elasticsearch.yml

::

	cluster.name: wazuh
	node.name: node-1
	network.host: 0.0.0.0
				
3. Start Elasticsearch

4. Load mappings/templates

::

	curl -XPUT -v -H "Expect:"  "http://localhost:9200/_template/ossec" -d@/etc/logstash/elastic5-ossec-template.json

5. Start Logstash Server

Kibana
^^^^^^^^^^^^^^^^^^
1. Install Kibana

https://www.elastic.co/guide/en/kibana/current/deb.html

https://www.elastic.co/guide/en/kibana/current/rpm.html

2. Publish IP address to access remotely

Open /etc/kibana/kibana.yml, modify:
::
	# Specifies the address to which the Kibana server will bind. IP addresses and host names are both valid values.
	# The default is 'localhost', which usually means remote machines will not be able to connect.
	# To allow connections from remote users, set this parameter to a non-loopback address.
	server.host: "0.0.0.0"

2. Configure index pattern

Access your Kibana interface at http://your_server_ip:5601, Kibana will ask you to “Configure an index pattern”, set it up following these steps:

::

	- Check "Index contains time-based events".
	- Insert Index name or pattern: ossec-*
	- On "Time-field name" list select @timestamp option.
	- Click on "Create" button.
	- You should see the fields list with about ~100 fields.
	- Go to "Discover" tab

3. Import dashboards

Download to your desktop file: https://github.com/wazuh/ossec-wazuh/blob/master/extensions/kibana/kibana5-ossecwazuh-dashboards.json


Access Kibana interface, click on "Management" on left menu, then "Saved objects", click on "Import" button and load the file just downloaded.

4. Install Wazuh App
		
Run on Elastic Stack host:

::

	/usr/share/kibana/bin/kibana-plugin install http://wazuh.com/resources/wazuh-app.zip

It will took a while, once it finished, restart Kibana service.

5. Configure Wazuh App

Access Kibana interface via browser, left menu click on Wazuh icon / Wazuh link, first screen will ask you to fill API configuration, "Wazuh API: Managers list", click on "Add new manager".

- API URL: Your API IP Address, usually OSSEC Manager IP Address.
- API USER: Default: "foo"
- API PASSWORD: Default: "bar"
- API PORT: Default "55000"

Click on save settings. If the connectivity test between Kibana App and API is succesfull, it will add the API entry and now you can use the Wazuh UI.
