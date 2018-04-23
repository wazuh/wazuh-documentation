.. Copyright (C) 2018 Wazuh, Inc.

.. _build_lab_install_wazuh_server:

Install Wazuh Server Components
===============================

The Wazuh Server in your lab will be running the Wazuh Manager, Wazuh API, and Filebeat applications.

Log in and sudo to root
-----------------------

    .. code-block:: console

        # sudo su -

Add the Wazuh yum repository
----------------------------

     .. code-block:: console

         # cat > /etc/yum.repos.d/wazuh.repo <<\EOF
         [wazuh_repo]
         gpgcheck=1
         gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
         enabled=1
         name=Wazuh repository
         baseurl=https://packages.wazuh.com/3.x/yum/
         protect=1
         EOF


Install and set up Wazuh Manager
--------------------------------

Install the Wazuh Manager software and confirm it is running

  .. code-block:: console

    # yum -y install wazuh-manager
    # ossec-control status


Configure Wazuh Manager to listen for agent connections on tcp instead of udp

  .. code-block:: console

    # grep "<protocol>udp" -B3 -A1 /var/ossec/etc/ossec.conf
    # sed -i 's/<protocol>udp/<protocol>tcp/' /var/ossec/etc/ossec.conf
    # grep "<protocol>tcp" -B3 -A1 /var/ossec/etc/ossec.conf


Configure Wazuh Manager to allow self registration of new agents with authentication

  .. code-block:: console

    # grep "<use_password>no" -B7 -A8 /var/ossec/etc/ossec.conf
    # sed -i 's/<use_password>no/<use_password>yes/' /var/ossec/etc/ossec.conf
    # grep "<use_password>yes" -B7 -A8 /var/ossec/etc/ossec.conf
    # echo "please123" > /var/ossec/etc/authd.pass # this is the password agents will use for self-registration
    # ossec-control enable auth

Restart Wazuh Manager and confirm the agent listener and the self-registration listener are in place

  .. code-block:: console

    # ossec-control restart
    # netstat -natp | egrep "(:1514|:1515)"


Install Wazuh API
-----------------

The Wazuh API is most commonly used by the Wazuh Kibana app to communicate with and control Wazuh Manager. It is a general purpose RESTful API that can be used from the command line via curl or via custom scripts for interacting with various aspects of Wazuh Manager.

1. Install wazuh-api package and its dependency nodejs.

  .. code-block:: console

	 # curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
	 # yum -y install nodejs
	 # yum -y install wazuh-api
	 # systemctl status wazuh-api

2. Use the API configurator script to enable SSL and set credentials for API access

  .. code-block:: console

	 # /var/ossec/api/scripts/configure_api.sh

  Hit <Enter> during configuration to take defaults, except for these cases:

  - For the three "Enter pass phrase for..." prompts:  specify "keypass" each time.
  - For "API user", enter "wazuhapiuser".
  - For "New password", enter "wazuhlab" and then enter it again.

3. Restart Wazuh API

  .. code-block:: console

    # systemctl restart wazuh-api


Install Filebeat
----------------

Filebeat is the tool on the Wazuh Server that will securely forward the alerts and archived events to the Logstash service on the Elastic Stack Server.

1. Install the GPG keys from Elastic, and the Elastic repository:

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

2. Install Filebeat:

  .. code-block:: console

	 # yum -y install filebeat-6.1.1

3. Download the Filebeat config file from the Wazuh repository, which is preconfigured to forward Wazuh alerts to Logstash:

  .. code-block:: console

	 # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/3.1/extensions/filebeat/filebeat.yml

4. Put the specific IP number of your Elastic Server instance into the Filebeat config:

  .. code-block:: console

  	sed -i 's/YOUR_ELASTIC_SERVER_IP/172.30.0.20/' /etc/filebeat/filebeat.yml

5. Enable and start the Filebeat service:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable filebeat.service
    # systemctl start filebeat.service

6. Now disable the Elastic repository in order to prevent a future unintended Elastic Stack upgrade to a version that may be in conflict with the latest stable Wazuh packages.

  .. code-block:: console

    # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/elastic.repo
