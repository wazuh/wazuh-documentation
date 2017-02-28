.. _reference_wazuh_modules:


Wazuh_modules
=============


+-----------------------------+---------------+---------------------------------+
| Options                     | Default value | Allowed values                  |
+=============================+===============+=================================+
| `wazuh_modules.task_nice`_  | 10            | Any integer                     |
+-----------------------------+---------------+---------------------------------+
| `wazuh_modules.debug`_      | 0             | 0, 1, 2                         |
+-----------------------------+---------------+---------------------------------+


``wazuh_modules.task_nice``
---------------------------

Indicates the priority of the tasks.

The lower the value, the higher the priority.

.. topic:: Default value

  10

.. topic:: Allowed values

	Any integer



``wazuh_modules.debug``
-----------------------

Debug level.

.. topic:: Default value

  0

.. topic:: Allowed values

	0
		No debug output
	1
		Standard debug output
	2
		Verbose debug output
