.. Copyright (C) 2020 Wazuh, Inc.

In section **Installing Elasticsearch**, the ``certs.zip`` file was created. The file must be copied into the Wazuh server host, for example, using ``scp``. This guide assumes that the file is placed in ~/ (home user folder).

.. code-block:: console

    # mkdir /etc/filebeat/certs
    # mv ~/certs.zip /etc/filebeat/certs/
    # cd /etc/kibana/certs/
    # unzip certs.zip
    # mv /etc/elasticsearch/elasticsearch.pem /etc/elasticsearch/filebeat.pem
    # mv /etc/elasticsearch/elasticsearch-key.pem /etc/elasticsearch/filebeat-key.pem 

.. End of copy_certificates_filebeat.rst
