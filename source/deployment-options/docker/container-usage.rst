.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Perform several tasks to manage your installation after deploying Wazuh with Docker.

Wazuh Docker utilities
======================

After deploying Wazuh with Docker, you can perform several tasks to manage your installation. Wazuh components are deployed as separate containers built from their corresponding Docker image. You can access these containers using the service names defined in your ``docker-compose.yml`` file, which are specific to your deployment type.

Access to services and containers
---------------------------------

This section explains how to list the Wazuh containers and open a shell inside them.

#. From the ``wazuh-docker/single-node/`` directory, or ``wazuh-docker/multi-node/`` for the multi-node stack, list the containers:

   .. code-block:: console

      # docker compose ps

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      NAME                          IMAGE                             COMMAND                  SERVICE           CREATED              STATUS                        PORTS
      single-node-wazuh.dashboard   wazuh/wazuh-dashboard:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|   "/entrypoint.sh"         wazuh.dashboard   About a minute ago   Up 32 seconds (healthy)       443/tcp, 0.0.0.0:443->5601/tcp, [::]:443->5601/tcp
      single-node-wazuh.indexer     wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|     "/entrypoint.sh open…"   wazuh.indexer     About a minute ago   Up About a minute (healthy)   9200/tcp
      single-node-wazuh.manager     wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|     "/usr/local/bin/tini…"   wazuh.manager     About a minute ago   Up 48 seconds (healthy)       0.0.0.0:1514-1515->1514-1515/tcp, [::]:1514-1515->1514-1515/tcp, 0.0.0.0:1517->1517/tcp, [::]:1517->1517/tcp, 0.0.0.0:514->514/udp, [::]:514->514/udp, 0.0.0.0:55000->55000/tcp, [::]:55000->55000/tcp, 1516/tcp

   In a working stack, every container shows ``(healthy)``, except the multi-node ``nginx`` container, which has no health check. Port ``9200`` on the Wazuh indexer is reachable only from the other containers, because the ``docker-compose.yml`` file does not publish it.

#. From the same directory, open a shell inside a container:

   .. code-block:: console

      # docker compose exec <SERVICE> bash

   Replace ``<SERVICE>`` with a name from the ``SERVICE`` column of the output above, for example ``wazuh.manager``. In the multi-node stack, the Wazuh manager services are ``wazuh.master`` and ``wazuh.worker``. A bash shell allows you to interact directly with the container's operating system to run commands, inspect configurations, and troubleshoot issues.

   When you are done, run ``exit`` to close the shell and return to the terminal of the Docker host.

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
   local     single-node_wazuh_data
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
         - wazuh_api_configuration:/var/wazuh-manager/api/configuration
       . . .
   volumes:
     wazuh_api_configuration:

Custom commands and scripts
---------------------------

You can also open a shell with ``docker exec``, from any directory. ``docker exec`` takes a name from the ``NAME`` column of the ``docker compose ps`` output, not the service name. This example uses the Wazuh manager container of the single-node stack. In the multi-node stack, use ``multi-node-wazuh.master``:

.. code-block:: console

   # docker exec -it single-node-wazuh.manager bash

Changes persist only under the paths mounted as volumes, such as ``/var/wazuh-manager/etc`` in the Wazuh manager container. The ``volumes`` section of each service in ``wazuh-docker/single-node/docker-compose.yml`` or ``wazuh-docker/multi-node/docker-compose.yml`` lists them. Changes anywhere else are lost when Docker recreates the container, for example after ``docker compose down`` or an upgrade.

At every start, the Wazuh manager container sets the Wazuh indexer hosts, the cluster settings, and the listener addresses in ``/var/wazuh-manager/etc/wazuh-manager.conf`` from its environment variables. Change those settings in the ``environment`` section of the ``docker-compose.yml`` file instead.

The actions you can perform inside the containers are limited.
