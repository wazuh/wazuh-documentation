.. Copyright (C) 2020 Wazuh, Inc.

.. _container-usage:

Wazuh Docker utilities
======================

After installing the Wazuh-Docker containers, there are several tasks that you can do to benefit the most from your Wazuh installation.

- `Access to services and containers`_
- `Wazuh service data volume`_
- `Mount storage for Elastic Stack components`_
- `Custom commands and scripts`_

Access to services and containers
---------------------------------

#. You may access the Kibana UI at the Docker host's IP address, for example: `https://localhost <http://localhost>`_ if you are in the Docker host. By default, the username "foo" and the password "bar" are used.

   .. note::
     The certificate generated for kibana by default is a self-signed certificate, because of this your browser will warn that it cannot verify its authenticity.

#. Agents may be registered by following the standard registration process and using the Docker host's address as the manager's address. For more information see: :ref:`Registering agents<register_agents>`

#. We can list the containers we have created by executing `docker-compose ps` in the directory that contains the ``docker-compose.yml`` file:

    .. code-block:: console

      # docker-compose ps

    .. code-block:: none
      :class: output

                      Name                            Command              State                                               Ports
       ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
       root_elasticsearch_1_f3c44c8686b3   /entrypoint.sh elasticsearch   Up      0.0.0.0:9200->9200/tcp, 9300/tcp
       root_kibana_1_3fe12b8a29d3          /bin/sh -c ./entrypoint.sh     Up      5601/tcp
       root_nginx_1_50353d6e4f98           /entrypoint.sh                 Up      0.0.0.0:443->443/tcp, 0.0.0.0:80->80/tcp
       root_wazuh_1_9790ada55716           /entrypoint.sh                 Up      0.0.0.0:1514->1514/udp, 0.0.0.0:1515->1515/tcp, 1516/tcp, 0.0.0.0:514->514/udp,
                                                                                  0.0.0.0:55000->55000/tcp

#. We can access the command line of each container by executing `docker-compose exec <service name> /bin/bash` from the directory where the ``docker-compose.yml`` file is located:

    .. code-block:: console

      # docker-compose exec <service name> /bin/bash


    Where ``service name`` is the name of each service in the ``docker-compose.yml`` file. By default:

    - wazuh
    - elasticsearch
    - kibana
    - nginx


Wazuh service data volume
-------------------------

Wazuh configuration and log files can be configured to exist outside of their container. This will allow these files to persist after containers are removed and to provision custom configuration files to your containers.

To achieve this a volumes section for the wazuh service can be specified in the `docker-compose.yml` file:

.. code-block:: yaml

    services:
        wazuh:
        image: wazuh/wazuh:3.12.0_7.6.1
        hostname: wazuh-manager
        restart: always
        ports:
          - "1514:1514/udp"
          - "1515:1515"
          - "514:514/udp"
          - "55000:55000"
        volumes:
          - /wazuh-data/:/var/ossec/data/:Z

You will then find Wazuh configuration files in you Docker host's `/wazuh-data/etc` folder and log files in `/wazuh-data/logs`.

Before performing a container upgrade it is recommended this data volume be created so the persistent information of the Wazuh service is not lost.


Mount storage for Elastic Stack components
------------------------------------------

Assembling volumes for the storage of Elastic Stack components is also feasible when deploying with Docker-compose. For example, we have the option of mounting persistent volumes both externally and locally.

In order to do this we must add the volumes to the elasticsearch service in ``docker-compose.yml``:

.. code-block:: yaml

	 elasticsearch:
	    . . .
	     volumes:
	       - /elasticsearch-data-folder-path:/usr/share/elasticsearch/data:Z
	    . . .


The container runs Elasticsearch as user elasticsearch using **uid:gid 1000:0**.

If you are bind-mounting a local directory or file, ensure it is readable by this user, while the data and log dirs additionally require write access. You can get more information `here <https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html>`_.

If you're creating a local folder you may give it the appropiate permissions with the following commands:

.. code-block:: console

    # mkdir /elasticsearch-data-folder-path
    # chmod g+rwx /elasticsearch-data-folder-path
    # chgrp 0 /elasticsearch-data-folder-path

Custom commands and scripts
---------------------------

To execute commands in the Wazuh manager container after configuration is placed but before the Wazuh API and manager are started, pass the commands as the docker commands/arguments, for example:

.. code-block:: console

  # docker run -it --rm wazuh/wazuh:latest "/var/ossec/bin/ossec-control enable debug"
