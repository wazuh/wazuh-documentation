.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh provides an automated way of building packages for the Wazuh components. Learn how to build your own Wazuh dashboard package in this section of our documentation.

Wazuh dashboard
===============

The packages generation process is orchestrated by the ``build-packages.sh`` script, which is found within the ``dev-tools/build-packages/`` folder of the repository. This script is responsible for bundling plugins into one single application in ``tar``, ``rpm`` and/or ``deb`` distributions. It takes the following parameters:

-  version
-  revision
-  distribution
-  ``wazuh-dashboard``, ``wazuh-dashboard-plugins``, and ``wazuh-security-dashboards-plugin`` package paths

Official packages are built through a GitHub Actions pipeline, however, the process is designed to be independent enough for maximum portability. The building process is self-contained in the application code.

Build manually
^^^^^^^^^^^^^^

Requirements:

-  **Docker**: Refer to `Docker installation guide <https://docs.docker.com/engine/install/>`__.
-  **NVM (Node Version Manager)**: Refer to `NVM installation guide <https://github.com/nvm-sh/nvm#installing-and-updating>`__.
-  **Yarn v|WAZUH_DASHBOARD_YARN_VERSION| (Node Package Manager)**: Refer to `Yarn installation guide <https://classic.yarnpkg.com/en/docs/install/>`__.
-  **zip**: Ensure the ``zip`` utility is available.
-  **unzip**: Ensure the ``unzip`` utility is available.
-  **gzip**: Ensure the ``gzip`` utility is available.
-  **brotli**: Ensure the ``brotli`` utility is available.
-  **curl**: Ensure the ``curl`` utility is available.

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
      $ nvm install $(cat .nvmrc)
      $ nvm use $(cat .nvmrc)
      $ yarn osd bootstrap
      $ yarn build-platform --linux --skip-os-packages --release

   Example:

   .. code:: console

      $ git clone -b v|WAZUH_CURRENT| https://github.com/wazuh/wazuh-dashboard.git
      $ cd wazuh-dashboard/
      $ nvm install $(cat .nvmrc)
      $ nvm use $(cat .nvmrc)
      $ yarn osd bootstrap
      $ yarn build-platform --linux --skip-os-packages --release

#. Clone the Wazuh Security Dashboards Plugin repository in the plugins folder and build the plugin.

   .. code:: console

      $ cd plugins/
      $ git clone -b <BRANCH_OR_TAG> https://github.com/wazuh/wazuh-security-dashboards-plugin.git
      $ cd wazuh-security-dashboards-plugin/
      $ yarn
      $ yarn build

   Example:

   .. code:: console

      $ cd plugins/
      $ git clone -b v|WAZUH_CURRENT| https://github.com/wazuh/wazuh-security-dashboards-plugin.git
      $ cd wazuh-security-dashboards-plugin/
      $ yarn
      $ yarn build

#. Clone the Wazuh dashboard plugins repository in the plugins folder, move the contents of the plugins folder to the folder where the repository was cloned and build the plugins.

   .. note::

      The yarn build command requires an entry specifying the OpenSearch Dashboard version. This version can be obtained from the ``package.json`` file.

   .. code:: console

      $ cd ../
      $ git clone -b <BRANCH_OR_TAG> https://github.com/wazuh/wazuh-dashboard-plugins.git
      $ cd wazuh-dashboard-plugins/
      $ nvm install $(cat .nvmrc)
      $ nvm use $(cat .nvmrc)
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
      $ git clone -b v|WAZUH_CURRENT| https://github.com/wazuh/wazuh-dashboard-plugins.git
      $ cd wazuh-dashboard-plugins/
      $ nvm install $(cat .nvmrc)
      $ nvm use $(cat .nvmrc)
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
      $ zip -r -j ./dashboard-package.zip ../wazuh-dashboard/target/opensearch-dashboards-<OPENSEARCH_VERSION>-linux-x64.tar.gz
      $ zip -r -j ./security-package.zip ../wazuh-dashboard/plugins/wazuh-security-dashboards-plugin/build/security-dashboards-<OPENSEARCH_VERSION>.0.zip
      $ zip -r -j ./wazuh-package.zip ../wazuh-dashboard/plugins/wazuh-check-updates/build/wazuhCheckUpdates-<OPENSEARCH_VERSION>.zip ../wazuh-dashboard/plugins/main/build/wazuh-<OPENSEARCH_VERSION>.zip ../wazuh-dashboard/plugins/wazuh-core/build/wazuhCore-<OPENSEARCH_VERSION>.zip

   Example:

   .. code:: console

      $ cd ../../../
      $ mkdir packages
      $ cd packages
      $ zip -r -j ./dashboard-package.zip ../wazuh-dashboard/target/opensearch-dashboards-|OPENSEARCH_DASHBOARDS_VERSION|-linux-x64.tar.gz
      $ zip -r -j ./security-package.zip ../wazuh-dashboard/plugins/wazuh-security-dashboards-plugin/build/security-dashboards-|OPENSEARCH_DASHBOARDS_VERSION|.0.zip
      $ zip -r -j ./wazuh-package.zip ../wazuh-dashboard/plugins/wazuh-check-updates/build/wazuhCheckUpdates-|OPENSEARCH_DASHBOARDS_VERSION|.zip ../wazuh-dashboard/plugins/main/build/wazuh-|OPENSEARCH_DASHBOARDS_VERSION|.zip ../wazuh-dashboard/plugins/wazuh-core/build/wazuhCore-|OPENSEARCH_DASHBOARDS_VERSION|.zip

At this point you must have three packages in the ``packages`` folder:

-  ``dashboard-package.zip``
-  ``security-package.zip``
-  ``wazuh-package.zip``

Using the script
~~~~~~~~~~~~~~~~

Run the ``build-packages.sh`` script in the ``dev-tools/build-packages/`` folder of the repository. The script requires the following parameters:

-  ``-v``: Version of the package.
-  ``-r``: Revision of the package.
-  ``--deb`` or ``--rpm``: Distribution of the package.
-  ``-a``: Path to the ``wazuh-package.zip``.
-  ``-s``: Path to the ``security-package.zip``.
-  ``-b``: Path to the ``dashboard-package.zip``.

.. code:: console

   $ cd ../wazuh-dashboard/dev-tools/build-packages/
   $ ./build-packages.sh -v <VERSION> -r <REVISION> (--deb|--rpm) -a file:///<PATH_TO_wazuh-package.zip> -s file:///<PATH_TO_security-package.zip> -b file:///<PATH_TO_dashboard-package.zip>

Example:

.. code:: console

   $ cd ../wazuh-dashboard/dev-tools/build-packages/
   $ ./build-packages.sh -v v|WAZUH_CURRENT| -r 1 --deb -a file:///packages/wazuh-package.zip -s file:///packages/security-package.zip -b file:///packages/dashboard-package.zip

The package will be generated in the ``output`` folder of the same directory where the script is located.

Build with Docker image
^^^^^^^^^^^^^^^^^^^^^^^

With this option you can create an image that has the package in tar.gz format and then if desired you can use the created package to generate the .deb or .rpm file.

Requirements
~~~~~~~~~~~~

-  **Docker**: Refer to `Docker installation guide <https://docs.docker.com/engine/install/>`__.
-  **Internet connection** to download the Docker images for the first time.
-  **jq**: Ensure the ``jq`` utility is available.
-  **curl**: Ensure the ``curl`` utility is available.

#. Clone the Wazuh dashboard repository.

   .. code:: console

      $ git clone -b <BRANCH_OR_TAG> https://github.com/wazuh/wazuh-dashboard.git
      $ cd wazuh-dashboard/dev-tools/build-packages/

   Example:

   .. code:: console

      $ git clone -b v|WAZUH_CURRENT| https://github.com/wazuh/wazuh-dashboard.git
      $ cd wazuh-dashboard/dev-tools/build-packages/

#. Build the Docker image with the following parameters:

   -  ``NODE_VERSION``: Node version to use in the ``.nvmrc`` file.
   -  ``WAZUH_DASHBOARDS_BRANCH``: Branch of the Wazuh dashboards repository.
   -  ``WAZUH_DASHBOARDS_PLUGINS``: Branch of the Wazuh dashboards Plugins repository.
   -  ``WAZUH_SECURITY_DASHBOARDS_PLUGIN_BRANCH``: Branch of the Wazuh Security Dashboards Plugin repository.
   -  ``OPENSEARCH_DASHBOARDS_VERSION``: Version of the OpenSearch Dashboards. You can find the version in the ``package.json`` file of the Wazuh dashboards repository.
   -  ``-t``: Tag of the image.

   .. code:: console

      $ docker build \
      --build-arg NODE_VERSION=<NODE_VERSION> \
      --build-arg WAZUH_DASHBOARDS_BRANCH=<BRANCH_OF_wazuh-dashboard> \
      --build-arg WAZUH_DASHBOARDS_PLUGINS=<BRANCH_OF_wazuh-dashboard-plugins> \
      --build-arg WAZUH_SECURITY_DASHBOARDS_PLUGIN_BRANCH=<BRANCH_OF_wazuh-security-dashboards-plugin> \
      --build-arg OPENSEARCH_DASHBOARDS_VERSION=<OPENSEARCH_DASHBOARDS_VERSION> \
      -t <TAG_OF_IMAGE> \
      -f wazuh-dashboard.Dockerfile .

   Example:

   .. code:: console

      $ docker build \
      --build-arg NODE_VERSION=$(cat ../../.nvmrc) \
      --build-arg WAZUH_DASHBOARDS_BRANCH=v|WAZUH_CURRENT| \
      --build-arg WAZUH_DASHBOARDS_PLUGINS=v|WAZUH_CURRENT| \
      --build-arg WAZUH_SECURITY_DASHBOARDS_PLUGIN_BRANCH=v|WAZUH_CURRENT| \
      --build-arg OPENSEARCH_DASHBOARDS_VERSION=|OPENSEARCH_DASHBOARDS_VERSION| \
      -t wzd:v|WAZUH_CURRENT| \
      -f wazuh-dashboard.Dockerfile .

#. Run the Docker image:

   .. code:: console

      $ docker run -d --rm --name wazuh-dashboard-package <TAG_OF_IMAGE> tail -f /dev/null

   Example:

   .. code:: console

      $ docker run -d --rm --name wazuh-dashboard-package wzd:v|WAZUH_CURRENT| tail -f /dev/null

#. Copy the package to the host:

   .. code:: console

      $ docker cp wazuh-dashboard-package:/home/node/packages/. <PATH_TO_SAVE_THE_PACKAGE>

   Example:

   .. code:: console

      $ docker cp wazuh-dashboard-package:/home/node/packages/. /

   This copies the final package and the packages that were used to generate the final package.

#. Optional. If you want to generate the .deb or .rpm file, you can use the script ``launcher.sh`` in the ``dev-tools/build-packages/rpm/`` or ``dev-tools/build-packages/deb/`` folder of the repository with the following parameters:

   -  ``-v``: Version of the package.
   -  ``-r``: Revision of the package.
   -  ``-p``: Path to the package in tar.gz format generated in the previous step

   .. code:: console

      $ ./launcher.sh -v <VERSION> -r <REVISION> -p <PATH_TO_PACKAGE>

   Example:

   .. code:: console

      $ ./launcher.sh -v v|WAZUH_CURRENT| -r 1 -p file:///wazuh-dashboard-|WAZUH_CURRENT|-1-linux-x64.tar.gz

The package will be generated in the ``output`` folder of the ``rpm`` or ``deb`` folder.