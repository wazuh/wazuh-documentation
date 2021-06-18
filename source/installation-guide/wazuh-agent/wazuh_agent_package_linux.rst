.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to deploy Wazuh agents on your Linux systems. 

.. _wazuh_agent_package_linux:

Deploying Wazuh agents on Linux systems
=======================================

The agent runs on the host you want to monitor and communicates with the Wazuh manager, sending data in near real time through an encrypted and authenticated channel. The deployment of a Wazuh agent on a Linux system uses deployment variables that facilitate the task of deploying, logging, and configuring the agent. Alternatively, if you want to download the Wazuh agent package directly or check the compatible versions, see the :ref:`packages list <packages>` section . 


.. note:: To execute all the commands, root user privileges are required.

Add the Wazuh repository
-------------------------

Add the Wazuh repository to download the official packages. 

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/add_repository.rst



Deploy a Wazuh agent
--------------------

#. To deploy the Wazuh agent to your system, select your package manager and edit the ``WAZUH_MANAGER`` variable to contain your Wazuh manager IP address or hostname.   

          
      .. tabs::
    
   
        .. group-tab:: Yum
      
   
          .. include:: ../../_templates/installations/wazuh/yum/deploy_wazuh_agent.rst
      
   
   
        .. group-tab:: APT
      
   
          .. include:: ../../_templates/installations/wazuh/deb/deploy_wazuh_agent.rst
      
   
   
        .. group-tab:: ZYpp
      
   
          .. include:: ../../_templates/installations/wazuh/zypp/deploy_wazuh_agent.rst
      
    
    
    For additional deployment options such as agent name, agent group, and registration password, see the :ref:`deployment variables <deployment_variables_linux>` section.   
         

#. Enable and start the Wazuh agent service.

  .. include:: ../../_templates/installations/wazuh/common/enable_wazuh_agent_service.rst

The deployment process is complete and the Wazuh agent is now sucessfully running on your Linux system. 

- **Recommended action** -  Disable Wazuh updates

  Compatibility between the Wazuh agent and the Wazuh manager is guaranteed when the Wazuh manager version is later than or equal to that of the Wazuh agent. Therefore, we recommend disabling the Wazuh repository to prevent accidental upgrades. To do so, use the following command:

      .. tabs::


        .. group-tab:: Yum


          .. include:: ../../_templates/installations/wazuh/yum/disabling_repository.rst



        .. group-tab:: APT


          .. include:: ../../_templates/installations/wazuh/deb/disabling_repository.rst



        .. group-tab:: ZYpp

          .. include:: ../../_templates/installations/wazuh/zypp/disabling_repository.rst


Uninstall a Wazuh agent
-----------------------

To uninstall the agent, select your package manager and run the command. 

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/uninstall_wazuh_agent.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/uninstall_wazuh_agent.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/uninstall_wazuh_agent.rst


