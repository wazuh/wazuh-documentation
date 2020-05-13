.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _wazuh_multi_node_cluster:


Wazuh multi-node cluster
=========================

This document will go through the installation of the Wazuh server components in a multi-node cluster.

.. note:: Root user privileges are required to execute all the commands described below.

Installing the Wazuh server
---------------------------

The Wazuh server collects and analyzes data from deployed Wazuh agents. It runs the Wazuh manager, the Wazuh API and Filebeat. The first step to set up Wazuh is adding the Wazuh's repository to the servers. Alternatively, the Wazuh manager package can be downloaded directly and compatible versions can be checked :ref:`here <packages>`.

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

This section describes how to add the Wazuh repository. It will be used for the Wazuh manager and the Wazuh API installation. These steps must be followed in all the servers that will be part of the Wazuh multi-node cluster.

.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/add_repository.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/add_repository.rst



Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install the Wazuh manager package. This step must be applied in all servers that will act as Wazuh cluster nodes:

.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/install_wazuh_manager.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/install_wazuh_manager.rst


Now, the Wazuh manager has been installed in all the Wazuh cluster nodes. The Wazuh manager is installed and configured in a single-node cluster by default. The following sections will describe how to configure the Wazuh manager as a Wazuh master node or Wazuh worker node.

One server has to be chosen as a master, the rest will be workers. So, the section ``Wazuh server master node`` must be applied once, in the server chosen for this role. For all the other servers, the section ``Wazuh server worker node`` must be applied.


Wazuh server master node
~~~~~~~~~~~~~~~~~~~~~~~~

#. .. include:: ../../_templates/installations/wazuh/common/configure_wazuh_master_node.rst


#. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, the Wazuh manager needs to be restarted:

    .. include:: ../../_templates/installations/wazuh/common/restart_wazuh_manager.rst


Wazuh server worker nodes
~~~~~~~~~~~~~~~~~~~~~~~~~


#. .. include:: ../../_templates/installations/wazuh/common/configure_wazuh_worker_node.rst


#. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, the Wazuh manager needs to be restarted:

    .. include:: ../../_templates/installations/wazuh/common/restart_wazuh_manager.rst

#. .. include:: ../../_templates/installations/wazuh/common/check_wazuh_cluster.rst


Installing the Wazuh API
~~~~~~~~~~~~~~~~~~~~~~~~

Before starting, note that the Wazuh API has to be installed only in the Wazuh master node and not in the Wazuh worker nodes.

Although the minimum NodeJS version needed for the Wazuh API is 4.6.1, it is recommended to install the most recent available version for each Operating System. This guide uses the 10.x version, but the most recent one can be installed.


.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/install_wazuh_api.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/install_wazuh_api.rst


.. note::
  It is strongly recommended to secure the Wazuh API. The following document :ref:`securing_api` explains how to enable HTTPS communication, change the default user and password, and more.

.. _wazuh_server_multi_node_filebeat:

Installing Filebeat
-------------------

Filebeat is the tool on the Wazuh server that securely forwards alerts and archived events to Elasticsearch.  It has to be installed in every Wazuh manager server.


Filebeat installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


#. Install the Filebeat package:

    .. tabs::


      .. group-tab:: APT


        .. include:: ../../_templates/installations/elastic/deb/install_filebeat.rst



      .. group-tab:: Yum


        .. include:: ../../_templates/installations/elastic/yum/install_filebeat.rst





#. Download the pre-configured Filebeat config file used to forward the Wazuh alerts to Elasticsearch:

    .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/filebeat/7.x/filebeat.yml

#. Download the alerts template for Elasticsearch:

    .. include:: ../../_templates/installations/elastic/common/load_filebeat_template.rst


#. Download the Wazuh module for Filebeat:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/3.x/filebeat/wazuh-filebeat-0.1.tar.gz | tar -xvz -C /usr/share/filebeat/module

#. Edit the file ``/etc/filebeat/filebeat.yml``:

    .. include:: ../../_templates/installations/elastic/common/configure_filebeat.rst

#. Configure Filebeat certificates:

    .. include:: ../../_templates/installations/elastic/common/copy_certificates_filebeat_wazuh_cluster.rst

#. Enable and start the Filebeat service:

    .. include:: ../../_templates/installations/elastic/common/enable_filebeat.rst

To ensure that Filebeat has been successfully installed, execute the following command:

    .. code-block:: console

      # filebeat test output


Next steps
----------

The next step consists of :ref:`installing Kibana <kibana>`.


Uninstall
---------

To uninstall the Wazuh manager and the Wazuh API:

.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/uninstall_wazuh_manager_api.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/uninstall_wazuh_manager_api.rst



To uninstall Filebeat:



.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/elastic/deb/uninstall_filebeat.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/elastic/yum/uninstall_filebeat.rst
