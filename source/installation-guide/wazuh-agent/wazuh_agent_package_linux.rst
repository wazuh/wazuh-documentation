.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent on Debian

.. _wazuh_agent_package_linux:

Linux
=====

This document will guide you to install or deploy the Wazuh agent.

.. note:: All the commands described below need to be executed with root user privileges.

Adding the Wazuh repository
---------------------------

.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/add_repository.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/add_repository.rst


Installing Wazuh agent
----------------------

#. On your terminal, install the Wazuh agent. You can choose between installation or deployment:

    a) Installation:

      .. tabs::


        .. group-tab:: APT


          .. include:: ../../_templates/installations/wazuh/deb/install_wazuh_agent.rst



        .. group-tab:: Yum


          .. include:: ../../_templates/installations/wazuh/yum/install_wazuh_agent.rst



        .. group-tab:: ZYpp


          .. include:: ../../_templates/installations/wazuh/zypp/install_wazuh_agent.rst


      Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :ref:`user manual<register_agents>`.

    b) Deployment:

      You can automate the agent registration and configuration using variables. It is necessary to define at least the variable ``WAZUH_MANAGER``. The agent will use this value to register and this will be the assigned manager for forwarding events.

      .. tabs::


        .. group-tab:: APT


          .. include:: ../../_templates/installations/wazuh/deb/deploy_wazuh_agent.rst



        .. group-tab:: Yum


          .. include:: ../../_templates/installations/wazuh/yum/deploy_wazuh_agent.rst



        .. group-tab:: ZYpp


          .. include:: ../../_templates/installations/wazuh/zypp/deploy_wazuh_agent.rst

    See the following document for additional deployment options: :ref:`deployment variables <deployment_variables_apt>`.

#. **(Optional)** Disable the Wazuh updates:

    We recommend maintaining the Wazuh manager version greater or equal to the Wazuh agents'. As a result, we recommended disabling the Wazuh repository in order to prevent accidental upgrades. To do this, use the following command:

    .. tabs::


      .. group-tab:: APT


        .. include:: ../../_templates/installations/wazuh/deb/disabling_repository.rst



      .. group-tab:: Yum


        .. include:: ../../_templates/installations/wazuh/yum/disabling_repository.rst



      .. group-tab:: ZYpp

        .. include:: ../../_templates/installations/wazuh/zypp/disabling_repository.rst



Alternatively, if you want to download the wazuh-agent package directly, or check the compatible versions, you can do it from :ref:`here <packages>`.


Uninstall
---------

To uninstall the agent:

.. tabs::


  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/uninstall_wazuh_agent.rst



  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/uninstall_wazuh_agent.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/uninstall_wazuh_agent.rst


