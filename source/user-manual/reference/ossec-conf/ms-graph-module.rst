.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out how to configure the Wazuh Microsoft Graph module. Learn more about it in this section of the Wazuh documentation.
  
.. _ms-graph-module:

ms-graph
========

.. versionadded:: 4.6.0

.. note:: This module only works on Windows, Linux, and macOS. It is recommended to have it enabled on a single manager/agent to avoid log duplication.

.. topic:: XML section name

    .. code-block:: xml

		    <ms-graph>
		    </ms-graph>

Configuration options of the Microsoft Graph module.


Options
-------

- `enabled`_
- `only_future_events`_
- `interval`_
- `curl_max_size`_
- `run_on_start`_
- `version`_
- `api_auth`_
- `api_auth\\tenant_id`_
- `api_auth\\client_id`_
- `api_auth\\secret_value`_
- `api_auth\\api_type`_
- `resource`_
- `resource\\name`_
- `resource\\relationship`_

+----------------------------------------+---------------------------------+
| Options                                | Allowed values                  |
+========================================+=================================+
| `enabled`_                             | yes, no                         |
+----------------------------------------+---------------------------------+
| `only_future_events`_                  | yes, no                         |
+----------------------------------------+---------------------------------+
| `interval`_                            | A positive number + suffix      |
+----------------------------------------+---------------------------------+
| `curl_max_size`_                       | A positive number + suffix      |
+----------------------------------------+---------------------------------+
| `run_on_start`_                        | yes, no                         |
+----------------------------------------+---------------------------------+
| `version`_                             | beta, v1.0                      |
+----------------------------------------+---------------------------------+
| `api_auth`_                            | N/A                             |
+----------------------------------------+---------------------------------+
| `api_auth\\tenant_id`_                 | Any string                      |
+----------------------------------------+---------------------------------+
| `api_auth\\client_id`_                 | Any string                      |
+----------------------------------------+---------------------------------+
| `api_auth\\secret_value`_              | Any string                      |
+----------------------------------------+---------------------------------+
| `api_auth\\api_type`_                  | global, gcc-high, dod           |
+----------------------------------------+---------------------------------+
| `resource`_                            | N/A                             |
+----------------------------------------+---------------------------------+
| `resource\\name`_                      | Any string                      |
+----------------------------------------+---------------------------------+
| `resource\\relationship`_              | Any string                      |
+----------------------------------------+---------------------------------+

enabled
^^^^^^^

Enables the Microsoft Graph module.

+--------------------+-----------------------------+
| **Default value**  | yes                         |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

only_future_events
^^^^^^^^^^^^^^^^^^

By default, the Microsoft Graph module will only read logs from when the module was started onwards.

To always read all log content that exists on the tenant, set this to **no**.

+--------------------+-----------------------------+
| **Default value**  | yes                         |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

interval
^^^^^^^^

The length of time the module will wait before searching for logs.

.. note::

    When Wazuh starts, the module will wait for the duration of the configured time interval before running the first scan unless ``run_on_start`` is set to **yes**.

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1d                                                                                                                                       |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days). |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+

curl_max_size
^^^^^^^^^^^^^

Specifies the maximum size allowed for the Microsoft Graph API response.

+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1M                                                                                                                                                                                |
+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a size unit, such as b/B (bytes), k/K (kilobytes), m/M (megabytes), and g/G (gigabytes). Minimum value of 1M. |
+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

run_on_start
^^^^^^^^^^^^

Overrides the interval option and forces a run of the module on startup.

+--------------------+-----------------------------+
| **Default value**  | yes                         |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

version
^^^^^^^

Specifies the version of the Microsoft Graph API to use. For production use, `v1.0` should be preferred.

+--------------------+-----------------------------+
| **Default value**  | v1.0                        |
+--------------------+-----------------------------+
| **Allowed values** | beta, v1.0                  |
+--------------------+-----------------------------+

api_auth
--------

This block configures the credentials used for authenticating with the Microsoft Graph REST API.

- `api_auth\\tenant_id`_
- `api_auth\\client_id`_
- `api_auth\\secret_value`_

.. warning:: In the case of an invalid configuration, a warning message will be generated in the log file.

+----------------------------------------+----------------------------------------------+
| Options                                | Allowed values                               |
+========================================+==============================================+
| `api_auth\\tenant_id`_                 | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `api_auth\\client_id`_                 | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `api_auth\\secret_value`_              | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `api_auth\\api_type`_                  | global, gcc-high, dod                        |
+----------------------------------------+----------------------------------------------+

api_auth\\tenant_id
^^^^^^^^^^^^^^^^^^^

Tenant ID of the application registered in Azure.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any string         |
+--------------------+--------------------+

api_auth\\client_id
^^^^^^^^^^^^^^^^^^^

Client ID of the application registered in Azure.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any string         |
+--------------------+--------------------+

api_auth\\secret_value
^^^^^^^^^^^^^^^^^^^^^^

Secret associated with the application registered in Azure.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any string         |
+--------------------+--------------------+

api_auth\\api_type
^^^^^^^^^^^^^^^^^^

Type of Microsoft 365 subscription plan used by the tenant. `global` refers to either a commerical or GCC tenant.

+--------------------+------------------------+
| **Default value**  | N/A                    |
+--------------------+------------------------+
| **Allowed values** | global, gcc-high, dod  |
+--------------------+------------------------+

resource
--------

This block configures which logging sources to pull from the Microsoft Graph REST API.

- `resource\\name`_
- `resource\\relationship`_

+----------------------------------+----------------------------------------------+
| Options                          | Allowed values                               |
+==================================+==============================================+
| `resource\\name`_                | Any string                                   |
+----------------------------------+----------------------------------------------+
| `resource\\relationship`_        | Any string                                   |
+----------------------------------+----------------------------------------------+

resource\\name
^^^^^^^^^^^^^^

The name of the resource (i.e., specific API endpoint) to query for logs. Additional information on the Microsoft Graph REST API endpoints can be found at this `link <https://learn.microsoft.com/en-us/graph/api/overview?view=graph-rest-1.0>`_.

+--------------------+--------------+
| **Default value**  | N/A          |
+--------------------+--------------+
| **Allowed values** | Any string   |
+--------------------+--------------+

resource\\relationship
^^^^^^^^^^^^^^^^^^^^^^

This section configures the types of content (`relationships`) to obtain logs of. For the security resource, this includes the following relationships:

- alerts: Legacy alert from supported Azure and Microsoft 365 Defender security providers.
- alerts_v2: An enrichened version of alerts that contains additional information on suspicious activies and related collections of alerts.
- incidents: Correlated alerts and associated data that make up the story of an attack (part of Microsoft 365 Defender).
- secureScores: The tenant's security score per day, at the tenant and control level.
- cases/eDiscoveryCases: Contains custodians, searches, and review sets from Microsoft Purview eDiscovery Premium.

+--------------------+--------------+
| **Default value**  | N/A          |
+--------------------+--------------+
| **Allowed values** | Any string   |
+--------------------+--------------+

.. note:: Resource blocks can be repeated to give the possibility to connect with more than one API within a tenant.

Example of configuration
------------------------

.. code-block:: xml

    <ms-graph>
        <enabled>yes</enabled>
        <only_future_events>yes</only_future_events>
        <curl_max_size>10M</curl_max_size>
        <run_on_start>yes</run_on_start>
        <interval>5m</interval>
        <version>v1.0</version>
        <api_auth>
          <client_id>your_client_id</client_id>
          <tenant_id>your_tenant_id</tenant_id>
          <secret_value>your_secret_value</secret_value>
        </api_auth>
        <resource>
          <name>security</name>
          <relationship>alerts_v2</relationship>
          <relationship>incidents</relationship>
        </resource>
        <resource>
          <name>auditLogs</name>
          <relationship>signIns</relationship>
        </resource>
    </ms-graph>
