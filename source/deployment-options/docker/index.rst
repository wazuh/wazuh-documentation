.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to deploy Wazuh using official Docker images, including the Wazuh manager, indexer, and dashboard in this section of the documentation.

Deployment on Docker
====================


Deploy Wazuh with the official Wazuh Docker images. Each stack runs all its containers on one Docker host.

-  **Single-node stack:** one container for each Wazuh central component. Use it for tests and small environments. It needs at least 8 GB of RAM.
-  **Multi-node stack:** three Wazuh indexer nodes, two Wazuh manager nodes, a Wazuh dashboard, and an Nginx container that receives Wazuh agent connections. It needs at least 16 GB of RAM.
-  **Wazuh agent container:** a Wazuh agent for syslog collection and integrations, on any Docker host.

Start with :doc:`Wazuh Docker deployment <wazuh-container>`, which covers the requirements, both stacks, and the Wazuh agent container. Use :doc:`Building Docker images locally <build-docker-images-locally>` only if you need custom images.

Wazuh provides official Docker images you can use to streamline the deployment of its components. These include:

-  `wazuh-manager <https://hub.docker.com/r/wazuh/wazuh-manager>`__
-  `wazuh-indexer <https://hub.docker.com/r/wazuh/wazuh-indexer>`__
-  `wazuh-dashboard <https://hub.docker.com/r/wazuh/wazuh-dashboard>`__
-  `wazuh-agent <https://hub.docker.com/r/wazuh/wazuh-agent>`__

You can find all available Wazuh Docker images on `Docker Hub <https://hub.docker.com/u/wazuh>`__.

Content
-------

.. toctree::
   :maxdepth: 2

   wazuh-container
   build-docker-images-locally
   container-usage
   upgrading-wazuh-docker
   uninstalling-wazuh-docker
