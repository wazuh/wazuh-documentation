.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Check out how to install the Wazuh server components in this section of the Wazuh documentation in this step-by-step guide. 
  
.. _build_lab_install_wazuh_server:

Install Wazuh server Components
================================

The Wazuh server in your lab will be running the Wazuh manager, Wazuh API, and Filebeat applications.

Log in and sudo to root
-----------------------

This is how it should look like, after loging in and gaining sudo privileges with ``sudo su``:

    .. code-block:: console

      [centos@wazuh-manager ~]$ sudo su -
      [root@wazuh-manager ~]#


Add the Wazuh yum repository
----------------------------

The first step to setting up the manager is to add the Wazuh repository:

     .. code-block:: console

         # cat > /etc/yum.repos.d/wazuh.repo <<\EOF
         [wazuh_repo]
         gpgcheck=1
         gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
         enabled=1
         name=Wazuh repository
         baseurl=https://packages.wazuh.com/4.x/yum/
         protect=1
         EOF


Install and set up Wazuh server
--------------------------------

Install the Wazuh manager software and start its service:

  .. code-block:: console

    # yum -y install wazuh-manager-4.1.5-1
    # systemctl start wazuh-manager

Configure Wazuh manager to allow self registration of new agents with authentication:

  .. code-block:: console

    # grep "<use_password>" -B7 -A8 /var/ossec/etc/ossec.conf
    # sed -i 's/<use_password>no/<use_password>yes/' /var/ossec/etc/ossec.conf
    # grep "<use_password>" -B7 -A8 /var/ossec/etc/ossec.conf
    # echo "please123" > /var/ossec/etc/authd.pass 

The password echoed to ``/var/ossec/etc/authd.pass`` is the one agents will use for self-registration. 

Restart Wazuh manager and confirm the agent listener and the self-registration
listener are in place:

    .. code-block:: console

      [root@wazuh-manager ~]# systemctl restart wazuh-manager
      [root@wazuh-manager ~]# netstat -natp | egrep "(:1514|:1515)"

    .. code-block:: none
      :class: output

      tcp        0      0 0.0.0.0:1514            0.0.0.0:*               LISTEN      14311/ossec-remoted
      tcp        0      0 0.0.0.0:1515            0.0.0.0:*               LISTEN      14263/ossec-authd

.. versionadded:: 4.0.0

The Wazuh API will be installed along the Wazuh manager by default. No extra steps or requirements are needed to install it.

.. note::
    Check out the section :ref:`Wazuh API <api>` for more information on how to set up and use the Wazuh API.


Install Filebeat
----------------

Filebeat is the tool on the Wazuh server that will securely forward the alerts
and archived events to the Elasticsearch service.

1. Install the GPG keys from Elastic, and the Elastic repository:

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

2. Install Filebeat:

  .. code-block:: console

    # yum install https://packages.wazuh.com/4.x/yum/filebeat-oss-7.10.2-x86_64.rpm

3. Download the Filebeat configuration file from the Wazuh repository. This is pre-configured to forward Wazuh alerts to Elasticsearch:

  .. code-block:: console

    # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/filebeat/7.x/filebeat.yml
    # chmod go+r /etc/filebeat/filebeat.yml

4. Download the alerts template for Elasticsearch:

  .. code-block:: console

    # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/elasticsearch/7.x/wazuh-template.json
    # chmod go+r /etc/filebeat/wazuh-template.json

5. Download the Wazuh module for Filebeat:

  .. code-block:: console

    # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.1.tar.gz | sudo tar -xvz -C /usr/share/filebeat/module

6. Edit and set the specific IP address of your Elasticsearch instance into the Filebeat config:

  .. code-block:: console

  	# sed -i 's/YOUR_ELASTIC_SERVER_IP/172.30.0.20/' /etc/filebeat/filebeat.yml

7. Enable and start the Filebeat service:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable filebeat.service
    # systemctl start filebeat.service

8. Now disable the Wazuh and Elastic repositories in order to prevent
   unintended upgrades that may cause a version conflict with the current installation.

  .. code-block:: console

    # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo
    # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/elastic.repo
