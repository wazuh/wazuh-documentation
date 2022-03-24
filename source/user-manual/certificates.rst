.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about certificates deployment in this section of the Wazuh user manual.

.. _user_manual_certificates:

Certificates deployment
=======================

In the :ref:`installation guide <installation_guide>`, the Wazuh cert tool has been used to create certificates, but any other certificates creation method, for example using `OpenSSL <https://www.openssl.org/>`_, can be used.

There are three kinds of certificates needed for the installation

- ``root-ca``: This certificate is the one in charge of signing the rest of the certificates.

- ``node``: The node certificates are the ones needed for every Wazuh indexer node. They must include the node IP address.

- ``admin``: The admin certificate is a client certificate with special privileges needed for management and security-related tasks.

These certificates are created with the following additional information:

- ``C``: US

- ``L``: California

- ``O``: Wazuh

- ``OU``: Docu

- ``CN``: Name of the node

To create the certificates, the config.yml file must be configured replacing the ``<node-name>`` and ``<node-IP>`` values by the corresponding values:

    .. code-block:: yaml

        # Wazuh indexer nodes
        indexer:
            name: <node-name>
            ip: node-IP

        # Wazuh server nodes
        server:
            name: <node-name>
            ip: node-IP

        # Wazuh dashboard nodes
        dashboard:
            name: <node-name>
            ip: node-IP

Each node certificate will be named after the ``<node-name>``. The ``<node-IP>`` can be either an IP address or a DNS name.

After configuring the ``config.yml``, the script can be run:

    .. code-block:: console

        # bash ~/wazuh-certs-tool.sh -A

After running the script, the directory ~/wazuh-certificates will be created and will have the following content:

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
