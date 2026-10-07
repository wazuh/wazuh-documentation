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

Single-node deployment
^^^^^^^^^^^^^^^^^^^^^^

Edit ``wazuh-docker/single-node/docker-compose.yml`` and replace ``<NEW_TAG>`` with the new tag in the ``image`` field of each Wazuh service:

.. code-block:: yaml

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
