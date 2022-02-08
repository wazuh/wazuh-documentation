.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about how to register Wazuh agents on Linux, Windows, or macOS X in this section of our documentation.
  
.. _agent_enrollment:

Wazuh agent enrollment
=======================

Agent enrollment is the process of registering Wazuh agents as authorized members of the Wazuh solution. Agent enrollment allows:

- The Wazuh manager to register agents and generate unique keys for them.

- The use of the key to encrypt communication between the agent and the manager.

- Validation of the identity of the agents communicating with the manager.

While agent enrollment can be accomplished through two different methods, the installation process carries out enrollment itself when the ``WAZUH_MANAGER`` environment variable is set. 

The command for installing an agent with the ``WAZUH_MANAGER`` environment variable can be seen below:

.. tabs::


  .. group-tab:: Linux

      - Yum:

         .. code-block:: console

           # WAZUH_MANAGER="<MANAGER_IP>" yum install wazuh-agent

      - APT:

         .. code-block:: console

           # WAZUH_MANAGER="<MANAGER_IP>" apt-get install wazuh-agent


      - Zypp:

         .. code-block:: console

           # WAZUH_MANAGER="<MANAGER_IP>" zypper install wazuh-agent
         

  .. group-tab:: Windows host

  
      - Using CMD:
    
           .. code-block:: console
    
              # wazuh-agent-4.2.5-1.msi /q WAZUH_MANAGER="<MANAGER_IP>" WAZUH_REGISTRATION_SERVER="<MANAGER_IP>"
    
      - Using PowerShell:
    
           .. code-block:: console
    
              # .\wazuh-agent-4.2.5-1.msi /q WAZUH_MANAGER="<MANAGER_IP>" WAZUH_REGISTRATION_SERVER="<MANAGER_IP>"



  .. group-tab:: macOS 


      .. code-block:: console
    
          # launchctl setenv WAZUH_MANAGER "<MANAGER_IP>" && installer -pkg wazuh-agent-4.2.5-1.pkg -target /



In this case, the installation uses the manager IP address information to automatically enroll the new agent to the Wazuh server and no further action is required from the user. In other cases, when agents are deployed leaving enrollment for a later stage, user intervention is expected to configure exactly how agent enrollment should take place.

Requirements
------------

The following has to be in place to ensure the Wazuh agent registers successfully:

#. An installed and running Wazuh manager. 

#. An installed Wazuh agent on the endpoint in need of enrollment. 

#. Connectivity between the server in which the Wazuh manager is installed and the endpoint. This server should have the following default ports opened to allow the Wazuh manager to establish communication with the agents: 

   - 1514/TCP for agent communication.

   - 1515/TCP for enrollment via automatic agent request.
   
   - 55000/TCP for enrollment via manager API.

Refer to the :ref:`Troubleshooting <troubleshooting>` section for details on how to test the connectivity between the agent and the manager. 

Enrollment methods
------------------

There are two options for enrolling agents to the Wazuh manager. 

#. Enrollment via automatic agent request: Once the IP address of the manager has been set, the agent will be able to automatically request the key and import it. This is the recommended enrollment method.

#. Enrollment via manager API: The user requests for the key from the manager API, and then manually imports it to the agent.

.. toctree::
    :maxdepth: 1

    via-agent-configuration
    via-manager-API
    security-options
    troubleshooting

    
