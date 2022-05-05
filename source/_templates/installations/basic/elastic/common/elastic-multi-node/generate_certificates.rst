.. Copyright (C) 2022 Wazuh, Inc.

.. tabs::

  .. group-tab:: Wazuh single-node cluster


    The instances file ``/usr/share/elasticsearch/instances.yml`` can be created as follows:

    .. code-block:: yaml

      cat > /usr/share/elasticsearch/instances.yml <<\EOF
      instances:
      - name: "elasticsearch-1"
        ip:
        - "10.0.0.2"
      - name: "elasticsearch-2"
        ip:
        - "10.0.0.3"
      - name: "elasticsearch-3"
        ip:
        - "10.0.0.4"
      - name: "filebeat"
        ip:
        - "10.0.0.5"
      - name: "kibana"
        ip:
        - "10.0.0.6"  
      EOF

    Every ``name`` section corresponds to one host in the Wazuh Server - Elastic Stack environment. In this example, the file describes:

    - A ``filebeat`` instance with IP address ``10.0.0.5``. It is a Wazuh single-node cluster.

    - Three ``elasticsearch`` instances, #1, #2 and #3 with their respective IPs ``10.0.0.2``, ``10.0.0.3`` and ``10.0.0.4``. All belong to three Elasticsearch cluster nodes. In case of configuring an Elasticsearch multi-node cluster with four or more nodes, more ``name`` sections can be defined with their respective names and IPs.

    - A ``kibana`` instance with IP address ``10.0.0.6``. If Kibana will be installed in the same server as Elasticsearch, the same IP address may be used.
  
    Replace the IPs with the corresponding addresses for each instance in your environment.

    Create the certificates using the elasticsearch-certutil tool:

    .. code-block:: console

      # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --keep-ca-key --out ~/certs.zip

    The resulting file ``certs.zip`` contains a directory for each instance included in ``instances.yml``. Each directory contains a certificate and a private key necessary to secure communications.  


  .. group-tab:: Wazuh multi-node cluster



    The instances file ``/usr/share/elasticsearch/instances.yml`` can be created as follows:

    .. code-block:: yaml

      cat > /usr/share/elasticsearch/instances.yml <<\EOF
      instances:
      - name: "elasticsearch-1"
        ip:
        - "10.0.0.2"
      - name: "elasticsearch-2"
        ip:
        - "10.0.0.3"
      - name: "elasticsearch-3"
        ip:
        - "10.0.0.4"
      - name: "filebeat-1"
        ip:
        - "10.0.0.5"
      - name: "filebeat-2"
        ip:
        - "10.0.0.6"
      - name: "kibana"
        ip:
        - "10.0.0.7"  
      EOF

   Every ``name`` section corresponds one host in the Wazuh Server - Elastic Stack environment. In this example, the file describes:

    - Two ``filebeat`` instances, #1 and #2 with their respective IPs ``10.0.0.5`` and ``10.0.0.6``. Both belong to individual Wazuh cluster nodes. If you want to configure a Wazuh multi-node cluster with three or more nodes, you must define more ``name`` sections with their respective names and IPs.

    - Three instances ``elasticsearch``, #1, #2 and #3 with their respective IPs ``10.0.0.2``, ``10.0.0.3`` and ``10.0.0.4``. They belong to three Elasticsearch cluster nodes. In the case of configuring an Elasticsearch multi-node cluster with four or more nodes, more ``name`` sections can be defined with their respective names and IPs.

    - A ``kibana`` instance with IP address ``10.0.0.7``. If Kibana will be installed in the same server as Elasticsearch, the same IP address may be used.   

    Replace the IPs with the corresponding addresses for each instance in your environment.

    Create the certificates using the elasticsearch-certutil tool:

    .. code-block:: console

      # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --keep-ca-key --out ~/certs.zip

    The resulting file ``certs.zip`` contains a directory for each instance included in ``instances.yml``. Each directory contains a certificate and a private key necessary to secure communications. 


.. End of include file
