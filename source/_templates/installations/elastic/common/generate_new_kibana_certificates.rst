.. Copyright (C) 2022 Wazuh, Inc.


.. code-block:: console

  # node_name=kibana-node-name
  
.. code-block:: console  
  
  # mkdir /etc/kibana/certs
  # mv ~/certs.tar /etc/kibana/certs/
  # cd /etc/kibana/certs/
  # tar -xf certs.tar $node_name.pem $node_name-key.pem root-ca.pem
  # mv /etc/kibana/certs/$node_name.pem /etc/kibana/certs/kibana.pem
  # mv /etc/kibana/certs/$node_name-key.pem /etc/kibana/certs/kibana-key.pem
  # chown kibana:kibana /etc/kibana/certs/*
  # rm -f certs.tar

.. End of include file
