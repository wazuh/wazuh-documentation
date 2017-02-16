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

This option indicates the priority of the tasks.

Lower value means higher priority.

.. topic:: Default value

  10

.. topic:: Allowed values

	Any integer



``wazuh_modules.debug``
-----------------------

Wazuh modules debug options.

.. topic:: Default value

  0

.. topic:: Allowed values

	0
		No debug
	1
		First level of debug
	2
		Full debugging
