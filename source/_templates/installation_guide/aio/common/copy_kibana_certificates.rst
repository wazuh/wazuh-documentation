.. Copyright (C) 2019 Wazuh, Inc.

.. code-block:: console

  # mkdir /etc/kibana/certs/ca -p
  # cp -R /etc/elasticsearch/certs/* /etc/kibana/certs/
  # chown -R kibana: /etc/kibana/certs
  # chmod -R 500 /etc/kibana/certs
  # chmod 400 /etc/kibana/certs/ca/ca.* /etc/kibana/certs/elasticsearch.*

.. End of include file
