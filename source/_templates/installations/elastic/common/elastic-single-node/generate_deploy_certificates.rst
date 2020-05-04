.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::

  .. group-tab:: Wazuh single-node cluster


    In order to allow communication between the different components of the installation, self-signed certificates will be necessary. They can be created as follows:

    Move to the installation location and create the certificates directory:

      .. code-block:: console

        # mkdir /etc/elasticsearch/certs
        # cd /etc/elasticsearch/certs
    
    Create a configuration file: 

      .. code-block:: console

        # cat  > csr.conf  <<\EOF
        [ req ]
        prompt = no
        default_bits = 2048
        default_md = sha256
        distinguished_name = req_distinguished_name
        x509_extensions = v3_req
        
        [req_distinguished_name]
        C = ES
        ST = GR
        L = Granada
        O = Wazuh
        OU = Ops
        CN = DNS_Name
        
        [ v3_req ]
        authorityKeyIdentifier=keyid,issuer
        basicConstraints = CA:FALSE
        keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
        subjectAltName = @alt_names
        
        [alt_names]
        IP.1 = LOCAL_IP
        DNS.1 = LOCAL_DNS

        EOF

    Generate the ``root-ca`` public and private keys:

      .. code-block:: console

        # openssl req -x509 -new -nodes -newkey rsa:2048 -keyout root-ca.key -out root-ca.pem -batch -subj "/C=<country>/ST=<state>/L=<location>/OU=<organizational_unit>/O=<organization>" -days 3650

      The following values should be replaced by the desired ones:

        #. ``C``: Country name (2 letter code).
        #. ``ST``: State or province name.
        #. ``L``: Locality.
        #. ``OU``: Organizational unit name.
        #. ``O`` : Organization name.

    Generate the ``csr`` and the server's node private key:

      .. code-block:: console

        # openssl req -new -nodes -newkey rsa:2048 -keyout elasticsearch-key.pem -out elasticsearch.csr -config csr.conf -days 3650

    Generate the server's certificate:

      .. code-block:: console

        # openssl x509 -req -in elasticsearch.csr -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -out elasticsearch.pem -extfile csr.conf -extensions v3_req -days 3650

    Compress the certificate directory: 

      .. code-block:: console

        # cd /etc/elasticsearch/certs && zip certs *

  .. group-tab:: Wazuh multi-node cluster



    In order to allow communication between the different components of the installation, self-signed certificates will be necessary. They can be created as follows:

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

    Every ``name`` section represents one host involved in the Wazuh - Elastic Stack environment. In this example, the file describes:

    - An ``elasticsearch`` instance with IP ``10.0.0.2``. It is an Elasticsearch single-node cluster.
    - Two ``filebeat`` instances, the #1 and #2 with their respective IPs ``10.0.0.3`` and ``10.0.0.4``. These correspond to two Wazuh cluster nodes. In case of configuring a Wazuh multi-node cluster with three or more nodes, more ``name`` sections with their respective names and IPs can be defined.

    Replace the IPs of this example with the addresses of the hosts in your enviornment.

    In the following steps, a zip file that contains folders named after the instances defined here will be created. These folders will contain the certificates and the keys necessary to communicate with the Elasticsearch node using SSL.

    Create the certificates using the `elasticsearch-certutil <https://www.elastic.co/guide/en/elasticsearch/reference/current/certutil.html>`_ tool:

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
