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

   After you uninstall a Wazuh agent, remove it from the Wazuh manager using the Wazuh dashboard or the Wazuh manager API, as :doc:`Remove agents </user-manual/agent/agent-management/remove-agents>` describes. This stops it from showing as disconnected, frees its name for reuse, and lets you reinstall it under the same name. Without this, or a new ``WAZUH_AGENT_NAME`` on reinstall, the manager refuses enrollment with "Duplicate name" until the old agent has been disconnected for one hour. Agents enrolled without ``WAZUH_AGENT_NAME``, and agents enrolled from the Windows GUI, use the host name.

   If no other agent will use the enrollment token, revoke it on the Wazuh manager master node with ``/var/wazuh-manager/bin/wazuh-manager-authd --revoke-enrollment-token <TOKEN_ID>``. To find the token ID, run ``/var/wazuh-manager/bin/wazuh-manager-authd --list-enrollment-tokens``.

To enroll an agent again instead of uninstalling it, see :ref:`Re-enrolling a Wazuh agent <reenrolling_wazuh_agent>`.

.. _uninstalling_linux_agent:

Uninstalling a Linux Wazuh agent
--------------------------------

Run the following commands to uninstall a Linux agent.

.. note::

   If anti-tampering is enabled on the agent, the package manager stops the removal with ``ERROR: Validation host not provided. Uninstallation cannot be continued.`` Set up the validation first, as :ref:`Uninstalling an agent with anti-tampering enabled <uninstalling_an_agent_with_anti_tampering_enabled>` describes, and then follow these steps.

#. Disable the Wazuh agent service. To find the endpoint's service manager, run ``ps -p 1 -o comm=``. If it prints ``systemd``, use the **Systemd** tab. On a systemd host, the SysV commands either fail or silently do nothing.

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl disable wazuh-agent
            # systemctl daemon-reload

      .. group-tab:: SysV Init

         Choose one option according to your operating system.

         #. RPM-based operating systems:

            .. code-block:: console

               # chkconfig wazuh-agent off
               # chkconfig --del wazuh-agent

         #. Debian-based operating systems:

            .. code-block:: console

               # update-rc.d -f wazuh-agent remove

      .. group-tab:: No service manager

         No action required.

#. Remove the Wazuh agent installation:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get remove wazuh-agent

         ``apt-get remove`` keeps the agent configuration, its key, and the re-enrollment secret in ``/var/ossec/etc/*.save``, the Wazuh manager CA in ``/var/ossec/etc/certs/root-ca.pem.save``, and the ``wazuh`` user. To remove them too, run the following command:

         .. code-block:: console

            # apt-get remove --purge wazuh-agent

      .. group-tab:: Yum

         .. code-block:: console

            # yum remove wazuh-agent

         The package manager leaves ``/var/ossec/`` behind. It holds the agent key (``etc/client.keys.rpmsave``), the re-enrollment secret (``etc/reenroll.secret``), and the Wazuh manager CA (``etc/certs/root-ca.pem``). Delete it:

         .. code-block:: console

            # rm -rf /var/ossec

      .. group-tab:: DNF

         .. code-block:: console

            # dnf remove wazuh-agent

         The package manager leaves ``/var/ossec/`` behind. It holds the agent key (``etc/client.keys.rpmsave``), the re-enrollment secret (``etc/reenroll.secret``), and the Wazuh manager CA (``etc/certs/root-ca.pem``). Delete it:

         .. code-block:: console

            # rm -rf /var/ossec

      .. group-tab:: ZYpp

         .. code-block:: console

            # zypper remove wazuh-agent

         The package manager leaves ``/var/ossec/`` behind. It holds the agent key (``etc/client.keys.rpmsave``), the re-enrollment secret (``etc/reenroll.secret``), and the Wazuh manager CA (``etc/certs/root-ca.pem``). Delete it:

         .. code-block:: console

            # rm -rf /var/ossec

#. Remove the Wazuh repository and its key:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # rm -f /etc/apt/sources.list.d/wazuh.list /usr/share/keyrings/wazuh.gpg /usr/share/keyrings/wazuh.gpg~
            # apt-get clean
            # apt-get update

      .. group-tab:: Yum

         .. code-block:: console

            # rm -f /etc/yum.repos.d/wazuh.repo
            # rpm -e gpg-pubkey-29111145
            # yum clean all

      .. group-tab:: DNF

         .. code-block:: console

            # rm -f /etc/yum.repos.d/wazuh.repo
            # rpm -e gpg-pubkey-29111145
            # dnf clean all

      .. group-tab:: ZYpp

         .. code-block:: console

            # rm -f /etc/zypp/repos.d/wazuh.repo
            # zypper clean
            # rpm -e gpg-pubkey-29111145

The Wazuh agent is now removed from your Linux endpoint. Remove it from the Wazuh manager too, as the note at the start of this section describes.

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

   If you no longer have the installer, uninstall **Wazuh Agent** from **Settings** > **Apps** > **Installed apps**, or run the **Uninstall** shortcut in the Start menu folder **OSSEC**, then continue with step 2. To check the removal, run ``Get-Service WazuhSvc``: it reports that no service was found.

#. Remove the Wazuh agent installation folder. After the removal, the folder still holds the agent key in ``client.keys.save``.

   -  Using CMD:

      .. code-block:: doscon

         > rmdir /s /q "C:\Program Files (x86)\ossec-agent"

   -  Using PowerShell:

      .. code-block:: ps1con

         > Remove-Item -Path "C:\Program Files (x86)\ossec-agent" -Recurse -Force

   If the command reports that the folder is in use, wait until ``Get-Process wazuh-agent -ErrorAction SilentlyContinue`` prints nothing, then run it again.

The Wazuh agent is now removed from your Windows endpoint.

Remove the agent from the Wazuh manager too, as the note at the start of this section describes.

.. _uninstalling_macos_agent:

Uninstalling a macOS Wazuh agent
--------------------------------

Follow these steps to uninstall the Wazuh agent from your macOS endpoint.

#. Stop the Wazuh agent service:

   .. code-block:: console

      # launchctl bootout system /Library/LaunchDaemons/com.wazuh.agent.plist

#. Remove the ``/Library/Ossec/`` folder:

   .. code-block:: console

      # /bin/rm -r /Library/Ossec

#. Remove the launch daemon and the startup items:

   .. code-block:: console

      # /bin/rm -f /Library/LaunchDaemons/com.wazuh.agent.plist
      # /bin/rm -rf /Library/StartupItems/WAZUH

#. Remove the Wazuh user and group:

   .. code-block:: console

      # /usr/bin/dscl . -delete "/Users/wazuh"
      # /usr/bin/dscl . -delete "/Groups/wazuh"

#. Remove the package receipts from ``pkgutil``:

   .. code-block:: console

      # /usr/sbin/pkgutil --forget com.wazuh.pkg.wazuh-agent
      # /usr/sbin/pkgutil --forget com.wazuh.pkg.wazuh-agent-etc

   If the second command prints a "No receipt" error, you can ignore it.

#. Check that no Wazuh receipt remains. The following command prints nothing:

   .. code-block:: console

      # pkgutil --pkgs | grep -i wazuh

The Wazuh agent is now removed from your macOS endpoint.

Remove the agent from the Wazuh manager too, as the note at the start of this section describes.
