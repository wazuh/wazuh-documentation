.. Copyright (C) 2019 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent on Debian

.. _wazuh_agent_package_rpm_legacy:

Install Wazuh agent on Linux RPM legacy
=======================================

This document will guide you to install or deploy the Wazuh agent in a Linux legacy OS like CentOS 5, Red Hat Enterprise Linux 5, Oracle Linux 5 or SUSE 11. Please, check the :ref:`compatibility matrix<compatibility_matrix>` if you have any doubt about your OS compatibility.

If you are using a most recent Linux OS, you must follow the guide :ref:`Wazuh Agent for Linux<wazuh_agent_package_linux>`

.. note:: All the commands described below need to be executed with root user privileges.

Adding the Wazuh repository
---------------------------

.. tabs::


  .. group-tab:: Yum


    .. include:: ../_templates/installations/wazuh/yum/add_repository_legacy.rst



  .. group-tab:: ZYpp


    .. include:: ../_templates/installations/wazuh/zypp/add_repository_legacy.rst


Installing Wazuh agent
----------------------

#. On your terminal, install the Wazuh agent. You can choose installation or deployment:

    a) Installation:

      .. tabs::

        .. group-tab:: Yum


          .. include:: ../_templates/installations/wazuh/yum/install_wazuh_agent.rst



        .. group-tab:: ZYpp


          .. include:: ../_templates/installations/wazuh/zypp/install_wazuh_agent.rst


      Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :ref:`user manual<register_agents>`.

    b) Deployment:

      You can automate the agent registration and configuration using variables. It is necessary to define at least the variable ``WAZUH_MANAGER``. The agent will use this value to register and it will be the assigned manager for forwarding events.

      .. tabs::


        .. group-tab:: Yum


          .. include:: ../_templates/installations/wazuh/yum/deploy_wazuh_agent.rst



        .. group-tab:: ZYpp


          .. include:: ../_templates/installations/wazuh/zypp/deploy_wazuh_agent.rst

      See the following document for additional deployment options: :ref:`deployment variables <deployment_variables_apt>`.

#. **(Optional)** Disable the Wazuh updates:

    We recommend maintaining the Wazuh manager version greater or equal to that of the Wazuh agents. As a result, we recommended disabling the Wazuh repository in order to prevent accidental upgrades. To do this, use the following command:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../_templates/installations/wazuh/yum/disabling_repository.rst



      .. group-tab:: ZYpp

        .. include:: ../_templates/installations/wazuh/zypp/disabling_repository.rst



Alternatively, if you want to download the wazuh-agent package directly, or check the compatible versions, you can do it from :ref:`here <packages>`.

Uninstall
---------

To uninstall the agent:

.. tabs::


  .. group-tab:: Yum


    .. include:: ../_templates/installations/wazuh/yum/uninstall_wazuh_agent.rst



  .. group-tab:: ZYpp


    .. include:: ../_templates/installations/wazuh/zypp/uninstall_wazuh_agent.rst
