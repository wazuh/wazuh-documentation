.. Copyright (C) 2022 Wazuh, Inc.

- ``hosts``: Set the Wazuh indexer nodes address, you can use either an IP address or a hostname. By default, the host is set to ``127.0.0.1``.
  
  In case of having more than one Wazuh indexer node, you can separate the addresses using commas. Eg. ``hosts: ["10.0.0.1:9200", "10.0.0.2:9200", "10.0.0.3:9200"]`` 

.. code-block:: yaml
  :emphasize-lines: 3

   # Wazuh - Filebeat configuration file
   output.elasticsearch:
   hosts: ["10.0.0.1:9200"]
   protocol: https
   username: ${username}
   password: ${password}
         

.. End of include file
