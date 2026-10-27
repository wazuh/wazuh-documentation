.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The wazuh-manager-resolve-credentials tool sets up and checks the passwords, certificate authority and certificates of the Wazuh manager. Learn more about it in this section of the documentation.

.. _wazuh_manager_resolve_credentials:

wazuh-manager-resolve-credentials
=================================

The ``wazuh-manager-resolve-credentials`` tool sets up the passwords, the certificate authority (CA) and the certificates the Wazuh manager uses, and checks them before every start. It's located at ``/var/wazuh-manager/bin/wazuh-manager-resolve-credentials``. The package installation and ``wazuh-manager-control`` run it for you. Run it yourself to check the credentials, or to clear them from a container image.

It handles:

-  The passwords of the Wazuh manager API users ``wazuh`` and ``wazuh-internal-client``. A supplied password is used; otherwise one is generated. On a master node, it seeds them into the RBAC database and saves them in ``/etc/wazuh-manager/export/credentials.env``.
-  The password of the ``wazuh-manager`` user on the Wazuh indexer. It's never generated: it's supplied, or read from the Wazuh indexer on the same host, and stored in the keystore.
-  The Wazuh manager CA in ``/etc/wazuh-manager/ca``, published as ``/etc/wazuh-manager/export/ca.pem``.
-  The agent listener pair (``certs/remoted.pem``) and the Wazuh manager API pair (``certs/apid.pem``).
-  The Wazuh indexer CA and client pair (``certs/indexer-ca.pem``, ``certs/indexer-connector.pem``), imported from the Wazuh indexer on the same host or staged by you.

It never replaces a file you staged, never issues a certificate again when one is in place, and never repairs an owner or a mode: an entry with the wrong owner or mode is refused.

.. code-block:: none

   wazuh-manager-resolve-credentials [--install|--upgrade|--prestart|--check|--clear] [-q] [-H <home>]

Modes
-----

+----------------+----------------------------------------------------------------------------------------------+
| Mode           | Description                                                                                  |
+================+==============================================================================================+
| ``--install``  | Run by the package installation and by ``install.sh``. Seeds the passwords, stores the Wazuh |
|                | indexer password, creates the CA when there is none, issues the two server pairs, and        |
|                | imports the Wazuh indexer trust. Always exits with 0.                                        |
+----------------+----------------------------------------------------------------------------------------------+
| ``--upgrade``  | Run by the package upgrade. Completes the passwords, the keystore and the Wazuh indexer      |
|                | trust, and validates the CA and the pairs. It never creates a CA or issues a pair. Always    |
|                | exits with 0.                                                                                |
+----------------+----------------------------------------------------------------------------------------------+
| ``--prestart`` | The default. Run by ``wazuh-manager-control`` before the daemons start. Runs every           |
|                | ``--check`` test, then does what ``--upgrade`` does. Exits with 1 when anything is missing,  |
|                | invalid or unsafe, and the start is refused.                                                 |
+----------------+----------------------------------------------------------------------------------------------+
| ``--check``    | Read-only check, also run by ``wazuh-manager-control`` on ``start``, ``restart`` and         |
|                | ``reload``. Writes nothing. Exits with 1 when it finds a problem.                            |
+----------------+----------------------------------------------------------------------------------------------+
| ``--clear``    | Removes what the resolver created, for example before you save a container image. It keeps a |
|                | CA and Wazuh indexer files you staged, and ``local.env``. It refuses while a Wazuh manager   |
|                | daemon is running.                                                                           |
+----------------+----------------------------------------------------------------------------------------------+

Options
-------

+---------------+----------------------------------------------------------------------------------------------+
| Option        | Description                                                                                  |
+===============+==============================================================================================+
| ``-q``        | Prints only problems.                                                                        |
+---------------+----------------------------------------------------------------------------------------------+
| ``-H <home>`` | Non-default Wazuh manager installation directory. The configuration directory is always      |
|               | ``/etc/wazuh-manager``.                                                                      |
+---------------+----------------------------------------------------------------------------------------------+

Exit status ``2`` means a usage error, a caller that isn't root, another run holding the lock for 60 seconds, or an internal error.

Each problem is one line on standard error, in the form ``KIND <path or key>: <reason>``. No line includes a secret.

+---------+----------------------------------------------------------------------------------------------+
| Kind    | Meaning                                                                                      |
+=========+==============================================================================================+
| MISSING | Something a start needs is absent.                                                           |
+---------+----------------------------------------------------------------------------------------------+
| INVALID | Something in place is wrong, for example an expired certificate or a password that breaks    |
|         | the password rules.                                                                          |
+---------+----------------------------------------------------------------------------------------------+
| UNSAFE  | An entry root can't trust: a wrong owner or mode, a link, or a directory where a file        |
|         | belongs.                                                                                     |
+---------+----------------------------------------------------------------------------------------------+
| WARNING | The Wazuh indexer CA or client pair is expired or not valid yet. The start goes on, and the  |
|         | Wazuh indexer connection fails until the material is renewed.                                |
+---------+----------------------------------------------------------------------------------------------+

Values you supply
-----------------

Put the values in ``/etc/wazuh-manager/local.env``, owned by ``root:root`` with mode ``0600``, as ``NAME=value`` lines. For each key, the first value found wins: the environment of the installation command, then ``local.env``, then, for ``WAZUH_INDEXER_MANAGER_PASSWORD`` only, ``/etc/wazuh-indexer/export/credentials.env``. systemd starts the Wazuh manager with a clean environment, so a value needed at start belongs in ``local.env``. On a package installation, put the variable on the ``sudo`` command line: ``sudo`` drops exported variables.

+-------------------------------------+--------------------------------------------------------------+------------------------------------------+
| Key                                 | Purpose                                                      | When it is not set                       |
+=====================================+==============================================================+==========================================+
| ``WAZUH_MANAGER_API_PASSWORD``      | Password of the Wazuh manager API user ``wazuh``.            | Generated.                               |
+-------------------------------------+--------------------------------------------------------------+------------------------------------------+
| ``WAZUH_MANAGER_WUI_PASSWORD``      | Password of ``wazuh-internal-client``, the user the Wazuh    | Generated.                               |
|                                     | dashboard connects as.                                       |                                          |
+-------------------------------------+--------------------------------------------------------------+------------------------------------------+
| ``WAZUH_INDEXER_MANAGER_PASSWORD``  | Password of the ``wazuh-manager`` user on the Wazuh indexer. | Read from the Wazuh indexer on the same  |
|                                     |                                                              | host. Otherwise, the start is refused    |
|                                     |                                                              | (``MISSING``).                           |
+-------------------------------------+--------------------------------------------------------------+------------------------------------------+
| ``WAZUH_MANAGER_NODE_NAME``         | Common name of the CA and the pairs, and first DNS name of   | The host name up to its first dot.       |
|                                     | both pairs. At most 64 characters.                           |                                          |
+-------------------------------------+--------------------------------------------------------------+------------------------------------------+
| ``WAZUH_MANAGER_REMOTED_CERT_SANS`` | Subject alternative names of the agent listener pair.        | The addresses of the host.               |
+-------------------------------------+--------------------------------------------------------------+------------------------------------------+
| ``WAZUH_MANAGER_APID_CERT_SANS``    | Subject alternative names of the Wazuh manager API pair.     | The addresses of the host.               |
+-------------------------------------+--------------------------------------------------------------+------------------------------------------+

A supplied password must be 12 to 64 characters long, use only ``A-Z a-z 0-9`` and ``. , _ + : @ % ^ = ~ -``, and contain a lowercase letter, an uppercase letter, a digit and one of those symbols.

Examples
--------

Check the credentials without changing anything:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --check
