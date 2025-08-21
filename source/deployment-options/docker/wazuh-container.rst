.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh supports the deployment of the central components on Docker. Learn more in this section of the documentation.

Wazuh Docker deployment
=======================

Wazuh consists of a multi-platform Wazuh agent and three central components: the Wazuh server, the Wazuh indexer, and the Wazuh dashboard. Refer to the :doc:`Wazuh components </getting-started/components/index>` documentation for more information.

**Deployment options**

Wazuh supports the deployment of the central components on Docker.

-  You can deploy `Wazuh central components`_ as a single-node or multi-node stack.

   -  **Single-node stack**: Runs one Wazuh manager, indexer, and dashboard node on the Docker host. Supports persistent storage and configurable certificates for secure communications.
   -  **Multi-node stack**: Runs two Wazuh manager nodes (one master, one worker), three indexer nodes, one dashboard, and one nginx node. Includes persistence, secure communication configuration, and high availability.

Wazuh central components
------------------------

Follow the steps below to deploy the Wazuh central components in a single-node and multi-node stack.

Cloning the repository
^^^^^^^^^^^^^^^^^^^^^^

#. Clone the `Wazuh Docker repository <https://github.com/wazuh/wazuh-docker>`__ to your system:

   .. code-block:: console

      # git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|

#. Select the stack you want:

   -  **Single-node**

      Navigate to the ``single-node`` directory to execute all the following commands.

      .. code-block:: console

         # cd wazuh-docker/single-node/

   -  **Multi-node**

      Navigate to the ``multi-node`` directory to execute all the following commands.

      .. code-block:: console

         # cd wazuh-docker/multi-node/

Certificate generation
^^^^^^^^^^^^^^^^^^^^^^

You must provide certificates for each node to secure communication between them in the Wazuh stack. You have two alternatives:

-  Wazuh self-signed certificates
-  Your own certificates

.. tabs::

   .. group-tab:: Wazuh self‑signed certificates

      You must use the ``wazuh-certs-generator`` Docker image to generate self-signed certificates for each node of the stack.

      #. **Optional**: Add the following to the ``generate-indexer-certs.yml`` file if your system uses a proxy. If not, skip this step. Replace ``<YOUR_PROXY_ADDRESS_OR_DNS>`` with your proxy information.

         .. code-block:: yaml

            # Wazuh App Copyright (C) 2017, Wazuh Inc. (License GPLv2)
            services:
              generator:
                image: wazuh/wazuh-certs-generator:0.0.2
                hostname: wazuh-certs-generator
                volumes:
                  - ./config/wazuh_indexer_ssl_certs/:/certificates/
                  - ./config/certs.yml:/config/certs.yml
                environment:
                  - HTTP_PROXY=<YOUR_PROXY_ADDRESS_OR_DNS>

      #. Run the following command to generate the desired certificates:

         .. code-block:: console

            # docker-compose -f generate-indexer-certs.yml run --rm generator

      The generated certificates will be stored in the ``config/wazuh_indexer_ssl_certs`` directory.

   .. group-tab:: Your own certificates

      If you already have valid certificates for each node, place them in the ``config/wazuh_indexer_ssl_certs/`` directory using the following file names. Note your stack for the right path.

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

      .. note::

         Use the exact filenames shown above, as the containers are configured to reference these specific names.

Deployment
^^^^^^^^^^

#. Start the Wazuh Docker deployment using ``docker-compose``:

   -  **Background**:

      .. code-block:: console

         # docker-compose up -d

   -  **Foreground**:

      .. code-block:: console

         # docker-compose up

Exposed ports
^^^^^^^^^^^^^

By default, the stack exposes the following ports:

+-------+-----------------------------+
| 1514  | Wazuh TCP                   |
+-------+-----------------------------+
| 1515  | Wazuh TCP                   |
+-------+-----------------------------+
| 514   | Wazuh UDP                   |
+-------+-----------------------------+
| 55000 | Wazuh server API            |
+-------+-----------------------------+
| 9200  | Wazuh indexer API           |
+-------+-----------------------------+
| 443   | Wazuh dashboard HTTPS       |
+-------+-----------------------------+

.. note::

   Docker does not dynamically reload the configuration. After changing a component's configuration, you need to restart the stack.

Accessing the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After deploying the Docker stack, you can access the Wazuh dashboard using your Docker host’s IP address.

.. code-block:: none

   https://<DOCKER_HOST_IP>


.. note::

   If you use a self-signed certificate, your browser will warn you that it cannot verify its authenticity.

This is the default username and password to access the Wazuh dashboard:

-  **Username**: ``admin``
-  **Password**: ``SecretPassword``

Refer to the `Change the default password of Wazuh users`_ section to learn more about additional security.

.. note::

   To determine when the Wazuh indexer is up, the Wazuh dashboard container uses ``curl`` to repeatedly send queries to the Wazuh indexer API (port 9200). You can expect to see several ``Failed to connect to Wazuh indexer port 9200`` log messages or ``Wazuh dashboard server is not ready yet`` until the Wazuh indexer is started. Then the setup process continues normally. It takes about 1 minute for the Wazuh indexer to start up. You can find the default Wazuh indexer credentials in the ``docker-compose.yml`` file.

.. _change-pwd-existing-usr:

Change the default password of Wazuh users
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We recommend changing the default Wazuh user's password to improve security.

There are two types of users on Wazuh Docker environments:

-  Wazuh indexer users
-  Wazuh server API users

Follow the steps below to change the password of these Wazuh users.

.. note::

   Depending on your Wazuh Docker stack, you must run the commands from the ``wazuh-docker/single-node`` or ``wazuh-docker/multi-node`` directory.

Wazuh indexer users
~~~~~~~~~~~~~~~~~~~

The Wazuh indexer creates the ``admin`` and ``kibanaserver`` users by default.  Follow the steps below to change their passwords.

.. warning::

   -  You can only change one user’s password at a time.
   -  If you have custom users, add them to the ``config/wazuh_indexer/internal_users.yml`` file in the deployment model directory. Otherwise, executing this procedure deletes them.

Logging out of your Wazuh dashboard
...................................

You need to log out of your Wazuh dashboard before starting the password change process. If you don't log out, persistent session cookies will cause errors when accessing Wazuh after changing user passwords.

Setting a new hash
..................

.. note::

   If your password contains the ``$`` character, you must escape it by doubling it. For example, to set the password ``Secret$Password`` in the ``docker-compose.yml`` file, write it as ``Secret$$Password``.

#. Stop the stack if it’s running:

   .. code-block:: console

      # docker-compose down

#. Run this command to generate the hash of your new password:

   .. code-block:: console

      # docker run --rm -ti wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER| bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/hash.sh

   Once the container launches, input the new password and press **Enter**.

#. Copy the generated hash.

#. Open the ``config/wazuh_indexer/internal_users.yml`` file. Locate the block for the user whose password you want to change.

#. Replace ``<NEW_HASH>`` with your hash values.

   -  ``admin`` user

      .. code-block:: yaml
         :emphasize-lines: 4

         ...

         admin:
           hash: "<NEW_HASH>"
           reserved: true
           backend_roles:
           - "admin"
           description: "Demo admin user"

         ...

   -  ``kibanaserver`` user

      .. code-block:: yaml
         :emphasize-lines: 4

         ...

         kibanaserver:
           hash: "<NEW_HASH>"
           reserved: true
           description: "Demo kibanaserver user"

         ...

Setting the new password
........................

#. Open the ``docker-compose.yml`` file. Change all occurrences of the old password with the new one. For example, for a single-node stack:

   -  ``admin`` user

      .. code-block:: yaml
         :emphasize-lines: 8, 25

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
           wazuh.indexer:
             ...
             environment:
               - "OPENSEARCH_JAVA_OPTS=-Xms1024m -Xmx1024m"
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

   -  ``kibanaserver`` user

      .. code-block:: yaml
         :emphasize-lines: 12

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
....................

After updating ``docker-compose.yml`` file, restart the Wazuh Docker stack and reapply settings using the ``securityadmin.sh`` tool.

#. Start the deployment stack.

   .. code-block:: console

      # docker-compose up -d

#. Run ``docker ps`` and note the name of the first Wazuh indexer container. For example, ``single-node-wazuh.indexer-1``, or ``multi-node-wazuh1.indexer-1``.

#. Run ``docker exec -it <WAZUH_INDEXER_CONTAINER_NAME> bash`` to enter the container, where ``<WAZUH_INDEXER_CONTAINER_NAME>`` is the name of the Wazuh indexer container. Use ``single-node-wazuh.indexer-1`` for the single-node stack and ``multi-node-wazuh1.indexer-1`` for the multi-node stack:

   .. code-block:: console

      # docker exec -it single-node-wazuh.indexer-1 bash

#. Set the following variables:

   .. code-block:: bash

      export INSTALLATION_DIR=/usr/share/wazuh-indexer
      CACERT=$INSTALLATION_DIR/certs/root-ca.pem
      KEY=$INSTALLATION_DIR/certs/admin-key.pem
      CERT=$INSTALLATION_DIR/certs/admin.pem
      export JAVA_HOME=/usr/share/wazuh-indexer/jdk

#. Wait for the Wazuh indexer to initialize properly. The waiting time can vary from one to five minutes. It depends on the size of the cluster, the assigned resources, and the network speed. Then, run the ``securityadmin.sh`` script to apply all changes.

   -  Single-node stack

      .. code-block:: console

         $ bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -cd /usr/share/wazuh-indexer/opensearch-security/ -nhnv -cacert  $CACERT -cert $CERT -key $KEY -p 9200 -icl

   -  Multi-node stack

      .. code-block:: console

         $ HOST=$(grep node.name $INSTALLATION_DIR/opensearch.yml | awk '{printf $2}')
         $ bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -cd /usr/share/wazuh-indexer/opensearch-security/ -nhnv -cacert  $CACERT -cert $CERT -key $KEY -p 9200 -icl -h $HOST

      .. note::

         When working on Docker Desktop with a multi-node stack, use the ``multi-node-wazuh1.indexer-1`` IP address instead of the ``$HOST`` variable.

#. Exit the Wazuh indexer container. Refresh the Wazuh dashboard and log in with the new credentials.

Wazuh server API users
~~~~~~~~~~~~~~~~~~~~~~

The ``wazuh-wui`` user is the default user for connecting to the Wazuh server API. Follow these steps to change the password.

.. warning::

   The password for Wazuh server API users must be between 8 and 64 characters long and contain at least one uppercase and lowercase letter, number, and symbol. The Wazuh manager service will fail to start if these requirements are unmet.

#. Open the file ``config/wazuh_dashboard/wazuh.yml`` and modify the value of ``password`` parameter.

   .. code-block:: yaml
      :emphasize-lines: 8

      ...
      hosts:
        - 1513629884013:
            url: "https://wazuh.manager"
            port: 55000
            username: wazuh-wui

           password: "MyS3cr37P450r.*-"

           run_as: false
      ...

#. Open the ``docker-compose.yml`` file. Change all occurrences of the old password with the new one.

   .. code-block:: yaml
      :emphasize-lines: 14, 27

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

Refer to :ref:`log in to the Wazuh server API via the command line <api_log_in>` to learn more.
