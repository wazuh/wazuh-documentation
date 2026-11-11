.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to add a worker node to a Wazuh manager cluster, with certificates from the cluster CA and a client certificate for the Wazuh indexer.

Adding new Wazuh server nodes
=============================

You can scale your Wazuh server cluster horizontally by adding worker nodes. This works the same for a single Wazuh manager, including an all-in-one deployment, and for an existing cluster. The new node needs the following:

-  The Wazuh manager CA of the master node, so the package issues the node's certificates from it, and the Wazuh agents trust the node.
-  A client certificate for the Wazuh indexer, issued by the Wazuh indexer root CA, and the Wazuh indexer password of the ``wazuh-manager`` user.
-  The cluster key of the master node.

The new node must reach port ``1516`` of the master node and port ``9200`` of the Wazuh indexer nodes. If the master node's ``<cluster>`` block still has ``127.0.0.1`` as ``bind_addr`` and node address, set the master node first, as described in :doc:`Wazuh cluster nodes configuration </user-manual/wazuh-server-cluster/cluster-nodes-configuration>`.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Creating the Wazuh indexer client certificate
---------------------------------------------

Run these steps on the Wazuh indexer node that holds the Wazuh indexer root CA private key, ``/etc/wazuh-indexer/ca/root-ca.key``. That is the first Wazuh indexer node, or the all-in-one host.

#. Back up the ``config.yml`` file of the certificates tool, if there is one, and the ``wazuh-certificates`` directory, if there is one. The tool doesn't overwrite an existing ``wazuh-certificates`` directory:

   .. code-block:: console

      # cd /usr/share/wazuh-indexer/tools
      # [ -f config.yml ] && cp config.yml config.yml.bak
      # [ -d wazuh-certificates ] && mv wazuh-certificates wazuh-certificates.bak

#. Create ``config.yml`` with the new node only. Replace ``<NEW_NODE_NAME>`` with a name for the node, for example ``manager-3``, and ``<NEW_NODE_IP>`` with its IP address. Don't add ``node_type``: the tool refuses it when the file lists only one Wazuh manager:

   .. code-block:: yaml

      nodes:
        manager:
          - name: <NEW_NODE_NAME>
            ip: "<NEW_NODE_IP>"

#. Run the tool with the ``-wm`` option. ``WAZUH_CA_DIR`` makes it sign the certificate with the Wazuh indexer root CA:

   .. code-block:: console

      # WAZUH_CA_DIR=/etc/wazuh-indexer/ca bash wazuh-certs-tool.sh -wm

   The tool writes the certificates to ``wazuh-certificates/``. The new node uses only ``<NEW_NODE_NAME>.pem``, ``<NEW_NODE_NAME>-key.pem``, and ``root-ca.pem``. Don't use the ``-remoted`` and ``-apid`` files: the Wazuh manager package issues those certificates from the Wazuh manager CA.

#. Check the client certificate:

   .. code-block:: console

      # openssl verify -CAfile /etc/wazuh-indexer/ca/root-ca.pem wazuh-certificates/<NEW_NODE_NAME>.pem

   The output is ``wazuh-certificates/<NEW_NODE_NAME>.pem: OK``.

#. Pack the three files, then remove the directory and restore your files:

   .. code-block:: console

      # tar -cf /root/<NEW_NODE_NAME>-indexer.tar -C wazuh-certificates root-ca.pem <NEW_NODE_NAME>.pem <NEW_NODE_NAME>-key.pem
      # chmod 600 /root/<NEW_NODE_NAME>-indexer.tar
      # rm -rf wazuh-certificates
      # [ -f config.yml.bak ] && mv config.yml.bak config.yml
      # [ -d wazuh-certificates.bak ] && mv wazuh-certificates.bak wazuh-certificates

#. Read the Wazuh indexer password of the ``wazuh-manager`` user. You need it on the new node:

   .. code-block:: console

      # grep '^WAZUH_INDEXER_MANAGER_PASSWORD=' /etc/wazuh-indexer/export/credentials.env

Packing the Wazuh manager CA
----------------------------

On the master node, pack the Wazuh manager CA and read the cluster key:

.. code-block:: console

   # tar -cf /root/manager-ca.tar -C /etc/wazuh-manager/ca root-ca.pem root-ca.key
   # chmod 600 /root/manager-ca.tar
   # sed -n '/<cluster>/,/<\/cluster>/s:.*<key>\(.*\)</key>.*:\1:p' /etc/wazuh-manager/wazuh-manager.conf

The archive holds the CA private key. Copy ``manager-ca.tar`` and ``<NEW_NODE_NAME>-indexer.tar`` to the working directory of the new node with a secure method, such as ``scp``, then remove ``manager-ca.tar`` from the master node.

Installing the new node
-----------------------

Run these steps on the new node, as ``root``, in the directory that holds the two archives.

#. Add the Wazuh repository, as described in "Adding the Wazuh repository" of the :doc:`Wazuh manager installation </installation-guide/wazuh-manager/step-by-step>` guide.

#. Create the configuration directory and place the Wazuh indexer password. Replace ``<WAZUH_MANAGER_PASSWORD>`` with the value you read on the Wazuh indexer node:

   .. code-block:: console

      # install -d -m 0750 /etc/wazuh-manager
      # install -m 0600 /dev/null /etc/wazuh-manager/local.env
      # echo "WAZUH_INDEXER_MANAGER_PASSWORD='<WAZUH_MANAGER_PASSWORD>'" > /etc/wazuh-manager/local.env

#. If Wazuh agents reach the cluster through a load balancer, or another address that isn't this node's own, set the addresses of the agent listener certificate. Include this node's own address, because the list replaces the discovered addresses:

   .. code-block:: console

      # echo 'WAZUH_MANAGER_REMOTED_CERT_SANS=IP:<NEW_NODE_IP>,DNS:<LOAD_BALANCER_NAME>' >> /etc/wazuh-manager/local.env

#. Place the Wazuh manager CA of the master node:

   .. code-block:: console

      # install -d -m 0700 /etc/wazuh-manager/ca
      # tar -xf manager-ca.tar -C /etc/wazuh-manager/ca
      # chown root:root /etc/wazuh-manager/ca/root-ca.pem /etc/wazuh-manager/ca/root-ca.key
      # chmod 0644 /etc/wazuh-manager/ca/root-ca.pem
      # chmod 0400 /etc/wazuh-manager/ca/root-ca.key
      # rm -f manager-ca.tar

#. Install the Wazuh manager package:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get -y install wazuh-manager|WAZUH_MANAGER_DEB_PKG_INSTALL|

      .. group-tab:: Yum

         .. code-block:: console

            # yum -y install wazuh-manager|WAZUH_MANAGER_RPM_PKG_INSTALL|

      .. group-tab:: DNF

         .. code-block:: console

            # dnf -y install wazuh-manager|WAZUH_MANAGER_RPM_PKG_INSTALL|

   The package issues the agent listener and Wazuh manager API certificates from the CA you placed. It also prints ``MISSING`` lines for the Wazuh indexer files, which you place in the next step.

#. Place the Wazuh indexer root CA and the client certificate, then remove the archive:

   .. code-block:: console

      # mkdir indexer-files
      # tar -xf <NEW_NODE_NAME>-indexer.tar -C indexer-files
      # install -m 0640 -o root -g wazuh-manager indexer-files/root-ca.pem /etc/wazuh-manager/certs/indexer-ca.pem
      # install -m 0640 -o root -g wazuh-manager indexer-files/<NEW_NODE_NAME>.pem /etc/wazuh-manager/certs/indexer-connector.pem
      # install -m 0640 -o root -g wazuh-manager indexer-files/<NEW_NODE_NAME>-key.pem /etc/wazuh-manager/certs/indexer-connector-key.pem
      # rm -rf indexer-files <NEW_NODE_NAME>-indexer.tar

#. Check that the node's CA is the master node's, and that the credentials are complete:

   .. code-block:: console

      # openssl x509 -in /etc/wazuh-manager/ca/root-ca.pem -noout -fingerprint -sha256
      # /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --check

   The fingerprint must be the same as on the master node. The second command prints ``resolve-credentials: check: no problem found``.

#. Edit ``/etc/wazuh-manager/wazuh-manager.conf``:

   -  In the ``<indexer>`` block, replace ``127.0.0.1`` in ``<host>`` with the address of your Wazuh indexer node. Add a ``<host>`` entry for each Wazuh indexer node.
   -  In the ``<cluster>`` block, set a unique ``<node_name>``, ``worker`` as ``<node_type>``, the cluster key of the master node, and the master node address in ``<node>``:

   .. code-block:: xml

      <cluster>
        <name>wazuh</name>
        <node_name>worker-node2</node_name>
        <node_type>worker</node_type>
        <key><CLUSTER_KEY></key>
        <port>1516</port>
        <bind_addr>0.0.0.0</bind_addr>
        <nodes>
          <node><MASTER_NODE_ADDRESS></node>
        </nodes>
        <hidden>no</hidden>
      </cluster>

#. Check the configuration, then enable and start the Wazuh manager:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-control check
      # systemctl daemon-reload
      # systemctl enable --now wazuh-manager

   The first command prints ``Configuration and credentials checks passed.``

Testing the cluster
-------------------

On any node, check that the new node is connected:

.. code-block:: console

   # /var/wazuh-manager/bin/cluster_control -l

.. code-block:: none
   :class: output

   NAME          TYPE    VERSION  ADDRESS
   master-node   master  5.0.0    10.0.0.3
   worker-node1  worker  5.0.0    10.0.0.4
   worker-node2  worker  5.0.0    10.0.0.5

The new node gets the Wazuh agent keys, enrollment tokens, and group files from the master node within seconds. Check that it reaches the Wazuh indexer:

.. code-block:: console

   # grep -E 'indexer is reachable|No configured indexer host' /var/wazuh-manager/logs/wazuh-manager.log | tail -1

If Wazuh agents reach the cluster through a load balancer, add the new node to its backends. See :doc:`Load balancers </user-manual/wazuh-server-cluster/load-balancers>`. To monitor the new node's host, install a Wazuh agent on it.
