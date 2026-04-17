.. Copyright (C) 2015, Wazuh, Inc.

By default, the indexer settings have one host configured. It's set to ``127.0.0.1`` as highlighted below.

.. code-block:: xml
   :emphasize-lines: 4

   <indexer>
     <enabled>yes</enabled>
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

- Replace ``127.0.0.1`` with your Wazuh indexer node IP address or hostname.

- Ensure the Wazuh manager certificate and key name match the certificate files in ``/var/wazuh-manager/etc/certs``.

If you are running a Wazuh indexer cluster infrastructure, add a ``<host>`` entry for each one of your nodes. For example, in a two-node configuration:

.. code-block:: xml

   <hosts>
     <host>https://10.0.0.1:9200</host>
     <host>https://10.0.0.2:9200</host>
   </hosts>

The Wazuh manager prioritizes reporting to the first Wazuh indexer node in the list. It switches to the next node in case it is not available.

.. End of include file
