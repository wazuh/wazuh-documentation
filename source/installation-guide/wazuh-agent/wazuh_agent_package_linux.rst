.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Learn more about how to install or deploy the Wazuh lightweight agent in Linux in this section of our Installation Guide. 

.. _wazuh_agent_package_linux:

Linux
=====

This document will guide you to install or deploy the Wazuh agent.

.. note:: To execute the commands described below, root privileges are required.

Adding the Wazuh repository
---------------------------

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/add_repository.rst


Installing Wazuh agent
----------------------

#. Install the Wazuh agent on your terminal. You can choose between installation or deployment:

    a) Installation:

      .. tabs::


        .. group-tab:: Yum


          .. include:: ../../_templates/installations/wazuh/yum/install_wazuh_agent.rst



        .. group-tab:: APT


          .. include:: ../../_templates/installations/wazuh/deb/install_wazuh_agent.rst



        .. group-tab:: ZYpp


          .. include:: ../../_templates/installations/wazuh/zypp/install_wazuh_agent.rst


      Once the agent is installed, the next step is to register it and configure it to communicate with the manager. For more information on this process, visit the :ref:`user manual<register_agents>` section.

    b) Deployment:

      The registration and configuration of the agent can be automated using variables. It is necessary to define, at least, the variable ``WAZUH_MANAGER``. The agent will use this value to register and this will be the assigned manager for forwarding events. 
      
      .. tabs::


        .. group-tab:: Yum


          .. include:: ../../_templates/installations/wazuh/yum/deploy_wazuh_agent.rst



        .. group-tab:: APT


          .. include:: ../../_templates/installations/wazuh/deb/deploy_wazuh_agent.rst



        .. group-tab:: ZYpp


          .. include:: ../../_templates/installations/wazuh/zypp/deploy_wazuh_agent.rst


    See the following document for additional deployment options: :ref:`deployment variables <deployment_variables_apt>`.

#. Enable the service

  .. include:: ../../_templates/installations/wazuh/common/enable_wazuh_agent_service.rst

**(Optional)** Disable Wazuh updates:

The version of the Wazuh manager is recommended to be greater than or equal to that of the Wazuh agents. Therefore, we recommend disabling the Wazuh repository to prevent accidental upgrades. To do so, use the following command:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../_templates/installations/wazuh/yum/disabling_repository.rst



      .. group-tab:: APT


        .. include:: ../../_templates/installations/wazuh/deb/disabling_repository.rst



      .. group-tab:: ZYpp

        .. include:: ../../_templates/installations/wazuh/zypp/disabling_repository.rst



Visit our :ref:`packages list <packages>` section to download the Wazuh agent package directly or to check the compatible versions. 


Uninstall
---------

To uninstall the agent:

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/uninstall_wazuh_agent.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/uninstall_wazuh_agent.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/uninstall_wazuh_agent.rst


