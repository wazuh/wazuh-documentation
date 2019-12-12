.. Copyright (C) 2019 Wazuh, Inc.

In section **Installing Elasticsearch**, we created a .zip that contains the files necessaries. You must copy the zip file from the host where was created to the Wazuh server host. You could use ``scp`` for example. Now, let's suppose that the file was copied into home folder.

.. code-block:: console

  # mkdir /etc/filebeat/certs/ca -p
  # unzip ~/certs.zip -d ~/certs
  # cp -R ~/ca/ ~/filebeat/* /etc/filebeat/certs/
  # chmod -R 500 /etc/filebeat/certs
  # chmod 400 /etc/filebeat/certs/ca/ca.* /etc/filebeat/certs/filebeat.*
  # rm -rf ~/certs/ ~/certs.zip

.. End of copy_certificates_filebeat.rst
