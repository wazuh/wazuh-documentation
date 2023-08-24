.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out how to configure the Wazuh Office365 module. Learn more about it in this section of the Wazuh documentation.
  
.. _office365-module:

office365
=========

.. note::

    This module only works on Windows, Linux, and macOS. It is recommended to have it enabled only in one agent to avoid repeated logs.

.. topic:: XML section name

	.. code-block:: xml

		<office365>
		</office365>

Configuration options of the Office365 module.


Options
-------

- `enabled`_
- `only_future_events`_
- `interval`_
- `curl_max_size`_
- `api_auth`_
- `api_auth\\tenant_id`_
- `api_auth\\client_id`_
- `api_auth\\client_secret_path`_
- `api_auth\\client_secret`_
- `subscriptions`_
- `subscriptions\\subscription`_

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
| `api_auth`_                            | N/A                             |
+----------------------------------------+---------------------------------+
| `api_auth\\tenant_id`_                 | Any string                      |
+----------------------------------------+---------------------------------+
| `api_auth\\client_id`_                 | Any string                      |
+----------------------------------------+---------------------------------+
| `api_auth\\client_secret_path`_        | Any string                      |
+----------------------------------------+---------------------------------+
| `api_auth\\client_secret`_             | Any string                      |
+----------------------------------------+---------------------------------+
| `subscriptions`_                       | N/A                             |
+----------------------------------------+---------------------------------+
| `subscriptions\\subscription`_         | Any string                      |
+----------------------------------------+---------------------------------+

enabled
^^^^^^^

Enabled the Office365 wodle.

+--------------------+-----------------------------+
| **Default value**  | yes                         |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

only_future_events
^^^^^^^^^^^^^^^^^^

Set it to **yes** to collect events generated since the Wazuh manager was started.

By default, when Wazuh starts it will only read all log content from Office365 since the manager started.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

interval
^^^^^^^^

The interval between Wazuh wodle executions.

.. note::

    When Wazuh starts, it waits for the configured time interval before running the first scan, unless the module has already been running before and the ``only_future_events`` option is set to no.

+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 10m                                                                                                                                     |
+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days) |
+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------+

curl_max_size
^^^^^^^^^^^^^

Specifies the maximum size allowed for the Office365 API response.

+--------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1M                                                                                                                                                           |
+--------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a size unit, such as b/B (bytes), k/K (kilobytes), m/M (megabytes), and g/G (gigabytes). |
+--------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------+

api_auth
--------

This block configures the credential for the **authentication** with the Office365 REST API.

- `api_auth\\tenant_id`_
- `api_auth\\client_id`_
- `api_auth\\client_secret_path`_
- `api_auth\\client_secret`_

.. warning::

    In case of invalid configuration, after the third scan attempt, a warning message is generated in the log file and an alert is triggered.

+----------------------------------------+----------------------------------------------+
| Options                                | Allowed values                               |
+========================================+==============================================+
| `api_auth\\tenant_id`_                 | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `api_auth\\client_id`_                 | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `api_auth\\client_secret_path`_        | Any string                                   |
+----------------------------------------+----------------------------------------------+
| `api_auth\\client_secret`_             | Any string                                   |
+----------------------------------------+----------------------------------------------+

api_auth\\tenant_id
^^^^^^^^^^^^^^^^^^^

Tenant id of your application registered in Azure.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any string         |
+--------------------+--------------------+

api_auth\\client_id
^^^^^^^^^^^^^^^^^^^

Client id of your application registered in Azure.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any string         |
+--------------------+--------------------+

api_auth\\client_secret_path
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Path of the file that contains the client secret value of your application registered in Azure. Incompatible with ``client_secret`` option.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any string         |
+--------------------+--------------------+

api_auth\\client_secret
^^^^^^^^^^^^^^^^^^^^^^^

Client secret value of your application registered in Azure.

+--------------------+--------------------+
| **Default value**  | N/A                |
+--------------------+--------------------+
| **Allowed values** | Any string         |
+--------------------+--------------------+

.. note::

    This block can be repeated to give the possibility to connect with more than one tenant on Office 365.

subscriptions
-------------

This block configures the internal options in the Office365 REST API.

- `subscriptions\\subscription`_

+----------------------------------+----------------------------------------------+
| Options                          | Allowed values                               |
+==================================+==============================================+
| `subscriptions\\subscription`_   | Any string                                   |
+----------------------------------+----------------------------------------------+

subscriptions\\subscription
^^^^^^^^^^^^^^^^^^^^^^^^^^^

This section configures the content types from which to collect audit logs. These are the subscription types that can be configured:

- Audit.AzureActiveDirectory: User identity management.
- Audit.Exchange: Mail and calendaring server.
- Audit.SharePoint: Web-based collaborative platform.
- Audit.General: Includes all other workloads not included in the previous content types.
- DLP.All: Data loss prevention workloads.

+--------------------+--------------+
| **Default value**  | N/A          |
+--------------------+--------------+
| **Allowed values** | Any string   |
+--------------------+--------------+

Example of configuration
------------------------

.. code-block:: xml

    <office365>
        <enabled>yes</enabled>
        <interval>1m</interval>
        <curl_max_size>1M</curl_max_size>
        <only_future_events>yes</only_future_events>
        <api_auth>
            <tenant_id>your_tenant_id</tenant_id>
            <client_id>your_client_id</client_id>
            <client_secret>your_client_secret</client_secret>
        </api_auth>
        <subscriptions>
            <subscription>Audit.AzureActiveDirectory</subscription>
            <subscription>Audit.General</subscription>
        </subscriptions>
    </office365>

Example of multiple tenants
---------------------------

.. code-block:: xml

    <office365>
        <enabled>yes</enabled>
        <interval>1m</interval>
        <curl_max_size>1M</curl_max_size>
        <only_future_events>yes</only_future_events>
        <api_auth>
            <tenant_id>your_tenant_id</tenant_id>
            <client_id>your_client_id</client_id>
            <client_secret>your_client_secret</client_secret>
        </api_auth>
        <api_auth>
            <tenant_id>your_tenant_id_2</tenant_id>
            <client_id>your_client_id_2</client_id>
            <client_secret>your_client_secret_2</client_secret>
        </api_auth>
        <subscriptions>
            <subscription>Audit.AzureActiveDirectory</subscription>
            <subscription>Audit.General</subscription>
        </subscriptions>
    </office365>
