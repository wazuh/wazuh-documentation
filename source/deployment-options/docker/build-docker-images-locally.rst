.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: You can modify and build Docker images for the Wazuh central components and the Wazuh agent. Learn more in this section of the documentation.

Building Docker images locally
==============================

You can modify and build Docker images for the Wazuh central components (manager, indexer, and dashboard) and the Wazuh agent.

#. Clone the `Wazuh Docker <https://github.com/wazuh/wazuh-docker>`__ repository to your system:

   .. code-block:: console

      # git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|

#. Navigate to the ``build-docker-images`` directory:

   .. code-block:: console

      # cd wazuh-docker/build-docker-images

#. Run the build script:

   .. code-block:: console

      # ./build-images.sh

   This builds Docker images for all Wazuh components on your local system.

#. Use the ``-v`` or ``--version`` option to build images for a different Wazuh version:

   .. code-block:: console

      # ./build-images.sh -v |WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|

   To get all the available script options, use the ``-h`` or ``--help`` option:

   .. code-block:: console

      # ./build-images.sh -h

   .. code-block:: none
      :class: output

      Usage: build-images.sh [OPTIONS]

          -d, --dev <ref>              [Optional] Set the development stage you want to build, example rc2 or beta1, not used by default.
          -refs, --references <ref>    [Optional] Set each Wazuh component reference to be build (indexer, manager, dasboard and agent). By default, using the latest release: ['latest', 'latest', 'latest', 'latest']
          -rg, --registry <reg>        [Optional] Set the Docker registry to push the images.
          -v, --version <ver>          [Optional] Set the Wazuh version should be builded. By default, 5.0.0.
          -m, --multiarch              [Optional] Enable multi-architecture builds.
          -h, --help                   Show this help.
