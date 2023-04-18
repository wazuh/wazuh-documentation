.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn more about upgrading the Wazuh deployment on Docker in this section of our documentation. 
  
Upgrading Wazuh Docker
======================

This section describes how to upgrade a Wazuh Docker deployment starting from version 4.3. To upgrade Wazuh deployments with versions older than 4.3, refer to the :doc:`/deployment-options/docker/data-migration` documentation.

Below, you can see the steps for upgrading to version |WAZUH_CURRENT_MINOR|. These steps consider a scenario of a single node deployment. It considers that both, the ``docker-compose.yml`` and the mounted volumes, use their default names and configurations.

#. Change to the ``wazuh-docker/single-node/`` directory in the repository:

   .. code-block:: console

      # cd wazuh-docker/single-node

#. Run the following command to stop the outdated environment:

   .. code-block:: console

      # docker-compose down

#. Set the latest version of Wazuh in one of two ways.

   -  If you have a customized ``docker-compose.yml`` file and want to preserve it: Edit it and change the version of the images to the latest version.
   -  If you want to use the default ``docker-compose.yml`` file of the latest version: Checkout the Git branch for this version.

      .. code-block:: console

         # git checkout v|WAZUH_CURRENT_DOCKER|

#. Edit ``docker-compose.yml`` and comment out the following lines. This preserves the Wazuh installation files in the Docker volumes for the ``wazuh.manager`` and ``wazuh.indexer`` containers.

   .. code-block:: yaml
      :lineno-start: 25

      # - wazuh_api_configuration:/var/ossec/api/configuration
      # - wazuh_etc:/var/ossec/etc
      # - wazuh_logs:/var/ossec/logs
      # - wazuh_queue:/var/ossec/queue
      # - wazuh_var_multigroups:/var/ossec/var/multigroups
      # - wazuh_integrations:/var/ossec/integrations
      # - wazuh_active_response:/var/ossec/active-response/bin
      # - wazuh_agentless:/var/ossec/agentless
      # - wazuh_wodles:/var/ossec/wodles
      # - filebeat_etc:/etc/filebeat
      # - filebeat_var:/var/lib/filebeat

   .. code-block:: yaml
      :lineno-start: 57

      # - wazuh-indexer-data:/var/lib/wazuh-indexer

#. Start the Wazuh stack. This uses the latest version set in the previous steps.

   .. code-block:: console

      # docker-compose up -d

#. Run the following commands to copy the necessary files from the ``wazuh.manager`` container to the corresponding docker volumes. If you don't use the default path, you must modify the value of the ``DOCKER_VOLUME_PATH`` variable below.

   .. code-block:: console

      # export DOCKER_VOLUME_PATH=/var/lib/docker/volumes
      # docker cp single-node_wazuh.manager_1:/var/ossec/api/configuration/. - | sudo tar xf /dev/stdin -C $DOCKER_VOLUME_PATH/single-node_wazuh_api_configuration/_data/
      # docker cp single-node_wazuh.manager_1:/var/ossec/etc/. - | sudo tar xf /dev/stdin -C $DOCKER_VOLUME_PATH/single-node_wazuh_etc/_data/
      # docker cp single-node_wazuh.manager_1:/var/ossec/logs/. - | sudo tar xf /dev/stdin -C $DOCKER_VOLUME_PATH/single-node_wazuh_logs/_data/
      # docker cp single-node_wazuh.manager_1:/var/ossec/queue/. - | sudo tar xf /dev/stdin -C $DOCKER_VOLUME_PATH/single-node_wazuh_queue/_data/
      # docker cp single-node_wazuh.manager_1:/var/ossec/var/multigroups/. - | sudo tar xf /dev/stdin -C $DOCKER_VOLUME_PATH/single-node_wazuh_var_multigroups/_data/
      # docker cp single-node_wazuh.manager_1:/var/ossec/integrations/. - | sudo tar xf /dev/stdin -C $DOCKER_VOLUME_PATH/single-node_wazuh_integrations/_data/
      # docker cp single-node_wazuh.manager_1:/var/ossec/active-response/bin/. - | sudo tar xf /dev/stdin -C $DOCKER_VOLUME_PATH/single-node_wazuh_active_response/_data/
      # docker cp single-node_wazuh.manager_1:/var/ossec/agentless/. - | sudo tar xf /dev/stdin -C $DOCKER_VOLUME_PATH/single-node_wazuh_agentless/_data/
      # docker cp single-node_wazuh.manager_1:/var/ossec/wodles/. - | sudo tar xf /dev/stdin -C $DOCKER_VOLUME_PATH/single-node_wazuh_wodles/_data/
      # docker cp single-node_wazuh.manager_1:/etc/filebeat/. - | sudo tar xf /dev/stdin -C $DOCKER_VOLUME_PATH/single-node_filebeat_etc/_data/
      # docker cp single-node_wazuh.manager_1:/var/lib/filebeat/. - | sudo tar xf /dev/stdin -C $DOCKER_VOLUME_PATH/single-node_filebeat_var/_data/

   .. note::

      Dismiss any failed copy command errors about missing files in the directory inside the container. For example:

      .. code-block:: console

         # sudo docker cp single-node_wazuh.manager_1:/var/ossec/var/multigroups/. - | sudo tar xf /dev/stdin -C /var/lib/docker/volumes/single-node_wazuh_var_multigroups/_data/
         Error: No such container:path: single-node_wazuh.manager_1:/var/ossec/var/multigroups/.
         tar: This does not look like a tar archive
         tar: Exiting with failure status due to previous errors


#. Edit the ``docker-compose.yml`` file and uncomment the previously commented lines.

   .. code-block:: yaml
      :lineno-start: 25

      - wazuh_api_configuration:/var/ossec/api/configuration
      - wazuh_etc:/var/ossec/etc
      - wazuh_logs:/var/ossec/logs
      - wazuh_queue:/var/ossec/queue
      - wazuh_var_multigroups:/var/ossec/var/multigroups
      - wazuh_integrations:/var/ossec/integrations
      - wazuh_active_response:/var/ossec/active-response/bin
      - wazuh_agentless:/var/ossec/agentless
      - wazuh_wodles:/var/ossec/wodles
      - filebeat_etc:/etc/filebeat
      - filebeat_var:/var/lib/filebeat

   .. code-block:: yaml
      :lineno-start: 57

      - wazuh-indexer-data:/var/lib/wazuh-indexer

#. Stop and delete the stack and start it again with the updated version of Wazuh using ``docker-compose``:

   .. code-block:: console

      # docker-compose down

   .. code-block:: console

      # docker-compose up -d
