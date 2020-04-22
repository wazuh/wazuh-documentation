.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh manager on Debian

.. _all_in_one:

All-in-One installation
=======================
This document guides through an installation of the Wazuh server and Elastic stack components in an all-in-one configuration. This installation guide is meant for small production enviroments. This installation will use the default security settings, which uses generic certificates that are the same for all installations.

.. note:: Root user privileges are required to execute all the commands described below.

.. _all_in_one_elastic:

Preapring the installation
--------------------------

Before installing Wazuh server and Elastic stack, some extra packages must be installed. Open Distro for Elasticsearch requires the installation of Java Develpment Kit. Besides, ``wget`` and ``unzip`` utilities will in futher steps.

  .. include:: ../_templates/installations/elastic/common/before_installation.rst


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
  Since Wazuh 3.12 the API is securized by default. Nevertheless, it is highly recommended to change the default credentials. The following document :ref:`securing_api` explains how to change the default user and password amongst other API security information.        

Elasticsearch installation
~~~~~~~~~~~~~~~~~~~~~~~~~~

Elasticsearch is a highly scalable full-text search and analytics engine. For more information, please see `Elasticsearch <https://www.elastic.co/products/elasticsearch>`_.

  Install the Elasticsearch package:

    .. include:: ../_templates/installations/elastic/common/install_elastic.rst    


Configure Elasticsearch
~~~~~~~~~~~~~~~~~~~~~~~

  .. include:: ../_templates/installations/elastic/common/elastic-single-node/configure_elasticsearch_all_in_one.rst


Enable and start the Elasticsearch service:

    .. include:: ../_templates/installations/elastic/common/enable_elasticsearch.rst

Execute the following command to ensure that the installation was made properly: 

  .. code-block:: console

    # curl -XGET https://localhost:9200 -u admin:admin -k


.. _wazuh_server_packages_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch.

Filebeat installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Add the repository:

    .. include:: ../_templates/installations/elastic/common/signing_key_filebeat.rst


#. Install the Filebeat package:

    .. tabs::


      .. group-tab:: APT


        .. include:: ../_templates/installations/elastic/deb/install_filebeat.rst



      .. group-tab:: Yum


        .. include:: ../_templates/installations/elastic/yum/install_filebeat.rst


#. Download the pre-configured Filebeat config file used to forward Wazuh alerts to Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/filebeat/7.x/filebeat_all_in_one.yml

#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v3.12.2/extensions/elasticsearch/7.x/wazuh-template.json

#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/3.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Copy the demo Elasticsearch certificates into ``/etc/filebeat/certs``:

    .. code-block:: console

      # mkdir /etc/filebeat/certs
      # cp /etc/elasticsearch/root-ca.pem /etc/filebeat/certs/
      # cp /etc/elasticsearch/esnode* /etc/filebeat/certs/

#. Enable and start the Filebeat service:

    .. include:: ../_templates/installations/elastic/common/enable_filebeat.rst

#. Load the Filebeat template:

    .. include:: ../_templates/installations/elastic/common/load_filebeat_template.rst

To ensure that Filebeat has been successfully installed, execute the following command: 

  # filebeat test output

Kibana installation and configuration
-------------------------------------

#. Install the Kibana package:

    .. tabs::

        .. group-tab:: APT


            .. include:: ../_templates/installations/elastic/deb/install_kibana.rst



        .. group-tab:: Yum


            .. include:: ../_templates/installations/elastic/yum/install_kibana.rst


#. Download the Kibana configuration file:

    .. include:: ../_templates/installations/elastic/common/configure_kibana_all_in_one.rst

#. Install the Wazuh Kibana plugin:

    The installation of the plugin must be done from the Kibana home directory.

    .. code-block:: console

        # cd /usr/share/kibana
        # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/wazuhapp/wazuhapp-3.12.2_7.6.1.zip

#. Copy the demo Elasticsearch certificates into ``/etc/kibana/certs``:

    .. code-block:: console

      # mkdir /etc/kibana/certs
      # cp /etc/elasticsearch/root-ca.pem /etc/kibana/certs/
      # cp /etc/elasticsearch/esnode* /etc/kibana/certs/        

#. Enable and start the Kibana service:

    .. include:: ../_templates/installations/elastic/common/enable_kibana.rst

    With the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. This can be accepted by clicking on ``Advanced options`` to add an exception or, for increased security, by importing the ``esnode.pem`` certificate previously created to the Certificate Manager of each browser that will access the Kibana interface.

    .. note:: The Kibana service listens to the default port 5601. The browser address will be: ``https://<kibana_ip>:5601`` replacing <kibana_ip> by the Kibana server IP.

    The default user and password to access Kibana is ``admin``.


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
