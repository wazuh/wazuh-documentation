.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the office365 configuration section of ossec.conf, which configures the collection of Microsoft 365 audit events.

.. _reference_ossec_office365:

office365
=========

.. topic:: XML section name

   .. code-block:: xml

      <office365>
      </office365>

The ``<office365>`` section configures the collection of Microsoft 365 audit events through the Office 365 Management Activity API.

.. note::
   This module is supported on Windows, Linux, and macOS. Enable it on only one agent to avoid collecting duplicate events.

Options
-------

- `enabled`_
- `only_future_events`_
- `interval`_
- `curl_max_size`_
- `api_auth`_
- `subscriptions`_

enabled
^^^^^^^

Enables or disables the Office 365 module.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

only_future_events
^^^^^^^^^^^^^^^^^^^^

Set it to yes to collect events generated since the Wazuh manager was started.

By default, when Wazuh starts it will only read all log content from Office365 since the manager started.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

interval
^^^^^^^^

Specifies the interval between module executions.

.. note::
   When Wazuh starts, it waits for the configured time interval before running the first scan, unless the module has already been running before and the ``only_future_events`` option is set to no.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | 10m                                                                                          |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | A positive number that should contain a suffix character indicating a time unit, such as, s  |
|                      | (seconds), m (minutes), h (hours), d (days)                                                  |
+----------------------+----------------------------------------------------------------------------------------------+

curl_max_size
^^^^^^^^^^^^^^

Specifies the maximum size allowed for the Office365 API response.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | 1M                                                                                           |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | A positive number that should contain a suffix character indicating a size unit, such as b/B |
|                      | (bytes), k/K (kilobytes), m/M (megabytes), and g/G (gigabytes).                              |
+----------------------+----------------------------------------------------------------------------------------------+

api_auth
^^^^^^^^

This block configures the credential for the **authentication** with the Office365 REST API.

- `api_auth\\tenant_id`_
- `api_auth\\client_id`_
- `api_auth\\client_secret_path`_
- `api_auth\\client_secret`_
- `api_auth\\api_type`_

.. warning::
   In case of invalid configuration, after the third scan attempt, a warning message is generated in the log file and an alert is triggered.

api_auth\\tenant_id
~~~~~~~~~~~~~~~~~~~~~~~

Tenant id of your application registered in Azure.

+----------------------+--------------+
| **Default value**    | N/A          |
+----------------------+--------------+
| **Allowed values**   | Any string   |
+----------------------+--------------+

api_auth\\client_id
~~~~~~~~~~~~~~~~~~~~~~~

Client id of your application registered in Azure.

+----------------------+--------------+
| **Default value**    | N/A          |
+----------------------+--------------+
| **Allowed values**   | Any string   |
+----------------------+--------------+

api_auth\\client_secret_path
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Path of the file that contains the client secret value of your application registered in Azure. Incompatible with ``client_secret`` option.

+----------------------+--------------+
| **Default value**    | N/A          |
+----------------------+--------------+
| **Allowed values**   | Any string   |
+----------------------+--------------+

api_auth\\client_secret
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Client secret value of your application registered in Azure.

+----------------------+--------------+
| **Default value**    | N/A          |
+----------------------+--------------+
| **Allowed values**   | Any string   |
+----------------------+--------------+

api_auth\\api_type
~~~~~~~~~~~~~~~~~~~~~~

Type of Microsoft 365 subscription plan used by the tenant.

+----------------------+-----------------------------+
| **Default value**    | commercial                  |
+----------------------+-----------------------------+
| **Allowed values**   | commercial, gcc, gcc-high   |
+----------------------+-----------------------------+

.. note::
   This block can be repeated to give the possibility to connect with more than one tenant on Office 365.

subscriptions
^^^^^^^^^^^^^^

This block configures the internal options in the Office365 REST API.

- `subscriptions\\subscription`_

subscriptions\\subscription
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This section configures the content types from which to collect audit logs. These are the subscription types that can be configured:

- Audit.AzureActiveDirectory: User identity management.
- Audit.Exchange: Mail and calendaring server.
- Audit.SharePoint: Web-based collaborative platform.
- Audit.General: Includes all other workloads not included in the previous content types.
- DLP.All: Data loss prevention workloads.

+----------------------+--------------+
| **Default value**    | N/A          |
+----------------------+--------------+
| **Allowed values**   | Any string   |
+----------------------+--------------+

Sample configuration
---------------------

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
       <api_type>commercial</api_type>
     </api_auth>
     <subscriptions>
       <subscription>Audit.AzureActiveDirectory</subscription>
       <subscription>Audit.General</subscription>
     </subscriptions>
   </office365>

Example of multiple tenants
------------------------------

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
       <api_type>commercial</api_type>
     </api_auth>
     <api_auth>
       <tenant_id>your_tenant_id_2</tenant_id>
       <client_id>your_client_id_2</client_id>
       <client_secret>your_client_secret_2</client_secret>
       <api_type>commercial</api_type>
     </api_auth>
     <subscriptions>
       <subscription>Audit.AzureActiveDirectory</subscription>
       <subscription>Audit.General</subscription>
     </subscriptions>
   </office365>
