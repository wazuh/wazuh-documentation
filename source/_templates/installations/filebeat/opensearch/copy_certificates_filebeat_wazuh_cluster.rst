.. Copyright (C) 2015, Wazuh, Inc.

.. code-block:: console

  # NODE_NAME=<SERVER_NODE_NAME>

.. code-block:: console
  
  # mkdir /etc/filebeat/certs
  # tar -xf ./wazuh-certificates.tar -C /etc/filebeat/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
  # mv -n /etc/filebeat/certs/$NODE_NAME.pem /etc/filebeat/certs/filebeat.pem
  # mv -n /etc/filebeat/certs/$NODE_NAME-key.pem /etc/filebeat/certs/filebeat-key.pem
  # chmod 500 /etc/filebeat/certs
  # chmod 400 /etc/filebeat/certs/*
  # chown -R root:root /etc/filebeat/certs
  
.. End of copy_certificates_filebeat_wazuh_cluster.rst
