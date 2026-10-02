.. Copyright (C) 2015, Wazuh, Inc.

.. code-block:: xml
   :emphasize-lines: 3

   <indexer>
     <hosts>
       <host>https://127.0.0.1:9200</host>
     </hosts>
     <ssl>
       <certificate_authorities>
         <ca>etc/certs/root-ca.pem</ca>
       </certificate_authorities>
       <certificate>etc/certs/indexer-connector.pem</certificate>
       <key>etc/certs/indexer-connector-key.pem</key>
     </ssl>
   </indexer>

-  Replace ``127.0.0.1`` with your Wazuh indexer node IP address or hostname. You can find this value in the Wazuh indexer config file ``/etc/wazuh-indexer/opensearch.yml``

If you are running a Wazuh indexer cluster infrastructure, add a ``<host>`` entry for each one of your Wazuh indexer nodes. For example, in a two-node configuration:

.. code-block:: xml

   <hosts>
     <host>https://10.0.0.1:9200</host>
     <host>https://10.0.0.2:9200</host>
   </hosts>

The Wazuh manager prioritizes reporting to the first Wazuh indexer node in the list. It switches to the next node in case it is not available.

.. End of include file
