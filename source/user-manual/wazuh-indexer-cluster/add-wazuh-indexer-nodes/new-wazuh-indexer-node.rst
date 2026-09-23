.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install and join a new Wazuh indexer node to an existing Wazuh indexer cluster, and how to test that it joined successfully.

New Wazuh indexer node
======================

Perform the steps in this section on the new Wazuh indexer node to join it to the existing Wazuh indexer cluster. Do this only after completing either the :doc:`All-in-one deployment <all-in-one-deployment>` or the :doc:`Distributed deployment <distributed-deployment>` method.

Installing the Wazuh indexer
----------------------------

Once the certificates have been created and copied to the new Wazuh indexer node, proceed with installing the Wazuh indexer on the new node. These steps apply to both scenarios.

#. Install the package dependencies:

   .. tabs::

      .. group-tab:: YUM

         .. code-block:: console

            # yum install coreutils

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install debconf adduser procps curl

#. Add the Wazuh repository to the new Wazuh indexer node:

   .. tabs::

      .. group-tab:: YUM

         -  For RHEL-compatible systems version 8 and earlier, use the following command:

            .. code-block:: console

               # rpm --import https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH
               # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/\nprotect=1' | tee /etc/yum.repos.d/wazuh.repo

         -  For RHEL-compatible systems version 9 and later, use the following command:

            .. code-block:: console

               # rpm --import https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH
               # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/\npriority=1' | tee /etc/yum.repos.d/wazuh.repo

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install -y gnupg apt-transport-https curl
            # curl -s https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH | gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/wazuh.gpg --import && chmod 644 /usr/share/keyrings/wazuh.gpg
            # echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/ unstable main" | tee -a /etc/apt/sources.list.d/wazuh.list
            # apt-get update

#. Install the Wazuh indexer package:

   .. tabs::

      .. group-tab:: YUM

         .. code-block:: console

            # yum -y install wazuh-indexer

      .. group-tab:: APT

         .. code-block:: console

            # apt-get -y install wazuh-indexer

Deploying the certificates with the deployment script
-----------------------------------------------------

Certificate deployment involves a fixed sequence of extraction, renaming, and permission commands. To automate the process and avoid mistakes, create a ``deploy-certificates.sh`` script on the new node, in the directory where the certificates archive was copied to. Copy the script content from step 5 in the :ref:`Certificates creation and deployment <all_in_one_certificates_creation_and_deployment>` section of All-in-one deployment. The script is the same for both deployment scenarios.

Run the script, passing the name of the new node as defined in ``/root/config.yml``. This deploys the SSL certificates to encrypt communications between the Wazuh central components:

+------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| Scenario               | Command                                                                                                                        |
+========================+================================================================================================================================+
| All-in-one deployment  | ``# bash ./deploy-certificates.sh -i <NEW_WAZUH_INDEXER_NODE_NAME> -t ./wazuh-certificates.tar``                               |
+------------------------+--------------------------------------------------------------------------------------------------------------------------------+
| Distributed deployment | ``# bash ./deploy-certificates.sh -i <NEW_WAZUH_INDEXER_NODE_NAME> -t ./wazuh-certificates-<NEW_WAZUH_INDEXER_NODE_NAME>.tar`` |
+------------------------+--------------------------------------------------------------------------------------------------------------------------------+

The script confirms the deployment and produces the following certificate layout:

+------------------------------+-------------+-------------------+
| File                         | Permissions | Owner             |
+==============================+=============+===================+
| ``/etc/wazuh-indexer/certs`` | ``500``     | ``wazuh-indexer`` |
+------------------------------+-------------+-------------------+
| ``indexer.pem``              | ``400``     | ``wazuh-indexer`` |
+------------------------------+-------------+-------------------+
| ``indexer-key.pem``          | ``400``     | ``wazuh-indexer`` |
+------------------------------+-------------+-------------------+
| ``admin.pem``                | ``400``     | ``wazuh-indexer`` |
+------------------------------+-------------+-------------------+
| ``admin-key.pem``            | ``400``     | ``wazuh-indexer`` |
+------------------------------+-------------+-------------------+
| ``root-ca.pem``              | ``400``     | ``wazuh-indexer`` |
+------------------------------+-------------+-------------------+

.. note::

   Save a copy in a safe storage location for potential future use and scalability. If no other Wazuh components are going to be installed on this node, remove the ``wazuh-certificates.tar`` file by running ``rm -f ./wazuh-certificates*.tar``.

Configuring the new Wazuh indexer node
--------------------------------------

Edit ``/etc/wazuh-indexer/opensearch.yml`` on the new node. Use the same ``cluster.name``, ``discovery.seed_hosts``, and ``plugins.security.nodes_dn`` values that are configured on the existing nodes, and set ``network.host`` and ``node.name`` to the values of the new node.

.. code-block:: yaml

   network.host: "<NEW_WAZUH_INDEXER_IP>"
   node.name: "<NEW_WAZUH_INDEXER_NODE_NAME>"
   cluster.name: "wazuh-cluster"
   cluster.initial_cluster_manager_nodes:
     - "<EXISTING_WAZUH_INDEXER_NODE_NAME>"
   discovery.seed_hosts:
     - "<EXISTING_WAZUH_INDEXER_IP>"
     - "<NEW_WAZUH_INDEXER_IP>"
   plugins.security.nodes_dn:
     - "CN=<EXISTING_WAZUH_INDEXER_NODE_NAME>,OU=Wazuh,O=Wazuh,L=California,C=US"
     - "CN=<NEW_WAZUH_INDEXER_NODE_NAME>,OU=Wazuh,O=Wazuh,L=California,C=US"

Replace the following values:

-  ``<NEW_WAZUH_INDEXER_NODE_NAME>`` and ``<NEW_WAZUH_INDEXER_IP>`` with the name and IP address of the new node, as defined in ``/root/config.yml``.
-  ``<EXISTING_WAZUH_INDEXER_NODE_NAME>`` and ``<EXISTING_WAZUH_INDEXER_IP>`` with the name and IP address of an existing node.

In a distributed deployment with several existing nodes, list every existing node under ``discovery.seed_hosts`` and ``plugins.security.nodes_dn``, exactly as they appear on the existing nodes.

.. note::

   The ``plugins.security.nodes_dn`` list must be identical on every node in the cluster, including the new one. A node whose certificate distinguished name is missing from another node's list is rejected during the TLS handshake.

Starting the service
--------------------

Apply the :ref:`Wazuh indexer cluster tuning <wazuh_indexer_cluster_tuning>` settings on the new node, then run the following commands to start the Wazuh indexer service. A node that joins the cluster with the default 1 GB heap can fail to recover shards and leave the cluster in a red state.

.. code-block:: console

   # systemctl daemon-reload
   # systemctl enable wazuh-indexer
   # systemctl start wazuh-indexer

Cluster initialization
----------------------

A new node joins the cluster through ``discovery.seed_hosts`` and ``plugins.security.nodes_dn`` alone. You do not need to initialize the security configuration again when a node is added, whether the node uses the existing root CA or a new one. Run ``indexer-security-init.sh`` only when the security configuration was never initialized on this cluster, or when you changed the files in ``/etc/wazuh-indexer/opensearch-security/`` and want to load them.

.. warning::

   ``indexer-security-init.sh`` uploads every file in ``/etc/wazuh-indexer/opensearch-security/`` and replaces the security configuration stored in the cluster. Any user, role, or role mapping created from the Wazuh dashboard or the Wazuh indexer API since the last run is lost. Export those objects before running it again on a cluster that is in use.

.. code-block:: console

   # /usr/share/wazuh-indexer/bin/indexer-security-init.sh

.. note::

   Run this command once, on one Wazuh indexer node only. It is not part of adding a node.

The command output looks similar to this:

.. code-block:: none
   :class: output

   Security Admin v7
   Will connect to x.x.x.x:9200 ... done
   Connected as "CN=admin,OU=Wazuh,O=Wazuh,L=California,C=US"
   OpenSearch Version: 3.6.0
   Contacting opensearch cluster 'opensearch' and wait for YELLOW clusterstate ...
   Clustername: wazuh-cluster
   Clusterstate: GREEN
   Number of nodes: 2
   Number of data nodes: 2
   . . .
   Done with success

The output confirms the state of the cluster and the number of nodes it contains:

+-----------------------+-------------------------------------------------+-------------------------------------------------------------------+
| Field                 | Example value                                   | Description                                                       |
+=======================+=================================================+===================================================================+
| Connected as          | ``CN=admin,OU=Wazuh,O=Wazuh,L=California,C=US`` | Identity of the admin certificate used to run the script.         |
+-----------------------+-------------------------------------------------+-------------------------------------------------------------------+
| Clustername           | ``wazuh-cluster``                               | Name of the Wazuh indexer cluster.                                |
+-----------------------+-------------------------------------------------+-------------------------------------------------------------------+
| Clusterstate          | ``GREEN``                                       | Health of the cluster at initialization time.                     |
+-----------------------+-------------------------------------------------+-------------------------------------------------------------------+
| Number of nodes       | ``2``                                           | Total number of nodes, including the new node.                    |
+-----------------------+-------------------------------------------------+-------------------------------------------------------------------+
| Number of data nodes  | ``2``                                           | Number of nodes that store data.                                  |
+-----------------------+-------------------------------------------------+-------------------------------------------------------------------+
| Configuration updates | ``SUCC``                                        | Confirms each security configuration file was created or updated. |
+-----------------------+-------------------------------------------------+-------------------------------------------------------------------+

Confirm that the Wazuh manager communicates with the new Wazuh indexer node by reviewing the indexer connector messages in the Wazuh manager log file. In Wazuh 5.0, this replaces the Filebeat output test used in Wazuh 4.x:

.. code-block:: console

   # grep -i indexer /var/wazuh-manager/logs/wazuh-manager.log

The command output looks similar to this:

.. code-block:: none
   :class: output

   2026/09/09 15:32:05 wazuh-manager-modulesd:inventory-sync-server: INFO: The indexer is reachable; inventory documents can be delivered.
   2026/09/09 15:32:07 wazuh-manager-modulesd:content-updater: INFO: IndexerDownloader: Consumer 'cti:catalog:consumer:vulnerabilities' in index '.wazuh-cti-consumers' is ready. Starting feed download.
   2026/09/09 15:32:07 wazuh-manager-modulesd:content-updater: INFO: IndexerDownloader: Starting incremental update from offset 906452

Testing the cluster
-------------------

After completing the steps above, test your cluster to ensure the indexer node was added successfully. There are two methods to test the cluster: using the validation script and using the Wazuh dashboard console or the Wazuh indexer API.

Using the validation script
^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Create a ``validate-cluster.sh`` script with the following content to automate the checks. The script lists the cluster nodes, retrieves the cluster health, and confirms that the given node is a member of a healthy cluster. It distinguishes a node that is missing from the cluster from a node that cannot be reached or rejects the credentials, so a failed check always names its cause:

   .. code-block:: bash

      #!/bin/bash
      # Wazuh indexer cluster validation script
      # Usage: bash validate-cluster.sh <NODE_NAME> <INDEXER_IP_ADDRESS> <INDEXER_USERNAME> <INDEXER_PASSWORD>
      #
      # Lists the cluster nodes, retrieves the cluster health, and confirms that the
      # given node is a member of the cluster. The credentials are handed to curl
      # through its configuration input instead of its command line, so they do not
      # appear in the process list while the requests run.
      #
      # Exit codes: 0 = validation passed (a yellow cluster is reported as a warning)
      #             1 = validation failed, or the cluster could not be queried

      NODE_NAME=$1
      INDEXER_IP=$2
      INDEXER_USER=$3
      INDEXER_PASSWORD=$4

      if [ -z "$NODE_NAME" ] || [ -z "$INDEXER_IP" ] || [ -z "$INDEXER_USER" ] || [ -z "$INDEXER_PASSWORD" ]; then
        echo "Usage: bash validate-cluster.sh <NODE_NAME> <INDEXER_IP_ADDRESS> <INDEXER_USERNAME> <INDEXER_PASSWORD>"
        exit 1
      fi

      if ! command -v curl > /dev/null 2>&1; then
        echo "FAIL: curl is not installed on this host"
        exit 1
      fi

      BASE="https://$INDEXER_IP:9200"

      # Escape backslashes and double quotes so that any password is valid inside the
      # quoted value of the curl configuration.
      CURL_USER=$(printf '%s:%s' "$INDEXER_USER" "$INDEXER_PASSWORD" | sed 's/[\\"]/\\&/g')

      # request <path>
      # Prints the response body followed by the HTTP status code on the last line.
      # 000 means that no connection could be established.
      request() {
        printf 'user = "%s"\n' "$CURL_USER" | curl -s -k -K - --connect-timeout 10 --max-time 30 -w '\n%{http_code}' "$BASE/$1"
      }

      RESPONSE=$(request "_cat/nodes?v")
      STATUS=${RESPONSE##*$'\n'}
      NODES=${RESPONSE%$'\n'*}
      NODES=${NODES%$'\n'}

      case "$STATUS" in
        200)
          ;;
        000)
          echo "FAIL: cannot connect to $BASE. Confirm that the Wazuh indexer service is running on $INDEXER_IP and that port 9200 is reachable from this host."
          exit 1
          ;;
        401|403)
          echo "FAIL: the Wazuh indexer rejected the credentials for user $INDEXER_USER (HTTP $STATUS). Check the username and password."
          exit 1
          ;;
        *)
          echo "FAIL: unexpected response from $BASE (HTTP $STATUS):"
          echo "$NODES"
          exit 1
          ;;
      esac

      RESPONSE=$(request "_cat/nodes?h=name")
      NODE_NAMES=${RESPONSE%$'\n'*}

      RESPONSE=$(request "_cluster/health?pretty")
      HEALTH=${RESPONSE%$'\n'*}
      HEALTH=${HEALTH%$'\n'}

      echo "$NODES"
      echo "$HEALTH"

      # Match the node name exactly, so that indexer-1 does not match indexer-10.
      if printf '%s\n' "$NODE_NAMES" | tr -d '[:blank:]' | grep -qx -- "$NODE_NAME"; then
        echo "PASS: node $NODE_NAME is listed in the cluster"
      else
        echo "FAIL: node $NODE_NAME is not listed in the cluster"
        exit 1
      fi

      CLUSTER_STATUS=$(printf '%s\n' "$HEALTH" | sed -n 's/.*"status" *: *"\([a-z]*\)".*/\1/p' | head -n 1)

      case "$CLUSTER_STATUS" in
        green)
          echo "PASS: the cluster status is green"
          ;;
        yellow)
          echo "WARNING: the cluster status is yellow. One or more replica shards are unassigned. Review GET _cat/shards?v before continuing."
          ;;
        red)
          echo "FAIL: the cluster status is red. One or more primary shards are unassigned. Review GET _cat/shards?v and GET _cluster/allocation/explain?pretty."
          exit 1
          ;;
        *)
          echo "WARNING: could not determine the cluster status from the response above."
          ;;
      esac

#. Run the script against any Wazuh indexer node, passing the name of the new node:

   .. code-block:: console

      # bash ./validate-cluster.sh <NEW_WAZUH_INDEXER_NODE_NAME> <NEW_WAZUH_INDEXER_IP> <INDEXER_USERNAME> <INDEXER_PASSWORD>

   A successful validation ends with the following results:

   +-----------------+--------------------------------------------------------------------------------------------------------------------------------+
   | Check           | Result                                                                                                                         |
   +=================+================================================================================================================================+
   | Node membership | PASS: node indexer-2 is listed in the cluster                                                                                  |
   +-----------------+--------------------------------------------------------------------------------------------------------------------------------+
   | Cluster health  | PASS: the cluster status is green                                                                                              |
   +-----------------+--------------------------------------------------------------------------------------------------------------------------------+
   | Cluster health  | WARNING: the cluster status is yellow. One or more replica shards are unassigned. Review GET _cat/shards?v before continuing.  |
   +-----------------+--------------------------------------------------------------------------------------------------------------------------------+

   .. note::

      A yellow result exits with code 0 because replicas can still be allocating on a cluster that was just changed. A red result, an unreachable node, rejected credentials, or a node that is not listed all exit with code 1.

Using the Wazuh dashboard console and the Wazuh indexer API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can run the same checks manually from the Wazuh dashboard console, at **Indexer management** > **Dev Tools**, or with the Wazuh indexer API.

Replace ``<INDEXER_USERNAME>``, ``<INDEXER_PASSWORD>``, and ``<INDEXER_IP_ADDRESS>`` with the Wazuh indexer username, password, and IP address values:

+----------------------------------------------------+--------------------------------+---------------------------------------------------------------------------------------------------------------+
| Action                                             | Wazuh dashboard console        | Wazuh indexer API                                                                                             |
+====================================================+================================+===============================================================================================================+
| Confirm the new node joined the cluster            | ``GET _cat/nodes?v``           | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> https://<INDEXER_IP_ADDRESS>:9200/_cat/nodes?v``           |
+----------------------------------------------------+--------------------------------+---------------------------------------------------------------------------------------------------------------+
| Check the cluster health                           | ``GET _cluster/health?pretty`` | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> https://<INDEXER_IP_ADDRESS>:9200/_cluster/health?pretty`` |
+----------------------------------------------------+--------------------------------+---------------------------------------------------------------------------------------------------------------+
| Confirm shards are being allocated to the new node | ``GET _cat/shards/wazuh-*?v``  | ``curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> https://<INDEXER_IP_ADDRESS>:9200/_cat/shards/wazuh-*?v``  |
+----------------------------------------------------+--------------------------------+---------------------------------------------------------------------------------------------------------------+
