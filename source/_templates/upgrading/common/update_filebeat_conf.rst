.. Copyright (C) 2020 Wazuh, Inc.

.. code-block:: console

    # cp /etc/filebeat/filebeat.yml /backup/filebeat.yml.backup
    # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_LATEST|/extensions/filebeat/7.x/filebeat.yml
    # chmod go+r /etc/filebeat/filebeat.yml
    
.. End of include file
