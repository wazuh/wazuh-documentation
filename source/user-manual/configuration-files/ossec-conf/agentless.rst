.. _reference_ossec_agentless:

Agentless
=========

.. topic:: XML section name

	.. code-block:: xml

		<agentless>

Agentless monitoring allows you to run integrity checking on systems without an agent installed.

+--------------+----------------------------------------------------------------+
| Options      | Allowed values                                                 |
+==============+================================================================+
| `frequency`_ | A positive number (seconds)                                    |
+--------------+----------------------------------------------------------------+
| `host`_      | Any username and host (user@hostname)                          |
+--------------+----------------------------------------------------------------+
| `state`_     | periodic, periodic_diff                                        |
+--------------+----------------------------------------------------------------+
| `arguments`_ | Any file name or directory                                     |
+--------------+----------------------------------------------------------------+


``frequency``
-------------

This controls the number of seconds between each run.


.. topic:: Default value

    n/a

.. topic:: Allowed values

	A positive number (seconds)


``host``
--------

This defines the username and the agentless host.

.. topic:: Default value

    n/a

.. topic:: Allowed values

	Any username and host (user@hostname)

``state``
---------

This determines whether the checks are periodic or periodic_diff.

.. topic:: Default value

    n/a

.. topic:: Allowed values

	periodic
		The output from the scripts is processed by the OSSEC processes
	periodic_diff
		The output from the scripts is compared to the output of previous runs

``arguments``
-------------

This defines the arguments passed to the script

.. topic:: Default value

    n/a

.. topic:: Allowed values

	List of files to be monitored
