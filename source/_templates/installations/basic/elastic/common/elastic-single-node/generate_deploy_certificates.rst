.. Copyright (C) 2022 Wazuh, Inc.

.. tabs::

  .. group-tab:: Wazuh single-node cluster


    The instances file can be created  ``/usr/share/elasticsearch/instances.yml`` as follows:

    .. code-block:: yaml

      cat > /usr/share/elasticsearch/instances.yml <<\EOF
      instances:
      - name: "elasticsearch"
        ip:
        - "10.0.0.2"
      - name: "filebeat"
        ip:
        - "10.0.0.3"
      - name: "kibana"
        ip:
        - "10.0.0.4"    
      EOF

    Every ``name`` section corresponds to one host in the Wazuh Server - Elastic Stack environment. In this example, the file describes:

    - An ``elasticsearch`` instance with IP address ``10.0.0.2``.
    - A ``filebeat`` instance with IP address ``10.0.0.3`` corresponding to a single-node Wazuh cluster.
    - A ``kibana`` instance with IP address ``10.0.0.4``. If Kibana will be installed in the same server as Elasticsearch, the same IP address may be used.  
    
    Replace the IPs with the corresponding addresses for each instance in your environment.

    Create the certificates using the elasticsearch-certutil tool:
    
    .. code-block:: console

      # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --keep-ca-key --out ~/certs.zip


    The resulting file ``certs.zip`` contains a directory for each instance included in ``instances.yml``. Each directory contains a certificate and a private key necessary to secure communications. 

   

  .. group-tab:: Wazuh multi-node cluster



    The instances file ``/usr/share/elasticsearch/instances.yml`` must be created as follows:

    .. code-block:: yaml

      cat > /usr/share/elasticsearch/instances.yml <<\EOF
      instances:
      - name: "elasticsearch"
        ip:
        - "10.0.0.2"
      - name: "filebeat-1"
        ip:
        - "10.0.0.3"
      - name: "filebeat-2"
        ip:
        - "10.0.0.4"
      - name: "kibana"
        ip:
        - "10.0.0.5"  
      EOF

    Every ``name`` section corresponds to one host in the Wazuh Server - Elastic Stack environment. In this example, the file describes:

    - An ``elasticsearch`` instance with IP ``10.0.0.2``. It is an Elasticsearch single-node cluster.
    - Two ``filebeat`` instances, the #1 and #2 with their respective IPs ``10.0.0.3`` and ``10.0.0.4``. These correspond to two Wazuh cluster nodes. In case of configuring a Wazuh multi-node cluster with three or more nodes, more ``name`` sections with their respective names and IPs can be defined.
    - A kibana instance with IP address ``10.0.0.5``. If Kibana will be installed on the same server as Elasticsearch, the same Elasticsearch instance IP address should be used.   

    Replace the IPs of this example with the corresponding addresses in your environment.

    Create the certificates using the elasticsearch-certutil tool:

    .. code-block:: console

      # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --keep-ca-key --out ~/certs.zip

    The resulting file ``certs.zip`` contains a directory for each instance included in ``instances.yml``. Each directory contains a certificate and a private key necessary to secure communications. 

.. End of include file
