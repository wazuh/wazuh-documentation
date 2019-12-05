.. Copyright (C) 2019 Wazuh, Inc.

.. _register_agents:

Registering agents
==================

.. meta::
  :description: Learn more about the different methods that can be used to register agents against the Wazuh manager.

When Wazuh Agent is successfully installed it is time to register it with Wazuh Manager. This process enables an encrypted and authenticated communication channel which allows the manager to receive data collected by the agent. All the messages are encrypted using a pre-shared key. If this pre-shared key is not provided, the agent can not communicate with the manager. During the registration service agent requests that key using credentials. The manager replies with the key and store the new agent in a local database.
Wazuh provides a variety of different agent registration methods. The choice depends on factors like system architecture or user preferences.

Please, note that if agent was deployed using :ref:`Deployment Variables <deployment_variables>`, :ref:`Deployed with Ansible <wazuh_ansible>` or :ref:`Deployed with Puppet <wazuh_puppet>`, agent is already registered with manager.

.. _agent-keys-registration:

Agent keys
----------

The manager uses the file ``/var/ossec/etc/client.keys`` to store the registration record of each agent, which includes ID, name, IP, and key.
Example::

    001 Server1 any e20e0394dca71bacdea57d4ca25d203f836eca12eeca1ec150c2e5f4309a653a
    002 ServerProd 192.246.247.247 b0c5548beda537daddb4da698424d0856c3d4e760eaced803d58c07ad1a95f4c
    003 DBServer 192.168.0.1/24 8ec4843da9e61647d1ec3facab542acc26bd0e08ffc010086bb3a6fc22f6f65b

The agents also have the file ``/var/ossec/etc/client.keys`` containing only their own registration record.
Example for ``Server1`` agent::

    001 Server1 any e20e0394dca71bacdea57d4ca25d203f836eca12eeca1ec150c2e5f4309a653a

**Basic data for registering an agent**

In order to register an agent, it is necessary to provide the name and the IP of the agent.

There are several ways to set the agent IP:

 - **Any IP**: Allow the agent to connect from any IP address. Example: ``Server1`` has ``any`` IP.
 - **Fixed IP**: Allow the agent to connect only from the specified IP. Example: ``ServerProd`` has the IP ``192.246.247.247``.
 - **Range IP**: Allow the agent to connect from the specified range of IPs. Example: ``DBServer`` has the IP range ``192.168.0.1/24``.

Some registration methods automatically detect the IP of the agent during the registration process.

Available registration methods
------------------------------

Below are listed currently available registration methods containing a brief description to enable you to choose the method that best suits your needs.

+------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------+
| Registration method                                                                            | Description                                                                           |
+================================================================================================+=======================================================================================+
| :ref:`Using command line (CLI) <using-command-line>`                                           | Simple and fully manual. Requires root access for both manager and agent host.        |
+------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------+
| :ref:`Using Wazuh API manually <restful-api-register>`                                         | Requires Wazuh API user name and password as well as manager's and agent's IP address |
+------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------+
| :ref:`Using scripts to register agents with API <restful-api-register-script>`                 | Fast and easy way to register agents for those familiar with using scripts.           |
+------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------+
| :ref:`Using simple registration service <simple-registration-service>`                         | Requires Root/Administrator access to an agent. Doesn't require an access to a manager|
+------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------+
| :ref:`Using password authorization <password-authorization-registration-service>`              |                                                                                       |
+------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------+
| :ref:`manager-verification-registration`                                                       |                                                                                       |
+------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------+
| :ref:`agent-verification-with-host-validation`                                                 |                                                                                       |
+------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------+
| :ref:`agent-verification-without-host-validation`                                              |                                                                                       |
+------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------+

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
