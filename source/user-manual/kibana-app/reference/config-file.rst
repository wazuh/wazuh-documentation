.. Copyright (C) 2019 Wazuh, Inc.

.. _kibana_config_file:

Configuration file
==================

The Wazuh Kibana plugin configuration file is located at ``/usr/share/kibana/optimize/wazuh/config/wazuh.yml``. Most of the options described below can be also changed through the Wazuh Kibana plugin :ref:`configuration <kibana_settings_configuration>` section.

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
    - `wazuh.monitoring.shards`_
    - `wazuh.monitoring.replicas`_

`Wazuh API entries`_
    - `Defining the Wazuh API entries`_

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

Defines the maximum timeout the Wazuh Kibana plugin uses when making requests. It will be ignored if the value is set under 1500 milliseconds.

+--------------------+-------------------------------+
| **Default value**  | 20000 (milliseconds)          |
+--------------------+-------------------------------+
| **Allowed values** | Any number starting from 1500 |
+--------------------+-------------------------------+

api.selector
^^^^^^^^^^^^

Defines if the user is allowed to change the selected Wazuh API directly from the Wazuh Kibana plugin top menu.

+--------------------+-------------------------------+
| **Default value**  | false                         |
+--------------------+-------------------------------+
| **Allowed values** | true, false                   |
+--------------------+-------------------------------+

ip.selector
^^^^^^^^^^^

Defines if the user is allowed to change the selected index pattern directly from the Wazuh Kibana plugin top menu.

+--------------------+-------------+
| **Default value**  | true        |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

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

Enables or disables ``X-Pack RBAC`` security capabilities.

+--------------------+-------------+
| **Default value**  | true        |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

admin
^^^^^

Enables or disables administrator's ``PUT``, ``POST`` and ``DELETE`` requests to the Wazuh API made in the :ref:`Dev tools <kibana_dev_tools>` console. This option can be changed only in the ``wazuh.yml`` configuration file.

+--------------------+-------------+
| **Default value**  | true        |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

logs.level
^^^^^^^^^^

Sets the logging level for the Wazuh Kibana plugin log files.

+--------------------+-------------+
| **Default value**  | info        |
+--------------------+-------------+
| **Allowed values** | info, debug |
+--------------------+-------------+

hideManagerAlerts
^^^^^^^^^^^^^^^^^

Hides the Wazuh manager's alerts in the dashboard visualizations.

+--------------------+-------------+
| **Default value**  | false       |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

Monitoring
----------

wazuh.monitoring.enabled
^^^^^^^^^^^^^^^^^^^^^^^^

Enables or disables the ``wazuh-monitoring`` index creation and/or visualization:

- When the value is set to ``true``, the Wazuh Kibana plugin will show the Wazuh agents ``Status`` visualization and will insert monitoring-related data.
- When the value is set to ``false``, the Wazuh Kibana plugin will not show the visualization and will not insert monitoring-related data.
- When the value is set to ``worker``, the Wazuh Kibana plugin will show the visualization, but will not insert monitoring-related data.

+--------------------+---------------------+
| **Default value**  | true                |
+--------------------+---------------------+
| **Allowed values** | true, false, worker |
+--------------------+---------------------+

wazuh.monitoring.frequency
^^^^^^^^^^^^^^^^^^^^^^^^^^

The frequency, defined in seconds, of the Wazuh API requests to get the state of the Wazuh agents to create a new document in the ``wazuh-monitoring`` index.

+--------------------+-----------------------------+
| **Default value**  | 900 (seconds)               |
+--------------------+-----------------------------+
| **Allowed values** | Any number starting from 60 |
+--------------------+-----------------------------+

.. warning::

    Although the minimum value is ``60``, it is recommended to set it at least to ``300`` seconds to avoid overloading issues due to the excessive creation of documents into the index.

wazuh.monitoring.pattern
^^^^^^^^^^^^^^^^^^^^^^^^

Sets the default Wazuh monitoring index pattern to use with the Wazuh Kibana plugin. This setting does not remove any existing patterns or templates, only adds the new one.

+--------------------+-------------------------+
| **Default value**  | wazuh-monitoring-3.x-*  |
+--------------------+-------------------------+
| **Allowed values** | Any valid index pattern |
+--------------------+-------------------------+

wazuh.monitoring.creation
^^^^^^^^^^^^^^^^^^^^^^^^^

Sets ``wazuh-monitoring-3.x-*`` indices custom creation interval.

+--------------------+------------------------------------------------+
| **Default value**  | d (daily)                                      |
+--------------------+------------------------------------------------+
| **Allowed values** | h (hourly), d (daily), w (weekly), m (monthly) |
+--------------------+------------------------------------------------+

Checks
------

checks.pattern
^^^^^^^^^^^^^^

Enables or disables the index pattern health check when opening the wazuh Kibana plugin.

+--------------------+-------------+
| **Default value**  | true        |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

checks.template
^^^^^^^^^^^^^^^

Enables or disables the template health check when opening the Wazuh Kibana plugin.

+--------------------+-------------+
| **Default value**  | true        |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

checks.api
^^^^^^^^^^

Enables or disables the wazuh API health check when opening the Wazuh Kibana plugin.

+--------------------+-------------+
| **Default value**  | true        |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

checks.setup
^^^^^^^^^^^^

Enable or disable the setup health check when opening the Wazuh Kibana plugin.

+--------------------+-------------+
| **Default value**  | true        |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

checks.fields
^^^^^^^^^^^^^

Enables or disables the known fields health check when opening the Wazuh Kibana plugin.

+--------------------+-------------+
| **Default value**  | true        |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

Extensions
----------

.. note::

    These options are only applied for newly inserted APIs on the *Settings* tab, not for the existing ones.

extensions.pci
^^^^^^^^^^^^^^

Enables or disables the ``PCI DSS`` tab on *Overview* and *Agents*.

+--------------------+-------------+
| **Default value**  | true        |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

extensions.gdpr
^^^^^^^^^^^^^^^

Enables or disables the ``GDPR`` tab on *Overview* and *Agents*.

+--------------------+-------------+
| **Default value**  | true        |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

extensions.audit
^^^^^^^^^^^^^^^^

Enables or disables the ``Audit`` tab on *Overview* and *Agents*.

+--------------------+-------------+
| **Default value**  | true        |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

extensions.oscap
^^^^^^^^^^^^^^^^

Enables or disables the ``Open SCAP`` tab on *Overview* and *Agents*.

+--------------------+-------------+
| **Default value**  | false       |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

extensions.ciscat
^^^^^^^^^^^^^^^^^

Enables or disables the ``CIS-CAT`` tab on *Overview* and *Agents*.

+--------------------+-------------+
| **Default value**  | false       |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

extensions.aws
^^^^^^^^^^^^^^

Enables or disables the ``Amazon (AWS)`` tab on *Overview* and *Agents*.

+--------------------+-------------+
| **Default value**  | false       |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

extensions.virustotal
^^^^^^^^^^^^^^^^^^^^^

Enables or disables the ``VirusTotal`` tab on *Overview* and *Agents*.

+--------------------+-------------+
| **Default value**  | false       |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

extensions.osquery
^^^^^^^^^^^^^^^^^^

Enables or disables the ``Osquery`` tab on *Overview* and *Agents*.

+--------------------+-------------+
| **Default value**  | false       |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

extensions.docker
^^^^^^^^^^^^^^^^^

Enables or disables the ``Docker`` listener tab on *Overview* and *Agents*.

+--------------------+-------------+
| **Default value**  | false       |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

extensions.nist
^^^^^^^^^^^^^^^

Enables or disables the ``NIST`` tab on *Overview* and *Agents*.

+--------------------+-------------+
| **Default value**  | true        |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

extensions.hipaa
^^^^^^^^^^^^^^^^

Enables or disables the ``HIPAA`` tab on *Overview* and *Agents*.

+--------------------+-------------+
| **Default value**  | true        |
+--------------------+-------------+
| **Allowed values** | true, false |
+--------------------+-------------+

Advanced index options
----------------------

.. warning::

    These options are only valid if they are modified before starting the Kibana service for the very first time.
    How to configure the shards and replicas is explained in the :ref:`elastic_tuning` section.

wazuh.monitoring.shards
^^^^^^^^^^^^^^^^^^^^^^^

Defines the number of shards to use for the ``wazuh-monitoring-3.x-*`` indices.

+--------------------+----------------------------+
| **Default value**  | 2                          |
+--------------------+----------------------------+
| **Allowed values** | Any number starting from 1 |
+--------------------+----------------------------+

wazuh.monitoring.replicas
^^^^^^^^^^^^^^^^^^^^^^^^^

Defines the number of replicas to use for the ``wazuh-monitoring-3.x-*`` indices.

+--------------------+----------------------------+
| **Default value**  | 0                          |
+--------------------+----------------------------+
| **Allowed values** | Any number starting from 0 |
+--------------------+----------------------------+

Wazuh API entries
-----------------

Defining the Wazuh API entries
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following configuration is the default structure to define an Wazuh API entry:

.. code-block:: yaml

  hosts:
    - <id>:
       url: http(s)://<url>
       port: <port>
       user: <user>
       password: <password>

The following values need to be replaced:

``<id>``: an arbitrary ID.

``<url>``: url of the Wazuh API.

``<port>``: port.

``<user>``: credentials to authenticate.

``<password>``: credentials to authenticate.

The configured Wazuh API entries are available in the Wazuh Kibana plugin under the :ref:`kibana_settings_api` section.
