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

Change the password of an existing user
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. warning::

   You must add all users created on the Wazuh dashboard to the ``internal_users.yml`` file. If not, executing this procedure deletes them.

You can change the default password of an existing user to improve security. For example, you can change the default password of the Wazuh indexer *admin* user.

Perform the following steps from your ``single-node`` directory. If you have a multi-node deployment, you must adapt them and perform them from your ``multi-node`` directory.

#. Stop the deployment stack if it’s running:

   .. code-block:: console
  
      # docker-compose down

#. Run this command to generate a hash of your new password. Once the container launches, input the new password and press **enter**:

   .. code-block:: console
  
      # docker run --rm -ti wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER| bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/hash.sh

#. Copy the generated hash. Replace the current ``admin`` user hash in the ``/single-node/config/wazuh_indexer/internal_users.yml`` file.

#. Change all occurrences of the default ``INDEXER_PASSWORD`` in the ``docker-compose.yml`` file to the new password.

#. Start the deployment stack:

   .. code-block:: console
  
      # docker-compose up -d

#. Run ``docker ps`` and note the name of the Wazuh indexer container.

#. Run ``docker exec -it single-node-wazuh.indexer-1 bash`` to enter the container. ``single-node-wazuh.indexer-1`` is the container name obtained in the previous step.

#. Set the following variables:

   .. code-block:: console
  
      export INSTALLATION_DIR=/usr/share/wazuh-indexer
      CACERT=$INSTALLATION_DIR/certs/root-ca.pem
      KEY=$INSTALLATION_DIR/certs/admin-key.pem
      CERT=$INSTALLATION_DIR/certs/admin.pem
      export JAVA_HOME=/usr/share/wazuh-indexer/jdk

#. Run the ``securityadmin.sh`` script to apply all changes:

   .. code-block:: console

      # bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -cd /usr/share/wazuh-indexer/opensearch-security/ -nhnv -cacert  $CACERT -cert $CERT -key $KEY -p 9200 -icl

#. Exit the Wazuh indexer container and login with the new credentials on the Wazuh dashboard.

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
