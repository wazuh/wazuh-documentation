.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh provides an automated way of building the Wazuh dashboard package locally and using a Docker image. Learn more in this section of the documentation.

Wazuh dashboard
===============

Wazuh provides an automated way of building the Wazuh dashboard package locally and using a Docker image. The ``build-packages.sh`` script, located in the ``dev-tools/build-packages/`` folder in the `wazuh-dashboard <https://github.com/wazuh/wazuh-dashboard.git>`__ repository, orchestrates the Wazuh dashboard package generation process. This script bundles plugins into a single application and supports ``tar``, ``rpm``, and ``deb`` distributions. It accepts the following parameters:

-  ``version``
-  ``revision``
-  ``distribution``
-  ``wazuh-dashboard``, ``wazuh-dashboard-plugins``, and ``wazuh-security-dashboards-plugin`` package paths.

.. note::

   Official packages are built through a GitHub Actions pipeline, but the process is designed to be flexible, adaptable, and not strictly tied to GitHub Actions. Additionally, `act <https://github.com/nektos/act>`__ enables local testing and debugging of GitHub Actions workflows. The packages can also be built directly in a local Linux environment.

Building locally
----------------

This section shows how to build the DEB or RPM Wazuh dashboard package locally using NVM and Yarn.

Requirements
^^^^^^^^^^^^

Ensure that these dependencies are installed on the system.

-  **Docker**: Refer to the `Docker installation guide <https://docs.docker.com/engine/install/>`__.
-  **NVM (Node Version Manager)**: Refer to the `NVM installation guide <https://github.com/nvm-sh/nvm#installing-and-updating>`__.
-  **Yarn v1.22.22 (Node Package Manager)**: Refer to the `Yarn installation guide <https://classic.yarnpkg.com/en/docs/install/>`__.
-  **Utilities**. Ensure that the following are installed:

   -  ``zip``
   -  ``unzip``
   -  ``gzip``
   -  ``brotli``
   -  ``curl``

Generating zip packages
^^^^^^^^^^^^^^^^^^^^^^^

To use the ``build-packages.sh`` script, you first need to generate the packages from these repositories:

-  ``wazuh-dashboard``
-  ``wazuh-security-dashboards-plugin``
-  ``wazuh-dashboard-plugins``

Follow the steps below to build the packages:

#. Clone the `wazuh-dashboard <https://github.com/wazuh/wazuh-dashboard>`__ repository, navigate to the ``wazuh-dashboard/`` directory, and build the application:

   .. code:: console

      $ git clone -b v|WAZUH_CURRENT| https://github.com/wazuh/wazuh-dashboard.git && && cd wazuh-dashboard/ && git checkout v|WAZUH_CURRENT|
      $ nvm install $(cat .nvmrc)
      $ nvm use $(cat .nvmrc)
      $ yarn osd bootstrap
      $ yarn build-platform --linux --skip-os-packages --release

#. Clone the `wazuh-security-dashboards-plugin <https://github.com/wazuh/wazuh-security-dashboards-plugin.git>`__ repository in the ``wazuh-dashboard/plugins`` folder and build the plugin:

   .. note::

      Run the following commands while in the ``wazuh-dashboard/`` directory.

   .. code:: console

      $ cd plugins/
      $ git clone -b v|WAZUH_CURRENT| https://github.com/wazuh/wazuh-security-dashboards-plugin.git
      $ cd wazuh-security-dashboards-plugin/
      $ yarn
      $ yarn build

#. Clone the `wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins.git>`__ repository in the ``wazuh-dashboard/plugins`` folder, move into the ``wazuh-dashboard-plugins/`` folder, and build the plugins:

   .. note::

      The yarn build command requires an entry specifying the OpenSearch Dashboard version. This version can be obtained from the ``wazuh-dashboard-plugins/package.json`` file.

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
      $ zip -r -j ./dashboard-package.zip ../wazuh-dashboard/target/opensearch-dashboards-2.*.*-linux-x64.tar.gz
      $ zip -r -j ./security-package.zip ../wazuh-dashboard/plugins/wazuh-security-dashboards-plugin/build/security-dashboards-2.*.*.0.zip
      $ zip -r -j ./wazuh-package.zip ../wazuh-dashboard/plugins/wazuh-check-updates/build/wazuhCheckUpdates-2.*.*.zip ../wazuh-dashboard/plugins/main/build/wazuh-2.*.*.zip ../wazuh-dashboard/plugins/wazuh-core/build/wazuhCore-2.*.*.zip
      $ ls

After completing the previous steps, you will have three packages in the packages folder:

-  ``dashboard-package.zip``
-  ``security-package.zip``
-  ``wazuh-package.zip``

Using the script
^^^^^^^^^^^^^^^^

Run the ``build-packages.sh`` script in the ``dev-tools/build-packages/`` folder of the repository. The script requires the following parameters:

-  ``-c``, ``--commit-sha``: Commit SHA identifier for the build (see :ref:`generating_commit_sha` below).
-  ``-r``: Revision of the package.
-  ``--deb`` or ``--rpm``: Distribution of the package.
-  ``-a``: Path to the ``wazuh-package.zip``.
-  ``-s``: Path to the ``security-package.zip``.
-  ``-b``: Path to the ``dashboard-package.zip``.

.. code:: console

   $ cd ../wazuh-dashboard/dev-tools/build-packages/
   $ ./build-packages.sh --commit-sha <COMMIT_SHA> -r <REVISION> --<DISTRIBUTION> -a file:///<PATH_TO_wazuh-package.zip> -s file:///<PATH_TO_security-package.zip> -b file:///<PATH_TO_dashboard-package.zip>

Where ``--<DISTRIBUTION>`` is either ``--deb`` or ``--rpm``.

Replace the placeholders as shown in the example below.

Example:

.. code:: console

   $ cd ../wazuh-dashboard/dev-tools/build-packages/
   $ ./build-packages.sh --commit-sha c68286b87-b917f56ac-970c46953 -r 1 --deb -a file:///packages/wazuh-package.zip -s file:///packages/security-package.zip -b file:///packages/dashboard-package.zip

The script generates the package in the ``output`` folder of the same directory where it is located. To see the generated package, run the command: ``ls output/deb``.

.. _generating_commit_sha:

Generating the commit SHA
~~~~~~~~~~~~~~~~~~~~~~~~~

#. Run the following command in each relevant repository to obtain individual SHAs. Ensure you are on the correct branch in each repository.

   .. code:: console

      $ git rev-parse --short HEAD

   ===================================== =============================
   Repository                            SHA Variable
   ===================================== =============================
   wazuh-dashboard                       ``<DASHBOARD_COMMIT_SHA>``
   wazuh-dashboard-plugins               ``<PLUGINS_COMMIT_SHA>``
   wazuh-security-dashboards-plugin      ``<SECURITY_COMMIT_SHA>``
   ===================================== =============================

#. Concatenate individual SHAs in the following format. The resulting commit SHA is used for package versioning and build tracking.

   .. code-block:: none

      <DASHBOARD_COMMIT_SHA>-<PLUGINS_COMMIT_SHA>-<SECURITY_COMMIT_SHA>

   Example:

   .. code-block:: none

      c68286b87-b917f56ac-970c46953

Build with Docker image
-----------------------

With this option, you can create an image that has the package in ``tar.gz`` format, and then, if desired you can use the created package to generate the ``deb`` or ``rpm`` file.

Requirements
^^^^^^^^^^^^

Ensure that these dependencies are installed on the system.

-  **Docker**: Refer to `Docker installation guide <https://docs.docker.com/engine/install/>`__.
-  **Internet connection** to download the Docker images for the first time.
-  **Utilities**: Ensure the following are available:

   -  ``jq``
   -  ``curl``

Building the Wazuh dashboard package using Docker
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Clone the `wazuh-dashboard <https://github.com/wazuh/wazuh-dashboard>`__ repository, navigate to the ``wazuh-dashboard/dev-tools/build-packages/`` directory, and build the application.

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

   Replace the placeholders as shown in the example below.

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

   .. code-block:: console

      $ docker run -d --rm --name wazuh-dashboard-package wzd:v|WAZUH_CURRENT| tail -f /dev/null

#. Copy the package to the host and replace ``<PATH_TO_SAVE_THE_PACKAGE>`` with the path where you want to save the package:

   .. code-block:: console

      $ docker cp wazuh-dashboard-package:/home/node/packages/. <PATH_TO_SAVE_THE_PACKAGE>

   Example:

   .. code-block:: console

      $ docker cp wazuh-dashboard-package:/home/node/packages/. /

   This copies the final package and the packages that were used to generate the final package.

#. **Optional**. If you want to generate the ``.deb`` or ``.rpm`` file, you can use the script ``launcher.sh`` in the ``dev-tools/build-packages/rpm/`` or ``dev-tools/build-packages/deb/`` folder of the repository with the following parameters:

   -  ``-v``: Version of the package.
   -  ``-r``: Revision of the package.
   -  ``-p``: Path to the package in tar.gz format generated in the previous step

   .. code-block:: console

      $ ./launcher.sh -v <VERSION> -r <REVISION> -p <PATH_TO_PACKAGE>

   Replace the placeholders as shown in the example below.

   Example:

   .. code-block:: console

      $ ./launcher.sh -v 4.12.0 -r 1 -p file:///wazuh-dashboard-4.11.1-1-linux-x64.tar.gz

   The package will be generated in the ``output`` folder of the ``rpm`` or ``deb`` folder.
