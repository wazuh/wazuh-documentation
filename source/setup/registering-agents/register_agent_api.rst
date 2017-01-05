.. _register_agent_api:

Register agents automatically with the API
===========================================

The API allows to register an agent using these requests:

 - POST /agents :ref:`(reference) <api_reference>`
 - PUT /agents/:agent_name :ref:`(reference) <api_reference>`

In order to register an agent using the API, only 3 steps are required:

Step 1: Add the agent to the manager

::

    $ curl -u foo:bar -k -X POST -d 'name=NewAgent&ip=10.0.0.8' https://API_IP:55000/agents
    {"error":0,"data":"001"}

Step 2: Get the agent key

::

    $ curl -u foo:bar -k -X GET https://API_IP:55000/agents/001/key
    {"error":0,"data":"MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM="}

Step 3: Copy the key to the agent

::

    $ /var/ossec/bin/manage_agents -i MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM=

These steps can be automated using:

 - Shell script (ToDo)
 - Python script (ToDo)
 - Powershell script (ToDo)
