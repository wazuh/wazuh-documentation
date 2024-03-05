.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the Wazuh agent lifecycle here: registered agents, the status of the agents, and removed agents.

.. _agent-life-cycle:

Agent life cycle
================

Registered agent
----------------

Once an agent is installed on a machine to be monitored, it must be registered with the Wazuh server in order to establish communication. Take a look at :doc:`Wazuh agent enrollment </user-manual/agent-enrollment/index>`.

A registered agent will remain in the manager until it is removed by the user. There are four different states that an agent may be in at any given time, as shown in the image below:

.. thumbnail:: /images/manual/managing-agents/agent-status.png
    :title: Agent life cycle
    :alt: Agent life cycle
    :align: center
    :width: 80%

.. _agent-status-cycle:

Agent status
------------

- **Never connected**: The agent has been registered but has not yet connected to the manager.
- **Pending**: The authentication process has not finished because the manager received a request for connection from the agent but has not received anything else. The agent will be in this state one time in its life cycle after each startup. If the agent persists in this state, it may indicate a firewall issue.
- **Active**: The agent has successfully connected and can now communicate with the manager.
- **Disconnected**: The manager will consider the agent disconnected if it does not receive any ``keep alive`` messages within :ref:`agents_disconnection_time<reference_agents_disconnection_time>` (10m default time).

Removed agent
-------------

The life cycle comes to an end when the agent is removed from the manager. This can be done through the :doc:`Wazuh API<./remove-agents/restful-api-remove>`, :doc:`command line<./remove-agents/remove>`, or Authd (if the force option is enabled).
