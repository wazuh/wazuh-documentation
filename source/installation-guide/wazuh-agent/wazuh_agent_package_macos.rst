.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent on macOS.

.. _wazuh_agent_package_macos:


Installing Wazuh agents on macOS systems
========================================

The agent runs on the host you want to monitor and communicates with the Wazuh manager, sending data in near real time through an encrypted and authenticated channel. The installation of a Wazuh agent on a macOS system uses deployment variables that facilitate the task of installing, registering, and configuring the agent. Alternatively, if you want to download the Wazuh agent package directly or check the compatible versions, see the :ref:`packages list <packages>` section. 

#. Download the `Wazuh agent for macOS <https://packages.wazuh.com/|CURRENT_MAJOR|/macos/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_OSX|.pkg>`_. The package is suitable for macOS Sierra or greater. 

#. Select between command line or Graphical User Interface:

        .. tabs::
    
          .. group-tab:: Command line
    
             #. Define the variable ``WAZUH_MANAGER``. The agent will use this value to register and this will be the assigned manager for forwarding events. Deploy the Wazuh agent:

                .. code-block:: console
    
                  # launchctl setenv WAZUH_MANAGER "10.0.0.2" && installer -pkg wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_OSX|.pkg -target /
    
                For additional deployment options, like agent name, agent group, and registration password, see :ref:`Deployment variables for macOS <deployment_variables_macos>`.
    
             #. Start the Wazuh agent:
    
                .. code-block:: console
    
                  # sudo /Library/Ossec/bin/ossec-control start


             You now have an installed, registered and configured Wazuh agent reporting to the Wazuh manager.

            
          .. group-tab:: GUI

             #. Run the downloaded file and follow the wizard to install the Wazuh agent. If you are not sure how to answer some of the prompts, use the default answers.

                .. thumbnail:: ../../images/installation/macos.png
                   :align: center
                   
             #. Start the Wazuh agent:
    
                .. code-block:: console
    
                  # sudo /Library/Ossec/bin/ossec-control start
 
             You now have an installed Wazuh agent, the next step is to register and configure it to communicate with the Wazuh manager. See :ref:`Registering Wazuh agents <register_agents>`.     

By default, all agent files can be found at the following location: ``/Library/Ossec/``.
    

Uninstall a Wazuh agent
-----------------------

To uninstall the agent in macOS follow the next steps. 

#. Stop the Wazuh agent service:

    .. code-block:: console

      # /Library/Ossec/bin/ossec-control stop

#. Remove the ``/Library/Ossec/`` folder and ``ossec-init.conf`` file:

    .. code-block:: console

      # /bin/rm -r /Library/Ossec
      # /bin/rm /etc/ossec-init.conf

#. Stop and unload dispatcher:

    .. code-block:: console

      # /bin/launchctl unload /Library/LaunchDaemons/com.wazuh.agent.plist

#. Remove ``launchdaemons`` and ``StartupItems``:

    .. code-block:: console

      # /bin/rm -f /Library/LaunchDaemons/com.wazuh.agent.plist
      # /bin/rm -rf /Library/StartupItems/WAZUH

#. Remove User and Groups:

    .. code-block:: console

      # /usr/bin/dscl . -delete "/Users/ossec"
      # /usr/bin/dscl . -delete "/Groups/ossec"

#. Remove from ``pkgutil``:

    .. code-block:: console

      # /usr/sbin/pkgutil --forget com.wazuh.pkg.wazuh-agent






