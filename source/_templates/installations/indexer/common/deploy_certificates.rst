.. Copyright (C) 2015, Wazuh, Inc.

#. Run the following commands, replacing ``<INDEXER_NODE_NAME>`` with the name of the Wazuh indexer node you are configuring as defined in ``config.yml``. In our case, the node name is ``indexer``. This deploys the SSL certificates to encrypt communications between the Wazuh central components:

   .. code-block:: console

      # NODE_NAME=<INDEXER_NODE_NAME>

   .. code-block:: console

      # mkdir -p /etc/wazuh-indexer/certs ./wazuh-certificates
      # tar -xf ./wazuh-certificates.tar -C ./wazuh-certificates
      # install -m 0400 ./wazuh-certificates/$NODE_NAME.pem /etc/wazuh-indexer/certs/indexer.pem
      # install -m 0400 ./wazuh-certificates/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/indexer-key.pem
      # install -m 0400 ./wazuh-certificates/admin.pem ./wazuh-certificates/admin-key.pem ./wazuh-certificates/root-ca.pem /etc/wazuh-indexer/certs/
      # rm -rf ./wazuh-certificates
      # chmod 500 /etc/wazuh-indexer/certs
      # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs

   These files replace the certificates the package issued. The certificates tool and the Wazuh indexer package use the same subject format, so the ``plugins.security.authcz.admin_dn`` value written to ``/etc/wazuh-indexer/opensearch.yml`` remains valid. However, the ``plugins.security.nodes_dn`` value written during installation remains valid only when the host's short name matches the node name specified in ``config.yml``, because the package uses the hostname as the certificate CN, while the certificates tool uses the node name.

   For a multi-node deployment, ensure that ``plugins.security.nodes_dn`` includes the Distinguished Name (DN) of every indexer node, as described in :ref:`configuring the Wazuh indexer <wazuh_indexer_configuring>`.

   Run the following command to display the certificate subject in the format expected by these settings:

   .. code-block:: console

      # openssl x509 -noout -subject -nameopt RFC2253 -in /etc/wazuh-indexer/certs/indexer.pem

#. **Recommended action**: If no other Wazuh components will be installed on this node, run the following command to remove the ``wazuh-certificates.tar`` file.

   .. code-block:: console

      # rm -f ./wazuh-certificates.tar

.. End of include file
