.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out how to configure the agent bucket parameters in order to avoid events flooding. Learn more about it in this section of the Wazuh documentation.

.. _reference_client_buffer:

client_buffer
=============

.. topic:: XML section name

	.. code-block:: xml

		<client_buffer>
		</client_buffer>

This section shows how to configure the agent bucket parameters in order to avoid events flooding.

Options
-------

- `disabled`_
- `queue_size`_
- `events_per_second`_
- `eps_timeframe`_

disabled
^^^^^^^^

Toggles the agent buffer on and off. When set to ``yes``, the agent will send events to the manager without any congestion control.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

.. warning::
	Disabling this functionality in large environments may overwhelm the manager and the network, causing them to fail.

queue_size
^^^^^^^^^^

Sets the capacity of the agent buffer in number of events.

+--------------------+----------------------------------+
| **Default value**  | 5000                             |
+--------------------+----------------------------------+
| **Allowed values** | Any number between 1 and 100000. |
+--------------------+----------------------------------+

events_per_second
^^^^^^^^^^^^^^^^^

Specifies the number of events that can be sent to the manager per second.

+--------------------+----------------------------------+
| **Default value**  | 500                              |
+--------------------+----------------------------------+
| **Allowed values** | Any number between 0 and 100000. |
+--------------------+----------------------------------+

.. note::
	Setting this option to 0 removes the limit of events per second, allowing the maximum event sending rate.

eps_timeframe
^^^^^^^^^^^^^

Defines the time interval in seconds used to restore the number of events available for sending. This setting does not change the events per second on average. Every ``eps_timeframe`` seconds, a total of ``eps_timeframe`` x ``events_per_seconds`` events are sent before waiting for the new interval.

+--------------------+----------------------------------+
| **Default value**  | 1                                |
+--------------------+----------------------------------+
| **Allowed values** | Any number between 1 and 3600.   |
+--------------------+----------------------------------+

Default configuration
---------------------

.. code-block:: xml

    <client_buffer>
      <!-- Agent buffer options -->
      <disabled>no</disabled>
      <queue_size>5000</queue_size>
      <events_per_second>500</events_per_second>
    </client_buffer>
