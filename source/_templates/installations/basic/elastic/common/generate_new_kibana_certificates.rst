.. Copyright (C) 2020 Wazuh, Inc.

This guide assumes that a copy of ``certs.zip`` is placed in the root home folder (~/):

.. code-block:: console

  # unzip ~/certs.zip -d ~/certs
  # rm -f ~/certs/ca/ca.key
  # mkdir /etc/kibana/certs/ca -p
  # cp ~/certs/ca.crt /etc/kibana/certs/ca
  # cp ~/certs/kibana/* /etc/kibana/certs/
  # chown -R kibana: /etc/kibana/certs
  # chmod -R 500 /etc/kibana/certs
  # chmod 400 /etc/kibana/certs/ca/ca.* /etc/kibana/certs/kibana.*
  # rm -rf ~/certs ~/kibana.zip

.. End of include file
