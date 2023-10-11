.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh GCP Storage module allows you to process logs stored in Google Cloud Storage buckets. Learn more about how to configure the module in this section.

gcp-bucket
==========

.. topic:: XML section name

	.. code-block:: xml

		<gcp-bucket>
		</gcp-bucket>

This configuration section is used to configure the Google Cloud Storage bucket module.

**Main options**:

- `enabled`_
- `bucket`_

**Scheduling options**:

- `run_on_start`_
- `interval`_
- `day`_
- `wday`_
- `time`_

Main options
------------

enabled
^^^^^^^

Enables or disables the module.

+--------------------+--------------+
| **Default value**  | n/a          |
+--------------------+--------------+
| **Allowed values** | yes, no      |
+--------------------+--------------+


logging
^^^^^^^^

.. deprecated:: 4.4

This option has no effect. The module now uses the :ref:`wazuh_modules.debug <wazuh_modules_options>` level to set its logging level.


bucket
^^^^^^

Defines a bucket to process. It must have its ``type`` attribute defined. It supports multiple instances of this option.

   .. code-block:: xml

      <bucket type="access_logs">

      </bucket>

**Bucket attributes**

+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| Attributes                             | Allowed values                                              | Mandatory/Optional                            |
+========================================+=============================================================+===============================================+
| :ref:`type_attribute`                  | ``access_logs``                                             | Mandatory                                     |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+

**Bucket options**

+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| Options                                | Allowed values                                              | Mandatory/Optional                            |
+========================================+=============================================================+===============================================+
| :ref:`gcp_bucket_name`                 | Any valid bucket name                                       | Mandatory                                     |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`gcp_bucket_credentials_file`     | Path to a credentials file.                                 | Mandatory                                     |
|                                        | It can be absolute or relative to ``WAZUH_HOME``            |                                               |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`gcp_bucket_path`                 | Any valid path                                              | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`gcp_bucket_only_logs_after`      | Valid date in YYYY-MM-DD format                             | Optional                                      |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+
| :ref:`gcp_bucket_remove_from_bucket`   | A value to determine if each log file is deleted once it    | Optional                                      |
|                                        | has been collected by the module                            |                                               |
+----------------------------------------+-------------------------------------------------------------+-----------------------------------------------+

.. _type_attribute:

type (attribute)
~~~~~~~~~~~~~~~~

Specifies the type of bucket.

+--------------------+-------------+
| **Default value**  | N/A         |
+--------------------+-------------+
| **Allowed values** | access_logs |
+--------------------+-------------+

.. _gcp_bucket_name:

name
~~~~

Name of the Google Cloud Storage bucket from which logs are read.

+--------------------+-----------------------------+
| **Default value**  | N/A                         |
+--------------------+-----------------------------+
| **Allowed values** | Any valid bucket name       |
+--------------------+-----------------------------+

.. _gcp_bucket_credentials_file:

credentials_file
~~~~~~~~~~~~~~~~

Path to the Google Cloud credentials file. It can be an absolute path or relative to ``WAZUH_HOME``.

+--------------------+--------------------------------+
| **Default value**  | n/a                            |
+--------------------+--------------------------------+
| **Allowed values** | Any path to a credentials file |
+--------------------+--------------------------------+

For example ``<credentials_file>wodles/gcp-bucket/credentials.json</credentials_file>``.

.. _gcp_bucket_path:

path
~~~~

Bucket path or prefix.

+--------------------+---------------+
| **Default value**  | N/A           |
+--------------------+---------------+
| **Allowed values** | Valid path    |
+--------------------+---------------+

.. _gcp_bucket_only_logs_after:

only_logs_after
~~~~~~~~~~~~~~~

Parse logs from a specific date onwards. It must follow the YYYY-MM-DD format. 

+--------------------+-----------------------------------+
| **Default value**  | Date of execution at ``00:00:00`` |
+--------------------+-----------------------------------+
| **Allowed values** | Valid date [YYYY-MM-DD]           |
+--------------------+-----------------------------------+

.. _gcp_bucket_remove_from_bucket:

remove_from_bucket
~~~~~~~~~~~~~~~~~~

Remove the logs from the Google Cloud Storage bucket once the module reads them.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

Scheduling options
------------------

run_on_start
^^^^^^^^^^^^^

Run the module on Wazuh service start or restart.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

interval
^^^^^^^^

Time interval between module executions.

+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1h                                                                                                                                                             |
+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as s (seconds), m (minutes), h (hours), d (days), w (weeks), M (months)  |
+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+

day
^^^

Day of the month to retrieve logs from GCP.

+--------------------+--------------------------+
| **Default value**  | n/a                      |
+--------------------+--------------------------+
| **Allowed values** | Day of the month [1..31] |
+--------------------+--------------------------+

.. note::

	When the ``day`` option is set, the interval value must be a multiple of months. By default, the interval is set to a month.

wday
^^^^

Day of the week to retrieve logs from GCP. This option is **not compatible** with the ``day`` option.

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
        <run_on_start>yes</run_on_start>
        <interval>1m</interval>
        <bucket type="access_logs">
            <name>wazuh-test-bucket</name>
            <credentials_file>/var/ossec/wodles/gcloud/credentials.json</credentials_file>
            <only_logs_after>2021-JUN-01</only_logs_after>
            <path>access_logs/</path>
            <remove_from_bucket>no</remove_from_bucket>
        </bucket>
    </gcp-bucket>
