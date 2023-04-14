.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section of the Wazuh documentation guides through the upgrade process of the Elastic Stack from 6.8 to 7.x.

.. _upgrading_elastic_stack_6.8_7.x:

Upgrading Elastic Stack from 6.8 to 7.x
=======================================

This section guides you through the upgrade process of Elastic Stack components, including Elasticsearch, Filebeat, and Kibana for the Elastic distribution.

Coming new in Elastic 7.x, there is an architecture change introduced in the Wazuh installation. Logstash is no longer required, and Filebeat will send the events directly to Elasticsearch. In addition, Elasticsearch 7.x has Java embedded, so unless the user decides to use Logstash, Java is no longer required.


Preparing the Elastic Stack
---------------------------

#. Stop the services:

    .. code-block:: console

      # systemctl stop filebeat
      # systemctl stop kibana

#. Add the new repository for Elastic Stack 7.x:

    .. tabs::

      .. group-tab:: YUM

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

      .. group-tab:: APT

        .. code-block:: console

          # curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/elasticsearch.gpg --import && chmod 644 /usr/share/keyrings/elasticsearch.gpg
          # echo "deb [signed-by=/usr/share/keyrings/elasticsearch.gpg] https://artifacts.elastic.co/packages/7.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-7.x.list

      .. group-tab:: ZYpp

        .. code-block:: console

          # rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch
          # cat > /etc/zypp/repos.d/elastic.repo << EOF
          [elasticsearch-7.x]
          name=Elasticsearch repository for 7.x packages
          baseurl=https://artifacts.elastic.co/packages/7.x/yum
          gpgcheck=1
          gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
          enabled=1
          autorefresh=1
          type=rpm-md
          EOF


Upgrading Elasticsearch
-----------------------

#. Disable shard allocation:

    .. code-block:: bash

      curl -X PUT "localhost:9200/_cluster/settings" -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": "primaries"
        }
      }
      '

#. Stop non-essential indexing and perform a synced flush (optional):

    .. code-block:: console

      # curl -X POST "localhost:9200/_flush/synced"

#. Shut down a single node:

    .. code-block:: console

      # systemctl stop elasticsearch

#. Upgrade the shut down node:

    .. tabs::

      .. group-tab:: YUM

        .. code-block:: console

          # yum install elasticsearch-|ELASTICSEARCH_LATEST|


      .. group-tab:: APT

        .. code-block:: console

          # apt-get install elasticsearch=|ELASTICSEARCH_LATEST|
          # systemctl restart elasticsearch

      .. group-tab:: zypper

        .. code-block:: console

          # zypper update elasticsearch-|ELASTICSEARCH_LATEST|

#. Starting with Elasticsearch 7.0, master nodes require a configuration setting with the list of the cluster master nodes. The following settings must be added to the configuration of the Elasticsearch master node (``elasticsearch.yml``):

    .. code-block:: yaml

      discovery.seed_hosts:
        - master_node_name_or_ip_address
      cluster.initial_master_nodes:
        - master_node_name_or_ip_address

#. Restart the service:

    .. code-block:: console

      # systemctl daemon-reload
      # systemctl restart elasticsearch

#. Start the newly-upgraded node and confirm that it joins the cluster by checking the log file or by submitting a ``_cat/nodes`` request:

    .. code-block:: console

      # curl -X GET "localhost:9200/_cat/nodes"

#. Reenable shard allocation:

    .. code-block:: bash

      curl -X PUT "localhost:9200/_cluster/settings" -H 'Content-Type: application/json' -d'
      {
        "persistent": {
          "cluster.routing.allocation.enable": null
        }
      }
      '

#. Before upgrading the next node, wait for the cluster to finish shard allocation:

    .. code-block:: console

      # curl -X GET "localhost:9200/_cat/health?v"

#. Repeat the steps for every Elasticsearch node.

Field migration: From @timestamp to timestamp
----------------------------------------------

In the previous Elasticsearch versions, the Elastic documents were indexed using the ``@timestamp`` field as the reference field for time-based indices. Starting in Elastic 7.x, this field has become a reserved field and is no longer manipulable. The Wazuh time-based indices use the ``timestamp`` field instead.

Due to this change, the previous alerts will not be visible in the Wazuh indices, and an update must be performed on all previous indices in order to complete the upgrade.

Run the request below for each Wazuh index created before the Elastic 7.x upgrade. It will add the ``timestamp`` field for all the index documents.

An example of how to run the request using the index ``wazuh-alerts-3.x-2019.05.16`` looks as follows:

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

The request must be executed for all previous indices which need to be migrated. Modify the date parameter according to the index name.

More information about the request can be found in the `Update by query <https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update-by-query.html>`_ section of the Elasticsearch documentation.

Upgrading Filebeat
------------------

#. Upgrade Filebeat:

    .. tabs::

      .. group-tab:: YUM

        .. code-block:: console

          # yum install filebeat-|ELASTICSEARCH_LATEST|


      .. group-tab:: APT

        .. code-block:: console

          # apt-get install filebeat=|ELASTICSEARCH_LATEST|

      .. group-tab:: ZYpp

        .. code-block:: console

          # zypper update filebeat-|ELASTICSEARCH_LATEST|

#. Update the Filebeat configuration file:

    .. code-block:: console

      # cp /etc/filebeat/filebeat.yml <back-up-directory>/filebeat.yml.backup
      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_CURRENT|/extensions/filebeat/7.x/filebeat.yml
      # chmod go+r /etc/filebeat/filebeat.yml

#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_CURRENT|/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.2.tar.gz | sudo tar -xvz -C /usr/share/filebeat/module

#. Edit the ``/etc/filebeat/filebeat.yml`` configuration file and replace ``YOUR_ELASTIC_SERVER_IP`` with the IP address or the hostname of the Elasticsearch server:

    .. code-block:: yaml

      output.elasticsearch.hosts: ['http://YOUR_ELASTIC_SERVER_IP:9200']

#. Restart Filebeat:

    .. code-block:: console

      # systemctl daemon-reload
      # systemctl restart filebeat

Upgrading Kibana
----------------

#. Modify the ``/etc/kibana/kibana.yml`` configuration file and replace ``elasticsearch.url: "address:9200"`` by ``elasticsearch.hosts: ["address:9200"]``.

#. Remove the Wazuh Kibana plugin:

    .. code-block:: console

      # cd /usr/share/kibana/
      # sudo -u kibana bin/kibana-plugin remove wazuh

#. Upgrade Kibana:

    .. tabs::

      .. group-tab:: YUM

        .. code-block:: console

          # yum install kibana-|ELASTICSEARCH_LATEST|


      .. group-tab:: APT

        .. code-block:: console

          # apt-get install kibana=|ELASTICSEARCH_LATEST|

      .. group-tab:: ZYpp

        .. code-block:: console

          # zypper update kibana-|ELASTICSEARCH_LATEST|

#. Install the Wazuh Kibana plugin:

    .. tabs::

      .. group-tab:: From URL

        .. code-block:: console

          # cd /usr/share/kibana/
          # sudo -u kibana bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-|WAZUH_CURRENT|_|ELASTICSEARCH_LATEST|.zip


      .. group-tab:: From the package

        .. code-block:: console

          # cd /usr/share/kibana/
          # sudo -u kibana bin/kibana-plugin install file:///path/wazuhapp-|WAZUH_CURRENT|_|ELASTICSEARCH_LATEST|.zip


#. For installations on Kibana 7.6.x version and higher, it is recommended to increase the heap size of Kibana to ensure the Kibana's plugins installation:

    .. code-block:: console

      # cat >> /etc/default/kibana << EOF
      NODE_OPTIONS="--max_old_space_size=2048"
      EOF

#. Restart Kibana:

    .. code-block:: console

      # systemctl daemon-reload
      # systemctl restart kibana

Disabling the repositories
^^^^^^^^^^^^^^^^^^^^^^^^^^

It is recommended to disable the Elastic repository to prevent an upgrade to a newer Elastic Stack version due to the possibility of undoing changes with the Wazuh Kibana plugin:

    .. tabs::

      .. group-tab:: YUM

        .. code-block:: console

          # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/elastic.repo

      .. group-tab:: APT

        .. code-block:: console

          # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-7.x.list
          # apt-get update

        Alternatively, the user can set the package state to ``hold``, which will stop updates. It will be still possible to upgrade it manually using ``apt-get install``:

        .. code-block:: console

          # echo "elasticsearch hold" | sudo dpkg --set-selections
          # echo "filebeat hold" | sudo dpkg --set-selections
          # echo "kibana hold" | sudo dpkg --set-selections

      .. group-tab:: ZYpp

        .. code-block:: console

          # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/elastic.repo
