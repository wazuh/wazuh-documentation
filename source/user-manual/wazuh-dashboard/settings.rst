.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section describes all the settings available in the Wazuh dashboard configuration file.

Wazuh dashboard settings
========================

The Wazuh dashboard includes a configuration file located at ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` where you can define custom values for several options. This section describes all the settings available in this file.

The configuration file shows the default values for all of the possible options. You can edit this file, uncomment any of them, and apply the desired values. You can edit these settings from the Wazuh dashboard in **Dashboard management** > **App Settings** > **Configuration**.

The configuration file reference is organized into sections:

.. contents::
   :local:
   :depth: 2
   :backlinks: none

General
-------

hosts
^^^^^

Defines the list of APIs to connect with your Wazuh managers.

.. code-block:: yaml

   hosts:
       - <host_id/host_name>:
           url: http(s)://<WAZUH_MANAGER_IP>
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

The following table shows the configuration options for the Wazuh dashboard:

+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| Configuration name              | Description                                             | Default value                                       | Allowed values          |
|                                 |                                                         |                                                     |                         |
+=================================+=========================================================+=====================================================+=========================+
| **General options**                                                                                                                                                       |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| pattern                         | The property defines the default index pattern to use   | ``wazuh-alerts-*``                                  | Any valid index pattern |
|                                 | on the Wazuh dashboard. If there is no valid index      |                                                     |                         |
|                                 | pattern specified, the Wazuh dashboard automatically    |                                                     |                         |
|                                 | creates one with the name indicated in this option.     |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| timeout                         | This property defines the maximum time (in              | ``20000``                                           | Any number starting     |
|                                 | milliseconds) the Wazuh dashboard will wait for an API  |                                                     | from 1500               |
|                                 | response when making requests to it. Setting a value    |                                                     |                         |
|                                 | under ``1500`` milliseconds will be ignored and the     |                                                     |                         |
|                                 | dashboard will use the default value instead.           |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| ip.selector                     | This property defines if a user can change the          | ``true``                                            | true, false             |
|                                 | selected index pattern directly from the top menu       |                                                     |                         |
|                                 | bar on the Wazuh dashboard WUI.                         |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| ip.ignore                       | This property is used to disable certain index          | ``[]``                                              | Array of strings. Eg:   |
|                                 | pattern names from being available in the index         |                                                     | ``["wazuh-archives-*"]``|
|                                 | pattern selector on the Wazuh dashboard. An empty       |                                                     |                         |
|                                 | list (the default value) won't ignore any valid         |                                                     |                         |
|                                 | index pattern.                                          |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| hideManagerAlerts               | This property controls if the Wazuh manager alerts      | ``false``                                           | true, false             |
|                                 | in the dashboard visualizations are visible or not.     |                                                     |                         |
|                                 | A value of false displays the Wazuh manager alerts      |                                                     |                         |
|                                 | on dashboard visualizations.                            |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| alerts.sample.prefix            | This property defines the index name prefix of sample   | ``wazuh-alerts-4.x-``                               | Any valid index pattern |
|                                 | alerts. It must match the template used by the index    |                                                     |                         |
|                                 | pattern to avoid unknown fields in dashboards.          |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| enrollment.dns                  | This property specifies the Wazuh registration server   | ``' '``                                             | Any string              |
|                                 | used for Wazuh agent enrollment.                        |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| enrollment.password             | This property specifies the password used to            | ``' '``                                             | Any string              |
|                                 | authenticate during the agent enrollment.               |                                                     |                         |
|                                 | ``enrollment.password`` takes a higher precedence over  |                                                     |                         |
|                                 | ``authd.pass`` agent enrollment password set on the     |                                                     |                         |
|                                 | Wazuh manager. When both values are set, the value of   |                                                     |                         |
|                                 | ``enrollment.password`` will be used instead.           |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| cron.prefix                     | This property defines the index prefix of predefined    | ``wazuh``                                           | Any string              |
|                                 | cron jobs. The predefined jobs are the statistics       |                                                     |                         |
|                                 | monitoring jobs.                                        |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| **Monitoring**                                                                                                                                                            |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| wazuh.monitoring.enabled        | Enables or disables the ``wazuh-monitoring`` index      | ``True``                                            | true,false              |
|                                 | creation and/or visualization:                          |                                                     |                         |
|                                 |                                                         |                                                     |                         |
|                                 | - When the value is set to ``true``, the Wazuh          | .. warning:: The Wazuh dashboard user interface     |                         |
|                                 |   dashboard will show the *Agents connection states*    |     allows selecting either ``true`` or             |                         |
|                                 |   visualization and will insert monitoring-related data.|     ``false`` option.                               |                         |
|                                 | - When the value is set to false, the Wazuh dashboard   |                                                     |                         |
|                                 |   won't show the visualization and won't insert         |                                                     |                         |
|                                 |   monitoring-related data.                              |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| wazuh.monitoring.frequency      | This property defines the frequency (in seconds) of     | ``900``                                             | Any number starting     |
|                                 | API requests to get the state of the agents to create   |                                                     | from 60                 |
|                                 | a new document in the wazuh-monitoring-* index with     | .. warning:: Although the minimum value can be      |                         |
|                                 | the returned data.                                      |    ``60``, we recommend adjusting it to at least    |                         |
|                                 | Warning: Although the minimum value can be 60, we       |    ``300`` seconds to avoid overloading resources   |                         |
|                                 | recommend adjusting it to at least 300 seconds to       |    due to the excessive creation of documents       |                         |
|                                 | avoid overloading resources due to the excessive        |    into the index.                                  |                         |
|                                 | creation of documents into the index.                   |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| wazuh.monitoring.pattern        | This property defines the index pattern to use for      | ``wazuh-monitoring-*``                              | Any valid index pattern |
|                                 | Wazuh dashboard monitoring tasks. This setting does     |                                                     |                         |
|                                 | not remove any existing patterns or templates, it       |                                                     |                         |
|                                 | only updates the Wazuh dashboard to add new ones.       |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| wazuh.monitoring.creation       | This property configures ``wazuh-monitoring-*`` indices | ``w``                                               | h (hourly), d (daily),  |
|                                 | custom creation interval.                               |                                                     | w (weekly), m (monthly) |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| **Health checks**                                                                                                                                                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| checks.pattern                  | This property enables or disables the index pattern     | ``true``                                            | true, false             |
|                                 | health check when opening the Wazuh dashboard. If       |                                                     |                         |
|                                 | set to false, index patterns will not be checked        |                                                     |                         |
|                                 | during the Wazuh healthcheck.                           |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| checks.template                 | This property enables or disables the template health   | ``true``                                            | true, false             |
|                                 | check when opening the Wazuh dashboard. It checks to    |                                                     |                         |
|                                 | see if the defined index has a valid template. Set      |                                                     |                         |
|                                 | this value to false if you do not want the index        |                                                     |                         |
|                                 | template to be validated when opening the Wazuh         |                                                     |                         |
|                                 | dashboard.                                              |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| checks.api                      | This property enables or disables the Wazuh server API  | ``true``                                            | true, false             |
|                                 | health check when opening the Wazuh dashboard. Set      |                                                     |                         |
|                                 | the value of this property to ``false`` if you do not   |                                                     |                         |
|                                 | require this check when opening the dashboard.          |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| checks.setup                    | This property enables or disables the setup health      | ``true``                                            | true, false             |
|                                 | check when opening the Wazuh dashboard. It checks       |                                                     |                         |
|                                 | that the Wazuh server version is compatible with        |                                                     |                         |
|                                 | the plugin version. Setting this value to ``false``     |                                                     |                         |
|                                 | might cause the dashboard to fail if there is a         |                                                     |                         |
|                                 | compatibility issue between the dashboard plugins and   |                                                     |                         |
|                                 | Wazuh server.                                           |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| checks.fields                   | This property enables or disables the known fields      | ``true``                                            | true, false             |
|                                 | health check when opening the Wazuh dashboard. Known    |                                                     |                         |
|                                 | fields refer to the fields in your indexed documents    |                                                     |                         |
|                                 | that the indexer has identified, mapped, and available  |                                                     |                         |
|                                 | for querying.                                           |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| checks.metaFields               | Meta fields are special fields that provide additional  | ``true``                                            | true, false             |
|                                 | metadata about indexed documents such as the ``_index`` |                                                     |                         |
|                                 | and ``_id``. This property enables or disables the      |                                                     |                         |
|                                 | metaFields health check when opening the Wazuh          |                                                     |                         |
|                                 | dashboard.                                              |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| checks.timeFilter               | This property enables or disables the timeFilter        | ``true``                                            | true, false             |
|                                 | health check when opening the Wazuh dashboard. It       |                                                     |                         |
|                                 | checks to ensure a value is set for the dashboard       |                                                     |                         |
|                                 | time filter. The time filter is used to set the time    |                                                     |                         |
|                                 | range of data displayed on the dashboard.               |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| checks.maxBuckets               | This property enables or disables the maxBuckets        | ``true``                                            | true, false             |
|                                 | health check when opening the Wazuh dashboard. It       |                                                     |                         |
|                                 | checks to ensure that the maximum number of buckets     |                                                     |                         |
|                                 | that a single aggregation request can create is at      |                                                     |                         |
|                                 | optimal levels. This helps to prevent excessive memory  |                                                     |                         |
|                                 | usage and potential out-of-memory errors.               |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| **Advanced index options**                                                                                                                                                |
|                                                                                                                                                                           |
| .. warning::                                                                                                                                                              |
|                                                                                                                                                                           |
|    These options are only valid if they're modified before starting the Wazuh dashboard for the first time                                                                |
|                                                                                                                                                                           |
|    You can read more about configuring the shards and replicas in :doc:`Wazuh indexer tuning </user-manual/wazuh-indexer/wazuh-indexer-tuning>`.                          |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| wazuh.monitoring.shards         | This defines the number of shards to use for the        | ``1``                                               | Any number starting     |
|                                 | ``wazuh-monitoring-*`` indices.                         |                                                     | from 1                  |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| wazuh.monitoring.replicas       | This property defines the number of replicas to use     | ``0``                                               | Any number starting     |
|                                 | for the ``wazuh-monitoring-*`` indices.                 |                                                     | from 0                  |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| **Cron statistics**                                                                                                                                                       |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| cron.statistics.status          | This property enables or disables the statistics        | ``true``                                            | true, false             |
|                                 | tasks. If enabled, it allows the statistics task to     |                                                     |                         |
|                                 | run, which is to fetch statistics information from      |                                                     |                         |
|                                 | the Wazuh server and index it in indexes.               |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| cron.statistics.apis            | Use this property to configure the IP of the hosts you  | ``[ ]``                                             | Array of APIs           |
|                                 | want to save statistical data from and leave this       |                                                     |                         |
|                                 | empty to run the task on every host.                    |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| cron.statistics.interval        | This defines the frequency of task execution using      | ``0 */5 * * * *``                                   | Any cron expressions    |
|                                 | cron schedule expressions.                              |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| cron.statistics.index.name      | This defines the name of the index in which the         | ``statistics``                                      | Any valid index pattern |
|                                 | statistics documents will be saved.                     |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| cron.statistics.index.creation  | This property defines the interval in which a new       | ``w``                                               | h (hourly), d (daily),  |
|                                 | index (as specified in the                              |                                                     | w (weekly), m (monthly) |
|                                 | ``cron.statistics.index.name`` property) will be        |                                                     |                         |
|                                 | created. More frequent index creation can quickly fill  |                                                     |                         |
|                                 | up storage.                                             |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| cron.statistics.shards          | This property defines the number of shards to use for   | ``1``                                               | Any number starting     |
|                                 | the statistics indices.                                 |                                                     | from 1                  |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+
| cron.statistics.index.replicas  | This property is used to define the number of replicas  | ``0``                                               | Any number starting     |
|                                 | to use for the statistics indices. On default, no       |                                                     | from 0                  |
|                                 | replicas are created for the statistics indices.        |                                                     |                         |
+---------------------------------+---------------------------------------------------------+-----------------------------------------------------+-------------------------+

Example
-------

This is an example of the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` configuration:

.. code-block:: yaml

   #General options

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
   alerts.sample.prefix: wazuh-alerts-4.x-

   #Monitoring

   wazuh.monitoring.enabled: true
   wazuh.monitoring.frequency: 900
   wazuh.monitoring.pattern: wazuh-monitoring-*
   wazuh.monitoring.creation: w
   wazuh.monitoring.shards: 1
   wazuh.monitoring.replicas: 0

   #Health checks

   checks.pattern : true
   checks.template: true
   checks.fields  : true
   checks.api     : true
   checks.setup   : true
   checks.metaFields: true
   checks.timeFilter: true
   checks.maxBuckets: true

   #Custom branding

   customization.enabled: true
   customization.logo.app: 'custom/images/customization.logo.app.jpg'

   customization.logo.healthcheck: 'custom/images/customization.logo.healthcheck.svg'
   customization.logo.reports: 'custom/images/customization.logo.reports.jpg'
   customization.reports.footer: '123 Custom footer Ave.\nSan Jose, CA 95148'
   customization.reports.header: 'Custom Company\ninfo@custom.com\n@social_reference'

   #Cron

   cron.prefix: wazuh
   cron.statistics.status: true
   cron.statistics.apis: []
   cron.statistics.interval: 0 */5 * * * *
   cron.statistics.index.name: statistics
   cron.statistics.index.creation: w

   #Enrollment DNS

   enrollment.dns: ''
   enrollment.password: ''
