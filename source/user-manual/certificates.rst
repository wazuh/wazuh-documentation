.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Learn more about certificates deployment in this section of the Wazuh user manual.

.. _user_manual_certificates:

Certificates deployment
=======================

In the :ref:`installation guide <installation_guide>`, the Wazuh cert tool has been used to create certificates, but any other certificates creation method, for example using `OpenSSL <https://www.openssl.org/>`_, can be used.

There are three kinds of certificates needed for the installation

- ``root-ca``: This certificate is the one in charge of signing the rest of the certificates.

- ``node``: The node certificates are the ones needed for every Elasticsearch node. They must include the node IP address.

- ``admin``: The admin certificate is a client certificate with special privileges needed for management and security-related tasks.

These certificates are created with the following additional information:

- ``C``: US

- ``L``: California

- ``O``: Wazuh

- ``OU``: Docu

- ``CN``: Name of the node

To create the certificates, the instances.yml file must be configured replacing the ``<node-name>`` and ``<node-IP>`` values by the corresponding values:

    .. code-block:: yaml

        # Elasticsearch nodes
        elasticsearch-nodes:
        - name: <node-name>
            ip:
            - node-IP
        
        # Wazuh server nodes
        wazuh-servers:
        - name: <node-name>
            ip:
            - node-IP      
        
        # Kibana node
        kibana:
        - name: <node-name>
            ip:
            - node-IP        

Each node certificate will be named after the ``<node-name>``. The ``<node-IP>`` can be either an IP address or a DNS name.

After configuring the ``instances.yml``, the script can be run:

    .. code-block:: console

        # bash ~/wazuh-cert-tool.sh

After running the script, the directory ~/certs will be created and will have the following content:

    .. code-block:: none

        certs/
        ├── admin-key.pem
        ├── admin.pem
        ├── filebeat-key.pem
        ├── filebeat.pem
        ├── kibana-key.pem
        ├── kibana.pem
        ├── node-1-key.pem
        ├── node-1.pem
        ├── root-ca.key
        └── root-ca.pem
