.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out the configuration options of the docker wodle. Learn more about it in this section of the Wazuh documentation.

.. _wodle_docker:

wodle name="docker-listener"
============================

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="docker-listener">
		</wodle>

Configuration options of the Docker wodle.

Options
-------

Main options
^^^^^^^^^^^^

- `attempts`_
- `disabled`_

+----------------------+-----------------------------+
| Main options         | Allowed values              |
+======================+=============================+
| `attempts`_          | A positive number           |
+----------------------+-----------------------------+
| `disabled`_          | yes, no                     |
+----------------------+-----------------------------+

Scheduling options
^^^^^^^^^^^^^^^^^^

- `run_on_start`_
- `interval`_
- `day`_
- `wday`_
- `time`_

attempts
^^^^^^^^

Number of attempts to execute the wodle.

+--------------------+-----------------------------+
| **Default value**  | 5                           |
+--------------------+-----------------------------+
| **Allowed values** | A positive number           |
+--------------------+-----------------------------+

disabled
^^^^^^^^

Disable the Docker wodle.

+--------------------+-----------------------------+
| **Default value**  | no                          |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

run_on_start
^^^^^^^^^^^^

Run command immediately when service is started.

+--------------------+-----------------------------+
| **Default value**  | yes                         |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

interval
^^^^^^^^

Waiting time to rerun the wodle in case it fails.

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1m                                                                                                                                                   |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days), M (months). |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+

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


Example of configuration
------------------------

.. code-block:: xml

    <wodle name="docker-listener">
        <interval>10m</interval>
        <attempts>5</attempts>
        <run_on_start>no</run_on_start>
        <disabled>no</disabled>
    </wodle>
