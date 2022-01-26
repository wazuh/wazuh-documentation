.. Copyright (C) 2015-2022 Wazuh, Inc.

#. Download the ``opensearch.yml`` configuration file into ``/etc/wazuh-indexer/``.

   .. code-block:: console

      # curl -so /etc/wazuh-indexer/opensearch.yml https://packages.wazuh.com/resources/4.3/wazuh-indexer/opensearch/7.x/opensearch_cluster_initial_node.yml

#. Edit ``/etc/wazuh-indexer/opensearch.yml``.

    .. code-block:: yaml
      :emphasize-lines: 2,4,7

      network.host: "0.0.0.0"
      node.name: "node-1"
      cluster.initial_master_nodes:
      - "node-1"
      # - "node-2"
      # - "node-3"
      cluster.name: "wazuh-cluster"

      http.port: 9700-9799
      transport.tcp.port: 9800-9899
      node.max_local_storage_nodes: "3"
      path.data: /var/lib/wazuh-indexer
      path.logs: /var/log/wazuh-indexer
      
      ...

    .. code-block:: yaml
      :emphasize-lines: 9

      ...

      plugins.security.audit.type: internal_opensearch
      plugins.security.authcz.admin_dn:
      - "CN=admin,OU=Docu,O=Wazuh,L=California,C=US"
      plugins.security.check_snapshot_restore_write_privileges: true
      plugins.security.enable_snapshot_restore_privilege: true
      plugins.security.nodes_dn:
      - "CN=demo-indexer,OU=Docu,O=Wazuh,L=California,C=US"
      #- "CN=demo-indexer,OU=Docu,O=Wazuh,L=California,C=US"
      #- "CN=demo-indexer,OU=Docu,O=Wazuh,L=California,C=US"
      plugins.security.restapi.roles_enabled:
      - "all_access"
      - "security_rest_api_access"

      ...

    Values to be replaced:
  
    - ``node-1`` in ``node.name``: This value must be the Wazuh indexer node name you are configuring, as defined in the ``config.yml`` file.
    - ``node-1`` in the ``cluster.initial_master_nodes`` list: This value must be the name of your Wazuh indexer master node, as it is defined in ``config.yml``. If you are configuring Wazuh indexer in a cluster distribution, you can add more master-elegible indexer nodes to this list. Uncomment the commented lines and  similarly replace ``node-2`` and ``node-3`` with your Wazuh indexer master nodes names.
    - ``wazuh-cluster`` in ``cluster.name``: This value is your Wazuh indexer cluster name and can be replaced with your own single-node or multi-node Wazuh indexer cluster name.
    - ``demo-indexer`` in ``plugins.security.nodes_dn``:

.. End of include file
