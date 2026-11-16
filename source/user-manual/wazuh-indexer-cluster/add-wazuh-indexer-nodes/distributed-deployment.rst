.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to add a new Wazuh indexer node to a distributed Wazuh deployment, including certificate creation, deployment, and configuring the existing components.

Distributed deployment
======================

Certificates creation and deployment
------------------------------------

Use the root CA of the deployment to issue the certificate for the new node, so the certificates of the existing nodes remain valid. Perform the steps below on the host that holds the root CA private key, ``root-ca.key``. In an assisted installation, it's in the ``wazuh-ca`` directory beside the installation assistant, on the host where you ran ``--generate-config-files``. In a step-by-step installation, it's in ``/etc/wazuh-indexer/ca`` on the first Wazuh indexer node.

.. note::

   If the root CA private key has been deleted or you can't access it, the existing nodes can't trust a certificate issued for the new node.

   Restore the CA directory from your backup before you continue.

#. Create a working directory for the new certificates, and a ``config.yml`` file in it. Use a new directory so that the ``config.yml`` and ``wazuh-certificates`` of the original installation are kept:

   .. code-block:: console

      # mkdir -p /root/new-indexer-node && cd /root/new-indexer-node
      # touch config.yml

#. Edit the ``config.yml`` file to include only the node name and IP address of the new node:

   .. code-block:: yaml
      :emphasize-lines: 4,5

      nodes:
        # Wazuh indexer nodes
        indexer:
          - name: <NEW_WAZUH_INDEXER_NODE_NAME>
            ip: "<NEW_WAZUH_INDEXER_IP>"

#. Copy the certificate archive of the deployment to this directory, and extract it to obtain the existing certificates.

   -  If the certificate archive is ``wazuh-certificates.tar``, use this command:

      .. code-block:: console

         # mkdir wazuh-install-files && tar -xf ./wazuh-certificates.tar -C wazuh-install-files

   -  If the certificate archive is ``wazuh-install-files.tar``, use this command:

      .. code-block:: console

         # tar -xf ./wazuh-install-files.tar

#. Download the certificates tool to this directory and run it to create the certificate for the new Wazuh indexer node. The tool reads ``config.yml`` from its own directory, and signs the certificate with the root CA in the directory set in ``WAZUH_CA_DIR``. Replace ``<CA_DIRECTORY>`` with the absolute path of the directory that holds ``root-ca.key``, for example, ``/etc/wazuh-indexer/ca``. Without this variable, the tool creates a new root CA, and the certificate of the new node doesn't chain to the root CA of the cluster.

   .. code-block:: console
      :emphasize-lines: 2

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh
      # WAZUH_CA_DIR=<CA_DIRECTORY> bash wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -A

#. Copy the newly created certificates to the ``wazuh-install-files`` folder, making sure not to replace the existing admin certificates:

   .. code-block:: console

      # cp wazuh-certificates/<NEW_WAZUH_INDEXER_NODE_NAME>* wazuh-install-files

#. Compress the certificates that the new node requires and the passwords, taken from the complete set assembled in ``wazuh-install-files``, and copy the archive to the new Wazuh indexer node. You can use the ``scp`` utility to copy the archive securely:

   .. code-block:: console

      # tar -cvf ./wazuh-certificates-<NEW_WAZUH_INDEXER_NODE_NAME>.tar -C ./wazuh-install-files/ ./<NEW_WAZUH_INDEXER_NODE_NAME>.pem ./<NEW_WAZUH_INDEXER_NODE_NAME>-key.pem ./admin.pem ./admin-key.pem ./root-ca.pem ./credentials.env
      # chmod 600 ./wazuh-certificates-<NEW_WAZUH_INDEXER_NODE_NAME>.tar
      # scp ./wazuh-certificates-<NEW_WAZUH_INDEXER_NODE_NAME>.tar <TARGET_USERNAME>@<TARGET_IP>:

   .. note::

      The new archive is named after the new node so that the original archive is not overwritten. It holds the private key of the new node and the Wazuh indexer passwords, so remove it from both hosts after the new node is installed. The root CA private key, ``root-ca.key``, isn't in any archive. It stays in its CA directory. Keep a backup of that directory in secure storage. You need it to issue the certificate of every node added later.

Configuring existing components to connect with the new node
------------------------------------------------------------

#. Edit the configuration file at ``/etc/wazuh-indexer/opensearch.yml`` on all existing Wazuh indexer nodes. Add ``<NEW_WAZUH_INDEXER_IP>`` to the ``discovery.seed_hosts`` block, and the distinguished name of the new node to the ``plugins.security.nodes_dn`` block. Keep the entries that are already there, shown as ``<EXISTING_WAZUH_INDEXER_DN>``:

   .. code-block:: yaml
      :emphasize-lines: 1,2,6,9,10,13,14

      network.host: "<EXISTING_WAZUH_INDEXER_IP>"
      node.name: "<EXISTING_WAZUH_INDEXER_NODE_NAME>"
      cluster.name: "wazuh-cluster"

      cluster.initial_cluster_manager_nodes:
        - "<EXISTING_WAZUH_INDEXER_NODE_NAME>"

      discovery.seed_hosts:
        - "<EXISTING_WAZUH_INDEXER_IP>"
        - "<NEW_WAZUH_INDEXER_IP>"

      plugins.security.nodes_dn:
        - "<EXISTING_WAZUH_INDEXER_DN>"
        - "C=US,L=California,O=Wazuh,OU=Wazuh,CN=<NEW_WAZUH_INDEXER_NODE_NAME>"

   .. note::

      The ``cluster.initial_cluster_manager_nodes`` setting is only used the first time an indexer cluster starts. For consistency, keep it aligned with the list across all Wazuh indexer nodes. Still, the settings that allow the new node to join a running cluster are ``discovery.seed_hosts`` and ``plugins.security.nodes_dn``.

#. Restart the existing Wazuh indexer nodes one at a time to apply the changes. Restarting the nodes one by one keeps the cluster available while the change is applied:

   .. code-block:: console

      # systemctl restart wazuh-indexer

#. Edit the ``<indexer>`` block of the Wazuh manager configuration file ``/etc/wazuh-manager/wazuh-manager.conf`` to add the new Wazuh indexer node, then restart the Wazuh manager:

   .. code-block:: xml
      :emphasize-lines: 2,3

      <hosts>
        <host>https://<EXISTING_WAZUH_INDEXER_IP>:9200</host>
        <host>https://<NEW_WAZUH_INDEXER_IP>:9200</host>
      </hosts>

   .. code-block:: console

      # systemctl restart wazuh-manager

#. Edit the Wazuh dashboard configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to include the new Wazuh indexer node, then restart the Wazuh dashboard:

   .. code-block:: yaml

      opensearch.hosts: ["https://<EXISTING_WAZUH_INDEXER_IP>:9200", "https://<NEW_WAZUH_INDEXER_IP>:9200"]

   .. code-block:: console

      # systemctl restart wazuh-dashboard

Having completed the distributed deployment steps, proceed to the :doc:`New Wazuh indexer node <new-wazuh-indexer-node>` step.
