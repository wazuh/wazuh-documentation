.. Copyright (C) 2018 Wazuh, Inc.

.. _wodle_ciscat:

wodle name="cis-cat"
========================

.. versionadded:: 3.1.0

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="cis-cat">
		</wodle>

Configuration options of the CIS-CAT wodle.

.. warning::
    CIS-CAT is not installed by default. It is a proprietary software that you have to obtain for using this module.

Main options
------------

- `disabled`_
- `timeout`_
- `java_path`_
- `ciscat_path`_
- `content`_


+----------------------+-----------------------------+
| Main options         | Allowed values              |
+======================+=============================+
| `disabled`_          | yes, no                     |
+----------------------+-----------------------------+
| `timeout`_           | A positive number (seconds) |
+----------------------+-----------------------------+
| `java_path`_         | Any valid path              |
+----------------------+-----------------------------+
| `ciscat_path`_       | Any valid path              |
+----------------------+-----------------------------+
| `content`_           | N/A                         |
+----------------------+-----------------------------+

Scheduling options
------------------

- `scan-on-start`_
- `interval`_
- `day`_
- `wday`_
- `time`_


+----------------------+-----------------------------+
| Scheduling options   | Allowed values              |
+======================+=============================+
| `scan-on-start`_     | yes, no                     |
+----------------------+-----------------------------+
| `interval`_          | A positive number + suffix  |
+----------------------+-----------------------------+
| `day`_               | A day of the month          |
+----------------------+-----------------------------+
| `wday`_              | A day of the week           |
+----------------------+-----------------------------+
| `time`_              | A time of the day *[hh:mm]* |
+----------------------+-----------------------------+

In the :doc:`CIS-CAT integration <../../capabilities/policy-monitoring/ciscat/ciscat>` section are shown some cases of using these options.

Main options
------------

disabled
^^^^^^^^

Disables the CIS-CAT wodle.

+--------------------+-----------------------------+
| **Default value**  | no                          |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

timeout
^^^^^^^

Timeout for each evaluation. In case the execution takes longer that the specified timeout, it stops.

+--------------------+-----------------------------+
| **Default value**  | 1800                        |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+


java_path
^^^^^^^^^^

Define where Java is located. If this parameter is not set, the wodle will search for the Java location in the default environment variable ``$PATH``.

+--------------------+------------------+
| **Default value**  | wodles/java      |
+--------------------+------------------+
| **Allowed values** | Any valid path.  |
+--------------------+------------------+

.. warning::
    For this field, it can be set a full path or a relative path. Whether you specify a relative path, it concatenates to the Wazuh installation path. ``ciscat_path`` has the same behavior.

ciscat_path
^^^^^^^^^^^^

Define where CIS-CAT is located.

+--------------------+----------------------------+
| **Default value**  | wodles/ciscat              |
+--------------------+----------------------------+
| **Allowed values** | Any valid path.            |
+--------------------+----------------------------+

content
^^^^^^^

Define an evaluation. At present, you can only run assessments for XCCDF policy files.

Attributes

+-------------------+-------------------------------------------------------------+
| **type**          | Select content type.                                        |
+-------------------+-------------------------------------------------------------+
| **path**          | Use the specified policy file.                              |
+-------------------+-------------------------------------------------------------+
| **timeout**       | Timeout for the evaluation (in seconds).                    |
|                   |                                                             |
|                   | Use of this attribute overwrites the generic timeout.       |
+-------------------+-------------------------------------------------------------+
| **profile**       | Select profile.                                             |
+-------------------+-------------------------------------------------------------+

.. note::

    The ``path`` attribute can be filled in with the whole path where the benchmark files are located, or with a relative path to the CIS-CAT tool location.

Scheduling options
------------------

scan-on-start
^^^^^^^^^^^^^

Run evaluation immediately when service is started.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+


interval
^^^^^^^^

Interval between CIS-CAT executions.

+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1d                                                                                                                                                             |
+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days), w (weeks), M (months) |
+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+

The interval option is conditioned by the following described options ``day``, ``wday`` and ``time``. If none of these options are set, the interval can take any allowed value.

day
^^^

.. versionadded:: 3.5.0

Day of the month to run the CIS-CAT scan.

+--------------------+--------------------------+
| **Default value**  | n/a                      |
+--------------------+--------------------------+
| **Allowed values** | Day of the month [1..31] |
+--------------------+--------------------------+

.. note::

	When the ``day`` option is set, the interval value must be a multiple of months. By default, the interval is set to a month.


wday
^^^^

.. versionadded:: 3.5.0

Day of the week to run the CIS-CAT scan. This option is **not compatible** with the ``day`` option.

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

.. versionadded:: 3.5.0

Time of the day to run the scan. It has to be represented in the format *hh:mm*.

+--------------------+-----------------------+
| **Default value**  | n/a                   |
+--------------------+-----------------------+
| **Allowed values** | Time of day *[hh:mm]* |
+--------------------+-----------------------+

.. note::

	When only the ``time`` option is set, the interval value must be a multiple of days. By default, the interval is set to a day.

Example of configuration
------------------------

.. code-block:: xml

  <wodle name="cis-cat">

    <disabled>no</disabled>
    <timeout>1800</timeout>
    <wday>monday</wday>
    <time>04:00</time>
    <interval>2w</interval>
    <scan-on-start>yes</scan-on-start>

    <java_path>/usr/bin</java_path>
    <ciscat_path>wodles/ciscat</ciscat_path>

    <content type="xccdf" path="benchmarks/CIS_Ubuntu_Linux_16.04_LTS_Benchmark_v1.0.0-xccdf.xml">
      <profile>xccdf_org.cisecurity.benchmarks_profile_Level_2_-_Server</profile>
    </content>

  </wodle>
