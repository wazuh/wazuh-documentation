.. _reference_client_buffer:

client_buffer
=============

.. topic:: XML section name

	.. code-block:: xml

		<client_buffer>
		</client_buffer>

Configure the agent bucket parameters in order to avoid events flooding.

Options
-------

- `disable_buffer`_
- `buffer_length`_
- `events_per_second`_

disable_buffer
^^^^^^^^^^^^^^

This parameter allows to disable the Agent Buffer and send events to the manager without any congestion control.

+--------------------+------------------------------------------------+
| **Default value**  | **no**                                         |
+--------------------+------------------------------------------------+
| **Allowed values** | The options accepted are **yes** and **no**.   |
+--------------------+------------------------------------------------+

.. warning::
	Disabling this functionality in large environments, agents may collapse the manager and the network.


buffer_length
^^^^^^^^^^^^^

The capacity of Agent Buffer in number of events.

+--------------------+----------------------------------+
| **Default value**  | 5000                             |
+--------------------+----------------------------------+
| **Allowed values** | Any number between 1 and 100000. |
+--------------------+----------------------------------+

events_per_second
^^^^^^^^^^^^^^^^^

Specifies the number of events sent to the manager per second.

+--------------------+----------------------------------+
| **Default value**  | 500                              |
+--------------------+----------------------------------+
| **Allowed values** | Any number between 1 and 1000.   |
+--------------------+----------------------------------+

Default configuration
---------------------

.. code-block:: xml

    <client_buffer>
      <!-- Agent buffer options -->
      <disable>no</disable>
      <length>5000</length>
      <events_per_second>500</events_per_second>
    </client_buffer>
