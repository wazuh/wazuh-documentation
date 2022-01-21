.. Copyright (C) 2015-2022 Wazuh, Inc.

#. Download the ``wazuh-cert-tool.sh`` script and the ``instances.yml`` configuration file. This is to create the certificates that will encrypt communications between the Wazuh central components.

   .. code-block:: console

     # curl -sO https://packages.wazuh.com/resources/|WAZUH_LATEST_MINOR|/indexer/tools/certificate-utility/wazuh-cert-tool.sh
     # curl -sO https://packages.wazuh.com/resources/|WAZUH_LATEST_MINOR|/indexer/tools/certificate-utility/instances.yml

#. Edit ``./instances.yml`` and replace the node certificate names and IP values with the corresponding certificate names and IP addresses. Add or remove as many node fields as needed.

   .. code-block:: yaml

     # Elasticsearch nodes
     elasticsearch-nodes:
       - name: <indexer-node-1-certificate-name>
         ip:
           - <indexer-node-1-IP>
       - name: <indexer-node-2-certificate-name>
         ip:
           - <indexer-node-2-IP>
       - name: <indexer-node-3-certificate-name>
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

#. Run the ``./wazuh-cert-tool.sh`` to create the certificates. These certificates are later deployed to all Wazuh instances.

   .. code-block:: console

     #  bash ./wazuh-cert-tool.sh

   
.. End of include file
