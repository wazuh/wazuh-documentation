.. Copyright (C) 2021 Wazuh, Inc.

.. code-block:: console

  # NODE_NAME=kibana-node-name
  
.. code-block:: console  
  
  # mkdir /etc/kibana/certs
  # mv ~/certs.tar /etc/kibana/certs/
  # chown kibana:kibana /etc/kibana/certs/*
  # cd /etc/kibana/certs/
  # tar -xf certs.tar $NODE_NAME.pem $NODE_NAME-key.pem root-ca.pem
  # mv /etc/kibana/certs/$NODE_NAME.pem /etc/kibana/certs/kibana.pem
  # mv /etc/kibana/certs/$NODE_NAME-key.pem /etc/kibana/certs/kibana-key.pem
  # rm -f certs.tar

.. End of include file
