.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Perform several tasks to manage and customize your installation after deploying Wazuh with Docker.

Wazuh Docker utilities
======================

After deploying Wazuh with Docker, you can perform several tasks to manage and customize your installation. Wazuh components are deployed as separate containers built from their corresponding Docker image. You can access these containers using the service names defined in your ``docker-compose.yml`` file, which are specific to your deployment type.

Access to services and containers
---------------------------------

This section explains how to interact with your Wazuh deployment by accessing service logs and shell instances of running containers.

#. Access the Wazuh dashboard using the Docker host IP address.
#. Enroll agents through the :doc:`Wazuh agent Docker deployment </deployment-options/docker/wazuh-agent>` or the standard :doc:`Wazuh agent enrollment </user-manual/agent/agent-enrollment/index>` process. Use the Docker host address as the Wazuh manager address.
#. List the containers in the directory where the Wazuh ``docker-compose.yml`` file is located:

   .. code-block:: console

      # docker compose ps

   .. code-block:: none
      :class: output

      NAME                            COMMAND                  SERVICE             STATUS              PORTS
      single-node-wazuh.dashboard-1   "/entrypoint.sh"         wazuh.dashboard     running             443/tcp, 0.0.0.0:443->5601/tcp
      single-node-wazuh.indexer-1     "/entrypoint.sh open…"   wazuh.indexer       running             0.0.0.0:9200->9200/tcp
      single-node-wazuh.manager-1     "/init"                  wazuh.manager       running             0.0.0.0:1514-1515->1514-1515/tcp, 0.0.0.0:514->514/udp, 0.0.0.0:55000->55000/tcp, 1516/tcp

#. Run the command below from the directory where the ``docker-compose.yml`` file is located  to open a shell inside the container:

   .. code-block:: console

      # docker compose exec <SERVICE> bash

Tuning Wazuh services
---------------------

You can tune the Wazuh indexer and Wazuh dashboard by replacing their default configuration with custom parameters. This allows you to adjust performance settings, change the dashboard interface, or override default options.

Tuning the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh indexer uses a default internal configuration that is not exposed by default. Follow the steps below to override the default configuration:

#. Create a new configuration file:

   .. code-block:: none

      # touch config/wazuh_indexer/<new_wazuh_indexer>.yml

   Replace ``<new_wazuh_indexer>`` with your new service name.

#. Map your configuration file inside the container in the ``docker-compose.yml`` file. Update the Wazuh indexer container declaration to:

   .. code-block:: yaml
      :emphasize-lines: 4,5,7

      <new_wazuh_indexer>:
       image: wazuh/wazuh-indexer:latest
       ports:
         - "9200:9200"
         - "9300:9300"
       environment:
         ES_JAVA_OPTS: "-Xms6g -Xmx6g"
       networks:
         - docker_wazuh

Tuning the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh dashboard reads its configuration from ``config/wazuh_dashboard/opensearch_dashboards.yml``. Edit this file to customize the Wazuh dashboard with your desired settings. After making changes, restart the Wazuh Docker container for the updates to take effect.

Refer to the OpenSearch documentation on `Modifying the YAML files <https://docs.opensearch.org/latest/security/configuration/yaml/>`__ for details about the available variables you can override in this configuration.

Wazuh service data volumes
--------------------------

You can set Wazuh configuration and log files to exist outside their containers on the host system. This allows the files to persist after containers are removed, and you can provision custom configuration files to your containers.

Listing existing volumes
^^^^^^^^^^^^^^^^^^^^^^^^

Run the following to see the persistent volumes on your Docker host:

.. code-block:: console

   # docker volume ls

.. code-block:: none
   :class: output

   DRIVER    VOLUME NAME
   local     single-node_wazuh_api_configuration

You can also view these volumes in the ``volumes`` section directly from the ``docker-compose.yml`` file.

Adding a custom volume
^^^^^^^^^^^^^^^^^^^^^^

You need multiple volumes to ensure persistence on the Wazuh server, Wazuh indexer, and Wazuh dashboard containers. Investigate the ``volumes`` section in your ``docker-compose.yml`` file and modify it to include your custom volumes:

.. code-block:: yaml

   services:
     wazuh.manager:
       . . .
       volumes:
         - wazuh_api_configuration:/var/ossec/api/configuration
       . . .
   volumes:
     wazuh_api_configuration:

Wazuh indexer volumes
^^^^^^^^^^^^^^^^^^^^^

By default, single‑node and multi‑node deployments include preconfigured volumes for the Wazuh indexer.

For example, in a multi-node deployment, the ``wazuh1.indexer`` service uses the following volume (as defined in ``wazuh-docker/multi-node/docker-compose.yml``):

.. code-block:: yaml
   :emphasize-lines: 4

   wazuh1.indexer:
     ...
     volumes:
       - wazuh-indexer-data-1:/var/lib/wazuh-indexer

This ensures that Wazuh indexer data remains available even if the container is restarted or rebuilt.

Storage volume for Wazuh indexer and dashboard
----------------------------------------------

You can also attach volumes to store Wazuh indexer data. By default, single‑node and multi‑node Docker deployments include preconfigured volumes.

The example below shows a single-node Wazuh indexer volume in the ``docker-compose.yml`` file:

.. code-block:: yaml

   wazuh.indexer:
       . . .
        volumes:
          - wazuh-indexer-data:/var/lib/wazuh-indexer

       . . .

   volumes:
     wazuh-indexer-data

Custom commands and scripts
---------------------------

Run the command below to execute commands inside the containers. We use the Wazuh manager ``single-node-wazuh.manager-1`` container in this example:

.. code-block:: console

   # docker exec -it single-node-wazuh.manager-1 bash

Every change made on this shell persists because of the data volumes.

.. note::

   The actions you can perform inside the containers are limited.

Modifying the Wazuh configuration file
--------------------------------------

To customize the Wazuh configuration file ``/var/ossec/etc/ossec.conf``, modify the appropriate configuration file on the Docker host according to your business needs. These local files are mounted into the containers at runtime, allowing your custom settings to persist across container restarts or rebuilds.

#. Run the following command in your deployment directory to stop the running containers:

   .. code-block:: console

      # docker compose down

#. The following are the locations of the Wazuh configuration files on the Docker host that you can modify:

   -  **Single-node deployment:**

      ``wazuh-docker/single-node/config/wazuh_cluster/wazuh_manager.conf``

   -  **Multi-node deployment:**

      -  **Manager**: ``wazuh-docker/multi-node/config/wazuh_cluster/wazuh_manager.conf``
      -  **Worker**: ``wazuh-docker/multi-node/config/wazuh_cluster/wazuh_worker.conf``

   -  **Wazuh agent container:**

      ``wazuh-docker/wazuh-agent/config/wazuh-agent-conf``

   Save the changes made in the configuration files.

#. Restart the stack:

   .. code-block:: console

      # docker compose up -d

These files are mounted into the container at runtime (``wazuh-config-mount/etc/ossec.conf``), ensuring your changes take effect when the containers start.
