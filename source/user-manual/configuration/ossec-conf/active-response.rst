.. _reference_ossec_active_response:

Active response
===============

.. topic:: XML section name

	.. code-block:: xml

		<active-response>

In the active response configuration you bind the commands already created to events. It is possible to have as many responses as it is need but each one should be inside their own ``<active-response>`` element.

+-----------------------+--------------------------------------+
| Options               | Allowed values                       |
+=======================+======================================+
| `disabled`_           | yes, no                              |
+-----------------------+--------------------------------------+
| `command`_            | Any defined command                  |
+-----------------------+--------------------------------------+
| `location`_           | local, server, defined-agent, all    |
+-----------------------+--------------------------------------+
| `agent_id`_           | Any agent ID                         |
+-----------------------+--------------------------------------+
| `level`_              | Any level from 1 to 16               |
+-----------------------+--------------------------------------+
| `rules_group`_        | Any rule group                       |
+-----------------------+--------------------------------------+
| `rules_id`_           | Any rule ID                          |
+-----------------------+--------------------------------------+
| `timeout`_            | A postive number (seconds)           |
+-----------------------+--------------------------------------+
| `repeated_offenders`_ | A postive number (minutes)           |
+-----------------------+--------------------------------------+

``disabled``
------------

Disables active response if set to yes. If this is not defined active response is enabled on unix systems, and disabled on Windows systems.

Setting it to ``yes`` on an agent will disable active-response for that agent only, while setting it on the server will disable all active-response.

.. note::

    This option is available on server, local, and agent installations.


.. topic:: Default value

    n/a

.. topic:: Allowed values

    The option accepted are: yes, no

``command``
-----------

Used to link the response to the command

.. topic:: Default value

    n/a

.. topic:: Allowed values

    Any defined command

``location``
------------

Where the command should be executed.


.. topic:: Default value

    n/a

.. topic:: Allowed values

	local
		on the agent that generated the event
	server
	 	on the OSSEC server
	defined-agent
	 	on a specific agent (when using this option, you need to set the agent_id to use)
	all
		or everywhere.

``agent_id``
------------

The ID of the agent to execute the response (when defined-agent is set).

.. topic:: Default value

    n/a

.. topic:: Allowed values

    Any agent identification

``level``
---------

The response will be executed on any event with this level or higher.

.. topic:: Default value

    n/a

.. topic:: Allowed values

    Any level from 1 to 16

``rules_group``
---------------

The response will be executed on any event in the defined group.

.. topic:: Default value

    n/a

.. topic:: Allowed values

    Any rule group. Multiple groups can be defined if separated by a comma.

``rules_id``
------------

The response will be executes on any event with the defined ID.

.. topic:: Default value

    n/a

.. topic:: Allowed values

	 Any rule identification. Multiple IDs can be specified if separated by a comma.

``timeout``
-----------

How long in seconds until the reverse command is executed.

.. topic:: Default value

    n/a

.. topic:: Allowed values

	A postive number (seconds)

``repeated_offenders``
----------------------

A comma separated list of increasing timeouts in minutes for repeat offenders.
There can be a maximum of 5 entries. This must be set in the ossec.conf of the agent in
an agent/server setup.


.. topic:: Default value

  n/a

.. topic:: Allowed values

	A postive number (minutes)
