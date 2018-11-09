.. Copyright (C) 2018 Wazuh, Inc.

.. _registration-process:

The registration process
=========================

Every Wazuh Agent send data to Wazuh Manager via secure way called OSSEC message protocol this encrypts messages using a pre-shared key. Initially when you successfully install a new Wazuh Agent this cannot communicate with Wazuh Manager for lack of the pre-shared key.

The registration process consists of a mechanism to create a trust relationship between the Manager and a Agent, this process could be done in a Manager itself or with a registration service, this service it listen on the Manager, a Agent could request a pre-shared key using some credentials and it will reply with the pre-shared key and store the new Agent in local database.

Another approach is using the RESTful API, this is just a wrapper for local registration on Wazuh Manager.

.. _agent-keys-registration:

Agent keys
-----------

The manager uses the file ``/var/ossec/etc/client.keys`` to store the registration record of each agent, which includes ID, name, IP, and key. Example::

    001 Server1 any e20e0394dca71bacdea57d4ca25d203f836eca12eeca1ec150c2e5f4309a653a
    002 ServerProd 192.246.247.247 b0c5548beda537daddb4da698424d0856c3d4e760eaced803d58c07ad1a95f4c
    003 DBServer 192.168.0.1/24 8ec4843da9e61647d1ec3facab542acc26bd0e08ffc010086bb3a6fc22f6f65b

The agents also have the file ``/var/ossec/etc/client.keys`` containing only their own registration record. Example for ``Server1`` agent::

    001 Server1 any e20e0394dca71bacdea57d4ca25d203f836eca12eeca1ec150c2e5f4309a653a

**Basic data for registering an agent**

In order to register an agent, it is necessary to provide the name and the IP of the agent.

There are several ways to set the agent IP:

 - **Any IP**: Allow the agent to connect from any IP address. Example: ``Server1`` has ``any`` IP.
 - **Fixed IP**: Allow the agent to connect only from the specified IP. Example: ``ServerProd`` has the IP ``192.246.247.247``.
 - **Range IP**: Allow the agent to connect from the specified range of IPs. Example: ``DBServer`` has the IP range ``192.168.0.1/24``.

Some registration methods automatically detect the IP of the agent during the registration process.

Registration methods
----------------------

Here are three ways to register an agent:

+---------------+-----------------------------------------------------------------+------------------------------------------------------------------------+
| Type          | Method                                                          | Description                                                            |
+===============+=================================================================+========================================================================+
| Manually      | :ref:`Using the command line <command-line-register>`           | Register an agent manually using manage_agents binary.                 |
+---------------+-----------------------------------------------------------------+------------------------------------------------------------------------+
| Automatically | :doc:`Using the registration service <use-registration-service>`| Register an agent automatically using ossec-authd binary.              |
+               +-----------------------------------------------------------------+------------------------------------------------------------------------+
|               | :ref:`Using the RESTful API <restful-api-register>`             | Register an agent by scripting (bash, python, powershell) and the API. |
+---------------+-----------------------------------------------------------------+------------------------------------------------------------------------+

.. note::

	If you're running Wazuh in cluster mode, refer to the :ref:`Configuring a cluster section <agent-registration-cluster>` to get more details about the registration process in the cluster.
