.. Copyright (C) 2020 Wazuh, Inc.

During the Elasticsearch installation, the ``certs.tar`` file was created. The file must be copied into the Wazuh server host, for example, using ``scp``. This guide assumes that the file is placed in ~/ (home user folder).

The ``X`` must be replaced with the number used in the certificate name defined for this Wazuh server:

.. code-block:: console

  # mkdir /etc/filebeat/certs
  # mv ~/certs.tar /etc/filebeat/certs/
  # cd /etc/filebeat/certs/
  # tar -xf certs.tar filebeat-X.pem filebeat-X.key root-ca.pem
  # mv /etc/filebeat/certs/filebeat-X.pem /etc/filebeat/certs/filebeat.pem
  # mv /etc/filebeat/certs/filebeat-X.key /etc/filebeat/certs/filebeat.key

.. End of copy_certificates_filebeat_wazuh_cluster.rst
