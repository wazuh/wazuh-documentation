.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure a Wazuh indexer cluster, connect the Wazuh manager and Wazuh dashboard to it, deploy certificates, tune the cluster, and initialize its security configuration.

Cluster configuration
=====================

A default Wazuh indexer installation includes the ``/etc/wazuh-indexer/opensearch.yml`` configuration file. Edit this file on every node in the Wazuh indexer cluster and configure the following settings. The node names, IP addresses, and certificate Distinguished Names must match the values defined in the ``config.yml`` file used to :ref:`create the certificates <certificates_creation>` during the Wazuh indexer installation.

+-------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Setting                                   | Description                                                                                                                                                                                                                                                                     |
+===========================================+=================================================================================================================================================================================================================================================================================+
| ``network.host``                          | Sets the address of this node for both HTTP and transport traffic. The node binds to this address and also uses it as its publish address. Accepts an IP address or a hostname.                                                                                                 |
+-------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``node.name``                             | Name of the Wazuh indexer node as defined in the ``config.yml`` file. For example, ``indexer-1``.                                                                                                                                                                               |
+-------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cluster.initial_cluster_manager_nodes`` | List of the names of the cluster manager eligible nodes. Used only the first time the cluster starts, to bootstrap the election.                                                                                                                                                |
+-------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``discovery.seed_hosts``                  | List of the addresses of the cluster manager eligible nodes. Each element can be either an IP address or a hostname. You may leave this setting commented for a single-node deployment. For multi-node configurations, set the addresses of each cluster manager eligible node. |
+-------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``plugins.security.nodes_dn``             | List of the distinguished names of the certificates of every Wazuh indexer cluster node.                                                                                                                                                                                        |
+-------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

The following example shows the configuration of the first node of a three-node cluster:

.. code-block:: yaml

   network.host: "10.0.0.10"
   node.name: "indexer-1"

   cluster.initial_cluster_manager_nodes:
     - "indexer-1"
     - "indexer-2"
     - "indexer-3"

   discovery.seed_hosts:
     - "10.0.0.10"
     - "10.0.0.11"
     - "10.0.0.12"

   plugins.security.nodes_dn:
     - "CN=indexer-1,OU=Wazuh,O=Wazuh,L=California,C=US"
     - "CN=indexer-2,OU=Wazuh,O=Wazuh,L=California,C=US"
     - "CN=indexer-3,OU=Wazuh,O=Wazuh,L=California,C=US"

Connecting the Wazuh manager and Wazuh dashboard to the cluster
---------------------------------------------------------------

Configure the Wazuh manager and dashboard components of an existing deployment to connect and communicate with a new Wazuh indexer node.

Wazuh manager
^^^^^^^^^^^^^

#. Save the Wazuh indexer username and password into the Wazuh manager keystore using the ``wazuh-manager-keystore`` tool.

   .. code-block:: console

      # echo '<WAZUH_INDEXER_USERNAME>' | /var/wazuh-manager/bin/wazuh-manager-keystore -f indexer -k username
      # echo '<WAZUH_INDEXER_PASSWORD>' | /var/wazuh-manager/bin/wazuh-manager-keystore -f indexer -k password

   Replace ``<WAZUH_INDEXER_USERNAME>`` and ``<WAZUH_INDEXER_PASSWORD>`` with the Wazuh indexer username and password.

   .. note::

      The default Wazuh indexer connector credentials are ``wazuh-manager:wazuh-manager``.

#. Add one ``<host>`` entry for each Wazuh indexer node in the ``<indexer>`` block of the Wazuh manager ``/var/wazuh-manager/etc/wazuh-manager.conf`` file:

   .. code-block:: xml

      <hosts>
        <host>https://10.0.0.10:9200</host>
        <host>https://10.0.0.11:9200</host>
        <host>https://10.0.0.12:9200</host>
      </hosts>

   The Wazuh manager prioritizes reporting to the first Wazuh indexer node in the list and switches to the next node when that node is not available. The Wazuh manager also checks the overall health of the cluster before sending documents. If the cluster health is red, the Wazuh manager stops sending documents to every node in the list, including nodes that are running and reachable, and retries every 60 seconds until the cluster recovers.

Wazuh dashboard
^^^^^^^^^^^^^^^

Configure the Wazuh dashboard to query all nodes in the cluster by editing ``opensearch.hosts`` in ``/etc/wazuh-dashboard/opensearch_dashboards.yml``, separating the addresses with commas.

**Example**

.. code-block:: json

   ["https://10.0.0.10:9200", "https://10.0.0.11:9200", "https://10.0.0.12:9200"]

.. _wazuh_indexer_cluster_certificates_deployment:

Certificates deployment
-----------------------

Wazuh uses certificates to establish confidentiality and encrypt communications between its central components and between the Wazuh indexer cluster nodes. Follow these steps to create and deploy the certificates.

#. Download the certificates tool and the configuration file:

   .. code-block:: console

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh
      # curl -o config.yml https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/config-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.yml

#. Edit ``config.yml`` and replace the node names and IP values with the corresponding names and IP addresses of all the Wazuh indexer, Wazuh manager, and Wazuh dashboard nodes. Add as many node fields as your deployment requires.

#. Run the certificates tool to create the certificates:

   .. code-block:: console

      # bash ./wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -A

#. Compress all the necessary files and copy the archive to every node in your deployment. You can use the ``scp`` utility or any other secure file transfer method available in your environment:

   .. code-block:: console

      # tar -cvf ./wazuh-certificates.tar -C ./wazuh-certificates/ .
      # scp ./wazuh-certificates.tar <USERNAME>@<TARGET_ENDPOINT_IP>:.

#. On each Wazuh indexer node, deploy the certificates. Replace ``<INDEXER_NODE_NAME>`` with the name of the node you are configuring as defined in ``config.yml``:

   .. code-block:: console

      # NODE_NAME=<INDEXER_NODE_NAME>
      # mkdir -p /etc/wazuh-indexer/certs
      # tar -xf ./wazuh-certificates.tar -C /etc/wazuh-indexer/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./admin.pem ./admin-key.pem ./root-ca.pem
      # mv -n /etc/wazuh-indexer/certs/$NODE_NAME.pem /etc/wazuh-indexer/certs/indexer.pem
      # mv -n /etc/wazuh-indexer/certs/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/indexer-key.pem
      # chmod 500 /etc/wazuh-indexer/certs
      # chmod 400 /etc/wazuh-indexer/certs/*
      # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs

#. Follow these steps to deploy the certificates for the :doc:`Wazuh manager </installation-guide/wazuh-server/step-by-step>` and the :doc:`Wazuh dashboard </installation-guide/wazuh-dashboard/step-by-step>` nodes.

   .. note::

      Store the root CA certificate and key securely, as they are required to sign certificates for new nodes. If you won't install any other Wazuh components on the node, remove the ``wazuh-certificates.tar`` file for security after deploying the certificates using the command: ``rm -rf ./wazuh-certificates.tar``.

.. _wazuh_indexer_cluster_tuning:

Wazuh indexer cluster tuning
----------------------------

A Wazuh indexer installed from the package reserves 1 GB of JVM heap regardless of how much memory the node has. A node deployed with the installation assistant receives about a quarter of the node's memory instead, so an all-in-one deployment starts with a different value. Both allocations can be insufficient for multi-node clusters, where shard recovery after a node restart requires more memory than the parent circuit breaker allows. When that happens, shard recovery fails repeatedly and the cluster can remain in a red state. Check the current value before changing it.

Set the JVM heap size on every Wazuh indexer node, including nodes added to the cluster later, before starting the Wazuh indexer service for the first time.

#. Edit ``/etc/wazuh-indexer/jvm.options`` on every node and set the initial and maximum heap size to half of the node's RAM. The values must be identical so the JVM does not resize the heap at runtime:

   .. code-block:: none

      -Xms4g
      -Xmx4g

#. Confirm the values were applied:

   .. code-block:: console

      # grep -E '^-Xm[sx]' /etc/wazuh-indexer/jvm.options

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      -Xms4g
      -Xmx4g

#. Confirm that memory locking is enabled in ``/etc/wazuh-indexer/opensearch.yml`` on every node. The Wazuh indexer ships the setting already enabled, so do not add a second copy.

   .. code-block:: console

      # grep 'bootstrap.memory_lock' /etc/wazuh-indexer/opensearch.yml

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      bootstrap.memory_lock: true

#. Confirm that the service is allowed to lock unlimited memory:

   .. code-block:: console

      # systemctl show wazuh-indexer -p LimitMEMLOCK

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      LimitMEMLOCK=infinity

   If it is not configured, create the systemd drop-in below:

   .. code-block:: console

      # mkdir -p /etc/systemd/system/wazuh-indexer.service.d
      # printf '[Service]\nLimitMEMLOCK=infinity\n' | tee /etc/systemd/system/wazuh-indexer.service.d/wazuh-indexer.conf
      # systemctl daemon-reload

   .. note::

      Apply these settings before starting the Wazuh indexer service. If the service is already running, restart the nodes one at a time and wait for the cluster to return to a green state between restarts.

Initializing the cluster security
---------------------------------

Apply the :ref:`Wazuh indexer cluster tuning <wazuh_indexer_cluster_tuning>` settings on every node, then start the Wazuh indexer service on every node, and initialize the security configuration once for the whole cluster.

#. Enable and start the Wazuh indexer service on each node:

   .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable wazuh-indexer
      # systemctl start wazuh-indexer

#. Run the ``indexer-security-init.sh`` script on any Wazuh indexer node to load the new certificate information and initialize the multi-node cluster:

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh

   .. note::

      You only have to initialize the cluster once. There is no need to run this command on every node, and you do not need to run it again when new nodes join the cluster.

The Wazuh indexer users are defined in ``/etc/wazuh-indexer/opensearch-security/internal_users.yml``. The default credentials are ``admin:admin``. Change the password with the Wazuh password tool on any Wazuh indexer node. The password must have a length between 8 and 64 characters and contain at least one uppercase letter, one lowercase letter, a number, and one of the following symbols: ``.*+?-``.

.. code-block:: console

   # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-passwords-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh
   # bash wazuh-passwords-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -u admin -p <NEW_PASSWORD>

.. note::

   After changing the admin password, update the Wazuh manager keystore and the Wazuh dashboard configuration with the new credentials. Otherwise, those components can no longer authenticate against the Wazuh indexer.
