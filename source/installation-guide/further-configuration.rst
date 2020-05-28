.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to tune the Wazuh and Elasticsearch installation

.. _further_configuration:

Further configuration
=====================

This section provides additional information to the default installation configuration and how to customize it.

Elastic Stack configuration
---------------------------

In both the All-in-One installation guide and Elasticsearch single-node cluster installation guide the IP ``0.0.0.0`` is used as ``network.host``. This is an acceptable value that binds all the available IPs on the machine. This configuration may not be suitable for all environments since the Elasticsearch installation will be accessible from all the machine's IPs, that is why it is recommended to modify this value and bind the ``network.host`` to the desired IP address. More information about this attribute can be found on `Open Distro for Elasticsearch page <https://opendistro.github.io/for-elasticsearch-docs/docs/elasticsearch/cluster/#step-3-bind-a-cluster-to-specific-ip-addresses>`_.

Certificates Deployment
-----------------------

In the distributed installation guide, the `Search Guard's offline TLS tool <https://docs.search-guard.com/latest/offline-tls-tool>`_ has been used to create certificates, but any other certificates creation method, for example using `OpenSSL <https://www.openssl.org/>`_, can be used.

Open Distro for Elasticsearch requires three kinds of certificates:

- ``root-ca``: This certificate is the one incharged of signing the rest of the certificates.

- ``node``: The node certificates are the ones needed for every Elasticsearch node. They must include the node IP.

- ``client``: Those certificates are the ones incharged of the communication between the different parst of the installation e.g. Filebeat and Kibana.

- ``admin``: The admin certificate is a client certificate with special privileges needed for management and security related tasks.

To create the certificates, the template located in the ``/etc/elasticsearch/certs/searchguard/search-guard.yml`` file was used. This template is preconfigured with the default values, which are recommended to change for security reasons. Those values are:

- ``CN``: Stands for Common Name. This is an arbirtary name which represents the server name protected by the SSL certificate. The certificate is only valid if the request hostname matches the certificate common name.

- ``OU``: Organizational Unit name.

- ``O``: Organization name.

- ``L``: Locality name.

- ``C``: Country name. This value should be introduced using the two letter code, e.g.: ``US``.

These are the default values that are preconfigured in the template downloaded, nevertheless, there are some other values that can be added to the certificates:

- ``S``: State or province. It should be spelled out in full, not using abbreviations.

- ``E``: Email adress.

There can be added even more security improvements, such us the use of a password for the private keys or the creation of intermediate CA certificates. To learn more about this, visit the `Search Guard's offline TLS tool documentation <https://docs.search-guard.com/latest/offline-tls-tool>`_.

The node certificates need the server's IP to be specified, and there can be added as many IPs as neccessary.
To create a node certificate, the following lines should be added to the ``/etc/elasticsearch/certs/searchguard/search-guard.yml`` file in the ``nodes:`` section modifying the required fields on the Elasticsearch's master node:

    .. code-block:: yaml

        - name: <certificate_name>
            dn: CN=<common-name>,OU=<operational-unit>,O=<organization>,L=<locality>,C=<country-code>
            ip:
                - <node_IP_1>
                - <node_IP_2>
                - <node_IP_3>


As mention before, client and admin certificates are very similar, although the admin ones have more privileges. An admin certificate must be in at least one of the Elasticsearch nodes, which will be able to perform administratio and security tasks. To create an admin certificate, the following lines should be added to the ``/etc/elasticsearch/certs/searchguard/search-guard.yml`` file in the ``clients:`` section modifying the required fields on the Elasticsearch's master node:

    .. code-block:: yaml
        :emphasize-lines: 3

        - name: <certificate_name>
        dn: CN=<common-name>,OU=<operational-unit>,O=<organization>,L=<locality>,C=<country-code>
        admin: true


What differs a client certificate from an admin certificate is the ``admin`` tag. If it is set to ``true`` this certificate will be granted with extra permissions. Here is an example for creating a client certificate:

    .. code-block:: yaml

        - name: <certificate_name>
        dn: CN=<common-name>,OU=<operational-unit>,O=<organization>,L=<locality>,C=<country-code>

Generate new certificates
^^^^^^^^^^^^^^^^^^^^^^^^^

Once the file ``/etc/elasticsearch/certs/searchguard/search-guard.yml`` has been modified, the certificates can be created using the following command:

    .. code-block:: console

        # ./searchguard/tools/sgtlstool.sh -c ./searchguard/search-guard.yml -ca -crt

This command will generate both, the ``root.ca`` certificate and all the nodes and clients certificates. In case the ``root-ca`` certificate was previously created, the ``-ca`` tag can be omited. By default, when the script is re-executed, the already present certificates will not be overwritten. Additionally, the tag ``-t`` can be added to specify the output destination. If not modified, the generated certificates will be placed at ``./out``. These and other configuration options can be found in the `Search Guard's offline TLS tool documentation <https://docs.search-guard.com/latest/offline-tls-tool>`_.

When new node certificates are created, they must be added in the Elasticsearch's configuration file placed at ``/etc/elasticsearch/elasticsearch.yml`` under the ``opendistro_security.nodes_dn`` section:

    .. code-block:: yaml
        :emphasize-lines: 3
        
        opendistro_security.nodes_dn:
            - CN=node-1,OU=Docu,O=Wazuh,L=California,C=ES
            - CN=<common_name>,OU=<operational_unit>,O=<organization_name>,L=<locality>,C=<country_code>


Wazuh Kibana's users and roles
------------------------------

During the installation process, two new users where added:

- ``wazuh_user`` is created for those users that only need read access to the Wazuh Kibana plugin.

- ``wazuh_admin`` is the user recommended for those users that need administration privileges.

Apart from the previously mentioned users, during the installation process, there are three extra roles added. there roles are incharged of giving the right permissions to the users:

- ``wazuh_ui``: This role gives enough privileges to ``kibanaserver`` user to operate with Wazuh's indexes.

- ``wazuh_ui_user``: This roles provides ``wazuh_ui_user`` hability to read Wazuh's indexes.

- ``wazuh_ui_admin``: This roles allow ``wazuh_admin`` to perform, reading, writing, management and indexing task on the Wazuh indexes.

These users and roles are designed to be used along the Wazuh Kibana plugin and they are protected so they cannot be modified from the Kibana's interface. To modify them or add new users or roles, the ``securityadmin`` script will have to be executed. To learn more about this process, visit the `Open Distro documentation <https://opendistro.github.io/for-elasticsearch-docs/docs/security-access-control/users-roles/>`_.
