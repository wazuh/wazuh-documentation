.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_agent:

Upgrade the Wazuh agent
-----------------------

Since the Wazuh 3.x version it is possible to upgrade the agents from the manager or locally.

Upgrading the agents remotely from the manager is possible thanks to the agent_upgrade tools and the Wazuh API. You may check it in the  :ref:`Upgrading agent<upgrading-agent>` section.

To perform the upgrade locally you have to follow the next steps:

a) CentOS/RHEL/Fedora:

  .. code-block:: console

    # yum upgrade wazuh-agent

b) Debian/Ubuntu:

  .. code-block:: console

    # apt-get update
    # apt-get install wazuh-agent

c) OpenSUSE:

  .. code-block:: console

    # zypper update wazuh-agent

d) Windows:

  The agent upgrading process for Windows systems requires to download the latest available installer from the :ref:`packages list <packages>`. There are two ways of using it (both of them require **administrator rights**):

  * Using the GUI installer:

  Open the installer and follow the instructions to upgrade the agent.

    .. image:: ../images/installation/windows.png
      :align: center

  * Using the command line:

  To upgrade the Windows agent from the command line, run the installer using Windows PowerShell or the command prompt (the ``/q`` argument is used for unattended installations):

  .. code-block:: console

    # wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q

.. note::
  To learn more about the unattended installation process, you can check the :ref:`Windows installation guide <wazuh_agent_package_windows>`.