.. _build_lab_install_elastic_stack:

Install Elastic Stack
=====================

Your Elastic Server will be running Logstash, Elasticsearch, Kibana, and the Wazuh Kibana App.

Log in and sudo to root
-----------------------

For the purposes of these labs, always become root when logging into a lab machine via ssh.

    .. code-block:: console

        # sudo su -


Preparation
-----------

1. Install the Oracle Java JRE which is required by Logstash and Elasticsearch.

  .. code-block:: console

    # curl -Lo jre-8-linux-x64.rpm --header "Cookie: oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u171-b11/512cd62ec5174c3487ac17c61aaa89e8/jre-8u171-linux-x64.rpm"
    # rpm -qlp jre-8-linux-x64.rpm > /dev/null 2>&1 && echo "Java package downloaded successfully" || echo "Java package did not download successfully"
    # yum -y install jre-8-linux-x64.rpm
    # rm -f jre-8-linux-x64.rpm

2. Install the Elastic repository and its GPG key:

  .. code-block:: console

	# rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch

	# cat > /etc/yum.repos.d/elastic.repo << EOF
	[elasticsearch-6.x]
	name=Elasticsearch repository for 6.x packages
	baseurl=https://artifacts.elastic.co/packages/6.x/yum
	gpgcheck=1
	gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
	enabled=1
	autorefresh=1
	type=rpm-md
	EOF


Elasticsearch
-------------

Elasticsearch indexes and stores Wazuh alerts and log records sent to it by Logstash, and makes them available to Kibana.

1. Install the Elasticsearch package:

  .. code-block:: console

	 # yum -y install elasticsearch-6.1.2

2. Enable and start the Elasticsearch service:

  .. code-block:: console

  	# systemctl daemon-reload
  	# systemctl enable elasticsearch.service
  	# systemctl start elasticsearch.service

3. Load Wazuh Elasticsearch templates:

  .. code-block:: console

	# curl https://raw.githubusercontent.com/wazuh/wazuh/3.1/extensions/elasticsearch/wazuh-elastic6-template-alerts.json | curl -XPUT 'http://localhost:9200/_template/wazuh' -H 'Content-Type: application/json' -d @-
	# curl https://raw.githubusercontent.com/wazuh/wazuh/3.1/extensions/elasticsearch/wazuh-elastic6-template-monitoring.json | curl -XPUT 'http://localhost:9200/_template/wazuh-agent' -H 'Content-Type: application/json' -d @-

4. Insert sample alert.  Do not skip this essential step:

  .. code-block:: console

	# curl https://raw.githubusercontent.com/wazuh/wazuh/3.1/extensions/elasticsearch/alert_sample.json | curl -XPUT "http://localhost:9200/wazuh-alerts-3.x-"`date +%Y.%m.%d`"/wazuh/sample" -H 'Content-Type: application/json' -d @-

5. Optimize Elasticsearch for lab use according to `this <https://documentation.wazuh.com/current/installation-guide/optional-configurations/elastic-tuning.html#elastic-tuning>`_ guide.

  This process will set optimal index sharding, replication, and memory usage values for Elasticsearch.

  .. code-block:: console

    # curl https://raw.githubusercontent.com/wazuh/wazuh/3.1/extensions/elasticsearch/wazuh-elastic6-template-alerts.json -o w-elastic-template.json
    # sed -i 's/"index.refresh_interval": "5s"/"index.refresh_interval": "5s",\n    "number_of_shards" :   1,\n    "number_of_replicas" : 0/' w-elastic-template.json
    # curl -XPUT 'http://localhost:9200/_template/wazuh' -H 'Content-Type: application/json' -d @w-elastic-template.json
    # curl -XPUT 'localhost:9200/*/_settings?pretty' -H 'Content-Type: application/json' -d'
    {
          "settings": {
          "number_of_replicas" : 0
          }
    }
    '
    # sed -i 's/#bootstrap.memory_lock: true/bootstrap.memory_lock: true/' /etc/elasticsearch/elasticsearch.yml
    # mkdir -p /etc/systemd/system/elasticsearch.service.d/
    # echo -e "[Service]\nLimitMEMLOCK=infinity" > /etc/systemd/system/elasticsearch.service.d/elasticsearch.conf
    # sed -i 's/^-Xms.*/-Xms12g/;s/^-Xmx.*/-Xmx12g/' /etc/elasticsearch/jvm.options
    # systemctl daemon-reload
    # systemctl restart elasticsearch

  .. note::
    The two references to "12g" in the above steps will only work if the Elastic Server was launched with the recommended instance size t2.xlarge.  If you chose to use t2.large instead, change the "12g" references to "5g".

Logstash
--------

Logstash takes the Wazuh alerts and logs written as JSON records by Wazuh Manager, and it parses, enriches and passes them along to Elasticsearch for indexing and storage.

1. Install the Logstash package:

  .. code-block:: console

    # yum -y install logstash-6.1.2

2. Download the Wazuh config for Logstash:

  .. code-block:: console

    # curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/3.1/extensions/logstash/01-wazuh-remote.conf

3. Enable and start the Logstash service:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable logstash.service
    # systemctl start logstash.service


Setting up SSL for Filebeat and Logstash
----------------------------------------

Since your Wazuh Server and Elastic Server instances are on separate servers, it is important to configure SSL encryption and
verification between Filebeat and Logstash.


Generate and sign an SSL certificate and key for Logstash (on Elastic Server)
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    .. code-block:: console

        # cp /etc/pki/tls/openssl.cnf custom_openssl.cnf
        # LINE=$((`grep -nF "[ v3_ca ]" custom_openssl.cnf | cut -d: -f1`+1))
        # sed -i "$LINE"'isubjectAltName = IP: 172.30.0.20' custom_openssl.cnf
        # openssl req -x509 -batch -nodes -days 3650 -newkey rsa:2048 -keyout /etc/logstash/logstash.key -out /etc/logstash/logstash.crt -config custom_openssl.cnf
        # ls -alh /etc/logstash/logstash.key /etc/logstash/logstash.crt
        # rm -f custom_openssl.cnf


Configure Logstash to use SSL (on Elastic Server)
:::::::::::::::::::::::::::::::::::::::::::::::::

    Uncomment the default SSL-related lines in the Logstash config to use the new key and cert, and then restart Logstash.

    .. code-block:: console

        # sed -i "s/#       ssl/        ssl/g" /etc/logstash/conf.d/01-wazuh.conf
        # grep "  ssl" /etc/logstash/conf.d/01-wazuh.conf -B4 -A2
        # systemctl restart logstash.service


Copy Logstash certificate to where Filebeat can use it
::::::::::::::::::::::::::::::::::::::::::::::::::::::

1. On the Elastic Server, display the Logstash public certificate

	.. code-block:: console

		# cat /etc/logstash/logstash.crt

2. Copy the file content in preparation for pasting it into an empty file on the Wazuh Server.  It will look somewhat like this:

	.. code-block:: console

		-----BEGIN CERTIFICATE-----
		MIIDaDCCAlCgAwIBAgIJAJ9yfo5G55kNMA0GCSqGSIb3DQEBCwUAMEIxCzAJBgNV
		BAYTAlhYMRUwEwYDVQQHDAxEZWZhdWx0IENpdHkxHDAaBgNVBAoME0RlZmF1bHQg
		...
		MoVou4/OaUeQM6JbcVrL2YkLyAfpJpMhB0LtNVeIY0fJlwV1SwXYLlAqGUjPDJvz
		NvWeiuulue3zaf3r
		-----END CERTIFICATE-----

3. Now switch over to the Wazuh Server use the text editor of your choice to open a new file /etc/filebeat/logstash.crt.  Paste and save the copied certificate text there.  Filebeat will use this certificate to verify the identity of the Logstash server as well as to negotiate an encrypted tunnel for conveying alert records.


Configure Filebeat to use SSL
:::::::::::::::::::::::::::::

  Edit the file ``/etc/filebeat/filebeat.yml``, uncomment the lines related to SSL, and restart Filebeat:

      .. code-block:: yaml

          # cat /etc/filebeat/filebeat.yml
          # sed -i 's/#   ssl/   ssl/;s/#     certificate/      certificate/' /etc/filebeat/filebeat.yml
          # cat /etc/filebeat/filebeat.yml
          # systemctl restart filebeat.service


Kibana
------

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch. More info at `Kibana <https://www.elastic.co/products/kibana>`_.

1. Install the Kibana package:

  .. code-block:: console

	 # yum -y install kibana-6.1.2

2. Install the Wazuh App plugin for Kibana:

  .. code-block:: console

      # export NODE_OPTIONS="--max-old-space-size=3072"
      # /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp.zip

  .. warning::

    Expect to wait several minutes for the the Kibana plugin installation to complete.  Optimizing and caching browser bundles takes a long time...

4. Enable and start the Kibana service:

  .. code-block:: console

  	# systemctl daemon-reload
  	# systemctl enable kibana.service
  	# systemctl start kibana.service


Disable the Elastic repository
------------------------------

Now disable the Elastic repository in order to prevent a future unintended Elastic Stack upgrade to a version
that may be in conflict with the latest stable Wazuh packages.

  .. code-block:: console

    # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/elastic.repo
