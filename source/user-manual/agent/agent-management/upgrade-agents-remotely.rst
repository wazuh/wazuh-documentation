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

#. Download the corresponding WPK package on the Wazuh manager. This example uses the Linux AMD64 WPK package. We recommend that you download the WPK file to ``/var/wazuh-manager/tmp/``:

   .. code-block:: console

      # wget -P /var/wazuh-manager/tmp/ https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/wpk/linux/deb/amd64/wazuh_agent_v|WAZUH_CURRENT|_linux_amd64.deb.wpk

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      --2026-06-02 13:39:20--  https://packages-staging.xdrsiem.wazuh.info/pre-release/5.x/wpk/linux/deb/amd64/wazuh_agent_v5.0.0_linux_amd64.deb.wpk
      Resolving packages-staging.xdrsiem.wazuh.info (packages-staging.xdrsiem.wazuh.info)... 3.162.125.88, 3.162.125.62, 3.162.125.83, ...
      Connecting to packages-staging.xdrsiem.wazuh.info (packages-staging.xdrsiem.wazuh.info)|3.162.125.88|:443... connected.
      HTTP request sent, awaiting response... 200 OK
      Length: 14004881 (13M) [binary/octet-stream]
      Saving to: '/var/wazuh-manager/tmp/wazuh_agent_v5.0.0_linux_amd64.deb.wpk.1'
      wazuh_agent_v5.0.0_linux_amd64 100%[==================================================>]  13.36M  21.3MB/s    in 0.6s
      2026-06-02 13:39:21 (21.3 MB/s) - '/var/wazuh-manager/tmp/wazuh_agent_v5.0.0_linux_amd64.deb.wpk.1' saved [14004881/14004881]

#. Run the ``agent_upgrade`` tool and specify the agent ID of the Wazuh agent you want to upgrade. This example upgrades agent ``002`` which has Wazuh agent 4.14.5 installed.

   .. code-block:: console

      # /var/wazuh-manager/bin/agent_upgrade -a 002 -f /var/wazuh-manager/tmp/wazuh_agent_v|WAZUH_CURRENT|_linux_amd64.deb.wpk

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      Upgrading...

      Upgraded agents:
              Agent 002 upgraded: v4.14.5 -> v5.0.0

   It is possible to specify multiple agent IDs using this method:

   .. code-block:: console

      # /var/wazuh-manager/bin/agent_upgrade -a 002 003

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      Upgrading...

      Upgraded agents:
              Agent 002 upgraded: v4.14.5 -> v5.0.0
              Agent 003 upgraded: v4.14.5 -> v5.0.0

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
      WAZUH_REVISION="beta3"
      WAZUH_TYPE="agent"
