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

To upgrade your deployment keeping your custom docker-compose files, do the following.

#. Run the following command from your wazuh-docker directory, such as ``wazuh-docker/single-node/`` or ``wazuh-docker/multi-node/``, to stop the outdated environment:

   .. code-block::

      # docker-compose down

#. If you are upgrading from a version earlier than 4.8, update the ``defaultRoute`` parameter in the Wazuh dashboard configuration.

   .. tabs::

      .. group-tab:: Single node deployment

         -  ``single-node/config/wazuh_dashboard/opensearch_dashboards.yml``

            .. code-block:: yaml

               uiSettings.overrides.defaultRoute: /app/wz-home

      .. group-tab:: Multi node deployment

         -  ``multi-node/config/wazuh_dashboard/opensearch_dashboards.yml``

            .. code-block:: yaml

               uiSettings.overrides.defaultRoute: /app/wz-home

#. Modify the ``OPENSEARCH_JAVA_OPTS`` environment variable to allocate more RAM to the Wazuh indexer container.

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

#. Modify the the tag of image generator.

   .. tabs::

      .. group-tab:: Single node deployment

         -  ``single-node/generate-indexer-certs.yml``

            .. code-block:: yaml
               :emphasize-lines: 3

               services:
                  generator:
                     image: wazuh/wazuh-certs-generator:0.0.2

      .. group-tab:: Multi node deployment

         -  ``multi-node/generate-indexer-certs.yml``

            .. code-block:: yaml
               :emphasize-lines: 3

               services:
                  generator:
                     image: wazuh/wazuh-certs-generator:0.0.2

#. After these changes, recreate the certificates.

   .. code-block:: bash

      docker-compose -f generate-indexer-certs.yml run --rm generator

#. If you are upgrading from 4.3, update old paths with the new ones.

   .. tabs::

      .. group-tab:: Single node deployment

         **Wazuh dashboard**

         #. Edit ``single-node/config/wazuh_dashboard/opensearch_dashboards.yml`` and do the following replacements.

            -  Replace ``/usr/share/wazuh-dashboard/config/certs/`` with ``/usr/share/wazuh-dashboard/certs/``.

         #. Edit ``single-node/docker-compose.yml`` and do the following replacements.

            -  Replace ``/usr/share/wazuh-dashboard/config/certs/`` with ``/usr/share/wazuh-dashboard/certs/``.

         **Wazuh indexer**

         #. Edit ``single-node/config/wazuh_indexer/wazuh.indexer.yml`` and do the following replacements.

            -  Replace ``/usr/share/wazuh-indexer/config/certs/`` with ``/usr/share/wazuh-indexer/certs/``.
            -  Replace ``${OPENSEARCH_PATH_CONF}/certs/`` with ``/usr/share/wazuh-indexer/certs/``.

         #. Edit ``single-node/docker-compose.yml`` and do the following replacements.

            -  Replace ``/usr/share/wazuh-indexer/config/certs/`` with ``/usr/share/wazuh-indexer/certs/``.
            -  Replace ``/usr/share/wazuh-indexer/config/opensearch.yml`` with ``/usr/share/wazuh-indexer/opensearch.yml``.
            -  Replace ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/`` with ``/usr/share/wazuh-indexer/opensearch-security/``

      .. group-tab:: Multi node deployment

         **Wazuh dashboard**

         #. Edit ``multi-node/config/wazuh_dashboard/opensearch_dashboards.yml`` and do the following replacements.

            -  Replace ``/usr/share/wazuh-dashboard/config/certs/`` with ``/usr/share/wazuh-dashboard/certs/``.

         #. Edit ``multi-node/docker-compose.yml`` and do the following replacements.

            -  Replace ``/usr/share/wazuh-dashboard/config/certs/`` with ``/usr/share/wazuh-dashboard/certs/``.

         **Wazuh indexer**

         #. Edit ``multi-node/config/wazuh_indexer/wazuh1.indexer.yml``, ``wazuh2.indexer.yml``, and ``wazuh3.indexer.yml`` and do the following replacements.

            -  Replace ``/usr/share/wazuh-indexer/config/certs/`` with ``/usr/share/wazuh-indexer/certs/``.
            -  Replace ``${OPENSEARCH_PATH_CONF}/certs/`` with ``/usr/share/wazuh-indexer/certs/``.

         #. Edit ``multi-node/docker-compose.yml`` and do the following replacements.

            -  Replace ``/usr/share/wazuh-indexer/config/certs/`` with ``/usr/share/wazuh-indexer/certs/``.
            -  Replace ``/usr/share/wazuh-indexer/config/opensearch.yml`` with ``/usr/share/wazuh-indexer/opensearch.yml``.
            -  Replace ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/`` with ``/usr/share/wazuh-indexer/opensearch-security/``.

#. If you are upgrading from 4.3, edit the ``docker-compose.yml`` file corresponding to your deployment type. Modify the highlighted lines and add the variable related to the ``kibanaserver`` user with the corresponding value.

   .. tabs::

      .. group-tab:: Single node deployment

         .. code-block:: yaml
            :emphasize-lines: 2, 5, 8, 13-14

            wazuh.manager:
               image: wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|
            ...
            wazuh.indexer:
               image: wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER|
            ...
            wazuh.dashboard:
               image: wazuh/wazuh-dashboard:|WAZUH_CURRENT_DOCKER|
               environment:
                  - INDEXER_USERNAME=admin
                  - INDEXER_PASSWORD=SecretPassword
                  - WAZUH_API_URL=https://wazuh.manager
                  - DASHBOARD_USERNAME=kibanaserver
                  - DASHBOARD_PASSWORD=kibanaserver

      .. group-tab:: Multi node deployment

         .. code-block:: yaml
            :emphasize-lines:  2, 5, 8, 11, 14, 17, 23-24

            wazuh.master:
               image: wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|
            ...
            wazuh.worker:
               image: wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|
            ...
            wazuh1.indexer:
               image: wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|
            ...
            wazuh2.indexer:
               image: wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|
            ...
            wazuh3.indexer:
               image: wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|
            ...
            wazuh.master:
               image: wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|
               environment:
                  - OPENSEARCH_HOSTS="https://wazuh1.indexer:9200"
                  - WAZUH_API_URL="https://wazuh.master"
                  - API_USERNAME=wazuh-wui
                  - API_PASSWORD=MyS3cr37P450r.*-
                  - DASHBOARD_USERNAME=kibanaserver
                  - DASHBOARD_PASSWORD=kibanaserver

#. Start the new version of Wazuh using ``docker-compose``.

   .. code-block::

      # docker-compose up -d
