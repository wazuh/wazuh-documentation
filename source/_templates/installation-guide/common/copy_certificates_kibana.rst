.. Copyright (C) 2019 Wazuh, Inc.

In section Installing elasticsearch, we created a .zip that contains the files necessaries. You must copy the zip file from the host where was created to the Kibana host. You could use ``scp`` for example. Now, let's suppose that the file was copied into ``/usr/share/kibana/``.

.. code-block:: console

  # mkdir /etc/kibana/certs/ca -p
  # unzip /usr/share/kibana/certs.zip -d /usr/share/kibana/
  # cp -R /usr/share/kibana/ca/ /usr/share/kibana/elasticsearch/* /etc/kibana/certs/
  # chown -R kibana:kibana /etc/kibana/
  # chmod -R 500 /etc/kibana/certs
  # chmod 440 /etc/kibana/certs/ca/ca.* /etc/kibana/certs/elasticsearch.*

.. End of copy_certificates_kibana.rst
