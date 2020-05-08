.. Copyright (C) 2020 Wazuh, Inc.

In case of installing Kibana in a different server from the Elasticsearch's one, new certificates for Kibana should be created. This step must be done on the Elasticsearch node where the rest of the certificates were created:

#. Create the ``kibana.conf`` file for the Kibana certificate: 

  .. code-block:: console

    # cat  > kibana.conf  <<\EOF
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
    IP.1 = <kibana_IP>

    EOF      

  Replace the ``kibana_IP`` with the Kibana's host IP.

#. Generate the admin certificate:

  .. code-block:: console

    # openssl req -new -nodes -newkey rsa:2048 -keyout admin-key.pem -out admin.csr -config kibana.conf -days 3650
    # openssl x509 -req -in admin.csr -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -out admin.pem -extfile kibana.conf -extensions v3_req -days 3650

Once the certificate has been created, it must be copied in the Kibana host, for example, using ``scp``. This guide assumes that the file is placed in ~/ (home user folder).

  .. code-block:: console 

    # mkdir /etc/kibana/certs
    # mv ~/certs.zip /etc/kibana/certs/
    # cd /etc/kibana/certs/
    # unzip certs.zip
    # mv /etc/kibana/certs/elasticsearch.pem /etc/kibana/certs/kibana.pem
    # mv /etc/kibana/certs/elasticsearch-key.pem /etc/kibana/certs/kibana-key.pem 
    # chmod 444 /etc/kibana/certs/kibana-key.pem

.. End of include file
