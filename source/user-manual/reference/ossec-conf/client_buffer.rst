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

- `disabled`_
- :ref:`disable <legacy_disable>`
- `queue_size`_
- :ref:`length <legacy_length>`
- `events_per_second`_

disabled
^^^^^^^^^^^^^^

This parameter allows to disable the Agent Buffer and send events to the manager without any congestion control.

+--------------------+------------------------------------------------+
| **Default value**  | **no**                                         |
+--------------------+------------------------------------------------+
| **Allowed values** | The options accepted are **yes** and **no**.   |
+--------------------+------------------------------------------------+

.. warning::
	Disabling this functionality in large environments, agents may collapse the manager and the network.

.. _legacy_disable:

disable
^^^^^^^^^^^^^^

.. deprecated:: 3.1

This parameter allows to disable the Agent Buffer and send events to the manager without any congestion control.
Due to compatibility issues, it is better to **replace** this option by `disabled`_.

+--------------------+------------------------------------------------+
| **Default value**  | **no**                                         |
+--------------------+------------------------------------------------+
| **Allowed values** | The options accepted are **yes** and **no**.   |
+--------------------+------------------------------------------------+

queue_size
^^^^^^^^^^^^^

The capacity of Agent Buffer in number of events.

+--------------------+----------------------------------+
| **Default value**  | 5000                             |
+--------------------+----------------------------------+
| **Allowed values** | Any number between 1 and 100000. |
+--------------------+----------------------------------+

.. _legacy_length:

length
^^^^^^^

.. deprecated:: 3.0

The capacity of Agent Buffer in number of events.

+--------------------+----------------------------------+
| **Default value**  | 5000                             |
+--------------------+----------------------------------+
| **Allowed values** | Any number between 1 and 100000. |
+--------------------+----------------------------------+

.. warning::

    Even if this field is accepted, it is recommended to replace it with `queue_size`_.

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
      <disabled>no</disabled>
      <queue_size>5000</queue_size>
      <events_per_second>500</events_per_second>
    </client_buffer>
