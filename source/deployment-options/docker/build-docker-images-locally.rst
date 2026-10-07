.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: You can modify and build Docker images for the Wazuh central components and the Wazuh agent. Learn more in this section of the documentation.

Building Docker images locally
==============================

You can modify and build Docker images for the Wazuh central components (manager, indexer, and dashboard) and the Wazuh agent.

#. Clone the `Wazuh Docker <https://github.com/wazuh/wazuh-docker>`__ repository to your system:

   .. code-block:: console

      # git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|

#. Navigate to the ``wazuh-docker/build-docker-images`` directory:

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

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      Usage: ./build-images.sh [OPTIONS]

          -d, --dev-stage <ref>        [Optional] Set the pre-release stage suffix (e.g. beta1, rc2). Not used by default.
          --dev                        [Optional] Mark as a development build: appends the commit ref to the image tag. Controlled by inputs.dev in the workflow.
          -refs, --references <refs>   [Optional] [Only with --dev] JSON array of commit refs for components (indexer, manager, dashboard, agent) in order. Defaults to 'latest'.
          -rg, --registry <reg>        [Optional] Set the Docker registry to push the images.
          -c, --component <comp>       [Optional] Build only this component: 'wazuh-indexer', 'wazuh-manager', 'wazuh-dashboard' or 'wazuh-agent'. By default, all four.
          -v, --version <ver>          [Optional] Set the Wazuh version should be builded. By default, 5.0.0.
          -m, --multiarch              [Optional] Enable multi-architecture builds.
          -h, --help                   Show this help.
