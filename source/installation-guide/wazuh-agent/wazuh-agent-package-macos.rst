.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to successfully install the Wazuh agent on macOS systems in this section of our Installation Guide.

Installing Wazuh agents on macOS endpoints
==========================================

The agent runs on the endpoint you want to monitor and communicates with the Wazuh server, sending data in near real-time through an encrypted and authenticated.

.. note:: You need root user privileges to run all the commands described below.

.. |macOS_intel_64| replace:: `wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.intel64.pkg <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_OSX|/macos/wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.intel64.pkg>`__
.. |macOS_arm64| replace:: `wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.arm64.pkg <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_OSX|/macos/wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.arm64.pkg>`__


#. To start the installation process, download the Wazuh agent according to your architecture:

   - **Intel**: |macOS_intel_64|. Suitable for macOS Sierra and later.

   - **Apple silicon**: |macOS_arm64|. Suitable for macOS Big Sur and later.

#. Select the installation method you want to follow: Command line interface (CLI) or graphical user interface (GUI).

   .. tabs::

      .. group-tab:: CLI
      
         #. To deploy the Wazuh agent on your endpoint, choose your architecture, edit the ``WAZUH_MANAGER`` variable to contain your Wazuh manager IP address or hostname, and run the following command. 

            .. tabs::
            
               .. group-tab:: Intel

                  .. code-block:: console
                  
                     # echo "WAZUH_MANAGER='10.0.0.2'" > /tmp/wazuh_envs && installer -pkg wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.intel64.pkg -target /
   

               .. group-tab:: Apple silicon

                  .. versionadded:: 4.5.1

                  .. code-block:: console
                  
                     # echo "WAZUH_MANAGER='10.0.0.2'" > /tmp/wazuh_envs && installer -pkg wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.arm64.pkg -target /


               For additional deployment options such as agent name, agent group, and registration password, see the :doc:`Deployment variables for macOS </user-manual/agent/agent-enrollment/deployment-variables/deployment-variables-macos>` section.
               
               .. note:: Alternatively, if you want to install an agent without registering it, omit the deployment variables. To learn more about the different registration methods, see the :doc:`Wazuh agent enrollment </user-manual/agent/agent-enrollment/index>` section.

         #. To complete the installation process, start the Wazuh agent.

            .. code-block:: console

               # launchctl load /Library/LaunchDaemons/com.wazuh.agent.plist


         The installation process is now complete, and the Wazuh agent is successfully deployed and running on your macOS endpoint.

      
      .. group-tab:: GUI

         #. To install the Wazuh agent on your system, run the downloaded file and follow the steps in the installation wizard. If you are not sure how to answer some of the prompts, use the default answers.

            .. thumbnail:: ../../images/installation/macos-agent.png
               :align: center
               :title: macOS agent installer
               :alt: macOS agent installer
               
         #. To complete the installation process, start the Wazuh agent.

            .. code-block:: console

               # launchctl load /Library/LaunchDaemons/com.wazuh.agent.plist

         The installation process is now complete, and the Wazuh agent is successfully installed on your macOS endpoint. The next step is to register and configure the agent to communicate with the Wazuh server. To perform this action, see the :doc:`Wazuh agent enrollment </user-manual/agent/agent-enrollment/index>` section.  

By default, all agent files are stored in ``/Library/Ossec/`` after the installation.
