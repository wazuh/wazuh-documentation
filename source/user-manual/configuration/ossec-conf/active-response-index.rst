.. _reference_ossec_active_response_index:


Active response
===============

Active responses each run a command, often some kind of countermeasure like a firewall block, when a specific rule or rule type fires and certain other criteria are met.  Stateful commands undo their actions after a configurable period of time.  Stateless commands are one-time actions that are not undone (i.e., a command to restart the agent when a change to agent.conf is detected).

There are two parts to an active response configuration. The first is the `command <commands.html>`_  section. This defines the command to be run, and the options it will use.

The second is the `Active response <active-response.html>`_ section. This section defines the criteria for when a command will be run and the length of time until the command will be undone if it is stateful.

.. topic:: Sections

    .. toctree::
       :maxdepth: 1

       commands
       active-response
