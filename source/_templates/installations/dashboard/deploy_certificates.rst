.. Copyright (C) 2015-2022 Wazuh, Inc.

#. Replace ``<dashboard-node-name>`` with your Wazuh dashboard node name, the same used in ``config.yml`` to create the certificates, and move the certificates to their corresponding location. 

    .. code-block:: console

      # NODE_NAME=<dashboard-node-name>
      
    .. code-block:: console  
    
      # mkdir /etc/wazuh-dashboard/certs
      # tar -xf ./wazuh-certificates.tar -C /etc/wazuh-dashboard/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
      # mv /etc/wazuh-dashboard/certs/$NODE_NAME.pem /etc/wazuh-dashboard/certs/dashboard.pem
      # mv /etc/wazuh-dashboard/certs/$NODE_NAME-key.pem /etc/wazuh-dashboard/certs/dashboard-key.pem
      # chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/
      # chmod -R 500 /etc/wazuh-dashboard/certs
      # chown wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs/*

.. End of include file
