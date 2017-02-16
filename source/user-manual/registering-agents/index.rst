.. _connecting_agents:

Registering agents
==============================

Once we have our agents installed, it is necessary to connect them with the manager. We describe the 3 ways to register an agent below.

+---------------+----------------------------------------------+--------------------------------------------------------------------+
| Type          | Component                                    | Description                                                        |
+===============+==============================================+====================================================================+
| Manually      | :ref:`manage_agents <register_agent_manual>` | Register an agent manually using manage_agents binary.             |
+---------------+----------------------------------------------+--------------------------------------------------------------------+
| Automatically | :ref:`ossec-authd <register_agent_authd>`    | Register an agent automatically using ossec-authd binary.          |
+               +----------------------------------------------+--------------------------------------------------------------------+
|               | :ref:`API <register_agent_api>`              | Register an agent by scripting (bash, python, powershell) and API. |
+---------------+----------------------------------------------+--------------------------------------------------------------------+

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        register_agent_manual
        register_agent_authd
        register_agent_api
