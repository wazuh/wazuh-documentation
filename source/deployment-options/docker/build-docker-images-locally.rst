.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: You can modify and build Docker images for the Wazuh central components and the Wazuh agent. Learn more in this section of the documentation.

Building Docker images locally
==============================

You can modify and build Docker images for the Wazuh central components (manager, indexer, and dashboard) and the Wazuh agent.

#. Clone the `Wazuh Docker repository <https://github.com/wazuh/wazuh-docker>`__ to your system:

   .. code-block:: console

      # git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|

#. Navigate to the ``build-docker-images`` directory:

   .. code-block:: console

      # cd wazuh-docker/build-docker-images

#. Run the build script:

   .. code-block:: console

      # ./build-images.sh

This process builds Docker images for all Wazuh components on your local system.
