.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find instructions on how to upscale your Wazuh server cluster in this section of the documentation.

Adding a Wazuh server node
==========================

The Wazuh server collects and analyzes security-related events, performs log analysis, and provides real-time threat detection, incident response, and compliance management capabilities.

By adding a new node to a Wazuh server cluster, you can distribute the workload and improve the scalability and resilience of your security monitoring infrastructure. It allows for better handling of a larger number of agents and provides redundancy in case of node failures.

The upscale process involves creating certificates necessary for installation, followed by configuring existing components to establish connections with the new Wazuh server node(s). Then installing and configuring the new Wazuh server node(s), and finally testing the cluster to ensure the new nodes have joined.

We have organized the steps for upscaling the Wazuh server into two subsections: one for an all-in-one deployment and the other for a distributed deployment. Your choice between these methods depends on your existing deployment and the infrastructure you aim to upscale.

-  **All-in-one deployment**:

   If you have Wazuh all-in-one configuration, follow the steps outlined in the "All-in-one deployment" subsections to upscale your Wazuh server.

-  **Distributed deployment**:

   For an existing distributed deployment, refer to the "Distributed deployment" subsections to upscale your Wazuh server.

Ensure you select the appropriate sub-section based on your existing deployment. If you are unsure which method aligns with your infrastructure, consider reviewing your deployment architecture before proceeding.

.. note::
   
   You need root user privileges to execute the commands below.

Certificates creation
---------------------

Perform the following steps on your existing Wazuh server node to generate the certificates required for secure communication among the Wazuh central components.

All-in-one deployment
^^^^^^^^^^^^^^^^^^^^^

We recommend creating entirely new certificates for your Wazuh server nodes. Perform the following steps to create new certificates.

#. Create a ``config.yml`` file in the ``/root`` directory to add the new Wazuh server node(s):

   .. code-block:: console

      # touch /root/config.yml

   Edit the ``/root/config.yml`` file with it’s content as follows:

   .. code-block:: yaml

      nodes:
        # Wazuh indexer nodes
        indexer:
          - name: <WAZUH_INDEXER_NODE_NAME>
            ip: <WAZUH_INDEXER_IP>

        # Wazuh server nodes
        server:
          - name: <EXISTING_WAZUH_SERVER_NODE_NAME>
            ip: <EXISTING_WAZUH_SERVER_IP_ADDRESS>
            node_type: master
          - name: <NEW_WAZUH_SERVER_NODE_NAME>
            ip: <NEW_WAZUH_SERVER_IP>
            node_type: worker

        # Wazuh dashboard nodes
        dashboard:
          - name: <WAZUH_DASHBOARD_NODE_NAME>
            ip: <WAZUH_DASHBOARD_IP>

   Replace the node names and IP values with your new node names and IP addresses.

   You can assign a different ``node_type`` in your installation. In this documentation, we assign the master role to the existing node and the worker role to the new node.

#. Download and run ``Wazuh-certs-tool.sh`` to create the certificates for the new node and recreate for the existing one:

   .. code-block:: console

      # curl -sO https://packages.wazuh.com/4.7/wazuh-certs-tool.sh
      # bash wazuh-certs-tool.sh -A

#. Compress the certificates folder and copy it to the new Wazuh server node(s). You can make use of the ``scp`` utility to securely copy the compressed file:

   .. code-block:: console

      # tar -cvf ./wazuh-certificates.tar -C ./wazuh-certificates/ .
      # scp wazuh-certificates.tar <TARGET_USERNAME>@<TARGET_IP>:

   This will copy the certificates to the home directory of the logged in user on the target system. You can change this to specify a path to your installation directory.

Distributed deployment
^^^^^^^^^^^^^^^^^^^^^^

We recommend you utilize pre-existing root-ca keys to generate certificates for new nodes. Perform the steps below on your existing Wazuh server node to generate the certificates.

#. Create a ``config.yml`` file in the ``/root`` directory to add the new Wazuh server node(s):

   .. code-block:: console

      # touch /root/config.yml

   Edit the ``/root/config.yml`` file to include the node name and IP of the new node:

   .. code-block:: yaml

      nodes:
        # Wazuh server nodes
        server:
          - name: <EXISTING_WAZUH_SERVER_NODE_NAME>
            ip: <EXISTING_WAZUH_SERVER_IP_ADDRESS>
            node_type: master
          - name: <NEW_WAZUH_SERVER_NODE_NAME>
            ip: <NEW_WAZUH_SERVER_IP>
            node_type: worker

   Replace the values with your node names and their corresponding IP addresses.

#. Extract the ``wazuh-certificates.tar`` file.

   .. code-block:: console

      # mkdir wazuh-install-files && tar -xf ./wazuh-certificates.tar -C wazuh-install-files

#. Download and run ``./wazuh-certs-tool.sh`` to create the certificates for the new Wazuh server node using the pre-existing root-ca keys:

   .. code-block:: console

      # curl -sO https://packages.wazuh.com/4.7/wazuh-certs-tool.sh
      # bash wazuh-certs-tool.sh -A wazuh-install-files/root-ca.pem wazuh-install-files/root-ca.key

#. Copy the newly created certificates to the ``wazuh-install-files`` folder making sure not to replace the admin certificates:

   .. code-block:: console

      # cp wazuh-certificates/<NEW_WAZUH_SERVER_NODE_NAME>* wazuh-install-files
      # cp wazuh-certificates/<EXISTING_WAZUH_SERVER_NODE_NAME>* wazuh-install-files


   .. note:: 

     .. _recreate_certificates:

      If the pre-existing root-ca keys have been deleted or if for some reason you are not able to access them, you can proceed to create new certificates for all the nodes as follows:

      -  Create the ``/root/config.yml`` file to reference all your nodes

         .. code-block:: yaml

            nodes:
              # Wazuh indexer nodes
              indexer:
                - name: <WAZUH_INDEXER_NODE_NAME>
                  ip: <WAZUH_INDEXER_IP>

              # Wazuh server nodes
              server:
                - name: <EXISTING_WAZUH_SERVER_NODE_NAME>
                  ip: <EXISTING_WAZUH_SERVER_IP_ADDRESS>
                  node_type: master
                - name: <NEW_WAZUH_SERVER_NODE_NAME>
                  ip: <NEW_WAZUH_SERVER_IP>
                  node_type: worker

              # Wazuh dashboard nodes
              dashboard:
                - name: <WAZUH_DASHBOARD_NODE_NAME>
                  ip: <WAZUH_DASHBOARD_IP>

      -  Execute the ``wazuh-certs-tool.sh`` script to create the certificates.

         .. code-block:: console

            # curl -sO https://packages.wazuh.com/4.7/wazuh-certs-tool.sh
            # bash wazuh-certs-tool.sh -A

      -  Compress the certificates folder and copy it to the new Wazuh indexer node(s). You can make use of the ``scp`` utility to securely copy the compressed file:

         .. code-block:: console

            # tar -cvf ./wazuh-certificates.tar -C ./wazuh-certificates/ .
            # scp wazuh-certificates.tar <TARGET_USERNAME>@<TARGET_IP>:

         This will copy the certificates to the home directory of the logged in user on the target system. You can change this to specify a path to your installation directory.

#. Compress the certificates folder into a new ``wazuh-certificates.tar`` file and copy it to the new Wazuh server node(s). You can make use of the ``scp`` utility to securely copy the compressed file:

   .. code-block:: console

      # tar -cvf ./wazuh-certificates.tar -C ./wazuh-install-files/ .
      # scp wazuh-certificates.tar <TARGET_USERNAME>@<TARGET_IP>:

   This will copy the certificates to the home directory of the logged in user on the target system. You can change this to specify a path to your installation directory.

Configuring existing components to connect with the new node
------------------------------------------------------------

All-in-one deployment
^^^^^^^^^^^^^^^^^^^^^

#. Create a file, ``env_variables.sh``, in the ``/root`` directory of the existing node where you define your environmental variables as follows:

   .. code-block:: bash

      export NODE_NAME1=<WAZUH_INDEXER_NODE_NAME>
      export NODE_NAME2=<EXISTING_WAZUH_SERVER_NODE_NAME>
      export NODE_NAME3=<WAZUH_DASHBOARD_NODE_NAME> 

   Replace ``<WAZUH_INDEXER_NODE_NAME>``, ``<EXISTING_WAZUH_SERVER_NODE_NAME>``, ``<WAZUH_DASHBOARD_NODE_NAME>`` with the names of the Wazuh indexer, Wazuh server and Wazuh dashboard nodes respectively as defined in ``/root/config.yml``. 

#. Create a ``deploy-certificates.sh`` script in the ``/root`` directory and paste the following to it:

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

#. Deploy the certificates by executing the following command:

   .. code-block::  console

      # bash /root/deploy-certificates.sh

   This deploys the SSL certificates to encrypt communications between the Wazuh central components. 

   **Recommended action**: If no other Wazuh components are going to be installed on this node, remove the ``wazuh-certificates.tar`` file by running the command below to increase security. Alternatively, save a copy offline for potential future use and scalability:

   .. code-block:: console

      # rm -rf ./wazuh-certificates
      # rm -f ./wazuh-certificates.tar

#. Edit the Wazuh indexer configuration file at ``/etc/wazuh-indexer/opensearch.yml`` to specify the indexer’s IP address as mentioned in ``/root/config.yml`` file:

   .. code-block:: yaml
      :emphasize-lines: 1,2,4

      network.host: "<WAZUH_INDEXER_IP>"
      node.name: "<WAZUH_INDEXER_NODE_NAME>"
      cluster.initial_master_nodes:
      - "<WAZUH_INDEXER_NODE_NAME>"

#. Edit the Filebeat configuration file ``/etc/filebeat/filebeat.yml`` to specify the indexer’s IP address:

   .. code-block:: yaml

      output.elasticsearchhosts:
              - <WAZUH_INDEXER_IP>:9200

   .. note::
      
      The structure of this section will vary based on whether you completed your installation using the Quickstart script or the step-by-step guide. Here we used the quickstart script.

#. Generate an encryption key that will be used to encrypt communication between the cluster nodes:

   .. _generate_encryption_key:

   .. code-block:: console

      # openssl rand -hex 16

   Save the output of the above command as it will be used later to configure cluster mode on both Wazuh server nodes.

#. Edit the configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to include connection details for the indexer node:

   .. code-block:: yaml

      opensearch.hosts: https://<WAZUH_INDEXER_IP>:9200

#. Edit the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` file and replace the ``url`` value with the IP address or hostname of the Wazuh server master node:

   .. code-block:: yaml
      :emphasize-lines: 3

      hosts:
        - default:
            url: https://<EXISTING_WAZUH_SERVER_IP_ADDRESS>
            port: 55000
            username: wazuh-wui
            password: <WAZUH_WUI_PASSWORD>
            run_as: false

#. Edit the Wazuh server configuration file at ``/var/ossec/etc/ossec.conf`` to enable cluster mode:

   .. code-block:: xml
      :emphasize-lines: 3-5,9,12
      
        <cluster>
          <name>wazuh</name>
          <node_name><EXISTING_WAZUH_SERVER_NODE_NAME></node_name>
          <node_type>master</node_type>
          <key><ENCRYPTION_KEY></key>
          <port>1516</port>
          <bind_addr>0.0.0.0</bind_addr>
          <nodes>
              <node><MASTER_NODE_IP_ADDRESS></node>
          </nodes>
          <hidden>no</hidden>
          <disabled>no</disabled>
        </cluster>

   The configurable fields in the above section of the ``ossec.conf`` file are as follows:

   -  :ref:`name <cluster_name>` indicates the name of the cluster.
   -  :ref:`node_name <cluster_node_name>` indicates the name of the current node. Replace ``<EXISTING_WAZUH_SERVER_NODE_NAME>`` with name as specified in the ``/root/config.yml`` file.
   -  :ref:`node_type <cluster_node_type>` specifies the role of the node. It has to be set to ``master``.
   -  :ref:`key <cluster_key>` represents a :ref:`key <generate_encryption_key>` used to encrypt communication between cluster nodes. It should be the same on all the server nodes. To generate a unique key you can use the command ``openssl rand -hex 16``.
   -  :ref:`port <cluster_port>` indicates the destination port for cluster communication. Leave the default as ``1516``.
   -  :ref:`bind_addr <cluster_bind_addr>` is the network IP to which the node is bound to listen for incoming requests (0.0.0.0 means the node will use any IP).
   -  :ref:`nodes <cluster_nodes>` is the address of the master node and can be either an IP or a DNS hostname. This parameter must be specified in all nodes, including the master itself. Replace ``<MASTER_NODE_IP_ADDRESS>`` with the IP address of your master node.
   -  :ref:`hidden <cluster_hidden>` shows or hides the cluster information in the generated alerts.
   -  :ref:`disabled <cluster_disabled>` indicates whether the node is enabled or disabled in the cluster. This option must be set to ``no``.

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

#. Deploy the Wazuh server certificates on your existing nodes by running the following commands replacing ``<EXISTING_WAZUH_SERVER_NODE_NAME>`` with the name of the Wazuh server node you are configuring as defined in ``/root/config.yml``.

   .. code-block:: console

      # NODE_NAME=<EXISTING_WAZUH_SERVER_NODE_NAME>

   .. code-block:: console

      # rm -rf /etc/filebeat/certs
      # mkdir /etc/filebeat/certs
      # tar -xf ./wazuh-certificates.tar -C /etc/filebeat/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
      # mv -n /etc/filebeat/certs/$NODE_NAME.pem /etc/filebeat/certs/filebeat.pem
      # mv -n /etc/filebeat/certs/$NODE_NAME-key.pem /etc/filebeat/certs/filebeat-key.pem
      # chmod 500 /etc/filebeat/certs
      # chmod 400 /etc/filebeat/certs/*
      # chown -R root:root /etc/filebeat/certs

   .. note::

      You’ll also have to re-deploy certificates on all your existing Wazuh node(s) if they were recreated as recommended in the :ref:`note <recreate_certificates>` above.

      Run the following commands on each of your nodes to deploy the certificates:

      -  On Wazuh indexer node(s):

         .. code-block:: console

            # NODE_NAME=<WAZUH_INDEXER_NODE_NAME>

         .. code-block:: console

            # rm -rf /etc/wazuh-indexer/certs
            # mkdir /etc/wazuh-indexer/certs
            # tar -xf ./wazuh-certificates.tar -C /etc/wazuh-indexer/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./admin.pem ./admin-key.pem ./root-ca.pem
            # mv -n /etc/wazuh-indexer/certs/$NODE_NAME.pem /etc/wazuh-indexer/certs/indexer.pem
            # mv -n /etc/wazuh-indexer/certs/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/indexer-key.pem
            # chmod 500 /etc/wazuh-indexer/certs
            # chmod 400 /etc/wazuh-indexer/certs/*
            # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs

      -  On Wazuh dashboard node:
      
         .. code-block:: console

            # NODE_NAME=<WAZUH_DASHBOARD_NODE_NAME>

         .. code-block:: console

            # rm -rf /etc/wazuh-dashboard/certs
            # mkdir /etc/wazuh-dashboard/certs
            # tar -xf ./wazuh-certificates.tar -C /etc/wazuh-dashboard/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
            # mv -n /etc/wazuh-dashboard/certs/$NODE_NAME.pem /etc/wazuh-dashboard/certs/wazuh-dashboard.pem
            # mv -n /etc/wazuh-dashboard/certs/$NODE_NAME-key.pem /etc/wazuh-dashboard/certs/wazuh-dashboard-key.pem
            # chmod 500 /etc/wazuh-dashboard/certs
            # chmod 400 /etc/wazuh-dashboard/certs/*
            # chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs

   **Recommended action**: If no other Wazuh components are going to be installed on this node, remove the ``wazuh-certificates.tar`` file by running the command below to increase security. Alternatively, save a copy offline for potential future use and scalability:

   .. code-block:: console

      # rm -f ./wazuh-certificates.tar

#. Edit the Wazuh indexer configuration file at ``/etc/wazuh-indexer/opensearch.yml`` to specify the indexer’s IP address as specified in the ``/root/config.yml`` file:

   .. code-block:: yaml
      :emphasize-lines: 1,2,4

      network.host: "<WAZUH_INDEXER_IP>"
      node.name: "<WAZUH_INDEXER_NODE_NAME>"
      cluster.initial_master_nodes:
      - "<WAZUH_INDEXER_NODE_NAME>"

#. Edit the Filebeat configuration file ``/etc/filebeat/filebeat.yml`` (located in the Wazuh server node) to specify the indexer’s IP address:

   .. code-block:: yaml

      output.elasticsearchhosts:
              - <WAZUH_INDEXER_IP>:9200

   .. note::
      
      The structure of this section will vary depending on if you did your installation using the Quickstart script or the step-by-step guide. Here we used the quickstart script.

#. Generate an encryption key that will be used to encrypt communication between the cluster nodes:

   .. _distributed_generate_encryption_key:

   .. code-block:: console

      # openssl rand -hex 16

   Save the output of the above command as it will be used later to configure cluster mode on both Wazuh server nodes.

#. Edit the configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to include the indexer node’s IP:

   .. code-block:: yaml

      opensearch.hosts: https://<WAZUH_INDEXER_IP>:9200

#. Edit the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` file located in the Wazuh dashboard node and replace the url value with the IP address or hostname of the Wazuh server master node:

   .. code-block:: yaml
      :emphasize-lines: 3

      hosts:
        - default:
            url: https://<EXISTING_WAZUH_SERVER_IP_ADDRESS>
            port: 55000
            username: wazuh-wui
            password: <WAZUH_WUI_PASSWORD>
            run_as: false

#. Edit the Wazuh server configuration file at ``/var/ossec/etc/ossec.conf`` to enable cluster mode:

   .. code-block:: xml
      :emphasize-lines: 3-5, 9, 12

        <cluster>
          <name>wazuh</name>
          <node_name><EXISTING_WAZUH_SERVER_NODE_NAME></node_name>
          <node_type>master</node_type>
          <key><ENCRYPTION_KEY></key>
          <port>1516</port>
          <bind_addr>0.0.0.0</bind_addr>
          <nodes>
              <node><MASTER_NODE_IP_ADDRESS></node>
          </nodes>
          <hidden>no</hidden>
          <disabled>no</disabled>
        </cluster>

   The configurable fields in the above section of the ``ossec.conf`` file are as follows:

   -  :ref:`name <cluster_name>` indicates the name of the cluster.
   -  :ref:`node_name <cluster_node_name>` indicates the name of the current node. Replace ``<EXISTING_WAZUH_SERVER_NODE_NAME>`` with name as specified in the ``/root/config.yml`` file.
   -  :ref:`node_type <cluster_node_type>` specifies the role of the node. It has to be set to ``master``.
   -  :ref:`key <cluster_key>` represents a :ref:`key <distributed_generate_encryption_key>` used to encrypt communication between cluster nodes. It should be the same on all the server nodes. To generate a unique key you can use the command ``openssl rand -hex 16``.
   -  :ref:`port <cluster_port>` indicates the destination port for cluster communication. Leave the default as ``1516``.
   -  :ref:`bind_addr <cluster_bind_addr>` is the network IP to which the node is bound to listen for incoming requests (0.0.0.0 means the node will use any IP).
   -  :ref:`nodes <cluster_nodes>` is the address of the master node and can be either an IP or a DNS hostname. This parameter must be specified in all nodes, including the master itself. Replace ``<MASTER_NODE_IP_ADDRESS>`` with the IP address of your master node.
   -  :ref:`hidden <cluster_hidden>` shows or hides the cluster information in the generated alerts.
   -  :ref:`disabled <cluster_disabled>` indicates whether the node is enabled or disabled in the cluster. This option must be set to ``no``.

#. Run the following commands on your respective nodes to apply the changes.

   -  **Wazuh indexer node**

      .. tabs::

         .. group-tab:: SystemD

            .. code-block:: console

               # systemctl restart wazuh-indexer
   
         .. group-tab:: SysV init

            .. code-block:: console

               # service wazuh-indexer restart 

   -  **Wazuh server node**

      .. tabs::

         .. group-tab:: SystemD

            .. code-block:: console

               # systemctl restart filebeat
               # systemctl restart wazuh-manager
   
         .. group-tab:: SysV init

            .. code-block:: console

               # service filebeat restart 
               # service wazuh-manager restart

   -  **Wazuh dashboard node**

      .. tabs::

         .. group-tab:: SystemD

            .. code-block:: console

               # systemctl restart wazuh-dashboard
   
         .. group-tab:: SysV init

            .. code-block:: console

               # service wazuh-dashboard restart

Wazuh server node(s) installation
---------------------------------

Once the certificates have been created and copied to the new node(s), you can now proceed with installing and configuring the Wazuh server node.

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tabs::

   .. group-tab:: Yum

      .. include:: /_templates/installations/common/yum/add-repository.rst

   .. group-tab:: APT

      .. include:: /_templates/installations/common/deb/add-repository.rst


Installing the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Install the Wazuh manager package.

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum -y install wazuh-manager|WAZUH_MANAGER_RPM_PKG_INSTALL|

      .. group-tab:: APT

         .. code-block:: console

            # apt-get -y install wazuh-manager|WAZUH_MANAGER_DEB_PKG_INSTALL|

#. Enable and start the Wazuh manager service.

   .. include:: /_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#. Check the Wazuh manager status to ensure it is up and running.

   .. include:: /_templates/installations/wazuh/common/check_wazuh_manager.rst

Install and configure Filebeat
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Install the Filebeat package.

   .. tabs::

      .. group-tab:: Yum

         .. include:: /_templates/installations/filebeat/common/yum/install_filebeat.rst

      .. group-tab:: APT

         .. include:: /_templates/installations/filebeat/common/apt/install_filebeat.rst

#. Download the preconfigured Filebeat configuration file:

   .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/tpl/wazuh/filebeat/filebeat.yml

#. Edit the ``/etc/filebeat/filebeat.yml`` configuration file and replace the following value:

   -  ``hosts`` which represents the list of Wazuh indexer nodes to connect to. You can use either IP addresses or hostnames. By default, the host is set to localhost ``hosts: ["127.0.0.1:9200"]``. Replace it with your Wazuh indexer IP address accordingly.

      If you have more than one Wazuh indexer node, you can separate the addresses using commas. For example, ``hosts: ["10.0.0.1:9200", "10.0.0.2:9200", "10.0.0.3:9200"]``:

      .. code-block:: yaml
         :emphasize-lines: 3

         # Wazuh - Filebeat configuration file
         output.elasticsearch:
           hosts: <WAZUH_INDEXER_IP>:9200
           protocol: https

#. Create a Filebeat keystore to securely store authentication credentials:

   .. code-block:: console

      # filebeat keystore create

#. Add the admin user and password to the secrets keystore:

   .. code-block:: console

      # echo admin | filebeat keystore add username --stdin --force
      # echo <ADMIN_PASSWORD> | filebeat keystore add password --stdin --force

   In case you are running an all-in-one deployment and using the default admin password, you could get it by running the following command:

   .. code-block:: console

      # sudo tar -O -xvf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt

#. Download the alerts template for the Wazuh indexer:

   .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/4.7/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Install the Wazuh module for Filebeat:

   .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.2.tar.gz | tar -xvz -C /usr/share/filebeat/module

Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^

#. Run the following commands in the directory where the ``wazuh-certificates.tar`` file was copied to, replacing ``<NEW_WAZUH_SERVER_NODE_NAME>`` with the name of the Wazuh server node you are configuring as defined in ``/root/config.yml``. This deploys the SSL certificates to encrypt communications between the Wazuh central components:

   -  Create an environment variable to store the node name

      .. code-block:: yaml

         NODE_NAME=<NEW_WAZUH_SERVER_NODE_NAME>

   -  Deploy the certificates

      .. code-block:: console

         # mkdir /etc/filebeat/certs
         # tar -xf ./wazuh-certificates.tar -C /etc/filebeat/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
         # mv -n /etc/filebeat/certs/$NODE_NAME.pem /etc/filebeat/certs/filebeat.pem
         # mv -n /etc/filebeat/certs/$NODE_NAME-key.pem /etc/filebeat/certs/filebeat-key.pem
         # chmod 500 /etc/filebeat/certs
         # chmod 400 /etc/filebeat/certs/*
         #chown -R root:root /etc/filebeat/certs

Starting the service
^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/installations/filebeat/common/enable_filebeat.rst

Run the following command to verify that Filebeat is successfully installed:

.. code-block:: console

   # filebeat test output

An example output is shown below:

.. code-block:: console
   :class: output

   elasticsearch: https://10.0.0.1:9200...
     parse url... OK
     connection...
       parse host... OK
       dns lookup... OK
       addresses: 10.0.0.1
       dial up... OK
     TLS...
       security: server's certificate chain verification is enabled
       handshake... OK
       TLS version: TLSv1.3
       dial up... OK
     talk to server... OK
     version: 7.10.2

Configuring the Wazuh server worker nodes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Configure the Wazuh server worker node to enable cluster mode by editing the following settings in the ``/var/ossec/etc/ossec.conf`` file:

   .. code-block:: xml
      :emphasize-lines: 3-5, 9, 12

      <cluster>
          <name>wazuh</name>
          <node_name><NEW_WAZUH_SERVER_NODE_NAME></node_name>
          <node_type>worker</node_type>
          <key><ENCRYPTION_KEY></key>
          <port>1516</port>
          <bind_addr>0.0.0.0</bind_addr>
          <nodes>
              <node><MASTER_NODE_IP_ADDRESS></node>
          </nodes>
          <hidden>no</hidden>
          <disabled>no</disabled>
      </cluster>

   The configurable fields in the above section of the ``ossec.conf`` file are as follows:

   -  :ref:`name <cluster_name>` indicates the name of the cluster.
   -  :ref:`node_name <cluster_node_name>` indicates the name of the current node. Replace ``<EXISTING_WAZUH_SERVER_NODE_NAME>`` with name as specified in the ``/root/config.yml`` file.
   -  :ref:`node_type <cluster_node_type>` specifies the role of the node. It has to be set to ``master``.
   -  :ref:`key <cluster_key>` represents a :ref:`key <distributed_generate_encryption_key>` used to encrypt communication between cluster nodes. It should be the same on all the server nodes. To generate a unique key you can use the command ``openssl rand -hex 16``.
   -  :ref:`port <cluster_port>` indicates the destination port for cluster communication. Leave the default as ``1516``.
   -  :ref:`bind_addr <cluster_bind_addr>` is the network IP to which the node is bound to listen for incoming requests (0.0.0.0 means the node will use any IP).
   -  :ref:`nodes <cluster_nodes>` is the address of the master node and can be either an IP or a DNS hostname. This parameter must be specified in all nodes, including the master itself. Replace ``<MASTER_NODE_IP_ADDRESS>`` with the IP address of your master node.
   -  :ref:`hidden <cluster_hidden>` shows or hides the cluster information in the generated alerts.
   -  :ref:`disabled <cluster_disabled>` indicates whether the node is enabled or disabled in the cluster. This option must be set to ``no``.

#. Restart the Wazuh manager service.

   .. tabs::

      .. group-tab:: SystemD

         .. code-block:: console

            # systemctl restart wazuh-manager

      .. group-tab:: SysV init

         .. code-block:: console

            # service wazuh-manager restart

Testing the cluster
-------------------

Now that the installation and configuration is completed, you can proceed with testing your cluster to ensure that the new server node has indeed joined. Two possible ways of doing this:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Using the cluster control tool
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Verify that the Wazuh cluster is enabled and all the nodes are connected by executing the following command on any of the Wazuh server nodes:

.. code-block:: console

   # /var/ossec/bin/cluster_control -l

A sample output of the command:

.. code-block:: none
   :class: output

   Output
   NAME             TYPE    VERSION  ADDRESS
   wazuh-server-1   master  4.7.2    10.0.0.1
   wazuh-server-2   worker  4.7.2    10.0.0.2

Note that ``10.0.0.1``, ``10.0.0.2`` are example IP addresses.

Using the Wazuh API console
^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can also check your new Wazuh cluster by using the API console accessible via the Wazuh dashboard.

Access the Wazuh dashboard, using the credentials as below:

-  **URL**: ``https://<WAZUH_DASHBOARD_IP>``
- **Username**: ``admin``
-  **Password**: ``<ADMIN_PASSWORD>`` or ``admin`` in case you already have a distributed architecture and using the default password.

Navigate to Tools and select **API Console**.  On the console, run the query below:

.. code-block:: none

   GET /cluster/healthcheck

.. thumbnail:: /images/manual/upscaling-cluster-healthcheck.gif
   :title: Wazuh server cluster health check API call
   :alt: Wazuh server cluster health check API call
   :align: center
   :width: 80%

This query will display a global status of your Wazuh server cluster with the following information for each node:

-  ``Name`` indicates the name of the server node.
-  ``Type`` indicates the role assigned to a node(Master or Worker).
-  ``Version`` indicates the version of the Wazuh-manager service running on the node.
-  ``IP`` is the IP address of the node.
-  ``n_active_agents`` indicates the number of active agents connected to the node.

Having completed these steps, the Wazuh infrastructure has been successfully scaled up, and the new server nodes have been integrated into the cluster.

If you want to uninstall the Wazuh server, see :ref:`Uninstall the Wazuh server <uninstall_server>` documentation.