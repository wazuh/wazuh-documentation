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

Below are listed currently available registration methods together with their brief description:

+------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Registration method                                                                                        | Description                                                                                                                                                                                                                    |
+============================================================================================================+================================================================================================================================================================================================================================+
| :ref:`Using command line (CLI) <using-command-line>`                                                       | Manual registeration using ``manage_agents`` program. Requires extracting the registration key from the manager and inserting it in the agent.                                                                                 |
+------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using Wazuh API <restful-api-register>`                                                              | Uses a simple Wazuh API request from any host. Requires adding returned registration key to the agent using ``manage_agents`` program.                                                                                         |
+------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using registration service <registration-service>`                                                   | Registration using ``agent-auth`` program. Provides various options including password authorization, host verification or adding agents to the groups during the registration process.                                        |
+------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

.. note::

	  If the Wazuh is run in the cluster mode, please refer to the :ref:`Configuring a cluster section <load_balancer>` to get more information about the registration process in the cluster.

To learn more about the agent registration process, please read the :ref:`Registering agents - additional information <registering_agent_theory>` section.

In case of problems during the registration, several solutions can be found on :ref:`Registering agents' troubleshooting <registering-agents-troubleshooting>`.

.. toctree::
    :maxdepth: 2
    :hidden:

    Using the Command Line (CLI)<using-command-line>
    Using the Wazuh API<restful-api-register>
    Using the Registration Service<registration-service>
    registering-agents-theory
    registering-agents-troubleshooting
