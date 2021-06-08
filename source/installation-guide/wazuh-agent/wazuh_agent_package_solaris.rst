.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Learn more about how to install or deploy the Wazuh lightweight agent in Solaris 10 i386 in this section of our installation guide. 

.. _wazuh_agent_solaris:

Solaris
=======

The Solaris Wazuh agent runs on Sparc or Intel architectures. Select the tab according to your architecture: i386 or Sparc

.. tabs::

  .. group-tab:: i386

    Depending of your Solaris Intel version, select one of the following tabs:

    .. tabs::

      .. group-tab:: Solaris 10

        .. include:: ../../_templates/installations/wazuh/solaris/install_wazuh_agent_s10_intel.rst



      .. group-tab:: Solaris 11

        .. include:: ../../_templates/installations/wazuh/solaris/install_wazuh_agent_s11_intel.rst

        After creating the repository install the package:

        .. code-block:: console

              # pkg install --accept wazuh-agent

        Finally, remove the publisher:

        .. code-block:: console

              # pkg unset-publisher wazuh





  .. group-tab:: Sparc

    Depending of your Solaris Sparc version, select one of the following tabs:

    .. tabs::

      .. group-tab:: Solaris 10

        .. include:: ../../_templates/installations/wazuh/solaris/install_wazuh_agent_s10_sparc.rst



      .. group-tab:: Solaris 11

        .. include:: ../../_templates/installations/wazuh/solaris/install_wazuh_agent_s11_sparc.rst


        After creating the repository install the package:

        .. code-block:: console

              # pkg install --accept wazuh-agent

        Finally, remove the publisher:

        .. code-block:: console

              # pkg unset-publisher wazuh



Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :ref:`user manual<register_agents>`.



Uninstall
---------

.. tabs::


  .. group-tab:: Solaris 10

    .. include:: ../../_templates/installations/wazuh/solaris/uninstall_wazuh_agent_s10.rst



  .. group-tab:: Solaris 11

    .. include:: ../../_templates/installations/wazuh/solaris/uninstall_wazuh_agent_s11.rst
