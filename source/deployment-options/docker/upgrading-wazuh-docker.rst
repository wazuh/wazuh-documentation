.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn more about upgrading the Wazuh deployment on Docker in this section of our documentation. 

Upgrading Wazuh Docker
======================

This section describes how to upgrade your Wazuh Docker deployment, starting from version 4.3. To upgrade Wazuh deployments of versions earlier than 4.3, refer to the :doc:`/deployment-options/docker/data-migration` documentation.

To upgrade to version |WAZUH_CURRENT_MINOR|, you can follow one of two strategies.

- `Using default docker-compose files`_ : This strategy uses the default docker-compose files for Wazuh |WAZUH_CURRENT_MINOR|. It replaces the docker-compose files of your outdated Wazuh version. 
- `Keeping custom docker-compose files`_ : This strategy preserves the docker-compose files of your outdated Wazuh deployment. It ignores the docker-compose files of the latest Wazuh version. 

Using default docker-compose files
----------------------------------

#. Run the following command from your wazuh-docker directory, such as ``wazuh-docker/single-node/`` or ``wazuh-docker/multi-node/``, to stop the outdated environment:

   .. code-block::

      # docker-compose down

#. Checkout the tag for the current version of wazuh-docker:

      .. code-block::

         # git checkout v|WAZUH_CURRENT_DOCKER|

#. Start the new version of Wazuh using ``docker-compose``:

   .. code-block::

      # docker-compose up -d

Keeping custom docker-compose files
-----------------------------------

In Wazuh 4.4, some paths are different to those in earlier versions. You have to update the old paths with the new ones.

``old-path`` -> ``new-path``

-  ``/usr/share/wazuh-dashboard/config/certs/`` -> ``/usr/share/wazuh-dashboard/certs/``
-  ``/usr/share/wazuh-indexer/config/certs/`` -> ``/usr/share/wazuh-indexer/certs/``
-  ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/`` -> ``/usr/share/wazuh-indexer/opensearch-security/``

To upgrade your deployment keeping your custom docker-compose files, do the following.

#. Run the following command from your wazuh-docker directory, such as ``wazuh-docker/single-node/`` or ``wazuh-docker/multi-node/``, to stop the outdated environment:

   .. code-block::

      # docker-compose down

#. If tiy are updating from a version below of 4.8, you need yo change the defaultRoute parameter into Wazuh dashboard configuration.

   .. tabs::

      .. group-tab:: Single node deployment

         -  ``single-node/config/wazuh_dashboard/opensearch_dashboards.yml``

            .. code-block:: yaml

               uiSettings.overrides.defaultRoute: /app/wz-home

      .. group-tab:: Multi node deployment

         -  ``multi-node/config/wazuh_dashboard/opensearch_dashboards.yml``

            .. code-block:: yaml

               uiSettings.overrides.defaultRoute: /app/wz-home

It is also necessary to modify the OPENSEARCH JAVA_OPTS environment variable to allocate more RAM to the Wazuh indexer container:

   .. tabs::

      .. group-tab:: Single node deployment

         -  ``single-node/docker-compose.yml``

            .. code-block:: yaml

            environment:
              - "OPENSEARCH_JAVA_OPTS=-Xms1g -Xmx1g"

      .. group-tab:: Multi node deployment

         -  ``multi-node/docker-compose.yml``

            .. code-block:: yaml

            environment:
              - "OPENSEARCH_JAVA_OPTS=-Xms1g -Xmx1g"

#. If you are updating from 4.3, edit ``docker-compose.yml`` and update it with the new paths in 4.4. You can see the new paths for single node docker compose files, such as  ``single-node/docker-compose.yml`` below. For multi node docker compose files, such as  ``multi-node/docker-compose.yml``, you need to do similar changes in the corresponding files.

   .. code-block:: yaml
      :emphasize-lines: 8-12, 14, 19-21

      wazuh.manager:
         image: wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|
      ...
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
      ...
      wazuh.dashboard:
         image: wazuh/wazuh-dashboard:|WAZUH_CURRENT_KUBERNETES|
         volumes:
            - ./config/wazuh_indexer_ssl_certs/wazuh.dashboard.pem:/usr/share/wazuh-dashboard/certs/wazuh-dashboard.pem
            - ./config/wazuh_indexer_ssl_certs/wazuh.dashboard-key.pem:/usr/share/wazuh-dashboard/certs/wazuh-dashboard-key.pem
            - ./config/wazuh_indexer_ssl_certs/root-ca.pem:/usr/share/wazuh-dashboard/certs/root-ca.pem
            - ./config/wazuh_dashboard/opensearch_dashboards.yml:/usr/share/wazuh-dashboard/config/opensearch_dashboards.yml
            - ./config/wazuh_dashboard/wazuh.yml:/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml

#. Start the new version of Wazuh using ``docker-compose``:

   .. code-block::

      # docker-compose up -d            

