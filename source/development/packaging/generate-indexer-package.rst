.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh provides an automated way of building packages for the Wazuh components. Learn how to build your own Wazuh indexer package in this section of our documentation.

=============
Wazuh indexer
=============

Local packages generation
#########################

While official ``Wazuh Indexer`` packages are generated in a GitHub Actions pipeline, packages can also be compiled locally within a :doc:`docker</deployment-options/docker/docker-installation>` container.

The packages' generation process is controlled by the ``docker/builder/builder.sh`` script. This script prepares and launches a docker container that automates the build process.


Docker environment
******************
.. raw:: html

  <div class="accordion-section open">

Pre-requisistes
===============

1. Install the :doc:`docker engine</deployment-options/docker/docker-installation>`

2. Clone the ``Wazuh Indexer`` GitHub repository and switch to the ``v|WAZUH_CURRENT|`` tag:

.. code:: console

   # git clone https://github.com/wazuh/wazuh-indexer/
   # git checkout v|WAZUH_CURRENT|

Build the package
=================

The `builder.sh` script is controlled by a number of optional arguments that are detailed in its help page:

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


Use these to select the desired target and the repo branch of the plugins. If none is provided, a ``rpm`` package for the ``x64`` architecture will be built.

Valid ``DISTRIBUTION`` arguments are ``rpm``, ``deb`` and ``tar`` for packages with such extensions.
``ARCHITECTURE`` can be one of ``x64`` or ``arm64``.

1. Change directory to the docker environment's path:

.. code:: console

   $ cd wazuh-indexer/docker/builder

2. Launch the script with the selected option flags:

.. code:: console
   
   $ bash builder.sh \
      -p master \
      -r master \
      -R 0 \
      -s false \
      -d deb \
      -a x64

The code above will build a ``.deb`` package for the ``x64`` architecture, using the plugins' master branch. The package revision will be set to ``0``.

Once the build process finishes, built packages will be deployed to the ``artifacts/dist`` directory under the repo's root.


