.. Copyright (C) 2015, Wazuh, Inc.

.. code-block:: xml
  :emphasize-lines: 4

  <indexer>
      <enabled>yes</enabled>
      <hosts>
        <host>https://0.0.0.0:9200</host> <!-- Replace with your indexer URL -->
      </hosts>
      <ssl>
        <certificate_authorities>
          <ca>/etc/filebeat/certs/root-ca.pem</ca>
        </certificate_authorities>
        <certificate>/etc/filebeat/certs/filebeat.pem</certificate>
        <key>/etc/filebeat/certs/filebeat-key.pem</key>
      </ssl>
  </indexer>

.. End of include file

