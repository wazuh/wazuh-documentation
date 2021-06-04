.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent on Debian

.. _wazuh_agent_package_linux:

Deploy Wazuh agents on your Linux systems
=========================================

Deploy a Wazuh agent on your Linux system. 

.. note:: To execute the commands described below, root privileges are required.

Adding the Wazuh repository
---------------------------

Add the Wazuh repository to download the official packages. 

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/add_repository.rst



Deploying a Wazuh agent
-----------------------

#. Choose your package manager tab, edit the ``WAZUH_MANAGER`` variable to contain your Wazuh manager IP address or hostname and proceed to deploy the agent in your system:   

          
      .. tabs::
    
   
        .. group-tab:: Yum
      
   
          .. include:: ../../_templates/installations/wazuh/yum/deploy_wazuh_agent.rst
      
   
   
        .. group-tab:: APT
      
   
          .. include:: ../../_templates/installations/wazuh/deb/deploy_wazuh_agent.rst
      
   
   
        .. group-tab:: ZYpp
      
   
          .. include:: ../../_templates/installations/wazuh/zypp/deploy_wazuh_agent.rst
      
    
    
        For additional deployment options, like agent name, agent group, and registration password, see :ref:`deployment variables <deployment_variables_apt>` section.   
        
        

#. Enable and start the service:

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


