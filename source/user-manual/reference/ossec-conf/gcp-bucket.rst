.. Copyright (C) 2021 Wazuh, Inc.

.. _gcp-bucket:

gcp-bucket
==========

.. versionadded:: 4.3.0

.. topic:: XML section name

	.. code-block:: xml

		<gcp-bucket>
		</gcp-bucket>

This configuration section is used to configure the Google Cloud Storage bucket module.

Options
-------

Main options
^^^^^^^^^^^^

- `enabled`_
- `logging`_
- `bucket type`_

Scheduling options
^^^^^^^^^^^^^^^^^^

- `run_on_start`_
- `interval`_
- `day`_
- `wday`_
- `time`_

enabled
^^^^^^^

This indicates if the module is enabled or disabled.

+--------------------+--------------+
| **Default value**  | n/a          |
+--------------------+--------------+
| **Allowed values** | yes, no      |
+--------------------+--------------+


logging
^^^^^^^^

Toggle between the different logging levels.

+--------------------+--------------------------------------------+
| **Default value**  | info                                       |
+--------------------+--------------------------------------------+
| **Allowed values** | disabled/info/debug/warning/error/critical |
+--------------------+--------------------------------------------+

bucket type
^^^^^^^^^^^

Defines a bucket to process. It must have its ``type`` attribute defined. (Supports multiple instances of this option).

Bucket options
~~~~~~~~~~~~~~

- `bucket\\name`_
- `bucket\\credentials_file`_
- `bucket\\path`_
- `bucket\\only_logs_after`_
- `bucket\\remove_from_bucket`_

type
^^^^

Specifies type of bucket. It is an attribute of the ``bucket`` tag.

+--------------------+-------------+
| **Default value**  | N/A         |
+--------------------+-------------+
| **Allowed values** | access_logs |
+--------------------+-------------+

bucket\\name
^^^^^^^^^^^^

Name of the Google Cloud Storage bucket from where logs are read.

+--------------------+-----------------------------+
| **Default value**  | N/A                         |
+--------------------+-----------------------------+
| **Allowed values** | Any valid bucket name       |
+--------------------+-----------------------------+

bucket\\credentials_file
^^^^^^^^^^^^^^^^^^^^^^^^

This setting specifies the path to the Google Cloud credentials file in JW Tokens. It allows both relative (to $HOME_INSTALLATION) and absolute paths.

+--------------------+--------------------------------+
| **Default value**  | n/a                            |
+--------------------+--------------------------------+
| **Allowed values** | Any path to a credentials file |
+--------------------+--------------------------------+

For example ``<credentials_file>wodles/gcp-bucket/credentials.json</credentials_file>``.

bucket\\path
^^^^^^^^^^^^

If defined, the path or prefix for the bucket.

+--------------------+---------------+
| **Default value**  | N/A           |
+--------------------+---------------+
| **Allowed values** | Valid path    |
+--------------------+---------------+

bucket\\only_logs_after
^^^^^^^^^^^^^^^^^^^^^^^

A valid date, in YYYY-MMM-DD format, that only logs from after that date will be parsed. All logs from before that date will be skipped.

+--------------------+-------------+
| **Default value**  | 1970-JAN-01 |
+--------------------+-------------+
| **Allowed values** | Valid date  |
+--------------------+-------------+

bucket\\remove_from_bucket
^^^^^^^^^^^^^^^^^^^^^^^^^^

Define if logs from the Google Cloud Storage bucket should be removed after they are read by the module.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+



run_on_start
^^^^^^^^^^^^^

Trigger the module in case the Wazuh service starts or restarts.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

interval
^^^^^^^^

Interval between module executions.

+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1h                                                                                                                                                             |
+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days), w (weeks), M (months) |
+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+

day
^^^

Day of the month to run the script to fetch logs from GCP.

+--------------------+--------------------------+
| **Default value**  | n/a                      |
+--------------------+--------------------------+
| **Allowed values** | Day of the month [1..31] |
+--------------------+--------------------------+

.. note::

	When the ``day`` option is set, the interval value must be a multiple of months. By default, the interval is set to a month.

wday
^^^^

Day of the week to run the script to fetch logs. This option is **not compatible** with the ``day`` option.

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

Time of the day to retrieve logs from GCP. It has to be represented in the format *hh:mm*. This option is compatible with ``day`` or ``wday`` options.

+--------------------+-----------------------+
| **Default value**  | n/a                   |
+--------------------+-----------------------+
| **Allowed values** | Time of day *[hh:mm]* |
+--------------------+-----------------------+

.. note::

	When only the ``time`` option is set, the interval value must be a multiple of days or weeks. By default, the interval is set to a day.

Configuration example
---------------------

Linux configuration:

.. code-block:: xml

    <gcp-bucket>
        <pull_on_start>yes</pull_on_start>
        <interval>1m</interval>
        <project_id>wazuh-dev</project_id>
        <subscription_name>wazuhdns</subscription_name>
        <logging>debug</logging>
        <credentials_file>wodles/gcp-bucket/credentials.json</credentials_file>
    </gcp-bucket>
