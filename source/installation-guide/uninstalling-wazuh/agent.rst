.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to uninstall the Wazuh agent.

Uninstalling the Wazuh agent
============================

This section describes how to uninstall Wazuh agents installed across the different operating systems below:

-  :ref:`Linux <uninstalling_linux_agent>`
-  :ref:`Windows <uninstalling_windows_agent>`
-  :ref:`macOS <uninstalling_macos_agent>`

.. _uninstalling_linux_agent:

Uninstalling a Linux Wazuh agent
--------------------------------

.. note::

   To uninstall Wazuh agent from a Linux endpoint with the anti-tampering feature enabled, refer to :ref:`uninstalling_an_agent_with_anti_tampering_enabled`.

Run the following commands to uninstall a Linux agent.


#. Remove the Wazuh agent installation.

   .. tabs::

      .. group-tab:: APT

         .. include:: /_templates/installations/wazuh/deb/uninstall_wazuh_agent.rst

      .. group-tab:: Yum

         .. include:: /_templates/installations/wazuh/yum/uninstall_wazuh_agent.rst

      .. group-tab:: DNF

         .. include:: /_templates/installations/wazuh/dnf/uninstall_wazuh_agent.rst

      .. group-tab:: ZYpp

         .. include:: /_templates/installations/wazuh/zypp/uninstall_wazuh_agent.rst

#. Disable the Wazuh agent service.

   .. include:: ../../_templates/installations/wazuh/common/disable_wazuh_agent_service.rst

The Wazuh agent is now completely removed from your Linux endpoint.

.. _uninstalling_windows_agent:

Uninstalling a Windows Wazuh agent
----------------------------------

To uninstall the agent, the original Windows installer file is required to perform the unattended process:

  .. code-block:: none

      msiexec.exe /x wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi /qn

The Wazuh agent is now completely removed from your Windows endpoint.

.. _uninstalling_macos_agent:

Uninstalling a macOS Wazuh agent
--------------------------------

Follow these steps to uninstall the Wazuh agent from your macOS endpoint.

#. Stop the Wazuh agent service.

    .. code-block:: console

      # launchctl bootout system /Library/LaunchDaemons/com.wazuh.agent.plist

#. Remove the ``/Library/Ossec/`` folder.

    .. code-block:: console

      # /bin/rm -r /Library/Ossec

#. Remove ``launchdaemons`` and ``StartupItems``.

    .. code-block:: console

      # /bin/rm -f /Library/LaunchDaemons/com.wazuh.agent.plist
      # /bin/rm -rf /Library/StartupItems/WAZUH

#. Remove the Wazuh user and group.

    .. code-block:: console

      # /usr/bin/dscl . -delete "/Users/wazuh"
      # /usr/bin/dscl . -delete "/Groups/wazuh"

#. Remove from ``pkgutil``.

    .. code-block:: console

      # /usr/sbin/pkgutil --forget com.wazuh.pkg.wazuh-agent

The Wazuh agent is now completely removed from your macOS endpoint.
