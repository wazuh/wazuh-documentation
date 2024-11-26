.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh provides an automated way of building packages for the Wazuh components. Learn how to build your own Wazuh indexer package in this section of our documentation.

=============
Wazuh indexer
=============

Local packages generation
#########################

While official ``Wazuh Indexer`` packages are generated in a GitHub Actions pipeline, packages can also be compiled locally or within a docker container.

The packages' generation process is orchestrated by two scripts, found under the ``build-scripts`` directory of the repository:

-  ``build.sh``: compiles the Java application and bundles it into a package.
-  ``assemble.sh``: uses the package from the previous step and inflates it with plugins and configuration files, ready for production deployment.

.. contents:: Table of contents:
   :depth: 2
   :local:

Docker environment
******************
.. raw:: html

  <div class="accordion-section open">

Pre-requisistes
===============

1. Clone the ``Wazuh Indexer`` GitHub repository and switch to the ``v|WAZUH_CURRENT|`` tag:

.. code:: console

   # git clone https://github.com/wazuh/wazuh-indexer/
   # git checkout v|WAZUH_CURRENT|

2. Bring the docker environment up:

.. code:: console

   # cd wazuh-indexer/docker/ci
   # bash ci.sh up
   # cd ../..

Build a minimal package
=======================

A basic package including only the ``Wazuh Indexer`` engine without extra plugin is generated first.

1. Set the environment variables:

.. note:: 

   Replace ``<arch>`` with one of ``x64`` or ``arm64`` and ``<package-type>`` with one of ``rpm``, ``deb`` or ``tar``

.. code:: console

   # ARCHITECTURE=<arch>
   # PACKAGE_TYPE=<package-type>

2. Run the build script:

.. code:: console

   # docker exec -it wi-build_$(<VERSION) bash build-scripts/build.sh -a $ARCHITECTURE -d $PACKAGE_TYPE -n $(bash build-scripts/baptizer.sh -a $ARCHITECTURE -d $PACKAGE_TYPE -m)

After this step, a minimal package (without plugins) will be present under the ``artifacts`` directory.

Full package assembly
=====================

1. Set the environment variables:

.. note:: 

   Replace ``<arch>`` with one of ``x64`` or ``arm64`` and ``<package-type>`` with one of ``rpm``, ``deb`` or ``tar``.

.. code:: console

   # ARCHITECTURE=<arch>
   # PACKAGE_TYPE=<package-type>

2. Run the assembly process:

.. code:: console

   # docker exec -it wi-assemble_$(<VERSION) bash build-scripts/assemble.sh -a $ARCHITECTURE -d $PACKAGE_TYPE -r 1

Native environment
******************
.. raw:: html

  <div class="accordion-section open">


Pre-requisistes
================

1. Install build dependencies

.. tabs::

   .. group-tab:: RPM

      .. code-block:: console
   
         # yum install -y git curl gnupg2 gcc gcc-c++ make cpio rpm-build mesa-libGLU freeglut alsa-lib atk at-spi2-core cairo cairo-devel cups-libs libdrm libgbm nspr nspr-devel nss pango libXcomposite libXdamage libXfixes libXfixes-devel libXi libxkbcommon libXrandr libXrender libXtst rpm rpm-build maven
   
   .. group-tab:: DEB

      .. code-block:: console
   
         # apt-get update
         # apt-get install -y git curl gnupg2 y build-essential cpio debhelper-compat debmake freeglut3 libasound2 libatk-bridge2.0-0 libatk1.0-0 libatspi2.0-dev libcairo2 libcairo2-dev libcups2 libdrm2 libgbm-dev libgconf-2-4 libnspr4 libnspr4-dev libnss3 libpangocairo-1.0-0 libxcomposite-dev libxdamage1 libxfixes-dev libxfixes3 libxi6 libxkbcommon-x11-0 libxrandr2 libxrender1 libxtst6 rpm rpm2cpio maven

2. Clone the ``wazuh-indexer`` repository and switch to the appropriate branch

.. code:: console

   # git clone https://github.com/wazuh/wazuh-indexer
   # git checkout v|WAZUH_CURRENT|


Build a minimal package
=======================

A basic package including only the ``Wazuh Indexer`` engine without extra plugin is generated first.

1. Set the environment variables:

.. note:: 

   Replace ``<arch>`` with one of ``x64`` or ``arm64`` and ``<package-type>`` with one of ``rpm``, ``deb`` or ``tar``

.. code:: console

   # ARCHITECTURE=<arch>
   # PACKAGE_TYPE=<package-type>

2. Run the build script:

.. code:: console

   # bash build-scripts/build.sh -a $ARCHITECTURE -d $PACKAGE_TYPE -n $(bash build-scripts/baptizer.sh -a $ARCHITECTURE -d $PACKAGE_TYPE -m)

After this step, a minimal package (without plugins) will be present under the ``artifacts`` directory.

Full package assembly
=====================

1. Set the ``ARCHITECTURE`` and ``PACKAGE_TYPE`` environment variables replacing ``<package-type>`` with one of ``tar``, ``deb`` or ``rpm`` and ``<arch>`` with ``x64`` or ``arm64`` depending on the target system the packages are being built for.

.. code:: console

   # ARCHITECTURE=<arch>
   # PACKAGE_TYPE=<package-type>

2. Run the assembly process:

.. code:: console

   # bash build-scripts/assemble.sh -a $ARCHITECTURE -d $PACKAGE_TYPE

Build and assemble scripts reference
####################################
.. raw:: html

  <div class="accordion-section open">

The packages' generation process is guided through bash scripts.

Below is a reference of their inputs, outputs and code:

.. code:: none

   scripts:
      - file: build.sh
        description: |
           generates a distribution package by running the appropiate Gradle task 
           depending on the parameters.
        inputs:
           architecture: [x64, arm64] # Note: we only build x86_64 packages
           distribution: [tar, deb, rpm]
           name: the name of the package to be generated.
        outputs:
           package: minimal wazuh-indexer package for the required distribution.
      
      - file: assemble.sh
        description: |
           bundles the wazuh-indexer package generated in by build.sh with plugins, 
           configuration files and demo certificates (certificates yet to come).
        inputs:
           architecture: [x64, arm64] # Note: we only build x86_64 packages
           distribution: [tar, deb, rpm]
           revision: revision number. 0 by default.
        outputs:
           package: wazuh-indexer package.
      
      - file: provision.sh
        description: Provision script for the assembly of DEB packages.
      
      - file: baptizer.sh
        description: generate the wazuh-indexer package name depending on the parameters.
        inputs:
           architecture: [x64, arm64] # Note: we only build x86_64 packages
           distribution: [tar, deb, rpm]
           revision: revision number. 0 by default.
           is_release: if set, uses release naming convention.
           is_min: if set, the package name will start by `wazuh-indexer-min`. Used on the build stage.
        outputs:
           package: the name of the wazuh-indexer package
