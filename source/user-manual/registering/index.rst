.. Copyright (C) 2019 Wazuh, Inc.

.. _register_agents:

Registering agents
==================

.. meta::
  :description: Learn more about the different methods that can be used to register agents against the Wazuh manager.

The Wazuh agent registration process enables Agent-Manager communication, which requires a pre-shared key to be available on both sides. This key is used to establish an encrypted and authenticated communication channel by using `AES algorithm <https://wazuh.com/blog/benefits-of-using-aes-in-our-communications/>`_, allowing the manager to receive data collected by the agent.

.. note::

    Note that if the agent was deployed using :ref:`Deployment Variables <deployment_variables>`, :ref:`Deployed with Ansible <wazuh_ansible>` or :ref:`Deployed with Puppet <wazuh_puppet>`, the registration process is different and described in corresponding sections of the documentation.

Available registration methods
------------------------------

Below are listed currently available registration methods containing a brief description to enable you to choose the method that best suits your needs.

+------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Registration method                                                                                        | Description                                                                                                                                                                                                                    |
+============================================================================================================+================================================================================================================================================================================================================================+
| :ref:`Using command line (CLI) <using-command-line>`                                                       | Manual registration process. Requires root access for both manager and agent host.                                                                                                                                             |
+------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using Wazuh API <restful-api-register>`                                                              | Requires Wazuh API user name and password. Doesn't require root access to a manager.                                                                                                                                           |
+------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using Wazuh API with scripts <restful-api-register-script>`                                          | Fast and easy way to register agents for those familiar with using scripts. Available for Linux/Unix and for Windows hosts.                                                                                                    |
+------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using registration service <simple-registration-service>`                                            | The easiest registration method. Requires Root/Administrator access to an agent. Doesn't require an access to a manager. Allows to add an agent to a group during registration.                                                |
+------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using registration service with password authorization <password-authorization-registration-service>`| Extended version of the registartion service. Provides password protection of a manager from unauthorized registrations. Allows to add an agent to a group during registration.                                                |
+------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using registration service with host verification <host-verification-registration>`                  | Extended version of the registartion service. Uses Certificate of Authority (CA) to ensure that the connection is established between a right agent and a right manager. Allows to add an agent to a group during registration.|
+------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

.. note::

	  If you're running Wazuh in cluster mode, refer to the :ref:`Configuring a cluster section <load_balancer>` to get more details about the registration process in the cluster.

To learn more about the agent registration process, read the :ref:`Registering agents - additional information <registering_agent_theory>` section.

In case of problems during the registration, several solutions can be found on :ref:`Registering agents' troubleshooting <registering_agent_troubleshooting>`.

.. toctree::
    :maxdepth: 2
    :hidden:

    using-command-line
    restful-api-register
    restful-api-register-script
    simple-registration-method
    password-authorization-registration-service
    manager-verification/host-verification-registration
    registering-agent-theory
    registering-agent-troubleshooting
