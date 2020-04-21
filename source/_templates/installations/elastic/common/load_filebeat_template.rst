.. Copyright (C) 2020 Wazuh, Inc.

.. code-block:: console

  # curl https://raw.githubusercontent.com/wazuh/wazuh/v3.12.2/extensions/elasticsearch/7.x/wazuh-template.json | curl -X PUT "https://localhost:9200/_template/wazuh" -k -uadmin:admin -H 'Content-Type: application/json' -d @-

.. End of include file
