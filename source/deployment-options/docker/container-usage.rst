.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check the tasks that help you benefit the most from the installation of Wazuh after the installation of the Wazuh-Docker.

Wazuh Docker utilities
======================

After installing the Wazuh Docker containers, there are several tasks you can do to benefit the most from your Wazuh installation.

The Wazuh components are deployed as separate containers, each built from its corresponding Docker image. Access each container using the service names defined in the ``docker-compose.yml`` file specific to your deployment type.

Access to services and containers
---------------------------------

This section explains how to interact with your Wazuh deployment by accessing service logs and shell instances of running containers.

#. Access the Wazuh dashboard using the Docker host IP address. For example, ``https://localhost``, if you are on the Docker host.

   .. note::

      If you use a self-signed certificate, your browser will warn you that it cannot verify its authenticity.

#. Enroll agents through the :ref:`Wazuh agent Docker deployment <agent_docker>` or the standard :doc:`Wazuh agent enrollment </user-manual/agent/agent-enrollment/index>` process. When enrolling, use the Docker host address as the Wazuh manager address.

#. List the containers in the directory where the Wazuh ``docker-compose.yml`` file is located:

   .. code-block:: console

      # docker-compose ps

   .. code-block:: none
      :class: output

      NAME                            COMMAND                  SERVICE             STATUS              PORTS
      single-node-wazuh.dashboard-1   "/entrypoint.sh"         wazuh.dashboard     running             443/tcp, 0.0.0.0:443->5601/tcp
      single-node-wazuh.indexer-1     "/entrypoint.sh open…"   wazuh.indexer       running             0.0.0.0:9200->9200/tcp
      single-node-wazuh.manager-1     "/init"                  wazuh.manager       running             0.0.0.0:1514-1515->1514-1515/tcp, 0.0.0.0:514->514/udp, 0.0.0.0:55000->55000/tcp, 1516/tcp

#. Run the command below from the directory where the ``docker-compose.yml`` file is located to access the command line of each container:

   .. code-block:: console

      # docker-compose exec <SERVICE> bash

Wazuh service data volumes
--------------------------

You can set Wazuh configuration and log files to exist outside their containers. This allows the files to persist after containers are removed, and you can provision custom configuration files to your containers.

You need multiple volumes to ensure persistence on a Wazuh container. The following is an example of a ``docker-compose.yml`` with persistent volumes:

.. code-block:: yaml
   :emphasize-lines: 4-5,7-8

   services:
     wazuh:
       . . .
       volumes:
         - wazuh_api_configuration:/var/ossec/api/configuration

   volumes:
     wazuh_api_configuration:

You can list persistent volumes with ``docker volume ls``:

.. code-block:: none
   :class: output

   DRIVER              VOLUME NAME
   local               single-node_wazuh_api_configuration

Storage volume for Wazuh indexer and dashboard
----------------------------------------------

Attaching a volume for the storage of Wazuh indexer data is also possible. By default, the single-node and multi-node deployments already have volumes configured. An example of a single-node wazuh indexer volume is shown in the ``docker-compose.yml`` below:

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

To execute commands in the Wazuh manager container, you can execute a shell:

.. code-block:: console

   # docker exec -it single-node-wazuh.manager-1 bash

Every change made on this shell persists if you have the data volumes configured correctly.

Modifying the Wazuh configuration file
--------------------------------------

To customize the Wazuh configuration file ``/var/ossec/etc/ossec.conf``, modify the appropriate configuration file on the Docker host according to your business needs. These local files are mounted into the containers at runtime, allowing your custom settings to persist across container restarts or rebuilds.

#. Run the following command in your deployment directory to stop the running containers:

   .. code-block:: console

      # docker-compose down

#. The following are the locations of the Wazuh configuration files on the Docker host that you can modify:

   -  **Single-node deployment**:

      ``wazuh-docker/single-node/config/wazuh-cluster/wazuh_manager.config``

   -  **Multi-node deployment**:

      -  Manager: ``wazuh-docker/multi-node/config/wazuh-cluster/wazuh_manager.config``

      -  Worker: ``wazuh-docker/multi-node/config/wazuh-cluster/wazuh_worker.config``

   -  **Wazuh agent container**:

      ``wazuh-docker/wazuh-agent/config/wazuh-agent-config``

#. After saving the changes in the configuration files, restart the environment:

   .. code-block:: console

      # docker-compose up -d

These files are mounted into the container at runtime (``/wazuh-config-mount/etc/ossec.conf``), ensuring your changes take effect when the containers start.