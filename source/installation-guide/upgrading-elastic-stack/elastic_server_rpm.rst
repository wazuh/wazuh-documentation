.. Copyright (C) 2019 Wazuh, Inc.

.. _elastic_server_rpm_legacy:

Upgrading Elastic stack with RPM packages
=========================================

Prepare the Elastic Stack
-------------------------

1. Stop the services:

  .. code-block:: console

    systemctl stop filebeat
    systemctl stop logstash
    systemctl stop kibana
    systemctl stop elasticsearch

2. Add the new repository for Elastic Stack 7.x:

  .. code-block:: console

    rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch
    cat > /etc/yum.repos.d/elastic.repo << EOF
    [elasticsearch-7.x]
    name=Elasticsearch repository for 7.x packages
    baseurl=https://artifacts.elastic.co/packages/7.x/yum
    gpgcheck=1
    gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
    enabled=1
    autorefresh=1
    type=rpm-md
    EOF

Upgrade Elasticsearch
---------------------

1. Disable shard allocation

  .. code-block:: console

    PUT _cluster/settings
    {
      "persistent": {
        "cluster.routing.allocation.enable": "primaries"
      }
    }

2. Stop non-essential indexing and perform a synced flush. (Optional)

  .. code-block:: console

    POST _flush/synced

3. Shut down a single node.

  .. code-block:: console
    
    systemctl stop elasticsearch.service

4. Upgrade the node you shut down.

  .. code-block:: console
    
    yum install elasticsearch-7.0.0
    systemctl restart elasticsearch

5. Start the newly-upgraded node and confirm that it joins the cluster by checking the log file or by submitting a _cat/nodes request:

  .. code-block:: console

    GET _cat/nodes

6. Reenable shard allocation.

  .. code-block:: console

    PUT _cluster/settings
    {
      "persistent": {
        "cluster.routing.allocation.enable": null
      }
    }

7. Before upgrading the next node, wait for the cluster to finish shard allocation. 

  .. code-block:: console

    GET _cat/health?v

8. Repeat it for every Elasticsearch node.

Upgrade Filebeat
----------------

1. Update the configuration file.

  .. code-block:: console

    cp /etc/filebeat/filebeat.yml /backup/filebeat.yml.backup
    curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/3.9/extensions/filebeat/filebeat-7.yml

2. Upgrade Filebeat.

  .. code-block:: console

    yum install filebeat-7.0.0

3. Restart Filebeat.

  .. code-block:: console

    systemctl restart filebeat

Upgrade Logstash
----------------

1. Update the configuration file.

  a) Local configuration (only in a single-host architecture):

    .. code-block:: console

      cp /etc/logstash/conf.d/01-wazuh.conf /backup/01-wazuh.conf.backup
      curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/3.9/extensions/logstash/01-wazuh-local-7.conf
  
    Because the Logstash user needs to read the alerts.json file, please add it to OSSEC group by running:

    .. code-block:: console

      usermod -a -G ossec logstash
  
  b) Remote configuration:

    .. code-block:: console
  
      cp /etc/logstash/conf.d/01-wazuh.conf /backup/01-wazuh.conf.backup
      curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/3.9/extensions/logstash/01-wazuh-remote-7.conf

2. Upgrade Logstash.

  .. code-block:: console

    yum install logstash-7.0.0

3. Restart Logstash.

  .. code-block:: console

    systemctl restart filebeat

Upgrade Kibana
--------------

1. Since Kibana 7.0.0, the Elasticsearch server address setting has been changed, if your Elasticsearch is not on ``localhost``, please replace ``elasticsearch.url: "address:9200"`` with ``elasticsearch.hosts: ["address:9200"]``.
2. Remove the Wazuh app.

  .. code-block:: console

    /usr/share/kibana/bin/kibana-plugin remove wazuh

3. Upgrade Kibana.

  .. code-block:: console

    yum install kibana-7.0.0

4. Install the Wazuh app.

  .. code-block:: console

    sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-3.9.0_7.0.0.zip

5. Restart Kibana.

  .. code-block:: console

    systemctl restart kibana

