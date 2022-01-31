.. Copyright (C) 2015-2022 Wazuh, Inc.

#. Download the ``wazuh-cert-tool.sh`` script and the ``config.yml`` configuration file. This is to create the certificates that will encrypt communications between the Wazuh central components.

   .. code-block:: console

    # curl -sO https://packages-dev.wazuh.com/resources/4.3/install_functions/opendistro/wazuh-cert-tool.sh
    # curl -sO https://packages-dev.wazuh.com/resources/4.3/config/opendistro/certificate/config.yml

#. Edit ``./config.yml`` and replace the node names and IP values with the corresponding names and IP addresses. You need to do this for all the Wazuh server, the Wazuh indexer, and the Wazuh dashboard nodes. Add as many node fields as needed.

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


#. Copy ``certs.tar`` to all the nodes, including Wazuh indexer, Wazuh server, and Wazuh dashboard nodes. This can be done by using ``scp``. 

.. End of include file
