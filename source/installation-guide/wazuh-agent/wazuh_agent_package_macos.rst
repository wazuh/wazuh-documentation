.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent on macOS

.. _wazuh_agent_package_macos:

macOS
=====

The package for macOS is suitable for macOS Sierra or greater. The macOS agent can be downloaded from :ref:`packages list<packages>` or directly from `here <https://packages.wazuh.com/|CURRENT_MAJOR|/macos/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_OSX|.pkg>`_. You can install it using the command line or following the GUI steps:

  a) Using the command line, you can choose between installation or deployment:

    * Installation:

      .. code-block:: console

        # installer -pkg wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_OSX|.pkg -target /

    * Deployment:

      You can automate the agent registration and configuration using variables. It is necessary to define at least the variable ``WAZUH_MANAGER``. The agent will use this value to register and this will be the assigned manager for forwarding events.

      .. code-block:: console

        # launchctl setenv WAZUH_MANAGER "10.0.0.2" && installer -pkg wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_OSX|.pkg -target /

      See the following document for additional automated deployment options :ref:`deployment variables <deployment_variables_macos>`.

  b) Using the GUI:


     Using the GUI you can perform a simple installation without registering and configuring the agent. Double click on the downloaded file and follow the wizard. If you are not sure how to answer some of the prompts, simply use the default answers.

     .. thumbnail:: ../../images/installation/macos.png
         :align: center

By default, all agent files can be found at the following location: ``/Library/Ossec/``.

Now that the agent is installed, if you did not use the deployment method, you will have to register and configure the agent to communicate with the manager. For more information about this process, please visit :ref:`user manual<register_agents>`.

Finally, start the Wazuh agent:

  .. code-block:: console

    # sudo /Library/Ossec/bin/wazuh-control start


Uninstall
---------

To uninstall the agent in macOS:

#. Stop the Wazuh agent service

    .. code-block:: console

      # /Library/Ossec/bin/wazuh-control stop

#. Remove the ``/Library/Ossec/`` folder

    .. code-block:: console

      # /bin/rm -r /Library/Ossec

#. Stop and unload dispatcher

    .. code-block:: console

      # /bin/launchctl unload /Library/LaunchDaemons/com.wazuh.agent.plist

#. Remove ``launchdaemons`` and ``StartupItems``

    .. code-block:: console

      # /bin/rm -f /Library/LaunchDaemons/com.wazuh.agent.plist
      # /bin/rm -rf /Library/StartupItems/WAZUH

#. Remove User and Groups

    .. code-block:: console

      # /usr/bin/dscl . -delete "/Users/wazuh"
      # /usr/bin/dscl . -delete "/Groups/wazuh"

#. Remove from ``pkgutil``

    .. code-block:: console

      # /usr/sbin/pkgutil --forget com.wazuh.pkg.wazuh-agent
