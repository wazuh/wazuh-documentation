.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Transition the Wazuh agent registrations of a Wazuh 4.x deployment that runs on Docker or Kubernetes to a new Wazuh 5.x deployment, and recreate its configuration.

Docker and Kubernetes deployments
=================================

Use the following procedures to move the Wazuh agent registrations of a Wazuh 4.x deployment that runs on Docker or Kubernetes to a new Wazuh 5.x deployment.

Docker deployments
------------------

This procedure deploys a new Wazuh 5.x single-node stack on the same Docker host as your Wazuh 4.x single-node stack, and moves the Wazuh agent registrations to it. The Wazuh 4.x agents keep their IDs, names, keys, and groups, and connect to the Wazuh 5.x manager without enrolling again.

Deploy Wazuh 5.x as a new stack instead of upgrading the Wazuh 4.x Docker deployment in place. The Wazuh 5.x manager keeps its files in ``/var/wazuh-manager/`` and ``/etc/wazuh-manager/``, uses a new configuration format, and uses a new Wazuh agent protocol. The transition doesn't move the Wazuh 4.x configuration, rules, decoders, or indexed data. The Recreate the configuration and Indexed data subsections describe what to do with them.

Transition to Wazuh 5.x
^^^^^^^^^^^^^^^^^^^^^^^

This procedure connects your Wazuh agents to Wazuh 5.x without enrolling them again. You export the Wazuh agent registrations from the Wazuh 4.x stack, deploy a Wazuh 5.x stack prepared for the transition, and import the registrations into it. After the import, you connect the Wazuh agents to the Wazuh 5.x manager and check that they reconnect with their existing identities. The ``wazuh-migrate-identity.py`` tool handles the export and the import. Along with the registrations, it carries over the custom groups, their ``agent.conf`` files and the SCA policy files that they load, the settings of a customized default ``agent.conf``, and, optionally, the Wazuh manager API users, roles, and policies.

Prerequisites
~~~~~~~~~~~~~

You need root privileges to run the commands in this section. If you use Docker as a non-root user, run them with ``sudo``.

Replace the following placeholders in the commands of this section:

-  ``<WAZUH_4X_DIRECTORY>``: the directory where you cloned the Wazuh Docker repository for Wazuh 4.x, for example, ``/root/wazuh-4x``.
-  ``<WAZUH_4X_TAG>``: the image tag of your Wazuh 4.x stack, from the ``image`` field in ``<WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/docker-compose.yml``, for example, ``4.14.10``.
-  ``<WAZUH_5X_DIRECTORY>``: a new directory for the Wazuh 5.x clone, for example, ``/root/wazuh-5``.
-  ``<DOCKER_HOST_IP>``: the address that the Wazuh 4.x agents connect to, which is the address in the ``<client><server><address>`` section of their ``ossec.conf`` file.

.. note::

   On a multi-node deployment, use the volumes and the service of the master node: ``master-wazuh-etc``, ``master-wazuh-queue``, ``master-wazuh-api-configuration``, and ``wazuh.master``. Because the nginx service publishes the Wazuh agent ports, reset the ports of both ``wazuh.master`` and ``nginx`` in the override file of the Deploy Wazuh 5.x for the transition step.

Export the Wazuh agent registrations from Wazuh 4.x
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

   Don't add the ``-v`` flag to ``docker compose down``. It deletes the Wazuh 4.x volumes, and with them the Wazuh agent registrations and the Wazuh 4.x indexed data. Docker Compose names the volumes after the directory of the stack. If your volumes have a prefix other than ``single-node_``, use it in step 3.

   The Wazuh 4.x agents keep running. Until the transition ends, they log ``(1216): Unable to connect`` and keep retrying.

#. Download the migration tool and create a directory for the export:

   .. code-block:: console

      # curl -fsSLo <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/wazuh-migrate-identity.py https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|/tools/migration/wazuh-migrate-identity.py
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

   The ``--with-rbac`` option exports the Wazuh manager API users, roles, and policies. Add ``--with-password`` to also export the enrollment password, which Wazuh 4.x agents use only if they still need to enroll. The output ends with a ``Review before going on`` list. It names the group files that the tool doesn't migrate and the Wazuh 4.x manager settings to recreate in Wazuh 5.x.

#. Run the same command without ``--dry-run`` to export the Wazuh agent registrations:

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

   The ``<WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/wazuh-4x-bundle/identity/`` directory contains Wazuh agent keys and password hashes, and only root can read it. Handle it as a credential. You delete it at the end of this procedure.

Deploy Wazuh 5.x for the transition
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Clone the Wazuh Docker repository into a new directory, then go to its ``single-node`` directory:

   .. code-block:: console

      # mkdir -p <WAZUH_5X_DIRECTORY>
      # cd <WAZUH_5X_DIRECTORY>
      # git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|
      # cd wazuh-docker/single-node/

#. Set a Docker Compose project name for the Wazuh 5.x stack. Do this before you run any ``docker compose`` command in this directory:

   .. code-block:: console

      # echo "COMPOSE_PROJECT_NAME=wazuh-5" > <WAZUH_5X_DIRECTORY>/wazuh-docker/single-node/.env

   The Wazuh 5.x ``docker-compose.yml`` file uses the same volume names as Wazuh 4.x, such as ``wazuh_etc``. Under the default project name, ``single-node``, the Wazuh 5.x stack would mount the Wazuh 4.x volumes. With the ``wazuh-5`` project name, its volumes are named ``wazuh-5_wazuh_etc`` and so on. Docker Compose reads the ``.env`` file in every later command that you run from this directory. Keep the file.

#. Prepare the certificates and create the credentials, as described in :ref:`Prepare the certificates <multi-node-certificates>` and :ref:`Create the credentials <docker-create-credentials>` in the single-node stack deployment. Run the commands from ``<WAZUH_5X_DIRECTORY>/wazuh-docker/single-node/``. Pass the address that the Wazuh 4.x agents connect to with ``--agent-san <DOCKER_HOST_IP>``.

#. Start the Wazuh 5.x stack without publishing the Wazuh manager ports. This prevents Wazuh agents from reaching the Wazuh manager before the import. This step requires Docker Compose 2.24 or later:

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
      single-node-wazuh.dashboard   wazuh/wazuh-dashboard:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|   Up 22 seconds (healthy)   0.0.0.0:443->443/tcp, [::]:443->443/tcp
      single-node-wazuh.indexer     wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|     Up 58 seconds (healthy)   9200/tcp
      single-node-wazuh.manager     wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|     Up 37 seconds (healthy)   1514-1517/tcp, 55000/tcp

Import the Wazuh agent registrations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

#. Import the Wazuh agent registrations:

   .. code-block:: console

      # sed -n 's/^WAZUH_MANAGER_API_PASSWORD=//p' <WAZUH_5X_DIRECTORY>/wazuh-docker/single-node/config/credentials/manager.env | \
        docker compose exec -T wazuh.manager /var/wazuh-manager/framework/python/bin/python3 \
        /tmp/wazuh-migrate-identity.py import /tmp/identity --with-rbac --api-password-file -

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      Inserted 1 of 1 agent(s), 1 group membership(s).

      Next: open the manager to the fleet, then run this tool's 'check'.

Connect the Wazuh agents to Wazuh 5.x
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Follow the steps below to configure the Wazuh 5.x stack to accept connections from the Wazuh agents. The Wazuh agents then reconnect with their existing keys, without enrolling again.

#. Stop the Wazuh manager with a 120-second timeout, then start the stack without the ``docker-compose.migration.yml`` file. Docker recreates the Wazuh manager container with its ports published and removes the copies in ``/tmp``. On a multi-node deployment, stop ``wazuh.master`` instead:

   .. code-block:: console

      # docker compose stop -t 120 wazuh.manager
      # docker compose up -d

   .. note::

      The Wazuh manager saves the imported group memberships to its database only when it stops cleanly, which takes about a minute. By default, Docker kills a container 10 seconds after asking it to stop. With a plain ``docker compose up -d`` or ``restart``, every Wazuh agent can end up in the ``default`` group only.

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

   The Wazuh manager API users that you created in Wazuh 4.x keep their Wazuh 4.x passwords and roles.

Verify the migration
~~~~~~~~~~~~~~~~~~~~

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

   The Wazuh 4.x agents connect to port ``1514`` of the Docker host with their existing keys and need no changes. Their registration date is the date of the import.

#. Log in to the Wazuh dashboard as ``admin``, as described in :ref:`Accessing the Wazuh dashboard <docker-accessing-dashboard>`.

#. Delete the export, the migration tool, and the ``docker-compose.migration.yml`` file:

   .. code-block:: console

      # rm -rf <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/wazuh-4x-bundle <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/wazuh-migrate-identity.py
      # rm <WAZUH_5X_DIRECTORY>/wazuh-docker/single-node/docker-compose.migration.yml

After the transition
^^^^^^^^^^^^^^^^^^^^

The Wazuh 5.x stack uses the ``wazuh-5`` project name. Its volumes are named ``wazuh-5_wazuh_etc``, ``wazuh-5_wazuh-indexer-data``, and so on. Where the Docker deployment documentation uses ``single-node`` in a volume name or a project label, use ``wazuh-5`` instead.

The Wazuh 4.x agents send their log events to the Wazuh 5.x manager. To upgrade them to Wazuh 5.x, see :ref:`Upgrade the migrated Wazuh agents <migration_upgrade_migrated_wazuh_agents>`. A Wazuh 4.x agent container keeps running from ``<WAZUH_4X_DIRECTORY>/wazuh-docker/wazuh-agent/``. Keep that directory while you use the Wazuh agent container.

Recreate the configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh 5.x uses new configuration files. Recreate the settings you need as described in the :doc:`Wazuh indexer <wazuh-indexer>`, :doc:`Wazuh manager <wazuh-manager>`, and :doc:`Wazuh dashboard <wazuh-dashboard>` sections. Read the running Wazuh 4.x configuration from the ``wazuh_etc`` volume, not from ``config/wazuh_cluster/``. While Wazuh 4.x is stopped, read the volumes with a one-off container of the Wazuh 4.x image, with the volumes mounted read-only, as in step 3 of Export the Wazuh agent registrations from Wazuh 4.x. The Wazuh 4.x files go to the following places in Wazuh 5.x:

-  ``ossec.conf`` and ``local_internal_options.conf`` (``wazuh_etc`` volume): recreate them as ``wazuh-manager.conf`` and ``wazuh-manager-internal-options.conf``, and mount ``wazuh-manager.conf`` at ``/wazuh-config-mount/etc/wazuh-manager.conf``.
-  ``api.yaml`` (``wazuh_api_configuration`` volume): mount the Wazuh 5.x file at ``/wazuh-config-mount/api/configuration/api.yaml``.
-  Rules, decoders, and CDB lists (``wazuh_etc`` volume): recreate them with the Wazuh content management, as described in :doc:`Data analysis </user-manual/data-analysis/data-analysis-components>`.
-  ``config/wazuh_indexer/wazuh.indexer.yml``: set the settings as environment variables of the indexer service, or mount a Wazuh 5.x ``opensearch.yml``. Don't reuse the Wazuh 4.x file, because it names other certificate files.
-  ``config/wazuh_indexer/internal_users.yml``: Wazuh 5.x doesn't mount this file. The default users take their passwords from ``config/credentials/indexer.env``. Create your own users through the security API.
-  ``config/wazuh_dashboard/opensearch_dashboards.yml``: set the settings as environment variables of the dashboard service, or mount a Wazuh 5.x file at the same path.
-  ``config/wazuh_dashboard/wazuh.yml``: Wazuh 5.x has no ``wazuh.yml``. Set the Wazuh manager API URL with ``WAZUH_API_URL``.

On a multi-node deployment, the Wazuh manager files are on the ``master-wazuh-etc`` and ``master-wazuh-api-configuration`` volumes, and the indexer files are ``wazuh1.indexer.yml`` to ``wazuh3.indexer.yml``.

A file that you mount into the Wazuh 5.x indexer or dashboard must be owned by ``root``, group ``101``, with mode ``0640``. Otherwise, the container stops with ``UNSAFE <PATH>``. Validate the Wazuh manager configuration before you restart the Wazuh manager. If the configuration is valid, the command prints ``configuration is valid``.

.. code-block:: console

   # docker compose exec wazuh.manager /var/wazuh-manager/bin/wazuh-manager-conf validate

The command output looks similar to this:

.. code-block:: none
   :class: output

   /etc/wazuh-manager/wazuh-manager.conf: configuration is valid.

The Wazuh 4.x dashboard checked only the certificate chain of the Wazuh indexer. The Wazuh 5.x dashboard also verifies the Wazuh indexer hostname, because ``OPENSEARCH_SSL_VERIFICATION_MODE`` defaults to ``full``. If you keep the default ``OPENSEARCH_HOSTS`` value, no change is needed. If you change it, check that every host it lists is in the Wazuh indexer certificate. Run this command from ``<WAZUH_5X_DIRECTORY>/wazuh-docker/single-node/``:

.. code-block:: console

   # openssl x509 -in config/wazuh_indexer/certs/wazuh.indexer.pem -noout -ext subjectAltName

On a multi-node deployment, check ``config/wazuh1_indexer/certs/wazuh1.indexer.pem`` to ``config/wazuh3_indexer/certs/wazuh3.indexer.pem`` the same way.

Indexed data
^^^^^^^^^^^^

The Wazuh 5.x indexer uses new index schemas. The Wazuh 4.x alerts and inventory data stay in the ``single-node_wazuh-indexer-data`` volume. To search them, start the Wazuh 4.x indexer on its own. It runs beside the Wazuh 5.x stack:

.. code-block:: console

   # cd <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/
   # docker compose up -d wazuh.indexer

When you're done, stop it with ``docker compose down`` from the same directory.

When you no longer need the Wazuh 4.x data, remove the Wazuh 4.x volumes and images. The ``docker compose down -v`` command deletes only the volumes of the Wazuh 4.x stack, whose names start with ``single-node_``:

.. code-block:: console

   # cd <WAZUH_4X_DIRECTORY>/wazuh-docker/single-node/
   # docker compose down -v
   # docker image rm wazuh/wazuh-manager:<WAZUH_4X_TAG> wazuh/wazuh-indexer:<WAZUH_4X_TAG> wazuh/wazuh-dashboard:<WAZUH_4X_TAG>

.. _migration_kubernetes_deployments:

Kubernetes deployments
----------------------

This procedure moves the Wazuh agent registrations of a Wazuh 4.x Kubernetes deployment to a new Wazuh 5.x deployment in another namespace of the same cluster. The Wazuh 4.x agents keep their IDs, names, keys, and groups, and connect to the Wazuh 5.x manager without enrolling again.

Deploy Wazuh 5.x as a new deployment instead of upgrading the Wazuh 4.x Kubernetes deployment in place. The Wazuh 4.x manifests differ from the Wazuh 5.x manifests in ways that ``kubectl apply`` can't reconcile:

-  The Wazuh 4.x components take their credentials from the ``indexer-cred``, ``dashboard-cred``, and ``wazuh-api-cred`` Secrets and from environment variables. The Wazuh 5.x components don't read them.
-  The Wazuh 4.x manager claims use the ``wazuh/var/ossec/*`` subPaths, and Wazuh 5.x uses ``wazuh/var/wazuh-manager/*``. A Wazuh 5.x manager on a Wazuh 4.x claim doesn't see the Wazuh 4.x data.
-  The Wazuh 4.x indexer StatefulSet doesn't set ``podManagementPolicy: Parallel``, and Kubernetes doesn't allow changing this field on an existing StatefulSet.

The Wazuh 5.x manifests use the ``wazuh`` namespace and the same workload names as Wazuh 4.x. Don't apply them to the namespace of a running Wazuh 4.x deployment. ``kubectl apply -k`` replaces the Wazuh manager and Wazuh dashboard with Wazuh 5.x components that don't start, fails on the Wazuh indexer StatefulSet, and stops the Wazuh 4.x deployment. The following steps deploy Wazuh 5.x in the ``wazuh-5`` namespace.

Transition to Wazuh 5.x
^^^^^^^^^^^^^^^^^^^^^^^

This procedure connects your Wazuh agents to Wazuh 5.x without enrolling them again. You export the Wazuh agent registrations from the Wazuh 4.x deployment, deploy a Wazuh 5.x deployment prepared for the transition, and import the registrations into it. After the import, you connect the Wazuh agents to the Wazuh 5.x manager and check that they reconnect with their existing identities. The ``wazuh-migrate-identity.py`` tool handles the export and the import. Along with the registrations, it carries over the custom groups, their ``agent.conf`` files and the SCA policy files that they load, the settings of a customized default ``agent.conf``, and, optionally, the Wazuh manager API users, roles, and policies.

Prerequisites
~~~~~~~~~~~~~

Replace the following placeholders in the commands of this section:

-  ``<WAZUH_4X_TAG>``: the image tag of your Wazuh 4.x manager, for example, ``4.14.10``.
-  ``<OVERLAY>``: the Kustomize overlay that you deploy with ``eks`` or ``local-env``.

.. note::

   The Wazuh 5.x manager image has no ``python3`` on its ``PATH`` and no ``tar``. The following steps run the tool with the Python that the Wazuh manager bundles, and copy files with ``kubectl exec -i``, because ``kubectl cp`` needs ``tar`` in the container.

Export the Wazuh agent registrations from Wazuh 4.x
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Stop the Wazuh 4.x managers. Scaling the StatefulSets to zero keeps their claims, which hold the Wazuh agent registrations:

   .. code-block:: console

      $ kubectl -n wazuh scale statefulset wazuh-manager-master wazuh-manager-worker --replicas=0
      $ kubectl -n wazuh wait --for=delete pod -l app=wazuh-manager --timeout=300s

   The ``wazuh`` and ``wazuh-workers`` load balancers keep their addresses, with no endpoints behind them. The Wazuh 4.x agents log ``(1137): Lost connection with manager`` and keep retrying. A Wazuh agent that can't connect tries to enroll again. Make sure that it doesn't reach a Wazuh manager before you import the registrations.

#. Download the migration tool and store it in a ConfigMap that a pod can mount:

   .. code-block:: console

      $ curl -fsSLo wazuh-migrate-identity.py https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|/tools/migration/wazuh-migrate-identity.py
      $ kubectl -n wazuh create configmap wazuh-migrate-identity --from-file=wazuh-migrate-identity.py

#. Create a one-off pod of your Wazuh 4.x manager image. It mounts the master claim read-only, with the same subPaths as the Wazuh 4.x manager, and the migration tool:

   .. code-block:: console

      $ cat > wazuh-4x-export.yaml <<'EOT'
      apiVersion: v1
      kind: Pod
      metadata:
        name: wazuh-4x-export
      spec:
        restartPolicy: Never
        containers:
          - name: export
            image: wazuh/wazuh-manager:<WAZUH_4X_TAG>
            command: ["sleep", "3600"]
            volumeMounts:
              - {name: master, mountPath: /var/ossec/etc, subPath: wazuh/var/ossec/etc, readOnly: true}
              - {name: master, mountPath: /var/ossec/queue, subPath: wazuh/var/ossec/queue, readOnly: true}
              - {name: master, mountPath: /var/ossec/api/configuration, subPath: wazuh/var/ossec/api/configuration, readOnly: true}
              - {name: tool, mountPath: /opt/migration}
        volumes:
          - name: master
            persistentVolumeClaim:
              claimName: wazuh-manager-master-wazuh-manager-master-0
          - name: tool
            configMap:
              name: wazuh-migrate-identity
      EOT
      $ kubectl -n wazuh apply -f wazuh-4x-export.yaml
      $ kubectl -n wazuh wait --for=condition=Ready pod/wazuh-4x-export --timeout=300s

#. Preview the export:

   .. code-block:: console

      $ kubectl -n wazuh exec wazuh-4x-export -- /var/ossec/framework/python/bin/python3 \
        /opt/migration/wazuh-migrate-identity.py export /tmp/identity --with-rbac --dry-run

   The ``--with-rbac`` option exports the Wazuh manager API users, roles, and policies. Add ``--with-password`` to also export the enrollment password, which Wazuh 4.x agents use only if they still need to enroll. The output ends with a ``Review before going on`` list. It names the group files that the tool doesn't migrate and the Wazuh 4.x manager settings to recreate in Wazuh 5.x.

#. Export the Wazuh agent registrations, copy the export to your computer as ``wazuh-4x-identity.tar``, then delete the pod and the ConfigMap:

   .. code-block:: console

      $ kubectl -n wazuh exec wazuh-4x-export -- /var/ossec/framework/python/bin/python3 \
        /opt/migration/wazuh-migrate-identity.py export /tmp/identity --with-rbac
      $ kubectl -n wazuh exec wazuh-4x-export -- tar -C /tmp -cf - identity > wazuh-4x-identity.tar
      $ kubectl -n wazuh delete pod wazuh-4x-export
      $ kubectl -n wazuh delete configmap wazuh-migrate-identity

   The ``wazuh-4x-identity.tar`` file contains Wazuh agent keys and password hashes. Handle it as a credential. You delete it at the end of this procedure.

Deploy Wazuh 5.x for the transition
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Deploy Wazuh 5.x in the ``wazuh-5`` namespace, as described in :doc:`Deploying Wazuh on Kubernetes </deployment-options/deploying-with-kubernetes/kubernetes-deployment>`, with the changes in the following steps. Use ``-n wazuh-5`` wherever the deployment procedure uses ``-n wazuh``.

#. Before you apply the Traefik runtime, make Traefik watch the ``wazuh-5`` namespace:

   .. code-block:: console

      $ sed -i 's/kubernetescrd.namespaces=wazuh"/kubernetescrd.namespaces=wazuh-5"/' traefik/runtime/traefik-deployment.yaml

#. In ``config.yml``, replace ``wazuh`` with ``wazuh-5`` in every ``*.wazuh.svc.cluster.local`` name. The Wazuh indexer nodes verify each other against ``wazuh-indexer-<N>.wazuh-indexer.<NAMESPACE>.svc.cluster.local``. The certificates must include the new namespace.

#. Apply your overlay through another overlay that sets the namespace:

   .. code-block:: console

      $ mkdir -p envs/wazuh-5
      $ printf 'resources:\n  - ../<OVERLAY>\nnamespace: wazuh-5\n' > envs/wazuh-5/kustomization.yml
      $ kubectl apply -k envs/wazuh-5/

#. If you check the credentials as part of the deployment procedure, add ``--namespace wazuh-5`` to the check.

   Don't change the address that the Wazuh 4.x agents use yet. Until you connect them to the Wazuh 5.x manager, they keep trying the Wazuh 4.x load balancers, which have no endpoints. As a result, no Wazuh agent reaches the Wazuh 5.x manager before the import.

Import the Wazuh agent registrations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Copy the migration tool and the export into the Wazuh 5.x master pod:

   .. code-block:: console

      $ PY=/var/wazuh-manager/framework/python/bin/python3
      $ kubectl -n wazuh-5 exec -i wazuh-manager-master-0 -c wazuh-manager -- \
        sh -c 'cat > /tmp/wazuh-migrate-identity.py' < wazuh-migrate-identity.py
      $ kubectl -n wazuh-5 exec -i wazuh-manager-master-0 -c wazuh-manager -- \
        $PY -c 'import sys, tarfile; tarfile.open(fileobj=sys.stdin.buffer, mode="r|").extractall("/tmp", filter="data")' \
        < wazuh-4x-identity.tar

#. Preview the import. The tool reads the ``wazuh`` user password from ``/run/secrets/wazuh-credentials`` in the master pod, and connects to the Wazuh manager API inside the pod:

   .. code-block:: console

      $ kubectl -n wazuh-5 exec wazuh-manager-master-0 -c wazuh-manager -- sh -c \
        "sed -n 's/^WAZUH_MANAGER_API_PASSWORD=//p' /run/secrets/wazuh-credentials | \
         $PY /tmp/wazuh-migrate-identity.py import /tmp/identity --with-rbac --api-password-file - --dry-run"

   Use the same options as in the export. With ``--with-rbac``, the output starts with a warning that the ``wazuh`` and ``wazuh-internal-client`` users get their Wazuh 4.x passwords. You set them back in the next section.

#. Import the Wazuh agent registrations:

   .. code-block:: console

      $ kubectl -n wazuh-5 exec wazuh-manager-master-0 -c wazuh-manager -- sh -c \
        "sed -n 's/^WAZUH_MANAGER_API_PASSWORD=//p' /run/secrets/wazuh-credentials | \
         $PY /tmp/wazuh-migrate-identity.py import /tmp/identity --with-rbac --api-password-file -"

   The output ends with ``Inserted N of N agent(s)``, where ``N`` is the number of exported Wazuh agents.

Connect the Wazuh agents to Wazuh 5.x
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Follow the steps below to configure the Wazuh 5.x deployment to accept connections from the Wazuh agents, and to point the Wazuh agents to it. The Wazuh agents then reconnect with their existing keys, without enrolling again.

#. Restart the Wazuh 5.x master pod. With ``--with-rbac``, the Wazuh manager API loads the imported users when it starts. The restart also empties ``/tmp``:

   .. code-block:: console

      $ kubectl -n wazuh-5 delete pod wazuh-manager-master-0
      $ kubectl -n wazuh-5 wait --for=condition=Ready pod/wazuh-manager-master-0 --timeout=600s

#. If you used ``--with-rbac``, set the ``wazuh`` and ``wazuh-internal-client`` passwords back to the Wazuh 5.x values. After the import, both users have their Wazuh 4.x passwords, and the Wazuh dashboard can't connect to the Wazuh manager API:

   .. code-block:: console

      $ kubectl -n wazuh-5 exec wazuh-manager-master-0 -c wazuh-manager -- sh -c \
        "sed -n 's/^WAZUH_MANAGER_API_PASSWORD=//p' /run/secrets/wazuh-credentials | /var/wazuh-manager/bin/rbac_control change-password -u wazuh -p -"
      $ kubectl -n wazuh-5 exec wazuh-manager-master-0 -c wazuh-manager -- sh -c \
        "sed -n 's/^WAZUH_MANAGER_WUI_PASSWORD=//p' /run/secrets/wazuh-credentials | /var/wazuh-manager/bin/rbac_control change-password -u wazuh-internal-client -p -"

   The Wazuh manager API users that you created in Wazuh 4.x keep their Wazuh 4.x passwords and roles.

#. Get the address of the Traefik load balancer, which serves the Wazuh agent ports ``1514`` and ``1515``:

   .. code-block:: console

      $ kubectl -n traefik get svc traefik -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'

#. Point the Wazuh 4.x agents to that address. Change the DNS record that the Wazuh agents resolve, or the ``<address>`` setting in their configuration. The Wazuh agents connect with their existing keys, without enrolling again.

Verify the migration
~~~~~~~~~~~~~~~~~~~~

#. Copy the migration tool and the export into the master pod again, because the restart emptied ``/tmp``, then compare the Wazuh manager with the export:

   .. code-block:: console

      $ PY=/var/wazuh-manager/framework/python/bin/python3
      $ kubectl -n wazuh-5 exec -i wazuh-manager-master-0 -c wazuh-manager -- \
        sh -c 'cat > /tmp/wazuh-migrate-identity.py' < wazuh-migrate-identity.py
      $ kubectl -n wazuh-5 exec -i wazuh-manager-master-0 -c wazuh-manager -- \
        $PY -c 'import sys, tarfile; tarfile.open(fileobj=sys.stdin.buffer, mode="r|").extractall("/tmp", filter="data")' \
        < wazuh-4x-identity.tar
      $ kubectl -n wazuh-5 exec wazuh-manager-master-0 -c wazuh-manager -- sh -c \
        "sed -n 's/^WAZUH_MANAGER_API_PASSWORD=//p' /run/secrets/wazuh-credentials | \
         $PY /tmp/wazuh-migrate-identity.py check /tmp/identity --api-password-file -"

   The output ends with ``The target matches the bundle.``

#. Check the Wazuh manager log for the Wazuh agents that connect with their keys:

   .. code-block:: console

      $ kubectl -n wazuh-5 exec wazuh-manager-master-0 -c wazuh-manager -- grep 'agent key' /var/wazuh-manager/logs/wazuh-manager.log

   In the Wazuh dashboard, the Wazuh 4.x agents appear as active, with their Wazuh 4.x IDs, names, and groups. Their registration date is the date of the import.

#. Delete the copies in the master pod and the export on your computer:

   .. code-block:: console

      $ kubectl -n wazuh-5 exec wazuh-manager-master-0 -c wazuh-manager -- rm -rf /tmp/identity /tmp/wazuh-migrate-identity.py
      $ rm -f wazuh-4x-identity.tar wazuh-4x-export.yaml

After the transition
^^^^^^^^^^^^^^^^^^^^

Keep the ``wazuh`` namespace and its claims until the transition is complete. To upgrade the Wazuh 4.x agents to Wazuh 5.x, see :ref:`Upgrade the migrated Wazuh agents <migration_upgrade_migrated_wazuh_agents>`.

Recreate the configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh 5.x uses new configuration files. Recreate the settings you need as described in the :doc:`Wazuh indexer <wazuh-indexer>`, :doc:`Wazuh manager <wazuh-manager>`, and :doc:`Wazuh dashboard <wazuh-dashboard>` sections. Read the Wazuh 4.x files from the master claim, with a one-off pod as in step 3 of Export the Wazuh agent registrations from Wazuh 4.x, or from your Wazuh 4.x checkout. The Wazuh 4.x files go to the following places in Wazuh 5.x:

-  ``ossec.conf`` (ConfigMap ``wazuh-conf``): recreate it as ``/etc/wazuh-manager/wazuh-manager.conf`` on the claim of each Wazuh manager.
-  Rules, decoders, and CDB lists (master claim): recreate them with the Wazuh content management, as described in :doc:`Data analysis </user-manual/data-analysis/data-analysis-components>`.
-  ``api.yaml`` (master claim): copy it to ``/var/wazuh-manager/api/configuration/api.yaml`` on the master claim.
-  ``opensearch.yml`` and ``internal_users.yml`` (ConfigMap ``indexer-conf``): set the settings as environment variables in ``indexer-sts.yaml``. The default users take their passwords from ``wazuh/config/credentials/indexer.env``.
-  ``opensearch_dashboards.yml`` (ConfigMap ``dashboard-conf``): set the settings as environment variables in ``dashboard-deploy.yaml``, such as ``OPENSEARCH_HOSTS`` and ``WAZUH_API_URL``.
-  The ``indexer-cred``, ``dashboard-cred``, and ``wazuh-api-cred`` Secrets: Wazuh 5.x takes the credentials from ``wazuh/config/credentials/*.env``.

Validate the Wazuh manager configuration before you restart the Wazuh manager. If the configuration is valid, the command prints ``configuration is valid``.

.. code-block:: console

   $ kubectl -n wazuh-5 exec wazuh-manager-master-0 -c wazuh-manager -- /var/wazuh-manager/bin/wazuh-manager-conf validate

The command output looks similar to this:

.. code-block:: none
   :class: output

   /etc/wazuh-manager/wazuh-manager.conf: configuration is valid.

Indexed data
^^^^^^^^^^^^

The Wazuh 5.x indexer uses new index schemas. Keep the Wazuh 4.x deployment, optionally read-only, for as long as you need its data, as described in :ref:`Indexed data <migration_indexer_data_migration>`.
