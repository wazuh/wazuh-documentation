.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn more about upgrading the Wazuh deployment on Docker in this section of our documentation. 
  
Upgrading Wazuh Docker
======================

This section describes how to upgrade Wazuh Docker deployments starting from version 4.3. To upgrade Wazuh deployments below version 4.3 (production deployment), refer to the :doc:`/deployment-options/docker/data-migration` documentation.

This scenario is based on a single node deployment and both the docker-compose.yml and the mounted volumes have the default names and configuration.

#. From the root directory of the repository ``wazuh-docker``, go to the single node deployment folder:

   .. code-block::

      # cd single-node

#. Run the following command to stop the current v4.3.x environment:

   .. code-block::

      # docker-compose down

#. Set the new version of Wazuh:

   -  If you have a customized ``docker-compose.yml`` file and want to preserve it. Edit it and change the version of the images to the new version.
   -  If you want to use the default ``docker-compose.yml`` file of the new version. Navigate to the Git branch of the latest version:

      .. code-block::

         # git checkout v|WAZUH_CURRENT_DOCKER|

#. Before starting the new version, we must copy all the files that have been persisted in the docker volumes and belong to the Wazuh manager installation. This process will overwrite the files belonging to the Wazuh manager installation, but it will not delete your own customization files.

#. First of all, we must comment out all the lines of the ``Docker-compose.yml`` file where docker volumes are mounted in the ``wazuh.manger`` and ``wazuh.indexer`` containers:

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

#. Start the Wazuh stack with the new version:

   .. code-block::

      # docker-compose up -d

#. We copy all the necessary files from the wazuh.manager container to the corresponding docker volumes. The docker volume directory path is the default, if you use a different path, you must modify the value of the ``DOCKER_VOLUME_PATH`` variable:

   .. code-block::

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

#. After the file copy, we must uncomment the previously commented lines in ``Docker-compose.yml`` file:

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

#. Start the new version of Wazuh using ``docker-compose``:

   .. code-block::

      # docker-compose up -d