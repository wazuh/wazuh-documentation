.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh agents on your Solaris system. 

.. _wazuh_agent_solaris:


Installing Wazuh agents on Solaris systems
==========================================

The Wazuh agent installed on Solaris runs on Sparc or Intel architectures. It monitors the host and communicates with the Wazuh manager, sending data in near real time through an encrypted and authenticated channel. Alternatively, if you want to download the Wazuh agent package directly or check the compatible versions, see the :ref:`packages list <packages>` section. 

To start the installation process, select your architecture: i386 or Sparc. 

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



The installation process is now complete and the Wazuh agent is successfully installed on your Solaris system. The next step is to register and configure the agent to communicate with the Wazuh manager. To perform this action, see the :ref:`Registering Wazuh agents <register_agents>` section.



Uninstall a Wazuh agent
-----------------------

To uninstall the agent, select your Solaris version.

.. tabs::


  .. group-tab:: Solaris 10

    .. include:: ../../_templates/installations/wazuh/solaris/uninstall_wazuh_agent_s10.rst



  .. group-tab:: Solaris 11

    .. include:: ../../_templates/installations/wazuh/solaris/uninstall_wazuh_agent_s11.rst


The Wazuh agent is now completely removed from your Solaris system.