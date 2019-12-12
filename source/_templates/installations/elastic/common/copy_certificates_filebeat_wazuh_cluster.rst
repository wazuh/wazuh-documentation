.. Copyright (C) 2019 Wazuh, Inc.

Before to use the following command, you need to remember the number that you defined this Wazuh server in the ``instances.yml`` file. Replace the ``X`` with the defined number:

.. code-block:: console

  # mkdir /etc/filebeat/certs/ca -p
  # unzip ~/certs.zip -d ~/certs
  # cp -R ~/certs/ca/ ~/certs/filebeat-X/* /etc/filebeat/certs/
  # mv /etc/filebeat/certs/filebeat-X.crt /etc/filebeat/certs/filebeat.crt
  # mv /etc/filebeat/certs/filebeat-X.key /etc/filebeat/certs/filebeat.key
  # chmod -R 500 /etc/filebeat/certs
  # chmod 400 /etc/filebeat/certs/ca/ca.* /etc/filebeat/certs/filebeat.*
  # rm -rf ~/certs/ ~/certs.zip

.. End of copy_certificates_filebeat_wazuh_cluster.rst
