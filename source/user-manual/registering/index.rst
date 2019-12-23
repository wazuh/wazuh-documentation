.. Copyright (C) 2019 Wazuh, Inc.

.. _register_agents:

Registering agents
==================

.. meta::
  :description: Learn more about the different methods that can be used to register agents against the Wazuh manager.

When Wazuh Agent is successfully installed it is time to register it with Wazuh Manager. This process enables an encrypted and authenticated communication channel which allows the manager to receive data collected by the agent. All the messages are encrypted using a pre-shared key. If this pre-shared key is not provided, the agent can not communicate with the manager. During the registration service agent requests that key using credentials. The manager replies with the key and store the new agent in a local database.
Wazuh provides a variety of different agent registration methods. The choice depends on factors like system architecture or user preferences.

Please, note that if agent was deployed using :ref:`Deployment Variables <deployment_variables>`, :ref:`Deployed with Ansible <wazuh_ansible>` or :ref:`Deployed with Puppet <wazuh_puppet>`, agent is already registered with manager.


Available registration methods
------------------------------

Below are listed currently available registration methods containing a brief description to enable you to choose the method that best suits your needs.

+------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Registration method                                                                            | Description                                                                                                                                                                      |
+================================================================================================+==================================================================================================================================================================================+
| :ref:`Using command line (CLI) <using-command-line>`                                           | Simple and fully manual. Requires root access for both manager and agent host.                                                                                                   |
+------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using Wazuh API manually <restful-api-register>`                                         | Requires Wazuh API user name and password. Doesn't require root access to the manager                                                                                            |
+------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using scripts to register agents with API <restful-api-register-script>`                 | Fast and easy way to register agents for those familiar with using scripts.                                                                                                      |
+------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using simple registration service <simple-registration-service>`                         | Requires Root/Administrator access to an agent. Doesn't require an access to a manager. Allows to add an agent to a group during registration.                                   |
+------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using password authorization <password-authorization-registration-service>`              | Provides password protection of a manager from unauthorized registrations. Allows to add an agent to a group during registration.                                                |
+------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| :ref:`Using registration service with host verification <host-verification-registration>`      | Uses Certificate of Authority (CA) to ensure that the connection is established between a right agent and a right manager. Allows to add an agent to a group during registration.|
+------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

.. note::

	If you're running Wazuh in cluster mode, refer to the :ref:`Configuring a cluster section <load_balancer>` to get more details about the registration process in the cluster.

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
