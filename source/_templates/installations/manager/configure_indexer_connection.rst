.. Copyright (C) 2015, Wazuh, Inc.

By default, the indexer settings have one host configured. It's set to ``0.0.0.0`` as highlighted below.

.. code-block:: xml
   :emphasize-lines: 3

   <indexer>
     <hosts>
       <host>https://0.0.0.0:9200</host>
     </hosts>
     <ssl>
       <certificate_authorities>
         <ca>/var/ossec/etc/certs/root-ca.pem</ca>
       </certificate_authorities>
       <certificate>/var/ossec/etc/certs/server.pem</certificate>
       <key>/var/ossec/etc/certs/server-key.pem</key>
     </ssl>
   </indexer>

-  Replace ``0.0.0.0`` with your Wazuh indexer node IP address or hostname. You can find this value in the Wazuh indexer config file ``/etc/wazuh-indexer/opensearch.yml``.
-  Ensure the Wazuh server certificate and key name match the certificate files in ``/var/ossec/etc/certs``.

If you are running a Wazuh indexer cluster infrastructure, add a ``<host>`` entry for each one of your Wazuh indexer nodes. For example, in a two-node configuration:

.. code-block:: xml

   <hosts>
     <host>https://10.0.0.1:9200</host>
     <host>https://10.0.0.2:9200</host>
   </hosts>

The Wazuh server prioritizes reporting to the first Wazuh indexer node in the list. It switches to the next node in case it is not available.

.. End of include file
