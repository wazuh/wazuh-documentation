.. Copyright (C) 2021 Wazuh, Inc.

.. _kibana_usage_issues:

Possible problems using the app
===============================

I do not see alerts in the Wazuh Kibana plugin
----------------------------------------------

The first step is to check if there are alerts in Elasticsearch.

.. code-block:: console

  # curl https://<ELASTICSEARCH_IP>:9200/_cat/indices/wazuh-alerts-* -u <elasticsearch_user>:<elasticsearch_password> -k

.. code-block:: none
    :class: output

     green open wazuh-alerts-4.x-2021.03.03 xwFPX7nFQxGy-O5aBA3LFQ 3 0 340 0 672.6kb 672.6kb

If you do not see any Wazuh related index, it means you have no alerts stored in Elasticsearch.

To ensure that Filebeat is correctly configured, run the following command:

.. code-block:: console

  # filebeat test output

.. code-block:: none
          :class: output

          elasticsearch: https://127.0.0.1:9200...
            parse url... OK
            connection...
              parse host... OK
              dns lookup... OK
              addresses: 127.0.0.1
              dial up... OK
            TLS...
              security: server's certificate chain verification is enabled
              handshake... OK
              TLS version: TLSv1.3
              dial up... OK
            talk to server... OK
            version: 7.10.2

Wazuh Kibana plugin page goes blank
-----------------------------------

Sometimes, after an upgrade, the Wazuh Kibana plugin page goes blank. This is due to some issues with the cache memory of the browser.

.. thumbnail:: ../../../images/kibana-app/troubleshooting/page_goes_blank.png
    :title: Page goes blank
    :align: left
    :width: 100%


To fix this you need to:

  .. include:: ../../../_templates/common/clear_cache.rst

"Conflict with the Wazuh app version" error is displayed
--------------------------------------------------------

Sometimes, after an upgrade, the Wazuh Kibana plugin displays the "Conflict with the Wazuh app version" error. This is due to some issues with the cache memory of the browser.

.. thumbnail:: ../../../images/kibana-app/troubleshooting/conflict_wazuh_app_version.png
    :title: Conflict wazuh app version
    :align: left
    :width: 100%

To fix this you need to:

  .. include:: ../../../_templates/common/clear_cache.rst

"Agent evolution graph shows incorrect data"
--------------------------------------------
Sometimes, after connecting two o more Wazuh APIs to the Wazuh Kibana plugin, the agent evolution graph may show data as if there were more agents than expected for that selected API.

.. thumbnail:: ../../..//images/kibana-app/troubleshooting/agent_evolution_graph_incorrect.png
    :title: Graph showing more agents than expected
    :align: left
    :width: 100%

This is caused by the way agent data is stored in the Elasticsearch indices. Agent monitoring data references its manager or cluster by name only, so when two clusters or managers share the same name, data can be displayed incorrectly in this graph.
In order to solve it, each cluster (even every node) or manager must have different names:

.. tabs::
  .. group-tab:: Changing name of a manager

    For managers that don't form part of a cluster, the data shown in the graph is filtered using the name of the manager, which is its :code:`hostname`.
    Make sure each manager that connects to your Elastic Server has an unique hostname, you may change it by running

    .. code-block:: console

        # hostname newHostName
    
    Make sure that the master nodes in your clusters also have distinct manager names.

  .. group-tab:: Changing the name of the cluster

    For clusters, make sure each cluster has an unique name. The name of the cluster can be changed in each of the :code:`ossec.conf` files for each manager in the cluster.
    
    .. code-block:: xml

        <cluster>
          <name>unique cluster name</name>
          ...
        </cluster>
    
    All members of the cluster must have the same cluster name.