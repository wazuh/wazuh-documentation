.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out the main configuration options and the allowed values of the command wodle in this section of our documentation. 
  
.. _wodle_command:

wodle name="command"
====================

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="command">
		</wodle>

Configuration options of the Command wodle.

Options
-------

Main options
^^^^^^^^^^^^

- `disabled`_
- `tag`_
- `command`_
- `ignore_output`_
- `timeout`_
- `verify_md5`_
- `verify_sha1`_
- `verify_sha256`_
- `skip_verification`_

+----------------------+-----------------------------+
| Main options         | Allowed values              |
+======================+=============================+
| `disabled`_          | yes, no                     |
+----------------------+-----------------------------+
| `tag`_               | A descriptive name          |
+----------------------+-----------------------------+
| `command`_           | Command to be executed      |
+----------------------+-----------------------------+
| `ignore_output`_     | yes, no                     |
+----------------------+-----------------------------+
| `timeout`_           | A positive number (seconds) |
+----------------------+-----------------------------+
| `verify_md5`_        | MD5 checksum                |
+----------------------+-----------------------------+
| `verify_sha1`_       | SHA1 checksum               |
+----------------------+-----------------------------+
| `verify_sha256`_     | SHA256 checksum             |
+----------------------+-----------------------------+
| `skip_verification`_ | yes, no                     |
+----------------------+-----------------------------+

Scheduling options
^^^^^^^^^^^^^^^^^^

- `run_on_start`_
- `interval`_
- `day`_
- `wday`_
- `time`_

disabled
^^^^^^^^

Disable the Command wodle.

+--------------------+-----------------------------+
| **Default value**  | no                          |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

tag
^^^

Descriptive name for the command.

+--------------------+-----------------------------+
| **Default value**  | N/A                         |
+--------------------+-----------------------------+
| **Allowed values** | Characters set              |
+--------------------+-----------------------------+

command
^^^^^^^

Path and arguments of the command to be executed.

+--------------------+-----------------------+
| **Default value**  | N/A                   |
+--------------------+-----------------------+
| **Allowed values** | - An existing command |
|                    | - Path to a binary    |
|                    | - Path to a script    |
+--------------------+-----------------------+

ignore_output
^^^^^^^^^^^^^

Ignore the command output when executed.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

timeout
^^^^^^^

Timeout for each command to wait for the end of the execution. Whether this parameter is set to 0, it will wait indefinitely for the end of the process.
However, if the timeout is other than 0, the execution will finish if it expires.

+--------------------+-----------------------------+
| **Default value**  | n/a                         |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+


verify_md5
^^^^^^^^^^

Verify the MD5 sum of the binary or the script specified on the command option.

+--------------------+--------------+
| **Default value**  | n/a          |
+--------------------+--------------+
| **Allowed values** | MD5 checksum |
+--------------------+--------------+


verify_sha1
^^^^^^^^^^^

Verify the SHA1 sum of the binary or the script specified on the command option.

+--------------------+---------------+
| **Default value**  | n/a           |
+--------------------+---------------+
| **Allowed values** | SHA1 checksum |
+--------------------+---------------+


verify_sha256
^^^^^^^^^^^^^

Verify the SHA256 sum of the binary or the script specified on the command option.

+--------------------+-----------------+
| **Default value**  | n/a             |
+--------------------+-----------------+
| **Allowed values** | SHA256 checksum |
+--------------------+-----------------+


skip_verification
^^^^^^^^^^^^^^^^^

Run the command defined, although the checksum does not match.
In this case, the agent will log that the checksum verification failed but will run the application.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

run_on_start
^^^^^^^^^^^^

Run command immediately when service is started.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

.. _wodle_command_interval:

interval
^^^^^^^^

Time between commands executions.

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 2s                                                                                                                                                   |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days), M (months). |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+

.. _wodle_command_day:

day
^^^

Day of the month to run the scan.

+--------------------+--------------------------+
| **Default value**  | n/a                      |
+--------------------+--------------------------+
| **Allowed values** | Day of the month [1..31] |
+--------------------+--------------------------+

.. note::

	When the ``day`` option is set, the interval value must be a multiple of months. By default, the interval is set to a month.

.. _wodle_command_wday:

wday
^^^^

Day of the week to run the scan. This option is **not compatible** with the ``day`` option.

+--------------------+--------------------------+
| **Default value**  | n/a                      |
+--------------------+--------------------------+
| **Allowed values** | Day of the week:         |
|                    |   - sunday/sun           |
|                    |   - monday/mon           |
|                    |   - tuesday/tue          |
|                    |   - wednesday/wed        |
|                    |   - thursday/thu         |
|                    |   - friday/fri           |
|                    |   - saturday/sat         |
+--------------------+--------------------------+

.. note::

	When the ``wday`` option is set, the interval value must be a multiple of weeks. By default, the interval is set to a week.

.. _wodle_command_time:

time
^^^^

Time of the day to run the scan. It has to be represented in the format *hh:mm*.

+--------------------+-----------------------+
| **Default value**  | n/a                   |
+--------------------+-----------------------+
| **Allowed values** | Time of day *[hh:mm]* |
+--------------------+-----------------------+

.. note::

	When only the ``time`` option is set, the interval value must be a multiple of days or weeks. By default, the interval is set to a day.


Centralized configuration
-------------------------

Remote commands may be specified in the :ref:`centralized configuration <reference_agent_conf>`, however, they are disabled by default due to security reasons.

When setting commands in a shared agent configuration, **you must enable remote commands for Agent Modules**.

This is enabled by adding the following line to the file *etc/local_internal_options.conf* in the agent:

.. code-block:: shell

    wazuh_command.remote_commands=1

Example of configuration
------------------------

.. code-block:: xml

    <wodle name="command">
      <disabled>no</disabled>
      <tag>test</tag>
      <command>/bin/bash /root/script.sh</command>
      <interval>1d</interval>
      <ignore_output>no</ignore_output>
      <run_on_start>yes</run_on_start>
      <timeout>0</timeout>
      <verify_md5>5aada3704685dad6fd27beb58e6687de</verify_md5>
      <verify_sha1>da39a3ee5e6b4b0d3255bfef95601890afd80709</verify_sha1>
      <verify_sha256>292a188e498caea5c5fbfb0beca413c980e7a5edf40d47cf70e1dbc33e4f395e</verify_sha256>
    </wodle>
