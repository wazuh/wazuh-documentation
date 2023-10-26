.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh dashboard plugin includes a configuration file where you can define custom values for several options. Learn more about it in this section.

.. _wazuh_dashboard_config_file:

Configuration file
==================

The Wazuh dashboard plugin includes a configuration file located at ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` where you can define custom values for several options. This section describes all the settings available in this file.

If you are using the Wazuh Kibana plugin, you can find this configuration file at ``/usr/share/kibana/data/wazuh/config/wazuh.yml``. 

The configuration file shows the default values for all of the possible options. You can edit the file, uncomment any of them and apply the desired values. You can also edit these settings from the Wazuh dashboard in *Settings > Configuration*.

The configuration file reference is organized by sections:

.. contents::
   :local:
   :depth: 2
   :backlinks: none

General options
---------------

hosts
^^^^^

Defines the list of APIs to connect with your Wazuh managers.

.. code-block:: yaml

    hosts:
        - <id>:
            url: http(s)://<url>
            port: <port>
            username: <username>
            password: <password>

.. note::

    It is required to specify at least one host.

This is an example of a multi-host configuration:

.. code-block:: yaml

    hosts:
        - wazuh_prod:
            url: https://wazuh.com
            port: 55000
            username: wazuh-wui
            password: secret_password
            run_as: false
        - wazuh_test:
            url: https://localhost
            port: 55000
            username: wazuh-wui
            password: wazuh-wui
            run_as: false


pattern
^^^^^^^

Default index pattern to use on the app. If there are no valid index patterns on Elasticsearch, the app will automatically create one with the name indicated in this option.

+--------------------+-------------------------+
| **Default value**  | wazuh-alerts-*          |
+--------------------+-------------------------+
| **Allowed values** | Any valid index pattern |
+--------------------+-------------------------+

timeout
^^^^^^^

Defines the maximum time the app will wait for an API response when making requests to it. It will be ignored if the value is set under 1500 milliseconds.

+--------------------+-------------------------------+
| **Default value**  | 20000 (milliseconds)          |
+--------------------+-------------------------------+
| **Allowed values** | Any number starting from 1500 |
+--------------------+-------------------------------+

ip.selector
^^^^^^^^^^^

Defines if the user is allowed to change the selected index pattern directly from the top menu bar.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

ip.ignore
^^^^^^^^^

Disable certain index pattern names from being available in the index pattern selector from the Wazuh dashboard. An empty list (the default value) won't ignore any valid index pattern.

+--------------------+---------------------------------------------+
| **Default value**  | []                                          |
+--------------------+---------------------------------------------+
| **Allowed values** | Array of strings. Eg: ["wazuh-archives-\*"] |
+--------------------+---------------------------------------------+

logs.level
^^^^^^^^^^

Set the logging level for the Wazuh dashboard log files.

+--------------------+------------+
| **Default value**  | info       |
+--------------------+------------+
| **Allowed values** | info,debug |
+--------------------+------------+

hideManagerAlerts
^^^^^^^^^^^^^^^^^

Hide the manager alerts in the dashboard visualizations.

+--------------------+------------+
| **Default value**  | false      |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

Monitoring
----------

.. _wazuh_monitoring_enabled:

wazuh.monitoring.enabled
^^^^^^^^^^^^^^^^^^^^^^^^

Enable or disable the ``wazuh-monitoring`` index creation and/or visualization:

- When the value is set to ``true``, the app will show the *Agents status* visualization and will insert monitoring-related data.
- When the value is set to ``false``, the app won't show the visualization and won't insert monitoring-related data.
- When the value is set to ``worker``, the app will show the visualization, but won't insert monitoring-related data.

+--------------------+-------------------+
| **Default value**  | true              |
+--------------------+-------------------+
| **Allowed values** | true,false,worker |
+--------------------+-------------------+

.. warning::

    The Wazuh dashboard user interface allows selecting ``true`` and ``false`` only. To set the ``worker`` value, you must edit the configuration file instead.

.. _wazuh_monitoring_frequency:

wazuh.monitoring.frequency
^^^^^^^^^^^^^^^^^^^^^^^^^^

Define in seconds the frequency of API requests to get the state of the agents to create a new document in the `wazuh-monitoring` index with this data.

+--------------------+-----------------------------+
| **Default value**  | 900 (seconds)               |
+--------------------+-----------------------------+
| **Allowed values** | Any number starting from 60 |
+--------------------+-----------------------------+

.. warning::

    Although the minimum value can be ``60``, we recommend adjusting it to at least ``300`` seconds to avoid overloading issues due to the excessive creation of documents into the index.

wazuh.monitoring.pattern
^^^^^^^^^^^^^^^^^^^^^^^^

Default Wazuh monitoring index pattern to use for the app. This setting does not remove any existing patterns or templates, it just updates the app to add new ones.

+--------------------+-------------------------+
| **Default value**  | wazuh-monitoring-*      |
+--------------------+-------------------------+
| **Allowed values** | Any valid index pattern |
+--------------------+-------------------------+

.. _wazuh_monitoring_creation:

wazuh.monitoring.creation
^^^^^^^^^^^^^^^^^^^^^^^^^

Configure wazuh-monitoring-* indices custom creation interval.

+--------------------+------------------------------------------------+
| **Default value**  | w (weekly)                                     |
+--------------------+------------------------------------------------+
| **Allowed values** | h (hourly), d (daily), w (weekly), m (monthly) |
+--------------------+------------------------------------------------+

Health checks
-------------

checks.pattern
^^^^^^^^^^^^^^

Enable or disable the index pattern health check when opening the app.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

checks.template
^^^^^^^^^^^^^^^

Enable or disable the template health check when opening the app.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

checks.api
^^^^^^^^^^

Enable or disable the Wazuh API health check when opening the app.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

checks.setup
^^^^^^^^^^^^

Enable or disable the setup health check when opening the app.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

checks.fields
^^^^^^^^^^^^^

Enable or disable the known fields health check when opening the app.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

checks.metaFields
^^^^^^^^^^^^^^^^^

Enable or disable the metaFields health check when opening the app.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

checks.timeFilter
^^^^^^^^^^^^^^^^^

Enable or disable the timeFilter health check when opening the app.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

checks.maxBuckets
^^^^^^^^^^^^^^^^^

Enable or disable the maxBuckets health check when opening the app.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

Extensions
----------

.. note::

    These options are only applied for newly inserted APIs on the *Settings* tab, not for the existing ones.

extensions.audit
^^^^^^^^^^^^^^^^

Enable or disable the Audit tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

extensions.aws
^^^^^^^^^^^^^^

Enable or disable the Amazon (AWS) tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | false      |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

extensions.ciscat
^^^^^^^^^^^^^^^^^

Enable or disable the CIS-CAT tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | false      |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

extensions.docker
^^^^^^^^^^^^^^^^^

Enable or disable the Docker listener tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | false      |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

extensions.gcp
^^^^^^^^^^^^^^

Enable or disable the GCP tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | false      |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

extensions.gdpr
^^^^^^^^^^^^^^^

Enable or disable the GDPR tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

extensions.github
^^^^^^^^^^^^^^^^^

Enable or disable the GitHub tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | false      |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

extensions.hipaa
^^^^^^^^^^^^^^^^

Enable or disable the HIPAA tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

extensions.nist
^^^^^^^^^^^^^^^

Enable or disable the NIST tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

extensions.office
^^^^^^^^^^^^^^^^^

Enable or disable the Office 365 tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | false      |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

extensions.oscap
^^^^^^^^^^^^^^^^

Enable or disable the OSCAP tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | false      |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

extensions.osquery
^^^^^^^^^^^^^^^^^^

Enable or disable the Osquery tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | false      |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

extensions.pci
^^^^^^^^^^^^^^

Enable or disable the PCI DSS tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

extensions.tsc
^^^^^^^^^^^^^^

Enable or disable the TSC tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

extensions.virustotal
^^^^^^^^^^^^^^^^^^^^^

Enable or disable the VirusTotal tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | false      |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

Advanced index options
----------------------

.. warning::

    These options are only valid if they're modified before starting the Wazuh dashboard for the very first time.

    You can read more about configuring the shards and replicas in :doc:`/user-manual/wazuh-indexer/wazuh-indexer-tuning`.


wazuh.monitoring.shards
^^^^^^^^^^^^^^^^^^^^^^^

Define the number of shards to use for the ``wazuh-monitoring-*`` indices.

+--------------------+----------------------------+
| **Default value**  | 1                          |
+--------------------+----------------------------+
| **Allowed values** | Any number starting from 1 |
+--------------------+----------------------------+

wazuh.monitoring.replicas
^^^^^^^^^^^^^^^^^^^^^^^^^

Define the number of replicas to use for the ``wazuh-monitoring-*`` indices.

+--------------------+----------------------------+
| **Default value**  | 0                          |
+--------------------+----------------------------+
| **Allowed values** | Any number starting from 0 |
+--------------------+----------------------------+

Unauthorized roles
------------------

disabled_roles
^^^^^^^^^^^^^^

Disable Wazuh for the Elasticsearch / OpenSearch roles defined here.

.. code-block:: yaml

    disabled_roles: 
        - wazuh_disabled

Sample alerts
-------------

alerts.sample.prefix
^^^^^^^^^^^^^^^^^^^^

Define the index name prefix of sample alerts. It must match the template used by the index pattern to avoid unknown fields in dashboards.

+--------------------+----------------------------+
| **Default value**  | wazuh-alerts-4.x-          |
+--------------------+----------------------------+
| **Allowed values** | Any valid index pattern    |
+--------------------+----------------------------+

Enrollment DNS
--------------

enrollment.dns
^^^^^^^^^^^^^^

Specifies the Wazuh registration server, used for the agent enrollment.

+--------------------+----------------------------+
| **Default value**  | ''                         |
+--------------------+----------------------------+
| **Allowed values** | Any string                 |
+--------------------+----------------------------+

enrollment.password
^^^^^^^^^^^^^^^^^^^

Specifies the password used to authenticate during the agent enrollment.

+--------------------+----------------------------+
| **Default value**  | ''                         |
+--------------------+----------------------------+
| **Allowed values** | Any string                 |
+--------------------+----------------------------+

Cron
----

cron.prefix
^^^^^^^^^^^

Define the index prefix of predefined jobs.

+--------------------+----------------------------+
| **Default value**  | ''                         |
+--------------------+----------------------------+
| **Allowed values** | Any string                 |
+--------------------+----------------------------+

cron.statistics.status
^^^^^^^^^^^^^^^^^^^^^^

Enable or disable the statistics tasks.

+--------------------+----------------------------+
| **Default value**  | true                       |
+--------------------+----------------------------+
| **Allowed values** | true,false                 |
+--------------------+----------------------------+

cron.statistics.apis
^^^^^^^^^^^^^^^^^^^^

Enter the ID of the hosts you want to save data from, and leave this empty to run the task on every host.

+--------------------+----------------------------+
| **Default value**  | []                         |
+--------------------+----------------------------+
| **Allowed values** | Array of APIs              |
+--------------------+----------------------------+

.. _cron_statistics_interval:

cron.statistics.interval
^^^^^^^^^^^^^^^^^^^^^^^^

Define the frequency of task execution using cron schedule expressions.

+--------------------+----------------------------+
| **Default value**  | ``0 */5 * * * *``          |
+--------------------+----------------------------+
| **Allowed values** | Any cron expressions       |
+--------------------+----------------------------+

cron.statistics.index.name
^^^^^^^^^^^^^^^^^^^^^^^^^^

Define the name of the index in which the documents will be saved.

+--------------------+----------------------------+
| **Default value**  | statistics                 |
+--------------------+----------------------------+
| **Allowed values** | Any valid index pattern    |
+--------------------+----------------------------+

.. _cron_statistics_index_creation:

cron.statistics.index.creation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Define the interval in which a new index will be created.

+--------------------+-------------------------------------------------+
| **Default value**  | w                                               |
+--------------------+-------------------------------------------------+
| **Allowed values** | h (hourly), d (daily), w (weekly), m (monthly)  |
+--------------------+-------------------------------------------------+

cron.statistics.shards
^^^^^^^^^^^^^^^^^^^^^^

Define the number of shards to use for the statistics indices.

+--------------------+----------------------------+
| **Default value**  | 1                          |
+--------------------+----------------------------+
| **Allowed values** | Any number starting from 1 |
+--------------------+----------------------------+

cron.statistics.replicas
^^^^^^^^^^^^^^^^^^^^^^^^

Define the number of replicas to use for the statistics indices.

+--------------------+----------------------------+
| **Default value**  | 0                          |
+--------------------+----------------------------+
| **Allowed values** | Any number starting from 0 |
+--------------------+----------------------------+

Custom branding
---------------

Edit the settings shown below to use custom branding elements such as logos, and header and footer text.

.. warning::

    Please, take into consideration the following notes: 
        - The value of any  ``customization.logo.*`` setting must follow the pattern ``custom/images/<setting_name>.<image_format>``.
        - The path ``custom/images/`` included in every ``customization.logo.*`` setting is relative to the ``/plugins/wazuh/public/assets/`` folder.
        - Setting or modifying any ``customization.logo.*`` setting by hand is not recommended. Use the UI instead.
        - The in-file ``customization.logo.*`` settings are flagged for deprecation, and will be no longer supported in future releases.

customization.enabled
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Enable or disable the custom branding.

+--------------------+----------------------------+
| **Default value**  | true                       |
+--------------------+----------------------------+
| **Allowed values** | true,false                 |
+--------------------+----------------------------+

customization.logo.app
^^^^^^^^^^^^^^^^^^^^^^

Define the image's path, name and extension for the main menu logo.

+--------------------+----------------------------+
| **Default value**  | ''                         |
+--------------------+----------------------------+
| **Allowed values** | Any string                 |
+--------------------+----------------------------+

customization.logo.sidebar
^^^^^^^^^^^^^^^^^^^^^^^^^^

Define the image's path, name and extension for the logo to display in the platform's navigation drawer, this is, the main sidebar collapsible menu.

+--------------------+----------------------------+
| **Default value**  | ''                         |
+--------------------+----------------------------+
| **Allowed values** | Any string                 |
+--------------------+----------------------------+

customization.logo.healthcheck
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Define the image's path, name and extension for the Healthcheck logo.

+--------------------+----------------------------+
| **Default value**  | ''                         |
+--------------------+----------------------------+
| **Allowed values** | Any string                 |
+--------------------+----------------------------+

customization.logo.reports
^^^^^^^^^^^^^^^^^^^^^^^^^^

Define the image's path, name and extension for the logo to use in the PDF reports generated by the app.

+--------------------+----------------------------+
| **Default value**  |''                          |
+--------------------+----------------------------+
| **Allowed values** | Any string                 |
+--------------------+----------------------------+

customization.reports.header
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Set the header of the PDF reports. To use an empty header, type a space " " in the field. If this field is empty, it uses the default header.

+--------------------+----------------------------+
| **Default value**  |''                          |
+--------------------+----------------------------+
| **Allowed values** | Any string                 |
+--------------------+----------------------------+

customization.reports.footer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Set the footer of the PDF reports. To use an empty footer, type a space " " in the field. If this field is empty, it uses the default footer.

+--------------------+----------------------------+
| **Default value**  |''                          |
+--------------------+----------------------------+
| **Allowed values** | Any string                 |
+--------------------+----------------------------+

ISM rollover policy
-------------------

.. warning::

    These options are only valid if they're modified before starting the Wazuh dashboard for the very first time.

    You can read more about customizating the rollover policy in :doc:`/user-manual/wazuh-indexer/index-life-management`.

ism.rollover.enabled
^^^^^^^^^^^^^^^^^^^^

Toggles the verification of the rollover policy. If set to ``true``, the rollover policy will be applied to the indices that match the index patterns defined in ``ism.rollover.index_patterns``, only if there isn't any other policy managing these indices.

This options does not enable or disable the policy itself. 

+--------------------+----------------------------+
| **Default value**  | true                       |
+--------------------+----------------------------+
| **Allowed values** | true,false                 |
+--------------------+----------------------------+

ism.rollover.index_patterns
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The policy will be applied to the indices that match the patterns defined here. The index format must match the pattern: ``^.*-\d+$``. The managed indices must use an alias. Set ``index.plugins.index_state_management.rollover_alias`` as the alias to rollover.

The ``wazuh-alerts-4.x-*`` and ``wazuh-archives-4.x-*`` indices  are configured to use the ``wazuh-alerts`` and ``wazuh-archives`` aliases respectively. The rollover policy is specially designed to manage these indices, so it is not recommended to change this setting as it may cause the policy to be applied to indices that do not use an alias.

Changing the index pattern **will not**:
    * change or set the alias of the indices.
    * affect the indices that are already managed by the rollover policy.
    * change the calculation of the ``min_doc_count`` condition, as it is based on the number of primary shards of the wazuh-alerts and wazuh-archives indices.

+--------------------+---------------------------------------------------------------------+
| **Default value**  | ["wazuh-alerts\*", "wazuh-archives\*", "-wazuh-alerts-4.x-sample*"] |
+--------------------+---------------------------------------------------------------------+
| **Allowed values** | Array of strings. Eg: ["wazuh-archives-\*"]                         |
+--------------------+---------------------------------------------------------------------+

ism.rollover.priority
^^^^^^^^^^^^^^^^^^^^^

The priority of the policy. The higher the value, the higher the priority. If there are multiple policies that match the index, the one with the highest priority will be applied.
There cannot be two policies with the same priority.

+--------------------+-----------------------------------+
| **Default value**  | 50                                |
+--------------------+-----------------------------------+
| **Allowed values** | Any integer number greater than 0 |
+--------------------+-----------------------------------+

ism.rollover.min_index_age
^^^^^^^^^^^^^^^^^^^^^^^^^^

The minimum age required to roll over the index. Index age is the time between its creation and the present. Supported units are d (days), h (hours), m (minutes), s (seconds), ms (milliseconds), and micros (microseconds).

Rolling over an index too often might cause performance issues. The minimum recommended value is 7 days.

+--------------------+---------+
| **Default value**  | 7d      |
+--------------------+---------+
| **Allowed values** | String  |
+--------------------+---------+

ism.rollover.min_primary_shard_size
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The minimum storage size in GB of a single primary shard required to roll over the index. For example, if you set ``min_primary_shard_size`` to 30 GB and one of the primary shards in the index has a size greater than the condition, the rollover occurs.

The recommended shard sizes are 10-30 GB for search-heavy workloads and 30-50 GB for write-heavy workloads. The shard size must never exceed the 50 GB. In Wazuh, we use 25 GB, in order to achieve a good balance between both workloads.

+--------------------+-----------------------------------+
| **Default value**  | 25                                |
+--------------------+-----------------------------------+
| **Allowed values** | Any positive number               |
+--------------------+-----------------------------------+

ism.rollover.min_doc_count
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The minimum number of documents required to roll over the index.

The documents are distributed across the shards of the index. Although a shard can contain up to 2^31 documents, it's recommended to keep the documents-per-shard below 200 million.

+--------------------+-----------------------------------+
| **Default value**  | 200000000                         |
+--------------------+-----------------------------------+
| **Allowed values** | Any positive number               |
+--------------------+-----------------------------------+

ism.rollover.overwrite
^^^^^^^^^^^^^^^^^^^^^^

If set to ``true``, the ``wazuh_rollover_policy`` will be updated with the values from the previous settings. Restarting Wazuh dashboard is required to apply the changes.

+--------------------+----------------------------+
| **Default value**  | false                      |
+--------------------+----------------------------+
| **Allowed values** | true,false                 |
+--------------------+----------------------------+


Example
-------

This is an example of the wazuh.yml configuration:

.. code-block:: yaml
    
    # General options
    hosts:
        - env-1:
            url: https://env-1.example
            port: 55000
            username: wazuh-wui
            password: wazuh-wui
            run_as: true
        - env-2:
            url: https://env-2.example
            port: 55000
            username: wazuh-wui
            password: wazuh-wui
            run_as: true
    pattern: 'wazuh-alerts-*'
    timeout: 20000
    ip.selector: true
    ip.ignore: []
    logs.level: info
    hideManagerAlerts: true

    # Monitoring
    wazuh.monitoring.enabled: true
    wazuh.monitoring.frequency: 900
    wazuh.monitoring.pattern: wazuh-monitoring-*
    wazuh.monitoring.creation: w

    # Health checks
    checks.pattern : true
    checks.template: true
    checks.fields  : true
    checks.api     : true
    checks.setup   : true
    checks.metaFields: true
    checks.timeFilter: true
    checks.maxBuckets: true

    # Extensions
    extensions.audit     : true
    extensions.aws       : false
    extensions.ciscat    : false
    extensions.docker    : false
    extensions.gcp       : false
    extensions.gdpr      : true
    extensions.github    : false
    extensions.hipaa     : true
    extensions.nist      : true
    extensions.office    : false
    extensions.oscap     : false
    extensions.osquery   : false
    extensions.pci       : true
    extensions.tsc       : true
    extensions.virustotal: false

    # Advanced index options
    wazuh.monitoring.shards: 1
    wazuh.monitoring.replicas: 0    

    # Custom branding
    customization.enabled: true
    customization.logo.app: 'custom/images/customization.logo.app.jpg'
    customization.logo.sidebar: 'custom/images/customization.logo.sidebar.png'
    customization.logo.healthcheck: 'custom/images/customization.logo.healthcheck.svg'
    customization.logo.reports: 'custom/images/customization.logo.reports.jpg'
    customization.reports.footer: '123 Custom footer Ave.\nSan Jose, CA 95148'
    customization.reports.header: 'Custom Company\ninfo@custom.com\n@social_reference'

    # Unauthorized roles
    disabled_roles: 
        - wazuh_disabled

    # Sample alerts
    alerts.sample.prefix: wazuh-alerts-4.x-

    # Cron
    cron.prefix: wazuh
    cron.statistics.status: true
    cron.statistics.apis: []
    cron.statistics.interval: 0 */5 * * * *
    cron.statistics.index.name: statistics
    cron.statistics.index.creation: w
    cron.statistics.shards: 1
    cron.statistics.replicas: 0

    # Enrollment DNS
    enrollment.dns: ''
    enrollment.password: ''

    # ISM rollover policy
    ism.rollover.enabled: true
    ism.rollover.index_patterns: ["wazuh-alerts*", "wazuh-archives*", "-wazuh-alerts-4.x-sample*"]
    ism.rollover.priority: 50
    ism.rollover.min_index_age: 7d
    ism.rollover.min_primary_shard_size: 25gb
    ism.rollover.min_doc_count: 200000000
    ism.rollover.overwrite: false