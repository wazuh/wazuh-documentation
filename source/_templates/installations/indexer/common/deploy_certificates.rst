.. Copyright (C) 2015-2022 Wazuh, Inc.

#. Remove the demo certificates.

   .. code-block:: console

    # rm /etc/wazuh-indexer/demo-indexer-key.pem /etc/wazuh-indexer/demo-indexer.pem /etc/wazuh-indexer/admin-key.pem /etc/wazuh-indexer/admin.pem /etc/wazuh-indexer/root-ca.pem -f

#. Replace ``<indexer-node-certificate-name>`` with the name of the certificate for your current Wazuh indexer node, the same used in ``instances.yml``. Then, move the certificates to their corresponding location. This is to deploy  the SSL certificates to encrypt communications between the Wazuh central components.

   .. code-block:: console

     # NODE_NAME=<indexer-node-certificate-name>

   .. code-block:: console 
     
     # mkdir /etc/wazuh-indexer/certs/
     # tar -xf ./certs.tar -C /etc/wazuh-indexer/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./admin.pem ./root-ca.pem

   ..
     # mv /etc/wazuh-indexer/certs/$NODE_NAME.pem /etc/wazuh-indexer/certs/elasticsearch.pem
     # mv /etc/wazuh-indexer/certs/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/elasticsearch-key.pem     

#. **Recommended action** - To increase security, remove ``certs.tar`` running ``rm -f ./certs.tar`` unless you want to install other Wazuh components on this node.

.. End of include file
