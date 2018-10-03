.. Copyright (C) 2018 Wazuh, Inc.

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
- :ref:`disable <legacy_disable>`
- `queue_size`_
- :ref:`length <legacy_length>`
- `events_per_second`_

disabled
^^^^^^^^

Toggles the agent buffer on and off. When set to ``yes``, the agent will send events to the manager without any congestion control.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

.. warning::
	Disabling this functionality in large environments may overwhelm the manager and the network causing them to fail.

.. _legacy_disable:

disable
^^^^^^^

.. deprecated:: 3.1.0

Toggles the agent buffer on and off. When set to ``yes``, the agent will send events to the manager without any congestion control. Due to compatibility issues, it is recommended that this option be replaced by the `disabled`_ parameter.

+--------------------+---------------------+
| **Default value**  | no                  |
+--------------------+---------------------+
| **Allowed values** | yes, no             |
+--------------------+---------------------+

.. warning::
	Disabling this functionality in large environments may overwhelm the manager and the network causing them to fail.

queue_size
^^^^^^^^^^

Sets the capacity of the agent buffer in number of events.

+--------------------+----------------------------------+
| **Default value**  | 5000                             |
+--------------------+----------------------------------+
| **Allowed values** | Any number between 1 and 100000. |
+--------------------+----------------------------------+

.. _legacy_length:

length
^^^^^^

.. deprecated:: 3.0.0

Sets the capacity of the agent buffer in number of events.

+--------------------+----------------------------------+
| **Default value**  | 5000                             |
+--------------------+----------------------------------+
| **Allowed values** | Any number between 1 and 100000. |
+--------------------+----------------------------------+

.. warning::

    Even if this field is accepted, it is recommended that it be replaced with the `queue_size`_ parameter.

events_per_second
^^^^^^^^^^^^^^^^^

Specifies the number of events that can be sent to the manager per second.

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
