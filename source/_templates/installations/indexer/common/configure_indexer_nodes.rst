.. Copyright (C) 2015, Wazuh, Inc.

#. Edit ``/etc/wazuh-indexer/opensearch.yml`` and replace the following values:

   #. ``network.host``: Sets the address of this node for both HTTP and transport traffic. The node will bind to this address and will also use it as its publish address. Accepts an IP address or a hostname.

      Use the same node address set in ``config.yml`` to create the SSL certificates.

   #. ``node.name``: Name of the Wazuh indexer node as defined in the ``config.yml`` file. For example, ``indexer``. The package sets ``node-1`` on every node, so change it on every node to that node's name in ``config.yml``. List the same names in ``cluster.initial_cluster_manager_nodes``.

   #. ``cluster.initial_cluster_manager_nodes``: List of the names of the master-eligible nodes. Use names defined in the ``config.yml`` file, for example, ``indexer``. For a multi-node cluster, uncomment the ``node-2`` and ``node-3`` lines, change the names, or add more lines, according to your ``config.yml`` definitions.

      .. code-block:: yaml
         :emphasize-lines: 2

         cluster.initial_cluster_manager_nodes:
         - "indexer"
         #- "node-2"
         #- "node-3"

   #. ``discovery.seed_hosts``: List of the addresses of the master-eligible nodes. Each element can be either an IP address or a hostname. You may leave this setting commented if you are configuring the Wazuh indexer as a single-node. For multi-node configurations, uncomment this setting and set the addresses of each master-eligible node.

      .. code-block:: yaml

         discovery.seed_hosts:
         #  - "node-1-ip"
         #  - "node-2-ip"
         #  - "node-3-ip"

   #. ``plugins.security.nodes_dn``: List of the Distinguished Names of the certificates of all the Wazuh indexer cluster nodes. The installation automatically configures the Distinguished Name (DN) of this node's certificate. For a single-node deployment, verify that the certificate Common Name (CN) matches the node name defined in ``config.yml``. For a multi-node cluster, replace the line the package wrote with one line per node in ``config.yml``, using the subjects of the certificates you deploy in :ref:`Deploying certificates <wazuh_indexer_deploying_certificates>`. The certificates tool issues them with the node name from ``config.yml`` as CN, and the Security plugin compares each entry as a string, so keep this order:

      .. code-block:: yaml
         :emphasize-lines: 2-3

         plugins.security.nodes_dn:
         - "C=US,L=California,O=Wazuh,OU=Wazuh,CN=<NODE_1_NAME>"
         - "C=US,L=California,O=Wazuh,OU=Wazuh,CN=<NODE_2_NAME>"

      .. note::

         Firewalls can block communication between Wazuh components on different hosts. Refer to the :ref:`Required ports <default_ports>` section and ensure the necessary ports are open.

.. End of include file
