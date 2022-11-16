.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to successfully install the Wazuh agent on Solaris systems in this section of our Installation Guide.

.. _wazuh_agent_solaris:

Installing Wazuh agents on Solaris endpoints
============================================

The agent runs on the host you want to monitor and communicates with the Wazuh manager, sending data in near real-time through an encrypted and authenticated channel. 

To start the installation process, select your architecture: i386 or Sparc. Alternatively, if you want to download the Wazuh agent package directly, see the :doc:`packages list </installation-guide/packages-list>` section. 

.. tabs::

  .. group-tab:: i386

    Select your Solaris Intel version.

    .. tabs::

      .. group-tab:: Solaris 10

        .. include:: ../../_templates/installations/wazuh/solaris/install_wazuh_agent_s10_intel.rst



      .. group-tab:: Solaris 11

        .. include:: ../../_templates/installations/wazuh/solaris/install_wazuh_agent_s11_intel.rst






  .. group-tab:: Sparc

    Select your Solaris Sparc version.

    .. tabs::

      .. group-tab:: Solaris 10

        .. include:: ../../_templates/installations/wazuh/solaris/install_wazuh_agent_s10_sparc.rst



      .. group-tab:: Solaris 11

        .. include:: ../../_templates/installations/wazuh/solaris/install_wazuh_agent_s11_sparc.rst



  
        

        
The installation process is now complete, and the Wazuh agent is successfully installed on your Solaris endpoint. The next step is to register and configure the agent to communicate with the Wazuh server. To perform this action, see the :doc:`Wazuh agent enrollment </user-manual/agent-enrollment/index>` section.



Uninstall a Wazuh agent
-----------------------

To uninstall the agent, select your Solaris version.

.. tabs::


  .. group-tab:: Solaris 10

    .. include:: ../../_templates/installations/wazuh/solaris/uninstall_wazuh_agent_s10.rst



  .. group-tab:: Solaris 11

    .. include:: ../../_templates/installations/wazuh/solaris/uninstall_wazuh_agent_s11.rst


The Wazuh agent is now completely removed from your Solaris endpoint.
