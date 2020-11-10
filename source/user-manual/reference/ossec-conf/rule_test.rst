.. Copyright (C) 2020 Wazuh, Inc.

.. _reference_ossec_rule_test:

rule_test
=========

.. topic:: XML section name

	.. code-block:: xml

		<rule_test>
		</rule_test>

Here is how to configure the wazuh-logtest module. It allows to test rules and decoders from Wazuh API and Kibana through Wazuh app 

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

Number of wazuh-logtest threads.

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

+--------------------+---------------------------------------------+
| **Default value**  | 15m                                         |
+--------------------+---------------------------------------------+
|                    | A number to represent seconds, to represent |
| **Allowed values** | the interval in minutes adds m, or h to     |
|                    | represent the interval in hours.            |
+--------------------+---------------------------------------------+

Default configuration
---------------------

.. code-block:: xml

	<rule_test>
	    <enabled>yes</enabled>
	    <threads>1</threads>
	    <max_sessions>64</max_sessions>
	    <session_timeout>15m</session_timeout>
	</rule_test>
