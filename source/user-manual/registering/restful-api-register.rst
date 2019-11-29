.. Copyright (C) 2019 Wazuh, Inc.

.. _restful-api-register:

Using the Wazuh API manually
============================

Wazuh API allows to register a Wazuh Agent by running a single requests from any host. This request will return a registration **key** for that agent, and then, you **must manually add** this key to the agent using ``manage_agents`` utility.

In this example, we will register an agent in a manager whose IP is ``192.168.1.2``.

Registering the Agents
^^^^^^^^^^^^^^^^^^^^^^

.. toctree::
    :maxdepth: 2

    api/api-register-linux-unix
    api/api-register-windows
    api/api-register-macos
