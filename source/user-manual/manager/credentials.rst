.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how the Wazuh manager sets up its passwords, CA, and certificates, where it keeps them, and how to supply, stage, reissue, and back them up.

.. _wazuh_manager_credentials:

Credentials and certificates
============================

The Wazuh manager sets up every password and certificate it owns or uses with one program, the credential resolver, ``/var/wazuh-manager/bin/wazuh-manager-resolve-credentials``. It runs when the Wazuh manager package is installed or upgraded, and before every start of the Wazuh manager.

The credential resolver handles the following:

+---------------------------------------------------------+------------------------------------------------------+---------------------------------------------------------------------+
| Credential                                              | Source                                               | Location                                                            |
+=========================================================+======================================================+=====================================================================+
| Wazuh manager API passwords of ``wazuh`` and            | Supplied by you or generated                         | ``rbac.db``, published in                                           |
| ``wazuh-internal-client``                               |                                                      | ``/etc/wazuh-manager/export/credentials.env``                       |
+---------------------------------------------------------+------------------------------------------------------+---------------------------------------------------------------------+
| Wazuh indexer password of the ``wazuh-manager`` user    | Supplied by you, or read from a Wazuh indexer on the | The Wazuh manager keystore                                          |
|                                                         | same host                                            |                                                                     |
+---------------------------------------------------------+------------------------------------------------------+---------------------------------------------------------------------+
| Wazuh manager CA                                        | Created at installation, or staged by you            | ``/etc/wazuh-manager/ca/``, published in                            |
|                                                         |                                                      | ``/etc/wazuh-manager/export/ca.pem``                                |
+---------------------------------------------------------+------------------------------------------------------+---------------------------------------------------------------------+
| Agent listener and Wazuh manager API certificates       | Issued at installation, or staged by you             | ``/etc/wazuh-manager/certs/remoted.pem`` and ``apid.pem``           |
+---------------------------------------------------------+------------------------------------------------------+---------------------------------------------------------------------+
| Wazuh indexer CA and client certificate                 | Imported from a Wazuh indexer on the same host, or   | ``/etc/wazuh-manager/certs/indexer-ca.pem`` and                     |
|                                                         | staged by you                                        | ``indexer-connector.pem``                                           |
+---------------------------------------------------------+------------------------------------------------------+---------------------------------------------------------------------+

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Files and permissions
---------------------

The credential resolver never changes an owner or a mode. It refuses a file or directory that doesn't match the following table, and the Wazuh manager doesn't start.

+----------------------------------------------------------------------+-----------------------------+------------------------------------------------------------+
| Path                                                                 | Owner and mode              | Content                                                    |
+======================================================================+=============================+============================================================+
| ``/etc/wazuh-manager/``                                              | ``root:wazuh-manager 0770`` | Configuration directory                                    |
+----------------------------------------------------------------------+-----------------------------+------------------------------------------------------------+
| ``/etc/wazuh-manager/local.env``                                     | ``root:root 0600``          | Values you supply                                          |
+----------------------------------------------------------------------+-----------------------------+------------------------------------------------------------+
| ``/etc/wazuh-manager/ca/``                                           | ``root:root 0700``          | Wazuh manager CA                                           |
+----------------------------------------------------------------------+-----------------------------+------------------------------------------------------------+
| ``/etc/wazuh-manager/ca/root-ca.pem``                                | ``root:root 0644``          | CA certificate                                             |
+----------------------------------------------------------------------+-----------------------------+------------------------------------------------------------+
| ``/etc/wazuh-manager/ca/root-ca.key``                                | ``root:root 0400``          | CA private key. Absent when you stage the certificate      |
|                                                                      |                             | alone.                                                     |
+----------------------------------------------------------------------+-----------------------------+------------------------------------------------------------+
| ``/etc/wazuh-manager/export/``                                       | ``root:root 0700``          | Files published for the Wazuh dashboard on the same host   |
+----------------------------------------------------------------------+-----------------------------+------------------------------------------------------------+
| ``/etc/wazuh-manager/export/credentials.env``                        | ``root:root 0600``          | Wazuh manager API passwords                                |
+----------------------------------------------------------------------+-----------------------------+------------------------------------------------------------+
| ``/etc/wazuh-manager/export/ca.pem``                                 | ``root:root 0644``          | Copy of the CA certificate. Clients verify the Wazuh       |
|                                                                      |                             | manager API with it.                                       |
+----------------------------------------------------------------------+-----------------------------+------------------------------------------------------------+
| ``/etc/wazuh-manager/certs/``                                        | ``root:wazuh-manager 0750`` | Certificates the daemons read                              |
+----------------------------------------------------------------------+-----------------------------+------------------------------------------------------------+
| ``/etc/wazuh-manager/certs/root-ca.pem``                             | ``root:wazuh-manager 0640`` | CA bundle served to the Wazuh agents. Manage it with       |
|                                                                      |                             | :ref:`wazuh-manager-certs <wazuh_manager_certs>`.          |
+----------------------------------------------------------------------+-----------------------------+------------------------------------------------------------+
| ``/etc/wazuh-manager/certs/remoted.pem``, ``remoted-key.pem``        | ``root:wazuh-manager 0640`` | Agent listener certificate and key                         |
+----------------------------------------------------------------------+-----------------------------+------------------------------------------------------------+
| ``/etc/wazuh-manager/certs/apid.pem``, ``apid-key.pem``              | ``root:wazuh-manager 0640`` | Wazuh manager API certificate and key                      |
+----------------------------------------------------------------------+-----------------------------+------------------------------------------------------------+
| ``/etc/wazuh-manager/certs/indexer-ca.pem``                          | ``root:wazuh-manager 0640`` | Wazuh indexer CA                                           |
+----------------------------------------------------------------------+-----------------------------+------------------------------------------------------------+
| ``/etc/wazuh-manager/certs/indexer-connector.pem``,                  | ``root:wazuh-manager 0640`` | Client certificate and key the Wazuh manager presents to   |
| ``indexer-connector-key.pem``                                        |                             | the Wazuh indexer                                          |
+----------------------------------------------------------------------+-----------------------------+------------------------------------------------------------+

Every file must be owned by root and not writable by its group or by others. A private key, ``local.env`` and ``export/credentials.env`` must be readable by root only. The ``wazuh-manager`` service account reads only the files in ``certs/``, through its group.

Supply values with local.env
----------------------------

Supply passwords and certificate names in ``/etc/wazuh-manager/local.env``, one ``NAME=value`` per line. Create the file before you install the Wazuh manager, or before you start it:

.. code-block:: console

   # install -d -m 0770 -o root -g root /etc/wazuh-manager
   # install -m 0600 -o root -g root /dev/null /etc/wazuh-manager/local.env

Create the directory only before the installation. The package then sets its group. Add the values you need, for example:

.. code-block:: none

   WAZUH_INDEXER_MANAGER_PASSWORD='<WAZUH_MANAGER_PASSWORD_ON_THE_INDEXER>'
   WAZUH_MANAGER_API_PASSWORD='<WAZUH_MANAGER_API_PASSWORD>'

+-------------------------------------+---------------------------------------------------------------+---------------------------------------------------------------+
| Key                                 | Purpose                                                       | When it is not set                                            |
+=====================================+===============================================================+===============================================================+
| ``WAZUH_MANAGER_API_PASSWORD``      | Password of the ``wazuh`` Wazuh manager API user              | Generated                                                     |
+-------------------------------------+---------------------------------------------------------------+---------------------------------------------------------------+
| ``WAZUH_MANAGER_WUI_PASSWORD``      | Password of ``wazuh-internal-client``, the user the Wazuh     | Generated                                                     |
|                                     | dashboard connects as                                         |                                                               |
+-------------------------------------+---------------------------------------------------------------+---------------------------------------------------------------+
| ``WAZUH_INDEXER_MANAGER_PASSWORD``  | Password of the ``wazuh-manager`` user on the Wazuh indexer   | Read from ``/etc/wazuh-indexer/export/credentials.env`` when  |
|                                     |                                                               | the Wazuh indexer runs on the same host. Otherwise, the Wazuh |
|                                     |                                                               | manager doesn't start.                                        |
+-------------------------------------+---------------------------------------------------------------+---------------------------------------------------------------+
| ``WAZUH_MANAGER_NODE_NAME``         | Common name of the certificates, and of the CA when the       | The host name up to its first dot                             |
|                                     | installation creates it. A DNS name of up to 64 characters,   |                                                               |
|                                     | or 50 when the CA is created.                                 |                                                               |
+-------------------------------------+---------------------------------------------------------------+---------------------------------------------------------------+
| ``WAZUH_MANAGER_REMOTED_CERT_SANS`` | Subject alternative names of the agent listener certificate   | Discovered, see :ref:`wazuh_manager_credentials_sans`         |
+-------------------------------------+---------------------------------------------------------------+---------------------------------------------------------------+
| ``WAZUH_MANAGER_APID_CERT_SANS``    | Subject alternative names of the Wazuh manager API            | Discovered. It never inherits the agent listener list.        |
|                                     | certificate                                                   |                                                               |
+-------------------------------------+---------------------------------------------------------------+---------------------------------------------------------------+

A password you supply must have 12 to 64 characters, using only ``A``-``Z``, ``a``-``z``, ``0``-``9`` and ``. , _ + : @ % ^ = ~ -``, with a lowercase letter, an uppercase letter, a number and one of those symbols. The Wazuh manager API accepts a wider set when you change a password later: 12 to 64 printable ASCII characters with a letter and a number.

A value set in the environment takes precedence over ``local.env``. The ``sudo`` command removes exported variables, so pass a variable on the ``sudo`` command line when you install the package:

.. code-block:: console

   # sudo WAZUH_INDEXER_MANAGER_PASSWORD='<WAZUH_MANAGER_PASSWORD_ON_THE_INDEXER>' apt-get install wazuh-manager

systemd starts the Wazuh manager with a clean environment, so put the values the start needs in ``local.env``.

Run the credential resolver
---------------------------

.. code-block:: none

   wazuh-manager-resolve-credentials {--install|--upgrade|--prestart|--check|--clear} [-q] [-H <home>]

+-----------------+--------------------------------------------------------------------------------------------------------------------------------+
| Mode            | Description                                                                                                                    |
+=================+================================================================================================================================+
| ``--install``   | Runs at installation. Sets the passwords, stores the Wazuh indexer password, creates the CA when none is in place, issues the  |
|                 | agent listener and Wazuh manager API certificates, and imports the Wazuh indexer CA and client certificate.                    |
+-----------------+--------------------------------------------------------------------------------------------------------------------------------+
| ``--upgrade``   | Runs at upgrade. Completes what is missing, but never creates a CA or issues a certificate.                                    |
+-----------------+--------------------------------------------------------------------------------------------------------------------------------+
| ``--prestart``  | Runs before every start. Completes what it can and refuses the start if something is still missing, invalid or unsafe.         |
+-----------------+--------------------------------------------------------------------------------------------------------------------------------+
| ``--check``     | Checks everything and changes nothing. ``wazuh-manager-control`` runs it on ``start``, ``restart``, ``reload`` and ``check``.  |
+-----------------+--------------------------------------------------------------------------------------------------------------------------------+
| ``--clear``     | Removes what the credential resolver created. See :ref:`wazuh_manager_credentials_containers`.                                 |
+-----------------+--------------------------------------------------------------------------------------------------------------------------------+

``-q`` prints only problems, and ``-H`` sets a custom installation directory. The installation never fails because of a credential: the check that counts is the one before the start.

Run the check yourself to see every problem:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --check

When the Wazuh manager doesn't start
------------------------------------

Each problem is one line, ``<KIND> <path or key>: <reason>``. No line includes a secret.

-  ``MISSING``: something the start needs is absent, for example ``MISSING WAZUH_INDEXER_MANAGER_PASSWORD: set it in /etc/wazuh-manager/local.env ...``.
-  ``INVALID``: something in place is wrong, for example ``INVALID /etc/wazuh-manager/certs/remoted.pem: expired``.
-  ``UNSAFE``: a file or directory has the wrong owner or mode, or is a link, for example ``UNSAFE /etc/wazuh-manager/local.env: group-writable``.
-  ``WARNING``: the Wazuh indexer CA or client certificate is expired or not valid yet. The Wazuh manager starts, but it can't connect to the Wazuh indexer until you renew the files or fix the clock.

``wazuh-manager-control`` writes the lines to the terminal, the systemd journal and ``/var/wazuh-manager/logs/wazuh-manager.log``, and doesn't start any daemon:

+---------------------------------------------+-----------+--------------------------------------------------+
| Message                                     | Error     | Cause                                            |
+=============================================+===========+==================================================+
| ``wazuh-manager.conf: Configuration error`` | 20        | The configuration file, or a daemon's own test,  |
|                                             |           | failed.                                          |
+---------------------------------------------+-----------+--------------------------------------------------+
| ``Unresolved credentials``                  | 21        | Something is ``MISSING``.                        |
+---------------------------------------------+-----------+--------------------------------------------------+
| ``Invalid credentials``                     | 22        | Something is ``INVALID``.                        |
+---------------------------------------------+-----------+--------------------------------------------------+
| ``Unsafe credentials``                      | 22        | Something is ``UNSAFE``.                         |
+---------------------------------------------+-----------+--------------------------------------------------+
| ``Cannot check the credentials``            | 22        | The check couldn't run, for example because the  |
|                                             |           | command didn't run as root.                      |
+---------------------------------------------+-----------+--------------------------------------------------+

The error numbers appear only in the JSON output of ``wazuh-manager-control -j``. ``wazuh-manager-control restart`` runs the checks before it stops anything, so a refused restart keeps the running daemons. ``systemctl restart wazuh-manager`` stops the Wazuh manager first, so run ``/var/wazuh-manager/bin/wazuh-manager-control check`` before it.

.. _wazuh_manager_credentials_sans:

Subject alternative names
-------------------------

Wazuh agents and the Wazuh dashboard verify that the address they connect to is in the certificate. Set the names of each certificate in ``WAZUH_MANAGER_REMOTED_CERT_SANS`` and ``WAZUH_MANAGER_APID_CERT_SANS``, as comma-separated ``DNS:<NAME>`` and ``IP:<ADDRESS>`` entries:

.. code-block:: none

   WAZUH_MANAGER_REMOTED_CERT_SANS=IP:<WAZUH_MANAGER_ADDRESS>,DNS:<LOAD_BALANCER_NAME>

Wildcards, prefixes and zone IDs are refused. ``localhost``, ``127.0.0.1`` and ``::1`` are always added. When a list isn't set, the certificate includes the node name, its fully qualified name, and every global address of every network interface. To leave an address out, such as a container bridge address, set the list yourself.

An invalid list stops every start with ``INVALID``, even when the certificates are already issued.

Reissue a certificate
---------------------

The credential resolver issues the agent listener and Wazuh manager API certificates only at installation, and never replaces one. To issue a certificate again, for example with new names, stop the Wazuh manager, update ``local.env``, remove the certificate and its key, and run ``--install``:

.. code-block:: console

   # systemctl stop wazuh-manager
   # rm /etc/wazuh-manager/certs/remoted.pem /etc/wazuh-manager/certs/remoted-key.pem
   # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --install
   # systemctl start wazuh-manager

This works only when ``/etc/wazuh-manager/ca/root-ca.key`` is in place. To use a certificate issued elsewhere, put the new files in place instead, with owner ``root:wazuh-manager`` and mode ``0640``. A certificate needs subject alternative names, and ``serverAuth`` if it restricts its extended key usage. The agent listener certificate must chain to a certificate in ``certs/root-ca.pem``, and the Wazuh manager API certificate to ``ca/root-ca.pem``. To change the CA, see :ref:`Rotating the CA <wazuh_manager_certs>` in ``wazuh-manager-certs``.

Connect to a Wazuh indexer on another host
------------------------------------------

When the Wazuh indexer runs on the same host, the Wazuh manager imports its CA and a client certificate from ``/etc/wazuh-indexer/export/``. It writes a marker file next to each imported file, and imports the files again when the Wazuh indexer changes them.

When the Wazuh indexer runs on another host, stage the files yourself in ``/etc/wazuh-manager/certs/``, with owner ``root:wazuh-manager`` and mode ``0640``:

-  ``indexer-ca.pem``: the Wazuh indexer CA certificate.
-  ``indexer-connector.pem`` and ``indexer-connector-key.pem``: a client certificate and key for this node, issued by the Wazuh indexer CA, with ``clientAuth`` in its extended key usage.

Set ``WAZUH_INDEXER_MANAGER_PASSWORD`` in ``local.env``. Staged files have no marker, so the credential resolver checks them at every start and never replaces them.

Cluster deployments
-------------------

Each node sets up its own credentials. The cluster doesn't synchronize ``ca/``, ``certs/``, ``export/``, ``local.env`` or ``rbac.db``.

-  Stage the same CA on every node before you install it, in ``/etc/wazuh-manager/ca/``: ``root-ca.pem`` with mode ``0644`` and ``root-ca.key`` with mode ``0400``, both owned by ``root:root``, in a ``root:root 0700`` directory. A node that creates its own CA trusts only itself, and Wazuh agents that reach another node don't trust it.
-  Each node presents its own agent listener certificate. List in it the addresses the Wazuh agents use to reach that node and, behind a load balancer, the load balancer name.
-  Only the master node runs the Wazuh manager API and uses its ``rbac.db``. Set the same ``WAZUH_MANAGER_API_PASSWORD`` and ``WAZUH_MANAGER_WUI_PASSWORD`` in the ``local.env`` of every node before you install it, so a node promoted to master keeps the same passwords.

Back up the credentials
-----------------------

Back up the following on every node. The cluster doesn't restore them, and the start checks the certificates against that node's CA:

-  ``/etc/wazuh-manager/ca/``
-  ``/etc/wazuh-manager/certs/``
-  ``/etc/wazuh-manager/export/``
-  ``/etc/wazuh-manager/local.env``
-  ``/var/wazuh-manager/api/configuration/security/rbac.db`` on the master node

.. _wazuh_manager_credentials_containers:

Container images
----------------

An image built by installing the Wazuh manager package carries the credentials resolved during the build: a CA with its private key, the certificates and the Wazuh manager API database. Every container started from it would share them. Clear them at the end of the build:

.. code-block:: dockerfile

   RUN /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --clear

Then run ``--install`` in the container entrypoint, before the first start:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --install

``--clear`` refuses while a Wazuh manager daemon runs. It removes the certificates, the CA it created, the imported Wazuh indexer files, the contents of ``export/``, ``rbac.db`` and the keystore. It keeps a CA and Wazuh indexer files you staged, and ``local.env``.

.. warning::

   ``rbac.db`` holds every Wazuh manager API user, role and policy, not only the default users.

Upgrades and removal
--------------------

An upgrade never replaces ``rbac.db``, never creates a CA, and never issues a certificate. Certificates you replaced survive every upgrade.

-  ``apt remove wazuh-manager`` and ``rpm -e wazuh-manager`` keep ``/etc/wazuh-manager``, with every file renamed to ``<NAME>.save``. Delete the ``.save`` copies of ``ca/root-ca.key`` and ``local.env`` when you no longer need them.
-  ``apt purge wazuh-manager`` removes ``/etc/wazuh-manager`` and the service account.

Change a password
-----------------

To change a Wazuh manager API password, run the following command on the master node:

.. code-block:: console

   # /var/wazuh-manager/bin/rbac_control change-password

``rbac_control`` and the Wazuh manager API don't update ``/etc/wazuh-manager/export/credentials.env``, so the value there is the previous one after a change.

When the Wazuh indexer runs on the same host and ``local.env`` doesn't set ``WAZUH_INDEXER_MANAGER_PASSWORD``, the Wazuh manager takes a new password from the Wazuh indexer at the next start. Otherwise, write the new password to the keystore with the Wazuh manager stopped, and start it:

.. code-block:: console

   # systemctl stop wazuh-manager
   # printf '%s' '<NEW_PASSWORD>' | /var/wazuh-manager/bin/wazuh-manager-keystore -f indexer -k password
   # systemctl start wazuh-manager

See :doc:`Password management </user-manual/user-administration/password-management>` for every user.
