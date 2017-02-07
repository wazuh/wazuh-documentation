.. _reference_ossec_monitord:



Monitord
========

+----------------------------+---------------+------------------------------+
| Options                    | Default value | Allowed values               |
+============================+===============+==============================+
| `monitord.day_wait`_       | 10            | A positive number (seconds)  |
+----------------------------+---------------+------------------------------+
| `monitord.compress`_       | 1             | 0, 1                         |
+----------------------------+---------------+------------------------------+
| `monitord.sign`_           | 1             | 0, 1                         |
+----------------------------+---------------+------------------------------+
| `monitord.monitor_agents`_ | 1             | 0, 1                         |
+----------------------------+---------------+------------------------------+


``monitord.day_wait``
---------------------

Ammount of seconds to wait before compressing or signing the files.

.. topic:: Default value

  10

.. topic:: Allowed values

	Any integer


``monitord.compress``
---------------------

Option to compress the log files.

.. topic:: Default value

  1

.. topic:: Allowed values

	1
		To enable
	0
		To disable


``monitord.sign``
-----------------

Option to sign the log files.

.. topic:: Default value

  1

.. topic:: Allowed values

	1
		To enable
	0
		To disable

``monitord.monitor_agents``
---------------------------

Option to monitor agents.

.. topic:: Default value

  1

.. topic:: Allowed values

	1
		To enable
	0
		To disable
