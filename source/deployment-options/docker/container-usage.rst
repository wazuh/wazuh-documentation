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

To back up the deployment, stop the stack with ``docker compose stop``, so that the databases are consistent. The backup holds the following:

-  The named volumes of the stack, which ``docker volume ls`` lists. In the multi-node stack, they include ``wazuh-cluster-key``, the key that the Wazuh manager nodes share.
-  ``config/credentials/``: the passwords of the deployment.
-  ``config/*/certs/``: the certificates that the containers mount.
-  ``wazuh-ca/``: the root CA and its private key. Git doesn't ignore this directory, so ``git clean -fd`` in the clone deletes it.

To back up a single-node deployment, run the following commands as root from ``wazuh-docker/single-node/``. The one-off containers use the ``ubuntu:24.04`` image, because the Wazuh images don't include ``tar``. The last two commands restrict the backup to root and start the stack again:

.. code-block:: console

   # docker compose stop
   # mkdir -p /root/wazuh-backup
   # for v in $(docker volume ls -q --filter label=com.docker.compose.project=single-node); do docker run --rm -v $v:/source:ro -v /root/wazuh-backup:/backup ubuntu:24.04 tar -C /source --numeric-owner -czpf /backup/$v.tar.gz . ; done
   # tar -czpf /root/wazuh-backup/files.tar.gz config/credentials config/*/certs wazuh-ca
   # chmod 700 /root/wazuh-backup
   # docker compose start

For the ``wazuh_queue`` volume, ``tar`` prints ``socket ignored`` for five files in ``sockets/``. The Wazuh manager creates these sockets again when it starts.

To restore the deployment, run the following commands as root from the same directory. On a new Docker host, first clone the same release of the Wazuh Docker repository:

.. code-block:: console

   # tar -xzpf /root/wazuh-backup/files.tar.gz
   # docker compose create
   # for v in $(docker volume ls -q --filter label=com.docker.compose.project=single-node); do docker run --rm -v $v:/target -v /root/wazuh-backup:/backup:ro ubuntu:24.04 tar -C /target --numeric-owner -xzpf /backup/$v.tar.gz ; done
   # docker compose start

The label filter selects the volumes of the stack, because Docker Compose names the project after its directory. It leaves out the ``wazuh-agent_wazuh_agent_etc`` volume of a Wazuh agent container, which ``docker volume ls`` also lists.

Adding a custom volume
^^^^^^^^^^^^^^^^^^^^^^

To keep another path of a container when Docker recreates it, add an entry for that path to the ``volumes`` section of the service, with a new volume name, and declare the name in the top-level ``volumes`` section of your ``docker-compose.yml`` file. The ``volumes`` the stack already has use this format. For example, these are the entries that keep the Wazuh manager API configuration:

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

To use your own ``opensearch.yml`` or ``opensearch_dashboards.yml``, start from the file that the running container uses. A file written from scratch lacks settings that the container needs, such as its TLS paths and security plugin settings. From the directory of your stack, copy the file out of the container. For the Wazuh dashboard, run:

.. code-block:: console

   # docker compose cp wazuh.dashboard:/usr/share/wazuh-dashboard/config/opensearch_dashboards.yml ./opensearch_dashboards.yml

For the Wazuh indexer, run:

.. code-block:: console

   # docker compose cp wazuh.indexer:/usr/share/wazuh-indexer/config/opensearch.yml ./opensearch.yml

These commands use the service names of the single-node stack. Edit the file, then add its line to the volumes section of the service: the first line for ``wazuh.dashboard``, the second one for ``wazuh.indexer``.

.. code-block:: yaml

   - ./opensearch_dashboards.yml:/usr/share/wazuh-dashboard/config/opensearch_dashboards.yml
   - ./opensearch.yml:/usr/share/wazuh-indexer/config/opensearch.yml

To use your own ``opensearch.yml`` or ``opensearch_dashboards.yml``, mount it in the ``volumes`` section of the service, at ``/usr/share/wazuh-indexer/config/opensearch.yml`` or ``/usr/share/wazuh-dashboard/config/opensearch_dashboards.yml``. The file must be owned by ``root``, with group ``101`` and mode ``0640``. Run the following commands on the Docker host before you start the stack or apply the change. Replace ``<FILE>`` with the path of your file:

.. code-block:: console

   # chown 0:101 <FILE>
   # chmod 640 <FILE>

Otherwise, the container won't start, and Docker will restart it in a loop. ``docker compose logs <SERVICE>`` shows ``UNSAFE <PATH>: <REASON>``. The container keeps the owner and mode of the mounted file. Settings in the ``environment`` section of the service take precedence over the same settings in the file. At every start, the Wazuh dashboard container also writes the following settings into its file, from the environment variable in brackets or, when that variable is not set, from its default value: ``server.host`` (``SERVER_HOST``), ``server.port`` (``SERVER_PORT``), ``opensearch.hosts`` (``OPENSEARCH_HOSTS``), ``opensearch.ssl.verificationMode`` (``OPENSEARCH_SSL_VERIFICATION_MODE``), ``opensearch.requestHeadersAllowlist`` (``OPENSEARCH_REQUEST_HEADERS_ALLOWLIST``), ``opensearch_security.multitenancy.enabled`` (``OPENSEARCH_SECURITY_MULTITENANCY_ENABLED``), ``opensearch_security.readonly_mode.roles`` (``OPENSEARCH_SECURITY_READONLY_MODE_ROLES``), ``server.ssl.enabled`` (``SERVER_SSL_ENABLED``), ``server.ssl.key`` (``SERVER_SSL_KEY``), ``server.ssl.certificate`` (``SERVER_SSL_CERTIFICATE``), ``opensearch.ssl.certificateAuthorities`` (``OPENSEARCH_SSL_CERTIFICATE_AUTHORITIES``), ``uiSettings.overrides.defaultRoute`` (``UI_SETTINGS_OVERRIDES_DEFAULT_ROUTE``), ``opensearch_security.cookie.ttl`` (``OPENSEARCH_SECURITY_COOKIE_TTL``), ``opensearch_security.session.ttl`` (``OPENSEARCH_SECURITY_SESSION_TTL``), ``opensearch_security.session.keepalive`` (``OPENSEARCH_SECURITY_SESSION_KEEPALIVE``), and the url, port, username, run_as, and ca of every ``wazuh_core.hosts`` entry (``WAZUH_API_URL``, ``API_PORT``, ``API_USERNAME``, ``RUN_AS``, and ``WAZUH_API_CA``). To change one of these settings, set its variable in the environment section of the service, not in the file.

To apply the change, run the following command from the directory of your stack:

.. code-block:: console

   # docker compose up -d

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
