.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section provides information about the Wazuh indexer cluster.

Wazuh indexer cluster
=====================

This section provides the following information about the Wazuh indexer cluster:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

.. _certificates_deployment:

Certificates deployment
-----------------------

Wazuh uses certificates to establish trust and confidentiality between its central components - the Wazuh indexer, the Wazuh dashboard, and Filebeat. Certificates are deployed for new installation of Wazuh or during upscaling of Wazuh central components. The required certificates are:

-  **Root CA certificate**: The root CA (Certificate Authority) certificate acts as the foundation of trust for a security ecosystem. It is used to authenticate the identity of all nodes within the system and to sign other certificates, thereby establishing a chain of trust.
-  **Node certificates**:  Node certificates uniquely identify each node within the Wazuh cluster. They are used to encrypt and authenticate communications between the nodes.

   Each node certificate must include either the IP address or the DNS name of the node. This is important for the verification process during communications, ensuring that the data is indeed being sent to and received from trusted nodes. These certificates, signed by the root CA, ensure that any communication between the nodes is trusted and verified through this central authority.

-  **Admin certificate**: The admin certificate is a client certificate with special privileges. The Wazuh indexer uses it to perform management and security-related tasks such as initializing and managing the Wazuh indexer cluster, creating, modifying, and deleting users, as well as managing roles and permissions. It also helps ensure that only authorized commands are executed within the cluster.

You can deploy certificates using two methods:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Using the ``wazuh-certs-tool.sh`` script (default method)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The ``wazuh-certs-tool.sh`` script simplifies certificate generation for Wazuh central components and creates all the certificates required for installation. You need to create or edit the configuration file ``config.yml``. This file references the node details like node types and IP addresses or DNS names which are used to generate certificates for each of the nodes specified in it. A template could be downloaded from `our repository <https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/config.yml>`__. These certificates are created with the following additional information:

-  ``C``: US
-  ``L``: California
-  ``O``: Wazuh
-  ``OU``: Wazuh
-  ``CN``: Name of the node

Generating Wazuh indexer certificates
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Follow the steps below to create Wazuh indexer certificates using the ``wazuh-certs-tool.sh`` script:

#. Run the command below to download the `wazuh-certs-tool.sh <https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-certs-tool.sh>`__ script in your installation directory:

   .. code-block:: console

      # wget https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-certs-tool.sh

#. Create a ``config.yml`` file with the following content. We specify only the details regarding the Wazuh indexer nodes as we are focusing on creating certificates for the Wazuh indexer.

   .. code-block:: yaml
      :emphasize-lines: 5

      nodes:
        # Wazuh indexer nodes
        indexer:
          - name: node-1
            ip: "<WAZUH_INDEXER_IP>"
          #- name: node-2
          #  ip: "<WAZUH_INDEXER_IP>"
          #- name: node-3
          #  ip: "<WAZUH_INDEXER_IP>"

   Where:

   -  ``name`` represents a unique node name. You can choose any.
   -  ``ip`` represents the IP address or DNS name of the node.

#. Run the script to create the Wazuh indexer certificates:

   .. code-block:: console

      # bash wazuh-certs-tool.sh -A

   After deploying the certificates, a directory ``wazuh-certificates`` will be created in the installation directory with the following content:

   .. code-block:: none

      wazuh-certificates/
      ├── admin-key.pem
      ├── admin.pem
      ├── root-ca.key
      ├── root-ca.pem
      ├── node-1-key.pem
      └── node-1.pem

   The files in this directory are as follows:

   -  ``root-ca.pem`` and ``root-ca.key``: These files represent the root Certificate Authority (CA). The ``.pem`` file contains the public certificate, while the ``.key`` file holds the private key used for signing other certificates.

      .. note::

         If you are deploying a complete Wazuh infrastructure and deploying certificates for the first time you need to conserve the root CA certificate. This will be used to create and sign certificates for the Wazuh server and Wazuh dashboard nodes.

   -  ``admin.pem`` and ``admin-key.pem``: These files contain the public and private keys used by the Wazuh indexer to perform management and security-related tasks such as initializing the Wazuh indexer cluster, creating and managing users and roles.
   -  ``node-1.pem`` and ``node-1-key.pem``: The ``node-1.pem`` file contains the public key, which is distributed and trusted by other Wazuh components to authenticate the indexer node. Conversely, the ``node-1-key.pem`` file holds the private key, which is kept securely on the Wazuh indexer and used for authentication and encryption in communication with other Wazuh components.

      In a clustered environment comprising two or more Wazuh indexer nodes, unique pairs of public and private keys are generated for each node. These keys are specific to the node and are identified by the names defined in the ``name`` field of the ``config.yml`` file. These key pairs must then be transferred to their corresponding nodes.

#. Once the certificates are created, you need to rename and move the Wazuh indexer certificate to the appropriate Wazuh indexer nodes respectively. You need to place them in the default directory ``/etc/wazuh-indexer/certs/`` as referenced in the file ``/etc/wazuh-indexer/opensearch.yml``. You should create the directory if it doesn’t exist.

   .. code-block:: console

      # mv /path/to/node-1-key.pem /etc/wazuh-indexer/certs/indexer-key.pem
      # mv /path/to/node-1.pem /etc/wazuh-indexer/certs/indexer.pem

Generating Wazuh indexer certificates using the pre-existing root CA
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Wazuh also gives the ability to create and sign the admin and node(s) certificates using a pre-existing root CA. It avoids having to recreate certificates for all the nodes.

.. note::

   You need to use a pre-existing root CA to create Wazuh indexer certificates:

   -  If you already have a root CA after generating certificates for the :ref:`Wazuh server <server_cluster_certificates_creation>` or :doc:`Wazuh dashboard </user-manual/wazuh-dashboard/certificates>` nodes.
   -  If you need to re-install a Wazuh indexer node or add a new node to your Wazuh indexer cluster.

#. Create a ``config.yml`` file. You must specify the details for only the Wazuh indexer node(s) you want to create certificates for, depending on the cases described in the note above.
#. Run the command below to create Wazuh indexer certificates from the ``config.yml`` file using the pre-existing root CA keys:

   .. code-block:: console

      # bash wazuh-certs-tool.sh -wi /path/to/root-ca.pem /path/to/root-ca.key

   Where:

   -  The flag ``-wi`` indicates we are creating Wazuh indexer certificates.
   -  The file ``/path/to/root-ca.pem`` contains the root CA certificate.
   -  The file ``/path/to/root-ca.key`` contains the root CA key.

   After deploying the certificates, a directory ``wazuh-certificates`` will be created in the installation directory with content similar to the one below:

   .. code-block:: none

      wazuh-certificates/
      ├── admin-key.pem
      ├── admin.pem
      ├── node-1-key.pem
      └── node-1.pem

#. Once the certificates are created, you need to rename and move the Wazuh indexer certificate to the appropriate Wazuh indexer nodes respectively. You need to place them in the default directory ``/etc/wazuh-indexer/certs/`` as referenced in the file ``/etc/wazuh-indexer/opensearch.yml``. You should create the directory if it doesn’t exist.

   .. code-block:: console

      # mv /path/to/node-1-key.pem /etc/wazuh-indexer/certs/indexer-key.pem
      # mv /path/to/node-1.pem /etc/wazuh-indexer/certs/indexer.pem

Using custom certificates
^^^^^^^^^^^^^^^^^^^^^^^^^

Custom certificates can be created using tools like OpenSSL. You must create the root CA, node, and admin certificates described above.

Adding Wazuh indexer nodes
--------------------------

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
^^^^^^^^^^^^^^^^^^^^^

Perform the outlined steps on your existing Wazuh indexer node to generate the certificates required for secure communication among the Wazuh central components.

All-in-one deployment
~~~~~~~~~~~~~~~~~~~~~

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
~~~~~~~~~~~~~~~~~~~~~~

We recommend you utilize pre-existing root CA keys to generate certificates for new nodes.

Perform the steps below on one indexer node only.

#. Create a ``config.yml`` file in the ``/root`` directory to add the new Wazuh indexer node(s):

   .. code-block:: console

      # touch /root/config.yml

   Edit the ``/root/config.yml`` file to include the node name and IP of the new node. Replace the values with your node names and their corresponding IP addresses:

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this section, we configure the Wazuh components of your existing deployment to connect and communicate with the new Wazuh indexer node.

All-in-one deployment
~~~~~~~~~~~~~~~~~~~~~

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
~~~~~~~~~~~~~~~~~~~~~~

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
~~~~~~~~~~~~~~~~~~~~~~

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
~~~~~~~~~~~~~~~~~~~~

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
^^^^^^^^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^^^^

After completing the above steps, you can proceed to test your cluster and ensure that the indexer node has been successfully added. There are two possible methods to do this:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Using the securityadmin script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

Cluster management
------------------

Using the Wazuh indexer API
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following cluster management queries on the Wazuh dashboard console by navigating to **Indexer management** > **Dev Tools**.

-  Check the general Wazuh indexer cluster health:

   .. code-block:: none

      GET _cluster/health

-  To check cluster health based on awareness attribute, use the following:

   .. code-block:: none

      GET _cluster/health?level=awareness_attributes

-  To check the cluster health based on a specific index, use the following:

   .. code-block:: none

      GET _cluster/health/<INDEX-PATTERN>

-  List all Wazuh indexer nodes and their roles:

   .. code-block:: none

      GET _cat/nodes

-  Check the Wazuh indexer node where an index is stored:

   .. code-block:: none

      GET _cat/shards/wazuh-alerts-*?v

-  Check ISM policy for an index pattern:

   .. code-block:: none

      GET _opendistro/_ism/explain/wazuh-alerts-*

-  Check statistics about the Wazuh indexer cluster:

   .. code-block:: none

      GET _cluster/stats/nodes/*

-  Check storage allocation. This can be used to determine if the Wazuh indexer node is full. If the indexer node is full, implement the :doc:`index lifecycle management <index-life-management>` to free up old indices.

   .. code-block:: none

      GET _cat/allocation?v&s=node

-  Check Wazuh indexer node attributes:

   .. code-block:: none

      GET _cat/nodeattrs?v&h=node,attr,value
