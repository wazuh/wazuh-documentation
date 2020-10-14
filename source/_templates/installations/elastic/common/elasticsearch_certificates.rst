#. Create the Elasticsearch's certificates directory: 

.. code-block:: console

    # mkdir /etc/elasticsearch/certs/
    # cd /etc/elasticsearch/certs/

#. Create the ``root`` certificate:

    .. code-block:: console

        # openssl genrsa -out root-ca-key.pem 2048 && openssl req -new -x509 -sha256 -key root-ca-key.pem -out root-ca.pem


#. Create the ``admin`` certificate:

    .. code-block:: console

        # openssl genrsa -out admin-key-temp.pem 2048 && openssl pkcs8 -inform PEM -outform PEM -in admin-key-temp.pem -topk8 -nocrypt -v1 PBE-SHA1-3DES -out admin-key.pem

        # openssl req -new -key admin-key.pem -out admin.csr && openssl x509 -req -in admin.csr -CA root-ca.pem -CAkey root-ca-key.pem -CAcreateserial -sha256 -out admin.pem


#. Create the ``node`` certificate:

    .. code-block:: console

        # openssl genrsa -out node-key-temp.pem 2048 && openssl pkcs8 -inform PEM -outform PEM -in node-key-temp.pem -topk8 -nocrypt -v1 PBE-SHA1-3DES -out node-key.pem

        # openssl req -new -key node-key.pem -out node.csr && openssl x509 -req -in node.csr -CA root-ca.pem -CAkey root-ca-key.pem -CAcreateserial -sha256 -out node.pem

#. Edit the ``elasticsearch.yml`` file: