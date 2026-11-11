.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The resolve-credentials tool sets up and checks the passwords, certificate authority and certificates of the Wazuh dashboard. Learn more about it in this section of the documentation.

.. _wazuh_dashboard_resolve_credentials:

resolve-credentials
===================

The ``resolve-credentials`` tool sets up the passwords, the certificate authority (CA), and the certificates that the Wazuh dashboard uses, and checks them before every start. It's located at ``/usr/share/wazuh-dashboard/bin/resolve-credentials``. The package installation and the ``wazuh-dashboard`` service run it for you. Run it yourself to issue the certificate again or to clear the credentials from a container image.

It handles:

-  The password of the ``kibanaserver`` user on the Wazuh indexer, and the password of ``wazuh-internal-client`` on the Wazuh manager API. It stores them in the keystore, ``/etc/wazuh-dashboard/opensearch_dashboards.keystore``. A password that is already in the keystore or in ``opensearch_dashboards.yml`` is never replaced.
-  The Wazuh dashboard CA in ``/etc/wazuh-dashboard/ca``, published as ``/etc/wazuh-dashboard/export/ca.pem``, and the certificate pair ``certs/dashboard.pem`` and ``certs/dashboard-key.pem``. A pair you staged is left as it is.
-  The CAs of the Wazuh indexer and the Wazuh manager: ``certs/indexer-ca.pem`` and ``certs/manager-ca.pem``. A file you staged is used as it is and never replaced. Otherwise, the tool copies ``/etc/wazuh-indexer/export/ca.pem`` or ``/etc/wazuh-manager/export/ca.pem`` from the same host whenever that file changes.

Every file it reads must be a regular file, not a link, owned by root, and not writable by its group or by others. Any other file is reported as UNSAFE and not used.

.. code-block:: none

   resolve-credentials [--install|--upgrade|--prestart|--clear] [-H <config-dir>]

Modes
-----

+----------------+----------------------------------------------------------------------------------------------+
| Mode           | Description                                                                                  |
+================+==============================================================================================+
| ``--install``  | Run by the package installation. Stores the passwords, creates the CA when there is none,    |
|                | issues the certificate pair when there is none, and imports the CAs of the Wazuh indexer and |
|                | the Wazuh manager. Always exits with ``0``.                                                  |
+----------------+----------------------------------------------------------------------------------------------+
| ``--upgrade``  | Run by the package upgrade. Completes the keystore and the passwords only. Always exits with |
|                | ``0``.                                                                                       |
+----------------+----------------------------------------------------------------------------------------------+
| ``--prestart`` | The default. Run by the ``wazuh-dashboard`` service before it starts. Checks the files,      |
|                | completes the passwords and imports the CAs. Exits with ``1`` when the Wazuh indexer         |
|                | password, ``certs/indexer-ca.pem`` or the certificate pair is missing, invalid or unsafe,    |
|                | and the start is refused. A missing Wazuh manager password or ``certs/manager-ca.pem`` is    |
|                | only a warning: the Wazuh dashboard starts, and the Wazuh manager API connection fails until |
|                | they're in place and the Wazuh dashboard restarts.                                           |
+----------------+----------------------------------------------------------------------------------------------+
| ``--clear``    | For container image builds. Removes the keystore entries, the certificate pair, the imported |
|                | CAs, the CA it created, and ``export/``. It keeps a CA and CA files you staged. Exits with   |
|                | ``1`` when the Wazuh dashboard is running or something can't be removed.                     |
+----------------+----------------------------------------------------------------------------------------------+

Options
-------

+--------------------+----------------------------------------------------------------------------------------------+
| Option             | Description                                                                                  |
+====================+==============================================================================================+
| ``-H               | Non-default Wazuh dashboard configuration directory. The default is                          |
| <config-dir>``     | ``/etc/wazuh-dashboard``.                                                                    |
+--------------------+----------------------------------------------------------------------------------------------+
| ``-h``, ``--help`` | Prints the usage.                                                                            |
+--------------------+----------------------------------------------------------------------------------------------+

Run the tool as root. Exit status ``2`` means an unknown option. Set ``WAZUH_DASHBOARD_VERBOSE=1`` to print detail lines. Each problem is one line on standard error that starts with ``MISSING``, ``INVALID`` or ``UNSAFE`` and names the file or key, never a password.

Values you supply
-----------------

Put the values in ``/etc/wazuh-dashboard/local.env``, owned by ``root:root`` with mode ``0600``, as ``NAME=value`` lines. For each key, the first value found wins: the environment of the command, then ``local.env``, then the ``export/credentials.env`` file of the Wazuh indexer or the Wazuh manager on the same host. systemd starts the Wazuh dashboard with a clean environment, so a value needed at start belongs in ``local.env``.

+----------------------------------------+------------------------------------------------------------+--------------------------------------------------+
| Key                                    | Purpose                                                    | When it is not set                               |
+========================================+============================================================+==================================================+
| ``WAZUH_INDEXER_KIBANASERVER_PASSWORD``| Password of the ``kibanaserver`` user on the Wazuh         | Read from                                        |
|                                        | indexer.                                                   | ``/etc/wazuh-indexer/export/credentials.env`` on |
|                                        |                                                            | the same host. Otherwise, the start is refused   |
|                                        |                                                            | (``MISSING``).                                   |
+----------------------------------------+------------------------------------------------------------+--------------------------------------------------+
| ``WAZUH_MANAGER_WUI_PASSWORD``         | Password of ``wazuh-internal-client``, the Wazuh manager   | Read from                                        |
|                                        | API user the Wazuh dashboard connects as.                  | ``/etc/wazuh-manager/export/credentials.env`` on |
|                                        |                                                            | the same host. Otherwise, the Wazuh dashboard    |
|                                        |                                                            | starts without the Wazuh manager API connection. |
+----------------------------------------+------------------------------------------------------------+--------------------------------------------------+
| ``WAZUH_DASHBOARD_CERT_SANS``          | Subject alternative names of the certificate pair, as      | The host name, the FQDN, and every global        |
|                                        | ``DNS:<name>,IP:<address>,…``                              | address of the host. ``localhost``,              |
|                                        |                                                            | ``127.0.0.1`` and ``::1`` are always added.      |
+----------------------------------------+------------------------------------------------------------+--------------------------------------------------+

Examples
--------

Issue the certificate pair again, for example after you change ``WAZUH_DASHBOARD_CERT_SANS``. The CA in ``/etc/wazuh-dashboard/ca`` is kept, so browsers keep trusting ``export/ca.pem``:

.. code-block:: console

   # rm /etc/wazuh-dashboard/certs/dashboard.pem /etc/wazuh-dashboard/certs/dashboard-key.pem
   # /usr/share/wazuh-dashboard/bin/resolve-credentials --install
   # systemctl restart wazuh-dashboard
