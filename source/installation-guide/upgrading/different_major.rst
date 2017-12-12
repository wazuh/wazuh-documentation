.. _upgrading_different_major:

Upgrade from different major version
=====================================

The following steps show how to upgrade from Wazuh 2.x to Wazuh 3.x (which implies upgrading from Elastic Stack 5.x to 6.x).


Upgrade Wazuh agent
-------------------

1. Stop the service:

  .. code-block:: console

    # systemctl stop wazuh-agent

2. Add the new repository for Wazuh 3.x. 

  a) For CentOS/RHEL/Fedora:

    .. code-block:: console

      # cat > /etc/yum.repos.d/wazuh.repo <<\EOF
        [wazuh_repo]
        gpgcheck=1
        gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
        enabled=1
        name=CentOS-$releasever - Wazuh
        baseurl=http://packages.wazuh.com/3.x/yum/
        protect=1
        EOF

  b) For Debian/Ubuntu:

    .. code-block:: console

      # echo "deb https://packages.wazuh.com/3.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list


3. Update the repositories in your system.

  a) For CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum update

  b) For Debian/Ubuntu:

    .. code-block:: console

      # apt-get update


4. Upgrade the agent.

  a) Upgrade Wazuh agent on CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install wazuh-agent

  b) Upgrade Wazuh agent on Debian/Ubuntu:

    .. code-block:: console

      # apt-get install wazuh-agent


Upgrade Wazuh manager
---------------------

1. Stop services:

  .. code-block:: console

    # systemctl stop wazuh-api
    # systemctl stop wazuh-manager


2. Add the new repository for Wazuh 3.x.

  a) For CentOS/RHEL/Fedora:

    .. code-block:: console

      # cat > /etc/yum.repos.d/wazuh.repo <<\EOF
        [wazuh_repo]
        gpgcheck=1
        gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
        enabled=1
        name=CentOS-$releasever - Wazuh
        baseurl=http://packages.wazuh.com/3.x/yum/
        protect=1
        EOF

  b) For Debian/Ubuntu:

    .. code-block:: console

      # echo "deb https://packages.wazuh.com/3.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list


3. Update the repositories in your system.

  a) For CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum update

  b) For Debian/Ubuntu:

    .. code-block:: console

      # apt-get update


4. Upgrade the manager.

  a) Upgrade Wazuh manager on CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install wazuh-manager

  b) Upgrade Wazuh manager on Debian/Ubuntu:

    .. code-block:: console

      # apt-get install wazuh-manager


5. Upgrade the API.

  a) Upgrade Wazuh API on CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install wazuh-api

  b) Upgrade Wazuh API on Debian/Ubuntu:

    .. code-block:: console

      # apt-get install wazuh-api


Prepare Elastic Stack 
---------------------

1. Stop services:

  .. code-block:: console

    # systemctl stop filebeat 
    # systemctl stop logstash 
    # systemctl stop kibana 
    # systemctl stop elasticsearch 


2. Add the new repository for Elastic Stack 6.x:

  a) For CentOS/RHEL/Fedora:

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

  b) For Debian/Ubuntu:

    .. code-block:: console

      # curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
      # echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-6.x.list


3. Update the repositories in your system.

  a) For CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum update

  b) For Debian/Ubuntu:

    .. code-block:: console

      # apt-get update


Upgrade Elasticsearch
---------------------

1. Update Elasticsearch:

  a) For CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install elasticsearch

  b) For Debian/Ubuntu:

    .. code-block:: console

      # apt-get install elasticsearch


2. Start Elasticsearch:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable elasticsearch.service
    # systemctl start elasticsearch.service


3. Load Wazuh Elasticsearch templates:

  .. code-block:: console

    # curl https://raw.githubusercontent.com/wazuh/wazuh/3.0/extensions/elasticsearch/wazuh-elastic6-template-alerts.json | curl -XPUT 'http://localhost:9200/_template/wazuh' -H 'Content-Type: application/json' -d @-

  .. code-block:: console

    # curl https://raw.githubusercontent.com/wazuh/wazuh/3.0/extensions/elasticsearch/wazuh-elastic6-template-monitoring.json | curl -XPUT 'http://localhost:9200/_template/wazuh-agent' -H 'Content-Type: application/json' -d @-


4. Insert sample alert in Elasticsearch:

  .. code-block:: console

    # curl https://raw.githubusercontent.com/wazuh/wazuh/3.0/extensions/elasticsearch/alert_sample.json | curl -XPUT "http://localhost:9200/wazuh-alerts-3.x-"`date +%Y.%m.%d`"/wazuh/sample" -H 'Content-Type: application/json' -d @-


Upgrade Logstash
----------------

1. Upgrade Logstash:

  a) For CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install logstash

  b) For Debian/Ubuntu:

    .. code-block:: console

      # apt-get install logstash


2. Download and set the Wazuh configuration for Logstash:

  a) Local configuration:

    .. code-block:: console

      # cp /etc/logstash/conf.d/01-wazuh.conf /etc/logstash/conf.d/01-wazuh.conf.bak
      # curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/3.0/extensions/logstash/01-wazuh-local.conf
      # usermod -a -G ossec logstash

  b) Remote configuration:

    .. code-block:: console

      # cp /etc/logstash/conf.d/01-wazuh.conf /etc/logstash/conf.d/01-wazuh.conf.bak
      # curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/3.0/extensions/logstash/01-wazuh-remote.conf


3. Start Logstash:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable logstash.service
    # systemctl start logstash.service


Upgrade Kibana
--------------

1. Upgrade Kibana:

  a) For CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install kibana

  b) For Debian/Ubuntu:

    .. code-block:: console

      # apt-get install kibana


2. Remove the Wazuh Kibana App plugin from Kibana:

    .. code-block:: console

      # /usr/share/kibana/bin/kibana-plugin remove wazuh


3. Migrate .kibana from 5.x to 6.x:

	The .kibana index (which holds Kibana configuration) has drastically changed. To migrate it, follow the official documentation:

  - Migrating Kibana .index to 6.0: https://www.elastic.co/guide/en/kibana/current/migrating-6.0-index.html


4. Upgrade Wazuh Kibana App:

  .. code-block:: console

    # rm -rf /usr/share/kibana/optimize/bundles
    # /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp.zip


Upgrade Filebeat
----------------

1. Upgrade Filebeat:

  a) For CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install filebeat

  b) For Debian/Ubuntu:

    .. code-block:: console

      # apt-get install filebeat


Official Upgrading guides for Elastic Stack:

    - Upgrading Elasticsearch: https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html

    - Upgrading Logstash: https://www.elastic.co/guide/en/logstash/current/upgrading-logstash.html

    - Upgrading Kibana: https://www.elastic.co/guide/en/kibana/current/upgrade.html

    - Upgrading Filebeat: https://www.elastic.co/guide/en/beats/libbeat/6.0/upgrading.html


Reindexing your previous alerts
-------------------------------

A reindex can be a complex process depending on how big is your dataset. Do it only if you are interested in visualizing alerts generated before the upgrade in your Kibana environment.

In the new version of Wazuh, there's a change in the Wazuh alerts structure. Now, the new alerts bring more information to the final user. That is why Wazuh 3.x uses different
indices and templates than Wazuh 2.x.

For that reason, you will not be able to see the previous alerts using Kibana. If you need to access them, you will have to reindex the previous indices.

The Wazuh team is currently working on a reindex script to accomplish this process.

.. note::
    Not reindexing alerts doesn't mean that they will disappear, alerts will still be stored in Elasticsearch and the Wazuh manager.
