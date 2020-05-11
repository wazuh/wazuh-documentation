.. Copyright (C) 2020 Wazuh, Inc.

The certificates can be generated as follows:

  #. Move to the installation location and create the certificates directory:

    .. code-block:: console

      # mkdir /etc/elasticsearch/certs
      # cd /etc/elasticsearch/certs

  #. Generate the Root CA certificates:

    .. code-block:: console

      # openssl req -x509 -new -nodes -newkey rsa:2048 -keyout root-ca.key -out root-ca.pem -batch -subj "/C=US/ST=California/L=California/OU=Docu/O=Wazuh" -days 3650

  #. Create the ``admin.conf`` file for the admin certificate, replacing the ``elasticsearch_node_IP`` with the Elasticsearch's host IP:

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


  #. Generate the admin certificate:

    .. code-block:: console

      # openssl req -new -nodes -newkey rsa:2048 -keyout admin-key.pem -out admin.csr -config admin.conf -days 3650
      # openssl x509 -req -in admin.csr -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -out admin.pem -extfile admin.conf -extensions v3_req -days 3650

  #. Create the ``elasticsearch.conf`` file for the elasticsearch node certificate, replacing the ``elasticsearch_node_IP`` with the Elasticsearch's host IP:

    .. code-block:: console

      # cat  > elasticsearch.conf  <<\EOF
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


  #. Generate the Elasticsearch node certificate:

    .. code-block:: console

      # openssl req -new -nodes -newkey rsa:2048 -keyout elasticsearch-key.pem -out elasticsearch.csr -config elasticsearch.conf -days 3650
      # openssl x509 -req -in elasticsearch.csr -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -out elasticsearch.pem -extfile elasticsearch.conf -extensions v3_req -days 3650
      # chmod 444 /etc/elasticsearch/certs/elasticsearch-key.pem

  .. tabs::

    .. group-tab:: Wazuh single-node cluster

      #. Create the ``filebeat.conf`` file for the Filebeat certificate, replacing the ``Wazuh_server_IP`` with the Wazuh server's host IP:

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


      #. Generate the Filebeat node certificate:

        .. code-block:: console

          # openssl req -new -nodes -newkey rsa:2048 -keyout filebeat-key.pem -out filebeat.csr -config filebeat.conf -days 3650
          # openssl x509 -req -in filebeat.csr -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -out filebeat.pem -extfile filebeat.conf -extensions v3_req -days 3650

    .. group-tab:: Wazuh multi-node cluster

      #. Create the ``filebeat-1.conf`` file for the Filebeat certificate, replacing the ``Wazuh_server_1_IP`` with the Wazuh server's host IP:

        .. code-block:: console

          # cat  > filebeat-1.conf  <<\EOF
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
          CN = filebeat-1

          [ v3_req ]
          authorityKeyIdentifier=keyid,issuer
          basicConstraints = CA:FALSE
          keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
          subjectAltName = @alt_names

          [alt_names]
          IP.1 = <Wazuh_server_1_IP>

          EOF


      #. Generate the Filebeat node 1 certificate:

        .. code-block:: console

          # openssl req -new -nodes -newkey rsa:2048 -keyout filebeat-1-key.pem -out filebeat-1.csr -config filebeat-1.conf -days 3650
          # openssl x509 -req -in filebeat-1.csr -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -out filebeat-1.pem -extfile filebeat-1.conf -extensions v3_req -days 3650

      #. Create the ``filebeat-2.conf`` file for the Filebeat certificate, replacing the ``Wazuh_server_2_IP`` with the Wazuh server's host IP:

        .. code-block:: console

          # cat  > filebeat-2.conf  <<\EOF
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
          CN = filebeat-2

          [ v3_req ]
          authorityKeyIdentifier=keyid,issuer
          basicConstraints = CA:FALSE
          keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
          subjectAltName = @alt_names

          [alt_names]
          IP.1 = <Wazuh_server_2_IP>

          EOF


      #. Generate the Filebeat node 2 certificate:

        .. code-block:: console

          # openssl req -new -nodes -newkey rsa:2048 -keyout filebeat-2-key.pem -out filebeat-2.csr -config filebeat-2.conf -days 3650
          # openssl x509 -req -in filebeat-2.csr -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -out filebeat-2.pem -extfile filebeat-2.conf -extensions v3_req -days 3650

      This step has to be repeated for every Wazuh server node in the installation replacing the certificate name (``filebeat-X``), ``CN``, and ``Wazuh_server_X_IP`` by the corresponding one.

  #. Remove all the unnecessary files:

    .. code-block:: console

      # rm /etc/elasticsearch/certs/*.conf /etc/elasticsearch/certs/*.csr

  #. Compress all the necessary files to be sended to the rest of the involved parts:

    .. code-block:: console

      # tar -cf certs.tar *

.. End of include file
