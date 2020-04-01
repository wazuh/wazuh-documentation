.. Copyright (C) 2019 Wazuh, Inc.

.. _register_agents:

Registering Wazuh agents
========================

.. meta::
  :description: Learn more about the different methods that can be used to register Wazuh agents against the Wazuh manager.

By default, Wazuh agents communicate with the Wazuh manager using outbound TCP/UDP connections to two different services:

 - 1515/TCP: service used for Wazuh agents registration to obtain a unique key. The communication is done over TLS. The obtained unique key (one per Wazuh agent) is used later to authenticate with the Wazuh service (1514/TCP-UDP) and to encrypt traffic.
 - 1514/TCP-UDP: service used to send collected data and control messages.

.. note::

    This documentation section can be skipped if the Wazuh agent was deployed using :ref:`Deployment variables <deployment_variables>`, :ref:`Deployed with Ansible <wazuh_ansible>` or :ref:`Deployed with Puppet <wazuh_puppet>`. In those cases, the registration process is different and described in their corresponding sections of the documentation.
    If the Wazuh runs in the cluster mode, please refer to the :ref:`Configuring a cluster section <load_balancer>` to get more information about the registration process in the cluster.

.. _simple-registration-service:

Registering the Wazuh agent using simple registration service
-------------------------------------------------------------

To register the Wazuh agent, choose the tab corresponding to the Wazuh agent's host operating system:

.. tabs::

 .. group-tab:: Linux/Unix host

   Open a session in the Linux/Unix Wazuh agent's host as a ``root`` user.

   1. To register the Wazuh agent, run the ``agent-auth`` program, using the Wazuh manager’s IP address:

    .. code-block:: console

     # /var/ossec/bin/agent-auth -m <manager_IP>

    .. include:: ../../_templates/registrations/common/set_agent_name.rst

   2. To enable the communication with the Wazuh manager, edit the Wazuh agent's  ``/var/ossec/etc/ossec.conf`` configuration file:

    .. include:: ../../_templates/registrations/common/client_server_section.rst

   3. Restart the Wazuh agent:

    .. include:: ../../_templates/registrations/linux/restart_agent.rst


   The Wazuh agent registration can be adjusted by using different :ref:`agent-auth` options.



 .. group-tab:: Windows host

   Open a Powershell or CMD session in the Wazuh agent's host as an ``Administrator``.

    .. include:: ../../_templates/registrations/windows/installation_directory.rst

   1. To register the Wazuh agent, run the ``agent-auth.exe`` program, using the Wazuh manager's IP address:

    .. code-block:: console

     # C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <manager_IP>

    .. include:: ../../_templates/registrations/common/set_agent_name.rst

   2. To enable the communication with the Wazuh manager, edit the Wazuh agent's ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file:

    .. include:: ../../_templates/registrations/common/client_server_section.rst

   3. Restart the Wazuh agent:

    .. include:: ../../_templates/registrations/windows/restart_agent.rst

   The Wazuh agent registration can be adjusted by using different :ref:`agent-auth` options.



 .. group-tab:: MacOS X host

  Open a session in the MacOS X Wazuh agent's host as a ``root`` user.

  1. To register the Wazuh agent, run the ``agent-auth`` program, using the Wazuh manager’s IP address:

   .. code-block:: console

    # /Library/Ossec/bin/agent-auth -m <manager_IP>

   .. include:: ../../_templates/registrations/common/set_agent_name.rst

  2. To enable the communication with the Wazuh manager, edit the Wazuh agent's ``/Library/Ossec/etc/ossec.conf`` configuration file:

   .. include:: ../../_templates/registrations/common/client_server_section.rst

  3. Restart the Wazuh agent:

   .. include:: ../../_templates/registrations/macosx/restart_agent.rst

  The Wazuh agent registration can be adjusted by using different :ref:`agent-auth` options.

The above method is the simplest way of registering the Wazuh agents. There are also available other registration methods:

+-----------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Registration method                                                                                 | Description                                                                                                                                                  |
+=====================================================================================================+==============================================================================================================================================================+
| :ref:`Using command line (CLI) <command-line-registration>`                                         | Manual registeration using ``manage_agents`` program. Requires extracting the registration key from the Wazuh manager and inserting it in the Wazuh agent.   |
+-----------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using Wazuh API <restful-api-registration>`                                                   | Uses a simple Wazuh API request from any host. Requires adding returned registration key to the Wazuh agent using ``manage_agents`` program.                 |
+-----------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using registration service with password authorization <password-authorization-registration>` | Registration using ``agent-auth`` program. Allows additional protection of the Wazuh manager from unauthorized registrations by using a password.            |
+-----------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using registration service with host verification <host-verification-registration>`           | Registration using ``agent-auth`` program. Provides confidence that the connection between the right Wazuh agent and the right Wazuh manager is established. |
+-----------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------+

To learn more about the Wazuh agent registration process, please read the :ref:`registering Wazuh agents - additional information <registering_agent_theory>`.

.. toctree::
    :maxdepth: 2
    :hidden:

    command-line-registration
    restful-api-registration
    password-authorization-registration
    host-verification-registration
    registering-agents-theory
