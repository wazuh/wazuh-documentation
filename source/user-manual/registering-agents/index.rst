.. _connecting_agents:

Registering agents
==============================

Once we have our agents installed, it is necessary to connect them to the manager. The communication between an agent and the manager is performed via the OSSEC message protocol, which encrypts messages using a preshared key. The process of provisioning an agent authentication key on the manager and distributing it to an agent is called registration.

The manager uses the file */var/ossec/etc/client.keys* to store the registration record of each agent, which includes ID, name, IP, and key. Example::

    001 Server1 any e20e0394dca71bacdea57d4ca25d203f836eca12eeca1ec150c2e5f4309a653a
    002 ServerProd 192.246.247.247 b0c5548beda537daddb4da698424d0856c3d4e760eaced803d58c07ad1a95f4c
    003 DBServer 192.246.247.248 8ec4843da9e61647d1ec3facab542acc26bd0e08ffc010086bb3a6fc22f6f65b
    004 DevServer 192.246.247.249 d6570fc4c48cd867e2ce34d4950b212bd54566e57c182bd2b792068f841385bc

The agents also have the file */var/ossec/etc/client.keys* containing only their own registration record. Example for *Server1* agent::

    001 Server1 any e20e0394dca71bacdea57d4ca25d203f836eca12eeca1ec150c2e5f4309a653a


Here are 3 ways to register an agent:

+---------------+----------------------------------------------+------------------------------------------------------------------------+
| Type          | Component                                    | Description                                                            |
+===============+==============================================+========================================================================+
| Manually      | :ref:`manage_agents <register_agent_manual>` | Register an agent manually using manage_agents binary.                 |
+---------------+----------------------------------------------+------------------------------------------------------------------------+
| Automatically | :ref:`ossec-authd <register_agent_authd>`    | Register an agent automatically using ossec-authd binary.              |
+               +----------------------------------------------+------------------------------------------------------------------------+
|               | :ref:`API <register_agent_api>`              | Register an agent by scripting (bash, python, powershell) and the API. |
+---------------+----------------------------------------------+------------------------------------------------------------------------+

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        register-agent-manual
        register-agent-authd
        register-agent-api
