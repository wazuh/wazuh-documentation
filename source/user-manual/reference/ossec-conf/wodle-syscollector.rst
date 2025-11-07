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

Configuration options of the Syscollector wodle for :doc:`system inventory </user-manual/capabilities/system-inventory/index>`.

Options
-------

.. contents::
   :local:
   :depth: 2
   :backlinks: none

+-------------------------------------------------+-----------------------------+
| Options                                         | Allowed values              |
+=================================================+=============================+
| `disabled`_                                     | yes, no                     |
+-------------------------------------------------+-----------------------------+
| :ref:`interval <wodle_syscollector_interval>`   | A positive number (seconds) |
+-------------------------------------------------+-----------------------------+
| `scan_on_start`_                                | yes, no                     |
+-------------------------------------------------+-----------------------------+
| `hardware`_                                     | yes, no                     |
+-------------------------------------------------+-----------------------------+
| `os`_                                           | yes, no                     |
+-------------------------------------------------+-----------------------------+
| `network`_                                      | yes, no                     |
+-------------------------------------------------+-----------------------------+
| `packages`_                                     | yes, no                     |
+-------------------------------------------------+-----------------------------+
| `ports`_                                        | yes, no                     |
+-------------------------------------------------+-----------------------------+
| `processes`_                                    | yes, no                     |
+-------------------------------------------------+-----------------------------+
| `hotfixes`_                                     | yes, no                     |
+-------------------------------------------------+-----------------------------+
| :ref:`max_eps <wodle_syscollector_max_eps>`     | Integer (0-1000000)         |
+-------------------------------------------------+-----------------------------+
| `notify_first_scan`_                            | yes, no                     |
+-------------------------------------------------+-----------------------------+

disabled
^^^^^^^^

Disable the Syscollector wodle.

+--------------------+-----------------------------+
| **Default value**  | no                          |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

.. _wodle_syscollector_interval:

interval
^^^^^^^^

Time between system scans.

+--------------------+-----------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1h                                                                                                                          |
+--------------------+-----------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number with a suffix character for the time unit. Use ``s`` for seconds, ``m`` for minutes, ``h`` for hours, and |
|                    | ``d`` for days. If the configured value is lower than 60 seconds, it automatically adjusts it to 60 seconds.                |
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


.. _wodle_syscollector_max_eps:

max_eps
^^^^^^^

Sets the maximum throughput for reporting events. Events are messages that trigger alerts.

+--------------------+---------------------------------------------------------+
| **Default value**  | 50                                                      |
+--------------------+---------------------------------------------------------+
| **Allowed values** | Integer number between 0 and 1000000. 0 means disabled. |
+--------------------+---------------------------------------------------------+

Example:

.. code-block:: xml

   <max_eps>50</max_eps>

notify_first_scan
^^^^^^^^^^^^^^^^^

Specifies whether the first scan reports stateless events.

+--------------------+----------+
| **Default value**  | no       |
+--------------------+----------+
| **Allowed values** | yes, no  |
+--------------------+----------+

Example:

.. code-block:: xml

   <notify_first_scan>no</notify_first_scan>

synchronization
^^^^^^^^^^^^^^^

The database synchronization settings are configured inside this tag.

.. code-block:: xml

	<wodle name="syscollector">
	  <synchronization>
	    <enabled>yes</enabled>
	    <interval>5m</interval>
	    <response_timeout>30</response_timeout>
	    <max_eps>10</max_eps>
	  </synchronization>
	</wodle>

.. _wodle_syscollector_synchronization_enabled:

enabled
~~~~~~~

Specifies whether to perform periodic inventory synchronizations.

+--------------------+--------------+
| **Default value**  | yes          |
+--------------------+--------------+
| **Allowed values** | yes, no      |
+--------------------+--------------+

.. _wodle_syscollector_synchronization_interval:

interval
~~~~~~~~

Specifies the initial interval between inventory synchronizations.

+--------------------+-----------------------------------------------------------------------+
| **Default value**  | 5 m                                                                   |
+--------------------+-----------------------------------------------------------------------+
| **Allowed values** | Any number greater than or equal to 0. Allowed suffixes (s, m, h, d). |
+--------------------+-----------------------------------------------------------------------+

.. _wodle_syscollector_synchronization_response_timeout:

response_timeout
~~~~~~~~~~~~~~~~

Waiting time in seconds between a sync message and the next synchronization.

+--------------------+----------------------------------------------------------------------+
| **Default value**  | 30                                                                   |
+--------------------+----------------------------------------------------------------------+
| **Allowed values** | Any number between 0 and ``interval``.                               |
+--------------------+----------------------------------------------------------------------+

.. _wodle_syscollector_synchronization_max_eps:

max_eps
~~~~~~~

Sets the maximum throughput for synchronization messages.

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
	  <ports all="yes">yes</ports>
	  <processes>yes</processes>
	  <max_eps>50</max_eps>
	  <notify_first_scan>no</notify_first_scan>

	  <!-- Database synchronization settings -->
	  <synchronization>
	    <enabled>yes</enabled>
	    <interval>5m</interval>
	    <response_timeout>30</response_timeout>
	    <max_eps>10</max_eps>
	  </synchronization>
	</wodle>
