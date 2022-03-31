.. Copyright (C) 2015-2022 Wazuh, Inc.


#. Run the following commands replacing ``<indexer-node-name>`` with the name of the Wazuh indexer node you are configuring, for example ``node-1``, as defined in ``config.yml``. This is to deploy  the SSL certificates to encrypt communications between the Wazuh central components.

   .. code-block:: console

     # NODE_NAME=<indexer-node-name>

   .. code-block:: console 
     
     # mkdir /etc/wazuh-indexer/certs
     # tar -xf ./wazuh-certificates.tar -C /etc/wazuh-indexer/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./admin.pem ./admin-key.pem ./root-ca.pem
     # mv -n /etc/wazuh-indexer/certs/$NODE_NAME.pem /etc/wazuh-indexer/certs/indexer.pem
     # mv -n /etc/wazuh-indexer/certs/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/indexer-key.pem
     # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs/
     # chmod 750 /etc/wazuh-indexer/certs/
     # chmod 600 /etc/wazuh-indexer/certs/*
    
#. **Recommended action** - If no other Wazuh components are going to be installed on this node, remove ``wazuh-certificates.tar`` running ``rm -f ./wazuh-certificates.tar`` to increase security.

.. End of include file
