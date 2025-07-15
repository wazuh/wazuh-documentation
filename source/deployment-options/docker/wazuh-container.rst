.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh supports different Docker deployment models suitable for testing and production purposes. It offers flexibility in how you can deploy the Wazuh Docker stack.

Wazuh Docker deployment
=======================

Wazuh includes the Wazuh agent and three central components: the Wazuh server, the Wazuh indexer, and the Wazuh dashboard.

The Wazuh agent runs on monitored endpoints and sends security data to the Wazuh server. The Wazuh server analyzes this data using decoders, rules, and threat intelligence to detect threats, then forwards the results to the Wazuh indexer for storage and indexing. The Wazuh dashboard provides a web interface for visualizing the collected data.

Wazuh supports different Docker deployment models suitable for testing and production purposes. It offers flexibility in how you can deploy the Wazuh Docker stack. Choose the deployment model that fits your business needs.

-  You can deploy :ref:`Wazuh central components <central_components_docker>` as a single-node or multi-node stack. Both deployments use persistence and allow configuration of certificates to secure communications between nodes. The multi-node stack is the only deployment that contains high availability.

   -  **Single-node deployment**: This deployment consists of one Wazuh manager, indexer, and dashboard node on a single Docker host.
   -  **Multi-node deployment**: This deployment consists of two Wazuh manager nodes (one master and one worker), three Wazuh indexer nodes, and a Wazuh dashboard node on a single Docker host.

-  You can deploy a :ref:`Wazuh agent <agent_docker>` container on a Docker host, where it is monitored by a Wazuh manager.

.. _central_components_docker:

Wazuh central components
------------------------

This section covers deploying Wazuh central components on a single Docker host, including single-node and multi-node configurations.

Single-node deployment
^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to deploy the Wazuh central components in a single-node Docker stack.

Initial configuration
~~~~~~~~~~~~~~~~~~~~~

#. Clone the Wazuh repository to your system:

   .. code-block:: console

      # git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|

#. Navigate to the ``single-node`` directory to execute all the commands.

   .. code-block:: console

      # cd wazuh-docker/single-node/

Certificate generation
~~~~~~~~~~~~~~~~~~~~~~

#. Provide a group of certificates for each node in the stack to secure communication between the nodes. You have two alternatives to provide these certificates:

   -  Generate self-signed certificates for each node of the cluster. We have created a Docker image to automate certificate generation using the Wazuh certs gen tool.

      #. Add the following to the ``generate-indexer-certs.yml`` file if your system uses a proxy. If not, skip this particular step:

         .. code-block:: yaml
            :emphasize-lines: 2

            environment:
              - HTTP_PROXY=<YOUR_PROXY_ADDRESS_OR_DNS>

         Replace ``<YOUR_PROXY_ADDRESS_OR_DNS>``  with your information.

         Here is an example of what the file looks like:

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

      #. Execute the following command to get the desired certificates:

         .. code-block:: console

            # docker-compose -f generate-indexer-certs.yml run --rm generator

         This saves the certificates into the ``config/wazuh_indexer_ssl_certs`` directory.

   -  Provide your certificates for each node.

      #. In case you have your certificates, provision them as follows in the directory:

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

Deployment
~~~~~~~~~~

#. Start the Wazuh single-node deployment using ``docker-compose``:

   -  **Background**:

      .. code-block:: console

         # docker-compose up -d

   -  **Foreground**:

      .. code-block:: console

         # docker-compose up

   The default username and password for the Wazuh dashboard are ``admin`` and ``SecretPassword``. Refer to the :ref:`change-pwd-existing-usr` section to learn more about additional security.

.. note::

   To determine when the Wazuh indexer is up, the Wazuh dashboard container uses ``curl`` to repeatedly send queries to the Wazuh indexer API (port 9200). You can expect to see several ``Failed to connect to Wazuh indexer port 9200`` log messages or ``Wazuh dashboard server is not ready yet`` until the Wazuh indexer is started. Then the setup process continues normally. It takes about 1 minute for the Wazuh indexer to start up. You can find the default Wazuh indexer credentials in the ``docker-compose.yml`` file.

Multi-node deployment
^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to deploy the Wazuh central components in a multi-node Docker stack.

Initial configuration
~~~~~~~~~~~~~~~~~~~~~

#. Clone the Wazuh repository to your system:

   .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|

#. Navigate to the ``multi-node`` directory to execute all the commands.

   .. code-block:: console

      # cd wazuh-docker/multi-node/

Certificate generation
~~~~~~~~~~~~~~~~~~~~~~

#. Provide a group of certificates for each node in the stack to secure communications between the nodes. You have two alternatives to provide these certificates:

   -  Generate self-signed certificates for each node of the cluster. We have created a Docker image to automate certificate generation using the Wazuh certs gen tool.

      #. Add the following to the ``generate-indexer-certs.yml`` file if your system uses a proxy. If not, skip this particular step:

         .. code-block:: yaml
            :emphasize-lines: 2

            environment:
              - HTTP_PROXY=<YOUR_PROXY_ADDRESS_OR_DNS>

         Replace ``<YOUR_PROXY_ADDRESS_OR_DNS>``  with your information.

         Here is an example of what the file looks like:

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

      #. Execute the following command to get the desired certificates:

         .. code-block:: console

            # docker-compose -f generate-indexer-certs.yml run --rm generator

         This saves the certificates into the ``config/wazuh_indexer_ssl_certs`` directory.

   -  Provide your certificates for each node.

      #. In case you have your certificates, provision them as follows in the directory:

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

Deployment
~~~~~~~~~~

#. Start the Wazuh multi-node deployment using ``docker-compose``:

   -  **Background**:

      .. code-block:: console

         # docker-compose up -d

   -  **Foreground**:

      .. code-block:: console

         # docker-compose up

   The default username and password for the Wazuh dashboard are ``admin`` and ``SecretPassword``. Refer to the :ref:`change-pwd-existing-usr` section to learn more about additional security.

.. note::

   To know when the Wazuh indexer is up, the Wazuh dashboard container uses ``curl`` to run multiple queries to the Wazuh indexer API. You can expect to see several ``Failed to connect to Wazuh indexer port 9200`` log messages or ``Wazuh dashboard server is not ready yet`` until the Wazuh indexer is started. Then the setup process continues normally. It takes about 1 minute for the Wazuh indexer to start up.

   You can find the default Wazuh indexer credentials in the ``docker-compose.yml`` file.

Build docker images locally
^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can modify and build the Wazuh central components images locally.

#. Clone the Wazuh repository to your system:

   .. code-block:: console

      # git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|

#. Navigate to the ``wazuh-docker/build-docker-images/`` directory and execute the following command to build the Wazuh manager, indexer, and dashboard images:

   -  For version 4.3.5 and later:

      .. code-block:: console

         # build-docker-images/build-images.sh

   -  For versions up to 4.3.4:

      .. code-block:: console

         # docker-compose build

.. _change-pwd-existing-usr:

Change the default password of Wazuh users
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We recommend changing the default Wazuh user's password to improve security.

There are two types of Wazuh users:

-  Wazuh indexer users
-  Wazuh API users

To change the password of these Wazuh users, perform the following steps.

.. note::

   Depending on your Wazuh Docker deployment, you must run the commands from the ``wazuh-docker/single-node`` or ``wazuh-docker/multi-node`` directory.

Wazuh indexer users
~~~~~~~~~~~~~~~~~~~

By default, the Wazuh indexer creates the ``admin`` and ``kibanaserver`` users. To change their passwords, follow the steps below. You can only change one user’s password at a time.

.. warning::

   If you have custom users, add them to the ``config/wazuh_indexer/internal_users.yml`` file in the deployment model directory. Otherwise, executing this procedure deletes them.

Closing your Wazuh dashboard session
....................................

Before starting the password change process, we recommend logging out of your Wazuh dashboard session. Persistent session cookies might cause errors when accessing Wazuh after changing user passwords if you don't log out.

Setting a new hash
..................

#. Stop the deployment stack if it’s running:

   .. code-block:: console

      # docker-compose down

#. Run this command to generate the hash of your new password:

   .. code-block:: console

      # docker run --rm -ti wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER| bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/hash.sh

   Once the container launches, input the new password and press **Enter**.

#. Copy the generated hash.

#. Open the ``config/wazuh_indexer/internal_users.yml`` file. Locate the block for the user for whom you are changing the password.

#. Replace the hash.

   .. tabs::

      .. group-tab:: ``admin`` user

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

      .. group-tab:: ``kibanaserver`` user

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
........................

.. note::

   If your password contains the ``$`` character, you must escape it using another ``$``. For example, to set the password ``Secret$Password`` in the ``docker-compose.yml`` file, write it as ``Secret$$Password``.

#. Open  the ``docker-compose.yml`` file. Change all occurrences of the old password with the new one. For example, for a single-node deployment:

   .. tabs::

      .. group-tab:: ``admin`` user

         .. code-block:: YAML
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

      .. group-tab:: ``kibanaserver`` user

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
....................

#. Start the deployment stack.

   .. code-block:: console

      # docker-compose up -d

#. Run ``docker ps`` and note the name of the first Wazuh indexer container. For example, ``single-node-wazuh.indexer-1``, or ``multi-node-wazuh1.indexer-1``.

#. Run ``docker exec -it <WAZUH_INDEXER_CONTAINER_NAME> bash`` to enter the container, where ``<WAZUH_INDEXER_CONTAINER_NAME>`` is the name of the Wazuh indexer container. For example:

   .. code-block:: console

      # docker exec -it single-node-wazuh.indexer-1 bash

#. Set the following variables:

   .. code-block:: console

      export INSTALLATION_DIR=/usr/share/wazuh-indexer
      CACERT=$INSTALLATION_DIR/certs/root-ca.pem
      KEY=$INSTALLATION_DIR/certs/admin-key.pem
      CERT=$INSTALLATION_DIR/certs/admin.pem
      export JAVA_HOME=/usr/share/wazuh-indexer/jdk

#. Wait for the Wazuh indexer to initialize properly. The waiting time can vary from two to five minutes. It depends on the size of the cluster, the assigned resources, and the network speed. Then, run the ``securityadmin.sh`` script to apply all changes.

   .. tabs::

      .. tab:: Single-node cluster

         .. code-block:: console

            $ bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -cd /usr/share/wazuh-indexer/opensearch-security/ -nhnv -cacert  $CACERT -cert $CERT -key $KEY -p 9200 -icl

      .. tab:: Multi-node cluster

         .. code-block:: console

            $ HOST=$(grep node.name $INSTALLATION_DIR/opensearch.yml | awk '{printf $2}')
            $ bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -cd /usr/share/wazuh-indexer/opensearch-security/ -nhnv -cacert  $CACERT -cert $CERT -key $KEY -p 9200 -icl -h $HOST

#. Exit the Wazuh indexer container and login with the new credentials on the Wazuh dashboard.

Wazuh API users
~~~~~~~~~~~~~~~

The ``wazuh-wui`` user is the user to connect with the Wazuh API by default. Follow these steps to change the password.

.. note::

   The password for Wazuh API users must be between 8 and 64 characters long. It must contain at least one uppercase and one lowercase letter, a number, and a symbol.

#. Open the file ``config/wazuh_dashboard/wazuh.yml`` and modify the value of ``password`` parameter.

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
^^^^^^^^^^^^^

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

   Docker does not dynamically reload the configuration. After changing a component's configuration, you need to restart the stack.

.. _agent_docker:

Wazuh agent
-----------

Deploying the Wazuh agent with Docker involves running a container with the agent pre-installed and ready to use. This approach offers a lightweight and consistent way to simulate or monitor endpoints across host environments. It simplifies deployment, reduces host-level dependencies, and is suitable for testing and production use cases.

A common use case for the Wazuh agent Docker container is as a dedicated log collection point. For example, you can use it to aggregate logs from cloud services or external systems and forward them to a Wazuh server for analysis. This makes it ideal for testing integrations, collecting cloud-native logs, or setting up temporary log collection endpoints without installing the agent directly on a host.

Wazuh agent container deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow these steps to deploy the Wazuh agent using Docker.

#. Clone the Wazuh repository to your system:

   .. code-block:: console

      # git clone https://github.com/wazuh/wazuh-docker.git -b v|WAZUH_CURRENT_DOCKER|

#. Navigate to the ``wazuh-docker/wazuh-agent/`` directory within your repository:

   .. code-block:: console

      # cd wazuh-docker/wazuh-agent

#. Edit the ``docker-compose.yml`` file. Replace ``<YOUR_WAZUH_MANAGER_IP>`` with the IP address of your Wazuh manager. Locate the ``environment`` section for the agent service and update it:

   .. code-block:: yaml
      :emphasize-lines: 8,9

       Wazuh App Copyright (C) 2017, Wazuh Inc. (License GPLv2)
      version: '3.7'

      services:
        wazuh.agent:
          image: wazuh/wazuh-agent:4.13.0
          restart: always
          environment:
            - WAZUH_MANAGER_SERVER=<YOUR_WAZUH_MANAGER_IP>
          volumes:
            - ./config/wazuh-agent-conf:/wazuh-config-mount/etc/ossec.conf

#. Start the Wazuh agent deployment using ``docker-compose``:

   -  **Background**:

      .. code-block:: console

         # docker-compose up -d

   -  **Foreground**:

      .. code-block:: console

         # docker-compose up

#. Verify from your Wazuh dashboard that the Wazuh agent deployment was successful and visible. Navigate to **Agent management** > **Summary**, and you should see the Wazuh agent container active on your dashboard.