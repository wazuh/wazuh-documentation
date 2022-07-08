.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Get answers to the most frequently asked questions about the Wazuh deployment on Docker in this FAQ. 
    
.. _wazuh-container_faq:

FAQ
===

How can I tune the Wazuh dashboard configuration?
-------------------------------------------------

The Wazuh dashboard default configuration is stored in ``config/wazuh_dashboard/opensearch_dashboards.yml``:

.. code-block:: yaml

    wazuh-dashboard:
    ...
    volumes:
      - ./custom_opensearch_dashboards.yml:/usr/share/wazuh-dashboard/opensearch_dashboards.yml


Read `here <https://opensearch.org/docs/latest/security-plugin/configuration/yaml/#opensearchyml>`_ to know more about the variables you can use on this image.


How can I tune the Wazuh indexer configuration?
-----------------------------------------------

The Wazuh indexer container uses the default configuration, and it is not exposed by default.

If you want to override the default configuration, create a file ``config/wazuh_indexer/<new_wazuh_indexer>.yml`` and put your custom version of the configuration in it.

Then map your configuration file inside the container in the ``docker-compose.yml``. Update the Wazuh indexer container declaration to:

.. code-block:: yaml

    <new_wazuh_indexer>:
      image: wazuh/wazuh-indexer:latest
      ports:
        - "9200:9200"
        - "9300:9300"
      environment:
        ES_JAVA_OPTS: "-Xms6g -Xmx6g"
      networks:
        - docker_wazuh


How can I store the Wazuh indexer data?
---------------------------------------

The data stored in the Wazuh indexer will persist after container reboots but not after container removal.

By default, the single-node and multi-node deployments already have volumes configured. For example, see ``wazuh1.indexer`` volume in the multi-node ``docker-compose.yml`` file:

.. code-block:: yaml

   wazuh1.indexer:
    ...
    volumes:
      - wazuh-indexer-data-1:/var/lib/wazuh-indexer


This will store the Wazuh indexer data inside ``wazuh-indexer-data-1`` volume in the Docker host local file system.

