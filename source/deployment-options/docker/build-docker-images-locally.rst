.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: You can modify and build Docker images for the Wazuh central components. Learn more in this section of the documentation.

Build Docker images locally
===========================

You can modify and build Docker images for the Wazuh central components (manager, indexer, and dashboard).

#. Clone the `Wazuh Docker repository <https://github.com/wazuh/wazuh-docker>`_ to your system:

   .. code-block:: console

      # git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|

#. Navigate to the ``wazuh-docker/build-docker-images/`` directory and run the build script:

   .. code-block:: console

      # build-docker-images/build-images.sh

This generates updated Docker images for all Wazuh components on your local system.
