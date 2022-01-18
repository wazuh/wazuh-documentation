.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about how to register Wazuh agents on Linux, Windows, or macOS X in this section of our documentation.
  
.. _register_agents:

Registering Wazuh agents
========================

.. note::

	Since Wazuh 4.0, by default, the agent registers automatically with the manager through enrollment. Configuration details can be found on the :ref:`Enrollment section <agent-enrollment>`.


The security event data collection from the Wazuh agent requires enabling the communication with the Wazuh manager.

The Wazuh manager needs to know which Wazuh agent is sending the security events and if they are authorized. This step is called Wazuh agent registration and can be performed using the ``registration service``. Using the port 1515 and TCP protocol, the Wazuh manager will attend the registration request of the Wazuh agent using a TLS connection. The Wazuh agent will obtain an unique
key used to encrypt the traffic between them. Once the registration is done, this communication will no longer be used, unless the Wazuh agent needs to be registered into a new Wazuh manager.

After the registration, the Wazuh agent has to be configured to indicate the destination where the collected security events will be sent. By default, the Wazuh manager will use a communication channel over the port 1514 using TCP protocol, through which The Wazuh Agent will send the collected data.

.. note::

    This documentation section can be skipped if the Wazuh agent was deployed using :ref:`Deployment variables <deployment_variables>`, :ref:`Deployed with Ansible <wazuh_ansible>` or :ref:`Deployed with Puppet <wazuh_puppet>`. In these cases, the registration process is different and described in their corresponding sections of the documentation.


.. _simple-registration-service:

Registering the Wazuh agent using simple registration service
-------------------------------------------------------------

To register the Wazuh agent, choose the tab corresponding to the Wazuh agent's host operating system:

.. tabs::


  .. group-tab:: Linux/Unix host


    Open a terminal in the Linux/Unix Wazuh agent's host as a ``root`` user.


    #. To register the Wazuh agent, run the ``agent-auth`` utility, using the Wazuh manager’s IP address:

         .. code-block:: console

           # /var/ossec/bin/agent-auth -m <manager_IP>

         .. include:: ../../_templates/registrations/common/set_agent_name.rst


    #. To enable the communication with the Wazuh manager, edit the Wazuh agent’s configuration file placed at ``/var/ossec/etc/ossec.conf``.

         .. include:: ../../_templates/registrations/common/client_server_section.rst


    #. Restart the Wazuh agent:

      .. include:: ../../_templates/common/linux/restart_agent.rst


    The Wazuh agent registration can be adjusted by using different :ref:`agent-auth` options.



  .. group-tab:: Windows host


    Open a Powershell or CMD session in the Wazuh agent's host as an ``Administrator``.

    .. include:: ../../_templates/windows/installation_directory.rst


    #. To register the Wazuh agent, run the ``agent-auth.exe`` utility, using the Wazuh manager's IP address:
    
    
        .. tabs::
    
          .. group-tab:: Powershell
    
           .. code-block:: console
    
              # &'C:\Program Files (x86)\ossec-agent\agent-auth.exe' -m <manager_IP> 
    
          .. group-tab:: Windows cmd
    
           .. code-block:: console
    
              # "C:\Program Files (x86)\ossec-agent\agent-auth.exe" -m <manager_IP>


        .. include:: ../../_templates/registrations/common/set_agent_name.rst


    #. To enable the communication with the Wazuh manager, edit the Wazuh agent's configuration file placed at ``C:\Program Files (x86)\ossec-agent\ossec.conf``.

         .. include:: ../../_templates/registrations/common/client_server_section.rst


    #. Restart the Wazuh agent:

      .. include:: ../../_templates/common/windows/restart_agent.rst


    The Wazuh agent registration can be adjusted by using different :ref:`agent-auth` options.



  .. group-tab:: MacOS X host


    Open a terminal in the MacOS X Wazuh agent's host as a ``root`` user.


    #. To register the Wazuh agent, run the ``agent-auth`` utility, using the Wazuh manager’s IP address:


         .. code-block:: console

           # /Library/Ossec/bin/agent-auth -m <manager_IP>

         .. include:: ../../_templates/registrations/common/set_agent_name.rst


    #. To enable the communication with the Wazuh manager, edit the Wazuh agent's configuration file placed at ``/Library/Ossec/etc/ossec.conf``.

         .. include:: ../../_templates/registrations/common/client_server_section.rst


    #. Restart the Wazuh agent:

         .. include:: ../../_templates/common/macosx/restart_agent.rst


    The Wazuh agent registration can be adjusted by using different :ref:`agent-auth` options.


There are also other easy registration methods. The choice depends on the particular use case and the preferences of the user:

+-----------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Registration method                                                                                 | Description                                                                                                                                                         |
+=====================================================================================================+=====================================================================================================================================================================+
| :ref:`Using command line (CLI) <command-line-registration>`                                         | Manual registeration using ``manage_agents`` utility. Requires extracting the registration key from the Wazuh manager and inserting it manually in the Wazuh agent. |
+-----------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using Wazuh API <restful-api-registration>`                                                   | Uses a simple Wazuh API request from any host. Requires adding returned registration key manually to the Wazuh agent using ``manage_agents`` utility.               |
+-----------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using registration service with password authorization <password-authorization-registration>` | Registration using ``agent-auth`` utility. Allows additional protection of the Wazuh manager from unauthorized registrations by using a password.                   |
+-----------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using registration service with host verification <host-verification-registration>`           | Registration using ``agent-auth`` utility. Ensures that the connection between the right Wazuh agent and the right Wazuh manager is established.                    |
+-----------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using the enrollment method <agent-enrollment>`                                               | Registration process that provides the user with an automated mechanism to enroll agents with minimal configuration steps.                                          |
+-----------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------+



To learn more about the Wazuh agent registration process, please read the :ref:`registering Wazuh agents - additional information <registering_agent_theory>`.

In case of problems during registration, visit the :ref:`registering Wazuh agents - troubleshooting <registering-agents-troubleshooting>` page to find a solution.

.. toctree::
    :maxdepth: 2
    :hidden:

    command-line-registration
    restful-api-registration
    password-authorization-registration
    host-verification-registration
    agent-enrollment
    registering-agents-theory
    registering-agents-troubleshooting
    deployment_variables/deployment_variables
