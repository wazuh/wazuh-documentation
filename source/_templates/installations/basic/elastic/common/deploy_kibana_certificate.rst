.. Copyright (C) 2022 Wazuh, Inc.

.. code-block:: console

  # unzip ~/certs.zip -d ~/certs
  # rm -f ~/certs/ca/ca.key
  # mkdir /etc/kibana/certs/ca -p
  # cp ~/certs/ca/ca.crt /etc/kibana/certs/ca
  # cp ~/certs/kibana/* /etc/kibana/certs/
  # chown -R kibana: /etc/kibana/certs
  # chmod -R 500 /etc/kibana/certs
  # chmod 400 /etc/kibana/certs/ca/ca.* /etc/kibana/certs/kibana.*
  # rm -rf ~/certs ~/certs.zip

.. End of include file
