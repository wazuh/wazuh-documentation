.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to upgrade Wazuh Docker deployments in this section of our documentation.

Upgrading Wazuh Docker
======================

This section describes how to upgrade Wazuh Docker deployments starting from version 4.3.

To upgrade to version |WAZUH_CURRENT_DOCKER|, choose one of the following strategies.

-  `Using the default Docker Compose files`_: Replace the existing ``docker-compose.yml`` file with the default one provided for Wazuh |WAZUH_CURRENT_DOCKER|.
-  `Keeping your custom Docker Compose files`_: Retain your existing ``docker-compose.yml`` file of your outdated Wazuh Docker deployment and apply the upgrade without replacing it.

Using the default Docker Compose files
--------------------------------------

To upgrade your deployment, using the default ``docker-compose.yml`` file, follow these steps:

#. Run the following command from your ``wazuh-docker/single-node/`` or ``wazuh-docker/multi-node/`` directory to stop the outdated environment:

   .. code-block:: console

      # docker-compose down

#. Check out the tag for the current version of ``wazuh-docker``:

   .. code-block:: console

      # git checkout v|WAZUH_CURRENT_DOCKER|

#. Start the upgraded Wazuh Docker environment using ``docker-compose``

   .. code-block:: console

      # docker-compose up -d

Keeping your custom Docker Compose files
----------------------------------------

To upgrade your deployment while preserving your custom ``docker-compose.yml`` file, follow these steps:

#. Run the following command from your ``wazuh-docker/single-node/`` or ``wazuh-docker/multi-node/`` directory to stop the outdated environment:

   .. code-block:: console

      # docker-compose down

#. Update the ``defaultRoute`` parameter in the Wazuh dashboard configuration, if upgrading from a version earlier than 4.8:

   -  **Single-node deployment**

      ``single-node/config/wazuh_dashboard/opensearch_dashboards.yml``

      .. code-block:: yaml

         uiSettings.overrides.defaultRoute: /app/wz-home

   -  **Multi-node deployment**

      ``multi-node/config/wazuh_dashboard/opensearch_dashboards.yml``

      .. code-block:: yaml

         uiSettings.overrides.defaultRoute: /app/wz-home

#. Modify the ``OPENSEARCH_JAVA_OPTS`` environment variable to allocate more RAM to the Wazuh indexer container.

   -  **Single-node deployment**

      ``single-node/docker-compose.yml``

      .. code-block:: yaml

         environment:
         - "OPENSEARCH_JAVA_OPTS=-Xms1g -Xmx1g"

   -  **Multi-node deployment**

      ``multi-node/docker-compose.yml``

      .. code-block:: yaml

         environment:
         - "OPENSEARCH_JAVA_OPTS=-Xms1g -Xmx1g"

#. Modify the tag of the image generator.

   -  **Single-node deployment**

      ``single-node/generate-indexer-certs.yml``

      .. code-block:: yaml

         services:
            generator:
               image: wazuh/wazuh-certs-generator:0.0.2

   -  **Multi-node deployment**

      ``multi-node/generate-indexer-certs.yml``

      .. code-block:: yaml

         services:
            generator:
               image: wazuh/wazuh-certs-generator:0.0.2

#. Recreate the certificates after these changes.

   .. code-block:: console

      docker-compose -f generate-indexer-certs.yml run --rm generator

#. Update old paths with the new ones, if upgrading from 4.3.

   -  **Single-node deployment**

      **Wazuh dashboard**

      #. Edit the ``single-node/config/wazuh_dashboard/opensearch_dashboards.yml`` file and replace ``/usr/share/wazuh-dashboard/config/certs/`` with ``/usr/share/wazuh-dashboard/certs/``.
      #. Edit the ``single-node/docker-compose.yml`` file and replace ``/usr/share/wazuh-dashboard/config/certs/ with /usr/share/wazuh-dashboard/certs/``.

      **Wazuh indexer**

      #. Edit the ``single-node/config/wazuh_indexer/wazuh.indexer.yml`` file and do the following replacements.

         -  Replace ``/usr/share/wazuh-indexer/config/certs/`` with ``/usr/share/wazuh-indexer/certs/``.
         -  Replace ``${OPENSEARCH_PATH_CONF}/certs/`` with ``/usr/share/wazuh-indexer/certs/``.
      #. Edit the ``single-node/docker-compose.yml`` file and do the following replacements.

         -  Replace ``/usr/share/wazuh-indexer/config/certs/`` with ``/usr/share/wazuh-indexer/certs/``.
         -  Replace ``/usr/share/wazuh-indexer/config/opensearch.yml`` with ``/usr/share/wazuh-indexer/opensearch.yml``.
         -  Replace ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/`` with ``/usr/share/wazuh-indexer/opensearch-security/``.

   -  **Multi-node deployment**

      **Wazuh dashboard**

      #. Edit the ``multi-node/config/wazuh_dashboard/opensearch_dashboards.yml`` file and replace ``/usr/share/wazuh-dashboard/config/certs/`` with ``/usr/share/wazuh-dashboard/certs/``.
      #. Edit the ``multi-node/docker-compose.yml`` file and replace ``/usr/share/wazuh-dashboard/config/certs/`` with ``/usr/share/wazuh-dashboard/certs/``.

      **Wazuh indexer**

      #. Edit the ``multi-node/config/wazuh_indexer/wazuh1.indexer.yml``, ``multi-node/config/wazuh_indexer/wazuh2.indexer.yml``, and ``multi-node/config/wazuh_indexer/wazuh3.indexer.yml`` files and do the following replacements.

         -  Replace ``/usr/share/wazuh-indexer/config/certs/`` with ``/usr/share/wazuh-indexer/certs/``.
         -  Replace ``${OPENSEARCH_PATH_CONF}/certs/`` with ``/usr/share/wazuh-indexer/certs/``.

      #. Edit the ``multi-node/docker-compose.yml`` file and do the following replacements.

         -  Replace ``/usr/share/wazuh-indexer/config/certs/`` with ``/usr/share/wazuh-indexer/certs/``.
         -  Replace ``/usr/share/wazuh-indexer/config/opensearch.yml`` with ``/usr/share/wazuh-indexer/opensearch.yml``.
         -  Replace ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/`` with ``/usr/share/wazuh-indexer/opensearch-security/``.

#. Edit the ``docker-compose.yml`` file corresponding to your deployment type. Modify the highlighted lines and add the variable related to the ``kibanaserver`` user with the corresponding value.

   -  **Single-node deployment**

      .. code-block:: yaml
         :emphasize-lines: 2,5,8,13,14

         wazuh.manager:
            image: wazuh/wazuh-manager:4.13.0
         ...
         wazuh.indexer:
            image: wazuh/wazuh-indexer:4.13.0
         ...
         wazuh.dashboard:
            image: wazuh/wazuh-dashboard:4.13.0
            environment:
               - INDEXER_USERNAME=admin
               - INDEXER_PASSWORD=SecretPassword
               - WAZUH_API_URL=https://wazuh.manager
               - DASHBOARD_USERNAME=kibanaserver
               - DASHBOARD_PASSWORD=kibanaserver

   -  **Multi-node deployment**

      .. code-block:: yaml
         :emphasize-lines: 2,5,8,11,14,17,23,24

         wazuh.master:
            image: wazuh/wazuh-manager:4.13.0
         ...
         wazuh.worker:
            image: wazuh/wazuh-manager:4.13.0
         ...
         wazuh1.indexer:
            image: wazuh/wazuh-manager:4.13.0
         ...
         wazuh2.indexer:
            image: wazuh/wazuh-manager:4.13.0
         ...
         wazuh3.indexer:
            image: wazuh/wazuh-manager:4.13.0
         ...
         wazuh.master:
            image: wazuh/wazuh-manager:4.13.0
            environment:
               - OPENSEARCH_HOSTS="https://wazuh1.indexer:9200"
               - WAZUH_API_URL="https://wazuh.master"
               - API_USERNAME=wazuh-wui
               - API_PASSWORD=MyS3cr37P450r.*-
               - DASHBOARD_USERNAME=kibanaserver
               - DASHBOARD_PASSWORD=kibanaserver

#. Replace the following files in your stack with the ones from the ``v|WAZUH_CURRENT_DOCKER|`` tag of the ``wazuh-docker`` repository.

   -  **Single-node deployment**

      ``single-node/config/wazuh_cluster/wazuh_manager.conf``

   -  **Multi-node deployment**

      ``multi-node/config/wazuh_cluster/wazuh_manager.conf``
      ``multi-node/config/wazuh_cluster/wazuh_worker.conf``

#. Start the new version of Wazuh using ``docker-compose``:

   .. code-block:: console

      # docker-compose up -d



