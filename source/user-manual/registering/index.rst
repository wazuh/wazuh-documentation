.. Copyright (C) 2020 Wazuh, Inc.

.. _register_agents:

Registering Wazuh agents
========================

.. meta::
  :description: Learn more about the different methods that can be used to register Wazuh agents against the Wazuh manager.

The security event data collection from the Wazuh agent requires enabling the communication with the Wazuh manager.

The Wazuh manager must know which Wazuh agent is sending the security events and if it is authorized. This step is called Wazuh agent registration and it can be done by using the ``registration service``. Using the port 1515 and TCP protocol, the Wazuh manager will attend the registration request of the Wazuh agent using a TLS connection. The Wazuh agent will obtain an unique
key, used to encrypt the traffic between them. Once the registration is done, this communication will no longer be used, unless the Wazuh agent needs to be registered into a new Wazuh manager.

After the registration, the Wazuh agent has to be configured to indicate the destination where the collected security events will be sent. By default, the Wazuh manager will use a communication channel over the port 1514 using TCP protocol, through which The Wazuh Agent will send the collected data.

.. note::

    - This documentation section can be skipped if the Wazuh agent was deployed using :ref:`Deployment variables <deployment_variables>`, :ref:`Deployed with Ansible <wazuh_ansible>` or :ref:`Deployed with Puppet <wazuh_puppet>`. In those cases, the registration process is different and described in their corresponding sections of the documentation.
    - If the Wazuh runs in the cluster mode, all the Wazuh agents must be registered in the Wazuh master node, even if the Wazuh agent is going to report to the worker node. After the registration process, the Wazuh agent communication with the Wazuh manager has to be configured as described in the :ref:`agents connections <cluster_agents_connections>` section of the :ref:`deploying the Wazuh cluster <configuring-cluster>` documentation.

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

         .. code-block:: console

           # C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <manager_IP>

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


There are also other easy registration methods. The choice depends on the particular use case and the user's preferences:

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

To learn more about the Wazuh agent registration process, please read the :ref:`registering Wazuh agents - additional information <registering_agent_theory>`.

In case of having problems during the registration, several solutions can be found on :ref:`registering Wazuh agents - troubleshooting <registering-agents-troubleshooting>`.

.. toctree::
    :maxdepth: 2
    :hidden:

    command-line-registration
    restful-api-registration
    password-authorization-registration
    host-verification-registration
    registering-agents-theory
    registering-agents-troubleshooting
