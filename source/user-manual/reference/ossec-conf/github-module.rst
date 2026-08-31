.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the github configuration section of ossec.conf, which configures the collection of GitHub organization audit log events.

.. _reference_ossec_github:

github
======

.. topic:: XML section name

   .. code-block:: xml

      <github>
      </github>

The ``<github>`` section configures the collection of GitHub organization audit log events through the GitHub REST API.

.. note::
   This module is supported on Windows, Linux, and macOS. Enable it on only one agent to avoid collecting duplicate events.

Available options
-------------------

- `enabled`_
- `only_future_events`_
- `interval`_
- `time_delay`_
- `curl_max_size`_
- `api_auth`_
- `api_parameters`_

enabled
^^^^^^^

Enables or disables the GitHub module.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

only_future_events
^^^^^^^^^^^^^^^^^^^^

Controls whether the module collects only events generated after the Wazuh agent starts.

When set to ``yes``, the module does not collect older GitHub events during its initial execution.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

interval
^^^^^^^^

Specifies the interval between module executions.

.. note::
   When the Wazuh agent starts, the module waits for the configured interval before its first execution. If the module has run previously and ``only_future_events`` is set to no, this initial delay does not apply.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | 1m                                                                                           |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | A positive number that should contain a suffix character indicating a time unit, such as, s  |
|                      | (seconds), m (minutes), h (hours), d (days)                                                  |
+----------------------+----------------------------------------------------------------------------------------------+

time_delay
^^^^^^^^^^^

Specifies how far behind the current time the module stops collecting events.

.. note::
   This delay accounts for events that might not be immediately available through the GitHub API. Lower values provide collection closer to real time but increase the risk of missing delayed events. Use a value greater than ``30s``.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | 30s                                                                                          |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | A positive number that should contain a suffix character indicating a time unit, such as, s  |
|                      | (seconds), m (minutes), h (hours), d (days)                                                  |
+----------------------+----------------------------------------------------------------------------------------------+

curl_max_size
^^^^^^^^^^^^^^

Specifies the maximum allowed size of a GitHub API response.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | 1M                                                                                           |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | A positive number that should contain a suffix character indicating a size unit, such as b/B |
|                      | (bytes), k/K (kilobytes), m/M (megabytes), and g/G (gigabytes).                              |
+----------------------+----------------------------------------------------------------------------------------------+

api_auth
^^^^^^^^

The ``<api_auth>`` block configures authentication with a GitHub organization.

You can define multiple ``<api_auth>`` blocks to collect events from more than one organization.

**Options**

- `api_auth\\org_name`_
- `api_auth\\api_token`_

.. note::
   After three failed collection attempts caused by an invalid configuration, the module writes a warning to the agent log and generates an alert.

api_auth\\org_name
~~~~~~~~~~~~~~~~~~~~~~

Specifies the GitHub organization name.

+----------------------+--------------+
| **Default value**    | N/A          |
+----------------------+--------------+
| **Allowed values**   | Any string   |
+----------------------+--------------+

api_auth\\api_token
~~~~~~~~~~~~~~~~~~~~~~~

Specifies the personal access token used to authenticate with the GitHub API.

+----------------------+--------------+
| **Default value**    | N/A          |
+----------------------+--------------+
| **Allowed values**   | Any string   |
+----------------------+--------------+

.. note::
   This block can be repeated to give the possibility to connect with more than one organization on GitHub.

api_parameters
^^^^^^^^^^^^^^^

This block configures the internal options in the GitHub REST API.

- `api_parameters\\event_type`_

api_parameters\\event_type
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The event types to include:

- web: returns web (non-Git) events.
- git: returns Git events.
- all: returns both web and Git events.

+----------------------+-----------------+
| **Default value**    | all             |
+----------------------+-----------------+
| **Allowed values**   | web, git, all   |
+----------------------+-----------------+

Sample configuration
---------------------

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

Sample configuration of multiple organizations
--------------------------------------------------

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
