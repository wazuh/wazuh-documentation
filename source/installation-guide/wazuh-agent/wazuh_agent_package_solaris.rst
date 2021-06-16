.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh agents on your Solaris system. 

.. _wazuh_agent_solaris:


Installing Wazuh agents on your Solaris systems
===============================================

The agent runs on the host you want to monitor and communicates with Wazuh manager, sending data in near real time through an encrypted and authenticated channel. The installation of a Wazuh agent on a Solaris system uses deployment variables that facilitate the task of installing, registering, and configuring the agent. 

The Solaris Wazuh agent runs on Sparc or Intel architectures. Select the tab according to your architecture: i386 or Sparc. 

.. tabs::

  .. group-tab:: i386

    Depending of your Solaris Intel version, select one of the following tabs:

    .. tabs::

      .. group-tab:: Solaris 10

        .. include:: ../../_templates/installations/wazuh/solaris/install_wazuh_agent_s10_intel.rst



      .. group-tab:: Solaris 11

        .. include:: ../../_templates/installations/wazuh/solaris/install_wazuh_agent_s11_intel.rst






  .. group-tab:: Sparc

    Depending of your Solaris Sparc version, select one of the following tabs:

    .. tabs::

      .. group-tab:: Solaris 10

        .. include:: ../../_templates/installations/wazuh/solaris/install_wazuh_agent_s10_sparc.rst



      .. group-tab:: Solaris 11

        .. include:: ../../_templates/installations/wazuh/solaris/install_wazuh_agent_s11_sparc.rst



Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, see :ref:`Registering Wazuh agents <register_agents>`.



Uninstall
---------

.. tabs::


  .. group-tab:: Solaris 10

    .. include:: ../../_templates/installations/wazuh/solaris/uninstall_wazuh_agent_s10.rst



  .. group-tab:: Solaris 11

    .. include:: ../../_templates/installations/wazuh/solaris/uninstall_wazuh_agent_s11.rst
