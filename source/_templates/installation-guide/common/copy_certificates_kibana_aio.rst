.. Copyright (C) 2019 Wazuh, Inc.

.. code-block:: console

  # mkdir /etc/kibana/certs/ca -p
  # cp -R /etc/elasticsearch/certs/ca/ /etc/elasticsearch/certs/*.* /etc/kibana/certs/
  # chown -R kibana:kibana /etc/kibana/
  # chmod -R 500 /etc/kibana/certs
  # chmod 440 /etc/kibana/certs/ca/ca.* /etc/kibana/certs/elasticsearch.*

.. End of copy_certificates_kibana_aio.rst
