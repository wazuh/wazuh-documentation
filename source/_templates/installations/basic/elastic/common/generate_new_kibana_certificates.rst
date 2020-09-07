.. Copyright (C) 2020 Wazuh, Inc.

It is necessary to create new certificates for the server where Kibana will be installed. This process has to be done in the Elasticsearch initial node where the other certificates were created. Once logged in there, the following command has to be used:

.. code-block:: console

  # /usr/share/elasticsearch/bin/elasticsearch-certutil cert --pem \
    --ca-key /etc/elasticsearch/certs/ca/ca.key \
    --ca-cert /etc/elasticsearch/certs/ca/ca.crt \
    --name kibana \
    --ip <kibana_ip> \
    --out ~/kibana.zip

Add the ``ca.crt`` to the created ``kibana.zip`` file as follows:

.. code-block:: console

  # zip -j ~/kibana.zip /etc/elasticsearch/certs/ca/ca.crt

Copy the ``kibana.zip`` file to the Kibana server. This example assumes that the file is placed at home folder ``~/``.

Extract the ``kibana.zip`` file. If ``unzip`` is used, the command looks as follows:

.. code-block:: console

  # unzip ~/kibana.zip -d ~/certs

The next step is to create the directory ``/etc/elasticsearch/certs``, and copy the certificate authorities, the certificate and the key there:

.. code-block:: console

  # mkdir /etc/kibana/certs/ca -p
  # cp ~/certs/ca.crt /etc/kibana/certs/ca
  # cp ~/certs/kibana/* /etc/kibana/certs/
  # chown -R kibana: /etc/kibana/certs
  # chmod -R 500 /etc/kibana/certs
  # chmod 400 /etc/kibana/certs/ca/ca.* /etc/kibana/certs/kibana.*
  # rm -rf ~/certs ~/kibana.zip

.. End of include file
