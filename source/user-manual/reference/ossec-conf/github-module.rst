.. Copyright (C) 2021 Wazuh, Inc.

.. _github-module:

github
=======

.. versionadded:: 4.3.0

.. note::

    This module only works on Windows, Linux and MacOS. It is recommended to have it enabled only in one agent to avoid repeated logs.

.. topic:: XML section name

	.. code-block:: xml

		<github>
		</github>

Configuration options of the GitHub module.


Options
-------

- `enabled`_
- `only_future_events`_
- `interval`_
- `time_delay`_
- `curl_max_size`_
- `api_auth`_
- `api_auth\\org_name`_
- `api_auth\\api_token`_
- `api_parameters\\event_type`_


+----------------------------------------+----------------------------------------------+
| Options                                | Allowed values                               |
+========================================+==============================================+
| `enabled`_                             | yes, no                                      |
+----------------------------------------+----------------------------------------------+
| `only_future_events`_                  | yes, no                                      |
+----------------------------------------+----------------------------------------------+
| `interval`_                            | A positive number + suffix                   |
+----------------------------------------+----------------------------------------------+
| `time_delay`_                          | A positive number + suffix                   |
+----------------------------------------+----------------------------------------------+
| `curl_max_size`_                       | A positive number + suffix                   |
+----------------------------------------+----------------------------------------------+
| `api_auth`_                            | N/A                                          |
+----------------------------------------+----------------------------------------------+
| `api_auth\\org_name`_                  | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `api_auth\\api_token`_                 | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `api_parameters`_                      | N/A                                          |
+----------------------------------------+----------------------------------------------+
| `api_parameters\\event_type`_          | web, git, all                                |
+----------------------------------------+----------------------------------------------+

enabled
^^^^^^^

Enabled the GitHub wodle.

+--------------------+-----------------------------+
| **Default value**  | yes                         |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

only_future_events
^^^^^^^^^^^^^^^^^^

Set it to **yes** to collect events generated since the Wazuh manager was started.

By default, when Wazuh starts it will only read all log content from GitHub since the manager started.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

interval
^^^^^^^^

Interval between Wazuh wodle executions.

+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 10m                                                                                                                                     |
+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days) |
+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------+

time_delay
^^^^^^^^^^

Specifies the delay time of the scan respect to the current time, by default it is 30 seconds.

.. note::

    This parameter represent how close to current time the module will collect events, as smaller is the value, closer to real time the collection will be, the issue is sometimes github app inserts events from some seconds ago, and github delay increase the chance to lose events. it's recommended to use values over 30 seconds.

+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1s                                                                                                                                      |
+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days) |
+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------+

curl_max_size
^^^^^^^^^^^^^

Specifies the maximum size allowed for the GitHub API response.

+--------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1M                                                                                                                                                           |
+--------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a size unit, such as b/B (bytes), k/K (kilobytes), m/M (megabytes), and g/G (gigabytes). |
+--------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------+

api_auth
--------

This block configures the credential for the **authentication** with the GitHub REST API.

- `api_auth\\org_name`_
- `api_auth\\api_token`_

+----------------------------------------+----------------------------------------------+
| Options                                | Allowed values                               |
+========================================+==============================================+
| `api_auth\\org_name`_                  | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `api_auth\\api_token`_                 | Any string                                   |
+----------------------------------------+----------------------------------------------+

api_auth\\org_name
^^^^^^^^^^^^^^^^^^

Name of your organization in GitHub.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any string         |
+--------------------+--------------------+

api_auth\\api_token
^^^^^^^^^^^^^^^^^^^

Personal access token to authenticate with the GitHub API.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any string         |
+--------------------+--------------------+

.. note::

    This block can be repeated to give the possibility to connect with more than one organization on GitHub.

api_parameters
--------------

This block configures the internal options in the GitHub REST API.

- `api_parameters\\event_type`_

+----------------------------------+----------------------------------------------+
| Options                          | Allowed values                               |
+==================================+==============================================+
| `api_parameters\\event_type`_    | Any string                                   |
+----------------------------------+----------------------------------------------+

api_parameters\\event_type
^^^^^^^^^^^^^^^^^^^^^^^^^^

The event types to include:

- web: returns web (non-Git) events.
- git: returns Git events.
- all: returns both web and Git events.

+--------------------+--------------------+
| **Default value**  | all                |
+--------------------+--------------------+
| **Allowed values** | web, git, all      |
+--------------------+--------------------+

Example of configuration
------------------------

.. code-block:: xml

    <github>
        <enabled>yes</enabled>
        <interval>1m</interval>
        <time_delay>30s</time_delay>
        <curl_max_size>1M</curl_max_size>
        <only_future_events>yes</only_future_events>
        <api_auth>
            <org_name>dummy</org_name>
            <api_token>ghp_oiasd6efbvptrfdua8fyepnfdc78ewf324jg</api_token>
        </api_auth>
        <api_parameters>
            <event_type>all</event_type>
        </api_parameters>
    </github>

Example of multiple organizations
---------------------------------

.. code-block:: xml

    <github>
        <enabled>yes</enabled>
        <interval>1m</interval>
        <time_delay>1m</time_delay>
        <curl_max_size>1M</curl_max_size>
        <only_future_events>no</only_future_events>
        <api_auth>
            <org_name>dummy1</org_name>
            <api_token>ghp_oiasd6efbvptrfdua8fyepnfdc78ewf324jg</api_token>
        </api_auth>
        <api_auth>
            <org_name>dummy2</org_name>
            <api_token>ghp_oiasd6efbvptrfdua8fyepnfdc78ewf324jg</api_token>
        </api_auth>
        <api_parameters>
            <event_type>git</event_type>
        </api_parameters>
    </github>