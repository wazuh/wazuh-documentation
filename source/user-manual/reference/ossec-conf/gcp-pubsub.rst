.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh GCP Pub/Sub module allows you to pull log data from Google Pub/Sub. Learn more about how to configure the module in this section.

gcp-pubsub
==========

.. topic:: XML section name

	.. code-block:: xml

		<gcp-pubsub>
		</gcp-pubsub>

This configuration section is used to configure the Google Cloud Pub/Sub module.

.. note::

   The Wazuh GCP module supports only one ``gcp-pubsub`` section per :ref:`Wazuh configuration file <reference_ossec_conf>`. To configure more than one service, you need to deploy multiple agents.

.. topic:: Main options:

   - `enabled`_
   - `project_id`_
   - `subscription_name`_
   - `credentials_file`_
   - `max_messages`_
   - `num_threads`_

.. topic:: Scheduling options:

   - `pull_on_start`_
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

project_id
^^^^^^^^^^^

Google Cloud project ID.

+--------------------+--------------------------------------------------+
| **Default value**  | n/a                                              |
+--------------------+--------------------------------------------------+
| **Allowed values** | Any string indicating the project ID             |
+--------------------+--------------------------------------------------+

For example ``<project_id>wazuh-dev</project_id>``.

subscription_name
^^^^^^^^^^^^^^^^^

Name of the subscription to read from.

+--------------------+------------+
| **Default value**  | n/a        |
+--------------------+------------+
| **Allowed values** | Any string |
+--------------------+------------+

For example ``<subscription_name>wazuh-name</subscription_name>``.

credentials_file
^^^^^^^^^^^^^^^^

Path to the Google Cloud credentials file. It can be absolute path or relative to ``WAZUH_HOME``.

+--------------------+--------------------------------+
| **Default value**  | n/a                            |
+--------------------+--------------------------------+
| **Allowed values** | Any path to a credentials file |
+--------------------+--------------------------------+

For example, ``<credentials_file>wodles/gcp-pubsub/credentials.json</credentials_file>``.

max_messages
^^^^^^^^^^^^

Maximum number of messages pulled in each iteration. This value does not depend on the number of threads used.

+--------------------+-------------+
| **Default value**  | 100         |
+--------------------+-------------+
| **Allowed values** | Any integer |
+--------------------+-------------+

.. _num_threads:

num_threads
^^^^^^^^^^^^

Number of threads used to pull in each iteration. The maximum number of messages is divided between all the configured threads.

+--------------------+-------------+
| **Default value**  | 1           |
+--------------------+-------------+
| **Allowed values** | Any integer |
+--------------------+-------------+

.. note::

  The number of threads will be truncated to the maximum allowed, depending on the number of CPU cores. The maximum value is ``number_of_physical_cores * 5``.

logging
^^^^^^^^

.. deprecated:: 4.4

This option has no effect. The module now uses the :ref:`wazuh_modules.debug <wazuh_modules_options>` level to set its logging level.

Scheduling options
------------------

pull_on_start
^^^^^^^^^^^^^

Pull logs on Wazuh agent start or restart.

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

    <gcp-pubsub>
        <pull_on_start>yes</pull_on_start>
        <interval>1m</interval>
        <project_id>wazuh-dev</project_id>
        <subscription_name>wazuhdns</subscription_name>
        <credentials_file>wodles/gcp-pubsub/credentials.json</credentials_file>
    </gcp-pubsub>
