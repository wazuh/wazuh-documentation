.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to uninstall the Wazuh agent.

Uninstalling the Wazuh agent
============================

This section describes how to uninstall Wazuh agents installed across the different operating systems below:

-  :ref:`Linux <uninstalling_linux_agent>`
-  :ref:`Windows <uninstalling_windows_agent>`
-  :ref:`macOS <uninstalling_macos_agent>`

.. note::

   To reinstall a Wazuh agent under the same name, first remove the agent from the Wazuh manager, or set a new ``WAZUH_AGENT_NAME`` when you reinstall. Otherwise, the Wazuh manager refuses the enrollment with "Duplicate name" until the old entry ages out.

.. _uninstalling_linux_agent:

Uninstalling a Linux Wazuh agent
--------------------------------

Run the following commands to uninstall a Linux agent.

.. note::

   If anti-tampering is enabled on the agent, the package manager stops the removal with ``ERROR: Validation host not provided. Uninstallation cannot be continued.`` Set up the validation first, as :ref:`Uninstalling an agent with anti-tampering enabled <uninstalling_an_agent_with_anti_tampering_enabled>` describes, and then follow these steps.

#. Disable the Wazuh agent service. To find the endpoint's service manager, run ``ps -p 1 -o comm=``. If it prints ``systemd``, use the **Systemd** tab. On a systemd host, the SysV commands either fail or silently do nothing.

   .. include:: ../../_templates/installations/wazuh/common/disable_wazuh_agent_service.rst

#. Remove the Wazuh agent installation:

   .. tabs::

      .. group-tab:: APT

         .. include:: /_templates/installations/wazuh/deb/uninstall_wazuh_agent.rst

      .. group-tab:: Yum

         .. include:: /_templates/installations/wazuh/yum/uninstall_wazuh_agent.rst

      .. group-tab:: DNF

         .. include:: /_templates/installations/wazuh/dnf/uninstall_wazuh_agent.rst

      .. group-tab:: ZYpp

         .. include:: /_templates/installations/wazuh/zypp/uninstall_wazuh_agent.rst

The Wazuh agent is now completely removed from your Linux endpoint.

.. _uninstalling_windows_agent:

Uninstalling a Windows Wazuh agent
----------------------------------

Follow these steps in an elevated session to uninstall the Wazuh agent from your Windows endpoint. Replace ``<MSI_PATH>`` with the path to the Windows installer that installed or last upgraded the Wazuh agent.

#. Remove the Wazuh agent installation:

   -  Using CMD:

      .. code-block:: doscon

         > start /wait msiexec.exe /x "<MSI_PATH>" /qn

   -  Using PowerShell:

      .. code-block:: ps1con

         > Start-Process msiexec.exe -ArgumentList '/x "<MSI_PATH>" /qn' -Wait

#. Remove the Wazuh agent installation folder. After the removal, the folder still holds the agent key in ``client.keys.save``.

   -  Using CMD:

      .. code-block:: doscon

         > rmdir /s /q "C:\Program Files (x86)\ossec-agent"

   -  Using PowerShell:

      .. code-block:: ps1con

         > Remove-Item -Path "C:\Program Files (x86)\ossec-agent" -Recurse -Force

The Wazuh agent is now completely removed from your Windows endpoint.

.. _uninstalling_macos_agent:

Uninstalling a macOS Wazuh agent
--------------------------------

Follow these steps to uninstall the Wazuh agent from your macOS endpoint.

#. Stop the Wazuh agent service:

   .. code-block:: console

      # sudo launchctl bootout system /Library/LaunchDaemons/com.wazuh.agent.plist

#. Remove the ``/Library/Ossec/`` folder:

   .. code-block:: console

      # sudo /bin/rm -r /Library/Ossec

#. Remove the launch daemon and the startup items:

   .. code-block:: console

      # sudo /bin/rm -f /Library/LaunchDaemons/com.wazuh.agent.plist
      # sudo /bin/rm -rf /Library/StartupItems/WAZUH

#. Remove the Wazuh user and group:

   .. code-block:: console

      # sudo /usr/bin/dscl . -delete "/Users/wazuh"
      # sudo /usr/bin/dscl . -delete "/Groups/wazuh"

#. Remove the package receipts from ``pkgutil``:

   .. code-block:: console

      # sudo /usr/sbin/pkgutil --forget com.wazuh.pkg.wazuh-agent
      # sudo /usr/sbin/pkgutil --forget com.wazuh.pkg.wazuh-agent-etc

   If the second command prints a "No receipt" error, you can ignore it.

#. Check that no Wazuh receipt remains. The following command prints nothing:

   .. code-block:: console

      # pkgutil --pkgs | grep -i wazuh

The Wazuh agent is now completely removed from your macOS endpoint.
