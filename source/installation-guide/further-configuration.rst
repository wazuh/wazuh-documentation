.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to tune the Wazuh and Elasticsearch installation

.. _further_configuration:

Further configuration
=====================

Elasticsearch configuration
---------------------------

In both the All-in-One installation and Single-node installation guide the IP ``0.0.0.0`` is used as ``network.host``. This is an acceptable value that binds all the available IPs on the machine. This configuration may not be suitable for all enviroments, since the Elasticsearch installation will be accesible from all the machine's IPs, that is why it is recommended to modify this value and bind the ``network.host`` to the desired IP.

Certificates Deployment
-----------------------

In the installation guide, the `Search Guard's offline TLS tool <https://docs.search-guard.com/latest/offline-tls-tool/>`_ has been used, but any other certificates creation method can be used.

Open Distro for Elasticsearch requires three kinds of certificates: 

- ``root-ca``: This certificate is the one incharged of signing the rest of the certificates.

- ``node``: The node certificates are the ones needed for every Elasticsearch node. They must include the node IP.

- ``client``: Those certificates are the ones incharged of the communication between the different parst of the installation e.g. Filebeat and Kibana

- ``admin``: The admin certificate is a client certificate with special privileges needed for management and security related tasks.

To create the certificates, the template located in ``/etc/elasticsearch/certs/searchguard/search-guard.yml`` was used. This template is preconfigured with default values, which are recommended to change for security reasons. Those values are: 

- ``CN``: Stands for Common Name. This is an arbirtary name which represents the server name protected by the SSL certificate. The certificate is only valid if the request hostname matches the certificate common name.

- ``OU``: Organizational Unit name.

- ``O``: Organization name.

- ``L``: Locality name.

- ``C``: Country name. This value should be introduced using the two letter code, e.g.: ``US``.

These are the default values that are preconfigured in the template downloaded, nevertheless, there are some more values that can be added to the certificates: 

- ``S``: State or province. It should be spelled out in full, not using abbreviations.

- ``E``: Email adress

There can be added even more security improvements, such us the use of a password for the private keys or the creation of intermediate CA certificates. To learn more about this, visit the `Search Guard's offline TLS tool documentation <https://docs.search-guard.com/latest/offline-tls-tool/>`_.

The node certificates need the server's IP to be specified, and there can be added as many IPs as neccessary. For example: 

    .. code-block:: yaml
    
        nodes:
            - name: elasticsearch
            dn: CN=node-1,OU=Docu,O=Wazuh,L=California,C=ES
            ip:
                - <node_IP_1>
                - <node_IP_2>
                - <node_IP_3>


As mention before, client and admin certificates are very similar, although the admin ones have more privileges. There must be an admin certificate at least in one of the Elasticsearch nodes, which will be able to perform administratio and security tasks. To create an admin certificate, the following lines should be added to the ``/etc/elasticsearch/certs/searchguard/search-guard.yml``:

    .. code-block: yaml

        clients:
            - name: admin
            dn: CN=admin,OU=Docu,O=Wazuh,L=California,C=ES
            admin: true

What differs a client certificate from an admin certificate is the ``admin`` tag. If it is set to ``true`` this certificate will be granted with extra permissions.

Wazuh Kibana's users
--------------------

During the installation process, three roles and two users were added. 

Users
^^^^^

- ``wazuhuser`` is created for thos users that only need read access to the Wazuh Kibana plugin.

- ``wazuhadmin`` is the user recommended for those users that need administration privileges. 

Roles
^^^^^

- ``wazuh_ui``

- ``wazuh_ui_user``

- ``wazuh_ui_admin``
