.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent on macOS

.. _wazuh_agent_package_macos:

macOS
=====

The package for macOS is suitable for macOS Sierra or greater. The macOS agent can be downloaded from :ref:`packages list<packages>` or directly from `here <https://packages.wazuh.com/3.x/osx/wazuh-agent-3.10.2-1.pkg>`_. You can install it using the command line or following the GUI steps:

  a) Using the command line, you can choose between installation or deployment:

    * Installation:

      .. code-block:: console

        # installer -pkg wazuh-agent-3.11.3-1.pkg -target /

    * Deployment:

      You can automate the agent registration and configuration using variables. It is necessary to define at least the variable ``WAZUH_MANAGER``. The agent will use this value to register and this will be the assigned manager for forwarding events.

      .. code-block:: console

        # launchctl setenv WAZUH_MANAGER "10.0.0.2" && installer -pkg wazuh-agent-3.11.3-1.pkg -target /

      See the following document for additional automated deployment options :ref:`deployment variables <deployment_variables_macos>`.

  b) Using the GUI:


     Using the GUI you can perform a simple installation without registering and configuring the agent. Double click on the downloaded file and follow the wizard. If you are not sure how to answer some of the prompts, simply use the default answers.

     .. thumbnail:: ../../images/installation/macos.png
         :align: center

By default, all agent files can be found at the following location: ``/Library/Ossec/``.

Now that the agent is installed, if you did not use the deployment method, you will have to register and configure the agent to communicate with the manager. For more information about this process, please visit :ref:`user manual<register_agents>`.





