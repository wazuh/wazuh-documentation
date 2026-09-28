.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to add a new Wazuh indexer node to a distributed Wazuh deployment, including certificate creation, deployment, and configuring the existing components.

Distributed deployment
======================

Certificates creation and deployment
------------------------------------

Use the pre-existing root CA keys to generate the certificate for the new node, so the certificates of the existing nodes remain valid. Perform the steps below on one of the existing Wazuh indexer nodes.

.. note::

   If the pre-existing root CA keys have been deleted or you can't access them, create new certificates for all nodes instead. Reference every node of your deployment in ``/root/config.yml``. Run ``bash wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -A``, and redeploy the certificates on every existing node before continuing, as shown in the :ref:`All-in-one deployment > Certificates creation <all_in_one_certificates_creation_and_deployment>` subsection.

#. Create a ``config.yml`` file in the ``/root`` directory to add the new Wazuh indexer node:

   .. code-block:: console

      # touch /root/config.yml

#. Edit the ``/root/config.yml`` file to include only the node name and IP address of the new node:

   .. code-block:: yaml
      :emphasize-lines: 4,5

      nodes:
        # Wazuh indexer nodes
        indexer:
          - name: <NEW_WAZUH_INDEXER_NODE_NAME>
            ip: "<NEW_WAZUH_INDEXER_IP>"

#. Extract the certificate archive to obtain the root CA keys.

   -  If the certificate archive is ``wazuh-certificates.tar``, use this command:

      .. code-block:: console

         # mkdir wazuh-install-files && tar -xf ./wazuh-certificates.tar -C wazuh-install-files

   -  If the certificate archive is ``wazuh-install-files.tar``, use this command:

      .. code-block:: console

         # tar -xf ./wazuh-install-files.tar

#. Download and run the certificates tool to create the certificate for the new indexer node using the pre-existing root CA keys. The tool refuses to run when a ``wazuh-certificates`` directory already exists beside it, which is the case on the node where the original certificates were created. Rename any existing directory first so that the original certificates are kept.

   .. code-block:: console

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh
      # [ -d wazuh-certificates ] && mv wazuh-certificates wazuh-certificates.$(date +%Y%m%d%H%M%S).bak
      # bash wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -A wazuh-install-files/root-ca.pem wazuh-install-files/root-ca.key

#. Copy the newly created certificates to the ``wazuh-install-files`` folder, making sure not to replace the existing admin certificates:

   .. code-block:: console

      # cp wazuh-certificates/<NEW_WAZUH_INDEXER_NODE_NAME>* wazuh-install-files

#. Compress the certificates that the new node requires, taken from the complete set assembled in ``wazuh-install-files``, and copy the archive to the new Wazuh indexer node. You can use the ``scp`` utility to copy the compressed file securely:

   .. code-block:: console
      :emphasize-lines: 1,2

      # tar -cvf ./wazuh-certificates-<NEW_WAZUH_INDEXER_NODE_NAME>.tar -C ./wazuh-install-files/ ./<NEW_WAZUH_INDEXER_NODE_NAME>.pem ./<NEW_WAZUH_INDEXER_NODE_NAME>-key.pem ./admin.pem ./admin-key.pem ./root-ca.pem
      # scp ./wazuh-certificates-<NEW_WAZUH_INDEXER_NODE_NAME>.tar <TARGET_USERNAME>@<TARGET_IP>:

   .. note::

      The new archive is named after the new node so that the original ``wazuh-certificates.tar`` is not overwritten. That archive holds the root CA key, which is required to sign the certificate of every node added later. Keep it, or the ``wazuh-install-files`` directory, in secure storage.

Configuring existing components to connect with the new node
------------------------------------------------------------

#. Edit the configuration file at ``/etc/wazuh-indexer/opensearch.yml`` on all existing Wazuh indexer nodes. Add the ``<NEW_WAZUH_INDEXER_IP>`` to the ``discovery.seed_hosts`` block, and the ``<NEW_WAZUH_INDEXER_NODE_NAME>`` to ``CN`` in ``plugins.security.nodes_dn`` block.

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
        - "CN=<EXISTING_WAZUH_INDEXER_NODE_NAME>,OU=Wazuh,O=Wazuh,L=California,C=US"
        - "CN=<NEW_WAZUH_INDEXER_NODE_NAME>,OU=Wazuh,O=Wazuh,L=California,C=US"

   .. note::

      The ``cluster.initial_cluster_manager_nodes`` setting is only used the first time an indexer cluster starts. For consistency, keep it aligned with the list across all Wazuh indexer nodes. Still, the settings that allow the new node to join a running cluster are ``discovery.seed_hosts`` and ``plugins.security.nodes_dn``.

#. Restart the existing Wazuh indexer nodes one at a time to apply the changes. Restarting the nodes one by one keeps the cluster available while the change is applied:

   .. code-block:: console

      # systemctl restart wazuh-indexer

#. Edit the ``<indexer>`` block of the Wazuh manager configuration file ``/var/wazuh-manager/etc/wazuh-manager.conf`` to add the new Wazuh indexer node, then restart the Wazuh manager:

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
