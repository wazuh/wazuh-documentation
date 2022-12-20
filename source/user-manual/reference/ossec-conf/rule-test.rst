.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out how to configure the wazuh-logtest solution to test rules and decoders. Learn more about it in this section.

.. _reference_ossec_rule_test:

rule_test
=========

.. topic:: XML section name

	.. code-block:: xml

		<rule_test>
		</rule_test>

Here is how to configure the Wazuh-Logtest solution. It allows to test rules and decoders from Wazuh API and :ref:`wazuh-logtest tool <wazuh-logtest>`

Options
-------

- `enabled`_
- `threads`_
- `max_sessions`_
- `session_timeout`_



enabled
^^^^^^^

Enables the module.

+--------------------+------------------------+
| **Default value**  | yes                    |
+--------------------+------------------------+
| **Allowed values** | yes/no                 |
+--------------------+------------------------+

threads
^^^^^^^

Number of Wazuh-Logtest solution threads.

+--------------------+---------------------------------+
| **Default value**  | 1                               |
+--------------------+---------------------------------+
|                    | a number between 1 and 128,     |
| **Allowed values** | or `auto` to create one thread  |
|                    | per CPU                         |
+--------------------+---------------------------------+

max_sessions
^^^^^^^^^^^^

Max number of users connected simultaneously.

+--------------------+---------------------------------+
| **Default value**  | 1                               |
+--------------------+---------------------------------+
| **Allowed values** | A number between 1 and 500      |
+--------------------+---------------------------------+

session_timeout
^^^^^^^^^^^^^^^

Time required to delete a session and its resources after the last user interaction.

+--------------------+----------------------------------------------+
| **Default value**  | 15m                                          |
+--------------------+----------------------------------------------+
|                    | A number to represent seconds, to represent  |
| **Allowed values** | suffix character indicating a time unit,     |
|                    | such as s (seconds), m (minutes), h (hours). |
|                    | The max value is 365 days                    |
+--------------------+----------------------------------------------+

Default configuration
---------------------

.. code-block:: xml

	<rule_test>
	    <enabled>yes</enabled>
	    <threads>1</threads>
	    <max_sessions>64</max_sessions>
	    <session_timeout>15m</session_timeout>
	</rule_test>
