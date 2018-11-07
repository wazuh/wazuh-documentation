.. Copyright (C) 2018 Wazuh, Inc.

.. _upgrading_different_major:

Upgrade from different major version
====================================

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
      name=Wazuh repository
      baseurl=https://packages.wazuh.com/3.x/yum/
      protect=1
      EOF

  b) For Debian/Ubuntu:

    .. code-block:: console

      # echo "deb https://packages.wazuh.com/3.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

3. Upgrade the agent.

  a) Upgrade the Wazuh agent on CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install wazuh-agent

  b) Upgrade the Wazuh agent on Debian/Ubuntu:

    .. code-block:: console

      # apt-get update
      # apt-get install wazuh-agent

  c) For Windows:

  The agent upgrading process for Windows systems requires to download the latest available installer from the :ref:`packages list <packages>`. There are two ways of using it (both of them require **administrator rights**):

  * Using the GUI installer:

  Open the installer and follow the instructions to upgrade the agent.

    .. image:: ../../images/installation/windows.png
      :align: center

  * Using the command line:

  To upgrade the Windows agent from the command line, run the installer using Windows PowerShell or the command prompt (the ``/q`` argument is used for unattended installations):

  .. code-block:: console

    # wazuh-agent-3.6.1-1.msi /q

.. note::
  To learn more about the unattended installation process, you can check the :ref:`Windows installation guide <wazuh_agent_windows>`.

Upgrade Wazuh manager
---------------------

1. Stop the services:

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
      name=Wazuh repository
      baseurl=https://packages.wazuh.com/3.x/yum/
      protect=1
      EOF

  b) For Debian/Ubuntu:

    .. code-block:: console

      # echo "deb https://packages.wazuh.com/3.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list


3. Upgrade the manager.

  a) Upgrade the Wazuh manager on CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install wazuh-manager

  b) Upgrade the Wazuh manager on Debian/Ubuntu:

    .. code-block:: console

      # apt-get update
      # apt-get install wazuh-manager


4. Upgrade the API.

  a) Upgrade the Wazuh API on CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install wazuh-api

  b) Upgrade the Wazuh API on Debian/Ubuntu:

    .. code-block:: console

      # apt-get install wazuh-api


Prepare Elastic Stack
---------------------

1. Stop the services:

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



Upgrade Elasticsearch
---------------------

.. note::
  Since you are upgrading to a different major version of Elasticsearch , it's important that you backup **/etc/elasticsearch/elasticsearch.yml** and **/etc/elasticsearch/jvm.options** before upgrading Elasticsearch. Check the `Elasticsearch Reference <https://www.elastic.co/guide/en/elasticsearch/reference/6.x/index.html>`_ for more information.

1. Update Elasticsearch:

  a) For CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install elasticsearch-6.4.3

  b) For Debian/Ubuntu:

    .. code-block:: console

      # apt-get update
      # apt-get install elasticsearch=6.4.3


2. Start Elasticsearch:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable elasticsearch.service
    # systemctl start elasticsearch.service

  It's important to wait until the Elasticsearch server finishes starting. Check the current status with the following command, which should give you a response like the shown below:

  .. code-block:: console

    # curl "localhost:9200/?pretty"

    {
      "name" : "Zr2Shu_",
      "cluster_name" : "elasticsearch",
      "cluster_uuid" : "M-W_RznZRA-CXykh_oJsCQ",
      "version" : {
        "number" : "6.4.3",
        "build_flavor" : "default",
        "build_type" : "rpm",
        "build_hash" : "053779d",
        "build_date" : "2018-07-20T05:20:23.451332Z",
        "build_snapshot" : false,
        "lucene_version" : "7.3.1",
        "minimum_wire_compatibility_version" : "5.6.0",
        "minimum_index_compatibility_version" : "5.0.0"
      },
      "tagline" : "You Know, for Search"
    }

3. Load the Wazuh template for Elasticsearch:

  .. code-block:: console

    # curl https://raw.githubusercontent.com/wazuh/wazuh/3.6/extensions/elasticsearch/wazuh-elastic6-template-alerts.json | curl -XPUT 'http://localhost:9200/_template/wazuh' -H 'Content-Type: application/json' -d @-

Upgrade Logstash
----------------

1. Upgrade Logstash:

  a) For CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install logstash-6.4.3

  b) For Debian/Ubuntu:

    .. code-block:: console

      # apt-get install logstash=1:6.4.3-1


2. Download and set the Wazuh configuration for Logstash:

  a) Local configuration:

    .. code-block:: console

      # cp /etc/logstash/conf.d/01-wazuh.conf /backup_directory/01-wazuh.conf.bak
      # curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/3.6/extensions/logstash/01-wazuh-local.conf
      # usermod -a -G ossec logstash

  b) Remote configuration:

    .. code-block:: console

      # cp /etc/logstash/conf.d/01-wazuh.conf /backup_directory/01-wazuh.conf.bak
      # curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/3.6/extensions/logstash/01-wazuh-remote.conf


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

      # yum install kibana-6.4.3

  b) For Debian/Ubuntu:

    .. code-block:: console

      # apt-get install kibana=6.4.3


2. Uninstall the Wazuh app from Kibana:

    a) Update file permissions. This will avoid several errors prior to updating the app:

    .. code-block:: console

      # chown -R kibana:kibana /usr/share/kibana/optimize
      # chown -R kibana:kibana /usr/share/kibana/plugins

    b) Remove the Wazuh app:

    .. code-block:: console

      # sudo -u kibana /usr/share/kibana/bin/kibana-plugin remove wazuh


3. Migrate .kibana from 5.x to 6.x:

  The .kibana index (which holds Kibana's configuration) has drastically changed. To migrate it, follow the official documentation:

  - `Migrating Kibana .index to 6.0 <https://www.elastic.co/guide/en/kibana/current/migrating-6.0-index.html>`_


4. Upgrade the Wazuh Kibana App:

  a) Increase the default Node.js heap memory limit to prevent out of memory errors when installing the Wazuh app. Set the limit as follow:

  .. code-block:: console

      # export NODE_OPTIONS="--max-old-space-size=3072"

  b) Install the Wazuh app:

  .. code-block:: console

      # rm -rf /usr/share/kibana/optimize/bundles
      # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-3.6.1_6.4.3.zip


5. Start Kibana:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable kibana.service
    # systemctl start kibana.service

Upgrade Filebeat
----------------

1. Upgrade Filebeat:

  a) For CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install filebeat-6.4.3

  b) For Debian/Ubuntu:

    .. code-block:: console

      # apt-get install filebeat=6.4.3

2. Download the Filebeat configuration file from the Wazuh repository:

  .. code-block:: console

    # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/3.6/extensions/filebeat/filebeat.yml

3. Edit the file ``/etc/filebeat/filebeat.yml`` and replace ``ELASTIC_SERVER_IP`` with the IP address or the hostname of your Elastic Stack server:

  .. code-block:: yaml

    output:
      logstash:
        hosts: ["ELASTIC_SERVER_IP:5000"]

4. Enable and start the Filebeat service:

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl enable filebeat.service
    # systemctl start filebeat.service

Official upgrading guides for Elastic Stack:

    - `Upgrading Elasticsearch <https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html>`_

    - `Upgrading Logstash <https://www.elastic.co/guide/en/logstash/current/upgrading-logstash.html>`_

    - `Upgrading Kibana <https://www.elastic.co/guide/en/kibana/current/upgrade.html>`_

    - `Upgrading Filebeat <https://www.elastic.co/guide/en/beats/libbeat/6.0/upgrading.html>`_

Disable the Elasticsearch repository
------------------------------------

We recommend that the Elasticsearch repository be disabled in order to prevent an upgrade to a newer Elastic Stack version. An untimely or unplanned upgrade may break the Wazuh app. To disable the repository, follow these steps:

  a) For CentOS/RHEL/Fedora:

    .. code-block:: console

      # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/elastic.repo

  b) For Debian/Ubuntu:

    .. code-block:: console

      # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-6.x.list
      # apt-get update

Reindexing your previous alerts
-------------------------------

In the new version of Wazuh, the structure of the Wazuh alerts have changed. The new alerts present more information to the end user than the old alerts. This is why Wazuh 3.x uses different indices and templates than Wazuh 2.x.

For this reason, you will not be able to see the previous alerts using Kibana. If you need to access them, you will have to reindex the previous indices.

Reindexing can be a complex process, depending on the size of your dataset. This should only be done if you need to visualize alerts that were generated before the upgrade of your Kibana environment.


There is a reindex script developed by the Wazuh Team. The documentation for this script  is available at :doc:`Restore Wazuh alerts from Wazuh 2.x <./restore_alerts>`.

.. note::
    Older alerts will not disappear if you choose not to reindex. These alerts will still be stored in Elasticsearch and the Wazuh manager.
