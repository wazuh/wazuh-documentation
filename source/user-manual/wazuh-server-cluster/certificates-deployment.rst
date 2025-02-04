.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh uses certificates to establish trust and confidentiality between its central components. Learn how to deploy certificates for Wazuh central components.

Certificates deployment
=======================

Wazuh uses certificates to establish trust and confidentiality between its central components - the Wazuh indexer, Filebeat, and the Wazuh dashboard. Certificates are deployed for new installation of Wazuh or during upscaling of Wazuh central components. The required certificates are:

-  **Root CA certificate**: The root CA (Certificate Authority) certificate acts as the foundation of trust for a security ecosystem. It is used to authenticate the identity of all nodes within the system and to sign other certificates, thereby establishing a chain of trust.
-  **Node certificates**:  Node certificates uniquely identify each node within the Wazuh cluster. They are used to encrypt and authenticate communications between the nodes.

   Each node certificate must include either the IP address or the DNS name of the node. This is important for the verification process during communications, ensuring that the data is indeed being sent to and received from trusted nodes. These certificates, signed by the root CA, ensure that any communication between the nodes is trusted and verified through this central authority.

-  **Admin certificate**: The admin certificate is a client certificate with special privileges. The Wazuh indexer uses it to perform management and security-related tasks such as initializing and managing the Wazuh indexer cluster, creating, modifying, and deleting users, as well as managing roles and permissions. It also helps ensure that only authorized commands are executed within the cluster.

You can deploy certificates using two methods:

-  :ref:`Using the  wazuh-certs-tool.sh script <using_wazuh_certs_tool>`
-  `Using custom certificates`_

.. _using_wazuh_certs_tool:

Using the ``wazuh-certs-tool.sh`` script (default method)
---------------------------------------------------------

The ``wazuh-certs-tool.sh`` script simplifies certificate generation for Wazuh central components and creates all the certificates required for installation. You need to create or edit the configuration file ``config.yml``. This file references the node details like node types and IP addresses or DNS names which are used to generate certificates for each of the nodes specified in it. A template could be downloaded from our `repository <https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/config.yml>`__. These certificates are created with the following additional information:

-  ``C``: US
-  ``L``: California
-  ``O``: Wazuh
-  ``OU``: Wazuh
-  ``CN``: Name of the node

Generating Wazuh server certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to create Wazuh server certificates using the ``wazuh-certs-tool.sh`` script:

#. Run the command below to download the `wazuh-certs-tool.sh <https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-certs-tool.sh>`__ script in your installation directory:

   .. code-block:: console

      # wget https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-certs-tool.sh

#. Create a ``config.yml`` file with the following content. We specify only the details regarding the Wazuh server nodes as we are focusing on creating certificates for the Wazuh server. These certificates will be used to integrate the Wazuh server with Filebeat for secure data transmission.

   .. code-block:: yaml

      nodes:
        # Wazuh server nodes
        # If there is more than one Wazuh server
        # node, each one must have a node_type
        server:
          - name: wazuh-1
            ip: "<WAZUH_MANAGER_IP_ADDRESS>"
          #  node_type: master
          #- name: wazuh-2
          #  ip: "<WAZUH_MANAGER_IP_ADDRESS>"
          #  node_type: worker
          #- name: wazuh-3
          #  ip: "<WAZUH_MANAGER_IP_ADDRESS>"
          #  node_type: worker

   Where:

   -  ``name`` represents a unique node name. You can choose any.
   -  ``ip`` represents the IP address or DNS name of the node.
   -  ``node type`` represents the node type to configure. Two types are available, master and worker. You can only have one master node per cluster.
   -  ``<WAZUH_MANAGER_IP_ADDRESS>`` represents the IP address of Wazuh manager nodes (master/worker)

#. Run the script to create the Wazuh server certificates:

   .. code-block:: console

      # bash wazuh-certs-tool.sh -A

   After deploying the certificates, a directory ``wazuh-certificates`` will be created in the installation directory with the following content:

   .. code-block:: none

      wazuh-certificates/
      ├── admin-key.pem
      ├── admin.pem
      ├── root-ca.key
      ├── root-ca.pem
      ├── server-key.pem
      └── server.pem

   The files in this directory are as follows:

   -  ``root-ca.pem`` and ``root-ca.key``: These files represent the root Certificate Authority (CA). The ``.pem`` file contains the public certificate, while the ``.key`` file holds the private key used for signing other certificates.

      .. note::

         If you are deploying a complete Wazuh infrastructure and deploying certificates for the first time you need to conserve the root CA certificate. This will be used to create and sign certificates for the Wazuh indexer and Wazuh dashboard nodes.

   -  ``admin.pem`` and ``admin-key.pem``: These files contain the public and private keys used by the Wazuh indexer to perform management and security-related tasks such as initializing the Wazuh indexer cluster, creating and managing users and roles.
   -  ``server.pem`` and ``server-key.pem``: The ``server.pem`` file contains the public key, which is used by Filebeat to verify the authenticity of the Wazuh server during communication. Conversely, the ``server-key.pem`` file holds the private key, which is kept securely on the Wazuh server and used to authenticate itself to Filebeat.

      In a clustered environment comprising two or more Wazuh server nodes, unique pairs of public and private keys are generated for each node. These keys are specific to the node and are identified by the names defined in the ``name`` field of the ``config.yml`` file. These key pairs must then be transferred to their corresponding nodes.

#. Once the certificates are created, you need to rename and move the Wazuh server certificate to the appropriate Wazuh server nodes respectively. You need to place them in the default directory ``/etc/filebeat/certs/`` as referenced in the file ``/etc/filebeat/filebeat.yml``. You should create the directory if it doesn’t exist.

   .. code-block:: console

      # mv /path/to/server-key.pem /etc/filebeat/certs/filebeat-key.pem
      # mv /path/to/server.pem /etc/filebeat/certs/filebeat.pem

Generating Wazuh server certificates using the pre-existing root CA
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh also gives the ability to create and sign the admin and node(s) certificates using a pre-existing root CA. It avoids having to recreate certificates for all the nodes.

.. note::

   You need to use a pre-existing root CA to create Wazuh server certificates:

   -  If you already have a root CA after generating certificates for the :doc:`Wazuh indexer </user-manual/wazuh-indexer-cluster/certificate-deployment>` or :doc:`Wazuh dashboard </user-manual/wazuh-dashboard/certificates>` nodes.
   -  If you need to re-install a Wazuh server node or add a new node to your Wazuh server cluster.

#. Create a ``config.yml`` file. You must specify the details for only the Wazuh server node(s) you want to create certificates for, depending on the cases described in the note above.

#. Run the command below to create Wazuh server certificates from the ``config.yml`` file using the pre-existing root CA keys:

   .. code-block:: console

      # bash wazuh-certs-tool.sh -ws /path/to/root-ca.pem /path/to/root-ca.key

   Where:

   -  The flag ``-ws`` indicates we are creating Wazuh server certificates.
   -  The file ``/path/to/root-ca.pem`` contains the root CA certificate.
   -  The file ``/path/to/root-ca.key`` contains the root CA key.

   After deploying the certificates, a directory ``wazuh-certificates`` will be created in the installation directory with content similar to the one below:

   .. code-block:: none

      wazuh-certificates/
      ├── admin-key.pem
      ├── admin.pem
      ├── server-key.pem
      └── server.pem

#. Once the certificates are created, you need to rename and move the Wazuh server certificate to the appropriate Wazuh server nodes respectively. You need to place them in the default directory ``/etc/filebeat/certs/`` as referenced in the file ``/etc/filebeat/filebeat.yml``. You should create the directory if it doesn’t exist.

   .. code-block:: console

      # mv /path/to/server-key.pem /etc/filebeat/certs/filebeat-key.pem
      # mv /path/to/server.pem /etc/filebeat/certs/filebeat.pem

Using custom certificates
-------------------------

Custom certificates can be created using tools like OpenSSL. You must create the root CA, node, and admin certificates described above.
