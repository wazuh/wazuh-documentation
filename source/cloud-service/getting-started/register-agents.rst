.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_getting_started_register_agents:

Register Agents
===============

.. meta::
  :description: Learn about how to register agents. 

Agent registration is a simple process that takes place after the environment creation. It will make your environment ready to start reporting from your endpoints.

1. :ref:`Log into your WUI<cloud_getting_started_wui_access>`.

2. Click on **Active agents**.

3. Click on **Deploy new agent**.

4. Select the agent's OS.

5. Fill the server address and password fields with your environments' credentials.

6. Copy the generated output and run it on the agent.


.. note::

   Agents use **TCP** to communicate with your environment. Make sure that your agents are connected to your environments using TCP.
