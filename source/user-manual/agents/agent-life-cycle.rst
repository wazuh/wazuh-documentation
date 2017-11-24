.. _agent-life-cycle:

Agent life cycle
==================

The life cycle of agents, since they are registered until they are removed, goes through 4 fundamental states which the following image schematizes:

.. thumbnail:: ../../images/manual/managing-agents/agent-status.png
    :title: Agent life cycle
    :align: center
    :width: 100%


Registered agent
-----------------

Once the installation process is complete, the next step is to register the agent. This can be done through :doc:`command line<./command-line/register>`, :doc:`Authd<../registering/use-registration-service>`, or the :doc:`RESTful API<./restful-api/register>`.

Agent status
-------------

- **Never conected:** The agent has been registered but has not yet connected to the manager.
- **Pending.** The authentication process is pending: The manager has received a request for connection from the agent but has not received anything else. This may indicate a firewall issue. The agent will only go through this state once.
- **Active:** The agent has successfully connected and can now report to the manager.
- **Disconnected:**
    - If the connection is made through **UDP**, the manager will consider the agent disconnected if it does not receive any ``keep alive`` from the agent in half an hour.
    - If the connection is made through **TCP**, the manager will consider the agent disconnected immediately after the connection is lost.

Removed agent
--------------

The cycle ends with the removal of the agent. This can be done through the :doc:`RESTful API<./restful-api/remove>`, :doc:`command line<./command-line/remove>`, or Authd (if the force option is enabled).
