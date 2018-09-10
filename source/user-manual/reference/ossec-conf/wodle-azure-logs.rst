.. Copyright (C) 2018 Wazuh, Inc.

.. _wodle_azure_logs:

wodle name="azure-logs"
=======================

.. versionadded:: 3.7.0

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="azure-logs">
		</wodle>

Configuration options of the Azure-Logs wodle.


Options
-------

- `disabled`_
- `interval`_
- `run_on_start`_
- `day`_
- `wday`_
- `time`_
- `timeout`_
- `log_analytics`_
- `storage`_
- `graph`_

+-----------------------+-----------------------------+
| Options               | Allowed values              |
+=======================+=============================+
| `disabled`_           | yes, no                     |
+-----------------------+-----------------------------+
| `interval`_           | A positive number + suffix  |
+-----------------------+-----------------------------+
| `run_on_start`_       | yes, no                     |
+-----------------------+-----------------------------+
| `day`_                | A day of the month          |
+-----------------------+-----------------------------+
| `wday`_               | A day of the week           |
+-----------------------+-----------------------------+
| `time`_               | A time of the day [hh:mm]   |
+-----------------------+-----------------------------+
| `timeout`_            | A positive number (seconds) |
+-----------------------+-----------------------------+
| `log_analytics`_      | N/A                         |
+-----------------------+-----------------------------+
| `storage`_            | N/A                         |
+-----------------------+-----------------------------+
| `graph`_              | N/A                         |
+-----------------------+-----------------------------+

disabled
^^^^^^^^

Disables the Azure-Logs wodle.

+--------------------+-----------------------------+
| **Default value**  | no                          |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

interval
^^^^^^^^

Interval between Azure-Logs executions.

+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1d                                                                                                                                                             |
+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days), w (weeks), M (months) |
+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+

The interval option is conditioned by the following described options ``day``, ``wday`` and ``time``. If none of these options are set, the interval can take any allowed value.

run_on_start
^^^^^^^^^^^^^

Run evaluation immediately when service is started.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+


day
^^^

Day of the month to run the Azure-Logs.

+--------------------+--------------------------+
| **Default value**  | n/a                      |
+--------------------+--------------------------+
| **Allowed values** | Day of the month [1..31] |
+--------------------+--------------------------+

.. note::

	When the ``day`` option is set, the interval value must be a multiple of months. By default, the interval is set to a month.

wday
^^^^

Day of the week to run the Azure-Logs. This option is **not compatible** with the ``day`` option.

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

time
^^^^

Time of the day to run the Azure-Logs. It has to be represented in the format *hh:mm*.

+--------------------+-----------------------+
| **Default value**  | n/a                   |
+--------------------+-----------------------+
| **Allowed values** | Time of day *[hh:mm]* |
+--------------------+-----------------------+

timeout
^^^^^^^

Timeout for each evaluation. In case the execution takes longer that the specified timeout, it stops.

+--------------------+-----------------------------+
| **Default value**  | 0                           |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

log_analytics
-------------

Defines the use of the Azure Log Analytics REST API to get the desired logs. 

log_analytics options
~~~~~~~~~~~~~~~~~~~~~

- `application_id`_
- `application_key`_
- `authentication_path`_
- `tenantdomain`_
- `request`_

+----------------------------------+----------------------------------------------+
| Options                          | Allowed values                               |
+==================================+==============================================+
| `application_id`_                | Any string                                   |
+----------------------------------+----------------------------------------------+
| `application_key`_               | Any string                                   |
+----------------------------------+----------------------------------------------+
| `authentication_path`_           | File path                                    |
+----------------------------------+----------------------------------------------+
| `tenantdomain`_                  | Any string                                   |
+----------------------------------+----------------------------------------------+
| `request`_                       | N/A                                          |
+----------------------------------+----------------------------------------------+

application_id
^^^^^^^^^^^^^^

Identifier of the application that we will use for the authentication and to be able to make use of the Azure Log Analytics API. It must be used next to the ``application_key`` option obligatorily. Incompatible with ``authentication_path`` option. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any string         |
+--------------------+--------------------+

application_key 
^^^^^^^^^^^^^^^

Key to the application we will use for authentication and to be able to make use of the Azure Log Analytics API. It must be used next to the ``application_id`` option obligatorily. Incompatible with ``authentication_path`` option. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any string         |
+--------------------+--------------------+

authentication_path
^^^^^^^^^^^^^^^^^^^

Path of the file that contains the application identifier and the application key for authentication in order to use the Azure Log Analytics API. Incompatible with ``application_id`` and ``application_key`` options.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | File path          |
+--------------------+--------------------+

File example: 

.. code-block:: shell

    application_id = 8b7...c14                
    application_key = w22...91x

tenantdomain
^^^^^^^^^^^^ 

A tenant is simply a dedicated instance of Azure Active Directory (Azure AD). The Azure Log Analytics API uses the Azure Active Directory authentication scheme.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any String         |
+--------------------+--------------------+

request
^^^^^^^

This option includes all the other options needed to make a query. We can have more than one ``request`` entry. 

request options
~~~~~~~~~~~~~~~

+----------------------------------+----------------------------------------------+
| Options                          | Allowed values                               |
+==================================+==============================================+
| `tag`_                           | Any string                                   |
+----------------------------------+----------------------------------------------+
| `query`_                         | Any string                                   |
+----------------------------------+----------------------------------------------+
| `workspace`_                     | Any string                                   |
+----------------------------------+----------------------------------------------+
| `time_offset`_                   | A positive number + suffix                   |
+----------------------------------+----------------------------------------------+

tag
^^^

Defines a tag that we will add to the query. This entry is optional and can be used to facilitate searches for events that are tagged or to create custom rules. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any String         |
+--------------------+--------------------+

query
^^^^^

This is the query we will make to the Azure Log Analytics API. This option is ready to use any query we can make in the Log Analytics portal. You can find a reference of the language used `here <https://docs.loganalytics.io/docs/Language-Reference>`_. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any String         |
+--------------------+--------------------+

workspace
^^^^^^^^^

Defines the workspace where we will perform the queries. 

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any String         |
+--------------------+--------------------+

time_offset
^^^^^^^^^^^

This option sets the time delay in which we will perform the query. For example, if we establish this option with the value "1d", the integration will perform the query on the events that have been generated in the interval of time defined between the current date of the system minus one day (1d) and the current date of the system. 

+--------------------+----------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1d                                                                                                                         |
+--------------------+----------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, m (minutes), h (hours), d (days) |
+--------------------+----------------------------------------------------------------------------------------------------------------------------+

Example of log_analytics configuration
--------------------------------------

.. code-block:: xml

    <wodle name="azure-logs">

        <disabled>no</disabled>
        <day>15</day>
        <time>02:00</time>
        <run_on_start>yes</run_on_start>

        <log_analytics>

            <application_id>8b7...c14</application_id>
            <application_key>w22...91x</application_key>
            <tenantdomain>wazuh.onmicrosoft.com</tenantdomain>

            <request>
                <tag>azure-activity</tag>
                <query>AzureActivity | where SubscriptionId == "2d7...61d </query>
                <workspace>d6b...efa</workspace>
                <time_offset>36h</time_offset>
            </request>

        </log_analytics>

    </wodle>

graph
-----

storage
-------