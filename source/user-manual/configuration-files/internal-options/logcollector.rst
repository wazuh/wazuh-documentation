.. _reference_ossec_logcollector:



Logcollector
============

+---------------------------------+---------------+------------------------------+
| Options                         | Default value | Allowed values               |
+=================================+===============+==============================+
| `logcollector.loop_timeout`_    | 2             | A positive number (seconds)  |
+---------------------------------+---------------+------------------------------+
| `logcollector.open_attempts`_   | 8             | Any integer                  |
+---------------------------------+---------------+------------------------------+
| `logcollector.remote_commands`_ | 0             | 0, 1                         |
+---------------------------------+---------------+------------------------------+
| `logcollector.vcheck_files`_    | 64            | Any integer                  |
+---------------------------------+---------------+------------------------------+
| `logcollector.debug`_           | 0             | 0, 1, 2                      |
+---------------------------------+---------------+------------------------------+


``logcollector.loop_timeout``
-----------------------------

Logcollector file loop timeout, check every 2 seconds for file changes.


.. topic:: Default value

  2

.. topic:: Allowed values

	Any integer, time in seconds


``logcollector.open_attempts``
------------------------------

Number of attempts to open a log file.


.. topic:: Default value

  8

.. topic:: Allowed values

	Any integer

``logcollector.remote_commands``
--------------------------------

Indicate if Logcollector should accept remote commands from the manager.


.. topic:: Default value

  0

.. topic:: Allowed values

	1
		To enable
	0
		To disable


``logcollector.vcheck_files``
-----------------------------

Number of readings before checking files.


.. topic:: Default value

  64

.. topic:: Allowed values

	Any integer

``logcollector.debug``
----------------------

Debug options of logcollector in server, local or unix agent installations.


.. topic:: Default value

  0

.. topic:: Allowed values

	0
		No debug
	1
		First level of debug
	2
		Full debugging
