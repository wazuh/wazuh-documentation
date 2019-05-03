.. Copyright (C) 2019 Wazuh, Inc.

.. _restful-api-register:

Using the Wazuh API
===================

Wazuh API allows to register a Wazuh Agent by running a single requests from the any host. This request will return the **key** for that agent, and then, you **must manually add** this key to the agent using ``manage_agents``. 

In this example, we will register a Wazuh Agent in a Wazuh Manager whose IP is ``192.168.1.2``.

Registering the Agents
^^^^^^^^^^^^^^^^^^^^^^

.. toctree::
    :maxdepth: 2

    api/api-register-linux-unix
    api/api-register-windows
    api/api-register-macos

Scripts to register the agents automatically
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We have prepared a few scripts in different programming languages to help with the task of registering an agent with the API:

    - `Register an agent using a shell script <https://raw.githubusercontent.com/wazuh/wazuh-api/3.9/examples/api-register-agent.sh>`_.
    - `Register an agent using a Python script <https://raw.githubusercontent.com/wazuh/wazuh-api/3.9/examples/api-register-agent.py>`_.
    - `Register an agent using a PowerShell script <https://raw.githubusercontent.com/wazuh/wazuh-api/3.9/examples/api-register-agent.ps1>`_.
