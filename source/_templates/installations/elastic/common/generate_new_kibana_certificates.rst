.. Copyright (C) 2022 Wazuh, Inc.


.. code-block:: console

  # NODE_NAME=kibana-node-name
  
.. code-block:: console  
  
  # mkdir /etc/kibana/certs
  # tar -xf ./certs.tar -C /etc/kibana/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
  # mv /etc/kibana/certs/$NODE_NAME.pem /etc/kibana/certs/kibana.pem
  # mv /etc/kibana/certs/$NODE_NAME-key.pem /etc/kibana/certs/kibana-key.pem
  # chown kibana:kibana /etc/kibana/certs/*

.. End of include file
