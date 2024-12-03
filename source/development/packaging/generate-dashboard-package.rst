.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh provides an automated way of building packages for the Wazuh components. Learn how to build your own Wazuh dashboard package in this section of our documentation.

Wazuh dashboard
===============

The packages generation process is orchestrated by the ``build-packages.sh`` script, which is found within the ``dev-tools/build-packages/`` folder of the repository. This script is responsible for bundling plugins into one single application in tar, rpm and/or deb distributions. It takes the following parameters:

-  version
-  revision
-  distribution
-  ``wazuh-dashboard``, ``wazuh-dashboard-plugins``, and ``wazuh-security-dashboards-plugin`` package paths

Official packages are built through a GitHub Actions pipeline, however, the process is designed to be independent enough for maximum portability. The building process is self-contained in the application code.

Build manually
^^^^^^^^^^^^^^

Requirements:

-  Docker
-  NVM (Node Version Manager): see `NVM installation guide <https://github.com/nvm-sh/nvm#installing-and-updating>`_
   -  ``nvm use`` command is used to switch Node.js version within the project
-  Yarn v1.22.22 (Node Package Manager): see `Yarn installation guide <https://classic.yarnpkg.com/en/docs/install/>`_

Generating zip packages
~~~~~~~~~~~~~~~~~~~~~~~

To use the script you first need to generate the packages from these repositories:

-  ``wazuh-dashboard``
-  ``wazuh-security-dashboards-plugin``
-  ``wazuh-dashboard-plugins``

To build the packages, follow these steps:

#. Clone the Wazuh dashboard repository and build the application.

   .. code:: console

      $ git clone -b <BRANCH_OR_TAG> https://github.com/wazuh/wazuh-dashboard.git
      $ cd wazuh-dashboard/
      $ nvm use
      $ yarn osd bootstrap
      $ yarn build <--linux | --linux-arm> --skip-os-packages --release

   Example:

   .. code:: console

      $ git clone -b 4.10.2 https://github.com/wazuh/wazuh-dashboard.git
      $ cd wazuh-dashboard/
      $ nvm use
      $ yarn osd bootstrap
      $ yarn build --linux --skip-os-packages --release

   .. note::

      To build a package for ARM architecture, use the ``--linux-arm`` flag with the ``yarn build`` command instead of ``--linux``.

#. Clone the Wazuh Security Dashboards Plugin repository in the plugins folder and build the plugin.

   .. code:: console

      $ cd plugins/
      $ git clone -b <BRANCH_OR_TAG> https://github.com/wazuh/wazuh-security-dashboards-plugin.git
      $ cd wazuh-security-dashboards-plugin/
      $ nvm use
      $ yarn
      $ yarn build

   Example:

   .. code:: console

      $ cd plugins/
      $ git clone -b 4.10.2 https://github.com/wazuh/wazuh-security-dashboards-plugin.git
      $ cd wazuh-security-dashboards-plugin/
      $ nvm use
      $ yarn
      $ yarn build

#. Clone the Wazuh dashboard plugins repository in the plugins folder, move the contents of the plugins folder to the folder where the repository was cloned and build the plugins.

   .. note::

      The yarn build command requires an entry specifying the OpenSearch Dashboard version. This version can be obtained from the ``package.json`` file.

   .. code:: console

      $ cd ../
      $ git clone -b <BRANCH_OR_TAG> https://github.com/wazuh/wazuh-dashboard-plugins.git
      $ cd wazuh-dashboard-plugins/
      $ nvm use
      $ cp -r plugins/* ../
      $ cd ../main
      $ yarn
      $ yarn build
      $ cd ../wazuh-core/
      $ yarn
      $ yarn build
      $ cd ../wazuh-check-updates/
      $ yarn
      $ yarn build

   Example:

   .. code:: console

      $ cd ../
      $ git clone -b 4.10.2 https://github.com/wazuh/wazuh-dashboard-plugins.git
      $ cd wazuh-dashboard-plugins/
      $ nvm use
      $ cp -r plugins/* ../
      $ cd ../main
      $ yarn
      $ yarn build
      $ cd ../wazuh-core/
      $ yarn
      $ yarn build
      $ cd ../wazuh-check-updates/
      $ yarn
      $ yarn build

#. Zip the packages and move them to the packages folder

   .. code:: console

      $ cd ../../../
      $ mkdir packages
      $ cd packages
      $ zip -r -j ./dashboard-package.zip ../wazuh-dashboard/target/opensearch-dashboards-2.13.0-linux-x64.tar.gz
      $ zip -r -j ./security-package.zip ../wazuh-dashboard/plugins/wazuh-security-dashboards-plugin/build/security-dashboards-<OPENSEARCH_VERSION>.0.zip
      $ zip -r -j ./wazuh-package.zip ../wazuh-dashboard/plugins/wazuh-check-updates/build/wazuhCheckUpdates-<OPENSEARCH_VERSION>.zip ../wazuh-dashboard/plugins/main/build/wazuh-<OPENSEARCH_VERSION>.zip ../wazuh-dashboard/plugins/wazuh-core/build/wazuhCore-<OPENSEARCH_VERSION>.zip

   Example:

   .. code:: console

      $ cd ../../../
      $ mkdir packages
      $ cd packages
      $ zip -r -j ./dashboard-package.zip ../wazuh-dashboard/target/opensearch-dashboards-2.13.0-linux-x64.tar.gz
      $ zip -r -j ./security-package.zip ../wazuh-dashboard/plugins/wazuh-security-dashboards-plugin/build/security-dashboards-2.13.0.0.zip
      $ zip -r -j ./wazuh-package.zip ../wazuh-dashboard/plugins/wazuh-check-updates/build/wazuhCheckUpdates-2.13.0.zip ../wazuh-dashboard/plugins/main/build/wazuh-2.13.0.zip ../wazuh-dashboard/plugins/wazuh-core/build/wazuhCore-2.13.0.zip

At this point you must have three packages in the ``packages`` folder:

-  ``dashboard-package.zip``
-  ``security-package.zip``
-  ``wazuh-package.zip``

Using the script
~~~~~~~~~~~~~~~~

Run the ``build-packages.sh`` script in the ``dev-tools/build-packages/`` folder of the repository. The script requires the following parameters:

-  ``-a``, ``--app``: Indicate the path to ``wazuh-package.zip``.
-  ``-b``, ``--base``: Indicate the path to ``dashboard-package.zip``.
-  ``-s``, ``--security``: Indicate the path to ``security-package.zip``.
-  ``-v``, ``--version``: Set the version for this build.
-  ``--all-platforms``: Build the packages for all platforms.
-  ``--deb``: Build a deb package.
-  ``--rpm``: Build an rpm package.
-  ``--tar``: Build a tar.gz archive.
-  ``-r``, ``--revision``: *Optional* – Set the revision for this build. Defaults to ``1``.
-  ``--production``: *Optional* – Use package naming for production. Otherwise, it includes the hash of the current commit.
-  ``--arm``: *Optional* – Build for arm64 architecture instead of x64.
-  ``--debug``: *Optional* – Enable debug mode to display detailed information during execution.
-  ``--silent``: *Optional* – Enable silent mode for minimal output. Note that ``--debug`` overrides this option.

.. code:: console

   $ cd ../wazuh-dashboard/dev-tools/build-packages/
   $ ./build-packages.sh -v <VERSION> -r <REVISION> --<DISTRIBUTION> -a file:///<PATH_TO_wazuh-package.zip> -s file:///<PATH_TO_security-package.zip> -b file:///<PATH_TO_dashboard-package.zip>

Where ``--<DISTRIBUTION>`` is either ``--deb``, ``--rpm``,  ``--tar``, or ``--all-platforms``.

.. note::

   In cases where a local path is available, use ``file://<ABSOLUTE_PATH>`` to specify its absolute path.

.. note::

   To build ARM packages, run the script on an ARM machine. Use  the ``-b`` option with an ARM build of the Wazuh dashboard base.

Example:

.. code:: console

   $ cd ../wazuh-dashboard/dev-tools/build-packages/
   $ ./build-packages.sh -v 4.10.2 -r 1 --deb -a file:///packages/wazuh-package.zip -s file:///packages/security-package.zip -b file:///packages/dashboard-package.zip

The script generates the package in the ``output`` folder of the same directory where it is located.

Build with Docker image
^^^^^^^^^^^^^^^^^^^^^^^

This option allows you to create packages that include all necessary plugins required to generate the Wazuh dashboard installer.

Requirements
~~~~~~~~~~~~

-  A system with Docker installed.
-  Internet connection to download the Docker images for the first time.

Building the packages
~~~~~~~~~~~~~~~~~~~~~

#. Clone the Wazuh dashboard repository and navigate to the ``dev-tools/build-packages/base-packages-to-base`` folder within it.

   .. code:: console

      $ git clone -b <BRANCH_OR_TAG> https://github.com/wazuh/wazuh-dashboard.git
      $ cd wazuh-dashboard/dev-tools/build-packages/

   Example:

   .. code:: console

      $ git clone -b 4.10.2 https://github.com/wazuh/wazuh-dashboard.git
      $ cd wazuh-dashboard/dev-tools/build-packages/base-packages-to-base

#. Run the script ``run-docker-compose.sh`` with the following parameters:

   -  ``--node-version``: Node.js version for the ``.nvmrc`` file.
   -  ``-b``, ``--base``: Branch of the Wazuh dashboard repository.
   -  ``-a``, ``--app``: Branch of the Wazuh dashboard plugins repository.
   -  ``-s``, ``--security```: Branch of the Wazuh Security Dashboards Plugin repository.
   -  ``--arm``: *Optional* – Build for arm6 architecture instead of x64.

   .. code:: console

      $ docker build \
      --node-version <NODE_VERSION> \
      --base <BRANCH_OF_wazuh-dashboard> \
      --app <BRANCH_OF_wazuh-dashboard-plugins> \
      --security <BRANCH_OF_wazuh-security-dashboards-plugin>

   Example:

   .. code:: console

      $ bash run-docker-compose.sh \
      --app 4.10.2 \
      --base 4.10.2 \
      --security 4.10.2 \
      --node-version 18.19.0

   The script creates the packages in the ``packages`` directory within the ``base-packages-to-base`` folder.

   .. note::

      To build a custom package, replace the contents of the ``packages`` folder with your customized packages.

#. Zip the packages

   .. code:: console

      $ cd ./packages
      $ zip -r -j ./dashboard-package.zip ./wazuh-dashboard/*.tar.gz
      $ zip -r -j ./security-package.zip ./wazuh-security-dashboards-plugin/*.zip
      $ zip -r -j ./wazuh-package.zip ./wazuh-dashboard-plugins/*.zip

#. Build deb, rpm, or tar.gz packages

   .. code:: console

      $ cd ../../
      $ ./build-packages.sh -v <VERSION> -r <REVISION> [--arm] --<DISTRIBUTION> -a file:///<PATH_TO_wazuh-package.zip> -s file:///<PATH_TO_security-package.zip> -b file:///<PATH_TO_dashboard-package.zip>

   Where ``--<DISTRIBUTION>`` is either ``--deb``, ``--rpm``, ``--tar``, or ``--all-platforms``.

   Example:

   .. code:: console

      $ ./build-packages.sh -v 4.10.2 -r 1 --deb -a file://$(pwd)/base-packages-to-base/packages/wazuh-package.zip -s file://$(pwd)/base-packages-to-base/packages/security-package.zip -b file://$(pwd)/base-packages-to-base/packages/dashboard-package.zip

   The script creates the package in the ``output`` folder within the same directory as the script.