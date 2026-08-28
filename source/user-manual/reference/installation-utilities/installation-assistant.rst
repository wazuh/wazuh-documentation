.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the Wazuh Installation Assistant, a script that simplifies the deployment of Wazuh manager, indexer, and dashboard components.

.. _reference_wazuh_install_assistant:

Wazuh Installation Assistant
===============================

The Wazuh Installation Assistant is a tool designed to simplify the deployment of Wazuh. It guides users through the process of installing Wazuh components. The Installation Assistant is used by executing the ``wazuh-install.sh`` script.

You can download the Wazuh Installation Assistant here:

.. code-block:: none

   https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh

Options list
--------------

+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| Option                                              | Description                                                                                  |
+=====================================================+==============================================================================================+
| -a, --all-in-one                                    | Install and configure Wazuh manager, Wazuh indexer, Wazuh dashboard.                         |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| -d [pre-release|local], --development               | Use development repositories. By default, it uses the pre-release package repository. If     |
|                                                     | local is specified, it will use a local artifact_urls.yml file located in the same path as   |
|                                                     | the wazuh-install.sh file.                                                                   |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| -dw, --download-wazuh <deb|rpm>                     | Download all the packages necessary for offline installation. Type of packages to download   |
|                                                     | for offline installation (rpm, deb)                                                          |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| -da, --download-arch <amd64|arm64|x86_64|aarch64>   | Define the architecture of the packages to download for offline installation.                |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| -g, --generate-config-files                         | Generate wazuh-install-files.tar file containing the files that will be needed for           |
|                                                     | installation from config.yml. In distributed deployments, you will need to copy this file to |
|                                                     | all hosts.                                                                                   |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| -h, --help                                          | Display this help and exit.                                                                  |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| -i, --ignore-check                                  | Ignore the check for minimum hardware requirements.                                          |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| -id, --install-dependencies                         | Installs the necessary dependencies for the installation automatically.                      |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| -o, --overwrite                                     | Overwrites previously installed components. This will erase all the existing configuration   |
|                                                     | and data.                                                                                    |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| -of, --offline-installation                         | Performs an offline installation. This option must be used with -a, -wm, -s, -wi, or -wd.    |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| -s, --start-cluster                                 | Initializes Wazuh indexer cluster security settings.                                         |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| -u, --uninstall                                     | Uninstalls all Wazuh components. This will erase all the existing configuration and data.    |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| -v, --verbose                                       | Shows the complete installation output.                                                      |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| -V, --version                                       | Shows the version of the script and Wazuh packages.                                          |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| -wd, --wazuh-dashboard <dashboard-node-name>        | Install and configure Wazuh dashboard, used for distributed deployments.                     |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| -wi, --wazuh-indexer <indexer-node-name>            | Install and configure Wazuh indexer, used for distributed deployments.                       |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| -wm, --wazuh-manager <manager-node-name>            | Install and configure Wazuh manager, used for distributed deployments.                       |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+

Install Wazuh using development packages
---------------------------------------------

The official Wazuh packages are downloaded by default when you install Wazuh with the installation assistant. However, if you are developing or testing new features or want to try the pre-release version instead of the official ones, you can do so by specifying the ``-d [pre-release|local], --development`` option to the installation command.

Use pre-release packages
^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you want to use Wazuh pre-release packages instead of the official ones, simply add the ``-d pre-release, --development pre-release`` option to the installation command. For example, to perform an all-in-one installation using pre-release packages, the command would be:

.. code-block:: console

   # sudo bash wazuh-install.sh --all-in-one --development pre-release

Or the short form:

.. code-block:: console

   # sudo bash wazuh-install.sh -a -d pre-release

Use development packages
^^^^^^^^^^^^^^^^^^^^^^^^^^^

To use packages that are in development, it is necessary to have an ``artifact_urls.yml`` file located in the same path as the ``wazuh-install.sh`` script. This file must contain the URLs of the development packages that will be used in the installation.

It must have the following format:

.. code-block:: yaml

   ...
   wazuh_manager_aarch64_rpm: "http://example.com/wazuh-manager.aarch64.rpm"
   wazuh_manager_amd64_deb: "http://example.com/wazuh-manager_amd64.deb"
   wazuh_manager_arm64_deb: "http://example.com/wazuh-manager_arm64.deb"
   wazuh_manager_x86_64_rpm: "http://example.com/wazuh-manager.x86_64.rpm"
   wazuh_indexer_aarch64_rpm: "http://example.com/wazuh-manager.aarch64.rpm"
   wazuh_indexer_amd64_deb: "http://example.com/wazuh-indexer_amd64.deb"
   wazuh_indexer_arm64_deb: "http://example.com/wazuh-indexer_arm64.deb"
   wazuh_indexer_x86_64_rpm: "http://example.com/wazuh-indexer.x86_64.rpm"
   wazuh_dashboard_aarch64_rpm: "http://example.com/wazuh-manager.aarch64.rpm"
   wazuh_dashboard_amd64_deb: "http://example.com/wazuh-dashboard_amd64.deb"
   wazuh_dashboard_arm64_deb: "http://example.com/wazuh-dashboard_arm64.deb"
   wazuh_dashboard_x86_64_rpm: "http://example.com/wazuh-dashboard_64.rpm"
   ...

Then, to use these development packages in the installation, simply add the ``-d local, --development local`` option to the installation command. For example, to perform an all-in-one installation using development packages, the command would be:

.. code-block:: console

   # sudo bash wazuh-install.sh --all-in-one --development local

Or the short form:

.. code-block:: console

   # sudo bash wazuh-install.sh -a -d local

This command will automatically detect the ``artifact_urls.yml`` file in the same path as the ``wazuh-install.sh`` script and will use the URLs specified in it to download the necessary packages for the installation.
