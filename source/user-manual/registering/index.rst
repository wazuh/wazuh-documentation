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
| :ref:`Using command line (CLI) <using-command-line>`                                                       | Manually register agent using ``manage_agents`` program, extract the registration key from the manager and insert it in the agent.                                                                                             |
+------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using Wazuh API <restful-api-register>`                                                              | Run a simple Wazuh API request from any host. Add returned registration key to the agent using ``manage_agents`` program.                                                                                                      |
+------------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using registration service <registration-service>`                                                   | Register agent using ``agent-auth`` program. It provides various options including password authorization, host verification or adding agents to the groups during the registration process.                                   |
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
    registration-method
    registering-agent-theory
    registering-agent-troubleshooting
