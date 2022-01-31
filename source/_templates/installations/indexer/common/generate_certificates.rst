.. Copyright (C) 2015-2022 Wazuh, Inc.

#. Download the ``wazuh-cert-tool.sh`` script and the ``config.yml`` configuration file. This is to create the certificates that will encrypt communications between the Wazuh central components.

   .. code-block:: console

     # curl -sO https://packages.wazuh.com/resources/4.3/indexer/tools/certificate-utility/wazuh-cert-tool.sh
     # curl -sO https://packages.wazuh.com/resources/4.3/indexer/tools/certificate-utility/config.yml

#. Edit ``./config.yml`` and replace the node names and IP values with the corresponding name and IP address of your single node or your cluster nodes. If deploying Wazuh in multiple nodes, you need to make this definition for all your Wazuh server, Wazuh indexer, and Wazuh dashboard nodes. Add as many node fields as necessary.

      .. code-block:: yaml

         nodes:
           # Wazuh indexer nodes
           wazuh_indexer:
             name: <wazuh-indexer-node-name>
             ip: <wazuh-indexer-node-ip>
             # name: <wazuh-indexer-node-name>
             # ip: <wazuh-indexer-node-ip>
         
           # Wazuh server nodes
           # Use node_type only with more than one Wazuh manager
           wazuh_servers:
             name: <wazuh-server-node-name>
             ip: <wazuh-server-node-ip>
             # node_type: master
             # name: <wazuh-server-node-name>
             # ip: <wazuh-server-node-ip>
             # node_type: worker
         
           # Wazuh dashboard node
           wazuh_dashboard:
             name: <wazuh-dashboard-node-name>
             ip: <wazuh-dashboard-node-ip>
  
   To learn more about how to create and configure the certificates, see the :doc:`/user-manual/certificates` section.

#. Run the ``./wazuh-cert-tool.sh`` to create the certificates. For a multi-node cluster, these certificates need to be later deployed to all Wazuh instances in your cluster.

   .. code-block:: console

     #  bash ./wazuh-cert-tool.sh

#. Compress all the necessary files.

   .. code-block:: console

     # tar -cvf ./certs.tar -C ./certs/ .
     # rm -r ./certs


#. Copy ``certs.tar`` to all the nodes, including Wazuh indexer, Wazuh server, and Wazuh dashboard nodes, if deploying a multi-node cluster. This can be done by using ``scp``. 

.. End of include file
