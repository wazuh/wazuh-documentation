.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section covers adding Wazuh indexer nodes to increase capacity and resilience.
   
Adding Wazuh indexer nodes
==========================

Adding a new node to the Wazuh indexer cluster can enhance the capacity and resilience of the security monitoring infrastructure.

The upscale process involves creating certificates, configuring existing components to connect with the new Wazuh indexer node(s), and then installing and configuring the new node(s).

We have organized the steps for upscaling the Wazuh indexer into two subsections: one for an all-in-one deployment and the other for a distributed deployment. The choice between these methods depends on your existing deployment and the infrastructure you aim to upscale.

-  **All-in-one deployment**:

   If you have a Wazuh all-in-one deployment, follow the steps outlined in the "All-in-one deployment" subsection to upscale your Wazuh indexer.

-  **Distributed deployment**:

   For an existing distributed deployment, please refer to the "Distributed deployment" subsections to upscale your Wazuh indexer.

If you are unsure which method aligns with your infrastructure, we recommend reviewing your deployment architecture before proceeding.

.. note::

   You need root user privileges to execute the commands below.

Certificates creation
---------------------

Perform the outlined steps on your existing Wazuh indexer node to generate the certificates required for secure communication among the Wazuh central components.

All-in-one deployment
^^^^^^^^^^^^^^^^^^^^^

We recommend creating entirely new certificates for your Wazuh indexer nodes. Perform the following steps to create new certificates.

#. Create a ``config.yml`` file in the ``/root`` directory to add the new Wazuh indexer node(s):

   .. code-block:: console

      # touch /root/config.yml

#. Edit the ``/root/config.yml`` file to include the following content and replace the values with your node names and their corresponding IP addresses:

   .. code-block:: yaml
      :emphasize-lines: 4-7, 11-12, 16-17

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

#. Download and run ``./wazuh-certs-tool.sh`` from your ``/root`` directory to recreate the certificates for the old and new nodes:

   .. code-block:: console

      # curl -sO https://packages.wazuh.com/4.8/wazuh-certs-tool.sh
      # bash wazuh-certs-tool.sh -A

#. Compress the certificates folder and copy it to the new Wazuh indexer node(s). You can make use of the ``scp`` utility to securely copy the compressed file:

   .. code-block:: console

      # tar -cvf ./wazuh-certificates.tar -C ./wazuh-certificates/ .
      # scp wazuh-certificates.tar <TARGET_USERNAME>@<TARGET_IP>:

   This will copy the certificates to the home directory of the logged-in user on the target system. You can change this to specify a path to your installation directory.

Distributed deployment
^^^^^^^^^^^^^^^^^^^^^^

We recommend you utilize pre-existing root CA keys to generate certificates for new nodes.

Perform the steps below on one indexer node only.

#. Create a ``config.yml`` file in the ``/root`` directory to add the new Wazuh indexer node(s):

   .. code-block:: console

      # touch /root/config.yml

#. Edit the ``/root/config.yml`` file to include the node name and IP of the new node. Replace the values with your node names and their corresponding IP addresses:

   .. code-block:: yaml
      :emphasize-lines: 4, 5

      nodes:
        # Wazuh indexer nodes
        indexer:
          - name: <NEW_WAZUH_INDEXER_NODE_NAME>
            ip: <NEW_WAZUH_INDEXER_IP>

#. Extract the ``wazuh-certificates.tar`` file:

   .. code-block:: console

      # mkdir wazuh-install-files && tar -xf ./wazuh-certificates.tar -C wazuh-install-files

#. Download and run ``./wazuh-certs-tool.sh`` to create the certificates for the new indexer node using the pre-existing root CA keys:

   .. code-block:: console

      # curl -sO https://packages.wazuh.com/4.7/wazuh-certs-tool.sh
      # bash wazuh-certs-tool.sh -A wazuh-install-files/root-ca.pem wazuh-install-files/root-ca.key

#. Copy the newly created certificates to the ``wazuh-install-files`` folder making sure not to replace the admin certificates:

   .. code-block:: console

      # cp wazuh-certificates/<NEW_WAZUH_INDEXER_NODE_NAME>* wazuh-install-files

   .. note::

      .. _certificates_note:

      If the pre-existing root CA keys have been deleted or if you are not able to access them, you can proceed with creating new certificates for all the nodes as follows:

      #. Create the ``/root/config.yml`` file to reference all your nodes.

         .. code-block:: yaml
            :emphasize-lines: 4-7, 11-12, 16-17

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

      #. Compress the certificates folder and copy it to the new Wazuh indexer node(s). You can make use of the ``scp`` utility to securely copy the compressed file:

         .. code-block:: console

            # tar -cvf ./wazuh-certificates.tar -C ./wazuh-certificates/ .
            # scp wazuh-certificates.tar <TARGET_USERNAME>@<TARGET_IP>:

         This will copy the certificates to the home directory of the logged in user on the target system. You can change this to specify a path to your installation directory.

#. Compress the certificates folder into a new ``wazuh-certificates.tar`` file and copy it to the new Wazuh indexer node(s). You can make use of the ``scp`` utility to securely copy the compressed file:

   .. code-block:: console

      # tar -cvf ./wazuh-certificates.tar -C ./wazuh-install-files/ .
      # scp wazuh-certificates.tar <TARGET_USERNAME>@<TARGET_IP>:

   This will copy the certificates to the home directory of the logged-in user on the target system. You can change this to specify a path to your installation directory.

Configuring existing components to connect with the new node
------------------------------------------------------------

In this section, we configure the Wazuh components of your existing deployment to connect and communicate with the new Wazuh indexer node.

All-in-one deployment
^^^^^^^^^^^^^^^^^^^^^

#. Create a file, ``env_variables.sh``, in the ``/root`` directory of the existing node where you define your environment variables as follows:

   .. code-block:: bash

      export NODE_NAME1=<EXISTING_WAZUH_INDEXER_NODE_NAME>
      export NODE_NAME2=<WAZUH_SERVER_NODE_NAME>
      export NODE_NAME3=<WAZUH_DASHBOARD_NODE_NAME>

   Replace:

   -  ``<EXISTING_WAZUH_INDEXER_NODE_NAME>``, ``<WAZUH_SERVER_NODE_NAME>``, ``<WAZUH_DASHBOARD_NODE_NAME>`` respectively with the names of the Wazuh indexer, Wazuh server, and Wazuh dashboard nodes as defined in ``/root/config.yml``.

#. Create a ``deploy-certificates.sh`` script in the ``/root`` directory and add the following content:

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

   **Recommended action**: If no other Wazuh components are going to be installed on this node, remove the ``wazuh-certificates.tar`` file by running the command below to increase security. Alternatively, save a copy offline for potential future use and scalability:

   .. code-block:: console

      # rm -rf ./wazuh-certificates
      # rm -f ./wazuh-certificates.tar

#. Edit the indexer configuration file at ``/etc/wazuh-indexer/opensearch.yml`` to include the new node(s) as follows. Uncomment or add more lines, according to your ``/root/config.yml`` definitions. Create the ``discovery.seed_hosts`` section if it doesn’t exist:

   .. code-block:: yaml

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

#. Edit the Filebeat configuration file ``/etc/filebeat/filebeat.yml`` to add the new Wazuh indexer node(s). Uncomment or add more lines, according to your ``/root/config.yml`` definitions:

   .. code-block:: yaml

      output.elasticsearch.hosts:
              - <EXISTING_WAZUH_INDEXER_IP>:9200
              - <NEW_WAZUH_INDEXER_IP>:9200
      output.elasticsearch:
        protocol: https
        username: ${username}
        password: ${password}

#. Edit the Wazuh dashboard configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to include the new Wazuh indexer node(s):

   .. code-block:: yaml

      opensearch.hosts: ["https://<EXISTING_WAZUH_INDEXER_IP>:9200", "https://<NEW_WAZUH_INDEXER_IP>:9200"]

#. Restart the following services to apply the changes:

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

#. Edit the indexer configuration file at ``/etc/wazuh-indexer/opensearch.yml`` to include the new node(s) as follows. Uncomment or add more lines, according to your ``/root/config.yml`` definitions. Create the ``discovery.seed_hosts`` section if it doesn’t exist:

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

#. Edit the Filebeat configuration file ``/etc/filebeat/filebeat.yml`` (the file is located in the Wazuh server) to add the new Wazuh indexer node(s). Uncomment or add more lines, according to your ``/root/config.yml`` definitions:

   .. code-block:: yaml
      :emphasize-lines: 3

      output.elasticsearch.hosts:
              - <EXISTING_WAZUH_INDEXER_IP>:9200
              - <NEW_WAZUH_INDEXER_IP>:9200
      output.elasticsearch:
        protocol: https
        username: ${username}
        password: ${password}

#. Edit the Wazuh dashboard configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to include the new Wazuh indexer node(s):

   .. code-block:: yaml

      opensearch.hosts: ["https://<EXISTING_WAZUH_INDEXER_IP>:9200", "https://<NEW_WAZUH_INDEXER_IP>:9200"]

   .. note::

      You’ll have to re-deploy certificates on your existing Wazuh node(s) if they were recreated as recommended in the :ref:`note <certificates_note>` above.

      Run the following commands on each of your nodes to deploy the certificates:

      #. On Wazuh indexer node(s):

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

      #. On Wazuh server node(s):

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

      #. On Wazuh dashboard node:

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

#. Run the following commands on your respective nodes to apply the changes:

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

Wazuh indexer node(s) installation
----------------------------------

Once the certificates have been created and copied to the new node(s), you can now proceed with installing the Wazuh indexer node. Follow the steps below to install the new Wazuh indexer node(s).

#. Install package dependencies:

   .. tabs::

      .. group-tab:: YUM

         .. code-block:: console

            # yum install coreutils


      .. group-tab:: APT

         .. code-block:: console

            # apt-get install debconf adduser procps

#. Add the Wazuh repository:

   .. tabs::

      .. group-tab:: YUM

         -  Import the GPG key:

            .. code-block:: console

               # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH

         -  Add the repository:

            .. code-block:: console

               # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages.wazuh.com/4.x/yum/\nprotect=1' | tee /etc/yum.repos.d/wazuh.repo

      .. group-tab:: APT

         -  Install the following packages:

            .. code-block:: console

               # apt-get install gnupg apt-transport-https

         -  Install the GPG key:

            .. code-block:: console

               # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/wazuh.gpg --import && chmod 644 /usr/share/keyrings/wazuh.gpg

         -  Add the repository:

            .. code-block:: console

               # echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

         -  Update the packages information:

            .. code-block:: console

               # apt-get update

#. Install the Wazuh indexer:

   .. tabs::

      .. group-tab:: YUM

         .. code-block:: console

            # yum -y install wazuh-indexer

      .. group-tab:: APT

         .. code-block:: console

            # apt-get -y install wazuh-indexer

Configuring the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Edit the ``/etc/wazuh-indexer/opensearch.yml`` configuration file and replace the following values:

-  ``network.host``: Sets the address of this node for both HTTP and HTTPS traffic. The node will bind to this address and use it as its publish address. This field accepts an IP address or a hostname.

   Use the same node address set in ``/root/config.yml`` to create the SSL certificates.

-  ``node.name``: Name of the Wazuh indexer node as defined in the ``/root/config.yml`` file. For example, ``node-1``.
-  ``cluster.initial_master_nodes``: List of the names of the master-eligible nodes. These names are defined in the ``/root/config.yml`` file. Uncomment the ``node-2`` line or add more lines, and change the node names according to your ``/root/config.yml`` definitions:

   .. code-block:: yaml

      cluster.initial_master_nodes:
      - "<EXISTING_WAZUH_INDEXER_NODE_NAME>"
      - "<NEW_WAZUH_INDEXER_NODE_NAME>"

-  ``discovery.seed_hosts``: List of the addresses of the master-eligible nodes. Each element can be either an IP address or a hostname. Uncomment this setting and set the IP addresses of each master-eligible node:

   .. code-block:: yaml

      discovery.seed_hosts:
        - "<EXISTING_WAZUH_INDEXER_IP>"
        - "<NEW_WAZUH_INDEXER_IP>"

-  ``plugins.security.nodes_dn``: List of the distinguished names of the certificates of all the Wazuh indexer cluster nodes. Uncomment the line for ``node-2`` and change the common names (CN) and values according to your settings and your ``/root/config.yml`` definitions:

   .. code-block:: yaml

      plugins.security.nodes_dn:
      - "CN=<EXISTING_WAZUH_INDEXER_NODE_NAME>,OU=Wazuh,O=Wazuh,L=California,C=US"
      - "CN=<NEW_WAZUH_INDEXER_NODE_NAME>,OU=Wazuh,O=Wazuh,L=California,C=US"

Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^

Execute the following commands in the directory where the ``wazuh-certificates.tar`` file was copied to, replacing ``<NEW_WAZUH_INDEXER_NODE_NAME>`` with the name of the Wazuh indexer node you are configuring as defined in ``/root/config``.yml. For example, ``node-1``. This deploys the SSL certificates to encrypt communications between the Wazuh central components:

.. code-block:: console

   NODE_NAME=<NEW_WAZUH_INDEXER_NODE_NAME>

.. code-block:: console

   # mkdir /etc/wazuh-indexer/certs
   # tar -xf ./wazuh-certificates.tar -C /etc/wazuh-indexer/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./admin.pem ./admin-key.pem ./root-ca.pem
   # mv -n /etc/wazuh-indexer/certs/$NODE_NAME.pem /etc/wazuh-indexer/certs/indexer.pem
   # mv -n /etc/wazuh-indexer/certs/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/indexer-key.pem
   # chmod 500 /etc/wazuh-indexer/certs
   # chmod 400 /etc/wazuh-indexer/certs/*
   # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs

**Recommended action**: If no other Wazuh components are going to be installed on this node, remove the ``wazuh-certificates.tar`` file by running the command below to increase security. Alternatively, save a copy offline for potential future use and scalability:

.. code-block:: console

   # rm -f ./wazuh-certificates.tar

Starting the service
^^^^^^^^^^^^^^^^^^^^

Run the following commands to start the Wazuh indexer service:

      .. tabs::

         .. group-tab:: SystemD

            .. code-block:: console

               # systemctl daemon-reload
               # systemctl enable wazuh-indexer
               # systemctl start wazuh-indexer

         .. group-tab:: SysV init

            -  RPM-based operating system

               .. code-block:: console

                  # chkconfig --add wazuh-indexer
                  # service wazuh-indexer start

            -  Debian-based operating system

               .. code-block:: console

                  # update-rc.d wazuh-indexer defaults 95 10
                  # service wazuh-indexer start

Cluster initialization
----------------------

#. Run the Wazuh indexer ``indexer-security-init.sh`` script on any Wazuh indexer node to load the new certificate information and start the cluster:

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh

   .. note::

      You only have to initialize the cluster once, there is no need to run this command on every node.

#. Confirm the configurations work by running the command below on your Wazuh server node:

   .. code-block:: console

      # filebeat test output

   An example output is shown below:

   .. code-block:: none
      :class: output
      :emphasize-lines: 1, 10, 13, 15, 24, 27

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
      elasticsearch: https://10.0.0.2:9200...
        parse url... OK
        connection...
          parse host... OK
          dns lookup... OK
          addresses: 10.0.0.2
          dial up... OK
        TLS...
          security: server's certificate chain verification is enabled
          handshake... OK
          TLS version: TLSv1.3
          dial up... OK
        talk to server... OK
        version: 7.10.2

Testing the cluster
-------------------

After completing the above steps, you can proceed to test your cluster and ensure that the indexer node has been successfully added. There are two possible methods to do this:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Using the securityadmin script
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The ``securityadmin`` script helps configure and manage the security settings of OpenSearch. The script lets you load, backup, restore, and migrate the security configuration files to the Wazuh indexer cluster.

Run  the command below on any of the Wazuh indexer nodes to execute the ``securityadmin`` script and initialize the cluster:

.. code-block:: console

   # /usr/share/wazuh-indexer/bin/indexer-security-init.sh

The output should be similar to the one below. It should show the number of Wazuh indexer nodes in the cluster:

.. code-block:: none
   :class: output
   :emphasize-lines: 11-13

   **************************************************************************
   ** This tool will be deprecated in the next major release of OpenSearch **
   ** https://github.com/opensearch-project/security/issues/1755           **
   **************************************************************************
   Security Admin v7
   Will connect to 192.168.21.152:9200 ... done
   Connected as "CN=admin,OU=Wazuh,O=Wazuh,L=California,C=US"
   OpenSearch Version: 2.6.0
   Contacting opensearch cluster 'opensearch' and wait for YELLOW clusterstate ...
   Clustername: wazuh-cluster
   Clusterstate: GREEN
   Number of nodes: 2
   Number of data nodes: 2
   .opendistro_security index already exists, so we do not need to create one.
   Populate config from /etc/wazuh-indexer/opensearch-security/
   Will update '/config' with /etc/wazuh-indexer/opensearch-security/config.yml
      SUCC: Configuration for 'config' created or updated
   Will update '/roles' with /etc/wazuh-indexer/opensearch-security/roles.yml
      SUCC: Configuration for 'roles' created or updated
   Will update '/rolesmapping' with /etc/wazuh-indexer/opensearch-security/roles_mapping.yml
      SUCC: Configuration for 'rolesmapping' created or updated
   Will update '/internalusers' with /etc/wazuh-indexer/opensearch-security/internal_users.yml
      SUCC: Configuration for 'internalusers' created or updated
   Will update '/actiongroups' with /etc/wazuh-indexer/opensearch-security/action_groups.yml
      SUCC: Configuration for 'actiongroups' created or updated
   Will update '/tenants' with /etc/wazuh-indexer/opensearch-security/tenants.yml
      SUCC: Configuration for 'tenants' created or updated
   Will update '/nodesdn' with /etc/wazuh-indexer/opensearch-security/nodes_dn.yml
      SUCC: Configuration for 'nodesdn' created or updated
   Will update '/whitelist' with /etc/wazuh-indexer/opensearch-security/whitelist.yml
      SUCC: Configuration for 'whitelist' created or updated
   Will update '/audit' with /etc/wazuh-indexer/opensearch-security/audit.yml
      SUCC: Configuration for 'audit' created or updated
   Will update '/allowlist' with /etc/wazuh-indexer/opensearch-security/allowlist.yml
      SUCC: Configuration for 'allowlist' created or updated
   SUCC: Expected 10 config types for node {"updated_config_types":["allowlist","tenants","rolesmapping","nodesdn","audit","roles","whitelist","internalusers","actiongroups","config"],"updated_config_size":10,"message":null} is 10 (["allowlist","tenants","rolesmapping","nodesdn","audit","roles","whitelist","internalusers","actiongroups","config"]) due to: null
   SUCC: Expected 10 config types for node {"updated_config_types":["allowlist","tenants","rolesmapping","nodesdn","audit","roles","whitelist","internalusers","actiongroups","config"],"updated_config_size":10,"message":null} is 10 (["allowlist","tenants","rolesmapping","nodesdn","audit","roles","whitelist","internalusers","actiongroups","config"]) due to: null
   Done with success

Using the Wazuh indexer API
^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can also get information about the number of nodes in the cluster by using the Wazuh indexer API.

Run the command below on any of the Wazuh indexer nodes and check the output for the field ``number_of_nodes`` to ensure it corresponds to the expected number of Wazuh indexer nodes:

.. code-block:: console

   # curl -XGET https:/<EXISTING_WAZUH_INDEXER_IP>:9200/_cluster/health?pretty -u admin:<ADMIN-PASSWORD> -k

Replace:

-  ``<EXISTING_WAZUH_INDEXER_IP>`` with the IP address of any of your indexer nodes.
-  ``<ADMIN-PASSWORD>`` with your administrator password.

The output of the command should be similar to the following:

.. code-block:: none
   :class: output
   :emphasize-lines: 5-6

   {
     "cluster_name" : "wazuh-cluster",
     "status" : "green",
     "timed_out" : false,
     "number_of_nodes" : 2,
     "number_of_data_nodes" : 2,
     "discovered_master" : true,
     "discovered_cluster_manager" : true,
     "active_primary_shards" : 11,
     "active_shards" : 20,
     "relocating_shards" : 0,
     "initializing_shards" : 0,
     "unassigned_shards" : 0,
     "delayed_unassigned_shards" : 0,
     "number_of_pending_tasks" : 0,
     "number_of_in_flight_fetch" : 0,
     "task_max_waiting_in_queue_millis" : 0,
     "active_shards_percent_as_number" : 100.0
   }

You can access the Wazuh dashboard with your credentials.

-  URL: ``https://<WAZUH_DASHBOARD_IP>``
-  Username: ``admin``
-  Password: ``<ADMIN_PASSWORD>`` or ``admin`` in case you already have a distributed architecture and using the default password.

After the above steps are completed, your new node(s) will now be part of your cluster and your infrastructure distributed.

