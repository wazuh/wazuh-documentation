.. Copyright (C) 2020 Wazuh, Inc.

Unattended installation
=======================

This section will explain how to install the Wazuh-Elastic Stack on a single host by using a script that will automatically detect whether the operating system uses ``rpm`` or ``deb`` packages.
The script will perform a healtcheck verifying that the available system resources meet the minimal requirements. For more information, please visit the :ref:`Requirements <all_in_one_requirements>` section.

The script will install Java Development Kit and other packages including ``unzip`` and ``libcap`` required by Open Distro for Elasticsearch. Besides, the `Search Guard offline TLS tool <https://docs.search-guard.com/latest/offline-tls-tool>`_ will be used to deploy the certificates for protecting data in the Elastic Stack.

The Wazuh-Elastic Stack installation
------------------------------------

.. note:: Root user privileges are required to run all the commands described below.

In order to download the script, ``curl`` package must be installed on the system:

.. tabs::

  .. group-tab:: Yum

    .. code-block:: console

        # yum install curl


  .. group-tab:: APT

    .. code-block:: console

        # apt install curl

Download and run the script:

.. code-block:: console

    # curl -so ~/all-in-one-installation.sh https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/unattended-installation/all-in-one-installation.sh && bash ~/all-in-one-installation.sh

Verifying the installation
--------------------------

The output of the script will indicate if Elasticsearch and Filebeat were succesfully installed:

An example Elasticsearch response looks as follows:

.. code-block:: none
             :class: output

              {
                "name" : "node-1",
                "cluster_name" : "elasticsearch",
                "cluster_uuid" : "O82AgJJTTF2pTOXKPnwQsA",
                "version" : {
                  "number" : "7.6.1",
                  "build_flavor" : "oss",
                  "build_type" : "rpm",
                  "build_hash" : "aa751e09be0a5072e8570670309b1f12348f023b",
                  "build_date" : "2020-02-29T00:15:25.529771Z",
                  "build_snapshot" : false,
                  "lucene_version" : "8.4.0",
                  "minimum_wire_compatibility_version" : "6.8.0",
                  "minimum_index_compatibility_version" : "6.0.0-beta1"
                },
                "tagline" : "You Know, for Search"
              }

An example Filebeat response looks as follows:

.. code-block:: none
             :class: output

              elasticsearch: https://127.0.0.1:9200...
                parse url... OK
                connection...
                  parse host... OK
                  dns lookup... OK
                  addresses: 127.0.0.1
                  dial up... OK
                TLS...
                  security: server's certificate chain verification is enabled
                  handshake... OK
                  TLS version: TLSv1.3
                  dial up... OK
                talk to server... OK
                version: 7.6.1

Elasticsearch users and roles
-----------------------------

In order to use Wazuh Kibana plugin properly, the script adds the following extra Elasticsearch users:

- ``wazuh_user`` is created for those users that only need read access to the Wazuh Kibana plugin.

- ``wazuh_admin`` is the user recommended for those users that need administrative privileges.

Apart from the extra users, there are three extra roles added. These roles are in charge of giving the right permissions to the users:

- ``wazuh_ui`` gives enough privileges to ``kibanaserver`` user to operate with the Wazuh’s indexes. This user is one of the Open Distro for Elasticsearch `default users <https://opendistro.github.io/for-elasticsearch-docs/docs/security-access-control/users-roles/>`_ and its purpose is to perform tasks such as making cluster-wide searches, indexing monitoring or writing in indices.

- ``wazuh_ui_user`` provides ``wazuh_user`` ability to read Wazuh’s indexes.

- ``wazuh_ui_admin`` allows ``wazuh_admin`` to perform, reading, writing, management, and indexing task on the Wazuh indexes.

These users and roles are designed to be used along with the Wazuh Kibana plugin and they are protected so they cannot be modified from the Kibana’s interface. To modify them or add new users or roles, the ``securityadmin`` script will have to be run. To learn more about this process, visit the `Open Distro for Elasticsearch documentation <https://opendistro.github.io/for-elasticsearch-docs/docs/security-access-control/users-roles/>`_.

Customizing the installation
----------------------------

After the installation, the Wazuh API will use the default credentials but it is highly recommended to change them. The following document :ref:`securing_api` explains how to change the default user and password among other useful API security information.

The Kibana configuration found at the ``/etc/kibana/kibana.yml`` file has the ``server.host`` parameter set to ``0.0.0.0``. It means that Kibana can be accessed from the outside and will accept all the available IPs of the machine.  This value can be changed for a specific IP if needed.

.. note:: The Kibana service listens to the default port ``443``. The browser address will be: ``https://<kibana_ip>`` replacing ``<kibana_ip>`` by the Kibana server IP. The default user and password to access Kibana is ``wazuh_user``.

It is highly recommended to change Elasticsearch’s default passwords for the users found at the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. More information about this process can be found :ref:`here <change_elastic_pass>`.

With the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. This can be accepted by clicking on ``Advanced options`` to add an exception or, for increased security, by importing the ``root-ca.pem``, found in the ``/etc/kibana/certs`` directory, to the Certificate Manager of each browser that will access the Kibana interface or use a certificate from a trusted authority.

Next steps
----------

Once the Wazuh-Elastic Stack environment is ready, a Wazuh agent can be installed in every endpoint to be monitored. The Wazuh agent installation guide is available for most operating systems and can be found :ref:`here<installation_agents>`.
