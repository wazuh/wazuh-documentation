.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the Wazuh Installation Assistant and its options for deploying Wazuh components.

Installation Assistant
======================

The Wazuh Installation Assistant is a tool designed to simplify the deployment of Wazuh. It guides users through the process of installing Wazuh components. The Installation Assistant is used by running the ``wazuh-install.sh`` script.

Options list
------------

+--------------------------------------------------+-----------------------------------------------------------------------------+
| Option                                           | Description                                                                 |
+==================================================+=============================================================================+
| ``-a``, ``--all-in-one``                         | Install and configure Wazuh manager, Wazuh indexer, Wazuh dashboard.        |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-d [pre-release\|local]``,                     | Use development repositories. By default it uses the pre-release package    |
| ``--development``                                | repository. If local is specified, it will use a local                      |
|                                                  | ``artifact_urls.yml`` file located in the same path as the                  |
|                                                  | ``wazuh-install.sh``.                                                       |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-dw``, ``--download-wazuh <deb\|rpm>``         | Download all the packages necessary for offline installation. Type of       |
|                                                  | packages to download for offline installation (rpm, deb)                    |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-da``, ``--download-arch                       | Define the architecture of the packages to download for offline             |
| <amd64\|arm64\|x86_64\|aarch64>``                | installation.                                                               |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-g``, ``--generate-config-files``              | Generate ``wazuh-install-files.tar`` file containing the files that will be |
|                                                  | needed for installation from ``config.yml``. In distributed deployments you |
|                                                  | will need to copy this file to all hosts.                                   |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-h``, ``--help``                               | Display this help and exit.                                                 |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-i``, ``--ignore-check``                       | Ignore the check for minimum hardware requirements.                         |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-id``, ``--install-dependencies``              | Installs automatically the necessary dependencies for the installation.     |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-o``, ``--overwrite``                          | Overwrites previously installed components. This will erase all the         |
|                                                  | existing configuration and data.                                            |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-of``, ``--offline-installation``              | Perform an offline installation. This option must be used with ``-a``,      |
|                                                  | ``-wm``, ``-s``, ``-wi``, or ``-wd``.                                       |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-s``, ``--start-cluster``                      | Initialize Wazuh indexer cluster security settings.                         |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-u``, ``--uninstall``                          | Uninstalls all Wazuh components. This will erase all the existing           |
|                                                  | configuration and data.                                                     |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-v``, ``--verbose``                            | Shows the complete installation output.                                     |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-V``, ``--version``                            | Shows the version of the script and Wazuh packages.                         |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-wd``, ``--wazuh-dashboard <dashboard-node-    | Install and configure Wazuh dashboard, used for distributed deployments.    |
| name>``                                          |                                                                             |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-wi``, ``--wazuh-indexer <indexer-node-        | Install and configure Wazuh indexer, used for distributed deployments.      |
| name>``                                          |                                                                             |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-wm``, ``--wazuh-manager <manager-node-        | Install and configure Wazuh manager, used for distributed deployments.      |
| name>``                                          |                                                                             |
+--------------------------------------------------+-----------------------------------------------------------------------------+

Install Wazuh using development packages
----------------------------------------

The official Wazuh packages are downloaded by default when you install Wazuh with the installation assistant. However, if you are developing or testing new features or want to try the pre-release version instead of the official ones, you can do so by specifying the ``-d [pre-release\|local]``, ``--development`` option to the installation command.

Use pre-release packages
^^^^^^^^^^^^^^^^^^^^^^^^

If you want to use Wazuh pre-release packages instead of the official ones, simply add the ``-d pre-release``, ``--development pre-release`` option to the installation command. For example, to perform an all-in-one installation using pre-release packages, the command would be:

.. code-block:: console

   # sudo bash wazuh-install.sh --all-in-one --development pre-release

Or the short form:

.. code-block:: console

   # sudo bash wazuh-install.sh -a -d pre-release

Use development packages
^^^^^^^^^^^^^^^^^^^^^^^^

To use packages that are in development, it is necessary to have an ``artifact_urls.yml`` file located in the same path as the ``wazuh-install.sh`` script. This file must contain the URLs of the development packages that will be used in the installation.

It must have the following format:

.. code-block:: yaml

   wazuh_manager_amd64_deb: "http://example.com/wazuh-manager-amd64.deb"
   wazuh_manager_arm64_deb: "http://example.com/wazuh-manager-arm"
   wazuh_manager_amd64_rpm: "http://example.com/wazuh-manager-amd64.rpm"
   wazuh_manager_arm64_rpm: "http://example.com/wazuh-manager-arm.rpm"
   wazuh_indexer_amd64_deb: "http://example.com/wazuh-indexer-amd64.deb"
   wazuh_indexer_arm64_deb: "http://example.com/wazuh-indexer-arm"
   wazuh_indexer_amd64_rpm: "http://example.com/wazuh-indexer-amd64.rpm"
   wazuh_indexer_arm64_rpm: "http://example.com/wazuh-indexer-arm.rpm"
   wazuh_dashboard_amd64_deb: "http://example.com/wazuh-dashboard-amd64.deb"
   wazuh_dashboard_arm64_deb: "http://example.com/wazuh-dashboard-arm"
   wazuh_dashboard_amd64_rpm: "http://example.com/wazuh-dashboard-amd64.rpm"
   wazuh_dashboard_arm64_rpm: "http://example.com/wazuh-dashboard-arm.rpm"
   ...

Then, to use these development packages in the installation, simply add the ``-d local``, ``--development local`` option to the installation command. For example, to perform an all-in-one installation using development packages, the command would be:

.. code-block:: console

   # sudo bash wazuh-install.sh --all-in-one --development local

Or the short form:

.. code-block:: console

   # sudo bash wazuh-install.sh -a -d local

This command will automatically detect the ``artifact_urls.yml`` file in the same path as the ``wazuh-install.sh`` script and will use the URLs specified in it to download the necessary packages for the installation.
