.. Copyright (C) 2020 Wazuh, Inc.

During the Elasticsearch installation, the ``certs.tar`` file was created. The file must be copied into the Wazuh server host, for example, using ``scp``. This guide assumes that the file is placed in the root home folder (``~/``):

.. code-block:: console

  # mkdir /etc/filebeat/certs
  # mv ~/certs.tar /etc/filebeat/certs/
  # cd /etc/filebeat/certs/
  # tar -xf certs.tar filebeat.pem filebeat.key root-ca.pem


.. End of copy_certificates_filebeat.rst
