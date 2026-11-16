.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to add a new Wazuh indexer node to an all-in-one Wazuh deployment, including certificate creation, deployment, and configuring the existing components.

All-in-one deployment
=====================

.. _all_in_one_certificates_creation_and_deployment:

Certificates creation and deployment
------------------------------------

In an all-in-one deployment, the Wazuh indexer package created the root CA of the deployment in ``/etc/wazuh-indexer/ca``, and that directory holds the root CA private key, ``root-ca.key``. Issue the certificate for the new node with this root CA, so the certificates of the existing components remain valid.

Perform the following steps on the existing all-in-one node.

#. Create a working directory for the new certificates, and a ``config.yml`` file in it:

   .. code-block:: console

      # mkdir -p /root/new-indexer-node && cd /root/new-indexer-node
      # touch config.yml

#. Edit ``config.yml`` to include only the node name and IP address of the new node:

   .. code-block:: yaml
      :emphasize-lines: 4,5

      nodes:
        # Wazuh indexer nodes
        indexer:
          - name: <NEW_WAZUH_INDEXER_NODE_NAME>
            ip: "<NEW_WAZUH_INDEXER_IP>"

#. Download the certificates tool to this directory and run it to create the certificate for the new Wazuh indexer node. The tool reads ``config.yml`` from its own directory, and signs the certificate with the root CA in the directory set in ``WAZUH_CA_DIR``. Without this variable, the tool creates a new root CA, and the certificate of the new node doesn't chain to the root CA of the cluster:

   .. code-block:: console

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh
      # WAZUH_CA_DIR=/etc/wazuh-indexer/ca bash wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -A

#. Pack the certificates of the new node with the root CA certificate and the Wazuh indexer passwords, and copy the archive to the new Wazuh indexer node. You can use the ``scp`` utility to copy the archive securely:

   .. code-block:: console
      :emphasize-lines: 3,4,5

      # install -m 0600 /dev/null wazuh-certificates/credentials.env
      # grep '^WAZUH_INDEXER_' /etc/wazuh-indexer/export/credentials.env > wazuh-certificates/credentials.env
      # tar -cvf ./wazuh-certificates-<NEW_WAZUH_INDEXER_NODE_NAME>.tar -C ./wazuh-certificates/ ./<NEW_WAZUH_INDEXER_NODE_NAME>.pem ./<NEW_WAZUH_INDEXER_NODE_NAME>-key.pem ./admin.pem ./admin-key.pem ./root-ca.pem ./credentials.env
      # chmod 600 ./wazuh-certificates-<NEW_WAZUH_INDEXER_NODE_NAME>.tar
      # scp ./wazuh-certificates-<NEW_WAZUH_INDEXER_NODE_NAME>.tar <TARGET_USERNAME>@<TARGET_IP>:

   This copies the certificates to the home directory of the logged-in user on the target endpoint. You can change this to point to your installation directory.

   Replace:

   -  ``<TARGET_USERNAME>`` with the SSH login username on the new Wazuh indexer node.
   -  ``<TARGET_IP>`` with the IP address of the new Wazuh indexer node.

   The archive holds the private key of the new node and the Wazuh indexer passwords. Remove it from both hosts after the new node is installed.

Configuring existing components to connect with the new node
------------------------------------------------------------

In this section, we configure the Wazuh components of your existing all-in-one deployment to connect and communicate with the new Wazuh indexer node.

#. Edit the configuration file at ``/etc/wazuh-indexer/opensearch.yml`` on the existing Wazuh indexer node.

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

   Replace the following values:

   -  ``<EXISTING_WAZUH_INDEXER_NODE_NAME>`` with the node name of the pre-existing Wazuh indexer.
   -  ``<NEW_WAZUH_INDEXER_NODE_NAME>`` with the node name of the new Wazuh indexer.
   -  ``<EXISTING_WAZUH_INDEXER_IP>`` with the IP address of the pre-existing Wazuh indexer node.
   -  ``<NEW_WAZUH_INDEXER_IP>`` with the IP address of the new Wazuh indexer node.
   -  ``<EXISTING_WAZUH_INDEXER_DN>`` with the line that the package wrote in ``plugins.security.nodes_dn`` on the existing node. Keep it as it is. Its CN is the host name of the existing node.

   .. note::

      The ``cluster.initial_cluster_manager_nodes`` setting is only used the first time a cluster starts. For consistency, keep it aligned with the list across all Wazuh indexer nodes. Still, the settings that allow the new node to join a running cluster are ``discovery.seed_hosts`` and ``plugins.security.nodes_dn``.

#. Edit the ``<indexer>`` block of the Wazuh manager configuration file ``/etc/wazuh-manager/wazuh-manager.conf`` to connect to the new Wazuh indexer node. In Wazuh 5.0, the Wazuh manager reports to the Wazuh indexer directly through its indexer connector.

   .. code-block:: xml
      :emphasize-lines: 2,3

      <hosts>
        <host>https://<EXISTING_WAZUH_INDEXER_IP>:9200</host>
        <host>https://<NEW_WAZUH_INDEXER_IP>:9200</host>
      </hosts>

#. Edit the Wazuh dashboard configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to include the new Wazuh indexer node:

   .. code-block:: yaml

      opensearch.hosts: ["https://<EXISTING_WAZUH_INDEXER_IP>:9200", "https://<NEW_WAZUH_INDEXER_IP>:9200"]

#. Restart the Wazuh component services to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-indexer
      # systemctl restart wazuh-manager
      # systemctl restart wazuh-dashboard

Having completed the all-in-one deployment steps, proceed to the :doc:`New Wazuh indexer node <new-wazuh-indexer-node>` step.
