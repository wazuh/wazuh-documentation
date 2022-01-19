.. Copyright (C) 2015-2022 Wazuh, Inc.

#. Download the ``wazuh-cert-tool.sh`` script and the ``instances.yml`` configuration file to create the certificates.

   .. code-block:: console

     # curl -sO https://packages.wazuh.com/resources/4.3/indexer/tools/certificate-utility/wazuh-cert-tool.sh
     # curl -sO https://packages.wazuh.com/resources/4.3/indexer/tools/certificate-utility/instances.yml

#. Edit ``./instances.yml`` and replace the node names and IP values with the corresponding names and IP addresses. Add as many node fields as needed.

   .. code-block:: yaml

     # Elasticsearch nodes
     elasticsearch-nodes:
       - name: <indexer-node-1-certificate-name>
         ip:
           - <indexer-node-1-IP>
       - name: <indexer-node-2-certificate-name>
         ip:
           - <indexer-node-2-IP>
       - name: <indexer-node-2-certificate-name>
         ip:
           - <indexer-node-3-IP>

     # Wazuh server nodes
     wazuh-servers:
       - name: <server-node-1-certificate-name>
         ip:
           - <server-node-1-IP>
       - name: <server-node-2-certificate-name>
         ip:
           - <server-node-2-IP>
     
     # Kibana node
     kibana:
       - name: <dashboard-node-certificate-name>
         ip:
           - <dashboard-node-IP>
  
   To learn more about how to create and configure the certificates, see the :doc:`/user-manual/certificates` section.

#. Run the ``./wazuh-cert-tool.sh`` to create the certificates.

   .. code-block:: console

     #  bash ./wazuh-cert-tool.sh

#. Replace ``<indexer-node-name>`` with the name of your current Wazuh indexer node, the same used in ``instances.yml`` to create the certificates. Then, move the certificates to their corresponding location.

   .. code-block:: console

     # NODE_NAME=<indexer-node-certificate-name>

   .. code-block:: console 
     
     # mkdir /etc/wazuh-indexer/certs/
     # mv ./certs/$NODE_NAME* /etc/wazuh-indexer/certs/
     # mv ./certs/admin* /etc/wazuh-indexer/certs/
     # cp ./certs/root-ca* /etc/wazuh-indexer/certs/

   ..
     # mv /etc/wazuh-indexer/certs/$NODE_NAME.pem /etc/wazuh-indexer/certs/elasticsearch.pem
     # mv /etc/wazuh-indexer/certs/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/elasticsearch-key.pem     

#. Compress all the necessary files to be sent to all the instances.

   .. code-block:: console

     # tar -cvf ./certs.tar -C ./certs/ .

#. Copy ``certs.tar`` to all the servers of the distributed deployment, including the Wazuh indexer, Wazuh server, and Wazuh dashboard nodes. This can be done by using, for example, ``scp``. 

#. If you want to later install other Wazuh components on this node, keep the certificates file. Otherwise, if the file is already copied to all the instances of the distributed deployment, remove it with ``rm -f ./certs.tar`` to increase security.

.. End of include file
