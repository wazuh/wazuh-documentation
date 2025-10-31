.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to upgrade Wazuh Docker deployments in this section of our documentation.

Upgrading Wazuh Docker
======================

This section describes how to upgrade the Wazuh deployment on Docker.

To upgrade to version |WAZUH_CURRENT_DOCKER|, choose one of the following strategies.

-  `Using the default Docker Compose files`_: Replace the existing ``docker-compose.yml`` file with the default one provided for Wazuh |WAZUH_CURRENT_DOCKER|.
-  `Keeping your custom Docker Compose files`_: Retain your existing ``docker-compose.yml`` file of your outdated Wazuh Docker deployment and apply the upgrade without replacing it.

Using the default Docker Compose files
--------------------------------------

Follow these steps to upgrade your deployment using the default ``docker-compose.yml`` file:

#. Run the following command from your ``wazuh-docker/single-node/`` or ``wazuh-docker/multi-node/`` directory to stop the outdated environment:

   .. code-block:: console

      # docker compose down

#. Update your local repository to fetch the latest tags:

   .. code-block:: console

      # git fetch --all --tags

#. Check out the tag for the current version of ``wazuh-docker``:

   .. code-block:: console

      # git checkout v|WAZUH_CURRENT_DOCKER|

   This command switches your local repository to the specified release tag, ensuring the deployment uses that version's exact configuration and files.

   .. note::

      Replace ``v|WAZUH_CURRENT_DOCKER|`` with the tag of any other Wazuh version you want to upgrade to. You can run ``git tag -l`` to see all available versions.

#. Start the upgraded Wazuh Docker environment using the ``docker compose`` command:

   .. code-block:: console

      # docker compose up -d

   Your data and certificates remain persistent because they are stored in mounted Docker volumes. This means upgrading the environment does not erase your existing configuration or indexed data.

Keeping your custom Docker Compose files
----------------------------------------

To upgrade your deployment while preserving your custom ``docker-compose.yml`` file, follow these steps:

Single-node stack
~~~~~~~~~~~~~~~~~

#. Run the following command from your ``wazuh-docker/single-node/`` directory to stop the outdated environment:

   .. code-block:: console

      # docker compose down

#. If upgrading from a version earlier than 4.8, edit the ``single-node/config/wazuh_dashboard/opensearch_dashboards.yml`` file and update the ``defaultRoute`` parameter as follows:

   .. code-block:: yaml

      uiSettings.overrides.defaultRoute: /app/wz-home

   **Optional**: Modify the ``OPENSEARCH_JAVA_OPTS`` environment variable in the ``single-node/docker-compose.yml`` file to allocate more RAM to the Wazuh indexer container.

   .. code-block:: yaml
      :emphasize-lines: 2

      environment:
      - "OPENSEARCH_JAVA_OPTS=-Xms1g -Xmx1g"

#. Modify the tag of the image generator in the ``single-node/generate-indexer-certs.yml`` file to the latest.

   .. code-block:: yaml
      :emphasize-lines: 3

      services:
         generator:
            image: wazuh/wazuh-certs-generator:0.0.2

#. Recreate the certificates after these changes.

   .. code-block:: console

      # docker compose -f generate-indexer-certs.yml run --rm generator


   **Optional**: Update old paths with the new ones based on the version you are upgrading from.

   .. tabs::

      .. group-tab:: Upgrading from 4.3 and earlier

         **Wazuh dashboard**

         #. Edit ``single-node/config/wazuh_dashboard/opensearch_dashboards.yml`` and do the following replacements.

            -  Replace ``/usr/share/wazuh-dashboard/config/certs/`` with ``/usr/share/wazuh-dashboard/certs/``.

         #. Edit ``single-node/docker-compose.yml`` and do the following replacements.

            -  Replace ``/usr/share/wazuh-dashboard/config/certs/`` with ``/usr/share/wazuh-dashboard/certs/``.


         **Wazuh indexer**

         #. Edit the ``single-node/config/wazuh_indexer/wazuh.indexer.yml`` file and do the following replacements.

            -  Replace ``${OPENSEARCH_PATH_CONF}/certs/`` with ``/usr/share/wazuh-indexer/config/certs/``.

         #. Edit the ``single-node/docker-compose.yml`` file and do the following replacements.

            -  Replace ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/`` with ``/usr/share/wazuh-indexer/opensearch-security/``.

      .. group-tab:: Upgrading from 4.4 – 4.13

         **Wazuh indexer**

         #. Edit the ``single-node/config/wazuh_indexer/wazuh.indexer.yml`` file and do the following replacements.

            -  Replace ``/usr/share/wazuh-indexer/certs/`` with ``/usr/share/wazuh-indexer/config/certs/``.

         #. Edit the ``single-node/docker-compose.yml`` file and do the following replacements.

            -  Replace ``/usr/share/wazuh-indexer/certs/`` with ``/usr/share/wazuh-indexer/config/certs/``.
            -  Replace ``/usr/share/wazuh-indexer/opensearch.yml`` with ``/usr/share/wazuh-indexer/config/opensearch.yml``.
            -  Replace ``/usr/share/wazuh-indexer/opensearch-security/internal_users.yml`` with ``/usr/share/wazuh-indexer/config/opensearch-security/internal_users.yml``.

#. Edit the ``docker-compose.yml`` file and update the highlighted lines to the latest images.

   .. code-block:: yaml
      :emphasize-lines: 2,5,8

      wazuh.manager:
         image: wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|
      ...
      wazuh.indexer:
         image: wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER|
      ...
      wazuh.dashboard:
         image: wazuh/wazuh-dashboard:|WAZUH_CURRENT_DOCKER|

   **Optional**: If you are upgrading from Wazuh version 4.3, add the variable related to the ``kibanaserver`` user.

   .. code-block:: yaml
      :emphasize-lines: 8,9

      ...
      wazuh.dashboard:
         image: wazuh/wazuh-dashboard:|WAZUH_CURRENT_DOCKER|
         environment:
            - INDEXER_USERNAME=admin
            - INDEXER_PASSWORD=SecretPassword
            - WAZUH_API_URL=https://wazuh.manager
            - DASHBOARD_USERNAME=kibanaserver
            - DASHBOARD_PASSWORD=kibanaserver

#. Replace the content of the following file in your stack with the one from the Wazuh Docker repository.

   -  ``single-node/config/wazuh_cluster/wazuh_manager.conf`` (see `wazuh_manager.conf <https://github.com/wazuh/wazuh-docker/blob/v|WAZUH_CURRENT_DOCKER|/single-node/config/wazuh_cluster/wazuh_manager.conf>`__ in tag ``v|WAZUH_CURRENT_DOCKER|``)

#. Start the new version of Wazuh using the ``docker compose`` command:

   .. code-block:: console

      # docker compose up -d

Multi-node stack
~~~~~~~~~~~~~~~~

#. Run the following command from your ``wazuh-docker/multi-node/`` directory to stop the outdated environment:

   .. code-block:: console

      # docker compose down

#. If upgrading from a version earlier than 4.8, edit ``multi-node/config/wazuh_dashboard/opensearch_dashboards.yml`` file and update the ``defaultRoute`` parameter as follows:

   .. code-block:: yaml

      uiSettings.overrides.defaultRoute: /app/wz-home

   **Optional**: Modify the ``OPENSEARCH_JAVA_OPTS`` environment variable in the ``multi-node/docker-compose.yml`` file to allocate more RAM to the Wazuh indexer container.

   .. code-block:: yaml
      :emphasize-lines: 2

      environment:
      - "OPENSEARCH_JAVA_OPTS=-Xms1g -Xmx1g"

#. Modify the tag of the image generator to the latest tag ``wazuh/wazuh-certs-generator:0.0.2`` in the ``multi-node/generate-indexer-certs.yml`` file.

   .. code-block:: yaml
      :emphasize-lines: 3

      services:
         generator:
            image: wazuh/wazuh-certs-generator:0.0.2

#. Recreate the certificates after these changes.

   .. code-block:: console

      # docker compose -f generate-indexer-certs.yml run --rm generator

   **Optional**: Update these old paths with the new ones based on the version you are upgrading from.

   .. tabs::

      .. group-tab:: Upgrading from 4.3 and earlier

         **Wazuh dashboard**

         #. Edit ``multi-node/config/wazuh_dashboard/opensearch_dashboards.yml`` and do the following replacements.

            -  Replace ``/usr/share/wazuh-dashboard/config/certs/`` with ``/usr/share/wazuh-dashboard/certs/``.

         #. Edit ``multi-node/docker-compose.yml`` and do the following replacements.

            -  Replace ``/usr/share/wazuh-dashboard/config/certs/`` with ``/usr/share/wazuh-dashboard/certs/``.

         **Wazuh indexer**

         #. Edit the ``multi-node/config/wazuh_indexer/wazuh1.indexer.yml``, ``multi-node/config/wazuh_indexer/wazuh2.indexer.yml``, and ``multi-node/config/wazuh_indexer/wazuh3.indexer.yml`` files and do the following replacements.

            -  Replace ``${OPENSEARCH_PATH_CONF}/certs/`` with ``/usr/share/wazuh-indexer/config/certs/``.

         #. Edit the ``multi-node/docker-compose.yml`` file and do the following replacements.

            -  Replace ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/`` with ``/usr/share/wazuh-indexer/opensearch-security/``.

      .. group-tab:: Upgrading from 4.4 - 4.13

         **Wazuh indexer**

         #. Edit the ``multi-node/config/wazuh_indexer/wazuh1.indexer.yml``, ``multi-node/config/wazuh_indexer/wazuh2.indexer.yml``, and ``multi-node/config/wazuh_indexer/wazuh3.indexer.yml`` files and do the following replacements.

            -  Replace ``/usr/share/wazuh-indexer/certs/`` with ``/usr/share/wazuh-indexer/config/certs/``.

         #. Edit the ``multi-node/docker-compose.yml`` file and do the following replacements.

            -  Replace ``/usr/share/wazuh-indexer/certs/`` with ``/usr/share/wazuh-indexer/config/certs/``.
            -  Replace ``/usr/share/wazuh-indexer/opensearch.yml`` with ``/usr/share/wazuh-indexer/config/opensearch.yml``.
            -  Replace ``/usr/share/wazuh-indexer/opensearch-security/internal_users.yml`` with ``/usr/share/wazuh-indexer/config/opensearch-security/internal_users.yml``.

#. Edit the ``docker-compose.yml`` file and update the highlighted lines to the latest images.

   .. code-block:: yaml
      :emphasize-lines: 2,5,8,11,14,17

      wazuh.master:
         image: wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|
      ...
      wazuh.worker:
         image: wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|
      ...
      wazuh1.indexer:
         image: wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER|
      ...
      wazuh2.indexer:
         image: wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER|
      ...
      wazuh3.indexer:
         image: wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER|
      ...
      wazuh.dashboard:
         image: wazuh/wazuh-dashboard:|WAZUH_CURRENT_DOCKER|

   **Optional**: If you are updating from Wazuh version 4.3, add the variable related to the ``kibanaserver`` user.

   .. code-block:: yaml
      :emphasize-lines: 9,10

      ...
      wazuh.dashboard:
         image: wazuh/wazuh-dashboard:|WAZUH_CURRENT_DOCKER|
         environment:
            - OPENSEARCH_HOSTS="https://wazuh1.indexer:9200"
            - WAZUH_API_URL="https://wazuh.master"
            - API_USERNAME=wazuh-wui
            - API_PASSWORD=MyS3cr37P450r.*-
            - DASHBOARD_USERNAME=kibanaserver
            - DASHBOARD_PASSWORD=kibanaserver

#. Replace the content of the following files in your stack with the ones from the Wazuh Docker repository.

   -  ``multi-node/config/wazuh_cluster/wazuh_manager.conf`` (see `wazuh_manager.conf <https://github.com/wazuh/wazuh-docker/blob/v|WAZUH_CURRENT_DOCKER|/multi-node/config/wazuh_cluster/wazuh_manager.conf>`__ in tag ``v|WAZUH_CURRENT_DOCKER|``)
   -  ``multi-node/config/wazuh_cluster/wazuh_worker.conf`` (see `wazuh_worker.conf <https://github.com/wazuh/wazuh-docker/blob/v|WAZUH_CURRENT_DOCKER|/multi-node/config/wazuh_cluster/wazuh_worker.conf>`__ in tag ``v|WAZUH_CURRENT_DOCKER|``)

#. Start the new version of Wazuh using the ``docker compose`` command:

   .. code-block:: console

      # docker compose up -d
