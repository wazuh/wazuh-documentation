.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description:: This section covers deploying certificates to secure communication between Wazuh components.

Certificates deployment
=======================

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
---------------------------------------------------------

The ``wazuh-certs-tool.sh`` script simplifies certificate generation for Wazuh central components and creates all the certificates required for installation. You need to create or edit the configuration file ``config.yml``. This file references the node details like node types and IP addresses or DNS names which are used to generate certificates for each of the nodes specified in it. A template could be downloaded from `our repository <https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/config.yml>`__. These certificates are created with the following additional information:

-  ``C``: US
-  ``L``: California
-  ``O``: Wazuh
-  ``OU``: Wazuh
-  ``CN``: Name of the node

Generating Wazuh indexer certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
-------------------------

Custom certificates can be created using tools like OpenSSL. You must create the root CA, node, and admin certificates described above.
