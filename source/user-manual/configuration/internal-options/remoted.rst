.. _reference_ossec_remoted:



Remoted
=======

+----------------------------------+---------------+----------------+
| Options                          | Default value | Allowed values |
+==================================+===============+================+
| `remoted.recv_counter_flush`_    | 128           | Any integer    |
+----------------------------------+---------------+----------------+
| `remoted.comp_average_printout`_ | 19999         | Any integer    |
+----------------------------------+---------------+----------------+
| `remoted.verify_msg_id`_         | 0             | 0, 1           |
+----------------------------------+---------------+----------------+
| `remoted.pass_empty_keyfile`_    | 1             | 0, 1           |
+----------------------------------+---------------+----------------+
| `remoted.debug`_                 | 0             | 0, 1, 2        |
+----------------------------------+---------------+----------------+


``remoted.recv_counter_flush``
------------------------------

Flush rate for the receive counter.


.. topic:: Default value

  128

.. topic:: Allowed values

	Any integer


``remoted.comp_average_printout``
---------------------------------

Compression averages printout.


.. topic:: Default value

  19999

.. topic:: Allowed values

	Any integer


``remoted.verify_msg_id``
-------------------------

Toggle to enable or disable verification of msg id.


.. topic:: Default value

  0

.. topic:: Allowed values

	1
		To enable
	0
		To disable


``remoted.pass_empty_keyfile``
------------------------------

Toggle to enable or disable acceptance of empty client.keys.


.. topic:: Default value

  1

.. topic:: Allowed values

	1
		To enable
	0
		To disable


``remoted.debug``
-----------------

Debug level (used in server installations).


.. topic:: Default value

  0

.. topic:: Allowed values

	0
		No debug output
	1
		Standard debug output
	2
		Verbose debug output
