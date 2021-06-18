.. Copyright (C) 2021 Wazuh, Inc.

#. The next step is the certificates placement, replace the ``X`` with the corresponding node number and execute the following commands.  The ``certs.tar`` file should be placed in ~/ (root home user folder).

    .. code-block:: console

      # mkdir /etc/elasticsearch/certs
      # mv ~/certs.tar /etc/elasticsearch/certs/
      # cd /etc/elasticsearch/certs/
      # tar -xf certs.tar node-X.pem node-X-key.pem root-ca.pem
      # mv /etc/elasticsearch/certs/node-X.pem /etc/elasticsearch/certs/elasticsearch.pem
      # mv /etc/elasticsearch/certs/node-X-key.pem /etc/elasticsearch/certs/elasticsearch-key.pem


#. If Kibana will be installed in this node, keep the certificates file. Otherwise, remove it to increase security  ``rm -f certs.tar``.

.. End of include file
