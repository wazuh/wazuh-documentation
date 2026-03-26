.. Copyright (C) 2015, Wazuh, Inc.

.. code-block:: console

   # NODE_NAME=<SERVER_NODE_NAME>

.. code-block:: console

   # mkdir /var/ossec/etc/certs
   # tar -xf ./wazuh-certificates.tar -C /var/ossec/etc/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
   # mv -n /var/ossec/etc/certs/$NODE_NAME.pem /var/ossec/etc/certs/server.pem
   # mv -n /var/ossec/etc/certs/$NODE_NAME-key.pem /var/ossec/etc/certs/server-key.pem
   # chmod 500 /var/ossec/etc/certs
   # chmod 400 /var/ossec/etc/certs/*
   # chown -R root:root /var/ossec/etc/certs

.. End of copy_certificates_filebeat_wazuh_cluster.rst
