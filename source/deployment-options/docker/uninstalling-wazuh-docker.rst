.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to uninstall the Wazuh Docker deployment from your Docker host in this section of the documentation.

Uninstalling the Wazuh Docker deployment
========================================

Follow these steps to uninstall your Wazuh Docker deployment from your Docker host:

Uninstalling single-node and multi-node deployment
--------------------------------------------------

Follow these steps to remove a single-node or multi-node deployment.

You need root user privileges to run the commands below. If you use Docker as a non-root user, run them with ``sudo``.

#. Navigate to the directory of your deployment, ``wazuh-docker/single-node/`` or ``wazuh-docker/multi-node/``. For example, for a single-node deployment:

   .. code-block:: console

      # cd wazuh-docker/single-node/

#. Stop the stack and remove its containers. Choose one of the following commands:

   -  To keep the data volumes, for example, to deploy the stack again later:

      .. code-block:: console

         # docker compose down

   -  To delete the data volumes too, with your indexed data and the configuration each component stored:

      .. code-block:: console

         # docker compose down -v

      The ``-v`` flag permanently deletes the stack's named volumes, which are listed in the ``volumes`` section of ``wazuh-docker/single-node/docker-compose.yml`` or ``wazuh-docker/multi-node/docker-compose.yml``. It also deletes any custom volume you added to that section.

#. Remove the generated files. If you deleted the volumes in step 2, also remove the passwords of the deployment in ``config/credentials/``:

   .. code-block:: console

      # rm -rf wazuh-certificates/ wazuh-certificates-tool.log config.yml wazuh-certs-tool.sh config/*/certs config/credentials

   If you kept the volumes in step 2, keep ``config/credentials/``. The volumes hold the passwords from these files, and the files are the only record of them.

   In that case, run the following command instead. It keeps ``config/credentials/``:

   .. code-block:: console

      # rm -rf wazuh-certificates/ wazuh-certificates-tool.log config.yml wazuh-certs-tool.sh config/*/certs

#. Optional: remove the root CA. The certificate creation tool keeps the root CA and its private key in ``wazuh-ca/``, in the directory of your stack. The steps above keep this directory, and the next run of the script from this directory reuses it. Remove it only if you deleted the volumes in step 2 and no other Wazuh deployment uses this root CA. If you set ``WAZUH_CA_DIR`` when you created the certificates, remove that directory instead:

   .. code-block:: console

      # rm -rf wazuh-ca/

#. Optional: remove the images of the stack. For a single-node deployment:

   .. code-block:: console

      # docker image rm wazuh/wazuh-manager:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV| wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV| wazuh/wazuh-dashboard:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|

   A multi-node deployment also uses the ``nginx:stable`` image. Add it to the command unless another container on this host uses it. If you upgraded the deployment, use the tags in ``wazuh-docker/single-node/docker-compose.yml`` or ``wazuh-docker/multi-node/docker-compose.yml``. If you built the images yourself, also remove the build cache, which the build leaves on the Docker host, with ``docker builder prune -a``.

#. Run the following command to confirm that the deployment's containers are removed:

   .. code-block:: console

      # docker ps

   The output no longer lists any container whose name starts with ``single-node-`` or ``multi-node-``. A Wazuh agent container on this host still appears until you remove it. See `Uninstalling the Wazuh agent deployment`_.

#. Optional: if you created ``/etc/sysctl.d/99-wazuh-max-map-count.conf`` in the prerequisites and nothing else on this host needs it, remove it. The current value stays until the Docker host restarts:

   .. code-block:: console

      # rm -f /etc/sysctl.d/99-wazuh-max-map-count.conf

#. Optional: remove the Wazuh Docker repository clone if you don't need it. If a Wazuh agent container on this host runs from this clone, uninstall it first. From the directory where you cloned the repository, run:

   .. code-block:: console

      # rm -rf wazuh-docker/

Uninstalling the Wazuh agent deployment
---------------------------------------

Follow these steps to remove a Wazuh agent container deployment.

You need root user privileges to run the commands below. If you use Docker as a non-root user, run them with ``sudo``.

#. Navigate to the Wazuh agent directory, ``wazuh-docker/wazuh-agent/``:

   -  From the directory where you cloned the Wazuh Docker repository:

      .. code-block:: console

         # cd wazuh-docker/wazuh-agent

   -  From ``wazuh-docker/single-node/`` or ``wazuh-docker/multi-node/``, for example, after you remove the stack on the same host:

      .. code-block:: console

         # cd ../wazuh-agent

#. Stop and remove the Wazuh agent stack and its ``wazuh_agent_etc`` volume, which holds the Wazuh agent enrollment:

   .. code-block:: console

      # docker compose down -v

   Restore the ``docker-compose.yml`` file, which still holds the enrollment token:

   .. code-block:: console

      # git checkout docker-compose.yml

#. Run the following command to confirm that the Wazuh agent container is removed:

   .. code-block:: console

      # docker ps

   The output no longer lists the ``wazuh-agent-wazuh.agent-1`` container.

#. Optional: remove the Wazuh agent image:

   .. code-block:: console

      # docker image rm wazuh/wazuh-agent:|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|

#. Optional: remove the Wazuh Docker repository clone if you don't need it. From the directory where you cloned the repository, run:

   .. code-block:: console

      # rm -rf wazuh-docker/
