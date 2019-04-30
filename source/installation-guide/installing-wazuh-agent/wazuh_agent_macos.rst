.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_agent_macos:

Install Wazuh agent on Mac OS X
===============================

The Mac OS X agent can be downloaded from :doc:`packages list<../packages-list/index>`. You can install it by using the command line or following the GUI steps:

  a) The command line:

     Using the command line, we have the option of only install the package, or install the package, configure and register it with one line command. The following step describes an installation:

     .. code-block:: console

            # installer -pkg wazuh-agent-3.9.0-1.pkg -target /
      
     .. note:: With Only installation, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the :doc:`user manual<../../user-manual/agents/registering/index>`.


     As alternative, You can automate the agent registration and configuration using environment variables. 
 
     .. code-block:: console
 
       # launchctl setenv WAZUH_MANAGER_IP "192.168.1.2" && installer -pkg wazuh-agent-3.9.0-1.pkg -target /
 
     .. note:: See the following document for additional registering and configuration options: :doc:`Automated registering and configuration variables  <automated_reg-config_variables>`.   


  b) The GUI:

     Double click on the downloaded file and follow the wizard. If you are not sure how to respond to some of the prompts, simply use the default answers.

     .. thumbnail:: ../../images/installation/macos.png
         :align: center

By default, all agent files can be found at the following location: ``/Library/Ossec/``.

.. note:: Now that the agent is installed, if you didn't use the automatic configuration / registration method, you will now have to register and configure the agent to communicate with the manager. For more information about this process, please visit :doc:`user manual<../../user-manual/agents/registering/index>`.
