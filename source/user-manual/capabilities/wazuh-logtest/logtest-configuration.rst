.. Copyright (C) 2020 Wazuh, Inc.

.. _logtest_configuration:

Configuration
=============

Wazuh logetest is a functionality provided by the manager, whose work parameters are configured in the :ref:`ossec.conf <reference_ossec_conf>` file in the section :ref:`rule_test <reference_ossec_rule_test>`.

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
| threads         | Number of wazuh-logtest threads              |                | a number between 1 and 128,     |
|                 |                                              |       1        | or auto to create one thread    |
|                 |                                              |                | per CPU                         |
+-----------------+----------------------------------------------+----------------+---------------------------------+
| max_sessions    | Number of users connected simultaneously     |      64        | A number between 1 and 500      |
+-----------------+----------------------------------------------+----------------+---------------------------------+
| session_timeout | Time interval in which a client must remain  |                | A number to represent seconds,  |
|                 | offline to remove the resources associated   |      15m       | to represent the interval in    |
|                 | with their session                           |                | minutes adds m, or h to         |
|                 |                                              |                | represent the interval in hours.|
+-----------------+----------------------------------------------+----------------+---------------------------------+
