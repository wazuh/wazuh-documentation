.. Copyright (C) 2018 Wazuh, Inc.

.. _kibana_config_file:

Configuration file
==================

The Wazuh app includes a configuration file (located at ``/usr/share/kibana/plugins/wazuh/config.yml``) where you can define custom values for several options. This section describes all the settings available in this file.

The configuration file shows the default values for all of the possible options. You can edit the file, uncomment any of them and apply the desired values.

.. warning::

    Don't forget to restart the Kibana service after applying changes to these settings.

The configuration file reference is organized by sections:

`Basic options`_
    - `pattern`_
    - `timeout`_
    - `ip.selector`_
    - `xpack.rbac.enabled`_

`Monitoring`_
    - `wazuh.monitoring.enabled`_
    - `wazuh.monitoring.frequency`_

`Checks`_
    - `checks.pattern`_
    - `checks.template`_
    - `checks.api`_
    - `checks.setup`_

`Extensions`_
    - `extensions.pci`_
    - `extensions.gdpr`_
    - `extensions.audit`_
    - `extensions.oscap`_
    - `extensions.ciscat`_
    - `extensions.aws`_
    - `extensions.virustotal`_

`Advanced index options`_
    - `wazuh.shards`_
    - `wazuh.replicas`_
    - `wazuh-version.shards`_
    - `wazuh-version.replicas`_
    - `wazuh.monitoring.shards`_
    - `wazuh.monitoring.replicas`_

Basic options
-------------

pattern
^^^^^^^

Default index pattern to use on the app. If there's no valid index patterns on Elasticsearch, the app will automatically create one with the name indicated in this option.

+--------------------+-------------------------+
| **Default value**  | wazuh-alerts-3.x-*      |
+--------------------+-------------------------+
| **Allowed values** | Any valid index-pattern |
+--------------------+-------------------------+

timeout
^^^^^^^

Defines the maximum time the app will wait for an API response when making requests to it. It will be ignored if the value is set under 1500 milliseconds.

+--------------------+-------------------------------+
| **Default value**  | 8000 (milliseconds)           |
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

xpack.rbac.enabled
^^^^^^^^^^^^^^^^^^

Enable or disable X-Pack RBAC security capabilities when using the app.

+--------------------+------------+
| **Default value**  | true       |
+--------------------+------------+
| **Allowed values** | true,false |
+--------------------+------------+

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

Define in seconds the frequency the app generates a new document on the `wazuh-monitoring` index.

+--------------------+-----------------------------+
| **Default value**  | 3600 (seconds)              |
+--------------------+-----------------------------+
| **Allowed values** | Any number starting from 60 |
+--------------------+-----------------------------+

.. warning::

    Although the minimum value can be ``60``, we recommend adjusting it to at least ``300`` seconds to avoid overloading issues due to the excessive creation of documents into the index.

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

Advanced index options
----------------------

.. warning::

    These options are only valid if they're modified before starting the Kibana service for the very first time.

    You can read more about configuring the shards and replicas in :ref:`elastic_tuning`.

wazuh.shards
^^^^^^^^^^^^

Define the number of shards to use for the ``wazuh`` index.

+--------------------+----------------------------+
| **Default value**  | 1                          |
+--------------------+----------------------------+
| **Allowed values** | Any number starting from 0 |
+--------------------+----------------------------+

wazuh.replicas
^^^^^^^^^^^^^^

Define the number of replicas to use for the ``wazuh`` index.

+--------------------+----------------------------+
| **Default value**  | 1                          |
+--------------------+----------------------------+
| **Allowed values** | Any number starting from 0 |
+--------------------+----------------------------+

wazuh-version.shards
^^^^^^^^^^^^^^^^^^^^

Define the number of shards to use for the ``wazuh-version`` index.

+--------------------+----------------------------+
| **Default value**  | 1                          |
+--------------------+----------------------------+
| **Allowed values** | Any number starting from 0 |
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
| **Default value**  | 5                          |
+--------------------+----------------------------+
| **Allowed values** | Any number starting from 0 |
+--------------------+----------------------------+

wazuh.monitoring.replicas
^^^^^^^^^^^^^^^^^^^^^^^^^

Define the number of replicas to use for the ``wazuh-monitoring-3.x-*`` indices.

+--------------------+----------------------------+
| **Default value**  | 1                          |
+--------------------+----------------------------+
| **Allowed values** | Any number starting from 0 |
+--------------------+----------------------------+
