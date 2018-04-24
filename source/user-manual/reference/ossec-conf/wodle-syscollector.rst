.. Copyright (C) 2018 Wazuh, Inc.

.. _wodle-syscollector:

wodle name="syscollector"
==========================

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="syscollector">
		</wodle>

Configuration options of the Syscollector wodle for system monitoring.

Options
-------

- `disabled`_
- `interval`_
- `scan_on_start`_
- `hardware`_
- `os`_
- `packages`_

+----------------------+-----------------------------+
| Options              | Allowed values              |
+======================+=============================+
| `disabled`_          | yes, no                     |
+----------------------+-----------------------------+
| `interval`_          | A positive number (seconds) |
+----------------------+-----------------------------+
| `scan_on_start`_     | yes, no                     |
+----------------------+-----------------------------+
| `hardware`_          | yes, no                     |
+----------------------+-----------------------------+
| `os`_                | yes, no                     |
+----------------------+-----------------------------+
| `packages`_          | yes, no                     |
+----------------------+-----------------------------+


disabled
^^^^^^^^

Disable the Syscollector wodle.

+--------------------+-----------------------------+
| **Default value**  | no                          |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

interval
^^^^^^^^

Time between system scans.

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1h                                                                                                                                       |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days). |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+

scan_on_start
^^^^^^^^^^^^^

Run a system scan immediately when service is started.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

hardware
^^^^^^^^^

Enables the hardware scan.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

os
^^

Enables the OS scan.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

packages
^^^^^^^^^

Enables the packages scan.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+


Example of configuration
------------------------

.. code-block:: xml

	<wodle name="syscollector">
	  <disabled>no</disabled>
	  <interval>1h</interval>
	  <scan_on_start>yes</scan_on_start>
	  <hardware>yes</hardware>
	  <os>yes</os>
	  <packages>yes</packages>
	</wodle>
