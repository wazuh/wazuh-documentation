.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn more about how to successfully install the Wazuh agent on Windows systems in this section of our Installation Guide.

Deploying Wazuh agents on Windows endpoints
===========================================

The Wazuh agent runs on the endpoint you want to monitor and communicates with the Wazuh manager, sending data in near real-time through an encrypted and authenticated channel. You can deploy the Wazuh agent on Windows 10 and 11, and Windows Server 2008 R2, 2012 R2, 2016, 2019, 2022, and 2025.

.. note:: You must have administrator privileges to perform the installation.

#. Download the `Windows installer <https://packages-staging.xdrsiem.wazuh.info/pre-release/5.x/windows/wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi>`_  to start the installation process.

#. Select the installation method you want to follow: Command Line Interface (CLI) or Graphical User Interface (GUI).

   .. tabs::

      .. group-tab:: CLI

         #. Choose one of the command shell alternatives to deploy the Wazuh agent on your endpoint. Ensure the downloaded Wazuh agent installation file is in your working directory and run the following command.

            -  Using CMD:

               .. code-block:: doscon

                  > start /wait wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_ENROLLMENT_TOKEN="<ENROLLMENT_TOKEN>" WAZUH_AGENT_NAME="<AGENT_NAME>"

            -  Using PowerShell:

               .. code-block:: ps1con

                  > Start-Process -FilePath ".\wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi" -ArgumentList '/q WAZUH_ENROLLMENT_TOKEN="<ENROLLMENT_TOKEN>" WAZUH_AGENT_NAME="<AGENT_NAME>"' -Wait

            Replace

            -  ``WAZUH_ENROLLMENT_TOKEN`` value with the enrollment token generated in :ref:`generate the enrollment token <generate_enrollment_token>`.
            -  ``WAZUH_AGENT_NAME`` value with the agent's name for identification in the Wazuh manager.

         #. Start the Wazuh agent from the GUI or by running:

            -  Using CMD:

               .. code-block:: doscon

                  > NET START WazuhSvc

            -  Using PowerShell:

               .. code-block:: ps1con

                  > Start-Service wazuhsvc

            The installation process is now complete and the Wazuh agent is successfully installed and configured.

      .. group-tab:: GUI

         #. Run the Windows installer and follow the steps in the installation wizard to deploy the Wazuh agent on your endpoint. If you are not sure how to answer some of the prompts, use the default answers. Once installed, the Wazuh agent uses a GUI for configuration, opening the log file, and starting or stopping the service.

            .. thumbnail:: ../../images/installation/windows-agent.png
               :align: center
               :width: 100%
               :title: Windows agent manager
               :alt: Windows agent manager

         #. Go to **Manage** > **Enroll** and paste the enrollment token from :ref:`generate the enrollment token <generate_enrollment_token>`.

         The installation process is now complete and the Wazuh agent is successfully installed on your Windows endpoint.

By default, all agent files are stored in ``C:\Program Files (x86)\ossec-agent`` after the installation.
