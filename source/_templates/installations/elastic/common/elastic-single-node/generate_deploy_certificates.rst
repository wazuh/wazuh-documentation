.. Copyright (C) 2019 Wazuh, Inc.

.. tabs::

  .. group-tab:: Wazuh single-node cluster


    We need to create the specification file ``/usr/share/elasticsearch/instances.yml`` as follow:

    .. code-block:: yaml

      cat > /usr/share/elasticsearch/instances.yml <<\EOF
      instances:
      - name: "elasticsearch"
        ip:
        - "10.0.0.2"
      - name: "filebeat"
        ip:
        - "10.0.0.3"
      EOF

    Replace the ``10.0.0.2`` and ``10.0.0.3`` IPs with your host IPs.

    In the following steps, we will create a file that contains a folder named after the instance defined here. These folders will contain the certificates and the keys necessary to communicate with the Elasticsearch node using SSL.

    Create the certificates using the `elasticsearch-certutil <https://www.elastic.co/guide/en/elasticsearch/reference/current/certutil.html>`_ tool:

    .. code-block:: console

      # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --keep-ca-key --out certs.zip

    Extract the generated ``/usr/share/elasticsearch/certs.zip`` file from the previous step. You can use ``unzip``:

    .. code-block:: console

      # unzip /usr/share/elasticsearch/certs.zip -d ~/

    The next step is to create the directory ``/etc/elasticsearch/certs``, and then copy the certificate authorities, the certificate and the key there:

    .. code-block:: console

      # mkdir /etc/elasticsearch/certs/ca -p
      # cp -R ~/ca/ ~/elasticsearch/* /etc/elasticsearch/certs/
      # chown -R elasticsearch: /etc/elasticsearch/certs
      # chmod -R 500 /etc/elasticsearch/certs
      # chmod 400 /etc/elasticsearch/certs/ca/ca.* /etc/elasticsearch/certs/elasticsearch.*



  .. group-tab:: Wazuh multi-node cluster



    We need to create the specification file ``/usr/share/elasticsearch/instances.yml`` as follow:

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
      EOF

    Every ``name`` section represent one host involved in the Wazuh - Elastic Stack environment. In this example, the file describe:
    - An instance ``elasticsearch`` with IP ``10.0.0.2``. It is an Elasticsearch single-node cluster.
    - Two instances ``filebeat``, the #1 and #2 with their respective IPs ``10.0.0.3`` and ``10.0.0.4``. Both belongs to a two nodes Wazuh cluster. If you want to configure a Wazuh multi-node cluster with three or more nodes, you must define more ``name`` sections with their respective names and IPs.

    Replace the IPs with your host IPs.

    In the following steps, we will create a file that contains the folders named after the instances defined here. These folders will contain the certificates and the keys necessary to communicate with the Elasticsearch node using SSL.

    Create the certificates using the `elasticsearch-certutil <https://www.elastic.co/guide/en/elasticsearch/reference/current/certutil.html>`_ tool:

    .. code-block:: console

      # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --keep-ca-key --out ~/certs.zip

    Extract the generated ``/usr/share/elasticsearch/certs.zip`` file from the previous step. You can use ``unzip``:

    .. code-block:: console

      # unzip ~/certs.zip -d ~/certs

    The next step is to create the directory ``/etc/elasticsearch/certs``, and then copy the certificate authorities, the certificate and the key there:

    .. code-block:: console

      # mkdir /etc/elasticsearch/certs/ca -p
      # cp -R ~/certs/ca/ ~/certs/elasticsearch/* /etc/elasticsearch/certs/
      # chown -R elasticsearch: /etc/elasticsearch/certs
      # chmod -R 500 /etc/elasticsearch/certs
      # chmod 400 /etc/elasticsearch/certs/ca/ca.* /etc/elasticsearch/certs/elasticsearch.*
      # rm -rf ~/certs/ ~/certs.zip

.. End of include file

