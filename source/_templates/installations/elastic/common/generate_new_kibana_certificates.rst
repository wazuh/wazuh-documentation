.. Copyright (C) 2020 Wazuh, Inc.

In case of installing Kibana in a different server from the Elasticsearch's one, new certificates for Kibana should be created. This step must be done on the Elasticsearch node where the rest of the certificates were created:

  .. code-block:: console

    # openssl req -new -nodes -newkey rsa:2048 -keyout kibana-key.pem -out kibana.csr -config csr.conf -days 3650
    # openssl x509 -req -in kibana.csr -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -out kibana.pem -extfile csr.conf -extensions v3_req -days 3650

Once the certificate has been created, it must be copied in the Kibana host, for example, using ``scp``. This guide assumes that the file is placed in ~/ (home user folder).

  .. code-block:: console 

    # mkdir /etc/kibana/certs
    # mv ~/certs.zip /etc/kibana/certs/
    # cd /etc/kibana/certs/
    # unzip certs.zip
    # mv /etc/kibana/certs/elasticsearch.pem /etc/kibana/certs/kibana.pem
    # mv /etc/kibana/certs/elasticsearch-key.pem /etc/kibana/certs/kibana-key.pem 

.. End of include file
