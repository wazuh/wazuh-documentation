.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about certificates deployment in this section of the Wazuh user manual.

Certificates deployment
=======================

In the :ref:`installation guide <installation_guide>`, the Wazuh certs tool has been used to create certificates, but any other certificates creation method, for example using `OpenSSL <https://www.openssl.org/>`_, can be used.

The Wazuh certs tool can be downloaded here: `wazuh-certs-tool.sh <https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-certs-tool.sh>`_.

There are three kinds of certificates needed for the installation:

- ``root-ca``: This certificate is the one in charge of signing the rest of the certificates.

- ``node``: The node certificates are the ones needed for every Wazuh indexer node. They must include the node IP address.

- ``admin``: The admin certificate is a client certificate with special privileges needed for management and security-related tasks.

These certificates are created with the following additional information:

- ``C``: US

- ``L``: California

- ``O``: Wazuh

- ``OU``: Wazuh

- ``CN``: Name of the node


To create the certificates, edit the ``config.yml`` file and replace the node names and IP values with the corresponding names and IP addresses. The ``<node-ip>`` can be either an IP address or a DNS name. The ``config.yml`` template can be found here: `config.yml <https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/config.yml>`_.

    .. code-block:: yaml

        nodes:
          # Wazuh indexer nodes
          indexer:
            - name: indexer-1
              ip: "<indexer-node-ip>"
            #- name: indexer-2
            #  ip: "<indexer-node-ip>"
            #- name: indexer-3
            #  ip: "<indexer-node-ip>"

          # Wazuh server nodes
          # If there is more than one Wazuh server
          # node, each one must have a node_type
          server:
            - name: server-1
              ip: "<server-node-ip>"
            #  node_type: master
            #- name: server-2
            #  ip: "<server-node-ip>"
            #  node_type: worker
            #- name: server-3
            #  ip: "<server-node-ip>"
            #  node_type: worker

          # Wazuh dashboard nodes
          dashboard:
            - name: dashboard
              ip: "<dashboard-node-ip>"


After configuring the ``config.yml``, run the script with option ``-A`` to create all the certificates.

    .. code-block:: console

        # bash wazuh-certs-tool.sh -A

After running the script, the directory ``wazuh-certificates`` will be created and will have the following content:

    .. code-block:: none

        wazuh-certificates/
        ├── admin-key.pem
        ├── admin.pem
        ├── dashboard-key.pem
        ├── dashboard.pem
        ├── indexer-key.pem
        ├── indexer.pem
        ├── root-ca.key
        ├── root-ca.pem
        ├── server-key.pem
        └── server.pem

Additionally, this script allows the use of a pre-existent rootCA certificate. To create all the certificates using a pre-existent rootCA certificate, use option ``-A`` and indicate the ``root-ca`` certificate and key as follows:

    .. code-block:: console

        # bash wazuh-certs-tool.sh -A /path/to/root-ca.pem /path/to/root-ca.key

After running the script, the directory ``wazuh-certificates`` will be created and will have the following content:

    .. code-block:: none

        wazuh-certificates/
        ├── admin-key.pem
        ├── admin.pem
        ├── dashboard-key.pem
        ├── dashboard.pem
        ├── indexer-key.pem
        ├── indexer.pem
        ├── server-key.pem
        └── server.pem