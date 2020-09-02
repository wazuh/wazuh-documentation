.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::

  .. group-tab:: Wazuh single-node cluster


    The specification file can be created  ``/usr/share/elasticsearch/instances.yml`` as follows:

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

    Every ``name`` section represents one host involved in the Wazuh - Elastic Stack environment. In this example, the file describes:

    - An ``elasticsearch`` instance with IP ``10.0.0.2``.
    - A ``filebeat`` instance with IP ``10.0.0.3`` corresponding to a single-node Wazuh cluster.

    Replace the IPs of this example with the corresponding addresses for your environment.

   Now a compressed zip file that contains a folder named after each of the instances defined here will be created. This folder will contain the certificates and the keys necessary to communicate with the Elasticsearch node using SSL.

    The certificates can be created using the elasticsearch-certutil tool:

    .. code-block:: console

      # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --keep-ca-key --out ~/certs.zip

    The generated file ``~/certs.zip`` must be copied into the Wazuh server before continuing with the steps below.

    Extract the generated ``/usr/share/elasticsearch/certs.zip`` file from the previous step. ``unzip`` can be used to extract the file:

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



  .. group-tab:: Wazuh multi-node cluster



    The specification file ``/usr/share/elasticsearch/instances.yml`` must be created as follows:

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

    Every ``name`` section corresponds to one host involved in the Wazuh - Elastic Stack environment. In this example, the file describes:

    - An ``elasticsearch`` instance with IP ``10.0.0.2``. It is an Elasticsearch single-node cluster.
    - Two ``filebeat`` instances, the #1 and #2 with their respective IPs ``10.0.0.3`` and ``10.0.0.4``. These correspond to two Wazuh cluster nodes. In case of configuring a Wazuh multi-node cluster with three or more nodes, more ``name`` sections with their respective names and IPs can be defined.

    Replace the IPs of this example with the corresponding addresses for the environment.

    In the following steps, a zip file that contains folders named after the instances defined here will be created. These folders will contain the certificates and the keys necessary to communicate with the Elasticsearch node using SSL.

    Create the certificates using the elasticsearch-certutil tool:

    .. code-block:: console

      # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --keep-ca-key --out ~/certs.zip

    The generated file ``~/certs.zip`` must be copied into the Wazuh servers before continuing with the steps below.

    Extract the generated ``/usr/share/elasticsearch/certs.zip`` file from the previous step. ``unzip`` can be used:

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
