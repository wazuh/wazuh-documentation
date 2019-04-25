.. Copyright (C) 2019 Wazuh, Inc.

.. _agent-life-cycle:

Agent life cycle
================

Registered agent
----------------

Once an agent is installed on a machine to be monitored, it must be registered with the Wazuh manager in order to establish communication. This can be done via the :doc:`command line<./command-line/register>`, :doc:`Authd<../registering/use-registration-service>`, or the :doc:`RESTful API<./restful-api/register>`.

A registered agent will remain in the manager until it is removed by the user. There are four different states that an agent may be in at any given time, as shown in the image below:

.. thumbnail:: ../../images/manual/managing-agents/agent-status.png
    :title: Agent life cycle
    :align: center
    :width: 80%

.. _agent-status-cycle:

Agent status
------------

- **Never connected:** The agent has been registered but has not yet connected to the manager.
- **Pending.** The authentication process is pending: The manager has received a request for connection from the agent but has not received anything else. This may indicate a firewall issue. The agent will be in this state one time in its life cycle.
- **Active:** The agent has successfully connected and can now communicate with the manager.
- **Disconnected:** The manager will consider the agent disconnected if it does not receive any ``keep alive`` messages from the agent within a half an hour.

Removed agent
-------------

The life cycle comes to an end when the agent is removed from the manager. This can be done through the :doc:`RESTful API<./restful-api/remove>`, :doc:`command line<./command-line/remove>`, or Authd (if the force option is enabled).
