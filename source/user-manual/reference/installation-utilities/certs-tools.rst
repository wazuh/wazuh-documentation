.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the Wazuh certs tool, a script that generates the certificates needed for a Wazuh deployment.

.. _reference_wazuh_certs_tool:

Wazuh certs tool
==================

The certs-tool is used by running the ``wazuh-certs-tool.sh`` script along with the ``config.yml`` configuration file. The certs tool generates the necessary certificates for the nodes specified in the configuration file.

You can download the Wazuh certs tool here:

.. code-block:: none

   https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh

Options list
--------------

+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| Option                                                                              | Description                                                                                  |
+=====================================================================================+==============================================================================================+
| -a, --admin-certificates </path/to/root-ca.pem> </path/to/root-ca.key>              | Creates the admin certificates; add root-ca.pem and root-ca.key.                             |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -A, --all </path/to/root-ca.pem> </path/to/root-ca.key>                             | Creates certificates specified in config.yml and admin certificates. Add root-ca.pem and     |
|                                                                                     | root-ca.key, or leave it empty so a new one will be created.                                 |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -ca, --root-ca-certificates                                                         | Creates the root-ca certificates.                                                            |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -v, --verbose                                                                       | Enables verbose mode.                                                                        |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -wd, --wazuh-dashboard-certificates </path/to/root-ca.pem> </path/to/root-ca.key>   | Creates the Wazuh dashboard certificates; add root-ca.pem and root-ca.key.                   |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -wi, --wazuh-indexer-certificates </path/to/root-ca.pem> </path/to/root-ca.key>     | Creates the Wazuh indexer certificates; add root-ca.pem and root-ca.key.                     |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -wm, --wazuh-manager-certificates </path/to/root-ca.pem> </path/to/root-ca.key>     | Creates the Wazuh manager certificates; add root-ca.pem and root-ca.key.                     |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -tmp, --cert_tmp_path </path/to/tmp_dir>                                            | Modifies the default tmp directory (/tmp/wazuh-ceritificates) to the specified one. Must be  |
|                                                                                     | used along with one of these options: -a, -A, -ca, -wi, -wd, -wm                             |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
