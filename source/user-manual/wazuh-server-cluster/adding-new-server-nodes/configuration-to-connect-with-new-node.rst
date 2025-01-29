.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure existing components to connect with a new Wazuh server node in a Wazuh server cluster.

Configuring existing components to connect with the new node
============================================================

All-in-one deployment
---------------------

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

   .. code-block:: console

      # bash /root/deploy-certificates.sh

   This deploys the SSL certificates to encrypt communications between the Wazuh central components.

   **Recommended action**: Save a copy offline for potential future use and scalability. You can  remove the ``wazuh-certificates.tar`` file on this node by running the command below to increase security:

   .. code-block:: console

      # rm -rf ./wazuh-certificates
      # rm -f ./wazuh-certificates.tar

#. Edit the Wazuh indexer configuration file at ``/etc/wazuh-indexer/opensearch.yml`` to specify the indexer’s IP address and ``NODE_NAME`` as mentioned in ``/root/config.yml`` file:

   .. code-block:: yaml
      :emphasize-lines: 1,2,4

      network.host: "<WAZUH_INDEXER_IP_ADDRESS>"
      node.name: "<WAZUH_INDEXER_NODE_NAME>"
      cluster.initial_master_nodes:
      - "<WAZUH_INDEXER_NODE_NAME>"

#. Edit the Filebeat configuration file ``/etc/filebeat/filebeat.yml`` to specify the indexer’s IP address:

   .. code-block:: yaml

      output.elasticsearchhosts:
              - <WAZUH_INDEXER_IP_ADDRESS>:9200

   .. note::

      The structure of this section varies based on whether you completed your installation using the Wazuh installation assistant or the step-by-step guide. Here we used the quickstart script.

#. Generate a random encryption key that will be used to encrypt communication between the cluster nodes:

   .. _generate_random_encryption_key:

   .. code-block:: console

      # openssl rand -hex 16

   Save the output of the above command as it will be used later to configure both Wazuh server nodes.

#. Edit the configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to include connection details for the indexer node:

   .. code-block:: yaml

      opensearch.hosts: https://<WAZUH_INDEXER_IP_ADDRESS>:9200

#. Edit the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` file and replace the ``url`` value with the IP address or hostname of the Wazuh server master node:

   .. code-block:: yaml
      :emphasize-lines: 3,6

      hosts:
        - default:
            url: https://<EXISTING_WAZUH_SERVER_IP_ADDRESS>
            port: 55000
            username: wazuh-wui
            password: <WAZUH_WUI_PASSWORD>
            run_as: false

#. Edit the Wazuh server configuration file at ``/var/ossec/etc/ossec.conf`` to enable the Wazuh server cluster:

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

   The configurable fields in the above section of the ``/var/ossec/etc/ossec.conf`` file are as follows:

   -  :ref:`name <cluster_name>` indicates the name of the cluster.
   -  :ref:`node_name <cluster_node_name>` indicates the name of the current node. Replace ``<EXISTING_WAZUH_SERVER_NODE_NAME>`` with name as specified in the ``/root/config.yml`` file.
   -  :ref:`node_type <cluster_node_type>` specifies the role of the node. It has to be set to master.
   -  :ref:`key <cluster_key>` represents a :ref:`key <generate_random_encryption_key>` used to encrypt communication between cluster nodes. It should be the same on all the server nodes. To generate a unique key you can use the command ``openssl rand -hex 16``.
   -  :ref:`port <cluster_port>` indicates the destination port for cluster communication. Leave the default as ``1516``.
   -  :ref:`bind_addr <cluster_bind_addr>` is the network IP to which the node is bound to listen for incoming requests (0.0.0.0 means the node will use any IP).
   -  :ref:`nodes <cluster_nodes>` is the address of the master node and can be either an IP or a DNS hostname. This parameter must be specified in all nodes, including the master itself. Replace ``<MASTER_NODE_IP_ADDRESS>`` with the IP address of your master node.
   -  :ref:`hidden <cluster_hidden>` shows or hides the cluster information in the generated alerts.
   -  :ref:`disabled <cluster_disabled>` indicates whether the node is enabled or disabled in the cluster. This option must be set to no.

#. Restart the Wazuh central component and Filebeat to apply the changes.

   .. tabs::

      .. group-tab:: SystemD

         .. code-block:: console

            # systemctl restart wazuh-indexer
            # systemctl restart wazuh-manager
            # systemctl restart wazuh-dashboard
            # systemctl restart filebeat

      .. group-tab:: SysV init

         .. code-block:: console

            # service wazuh-indexer restart
            # service wazuh-manager restart
            # service wazuh-dashboard restart
            # service filebeat restart

Distributed deployment
----------------------

#. Deploy the Wazuh server certificates on your existing Wazuh server node by running the following commands. Replace ``<EXISTING_WAZUH_SERVER_NODE_NAME>`` with the node name of the Wazuh server you are configuring as defined in ``/root/config``.yml.

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

      If the certificates were recreated as recommended in the :ref:`note <generating_new_certificates>` above.

      You will also have to re-deploy the certificates on all your existing Wazuh nodes (indexer and dashboard).

   After deploying the new certificate on the server, run the following commands to deploy the certificates to the Wazuh indexer and dashboard:

   -  On the Wazuh indexer node(s):

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

   -  On the Wazuh dashboard node:

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

   **Recommended action**: Save a copy offline for potential future use and scalability. You can  remove the ``wazuh-certificates.tar`` file on this node by running the command below to increase security:

   .. code-block:: console

      # rm -f ./wazuh-certificates.tar

#. Edit the Wazuh indexer configuration file at ``/etc/wazuh-indexer/opensearch.yml`` to specify the indexer’s IP address as specified in the ``/root/config.yml`` file:

   .. code-block:: yaml

      network.host: "<WAZUH_INDEXER_IP_ADDRESS>"
      node.name: "<WAZUH_INDEXER_NODE_NAME>"
      cluster.initial_master_nodes:
      - "<WAZUH_INDEXER_NODE_NAME>"

#. Edit the Filebeat configuration file ``/etc/filebeat/filebeat.yml`` (located in the Wazuh server node) to specify the indexer’s IP address:

   .. code-block:: yaml

      output.elasticsearchhosts:
              - <WAZUH_INDEXER_IP_ADDRESS>:9200

   .. note::

      The structure of this section will vary depending on if you did your installation using the Wazuh installation assistant or the step-by-step guide. Here we used the Wazuh installation assistant.

#. Generate an encryption key that will be used to encrypt communication between the cluster nodes:

   .. _generate_random_encryption_key_cluster:

   .. code-block:: console

      # openssl rand -hex 16

   Save the output of the above command as it will be used later to configure cluster mode on both Wazuh server nodes.

#. Edit the configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to include the indexer node’s IP:

   .. code-block:: yaml

      opensearch.hosts: https://<WAZUH_INDEXER_IP_ADDRESS>:9200

#. Edit the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` file located in the Wazuh dashboard node and replace the ``url`` value with the IP address or hostname of the Wazuh server master node:

   .. code-block:: yaml
      :emphasize-lines: 3,6

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

   The configurable fields in the above section of the ``var/ossec/etc/ossec.conf`` file are as follows:

   -  :ref:`name <cluster_name>` indicates the name of the cluster.
   -  :ref:`node_name <cluster_node_name>` indicates the name of the current node. Replace ``<EXISTING_WAZUH_SERVER_NODE_NAME>`` with name as specified in the ``/root/config.yml`` file.
   -  :ref:`node_type <cluster_node_type>` specifies the role of the node. It has to be set to master.
   -  :ref:`key <cluster_key>` represents a :ref:`key <generate_random_encryption_key_cluster>` used to encrypt communication between cluster nodes. It should be the same on all the server nodes. To generate a unique key you can use the command ``openssl rand -hex 16``.
   -  :ref:`port <cluster_port>` indicates the destination port for cluster communication. Leave the default as ``1516``.
   -  :ref:`bind_addr <cluster_bind_addr>` is the network IP to which the node is bound to listen for incoming requests (0.0.0.0 means the node will use any IP).
   -  :ref:`nodes <cluster_nodes>` is the address of the master node and can be either an IP or a DNS hostname. This parameter must be specified in all nodes, including the master itself. Replace ``<MASTER_NODE_IP_ADDRESS>`` with the IP address of your master node.
   -  :ref:`hidden <cluster_hidden>` shows or hides the cluster information in the generated alerts.
   -  :ref:`disabled <cluster_disabled>` indicates whether the node is enabled or disabled in the cluster. This option must be set to ``no``.

#. Run the following commands on your respective nodes to apply the changes

   -  **Wazuh indexer node**

      .. tabs::

         .. group-tab:: SystemD

            .. code-block:: console

               # systemctl restart wazuh-indexer

         .. group-tab:: SysV init

            .. code-block:: console

               # service wazuh-indexer restart

   -  **Wazuh server node(s)**

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
