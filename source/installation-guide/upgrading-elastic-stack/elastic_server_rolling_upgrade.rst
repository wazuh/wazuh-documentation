.. Copyright (C) 2019 Wazuh, Inc.

.. _elastic_server_rolling_upgrade:

Upgrading Elastic Stack from 6.7 to 7.x
=======================================

With Elastic 7, we changed the architecture of our integration. Logstash is now an optional component, the new configuration for Filebeat sends
the events directly to Elasticsearch, however, you can still keep Logstash installed if your use case needs it. In addition, Elasticsearch 7 has its own
Java within the package so unless you decide to use Logstash, feel free to remove Java as a required component for Wazuh and Elasticsearch.

Prepare the Elastic Stack
-------------------------

1. Stop the services:

  .. code-block:: console

    # systemctl stop filebeat
    # systemctl stop kibana

2. Add the new repository for Elastic Stack 7.x:

  * For CentOS/RHEL/Fedora:

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
  
  * For Debian/Ubuntu:

    .. code-block:: console

      # curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
      # echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-7.x.list


Upgrade Elasticsearch
---------------------

1. Disable shard allocation

  .. code-block:: bash

    curl -X PUT "localhost:9200/_cluster/settings" -H 'Content-Type: application/json' -d'
    {
      "persistent": {
        "cluster.routing.allocation.enable": "primaries"
      }
    }
    '

2. Stop non-essential indexing and perform a synced flush. (Optional)

  .. code-block:: bash

    curl -X POST "localhost:9200/_flush/synced"

3. Shut down a single node.

  .. code-block:: console
    
    # systemctl stop elasticsearch

4. Upgrade the node you shut down.

  * For CentOS/RHEL/Fedora:

    .. code-block:: console
      
      # yum install elasticsearch-7.1.0

  * For Debian/Ubuntu:

    .. code-block:: console

      # apt-get install elasticsearch=7.1.0
      # systemctl restart elasticsearch

5. Put in the following into your elasticsearch.yml of your master node.

  .. code-block:: yaml

    cluster.initial_master_nodes:
      - node_name_or_ip

6. Restart the service.

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl restart elasticsearch

7. Start the newly-upgraded node and confirm that it joins the cluster by checking the log file or by submitting a *_cat/nodes* request:

  .. code-block:: bash

    curl -X GET "localhost:9200/_cat/nodes"

8. Reenable shard allocation.

  .. code-block:: bash

    curl -X PUT "localhost:9200/_cluster/settings" -H 'Content-Type: application/json' -d'
    {
      "persistent": {
        "cluster.routing.allocation.enable": null
      }
    }
    '

9. Before upgrading the next node, wait for the cluster to finish shard allocation. 

  .. code-block:: bash

    curl -X GET "localhost:9200/_cat/health?v"

10. Repeat it for every Elasticsearch node.

Important change for all events
-------------------------------

Typically, our integration with the Elastic Stack uses the field *@timestamp* as the reference field for our time-based indices. Since Elastic 7, 
we've moved that field to *timestamp* because *@timestamp* is now a reserved field in the Elastic Stack. 

Due to this change, old indices need that field to stay visible in the Discover and the Wazuh app.

Here is an example of how to add the missing field for the index *wazuh-alerts-3.x-2019.05.16*. Keep in mind that even today's index will have 
a mixing of events (6.x and 7.x events) so take care of today's index too.

.. code-block:: bash

  curl -X POST "localhost:9200/wazuh-alerts-3.x-2019.05.16/wazuh/_update_by_query" -H 'Content-Type: application/json' -d'
  {
    "query": {
      "bool": {
        "must_not": {
          "exists": {
            "field": "timestamp"
          }
        }
      }
    },
    "script": "ctx._source.timestamp = ctx._source['@timestamp']"
  }
  '

- More information about `update by query <https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update-by-query.html>`_ in Elasticsearch.

Upgrade Filebeat
----------------

1. Upgrade Filebeat.

  * For CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install filebeat-7.1.0
  
  * For Debian/Ubuntu:

    .. code-block:: console

      # apt-get install filebeat=7.1.0  

2. Update the configuration file.

  .. code-block:: console

    # cp /etc/filebeat/filebeat.yml /backup/filebeat.yml.backup
    # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/v3.9.1/extensions/filebeat/7.x/filebeat.yml
    # chmod go+r /etc/filebeat/filebeat.yml

3. Download the alerts template for Elasticsearch:

  .. code-block:: console

    # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v3.9.1/extensions/elasticsearch/7.x/wazuh-template.json
    # chmod go+r /etc/filebeat/wazuh-template.json

4. Edit the file ``/etc/filebeat/filebeat.yml`` and add the list of Elasticsearch nodes to connect to. For example:

  .. code-block:: yaml

    output.elasticsearch:
      hosts: ['http://10.0.0.2:9200', 'http://10.0.0.3:9200']
      indices:
        - index: 'wazuh-alerts-3.x-%{+yyyy.MM.dd}'

5. Restart Filebeat.

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl restart filebeat

Upgrade Kibana
--------------

1. Replace ``elasticsearch.url: "address:9200"`` with ``elasticsearch.hosts: ["address:9200"]`` in */etc/kibana/kibana.yml*.
2. Remove the Wazuh app.

  .. code-block:: console

    # /usr/share/kibana/bin/kibana-plugin remove wazuh

3. Upgrade Kibana.

  * For CentOS/RHEL/Fedora:

    .. code-block:: console

      # yum install kibana-7.1.0
  
  * For Debian/Ubuntu:

    .. code-block:: console

      # apt-get install kibana=7.1.0  

4. Install the Wazuh app.

  .. code-block:: console

    # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-3.9.1_7.1.0.zip

5. Restart Kibana.

  .. code-block:: console

    # systemctl daemon-reload
    # systemctl restart kibana

