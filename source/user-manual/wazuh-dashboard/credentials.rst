.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn which credentials the Wazuh dashboard uses to connect to the Wazuh indexer and the Wazuh manager API, where their passwords are, and how to change them.

Wazuh dashboard credentials
===========================

The Wazuh dashboard has no default passwords. It connects to the Wazuh indexer as the ``kibanaserver`` user and to the Wazuh manager API as the ``wazuh-internal-client`` user. The Wazuh indexer and the Wazuh manager own these accounts and publish their passwords. The Wazuh dashboard stores the passwords in its keystore, ``/etc/wazuh-dashboard/opensearch_dashboards.keystore``.

The resolver, ``/usr/share/wazuh-dashboard/bin/resolve-credentials``, finds these values at installation and every time the service starts. You run it by hand only to issue a new certificate or to prepare an image.

.. list-table::
   :header-rows: 1
   :widths: 30 35 35

   * - **Value**
     - **Published by**
     - **Stored by the Wazuh dashboard as**
   * - ``WAZUH_INDEXER_KIBANASERVER_PASSWORD``
     - ``/etc/wazuh-indexer/export/credentials.env``
     - ``opensearch.password`` in the keystore
   * - ``WAZUH_MANAGER_WUI_PASSWORD``
     - ``/etc/wazuh-manager/export/credentials.env`` on the Wazuh manager master node
     - ``wazuh_core.hosts.default.password`` in the keystore
   * - Wazuh indexer CA certificate
     - ``/etc/wazuh-indexer/export/ca.pem``
     - ``/etc/wazuh-dashboard/certs/indexer-ca.pem``
   * - Wazuh manager CA certificate
     - ``/etc/wazuh-manager/export/ca.pem`` on the Wazuh manager master node
     - ``/etc/wazuh-dashboard/certs/manager-ca.pem``

You log in to the Wazuh dashboard as the ``admin`` user. Its password is ``WAZUH_INDEXER_ADMIN_PASSWORD`` in ``/etc/wazuh-indexer/export/credentials.env`` on a Wazuh indexer node.

How the Wazuh dashboard finds each password
-------------------------------------------

For each of the two passwords, the Wazuh dashboard uses the first of these sources that has a value:

#. Its keystore.
#. ``/etc/wazuh-dashboard/opensearch_dashboards.yml``. When this file sets the password, the Wazuh dashboard writes nothing to the keystore.
#. The environment of the process, as ``WAZUH_INDEXER_KIBANASERVER_PASSWORD`` or ``WAZUH_MANAGER_WUI_PASSWORD``.
#. ``/etc/wazuh-dashboard/local.env``.
#. The ``export/credentials.env`` file of the Wazuh indexer or the Wazuh manager on the same host.

The Wazuh dashboard copies a value from sources 3 to 5 into its keystore. From then on, the keystore value wins. To change a password, see :ref:`dashboard_troubleshooting_password_change`.

The local.env file
------------------

On a single host, the Wazuh dashboard reads everything from the export directories of the Wazuh indexer and the Wazuh manager. Create ``/etc/wazuh-dashboard/local.env`` on a Wazuh dashboard host without them, or to set the names in the Wazuh dashboard certificate. The file must be owned by root, with mode ``0600``. It holds one ``KEY=VALUE`` pair per line, and the Wazuh dashboard reads it as data, never as a script. It accepts these keys:

-  ``WAZUH_INDEXER_KIBANASERVER_PASSWORD``: the password of the ``kibanaserver`` user.
-  ``WAZUH_MANAGER_WUI_PASSWORD``: the password of the ``wazuh-internal-client`` user.
-  ``WAZUH_DASHBOARD_CERT_SANS``: the names and IP addresses of the Wazuh dashboard certificate. See :ref:`dashboard_certificate_issue`.

A value in the environment takes precedence over ``local.env``. ``sudo`` resets the environment by default, so an exported variable never reaches the package scripts. Use ``local.env`` instead.

Certificate authorities of the Wazuh indexer and the Wazuh manager
------------------------------------------------------------------

The Wazuh dashboard verifies the Wazuh indexer with ``/etc/wazuh-dashboard/certs/indexer-ca.pem`` and the Wazuh manager API with ``/etc/wazuh-dashboard/certs/manager-ca.pem``. It checks each file at every start:

-  A file that you place there yourself stays as it is. Use this on a Wazuh dashboard host without the Wazuh indexer or the Wazuh manager.
-  Otherwise, the Wazuh dashboard copies ``/etc/wazuh-indexer/export/ca.pem`` or ``/etc/wazuh-manager/export/ca.pem`` from the same host. It copies the file again whenever the source changes.

Without the Wazuh indexer CA certificate, the Wazuh dashboard refuses to start. Without the Wazuh manager CA certificate, it starts and shows Wazuh indexer data, but it refuses every connection to the Wazuh manager API. The host in the ``url`` setting of ``wazuh_core.hosts`` must also be a name or IP address in the Wazuh manager API certificate. See :ref:`dashboard_troubleshooting_manager_api_certificate`.

Building images that contain the Wazuh dashboard
------------------------------------------------

An image built by installing the Wazuh dashboard package keeps the keystore entries, the certificate, and the CA key of the build host. Every container started from that image shares them. Run this command at the end of the image build:

.. code-block:: console

   # /usr/share/wazuh-dashboard/bin/resolve-credentials --clear

Run this command in the container entrypoint, before the first start:

.. code-block:: console

   # /usr/share/wazuh-dashboard/bin/resolve-credentials --install
