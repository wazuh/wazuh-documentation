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

   -  If you already have a root CA after generating certificates for the :doc:`Wazuh server <>` or :doc:`Wazuh dashboard <>` nodes.
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
