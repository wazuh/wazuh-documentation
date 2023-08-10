.. Copyright (C) 2015, Wazuh, Inc.

#. Download the ``wazuh-certs-tool.sh`` script and the ``config.yml`` configuration file. This creates the certificates that encrypt communications between the Wazuh central components.

   .. code-block:: console

    # curl -sO https://packages.wazuh.com/4.5/wazuh-certs-tool.sh
    # curl -sO https://packages.wazuh.com/4.5/config.yml

#. Edit ``./config.yml`` and replace the node names and IP values with the corresponding names and IP addresses. You need to do this for all Wazuh server, Wazuh indexer, and Wazuh dashboard nodes. Add as many node fields as needed.

      .. code-block:: yaml

        nodes:
          # Wazuh indexer nodes
          indexer:
            - name: node-1
              ip: "<indexer-node-ip>"
            #- name: node-2
            #  ip: "<indexer-node-ip>"
            #- name: node-3
            #  ip: "<indexer-node-ip>"

          # Wazuh server nodes
          # If there is more than one Wazuh server 
          # node, each one must have a node_type
          server:
            - name: wazuh-1
              ip: "<wazuh-manager-ip>"
            #  node_type: master
            #- name: wazuh-2
            #  ip: "<wazuh-manager-ip>"
            #  node_type: worker
            #- name: wazuh-3
            #  ip: "<wazuh-manager-ip>"
            #  node_type: worker

          # Wazuh dashboard nodes
          dashboard:
            - name: dashboard
              ip: "<dashboard-node-ip>"

           
      To learn more about how to create and configure the certificates, see the :doc:`/user-manual/certificates` section.

#. Run ``./wazuh-certs-tool.sh`` to create the certificates. For a multi-node cluster, these certificates need to be later deployed to all Wazuh instances in your cluster.

   .. code-block:: console

     #  bash ./wazuh-certs-tool.sh -A

#. Compress all the necessary files.

   .. code-block:: console

     # tar -cvf ./wazuh-certificates.tar -C ./wazuh-certificates/ .
     # rm -rf ./wazuh-certificates


#. Copy the ``wazuh-certificates.tar`` file to all the nodes, including the Wazuh indexer, Wazuh server, and Wazuh dashboard nodes. This can be done by using the ``scp`` utility. 

.. End of include file
