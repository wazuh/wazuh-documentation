.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh indexer uses indices to store and organize security data for fast retrieval. Find more information in this section of the documentation.

Wazuh indexer indices
=====================

An index is a collection of documents that relate to each other. The Wazuh indexer uses indices to store and organize security data for fast retrieval. Wazuh uses the following index patterns to store this data:

-  :ref:`wazuh‑alerts-* <wazuh_alerts_indices>`: This is the index pattern for alerts generated by the Wazuh server.
-  :ref:`wazuh‑archives-* <wazuh_archives_indices>`: This is the index pattern for all events sent to the Wazuh server.
-  :ref:`wazuh‑monitoring-* <wazuh_monitoring_indices>`: This is the index pattern for the status of the Wazuh agents.
-  :ref:`wazuh‑statistics-* <wazuh_statistics_indices>`: This is the index pattern for statistical information of the Wazuh server.
-  :ref:`wazuh-states-vulnerabilities-* <wazuh_states_vulnerabilities_indices>`: - This is the index pattern for information about vulnerabilities detected in the endpoints being monitored.

To further customize the index pattern for alerts, you can create a custom index pattern.

Creating custom index pattern
-----------------------------

This section describes how to create a custom index pattern, for example, ``my-custom-alerts-*``, alongside the default pattern, ``wazuh-alerts-*``. Switch to the root user and perform the steps below.

#. Stop the Filebeat service:

   .. code-block:: console

      # systemctl stop filebeat

#. Download the Wazuh template and save it into a file (for example, ``template.json``):

   .. code-block:: console

      # curl -so template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_CURRENT|/extensions/elasticsearch/7.x/wazuh-template.json

#. Open the template file and locate this line at the beginning of the file:

   .. code-block:: json

      "index_patterns": [
        "wazuh-alerts-4.x-*",
        "wazuh-archives-4.x-*"
      ],

   Add your custom pattern to look like this:

   .. code-block:: json
      :emphasize-lines: 4

      "index_patterns": [
        "wazuh-alerts-4.x-*",
        "wazuh-archives-4.x-*",
        "my-custom-alerts-*"
      ],

   The asterisk character (``*``) on the index patterns is important because Filebeat will create indices using a name that follows this pattern, which is necessary to apply the proper format to visualize the alerts on the Wazuh dashboard.

#. Save the modifications and insert the new template into the Wazuh indexer. This will replace the existing template:

   .. code-block:: console

      # curl -XPUT -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> 'https://<INDEXER_IP_ADDRESS>:9200/_template/wazuh' -H 'Content-Type: application/json' -d @template.json

   Replace:

   -  ``<INDEXER_IP_ADDRESS>`` with the IP address of your Wazuh indexer
   -  ``<INDEXER_USERNAME>`` and ``<INDEXER_PASSWORD>`` with the Wazuh indexer username and password. You can obtain the Wazuh indexer credentials for fresh deployments using the command:

      .. note::

         If using the Wazuh OVA, use the default credentials ``admin:admin`` or refer to the :doc:`password management </user-manual/user-administration/password-management>` section.

      .. code-block:: console

         # tar -axf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt -O | grep -P "\'admin\'" -A 1

   .. code-block:: output
      :class: output

      {"acknowledged":true}


   .. note::

      ``{"acknowledged":true}`` indicates that the template was inserted correctly.


   .. warning::

      Perform step 5 only if you want to replace the default alert index pattern ``wazuh-alerts-*`` and/or the default archive index pattern ``wazuh‑archives-*`` with ``my-custom-alerts-*``.

#. Open the Wazuh alerts configuration file ``/usr/share/filebeat/module/wazuh/alerts/manifest.yml`` and optionally the archives file ``/usr/share/filebeat/module/wazuh/archives/manifest.yml`` and replace the index name.

   For example, from:

   .. code-block:: yaml

      - name: index_prefix
        default: wazuh-alerts-

   To this:

   .. code-block:: yaml

      - name: index_prefix
        default: my-custom-alerts-

   .. note::

      The index name must not contain the characters ``#``, ``\``, ``/``, ``*``, ``?``, ``"``, ``<``, ``>``, ``|``, ``,``, and must not start with ``_``, ``-``, or ``+``. Also, all the letters must be lowercase.

#. (Optional) If you want to use the new index pattern by default, open the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` file and add the below configuration:

   .. code-block:: yaml

      pattern: my-custom-alerts-*

   This will make the Wazuh server automatically create and/or select the new index pattern.

#. Restart Filebeat and the Wazuh server components:

   .. code-block:: console

      # systemctl restart filebeat
      # systemctl restart wazuh-manager
      # systemctl restart wazuh-indexer
      # systemctl restart wazuh-dashboard

.. warning::

   If you already have indices created with the previous name, they won't be changed. You can still change to the previous index pattern to see them, or you can perform :doc:`reindexing <re-indexing>` to rename the existing indices.

Checking indices information
----------------------------

You can check for information about Wazuh indices in two ways.

-  Using the web user interface.
-  Making a request to the Wazuh indexer API.

Using the web user interface
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. In the Wazuh dashboard upper left menu **☰**, go to **Indexer management** > **Index Management**.

   .. thumbnail:: /images/manual/wazuh-indexer/opensearch-plugins-index-management-option.png
      :title: Index management menu option
      :alt: Index management menu option
      :align: center
      :width: 80%

#. Click on **Indices**.

   .. thumbnail:: /images/manual/wazuh-indexer/opensearch-plugins-index-management-indices.png
      :title: Index-management indices option
      :alt: Index-management indices option
      :align: center
      :width: 80%

   If the pattern is not present in the Wazuh dashboard, create a new one using the index pattern used in the template ``my-custom-alerts-*``, and make sure to use ``timestamp`` as the **Time Filter** field name.

   .. thumbnail:: /images/manual/wazuh-indexer/create-custom-alerts-index-pattern.gif
      :title: Creating custom alerts index pattern
      :alt: Creating custom alerts index pattern
      :align: center
      :width: 80%

Using the Wazuh indexer API
^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can query the indices information using the Wazuh indexer API from the Wazuh dashboard or the Wazuh server.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Navigate to **☰** > **Indexer management** > **Dev Tools**:

   .. code-block:: none

      GET /_cat/indices/wazuh-*?v

   .. thumbnail:: /images/manual/wazuh-indexer/dev-tools-indices-list.png
      :title: Dev Tools indices list
      :alt: Dev Tools indices list
      :align: center
      :width: 80%

Command line interface
~~~~~~~~~~~~~~~~~~~~~~

#. Obtain the Wazuh indexer username and password for fresh deployments using the below command:

   .. code-block:: console

      # tar -axf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt -O | grep -P "\'admin\'" -A 1

   .. note::

      If using the Wazuh OVA, use the default credentials admin:admin or refer to the :doc:`password management </user-manual/user-administration/password-management>` section.

#. Run the following command to query your index status. Replace ``<INDEXER_USERNAME>`` and ``<INDEXER_PASSWORD>`` with the username and password obtained. Replace ``<INDEXER_IP_ADDRESS>`` with your Wazuh indexer IP address or FQDN. You can replace ``wazuh-*`` with a more specific pattern for your query, such as ``wazuh-alerts-*``.

   .. code-block:: console

      # curl -k -u <INDEXER_USERNAME>:<INDEXER_PASSWORD> https://<INDEXER_IP_ADDRESS>:9200/_cat/indices/wazuh-*?v

   .. code-block:: output
      :class: output

      health status index                       uuid                   pri rep docs.count docs.deleted store.size pri.store.size
      green  open   wazuh-statistics-2023.30w   xtHZtGqBR0WNJWbs5sjrnQ   1   0       2394            0      1.2mb          1.2mb
      green  open   wazuh-alerts-4.x-2023.07.28 VbBfAasJTsiqw3lwRhY5sg   3   0        513            0      1.9mb          1.9mb
      green  open   wazuh-alerts-4.x-2023.07.27 7s2x8INqRVmtz5uqMDuA7Q   3   0        515            0        2mb            2mb
      green  open   wazuh-alerts-4.x-2023.07.05 0h4cyLJoQYiMvMnqyLDnag   3   0         49            0    370.4kb        370.4kb
      green  open   wazuh-alerts-4.x-2023.07.07 kp_N4c7RRuOE91KkuqPuAw   3   0         98            0    397.7kb        397.7kb
      green  open   wazuh-alerts-4.x-2023.07.29 rbAC4befS7epxOjiSzFRQQ   3   0       1717            0      3.9mb          3.9mb
      green  open   wazuh-monitoring-2023.31w   1WwxsGQHRfG1_DOIZD-Lag   1   0        954            0    771.9kb        771.9kb
      green  open   wazuh-alerts-4.x-2023.07.20 SQbaQC24SgO9eWO_AsBI_w   3   0       1181            0      2.8mb          2.8mb
      green  open   wazuh-statistics-2023.28w   jO52bS6eRamtB2YNmfGzIA   1   0        676            0    501.1kb        501.1kb

.. _wazuh_alerts_indices:

The wazuh‑alerts-* indices
--------------------------

The Wazuh server analyzes events received from monitored endpoints and generates alerts when the events match a detection rule. These alerts are saved using the ``wazuh-alerts-*`` indices.

The Wazuh server logs the alert data into the ``/var/ossec/logs/alerts/alerts.json`` and ``/var/ossec/logs/alerts/alerts.log`` files by default. Once saved in the ``/var/ossec/logs/alerts/alerts.json`` file, it forwards the JSON alert document to the Wazuh indexer API for indexing. The indexed files are stored in the ``/var/lib/wazuh-indexer/nodes/0/indices`` directory of the Wazuh indexer.

When forwarding alerts to the Wazuh indexer, the Wazuh server formats the current date into an index name. For example, the Wazuh server will define the index names ``wazuh-alerts-4.x-2023.03.17`` and ``wazuh-alerts-4.x-2023.03.18`` for March 17th and 18th alerts, respectively. The Wazuh indexer then creates alert indices using the defined ``wazuh‑alerts-*`` index names.

You can modify the default index name in the ``/usr/share/filebeat/module/wazuh/alerts/ingest/pipeline.json`` file of the Wazuh server. To do this, navigate to the ``date_index_name`` field and ``date_rounding`` key to change the default index name formatting in the ``/usr/share/filebeat/module/wazuh/alerts/ingest/pipeline.json`` file:

.. code-block:: json
   :emphasize-lines: 61

   {
     "description": "Wazuh alerts pipeline",
     "processors": [
   	{ "json" : { "field" : "message", "add_to_root": true } },
   	{
     	"geoip": {
       	"field": "data.srcip",
       	"target_field": "GeoLocation",
       	"properties": ["city_name", "country_name", "region_name", "location"],
       	"ignore_missing": true,
       	"ignore_failure": true
     	}
   	},
   	{
     	"geoip": {
       	"field": "data.win.eventdata.ipAddress",
       	"target_field": "GeoLocation",
       	"properties": ["city_name", "country_name", "region_name", "location"],
       	"ignore_missing": true,
       	"ignore_failure": true
     	}
   	},
   	{
     	"geoip": {
       	"field": "data.aws.sourceIPAddress",
       	"target_field": "GeoLocation",
       	"properties": ["city_name", "country_name", "region_name", "location"],
       	"ignore_missing": true,
       	"ignore_failure": true
     	}
   	},
   	{
     	"geoip": {
       	"field": "data.gcp.jsonPayload.sourceIP",
       	"target_field": "GeoLocation",
       	"properties": ["city_name", "country_name", "region_name", "location"],
       	"ignore_missing": true,
       	"ignore_failure": true
     	}
   	},
   	{
     	"geoip": {
       	"field": "data.office365.ClientIP",
       	"target_field": "GeoLocation",
       	"properties": ["city_name", "country_name", "region_name", "location"],
       	"ignore_missing": true,
       	"ignore_failure": true
     	}
   	},
   	{
     	"date": {
       	"field": "timestamp",
       	"target_field": "@timestamp",
       	"formats": ["ISO8601"],
       	"ignore_failure": false
     	}
   	},
   	{
     	"date_index_name": {
       	"field": "timestamp",
       	"date_rounding": "d",
       	"index_name_prefix": "{{fields.index_prefix}}",
       	"index_name_format": "yyyy.MM.dd",
       	"ignore_failure": false
     	}
   	},
   	{ "remove": { "field": "message", "ignore_missing": true, "ignore_failure": true } },
   	{ "remove": { "field": "ecs", "ignore_missing": true, "ignore_failure": true } },
   	{ "remove": { "field": "beat", "ignore_missing": true, "ignore_failure": true } },
   	{ "remove": { "field": "input_type", "ignore_missing": true, "ignore_failure": true } },
   	{ "remove": { "field": "tags", "ignore_missing": true, "ignore_failure": true } },
   	{ "remove": { "field": "count", "ignore_missing": true, "ignore_failure": true } },
   	{ "remove": { "field": "@version", "ignore_missing": true, "ignore_failure": true } },
   	{ "remove": { "field": "log", "ignore_missing": true, "ignore_failure": true } },
   	{ "remove": { "field": "offset", "ignore_missing": true, "ignore_failure": true } },
   	{ "remove": { "field": "type", "ignore_missing": true, "ignore_failure": true } },
   	{ "remove": { "field": "host", "ignore_missing": true, "ignore_failure": true } },
   	{ "remove": { "field": "fields", "ignore_missing": true, "ignore_failure": true } },
   	{ "remove": { "field": "event", "ignore_missing": true, "ignore_failure": true } },
   	{ "remove": { "field": "fileset", "ignore_missing": true, "ignore_failure": true } },
   	{ "remove": { "field": "service", "ignore_missing": true, "ignore_failure": true } }
     ],
     "on_failure" : [{
   	"drop" : { }
     }]
   }

Where the values:

|  ``M`` - stands for month
|  ``w`` - stands for week
|  ``d`` - stands for day

.. _wazuh_archives_indices:

The wazuh‑archives-* indices
----------------------------

In addition to logging alerts to the ``/var/ossec/logs/alerts/alerts.json`` and ``/var/ossec/logs/alerts/alerts.log`` files, you can enable the Wazuh archives to log and index all the events the Wazuh server receives. This includes events that are analyzed by Wazuh and events that do not trigger alerts.

Storing and indexing all events might be useful for later analysis and compliance requirements. However, you must consider that enabling logging and indexing of all events will increase the storage requirement on the Wazuh server.

By default, the Wazuh indexer creates event indices for each unique day. You can modify the default index name in the ``/usr/share/filebeat/module/wazuh/archives/ingest/pipeline.json`` file of the Wazuh server. To do this:

#. Navigate to the ``date_index_name`` field.
#. Locate the ``date_rounding`` key and change the default index name formatting in the ``/usr/share/filebeat/module/wazuh/archives/ingest/pipeline.json`` file.

The sections below provide details on how to enable the wazuh archives and set up the ``wazuh-archives-*`` indices.

Enabling Wazuh archives
^^^^^^^^^^^^^^^^^^^^^^^

#. Edit ``/var/ossec/etc/ossec.conf`` on the Wazuh server and set the ``<logall_json>`` line to ``yes``. This enables logging to :ref:`archives.json <reference_ossec_global_logall_json>` of all events. Forwarding to the Wazuh indexer requires the logging of all events in JSON format.

   .. code-block:: xml

      <logall_json>yes</logall_json>

#. Restart the Wazuh manager to make the change effective.

   .. code-block:: console

      # systemctl restart wazuh-manager

   or

   .. code-block:: console

      # service wazuh-manager restart

#. Edit ``/etc/filebeat/filebeat.yml`` and change ``enabled`` to ``true`` in the archives mapping. This enables events to be forwarded to the Wazuh indexer.

   .. code-block:: yaml
      :emphasize-lines: 6

      filebeat.modules:
       - module: wazuh
        alerts:
         enabled: true
        archives:
         enabled: true

#. Restart the Filebeat service to apply the change:

   .. code-block:: console

      # systemctl restart filebeat

#. Test that the Filebeat service works properly:

   .. code-block:: console

      # filebeat test output

   .. code-block:: output
      :class: output

      elasticsearch: https://127.0.0.1:9200...
        parse url... OK
        connection...
          parse host... OK
          dns lookup... OK
          addresses: 127.0.0.1
          dial up... OK
        TLS...
          security: server's certificate chain verification is enabled
          handshake... OK
          TLS version: TLSv1.2
          dial up... OK
        talk to server... OK
        version: 7.10.2

Defining the index pattern
^^^^^^^^^^^^^^^^^^^^^^^^^^

#. In the Wazuh dashboard upper left menu **☰**, go to **Dashboard management** > **Dashboard Management** and click **Index Patterns**.
#. Click on **Create index pattern**.
#. Set ``wazuh-archives-*`` as the **Index pattern name**. This defines the index pattern to match the events being forwarded and indexed. Click on **Next step**.
#. Select **timestamp** for the **Time** field.

   .. note::

      Be careful to choose *timestamp* instead of *@timestamp*.

#. Click on **Create index pattern**.

Viewing the index pattern
^^^^^^^^^^^^^^^^^^^^^^^^^

#. Click **Explore** on the upper left menu **☰**, and then click **Discover**.
#. Select **wazuh-archives-*** to view the events.

   .. thumbnail:: /images/manual/wazuh-indexer/wazuh-archives-events.png
      :title: Wazuh archives events
      :alt: Wazuh archives events
      :align: center
      :width: 80%

.. _wazuh_monitoring_indices:

The wazuh-monitoring-* indices
------------------------------

The connection status of an enrolled Wazuh agent at any moment is one of the following:

-  **Active**
-  **Disconnected**
-  **Pending**
-  **Never connected**

Wazuh stores a history of the connection status of all its agents. By default, it indexes the agent connection status using the ``wazuh‑monitoring-*`` indices. The Wazuh indexer creates one of these indices per week by default. Check the documentation on :doc:`custom creation intervals </user-manual/wazuh-dashboard/settings>`. These indices store the connection status of all the agents every 15 minutes by default. Check the documentation on the :doc:`frequency of API requests </user-manual/wazuh-dashboard/settings>`.

The Wazuh dashboard requires these indices to display information about agent status. For example, by clicking **☰** > **Agents management** > **Summary**, you can see information such as the Wazuh agent's connection status and historical evolution within set timeframes.

.. thumbnail:: /images/manual/wazuh-indexer/status-evolution-agents-dashboard.png
   :title: Status and evolution in Agents dashboard
   :alt: Status and evolution in Agents dashboard
   :align: center
   :width: 80%

In the :doc:`Wazuh dashboard configuration file </user-manual/wazuh-dashboard/settings>`, you can change the settings to do the following:

-  Disable inserting and showing connection status data for the agents. Change :doc:`wazuh.monitoring.enabled </user-manual/wazuh-dashboard/settings>` to accomplish this.

- Change the insertion frequency of connection status data for the agents. Change :doc:`wazuh.monitoring.frequency </user-manual/wazuh-dashboard/settings>` to accomplish this.

.. _wazuh_statistics_indices:

The wazuh‑statistics-* indices
------------------------------

The Wazuh dashboard uses the ``wazuh‑statistics-*`` indices to display statistics about the Wazuh server usage and performance. The information displayed includes the number of events decoded, bytes received, and TCP sessions.

The Wazuh dashboard runs requests to the Wazuh manager API to query usage-related information. It inserts data into the ``wazuh‑statistics-*`` indices from the information collected. The Wazuh indexer creates a ``wazuh‑statistics-*`` index per week by default. Check the documentation on the :doc:`Statistics creation interval </user-manual/wazuh-dashboard/settings>`. These indices store Wazuh server statistics every 5 minutes by default. Check the documentation on the :doc:`Frequency of task execution </user-manual/wazuh-dashboard/settings>`.

To visualize this information in the Wazuh dashboard, go to **Server management** > **Statistics**.

.. thumbnail:: /images/manual/wazuh-indexer/statistics-analysis-engine-dashboard.png
   :title: Statistics analysis engine dashboard
   :alt: Statistics analysis engine dashboard
   :align: center
   :width: 80%

.. _wazuh_states_vulnerabilities_indices:

The wazuh-states-vulnerabilities-* indices
------------------------------------------

The index pattern ``wazuh-states-vulnerabilities-*`` is used in Wazuh for storing data related to the vulnerability state of monitored assets. This index typically contains information about vulnerabilities detected in the systems being monitored, including details such as the severity, status, affected software, and vulnerability reference. The ``*`` at the end of the index pattern allows for the creation of multiple indices with similar names, segmented by time or other factors. This enables efficient storage and retrieval of vulnerability data over time.

To visualize this information in the Wazuh dashboard, click on **Vulnerability Detection** from the Wazuh dashboard home page.

.. thumbnail:: /images/manual/wazuh-indexer/wazuh-states-vulnerabilities-indices-1.png
   :title: Wazuh states vulnerabilities indices
   :alt: Wazuh states vulnerabilities indices
   :align: center
   :width: 80%

.. thumbnail:: /images/manual/wazuh-indexer/wazuh-states-vulnerabilities-indices-2.png
   :title: Wazuh states vulnerabilities indices
   :alt: Wazuh states vulnerabilities indices
   :align: center
   :width: 80%
