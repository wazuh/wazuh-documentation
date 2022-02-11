.. Copyright (C) 2022 Wazuh, Inc.

In section **Installing Elasticsearch**, the ``certs.zip`` file was created. The file must be copied into the Wazuh server host, for example, using ``scp``. This guide assumes that the file is placed in ~/ (home user folder).

The ``X`` must be replaced with the number defined for this Wazuh server in the ``instances.yml`` file:

.. code-block:: console

  # mkdir /etc/filebeat/certs/ca -p
  # zip -d ~/certs.zip "ca/ca.key"
  # unzip ~/certs.zip -d ~/certs
  # cp -R ~/certs/ca/ ~/certs/filebeat-X/* /etc/filebeat/certs/
  # mv /etc/filebeat/certs/filebeat-X.crt /etc/filebeat/certs/filebeat.crt
  # mv /etc/filebeat/certs/filebeat-X.key /etc/filebeat/certs/filebeat.key
  # chmod -R 500 /etc/filebeat/certs
  # chmod 400 /etc/filebeat/certs/ca/ca.* /etc/filebeat/certs/filebeat.*
  # rm -rf ~/certs/ ~/certs.zip

.. End of copy_certificates_filebeat_wazuh_cluster.rst
