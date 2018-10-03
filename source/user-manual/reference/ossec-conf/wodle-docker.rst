.. Copyright (C) 2018 Wazuh, Inc.

.. _wodle_docker:

wodle name="docker"
===================

.. versionadded:: 3.7.0

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="docker">
		</wodle>

Configuration options of the Docker wodle.

Options
-------

- `interval`_
- `attempts`_
- `run_on_start`_
- `disabled`_

+----------------------+-----------------------------+
| Options              | Allowed values              |
+======================+=============================+
| `interval`_          | A positive number           |
+----------------------+-----------------------------+
| `attempts`_          | A positive number           |
+----------------------+-----------------------------+
| `run_on_start`_      | yes, no                     |
+----------------------+-----------------------------+
| `disabled`_          | yes, no                     |
+----------------------+-----------------------------+

interval
^^^^^^^^

Time to wait to try the execution of this wodle again.

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1h                                                                                                                                       |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days)  |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+

attempts
^^^^^^^^

Number of attempts to restart the wodle.

+--------------------+-----------------------------+
| **Default value**  | 5                           |
+--------------------+-----------------------------+
| **Allowed values** | A positive number           |
+--------------------+-----------------------------+

run_on_start
^^^^^^^^^^^^

Run command immediately when service is started.

+--------------------+-----------------------------+
| **Default value**  | yes                         |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

disabled
^^^^^^^^

Disable the Docker wodle.

+--------------------+-----------------------------+
| **Default value**  | yes                         |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+


Example of configuration
------------------------

.. code-block:: xml

    <wodle name="command">
      <interval>2h</interval>
      <attemps>5</attemps>
      <run_on_start>no</run_on_start>
      <disabled>no</disabled>
    </wodle>