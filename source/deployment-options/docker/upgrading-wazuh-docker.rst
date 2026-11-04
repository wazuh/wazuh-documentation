.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to upgrade Wazuh Docker deployments in this section of our documentation.

Upgrading the Wazuh Docker deployment
=====================================

This procedure upgrades a Wazuh 5.0 Docker deployment to a later 5.0.x release. It does not cover a Wazuh 4.x deployment.

The upgrade replaces the images and keeps everything else. Your indexed data and the configuration each component stores are in the stack's named volumes. The certificates and passwords are files in the ``config/`` directory of your deployment. Do not run the certificate creation script ``certificates-conf.sh`` or the credentials creation script ``credentials-conf.sh`` again.

You need root user privileges to run the commands below. If you use Docker as a non-root user, run them with ``sudo``.

Stop the current deployment
---------------------------

#. Navigate to the directory of your deployment, ``wazuh-docker/single-node/`` or ``wazuh-docker/multi-node/``. For example, for a single-node deployment:

   .. code-block:: console

      # cd wazuh-docker/single-node/

#. Stop and remove the running containers:

   .. code-block:: console

      # docker compose down

   Do not add the ``-v`` flag. It deletes the stack's named volumes, and with them your indexed data and stored configuration.

Update the image tags
---------------------

Each release of the Wazuh Docker repository sets its image tags in its own ``single-node/docker-compose.yml`` and ``multi-node/docker-compose.yml`` files. Use the tags from the release you upgrade to. If that release also changes other lines of those files, take its files and apply your own changes to them again.

To take the files of the release you upgrade to, restore the Compose files you edited, including ``wazuh-agent/docker-compose.yml``, which holds the enrollment token. Then check out the release in your clone. From ``wazuh-docker/single-node/``, run the following commands, and replace ``<RELEASE_TAG>`` with the tag of the release, for example, ``v5.0.0``. For a multi-node deployment, go back to ``../multi-node/`` instead:

.. code-block:: console

   # git checkout docker-compose.yml
   # cd ../wazuh-agent/
   # git checkout docker-compose.yml
   # cd ../single-node/
   # git fetch --tags origin
   # git checkout <RELEASE_TAG>

If a Compose file that the release changes still has your edits, ``git checkout <RELEASE_TAG>`` stops with ``Your local changes to the following files would be overwritten by checkout``. The command doesn't change the certificates and passwords in ``config/`` or the root CA in ``wazuh-ca/``. After the checkout, apply your own changes to ``docker-compose.yml`` again. To keep your edited files instead, change only the image tags, as follows.

Single-node deployment
^^^^^^^^^^^^^^^^^^^^^^

Edit ``wazuh-docker/single-node/docker-compose.yml`` and replace ``<NEW_TAG>`` with the new tag in the ``image`` field of each Wazuh service:

.. code-block:: yaml
   :emphasize-lines: 3,7,11

   services:
     wazuh.manager:
       image: wazuh/wazuh-manager:<NEW_TAG>
       ...

     wazuh.indexer:
       image: wazuh/wazuh-indexer:<NEW_TAG>
       ...

     wazuh.dashboard:
       image: wazuh/wazuh-dashboard:<NEW_TAG>
       ...

Multi-node deployment
^^^^^^^^^^^^^^^^^^^^^

Edit ``wazuh-docker/multi-node/docker-compose.yml`` and replace ``<NEW_TAG>`` with the new tag in the ``image`` field of each Wazuh service:

.. code-block:: yaml
   :emphasize-lines: 3,7,11,15,19,23

   services:
     wazuh.master:
       image: wazuh/wazuh-manager:<NEW_TAG>
       ...

     wazuh.worker:
       image: wazuh/wazuh-manager:<NEW_TAG>
       ...

     wazuh1.indexer:
       image: wazuh/wazuh-indexer:<NEW_TAG>
       ...

     wazuh2.indexer:
       image: wazuh/wazuh-indexer:<NEW_TAG>
       ...

     wazuh3.indexer:
       image: wazuh/wazuh-indexer:<NEW_TAG>
       ...

     wazuh.dashboard:
       image: wazuh/wazuh-dashboard:<NEW_TAG>
       ...

Start the updated deployment
----------------------------

#. Start the upgraded deployment. Docker pulls the new images:

   .. code-block:: console

      # docker compose up -d

#. If a Wazuh agent container runs on this host from the same clone, upgrade it when ``docker compose ps`` shows every Wazuh container as ``(healthy)``:

   .. code-block:: console

      # cd ../wazuh-agent/
      # docker compose up -d

   The Wazuh agent keeps its enrollment in the ``wazuh_agent_etc`` volume and ignores ``WAZUH_ENROLLMENT_TOKEN``, so the placeholder in the restored ``docker-compose.yml`` file doesn't matter. It reconnects with the same agent ID.
