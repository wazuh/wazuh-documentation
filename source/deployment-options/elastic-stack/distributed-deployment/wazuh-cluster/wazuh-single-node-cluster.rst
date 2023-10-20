.. Copyright (C) 2015, Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _basic_wazuh_single_node_cluster:

Wazuh single-node cluster
=========================

This document will go through the installation of the Wazuh server components in a single-node cluster.

.. note:: You need root user privileges to run all the commands described below.

Prerequisites
-------------

Before installing the Wazuh servers and Filebeat, some extra packages must be installed:

.. include:: /_templates/installations/basic/before_installation_elastic.rst

Installing Wazuh server
-----------------------

The Wazuh server collects and analyzes data from deployed agents. It runs the Wazuh manager, the Wazuh API and Filebeat. The first step in setting up Wazuh is adding Wazuh repository to the server. Alternatively, the Wazuh manager package can be downloaded directly, and compatible versions can be checked :doc:`here </installation-guide/packages-list>`.

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::


  .. group-tab:: Yum


    .. include:: /_templates/installations/basic/wazuh/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: /_templates/installations/basic/wazuh/deb/add_repository.rst



Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Wazuh manager package:

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum install wazuh-manager|WAZUH_MANAGER_RPM_PKG_INSTALL|

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install wazuh-manager|WAZUH_MANAGER_DEB_PKG_INSTALL|

#. Enable and start the Wazuh manager service:


    .. include:: /_templates/installations/wazuh/common/enable_wazuh_manager_service.rst


#. Run the following command to check if the Wazuh manager is active: 

    .. include:: /_templates/installations/wazuh/common/check_wazuh_manager.rst    


.. _basic_wazuh_server_single_node_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch.

Adding the Elastic Stack repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs::


  .. group-tab:: Yum


    .. include:: /_templates/installations/basic/elastic/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: /_templates/installations/basic/elastic/deb/add_repository.rst



Filebeat installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


#. Install the Filebeat package:

    .. tabs::


      .. group-tab:: Yum


        .. include:: /_templates/installations/basic/elastic/yum/install_filebeat.rst



      .. group-tab:: APT


        .. include:: /_templates/installations/basic/elastic/deb/install_filebeat.rst



#. Download the pre-configured Filebeat config file used to forward Wazuh alerts to Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/tpl/elastic-basic/filebeat.yml

#. Download the alerts template for Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_CURRENT|/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.2.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Edit the file ``/etc/filebeat/filebeat.yml``:

    .. include:: /_templates/installations/basic/elastic/common/configure_filebeat.rst


#. Configure Filebeat certificate:

    .. include:: /_templates/installations/basic/elastic/common/copy_certificates_filebeat.rst

#. Enable and start the Filebeat service:

    .. include:: /_templates/installations/basic/elastic/common/enable_filebeat.rst

To ensure that Filebeat has been successfully installed, run the following command:

    .. code-block:: console

      # filebeat test output


Disabling repositories
----------------------

.. include:: /_templates/installations/basic/elastic/common/disabling_repositories_explanation.rst


.. tabs::


  .. group-tab:: Yum


    .. include:: /_templates/installations/basic/wazuh/yum/disabling_repositories.rst



  .. group-tab:: APT


    .. include:: /_templates/installations/basic/wazuh/deb/disabling_repositories.rst



To uninstall Wazuh and Filebeat, visit the :doc:`uninstalling section </user-manual/uninstall/elastic-stack>`.

Next steps
----------

The next step consists of :doc:`installing Kibana </deployment-options/elastic-stack/distributed-deployment/kibana/index>`.
