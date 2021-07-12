.. Copyright (C) 2021 Wazuh, Inc.

During the Elasticsearch installation, the ``certs.tar`` file was created.This guide assumes that a copy of this file has been placed in the root home folder (``~/``).

Replace the ``node_name`` variable with the instance name used to create its certificate. 

.. code-block:: console

  # node_name=filebeat
  # mkdir /etc/filebeat/certs
  # mv ~/certs.tar /etc/filebeat/certs/
  # cd /etc/filebeat/certs/
  # tar -xf certs.tar $node_name.pem $node_name-key.pem root-ca.pem
  # mv /etc/filebeat/certs/$node_name.pem /etc/filebeat/certs/filebeat.pem
  # mv /etc/filebeat/certs/$node_name-key.pem /etc/filebeat/certs/filebeat-key.pem

.. End of copy_certificates_filebeat_wazuh_cluster.rst
