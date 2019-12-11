.. Copyright (C) 2019 Wazuh, Inc.

The next step is to create the directory ``/etc/elasticsearch/certs``, and then copy the certificate authorities, the certificate and the key there. Remember to replace the ``X`` according to the defined ``instances.yml`` file:

.. code-block:: console

  # unzip ~/certs.zip -d ~/certs
  # mkdir /etc/elasticsearch/certs/ca -p
  # cp -R ~/certs/ca/ ~/certs/elasticsearch-X/* /etc/elasticsearch/certs/
  # chown -R elasticsearch: /etc/elasticsearch/certs
  # chmod -R 500 /etc/elasticsearch/certs
  # chmod 400 /etc/elasticsearch/certs/ca/ca.* /etc/elasticsearch/certs/elasticsearch.*
  # rm -rf ~/certs/ ~/certs.zip


.. End of include file
