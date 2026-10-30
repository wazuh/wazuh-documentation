.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the Wazuh certs tool, a script that generates the certificates needed for a Wazuh deployment.

.. _reference_wazuh_certs_tool:

Wazuh certs tool
==================

The certs-tool is used by running the ``wazuh-certs-tool.sh`` script, as root, along with the ``config.yml`` configuration file. The certs tool generates the necessary certificates for the nodes specified in the configuration file.

You can download the Wazuh certs tool here: `wazuh-certs-tool.sh <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh>`__.

Options list
--------------

+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| Option                                                                              | Description                                                                                  |
+=====================================================================================+==============================================================================================+
| -a, --admin-certificates                                                            | Creates the admin certificates.                                                              |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -A, --all                                                                           | Creates certificates specified in config.yml and admin certificates. If there is no root CA  |
|                                                                                     | in the CA directory, a new one is created there. Includes the load_balancer entries when the |
|                                                                                     | section is present.                                                                          |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -as, --agent-san <ip|dns>                                                           | Adds an extra address to the subject alternative name of every agent listener certificate.   |
|                                                                                     | Repeat it for more than one. Must be used along with -A or -wm.                              |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -ap, --api-san <ip|dns>                                                             | Adds an extra address to the subject alternative name of every Wazuh manager API             |
|                                                                                     | certificate. Repeat it for more than one. Must be used along with -A or -wm.                 |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -ca, --root-ca-certificates                                                         | Creates the root CA in the CA directory, if it does not exist yet. An existing root CA is    |
|                                                                                     | validated and reused, never replaced.                                                        |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -lb, --load-balancer-certificates                                                   | Creates the certificates of the load_balancer entries of config.yml. Only needed by a proxy  |
|                                                                                     | that terminates TLS.                                                                         |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -v, --verbose                                                                       | Enables verbose mode.                                                                        |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -wd, --wazuh-dashboard-certificates                                                 | Creates the Wazuh dashboard certificates.                                                    |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -wi, --wazuh-indexer-certificates                                                   | Creates the Wazuh indexer certificates.                                                      |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -wm, --wazuh-manager-certificates                                                   | Creates the Wazuh manager certificates: the Wazuh indexer client pair (<name>.pem), the      |
|                                                                                     | agent listener pair (<name>-remoted.pem) and the Wazuh manager API pair (<name>-apid.pem).   |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+
| -tmp, --cert_tmp_path </path/to/tmp_dir>                                            | Uses this directory to create the certificates, instead of a new one with a random name in   |
|                                                                                     | /tmp. The directory must not exist, or must be an empty directory owned by root. Must be     |
|                                                                                     | used along with one of these options: -a, -A, -ca, -wi, -wd, -wm                             |
+-------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+

Root CA
---------

The root CA lives in the ``wazuh-ca`` directory next to the tool, or in the directory set in the ``WAZUH_CA_DIR`` environment variable (an absolute path). The ``--generate-config-files`` option of the installation assistant uses the ``wazuh-ca`` directory next to ``wazuh-install.sh`` in the same way:

-  ``root-ca.pem`` (mode ``0644``) is copied to the ``wazuh-certificates`` directory with the new certificates.
-  ``root-ca.key`` (mode ``0400``) stays in the CA directory. It's never copied to ``wazuh-certificates``, so it doesn't travel to the other nodes.
-  ``credentials.env`` holds the passwords that ``--generate-config-files`` creates.

An existing root CA is validated and reused, never replaced. To use a root CA created elsewhere, place ``root-ca.pem`` and ``root-ca.key`` in a ``root:root`` directory with mode ``0700``, with the modes above, and point ``WAZUH_CA_DIR`` at it:

.. code-block:: console

   # sudo WAZUH_CA_DIR=/path/to/ca bash wazuh-certs-tool.sh -A

Back up the CA directory in a safe place. When there is no root CA in the CA directory, ``-A``, ``-ca`` and ``--generate-config-files`` create a new one and log a warning. That's expected for a new deployment, but the nodes of an existing deployment only trust the root CA they were issued from. To issue certificates for an existing deployment, run the tool on the node that holds its root CA, or point ``WAZUH_CA_DIR`` at a copy of it.

Addresses in the Wazuh manager certificates
---------------------------------------------

A Wazuh agent checks the Wazuh manager listener certificate against the address it connects to, and a Wazuh manager API client does the same with the Wazuh manager API certificate. The ``ip`` and ``dns`` fields of each manager node in ``config.yml`` cover the case where clients connect to the node itself. When they connect to an address no single node owns, such as a load balancer, a published name or a NAT address, add it:

-  ``-as, --agent-san`` adds it to the agent listener certificate (``<node>-remoted.pem``) of every Wazuh manager node.
-  ``-ap, --api-san`` adds it to the Wazuh manager API certificate (``<node>-apid.pem``) of every Wazuh manager node. The ``--agent-san`` addresses aren't added to it.

Repeat the option once per address:

.. code-block:: console

   # sudo bash wazuh-certs-tool.sh -A --agent-san wazuh.example.com --api-san api.example.com

A proxy that terminates the agents' TLS sessions presents its own certificate. Declare it in the ``load_balancer`` section of ``config.yml`` and create it with ``-lb``. A passthrough load balancer needs ``--agent-san`` instead.

Renew and deploy certificates
-------------------------------

Run the tool again on the node that holds ``root-ca.key``, with the ``config.yml`` of the deployment, and copy each file to its node. The existing root CA is reused, so every node keeps trusting the others. Remove the ``wazuh-certificates`` directory of a previous run first: the tool doesn't write into one that isn't empty.

+-----------------+----------------------------------------------------+-----------------------------------------------------------------------------------+------------------------------------+
| Node            | File in ``wazuh-certificates``                     | Destination                                                                       | Owner and mode                     |
+=================+====================================================+===================================================================================+====================================+
| Wazuh indexer   | ``<node>.pem``, ``<node>-key.pem``                 | ``/etc/wazuh-indexer/certs/indexer.pem``, ``indexer-key.pem``                     | ``root:wazuh-indexer``, ``0640``   |
+-----------------+----------------------------------------------------+-----------------------------------------------------------------------------------+------------------------------------+
| Wazuh indexer   | ``admin.pem``, ``admin-key.pem``                   | ``/etc/wazuh-indexer/certs/admin.pem``, ``admin-key.pem``                         | ``root:root``, ``0600``            |
+-----------------+----------------------------------------------------+-----------------------------------------------------------------------------------+------------------------------------+
| Wazuh manager   | ``<node>.pem``, ``<node>-key.pem``                 | ``/etc/wazuh-manager/certs/indexer-connector.pem``, ``indexer-connector-key.pem`` | ``root:wazuh-manager``, ``0640``   |
+-----------------+----------------------------------------------------+-----------------------------------------------------------------------------------+------------------------------------+
| Wazuh manager   | ``<node>-remoted.pem``, ``<node>-remoted-key.pem`` | ``/etc/wazuh-manager/certs/remoted.pem``, ``remoted-key.pem``                     | ``root:wazuh-manager``, ``0640``   |
+-----------------+----------------------------------------------------+-----------------------------------------------------------------------------------+------------------------------------+
| Wazuh manager   | ``<node>-apid.pem``, ``<node>-apid-key.pem``       | ``/etc/wazuh-manager/certs/apid.pem``, ``apid-key.pem``                           | ``root:wazuh-manager``, ``0640``   |
+-----------------+----------------------------------------------------+-----------------------------------------------------------------------------------+------------------------------------+
| Wazuh dashboard | ``<node>.pem``, ``<node>-key.pem``                 | ``/etc/wazuh-dashboard/certs/dashboard.pem``, ``dashboard-key.pem``               | ``root:wazuh-dashboard``, ``0640`` |
+-----------------+----------------------------------------------------+-----------------------------------------------------------------------------------+------------------------------------+

Every file stays owned by root: the services read their certificates through their group, and refuse to start when a certificate is owned by another user or is writable by its group or others. Then restart the services: the Wazuh indexer nodes one at a time, waiting for a ``green`` cluster before the next one; every Wazuh manager node; and the Wazuh dashboard. The admin certificate needs no restart. Remove the ``wazuh-certificates`` directory, and every copy of it, once the certificates are in place: it holds private keys.
