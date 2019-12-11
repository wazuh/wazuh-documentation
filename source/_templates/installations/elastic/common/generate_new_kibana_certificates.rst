.. Copyright (C) 2019 Wazuh, Inc.

It is necessary to create new certificates for the new server where Kibana will be installed. This process has to be done in the Elasticsearch master node where we created the other certificates. Once logged there, a new specification file must be created ``/usr/share/elasticsearch/instances.yml`` as follow:

.. code-block:: yaml

  cat > /usr/share/elasticsearch/instances.yml <<\EOF
  instances:
  - name: "kibana"
    ip:
    - "10.0.0.8"
  EOF

Replace the ``10.0.0.8`` IP with your Kibana server IP.

In the following steps, we will create a file that contains a folder named after the instance defined here. This folder will contain the certificate and the key necessary to communicate with the Elasticsearch node using SSL.

Create the certificates using the `elasticsearch-certutil <https://www.elastic.co/guide/en/elasticsearch/reference/current/certutil.html>`_ tool:

.. code-block:: console

  # /usr/share/elasticsearch/bin/elasticsearch-certutil cert --ca /usr/share/elasticsearch/ca/ca.key  --ca-cert /usr/share/elasticsearch/ca/ca.crt --in instances.yml --keep-ca-key --out certs.zip

The file created contains the ``ca.key`` due to the ``--keep-ca-key`` modifier. You have to distribute the zip file but we recommend not distributing it with the ``ca.key``. You can remove it from the zip file as follow:

.. code-block:: console

  # zip -d /usr/share/elasticsearch/certs.zip "ca/ca.key"

This is the ``zip`` content:

.. code-block:: console

  certs.zip
  |-- ca
      |-- ca.crt
  |-- kibana
      |-- kibana.crt
      |-- kibana.key

Copy the generated ``/usr/share/elasticsearch/certs.zip`` file from the previous step into the Kibana server. This example will suppose that it will be placed at home folder ``~/``.

Once logged again into the Kibana server, extract the generated ``/usr/share/elasticsearch/certs.zip`` file from the previous step. You can use ``unzip``:

.. code-block:: console

  # unzip ~/certs.zip -d ~/

The next step is to create the directory ``/etc/elasticsearch/certs``, and then copy the certificate authorities, the certificate and the key there:

.. code-block:: console

  # mkdir /etc/kibana/certs/ca -p
  # cp -R ~/ca/ ~/kibana/* /etc/kibana/certs/
  # chown -R kibana: /etc/kibana/certs
  # chmod -R 500 /etc/kibana/certs
  # chmod 400 /etc/kibana/certs/ca/ca.* /etc/kibana/certs/kibana.*

.. End of include file
