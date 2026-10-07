.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: You can modify and build Docker images for the Wazuh central components and the Wazuh agent. Learn more in this section of the documentation.

Building Docker images locally
==============================

You can modify and build Docker images for the Wazuh central components (manager, indexer, and dashboard) and the Wazuh agent. Build the images yourself only when you need to change them, for example, to add packages or configuration files. To deploy the published Wazuh images instead, skip this section and follow the :doc:`Wazuh Docker deployment <wazuh-container>`.

Each image has its own directory, which holds its ``Dockerfile`` and a ``config`` directory:

-  ``wazuh-docker/build-docker-images/wazuh-manager/``
-  ``wazuh-docker/build-docker-images/wazuh-indexer/``
-  ``wazuh-docker/build-docker-images/wazuh-dashboard/``
-  ``wazuh-docker/build-docker-images/wazuh-agent/``

Requirements
------------

-  Docker Engine with the Docker Buildx plugin. The build script runs ``docker buildx bake``. Run ``docker buildx version`` to check that the plugin is installed.
-  Git, curl, and jq. Without jq, the script prints ``jq: command not found`` and then stops with ``curl: (22) The requested URL returned error: 403``.
-  Internet access to GitHub, Docker Hub, the Amazon Linux 2023 package repositories, and the Wazuh package repository.
-  Free disk space: at least 20 GB. The build uses about 13 GB, and that space stays in use after the build: about 5 GB for the four images, and the rest for the build cache.

Building the images
-------------------

Run the commands below as root, or as a user in the ``docker`` group.

#. Clone the `Wazuh Docker <https://github.com/wazuh/wazuh-docker>`__ repository to your system:

   .. code-block:: console

      # git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|

#. Navigate to the ``wazuh-docker/build-docker-images`` directory:

   .. code-block:: console

      # cd wazuh-docker/build-docker-images

#. Run the build script. Choose one of the following commands:

   -  To tag the images ``|WAZUH_CURRENT_DOCKER|-|WAZUH_CURRENT_DOCKER_REV|``, as the ``docker-compose.yml`` files of Wazuh |WAZUH_CURRENT_DOCKER| RC 1 expect, add the release stage with the ``-d`` option:

      .. code-block:: console

         # ./build-images.sh -d |WAZUH_CURRENT_DOCKER_REV|

   -  To tag the images ``|WAZUH_CURRENT_DOCKER|``:

      .. code-block:: console

         # ./build-images.sh

   Each command builds the ``wazuh/wazuh-manager``, ``wazuh/wazuh-indexer``, ``wazuh/wazuh-dashboard``, and ``wazuh/wazuh-agent`` images. The script prints the image names and tags under ``Image tags:`` before it starts building. Run only one of them, because a second build adds about 9 GB more build cache.

   The ``-v`` option sets the Wazuh version in X.Y.Z format only. To build another Wazuh version, clone the tag of that version in step 1 instead.

   The script reuses ``wazuh-docker/build-docker-images/artifact_urls.yaml``, the package list of an earlier build, without checking its version. Delete it before you build from another tag in the same clone.

#. To get all the available script options, use the ``-h`` or ``--help`` option:

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

Next steps
----------

To deploy the images you built, follow the :doc:`Wazuh Docker deployment <wazuh-container>` from the same clone. Images built with ``-d |WAZUH_CURRENT_DOCKER_REV|`` already carry the tags in the ``docker-compose.yml`` files, so the deployment uses them without a download. If you built them without ``-d |WAZUH_CURRENT_DOCKER_REV|``, first change the tag in every ``image:`` line to ``|WAZUH_CURRENT_DOCKER|``. These lines are in ``wazuh-docker/single-node/docker-compose.yml``, ``wazuh-docker/multi-node/docker-compose.yml``, and ``wazuh-docker/wazuh-agent/docker-compose.yml``.
