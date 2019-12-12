.. Copyright (C) 2019 Wazuh, Inc.

.. tabs::

  .. group-tab:: Wazuh single-node cluster


    We need to create the specification file ``/usr/share/elasticsearch/instances.yml`` as follow:

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
      EOF

    Every ``name`` section represent one host involved in the Wazuh - Elastic Stack environment. In this example, the file describe:
    - An instance ``filebeat`` with IP ``10.0.0.5``. It is an Wazuh single-node cluster.
    - Three instances ``elasticsearch``, the #1, #2 and #3 with their respective IPs ``10.0.0.2``,``10.0.0.3`` and ``10.0.0.4``. Both belongs to a three nodes Elasticsearch cluster. If you want to configure a Elasticsearch multi-node cluster with four or more nodes, you must define more ``name`` sections with their respective names and IPs.

    Replace the IPs with your host IPs.

    In the following steps, we will create a file that contains a folder named after the instance defined here. These folders will contain the certificates and the keys necessary to communicate with the Elasticsearch node using SSL.

    Create the certificates using the `elasticsearch-certutil <https://www.elastic.co/guide/en/elasticsearch/reference/current/certutil.html>`_ tool:

    .. code-block:: console

      # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --keep-ca-key --out ~/certs.zip

    The file created contains the ``ca.key`` due to the ``--keep-ca-key`` modifier. The ``certs.zip`` file must be distributed along all the involved servers defined in the file ``instances.yml``. We recommend not distributing it with the ``ca.key``. You can remove it from the zip file as follow:

    .. code-block:: console

      # zip -d ~/certs.zip "ca/ca.key"



  .. group-tab:: Wazuh multi-node cluster



    We need to create the specification file ``/usr/share/elasticsearch/instances.yml`` as follow:

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
      EOF

    Every ``name`` section represent one host involved in the Wazuh - Elastic Stack environment. In this example, the file describe:
    - Two instances ``filebeat``, the #1 and #2 with their respective IPs ``10.0.0.5`` and ``10.0.0.6``. Both belongs to a two nodes Wazuh cluster. If you want to configure a Wazuh multi-node cluster with three or more nodes, you must define more ``name`` sections with their respective names and IPs.
    - Three instances ``elasticsearch``, the #1, #2 and #3 with their respective IPs ``10.0.0.2``,``10.0.0.3`` and ``10.0.0.4``. Both belongs to a three nodes Elasticsearch cluster. If you want to configure a Elasticsearch multi-node cluster with four or more nodes, you must define more ``name`` sections with their respective names and IPs.

    Replace the IPs with your host IPs.

    In the following steps, we will create a file that contains the folders named after the instances defined here. These folders will contain the certificates and the keys necessary to communicate with the Elasticsearch node using SSL.

    Create the certificates using the `elasticsearch-certutil <https://www.elastic.co/guide/en/elasticsearch/reference/current/certutil.html>`_ tool:

    .. code-block:: console

      # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --keep-ca-key --out ~/certs.zip

    The file created contains the ``ca.key`` due to the ``--keep-ca-key`` modifier. The ``certs.zip`` file must be distributed along all the involved servers defined in the file ``instances.yml``. We recommend not distributing it with the ``ca.key``. You can remove it from the zip file as follow:

    .. code-block:: console

      # zip -d ~/certs.zip "ca/ca.key"

The ``cert.zip`` must be distributed across all ``instances.yml`` defined servers. This guide will assume that the file will be placed in ~/ (home user folder).

.. End of include file
