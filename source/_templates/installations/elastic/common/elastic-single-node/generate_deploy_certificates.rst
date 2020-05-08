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

  #. Generate the Root CA certificates:

    .. code-block:: console

      # openssl genrsa -out root-ca-key.pem 2048
      # openssl req -new -x509 -sha256 -key root-ca-key.pem -out root-ca.pem

  #. Generate the admin certificate:

    .. code-block:: console

      # openssl genrsa -out admin-key-temp.pem 2048
      # openssl pkcs8 -inform PEM -outform PEM -in admin-key-temp.pem -topk8 -nocrypt -v1 PBE-SHA1-3DES -out admin-key.pem
      # openssl req -new -key admin-key.pem -out admin.csr
      # openssl x509 -req -in admin.csr -CA root-ca.pem -CAkey root-ca-key.pem -CAcreateserial -sha256 -out admin.pem

  #. Generate the Elasticsearch node certificate: 

    .. code-block:: console

      # openssl genrsa -out elasticsearch-key-temp.pem 2048
      # openssl pkcs8 -inform PEM -outform PEM -in elasticsearch-key-temp.pem -topk8 -nocrypt -v1 PBE-SHA1-3DES -out elasticsearch-key.pem
      # openssl req -new -key elasticsearch-key.pem -out elasticsearch.csr
      # openssl x509 -req -in elasticsearch.csr -CA root-ca.pem -CAkey root-ca-key.pem -CAcreateserial -sha256 -out elasticsearch.pem

  #. Generate the Filebeat node certificate: 

    .. code-block:: console

      # openssl genrsa -out filebeat-key-temp.pem 2048
      # openssl pkcs8 -inform PEM -outform PEM -in filebeat-key-temp.pem -topk8 -nocrypt -v1 PBE-SHA1-3DES -out filebeat-key.pem
      # openssl req -new -key filebeat-key.pem -out filebeat.csr
      # openssl x509 -req -in filebeat.csr -CA root-ca.pem -CAkey root-ca-key.pem -CAcreateserial -sha256 -out filebeat.pem

  #. Generate the Filebeat node certificate: 

    .. code-block:: console

      # openssl genrsa -out kibana-key-temp.pem 2048
      # openssl pkcs8 -inform PEM -outform PEM -in kibana-key-temp.pem -topk8 -nocrypt -v1 PBE-SHA1-3DES -out kibana-key.pem
      # openssl req -new -key kibana-key.pem -out kibana.csr
      # openssl x509 -req -in kibana.csr -CA root-ca.pem -CAkey root-ca-key.pem -CAcreateserial -sha256 -out kibana.pem

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
