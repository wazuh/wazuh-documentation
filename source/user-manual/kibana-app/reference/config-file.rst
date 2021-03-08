.. Copyright (C) 2021 Wazuh, Inc.

.. _kibana_config_file:

Configuration file
==================

The Wazuh Kibana plugin includes a configuration file (located at ``/usr/share/kibana/optimize/wazuh/config/wazuh.yml``) where you can define custom values for several options. This section describes all the settings available in this file.

The configuration file shows the default values for all of the possible options. You can edit the file, uncomment any of them and apply the desired values. You can also edit these settings from the Wazuh Kibana plugin in *Settings > Configuration*.

The configuration file reference is organized by sections:

`Basic options`_
    - `hosts`_
    - `pattern`_
    - `timeout`_
    - `ip.selector`_
    - `ip.ignore`_
    - `xpack.rbac.enabled`_
    - `logs.level`_
    - `hideManagerAlerts`_
    - `enrollment.dns`_

`Monitoring`_
    - `wazuh.monitoring.enabled`_
    - `wazuh.monitoring.frequency`_
    - `wazuh.monitoring.pattern`_
    - `wazuh.monitoring.creation`_

`Cron`_
    - `cron.prefix`_

`Statistics`_
    - `cron.statistics.status`_
    - `cron.statistics.apis`_
    - `cron.statistics.interval`_
    - `cron.statistics.index.name`_
    - `cron.statistics.index.creation`_

`Checks`_
    - `checks.pattern`_
    - `checks.template`_
    - `checks.api`_
    - `checks.setup`_
    - `checks.metaFields`_
    - `checks.timeFilter`_
    - `checks.fields`_
    
`Extensions`_
    - `extensions.pci`_
    - `extensions.gdpr`_
    - `extensions.audit`_
    - `extensions.ciscat`_
    - `extensions.aws`_
    - `extensions.virustotal`_
    - `extensions.osquery`_
    - `extensions.docker`_
    - `extensions.hipaa`_
    - `extensions.nist`_
    - `extensions.tsc`_
    - `extensions.oscap`_
    - `extensions.gcp`_

`Advanced index options`_
    - `wazuh.monitoring.shards`_
    - `wazuh.monitoring.replicas`_

Basic options
-------------

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
            run_as: <true|false>

.. note::

    It is required to specify at least one host.

This is an example of a multi-host configuration:

.. code-block:: yaml

    hosts:
        - wazuh_prod:
            url: https://wazuh.com
            port: 55000
            username: wazuh
            password: wazuh
            run_as: false
        - wazuh_test:
            url: https://localhost
            port: 55000
            username: wazuh
            password: wazuh
            run_as: false

pattern
^^^^^^^

Default index pattern to use on the app. If there's no valid index patterns on Elasticsearch, the app will automatically create one with the name indicated in this option.

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

api.selector
^^^^^^^^^^^^

Defines if the user is allowed to change the selected API directly from the Wazuh app top menu.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

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

Disable certain index pattern names from being available in index pattern selector from the Wazuh Kibana plugin. An empty list (the default value) won't ignore any valid index pattern.

+--------------------+---------------------------------------------+
| **Default value**  | []                                          |
+--------------------+---------------------------------------------+
| **Allowed values** | Array of strings. Eg: ["wazuh-archives-\*"] |
+--------------------+---------------------------------------------+

xpack.rbac.enabled
^^^^^^^^^^^^^^^^^^

Enable or disable X-Pack RBAC security capabilities when using the app.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

logs.level
^^^^^^^^^^

Set the logging level for the Wazuh Kibana plugin log files.

+--------------------+------------+
| **Default value**  | info       |
+--------------------+------------+
| **Allowed values** | info,debug |
+--------------------+------------+

hideManagerAlerts
^^^^^^^^^^^^^^^^^

Hide the manager's alerts in the dashboard visualizations.

+--------------------+------------+
| **Default value**  | false      |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

enrollment.dns
^^^^^^^^^^^^^^

Set the variable WAZUH_REGISTRATION_SERVER in agents deployment.

+--------------------+--------+
| **Default value**  | ''     |
+--------------------+--------+
| **Allowed values** | String |
+--------------------+--------+

Monitoring
----------

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

Default Wazuh monitoring index pattern to use for the app. This setting does not remove any existing patterns or templates, it just updates the app to add the new ones.

+--------------------+-------------------------+
| **Default value**  | wazuh-monitoring-*      |
+--------------------+-------------------------+
| **Allowed values** | Any valid index pattern |
+--------------------+-------------------------+

wazuh.monitoring.creation
^^^^^^^^^^^^^^^^^^^^^^^^^

Configure wazuh-monitoring-* indices custom creation interval.

+--------------------+------------------------------------------------+
| **Default value**  | d (daily)                                      |
+--------------------+------------------------------------------------+
| **Allowed values** | h (hourly), d (daily), w (weekly), m (monthly) |
+--------------------+------------------------------------------------+

Cron
----

cron.prefix
^^^^^^^^^^^

Customize the index prefix of predefined jobs. This change is not retroactive, if you change it new indexes will be created

+--------------------+--------------------+
| **Default value**  | wazuh              |
+--------------------+--------------------+
| **Allowed values** | String. Eg: "test” |
+--------------------+--------------------+

Statistics
----------

cron.statistics.status
^^^^^^^^^^^^^^^^^^^^^^

Custom setting to enable/disable statistics tasks

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

cron.statistics.apis
^^^^^^^^^^^^^^^^^^^^

Enter the ID of the APIs you want to save data from, leave this empty to run
the task on all configured APIs

+--------------------+----+
| **Default value**  | [] |
+--------------------+----+
| **Allowed values** | [] |
+--------------------+----+

cron.statistics.interval
^^^^^^^^^^^^^^^^^^^^^^^^

Define the frequency of task execution using cron schedule expressions.

+--------------------+--------------------------+
| **Default value**  | 0 * /5 * * * *           |
+--------------------+--------------------------+
| **Allowed values** | cron schedule expression |
+--------------------+--------------------------+

cron.statistics.index.name
^^^^^^^^^^^^^^^^^^^^^^^^^^

Define the name of the index in which the documents are to be saved.

+--------------------+------------+
| **Default value**  | statistics |
+--------------------+------------+
| **Allowed values** | []         |
+--------------------+------------+

cron.statistics.index.creation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Define the interval in which the index will be created.

+--------------------+------------------------------------------------+
| **Default value**  | w                                              |
+--------------------+------------------------------------------------+
| **Allowed values** | h (hourly), d (daily), w (weekly), m (monthly) |
+--------------------+------------------------------------------------+

Checks
------

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

Change Kibana default setting for fields.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

checks.timeFilter
^^^^^^^^^^^^^^^^^

Enable or disable the time filter seting to 24h health check when opening the app.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

Extensions
----------

.. note::

    These options are only applied for newly inserted APIs on the *Settings* tab, not for the existing ones.

extensions.pci
^^^^^^^^^^^^^^

Enable or disable the PCI DSS tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | true       |
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

extensions.audit
^^^^^^^^^^^^^^^^

Enable or disable the Audit tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | true       |
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

extensions.aws
^^^^^^^^^^^^^^

Enable or disable the Amazon (AWS) tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | false      |
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

extensions.osquery
^^^^^^^^^^^^^^^^^^

Enable or disable the Osquery tab on *Overview* and *Agents*.

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

extensions.hipaa
^^^^^^^^^^^^^^^^

Enable or disable the hipaa listener tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

extensions.nist
^^^^^^^^^^^^^^^

Enable or disable the nist listener tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

extensions.tsc
^^^^^^^^^^^^^^

Enable or disable the tsc listener tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

extensions.oscap
^^^^^^^^^^^^^^^^

Enable or disable the oscap listener tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | false      |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

extensions.gcp
^^^^^^^^^^^^^^

Enable or disable the gcp listener tab on *Overview* and *Agents*.

+--------------------+------------+
| **Default value**  | false      |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

Advanced index options
----------------------

.. warning::

    These options are only valid if they're modified before starting the Kibana service for the very first time.

    You can read more about configuring the shards and replicas in :ref:`elastic_tuning`.


wazuh-version.replicas
^^^^^^^^^^^^^^^^^^^^^^

Define the number of replicas to use for the ``wazuh-version`` index.

+--------------------+----------------------------+
| **Default value**  | 1                          |
+--------------------+----------------------------+
| **Allowed values** | Any number starting from 0 |
+--------------------+----------------------------+


wazuh.monitoring.shards
^^^^^^^^^^^^^^^^^^^^^^^

Define the number of shards to use for the ``wazuh-monitoring-*`` indices.

+--------------------+----------------------------+
| **Default value**  | 2                          |
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
