.. Copyright (C) 2015-2022 Wazuh, Inc.

#. Download the ``wazuh-certs-tool.sh`` script and the ``config.yml`` configuration file. This is to create the certificates that will encrypt communications between the Wazuh central components.

   .. code-block:: console

    # curl -sO https://packages-dev.wazuh.com/4.3/wazuh-certs-tool.sh
    # curl -sO https://packages-dev.wazuh.com/4.3/config.yml

#. Edit ``./config.yml`` and replace the node names and IP values with the corresponding names and IP addresses. You need to do this for all the Wazuh server, the Wazuh indexer, and the Wazuh dashboard nodes. Add as many node fields as needed.

      .. code-block:: yaml

         nodes:
           # Wazuh indexer nodes
           indexer:
             - name: node-1
               ip: <indexer-node-ip>
             # - name: node-2
             #   ip: <indexer-node-ip>
             # - name: node-3
             #   ip: <indexer-node-ip>
         
           # Wazuh server nodes
           # Use node_type only with more than one Wazuh manager
           server:
             - name: wazuh-1
               ip: <wazuh-manager-ip>
             # node_type: master
             # - name: wazuh-2
             #   ip: <wazuh-manager-ip>
             # node_type: worker
         
           # Wazuh dashboard node
           dashboard:
             - name: dashboard
               ip: <dashboard-node-ip>
           
      To learn more about how to create and configure the certificates, see the :doc:`/user-manual/certificates` section.

#. Run the ``./wazuh-certs-tool.sh`` to create the certificates. For a multi-node cluster, these certificates need to be later deployed to all Wazuh instances in your cluster.

   .. code-block:: console

     #  bash ./wazuh-certs-tool.sh -A

#. Compress all the necessary files.

   .. code-block:: console

     # tar -cvf ./wazuh-certificates.tar -C ./wazuh-certificates/ .
     # rm -rf ./wazuh-certificates


#. Copy ``wazuh-certificates.tar`` to all the nodes, including Wazuh indexer, Wazuh server, and Wazuh dashboard nodes. This can be done by using ``scp``. 

.. End of include file
