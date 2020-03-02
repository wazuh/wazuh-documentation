.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _wazuh_single_node_cluster:


Wazuh single-node cluster
=========================

This document will go through the installation of the Wazuh server components in a single-node cluster.

.. note:: Root user privileges are required to execute all the commands described below.

Installing Wazuh server
-----------------------

The Wazuh server collects and analyzes data from deployed agents. It runs the Wazuh manager, the Wazuh API and Filebeat. The first step to set up Wazuh is adding Wazuh's repository to the server. Alternatively, the Wazuh manager package can be downloaded directly and compatible versions can be checked :ref:`here <packages>`.

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/add_repository.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/add_repository.rst



Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Wazuh manager package:

.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/install_wazuh_manager.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/install_wazuh_manager.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/install_wazuh_manager.rst


Installing the Wazuh API
~~~~~~~~~~~~~~~~~~~~~~~~

.. note::
  Although the minimum NodeJS version needed for Wazuh API is 4.6.1, it is always recommended to install the most recent available version for each Operating System. In this guide, the 8.x version was used but a most recent one can be installed.


.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/install_wazuh_api.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/install_wazuh_api.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/install_wazuh_api.rst


.. note::
  Now, that the Wazuh API is installed, it is strongly recommended to secure the API. In the following document :ref:`securing_api` it is explained how to enable HTTPS communication, how to change default credentials and more.

.. _wazuh_server_single_node_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch.

Adding the Elastic Stack repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/add_repository.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/elastic/zypp/add_repository.rst


Filebeat installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


#. Install the Filebeat package:

    .. tabs::


      .. group-tab:: APT


        .. include:: ../../_templates/installations/elastic/deb/install_filebeat.rst



      .. group-tab:: Yum


        .. include:: ../../_templates/installations/elastic/yum/install_filebeat.rst



      .. group-tab:: ZYpp


        .. include:: ../../_templates/installations/elastic/zypp/install_filebeat.rst


#. Download the Filebeat config file from the Wazuh repository. This is pre-configured to forward Wazuh alerts to Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/elastic-secured-3.10/extensions/filebeat/7.x/filebeat.yml

#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v3.10.2/extensions/elasticsearch/7.x/wazuh-template.json

#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/3.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Edit the file ``/etc/filebeat/filebeat.yml``:

    .. include:: ../../_templates/installations/elastic/common/configure_filebeat.rst

#. .. include:: ../../_templates/installations/elastic/common/copy_certificates_filebeat.rst

#. Enable and start the Filebeat service:

    .. include:: ../../_templates/installations/elastic/common/enable_filebeat.rst

#. Load the Filebeat template:

    .. include:: ../../_templates/installations/elastic/common/load_filebeat_template.rst


Next steps
----------

The next step consists on installing Kibana. The guide continues  :ref:`here<kibana>`.


Disabling repositories
----------------------

.. include:: ../../_templates/installations/elastic/common/disabling_repositories_explanation.rst

In order to anticipate and avoid this situation, it is recommended to disable the Elasticsearch repository in the following way:

.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/disabling_repositories.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/disabling_repositories.rst



  .. group-tab:: ZYpp

    .. include:: ../../_templates/installations/wazuh/zypp/disabling_repositories.rst



Uninstall
---------

To uninstall the Wazuh manager and Wazuh API:

.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/uninstall_wazuh_manager_api.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/uninstall_wazuh_manager_api.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/uninstall_wazuh_manager_api.rst


To uninstall Filebeat:



.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_filebeat.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_filebeat.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/elastic/zypp/uninstall_filebeat.rst



