.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent on macOS.

.. _wazuh_agent_package_macos:


Deploying Wazuh agents on macOS
===============================

Install, register and configure a Wazuh agent on macOS. The package is suitable for macOS Sierra or greater. 


#. Download the `Wazuh agent for macOS <https://packages.wazuh.com/|CURRENT_MAJOR|/macos/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_OSX|.pkg>`_. You can install it using the command line or following the GUI steps:

#. Define the variable ``WAZUH_MANAGER``. The agent will use this value to register and this will be the assigned manager for forwarding events. Deploy the Wazuh agent:

      .. code-block:: console

        # launchctl setenv WAZUH_MANAGER "10.0.0.2" && installer -pkg wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_OSX|.pkg -target /

    For additional deployment options, like agent name, agent group, and registration password, see :ref:`Deployment variables for macOS <deployment_variables_macos>`.

#. Start the Wazuh agent:

  .. code-block:: console

    # sudo /Library/Ossec/bin/ossec-control start

By default, all agent files can be found at the following location: ``/Library/Ossec/``.
    

Uninstall
---------

To uninstall the agent in macOS:

#. Stop the Wazuh agent service

    .. code-block:: console

      # /Library/Ossec/bin/ossec-control stop

#. Remove the ``/Library/Ossec/`` folder and ``ossec-init.conf`` file

    .. code-block:: console

      # /bin/rm -r /Library/Ossec
      # /bin/rm /etc/ossec-init.conf

#. Stop and unload dispatcher

    .. code-block:: console

      # /bin/launchctl unload /Library/LaunchDaemons/com.wazuh.agent.plist

#. Remove ``launchdaemons`` and ``StartupItems``

    .. code-block:: console

      # /bin/rm -f /Library/LaunchDaemons/com.wazuh.agent.plist
      # /bin/rm -rf /Library/StartupItems/WAZUH

#. Remove User and Groups

    .. code-block:: console

      # /usr/bin/dscl . -delete "/Users/ossec"
      # /usr/bin/dscl . -delete "/Groups/ossec"

#. Remove from ``pkgutil``

    .. code-block:: console

      # /usr/sbin/pkgutil --forget com.wazuh.pkg.wazuh-agent






