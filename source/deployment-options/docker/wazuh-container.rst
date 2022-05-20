.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: In this section of our documentation, you will find more information about Wazuh Docker deployment: its requirements, usage, and exposed ports.
  
.. _wazuh-container:

Wazuh Docker deployment
=======================

- `Usage`_
- `Exposed ports`_


Usage
-----

Wazuh can be deployed as a single-node or multi-node stack:

- **Single-node deployment**: A Wazuh manager node, Wazuh indexer node and Wazuh dashboard node will be deployed. 
- **Multi-node deployment**: Two Wazuh manager nodes (one master and one worker), three Wazuh indexer nodes and a Wazuh dashboard node will be deployed.
  
Both deployments use persistence and allow configuring certificates to secure communications between nodes. The multi-node stack is the only deployment that contains high availability.


.. _single-node-deployment:

Single-node Deployment
^^^^^^^^^^^^^^^^^^^^^^

1. Clone the Wazuh repository to your system:

    .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_LATEST_DOCKER| --depth=1


    Then enter into the ``single-node`` directory, all the commands described below are executed within this directory. For :ref:`additional security <customize-default-users>`, the default password for the Wazuh indexer administrator user can be changed.


2. Secure traffic between the deployment nodes using certificates:


   To secure communication between the nodes, you need to provide a group of certificates for each node in the stack. There are two alternatives to provide these certificates:

    a. Generate self-signed certificates for each node of the cluster.
    
        We have created a Docker image to automate certificate generation using the Wazuh certs gen tool. Modify the file ``config/wazuh_indexer_ssl_certs/certs.yml`` and execute the following command to obtain the desired certificates:
      
         .. code-block:: console
         
             $ docker-compose -f generate-indexer-certs.yml run --rm generator


        This will save the certificates into the ``config/wazuh_indexer_ssl_certs`` directory.

    b. Provide your own certificates for each node.

        In the case of having your own certificates, they must be provisioned as follows:

        Wazuh Indexer: 
      
        .. code-block:: console

          config/wazuh_indexer_ssl_certs/root-ca.pem
          config/wazuh_indexer_ssl_certs/wazuh.indexer-key.pem
          config/wazuh_indexer_ssl_certs/wazuh.indexer.pem
          config/wazuh_indexer_ssl_certs/admin.pem
          config/wazuh_indexer_ssl_certs/admin-key.pem


        Wazuh Manager:

        .. code-block:: console  

          config/wazuh_indexer_ssl_certs/root-ca-manager.pem
          config/wazuh_indexer_ssl_certs/wazuh.manager.pem
          config/wazuh_indexer_ssl_certs/wazuh.manager-key.pem


        Wazuh Dashboard:

        .. code-block:: console  

          config/wazuh_indexer_ssl_certs/wazuh.dashboard.pem
          config/wazuh_indexer_ssl_certs/wazuh.dashboard-key.pem
          config/wazuh_indexer_ssl_certs/root-ca.pem

 
3. Check that there is a ``docker-compose.yml`` file. Start Wazuh using ``docker-compose``:

   a) Foreground::

      $ docker-compose up

   b) Background::

      $ docker-compose up -d


   The default username and password for the Wazuh dashboard are “admin” and “SecretPassword”.


.. note::
   The Wazuh dashboard container will run multiple queries to the Wazuh indexer API using curl, to learn when Wazuh indexer is up. It is expected to see several ``Failed to connect to Wazuh indexer port 9200`` log messages or “Wazuh dashboard server is not ready yet”, until the Wazuh indexer is started. Then the setup process will continue normally, it takes about 1 minute for the Wazuh Indexer to start up. The default Wazuh indexer credentials are in the ``docker-compose.yml`` file.


.. _multi-node-deployment:

Multi-node deployment
^^^^^^^^^^^^^^^^^^^^^

1. Clone the Wazuh repository to your system:

    .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_LATEST_DOCKER| --depth=1

   
  Then enter into the ``multi-node`` directory, all the commands described below are executed within this directory. For :ref:`additional security <customize-default-users>`, the default password for the Wazuh Indexer admin user can be changed.


2. Secure traffic between the deployment nodes using certificates:

   To secure communications between the nodes, you need to provide a group of certificates for each node in the stack. There are two alternatives to provide these certificates:

   a. Generate self-signed certificates for each node of the cluster.

      We have created a Docker image to automate certificate generation using the Wazuh certs gen tool. Modify the file ``config/wazuh_indexer_ssl_certs/certs.yml`` and execute the following command to obtain the desired certificates:
        
         .. code-block:: console

             $ docker-compose -f generate-indexer-certs.yml run --rm generator


      This will save the certificates into the ``config/wazuh_indexer_ssl_certs`` directory.

   b. Provide your own certificates for each node. 

      In the case of having your own certificates, they must be provisioned as follows:
      
      Wazuh Indexer: 
    
        .. code-block:: console

            config/wazuh_indexer_ssl_certs/root-ca.pem
            config/wazuh_indexer_ssl_certs/wazuh1.indexer-key.pem
            config/wazuh_indexer_ssl_certs/wazuh1.indexer.pem
            config/wazuh_indexer_ssl_certs/wazuh2.indexer-key.pem
            config/wazuh_indexer_ssl_certs/wazuh2.indexer.pem
            config/wazuh_indexer_ssl_certs/wazuh3.indexer-key.pem
            config/wazuh_indexer_ssl_certs/wazuh3.indexer.pem
            config/wazuh_indexer_ssl_certs/admin.pem
            config/wazuh_indexer_ssl_certs/admin-key.pem


      Wazuh Manager:

        .. code-block:: console

            config/wazuh_indexer_ssl_certs/root-ca-manager.pem
            config/wazuh_indexer_ssl_certs/wazuh.master.pem
            config/wazuh_indexer_ssl_certs/wazuh.master-key.pem
            config/wazuh_indexer_ssl_certs/wazuh.worker.pem
            config/wazuh_indexer_ssl_certs/wazuh.worker-key.pem


      Wazuh Dashboard:

        .. code-block:: console

            config/wazuh_indexer_ssl_certs/wazuh.dashboard.pem
            config/wazuh_indexer_ssl_certs/wazuh.dashboard-key.pem
            config/wazuh_indexer_ssl_certs/root-ca.pem
 

3. Check that there is a ``docker-compose.yml`` file. Start Wazuh using ``docker-compose``:

   a) Foreground::

      $ docker-compose up

   b) Background::

      $ docker-compose up -d

   The default username and password for the Wazuh dashboard are “admin” and “SecretPassword”.

.. note::
  The Wazuh dashboard container will run multiple queries to the Wazuh indexer API using curl, to learn when the Wazuh indexer is up. It is expected to see several ``Failed to connect to Wazuh indexer port 9200`` log messages or “Wazuh dashboard server is not ready yet”, until the Wazuh indexer is started. Then the setup process will continue normally, it takes about 1 minute for the Wazuh Indexer to start up. The default Wazuh indexer credentials are in the ``docker-compose.yml`` file.


Build docker images locally
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh manager, indexer, and dashboard images can be modified and built locally.

1. Clone the Wazuh repository to your system:

.. code-block:: console
  
   $ git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_LATEST_DOCKER| --depth=1


2. Enter into the ``build-docker-images`` directory and build the Wazuh manager, indexer, and dashboard images:
  
.. code-block:: console
  
   $  docker-compose build


.. _customize-default-users:

Customize default users
^^^^^^^^^^^^^^^^^^^^^^^

You can customize users on the Wazuh indexer container by mounting your own ``internal_users.yml``. The default password for the Wazuh indexer administrator user can be changed to provide additional security:

.. code-block:: console

   - ./config/wazuh-indexer/internal_users.yml:/usr/share/wazuh-indexer/plugins/opensearch-security/securityconfig/internal_users.yml


It is possible to generate a hash using the same Docker image, type in a secure password when prompted and replace the hash in ``internal_users.yml``:

.. code-block:: console

   docker run --rm -ti wazuh/wazuh-indexer:|WAZUH_LATEST| bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/hash.sh


Exposed ports
-------------

By default, the stack exposes the following ports:

+-----------+-----------------------------+
| **1514**  | Wazuh TCP                   |
+-----------+-----------------------------+
| **1515**  | Wazuh TCP                   |
+-----------+-----------------------------+
| **514**   | Wazuh UDP                   |
+-----------+-----------------------------+
| **55000** | Wazuh API                   |
+-----------+-----------------------------+
| **9200**  | Wazuh Indexer  HTTPS        |
+-----------+-----------------------------+
| **443**   | Wazuh dashboard HTTPS       |
+-----------+-----------------------------+

.. note::
  Configuration is not dynamically reloaded, so it is necessary to restart the stack after changing the configuration of a component.
