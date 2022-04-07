.. Copyright (C) 2022 Wazuh, Inc.

#. Download the ``wazuh-certs-tool.sh`` to create the certificates.

   .. code-block:: console

     # curl -sO https://packages-dev.wazuh.com/4.3/wazuh-certs-tool.sh
     # curl -sO https://s3.us-west-1.amazonaws.com/packages-dev.wazuh.com/resources/4.2/config/opendistro/certificate/instances.yml

#. Edit ``./instances.yml`` and replace the node names and IP values with the corresponding names and IP addresses. Add as many node fields as needed.

   .. code-block:: yaml

     # Elasticsearch nodes
     elasticsearch-nodes:
       - name: <elasticsearch-node-name-1>
         ip:
           - <elasticsearch-node-1-IP>
       - name: <elasticsearch-node-name-2>
         ip:
           - <elasticsearch-node-2-IP>
       - name: <elasticsearch-node-name-3>
         ip:
           - <elasticsearch-node-3-IP>            

     # Wazuh server nodes
     wazuh-servers:
       - name: <wazuh-node-name-1>
         ip:
           - <wazuh-node-1-IP>  
       - name: <wazuh-node-name-2>
         ip:
           - <wazuh-node-2-IP>     
     
     # Kibana node
     kibana:
       - name: <kibana-node-name>
         ip:
           - <kibana-node-IP>      
  
   To learn more about how to create and configure the certificates, see the :ref:`Certificates deployment <user_manual_certificates>` section.

#. Run the ``./wazuh-certs-tool.sh`` to create the certificates.

   .. code-block:: console

     #  bash ./wazuh-certs-tool.sh

#. Replace ``<elasticsearch-node-name>`` with the name of your current Elasticsearch node, the same used in ``instances.yml`` to create the certificates, and move the certificates to their corresponding location.

   .. code-block:: console

     # NODE_NAME=<elasticsearch-node-name>

   .. code-block:: console 
     
     # mkdir /etc/elasticsearch/certs/
     # mv ./certs/$NODE_NAME* /etc/elasticsearch/certs/
     # mv ./certs/admin* /etc/elasticsearch/certs/
     # cp ./certs/root-ca* /etc/elasticsearch/certs/
     # mv /etc/elasticsearch/certs/$NODE_NAME.pem /etc/elasticsearch/certs/elasticsearch.pem
     # mv /etc/elasticsearch/certs/$NODE_NAME-key.pem /etc/elasticsearch/certs/elasticsearch-key.pem     

#. Compress all the necessary files to be sent to all the instances.

   .. code-block:: console

     # tar -cvf ./certs.tar -C ./certs/ .

#. Copy ``certs.tar`` to all the servers of the distributed deployment, including the Elasticsearch, Wazuh server, and Kibana nodes. This can be done by using, for example, ``scp``. 

#. If you want to later install other Wazuh components on this node, keep the certificates file. Otherwise, if the file is already copied to all the instances of the distributed deployment, remove it with ``rm -f ./certs.tar`` to increase security.

.. End of include file
