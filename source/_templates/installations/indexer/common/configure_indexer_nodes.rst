.. Copyright (C) 2015-2022 Wazuh, Inc.

#. Edit ``/etc/wazuh-indexer/opensearch.yml``.

    .. code-block:: yaml
      :emphasize-lines: 2,4,7,26,27,29,30,42

       network.host: "0.0.0.0"
       node.name: "node-1"
       cluster.initial_master_nodes:
       - "node-1"
       #- "node-2"
       #- "node-3"
       cluster.name: "wazuh-cluster"
       #discovery.seed_hosts:
       #  - "node-1-ip"
       #  - "node-2-ip"
       #  - "node-3-ip"
       http.port: 9700-9799
       transport.tcp.port: 9800-9899
       node.max_local_storage_nodes: "3"
       path.data: /var/lib/wazuh-indexer
       path.logs: /var/log/wazuh-indexer
       
       
       ###############################################################################
       #                                                                             #
       #         WARNING: Demo certificates set up in this file.                     #
       #                  Please change on production cluster!                       #
       #                                                                             #
       ###############################################################################
       
       plugins.security.ssl.http.pemcert_filepath: /etc/wazuh-indexer/certs/demo-indexer.pem
       plugins.security.ssl.http.pemkey_filepath: /etc/wazuh-indexer/certs/demo-indexer-key.pem
       plugins.security.ssl.http.pemtrustedcas_filepath: /etc/wazuh-indexer/certs/root-ca.pem
       plugins.security.ssl.transport.pemcert_filepath: /etc/wazuh-indexer/certs/demo-indexer.pem
       plugins.security.ssl.transport.pemkey_filepath: /etc/wazuh-indexer/certs/demo-indexer-key.pem
       plugins.security.ssl.transport.pemtrustedcas_filepath: /etc/wazuh-indexer/certs/root-ca.pem
       plugins.security.ssl.http.enabled: true
       plugins.security.ssl.transport.enforce_hostname_verification: false
       plugins.security.ssl.transport.resolve_hostname: false
       
       plugins.security.audit.type: internal_opensearch
       plugins.security.authcz.admin_dn:
       - "CN=admin,OU=Wazuh,O=Wazuh,L=California,C=US"
       plugins.security.check_snapshot_restore_write_privileges: true
       plugins.security.enable_snapshot_restore_privilege: true
       plugins.security.nodes_dn:
       - "CN=node-1,OU=Wazuh,O=Wazuh,L=California,C=US"
       #- "CN=node-2,OU=Wazuh,O=Wazuh,L=California,C=US"
       #- "CN=node-3,OU=Wazuh,O=Wazuh,L=California,C=US"
       plugins.security.restapi.roles_enabled:
       - "all_access"
       - "security_rest_api_access"
       
       plugins.security.system_indices.enabled: true
       plugins.security.system_indices.indices: [".opendistro-alerting-config", ".opendistro-alerting-alert*", ".opendistro-anomaly-results*", ".opendistro-anomaly-detector*", ".opendistro-anomaly-checkpoints", ".opendistro-anomaly-detection-state", ".opendistro-reports-*", ".opendistro-notifications-*", ".opendistro-notebooks", ".opensearch-observability", ".opendistro-asynchronous-search-response*", ".replication-metadata-store"]
       
       ### Option to allow Filebeat-oss 7.10.2 to work ###
       compatibility.override_main_response_version: true

    Values to be replaced:
  
    - ``node.name``: This value must be the Wazuh indexer node name you are configuring, as defined in the ``config.yml`` file.
    - ``cluster.initial_master_nodes`` list: This value must be the name of your Wazuh indexer master node, as it is defined in ``config.yml``. If you are configuring Wazuh indexer in a multi-node distribution, you can add more master-elegible indexer nodes to this list. Uncomment the commented lines and  similarly replace ``node-2`` and ``node-3`` with your Wazuh indexer master nodes names. 
    - ``cluster.name``: This value is your Wazuh indexer cluster name and can be replaced with your own single-node or multi-node Wazuh indexer cluster name.
    - ``plugins.security.nodes_dn``: Replace the common name (CN) by your node name used in ``config.yml``. Uncomment the commented lines for ``node-2`` and ``node-3`` if necessary.
    - ``plugins.security.ssl``: Replace ``demo-indexer.pem`` with ``wazuh-indexer.pem`` and ``demo-indexer-key.pem`` with ``wazuh-indexer-key.pem``. 

.. End of include file
