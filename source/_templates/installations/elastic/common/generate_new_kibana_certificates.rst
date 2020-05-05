.. Copyright (C) 2020 Wazuh, Inc.

In section **Installing Elasticsearch**, the ``certs.zip`` file was created. The file must be copied into the Wazuh server host, for example, using ``scp``. This guide assumes that the file is placed in ~/ (home user folder).

  .. code-block:: console 

    # mkdir /etc/kibana/certs
    # mv ~/certs.zip /etc/kibana/certs/
    # cd /etc/kibana/certs/
    # unzip certs.zip
    # mv /etc/kibana/certs/elasticsearch.pem /etc/kibana/certs/kibana.pem
    # mv /etc/kibana/certs/elasticsearch-key.pem /etc/kibana/certs/kibana-key.pem 

.. End of include file
