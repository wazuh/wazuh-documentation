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

Amount of seconds to wait before compressing or signing the files.

.. topic:: Default value

  10

.. topic:: Allowed values

	Any integer


``monitord.compress``
---------------------

Toggle to enable or disable log file compression.

.. topic:: Default value

  1

.. topic:: Allowed values

	1
		To enable
	0
		To disable


``monitord.sign``
-----------------

Toggle to enable or disable signing the log files.

.. topic:: Default value

  1

.. topic:: Allowed values

	1
		To enable
	0
		To disable

``monitord.monitor_agents``
---------------------------

Toggle to enable or disable monitoring of agents.

.. topic:: Default value

  1

.. topic:: Allowed values

	1
		To enable
	0
		To disable
