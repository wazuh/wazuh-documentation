.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: In this section of our documentation, you will find more information about Wazuh Docker deployment: its requirements, usage, and exposed ports.
  
.. _wazuh-container:

Wazuh Docker deployment
=======================

Usage
-----

You can deploy Wazuh as a single-node or multi-node stack.

-  **Single-node deployment**: Deploys one Wazuh manager, indexer, and dashboard node.
-  **Multi-node deployment**: Deploys two Wazuh manager nodes (one master and one worker), three Wazuh indexer nodes, and a Wazuh dashboard node.
  
Both deployments use persistence and allow configuring certificates to secure communications between nodes. The multi-node stack is the only deployment that contains high availability.

Single-node Deployment
^^^^^^^^^^^^^^^^^^^^^^

#. Clone the Wazuh repository to your system:

   .. code-block:: console

      # git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|

   Then enter into the ``single-node`` directory to execute all the commands described below within this directory.

#. Provide a group of certificates for each node in the stack to secure communication between the nodes. You have two alternatives to provide these certificates:

   -  Generate self-signed certificates for each cluster node. 
    
      We have created a Docker image to automate certificate generation using the Wazuh certs gen tool.

      If your system uses a proxy, add the following to the ``generate-indexer-certs.yml`` file. If not, skip this particular step:
        
      .. code-block:: yaml
        
         environment:
           - HTTP_PROXY=YOUR_PROXY_ADDRESS_OR_DNS

      A completed example looks like:
        
      .. code-block:: yaml
        
         # Wazuh App Copyright (C) 2021 Wazuh Inc. (License GPLv2)
         version: '3'

         services:
           generator:
             image: wazuh/wazuh-certs-generator:0.0.1
             hostname: wazuh-certs-generator
             volumes:
               - ./config/wazuh_indexer_ssl_certs/:/certificates/
               - ./config/certs.yml:/config/certs.yml
             environment:
               - HTTP_PROXY=YOUR_PROXY_ADDRESS_OR_DNS
        
      Execute the following command to get the desired certificates:
      
         .. code-block:: console
         
            # docker-compose -f generate-indexer-certs.yml run --rm generator

      This saves the certificates into the ``config/wazuh_indexer_ssl_certs`` directory.

   -  Provide your own certificates for each node.

      In case you have your own certificates, provision them as follows in the ``config/wazuh_indexer_ssl_certs`` directory:

      **Wazuh indexer**: 
      
      .. code-block:: none

         config/wazuh_indexer_ssl_certs/root-ca.pem
         config/wazuh_indexer_ssl_certs/wazuh.indexer-key.pem
         config/wazuh_indexer_ssl_certs/wazuh.indexer.pem
         config/wazuh_indexer_ssl_certs/admin.pem
         config/wazuh_indexer_ssl_certs/admin-key.pem

      **Wazuh manager**:

      .. code-block:: none

         config/wazuh_indexer_ssl_certs/root-ca-manager.pem
         config/wazuh_indexer_ssl_certs/wazuh.manager.pem
         config/wazuh_indexer_ssl_certs/wazuh.manager-key.pem

      **Wazuh dashboard**:

      .. code-block:: none

         config/wazuh_indexer_ssl_certs/wazuh.dashboard.pem
         config/wazuh_indexer_ssl_certs/wazuh.dashboard-key.pem
         config/wazuh_indexer_ssl_certs/root-ca.pem
 
#. Start the Wazuh single-node deployment using docker-compose:

   -  **Foreground**:

      .. code-block:: console  

         # docker-compose up

   -  **Background**:

      .. code-block:: console  

         # docker-compose up -d

   The default username and password for the Wazuh dashboard are ``admin`` and ``SecretPassword``. For :ref:`additional security <change-pwd-existing-usr>`, you can change the default password for the Wazuh indexer *admin* user.


.. note::

   To know when the Wazuh indexer is up, the Wazuh dashboard container uses ``curl`` to run multiple queries to the Wazuh indexer API. You can expect to see several ``Failed to connect to Wazuh indexer port 9200`` log messages or “ *Wazuh dashboard server is not ready yet* ” until the Wazuh indexer is started. Then the setup process continues normally. It takes about 1 minute for the Wazuh indexer to start up. You can find the default Wazuh indexer credentials in the ``docker-compose.yml`` file.

Multi-node deployment
^^^^^^^^^^^^^^^^^^^^^

#. Clone the Wazuh repository to your system:

   .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|
   
   Then enter into the ``multi-node`` directory to execute all the commands described below within this directory.

#. Provide a group of certificates for each node in the stack to secure communications between the nodes. You have two alternatives to provide these certificates:

   -  Generate self-signed certificates for each cluster node.

      We have created a Docker image to automate certificate generation using the Wazuh certs gen tool.

      If your system uses a proxy, add the following to the ``generate-indexer-certs.yml`` file. If not, skip this particular step:
      
      .. code-block:: yaml
      
         environment:
           - HTTP_PROXY=YOUR_PROXY_ADDRESS_OR_DNS

      A completed example looks like:
      
      .. code-block:: yaml
      
         # Wazuh App Copyright (C) 2021 Wazuh Inc. (License GPLv2)
         version: '3'

         services:
           generator:
             image: wazuh/wazuh-certs-generator:0.0.1
             hostname: wazuh-certs-generator
             volumes:
               - ./config/wazuh_indexer_ssl_certs/:/certificates/
               - ./config/certs.yml:/config/certs.yml
             environment:
               - HTTP_PROXY=YOUR_PROXY_ADDRESS_OR_DNS
      
      Execute the following command to get the desired certificates:
        
      .. code-block:: console

         # docker-compose -f generate-indexer-certs.yml run --rm generator

      This saves the certificates into the ``config/wazuh_indexer_ssl_certs`` directory.

   -  Provide your own certificates for each node.

      In case you have your own certificates, provision them as follows:
      
      **Wazuh indexer**: 
    
      .. code-block:: none

         config/wazuh_indexer_ssl_certs/root-ca.pem
         config/wazuh_indexer_ssl_certs/wazuh1.indexer-key.pem
         config/wazuh_indexer_ssl_certs/wazuh1.indexer.pem
         config/wazuh_indexer_ssl_certs/wazuh2.indexer-key.pem
         config/wazuh_indexer_ssl_certs/wazuh2.indexer.pem
         config/wazuh_indexer_ssl_certs/wazuh3.indexer-key.pem
         config/wazuh_indexer_ssl_certs/wazuh3.indexer.pem
         config/wazuh_indexer_ssl_certs/admin.pem
         config/wazuh_indexer_ssl_certs/admin-key.pem

      **Wazuh manager**:

      .. code-block:: none

         config/wazuh_indexer_ssl_certs/root-ca-manager.pem
         config/wazuh_indexer_ssl_certs/wazuh.master.pem
         config/wazuh_indexer_ssl_certs/wazuh.master-key.pem
         config/wazuh_indexer_ssl_certs/wazuh.worker.pem
         config/wazuh_indexer_ssl_certs/wazuh.worker-key.pem

      **Wazuh dashboard**:

      .. code-block:: none

         config/wazuh_indexer_ssl_certs/wazuh.dashboard.pem
         config/wazuh_indexer_ssl_certs/wazuh.dashboard-key.pem
         config/wazuh_indexer_ssl_certs/root-ca.pem


#. Start the Wazuh multi-node deployment using ``docker-compose``:

   -  **Foreground**:

      .. code-block:: console

         # docker-compose up

   -  **Background**:

      .. code-block:: console

         # docker-compose up -d

   The default username and password for the Wazuh dashboard are ``admin`` and ``SecretPassword``. For :ref:`additional security <change-pwd-existing-usr>`, you can change the default password for the Wazuh indexer *admin* user.

.. note::

   To know when the Wazuh indexer is up, the Wazuh dashboard container uses ``curl`` to run multiple queries to the Wazuh indexer API. You can expect to see several ``Failed to connect to Wazuh indexer port 9200`` log messages or “Wazuh dashboard server is not ready yet” until the Wazuh indexer is started. Then the setup process continues normally. It takes about 1 minute for the Wazuh indexer to start up. You can find the default Wazuh indexer credentials in the ``docker-compose.yml`` file.

Build docker images locally
^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can modify and build the Wazuh manager, indexer, and dashboard images locally.

#. Clone the Wazuh repository to your system:

   .. code-block:: console
  
      # git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|

#. For versions up to 4.3.4, enter into the ``build-docker-images`` directory and build the Wazuh manager, indexer, and dashboard images:
  
   .. code-block:: console
  
      # docker-compose build

   For version 4.3.5 and above, run the image creation script:

   .. code-block:: console
  
      # build-docker-images/build-images.sh

.. _change-pwd-existing-usr:

Change the password of a Wazuh users
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To improve security, you can change the default password of Wazuh users. You have 2 types of users: Indexer users and API user.


Wazuh indexer users
^^^^^^^^^^^^^^^^^^^

The steps performed are based on the two users that Wazuh uses by default: ``admin`` and ``kibanaserver`` users.


Perform the following steps from your ``single-node/`` directory. If you have a multi-node deployment, you must adapt and perform them from your ``multi-node/`` directory.

.. warning::

   If you have custom users, add them to the ``internal_users.yml`` file. Otherwise, executing this procedure deletes them.

Setting a new hash
~~~~~~~~~~~~~~~~~~

#. Stop the deployment stack if it’s running:

   .. code-block:: console
  
      # docker-compose down

#. Run this command to generate the hash of your new password. Once the container launches, input the new password and press **Enter**.

   .. code-block:: console
  
      # docker run --rm -ti wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER| bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/hash.sh

#. Copy the generated hash.

#. Open the ``config/wazuh_indexer/internal_users.yml`` file. Locate the block for the user you are changing password for.

#. Replace the hash.

   admin user:

   .. code-block:: YAML
      :emphasize-lines: 3

      ...
      admin:
        hash: "$2y$12$K/SpwjtB.wOHJ/Nc6GVRDuc1h0rM1DfvziFRNPtk27P.c4yDr9njO"
        reserved: true
        backend_roles:
        - "admin"
        description: "Demo admin user"

      ...

   kibanaserver user:

   .. code-block:: YAML
      :emphasize-lines: 3

      ...
      kibanaserver:
        hash: "$2a$12$4AcgAt3xwOWadA5s5blL6ev39OXDNhmOesEoo33eZtrq2N0YrU3H."
        reserved: true
        description: "Demo kibanaserver user"

      ...

.. _wazuh-docker-password-setting:

Setting the new password
~~~~~~~~~~~~~~~~~~~~~~~~

#. Open  the ``docker-compose.yml`` file. Change all occurrences of the old password with the new one.

   admin user:

   .. code-block:: YAML
      :emphasize-lines: 8, 20

      ...
      services:
        wazuh.manager:
          ...
          environment:
            - INDEXER_URL=https://wazuh.indexer:9200
            - INDEXER_USERNAME=admin
            - INDEXER_PASSWORD=SecretPassword
            - FILEBEAT_SSL_VERIFICATION_MODE=full
            - SSL_CERTIFICATE_AUTHORITIES=/etc/ssl/root-ca.pem
            - SSL_CERTIFICATE=/etc/ssl/filebeat.pem
            - SSL_KEY=/etc/ssl/filebeat.key
            - API_USERNAME=wazuh-wui
            - API_PASSWORD=MyS3cr37P450r.*-
        ...
        wazuh.dashboard:
          ...
          environment:
            - INDEXER_USERNAME=admin
            - INDEXER_PASSWORD=SecretPassword
            - WAZUH_API_URL=https://wazuh.manager
            - DASHBOARD_USERNAME=kibanaserver
            - DASHBOARD_PASSWORD=kibanaserver
            - API_USERNAME=wazuh-wui
            - API_PASSWORD=MyS3cr37P450r.*-
        ...

   kibanaserver user:

   .. code-block:: YAML
      :emphasize-lines: 10

      ...
      services:
        wazuh.dashboard:
          ...
          environment:
            - INDEXER_USERNAME=admin
            - INDEXER_PASSWORD=SecretPassword
            - WAZUH_API_URL=https://wazuh.manager
            - DASHBOARD_USERNAME=kibanaserver
            - DASHBOARD_PASSWORD=kibanaserver
            - API_USERNAME=wazuh-wui
            - API_PASSWORD=MyS3cr37P450r.*-
        ...

Applying the changes
~~~~~~~~~~~~~~~~~~~~

#. Start the deployment stack.

   .. code-block:: console
  
      # docker-compose up -d

#. Run ``docker ps`` and note the name of the Wazuh indexer container. For example, ``single-node-wazuh.indexer-1``.

#. Run ``docker exec -it <WAZUH_INDEXER_CONTAINER_NAME> bash`` to enter the container. For example:

   .. code-block:: console

      # docker exec -it single-node-wazuh.indexer-1 bash

#. Set the following variables:

   .. code-block:: console
  
      export INSTALLATION_DIR=/usr/share/wazuh-indexer
      CACERT=$INSTALLATION_DIR/certs/root-ca.pem
      KEY=$INSTALLATION_DIR/certs/admin-key.pem
      CERT=$INSTALLATION_DIR/certs/admin.pem
      export JAVA_HOME=/usr/share/wazuh-indexer/jdk

#. Run the ``securityadmin.sh`` script to apply all changes:

   .. code-block:: console

      $ bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -cd /usr/share/wazuh-indexer/opensearch-security/ -nhnv -cacert  $CACERT -cert $CERT -key $KEY -p 9200 -icl

#. Exit the Wazuh indexer container and login with the new credentials on the Wazuh dashboard.


Wazuh API user
^^^^^^^^^^^^^^

The steps are performed with the single user used for connect with Wazuh API: ``wazuh-wui`` user.

.. note::
      The password for users must be between 8 and 64 characters long. It should contain at least one uppercase and one lowercase letter, a number, and a symbol.


#. Open the file ``single-node/config/wazuh_dashboard/wazuh.yml`` and modify the value of ``password`` parameter.

   .. code-block:: YAML
      :emphasize-lines: 7

      ...
      hosts:
        - 1513629884013:
            url: "https://wazuh.manager"
            port: 55000
            username: wazuh-wui
            password: "MyS3cr37P450r.*-"
            run_as: false
      ...

#. Open  the ``docker-compose.yml`` file. Change all occurrences of the old password with the new one.

   .. code-block:: YAML
      :emphasize-lines: 14,25

      ...
      services:
        wazuh.manager:
          ...
          environment:
            - INDEXER_URL=https://wazuh.indexer:9200
            - INDEXER_USERNAME=admin
            - INDEXER_PASSWORD=SecretPassword
            - FILEBEAT_SSL_VERIFICATION_MODE=full
            - SSL_CERTIFICATE_AUTHORITIES=/etc/ssl/root-ca.pem
            - SSL_CERTIFICATE=/etc/ssl/filebeat.pem
            - SSL_KEY=/etc/ssl/filebeat.key
            - API_USERNAME=wazuh-wui
            - API_PASSWORD=MyS3cr37P450r.*-
      ...
      wazuh.dashboard:
          ...
          environment:
            - INDEXER_USERNAME=admin
            - INDEXER_PASSWORD=SecretPassword
            - WAZUH_API_URL=https://wazuh.manager
            - DASHBOARD_USERNAME=kibanaserver
            - DASHBOARD_PASSWORD=kibanaserver
            - API_USERNAME=wazuh-wui
            - API_PASSWORD=MyS3cr37P450r.*-
        ...

#. Recreate the Wazuh containers:

   .. code-block:: console

      # docker-compose down
      # docker-compose up -d


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
| **9200**  | Wazuh indexer  HTTPS        |
+-----------+-----------------------------+
| **443**   | Wazuh dashboard HTTPS       |
+-----------+-----------------------------+

.. note::

   Docker doesn’t reload the configuration dynamically. You need to restart the stack after changing the configuration of a component.
