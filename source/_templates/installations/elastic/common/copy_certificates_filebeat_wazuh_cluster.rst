.. Copyright (C) 2019 Wazuh, Inc.

In section **Installing Elasticsearch**, we created a .zip that contains the files necessaries. You must copy the zip file from the host where was created to the Wazuh server host. You could use ``scp`` for example. Now, let's suppose that the file was copied into the home folder. Before to use the following command, you need to remember the number that you defined this Wazuh server in the ``instances.yml`` file. Replace the ``X`` with the defined number:

.. code-block:: console

  # mkdir /etc/filebeat/certs/ca -p
  # unzip ~/certs.zip -d ~/
  # cp -R ~/filebeat-X/ca/ ~/filebeat-X/* /etc/filebeat/certs/
  # chmod -R 500 /etc/filebeat/certs
  # chmod 400 /etc/filebeat/certs/ca/ca.* /etc/filebeat/certs/filebeat-X.*
  # rm -rf ~/filebeat-X/ ~/certs.zip

.. End of copy_certificates_filebeat_wazuh_cluster.rst
