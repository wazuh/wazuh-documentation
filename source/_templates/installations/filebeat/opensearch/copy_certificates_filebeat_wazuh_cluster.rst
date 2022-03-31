.. Copyright (C) 2022 Wazuh, Inc.

.. code-block:: console

  # NODE_NAME=<server-node-name>

.. code-block:: console
  
  # mkdir /etc/filebeat/certs
  # tar -xf ./wazuh-certificates.tar -C /etc/filebeat/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
  # mv -n /etc/filebeat/certs/$NODE_NAME.pem /etc/filebeat/certs/filebeat.pem
  # mv -n /etc/filebeat/certs/$NODE_NAME-key.pem /etc/filebeat/certs/filebeat-key.pem
  
.. End of copy_certificates_filebeat_wazuh_cluster.rst
