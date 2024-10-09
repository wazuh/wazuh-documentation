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

#. If tiy are upgrading from a version below of 4.8, you need yo change the defaultRoute parameter into Wazuh dashboard configuration.

   .. tabs::

      .. group-tab:: Single node deployment

         -  ``single-node/config/wazuh_dashboard/opensearch_dashboards.yml``

            .. code-block:: yaml

               uiSettings.overrides.defaultRoute: /app/wz-home

      .. group-tab:: Multi node deployment

         -  ``multi-node/config/wazuh_dashboard/opensearch_dashboards.yml``

            .. code-block:: yaml

               uiSettings.overrides.defaultRoute: /app/wz-home

   It is also necessary to modify the OPENSEARCH JAVA_OPTS environment variable to allocate more RAM to the Wazuh indexer container and the tag of image generator:

      .. tabs::

         .. group-tab:: Single node deployment

            -  ``single-node/docker-compose.yml``

               .. code-block:: yaml

                  environment:
                  - "OPENSEARCH_JAVA_OPTS=-Xms1g -Xmx1g"

            -  ``single-node/generate-indexer-certs.yml``

               .. code-block:: yaml

                  services:
                     generator:
                        image: wazuh/wazuh-certs-generator:0.0.2

         .. group-tab:: Multi node deployment

            -  ``multi-node/docker-compose.yml``

               .. code-block:: yaml

                  environment:
                  - "OPENSEARCH_JAVA_OPTS=-Xms1g -Xmx1g"

            -  ``single-node/generate-indexer-certs.yml``

               .. code-block:: yaml

                  services:
                     generator:
                        image: wazuh/wazuh-certs-generator:0.0.2

   After these changes it is necessary to recreate the certificates

   .. code-block:: bash

      docker-compose -f generate-indexer-certs.yml run --rm generator

#. If you are upgrading from 4.3, some paths are different. You have to update the old paths with the new ones in the following manifests:

   .. tabs::

      .. group-tab:: Single node deployment

         ``Wazuh dashboard``

            -  ``/usr/share/wazuh-dashboard/config/certs/`` -> ``/usr/share/wazuh-dashboard/certs/``

               .. code-block::  bash

                  single-node/config/wazuh_dashboard/opensearch_dashboards.yml
                  single-node/docker-compose.yml

         ``Wazuh indexer``

            -  ``/usr/share/wazuh-indexer/config/certs/`` -> ``/usr/share/wazuh-indexer/certs/``

               .. code-block::  bash

                  single-node/config/wazuh_indexer/wazuh.indexer.yml
                  single-node/docker-compose.yml

            -  ``${OPENSEARCH_PATH_CONF}/certs/`` -> ``/usr/share/wazuh-indexer/certs/``

               .. code-block::  bash

                  single-node/config/wazuh_indexer/wazuh.indexer.yml

            -  ``/usr/share/wazuh-indexer/config/opensearch.yml`` -> ``/usr/share/wazuh-indexer/opensearch.yml``

               .. code-block::  bash

                  single-node/docker-compose.yml

            -  ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/`` -> ``/usr/share/wazuh-indexer/opensearch-security/``

               .. code-block::  bash

                  single-node/docker-compose.yml

      .. group-tab:: Multi node deployment

         ``Wazuh dashboard``

            -  ``/usr/share/wazuh-dashboard/config/certs/`` -> ``/usr/share/wazuh-dashboard/certs/``

               .. code-block::  bash

                  multi-node/config/wazuh_dashboard/opensearch_dashboards.yml
                  multi-node/docker-compose.yml

         ``Wazuh indexer``

            -  ``/usr/share/wazuh-indexer/config/certs/`` -> ``/usr/share/wazuh-indexer/certs/``

               .. code-block::  bash

                  multi-node/config/wazuh_indexer/wazuh1.indexer.yml
                  multi-node/config/wazuh_indexer/wazuh2.indexer.yml
                  multi-node/config/wazuh_indexer/wazuh3.indexer.yml
                  multi-node/docker-compose.yml

            -  ``/usr/share/wazuh-indexer/config/opensearch.yml`` -> ``/usr/share/wazuh-indexer/opensearch.yml``

               .. code-block::  bash

                  multi-node/docker-compose.yml

            -  ``/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/`` -> ``/usr/share/wazuh-indexer/opensearch-security/``

               .. code-block::  bash

                  multi-node/docker-compose.yml

   You will also need to make some changes to the docker-compose.yml file corresponding to your deployment type.

   .. tabs::

      .. group-tab:: Single node deployment
         .. code-block:: yaml
            :emphasize-lines: 2, 5, 8, 13-14

            wazuh.manager:
               image: wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|
            ...
            wazuh.indexer:
               image: wazuh/wazuh-indexer:|WAZUH_CURRENT_KUBERNETES|
            ...
            wazuh.dashboard:
               image: wazuh/wazuh-dashboard:|WAZUH_CURRENT_KUBERNETES|
               environment:
                  - INDEXER_USERNAME=admin
                  - INDEXER_PASSWORD=SecretPassword
                  - WAZUH_API_URL=https://wazuh.manager
                  - DASHBOARD_USERNAME=kibanaserver
                  - DASHBOARD_PASSWORD=kibanaserver

      .. group-tab:: Single node deployment
         .. code-block:: yaml
            :emphasize-lines:  2, 5, 8, 11, 14, 17, 23-24

            wazuh.master:
               image: wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|
            ...
            wazuh.worker:
               image: wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|
            ...
            wazuh1.indexer:
               image: wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|
            ...
            wazuh2.indexer:
               image: wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|
            ...
            wazuh3.indexer:
               image: wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|
            ...
            wazuh.master:
               image: wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|
               environment:
                  - OPENSEARCH_HOSTS="https://wazuh1.indexer:9200"
                  - WAZUH_API_URL="https://wazuh.master"
                  - API_USERNAME=wazuh-wui
                  - API_PASSWORD=MyS3cr37P450r.*-
                  - DASHBOARD_USERNAME=kibanaserver
                  - DASHBOARD_PASSWORD=kibanaserver

#. Start the new version of Wazuh using ``docker-compose``:

   .. code-block::

      # docker-compose up -d            

