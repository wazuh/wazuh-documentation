.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::

  .. group-tab:: Wazuh single-node cluster


    The specification file ``/usr/share/elasticsearch/instances.yml`` must be created as follows:

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

    Every ``name`` section corresponds to one host in the Wazuh - Elastic Stack environment. In this example, the file describes:

    - A ``filebeat`` instance with IP ``10.0.0.5``. It is a Wazuh single-node cluster.

    - Three ``elasticsearch`` instances, #1, #2 and #3 with their respective IPs ``10.0.0.2``, ``10.0.0.3`` and ``10.0.0.4``. All belong to three Elasticsearch cluster nodes. In case of configuring an Elasticsearch multi-node cluster with four or more nodes, more ``name`` sections can be defined with their respective names and IPs.

    - A ``kibana`` instance with IP ``10.0.0.6``. If Kibana will be installed in the same server as Elastisearch, the same IP may be used.
  
    The IPs must be replaced with the corresponding IP for each instance in the environment.

    In the following steps, a file that contains a folder named after the instance defined here will be created. This folder will contain the certificates and the keys necessary to communicate with the Elasticsearch node using SSL.

    The certificates can be created using the elasticsearch-certutil tool:

    .. code-block:: console

      # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --keep-ca-key --out ~/certs.zip


  .. group-tab:: Wazuh multi-node cluster



    The specification file ``/usr/share/elasticsearch/instances.yml`` can be created as follows:

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

   Every ``name`` section represents one host in the Wazuh - Elastic Stack environment. In this example, the file describes:

    - Two ``filebeat`` instances, #1 and #2 with their respective IPs ``10.0.0.5`` and ``10.0.0.6``. Both belong to individual Wazuh cluster nodes. If you want to configure a Wazuh multi-node cluster with three or more nodes, you must define more ``name`` sections with their respective names and IPs.

    - Three instances ``elasticsearch``, #1, #2 and #3 with their respective IPs ``10.0.0.2``, ``10.0.0.3`` and ``10.0.0.4``. They belong to three Elasticsearch cluster nodes. In the case of configuring an Elasticsearch multi-node cluster with four or more nodes, more ``name`` sections can be defined with their respective names and IPs.

    - A ``kibana`` instance with IP ``10.0.0.7``. If Kibana will be installed in the same server as Elastisearch, the same IP may be used.   

    The IPs must be replaced with the corresponding IP for each instance in the environment.

    In the following steps, a zip file that contains a folder named after the instance defined here will be created. This folder will contain the certificates and the keys necessary to communicate with the Elasticsearch node using SSL.

    The certificates can be created using the elasticsearch-certutil tool:

    .. code-block:: console

      # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --keep-ca-key --out ~/certs.zip


.. End of include file
