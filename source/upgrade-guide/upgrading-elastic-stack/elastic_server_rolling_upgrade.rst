.. Copyright (C) 2020 Wazuh, Inc.

.. _elastic_server_rolling_upgrade:

Upgrading Elastic Stack from 6.8 to 7.x
=======================================

In case of having more than one Elasticsearch nodes, the process of upgrading Elastic Stack must be done in each node of the cluster, one at a time, otherwise, the cluster may become corrupt.

Coming new in version Elastic 7.x, there is an architecture change introduced in Wazuh Stack. Logstash is no longer required, Filebeat will send the events directly to Elasticsearch server. In addition, Elasticsearch 7 has Java embedded, so unless you decide to use Logstash, Java is not longer required.


Prepare the Elastic Stack
-------------------------

#. Stop the services:

    .. include:: ../../_templates/upgrading/elastic/common/stop_services.rst

#. In case of having disabled the repository for Elastic Stack 7.x it can be enabled using:

    .. include:: ../../_templates/upgrading/elastic/common/add_repository.rst

Upgrade Elasticsearch
---------------------

#. Disable shard allocation:

    .. include:: ../../_templates/upgrading/elastic/common/disable_shard_allocation.rst

#. (Optional) Stop non-essential indexing and perform a synced flush:

    .. include:: ../../_templates/upgrading/elastic/common/stop_indexing.rst

#. Shut down the node:

    .. include:: ../../_templates/upgrading/elastic/common/stop_elastic.rst

#. Upgrade the node:

    .. tabs::


      .. group-tab:: Yum

        .. code-block:: console

          # yum install elasticsearch-|ELASTICSEARCH_LATEST|



      .. group-tab:: APT

        .. code-block:: console

            # apt-get install elasticsearch=|ELASTICSEARCH_LATEST|

  
      .. group-tab:: ZYpp

        .. code-block:: console

            # zypper install elasticsearch-|ELASTICSEARCH_LATEST|

#. Starting with Elasticsearch 7.0, master nodes require a configuration setting with the list of the cluster master nodes. The following settings must be added in the configuration of the Elasticsearch master node (``elasticsearch.yml``). In case of having one Elasticsearch node in the cluster choose the Single-node tab, if there are more than one node, choose the Multi-node tab.

    .. tabs::

      .. group-tab:: Single-node

        .. code-block:: yaml

          discovery.seed_hosts:
            - <node_ip>
          cluster.initial_master_nodes:
            - <node_name>

        ``<node_ip>`` and ``<node_name>`` have to be replaced with the desired values (host IP and name). For ``<elasticsearch_ip>`` the value ``0.0.0.0`` is an acceptable IP address and will bind to all network interfaces.

      .. group-tab:: Multi-node

        .. code-block:: yaml

          discovery.seed_hosts:
            - <master_node_1>
            - <master_node_2>
            - <master_node_3>
          cluster.initial_master_nodes:
            - <elasticsearch_ip_1>
            - <elasticsearch_ip_2>
            - <elasticsearch_ip_3>   

        Values to be replaced:

          - ``<master_node_X>``: Elasticsearch cluster master-eligible node names. E.g.: ``elastic-master2``.
          - ``<elasticsearch_ip_nodeX>`` Elasticsearch cluster master-eligible nodes IP. E.g.: ``10.0.0.3``. 

        This information must be updated in all the nodes of the cluster.       

#. Restart the service.

    .. include:: ../../_templates/upgrading/elastic/common/enable_elastic.rst

#. Once the node is enabled, check that the node works properly:

    .. include:: ../../_templates/upgrading/elastic/common/check_upgrade.rst

#. Reenable shard allocation:

    .. include:: ../../_templates/upgrading/elastic/common/enable_shard_allocation.rst

#. Check if the shard allocation is finished:

    .. include:: ../../_templates/upgrading/elastic/common/check_shard_allocation.rst

    Once the shard allocation is finished, the next node in the cluster, if any, can be upgraded.  


Field migration: From @timestamp to timestamp
----------------------------------------------

In previous Elastic search versions, the Elastic documents were indexed using the field ``@timestamp`` as the reference field for time-based indices. Starting in Elastic 7.x, this field has become a reserved field and it is no longer manipulable. Wazuh time-based indices now make use of field ``timestamp`` instead.

Due to this change, previous alerts won't be visible in Wazuh indices, an update must be performed to all previous indices in order to complete the upgrade.

Run the request below for each Wazuh index created before Elastic 7.x upgrade. It will add the ``timestamp`` field for all the index documents.

Here is an example of how to run the request using the index ``wazuh-alerts-3.x-2019.05.16``.

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

- More information about update by query can be found `here <https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update-by-query.html>`_.

Upgrade Filebeat
----------------

#. Upgrade Filebeat.

    .. tabs::


      .. group-tab:: Yum

        .. code-block:: console

          # yum install filebeat-|ELASTICSEARCH_LATEST|



      .. group-tab:: APT

        .. code-block:: console

            # apt-get install filebeat=|ELASTICSEARCH_LATEST|

  
      .. group-tab:: ZYpp

        .. code-block:: console

            # zypper install filebeat-|ELASTICSEARCH_LATEST|

#. Update the configuration file.

    .. code-block:: console

      # cp /etc/filebeat/filebeat.yml /backup/filebeat.yml.backup
      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/filebeat/7.x/filebeat.yml
      # chmod go+r /etc/filebeat/filebeat.yml

#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Download the Wazuh module for Filebeat:

    .. include:: ../../_templates/upgrading/elastic/common/download_wazuh_module.rst

#. Edit the file ``/etc/filebeat/filebeat.yml`` and replace ``YOUR_ELASTIC_SERVER_IP`` with the IP address or the hostname of the Elasticsearch server. For example:

    .. include:: ../../_templates/upgrading/elastic/common/edit_filebeat_file.rst

#. Restart Filebeat.

    .. include:: ../../_templates/upgrading/elastic/common/enable_filebeat.rst

Upgrade Kibana
--------------

.. warning::
  Since Wazuh 3.12.0 release (regardless of the Elastic Stack version) the location of the wazuh.yml has been moved from /usr/share/kibana/plugins/wazuh/wazuh.yml to /usr/share/kibana/optimize/wazuh/config/wazuh.yml.

#. Copy the wazuh.yml to its new location. (Only needed for upgrades from 3.11.x to 3.12.y).

    .. include:: ../../_templates/upgrading/elastic/common/copy_wazuh_yml.rst

#. Remove the Wazuh app.

    .. include:: ../../_templates/upgrading/elastic/common/remove_wazuh_app.rst

#. Upgrade Kibana.

    .. tabs::


      .. group-tab:: Yum

        .. code-block:: console

          # yum install kibana-|ELASTICSEARCH_LATEST|



      .. group-tab:: APT

        .. code-block:: console

            # apt-get install kibana=|ELASTICSEARCH_LATEST|

  
      .. group-tab:: ZYpp

        .. code-block:: console

            # zypper install kibana-|ELASTICSEARCH_LATEST|

#. Install the Wazuh app.

  .. tabs::

    .. group-tab:: From URL

      .. code-block:: console

        # cd /usr/share/kibana/
        # sudo -u kibana bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|.zip

    .. group-tab:: From the package

      .. code-block:: console

        # cd /usr/share/kibana/
        # sudo -u kibana bin/kibana-plugin install file:///path/wazuhapp-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|.zip

#. Update the configuration file permissions.

    .. include:: ../../_templates/upgrading/elastic/common/update_kibana_conf_permissions.rst

#. For installations on Kibana 7.6.X versions it is recommended to increase the heap size of Kibana to ensure the Kibana's plugins installation:

    .. include:: ../../_templates/upgrading/elastic/common/increase_heap_size.rst

#. Restart Kibana.

    .. include:: ../../_templates/upgrading/elastic/common/enable_kibana.rst
      
Disabling repositories
^^^^^^^^^^^^^^^^^^^^^^

.. include:: ../../_templates/upgrading/elastic/common/disabling_repository_message.rst


.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/disabling_repositories.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/disabling_repositories.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/elastic/zypp/disabling_repositories.rst