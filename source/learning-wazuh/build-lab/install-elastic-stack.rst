.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out how to install the Elastic Stack to run Elasticsearch, Kibana, and the Wazuh plugin for Kibana. Learn more about it in this section. 
  
.. _build_lab_install_elastic_stack:

Install the Elastic Stack
=========================

Your Elastic Stack will be running Elasticsearch, Kibana and the Wazuh plugin for Kibana.

Log in and sudo to root
-----------------------

For the purposes of these labs, always become root when logging into a lab
machine via SSH.

    .. code-block:: console

      [centos@elastic-server ~]$ sudo su -
      [root@elastic-server ~]#



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

     # yum install -y unzip

Elasticsearch
-------------

Elasticsearch is a highly scalable full-text search and analytics engine that will
store alerts and log records sent by Wazuh via Filebeat and make them available
to Kibana. For more information, please see `Elasticsearch
<https://www.elastic.co/products/elasticsearch>`_.

1. Install the Elasticsearch package:

  .. code-block:: console

	 # yum -y install elasticsearch-|ELASTICSEARCH_LATEST|

2. Enable and start the Elasticsearch service:

  .. warning::

    Add the following configuration to mitigate Apache Log4j2 Remote Code Execution (RCE) vulnerability - CVE-2021-44228 - ESA-2021-31.
    
    .. code-block:: console

      # mkdir -p /etc/elasticsearch/jvm.options.d
      # echo '-Dlog4j2.formatMsgNoLookups=true' > /etc/elasticsearch/jvm.options.d/disabledlog4j.options
      # chmod 2750 /etc/elasticsearch/jvm.options.d/disabledlog4j.options
      # chown root:elasticsearch /etc/elasticsearch/jvm.options.d/disabledlog4j.options

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

    # yum install -y kibana-|ELASTICSEARCH_LATEST|


2. Create the ``/usr/share/kibana/data`` directory:

    .. code-block:: console
    
      # mkdir /usr/share/kibana/data
      # chown -R kibana:kibana /usr/share/kibana


3. Install the Wazuh plugin for Kibana:


  * Install from URL:

  .. code-block:: console

    # cd /usr/share/kibana/
    # sudo -u kibana bin/kibana-plugin install https://packages.wazuh.com/4.x/ui/kibana/wazuh_kibana-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|-1.zip
   

4. Kibana will only listen on the loopback interface (localhost) by default,
   which means that it can be only accessed from the same machine. To access
   Kibana from the any IP address set the ``server.host: "0.0.0.0"`` variable, and
   set the port to be the standard port for HTTPS: ``server.port: 443``


  .. code-block:: console

    # cat >> /etc/kibana/kibana.yml << EOF
    server.host: "0.0.0.0"
    server.port: 443
    EOF


5.  Allow Kibana (which is run as a non-root process) to bind to port 443:

  .. code-block:: console

    # setcap 'CAP_NET_BIND_SERVICE=+eip' /usr/share/kibana/node/bin/node

6. Enable and start the Kibana service:

  .. code-block:: console

  	# systemctl daemon-reload
  	# systemctl enable kibana.service
  	# systemctl start kibana.service

7. Configure the credentials to access the Wazuh API:

  .. code-block:: console

    # cat >> /usr/share/kibana/data/wazuh/config/wazuh.yml << EOF

      - wazuhapi:
         url: https://172.30.0.10
         port: 55000
         username: wazuhapiuser
         password: wazuhlab
    EOF    

Disable the Elastic repository
------------------------------

Now disable the Elastic repository in order to prevent a future unintended
Elastic Stack upgrade to a version that may be in conflict with the latest
stable Wazuh packages.

  .. code-block:: console

    # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/elastic.repo
