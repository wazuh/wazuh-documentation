.. Copyright (C) 2015, Wazuh, Inc.

.. code-block:: console

  # NODE_NAME=wazuh-node-name 

.. code-block:: console
  
  # mkdir /etc/filebeat/certs
  # tar -xf ~/certs.tar -C /etc/filebeat/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
  # mv /etc/filebeat/certs/$NODE_NAME.pem /etc/filebeat/certs/filebeat.pem
  # mv /etc/filebeat/certs/$NODE_NAME-key.pem /etc/filebeat/certs/filebeat-key.pem

.. End of copy_certificates_filebeat.rst
