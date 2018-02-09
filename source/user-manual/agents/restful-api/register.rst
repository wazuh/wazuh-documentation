.. _restful-api-register:

Register Agents
---------------

Two requests are needed to register an agent using the API:

    - POST /agents :ref:`(reference) <api_reference>`
    - PUT /agents/:agent_name :ref:`(reference) <api_reference>`

We have prepared a few scripts in different programming languages to help with the task of registering an agent with the API:

    - `Register an agent using a shell script <https://raw.githubusercontent.com/wazuh/wazuh-api/3.2/examples/api-register-agent.sh>`_.
    - `Register an agent using a Python script <https://raw.githubusercontent.com/wazuh/wazuh-api/3.2/examples/api-register-agent.py>`_.
    - `Register an agent using a PowerShell script <https://raw.githubusercontent.com/wazuh/wazuh-api/3.2/examples/api-register-agent.ps1>`_.

Basically, the scripts perform the following steps:

**Step 1:** Add the agent to the manager.

.. code-block:: console

    # curl -u foo:bar -k -X POST -d 'name=NewAgent&ip=10.0.0.8' https://API_IP:55000/agents
    {"error":0,"data":"001"}

**Step 2:** Get the agent key.

.. code-block:: console

    # curl -u foo:bar -k -X GET https://API_IP:55000/agents/001/key
    {"error":0,"data":"MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM="}

**Step 3:** Copy the key to the agent.

.. code-block:: console

    # /var/ossec/bin/manage_agents -i MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM=

.. warning::

    If you paste the command directly into the terminal, the agent key will be saved in the bash history. Use ``manage_agents`` without arguments or from a script.

**Step 4:** Restart the agent.

.. code-block:: console

    # /var/ossec/bin/ossec-control restart
