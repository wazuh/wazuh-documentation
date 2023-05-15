.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn more about upgrading the Wazuh deployment on Docker in this section of our documentation. 
  
Upgrading Wazuh Docker
======================

This section describes how to upgrade Wazuh Docker deployments starting from version 4.3. To upgrade Wazuh deployments below version 4.3 (production deployment), refer to the :doc:`/deployment-options/docker/data-migration` documentation.

Upgrade strategies
---------------------------------

- `Default docker-compose files`_

- `Custom docker-compose files`_

Default docker-compose files
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Run the following command from the ``wazuh-docker`` directory to stop the current v4.3.x environment:

   .. code-block::

      # docker-compose down

#. Set the new version of Wazuh:

      .. code-block::

         # git checkout v|WAZUH_CURRENT_DOCKER|

#. Start the new version of Wazuh using ``docker-compose``:

   .. code-block::

      # docker-compose up -d


Custom docker-compose files
^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Run the following command from the ``wazuh-docker`` directory to stop the current v4.3.x environment:

   .. code-block::

      # docker-compose down


#. If you made any changes in the docker-compose file and want to keep this configuration, you have to find these lines and update them with the new path:

    - single-node/docker-compose.yml
    - multi-node/docker-compose.yml

    .. code-block:: yaml

      wazuh.manager:
         image: wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|
      ---
      wazuh.indexer:
         image: wazuh/wazuh-indexer:|WAZUH_CURRENT_KUBERNETES|
         volumes:
            - wazuh-indexer-data:/var/lib/wazuh-indexer
            - ./config/wazuh_indexer_ssl_certs/root-ca.pem:/usr/share/wazuh-indexer/certs/root-ca.pem
            - ./config/wazuh_indexer_ssl_certs/wazuh.indexer-key.pem:/usr/share/wazuh-indexer/certs/wazuh.indexer.key
            - ./config/wazuh_indexer_ssl_certs/wazuh.indexer.pem:/usr/share/wazuh-indexer/certs/wazuh.indexer.pem
            - ./config/wazuh_indexer_ssl_certs/admin.pem:/usr/share/wazuh-indexer/certs/admin.pem
            - ./config/wazuh_indexer_ssl_certs/admin-key.pem:/usr/share/wazuh-indexer/certs/admin-key.pem
            - ./config/wazuh_indexer/wazuh.indexer.yml:/usr/share/wazuh-indexer/opensearch.yml
            - ./config/wazuh_indexer/internal_users.yml:/usr/share/wazuh-indexer/opensearch-security/internal_users.yml
      ---
      wazuh.dashboard:
         image: wazuh/wazuh-dashboard:4.4.1
         volumes:
            - ./config/wazuh_indexer_ssl_certs/wazuh.dashboard.pem:/usr/share/wazuh-dashboard/certs/wazuh-dashboard.pem
            - ./config/wazuh_indexer_ssl_certs/wazuh.dashboard-key.pem:/usr/share/wazuh-dashboard/certs/wazuh-dashboard-key.pem
            - ./config/wazuh_indexer_ssl_certs/root-ca.pem:/usr/share/wazuh-dashboard/certs/root-ca.pem
            - ./config/wazuh_dashboard/opensearch_dashboards.yml:/usr/share/wazuh-dashboard/config/opensearch_dashboards.yml
            - ./config/wazuh_dashboard/wazuh.yml:/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml

   .. note:: The lines mentioned above are based on the docker-compose.yml for single-node, similar changes should be made to the docker-compose.yml for multi-node. Only the lines that need to be updated are mentioned and not the entire docker-compose file

#. Start the new version of Wazuh using ``docker-compose``:

   .. code-block::

      # docker-compose up -d            

