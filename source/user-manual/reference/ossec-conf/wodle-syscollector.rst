.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
	:description: Check out this section about the local configuration of Wazuh and learn about the configuration options of the syscollector wodle.

.. _wodle-syscollector:

wodle name="syscollector"
==========================

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="syscollector">
		</wodle>

Configuration options of the Syscollector wodle for :ref:`system inventory <system_inventory>`.

Options
-------

- `disabled`_
- `interval`_
- `scan_on_start`_
- `hardware`_
- `os`_
- `network`_
- `packages`_
- `ports`_
- `hotfixes`_
- `synchronization`_


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
| `network`_           | yes, no                     |
+----------------------+-----------------------------+
| `packages`_          | yes, no                     |
+----------------------+-----------------------------+
| `ports`_             | yes, no                     |
+----------------------+-----------------------------+
| `processes`_         | yes, no                     |
+----------------------+-----------------------------+
| `hotfixes`_          | yes, no                     |
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

+--------------------+-----------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1h                                                                                                                          |
+--------------------+-----------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number with a suffix character for the time unit. Use ``s`` for seconds, ``m`` for minutes, ``h`` for hours, and |
|                    | ``d`` for days. If a value lower than 60 seconds is configured, it automatically adjusts it to 60 seconds.                  |
+--------------------+-----------------------------------------------------------------------------------------------------------------------------+

scan_on_start
^^^^^^^^^^^^^

Run a system scan immediately when the service is started.

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

network
^^^^^^^

Enables the network scan.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

packages
^^^^^^^^

Enables the scan of the packages.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

ports
^^^^^

Enables the ports scan.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

With option **all='no'** it will only scan listening ports.

+----------------------+-----------------------------+
| Options              | Allowed values              |
+======================+=============================+
| **all**              | yes, no                     |
+----------------------+-----------------------------+

processes
^^^^^^^^^

Enables the scan of the processes.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

.. _wodle_syscollector_hotfixes:

hotfixes
^^^^^^^^

Enables the hotfixes scan. It reports the Windows updates installed.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

.. note::
  This option is enabled by default but not included in the initial configuration.


synchronization
^^^^^^^^^^^^^^^

The database synchronization settings are configured inside this tag.

.. code-block:: xml

	<wodle name="syscollector">
	  <synchronization>
	    <max_eps>10</max_eps>
	  </synchronization>
	</wodle>

max_eps
^^^^^^^

Sets the maximum event reporting throughput.

+--------------------+--------------------------------------------------------------+
| **Default value**  | 10                                                           |
+--------------------+--------------------------------------------------------------+
| **Allowed values** | Integer number between 0 and 1000000. 0 means default value. |
+--------------------+--------------------------------------------------------------+


Example of configuration
------------------------

.. code-block:: xml

	<wodle name="syscollector">
	  <disabled>no</disabled>
	  <interval>1h</interval>
	  <scan_on_start>yes</scan_on_start>
	  <hardware>yes</hardware>
	  <os>yes</os>
	  <network>yes</network>
	  <packages>yes</packages>
	  <ports all="no">yes</ports>
	  <processes>yes</processes>

	  <!-- Database synchronization settings -->
	  <synchronization>
	    <max_eps>10</max_eps>
	  </synchronization>
	</wodle>
