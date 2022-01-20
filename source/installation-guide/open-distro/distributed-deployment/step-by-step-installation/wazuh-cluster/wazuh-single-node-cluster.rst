.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn how to install Elasticsearch as a single-node cluster. This kind of installation provides high availability and load balancing.

.. _wazuh_single_node_cluster:


Wazuh single-node cluster
=========================

This document will go through the installation of the Wazuh server components and Filebeat in a Wazuh single-node cluster.

.. note:: Root user privileges are required to run all the commands described below.

Installing the Wazuh server
---------------------------

The Wazuh server collects and analyzes data from the deployed Wazuh agents. It runs the Wazuh manager, the Wazuh API, and Filebeat. The first step to set up Wazuh is adding the Wazuh's repository to the server, alternatively, all the available packages can be found :ref:`here <packages>`. 

Adding the Wazuh repository
---------------------------

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../../../_templates/installations/wazuh/yum/add_repository_wazuh_server.rst



  .. group-tab:: APT


    .. include:: ../../../../../_templates/installations/wazuh/deb/add_repository_wazuh_server.rst



  .. group-tab:: ZYpp


    .. include:: ../../../../../_templates/installations/wazuh/zypp/add_repository_wazuh_server.rst



Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Wazuh manager package:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../../../../_templates/installations/wazuh/yum/install_wazuh_manager.rst



      .. group-tab:: APT


        .. include:: ../../../../../_templates/installations/wazuh/deb/install_wazuh_manager.rst



      .. group-tab:: ZYpp


        .. include:: ../../../../../_templates/installations/wazuh/zypp/install_wazuh_manager.rst


#. Enable and start the Wazuh manager service:

    .. include:: ../../../../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#. Run the following command to check if the Wazuh manager is active: 

    .. include:: ../../../../../_templates/installations/wazuh/common/check_wazuh_manager.rst

.. _wazuh_server_single_node_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch.


Filebeat installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


#. Install the Filebeat package:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../../../../_templates/installations/elastic/yum/install_filebeat.rst



      .. group-tab:: APT


        .. include:: ../../../../../_templates/installations/elastic/deb/install_filebeat.rst



      .. group-tab:: ZYpp


        .. include:: ../../../../../_templates/installations/elastic/zypp/install_filebeat.rst



#. Download the pre-configured Filebeat configuration file used to forward the Wazuh alerts to Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://packages.wazuh.com/resources/4.2/open-distro/filebeat/7.x/filebeat.yml

#. Download the alerts template for Elasticsearch:

    .. include:: ../../../../../_templates/installations/elastic/common/load_filebeat_template.rst


#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Edit the file ``/etc/filebeat/filebeat.yml``:

    .. include:: ../../../../../_templates/installations/elastic/common/configure_filebeat.rst

#. Replace ``wazuh-node-name`` with your Wazuh node name, the same used in ``instances.yml`` to create the certificates, and move the certificates to their corresponding location. This guide assumes that a copy of ``certs.tar``, created during the Elasticsearch installation,  has been placed in the root home folder (``~/``). 

    .. include:: ../../../../../_templates/installations/elastic/common/copy_certificates_filebeat.rst

#. Enable and start the Filebeat service:

    .. include:: ../../../../../_templates/installations/elastic/common/enable_filebeat.rst

To ensure that Filebeat has been successfully installed, run the following command:

    .. code-block:: console

      # filebeat test output

An example response should look as follows:

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
                version: 7.10.2

To uninstall Wazuh and Filebeat, visit the :ref:`uninstalling section <user_manual_uninstall_wazuh_installation_open_distro>`.

Next steps
----------

The next step consists of :ref:`installing Kibana <kibana>`.
