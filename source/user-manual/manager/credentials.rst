.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how the Wazuh manager credential resolver sets up passwords, CAs, and TLS certificates, and how to supply values and fix start refusals.

Wazuh manager credentials and public key infrastructure (PKI)
=============================================================

The Wazuh manager uses a single program, the *credential resolver*, to set up and validate the passwords and certificates it owns or uses. The resolver runs during installation and before every startup. The Wazuh manager starts only if the resolver finds no missing, invalid, or unsafe entries.

The resolver handles the following credentials:

+-------------------------------------------------------------+-----------------------------------------------------------------+-----------------------------------------------------------------------+
| Credential                                                  | Source                                                          | Where it ends up                                                      |
+=============================================================+=================================================================+=======================================================================+
| Wazuh manager API passwords of the ``wazuh`` and            | Supplied by you or generated                                    | Seeded into ``rbac.db`` and published in                              |
| ``wazuh-internal-client`` users                             |                                                                 | ``/etc/wazuh-manager/export/credentials.env``                         |
+-------------------------------------------------------------+-----------------------------------------------------------------+-----------------------------------------------------------------------+
| Password of the ``wazuh-manager`` user on the Wazuh indexer | Supplied by you or read from a Wazuh indexer on the same host   | The Wazuh manager keystore                                            |
+-------------------------------------------------------------+-----------------------------------------------------------------+-----------------------------------------------------------------------+
| The Wazuh manager certificate authority (CA)                | Minted at installation or staged by you                         | ``/etc/wazuh-manager/ca/``, published in                              |
|                                                             |                                                                 | ``/etc/wazuh-manager/export/ca.pem``                                  |
+-------------------------------------------------------------+-----------------------------------------------------------------+-----------------------------------------------------------------------+
| Agent listener and Wazuh manager API certificate pairs      | Issued at installation or staged by you                         | ``/etc/wazuh-manager/certs/remoted.pem`` and ``apid.pem``, with their |
|                                                             |                                                                 | keys                                                                  |
+-------------------------------------------------------------+-----------------------------------------------------------------+-----------------------------------------------------------------------+
| Wazuh dashboard client pair, on a master node only          | Issued when the CA private key is present, or staged by you     | ``/etc/wazuh-manager/export/dashboard-client.pem``, with its key.     |
|                                                             |                                                                 | Nothing uses it yet.                                                  |
+-------------------------------------------------------------+-----------------------------------------------------------------+-----------------------------------------------------------------------+
| Wazuh indexer CA and client pair                            | Imported from a Wazuh indexer on the same host or staged by you | ``/etc/wazuh-manager/certs/indexer-ca.pem`` and                       |
|                                                             |                                                                 | ``indexer-connector.pem``, with its key                               |
+-------------------------------------------------------------+-----------------------------------------------------------------+-----------------------------------------------------------------------+

The resolver stores all credentials and certificates under ``/etc/wazuh-manager``. It does not change file ownership or permissions, reissue an existing server certificate pair, or replace manually staged material. To change the Wazuh indexer password after installation, see :doc:`Wazuh indexer connector </user-manual/manager/wazuh-indexer-connector>`.

How the resolver works
----------------------

The resolver runs in one of five modes to check or configure credentials at the appropriate stage of installation, upgrade, or startup.

The resolver executable is ``/var/wazuh-manager/bin/wazuh-manager-resolve-credentials``. It runs as root and requires exactly one mode:

.. code-block:: none

   /var/wazuh-manager/bin/wazuh-manager-resolve-credentials {--install|--upgrade|--prestart|--check|--clear} [-q] [-H <INSTALL_DIR>]

Where:

-  ``-q`` prints only problems.
-  ``-H <INSTALL_DIR>`` names a non-default installation directory. The configuration directory is always ``/etc/wazuh-manager``.

+----------------+----------------------------------------------------------------------+------------------------------------------------------------------------+--------------------------------------------------------------+
| Mode           | When it runs                                                         | What it does                                                           | Exit codes                                                   |
+================+======================================================================+========================================================================+==============================================================+
| ``--install``  | Package installation (DEB ``postinst``, RPM ``%post``) and           | Seeds the Wazuh manager API passwords, stores the Wazuh indexer        | ``0`` whatever it reports, ``2`` for the errors listed below |
|                | ``install.sh`` on a fresh install                                    | password, mints a CA when none exists, issues the two server pairs,    |                                                              |
|                |                                                                      | and imports the Wazuh indexer trust. On material already in place, it  |                                                              |
|                |                                                                      | only validates.                                                        |                                                              |
+----------------+----------------------------------------------------------------------+------------------------------------------------------------------------+--------------------------------------------------------------+
| ``--upgrade``  | Package upgrade and ``install.sh`` on an update                      | Completes the passwords, keystore, and Wazuh indexer trust, and        | ``0`` whatever it reports, ``2`` for the errors listed below |
|                |                                                                      | publishes the CA in ``export/ca.pem`` when that copy is absent or      |                                                              |
|                |                                                                      | differs. Never mints a CA or issues a server pair.                     |                                                              |
+----------------+----------------------------------------------------------------------+------------------------------------------------------------------------+--------------------------------------------------------------+
| ``--prestart`` | ``wazuh-manager-control`` on ``start``, ``restart``, and ``reload``, | Runs every ``--check`` test, completes what ``--upgrade`` completes,   | ``0`` or ``1``                                               |
|                | after the stop and before the daemons start. Skipped while           | then runs the ``--check`` tests again. Refuses the start when anything |                                                              |
|                | ``wazuh-manager-modulesd`` runs.                                     | is missing, invalid, or unsafe.                                        |                                                              |
+----------------+----------------------------------------------------------------------+------------------------------------------------------------------------+--------------------------------------------------------------+
| ``--check``    | ``wazuh-manager-control`` on ``start``, ``restart``, ``reload``, and | Read-only check. Writes nothing and takes no lock, so it is safe while | ``0`` or ``1``                                               |
|                | ``check``, before anything is stopped                                | the Wazuh manager runs.                                                |                                                              |
+----------------+----------------------------------------------------------------------+------------------------------------------------------------------------+--------------------------------------------------------------+
| ``--clear``    | You, when building a container image                                 | Removes what the resolver made. See                                    | ``0`` or ``1``                                               |
|                |                                                                      | :ref:`Container images <manager_credentials_container_images>`.        |                                                              |
+----------------+----------------------------------------------------------------------+------------------------------------------------------------------------+--------------------------------------------------------------+

Exit code ``2`` indicates a usage error, a non-root caller, a lock held by another resolver process for 60 seconds, or an internal error. Running the resolver without specifying a mode prints the usage information and exits with code ``2``.

The installer does not fail the package transaction when the resolver reports an error. Instead, the package output displays ``Credential resolution is incomplete``, followed by the recommended next step. The Wazuh manager checks the resolver's result before startup and does not start if credential resolution remains incomplete.

Resolver output
^^^^^^^^^^^^^^^

Progress messages are written to standard output and use the ``resolve-credentials:`` prefix. Each error is written as a separate line to standard error in the format ``<KIND> <SUBJECT>: <REASON>``, where ``<SUBJECT>`` is a file path or key name. The output never includes secret values.

+-------------+------------------------------------------------------------------------+------------------------------------------------------------------+
| Kind        | Meaning                                                                | Example                                                          |
+=============+========================================================================+==================================================================+
| ``MISSING`` | Something the start needs is absent.                                   | ``MISSING WAZUH_INDEXER_MANAGER_PASSWORD: set it in              |
|             |                                                                        | /etc/wazuh-manager/local.env ...``                               |
+-------------+------------------------------------------------------------------------+------------------------------------------------------------------+
| ``INVALID`` | Something in place is wrong.                                           | ``INVALID /etc/wazuh-manager/certs/remoted.pem: expired``        |
+-------------+------------------------------------------------------------------------+------------------------------------------------------------------+
| ``UNSAFE``  | An entry root can't trust: wrong owner or mode, a link, or a directory | ``UNSAFE /etc/wazuh-manager/local.env: group-writable``          |
|             | where a file belongs.                                                  |                                                                  |
+-------------+------------------------------------------------------------------------+------------------------------------------------------------------+
| ``WARNING`` | Wazuh indexer material that only the clock refuses (expired or not     | ``resolve-credentials: WARNING:                                  |
|             | valid yet). It doesn't refuse the start, but the Wazuh indexer         | /etc/wazuh-manager/certs/indexer-connector.pem: expired on ...`` |
|             | connection fails until you renew the material or fix the clock.        |                                                                  |
+-------------+------------------------------------------------------------------------+------------------------------------------------------------------+

The ``--check`` mode reports ``MISSING`` only for what ``--prestart`` can't complete either. These entries are the CA, the agents' CA bundle, the server pairs, and Wazuh indexer files with nothing to import. It never reports the Wazuh indexer password as missing, because only ``--prestart`` reads the keystore.

Directory layout
----------------

The following table lists the required owner and permissions for each entry. Every other entry under ``/etc/wazuh-manager`` that the resolver reads must be owned by root, must not be group- or world-writable, and must have exactly one hard link. Secrets, such as ``local.env``, private keys, and published password files, must not have any group or other permission bits set. Where the table specifies an exact mode, the permissions must match it precisely. The resolver rejects any entry that violates these requirements as ``UNSAFE`` and does not modify it.

+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| Path                                                                  | Owner:group            | Mode                                                      | Contents                                                             |
+=======================================================================+========================+===========================================================+======================================================================+
| ``/etc/wazuh-manager/``                                               | ``root:wazuh-manager`` | ``0770`` (any mode that keeps the group ``rwx`` and isn't | The configuration directory                                          |
|                                                                       |                        | world-writable)                                           |                                                                      |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| ``/etc/wazuh-manager/local.env``                                      | ``root:root``          | ``0600`` or ``0400``                                      | Values you supply                                                    |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| ``/etc/wazuh-manager/ca/``                                            | ``root:root``          | ``0700`` exactly                                          | The Wazuh manager CA                                                 |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| ``ca/root-ca.pem``                                                    | ``root:root``          | ``0644``                                                  | The CA certificate                                                   |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| ``ca/root-ca.key``                                                    | ``root:root``          | ``0400``                                                  | The CA private key. Absent when you stage the certificate alone.     |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| ``ca/.wazuh-manager-bootstrap-ca``                                    | ``root:root``          | ``0600``                                                  | Marker: this host minted the CA                                      |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| ``/etc/wazuh-manager/export/``                                        | ``root:root``          | ``0700`` exactly                                          | What the Wazuh manager publishes for the Wazuh dashboard on the same |
|                                                                       |                        |                                                           | host                                                                 |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| ``export/credentials.env``                                            | ``root:root``          | ``0600`` exactly                                          | The two Wazuh manager API passwords                                  |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| ``export/ca.pem``                                                     | ``root:root``          | ``0644``                                                  | Copy of ``ca/root-ca.pem``, used by clients to verify the Wazuh      |
|                                                                       |                        |                                                           | manager API                                                          |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| ``export/dashboard-client.pem``                                       | ``root:root``          | ``0644``                                                  | Wazuh dashboard client certificate, issued on a master node for a    |
|                                                                       |                        |                                                           | future import                                                        |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| ``export/dashboard-client-key.pem``                                   | ``root:root``          | ``0600``                                                  | Its private key                                                      |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| ``export/.dashboard-client.issued``                                   | ``root:root``          | ``0600``                                                  | Marker: fingerprints of the pair the resolver issued                 |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| ``/etc/wazuh-manager/certs/``                                         | ``root:wazuh-manager`` | ``0750`` exactly                                          | TLS material the daemons read                                        |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| ``certs/root-ca.pem``                                                 | ``root:wazuh-manager`` | ``0640`` exactly                                          | The agents' CA bundle. Written only when absent.                     |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| ``certs/remoted.pem``, ``certs/remoted-key.pem``                      | ``root:wazuh-manager`` | ``0640`` exactly                                          | Agent listener pair, also used by agent enrollment                   |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| ``certs/apid.pem``, ``certs/apid-key.pem``                            | ``root:wazuh-manager`` | ``0640`` exactly                                          | Wazuh manager API pair                                               |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| ``certs/indexer-ca.pem``                                              | ``root:wazuh-manager`` | ``0640`` exactly                                          | The CA the Wazuh indexer connector trusts                            |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| ``certs/indexer-connector.pem``, ``certs/indexer-connector-key.pem``  | ``root:wazuh-manager`` | ``0640`` exactly                                          | Client pair the Wazuh manager presents to the Wazuh indexer          |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+
| ``certs/.indexer-ca.imported``, ``certs/.indexer-connector.imported`` | ``root:wazuh-manager`` | ``0640``                                                  | Markers: these files were imported, not staged                       |
+-----------------------------------------------------------------------+------------------------+-----------------------------------------------------------+----------------------------------------------------------------------+

The ``wazuh-manager`` service account accesses files in ``certs/`` through its group membership. It cannot read files in ``ca/``, ``export/``, or ``local.env``.

The ``/etc/wazuh-manager`` directory must retain group read, write, and execute permissions. For example, the resolver rejects mode ``0750`` with the following error: ``UNSAFE /etc/wazuh-manager: mode is 0750, missing 0020``.

.. _manager_credentials_local_env:

Provide values with local.env
-----------------------------

The ``/etc/wazuh-manager/local.env`` file stores values that you provide to the resolver. You can create this file before or after installing the package.

Accepted keys
^^^^^^^^^^^^^

These keys let you set the passwords and certificate names yourself, instead of using generated or discovered values.

+-------------------------------------+------------------------------------------------------------------------+------------------------------------------------------------------------+
| Key                                 | Purpose                                                                | When unset                                                             |
+=====================================+========================================================================+========================================================================+
| ``WAZUH_MANAGER_API_PASSWORD``      | Password of the Wazuh manager API user ``wazuh``                       | Generated                                                              |
+-------------------------------------+------------------------------------------------------------------------+------------------------------------------------------------------------+
| ``WAZUH_MANAGER_WUI_PASSWORD``      | Password of ``wazuh-internal-client``, the user the Wazuh dashboard    | Generated                                                              |
|                                     | authenticates as                                                       |                                                                        |
+-------------------------------------+------------------------------------------------------------------------+------------------------------------------------------------------------+
| ``WAZUH_INDEXER_MANAGER_PASSWORD``  | Password of the ``wazuh-manager`` user on the Wazuh indexer            | Read from ``/etc/wazuh-indexer/export/credentials.env`` when the Wazuh |
|                                     |                                                                        | indexer runs on this host. Otherwise the start refuses with            |
|                                     |                                                                        | ``MISSING``.                                                           |
+-------------------------------------+------------------------------------------------------------------------+------------------------------------------------------------------------+
| ``WAZUH_MANAGER_NODE_NAME``         | Common name and first DNS name of both server pairs, and the CA common | The host name up to its first dot                                      |
|                                     | name ``wazuh-manager-<NODE_NAME>`` when the CA is minted. It must be a |                                                                        |
|                                     | valid DNS name of at most 64 characters, or at most 50 when the CA is  |                                                                        |
|                                     | minted.                                                                |                                                                        |
+-------------------------------------+------------------------------------------------------------------------+------------------------------------------------------------------------+
| ``WAZUH_MANAGER_REMOTED_CERT_SANS`` | Subject alternative names of the agent listener pair                   | Discovered. See :ref:`Certificate SANs <manager_credentials_sans>`.    |
+-------------------------------------+------------------------------------------------------------------------+------------------------------------------------------------------------+
| ``WAZUH_MANAGER_APID_CERT_SANS``    | Subject alternative names of the Wazuh manager API pair                | Discovered. See :ref:`Certificate SANs <manager_credentials_sans>`.    |
+-------------------------------------+------------------------------------------------------------------------+------------------------------------------------------------------------+

A password you supply must meet the following rules:

-  12 to 64 characters long
-  Only the characters ``A-Z a-z 0-9`` and ``. , _ + : @ % ^ = ~ -``
-  At least one lowercase letter, one uppercase letter, one digit, and one of those symbols

A generated password is 32 characters long and follows the same rules. A value that breaks a rule is reported as ``INVALID`` and is never replaced by a generated one. The start refuses until you fix it. An empty password value counts as unset.

The ``WAZUH_MANAGER_CERT_SANS`` key no longer exists. When the key is set, a run that issues a server pair prints a warning that the key is ignored and goes on.

File format
^^^^^^^^^^^

The resolver reads ``local.env`` with a strict grammar, so one malformed line rejects the whole file.

The file holds ``NAME=value`` lines and follows these rules:

-  The resolver trims whitespace at the start and end of each line.
-  It skips blank lines and lines whose first non-blank character is ``#``. A ``#`` after a value is part of the value.
-  It removes one pair of matching single or double quotes around the value.
-  It doesn't expand or unescape anything.
-  It doesn't allow whitespace before the ``=``. A line such as ``NAME = value`` or ``export NAME=value`` makes the resolver reject the whole file with ``INVALID /etc/wazuh-manager/local.env:<LINE>: not a NAME=value line``, where ``<LINE>`` is the line number. Whitespace after the ``=`` becomes part of the value, so a password written as ``NAME= value`` is reported as ``INVALID``.
-  It also rejects the whole file for an unbalanced quote, a name given twice, or a line that isn't UTF-8.

When the resolver rejects ``local.env`` as unsafe or malformed, it generates and seeds nothing in that run.

Create local.env
^^^^^^^^^^^^^^^^

A ``local.env`` file sets the passwords and names the resolver uses. Create it before the installation when you want the first run to use your values.

#. If the Wazuh manager package isn't installed yet, create the configuration directory, and the package sets its group at installation.

   .. code-block:: console

      # install -d -m 0770 -o root -g root /etc/wazuh-manager

#. Create the file with the required owner and mode.

   .. code-block:: console

      # install -m 0600 -o root -g root /dev/null /etc/wazuh-manager/local.env

#. Add the values you want to supply to ``/etc/wazuh-manager/local.env``, as in this example:

   .. code-block:: ini

      WAZUH_INDEXER_MANAGER_PASSWORD='<INDEXER_MANAGER_PASSWORD>'
      WAZUH_MANAGER_API_PASSWORD='<API_PASSWORD>'

   Where:

   -  ``<INDEXER_MANAGER_PASSWORD>`` is the password of the ``wazuh-manager`` user on the Wazuh indexer.
   -  ``<API_PASSWORD>`` is the password you want for the Wazuh manager API user ``wazuh``.

#. Check that the file has the required owner and mode.

   .. code-block:: console

      # stat -c '%U:%G %a' /etc/wazuh-manager/local.env

   The output must be ``root:root 600`` or ``root:root 400``.

Value lookup order
^^^^^^^^^^^^^^^^^^

A key can come from more than one place, so the resolver applies a fixed precedence. The resolver looks up each key in the following order and uses the first value it finds:

#. The process environment

#. ``/etc/wazuh-manager/local.env``

#. For ``WAZUH_INDEXER_MANAGER_PASSWORD`` only, the Wazuh indexer file ``/etc/wazuh-indexer/export/credentials.env``

systemd starts the Wazuh manager with a clean environment, so put any value the start needs in ``local.env``. Only ``wazuh-manager-control start`` run by hand sees the variables exported in its shell.

To pass a value through the environment during a package installation, put the variable on the ``sudo`` command line. With ``env_reset`` active, which is the default on every distribution Wazuh supports, ``sudo`` drops exported variables before they reach the package scripts. For example, on a DEB-based system:

.. code-block:: console

   $ sudo WAZUH_INDEXER_MANAGER_PASSWORD='<INDEXER_MANAGER_PASSWORD>' apt-get install wazuh-manager

Where ``<INDEXER_MANAGER_PASSWORD>`` is the password of the ``wazuh-manager`` user on the Wazuh indexer.

.. _manager_credentials_sans:

Certificate SANs
----------------

Subject alternative names (SANs) are the names and addresses a client accepts for a server certificate. Each pair must list every name that agents or clients use to reach the node.

Each server pair has its own SAN list:

-  ``WAZUH_MANAGER_REMOTED_CERT_SANS`` for the agent listener pair, ``remoted.pem``
-  ``WAZUH_MANAGER_APID_CERT_SANS`` for the Wazuh manager API pair, ``apid.pem``

The Wazuh manager API list never inherits the agent listener list. A list holds comma-separated entries in the form ``DNS:<NAME>``, ``IP:<ADDRESS>``, or a bare value. A bare value is an address when it has a colon or only digits and dots, and a name otherwise. The resolver refuses zone IDs, prefixes, and wildcards. It always appends ``localhost``, ``127.0.0.1``, and ``::1``.

.. code-block:: ini

   WAZUH_MANAGER_REMOTED_CERT_SANS=DNS:<MANAGER_FQDN>,IP:<MANAGER_IP>

Where:

-  ``<MANAGER_FQDN>`` is the DNS name agents use to reach this node.
-  ``<MANAGER_IP>`` is the IP address agents use to reach this node.

The resolver judges a SAN list on every run, including ``--check``. While an invalid list stays in the environment or in ``local.env``, every start is refused with ``Invalid credentials``, even if the pairs were issued earlier. An invalid list also stops the issuance of both pairs.

When a list is unset, the resolver discovers the names in this order:

#. The node name, then the fully qualified name when it differs

#. Every global address of every interface, including interfaces that are down or virtual. This covers every IPv4 address, secondary ones included, and the IPv6 addresses that aren't deprecated or tentative. Loopback and link-local addresses are left out.

#. The loopback names

When no address is found, the pairs name only the node and loopback, and the resolver warns which variable to set. To leave out an address you don't want in the certificates, such as a container bridge address, set the list yourself.

The SAN lists apply only when a pair is issued. To change the names in a pair that already exists, reissue it. See :ref:`Reissue a server certificate pair <manager_credentials_reissue_pair>`. For agent listener SANs in a cluster, see Wazuh manager cluster.

.. _manager_credentials_reissue_pair:

Reissue a server certificate pair
---------------------------------

The resolver issues a server pair only during ``--install``, and only when the pair is absent and ``/etc/wazuh-manager/ca/`` holds the CA private key. At every other run, it only checks the pair. It reports a broken pair or half a pair and never repairs it.

The resolver issues the new pair with the current node name and SAN list. If ``ca/`` holds only the CA certificate, stage a new pair from your public key infrastructure (PKI) instead, with ``root:wazuh-manager`` ownership and mode ``0640``.

.. warning::

   These steps delete the current certificate and key of the pair. Copy both files to a safe location first so you can restore them if the new pair is refused.

Run these steps as root:

#. Stop the Wazuh manager so that ``--install`` can open the keystore, which a running Wazuh manager holds.

   .. code-block:: console

      # systemctl stop wazuh-manager

#. Update the SAN list in ``/etc/wazuh-manager/local.env`` if the names changed.

#. Remove both files of the pair, for example the Wazuh manager API pair:

   .. code-block:: console

      # rm /etc/wazuh-manager/certs/apid.pem /etc/wazuh-manager/certs/apid-key.pem

   For the agent listener pair, remove ``remoted.pem`` and ``remoted-key.pem`` instead.

#. Issue the missing pair.

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --install

#. Start the Wazuh manager.

   .. code-block:: console

      # systemctl start wazuh-manager

#. Check that the credentials pass the start checks.

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --check

   The output includes ``resolve-credentials: check: no problem found``.

   The resolver prints a line such as ``resolve-credentials: /etc/wazuh-manager/certs/apid.pem: issued; DN CN=<NODE_NAME>,...; SANs ...`` for the new pair, where ``<NODE_NAME>`` is the node name the pair carries.

Trust a remote Wazuh indexer
----------------------------

The Wazuh indexer connector trusts ``certs/indexer-ca.pem`` and presents ``certs/indexer-connector.pem`` with its key. When the Wazuh indexer runs on the same host, the resolver imports these files from ``/etc/wazuh-indexer/export/``. When the Wazuh indexer runs on another host, there is nothing to import, so you stage the files yourself.

A marker file in ``certs/`` decides how the resolver treats each file.

+------------------------------------------+------------------------------------------------------------------------+
| State in certs/                          | What happens                                                           |
+==========================================+========================================================================+
| Absent                                   | Imported from ``/etc/wazuh-indexer/export/`` when the Wazuh indexer is |
|                                          | on this host, with the marker written first. Otherwise ``MISSING``.    |
+------------------------------------------+------------------------------------------------------------------------+
| Present with its marker (imported)       | Imported again when the Wazuh indexer files change. Kept when they     |
|                                          | don't change or when the export is gone.                               |
+------------------------------------------+------------------------------------------------------------------------+
| Present without a marker (staged by you) | Validated at every start and never replaced                            |
+------------------------------------------+------------------------------------------------------------------------+
| Only one file of the pair                | ``INVALID``, half a pair                                               |
+------------------------------------------+------------------------------------------------------------------------+

The staged files must meet these requirements:

-  ``indexer-ca.pem`` holds only CA certificates within their validity window.
-  ``indexer-connector.pem`` is issued by the Wazuh indexer CA for this node, either directly or through intermediate CAs that follow the leaf in the file.
-  The leaf isn't a CA, matches its key, and carries an ``extendedKeyUsage`` with ``clientAuth``.

Run these steps as root on the Wazuh manager node, after installing the package and before the first start:

#. Stage the Wazuh indexer CA certificate.

   .. code-block:: console

      # install -m 0640 -o root -g wazuh-manager <INDEXER_CA_FILE> /etc/wazuh-manager/certs/indexer-ca.pem

#. Stage the client certificate the Wazuh indexer CA issued for this node.

   .. code-block:: console

      # install -m 0640 -o root -g wazuh-manager <CLIENT_CERT_FILE> /etc/wazuh-manager/certs/indexer-connector.pem

#. Stage its private key.

   .. code-block:: console

      # install -m 0640 -o root -g wazuh-manager <CLIENT_KEY_FILE> /etc/wazuh-manager/certs/indexer-connector-key.pem

#. Set ``WAZUH_INDEXER_MANAGER_PASSWORD`` in ``/etc/wazuh-manager/local.env``. See :ref:`Provide values with local.env <manager_credentials_local_env>`.

#. In ``/etc/wazuh-manager/wazuh-manager.conf``, change the ``<indexer><hosts><host>`` value from ``https://127.0.0.1:9200`` to ``https://<INDEXER_ADDRESS>:9200``.

   Where ``<INDEXER_ADDRESS>`` is the IP address or DNS name of the Wazuh indexer node. For the other connector options, see :doc:`Wazuh indexer connector </user-manual/manager/wazuh-indexer-connector>`.

#. Check the credentials.

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --check

   The output includes ``resolve-credentials: check: no problem found``. A ``(<N> warnings)`` suffix means only Wazuh indexer material that the clock refuses was reported, where ``<N>`` is the number of warnings.

Where:

-  ``<INDEXER_CA_FILE>`` is the Wazuh indexer CA certificate, for example the Wazuh indexer ``export/ca.pem``.
-  ``<CLIENT_CERT_FILE>`` and ``<CLIENT_KEY_FILE>`` are this node's certificate and key issued by the Wazuh indexer CA, for example from ``wazuh-install-files.tar`` when you used the installation assistant.

When the Wazuh indexer on the same host publishes its CA but no client pair, the resolver imports the CA and reports ``MISSING /etc/wazuh-manager/certs/indexer-connector.pem``. This case is typical after a deployment with the installation assistant. Stage the pair as in steps 2 and 3, then start the Wazuh manager.

Every run of ``--install``, ``--upgrade``, and ``--prestart`` names the client pair in place, for example ``resolve-credentials: /etc/wazuh-manager/certs/indexer-connector.pem: DN CN=wazuh-manager,OU=Wazuh,O=Wazuh; SANs none``.

Cluster nodes
-------------

Every node resolves its own credentials. The cluster doesn't synchronize ``ca/``, ``export/``, ``local.env``, or ``certs/``.

-  Stage the same CA on every node before installing, so that agents trust whichever node they reach. A node that mints its own CA trusts only itself. See Wazuh manager cluster for the procedure.
-  Each node presents its own agent listener pair, which must name the addresses agents use to reach that node.
-  Only a node configured as master seeds ``rbac.db``. A fresh install configures every node as master, so a worker also seeds ``rbac.db`` and publishes ``export/credentials.env`` at install. Once the node is a worker, those files authenticate nothing. Read the passwords on the master.
-  The cluster doesn't replicate ``rbac.db``. To make a promoted worker come up with the passwords you know, set the same ``WAZUH_MANAGER_API_PASSWORD`` and ``WAZUH_MANAGER_WUI_PASSWORD`` in every node's ``local.env`` before installing it.

Start refusals and troubleshooting
----------------------------------

When the credentials aren't ready, ``wazuh-manager-control`` refuses to start the Wazuh manager and names the cause, so you can fix it before any daemon runs.

On ``start``, ``restart``, and ``reload``, ``wazuh-manager-control`` checks in this order and refuses on the first failure:

#. The configuration file itself. A failure prints ``wazuh-manager.conf: Configuration error. Exiting``.

#. The credentials, with ``--check``.

#. The files the configuration names and each daemon's own test.

When the credential check fails, ``wazuh-manager-control`` relays the resolver lines to standard error and to ``/var/wazuh-manager/logs/wazuh-manager.log``, starts nothing, and exits ``1``. Under systemd, the same lines reach the journal. Use ``journalctl -u wazuh-manager`` to read them.

+---------------------------------+-------------------------------------------+------------------------------------------------------------+----------------------------------------------------------------+
| Cause                           | Message                                   | ``-j`` output                                              | Log line                                                       |
+=================================+===========================================+============================================================+================================================================+
| ``--check`` reports ``UNSAFE``  | ``Unsafe credentials. Exiting``           | ``{"error":22,"message":"Unsafe credentials."}``           | ``wazuh-manager-control: ERROR: unsafe credentials``           |
+---------------------------------+-------------------------------------------+------------------------------------------------------------+----------------------------------------------------------------+
| ``--check`` reports ``INVALID`` | ``Invalid credentials. Exiting``          | ``{"error":22,"message":"Invalid credentials."}``          | ``wazuh-manager-control: ERROR: invalid credentials``          |
+---------------------------------+-------------------------------------------+------------------------------------------------------------+----------------------------------------------------------------+
| ``--check`` reports ``MISSING`` | ``Unresolved credentials. Exiting``       | ``{"error":21,"message":"Unresolved credentials."}``       | ``wazuh-manager-control: ERROR: unresolved credentials``       |
+---------------------------------+-------------------------------------------+------------------------------------------------------------+----------------------------------------------------------------+
| The check itself can't run      | ``Cannot check the credentials. Exiting`` | ``{"error":22,"message":"Cannot check the credentials."}`` | ``wazuh-manager-control: ERROR: cannot check the credentials`` |
+---------------------------------+-------------------------------------------+------------------------------------------------------------+----------------------------------------------------------------+
| ``--prestart`` fails            | ``Unresolved credentials. Exiting``       | ``{"error":21,"message":"Unresolved credentials."}``       | ``wazuh-manager-control: ERROR: unresolved credentials``       |
+---------------------------------+-------------------------------------------+------------------------------------------------------------+----------------------------------------------------------------+

When ``--check`` reports more than one kind, the first of ``UNSAFE``, ``INVALID``, and ``MISSING`` names the refusal. The check can't run when the caller isn't root or the resolver has an internal error.

A ``WARNING`` refuses nothing. The ``wazuh-manager-control`` script also writes it to ``wazuh-manager.log`` as ``wazuh-manager-control: WARNING: <PATH>: ...``, where ``<PATH>`` is the file the warning names.

To see the full list of problems, run the check yourself:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --check

When the check finds no problem, the output includes ``resolve-credentials: check: no problem found``.

The ``wazuh-manager-control restart`` command runs the checks before it stops anything, so a refused restart leaves the running daemons as they are. ``systemctl restart wazuh-manager`` stops the Wazuh manager before any check, so a refusal leaves it down. Run the check before you restart with systemd:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-control check

When every check passes, the command prints ``Configuration and credentials checks passed.``

When the installation output reports that credential resolution is incomplete, fix every reported entry, then follow the next step the output names:

-  When the CA, the agents' CA bundle, or a server pair is missing, or an entry is ``INVALID`` or ``UNSAFE``, run ``/var/wazuh-manager/bin/wazuh-manager-resolve-credentials --install -H /var/wazuh-manager`` as root.
-  When a server pair is missing with the reason ``no CA key to issue it``, stage this node's pairs in ``/etc/wazuh-manager/certs`` and start the Wazuh manager. The node doesn't need the CA private key.
-  When only the Wazuh indexer password, CA, or client pair is missing, supply them and start the Wazuh manager. The start completes them.

Back up credentials
-------------------

Back up the credentials of every node with that node, because the cluster doesn't restore them. The start checks the pairs and the agents' CA bundle against the CA in ``ca/``, so restore ``certs/`` and ``ca/`` together.

+-----------------------------------------------------------+-----------------------------------------------------------------------+----------------------------+
| Path                                                      | Contents                                                              | Nodes                      |
+===========================================================+=======================================================================+============================+
| ``/etc/wazuh-manager/certs/``                             | Server pairs, the agents' CA bundle, the Wazuh indexer trust, and the | Every node                 |
|                                                           | import markers                                                        |                            |
+-----------------------------------------------------------+-----------------------------------------------------------------------+----------------------------+
| ``/etc/wazuh-manager/ca/``                                | The CA, including ``root-ca.key`` when the node issues pairs          | Every node                 |
+-----------------------------------------------------------+-----------------------------------------------------------------------+----------------------------+
| ``/etc/wazuh-manager/export/``                            | Published files, including the Wazuh manager API passwords            | Every node                 |
+-----------------------------------------------------------+-----------------------------------------------------------------------+----------------------------+
| ``/etc/wazuh-manager/local.env``                          | The values you supplied                                               | Every node, when present   |
+-----------------------------------------------------------+-----------------------------------------------------------------------+----------------------------+
| ``/var/wazuh-manager/queue/keystore/``                    | The Wazuh indexer credentials                                         | Every node                 |
+-----------------------------------------------------------+-----------------------------------------------------------------------+----------------------------+
| ``/var/wazuh-manager/api/configuration/security/rbac.db`` | Wazuh manager API users, roles, and policies                          | Master node or single node |
+-----------------------------------------------------------+-----------------------------------------------------------------------+----------------------------+

The backup holds the CA private key and the Wazuh indexer credentials. Restrict access to it, for example with ``chmod -R go-rwx`` on the backup directory. After a restore, return ``local.env`` to ``root:root`` ``0600`` and run ``--check`` before you start the Wazuh manager.

.. _manager_credentials_container_images:

Container images
----------------

An image built by installing the package carries what the installation resolved: a seeded ``rbac.db``, a minted CA with its private key, and issued pairs. Every container started from that image shares them. Clear them at the end of the image build, then resolve each container's own credentials before its first start.

Add this line at the end of the Dockerfile:

.. code-block:: docker

   RUN /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --clear

Run this command in the container entrypoint, before the first start. In a restarted container that already resolved its credentials, it changes nothing.

.. code-block:: bash

   /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --install

The ``--clear`` mode refuses while any Wazuh manager daemon runs. It removes the following:

-  The two server pairs and ``certs/root-ca.pem``
-  The Wazuh indexer files that carry an import marker, and their markers
-  The CA in ``ca/``, only when its mint marker is there
-  The contents of ``export/``, except a Wazuh dashboard client pair you provided
-  ``rbac.db``
-  The keystore contents

It keeps a CA you staged, Wazuh indexer files you staged, a Wazuh dashboard client pair you provided, and ``local.env``. It prints a ``kept`` line for each one. A successful run ends with ``resolve-credentials: cleared; the next --install resolves from nothing``.

.. warning::

   The ``rbac.db`` database holds every Wazuh manager API user, role, policy, and rule, not only the two default users. ``--clear`` removes nothing when any entry is unsafe. A removal that fails makes the run exit ``1`` without the ``cleared`` line, so check the exit status in the Dockerfile.

