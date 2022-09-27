.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out the configuration options of the open-scap wodle. Learn more about it in this section of the Wazuh documentation.
  
.. _wodle_openscap:

wodle name="open-scap"
========================

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="open-scap">
		</wodle>

Configuration options of the OpenSCAP wodle.

Options
-------

Main options
^^^^^^^^^^^^

- `disabled`_
- `timeout`_
- `content`_


+----------------------+-----------------------------+
| Main options         | Allowed values              |
+======================+=============================+
| `disabled`_          | yes, no                     |
+----------------------+-----------------------------+
| `timeout`_           | A positive number (seconds) |
+----------------------+-----------------------------+
| `content`_           | N/A                         |
+----------------------+-----------------------------+

Scheduling options
^^^^^^^^^^^^^^^^^^

- `scan-on-start`_
- `interval`_
- `day`_
- `wday`_
- `time`_

disabled
^^^^^^^^

Disables the OpenSCAP wodle.

+--------------------+-----------------------------+
| **Default value**  | no                          |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

timeout
^^^^^^^

Timeout for each evaluation.

+--------------------+-----------------------------+
| **Default value**  | 1800                        |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

content
^^^^^^^

Define an evaluation.

Attributes

+-------------------+-------------------------------------------------------------+
| **type**          | Select content type: xccdf or oval.                         |
+-------------------+-------------------------------------------------------------+
| **path**          | Use the specified policy file (DataStream, XCCDF or OVAL).  |
|                   |                                                             |
|                   | Default path: /var/ossec/wodles/oscap/content               |
+-------------------+-------------------------------------------------------------+
| **timeout**       | Timeout for the evaluation (in seconds).                    |
|                   |                                                             |
|                   | Use of this attribute overwrites the generic timeout.       |
+-------------------+-------------------------------------------------------------+
| **xccdf-id**      | XCCDF id.                                                   |
+-------------------+-------------------------------------------------------------+
| **oval-id**       | OVAL id.                                                    |
+-------------------+-------------------------------------------------------------+
| **datastream-id** | Datastream id.                                              |
+-------------------+-------------------------------------------------------------+
| **cpe**           | CPE dictionary file.                                        |
|                   |                                                             |
|                   | Default path: /var/ossec/wodles/oscap/content               |
+-------------------+-------------------------------------------------------------+
| **profile**       | Select profile.                                             |
+-------------------+-------------------------------------------------------------+

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

The interval between OpenSCAP executions.

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1d                                                                                                                                                   |
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

  <wodle name="open-scap">

    <timeout>1800</timeout>
    <interval>1d</interval>
    <scan-on-start>yes</scan-on-start>

    <content type="xccdf" path="ssg-centos-7-ds.xml"/>
    <content type="xccdf" path="ssg-centos-6-ds.xml"/>

  </wodle>
