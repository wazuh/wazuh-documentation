.. Copyright (C) 2015, Wazuh, Inc.

By default, the indexer settings have one host configured. It's set to localhost as highlighted below. Replace ``0.0.0.0`` with your Wazuh indexer node IP address or hostname.

.. code-block:: xml
   :emphasize-lines: 4

   <indexer>
     <enabled>yes</enabled>
     <hosts>
       <host>https://0.0.0.0:9200</host>
     </hosts>
     <ssl>
       <certificate_authorities>
         <ca>/etc/filebeat/certs/root-ca.pem</ca>
       </certificate_authorities>
       <certificate>/etc/filebeat/certs/filebeat.pem</certificate>
       <key>/etc/filebeat/certs/filebeat-key.pem</key>
     </ssl>
   </indexer>

If you have a Wazuh indexer cluster, add a ``<host>`` entry for each one of your nodes. For example, in a two-nodes configuration:

.. code-block:: xml

   <hosts>
     <host>https://10.0.0.1:9200</host>
     <host>https://10.0.0.2:9200</host>
   </hosts>

Vulnerability detection prioritizes reporting to the first node in the list. It switches to the next node in case it's not available.

.. End of include file
