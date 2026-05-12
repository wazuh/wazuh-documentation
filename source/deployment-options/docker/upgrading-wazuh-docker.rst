.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to upgrade Wazuh Docker deployments in this section of our documentation.

Upgrading the Wazuh Docker deployment
=====================================

To upgrade your Wazuh deployment using Docker, update the image tags in the ``docker-compose.yml`` file to the target version (|WAZUH_CURRENT_DOCKER|) and redeploy the stack.

Follow these steps to upgrade your deployment using the default ``docker-compose.yml`` file:

Stop the current deployment
---------------------------

#. Stop and remove the running containers:

   .. code-block:: console

      # docker compose down

Update the image tags
---------------------

Edit the image tags of all the services in the ``docker-compose.yml`` file to your desired version tag:

Single-node deployment
^^^^^^^^^^^^^^^^^^^^^^

#. Navigate to the ``wazuh-docker/single-node/`` directory:

   .. code-block:: console

      # cd wazuh-docker/single-node/

#. Edit the ``docker-compose.yml`` file and update the ``image`` field for all Wazuh services to the desired version.

   .. code-block:: yaml

      services:
        wazuh.manager:
          image: wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|-latest
          ...
        wazuh.indexer:
          image: wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|-latest
          ...
        wazuh.dashboard:
          image: wazuh/wazuh-dashboard:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|-latest
          ...

Multi-node deployment
^^^^^^^^^^^^^^^^^^^^^

#. Navigate to the ``wazuh-docker/multi-node/`` directory:

   .. code-block:: console

      # cd wazuh-docker/multi-node/

#. Edit the ``docker-compose.yml`` file and update the ``image`` field for all Wazuh services to the desired version.

   .. code-block:: yaml

      services:
        wazuh.master:
          image: wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|-latest
          ...
        wazuh.worker:
          image: wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|-latest
          ...
        wazuh1.indexer:
          image: wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|-latest
          ...
        wazuh2.indexer:
          image: wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|-latest
          ...
        wazuh3.indexer:
          image: wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|-latest
          ...
        wazuh.dashboard:
          image: wazuh/wazuh-dashboard:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|-latest
          ...

Start the updated deployment
----------------------------

#. Start the upgraded Wazuh Docker environment using the ``docker compose`` command:

   .. code-block:: console

      # docker compose up -d

Your data and certificates remain persistent because they are stored in mounted Docker volumes. This means upgrading the environment does not erase your existing configuration or indexed data.
