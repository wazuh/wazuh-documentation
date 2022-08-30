.. Copyright (C) 2015, Wazuh, Inc.


.. code-block:: console

  # NODE_NAME=wazuh-dashboard-node-name
  
.. code-block:: console  
  
  # tar -xf ./certs.tar -C /etc/wazuh-dashboard/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
  # mv /etc/wazuh-dashboard/certs/$NODE_NAME.pem /etc/wazuh-dashboard/certs/wazuh-dashboard.pem
  # mv /etc/wazuh-dashboard/certs/$NODE_NAME-key.pem /etc/wazuh-dashboard/certs/wazuh-dashboard-key.pem
  # chown wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs/*

.. End of include file
