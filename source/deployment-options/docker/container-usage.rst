.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Check the tasks that help you benefit the most from the installation of Wazuh after the installation of the Wazuh-Docker. 
  
.. _container-usage:

Wazuh Docker utilities
======================

After installing the Wazuh-Docker containers, there are several tasks that you can do to benefit the most from your Wazuh installation.

.. contents::
   :local:
   :depth: 1
   :backlinks: none
   

Access to services and containers
---------------------------------

#. You may access the Wazuh dashboard UI at the Docker host's IP address, for example, ``https://localhost``, if you are in the Docker host.

   .. note::
     In case you use a self-signed certificate, your browser will warn you that it cannot verify its authenticity.

#. Agents may be enrolled by following the standard enrollment process and using the Docker host address as the manager address. For more information, see :ref:`Wazuh agent enrollment <agent_enrollment>`.

#. You can list the containers you have created by executing ``docker-compose ps`` in the directory that contains the ``docker-compose.yml`` file:

    .. code-block:: console

      # docker-compose ps

    .. code-block:: none
      :class: output

              Name                           Command               State                                                         Ports
       ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
       single-node_wazuh.dashboard_1   /entrypoint.sh                   Up      0.0.0.0:443->443/tcp,:::443->443/tcp
       single-node_wazuh.indexer_1     /entrypoint.sh opensearchw ...   Up      0.0.0.0:9200->9200/tcp,:::9200->9200/tcp
       single-node_wazuh.manager_1     /init                            Up      0.0.0.0:1514->1514/tcp,:::1514->1514/tcp, 0.0.0.0:1515->1515/tcp,:::1515->1515/tcp, 1516/tcp,
                                                                                0.0.0.0:514->514/udp,:::514->514/udp, 0.0.0.0:55000->55000/tcp,:::55000->55000/tcp

#. You can access the command line of each container by executing ``docker-compose exec <service name> /bin/bash`` from the directory where the ``docker-compose.yml`` file is located:

    .. code-block:: console

      # docker-compose exec <container name> /bin/bash



Wazuh service data volumes
--------------------------

Wazuh configuration and log files can be configured to exist outside of their container. This will allow these files to persist after containers are removed and to provision custom configuration files to your containers.

Multiple volumes are required to ensure persistence on a Wazuh container. The following is an example of a ``docker-compose.yml`` with those defined:

.. code-block:: yaml

    services:
      wazuh:
        . . .
        volumes:
          - wazuh_api_configuration:/var/ossec/api/configuration
        
    volumes:
      wazuh_api_configuration:



These volumes can be listed with ``docker volume ls``:

  .. code-block:: none
    :class: output

      DRIVER              VOLUME NAME
      local               single-node_wazuh_api_configuration


It is recommended that you create these data volumes so that persistent information from the Wazuh service is not lost.


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

To execute commands in the Wazuh manager container you may execute a shell:

  .. code-block:: console

    # docker exec -it single-node_wazuh.manager_1 bash

Remember any change made on this shell will persist as long as you have the data volumes configured correctly.
