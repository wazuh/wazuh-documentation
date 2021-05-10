.. Copyright (C) 2021 Wazuh, Inc.

During the Elasticsearch installation, the ``certs.tar`` file was created. This guide assumes that a copy of this file has been placed in the root home folder (``~/``):

.. code-block:: console

  # mkdir /etc/filebeat/certs
  # mv ~/certs.tar /etc/filebeat/certs/
  # cd /etc/filebeat/certs/
  # tar -xf certs.tar filebeat.pem filebeat.key root-ca.pem


.. End of copy_certificates_filebeat.rst
