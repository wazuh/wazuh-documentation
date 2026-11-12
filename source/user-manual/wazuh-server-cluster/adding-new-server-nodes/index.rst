.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to add a Wazuh manager node to an all-in-one or distributed deployment to scale a Wazuh manager cluster.

.. _wazuh_manager_cluster_adding_wazuh_manager_nodes:

Adding Wazuh manager nodes
==========================

You can scale the Wazuh manager cluster horizontally by adding worker nodes. Additional nodes share the event load of a larger Wazuh agent fleet. With a load balancer in front of the cluster, agents also keep reporting when one node fails.

Every Wazuh 5.x manager is already a cluster node. A manager installed on its own is a master node with no workers. A new worker turns that master into a multi-node cluster.

Requirements for a new node
---------------------------

A new node joins the cluster only when it matches the master node on these points. A worker that breaks one of the first four requirements doesn't join, and ``/var/wazuh-manager/logs/cluster.log`` names the error code.

+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| **Requirement**                                                               | **Why it matters**                                                                                                            |
+===============================================================================+===============================================================================================================================+
| The same Wazuh version as the master node.                                    | The master refuses a worker with a different version (error ``3031``).                                                        |
+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| The same ``<key>`` in the ``<cluster>`` block.                                | The master node can't decrypt the messages of a worker node with another key. It logs error 3025 and closes the connection.   |
+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| The same ``<name>`` in the ``<cluster>`` block.                               | The master refuses a worker from another cluster (error ``3030``).                                                            |
+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| A unique ``<node_name>`` made of letters, digits, ``_``, and ``-.``           | The master refuses a duplicate name, its own name, or a name with other characters (errors ``3028``, ``3029``, and ``3060``). |
+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| Certificates issued by the root certificate authority (CA) of the deployment. | Agents trust one CA. A node issued from another CA fails TLS for every agent that reaches it.                                 |
+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| Network access to the master node on TCP port ``1516.``                       | Every worker opens its cluster connection to the master on this port.                                                         |
+-------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+

The cluster doesn't synchronize ``/etc/wazuh-manager/wazuh-manager.conf`` or the certificates in ``/etc/wazuh-manager/certs/``. You configure and provision each node on its own.

Choose the procedure for your deployment
----------------------------------------

The steps depend on how you installed Wazuh. The difference is where the root CA of the deployment lives and how the Wazuh indexer is exposed.

-  **All-in-one deployment**: The Wazuh indexer, Wazuh manager, and Wazuh dashboard run on one endpoint. You installed them with the installation assistant ``-a`` option or the all-in-one step-by-step guide. See :ref:`Add a Wazuh manager node to all-in-one deployments <wazuh_manager_cluster_add_a_wazuh_manager_node_to_all_in_one_deployments>`.
-  **Distributed deployment**: The components run on separate endpoints, and the root CA depends on how you installed them. See :ref:`Add a Wazuh manager node to distributed deployments <wazuh_manager_cluster_add_a_wazuh_manager_node_to_distributed_deployments>`.

After the new node joins the cluster, put the cluster behind a load balancer so agents reach every node through one address.

.. _wazuh_manager_cluster_add_a_wazuh_manager_node_to_all_in_one_deployments:

Add a Wazuh manager node to all-in-one deployments
--------------------------------------------------

A worker node spreads the Wazuh agent load of an all-in-one deployment across two endpoints. Do it when one endpoint no longer keeps up with your fleet, or before you put the cluster behind a load balancer.

In an all-in-one deployment, the Wazuh indexer, Wazuh manager, and Wazuh dashboard run on one endpoint. Each package keeps its own certificate authority (CA) and the private key of that CA in its ``ca/`` directory: ``/etc/wazuh-indexer/ca``, ``/etc/wazuh-manager/ca``, and ``/etc/wazuh-dashboard/ca``. The Wazuh indexer listens on ``127.0.0.1`` only.

The procedure has four tasks, which you complete in this order:

#. :ref:`Prepare the existing node <wazuh_manager_cluster_prepare_the_existing_node>`.
#. :ref:`Collect the credentials for the new node <wazuh_manager_cluster_collect_the_credentials_for_the_new_node>`.
#. :ref:`Install the new Wazuh manager node <wazuh_manager_cluster_install_the_new_wazuh_manager_node>`.
#. :ref:`Configure the new node as a worker <wazuh_manager_cluster_configure_the_new_node_as_a_worker>`.

Prerequisites
^^^^^^^^^^^^^

Check these requirements before you change the existing node.

-  Root privileges on the existing node and on the new node
-  A new endpoint with an operating system that the Wazuh manager package supports
-  The same Wazuh version on the new node as on the existing node
-  Network access from the new node to the existing node on TCP ports ``1516`` (cluster) and ``9200`` (Wazuh indexer)
-  Synchronized clocks on both nodes, for example with the Network Time Protocol (NTP)

.. _wazuh_manager_cluster_prepare_the_existing_node:

Prepare the existing node
^^^^^^^^^^^^^^^^^^^^^^^^^

The existing node becomes the master node of the cluster. The package wrote a single-node ``<cluster>`` block on it, with :ref:`<bind_addr> <reference_wazuh_manager_conf_cluster_bind_addr>` set to ``127.0.0.1``, so it accepts no remote worker yet. The new node also needs to reach the Wazuh indexer, which listens on ``127.0.0.1`` only.

Complete these steps on the existing node.

#. Print the cluster key, and keep the output for the new node:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-conf get cluster.key

#. Print the cluster name, and keep the output for the new node:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-conf get cluster.name

#. Edit the ``<cluster>`` block in the ``/etc/wazuh-manager/wazuh-manager.conf`` file to accept workers:

   .. code-block:: xml
      :emphasize-lines: 5,9

      <cluster>
        <name>wazuh</name>
        <node_name>master-node</node_name>
        <node_type>master</node_type>
        <key><CLUSTER_KEY></key>
        <port>1516</port>
        <bind_addr>0.0.0.0</bind_addr>
        <nodes>
          <node><MASTER_NODE_IP></node>
        </nodes>
        <hidden>no</hidden>
      </cluster>

   Where:

      -  :ref:`<name> <reference_wazuh_manager_conf_cluster_name>` is the cluster name. Keep the value that step 2 printed.
      -  :ref:`<node_name> <reference_wazuh_manager_conf_cluster_node_name>` is the name of this node in the cluster. You can keep the current name, ``node01`` by default, as long as no worker uses it.
      -  :ref:`<node_type> <reference_wazuh_manager_conf_cluster_node_type>` is ``master`` on this node.
      -  :ref:`<key> <reference_wazuh_manager_conf_cluster_key>` is the cluster key. Replace ``<CLUSTER_KEY>`` with the value that step 1 printed.
      -  :ref:`<port> <reference_wazuh_manager_conf_cluster_port>` is the TCP port the master listens on for workers. The default is ``1516``.
      -  ``<bind_addr>`` is the address the master listens on. ``0.0.0.0`` accepts workers on every interface. The default ``127.0.0.1`` accepts local connections only.
      -  ``<node>`` is the address of the master node. Replace ``<MASTER_NODE_IP>`` with the IP address or DNS name of this node. The values ``localhost``, ``0.0.0.0``, and ``127.0.1.1`` are refused.
      -  :ref:`<hidden> <reference_wazuh_manager_conf_cluster_hidden>` has no effect. The schema accepts it for compatibility.

#. Edit the ``/etc/wazuh-indexer/opensearch.yml`` file and set ``network.host`` to the IP address of this node:

   .. code-block:: yaml

      network.host: "<EXISTING_NODE_IP>"

   -  Replace ``<EXISTING_NODE_IP>`` with an IP address of a network interface of the existing node, such as the private IP address of a cloud instance. The Wazuh indexer certificate already names every such address, so it needs no new certificate.

#. Edit the ``<indexer>`` block in the ``/etc/wazuh-manager/wazuh-manager.conf`` file so the local Wazuh manager connects to the new address:

   .. code-block:: xml

      <indexer>
        <hosts>
          <host>https://<EXISTING_NODE_IP>:9200</host>
        </hosts>
        <ssl>
          <certificate_authorities>
            <ca>/etc/wazuh-manager/certs/indexer-ca.pem</ca>
          </certificate_authorities>
          <certificate>/etc/wazuh-manager/certs/indexer-connector.pem</certificate>
          <key>/etc/wazuh-manager/certs/indexer-connector-key.pem</key>
        </ssl>
      </indexer>

   -  Change only the ``<host>`` value. Keep the ``<ssl>`` settings that the package wrote.

#. Edit the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file and set ``opensearch.hosts`` to the new address:

   .. code-block:: yaml

      opensearch.hosts: ["https://<EXISTING_NODE_IP>:9200"]

#. Validate the Wazuh manager configuration:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-conf validate

   -  The command prints nothing when the file is valid.

#. Restart the Wazuh indexer, the Wazuh manager, and the Wazuh dashboard:

   .. code-block:: console

      # systemctl restart wazuh-indexer
      # systemctl restart wazuh-manager
      # systemctl restart wazuh-dashboard

#. Check that the Wazuh manager reaches the Wazuh indexer at the new address:

   .. code-block:: console

      # grep -E 'The indexer is reachable|No configured indexer host is currently reachable' /var/wazuh-manager/logs/wazuh-manager.log | tail -1

   -  The last line, logged after the restart, must be ``The indexer is reachable; inventory documents can be delivered.`` The Wazuh manager checks the Wazuh indexer every 60 seconds. If the last line is the ``No configured indexer host is currently reachable`` warning, wait one minute and run the command again.

.. _wazuh_manager_cluster_collect_the_credentials_for_the_new_node:

Collect the credentials for the new node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Every node of the cluster must present an agent listener certificate from the same CA. In an all-in-one deployment, that CA is the one the Wazuh manager package created in ``/etc/wazuh-manager/ca``. The new node also needs the Wazuh indexer trust and three passwords. The cluster doesn't copy any of them.

Complete these steps on the existing node.

#. Create a working directory that only ``root`` can read:

   .. code-block:: console

      # install -d -m 0700 /root/new-manager-node

#. Copy the Wazuh manager CA and its private key:

   .. code-block:: console

      # cp /etc/wazuh-manager/ca/root-ca.pem /etc/wazuh-manager/ca/root-ca.key /root/new-manager-node/

   -  The new node uses the private key to issue its own agent listener and Wazuh manager API certificates from this CA.

#. Copy the Wazuh indexer CA and the client pair that the Wazuh indexer issued for the Wazuh manager:

   .. code-block:: console

      # cp /etc/wazuh-indexer/export/ca.pem /etc/wazuh-indexer/export/manager-client.pem /etc/wazuh-indexer/export/manager-client-key.pem /root/new-manager-node/

#. Write the passwords of the deployment into a ``local.env`` file for the new node:

   .. code-block:: console

      # install -m 0600 /dev/null /root/new-manager-node/local.env
      # grep -E '^(WAZUH_MANAGER_API_PASSWORD|WAZUH_MANAGER_WUI_PASSWORD)=' /etc/wazuh-manager/export/credentials.env >> /root/new-manager-node/local.env
      # grep '^WAZUH_INDEXER_MANAGER_PASSWORD=' /etc/wazuh-indexer/export/credentials.env >> /root/new-manager-node/local.env

   -  With the Wazuh manager API passwords, a node promoted to master later comes up with the passwords you already know. The values in ``/etc/wazuh-manager/export/credentials.env`` are current only if nobody changed them with ``rbac_control`` or the Wazuh manager API. The Wazuh indexer password lets the new node write to the Wazuh indexer.

#. Pack the directory and copy the archive to the new node, for example with ``scp``:

   .. code-block:: console

      # tar -cf /root/new-manager-node.tar -C /root/new-manager-node .
      # chmod 600 /root/new-manager-node.tar
      # scp /root/new-manager-node.tar "<USER>@<NEW_NODE_IP>:"

   -  Replace ``<USER>`` with a user on the new node and ``<NEW_NODE_IP>`` with the IP address of the new node.

#. Remove the working directory and the archive from the existing node:

   .. code-block:: console

      # rm -rf /root/new-manager-node /root/new-manager-node.tar

.. warning::

   The archive holds the private key of the Wazuh manager CA and the passwords of the deployment. Keep it only until the installation finishes.

.. _wazuh_manager_cluster_install_the_new_wazuh_manager_node:

Install the new Wazuh manager node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh manager package issues its certificates when you install it. Place the CA and the passwords on the new node **before** you install the package. The package then issues certificates from the deployment CA instead of creating its own CA.

Complete the first step on the existing node and the rest on the new node, in the directory that holds ``new-manager-node.tar``.

#. On the existing node, print the exact version and revision of the installed Wazuh manager package.

   .. tabs::

      .. group-tab:: DEB

         .. code-block:: console

            # dpkg-query -W -f='${Version}\n' wazuh-manager

      .. group-tab:: RPM

         .. code-block:: console

            # rpm -q --qf '%{VERSION}-%{RELEASE}\n' wazuh-manager

   -  The ``cluster_control -l`` output shows the version only, without the package revision.

#. Add the same Wazuh repository that you used for the existing node, as in the :ref:`Wazuh manager installation guide <wazuh_manager_adding_the_repository>`.
#. Extract the archive:

   .. code-block:: console

      # mkdir new-manager-node
      # tar -xf new-manager-node.tar -C new-manager-node

#. Place the CA and the passwords:

   .. code-block:: console

      # [ -d /etc/wazuh-manager ] || install -d -m 0750 -o root -g root /etc/wazuh-manager
      # install -d -m 0700 -o root -g root /etc/wazuh-manager/ca
      # install -m 0644 -o root -g root new-manager-node/root-ca.pem /etc/wazuh-manager/ca/root-ca.pem
      # install -m 0400 -o root -g root new-manager-node/root-ca.key /etc/wazuh-manager/ca/root-ca.key
      # install -m 0600 -o root -g root new-manager-node/local.env /etc/wazuh-manager/local.env

   If agents reach this node through a load balancer, add the addresses its agent listener certificate must name. The value replaces the addresses the package discovers, so list the address of this node too:

   .. code-block:: console

      # echo "WAZUH_MANAGER_REMOTED_CERT_SANS='DNS:<AGENT_FACING_NAME>,IP:<NEW_NODE_IP>'" >> /etc/wazuh-manager/local.env

   -  Replace ``<AGENT_FACING_NAME>`` with the name agents dial on the load balancer.

#. Install the Wazuh manager package at the version that step 1 printed.

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get -y install "wazuh-manager=<VERSION>-<REVISION>"

      .. group-tab:: Yum

         .. code-block:: console

            # yum -y install "wazuh-manager-<VERSION>-<REVISION>"

      .. group-tab:: DNF

         .. code-block:: console

            # dnf -y install "wazuh-manager-<VERSION>-<REVISION>"

   -  Replace ``<VERSION>-<REVISION>`` with the output of step 1. To check that your repository has that version, run ``apt-cache madison wazuh-manager`` or ``yum --showduplicates list wazuh-manager``. The master refuses a worker with another version (error ``3031``).
   -  During the installation, the package prints ``MISSING /etc/wazuh-manager/certs/indexer-ca.pem`` and ``MISSING /etc/wazuh-manager/certs/indexer-connector.pem``. The next step places these files.

#. Place the Wazuh indexer CA and client pair under the names the package expects:

   .. code-block:: console

      # install -m 0640 -o root -g wazuh-manager new-manager-node/ca.pem /etc/wazuh-manager/certs/indexer-ca.pem
      # install -m 0640 -o root -g wazuh-manager new-manager-node/manager-client.pem /etc/wazuh-manager/certs/indexer-connector.pem
      # install -m 0640 -o root -g wazuh-manager new-manager-node/manager-client-key.pem /etc/wazuh-manager/certs/indexer-connector-key.pem

#. Check that the agent listener certificate of the new node chains to the deployment CA:

   .. code-block:: console

      # openssl verify -CAfile /etc/wazuh-manager/ca/root-ca.pem /etc/wazuh-manager/certs/remoted.pem

   -  The command prints ``/etc/wazuh-manager/certs/remoted.pem: OK``.

#. Check the credentials:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --check -H /var/wazuh-manager

   -  The command prints ``check: no problem found``.

#. Remove the CA private key and the extracted files from the new node:

   .. code-block:: console

      # rm -f /etc/wazuh-manager/ca/root-ca.key
      # rm -rf new-manager-node new-manager-node.tar

   -  The package needs ``root-ca.key`` only to issue the certificates of this node. Without it, the node validates its certificates against ``root-ca.pem`` at every start.

.. _wazuh_manager_cluster_configure_the_new_node_as_a_worker:

Configure the new node as a worker
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The package wrote a single-node ``<cluster>`` block with a random key and ``<node_type>`` set to ``master``. Replace it so the node joins the existing cluster as a worker. The cluster doesn't synchronize ``wazuh-manager.conf``, so this node needs its own ``<indexer>`` settings too.

Complete these steps on the new node.

#. Edit the ``<indexer>`` block in the ``/etc/wazuh-manager/wazuh-manager.conf`` file to point to the Wazuh indexer on the existing node:

   .. code-block:: xml
      :emphasize-lines: 3

      <indexer>
        <hosts>
          <host>https://<EXISTING_NODE_IP>:9200</host>
        </hosts>
        <ssl>
          <certificate_authorities>
            <ca>/etc/wazuh-manager/certs/indexer-ca.pem</ca>
          </certificate_authorities>
          <certificate>/etc/wazuh-manager/certs/indexer-connector.pem</certificate>
          <key>/etc/wazuh-manager/certs/indexer-connector-key.pem</key>
        </ssl>
      </indexer>

   -  Change only the ``<host>`` value. Keep the ``<ssl>`` settings that the package wrote.

#. Edit the ``<cluster>`` block in the same file:

   .. code-block:: xml
      :emphasize-lines: 5,9

      <cluster>
        <name>wazuh</name>
        <node_name>worker-node-01</node_name>
        <node_type>worker</node_type>
        <key><CLUSTER_KEY></key>
        <port>1516</port>
        <bind_addr>0.0.0.0</bind_addr>
        <nodes>
          <node><MASTER_NODE_IP></node>
        </nodes>
        <hidden>no</hidden>
      </cluster>

   Where:

      -  ``<name>`` must equal the cluster name of the master node.
      -  ``<node_name>`` is a unique name for this worker. Use only letters, digits, ``_``, and ``-``.
      -  ``<node_type>`` is ``worker``.
      -  ``<key>`` is the key of the master node. Replace ``<CLUSTER_KEY>`` with the value you printed on the existing node.
      -  ``<port>`` is the cluster port of the master node.
      -  ``<bind_addr>`` is ignored on a worker. Workers do not listen for cluster connections.
      -  ``<node>`` is the address of the master node. Replace ``<MASTER_NODE_IP>`` with the value you set on the existing node.

   -  For every option, see the :doc:`cluster configuration reference </user-manual/reference/wazuh-manager-conf/cluster>`.

#. Validate the configuration:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-conf validate

   -  The command prints nothing when the file is valid.

#. Enable and start the Wazuh manager service:

   .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable wazuh-manager
      # systemctl restart wazuh-manager

Verify the cluster
^^^^^^^^^^^^^^^^^^

Confirm that the new node joined the cluster and writes to the Wazuh indexer.

#. On the new node, check that the Wazuh manager reaches the Wazuh indexer:

   .. code-block:: console

      # grep -E 'The indexer is reachable|No configured indexer host is currently reachable' /var/wazuh-manager/logs/wazuh-manager.log | tail -1

   -  The last line, logged after the start, must be ``The indexer is reachable; inventory documents can be delivered.`` The Wazuh manager checks the Wazuh indexer every 60 seconds. If the last line is the ``No configured indexer host is currently reachable`` warning, wait one minute and run the command again.

#. On any node, list the cluster nodes:

   .. code-block:: console

      # /var/wazuh-manager/bin/cluster_control -l

   -  The output lists both nodes with the same version.

   .. code-block:: none
      :class: output

      NAME            TYPE    VERSION  ADDRESS
      master-node     master  5.0.0    10.0.0.3
      worker-node-01  worker  5.0.0    10.0.0.4

   -  If the worker is missing, read ``/var/wazuh-manager/logs/cluster.log`` on the worker and on the master node. The error code names the requirement it breaks. A key mismatch shows error 3025 on the master node only.

Next steps
^^^^^^^^^^

Put both nodes behind a `load balancer <https://docs.google.com/document/u/0/d/1mDL4DJPkg-gqVvkYlyNpwczBxOI_-2UpRH7kx7HWl4k/edit>`__, so agents keep reporting when one node fails.

.. _wazuh_manager_cluster_add_a_wazuh_manager_node_to_distributed_deployments:

Add a Wazuh manager node to distributed deployments
---------------------------------------------------

A worker node raises the number of Wazuh agents a distributed deployment serves, without reconfiguring the agents. Do it when the existing nodes approach their capacity, or to keep agents reporting when one node fails.

In a distributed deployment, the Wazuh indexer, Wazuh manager, and Wazuh dashboard run on separate endpoints. Where the private key of the root certificate authority (CA), ``root-ca.key``, stays depends on the installation method:

-  **Installation assistant deployment**: In the ``wazuh-ca`` directory next to ``wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh``, on the endpoint where you ran ``--generate-config-files``, or in the directory set in ``WAZUH_CA_DIR``.
-  **Step-by-step deployment**: In ``/etc/wazuh-indexer/ca`` on the first Wazuh indexer node. This root CA issues the Wazuh indexer client certificate of each Wazuh manager node. If ``/etc/wazuh-manager/ca`` on the master node also holds ``root-ca.key``, the Wazuh manager nodes issue their agent listener and Wazuh manager API certificates from that CA.

You issue the certificates of the new node on that endpoint, from that root CA. A node issued from another root CA doesn't work in the cluster. If no endpoint holds root-ca.key, see :ref:`Missing root CA <wazuh_manager_cluster_missing_root_ca>`.

The procedure has three tasks, which you complete in this order:

#. :ref:`Issue the certificates for the new node <wazuh_manager_cluster_issue_the_certificates_for_the_new_node>`.
#. :ref:`Install the new Wazuh manager node <wazuh_manager_cluster_install_the_new_wazuh_manager_node_2>`.
#. :ref:`Configure the new node as a worker <wazuh_manager_cluster_configure_the_new_node_as_a_worker_2>`.

Prerequisites
^^^^^^^^^^^^^

Check these requirements before you issue the certificates.

-  Root privileges on the endpoint that holds the root CA and on the new node
-  A new endpoint with an operating system that the Wazuh manager package supports
-  The same Wazuh version on the new node as on the master node
-  Network access from the new node to the master node on TCP port ``1516``, and to every Wazuh indexer node on TCP port ``9200``
-  Synchronized clocks on every node, for example with the Network Time Protocol (NTP)
-  A master node that accepts remote workers

If the deployment has a single Wazuh manager node, its ``<cluster>`` block still has :ref:`<bind_addr> <reference_wazuh_manager_conf_cluster_bind_addr>` set to ``127.0.0.1``. Configure that node as a master, as in steps 1 to 3 of :ref:`Prepare the existing node <wazuh_manager_cluster_prepare_the_existing_node>` in the all-in-one procedure. Then run ``/var/wazuh-manager/bin/wazuh-manager-conf validate`` and ``systemctl restart wazuh-manager`` on that node.

.. warning::

   Don't run ``wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh --generate-config-files`` again to add the node. It generates a new cluster key, so a node installed from the new bundle does not join the cluster. Do not run the certificates tool with ``-A`` or ``-ca`` on an endpoint without the root CA either. Both options create a new root CA there. Create a new root CA only to :ref:`replace a lost root CA <wazuh_manager_cluster_replace_a_lost_root_ca>`.

.. _wazuh_manager_cluster_issue_the_certificates_for_the_new_node:

Issue the certificates for the new node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh certificates tool issues three pairs from the root CA for each Wazuh manager node. They are the agent listener pair, the Wazuh manager API pair, and the Wazuh indexer client pair.

Complete these steps on the endpoint that holds ``root-ca.key``.

#. Set ``CA_DIR`` to the directory of the root CA:

   .. code-block:: console

      # CA_DIR="<ROOT_CA_DIRECTORY>"

   -  Replace ``<ROOT_CA_DIRECTORY>`` with ``/etc/wazuh-indexer/ca`` in a step-by-step deployment, or with the absolute path of the ``wazuh-ca`` directory in an installation assistant deployment.

#. Create a working directory and copy the certificates tool into it:

   .. code-block:: console

      # mkdir -p ~/certs-tool && cd ~/certs-tool
      # cp /usr/share/wazuh-indexer/tools/wazuh-certs-tool.sh ~/certs-tool/

   The Wazuh indexer package ships this copy of the tool. Work on a copy, so the new ``config.yml`` and certificates don't replace the files of the deployment in ``/usr/share/wazuh-indexer/tools/``. On an endpoint without the Wazuh indexer, `download the tool <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh>`__ to the same path instead:

   .. code-block:: console

      # curl -fsSo ~/certs-tool/wazuh-certs-tool.sh https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh

#. Create the ``~/certs-tool/config.yml`` file with the new node only:

   .. code-block:: yaml

      nodes:
        manager:
          - name: <NEW_NODE_NAME>
            ip: "<NEW_NODE_IP>"

   -  Replace ``<NEW_NODE_NAME>`` with a name for the new node and ``<NEW_NODE_IP>`` with its IP address. Leave out ``node_type``, because the tool accepts it only with more than one Wazuh manager node.

#. Create the Wazuh manager certificates from the root CA:

   .. code-block:: console

      # rm -rf wazuh-certificates
      # WAZUH_CA_DIR="$CA_DIR" bash ~/certs-tool/wazuh-certs-tool.sh -wm

   -  If the other Wazuh manager nodes were issued with ``--agent-san`` or ``--api-san``, pass the same addresses, for example ``--agent-san <AGENT_FACING_ADDRESS>``. The new node then answers on the address agents dial through the load balancer.
   -  The ``-wm`` option only uses an existing root CA. Elsewhere, it stops with ``There is no valid root CA in …`` or ``The root CA in … has no private key (root-ca.key)``. See :ref:`Find the root CA of the deployment <wazuh_manager_cluster_find_the_root_ca_of_the_deployment>`.

#. Check that the new certificates chain to the root CA:

   .. code-block:: console

      # openssl verify -CAfile "$CA_DIR/root-ca.pem" "wazuh-certificates/<NEW_NODE_NAME>-remoted.pem"
      # openssl verify -CAfile "$CA_DIR/root-ca.pem" "wazuh-certificates/<NEW_NODE_NAME>-apid.pem"

   -  Each command prints ``OK``.

#. Copy the two password files to the working directory on this endpoint, for example with ``sudo cat`` over SSH:

   .. code-block:: console

      # install -m 0600 /dev/null manager-credentials.env
      # install -m 0600 /dev/null indexer-credentials.env
      # ssh "<USER>@<MASTER_NODE_IP>" sudo cat /etc/wazuh-manager/export/credentials.env > manager-credentials.env
      # ssh "<USER>@<WAZUH_INDEXER_IP>" sudo cat /etc/wazuh-indexer/export/credentials.env > indexer-credentials.env

   -  Both files are readable by ``root`` only, so the copy needs root privileges on the source endpoint. Replace ``<USER>`` with a user that can run ``sudo`` there without a password prompt, or have root copy the files another way. Replace ``<MASTER_NODE_IP>`` and ``<WAZUH_INDEXER_IP>`` with the node addresses. The first file holds the Wazuh manager API passwords, current only if nobody changed them with ``rbac_control`` or the Wazuh manager API. The second file holds the Wazuh indexer password.

#. Add the passwords of the deployment to the certificates directory, and remove the copies:

   .. code-block:: console

      # install -m 0600 /dev/null wazuh-certificates/credentials.env
      # grep -E '^(WAZUH_MANAGER_API_PASSWORD|WAZUH_MANAGER_WUI_PASSWORD)=' manager-credentials.env >> wazuh-certificates/credentials.env
      # grep '^WAZUH_INDEXER_MANAGER_PASSWORD=' indexer-credentials.env >> wazuh-certificates/credentials.env
      # rm -f manager-credentials.env indexer-credentials.env

#. Pack the certificates and copy the archive to the new node, for example with ``scp``:

   .. code-block:: console

      # tar -cf wazuh-certificates.tar -C wazuh-certificates/ .
      # chmod 600 wazuh-certificates.tar
      # scp wazuh-certificates.tar "<USER>@<NEW_NODE_IP>:"

#. Remove the ``wazuh-certificates`` directory and the archive from this endpoint:

   .. code-block:: console

      # rm -rf wazuh-certificates wazuh-certificates.tar

.. warning::

   The archive holds private keys and the passwords of the deployment. Keep it only until the installation finishes.

.. _wazuh_manager_cluster_install_the_new_wazuh_manager_node_2:

Install the new Wazuh manager node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Place the certificates and the passwords on the new node **before** you install the package. The package then uses these files instead of creating a CA and certificates of its own. If the package already created its own CA, see :ref:`Fix a node that created its own CA <wazuh_manager_cluster_fix_a_node_that_created_its_own_ca>`.

Complete the first step on the master node and the rest on the new node, in the directory that holds ``wazuh-certificates.tar``.

#. On the master node, print the exact version and revision of the installed Wazuh manager package.

   .. tabs::

      .. group-tab:: DEB

         .. code-block:: console

            # dpkg-query -W -f='${Version}\n' wazuh-manager

      .. group-tab:: RPM

         .. code-block:: console

            # rpm -q --qf '%{VERSION}-%{RELEASE}\n' wazuh-manager

   -  The ``cluster_control -l`` output shows the version only, without the package revision.

#. Add the Wazuh repository, as in the :ref:`Wazuh manager installation guide <wazuh_manager_adding_the_repository>`. A node installed with the installation assistant has no repository to reuse, because the assistant downloads the package directly.
#. Set the name of the new node, as you wrote it in ``config.yml``:

   .. code-block:: console

      # NODE_NAME="<NEW_NODE_NAME>"

#. Place the root CA, the passwords, and the certificates of the node.

   .. tabs::

      .. group-tab:: Installation assistant deployment

         **Installation assistant deployment**, or **step-by-step** deployment whose master node has no ``root-ca.key``

         .. code-block:: console

            # umask 022
            # mkdir wazuh-certificates
            # tar -xf wazuh-certificates.tar -C wazuh-certificates
            # [ -d /etc/wazuh-manager ] || install -d -m 0750 -o root -g root /etc/wazuh-manager
            # [ -d /etc/wazuh-manager/certs ] || install -d -m 0750 -o root -g root /etc/wazuh-manager/certs
            # install -d -m 0700 -o root -g root /etc/wazuh-manager/ca
            # install -m 0644 wazuh-certificates/root-ca.pem /etc/wazuh-manager/ca/root-ca.pem
            # install -m 0600 /dev/null /etc/wazuh-manager/local.env
            # grep -E '^(WAZUH_MANAGER_API_PASSWORD|WAZUH_MANAGER_WUI_PASSWORD|WAZUH_INDEXER_MANAGER_PASSWORD)=' wazuh-certificates/credentials.env > /etc/wazuh-manager/local.env
            # install -m 0640 wazuh-certificates/root-ca.pem /etc/wazuh-manager/certs/root-ca.pem
            # install -m 0640 wazuh-certificates/root-ca.pem /etc/wazuh-manager/certs/indexer-ca.pem
            # install -m 0640 wazuh-certificates/$NODE_NAME.pem /etc/wazuh-manager/certs/indexer-connector.pem
            # install -m 0640 wazuh-certificates/$NODE_NAME-key.pem /etc/wazuh-manager/certs/indexer-connector-key.pem
            # install -m 0640 wazuh-certificates/$NODE_NAME-remoted.pem /etc/wazuh-manager/certs/remoted.pem
            # install -m 0640 wazuh-certificates/$NODE_NAME-remoted-key.pem /etc/wazuh-manager/certs/remoted-key.pem
            # install -m 0640 wazuh-certificates/$NODE_NAME-apid.pem /etc/wazuh-manager/certs/apid.pem
            # install -m 0640 wazuh-certificates/$NODE_NAME-apid-key.pem /etc/wazuh-manager/certs/apid-key.pem
            # rm -rf wazuh-certificates wazuh-certificates.tar

         -  The root CA of the deployment also signed the Wazuh indexer certificates, so it goes in place as ``indexer-ca.pem`` too. The ``wazuh-manager`` group does not exist yet. You give the files that group after the installation.

      .. group-tab:: Step-by-step deployment

         Use this variant only when ``/etc/wazuh-manager/ca`` on the master node holds ``root-ca.key``. In that case, the Wazuh manager package created the CA, and every Wazuh manager node issues its certificates from it. Pack that root CA and copy it to the new node, as in :ref:`Deploying certificates and passwords <wazuh_manager_deploying_certificates>`. Run these commands on the master node, or on a worker node if you removed ``root-ca.key`` from the master node:

         .. code-block:: console

            # tar -cf manager-ca.tar -C /etc/wazuh-manager/ca root-ca.pem root-ca.key
            # chmod 600 manager-ca.tar
            # scp manager-ca.tar "<USER>@<NEW_NODE_IP>:"
            # rm -f manager-ca.tar

         On the new node, in the directory that holds both archives, place the root CA, the passwords, and the Wazuh indexer client certificate:

         .. code-block:: console

            # umask 022
            # mkdir wazuh-certificates
            # tar -xf wazuh-certificates.tar -C wazuh-certificates
            # [ -d /etc/wazuh-manager ] || install -d -m 0750 -o root -g root /etc/wazuh-manager
            # [ -d /etc/wazuh-manager/certs ] || install -d -m 0750 -o root -g root /etc/wazuh-manager/certs
            # install -d -m 0700 -o root -g root /etc/wazuh-manager/ca
            # tar -xf manager-ca.tar -C /etc/wazuh-manager/ca
            # chown root:root /etc/wazuh-manager/ca/root-ca.pem /etc/wazuh-manager/ca/root-ca.key
            # chmod 0644 /etc/wazuh-manager/ca/root-ca.pem
            # chmod 0400 /etc/wazuh-manager/ca/root-ca.key
            # install -m 0600 /dev/null /etc/wazuh-manager/local.env
            # grep -E '^(WAZUH_MANAGER_API_PASSWORD|WAZUH_MANAGER_WUI_PASSWORD|WAZUH_INDEXER_MANAGER_PASSWORD)=' wazuh-certificates/credentials.env > /etc/wazuh-manager/local.env
            # echo 'WAZUH_MANAGER_REMOTED_CERT_SANS=IP:<NEW_NODE_IP>,DNS:<LOAD_BALANCER_NAME>' >> /etc/wazuh-manager/local.env
            # install -m 0640 wazuh-certificates/root-ca.pem /etc/wazuh-manager/certs/indexer-ca.pem
            # install -m 0640 wazuh-certificates/$NODE_NAME.pem /etc/wazuh-manager/certs/indexer-connector.pem
            # install -m 0640 wazuh-certificates/$NODE_NAME-key.pem /etc/wazuh-manager/certs/indexer-connector-key.pem
            # rm -rf wazuh-certificates wazuh-certificates.tar manager-ca.tar

         -  Replace ``<NEW_NODE_IP>`` with the IP address of the new node and ``<LOAD_BALANCER_NAME>`` with the address that Wazuh agents use to reach the load balancer. Without a load balancer, leave out the ``WAZUH_MANAGER_REMOTED_CERT_SANS`` line. You issue the agent listener and Wazuh manager API certificates in step 6.

#. Install the Wazuh manager package at the version that step 1 printed.

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get -y install "wazuh-manager=<VERSION>-<REVISION>"

      .. group-tab:: Yum

         .. code-block:: console

            # yum -y install "wazuh-manager-<VERSION>-<REVISION>"

      .. group-tab:: DNF

         .. code-block:: console

            # dnf -y install "wazuh-manager-<VERSION>-<REVISION>"

   -  Replace ``<VERSION>-<REVISION>`` with the output of step 1. To check that your repository has that version, run ``apt-cache madison wazuh-manager`` or ``yum --showduplicates list wazuh-manager``. The master refuses a worker with another version (error ``3031``).
   -  On RPM-based systems, the installation prints ``UNSAFE /etc/wazuh-manager/certs/<FILE>.pem: group is root, not wazuh-manager`` for the files you placed. The next step fixes it.

#. Give the staged certificates the ``wazuh-manager`` group, and run the credential resolver again:

   .. code-block:: console

      # chown root:wazuh-manager /etc/wazuh-manager/certs /etc/wazuh-manager/certs/*.pem
      # chmod 750 /etc/wazuh-manager/certs
      # chmod 640 /etc/wazuh-manager/certs/*.pem
      # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --upgrade -H /var/wazuh-manager

   If you used the step-by-step variant in step 4, replace the last command with this one. It issues the agent listener and Wazuh manager API certificates from the root CA of the master node:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --install -H /var/wazuh-manager

   -  The resolver runs during the installation, before the staged files have the ``wazuh-manager`` group, so it runs again here. The installation assistant runs the same commands after it installs a Wazuh manager node.

#. Check the credentials:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --check -H /var/wazuh-manager

The command ends with ``check: no problem found (1 warnings)``. The warning reports that the dashboard client pair wasn't generated, because ``/etc/wazuh-manager/ca`` holds no CA key. It doesn't stop the node from starting or joining the cluster. When ``/etc/wazuh-manager/ca`` holds ``root-ca.key``, as in the step-by-step variant, it ends with ``check: no problem found``.

.. _wazuh_manager_cluster_configure_the_new_node_as_a_worker_2:

Configure the new node as a worker
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The package wrote a single-node ``<cluster>`` block with a random key and :ref:`<node_type> <reference_wazuh_manager_conf_cluster_node_type>` set to ``master``. Replace it so the node joins the existing cluster as a worker. The cluster doesn't synchronize ``wazuh-manager.conf``, so this node needs its own ``<indexer>`` settings too.

Complete the first step on the master node and the rest on the new node.

#. On the master node, print the cluster name and key:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-conf get cluster.name
      # /var/wazuh-manager/bin/wazuh-manager-conf get cluster.key

   -  The installation assistant sets the cluster name to ``wazuh_cluster`` when its ``config.yml`` lists more than one Wazuh manager node. Otherwise the name is the package default, ``wazuh``.

#. Edit the ``<indexer>`` block in the ``/etc/wazuh-manager/wazuh-manager.conf`` file with one ``<host>`` per Wazuh indexer node:

   .. code-block:: xml
      :emphasize-lines: 3,4

      <indexer>
        <hosts>
          <host>https://<WAZUH_INDEXER_1_IP>:9200</host>
          <host>https://<WAZUH_INDEXER_2_IP>:9200</host>
        </hosts>
        <ssl>
          <certificate_authorities>
            <ca>/etc/wazuh-manager/certs/indexer-ca.pem</ca>
          </certificate_authorities>
          <certificate>/etc/wazuh-manager/certs/indexer-connector.pem</certificate>
          <key>/etc/wazuh-manager/certs/indexer-connector-key.pem</key>
        </ssl>
      </indexer>

   -  Replace ``<WAZUH_INDEXER_1_IP>`` and ``<WAZUH_INDEXER_2_IP>`` with the addresses of your Wazuh indexer nodes. Change only the ``<host>`` values, and keep the ``<ssl>`` settings that the package wrote.

#. Edit the ``<cluster>`` block in the same file:

   .. code-block:: xml
      :emphasize-lines: 2,3,5,9

      <cluster>
        <name><CLUSTER_NAME></name>
        <node_name><NEW_NODE_NAME></node_name>
        <node_type>worker</node_type>
        <key><CLUSTER_KEY></key>
        <port>1516</port>
        <bind_addr>0.0.0.0</bind_addr>
        <nodes>
          <node><MASTER_NODE_IP></node>
        </nodes>
        <hidden>no</hidden>
      </cluster>

   Where:

      -  :ref:`<name> <reference_wazuh_manager_conf_cluster_name>` must equal the cluster name of the master node. Replace ``<CLUSTER_NAME>`` with the value that step 1 printed.
      -  :ref:`<node_name> <reference_wazuh_manager_conf_cluster_node_name>` is a unique name for this worker. Use only letters, digits, ``_``, and ``-``. Replace ``<NEW_NODE_NAME>`` with the node name, for example its name in ``config.yml``.
      -  ``<node_type>`` is ``worker``.
      -  :ref:`<key> <reference_wazuh_manager_conf_cluster_key>` is the key of the master node. Replace ``<CLUSTER_KEY>`` with the value that step 1 printed.
      -  :ref:`<port> <reference_wazuh_manager_conf_cluster_port>` is the cluster port of the master node. The default is ``1516``.
      -  ``<bind_addr>`` is ignored on a worker. Workers do not listen for cluster connections.
      -  ``<node>`` is the address of the master node. Replace ``<MASTER_NODE_IP>`` with its IP address or DNS name.

   -  For every option, see the :doc:`cluster configuration reference </user-manual/reference/wazuh-manager-conf/cluster>`.

#. Validate the configuration:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-conf validate

   -  The command prints nothing when the file is valid.

#. Enable and start the Wazuh manager service:

   .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable wazuh-manager
      # systemctl restart wazuh-manager

Verify the cluster
^^^^^^^^^^^^^^^^^^

Confirm that the new node joined the cluster and writes to the Wazuh indexer.

#. On the new node, check that the Wazuh manager reaches the Wazuh indexer:

   .. code-block:: console

      # grep -E 'The indexer is reachable|No configured indexer host is currently reachable' /var/wazuh-manager/logs/wazuh-manager.log | tail -1

   -  The last line, logged after the start, must be ``The indexer is reachable; inventory documents can be delivered.`` The Wazuh manager checks the Wazuh indexer every 60 seconds. If the last line is the ``No configured indexer host is currently reachable`` warning, wait one minute and run the command again.

#. On any node, list the cluster nodes:

   .. code-block:: console

      # /var/wazuh-manager/bin/cluster_control -l

   -  The output lists every node with the same version.

   .. code-block:: none
      :class: output

      NAME      TYPE    VERSION  ADDRESS
      master    master  5.0.0    10.0.0.3
      worker    worker  5.0.0    10.0.0.4
      worker-2  worker  5.0.0    10.0.0.5

   -  If the new node is missing, read ``/var/wazuh-manager/logs/cluster.log`` on it. The error code names the requirement it breaks.

The Wazuh dashboard needs no change. It connects to the Wazuh manager API, which runs on the master node only.

Next steps
^^^^^^^^^^

If agents reach the cluster through a load balancer, add the new node to the load balancer backend.

