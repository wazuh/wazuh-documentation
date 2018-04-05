.. _wodle_command:

wodle name="command"
========================

.. versionadded:: 3.1.0

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="command">
		</wodle>

Configuration options of the Command wodle.

Options
-------

- `disabled`_
- `tag`_
- `command`_
- `interval`_
- `run-on-start`_
- `ignore-output`_
- `timeout`_


+----------------------+-----------------------------+
| Options              | Allowed values              |
+======================+=============================+
| `disabled`_          | yes, no                     |
+----------------------+-----------------------------+
| `tag`_               | A descriptive name          |
+----------------------+-----------------------------+
| `command`_           | Command to be executed      |
+----------------------+-----------------------------+
| `interval`_          | A positive number (seconds) |
+----------------------+-----------------------------+
| `run-on-start`_      | yes, no                     |
+----------------------+-----------------------------+
| `ignore-output`_     | yes, no                     |
+----------------------+-----------------------------+
| `timeout`_           | A positive number (seconds) |
+----------------------+-----------------------------+

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

+--------------------+-----------------------------+
| **Default value**  | N/A                         |
+--------------------+-----------------------------+
| **Allowed values** | An existing command         |
+--------------------+-----------------------------+

interval
^^^^^^^^

Time between commands executions.

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 2s                                                                                                                                       |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days). |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+

run-on-start
^^^^^^^^^^^^^

Run command immediately when service is started.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

ignore-output
^^^^^^^^^^^^^

Ignore the command output when executed.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

timeout
^^^^^^^

.. versionadded:: 3.2.2

Timeout for each command to wait for the end of the execution. Whether this parameter is set to 0, it will wait indefinitely for the end of the process.
However, if the timeout is other than 0, the execution will finished if it expires.

+--------------------+-----------------------------+
| **Default value**  | n/a                         |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

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
    </wodle>

.. note:: See the :doc:`Vuls integration section<../../capabilities/vuls>` for a use case of this command.
