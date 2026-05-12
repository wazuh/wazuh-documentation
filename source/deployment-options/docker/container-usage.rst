.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Perform several tasks to manage your installation after deploying Wazuh with Docker.

Wazuh Docker utilities
======================

After deploying Wazuh with Docker, you can perform several tasks to manage your installation. Wazuh components are deployed as separate containers built from their corresponding Docker image. You can access these containers using the service names defined in your ``docker-compose.yml`` file, which are specific to your deployment type.

Access to services and containers
---------------------------------

This section explains how to interact with your Wazuh deployment by accessing service logs and shell instances of running containers.

#. Access the Wazuh dashboard using the Docker host IP address.
#. Enroll Wazuh agents through the :ref:`Wazuh agent Docker deployment <agent_deployment_docker>` or the standard `Wazuh agent enrollment </user-manual/agent/agent-enrollment/index>`__ process. Use the Docker host address as the Wazuh manager address.
#. List the containers in the directory where the Wazuh ``docker-compose.yml`` file is located:

   .. code-block:: console

      # docker compose ps

   .. code-block:: none
      :class: output

      NAME                            IMAGE                                          COMMAND                  SERVICE           CREATED          STATUS          PORTS
      single-node-wazuh.dashboard-1   wazuh/wazuh-dashboard:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|-latest   "/entrypoint.sh"         wazuh.dashboard   58 minutes ago   Up 58 minutes   443/tcp, 0.0.0.0:443->5601/tcp
      single-node-wazuh.indexer-1     wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|-latest     "/entrypoint.sh open…"   wazuh.indexer     58 minutes ago   Up 58 minutes   0.0.0.0:9200->9200/tcp, [::]:9200->9200/tcp
      single-node-wazuh.manager-1     wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|-latest     "/init"                  wazuh.manager     58 minutes ago   Up 58 minutes   0.0.0.0:1514-1515->1514-1515/tcp, [::]:1514-1515->1514-1515/tcp, 0.0.0.0:514->514/udp, [::]:514->514/udp, 0.0.0.0:55000->55000/tcp, [::]:55000->55000/tcp, 1516/tcp

#. Run the command below from the directory where the ``docker-compose.yml`` file is located to open a shell inside the container:

   .. code-block:: console

      # docker compose exec <SERVICE> bash

   Replace ``<SERVICE>`` with the name of the service you want to access. A bash shell allows you to interact directly with the container's operating system to run commands, inspect configurations, and troubleshoot issues.

   When you are done using the shell, exit it to return to your normal terminal:

   .. code-block:: console

      bash-5.2# exit

Wazuh service data volumes
--------------------------

You can configure Wazuh to store its configuration and log files outside its containers on the host system. This allows the files to persist after containers are removed, and you can provision configuration files to your containers.

Listing existing volumes
^^^^^^^^^^^^^^^^^^^^^^^^

Run the following to see the persistent volumes on your Docker host:

.. code-block:: console

   # docker volume ls

.. code-block:: none
   :class: output

   DRIVER    VOLUME NAME
   local     single-node_wazuh-dashboard-config
   local     single-node_wazuh-dashboard-custom
   local     single-node_wazuh-indexer-data
   local     single-node_wazuh_api_configuration
   local     single-node_wazuh_etc
   local     single-node_wazuh_logs
   local     single-node_wazuh_queue
   local     single-node_wazuh_var_multigroups

You can also view these volumes directly in the ``volumes`` section of the ``docker-compose.yml`` file.

Adding a custom volume
^^^^^^^^^^^^^^^^^^^^^^

You need multiple volumes to ensure persistence on the Wazuh manager, Wazuh indexer, and Wazuh dashboard containers. Investigate the ``volumes`` section in your ``docker-compose.yml`` file and modify it to include your custom volumes:

.. code-block:: yaml

   services:
     wazuh.manager:
       . . .
       volumes:
         - wazuh_api_configuration:/var/ossec/api/configuration
       . . .
   volumes:
     wazuh_api_configuration:

Custom commands and scripts
---------------------------

Run the command below to execute commands inside the containers. We use the Wazuh manager ``single-node-wazuh.manager`` container in this example:

.. code-block:: console

   # docker exec -it single-node-wazuh.manager bash

Every change made to this shell persists due to the data volumes.

.. note::

   The actions you can perform inside the containers are limited.
