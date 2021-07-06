.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install a Wazuh multi-node cluster

.. _wazuh_server_step_by_step:


Installing Wazuh server in step-by-step mode
============================================

Install the Wazuh server in a single-node or multi-node configuration. 

.. note:: Root user privileges are required to run all the commands described below.

Installing the Wazuh server
---------------------------

The Wazuh server collects and analyzes data from the deployed Wazuh agents. It runs the Wazuh manager and Filebeat. 


Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add the Wazuh repository to download the official Wazuh packages. As an alternative, you can download the Wazuh packages directly from our :ref:`Package list <packages>`. 

.. tabs::



    .. group-tab:: Yum


      .. include:: ../../../_templates/installations/wazuh/yum/add_repository_wazuh_server.rst



    .. group-tab:: APT


      .. include:: ../../../_templates/installations/wazuh/deb/add_repository_wazuh_server.rst



    .. group-tab:: ZYpp


      .. include:: ../../../_templates/installations/wazuh/zypp/add_repository_wazuh_server.rst



Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install the Wazuh manager package. 

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../_templates/installations/wazuh/yum/install_wazuh_manager.rst



  .. group-tab:: APT


    .. include:: ../../../_templates/installations/wazuh/deb/install_wazuh_manager.rst



  .. group-tab:: ZYpp


    .. include:: ../../../_templates/installations/wazuh/zypp/install_wazuh_manager.rst



Now, the Wazuh manager has been installed in all the Wazuh cluster nodes. The Wazuh manager is configured as a single-node cluster by default. The following sections will describe how to configure the Wazuh manager as a Wazuh master node or as a Wazuh worker node.

One server has to be chosen as a master, the rest will be workers. So, the section ``Wazuh server master node`` must be applied once, in the server chosen for this role. For all the other servers, the section ``Wazuh server worker node`` must be applied.


Wazuh server master node
~~~~~~~~~~~~~~~~~~~~~~~~

#. .. include:: ../../../_templates/installations/wazuh/common/configure_wazuh_master_node.rst


#. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, enable and start the Wazuh manager service:

    .. include:: ../../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#. Run the following command to check if the Wazuh manager is active: 

    .. include:: ../../../_templates/installations/wazuh/common/check_wazuh_manager.rst

Wazuh server worker nodes
~~~~~~~~~~~~~~~~~~~~~~~~~

#. .. include:: ../../../_templates/installations/wazuh/common/configure_wazuh_worker_node.rst


#. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, enable and start the Wazuh manager service:

    .. include:: ../../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#. Run the following command to check if the Wazuh manager is active: 

    .. include:: ../../../_templates/installations/wazuh/common/check_wazuh_manager.rst

#. .. include:: ../../../_templates/installations/wazuh/common/check_wazuh_cluster.rst



.. _wazuh_server_multi_node_filebeat:

Installing Filebeat
-------------------

Filebeat securely forwards alerts and archived events to Elasticsearch.  It has to be installed in every Wazuh manager server.


Filebeat installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


#. Install the Filebeat package.

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../../_templates/installations/elastic/yum/install_filebeat.rst



      .. group-tab:: APT


        .. include:: ../../../_templates/installations/elastic/deb/install_filebeat.rst



      .. group-tab:: ZYpp


        .. include:: ../../../_templates/installations/elastic/zypp/install_filebeat.rst



#. Download the pre-configured Filebeat configuration file used to forward the Wazuh alerts to Elasticsearch.

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/|WAZUH_LATEST_MINOR|/resources/open-distro/filebeat/7.x/filebeat_elastic_cluster.yml

#. Download the alerts template for Elasticsearch.

    .. include:: ../../../_templates/installations/elastic/common/load_filebeat_template.rst


#. Download the Wazuh module for Filebeat.

    .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Edit the file ``/etc/filebeat/filebeat.yml``:

    .. include:: ../../../_templates/installations/elastic/common/configure_filebeat.rst

#. Configure Filebeat certificates:

    .. include:: ../../../_templates/installations/elastic/common/copy_certificates_filebeat_wazuh_cluster.rst

#. Enable and start the Filebeat service:

    .. include:: ../../../_templates/installations/elastic/common/enable_filebeat.rst

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
