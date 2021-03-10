.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _wazuh_splunk:


Wazuh cluster installation
==========================

This document will go through the installation of the Wazuh server components and Filebeat in a Wazuh single-node cluster.

.. note:: Root user privileges are required to run all the commands described below.

Prerequisites
-------------

Before installing the Wazuh server and Filebeat, some extra packages must be installed:

.. include:: ../../../_templates/installations/elastic/common/before_installation_kibana_filebeat.rst

Installing the Wazuh server
---------------------------

The Wazuh server collects and analyzes data from the deployed Wazuh agents. It runs the Wazuh manager, the Wazuh API, and Filebeat. The first step to set up Wazuh is adding the Wazuh's repository to the server, alternatively, all the available packages can be found :ref:`here <packages>`. 

Adding the Wazuh repository
---------------------------

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../../_templates/installations/wazuh/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../../_templates/installations/wazuh/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../../_templates/installations/wazuh/zypp/add_repository.rst



Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Wazuh manager package:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../../_templates/installations/wazuh/yum/install_wazuh_manager.rst



      .. group-tab:: APT


        .. include:: ../../../_templates/installations/wazuh/deb/install_wazuh_manager.rst



      .. group-tab:: ZYpp


        .. include:: ../../../_templates/installations/wazuh/zypp/install_wazuh_manager.rst


#. Enable and start the Wazuh manager service:

    .. include:: ../../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#. Run the following command to check if the Wazuh manager is active: 

    .. include:: ../../../_templates/installations/wazuh/common/check_wazuh_manager.rst



The following sections describe how to configure a Wazuh multi-node cluster, setting a Wazuh manager as a Wazuh master node and the rest as a Wazuh worker nodes.

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


To uninstall Wazuh, visit the :ref:`uninstalling section <user_manual_uninstall_wazuh_splunk>`.

Next steps
----------

The next step consists of :ref:`installing Kibana <kibana>`.
