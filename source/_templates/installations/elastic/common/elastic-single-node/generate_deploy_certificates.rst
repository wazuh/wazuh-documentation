.. Copyright (C) 2020 Wazuh, Inc.

The certificates can be generated as follows:

  #. Move to the installation location and create the certificates directory:

    .. code-block:: console

      # mkdir /etc/elasticsearch/certs
      # cd /etc/elasticsearch/certs

  #. Generate the Root CA certificates:

    .. code-block:: console

      # openssl req -x509 -new -nodes -newkey rsa:2048 -keyout root-ca.key -out root-ca.pem -batch -subj "/C=ES/ST=GR/L=Granada/OU=Ops/O=Wazuh" -days 3650

  #. Create the ``admin.conf`` file for the admin certificate: 

    .. code-block:: console

      # cat  > admin.conf  <<\EOF
      [ req ]
      prompt = no
      default_bits = 2048
      default_md = sha256
      distinguished_name = req_distinguished_name
      x509_extensions = v3_req
      
      [req_distinguished_name]
      C = US
      ST = California
      L = California
      O = Wazuh
      OU = Docu
      CN = admin
      
      [ v3_req ]
      authorityKeyIdentifier=keyid,issuer
      basicConstraints = CA:FALSE
      keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
      subjectAltName = @alt_names
      
      [alt_names]
      IP.1 = <elasticsearch_node_IP>

      EOF 

    Replace the ``elasticsearch_node_IP`` with the Elasticsearch's host IP.     

  #. Generate the admin certificate:

    .. code-block:: console

      # openssl req -new -nodes -newkey rsa:2048 -keyout admin-key.pem -out admin.csr -config admin.conf -days 3650
      # openssl x509 -req -in admin.csr -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -out admin.pem -extfile admin.conf -extensions v3_req -days 3650

  #. Create the ``filebeat.conf`` file for the elasticsearch node certificate: 

    .. code-block:: console

      # cat  > filebeat.conf  <<\EOF
      [ req ]
      prompt = no
      default_bits = 2048
      default_md = sha256
      distinguished_name = req_distinguished_name
      x509_extensions = v3_req
      
      [req_distinguished_name]
      C = US
      ST = California
      L = California
      O = Wazuh
      OU = Docu
      CN = node-1
      
      [ v3_req ]
      authorityKeyIdentifier=keyid,issuer
      basicConstraints = CA:FALSE
      keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
      subjectAltName = @alt_names
      
      [alt_names]
      IP.1 = <elasticsearch_node_IP>

      EOF 

    Replace the ``elasticsearch_node_IP`` with the Elasticsearch's host IP.        
  
  #. Generate the Elasticsearch node certificate: 

    .. code-block:: console

      # openssl req -new -nodes -newkey rsa:2048 -keyout elasticsearch-key.pem -out elasticsearch.csr -config filebeat.conf -days 3650
      # openssl x509 -req -in elasticsearch.csr -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -out elasticsearch.pem -extfile filebeat.conf -extensions v3_req -days 3650
      # chmod 444 /etc/elasticsearch/certs/elasticsearch-key.pem

  #. Create the ``filebeat.conf`` file for the Filebeat certificate: 

    .. code-block:: console

      # cat  > filebeat.conf  <<\EOF
      [ req ]
      prompt = no
      default_bits = 2048
      default_md = sha256
      distinguished_name = req_distinguished_name
      x509_extensions = v3_req
      
      [req_distinguished_name]
      C = US
      ST = California
      L = California
      O = Wazuh
      OU = Docu
      CN = filebeat
      
      [ v3_req ]
      authorityKeyIdentifier=keyid,issuer
      basicConstraints = CA:FALSE
      keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
      subjectAltName = @alt_names
      
      [alt_names]
      IP.1 = <Wazuh_server_IP>

      EOF 

    Replace the ``Wazuh_server_IP`` with the Wazuh server's host IP.      

  #. Generate the Filebeat node certificate: 

    .. code-block:: console

      # openssl req -new -nodes -newkey rsa:2048 -keyout filebeat-key.pem -out filebeat.csr -config filebeat.conf -days 3650
      # openssl x509 -req -in filebeat.csr -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -out filebeat.pem -extfile filebeat.conf -extensions v3_req -days 3650

  #. Compress all the necessary files to be sended to the rest of the involved parts:

    .. code-block:: console

      # zip certs *      

.. End of include file
