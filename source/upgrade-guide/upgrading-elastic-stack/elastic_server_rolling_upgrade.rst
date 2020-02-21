.. Copyright (C) 2019 Wazuh, Inc.

.. _elastic_server_rolling_upgrade:

Upgrading Elastic Stack from 6.8 to 7.x
=======================================

Coming new in version Elastic 7.x, there is an architecture change introduced in Wazuh Stack. Logstash is no longer required, Filebeat will send the events directly to Elasticsearch server. In addition, Elasticsearch 7 has Java embedded, so unless you decide to use Logstash, Java is not longer required.


Prepare the Elastic Stack
-------------------------

#. Stop the services:

    .. code-block:: console

      # systemctl stop filebeat
      # systemctl stop kibana

#. Add the new repository for Elastic Stack 7.x:

    * CentOS/RHEL/Fedora:

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

    * Debian/Ubuntu:

      .. code-block:: console

        # curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
        # echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-7.x.list


Upgrade Elasticsearch
---------------------

#. Disable shard allocation

    .. code-block:: bash

      curl -X PUT "localhost:9200/_cluster/settings" -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": "primaries"
        }
      }
      '

#. Stop non-essential indexing and perform a synced flush. (Optional)

    .. code-block:: bash

      curl -X POST "localhost:9200/_flush/synced"

#. Shut down a single node.

    .. code-block:: console

      # systemctl stop elasticsearch

#. Upgrade the node you shut down.

    * CentOS/RHEL/Fedora:

      .. code-block:: console

        # yum install elasticsearch-7.6.0

    * Debian/Ubuntu:

      .. code-block:: console

        # apt-get install elasticsearch=7.6.0
        # systemctl restart elasticsearch

#. Starting in Elasticsearch 7.0, master nodes require a configuration setting set with the list of cluster master nodes. Add following setting in the Elasticsearch master node configuration (``elasticsearch.yml``).

    .. code-block:: yaml

      cluster.initial_master_nodes:
        - master_node_name_or_ip_address

#. Restart the service.

    .. code-block:: console

      # systemctl daemon-reload
      # systemctl restart elasticsearch

#. Start the newly-upgraded node and confirm that it joins the cluster by checking the log file or by submitting a *_cat/nodes* request:

    .. code-block:: bash

      curl -X GET "localhost:9200/_cat/nodes"

#. Reenable shard allocation.

    .. code-block:: bash

      curl -X PUT "localhost:9200/_cluster/settings" -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": null
        }
      }
      '

#. Before upgrading the next node, wait for the cluster to finish shard allocation.

    .. code-block:: bash

      curl -X GET "localhost:9200/_cat/health?v"

#. Repeat it for every Elasticsearch node.

Field migration: From @timestamp to timestamp
----------------------------------------------

In previous Elastic search versions, the Elastic documents were indexed using the field *@timestamp* as the reference field for time-based indices. Starting in Elastic 7.x, this field has become a reserved field and it is no longer manipulable. Wazuh time-based indices now make use of field *timestamp* instead.

Due to this change, previous alerts won't be visible in Wazuh indices, an update must be performed to all previous indices in order to complete the upgrade.

Run below request for each Wazuh index created before Elastic 7.x upgrade. It will add the *timestamp* field for all the index documents.

Here is an example of how to run the request using the index *wazuh-alerts-3.x-2019.05.16*.

.. code-block:: bash

  curl -X POST "localhost:9200/wazuh-alerts-3.x-2019.05.16/wazuh/_update_by_query?wait_for_completion=true" -H 'Content-Type: application/json' -d'
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
    "script": "ctx._source.timestamp = ctx._source[\"@timestamp\"]"
  }
  '

The request must be run for all previous indices you want to migrate, modify the date parameter according to your index name.

- More information about `update by query <https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update-by-query.html>`_ in Elasticsearch.

Upgrade Filebeat
----------------

#. Upgrade Filebeat.

    * CentOS/RHEL/Fedora:

      .. code-block:: console

        # yum install filebeat-7.6.0

    * Debian/Ubuntu:

      .. code-block:: console

        # apt-get install filebeat=7.6.0

#. Update the configuration file.

    .. code-block:: console

      # cp /etc/filebeat/filebeat.yml /backup/filebeat.yml.backup
      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/v3.11.3/extensions/filebeat/7.x/filebeat.yml
      # chmod go+r /etc/filebeat/filebeat.yml

#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v3.11.3/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/3.x/filebeat/wazuh-filebeat-0.1.tar.gz | sudo tar -xvz -C /usr/share/filebeat/module

#. Edit the file ``/etc/filebeat/filebeat.yml`` and replace ``YOUR_ELASTIC_SERVER_IP`` with the IP address or the hostname of the Elasticsearch server. For example:

    .. code-block:: yaml

      output.elasticsearch.hosts: ['http://YOUR_ELASTIC_SERVER_IP:9200']

#. Restart Filebeat.

    .. code-block:: console

      # systemctl daemon-reload
      # systemctl restart filebeat

Upgrade Kibana
--------------

#. Modify Kibana configuration file ``/etc/kibana/kibana.yml`` and replace ``elasticsearch.url: "address:9200"`` by ``elasticsearch.hosts: ["address:9200"]``.

#. Remove the Wazuh app.

    .. code-block:: console

      # cd /usr/share/kibana/
      # sudo -u kibana bin/kibana-plugin remove wazuh

#. Upgrade Kibana.

    * For CentOS/RHEL/Fedora:

      .. code-block:: console

        # yum install kibana-7.6.0

    * For Debian/Ubuntu:

      .. code-block:: console

        # apt-get install kibana=7.6.0

#. Install the Wazuh app.

    .. code-block:: console

      # cd /usr/share/kibana/
      # sudo -u kibana bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-3.11.3_7.6.0.zip

#. Restart Kibana.

    .. code-block:: console

      # systemctl daemon-reload
      # systemctl restart kibana
