.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The wazuh-manager-certs tool inspects, checks and updates the CA bundle the Wazuh manager serves to Wazuh agents. Learn more about it in this section of the documentation.

.. _wazuh_manager_certs:

wazuh-manager-certs
===================

The ``wazuh-manager-certs`` tool manages the CA bundle the Wazuh manager serves to Wazuh agents: ``/etc/wazuh-manager/certs/root-ca.pem``, or the file set in ``<remote><https><ca_certificate>``. Wazuh agents use this bundle to verify the Wazuh manager. While the Wazuh manager is installed, this tool is the only program that writes the bundle.

The tool is located at ``/var/wazuh-manager/bin/wazuh-manager-certs``. Run it as root. It works with every Wazuh manager daemon stopped.

.. code-block:: none

   wazuh-manager-certs [-f <file>] [-H <home>] <command>

Commands
--------

+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| Command                                             | Description                                                                                  |
+=====================================================+==============================================================================================+
| ``inspect``                                         | Lists every certificate in the bundle: subject, issuer, expiry date and days left, identity  |
|                                                     | (``x509-sha256:<hex>``), and whether it signs the agent listener certificate on disk. Then   |
|                                                     | shows the publication (generation) of the bundle and whether the Wazuh manager serves it.    |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| ``check``                                           | Validates the bundle without writing anything. Prints nothing when it's valid. On a fresh    |
|                                                     | installation, ``check`` exits with 1 and reports ``no publication block (unpublished)``      |
|                                                     | until you run ``stamp`` on the master node, or ``wazuh-manager-certs --from-master`` on a    |
|                                                     | worker node. That is expected.                                                               |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| ``add <file>``                                      | Adds the CA certificates in ``<file>`` to the bundle.                                        |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| ``remove <identity>``                               | Removes every copy of the certificate with that identity, as ``inspect`` shows it.           |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| ``prune-expired``                                   | Removes the expired certificates. When none has expired, it writes nothing.                  |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| ``stamp``                                           | Publishes the bundle as it is. Use it after you place a bundle by hand.                      |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+
| ``--from-master [--master <host>] [--port <port>]`` | On a worker node, downloads the bundle the master node publishes, verifies it against this   |
|                                                     | node's own bundle, and installs it with the master's generation. By default, it uses the     |
|                                                     | first node of ``<cluster><nodes>`` and the ``<remote><https><port>`` port.                   |
+-----------------------------------------------------+----------------------------------------------------------------------------------------------+

Options
-------

+-------------------+---------------------------------------------------------------------------------------+
| Option            | Description                                                                           |
+===================+=======================================================================================+
| ``-f <file>``     | Configuration file to read. The default is ``/etc/wazuh-manager/wazuh-manager.conf``. |
+-------------------+---------------------------------------------------------------------------------------+
| ``-H <home>``     | Wazuh manager installation directory, used to resolve relative certificate paths.     |
+-------------------+---------------------------------------------------------------------------------------+
| ``-V, --version`` | Displays the version and exits.                                                       |
+-------------------+---------------------------------------------------------------------------------------+
| ``-h, --help``    | Displays the help message and exits.                                                  |
+-------------------+---------------------------------------------------------------------------------------+

``add``, ``remove``, ``prune-expired`` and ``stamp`` publish a new generation of the bundle, and Wazuh agents download it again. They refuse to write, and leave the bundle as it was, when:

-  The node is a worker. Run ``--from-master`` there instead.
-  The result would have no certificate, more than 6 certificates, or more than 8191 bytes.
-  No certificate in the result signs the agent listener certificate.
-  ``add``: a certificate is already in the bundle, isn't a CA, or is expired or not valid yet.

``--master`` and ``--port`` are accepted only with ``--from-master``. Otherwise, the tool prints a usage error and exits with 1. If a worker node can't reach the master node, copy the master's bundle over this node's bundle, keep its owner and mode (``root:wazuh-manager``, ``0640``), and run ``wazuh-manager-certs check``. Don't use ``add`` on a worker node, which refuses it.

Exit status: ``0`` when the command succeeds, ``1`` when the bundle or a certificate is refused (the reason is on standard error), and ``2`` when the tool can't read the configuration, the bundle or the certificate, isn't run as root, or a write fails.

Examples
--------

Add a CA certificate to the bundle:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-certs add /root/new-root-ca.pem

The command output looks similar to this:

.. code-block:: none
   :class: output

   added 1 certificate(s); published generation 1789840000

Rotating the CA
---------------

Use this order to replace the CA that signs the agent listener certificate without interrupting the Wazuh agents. The Wazuh manager reloads the bundle when it changes, so only step 4 needs a restart.

#. On the master node, add the new CA to the bundle. The bundle then carries both CAs, and the old one still signs the listener certificate:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-certs add /root/new-root-ca.pem

#. On each worker node, get the new bundle:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-certs --from-master

#. Wait until the Wazuh agents download the new bundle. Make the wait longer than the longest time a Wazuh agent can stay disconnected in your environment. An agent that is offline the whole time doesn't get the new CA.

#. On every node, replace the Wazuh manager CA and its server certificates, then restart the Wazuh manager:

   #. Place the new CA as ``/etc/wazuh-manager/ca/root-ca.pem``. Replace ``/etc/wazuh-manager/ca/root-ca.key`` with the key of the new CA, or remove it. The old key next to the new CA is refused.
   #. Replace ``/etc/wazuh-manager/certs/remoted.pem`` and ``/etc/wazuh-manager/certs/apid.pem``, with their keys, by pairs signed by the new CA. The Wazuh manager doesn't issue them again.
   #. Check the new files, then restart the Wazuh manager:

      .. code-block:: console

         # /var/wazuh-manager/bin/wazuh-manager-control check && systemctl restart wazuh-manager

   ``wazuh-manager-control reload`` doesn't restart ``wazuh-manager-remoted``, so it doesn't load the new listener certificate.

#. After step 4 is done on every node, remove the old CA from the bundle on the master node. Use the identity that ``inspect`` shows for it:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-certs remove x509-sha256:<OLD_CA_IDENTITY>

   Then run ``wazuh-manager-certs --from-master`` again on each worker node.

A node that still has the old CA in ``/etc/wazuh-manager/ca/`` after the old CA leaves the bundle refuses its next start with ``does not contain /etc/wazuh-manager/ca/root-ca.pem``.
