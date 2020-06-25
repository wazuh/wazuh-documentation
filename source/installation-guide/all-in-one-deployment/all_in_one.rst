.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh and Elastic Stack on a single machine

.. _all_in_one:

Step-by-step installation
=========================

This document guides through the installation of the Wazuh server and Open Distro for Elasticsearch components in an all-in-one configuration. This installation guide is meant for small production environments and will install all the necessary packages through sources. All the packages available packages can be checked :ref:`here <packages>`.

.. note:: Root user privileges are required to run all the commands described below.

.. _all_in_one_elastic:

Prerequisites for installing Wazuh-Elastic Stack
------------------------------------------------

Open Distro for Elasticsearch requires the Java Development Kit and other packages installation including ``wget``, ``curl``, ``unzip``, and ``libcap`` that will be used in further steps:

.. include:: ../../_templates/installations/before_installation_all_in_one.rst


.. _all_in_one_wazuh:

Installing the Wazuh server
---------------------------

The Wazuh server collects and analyzes data from the deployed Wazuh agents. It runs the Wazuh manager, the Wazuh API, and Filebeat. The first step to set up Wazuh is to add the Wazuh repository to the server.

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/add_repository.rst



Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/install_wazuh_manager.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/install_wazuh_manager.rst



Installing the Wazuh API
~~~~~~~~~~~~~~~~~~~~~~~~

Although the minimum NodeJS version needed for the Wazuh API is 4.6.1, it is recommended to install the most recent version available for the Operating System being used. This guide uses the 10.x version, but the most recent one can be installed.


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/install_wazuh_api.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/install_wazuh_api.rst



.. note::
  It is highly recommended to change the default credentials. The following document :ref:`securing_api` explains how to change the default user and password among other useful API security information.

Installing Elasticsearch
------------------------

Open Distro for Elasticsearch is an open-source distribution of Elasticsearch, a highly scalable full-text search engine. It offers advanced security, alerting, index management, deep performance analysis, and several other additional features. For more information, refer to `Open Distro for Elasticsearch <https://opendistro.github.io/for-elasticsearch-docs/>`_.

.. include:: ../../_templates/installations/elastic/common/install_elastic.rst


Configuring Elasticsearch
~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: ../../_templates/installations/elastic/common/elastic-single-node/configure_elasticsearch_all_in_one.rst

Elasticsearch roles and users
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In order to use the Wazuh Kibana plugin properly, it is necessary to add the extra roles and users:

.. include:: ../../_templates/installations/elastic/common/add_roles_and_users.rst


Certificates creation
~~~~~~~~~~~~~~~~~~~~~

#. Remove the demo certificates:

    .. include:: ../../_templates/installations/elastic/common/remove_demo_certs.rst


#. Generate and deploy the certificates:

    .. include:: ../../_templates/installations/elastic/common/certificates-aio.rst

#. Enable and start the Elasticsearch service:

    .. include:: ../../_templates/installations/elastic/common/enable_elasticsearch.rst

#. Run the Elasticsearch's ``securityadmin`` script to load the new certificates information and start the cluster:

  .. code-block:: console

    # cd /usr/share/elasticsearch/plugins/opendistro_security/tools/
    # ./securityadmin.sh -cd ../securityconfig/ -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin.key

Run the following command to ensure that the installation was made properly:

.. code-block:: console

  # curl -XGET https://localhost:9200 -u admin:admin -k

The response should look as follows:

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


.. _wazuh_server_packages_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch.

#. Install the Filebeat package:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../_templates/installations/elastic/yum/install_filebeat.rst



      .. group-tab:: APT


        .. include:: ../../_templates/installations/elastic/deb/install_filebeat.rst



#. Download the pre-configured Filebeat config file used to forward the Wazuh alerts to Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/filebeat/7.x/filebeat_all_in_one.yml

#. Download the alerts template for Elasticsearch:

    .. include:: ../../_templates/installations/elastic/common/load_filebeat_template.rst


#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/3.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Copy the Elasticsearch certificates into ``/etc/filebeat/certs``:

    .. code-block:: console

      # mkdir /etc/filebeat/certs
      # cp /etc/elasticsearch/certs/root-ca.pem /etc/filebeat/certs/
      # mv /etc/elasticsearch/certs/filebeat* /etc/filebeat/certs/

#. Enable and start the Filebeat service:

    .. include:: ../../_templates/installations/elastic/common/enable_filebeat.rst


To ensure that Filebeat has been successfully installed, run the following command:

    .. code-block:: console

      # filebeat test output

The response should look as follows:

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
                version: 7.6.1s

Installing Kibana
-----------------

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives stored in Elasticsearch.

#. Install the Kibana package:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../_templates/installations/elastic/yum/install_kibana.rst



      .. group-tab:: APT


        .. include:: ../../_templates/installations/elastic/deb/install_kibana.rst



#. Download the Kibana configuration file:

    .. include:: ../../_templates/installations/elastic/common/configure_kibana_all_in_one.rst

#. Install the Wazuh Kibana plugin. The installation of the plugin must be done from the Kibana home directory as follows:

    .. code-block:: console

        # cd /usr/share/kibana
        # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages-dev.wazuh.com/trash/app/kibana/wazuhapp-3.13.0-tsc-opendistro.zip

#. Copy the Elasticsearch certificates into ``/etc/kibana/certs``:

    .. code-block:: console

      # mkdir /etc/kibana/certs
      # mv /etc/elasticsearch/certs/kibana* /etc/kibana/certs/

#. Link Kibana's socket to priviledged port 443:

    .. code-block:: console

      # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node

#. Enable and start the Kibana service:

    .. include:: ../../_templates/installations/elastic/common/enable_kibana.rst

With the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. This can be accepted by clicking on ``Advanced options`` to add an exception or, for increased security, by importing the ``root-ca.pem`` previously created to the Certificate Manager of each browser that will access the Kibana interface or use a certificate from a trusted authority.


.. note:: The Kibana service listens to the default port ``443``. The browser address will be: ``https://<kibana_ip>`` replacing ``<kibana_ip>`` by the Kibana server IP. The default user and password to access Kibana is ``wazuh_user``.

It is highly recommended to change Elasticsearch’s default passwords for the users found at the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. More information about this process can be found :ref:`here <change_elastic_pass>`. It is also recommended to customize the file ``/etc/elasticsearch/jvm.options`` to improve the performance of Elasticsearch. Learn more about this process in the :ref:`Elasticsearch tuning <elastic_tuning>` section.

Next steps
----------

Once the Wazuh-Elastic Stack environment is ready, a Wazuh agent can be installed in every endpoint to be monitored. The Wazuh agent installation guide is available for most operating systems and can be found :ref:`here<installation_agents>`.
