.. Copyright (C) 2015-2022 Wazuh, Inc.

#. Download the ``opensearch.yml`` configuration file into ``/etc/wazuh-indexer/``.

   .. code-block:: console

      # curl -so /etc/wazuh-indexer/opensearch.yml https://packages.wazuh.com/resources/|WAZUH_LATEST_MINOR|/wazuh-indexer/opensearch/7.x/opensearch_cluster_initial_node.yml

#. Edit ``/etc/wazuh-indexer/opensearch.yml``.

    .. code-block:: yaml
      :emphasize-lines: 1,2,4-7,11

      network.host: "<indexer_ip>"
      node.name: "<indexer_node_name>"
      cluster.initial_master_nodes:
      - "<indexer_node_1_name>"
      - "<indexer_node_2_name>"
      - "<indexer_node_3_name>"
      cluster.name: "<indexer_cluster_name>"
      
      http.port: 9700-9799
      transport.tcp.port: 9800-9899
      node.max_local_storage_nodes: "3"
      path.data: /var/lib/wazuh-indexer
      path.logs: /var/log/wazuh-indexer
      
      ...

    .. code-block:: yaml
      :emphasize-lines: 3,4,6,7

        ...
       
        plugins.security.ssl.http.pemcert_filepath: /etc/wazuh-indexer/certs/<indexer_node_certificate_name>.pem
        plugins.security.ssl.http.pemkey_filepath: /etc/wazuh-indexer/certs/<indexer_node_certificate_name>-key.pem
        plugins.security.ssl.http.pemtrustedcas_filepath: /etc/wazuh-indexer/certs/root-ca.pem
        plugins.security.ssl.transport.pemcert_filepath: /etc/wazuh-indexer/certs/<indexer_node_certificate_name>.pem
        plugins.security.ssl.transport.pemkey_filepath: /etc/wazuh-indexer/certs/<indexer_node_certificate_name>-key.pem
        plugins.security.ssl.transport.pemtrustedcas_filepath: /etc/wazuh-indexer/certs/root-ca.pem

        ...

    .. code-block:: yaml
      :emphasize-lines: 4-6

        ...

        plugins.security.nodes_dn:
        - "CN=<indexer_node_1_certificate_name>,OU=Docu,O=Wazuh,L=California,C=US"
        - "CN=<indexer_node_2_certificate_name>,OU=Docu,O=Wazuh,L=California,C=US"
        - "CN=<indexer_node_3_certificate_name>,OU=Docu,O=Wazuh,L=California,C=US"

        ...


    Values to be replaced:
  
    - ``<indexer_ip>``: Host's IP address; for example, ``172.16.1.21`` or ``0.0.0.0``. 
    - ``<indexer_node_name>``: Node name; for example, ``node-1``. 
    - ``<indexer_node_X_name>``: Name of all the master-eligible nodes in the Wazuh indexer cluster; for example, ``node-1``, ``node-2``, ``node-3``. 
    - ``<indexer_cluster_name>``: Wazuh indexer cluster name; for example, ``wazuh-cluster``.
    - ``<indexer_node_certificate_name>``: Wazuh indexer node certificate name; for example, ``node-1``.
    - ``<indexer_node_X_certificate_name>``: Each node certificate name; for example, ``node-1``, ``node-2``, ``node-3``. Make sure to use the same names to create the certificates.

.. End of include file
