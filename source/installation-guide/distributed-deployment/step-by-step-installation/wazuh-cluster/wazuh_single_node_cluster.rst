.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _wazuh_single_node_cluster:


Wazuh single-node cluster
=========================

This document will go through the installation of the Wazuh server components and Filebeat in a Wazuh single-node cluster.

.. note:: Root user privileges are required to execute all the commands described below.

Prerequisites
-------------

Before installing the Wazuh server and Filebeat, some extra packages must be installed:

.. include:: ../../../../_templates/installations/elastic/common/before_installation_kibana_filebeat.rst

Installing the Wazuh server
---------------------------

The Wazuh server collects and analyzes data from the deployed Wazuh agents. It runs the Wazuh manager, the Wazuh API, and Filebeat. The first step to set up Wazuh is adding the Wazuh's repository to the server. Alternatively, the packages can be downloaded directly and compatible versions can be checked :ref:`here <packages>`.

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../_templates/installations/wazuh/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../../../_templates/installations/wazuh/deb/add_repository.rst



Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install the Wazuh manager package:

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../_templates/installations/wazuh/yum/install_wazuh_manager.rst



  .. group-tab:: APT


    .. include:: ../../../../_templates/installations/wazuh/deb/install_wazuh_manager.rst



Installing the Wazuh API
~~~~~~~~~~~~~~~~~~~~~~~~

Although the minimum NodeJS version needed for the Wazuh API is 4.6.1, it is recommended to install the most recent version available for the Operating System being used. This guide uses the 10.x version, but the most recent one can be installed:


.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../_templates/installations/wazuh/yum/install_wazuh_api.rst



  .. group-tab:: APT


    .. include:: ../../../../_templates/installations/wazuh/deb/install_wazuh_api.rst



.. note::
  It is strongly recommended to secure the Wazuh API. The following document :ref:`securing_api` explains how to enable HTTPS communication, change the default user and password, and more.

.. _wazuh_server_single_node_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch.


Filebeat installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


#. Install the Filebeat package:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../../../_templates/installations/elastic/yum/install_filebeat.rst



      .. group-tab:: APT


        .. include:: ../../../../_templates/installations/elastic/deb/install_filebeat.rst



#. Download the pre-configured Filebeat config file used to forward the Wazuh alerts to Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/filebeat/7.x/filebeat.yml

#. Download the alerts template for Elasticsearch:

    .. include:: ../../../../_templates/installations/elastic/common/load_filebeat_template.rst


#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/3.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Edit the file ``/etc/filebeat/filebeat.yml``:

    .. include:: ../../../../_templates/installations/elastic/common/configure_filebeat.rst

#. Configure Filebeat certificates:

    .. include:: ../../../../_templates/installations/elastic/common/copy_certificates_filebeat.rst

#. Enable and start the Filebeat service:

    .. include:: ../../../../_templates/installations/elastic/common/enable_filebeat.rst

To ensure that Filebeat has been successfully installed, execute the following command:

    .. code-block:: console

      # filebeat test output


Next steps
----------

The next step consists on :ref:`installing Kibana <kibana>`.
