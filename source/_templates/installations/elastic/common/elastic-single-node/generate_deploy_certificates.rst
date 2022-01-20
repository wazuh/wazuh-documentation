.. Copyright (C) 2022 Wazuh, Inc.


#. Download the ``wazuh-cert-tool.sh`` to create the certificates:

   .. code-block:: console
 
     # curl -so ~/wazuh-cert-tool.sh https://packages.wazuh.com/resources/4.2/open-distro/tools/certificate-utility/wazuh-cert-tool.sh
     # curl -so ~/instances.yml https://packages.wazuh.com/resources/4.2/open-distro/tools/certificate-utility/instances.yml

#. Edit ``~/instances.yml`` and replace the values ``<node-name>`` and ``node-IP``  with the corresponding names and IP addresses. Add as many nodes fields as needed:
 
   .. code-block:: yaml
 
     # Elasticsearch nodes
     elasticsearch-nodes:
       - name: <node-name>
         ip:
           - node-IP  

     # Wazuh server nodes
     wazuh-servers:
       - name: <node-name>
         ip:
           - node-IP      
     
     # Kibana node
     kibana:
       - name: <node-name>
         ip:
           - node-IP      
   
   To learn more about how to create and configure the certificates, see the :ref:`Certificates deployment <user_manual_certificates>` section.

#. Run the ``wazuh-cert-tool.sh`` to create the certificates:

   .. code-block:: console

     #  bash ~/wazuh-cert-tool.sh

#. Replace ``elasticsearch-node-name`` with your Elasticsearch node name, the same used in ``instances.yml`` to create the certificates, and move the certificates to their corresponding location:

   .. code-block:: console

     # node_name=elasticsearch-node-name

   .. code-block:: console
     
     # mkdir /etc/elasticsearch/certs/
     # mv ~/certs/$node_name* /etc/elasticsearch/certs/
     # mv ~/certs/admin* /etc/elasticsearch/certs/
     # cp ~/certs/root-ca* /etc/elasticsearch/certs/
     # mv /etc/elasticsearch/certs/$node_name.pem /etc/elasticsearch/certs/elasticsearch.pem
     # mv /etc/elasticsearch/certs/$node_name-key.pem /etc/elasticsearch/certs/elasticsearch-key.pem


#. Compress all the necessary files to be sent to all the instances:

   .. code-block:: console

     # cd ~/certs/  
     # tar -cvf certs.tar *
     # mv ~/certs/certs.tar ~/

#. Copy ``certs.tar`` to all the servers of the distributed deployment. This can be done by using, for example, ``scp``. 

#. If Kibana will be installed on this node, keep the certificates file. Otherwise, if the file is already copied to all the instances of the distributed deployment, remove it to increase security  ``rm -f certs.tar``.

.. End of include file
