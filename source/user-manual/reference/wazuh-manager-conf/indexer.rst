.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the indexer configuration section of wazuh-manager.conf, which configures the connection between the Wazuh manager and the Wazuh indexer.

.. _reference_wazuh_manager_conf_indexer:

indexer
=======

.. topic:: XML section name

   .. code-block:: xml

      <indexer>
      </indexer>

The Indexer Connector configuration ``<indexer>`` establishes TLS-secured connections to one or more Indexer nodes for data indexing and feed synchronization.

Options
-------

- `hosts`_
- `ssl`_

``<hosts>`` is required. ``<ssl>`` is optional and only needed for TLS-protected connections to the Wazuh indexer.

hosts
^^^^^

List of Indexer node URLs. Each node is specified with a ``<host>`` child element.

host
~~~~~

Specifies the URLs of the Wazuh indexer nodes. Define each node in a separate ``<host>`` element. The Wazuh manager uses the configured hosts to establish the connection and can connect to another listed host if one becomes unavailable.

+--------------------+----------------------------------------+
| **Required**       | yes                                    |
+--------------------+----------------------------------------+
| **Allowed values** | A URL in one of the following formats: |
|                    | - ``http://<address>:<port>``          |
|                    | - ``https://<address>:<port>``         |
+--------------------+----------------------------------------+

Both schemes are accepted. Use ``https://`` for TLS-protected deployments.

The Wazuh manager validates the host value: it must start with ``http://`` or ``https://``. The validation checks only the scheme, so a port number is not required.

.. code-block:: xml

   <hosts>
     <host>https://127.0.0.1:9200</host>
   </hosts>

ssl
^^^

Configuration options for the TLS/SSL parameters.

certificate_authorities
~~~~~~~~~~~~~~~~~~~~~~~~~

Path to one or more CA certificates used to verify the Indexer's TLS certificate. Each CA is listed with a ``<ca>`` child element.

``ca`` — CA certificate file path. The path must exist on disk at startup time.

+----------------------+---------------------------------------------------------------------------------------------+
| **Default value**    | None (The installer sets this automatically to /etc/wazuh-manager/certs/indexer-ca.pem, the |
|                      | CA of the Wazuh indexer)                                                                    |
+----------------------+---------------------------------------------------------------------------------------------+
| **Allowed values**   | Absolute path to a PEM-encoded CA certificate directly in /etc/wazuh-manager/certs          |
|                      | (existence checked at startup)                                                              |
+----------------------+---------------------------------------------------------------------------------------------+

certificate
~~~~~~~~~~~~

Path to the client certificate presented by the Wazuh manager when mutual TLS authentication is enabled. The path must exist on disk at startup time.

+--------------------+----------------------------------------------------------------------------------------+
| **Default value**  | None (The installer sets this automatically to                                         |
|                    | /etc/wazuh-manager/certs/indexer-connector.pem)                                        |
+--------------------+----------------------------------------------------------------------------------------+
| **Allowed values** | Absolute path to a PEM-encoded certificate directly in /etc/wazuh-manager/certs        |
|                    | (existence checked at startup)                                                         |
+--------------------+----------------------------------------------------------------------------------------+

key
~~~~

Path to the private key corresponding to ``certificate``. Required if ``certificate`` is specified. Path must exist on disk at startup time.

+----------------------+------------------------------------------------------------------------------------------+
| **Default value**    | None (The installer sets this automatically to                                           |
|                      | /etc/wazuh-manager/certs/indexer-connector-key.pem)                                      |
+----------------------+------------------------------------------------------------------------------------------+
| **Allowed values**   | Absolute path to a PEM-encoded private key directly in /etc/wazuh-manager/certs          |
|                      | (existence checked at startup)                                                           |
+----------------------+------------------------------------------------------------------------------------------+

Sample configuration
---------------------

Single node:

.. code-block:: xml

   <indexer>
     <hosts>
       <host>https://127.0.0.1:9200</host>
     </hosts>
     <ssl>
       <certificate_authorities>
         <ca>/etc/wazuh-manager/certs/indexer-ca.pem</ca>
       </certificate_authorities>
       <certificate>/etc/wazuh-manager/certs/indexer-connector.pem</certificate>
       <key>/etc/wazuh-manager/certs/indexer-connector-key.pem</key>
     </ssl>
   </indexer>

Multi-node cluster:

.. code-block:: xml

   <indexer>
     <hosts>
       <host>https://127.0.0.1:9200</host>
       <host>https://10.0.0.2:9200</host>
       <host>https://10.0.0.3:9200</host>
     </hosts>
     <ssl>
       <certificate_authorities>
         <ca>/etc/wazuh-manager/certs/indexer-ca.pem</ca>
       </certificate_authorities>
       <certificate>/etc/wazuh-manager/certs/indexer-connector.pem</certificate>
       <key>/etc/wazuh-manager/certs/indexer-connector-key.pem</key>
     </ssl>
   </indexer>

Wazuh indexer credentials
--------------------------

The Wazuh manager authenticates to the Wazuh indexer with the username and password stored in its keystore. They're never set in ``wazuh-manager.conf``. The credential resolver (``wazuh-manager-resolve-credentials``) stores them during the installation and before every start: the username is ``wazuh-manager``, and the password is the first value of ``WAZUH_INDEXER_MANAGER_PASSWORD`` it finds in:

#. The environment of the installation command.
#. ``/etc/wazuh-manager/local.env``.
#. ``/etc/wazuh-indexer/export/credentials.env``, when the Wazuh indexer is installed on the same host.

When the Wazuh indexer is on the same host, the resolver also imports its CA and the client pair it issued for the Wazuh manager into ``/etc/wazuh-manager/certs/indexer-ca.pem``, ``indexer-connector.pem`` and ``indexer-connector-key.pem``. When the Wazuh indexer is on another host, copy them there yourself.

If the password or these files are missing, the Wazuh manager doesn't start, and ``wazuh-manager-control`` reports ``Unresolved credentials`` (error 21).

The resolver never replaces a password already in the keystore. After you change the ``wazuh-manager`` password on the Wazuh indexer, write the new one with ``wazuh-manager-keystore`` and restart the Wazuh manager:

.. code-block:: console
   :emphasize-lines: 1

   # echo '<PASSWORD>' | /var/wazuh-manager/bin/wazuh-manager-keystore -f indexer -k password
   # systemctl restart wazuh-manager

Verifying connectivity
------------------------

Use the configured CA certificate and client credentials to verify connectivity to the Wazuh indexer:

.. code-block:: console

   $ curl --cacert /etc/wazuh-manager/certs/indexer-ca.pem \
        --cert   /etc/wazuh-manager/certs/indexer-connector.pem \
        --key    /etc/wazuh-manager/certs/indexer-connector-key.pem \
        https://127.0.0.1:9200/_cluster/health

A successful response returns the Wazuh indexer cluster health information with a status such as ``green`` or ``yellow``.
