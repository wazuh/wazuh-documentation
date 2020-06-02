.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh and Elastic Stack on a single machine

.. _all_in_one:

Step-by-step installation
=========================

This document guides through an installation of the Wazuh server and Open Distro components in an all-in-one configuration. This installation guide is meant for small production environments. The default security settings will be used. This guide will install all the necessary packages through sources, alternatively, all the packages can be downloaded directly :ref:`here <packages>`.

.. note:: Root user privileges are required to execute all the commands described below.

.. _all_in_one_elastic:

Prerequisites for installing Wazuh-Elastic Stack
------------------------------------------------

Open Distro for Elasticsearch requires the installation of Java Development Kit and other packages including ``wget``, ``curl``, ``unzip`` and ``libcap`` that will be used in further steps:

.. include:: ../../_templates/installations/before_installation_all_in_one.rst


.. _all_in_one_wazuh:

Installing the Wazuh server
---------------------------

The Wazuh server collects and analyzes data from deployed Wazuh agents. It runs the Wazuh manager, the Wazuh API and Filebeat. The first step to set up Wazuh is to add the Wazuh repository to the server.

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

Although the minimum NodeJS version needed for the Wazuh API is 4.6.1, it is recommended to install the most recent available version for each Operating System. This guide uses the 10.x version, but the most recent one can be installed.


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/install_wazuh_api.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/install_wazuh_api.rst



.. note::
  It is highly recommended to change the default credentials. The following document :ref:`securing_api` explains how to change the default user and password amongst other useful API security information.

Installing Elasticsearch
------------------------

Open Distro is an open source distribution of Elasticsearch, a highly scalable full-text search engine. It offers advanced security, alerting, index management, deep performance analysis, and a number of other additional features. For more information, refer to `Open Distro for Elasticsearch <https://opendistro.github.io/for-elasticsearch-docs/>`_.

.. include:: ../../_templates/installations/elastic/common/install_elastic.rst


Configuring Elasticsearch
~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: ../../_templates/installations/elastic/common/elastic-single-node/configure_elasticsearch_all_in_one.rst

To learn more about Elasticsearch, its configuration and the added roles and users visit the :ref:`further configuration section <further_configuration>`.

Enable and start the Elasticsearch service:

.. include:: ../../_templates/installations/elastic/common/enable_elasticsearch.rst

Execute the following command to ensure that the installation was made properly:

.. code-block:: console

  # curl -XGET https://localhost:9200 -u admin:admin -k


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

#. Copy the demo Elasticsearch certificates into ``/etc/filebeat/certs``:

    .. code-block:: console

      # mkdir /etc/filebeat/certs
      # cp /etc/elasticsearch/root-ca.pem /etc/filebeat/certs/
      # cp /etc/elasticsearch/esnode* /etc/filebeat/certs/

#. Enable and start the Filebeat service:

    .. include:: ../../_templates/installations/elastic/common/enable_filebeat.rst


To ensure that Filebeat has been successfully installed, execute the following command:

    .. code-block:: console

      # filebeat test output

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
        # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://s3-us-west-1.amazonaws.com/packages-dev.wazuh.com/trash/app/kibana/wazuhapp-3.13.0-tsc-opendistro.zip

#. Copy the demo Elasticsearch certificates into ``/etc/kibana/certs``:

    .. code-block:: console

      # mkdir /etc/kibana/certs
      # cp /etc/elasticsearch/root-ca.pem /etc/kibana/certs/
      # cp /etc/elasticsearch/esnode* /etc/kibana/certs/

#. Link Kibana's socket to priviledged port 443

    .. code-block:: console

      # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node

#. Enable and start the Kibana service:

    .. include:: ../../_templates/installations/elastic/common/enable_kibana.rst

  With the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. As the All-in-One installation guide uses demo certificates, this can be accepted by clicking on ``Advanced options`` to add an exception or, for increased security, by creating own certificates and importing the ``root-ca.pem`` file to the Certificate Manager of each browser that will access the Kibana interface.

  .. note:: The Kibana service listens to the default port ``443``. The browser address will be: ``https://<kibana_ip>`` replacing ``<kibana_ip>`` by the Kibana server IP. The default user and password to access Kibana is ``wazuh_user``.



Uninstall
---------

To uninstall the Wazuh manager and the Wazuh API:

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/uninstall_wazuh_manager_api.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/uninstall_wazuh_manager_api.rst



To uninstall Filebeat:



.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_filebeat.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_filebeat.rst



To uninstall Elasticsearch:

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_elasticsearch.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_elasticsearch.rst



To uninstall Kibana:

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_kibana.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_kibana.rst
