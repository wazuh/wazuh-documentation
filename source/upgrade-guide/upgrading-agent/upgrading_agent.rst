.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_agent:

Upgrade the Wazuh agent
=======================

Since the Wazuh 3.x version it is possible to upgrade the agents from the manager or locally.

Upgrading the agents remotely from the manager is possible thanks to the agent_upgrade tool and the Wazuh API. Further information can be found in the :ref:`Upgrading agent<upgrading-agent>` section.

Choose a tab depending on the OS where the agent is installed: 

  .. tabs::

    .. group-tab:: Yum

      #. In case of having disabled the repository, it is necessary to add it again:

          .. code-block:: console

              # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/wazuh.repo

      #. Upgrade the agent: 

          .. code-block:: console

            # yum upgrade wazuh-agent


    .. group-tab:: APT

      #. In case of having disabled the repository, it is necessary to add it again:

          .. code-block:: console

            # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/wazuh.repo    
      
      #. Upgrade the agent:
      
          .. code-block:: console

            # apt-get update
            # apt-get install wazuh-agent

    .. group-tab:: ZYpp

      #. In case of having disabled the repository, it is necessary to add it again:

          .. code-block:: console

            # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/wazuh.repo    
      
      #. Upgrade the agent: 
      
          .. code-block:: console

            # zypper update wazuh-agent

    .. group-tab:: Windows

      The agent upgrading process for Windows systems requires to download the latest available installer from the :ref:`packages list <packages>`. There are two ways of using it (both of them require **administrator rights**):

      .. tabs::
    
        .. group-tab:: Using the GUI installer

          Open the installer and follow the instructions to upgrade the agent.

            .. image:: ../../images/installation/windows.png
              :align: center

        .. group-tab:: Using the command line

          To upgrade the Windows agent from the command line, run the installer using Windows PowerShell or the command prompt (the ``/q`` argument is used for unattended installations):

          .. code-block:: console

            # wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q

      .. note::
        To learn more about the unattended installation process, please check the :ref:`Windows installation guide <wazuh_agent_package_windows>`.

Disabling repositories
----------------------

    .. include:: ../../_templates/upgrading/wazuh/disable_repository.rst
