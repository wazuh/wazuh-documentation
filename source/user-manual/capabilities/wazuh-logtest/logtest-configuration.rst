.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh-Logtest solution was designed to replace ossec-logtest. It allows you to test and verify rules and decoders remotely. Learn how it works here. 
  
.. _logtest_configuration:

Configuration
=============

Wazuh-Logtest is a functionality provided by the manager, whose work parameters are configured in the :ref:`ossec.conf <reference_ossec_conf>` file in the section :ref:`rule_test <reference_ossec_rule_test>`.

By default, the configuration is:

.. code-block:: xml

	<rule_test>
	    <enabled>yes</enabled>
	    <threads>1</threads>
	    <max_sessions>64</max_sessions>
	    <session_timeout>15m</session_timeout>
	</rule_test>

And it has the following configuration parameters

+-----------------+----------------------------------------------+----------------+---------------------------------+
|    Parameter    |                Description                   |    Default     |    Values allowed               |
+=================+==============================================+================+=================================+
| enabled         | Determine if logtet is enabled  or disabled  |      yes       | yes/no                          |
+-----------------+----------------------------------------------+----------------+---------------------------------+
| threads         | Number of Wazuh-Logtest threads              |                | a number between 1 and 128,     |
|                 |                                              |       1        | or `auto` to create one         |
|                 |                                              |                | thread per CPU                  |
+-----------------+----------------------------------------------+----------------+---------------------------------+
| max_sessions    | Number of users connected simultaneously     |      64        | A number between 1 and 500      |
+-----------------+----------------------------------------------+----------------+---------------------------------+
| session_timeout | Time interval in which a client must remain  |                | A positive number that should   |
|                 | offline to remove the resources associated   |      15m       | contain a suffix character      |
|                 | with their session                           |                | indicating a time unit, such as,|
|                 |                                              |                | s (seconds), m (minutes),       |
|                 |                                              |                | h (hours).                      |
|                 |                                              |                | The max value is 365 days       |
+-----------------+----------------------------------------------+----------------+---------------------------------+
