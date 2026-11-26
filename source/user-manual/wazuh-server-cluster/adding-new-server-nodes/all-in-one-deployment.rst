.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to add a Wazuh manager node to an all-in-one deployment to scale a Wazuh manager cluster.

.. _wazuh_manager_cluster_add_a_wazuh_manager_node_to_all_in_one_deployments:

Add a Wazuh manager node to all-in-one deployments
==================================================

A worker node spreads the Wazuh agent load of an all-in-one deployment across two endpoints. Do it when one endpoint no longer keeps up with your fleet, or before you put the cluster behind a load balancer.

In an all-in-one deployment, the Wazuh indexer, Wazuh manager, and Wazuh dashboard run on one endpoint. Each package keeps its own certificate authority (CA) and the private key of that CA in its ``ca/`` directory: ``/etc/wazuh-indexer/ca``, ``/etc/wazuh-manager/ca``, and ``/etc/wazuh-dashboard/ca``. The Wazuh indexer listens on ``127.0.0.1`` only.

The procedure has four tasks, which you complete in this order:

#. :ref:`Prepare the existing node <wazuh_manager_cluster_prepare_the_existing_node>`.
#. :ref:`Collect the credentials for the new node <wazuh_manager_cluster_collect_the_credentials_for_the_new_node>`.
#. :ref:`Install the new Wazuh manager node <wazuh_manager_cluster_install_the_new_wazuh_manager_node>`.
#. :ref:`Configure the new node as a worker <wazuh_manager_cluster_configure_the_new_node_as_a_worker>`.

Prerequisites
-------------

Check these requirements before you change the existing node.

-  Root privileges on the existing node and on the new node
-  A new endpoint with an operating system that the Wazuh manager package supports
-  The same Wazuh version on the new node as on the existing node
-  Network access from the new node to the existing node on TCP ports ``1516`` (cluster) and ``9200`` (Wazuh indexer)
-  Synchronized clocks on both nodes, for example with the Network Time Protocol (NTP)

.. _wazuh_manager_cluster_prepare_the_existing_node:

Prepare the existing node
-------------------------

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
      -  ``<node>`` is the address of the master node. Replace ``<MASTER_NODE_IP>`` with the IP address or DNS name of this node. The values ``localhost``, ``0.0.0.0``, and ``127.0.1.1`` aren't valid. The cluster daemon refuses them at start with error 3004, and ``wazuh-manager-conf validate`` doesn't check them.
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
        </ssl>
      </indexer>

   -  Change only the ``<host>`` value. Keep the ``<ssl>`` settings that the package wrote.

#. Edit the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file and set ``opensearch.hosts`` to the new address:

   .. code-block:: yaml

      opensearch.hosts: ["https://<EXISTING_NODE_IP>:9200"]

#. Validate the Wazuh manager configuration:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-conf validate

   -  The command prints ``/etc/wazuh-manager/wazuh-manager.conf: configuration is valid``.

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
----------------------------------------

Every node of the cluster must present an agent listener certificate from the same CA. In an all-in-one deployment, that CA is the one the Wazuh manager package created in ``/etc/wazuh-manager/ca``. The new node also needs the Wazuh indexer trust and three passwords. The cluster doesn't copy any of them.

Complete these steps on the existing node.

#. Create a working directory that only ``root`` can read:

   .. code-block:: console

      # install -d -m 0700 /root/new-manager-node

#. Copy the Wazuh manager CA and its private key:

   .. code-block:: console

      # cp /etc/wazuh-manager/ca/root-ca.pem /etc/wazuh-manager/ca/root-ca.key /root/new-manager-node/

   -  The new node uses the private key to issue its own agent listener and Wazuh manager API certificates from this CA.

#. Copy the Wazuh indexer CA:

   .. code-block:: console

      # cp /etc/wazuh-indexer/export/ca.pem /root/new-manager-node/

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
----------------------------------

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

#. Add the Wazuh repository, as in the :ref:`Wazuh manager installation guide <wazuh_manager_adding_the_repository>`. A node installed with the installation assistant has no repository to reuse, because the assistant downloads the package directly.
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
   -  During the installation, the package prints ``MISSING /etc/wazuh-manager/certs/indexer-ca.pem``. The next step places this file.

#. Place the Wazuh indexer CA under the name the package expects:

   .. code-block:: console

      # install -m 0640 -o root -g wazuh-manager new-manager-node/ca.pem /etc/wazuh-manager/certs/indexer-ca.pem

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
----------------------------------

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

   -  The command prints ``/etc/wazuh-manager/wazuh-manager.conf: configuration is valid``.

#. Enable and start the Wazuh manager service:

   .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable wazuh-manager
      # systemctl restart wazuh-manager

Verify the cluster
------------------

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
----------

Put both nodes behind a :ref:`load balancer <wazuh_manager_cluster_load_balancers_for_the_wazuh_manager_cluster>`, so agents keep reporting when one node fails.
