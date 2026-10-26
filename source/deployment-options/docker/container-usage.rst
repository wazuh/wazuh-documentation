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
      single-node-wazuh.dashboard   wazuh/wazuh-dashboard:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|   "/entrypoint.sh"         wazuh.dashboard   About a minute ago   Up 32 seconds (healthy)       0.0.0.0:443->443/tcp, [::]:443->443/tcp
      single-node-wazuh.indexer     wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|     "/entrypoint.sh open…"   wazuh.indexer     About a minute ago   Up About a minute (healthy)   9200/tcp
      single-node-wazuh.manager     wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|     "/usr/local/bin/tini…"   wazuh.manager     About a minute ago   Up 48 seconds (healthy)       0.0.0.0:1514-1515->1514-1515/tcp, [::]:1514-1515->1514-1515/tcp, 0.0.0.0:1517->1517/tcp, [::]:1517->1517/tcp, 0.0.0.0:55000->55000/tcp, [::]:55000->55000/tcp, 1516/tcp

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

To back up the deployment, stop the stack with ``docker compose stop``, so that the databases are consistent. Then copy the following, as root:

-  The named volumes of the stack, which ``docker volume ls`` lists. In the multi-node stack, they include ``wazuh-cluster-key``, the key that the Wazuh manager nodes share.
-  ``config/credentials/``: the passwords of the deployment.
-  ``config/*/certs/``: the certificates that the containers mount.
-  ``wazuh-ca/``: the root CA and its private key.

Keep the backup as restricted as the original files. Then start the stack again with ``docker compose start``.

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

Changes persist only under the paths mounted as volumes, such as ``/etc/wazuh-manager`` in the Wazuh manager container. The ``volumes`` section of each service in ``wazuh-docker/single-node/docker-compose.yml`` or ``wazuh-docker/multi-node/docker-compose.yml`` lists them. Changes anywhere else are lost when Docker recreates the container, for example, after ``docker compose down`` or an upgrade.

At every start, the Wazuh manager container sets the Wazuh indexer hosts, the cluster settings, and the listener addresses in ``/etc/wazuh-manager/wazuh-manager.conf`` from its environment variables. Change those settings in the ``environment`` section of the ``docker-compose.yml`` file instead.

To use your own ``opensearch.yml`` or ``opensearch_dashboards.yml``, mount it in the ``volumes`` section of the service, at ``/usr/share/wazuh-indexer/config/opensearch.yml`` or ``/usr/share/wazuh-dashboard/config/opensearch_dashboards.yml``. The file must be owned by ``root``, with group ``101`` and mode ``0640``. Run the following commands on the Docker host before you start the stack. Replace ``<FILE>`` with the path of your file:

.. code-block:: console

   # chown 0:101 <FILE>
   # chmod 640 <FILE>

Otherwise, the container won't start, and Docker will restart it in a loop. ``docker compose logs <SERVICE>`` shows ``UNSAFE <PATH>: <REASON>``. The container keeps the owner and mode of the mounted file. Settings in the ``environment`` section of the service take precedence over the same settings in the file. The Wazuh dashboard container also writes those settings into the file at every start.

.. note::

   The actions you can perform inside the containers are limited.

.. _docker_changing_password:

Changing a password
-------------------

Editing ``config/credentials/indexer.env``, ``config/credentials/manager.env``, or ``config/credentials/dashboard.env`` after the first start doesn't change any password. Use the password tool in the Wazuh indexer or Wazuh manager container instead. It changes the account on the running deployment, then prints the commands that apply the new password everywhere else the account is used.

You need root user privileges to run the commands below. If you use Docker as a non-root user, run them with ``sudo``.

#. From the ``wazuh-docker/single-node/`` directory, or ``wazuh-docker/multi-node/`` for the multi-node stack, change the password. Replace ``<USER>`` with the account name:

   -  **Wazuh indexer accounts** ``admin``, ``kibanaserver``, and ``wazuh-manager``. In the multi-node stack, replace ``wazuh.indexer`` with ``wazuh1.indexer``:

      .. code-block:: console

         # docker compose exec wazuh.indexer /password-tool.sh --user <USER>

   -  **Wazuh manager API accounts** ``wazuh`` and ``wazuh-internal-client``. In the multi-node stack, replace ``wazuh.manager`` with ``wazuh.master``:

      .. code-block:: console

         # docker compose exec wazuh.manager /password-tool.sh --user <USER>

   To choose the password yourself, pass it on standard input with the ``--stdin`` option. The example below changes a Wazuh indexer account. For a Wazuh manager API account, or in the multi-node stack, use the service name from the commands above:

   .. code-block:: console

      # printf '%s\n' '<PASSWORD>' | docker compose exec -T wazuh.indexer /password-tool.sh --user <USER> --stdin

   Replace ``<PASSWORD>`` with 12 to 64 characters from ``A-Z``, ``a-z``, ``0-9``, and the symbols ``. , _ + : @ % ^ = ~ -``. It needs at least one lowercase letter, one uppercase letter, one digit, and one symbol.

#. Run the commands the tool prints from the same directory. The components that use the account keep the password they stored, and these commands update the credential files and the keystores of those components.

   In the multi-node stack, the printed commands use the single-node service names. Replace them with the multi-node ones. For the ``wazuh-manager`` account, run the two ``sed`` commands once. The next three commands stop the Wazuh manager, write the new password to its keystore, and start it again. Run them for ``wazuh.master``, then again for ``wazuh.worker``. For ``wazuh.master``, they look like this, with your new password in place of ``<PASSWORD>``:

   .. code-block:: console

      # docker compose stop wazuh.master
      # printf '%s' '<PASSWORD>' | docker compose run --rm -T --no-deps --entrypoint /var/wazuh-manager/bin/wazuh-manager-keystore wazuh.master -f indexer -k password
      # docker compose start wazuh.master
