.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to successfully install the Wazuh agent on macOS systems in this section of our Installation Guide.

.. _wazuh_agent_package_macos:


Installing Wazuh agents on macOS systems
========================================

The agent runs on the host you want to monitor and communicates with the Wazuh manager, sending data in near real time through an encrypted and authenticated channel.

#. To start the installation process, download the `Wazuh agent for macOS <https://packages.wazuh.com/|CURRENT_MAJOR|/macos/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_OSX|.pkg>`_. The package is suitable for macOS Sierra or later. 

#. Select the installation method you want to follow: command line interface (CLI) or graphical user interface (GUI).

        .. tabs::
    
          .. group-tab:: CLI
    
             #. To deploy the Wazuh agent to your system, edit the ``WAZUH_MANAGER`` variable to contain your Wazuh manager IP address or hostname and run the following command. 

                .. code-block:: console
    
                  # launchctl setenv WAZUH_MANAGER "10.0.0.2" && installer -pkg wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_OSX|.pkg -target /
    
                For additional deployment options such as agent name, agent group, and registration password, see the :ref:`Deployment variables for macOS <deployment_variables_macos>` section.
                
                .. note:: Alternatively, if you want to install an agent without registering it, omit the deployment variables. To learn more about the different registration methods, see the :ref:`Wazuh agent enrollment <agent_enrollment>` section.

             #. To complete the installation process, start the Wazuh agent.
    
                .. code-block:: console
    
                  # sudo /Library/Ossec/bin/wazuh-control start


            The installation process is now complete and the Wazuh agent is successfully installed, registered, and configured, running on your macOS system.

            
          .. group-tab:: GUI

             #. To install the Wazuh agent on your system, run the downloaded file and follow the steps in the installation wizard. If you are not sure how to answer some of the prompts, use the default answers.

                .. thumbnail:: ../../images/installation/macos.png
                   :align: center
                   
             #. To complete the installation process, start the Wazuh agent.
    
                .. code-block:: console
    
                  # sudo /Library/Ossec/bin/wazuh-control start
 
            The installation process is now complete and the Wazuh agent is successfully installed on your macOS system. The next step is to register and configure the agent to communicate with the Wazuh manager. To perform this action, see the :ref:`Wazuh agent enrollment <agent_enrollment>` section. 

By default, all agent files are stored in ``/Library/Ossec/`` after the installation.
    

Uninstall a Wazuh agent
-----------------------

To uninstall the agent, follow these steps: 

#. Stop the Wazuh agent service.

    .. code-block:: console

      # /Library/Ossec/bin/wazuh-control stop

#. Remove the ``/Library/Ossec/`` folder.

    .. code-block:: console

      # /bin/rm -r /Library/Ossec

#. Stop and unload dispatcher.

    .. code-block:: console

      # /bin/launchctl unload /Library/LaunchDaemons/com.wazuh.agent.plist

#. Remove ``launchdaemons`` and ``StartupItems``.

    .. code-block:: console

      # /bin/rm -f /Library/LaunchDaemons/com.wazuh.agent.plist
      # /bin/rm -rf /Library/StartupItems/WAZUH

#. Remove User and Groups.

    .. code-block:: console

      # /usr/bin/dscl . -delete "/Users/wazuh"
      # /usr/bin/dscl . -delete "/Groups/wazuh"

#. Remove from ``pkgutil``.

    .. code-block:: console

      # /usr/sbin/pkgutil --forget com.wazuh.pkg.wazuh-agent

The Wazuh agent is now completely removed from your macOS system.




