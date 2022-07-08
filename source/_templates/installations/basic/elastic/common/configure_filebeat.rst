.. Copyright (C) 2015, Wazuh, Inc.

.. tabs::



  .. group-tab:: Elasticsearch single-node cluster


    .. code-block:: yaml

      output.elasticsearch.hosts: ["<elasticsearch_ip>:9200"]
      output.elasticsearch.password: <elasticsearch_password>

    Replace ``<elasticsearch_ip>`` with the IP address or the hostname of the Elasticsearch server and ``<elasticsearch_password>`` with the previously generated password for ``elastic`` user.

  .. group-tab:: Elasticsearch multi-node cluster


    .. code-block:: yaml

      output.elasticsearch.hosts: ["<elasticsearch_ip_node_1>:9200", "<elasticsearch_ip_node_2>:9200", "<elasticsearch_ip_node_3>:9200"]
      output.elasticsearch.password: <elasticsearch_password>

    Replace ``elasticsearch_ip_node_x`` with the IP address or the hostname of the Elasticsearch server to connect to and ``elasticsearch_password`` with the previously generated password for ``elastic`` user.


.. End of include file
