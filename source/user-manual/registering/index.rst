.. Copyright (C) 2019 Wazuh, Inc.

.. _register_agents:

Registering agents
==================

.. meta::
  :description: Learn more about the different methods that can be used to register agents against the Wazuh manager.

Wazuh agents communicate with the Wazuh server using outbound TCP/UDP connections to two different services:

 - 1515/TCP: Service used for agents registration, to obtain a unique key. The communication is done over TLS. The obtained unique key (one per agent) is used later to authenticate with the Wazuh service (1514/TCP-UDP) and to encrypt traffic.
 - 1514/TCP-UDP: Service used to send collected data and control messages.

.. note::

    If the agent was deployed using :ref:`Deployment variables <deployment_variables>`, :ref:`Deployed with Ansible <wazuh_ansible>` or :ref:`Deployed with Puppet <wazuh_puppet>`, the registration process is different and described in their corresponding sections of the documentation.
    If the Wazuh runs in the cluster mode, please refer to the :ref:`Configuring a cluster section <load_balancer>` to get more information about the registration process in the cluster.

.. _simple-registration-service:

Registering agent using simple registration service
---------------------------------------------------

To register the agent, choose the tab corresponding to the agent host operating system:

.. tabs::

 .. group-tab:: Linux/Unix host

   Open a session in the Linux/Unix agent host as a ``root`` user.

   1. To register the agent, run the ``agent-auth`` program, using the manager’s IP address:

    .. code-block:: console

     # /var/ossec/bin/agent-auth -m <manager_IP>

    If the new agent’s name is not provided, it is set automatically using hostname. To specify the agent's name add ``-A <agent_name>`` to the command above.

   2. To enable the communication with the manager, edit the agent's  ``/var/ossec/etc/ossec.conf`` configuration file:

    .. include:: ../../_templates/registrations/common/client_server_section.rst

   3. Start the agent:

    .. include:: ../../_templates/registrations/linux/start_agent.rst


   The agent registration can be adjusted by using different :ref:`agent-auth` options.



 .. group-tab:: Windows host

   Open a Powershell or CMD session in the agent host as an ``Administrator``.

    .. include:: ../../_templates/registrations/windows/installation_directory.rst

   1. To register the agent, run the ``agent-auth.exe`` program, using the manager's IP address:

    .. code-block:: console

     # C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <manager_IP>

    If the new agent’s name is not provided, it is set automatically using hostname. To specify the agent's name add ``-A <agent_name>`` to the command above.

   2. To enable the communication with the manager, edit the agent's ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file:

    .. include:: ../../_templates/registrations/common/client_server_section.rst

   3. Start the agent.

    .. include:: ../../_templates/registrations/windows/start_agent.rst



 .. group-tab:: MacOS X host

  Open a session in the MacOS X agent host as a ``root`` user.

  1. To register the agent, run the ``agent-auth`` program, using the manager’s IP address:

   .. code-block:: console

    # /Library/Ossec/bin/agent-auth -m <manager_IP>

   If the new agent’s name is not provided, it is set automatically using hostname. To specify the agent's name add ``-A <agent_name>`` to the command above.

  2. To enable the communication with the manager, edit the agent's ``/Library/Ossec/etc/ossec.conf`` configuration file:

   .. include:: ../../_templates/registrations/common/client_server_section.rst

  3. Start the agent:

   .. include:: ../../_templates/registrations/macosx/start_agent.rst

  The agent registration can be adjusted by using different :ref:`agent-auth` options.

The above method is the simplest way of registering agents. There are also available other registration methods:

+-----------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------+
| Registration method                                                                                 | Description                                                                                                                                      |
+=====================================================================================================+==================================================================================================================================================+
| :ref:`Using command line (CLI) <command-line-registration>`                                         | Manual registeration using ``manage_agents`` program. Requires extracting the registration key from the manager and inserting it in the agent.   |
+-----------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using Wazuh API <restful-api-registration>`                                                   | Uses a simple Wazuh API request from any host. Requires adding returned registration key to the agent using ``manage_agents`` program.           |
+-----------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using registration service with password authorization <password-authorization-registration>` | Registration using ``agent-auth`` program. Allows additional protection of the manager from unauthorized registrations by using a password.      |
+-----------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using registration service with host verification <host-verification-registration>`           | Registration using ``agent-auth`` program. Provides confidence that the connection between the right agent and the right manager is established. |
+-----------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------+

To learn more about the agent registration process, please read the :ref:`registering agents - additional information <registering_agent_theory>`.

.. toctree::
    :maxdepth: 2
    :hidden:

    command-line-registration
    restful-api-registration
    password-authorization-registration
    host-verification-registration
    registering-agents-theory
