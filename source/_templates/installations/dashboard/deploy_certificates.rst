.. Copyright (C) 2015, Wazuh, Inc.

#. Replace ``<DASHBOARD_NODE_NAME>`` with your Wazuh dashboard node name, the same one used in ``config.yml`` to create the certificates, and move the certificates to their corresponding location. 

    .. code-block:: console

      # NODE_NAME=<DASHBOARD_NODE_NAME>
      
    .. code-block:: console  
    
      # mkdir /etc/wazuh-dashboard/certs
      # tar -xf ./wazuh-certificates.tar -C /etc/wazuh-dashboard/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
      # mv -n /etc/wazuh-dashboard/certs/$NODE_NAME.pem /etc/wazuh-dashboard/certs/dashboard.pem
      # mv -n /etc/wazuh-dashboard/certs/$NODE_NAME-key.pem /etc/wazuh-dashboard/certs/dashboard-key.pem
      # chmod 500 /etc/wazuh-dashboard/certs
      # chmod 400 /etc/wazuh-dashboard/certs/*
      # chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs

.. End of include file
