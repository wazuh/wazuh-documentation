.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_wazuh_agent:

Upgrading the Wazuh agent
=========================

The following steps show how to upgrade the Wazuh agent from 3.x to 3.y.

Upgrading the Wazuh agent
-------------------------

Since Wazuh 3.x, it is possible to upgrade the Wazuh agents remotely from the Wazuh manager or locally.

Upgrading the Wazuh agents remotely is possible by using the ``agent_upgrade`` tools or the Wazuh API. More information about the process can be found in the :ref:`Upgrading agent<upgrading-agent>` section.

To perform the upgrade locally, follow the instructions for the Wazuh agent's operating system:

.. tabs::

  .. group-tab:: YUM

    If the Wazuh repository is disabled it is necessary to enable it to get the latest package:

    .. code-block:: console

      # sed -i "s/^enabled=0/enabled=1/" /etc/yum.repos.d/wazuh.repo

    Upgrade the Wazuh agent to the latest version:

    .. code-block:: console

      # yum upgrade wazuh-agent

    It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues as the Wazuh agent should always be in the same or lower version than the Wazuh manager:

    .. code-block:: console

      # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

  .. group-tab:: APT

    If the Wazuh repository is disabled it is necessary to enable it to get the latest package. This step is not necessary if the package is set to a ``hold`` state instead of disabling the repository:

    .. code-block:: console

      # sed -i "s/^#deb/deb/" /etc/apt/sources.list.d/wazuh.list

    Upgrade the Wazuh agent to the latest version:

    .. code-block:: console

      # apt-get update
      # apt-get install wazuh-agent

    It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues as the Wazuh agent should always be in the same or lower version than the Wazuh manager.
    This step is not necessary if the packages are set to a ``hold`` state:

    .. code-block:: console

      # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
      # apt-get update

  .. group-tab:: ZYpp

    If the Wazuh repository is disabled it is necessary to enable it to get the latest package:

    .. code-block:: console

      # sed -i "s/^enabled=0/enabled=1/" /etc/zypp/repos.d/wazuh.repo

    Upgrade the Wazuh agent to the latest version:

    .. code-block:: console

      # zypper update wazuh-agent

    It is recommended to disable the Wazuh repository in order to avoid undesired upgrades and compatibility issues as the Wazuh agent should always be in the same or lower version than the Wazuh manager:

    .. code-block:: console

      # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo

  .. group-tab:: Windows

    The Wazuh agent upgrading process for Windows systems requires to download the latest installer from the :ref:`packages list <packages>`. There are two ways of using the installer, both of them require ``administrator rights``:

    - Using the GUI installer:

      Open the installer and follow the instructions to upgrade the Wazuh agent:

        .. image:: ../images/installation/windows.png
          :align: center


    - Using the command line:

      To upgrade the Wazuh agent from the command line, run the installer using Windows PowerShell or the command prompt. The ``/q`` argument is used for unattended installations:

      .. code-block:: console

        # wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q

      .. note::

        To learn more about the unattended installation process, please read :ref:`Windows installation <wazuh_agent_package_windows>` guide.

  .. group-tab:: MacOS X

      On MacOS X system the Wazuh agent upgrade can be done by deleting the previous version and installing the newest version of the Wazuh agent from scratch. As the Wazuh agent's ``ossec.conf`` configuration file will be overwritten, it is recommended to backup the old configuration file and import previous settings where needed.

      More information about the process can be found in the :ref:`Wazuh agent installation and deployment on MacOS X <wazuh_agent_package_macos>` section.

  .. group-tab:: Unix based systems

      On the Unix based systems the Wazuh agent upgrade can be done by deleting the previous version and installing the newest version of the Wazuh agent from scratch. As the Wazuh agent's ``ossec.conf`` configuration file will be overwritten, it is recommended to backup the old configuration file and import previous settings where needed.

      More information about the process can be found following the appropriate link for the desired operating system:

      - :ref:`Wazuh agent installation and deployment on AIX <wazuh_agent_package_aix>`.

      - :ref:`Wazuh agent installation on HP-UX <wazuh_agent_package_hpux>`.

      - :ref:`Wazuh agent installation on Solaris <wazuh_agent_solaris>`.
