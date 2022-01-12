.. Copyright (C) 2022 Wazuh, Inc.

.. tabs::



  .. group-tab:: Elasticsearch single-node cluster


    .. code-block:: yaml

      output.elasticsearch:
        hosts: ["<elasticsearch_ip>:9200"]

    Replace ``elasticsearch_ip`` with the IP address or the hostname of the Elasticsearch server.

  .. group-tab:: Elasticsearch multi-node cluster


    .. code-block:: yaml

      output.elasticsearch:
        hosts: ["<elasticsearch_ip_node_1>:9200", "<elasticsearch_ip_node_2>:9200", "<elasticsearch_ip_node_3>:9200"]

    Replace ``elasticsearch_ip_node_x`` with the IP address or the hostname of the Elasticsearch server to connect to.


.. End of include file
