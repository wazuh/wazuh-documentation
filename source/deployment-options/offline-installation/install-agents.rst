.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install Wazuh agents on Linux, Windows, and macOS hosts without Internet access, using the agent package you download on a system with Internet access.

Install Wazuh agents on hosts without Internet access
=====================================================

The ``wazuh-offline.tar.gz`` file doesn't include the Wazuh agent. On the system with Internet access, download the Wazuh agent package for each endpoint from :doc:`Packages list </installation-guide/packages-list>`, and copy it to the endpoint. Create an enrollment token on the Wazuh manager, as :ref:`Generate the enrollment token <generate_enrollment_token>` describes. In the following commands, replace ``<ENROLLMENT_TOKEN>`` with the token and ``<AGENT_NAME>`` with a name that no other agent uses. Use the file name of the package you downloaded.

For the graphical installers, the deployment variables, and troubleshooting, see the :doc:`Linux </installation-guide/wazuh-agent/wazuh-agent-package-linux>`, :doc:`Windows </installation-guide/wazuh-agent/wazuh-agent-package-windows>`, and :doc:`macOS </installation-guide/wazuh-agent/wazuh-agent-package-macos>` agent pages.

Linux
-----

#. Install the package as root, from the directory that holds it:

   .. tabs::

      .. group-tab:: DEB

         .. code-block:: console

            # WAZUH_ENROLLMENT_TOKEN='<ENROLLMENT_TOKEN>' WAZUH_AGENT_NAME='<AGENT_NAME>' dpkg -i ./wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_x64_DEB|.deb

      .. group-tab:: RPM

         .. code-block:: console

            # WAZUH_ENROLLMENT_TOKEN='<ENROLLMENT_TOKEN>' WAZUH_AGENT_NAME='<AGENT_NAME>' rpm -ivh ./wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm

#. Enable and start the Wazuh agent:

   .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable --now wazuh-agent

Windows
-------

#. Run one of the following commands as an administrator, from the directory that holds the installer:

   .. tabs::

      .. group-tab:: CMD

         .. code-block:: doscon

            > start /wait wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_ENROLLMENT_TOKEN="<ENROLLMENT_TOKEN>" WAZUH_AGENT_NAME="<AGENT_NAME>"

      .. group-tab:: PowerShell

         .. code-block:: ps1con

            > Start-Process -FilePath ".\wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi" -ArgumentList '/q WAZUH_ENROLLMENT_TOKEN="<ENROLLMENT_TOKEN>" WAZUH_AGENT_NAME="<AGENT_NAME>"' -Wait

#. Start the Wazuh agent:

   .. tabs::

      .. group-tab:: CMD

         .. code-block:: doscon

            > NET START WazuhSvc

      .. group-tab:: PowerShell

         .. code-block:: ps1con

            > Start-Service wazuhsvc

macOS
-----

#. Run the command for your architecture as root, from the directory that holds the package. The command saves the token in ``/tmp/wazuh_envs``, and the installer deletes that file when it finishes.

   .. tabs::

      .. group-tab:: Intel

         .. code-block:: console

            # (umask 077 && echo "WAZUH_ENROLLMENT_TOKEN='<ENROLLMENT_TOKEN>'" > /tmp/wazuh_envs && echo "WAZUH_AGENT_NAME='<AGENT_NAME>'" >> /tmp/wazuh_envs) && installer -pkg wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.intel64.pkg -target /

      .. group-tab:: Apple Silicon

         .. code-block:: console

            # (umask 077 && echo "WAZUH_ENROLLMENT_TOKEN='<ENROLLMENT_TOKEN>'" > /tmp/wazuh_envs && echo "WAZUH_AGENT_NAME='<AGENT_NAME>'" >> /tmp/wazuh_envs) && installer -pkg wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.arm64.pkg -target /

#. Start the Wazuh agent:

   .. code-block:: console

      # launchctl bootstrap system /Library/LaunchDaemons/com.wazuh.agent.plist
