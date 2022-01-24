.. Copyright (C) 2015-2022 Wazuh, Inc.

#. Remove the demo certificates.

   .. code-block:: console

    # rm /etc/wazuh-indexer/demo-indexer-key.pem /etc/wazuh-indexer/demo-indexer.pem /etc/wazuh-indexer/admin-key.pem /etc/wazuh-indexer/admin.pem /etc/wazuh-indexer/root-ca.pem -f

#. Replace ``<indexer-node-name>`` with the name of your current Wazuh indexer node, the same used in ``config.yml``. Then, move the certificates to their corresponding location. This is to deploy  the SSL certificates to encrypt communications between the Wazuh central components.

   .. code-block:: console

     # NODE_NAME=<indexer-node-certificate-name>

   .. code-block:: console 
     
     # mkdir /etc/wazuh-indexer/certs/
     # mv ./certs/$NODE_NAME* /etc/wazuh-indexer/certs/
     # cp ./certs/admin* /etc/wazuh-indexer/certs/
     # cp ./certs/root-ca* /etc/wazuh-indexer/certs/

   ..
     # mv /etc/wazuh-indexer/certs/$NODE_NAME.pem /etc/wazuh-indexer/certs/elasticsearch.pem
     # mv /etc/wazuh-indexer/certs/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/elasticsearch-key.pem     

#. Compress all the necessary files to be sent to all the instances.

    .. code-block:: console

      # tar -cvf ./certs.tar -C ./certs/ .
      # rm -r ./certs/

#. Copy ``certs.tar`` to all the remaining nodes of the distributed deployment, including Wazuh indexer, Wazuh server, and Wazuh dashboard nodes. This can be done by using ``scp``. 

#. **Recommended action** - To increase security, remove ``certs.tar`` running ``rm -f certs.tar`` unless you want to install other Wazuh components on this node.

.. End of include file
