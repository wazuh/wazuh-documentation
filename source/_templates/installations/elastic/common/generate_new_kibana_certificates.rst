.. Copyright (C) 2020 Wazuh, Inc.

It is necessary to create new certificates for the new server where Kibana will be installed. This process has to be done in the Elasticsearch master node where we created the other certificates. Once logged there, use the following command: 

.. code-block:: console

  # /usr/share/elasticsearch/bin/elasticsearch-certutil cert --pem \
    --ca-key /etc/elasticsearch/certs/ca/ca.key \
    --ca-cert /etc/elasticsearch/certs/ca/ca.crt \
    --name kibana \
    --ip 10.0.0.7 \
    --out ~/kibana.zip 

The ``ca.crt`` will be needed. It can be added as follow:

.. code-block:: console

  # zip -j ~/kibana.zip /etc/elasticsearch/certs/ca/ca.crt

Copy the generated ``~/kibana.zip`` file from the previous step into the Kibana server. This example will suppose that it will be placed at home folder ``~/``.

Once logged again into the Kibana server, extract the generated ``~/kibana.zip`` file. You can use ``unzip``:

.. code-block:: console

  # unzip ~/kibana.zip -d ~/certs

The next step is to create the directory ``/etc/elasticsearch/certs``, and then copy the certificate authorities, the certificate and the key there:

.. code-block:: console

  # mkdir /etc/kibana/certs/ca -p
  # cp ~/certs/ca.crt /etc/kibana/certs/ca
  # cp ~/certs/kibana/* /etc/kibana/certs/
  # chown -R kibana: /etc/kibana/certs
  # chmod -R 500 /etc/kibana/certs
  # chmod 400 /etc/kibana/certs/ca/ca.* /etc/kibana/certs/kibana.*
  # rm -rf ~/certs ~/kibana.zip

.. End of include file
