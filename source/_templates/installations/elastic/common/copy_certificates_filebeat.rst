.. Copyright (C) 2020 Wazuh, Inc.

In section **Installing Elasticsearch**, the ``certs.zip`` file was created. The file must be copied into the Wazuh server host, for example, using ``scp``. This guide assumes that the file is placed in ~/ (home user folder).

.. code-block:: console

    # mkdir /etc/filebeat/certs
    # mv ~/certs.zip /etc/filebeat/certs/
    # cd /etc/filebeat/certs/
    # unzip certs.zip
    # chmod 444 /etc/filebeat/certs/filebeat-key.pem 

.. End of copy_certificates_filebeat.rst
