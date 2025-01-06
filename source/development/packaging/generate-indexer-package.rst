.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh provides an automated way of building packages for the Wazuh components. Learn how to build your own Wazuh indexer package in this section of our documentation.

Wazuh indexer
=============

We generate official Wazuh indexer packages using a GitHub Actions pipeline. However, you can compile packages locally within a Docker container.

Local packages generation
-------------------------

The ``docker/builder/builder.sh`` script controls the package generation process. This script prepares and launches a Docker container to automate the build.

Setting up the environment
^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Install :doc:`Docker Engine </deployment-options/docker/docker-installation>`.
#. Clone the Wazuh indexer GitHub repository and switch to the ``v|WAZUH_CURRENT|`` tag.

   .. code:: console

      # git clone https://github.com/wazuh/wazuh-indexer/
      # git checkout v|WAZUH_CURRENT|

Building the package
^^^^^^^^^^^^^^^^^^^^

#. Change to the Docker environment's directory.

   .. code:: console

      $ cd wazuh-indexer/docker/builder

#. Launch the script with specific arguments. For example, to build a Debian ``deb`` package for the ``x64`` architecture, with the package revision set to ``0`` and the plugins' branch set to ``master``, run the following command.

   .. code:: console

      $ bash builder.sh \
         -p master \
         -r master \
         -R 0 \
         -s false \
         -d deb \
         -a x64

   Optional arguments control the script. Details are provided in the ``builder.sh`` help page.

   .. code:: console

      $ ./builder.sh -h
      Usage: ./builder.sh [args]

      Arguments:
      -p INDEXER_PLUGINS_BRANCH	[Optional] wazuh-indexer-plugins repo branch, default is 'master'.
      -r INDEXER_REPORTING_BRANCH	[Optional] wazuh-indexer-reporting repo branch, default is 'master'.
      -R REVISION	[Optional] Package revision, default is '0'.
      -s STAGE	[Optional] Staging build, default is 'false'.
      -d DISTRIBUTION	[Optional] Distribution, default is 'rpm'.
      -a ARCHITECTURE	[Optional] Architecture, default is 'x64'.
      -D	Destroy the docker environment
      -h	Print help

   Where:

   -  ``DISTRIBUTION`` is either ``rpm``, ``deb``, or ``tar``.
   -  ``ARCHITECTURE`` is either ``x64`` or ``arm64``.

   Use arguments to select options such as the target distribution, architecture, and repository branch for the plugins. If no arguments are provided, the script defaults to building an ``rpm`` package for the ``x64`` architecture.

After the build process completes, you can find the built packages in the ``artifacts/dist/`` directory at the repository's root.
