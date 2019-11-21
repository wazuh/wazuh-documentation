.. Copyright (C) 2019 Wazuh, Inc.

.. _build_lab_install_elastic_stack:

Install Elastic Stack
=====================

Your Elastic Server will be running Elasticsearch, Kibana and the Wazuh Kibana App.

Log in and sudo to root
-----------------------

For the purposes of these labs, always become root when logging into a lab
machine via SSH.

    .. code-block:: console

        # sudo su -


Preparation
-----------

1. Add the Elastic repository and its GPG key:

  .. code-block:: console

    # rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch
    # cat > /etc/yum.repos.d/elastic.repo << EOF
    [elasticsearch-7.x]
    name=Elasticsearch repository for 7.x packages
    baseurl=https://artifacts.elastic.co/packages/7.x/yum
    gpgcheck=1
    gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
    enabled=1
    autorefresh=1
    type=rpm-md
    EOF

2. Install unzip:

   .. code-block:: console

     yum install -y unzip

Elasticsearch
-------------

Elasticsearch is a highly scalable full-text search and analytics engine that will
store alerts and log records sent by Wazuh via Filebeat and make them available
to Kibana. For more information, please see `Elasticsearch 
<https://www.elastic.co/products/elasticsearch>`_.

1. Install the Elasticsearch package:

  .. code-block:: console

	 # yum -y install elasticsearch-7.3.2

2. Enable and start the Elasticsearch service:

  .. code-block:: console

  	# systemctl daemon-reload
  	# systemctl enable elasticsearch.service
  	# systemctl start elasticsearch.service

3. Optimize Elasticsearch for lab use according to :ref:`this guide <elastic_tuning>`.

  This process will set optimal index sharding, replication, and memory usage values for Elasticsearch.

  .. code-block:: none

    # sed -i 's/#bootstrap.memory_lock: true/bootstrap.memory_lock: true/' /etc/elasticsearch/elasticsearch.yml
    # mkdir -p /etc/systemd/system/elasticsearch.service.d/
    # echo -e "[Service]\nLimitMEMLOCK=infinity" > /etc/systemd/system/elasticsearch.service.d/elasticsearch.conf
    # sed -i 's/^-Xms.*/-Xms5g/;s/^-Xmx.*/-Xmx5g/' /etc/elasticsearch/jvm.options
    # systemctl daemon-reload
    # systemctl restart elasticsearch

  .. note::
    The two references to "5g" in the above steps will only work if the Elastic
    Server was launched with the recommended instance size t2.xlarge.  If you 
    chose to use t2.large instead, change the "5g" references to "3g".

Kibana
------

Kibana is a flexible and intuitive web interface for mining and visualizing the 
events and archives stored in Elasticsearch. More info at `Kibana 
<https://www.elastic.co/products/kibana>`_.

1. Install the Kibana package:

  .. code-block:: console

    # yum install -y kibana-7.3.2

2. Install the Wazuh app plugin for Kibana:


  * Install from URL:

  .. code-block:: console

    # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-3.10.2_7.3.2.zip

3. Kibana will only listen on the loopback interface (localhost) by default, 
   which means that it can be only accessed from the same machine. To access
   Kibana from the any IP set the ``server.host: "0.0.0.0"`` variable, and
   set the port to be the standard port for HTTPS: ``server.port: 443``


  .. code-block:: console

    # cat >> /etc/kibana/kibana.yml << EOF
    server.host: "0.0.0.0"
    server.port: 443
    EOF


4.  Allow Kibana (which is run as a non-root process) to bind to port 443:

  .. code-block:: console
    
    setcap 'CAP_NET_BIND_SERVICE=+eip' /usr/share/kibana/node/bin/node

5. Enable and start the Kibana service:

  .. code-block:: console

  	# systemctl daemon-reload
  	# systemctl enable kibana.service
  	# systemctl start kibana.service

Setting up SSL for Elastic Stack
--------------------------------

Since your Wazuh Server and Elastic Server instances are on separate servers, it
is important to configure SSL encryption and verification between Filebeat and
Elasticsearch.


1. Create the file ``/usr/share/elasticsearch/instances.yml`` and fill it with 
   the instances you want to secure.

.. code-block:: console

    cat > /usr/share/elasticsearch/instances.yml << EOF
    instances:
        - name: "wazuh-manager"
          ip:
            - "172.30.0.10"
        - name: "elasticsearch"
          ip:
            - "172.30.0.20"
        - name: "kibana"
          ip:
            - "172.30.0.20"
    EOF

2. Create the certificates using the `elasticsearch-certutil 
   <https://www.elastic.co/guide/en/elasticsearch/reference/current/certutil.html>`_ tool.

.. code-block:: console

    # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --out certs.zip


3. Extract the generated ``/usr/share/elasticsearch/certs.zip`` file from the 
   previous step:

.. code-block:: console

    # unzip /usr/share/elasticsearch/certs.zip -d /usr/share/elasticsearch/

.. note::

    The ``ca.crt`` file is shared for all the instances. The ``.crt`` and ``.key`` pairs are unique for each instance.

Configure SSL in Elasticsearch 
::::::::::::::::::::::::::::::


1. Create the directory ``/etc/elasticsearch/certs``, then copy the certificate 
   authorities, the certificate and the key there.

.. code-block:: console

    # mkdir /etc/elasticsearch/certs/ca -p
    # cp /usr/share/elasticsearch/ca/ca.crt /etc/elasticsearch/certs/ca
    # cp /usr/share/elasticsearch/elasticsearch/elasticsearch.crt /etc/elasticsearch/certs
    # cp /usr/share/elasticsearch/elasticsearch/elasticsearch.key /etc/elasticsearch/certs
    # chown -R elasticsearch: /etc/elasticsearch/certs
    # chmod -R 770 /etc/elasticsearch/certs

2. Add the proper settings for both the transport and the HTTP layers in 
   ``/etc/elasticsearch/elasticsearch.yml``.

.. code-block:: console

    cat >> /etc/elasticsearch/elasticsearch.yml << EOF

    # Unbind to a specific IP:
    network.host: 0.0.0.0
    discovery.seed_hosts: ["172.30.0.20"]

    # Transport layer
    xpack.security.transport.ssl.enabled: true
    xpack.security.transport.ssl.verification_mode: certificate
    xpack.security.transport.ssl.key: /etc/elasticsearch/certs/elasticsearch.key
    xpack.security.transport.ssl.certificate: /etc/elasticsearch/certs/elasticsearch.crt
    xpack.security.transport.ssl.certificate_authorities: [ "/etc/elasticsearch/certs/ca/ca.crt" ]

    # HTTP layer
    xpack.security.http.ssl.enabled: true
    xpack.security.http.ssl.verification_mode: certificate
    xpack.security.http.ssl.key: /etc/elasticsearch/certs/elasticsearch.key
    xpack.security.http.ssl.certificate: /etc/elasticsearch/certs/elasticsearch.crt
    xpack.security.http.ssl.certificate_authorities: [ "/etc/elasticsearch/certs/ca/ca.crt" ]
    EOF

3. Restart the service:

.. code-block:: console

    # systemctl restart elasticsearch

Configure SSL in Kibana
:::::::::::::::::::::::

1. Create the directory ``/etc/kibana/certs``, then copy the certificate 
   authorities, the certificate and the key there.

.. code-block:: console

    # mkdir /etc/kibana/certs/ca -p
    # cp /usr/share/elasticsearch/ca/ca.crt /etc/kibana/certs/ca
    # cp /usr/share/elasticsearch/kibana/kibana.crt /etc/kibana/certs
    # cp /usr/share/elasticsearch/kibana/kibana.key /etc/kibana/certs
    # chown -R kibana: /etc/kibana/certs
    # chmod -R 770 /etc/kibana/certs

2. Add the proper settings in ``/etc/kibana/kibana.yml``.

.. code-block:: console

    # cat >> /etc/kibana/kibana.yml << EOF
    # Elasticsearch from/to Kibana
    elasticsearch.hosts: ["https://172.30.0.20:9200"]
    elasticsearch.ssl.certificateAuthorities: ["/etc/kibana/certs/ca/ca.crt"]
    elasticsearch.ssl.certificate: "/etc/kibana/certs/kibana.crt"
    elasticsearch.ssl.key: "/etc/kibana/certs/kibana.key"

    # Browser from/to Kibana
    server.ssl.enabled: true
    server.ssl.certificate: "/etc/kibana/certs/kibana.crt"
    server.ssl.key: "/etc/kibana/certs/kibana.key"
    EOF

3. Restart the service:

.. code-block:: console

    # systemctl restart kibana

Configure SSL for Filebeat
::::::::::::::::::::::::::

1. We must now copy the certificate files from the Elastic server to the Wazuh 
   Manager. In order to do so you may place the ``WazuhLab.pem`` file in your 
   Elastic Server:

  a. Using scp from Linux:

   .. code-block:: console

      # scp -i WazuhLab.pem WazuhLab.pem centos@1.2.3.4:
   
   Where 1.2.3.4 should be replaced with the Elastic IP of your Elastic Server.

  b. Alternatively you may copy and paste the contents of this file onto this file 
     on the Elastic server. 

2. Now copy the SSL files from the Elastic Server onto the Wazuh Manager

   .. code-block:: console

      # scp -i /home/centos/WazuhLab.pem /usr/share/elasticsearch/ca/ca.crt /usr/share/elasticsearch/wazuh-manager/wazuh-manager.* centos@172.30.0.10:


3. From the Wazuh Manager instance, create the directory ``/etc/filebeat/certs``,
   then copy the certificate authorities, the certificate and the key there.

.. code-block:: console

    # mkdir /etc/filebeat/certs/ca -p
    # mv /home/centos/ca.crt /etc/filebeat/certs/ca
    # mv /home/centos/wazuh-manager.crt /etc/filebeat/certs
    # mv /home/centos/wazuh-manager.key /etc/filebeat/certs
    # chmod 770 -R /etc/filebeat/certs

4. Add the proper settings in ``/etc/filebeat/filebeat.yml``.

.. code-block:: console
    
    # sed "s#http://##g" /etc/filebeat/filebeat.yml
    # cat >> /etc/filebeat/filebeat.yml << EOF
    output.elasticsearch.protocol: https
    output.elasticsearch.ssl.certificate: "/etc/filebeat/certs/wazuh-manager.crt"
    output.elasticsearch.ssl.key: "/etc/filebeat/certs/wazuh-manager.key"
    output.elasticsearch.ssl.certificate_authorities: ["/etc/filebeat/certs/ca/ca.crt"]
    EOF

.. note::

    You can test Filebeat output using ``filebeat test output``.

5. Restart the service:

.. code-block:: console

    # systemctl restart filebeat

Disable the Elastic repository
------------------------------

Now disable the Elastic repository in order to prevent a future unintended Elastic Stack upgrade to a version
that may be in conflict with the latest stable Wazuh packages.

  .. code-block:: console

    # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/elastic.repo
