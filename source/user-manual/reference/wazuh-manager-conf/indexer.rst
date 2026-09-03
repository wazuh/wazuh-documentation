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

The ``<indexer>`` section configures the connection between the Wazuh manager and the Wazuh indexer. This connection is used to send data to the Wazuh indexer and retrieve content required by manager components, including vulnerability content.

Options
-------

- `hosts`_
- `ssl`_

Both ``<hosts>`` and ``<ssl>`` are required.

hosts
^^^^^

List of Indexer node URLs. Each node is specified with a ``<host>`` child element.

host
~~~~~

Specifies the URLs of the Wazuh indexer nodes. Define each node in a separate ``<host>`` element. The Wazuh manager uses the configured hosts to establish the connection and can connect to another listed host if one becomes unavailable.

+----------------------+------------------------------------------+
| **Required**         | yes                                      |
+----------------------+------------------------------------------+
| **Allowed values**   | A URL in one of the following formats:   |
|                      | - http://<address>:<port>                |
|                      | - https://<address>:<port>               |
+----------------------+------------------------------------------+

Both schemes are accepted. Use ``https://`` for TLS-protected deployments.

The Wazuh manager validates the host value: it must start with ``http://`` or ``https://`` and include a port number.

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
| **Default value**    | None (The installer sets this automatically to etc/certs/root-ca.pem)                       |
+----------------------+---------------------------------------------------------------------------------------------+
| **Allowed values**   | Path to a PEM-encoded CA certificate (existence checked at startup; relative or absolute)   |
+----------------------+---------------------------------------------------------------------------------------------+

certificate
~~~~~~~~~~~~

Path to the client certificate presented by the Wazuh manager when mutual TLS authentication is enabled. The path must exist on disk at startup time.

+----------------------+------------------------------------------------------------------------------------------+
| **Default value**    | None (The installer sets this automatically to etc/certs/manager.pem)                    |
+----------------------+------------------------------------------------------------------------------------------+
| **Allowed values**   | Path to a PEM-encoded certificate (existence checked at startup; relative or absolute)   |
+----------------------+------------------------------------------------------------------------------------------+

key
~~~~

Path to the private key corresponding to ``certificate``. Required if ``certificate`` is specified. Path must exist on disk at startup time.

+----------------------+------------------------------------------------------------------------------------------+
| **Default value**    | None (The installer sets this automatically to etc/certs/manager-key.pem)                |
+----------------------+------------------------------------------------------------------------------------------+
| **Allowed values**   | Path to a PEM-encoded private key (existence checked at startup; relative or absolute)   |
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
         <ca>/var/wazuh-manager/etc/certs/root-ca.pem</ca>
       </certificate_authorities>
       <certificate>/var/wazuh-manager/etc/certs/manager.pem</certificate>
       <key>/var/wazuh-manager/etc/certs/manager-key.pem</key>
     </ssl>
   </indexer>

Multi-node cluster:

.. code-block:: xml

   <indexer>
     <hosts>
       <host>https://10.0.0.1:9200</host>
       <host>https://10.0.0.2:9200</host>
       <host>https://10.0.0.3:9200</host>
     </hosts>
     <ssl>
       <certificate_authorities>
         <ca>/var/wazuh-manager/etc/certs/root-ca.pem</ca>
       </certificate_authorities>
       <certificate>/var/wazuh-manager/etc/certs/manager.pem</certificate>
       <key>/var/wazuh-manager/etc/certs/manager-key.pem</key>
     </ssl>
   </indexer>

Wazuh indexer credentials
--------------------------

When the Wazuh indexer requires username and password authentication, store the credentials in the Wazuh manager keystore instead of adding them to ``wazuh-manager.conf``.

.. code-block:: console

   # wazuh-manager-keystore -f indexer -k username -v admin
   # wazuh-manager-keystore -f indexer -k password -v <PASSWORD>

The Wazuh manager reads these credentials from the keystore when it starts.

Verifying connectivity
------------------------

Use the configured CA certificate and client credentials to verify connectivity to the Wazuh indexer:

.. code-block:: console

   $ curl --cacert /var/wazuh-manager/etc/certs/root-ca.pem \
        --cert   /var/wazuh-manager/etc/certs/manager.pem \
        --key    /var/wazuh-manager/etc/certs/manager-key.pem \
        https://127.0.0.1:9200/_cluster/health

A successful response returns the Wazuh indexer cluster health information with a status such as ``green`` or ``yellow``.
