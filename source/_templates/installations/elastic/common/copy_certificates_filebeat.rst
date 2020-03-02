.. Copyright (C) 2020 Wazuh, Inc.

In section **Installing Elasticsearch**, a .zip that contains the necessary files was created. The zip file must be copied from the host where was created into the Wazuh server host. ``scp`` can be used for example. This example supposes that the file has been copied into the home folder.

.. code-block:: console

  # mkdir /etc/filebeat/certs/ca -p
  # zip -d ~/certs.zip "ca/ca.key"
  # unzip ~/certs.zip -d ~/certs
  # cp -R ~/certs/ca/ ~/certs/filebeat/* /etc/filebeat/certs/
  # chmod -R 500 /etc/filebeat/certs
  # chmod 400 /etc/filebeat/certs/ca/ca.* /etc/filebeat/certs/filebeat.*
  # rm -rf ~/certs/ ~/certs.zip

.. End of copy_certificates_filebeat.rst
