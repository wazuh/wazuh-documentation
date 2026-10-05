.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: You can upgrade Wazuh agents remotely from the Wazuh manager. Learn about the available WPK files and how to upgrade agents using a WPK file.

.. _upgrade_agents_remotely:

Upgrade agents remotely
=======================

You can upgrade Wazuh agents remotely from the Wazuh manager. The Wazuh manager sends a Wazuh signed package (WPK) file to each enrolled agent. The WPK file contains the files required to upgrade the Wazuh agent to the selected version. This streamlines the upgrade process across your installation and eliminates the need to access each agent individually.

WPK files are archive files used for distributing and installing updates or new versions of the Wazuh agent on various operating systems. Wazuh provides access to an updated WPK repository for each new release. The following tables list the available WPK files.

WPK List
--------

.. |WAZUH_CUR_VER| replace:: |WAZUH_CURRENT|
.. |WAZUH_CUR_WIN| replace:: |WAZUH_CURRENT_WINDOWS|
.. |WAZUH_CUR_OSX| replace:: |WAZUH_CURRENT_OSX|
.. |WPK_Linux_DEB_AMD64| replace:: `wazuh_agent_v|WAZUH_CURRENT|_linux_amd64.deb.wpk <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/wpk/linux/deb/amd64/wazuh_agent_v|WAZUH_CURRENT|_linux_amd64.deb.wpk>`__
.. |WPK_Linux_DEB_ARM64| replace:: `wazuh_agent_v|WAZUH_CURRENT|_linux_arm64.deb.wpk <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/wpk/linux/deb/arm64/wazuh_agent_v|WAZUH_CURRENT|_linux_arm64.deb.wpk>`__
.. |WPK_Linux_RPM_X86_64| replace:: `wazuh_agent_v|WAZUH_CURRENT|_linux_x86_64.rpm.wpk <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/wpk/linux/rpm/x86_64/wazuh_agent_v|WAZUH_CURRENT|_linux_x86_64.rpm.wpk>`__
.. |WPK_Linux_RPM_AARCH64| replace:: `wazuh_agent_v|WAZUH_CURRENT|_linux_aarch64.rpm.wpk <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/wpk/linux/rpm/aarch64/wazuh_agent_v|WAZUH_CURRENT|_linux_aarch64.rpm.wpk>`__
.. |WPK_Windows| replace:: `wazuh_agent_v|WAZUH_CURRENT_WINDOWS|_windows.wpk <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR_WINDOWS|/wpk/windows/wazuh_agent_v|WAZUH_CURRENT_WINDOWS|_windows.wpk>`__
.. |WPK_macOS_Intel| replace:: `wazuh_agent_v|WAZUH_CURRENT_OSX|_macos_intel64.pkg.wpk <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR_OSX|/wpk/macos/pkg/intel64/wazuh_agent_v|WAZUH_CURRENT_OSX|_macos_intel64.pkg.wpk>`__
.. |WPK_macOS_ARM64| replace:: `wazuh_agent_v|WAZUH_CURRENT_OSX|_macos_arm64.pkg.wpk <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR_OSX|/wpk/macos/pkg/arm64/wazuh_agent_v|WAZUH_CURRENT_OSX|_macos_arm64.pkg.wpk>`__

Linux
^^^^^

+--------------+-----------------+--------------+------------------------+
| Distribution | Version         | Architecture | WPK Package            |
+==============+=================+==============+========================+
| Linux (deb)  | |WAZUH_CUR_VER| | x86_64/AMD64 | |WPK_Linux_DEB_AMD64|  |
+--------------+-----------------+--------------+------------------------+
| Linux (deb)  | |WAZUH_CUR_VER| | ARM64        | |WPK_Linux_DEB_ARM64|  |
+--------------+-----------------+--------------+------------------------+
| Linux (rpm)  | |WAZUH_CUR_VER| | x86_64/AMD64 | |WPK_Linux_RPM_X86_64| |
+--------------+-----------------+--------------+------------------------+
| Linux (rpm)  | |WAZUH_CUR_VER| | ARM64        | |WPK_Linux_RPM_AARCH64||
+--------------+-----------------+--------------+------------------------+

Windows
^^^^^^^

+--------------+-----------------+--------------+-----------------+
| Distribution | Version         | Architecture | WPK Package     |
+==============+=================+==============+=================+
| Windows      | |WAZUH_CUR_WIN| | 32/64bit     | |WPK_Windows|   |
+--------------+-----------------+--------------+-----------------+

macOS
^^^^^

+--------------+-----------------+--------------+--------------------+
| Distribution | Version         | Architecture | WPK Package        |
+==============+=================+==============+====================+
| macOS        | |WAZUH_CUR_OSX| | Intel 64     | |WPK_macOS_Intel|  |
+--------------+-----------------+--------------+--------------------+
| macOS        | |WAZUH_CUR_OSX| | ARM64        | |WPK_macOS_ARM64|  |
+--------------+-----------------+--------------+--------------------+

.. note::

   Direct upgrades to Wazuh agent |WAZUH_CURRENT| are not supported from Wazuh agent 4.14.0 or earlier. Upgrade the Wazuh agent in this order: 4.14.0 or earlier > 4.14.x > |WAZUH_CURRENT|.

Upgrade the Wazuh agent using a WPK file
-----------------------------------------

Follow these steps to upgrade a Wazuh agent using a WPK file:

#. Download the WPK package that matches the operating system and architecture of the Wazuh agent to the ``/var/wazuh-manager/var/upgrade/`` directory on the Wazuh manager. This example uses the Linux AMD64 WPK package:

   .. code-block:: console

      # wget -P /var/wazuh-manager/var/upgrade/ https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/wpk/linux/deb/amd64/wazuh_agent_v|WAZUH_CURRENT|_linux_amd64.deb.wpk

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      --2026-10-05 08:56:09--  https://packages-staging.xdrsiem.wazuh.info/pre-release/5.x/wpk/linux/deb/amd64/wazuh_agent_v5.0.0_linux_amd64.deb.wpk
      Resolving packages-staging.xdrsiem.wazuh.info (packages-staging.xdrsiem.wazuh.info)... 13.249.228.114, 13.249.228.54, 13.249.228.126, ...
      Connecting to packages-staging.xdrsiem.wazuh.info (packages-staging.xdrsiem.wazuh.info)|13.249.228.114|:443... connected.
      HTTP request sent, awaiting response... 200 OK
      Length: 14473792 (14M) [binary/octet-stream]
      Saving to: '/var/wazuh-manager/var/upgrade/wazuh_agent_v5.0.0_linux_amd64.deb.wpk'
      2026-10-05 08:56:11 (9.58 MB/s) - '/var/wazuh-manager/var/upgrade/wazuh_agent_v5.0.0_linux_amd64.deb.wpk' saved [14473792/14473792]

   .. note::

      In a multi-node Wazuh manager cluster, the WPK file must exist in ``/var/wazuh-manager/var/upgrade/`` on every Wazuh manager node.

#. Run the ``agent_upgrade`` tool and specify the agent ID of the Wazuh agent you want to upgrade. Pass the WPK file name with the ``-f`` option. This example upgrades agent ``002`` which has Wazuh agent 4.14.5 installed.

   .. code-block:: console

      # /var/wazuh-manager/bin/agent_upgrade -a 002 -f wazuh_agent_v|WAZUH_CURRENT|_linux_amd64.deb.wpk

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      Upgrade tasks created for 1 agent(s).
      Note: Agents will execute upgrades autonomously. Use agent logs to track progress.

   It is possible to specify multiple agent IDs using this method:

   .. code-block:: console

      # /var/wazuh-manager/bin/agent_upgrade -a 002 003 -f wazuh_agent_v|WAZUH_CURRENT|_linux_amd64.deb.wpk

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      Upgrade tasks created for 2 agent(s).
      Note: Agents will execute upgrades autonomously. Use agent logs to track progress.

   The Wazuh manager does not wait for the result. To follow the upgrade, check the ``/var/ossec/logs/upgrade.log`` file on the Wazuh agent.

#. Verify the Wazuh agent version from the Wazuh dashboard.

   .. thumbnail:: /images/manual/agent/agent-version-dashboard.png
      :title: Verify Wazuh agent version from the Wazuh dashboard
      :alt: Wazuh dashboard showing the Wazuh agent version
      :align: center
      :width: 80%

#. Verify the version from the Wazuh agent endpoint:

   .. code-block:: console

      # /var/ossec/bin/wazuh-control info

   The command output looks similar to this:

   .. code-block:: none
      :class: output
      :emphasize-lines: 1

      WAZUH_VERSION="v5.0.0"
      WAZUH_REVISION="rc1"
      WAZUH_TYPE="agent"
