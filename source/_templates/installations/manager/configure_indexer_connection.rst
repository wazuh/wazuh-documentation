.. Copyright (C) 2015, Wazuh, Inc.

By default, the host is set to localhost: ``<host>https://0.0.0.0:9200/host>``. Replace it with your Wazuh indexer address accordingly. You can use either IP addresses or hostnames.

.. code-block:: xml
  :emphasize-lines: 4

  <indexer>
      <enabled>yes</enabled>
      <hosts>
        <host>https://10.0.0.1:9200</host>
      </hosts>
      <ssl>
        <certificate_authorities>
          <ca>/etc/filebeat/certs/root-ca.pem</ca>
        </certificate_authorities>
        <certificate>/etc/filebeat/certs/filebeat.pem</certificate>
        <key>/etc/filebeat/certs/filebeat-key.pem</key>
      </ssl>
  </indexer>

If you have more than one Wazuh indexer node, add all the required ``<host>`` entries. The vulnerability detector module will report to the first available node found and will switch to the next one in case of error.

.. code-block:: xml

      <hosts>
        <host>https://10.0.0.1:9200</host>
        <host>https://10.0.0.2:9200</host>
      </hosts>

.. End of include file
