.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh indexer connector bridges the Wazuh manager and the Wazuh indexer to forward and synchronize processed events. Learn more in this section of the documentation.

Wazuh indexer connector
=======================

The Wazuh indexer connector provides a bridge between the Wazuh manager and the Wazuh indexer. It securely forwards processed events from the Wazuh manager to the Wazuh indexer for indexing, storage, and detection. It receives the events in JSON format following the :ref:`Wazuh Common Schema (WCS) <wazuh_common_schema>` and synchronizes its state with the Wazuh indexer to ensure data consistency and reliability. The indexer connector also transports inbound data including :ref:`content <content_management>` and runtime configuration into the Wazuh normalization engine.

Configuration
-------------

The standard configuration for the Wazuh indexer connector is specified in the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file on the Wazuh manager, as highlighted below:

.. code-block:: xml
   :emphasize-lines: 3-15

   <ossec_config>
     ...
     <indexer>
       <enabled>yes</enabled>
       <hosts>
         <host>https://127.0.0.1:9200</host>
       </hosts>
       <ssl>
         <certificate_authorities>
           <ca>/var/wazuh-manager/etc/certs/root-ca.pem</ca>
         </certificate_authorities>
         <certificate>/var/wazuh-manager/etc/certs/wazuh-manager.pem</certificate>
         <key>/var/wazuh-manager/etc/certs/wazuh-manager-key.pem</key>
       </ssl>
     </indexer>
     ...
   </ossec_config>

Where:

-  ``<indexer>`` specifies the configuration options for the Wazuh indexer connector.
-  ``<enabled>`` enables or disables the Wazuh indexer connector, which forwards processed events, inventory data, and vulnerability scans to the Wazuh indexer. The allowed values are ``yes`` and ``no``. The default value is ``yes``.
-  ``<hosts>`` specifies a list of Wazuh indexer nodes to connect to. Use the ``<host>`` option to set up each node connection.
-  ``<host>`` specifies the Wazuh indexer node URL or IP address to connect to. For example, ``http://172.16.1.11`` or ``192.168.3.2:9230``. The default value is set to the localhost host address ``https://127.0.0.1:9200``.
-  ``<ssl>`` specifies the configuration options for the SSL parameters.
-  ``<certificate_authorities>`` specifies a list of root certificate file paths for verification. Use the ``<ca>`` option for setting up each CA certificate file path.
-  ``<ca>`` specifies the root CA certificate for HTTPS server verifications. The default value is ``/var/wazuh-manager/etc/certs/root-ca.pem``. The possible value is any valid CA certificate.
-  ``<certificate>`` specifies the path to the Wazuh manager certificate. The default value is ``/var/wazuh-manager/etc/certs/wazuh-manager.pem``. The possible value is any valid key.
-  ``<key>`` specifies the certificate key used for authentication. The default value is ``/var/wazuh-manager/etc/certs/wazuh-manager-key.pem``. The possible value is any valid key.
