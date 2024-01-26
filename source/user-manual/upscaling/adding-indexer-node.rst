.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: 

Adding a Wazuh indexer node
===========================

The Wazuh indexer is a highly scalable, full-text search engine that enables efficient storage and retrieval of security-related data. It is designed to handle large amounts of security events and logs, offering advanced search capabilities and various security features.

Adding a new node to the Wazuh cluster can enhance the capacity and resilience of the security monitoring infrastructure.

The upscale process involves creating certificates, configuring existing components to connect with the new Wazuh indexer node(s), and then installing and configuring the new node(s).

We have organized the steps for upscaling the Wazuh indexer into two subsections: one for an all-in-one deployment and the other for a distributed deployment. Your choice between these methods depends on your existing deployment and the infrastructure you aim to upscale.

-  **All-in-one deployment**

   If you have Wazuh all-in-one configuration, follow the steps outlined in the "All-in-one deployment" subsections to upscale your Wazuh indexer.

-  **Distributed deployment**

   For an existing distributed deployment, refer to the "Distributed deployment" subsections to upscale your Wazuh indexer.

Ensure you select the appropriate sub-section based on your existing deployment. If you are unsure which method aligns with your infrastructure, consider reviewing your deployment architecture before proceeding.

Perform the following steps to add new indexer nodes to your infrastructure:

.. note::
   
   You need ``root`` user privileges to execute the commands below.

Certificates creation
---------------------

Perform the outlined steps on your existing Wazuh indexer node to generate the certificates required for secure communication among the Wazuh central components.

All-in-one deployment
^^^^^^^^^^^^^^^^^^^^^

We recommend creating entirely new certificates for your Wazuh indexer nodes. Perform the following steps to create new certificates.

#. Create a ``config.yml`` file in the ``/root`` directory to add the new Wazuh indexer node(s).

   .. code-block:: console

      # touch /root/config.yml

   Edit the ``/root/config.yml`` file to include the following content.

   .. code-block:: yaml

      nodes:
      # Wazuh indexer nodes
        indexer:
          - name: <EXISTING_WAZUH_INDEXER_NODE_NAME>
            ip: <EXISTING_WAZUH_INDEXER_IP>
          - name: <NEW_WAZUH_INDEXER_NODE_NAME>
            ip: <NEW_WAZUH_INDEXER_IP>

      # Wazuh server nodes
        server:
          - name: <WAZUH_SERVER_NODE_NAME>
            ip: <WAZUH_SERVER_IP>

      # Wazuh dashboard nodes
        dashboard:
          - name: <WAZUH_DASHBOARD_NODE_NAME>
            ip: <WAZUH_DASHBOARD_IP>

   Replace the values with your node names and their corresponding IP addresses.

#. Download and run ``./wazuh-certs-tool.sh`` from your ``/root`` directory to recreate the certificates for the old and new nodes.

   .. code-block:: console

      # curl -sO https://packages.wazuh.com/4.7/wazuh-certs-tool.sh
      # bash wazuh-certs-tool.sh -A

#. Compress the certificates folder and copy it to the new Wazuh indexer node(s). You can make use of the ``scp`` utility to securely copy the compressed file.

   .. code-block:: console

      # tar -cvf ./wazuh-certificates.tar -C ./wazuh-certificates/ .
      # scp wazuh-certificates.tar <TARGET_USERNAME>@<TARGET_IP>:

Distributed deployment
^^^^^^^^^^^^^^^^^^^^^^

We recommend you utilize pre-existing root-ca keys to generate certificates for new nodes. 
Perform the steps below on one indexer node only.

#. Create a ``config.yml`` file in the ``/root`` directory to add the new Wazuh indexer node(s).

   .. code-block:: console

      # touch /root/config.yml

   Edit the ``/root/config.yml`` file to include the node name and IP of the new node.

   .. code-block:: yaml

      nodes:
        # Wazuh indexer nodes
        indexer:
          - name: <NEW_WAZUH_INDEXER_NODE_NAME>
            ip: <NEW_WAZUH_INDEXER_IP>

   Replace the values with your node names and their corresponding IP addresses.

#. Extract the ``wazuh-certificates.tar`` file.

   .. code-block:: console

      # mkdir wazuh-install-files && tar -xf ./wazuh-certificates.tar -C wazuh-install-files

#. Download and run ``./wazuh-certs-tool.sh`` to create the certificates for the new indexer node using the pre-existing root-ca keys:

   .. code-block:: console

      # curl -sO https://packages.wazuh.com/4.7/wazuh-certs-tool.sh
      # bash wazuh-certs-tool.sh -A wazuh-install-files/root-ca.pem wazuh-install-files/root-ca.key

#. Copy the newly created certificates to the ``wazuh-install-files`` folder making sure not to replace the admin certificates.

   .. code-block:: console

      # cp wazuh-certificates/<NEW_WAZUH_INDEXER_NODE_NAME>* wazuh-install-files
   
   .. _creating_new_certificates:
   
   .. note::

      If the pre-existing root-ca keys have been deleted or if you are not able to access them, you can proceed with creating new certificates for all the nodes as follows.

      #. Create the ``/root/config.yml`` file to reference all your nodes.

         .. code-block:: yaml

            nodes:
            # Wazuh indexer nodes
              indexer:
                - name: <EXISTING_WAZUH_INDEXER_NODE_NAME>
                  ip: <EXISTING_WAZUH_INDEXER_IP>
                - name: <NEW_WAZUH_INDEXER_NODE_NAME>
                  ip: <NEW_WAZUH_INDEXER_IP>

            # Wazuh server nodes
              server:
                - name: <WAZUH_SERVER_NODE_NAME>
                  ip: <WAZUH_SERVER_IP>

            # Wazuh dashboard nodes
              dashboard:
                - name: <WAZUH_DASHBOARD_NODE_NAME>
                  ip: <WAZUH_DASHBOARD_IP>

      #. Execute the ``wazuh-certs-tool.sh`` script to create the certificates.

         .. code-block:: console

            # curl -sO https://packages.wazuh.com/4.7/wazuh-certs-tool.sh
            # bash wazuh-certs-tool.sh -A

      #. Compress the certificates folder and copy it to the new Wazuh indexer node(s). You can make use of the ``scp`` utility to securely copy the compressed file.

         .. code-block:: console

            # tar -cvf ./wazuh-certificates.tar -C ./wazuh-certificates/ .
            # scp wazuh-certificates.tar <TARGET_USERNAME>@<TARGET_IP>:

#. Compress the certificates folder into a new ``wazuh-certificates.tar`` file and copy it to the new Wazuh indexer node(s). You can make use of the ``scp`` utility to securely copy the compressed file.

   .. code-block:: console

      # tar -cvf ./wazuh-certificates.tar -C ./wazuh-install-files/ .
      # scp wazuh-certificates.tar <TARGET_USERNAME>@<TARGET_IP>:

Configuring existing components to connect with the new node
------------------------------------------------------------

All-in-one deployment
^^^^^^^^^^^^^^^^^^^^^

#. Create a file, ``env_variables.sh``, in the ``/root`` directory of the existing node where you define your environment variables as follows.

   .. code-block:: console

      export NODE_NAME1=<EXISTING_WAZUH_INDEXER_NODE_NAME>
      export NODE_NAME2=<WAZUH_SERVER_NODE_NAME>
      export NODE_NAME3=<WAZUH_DASHBOARD_NODE_NAME> 

   Replace ``<EXISTING_WAZUH_INDEXER_NODE_NAME>``, ``<WAZUH_SERVER_NODE_NAME>``, ``<WAZUH_DASHBOARD_NODE_NAME>`` respectively with the names of the Wazuh indexer, Wazuh server, and Wazuh dashboard nodes as defined in ``/root/config.yml``.

#. Create a ``deploy-certificates.sh`` script in the ``/root`` directory and add the following content.

   .. code-block:: bash

      #!/bin/bash

      # Source the environmental variables from the external file
      source ~/env_variables.sh

      rm -rf /etc/wazuh-indexer/certs
      mkdir /etc/wazuh-indexer/certs
      tar -xf ./wazuh-certificates.tar -C /etc/wazuh-indexer/certs/ ./$NODE_NAME1.pem ./$NODE_NAME1-key.pem ./admin.pem ./admin-key.pem ./root-ca.pem
      mv -n /etc/wazuh-indexer/certs/$NODE_NAME1.pem /etc/wazuh-indexer/certs/wazuh-indexer.pem
      mv -n /etc/wazuh-indexer/certs/$NODE_NAME1-key.pem /etc/wazuh-indexer/certs/wazuh-indexer-key.pem
      chmod 500 /etc/wazuh-indexer/certs
      chmod 400 /etc/wazuh-indexer/certs/*
      chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs

      rm -rf /etc/filebeat/certs
      mkdir /etc/filebeat/certs
      tar -xf ./wazuh-certificates.tar -C /etc/filebeat/certs/ ./$NODE_NAME2.pem ./$NODE_NAME2-key.pem ./root-ca.pem
      mv -n /etc/filebeat/certs/$NODE_NAME2.pem /etc/filebeat/certs/wazuh-server.pem
      mv -n /etc/filebeat/certs/$NODE_NAME2-key.pem /etc/filebeat/certs/wazuh-server-key.pem
      chmod 500 /etc/filebeat/certs
      chmod 400 /etc/filebeat/certs/*
      chown -R root:root /etc/filebeat/certs

      rm -rf /etc/wazuh-dashboard/certs
      mkdir /etc/wazuh-dashboard/certs
      tar -xf ./wazuh-certificates.tar -C /etc/wazuh-dashboard/certs/ ./$NODE_NAME3.pem ./$NODE_NAME3-key.pem ./root-ca.pem
      mv -n /etc/wazuh-dashboard/certs/$NODE_NAME3.pem /etc/wazuh-dashboard/certs/wazuh-dashboard.pem
      mv -n /etc/wazuh-dashboard/certs/$NODE_NAME3-key.pem /etc/wazuh-dashboard/certs/wazuh-dashboard-key.pem
      chmod 500 /etc/wazuh-dashboard/certs
      chmod 400 /etc/wazuh-dashboard/certs/*
      chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs

#. Then deploy the certificates by executing the following command.

   .. code-block::  console

      # bash /root/deploy-certificates.sh
   
   This deploys the SSL certificates to encrypt communications between the Wazuh central components.

   **Recommended action**: If no other Wazuh components are going to be installed on this node, remove the ``wazuh-certificates.tar`` file by running the command below to increase security. Alternatively, save a copy offline for potential future use and scalability.

   .. code-block:: console

      # rm -rf ./wazuh-certificates
      # rm -f ./wazuh-certificates.tar

#. Edit the indexer configuration file at ``/etc/wazuh-indexer/opensearch.yml`` to include the new node(s) as follows. Uncomment or add more lines, according to your ``/root/config.yml`` definitions. Create the ``discovery.seed_hosts`` section if it doesn’t exist.

   .. code-block:: yaml
      :emphasize-lines: 5, 9, 12

      network.host: "<EXISTING_WAZUH_INDEXER_IP>"
      node.name: "<EXISTING_WAZUH_INDEXER_NODE_NAME>"
      cluster.initial_master_nodes:
      - "<EXISTING_WAZUH_INDEXER_NODE_NAME>"
      - "<NEW-WAZUH-INDEXER-NODE-NAME>"
      cluster.name: "wazuh-cluster"
      discovery.seed_hosts:
        - "<EXISTING_WAZUH_INDEXER_IP>"
        - "<NEW_WAZUH_INDEXER_IP>"
      plugins.security.nodes_dn:
      - "CN=<EXISTING-WAZUH-INDEXER-NODE-NAME>,OU=Wazuh,O=Wazuh,L=California,C=US"
      - "CN=<NEW-WAZUH-INDEXER-NODE-NAME>,OU=Wazuh,O=Wazuh,L=California,C=US"

#. Edit the filebeat configuration file ``/etc/filebeat/filebeat.yml`` (In case you are running a distributed deployment, the file is located in the Wazuh server) to add the new Wazuh indexer node(s). Uncomment or add more lines, according to your ``/root/config.yml`` definitions.

   .. code-block:: yaml
      :emphasize-lines: 3

      output.elasticsearch.hosts:
              - <EXISTING_WAZUH_INDEXER_IP>:9200
              - <NEW_WAZUH_INDEXER_IP>:9200
      output.elasticsearch:
        protocol: https
        username: ${username}
        password: ${password}

#. Edit the Wazuh dashboard configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to include the new Wazuh indexer node(s).

   .. code-block:: yaml

      opensearch.hosts: ["https://<EXISTING_WAZUH_INDEXER_IP>:9200", "https://<NEW_WAZUH_INDEXER_IP>:9200"]

#. Restart the Wazuh services to apply the changes.

   .. tabs::

      .. group-tab:: SystemD

         .. code-block:: console

            # systemctl restart wazuh-indexer
            # systemctl restart filebeat
            # systemctl restart wazuh-manager
            # systemctl restart wazuh-dashboard

      .. group-tab:: SysV init

         .. code-block:: console

            # service wazuh-indexer restart 
            # service filebeat restart 
            # service wazuh-manager restart 
            # service wazuh-dashboard restart

Distributed deployment
^^^^^^^^^^^^^^^^^^^^^^

#. Edit the indexer configuration file at ``/etc/wazuh-indexer/opensearch.yml`` to include the new node(s) as follows. Uncomment or add more lines, according to your ``/root/config.yml`` definitions. Create the ``discovery.seed_hosts`` section if it doesn’t exist.

   .. code-block:: yaml
      :emphasize-lines: 5, 9, 12

      network.host: "<EXISTING_WAZUH_INDEXER_IP>"
      node.name: "<EXISTING_WAZUH_INDEXER_NODE_NAME>"
      cluster.initial_master_nodes:
      - "<EXISTING_WAZUH_INDEXER_NODE_NAME>"
      - "<NEW-WAZUH-INDEXER-NODE-NAME>"
      cluster.name: "wazuh-cluster"
      discovery.seed_hosts:
        - "<EXISTING_WAZUH_INDEXER_IP>"
        - "<NEW_WAZUH_INDEXER_IP>"
      plugins.security.nodes_dn:
      - "CN=indexer,OU=Wazuh,O=Wazuh,L=California,C=US"
      - "CN=<WAZUH-INDEXER2-NODE-NAME>,OU=Wazuh,O=Wazuh,L=California,C=US"

#. Edit the filebeat configuration file ``/etc/filebeat/filebeat.yml`` (the file is located in the Wazuh server) to add the new Wazuh indexer node(s). Uncomment or add more lines, according to your ``/root/config.yml`` definitions.

   .. code-block:: yaml
      :emphasize-lines: 3

      output.elasticsearch.hosts:
              - <EXISTING_WAZUH_INDEXER_IP>:9200
              - <NEW_WAZUH_INDEXER_IP>:9200
      output.elasticsearch:
        protocol: https
        username: ${username}
        password: ${password}

#. Edit the Wazuh dashboard configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to include the new Wazuh indexer node(s).

   .. code-block:: yaml

      opensearch.hosts: ["https://<EXISTING_WAZUH_INDEXER_IP>:9200", "https://<NEW_WAZUH_INDEXER_IP>:9200"]

   .. note::

      You’ll have to re-deploy certificates on your existing Wazuh node(s) if they were recreated as recommended in the :ref:`note <creating_new_certificates>` above.

      Run the following commands on each of your nodes to deploy the certificates.

      -  On Wazuh indexer node(s).

         .. code-block:: console

            # NODE_NAME=<EXISTING_WAZUH_INDEXER_NODE_NAME>

            # rm -rf /etc/wazuh-indexer/certs
            # mkdir /etc/wazuh-indexer/certs
            # tar -xf ./wazuh-certificates.tar -C /etc/wazuh-indexer/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./admin.pem ./admin-key.pem ./root-ca.pem
            # mv -n /etc/wazuh-indexer/certs/$NODE_NAME.pem /etc/wazuh-indexer/certs/indexer.pem
            # mv -n /etc/wazuh-indexer/certs/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/indexer-key.pem
            # chmod 500 /etc/wazuh-indexer/certs
            # chmod 400 /etc/wazuh-indexer/certs/*
            # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs

      -  On Wazuh server node(s).

         .. code-block:: console

            # NODE_NAME=<WAZUH_SERVER_NODE_NAME>

            # rm -rf /etc/filebeat/certs
            # mkdir /etc/filebeat/certs
            # tar -xf ./wazuh-certificates.tar -C /etc/filebeat/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
            # mv -n /etc/filebeat/certs/$NODE_NAME.pem /etc/filebeat/certs/wazuh-server.pem
            # mv -n /etc/filebeat/certs/$NODE_NAME-key.pem /etc/filebeat/certs/wazuh-server-key.pem
            # chmod 500 /etc/filebeat/certs
            # chmod 400 /etc/filebeat/certs/*
            # chown -R root:root /etc/filebeat/certs

      -  On Wazuh dashboard node:

         .. code-block:: console

            # NODE_NAME=<WAZUH_DASHBOARD_NODE_NAME>

            # rm -rf /etc/wazuh-dashboard/certs
            # mkdir /etc/wazuh-dashboard/certs
            # tar -xf ./wazuh-certificates.tar -C /etc/wazuh-dashboard/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
            # mv -n /etc/wazuh-dashboard/certs/$NODE_NAME.pem /etc/wazuh-dashboard/certs/wazuh-dashboard.pem
            # mv -n /etc/wazuh-dashboard/certs/$NODE_NAME-key.pem /etc/wazuh-dashboard/certs/wazuh-dashboard-key.pem
            # chmod 500 /etc/wazuh-dashboard/certs
            # chmod 400 /etc/wazuh-dashboard/certs/*
            # chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs

#. Run the following commands on your respective nodes to apply the changes.

   -  Wazuh indexer node

      .. tabs::

         .. group-tab:: SystemD

            .. code-block:: console

               # systemctl restart wazuh-indexer

         .. group-tab:: SysV init

            .. code-block:: console

               # service wazuh-indexer restart

   -  Wazuh server node

      .. tabs::

         .. group-tab:: SystemD

            .. code-block:: console

               # systemctl restart filebeat
               # systemctl restart wazuh-manager

         .. group-tab:: SysV init

            .. code-block:: console

               # service filebeat restart 
               # service wazuh-manager restart

   -  Wazuh dashboard node

      .. tabs::

         .. group-tab:: SystemD

            .. code-block:: console

               # systemctl restart wazuh-dashboard

         .. group-tab:: SysV init

            .. code-block:: console

               # service wazuh-dashboard restart

Wazuh indexer node(s) installation
----------------------------------