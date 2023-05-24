.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to successfully install the Wazuh agent on macOS systems in this section of our Installation Guide.

.. _wazuh_agent_package_macos:

Installing Wazuh agents on macOS endpoints
==========================================

The agent runs on the endpoint you want to monitor and communicates with the Wazuh server, sending data in near real-time through an encrypted and authenticated.

.. note:: You need root user privileges to run all the commands described below.

#. To start the installation process, download the `Wazuh agent for macOS <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_OSX|/macos/wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.pkg>`_. The package is suitable for macOS Sierra or later. 

#. Select the installation method you want to follow: command line interface (CLI) or graphical user interface (GUI).

        .. tabs::
    
          .. group-tab:: CLI
    
             #. To deploy the Wazuh agent on your endpoint, edit the ``WAZUH_MANAGER`` variable to contain your Wazuh manager IP address or hostname and run the following command. 

                .. code-block:: console
    
                  # echo "WAZUH_MANAGER='10.0.0.2'" > /tmp/wazuh_envs && installer -pkg wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.pkg -target /
    
                .. note:: For version 4.4.2 and earlier, run the following command instead. Replace ``<WAZUH.VERSION-REV>`` with your package version, such as ``4.4.2-1``.
                   :class: not-long

                   .. code-block:: console
    
                      # launchctl setenv WAZUH_MANAGER "10.0.0.2" && installer -pkg wazuh-agent-<WAZUH.VERSION-REV>.pkg -target /

                For additional deployment options such as agent name, agent group, and registration password, see the :doc:`Deployment variables for macOS </user-manual/deployment-variables/deployment-variables-macos>` section.
                
                .. note:: Alternatively, if you want to install an agent without registering it, omit the deployment variables. To learn more about the different registration methods, see the :doc:`Wazuh agent enrollment </user-manual/agent-enrollment/index>` section.

             #. To complete the installation process, start the Wazuh agent.
    
                .. code-block:: console
    
                  # /Library/Ossec/bin/wazuh-control start


            The installation process is now complete, and the Wazuh agent is successfully deployed and running on your macOS endpoint.

            
          .. group-tab:: GUI

             #. To install the Wazuh agent on your system, run the downloaded file and follow the steps in the installation wizard. If you are not sure how to answer some of the prompts, use the default answers.

                .. thumbnail:: ../../images/installation/macos.png
                   :align: center
                   
             #. To complete the installation process, start the Wazuh agent.
    
                .. code-block:: console
    
                  # sudo /Library/Ossec/bin/wazuh-control start
 
            The installation process is now complete, and the Wazuh agent is successfully installed on your macOS endpoint. The next step is to register and configure the agent to communicate with the Wazuh server. To perform this action, see the :doc:`Wazuh agent enrollment </user-manual/agent-enrollment/index>` section.  

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

#. Remove the Wazuh user and group.

    .. code-block:: console

      # /usr/bin/dscl . -delete "/Users/wazuh"
      # /usr/bin/dscl . -delete "/Groups/wazuh"

#. Remove from ``pkgutil``.

    .. code-block:: console

      # /usr/sbin/pkgutil --forget com.wazuh.pkg.wazuh-agent

The Wazuh agent is now completely removed from your macOS endpoint.
