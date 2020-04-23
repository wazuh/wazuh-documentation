.. Copyright (C) 2019 Wazuh, Inc.

.. _kibana_config_file:

Configuration file
==================

The Wazuh Kibana plugin configuration file is located at ``/usr/share/kibana/optimize/wazuh/config/wazuh.yml``. All of the options described below can also be changed through the Wazuh Kibana plugin :ref:`configuration <kibana_settings_configuration>` section.

The configuration file reference is organized by sections:

`Basic options`_
    - `pattern`_
    - `timeout`_
    - `ip.selector`_
    - `ip.ignore`_
    - `xpack.rbac.enabled`_
    - `admin`_
    - `logs.level`_
    - `hideManagerAlerts`_

`Monitoring`_
    - `wazuh.monitoring.enabled`_
    - `wazuh.monitoring.frequency`_
    - `wazuh.monitoring.pattern`_
    - `wazuh.monitoring.creation`_

`Checks`_
    - `checks.pattern`_
    - `checks.template`_
    - `checks.api`_
    - `checks.setup`_
    - `checks.fields`_

`Extensions`_
    - `extensions.pci`_
    - `extensions.gdpr`_
    - `extensions.audit`_
    - `extensions.oscap`_
    - `extensions.ciscat`_
    - `extensions.aws`_
    - `extensions.virustotal`_
    - `extensions.osquery`_
    - `extensions.docker`_

`Advanced index options`_
    - `wazuh-version.shards`_
    - `wazuh-version.replicas`_
    - `wazuh.monitoring.shards`_
    - `wazuh.monitoring.replicas`_

Basic options
-------------

pattern
^^^^^^^

Default index pattern to use on the Wazuh Kibana plugin. If there is no valid index patterns on Elasticsearch, the Wazuh Kibana plugin will automatically create one with the name indicated in this option.

+--------------------+-------------------------+
| **Default value**  | wazuh-alerts-3.x-*      |
+--------------------+-------------------------+
| **Allowed values** | Any valid index pattern |
+--------------------+-------------------------+

timeout
^^^^^^^

Defines the maximum timeout the Wazuh Kibana plugin use when making requests. It will be ignored if the value is set under 1500 milliseconds.

+--------------------+-------------------------------+
| **Default value**  | 20000 (milliseconds)          |
+--------------------+-------------------------------+
| **Allowed values** | Any number starting from 1500 |
+--------------------+-------------------------------+

api.selector
^^^^^^^^^^^^

Defines if the user is allowed to change the selected API directly from the Wazuh Kibana plugin top menu.

+--------------------+-------------------------------+
| **Default value**  | false                         |
+--------------------+-------------------------------+
| **Allowed values** | true,false                    |
+--------------------+-------------------------------+

ip.selector
^^^^^^^^^^^

Defines if the user is allowed to change the selected index pattern directly from the Wazuh Kibana plugin top menu.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

ip.ignore
^^^^^^^^^

Disables certain index pattern names from being available in the index pattern selector in the Wazuh Kibana plugin. The default empty list will not ignore any valid index pattern.

+--------------------+---------------------------------------------+
| **Default value**  | []                                          |
+--------------------+---------------------------------------------+
| **Allowed values** | Array of strings. Eg: ["wazuh-archives-\*"] |
+--------------------+---------------------------------------------+

xpack.rbac.enabled
^^^^^^^^^^^^^^^^^^

Enables or disables X-Pack RBAC security capabilities.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

admin
^^^^^

Enables or disables administrator's ``PUT``, ``POST`` and ``DELETE`` requests to the Wazuh API made in the :ref:`Dev tools <kibana_dev_tools>` console. This option can be changed only in the `wazuh.yml` configuration file.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

logs.level
^^^^^^^^^^

Sets the logging level for the Wazuh Kibana plugin log files.

+--------------------+------------+
| **Default value**  | info       |
+--------------------+------------+
| **Allowed values** | info,debug |
+--------------------+------------+

hideManagerAlerts
^^^^^^^^^^^^^^^^^

Hides the Wazuh manager's alerts in the dashboard visualizations.

+--------------------+------------+
| **Default value**  | false      |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

Monitoring
----------

wazuh.monitoring.enabled
^^^^^^^^^^^^^^^^^^^^^^^^

Enables or disables the ``wazuh-monitoring`` index creation and/or visualization:

- When the value is set to ``true``, the Wazuh Kibana plugin will show the Wazuh agents' ``Status`` visualization and will insert monitoring-related data.
- When the value is set to ``false``, the Wazuh Kibana plugin will not show the visualization and will not insert monitoring-related data.
- When the value is set to ``worker``, the Wazuh Kibana plugin will show the visualization, but will not insert monitoring-related data.

+--------------------+-------------------+
| **Default value**  | true              |
+--------------------+-------------------+
| **Allowed values** | true,false,worker |
+--------------------+-------------------+

wazuh.monitoring.frequency
^^^^^^^^^^^^^^^^^^^^^^^^^^

The frequency, defined in seconds, of the Wazuh API requests to get the state of the Wazuh agents to create a new document in the `wazuh-monitoring` index.

+--------------------+-----------------------------+
| **Default value**  | 900 (seconds)               |
+--------------------+-----------------------------+
| **Allowed values** | Any number starting from 60 |
+--------------------+-----------------------------+

.. warning::

    Although the minimum value is ``60``, it is recommended to set it at least to ``300`` seconds to avoid overloading issues due to the excessive creation of documents into the index.

wazuh.monitoring.pattern
^^^^^^^^^^^^^^^^^^^^^^^^

Default Wazuh monitoring index pattern to use for the app. This setting does not remove any existing patterns or templates, it just updates the app to add the new ones.

+--------------------+-------------------------+
| **Default value**  | wazuh-monitoring-3.x-*  |
+--------------------+-------------------------+
| **Allowed values** | Any valid index pattern |
+--------------------+-------------------------+

wazuh.monitoring.creation
^^^^^^^^^^^^^^^^^^^^^^^^^

Configure wazuh-monitoring-3.x-* indices custom creation interval.

+--------------------+------------------------------------------------+
| **Default value**  | d (daily)                                      |
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

Enable or disable the API health check when opening the app.

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

extensions.oscap
^^^^^^^^^^^^^^^^

Enable or disable the Open SCAP tab on *Overview* and *Agents*.

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

Advanced index options
----------------------

.. warning::

    These options are only valid if they're modified before starting the Kibana service for the very first time.

    You can read more about configuring the shards and replicas in :ref:`elastic_tuning`.

wazuh-version.shards
^^^^^^^^^^^^^^^^^^^^

Define the number of shards to use for the ``wazuh-version`` index.

+--------------------+----------------------------+
| **Default value**  | 1                          |
+--------------------+----------------------------+
| **Allowed values** | Any number starting from 1 |
+--------------------+----------------------------+

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

Define the number of shards to use for the ``wazuh-monitoring-3.x-*`` indices.

+--------------------+----------------------------+
| **Default value**  | 2                          |
+--------------------+----------------------------+
| **Allowed values** | Any number starting from 1 |
+--------------------+----------------------------+

wazuh.monitoring.replicas
^^^^^^^^^^^^^^^^^^^^^^^^^

Define the number of replicas to use for the ``wazuh-monitoring-3.x-*`` indices.

+--------------------+----------------------------+
| **Default value**  | 0                          |
+--------------------+----------------------------+
| **Allowed values** | Any number starting from 0 |
+--------------------+----------------------------+
