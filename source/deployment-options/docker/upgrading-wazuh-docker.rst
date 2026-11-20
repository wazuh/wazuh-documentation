.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to migrate a Wazuh 4.x Docker deployment to Wazuh 5.x in this section of our documentation.

Migrating a Wazuh Docker deployment from Wazuh 4.x to 5.x
=========================================================

This procedure moves a Wazuh 4.x single-node stack to a new Wazuh 5.0 single-node stack on the same Docker host. The Wazuh 4.x agents keep their agent IDs, names, keys, and groups, and connect to the Wazuh 5.0 manager without enrolling again. The steps use Wazuh 4.14.10 and Wazuh 5.0.0 RC 2.

A Wazuh 4.x deployment moves to Wazuh 5.0 as a new deployment with new volumes. The Wazuh 5.0 manager keeps its files in ``/var/wazuh-manager/`` and ``/etc/wazuh-manager/``, uses a new configuration format, and uses a new agent protocol. The ``wazuh-migrate-identity.py`` tool copies the agent registrations, the custom groups and their ``agent.conf`` files, and, optionally, the Wazuh manager API users, roles, and policies from the Wazuh 4.x volumes to the Wazuh 5.0 manager.

The Wazuh 4.x alerts and inventory data stay in the Wazuh 4.x indexer volume. To move the Wazuh manager configuration, rules, decoders, and custom dashboards, see the :doc:`/migration-to-5x/index`.

You need root user privileges to run the commands below. If you use Docker as a non-root user, run them with ``sudo``.

In the commands below, replace the following placeholders:

-  ``<WAZUH_4X_DIRECTORY>``: the directory where you cloned the Wazuh Docker repository for Wazuh 4.x, for example, ``/root/wazuh-4x``.
-  ``<WAZUH_4X_TAG>``: the image tag of your Wazuh 4.x stack, from the ``image`` field in ``<WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/docker-compose.yml``, for example, ``4.14.10``.
-  ``<WAZUH_5X_DIRECTORY>``: a new directory for the Wazuh 5.0 clone, for example, ``/root/wazuh-5``.
-  ``<DOCKER_HOST_IP>``: the address the Wazuh 4.x agents connect to, which is the address in the ``<client><server><address>`` section of their ``ossec.conf`` file.

Export the agent registrations from Wazuh 4.x
---------------------------------------------

#. Stop the Wazuh 4.x stack and list its volumes:

   .. code-block:: console

      # cd <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/
      # docker compose down
      # docker volume ls --filter name=wazuh_

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      DRIVER    VOLUME NAME
      local     single-node_wazuh_active_response
      local     single-node_wazuh_agentless
      local     single-node_wazuh_api_configuration
      local     single-node_wazuh_etc
      local     single-node_wazuh_integrations
      local     single-node_wazuh_logs
      local     single-node_wazuh_queue
      local     single-node_wazuh_var_multigroups
      local     single-node_wazuh_wodles

   Do not add the ``-v`` flag. It deletes the Wazuh 4.x volumes, and with them the agent registrations and the Wazuh 4.x indexed data. Docker Compose names the volumes after the directory of the stack. If your volumes have a prefix other than ``single-node_``, use it in step 3.

   The Wazuh 4.x agents keep running. Until the migration ends, they log ``(1216): Unable to connect`` and keep retrying.

#. Download the migration tool and create a directory for the export:

   .. code-block:: console

      # curl -fsSLo <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/wazuh-migrate-identity.py https://raw.githubusercontent.com/wazuh/wazuh/5.0.0/tools/migration/wazuh-migrate-identity.py
      # mkdir <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/wazuh-4x-bundle

#. Preview the export. The command runs the tool in a one-off container of your Wazuh 4.x manager image, with the Wazuh 4.x volumes mounted read-only:

   .. code-block:: console

      # docker run --rm --entrypoint /var/ossec/framework/python/bin/python3 \
        -v single-node_wazuh_etc:/var/ossec/etc:ro \
        -v single-node_wazuh_queue:/var/ossec/queue:ro \
        -v single-node_wazuh_api_configuration:/var/ossec/api/configuration:ro \
        -v <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/wazuh-migrate-identity.py:/wazuh-migrate-identity.py:ro \
        -v <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/wazuh-4x-bundle:/bundle \
        wazuh/wazuh-manager:<WAZUH_4X_TAG> /wazuh-migrate-identity.py export /bundle/identity --with-rbac --dry-run

   The ``--with-rbac`` option exports the Wazuh manager API users, roles, and policies. The output ends with a ``Review before going on`` list. It names the group files the tool leaves behind and the Wazuh 4.x manager settings to recreate on Wazuh 5.0.

#. Run the same command without ``--dry-run`` to export the agent registrations:

   .. code-block:: console

      # docker run --rm --entrypoint /var/ossec/framework/python/bin/python3 \
        -v single-node_wazuh_etc:/var/ossec/etc:ro \
        -v single-node_wazuh_queue:/var/ossec/queue:ro \
        -v single-node_wazuh_api_configuration:/var/ossec/api/configuration:ro \
        -v <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/wazuh-migrate-identity.py:/wazuh-migrate-identity.py:ro \
        -v <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/wazuh-4x-bundle:/bundle \
        wazuh/wazuh-manager:<WAZUH_4X_TAG> /wazuh-migrate-identity.py export /bundle/identity --with-rbac

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      Exported 1 agent(s) and 1 group(s) from 4.14.10
      Bundle: /bundle/identity
      It carries agent keys and API password hashes. Move it like a credential.

   The ``<WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/wazuh-4x-bundle/identity/`` directory holds agent keys and password hashes, and only root can read it. You delete it at the end of this procedure.

Deploy Wazuh 5.0
----------------

#. Clone the Wazuh Docker repository into a new directory, then go to its ``single-node`` directory:

   .. code-block:: console

      # mkdir -p <WAZUH_5X_DIRECTORY>
      # cd <WAZUH_5X_DIRECTORY>
      # git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|
      # cd wazuh-docker/single-node/

#. Set a Docker Compose project name for the Wazuh 5.0 stack. Do this before any ``docker compose`` command in this directory:

   .. code-block:: console

      # echo "COMPOSE_PROJECT_NAME=wazuh-5" > <WAZUH_5X_DIRECTORY>/wazuh-docker/single-node/.env

   The Wazuh 5.0 ``docker-compose.yml`` file uses the same volume names as Wazuh 4.x, such as ``wazuh_etc``. Under the default project name, ``single-node``, the Wazuh 5.0 stack mounts the Wazuh 4.x volumes. With ``wazuh-5``, its volumes are named ``wazuh-5_wazuh_etc`` and so on. Docker Compose reads the ``.env`` file in every later command from this directory, so keep the file.

#. Prepare the certificates and create the credentials, as described in :ref:`Prepare the certificates <multi-node-certificates>` and :ref:`Create the credentials <docker-create-credentials>` in :ref:`Single-node stack deployment <deploying-central-components>`. Run the commands from ``<WAZUH_5X_DIRECTORY>/wazuh-docker/single-node/``. Pass the address the Wazuh 4.x agents connect to with ``--agent-san <DOCKER_HOST_IP>``.

#. Start the Wazuh 5.0 stack without publishing the Wazuh manager ports, so no Wazuh agent reaches the Wazuh manager before the import. This step needs Docker Compose 2.24 or later:

   .. code-block:: console

      # printf 'services:\n  wazuh.manager:\n    ports: !reset []\n' > <WAZUH_5X_DIRECTORY>/wazuh-docker/single-node/docker-compose.migration.yml
      # docker compose -f docker-compose.yml -f docker-compose.migration.yml up -d

#. Wait until ``docker compose ps`` shows the three containers as ``(healthy)``. The ``PORTS`` column of the Wazuh manager shows no ``0.0.0.0`` address:

   .. code-block:: console

      # docker compose ps

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      NAME                          IMAGE                             STATUS                    PORTS
      single-node-wazuh.dashboard   wazuh/wazuh-dashboard:5.0.0-rc2   Up 22 seconds (healthy)   0.0.0.0:443->443/tcp, [::]:443->443/tcp
      single-node-wazuh.indexer     wazuh/wazuh-indexer:5.0.0-rc2     Up 58 seconds (healthy)   9200/tcp
      single-node-wazuh.manager     wazuh/wazuh-manager:5.0.0-rc2     Up 37 seconds (healthy)   1514-1517/tcp, 55000/tcp

Import the agent registrations
------------------------------

Run these commands from ``<WAZUH_5X_DIRECTORY>/wazuh-docker/single-node/``.

#. Copy the export and the migration tool into the Wazuh manager container:

   .. code-block:: console

      # docker compose cp <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/wazuh-4x-bundle/identity wazuh.manager:/tmp/identity
      # docker compose cp <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/wazuh-migrate-identity.py wazuh.manager:/tmp/

#. Preview the import. The tool reads the ``wazuh`` user password from standard input and connects to the Wazuh manager API inside the container:

   .. code-block:: console

      # sed -n 's/^WAZUH_MANAGER_API_PASSWORD=//p' <WAZUH_5X_DIRECTORY>/wazuh-docker/single-node/config/credentials/manager.env | \
        docker compose exec -T wazuh.manager /var/wazuh-manager/framework/python/bin/python3 \
        /tmp/wazuh-migrate-identity.py import /tmp/identity --with-rbac --api-password-file - --dry-run

   Use the same options as in the export. With ``--with-rbac``, the output starts with a warning that the ``wazuh`` and ``wazuh-internal-client`` users get their Wazuh 4.x passwords. You set them back in the next section.

#. Import the agent registrations:

   .. code-block:: console

      # sed -n 's/^WAZUH_MANAGER_API_PASSWORD=//p' <WAZUH_5X_DIRECTORY>/wazuh-docker/single-node/config/credentials/manager.env | \
        docker compose exec -T wazuh.manager /var/wazuh-manager/framework/python/bin/python3 \
        /tmp/wazuh-migrate-identity.py import /tmp/identity --with-rbac --api-password-file -

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      Inserted 1 of 1 agent(s), 1 group membership(s).

      Next: open the manager to the fleet, then run this tool's 'check'.

Open the Wazuh manager to the Wazuh agents
------------------------------------------

#. Start the stack without the ``docker-compose.migration.yml`` file. Docker recreates the Wazuh manager container with its ports published, and the copies in ``/tmp`` are removed:

   .. code-block:: console

      # docker compose up -d

#. If you used ``--with-rbac``, set the ``wazuh`` and ``wazuh-internal-client`` passwords back to the values in ``config/credentials/manager.env``. After the import, both users have their Wazuh 4.x passwords, and the Wazuh dashboard can't connect to the Wazuh manager API. The ``wazuh-internal-client`` user is the Wazuh 4.x ``wazuh-wui`` user:

   .. code-block:: console

      # sed -n 's/^WAZUH_MANAGER_API_PASSWORD=//p' <WAZUH_5X_DIRECTORY>/wazuh-docker/single-node/config/credentials/manager.env | \
        docker compose exec -T wazuh.manager /var/wazuh-manager/bin/rbac_control change-password -u wazuh -p -
      # sed -n 's/^WAZUH_MANAGER_WUI_PASSWORD=//p' <WAZUH_5X_DIRECTORY>/wazuh-docker/single-node/config/credentials/manager.env | \
        docker compose exec -T wazuh.manager /var/wazuh-manager/bin/rbac_control change-password -u wazuh-internal-client -p -

   The command output looks similar to this:

   .. code-block:: none
      :class: output

        wazuh: UPDATED
        wazuh-internal-client: UPDATED

   The Wazuh manager API users you created on Wazuh 4.x keep their Wazuh 4.x passwords and roles.

Verify the migration
--------------------

Run these commands from ``<WAZUH_5X_DIRECTORY>/wazuh-docker/single-node/``.

#. Compare the Wazuh manager with the export, then remove the copies from the container:

   .. code-block:: console

      # docker compose cp <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/wazuh-4x-bundle/identity wazuh.manager:/tmp/identity
      # docker compose cp <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/wazuh-migrate-identity.py wazuh.manager:/tmp/
      # sed -n 's/^WAZUH_MANAGER_API_PASSWORD=//p' <WAZUH_5X_DIRECTORY>/wazuh-docker/single-node/config/credentials/manager.env | \
        docker compose exec -T wazuh.manager /var/wazuh-manager/framework/python/bin/python3 \
        /tmp/wazuh-migrate-identity.py check /tmp/identity --api-password-file -
      # docker compose exec wazuh.manager rm -rf /tmp/identity /tmp/wazuh-migrate-identity.py

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      agents    1 of 1 present
      groups    1 of 1 present
      rbac.db   schema version 1

      The target matches the bundle.

#. Check that the Wazuh 4.x agents are active, with their Wazuh 4.x IDs, names, and groups:

   .. code-block:: console

      # TOKEN=$(curl -sk -u wazuh:"$(sed -n 's/^WAZUH_MANAGER_API_PASSWORD=//p' <WAZUH_5X_DIRECTORY>/wazuh-docker/single-node/config/credentials/manager.env)" -X POST "https://localhost:55000/security/user/authenticate?raw=true")
      # curl -sk -H "Authorization: Bearer $TOKEN" "https://localhost:55000/agents?select=id,name,status,group,version&pretty=true"

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      {
         "data": {
            "affected_items": [
               {
                  "status": "active",
                  "id": "001",
                  "name": "AmazonLinux2023",
                  "group": [
                     "default",
                     "docker-migration"
                  ],
                  "version": "v4.14.10"
               }
            ],
            "total_affected_items": 1,
            "total_failed_items": 0,
            "failed_items": []
         },
         "message": "All selected agents information was returned",
         "error": 0
      }

   The Wazuh 4.x agents connect to port ``1514`` of the Docker host with their existing keys, so they need no change. Their registration date is the time of the import.

#. Log in to the Wazuh dashboard as ``admin``, as described in :ref:`Accessing the Wazuh dashboard <docker-accessing-dashboard>`.

#. Delete the export, the migration tool, and the ``docker-compose.migration.yml`` file:

   .. code-block:: console

      # rm -rf <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/wazuh-4x-bundle <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/wazuh-migrate-identity.py
      # rm <WAZUH_5X_DIRECTORY>/wazuh-docker/single-node/docker-compose.migration.yml

After the migration
-------------------

The migrated stack uses the ``wazuh-5`` project name. Its volumes are named ``wazuh-5_wazuh_etc``, ``wazuh-5_wazuh-indexer-data``, and so on. Where this guide uses ``single-node`` in a volume name or a project label, as in :ref:`Wazuh service data volumes <docker-service-data-volumes>`, use ``wazuh-5`` instead.

The Wazuh 4.x agents send their log events to the Wazuh 5.0 manager. To upgrade them to Wazuh 5.0, see the :doc:`/migration-to-5x/index`. A Wazuh 4.x agent container keeps running from ``<WAZUH_4X_DIRECTORY>/wazuh-docker/wazuh-agent/``, so keep that directory while you use it.

The Wazuh 4.x alerts and inventory data stay in the ``single-node_wazuh-indexer-data`` volume. To search them, start the Wazuh 4.x indexer alone. It runs beside the Wazuh 5.0 stack:

.. code-block:: console

   # cd <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/
   # docker compose up -d wazuh.indexer

When you are done, stop it with ``docker compose down`` from the same directory.

When you no longer need the Wazuh 4.x data, remove the Wazuh 4.x volumes and images. The ``docker compose down -v`` command deletes only the volumes of the Wazuh 4.x stack, whose names start with ``single-node_``:

.. code-block:: console

   # cd <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/
   # docker compose down -v
   # docker image rm wazuh/wazuh-manager:<WAZUH_4X_TAG> wazuh/wazuh-indexer:<WAZUH_4X_TAG> wazuh/wazuh-dashboard:<WAZUH_4X_TAG>
