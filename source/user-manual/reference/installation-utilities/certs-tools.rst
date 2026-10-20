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

The tool reads the root CA, ``root-ca.pem`` and ``root-ca.key``, from the CA directory, the ``wazuh-ca`` folder next to the script. Only ``-A`` and ``-ca`` create the root CA there if none exists.

Options list
--------------

+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| Option                                                                              | Description                                                                                  |
+=====================================================================================+==============================================================================================+
| -a, --admin-certificates                                                            | Creates the admin certificates.                                                              |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -A, --all                                                                           | Creates certificates specified in config.yml and admin certificates. If there is no root CA  |
|                                                                                     | in the CA directory, a new one is created there.                                             |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -ca, --root-ca-certificates                                                         | Creates the root-ca certificates.                                                            |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -v, --verbose                                                                       | Enables verbose mode.                                                                        |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -wd, --wazuh-dashboard-certificates                                                 | Creates the Wazuh dashboard certificates.                                                    |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -wi, --wazuh-indexer-certificates                                                   | Creates the Wazuh indexer certificates.                                                      |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -wm, --wazuh-manager-certificates                                                   | Creates the Wazuh manager certificates.                                                      |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -tmp, --cert_tmp_path </path/to/tmp_dir>                                            | Modifies the default tmp directory (/tmp/wazuh-ceritificates) to the specified one. Must be  |
|                                                                                     | used along with one of these options: -a, -A, -ca, -wi, -wd, -wm                             |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
