.. Copyright (C) 2021 Wazuh, Inc.


.. code-block:: console

  # mkdir /etc/kibana/certs
  # mv ~/certs.tar /etc/kibana/certs/
  # cd /etc/kibana/certs/
  # tar -xf certs.tar kibana_http.pem kibana_http.key root-ca.pem
  # mv /etc/kibana/certs/kibana_http.key /etc/kibana/certs/kibana.key
  # mv /etc/kibana/certs/kibana_http.pem /etc/kibana/certs/kibana.pem
  # rm -f certs.tar

.. End of include file
