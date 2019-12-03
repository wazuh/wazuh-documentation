.. Copyright (C) 2019 Wazuh, Inc.

We need to create the specification file ``/usr/share/elasticsearch/instances.yml`` as follow:

.. code-block:: yaml

  cat > /usr/share/elasticsearch/instances.yml <<\EOF
  instances:
  - name: "elasticsearch"
    ip:
    - "10.0.0.2"
  EOF

Replace the ``10.0.0.2`` IP with your host IP.

In the following steps, we will create a file that contains a folder named after the instance defined here. This folder will contain the certificate and the key necessary to communicate with the Elasticsearch node using SSL.

Create the certificates using the `elasticsearch-certutil <https://www.elastic.co/guide/en/elasticsearch/reference/current/certutil.html>`_ tool:

.. code-block:: console

  # /usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --keep-ca-key --out certs.zip

This is the ``zip`` content:

.. code-block:: console

  certs.zip
  |-- ca
      |-- ca.crt
      |-- ca.key
  |-- elasticsearch
      |-- elasticsearch.crt
      |-- elasticsearch.key

Extract the generated ``/usr/share/elasticsearch/certs.zip`` file from the previous step. You can use ``unzip``:

.. code-block:: console

  # unzip /usr/share/elasticsearch/certs.zip -d /usr/share/elasticsearch/

The next step is to create the directory ``/etc/elasticsearch/certs``, and then copy the certificate authorities, the certificate and the key there:

.. code-block:: console

  # mkdir /etc/elasticsearch/certs/ca -p
  # cp -R /usr/share/elasticsearch/ca/ /usr/share/elasticsearch/elasticsearch/* /etc/elasticsearch/certs/
  # chown -R elasticsearch: /etc/elasticsearch/certs
  # chmod -R 500 /etc/elasticsearch/certs
  # chmod 400 /etc/elasticsearch/certs/ca/ca.* /etc/elasticsearch/certs/elasticsearch.*

.. End of include file
