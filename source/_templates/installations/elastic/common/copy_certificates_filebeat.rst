.. Copyright (C) 2022 Wazuh, Inc.

.. code-block:: console

  # node_name=wazuh-node-name 

.. code-block:: console
  
  # mkdir /etc/filebeat/certs
  # mv ~/certs.tar /etc/filebeat/certs/
  # cd /etc/filebeat/certs/
  # tar -xf certs.tar $node_name.pem $node_name-key.pem root-ca.pem
  # mv /etc/filebeat/certs/$node_name.pem /etc/filebeat/certs/filebeat.pem
  # mv /etc/filebeat/certs/$node_name-key.pem /etc/filebeat/certs/filebeat-key.pem

.. End of copy_certificates_filebeat.rst
