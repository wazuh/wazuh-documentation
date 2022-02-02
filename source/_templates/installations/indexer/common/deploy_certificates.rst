.. Copyright (C) 2015-2022 Wazuh, Inc.

#. Remove the demo certificates.

   .. code-block:: console

    # rm /etc/wazuh-indexer/certs/demo-indexer-key.pem /etc/wazuh-indexer/certs/demo-indexer.pem /etc/wazuh-indexer/certs/admin-key.pem /etc/wazuh-indexer/certs/admin.pem /etc/wazuh-indexer/certs/root-ca.pem -f

#. Run the following commands replacing ``<indexer-node-name>`` with the name of the Wazuh indexer node you are configuring, for example ``node-1``, as defined in ``config.yml``. This is to deploy  the SSL certificates to encrypt communications between the Wazuh central components.

   .. code-block:: console

     # NODE_NAME=<indexer-node-name>

   .. code-block:: console 
     
     # tar -xf ./certs.tar -C /etc/wazuh-indexer/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./admin*.pem ./root-ca.pem
     # mv /etc/wazuh-indexer/certs/$NODE_NAME.pem /etc/wazuh-indexer/certs/wazuh-indexer.pem
     # mv /etc/wazuh-indexer/certs/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/wazuh-indexer-key.pem     

#. **Recommended action** - If deploying Wazuh as a multi-node cluster and no other Wazuh components are going to be installed on this node, remove ``certs.tar`` running ``rm -f ./certs.tar`` to increase security.

.. End of include file
