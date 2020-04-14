.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh manager on Debian

.. _all_in_one:

All-in-One installation
=======================
This document guides through an installation of the Wazuh server and Elastic stack components in an all-in-one configuration.

.. note:: Root user privileges are required to execute all the commands described below.

.. _all_in_one_elastic:

Installing Elasticsearch
------------------------

Elasticsearch is a highly scalable full-text search and analytics engine. For more information, please see `Elasticsearch <https://www.elastic.co/products/elasticsearch>`_.


Install Java Develpment Kit (JDK)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  Open Distro for Elasticsearch requires the installation of Java Develpment Kit. 

    .. include:: ../_templates/installations/elastic/common/install_jdk.rst      
     
Install wget and unzip
~~~~~~~~~~~~~~~~~~~~~~

    .. include:: ../_templates/installations/elastic/common/install_wget_unzip.rst    

Elasticsearch installation
~~~~~~~~~~~~~~~~~~~~~~~~~~

  Install the Elasticsearch package:

    .. include:: ../_templates/installations/elastic/common/install_elastic.rst    


Certificates creation and deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. In order to secure the installation, the certificates can be created as follows:

    .. code-block:: console

        # mkdir /etc/elasticsearch/certs/
        # cd /etc/elasticsearch/certs/

#. Create the ``root`` certificate:

    .. code-block:: console

        # openssl genrsa -out root-ca-key.pem 2048 && openssl req -new -x509 -sha256 -key root-ca-key.pem -out root-ca.pem


#. Create the ``admin`` certificates:

    .. code-block:: console

        # openssl genrsa -out admin-key-temp.pem 2048 && openssl pkcs8 -inform PEM -outform PEM -in admin-key-temp.pem -topk8 -nocrypt -v1 PBE-SHA1-3DES -out admin-key.pem

        # openssl req -new -key admin-key.pem -out admin.csr && openssl x509 -req -in admin.csr -CA root-ca.pem -CAkey root-ca-key.pem -CAcreateserial -sha256 -out admin.pem


#. Create the ``node`` certificates:

    .. code-block:: console

      # openssl genrsa -out node-key-temp.pem 2048 && openssl pkcs8 -inform PEM -outform PEM -in node-key-temp.pem -topk8 -nocrypt -v1 PBE-SHA1-3DES -out node-key.pem

      # openssl req -new -key node-key.pem -out node.csr && openssl x509 -req -in node.csr -CA root-ca.pem -CAkey root-ca-key.pem -CAcreateserial -sha256 -out node.pem


#. Enable and start the Elasticsearch service:

    .. include:: ../_templates/installations/elastic/common/enable_elasticsearch.rst


#. Generate credentials for all the Elastic Stack pre-built roles and users:

    .. include:: ../_templates/installations/elastic/common/generate_elastic_credentials.rst

Kibana installation and configuration
-------------------------------------

#. Install the Kibana package:

    .. tabs::

        .. group-tab:: APT


            .. include:: ../_templates/installations/elastic/deb/install_kibana.rst



        .. group-tab:: Yum


            .. include:: ../_templates/installations/elastic/yum/install_kibana.rst


#. Copy the Elasticsearch certificates into the Kibana configuration folder:

    .. include:: ../_templates/installations/elastic/common/copy_certificates_kibana_elastic_server.rst

#. Download the Kibana configuration file:

    .. include:: ../_templates/installations/elastic/common/configure_kibana_all_in_one.rst

#. Install the Wazuh Kibana plugin:

    The installation of the plugin must be done from the Kibana home directory.

    .. code-block:: console

        # cd /usr/share/kibana

    .. code-block:: console

        # -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-3.11.4_7.6.0.zip

#. Enable and start the Kibana service:

    .. include:: ../_templates/installations/elastic/common/enable_kibana.rst

    With the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. This can be accepted by clicking on ``Advanced options`` to add an exception or, for increased security, by importing the ``ca.crt`` previously created to the Certificate Manager of each browser that will access the Kibana interface.

    .. note:: The Kibana service listens to the default port 5601. The browser address will be: ``https://<kibana_ip>:5601`` replacing <kibana_ip> by the Kibana server IP.


.. _all_in_one_wazuh:

Installing Wazuh server
-----------------------

The Wazuh server collects and analyzes data from deployed agents. It runs the Wazuh manager, the Wazuh API and Filebeat. The first step to set up Wazuh is to add the Wazuh repository to the server. Alternatively, the Wazuh manager package can be downloaded directly and compatible versions can be checked :ref:`here <packages>`.

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::


  .. group-tab:: APT


    .. include:: ../_templates/installations/wazuh/deb/add_repository.rst



  .. group-tab:: Yum


    .. include:: ../_templates/installations/wazuh/yum/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../_templates/installations/wazuh/zypp/add_repository.rst



Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Wazuh manager package:

.. tabs::


  .. group-tab:: APT


    .. include:: ../_templates/installations/wazuh/deb/install_wazuh_manager.rst



  .. group-tab:: Yum


    .. include:: ../_templates/installations/wazuh/yum/install_wazuh_manager.rst



  .. group-tab:: ZYpp


    .. include:: ../_templates/installations/wazuh/zypp/install_wazuh_manager.rst


Installing the Wazuh API
~~~~~~~~~~~~~~~~~~~~~~~~

Although the minimum NodeJS version needed for Wazuh API is 4.6.1, it is recommended to install the most recent available version for each Operating System. This guide uses the 10.x version, but the most recent one can be installed.


.. tabs::


  .. group-tab:: APT


    .. include:: ../_templates/installations/wazuh/deb/install_wazuh_api.rst



  .. group-tab:: Yum


    .. include:: ../_templates/installations/wazuh/yum/install_wazuh_api.rst



  .. group-tab:: ZYpp


    .. include:: ../_templates/installations/wazuh/zypp/install_wazuh_api.rst


.. note::
  It is strongly recommended to secure the API. The following document :ref:`securing_api` explains how to enable HTTPS communication, change the default user and password and more.

.. _wazuh_server_packages_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch.

Adding the repository
~~~~~~~~~~~~~~~~~~~~~

    .. include:: ../_templates/installations/elastic/common/signing_key_filebeat.rst

Filebeat installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


#. Install the Filebeat package:

    .. tabs::


      .. group-tab:: APT


        .. include:: ../_templates/installations/elastic/deb/install_filebeat.rst



      .. group-tab:: Yum


        .. include:: ../_templates/installations/elastic/yum/install_filebeat.rst


#. Download the pre-configured Filebeat config file used to forward Wazuh alerts to Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/filebeat/7.x/filebeat.yml

#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v3.11.4/extensions/elasticsearch/7.x/wazuh-template.json

#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/3.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Edit the file ``/etc/filebeat/filebeat.yml``:

    .. include:: ../_templates/installations/elastic/common/configure_filebeat.rst

    To learn more, please see  Elasticsearch output `configuration options <https://www.elastic.co/guide/en/beats/filebeat/current/elasticsearch-output.html#_configuration_options_11>`_ section.

#. Enable and start the Filebeat service:

    .. include:: ../_templates/installations/elastic/common/enable_filebeat.rst

#. Load the Filebeat template:

    .. include:: ../_templates/installations/elastic/common/load_filebeat_template.rst


Disabling repositories
----------------------

.. include:: ../_templates/installations/elastic/common/disabling_repositories_explanation.rst


.. tabs::


  .. group-tab:: APT


    .. include:: ../_templates/installations/wazuh/deb/disabling_repositories.rst



  .. group-tab:: Yum


    .. include:: ../_templates/installations/wazuh/yum/disabling_repositories.rst



  .. group-tab:: ZYpp

    .. include:: ../_templates/installations/wazuh/zypp/disabling_repositories.rst



Uninstall
---------

To uninstall the Wazuh manager and Wazuh API:

.. tabs::


  .. group-tab:: APT


    .. include:: ../_templates/installations/wazuh/deb/uninstall_wazuh_manager_api.rst



  .. group-tab:: Yum


    .. include:: ../_templates/installations/wazuh/yum/uninstall_wazuh_manager_api.rst



  .. group-tab:: ZYpp


    .. include:: ../_templates/installations/wazuh/zypp/uninstall_wazuh_manager_api.rst


To uninstall Filebeat:



.. tabs::


  .. group-tab:: APT


    .. include:: ../_templates/installations/elastic/deb/uninstall_filebeat.rst



  .. group-tab:: Yum


    .. include:: ../_templates/installations/elastic/yum/uninstall_filebeat.rst



  .. group-tab:: ZYpp


    .. include:: ../_templates/installations/elastic/zypp/uninstall_filebeat.rst


To uninstall Elasticsearch:

.. tabs::


  .. group-tab:: APT


    .. include:: ../_templates/installations/elastic/deb/uninstall_elasticsearch.rst



  .. group-tab:: Yum


    .. include:: ../_templates/installations/elastic/yum/uninstall_elasticsearch.rst



  .. group-tab:: ZYpp


    .. include:: ../_templates/installations/elastic/zypp/uninstall_elasticsearch.rst


To uninstall Kibana:

.. tabs::


  .. group-tab:: APT


    .. include:: ../_templates/installations/elastic/deb/uninstall_kibana.rst



  .. group-tab:: Yum


    .. include:: ../_templates/installations/elastic/yum/uninstall_kibana.rst



  .. group-tab:: ZYpp


    .. include:: ../_templates/installations/elastic/zypp/uninstall_kibana.rst
