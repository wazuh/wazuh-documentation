.. Copyright (C) 2020 Wazuh, Inc.

In order to allow communication between the different components of the installation, self-signed certificates will be necessary. The following values will be asked during the interactive process:

  #. ``C``: Country name (2 letter code).
  #. ``ST``: State or province name.
  #. ``L``: Locality.
  #. ``O`` : Organization name.
  #. ``OU``: Organizational unit name.        
  #. ``CN``: The IP of the node.

The certificates can be generated as follows:

  #. Move to the installation location and create the certificates directory:

    .. code-block:: console

      # mkdir /etc/elasticsearch/certs
      # cd /etc/elasticsearch/certs

  #. Create the ``csr.conf`` file: 

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

      EOF

  #. Generate the Root CA certificates:

    .. code-block:: console

      # openssl req -x509 -new -nodes -newkey rsa:2048 -keyout root-ca.key -out root-ca.pem -batch -subj "/C=ES/ST=GR/L=Granada/OU=Ops/O=Wazuh" -days 3650

  #. Generate the admin certificate:

    .. code-block:: console

      # openssl req -new -nodes -newkey rsa:2048 -keyout admin-key.pem -out admin.csr -config csr.conf -days 3650
      # openssl x509 -req -in admin.csr -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -out admin.pem -extfile csr.conf -extensions v3_req -days 3650

  #. Generate the Elasticsearch node certificate: 

    .. code-block:: console

      # openssl req -new -nodes -newkey rsa:2048 -keyout elasticsearch-key.pem -out elasticsearch.csr -config csr.conf -days 3650
      # openssl x509 -req -in elasticsearch.csr -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -out elasticsearch.pem -extfile csr.conf -extensions v3_req -days 3650

  #. Generate the Filebeat node certificate: 

    .. code-block:: console

      # openssl req -new -nodes -newkey rsa:2048 -keyout filebeat-key.pem -out filebeat.csr -config csr.conf -days 3650
      # openssl x509 -req -in filebeat.csr -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -out filebeat.pem -extfile csr.conf -extensions v3_req -days 3650

  #. Remove the unnecessary files:

    .. code-block:: console

      # rm admin-key-temp.pem
      # rm admin.csr
      # rm node-key-temp.pem
      # rm node.csr

  #. Compress all the necessary files to be sended to the rest of the involved parts:

    .. code-block:: console

      # zip certs *      

.. End of include file
