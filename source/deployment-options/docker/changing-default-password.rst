.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to change the default password of Wazuh users in Docker environments in this section of the documentation.

Changing the default password of Wazuh users
============================================

We recommend changing the default Wazuh user's password to improve security.

There are two types of users on Wazuh Docker environments:

-  :ref:`Wazuh indexer users <wazuh-indexer-user>`
-  `Wazuh server API users`_

Follow the steps below to change the password of these Wazuh users.

.. note::

   Depending on your Wazuh Docker stack, you must run the commands from the ``wazuh-docker/single-node`` or ``wazuh-docker/multi-node`` directory.

.. _wazuh-indexer-user:

Wazuh indexer user
------------------

The Wazuh indexer has the ``admin`` and ``kibanaserver`` users by default.  You can access the Wazuh dashboard using either the ``admin`` or ``kibanaserver`` user credentials.

To change these credentials, you must:

-  :ref:`Log out of your Wazuh dashboard <log-out-of-your-wazuh-dashboard>`
-  :ref:`Set a new password in the Docker Compose file <set-a-new-password-in-the-docker-compose-file>`
-  :ref:`Create and set the hash of your new password <create-and-set-the-hash-of-your-new-password>`
-  :ref:`Apply the changes <apply-the-changes>`

.. warning::

   -  You can only change one user's password at a time.
   -  If you have custom users, add them to the ``config/wazuh_indexer/internal_users.yml`` file in the deployment model directory. Otherwise, executing this procedure deletes them.

.. _log-out-of-your-wazuh-dashboard:

Logging out of your Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You must log out of your Wazuh dashboard before starting the password change process. If you don't, persistent session cookies will cause errors when accessing Wazuh after changing user passwords.

.. _set-a-new-password-in-the-docker-compose-file:

Setting the new password in the Docker Compose file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::

   If your password contains the ``$`` character, you must escape it by doubling it. For example, to set the password ``Secret$Password`` in the ``docker-compose.yml`` file, write it as ``Secret$$Password``.

#. Open the ``docker-compose.yml`` file. Change all occurrences of the old password with the new one. For example, for a single-node stack:

   .. tabs::

      .. group-tab:: admin user

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

      .. group-tab:: kibanaserver user

         .. code-block:: yaml
            :emphasize-lines: 11

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

.. _create-and-set-the-hash-of-your-new-password:

Setting a new hash
^^^^^^^^^^^^^^^^^^

Follow the steps below to generate and set a new password hash for your Wazuh users.

#. Stop the stack if it's running:

   .. code-block:: console

      # docker compose down

#. Run this command to generate the hash for your new password:

   .. code-block:: console

      # docker run --rm -ti wazuh/wazuh-indexer:|WAZUH_CURRENT_DOCKER| bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/hash.sh

   Once the container launches, input the new password and press **Enter**.

#. Copy the generated hash.

#. Open the ``config/wazuh_indexer/internal_users.yml`` file. Locate the block for the user whose password you want to change.

#. Replace ``<NEW_HASH>`` with your hash values.

   .. tabs::

      .. group-tab:: admin user

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

      .. group-tab:: kibanaserver user

         .. code-block:: yaml
            :emphasize-lines: 4

            ...

            kibanaserver:
              hash: "<NEW_HASH>"
              reserved: true
              description: "Demo kibanaserver user"

            ...

   Save the changes.

.. _apply-the-changes:

Applying the changes
^^^^^^^^^^^^^^^^^^^^

After updating ``docker-compose.yml`` file, restart the Wazuh Docker stack and reapply settings using the ``securityadmin.sh`` tool.

#. Start the deployment stack.

   .. code-block:: console

      # docker compose up -d

#. Run ``docker ps`` and note the name of the first Wazuh indexer container. For example, ``single-node-wazuh.indexer-1``, or ``multi-node-wazuh1.indexer-1``.

#. Run ``docker exec -it <WAZUH_INDEXER_CONTAINER_NAME> bash`` to access the container. Replace ``<WAZUH_INDEXER_CONTAINER_NAME>`` with the Wazuh indexer container name. For example, use ``single-node-wazuh.indexer-1`` for the single-node stack and ``multi-node-wazuh1.indexer-1`` for the multi-node stack:

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

   .. tabs::

      .. group-tab:: Single-node stack

         .. code-block:: console

            $ bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -cd /usr/share/wazuh-indexer/opensearch-security/ -nhnv -cacert  $CACERT -cert $CERT -key $KEY -p 9200 -icl

      .. group-tab:: Multi-node stack

         .. code-block:: console

            $ HOST=$(grep node.name $INSTALLATION_DIR/opensearch.yml | awk '{printf $2}')
            $ bash /usr/share/wazuh-indexer/plugins/opensearch-security/tools/securityadmin.sh -cd /usr/share/wazuh-indexer/opensearch-security/ -nhnv -cacert  $CACERT -cert $CERT -key $KEY -p 9200 -icl -h $HOST

         .. note::

            When working on Docker Desktop with a multi-node stack, use the ``multi-node-wazuh1.indexer-1`` IP address instead of the ``$HOST`` variable.

#. Exit the Wazuh indexer container. Refresh the Wazuh dashboard and log in with the new credentials.

.. _wazuh-server-api-users:

Wazuh server API users
----------------------

The ``wazuh-wui`` user is the default user for connecting to the Wazuh server API. Follow these steps to change the password.

.. warning::

   The password for Wazuh server API users must be between 8 and 64 characters long and contain at least one uppercase and lowercase letter, number, and symbol. The Wazuh manager service will fail to start if these requirements are unmet.

#. Open the ``config/wazuh_dashboard/wazuh.yml`` file and modify the value of the ``password`` parameter.

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

      # docker compose down
      # docker compose up -d

Refer to :ref:`logging in to the Wazuh server API via the command line <api_log_in>` to learn more.
