.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the certs-tool and its options for generating certificates for Wazuh nodes.

Certs tool
==========

The certs-tool is used by running the ``wazuh-certs-tool.sh`` script along with the ``config.yml`` configuration file. The certs tool generates the necessary certificates for the nodes specified in the configuration file.

Options list
------------

+--------------------------------------------------+-----------------------------------------------------------------------------+
| Option                                           | Description                                                                 |
+==================================================+=============================================================================+
| ``-a``, ``--admin-certificates``                 | Creates the admin certificates, add ``root-ca.pem`` and ``root-ca.key``.    |
| ``</path/to/root-ca.pem>`` ``</path/to/root-     |                                                                             |
| ca.key>``                                        |                                                                             |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-A``, ``--all`` ``</path/to/root-ca.pem>``     | Creates certificates specified in ``config.yml`` and admin certificates.    |
| ``</path/to/root-ca.key>``                       | Add a ``root-ca.pem`` and ``root-ca.key`` or leave it empty so a new one    |
|                                                  | will be created.                                                            |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-ca``, ``--root-ca-certificates``              | Creates the root-ca certificates.                                           |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-v``, ``--verbose``                            | Enables verbose mode.                                                       |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-wd``, ``--wazuh-dashboard-certificates``      | Creates the Wazuh dashboard certificates. Add ``root-ca.pem`` and           |
| ``</path/to/root-ca.pem>`` ``</path/to/root-     | ``root-ca.key``.                                                            |
| ca.key>``                                        |                                                                             |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-wi``, ``--wazuh-indexer-certificates``        | Creates the Wazuh indexer certificates. Add ``root-ca.pem`` and             |
| ``</path/to/root-ca.pem>`` ``</path/to/root-     | ``root-ca.key``.                                                            |
| ca.key>``                                        |                                                                             |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-wm``, ``--wazuh-manager-certificates``        | Creates the Wazuh manager certificates. Add ``root-ca.pem`` and             |
| ``</path/to/root-ca.pem>`` ``</path/to/root-     | ``root-ca.key``.                                                            |
| ca.key>``                                        |                                                                             |
+--------------------------------------------------+-----------------------------------------------------------------------------+
| ``-tmp``, ``--cert_tmp_path``                    | Modifies the default tmp directory (``/tmp/wazuh-ceritificates``) to the    |
|                                                  | specified one. Must be used along with one of these options: ``-a``,        |
|                                                  | ``-A``, ``-ca``, ``-wi``, ``-wd``, ``-wm``                                  |
+--------------------------------------------------+-----------------------------------------------------------------------------+
