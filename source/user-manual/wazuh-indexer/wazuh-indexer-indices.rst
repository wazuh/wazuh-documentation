.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh indexer stores data using data streams and stateful indices. Find more information in this section of the documentation.

Wazuh indices
=============

The Wazuh indexer stores data using :ref:`data streams <wazuh_indexer_indices_data_streams>` and :ref:`stateful indices <wazuh_indexer_indices_stateful_indices>`.

Data streams handle continuously generated, time-based data such as events, findings, active response requests, and operational metrics. Each data stream writes to a sequence of backing indices, which Wazuh rolls over and retains according to its lifecycle policy. Wazuh automatically manages data streams using rollover and retention policies to maintain consistent performance as data volume grows.

Stateful indices store the latest known state of monitored endpoints, including inventory, vulnerability, and security-configuration assessment data.

.. _wazuh_indexer_indices_data_streams:

Data streams
------------

A data stream is a logical collection of backing indices that stores continuously generated, time-based data. Wazuh writes data to the stream name while managing the underlying backing indices automatically. Backing indices are the individual indices that sit behind a data stream and hold its actual data.

Each data stream is associated with an index template that defines its mappings and settings and applies its rollover and retention policy.

The following table lists the Wazuh data streams and the type of information each stores:

+----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| Data stream                      | Description                                                                                                                                  |
+==================================+==============================================================================================================================================+
| ``wazuh-events-raw-v5``          | Stores incoming events before processing and normalization, when raw event indexing is enabled. Raw event indexing is disabled by default.   |
+----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| ``wazuh-events-v5-<category>``   | Stores normalized and categorized events using the Wazuh Common Schema (WCS).                                                                |
+----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| ``wazuh-events-v5-unclassified`` | Stores events that could not be assigned to a category.                                                                                      |
+----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| ``wazuh-findings-v5-<category>`` | Stores findings generated when Security Analytics detectors match Sigma rules.                                                               |
+----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| ``wazuh-active-responses``       | Stores active response execution requests.                                                                                                   |
+----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| ``wazuh-metrics-agents``         | Stores operational metrics for monitored endpoints.                                                                                          |
+----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| ``wazuh-metrics-comms-v4``       | Stores Wazuh manager communication and performance metrics for the legacy communication protocol, which Wazuh agents earlier than 5.0.0 use. |
+----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| ``wazuh-metrics-normalization``  | Stores metrics about how the Wazuh manager normalizes (decodes) events.                                                                      |
+----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| ``wazuh-ai-assistant-sessions``  | Stores the conversations users have with the AI assistant.                                                                                   |
+----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+
| ``security-auditlogs``           | Stores the security plugin's audit events, such as failed logins, denied requests, and changes to the security configuration.                |
+----------------------------------+----------------------------------------------------------------------------------------------------------------------------------------------+

Event data streams
^^^^^^^^^^^^^^^^^^

Events collected from monitored endpoints pass through several stages before becoming searchable security data.

When an event arrives, Wazuh normalizes it according to the Wazuh Common Schema and routes it to the appropriate category-specific data stream. When unclassified event indexing is enabled for the space, events that cannot be categorized go to the unclassified data stream. When raw event indexing is enabled, Wazuh also stores the original event in the raw events data stream. Raw event indexing is disabled by default, and you enable it with the Setup module settings API. The event data streams are ``wazuh-events-raw-v5``, ``wazuh-events-v5-<category>``, and ``wazuh-events-v5-unclassified``.

Findings data streams
^^^^^^^^^^^^^^^^^^^^^

The Security Analytics module stores detector findings in category-specific findings data streams.

A finding is generated when an event matches a Sigma detection rule. Each finding contains the detection result, the triggering event, rule metadata, and investigation information such as case status, analyst comments, and tags. Findings are stored using the ``wazuh-findings-v5-<category>`` index pattern.

Active response data stream
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The active response data stream stores response execution requests generated by Wazuh.

When a rule triggers an active response action, Wazuh creates a document describing the action to perform. The Wazuh manager then reads these documents and distributes the actions to the correct agents.

Each document contains information about:

-  The event that triggered the response.
-  The configured response action.
-  The target agent or agents.
-  Execution parameters and response state.
-  Agent and cluster metadata.

This provides a complete audit trail linking response actions to the events that generated them. The template for this data stream is stored at ``templates/streams/active-responses.json``. It matches the ``wazuh-active-responses*`` index pattern and is set to priority ``1``. Its fields follow the Wazuh Common Schema with the following fields included:

+--------------------------------------------+------------------------------------------------------------------------------------------+
| Field                                      | Description                                                                              |
+============================================+==========================================================================================+
| ``@timestamp``                             | When the document was added to the ``wazuh-active-responses*`` index (at indexing time). |
+--------------------------------------------+------------------------------------------------------------------------------------------+
| ``event.doc_id``                           | Document ID of the matched alert that triggered the active response.                     |
+--------------------------------------------+------------------------------------------------------------------------------------------+
| ``event.index``                            | Source index of the matched alert that triggered the active response.                    |
+--------------------------------------------+------------------------------------------------------------------------------------------+
| ``wazuh.active_response.name``             | Name of the active response configured in the channel.                                   |
+--------------------------------------------+------------------------------------------------------------------------------------------+
| ``wazuh.active_response.executable``       | Executable configured in the active response channel.                                    |
+--------------------------------------------+------------------------------------------------------------------------------------------+
| ``wazuh.active_response.extra_arguments``  | Arguments configured in the channel.                                                     |
+--------------------------------------------+------------------------------------------------------------------------------------------+
| ``wazuh.active_response.location``         | Where to execute the response: *local*, *defined-agent,* or *all*.                       |
+--------------------------------------------+------------------------------------------------------------------------------------------+
| ``wazuh.active_response.agent_id``         | Agent configured in the channel.                                                         |
+--------------------------------------------+------------------------------------------------------------------------------------------+
| ``wazuh.active_response.type``             | Response type: *stateless* or *stateful*.                                                |
+--------------------------------------------+------------------------------------------------------------------------------------------+
| ``wazuh.active_response.stateful_timeout`` | Seconds configured in the channel for a *stateful* response.                             |
+--------------------------------------------+------------------------------------------------------------------------------------------+
| ``wazuh.agent.*``                          | Agent metadata.                                                                          |
+--------------------------------------------+------------------------------------------------------------------------------------------+
| ``wazuh.cluster.*``                        | Cluster information.                                                                     |
+--------------------------------------------+------------------------------------------------------------------------------------------+
| ``wazuh.space.name``                       | Wazuh space or tenant information.                                                       |
+--------------------------------------------+------------------------------------------------------------------------------------------+

.. _wazuh_indexer_indices_stateful_indices:

Stateful indices
----------------

Stateful indices store information that changes over time and reflects the current state of monitored endpoints. The ``wazuh-states-*`` indices hold Wazuh global state data, which is collected from all monitored endpoints and gives a consolidated view of their current state.

Unlike data streams, stateful information is continuously updated as the monitored environment changes.

The following stateful indices are available:

+-----------------------------------------------+-----------------------------------------------------------------+
| Index pattern                                 | Description                                                     |
+===============================================+=================================================================+
| ``wazuh-agent-config``                        | Latest configuration that each Wazuh agent reports, per module. |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-agent-stats``                         | Latest statistics that each Wazuh agent reports, per module.    |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-states-sca``                          | Security Configuration Assessment results.                      |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-states-fim-files``                    | File Integrity Monitoring file metadata.                        |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-states-fim-registry-keys``            | Monitored Windows registry keys.                                |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-states-fim-registry-values``          | Monitored Windows registry values.                              |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-states-vulnerabilities``              | Vulnerability assessment results.                               |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-states-inventory-users``              | User account inventory.                                         |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-states-inventory-groups``             | Local group inventory.                                          |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-states-inventory-packages``           | Installed software inventory.                                   |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-states-inventory-processes``          | Running process inventory.                                      |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-states-inventory-services``           | Service inventory.                                              |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-states-inventory-ports``              | Open port inventory.                                            |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-states-inventory-networks``           | Network address inventory.                                      |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-states-inventory-interfaces``         | Network interface information.                                  |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-states-inventory-protocols``          | Routing and protocol information.                               |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-states-inventory-hardware``           | Hardware inventory.                                             |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-states-inventory-system``             | Operating system and host information.                          |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-states-inventory-hotfixes``           | Installed updates and hotfixes.                                 |
+-----------------------------------------------+-----------------------------------------------------------------+
| ``wazuh-states-inventory-browser-extensions`` | Browser extension inventory.                                    |
+-----------------------------------------------+-----------------------------------------------------------------+

The following Wazuh capabilities write global state data to the ``wazuh-states-*`` indices.

System inventory (IT Hygiene)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

System Inventory provides visibility into the hardware, software, network, and operating system information of monitored endpoints. It collects information such as installed software packages, running processes, open ports, network interfaces, users, groups, services, browser extensions, operating system details, and hardware characteristics.

Wazuh agents use the :doc:`Syscollector </user-manual/capabilities/system-inventory/index>` module to periodically collect inventory information from monitored endpoints. The collected data is sent to the Wazuh manager, where it is processed and synchronized to the Wazuh indexer. The inventory information is stored as global state data in dedicated ``wazuh-states-inventory-*`` indices and can be queried and visualized from the Wazuh dashboard.

Vulnerability detection
^^^^^^^^^^^^^^^^^^^^^^^

Vulnerability detection provides visibility into software vulnerabilities affecting monitored endpoints. It identifies vulnerable packages and applications by correlating endpoint inventory information with vulnerability data from the Wazuh Cyber Threat Intelligence (CTI) service. Security teams use the results to prioritize remediation and monitor their vulnerability posture.

The Wazuh agent collects inventory data such as installed packages, operating system details, and hardware information from monitored endpoints. The collected data is sent to the Wazuh manager, where the ``wazuh-manager-remoted`` daemon publishes it to the Router ``inventory-states`` topic. The Inventory Sync module synchronizes the inventory state with the Wazuh indexer through the Indexer Connector and triggers the Vulnerability Scanner module.

The Vulnerability Scanner retrieves CVE feeds from the Wazuh indexer through the Content Manager and Indexer Connector. It then correlates the vulnerability information with the inventory data collected from monitored endpoints to identify affected systems and software packages. Vulnerability state information is stored as global state data in the ``wazuh-states-vulnerabilities`` index and can be queried and visualized from the Wazuh dashboard.

File integrity monitoring
^^^^^^^^^^^^^^^^^^^^^^^^^

File Integrity Monitoring (FIM) provides visibility into changes made to monitored files, directories, and Windows registry entries. It helps security teams detect unauthorized modifications, track configuration changes, and monitor critical system files for signs of compromise or policy violations.

Wazuh agents continuously monitor configured files, directories, and registry entries on monitored endpoints. When a change is detected, the file integrity monitoring capability records information about the affected object, including its current state and relevant metadata. This information is synchronized to the Wazuh indexer and stored as Wazuh global state data.

FIM data can be queried and visualized from the Wazuh dashboard, providing centralized visibility into the integrity and status of monitored files and registry objects across the environment.

Security configuration assessment (SCA)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Security Configuration Assessment (SCA) provides visibility into the security and compliance posture of monitored endpoints. It evaluates endpoint configurations against predefined security policies and benchmarks, helping organizations identify misconfigurations, verify compliance requirements, and monitor adherence to security best practices.

Wazuh agents perform SCA scans using policy files that contain security configuration checks. These checks evaluate files, directories, running processes, commands, and Windows registry settings against the defined policy requirements. The scan results are synchronized with the Wazuh manager and stored as Wazuh global state data in the Wazuh indexer.

SCA data can be queried and visualized from the Wazuh dashboard, providing centralized visibility into compliance status and security configuration findings across monitored endpoints.

Content Manager indices
-----------------------

The Content Manager module stores detection content and threat intelligence data in the following indices:

+----------------------------------------+-----------------------------------------------------------------------------------+
| Index                                  | Description                                                                       |
+========================================+===================================================================================+
| ``wazuh-threatintel-rules``            | Sigma rules, both from the Wazuh CTI and user-created, for every space.           |
+----------------------------------------+-----------------------------------------------------------------------------------+
| ``wazuh-threatintel-decoders``         | Decoders.                                                                         |
+----------------------------------------+-----------------------------------------------------------------------------------+
| ``wazuh-threatintel-integrations``     | Integrations.                                                                     |
+----------------------------------------+-----------------------------------------------------------------------------------+
| ``wazuh-threatintel-kvdbs``            | Key-value databases (KVDBs).                                                      |
+----------------------------------------+-----------------------------------------------------------------------------------+
| ``wazuh-threatintel-policies``         | Routing policies.                                                                 |
+----------------------------------------+-----------------------------------------------------------------------------------+
| ``wazuh-threatintel-filters``          | Wazuh Engine filters that route events for classification.                        |
+----------------------------------------+-----------------------------------------------------------------------------------+
| ``wazuh-threatintel-enrichments``      | Indicators of Compromise (IoC).                                                   |
+----------------------------------------+-----------------------------------------------------------------------------------+
| ``.wazuh-threatintel-vulnerabilities`` | Common Vulnerabilities and Exposures (CVE) data from the Wazuh CTI. Hidden index. |
+----------------------------------------+-----------------------------------------------------------------------------------+
| ``.wazuh-cti-consumers``               | Synchronization state of each CTI consumer.                                       |
+----------------------------------------+-----------------------------------------------------------------------------------+

.. _wazuh_indexer_indices_data_stream_lifecycle:

Data stream lifecycle
---------------------

Wazuh automatically manages data stream growth through rollover and retention policies.

A rollover occurs when the active backing index reaches a configured size or document count threshold. After rollover, new documents are written to a new backing index while existing data remains searchable.

Each lifecycle policy also sets a minimum age for deletion. Wazuh deletes a backing index only after the data stream rolls over to a new one. The minimum age for deletion counts from that rollover, not from the creation of the index. The exception is the AI assistant sessions and security audit log policies, which also roll over by age and count it from the creation of the index. This approach keeps storage consumption predictable while maintaining access to the data required for investigation, threat hunting, and compliance activities.

By default, Wazuh rolls over a data stream when either of the following limits is reached:

-  20 GB primary shard size.
-  200 million documents.

Two data streams also roll over by age: ``wazuh-ai-assistant-sessions`` rolls over daily, and ``security-auditlogs`` rolls over every 30 days.

The following table lists the default ISM policies, the data streams they manage, their rollover conditions, and their minimum ages for deletion.

+------------------------------------+---------------------------------+------------------------------------------+----------------------------+
| ISM policy                         | Data stream                     | Rollover                                 | Minimum age for deletion   |
+====================================+=================================+==========================================+============================+
| ``stream-raw-events-policy``       | ``wazuh-events-raw-v5``         | 20 GB or 200 million documents           | 4 hours after the rollover |
+------------------------------------+---------------------------------+------------------------------------------+----------------------------+
| ``stream-events-policy``           | ``wazuh-events-v5-*``           | 20 GB or 200 million documents           | 1 day after the rollover   |
+------------------------------------+---------------------------------+------------------------------------------+----------------------------+
| ``stream-findings-policy``         | ``wazuh-findings-v5-*``         | 20 GB or 200 million documents           | 90 days after the rollover |
+------------------------------------+---------------------------------+------------------------------------------+----------------------------+
| ``stream-active-responses-policy`` | ``wazuh-active-responses``      | 20 GB or 200 million documents           | 3 days after the rollover  |
+------------------------------------+---------------------------------+------------------------------------------+----------------------------+
| ``stream-metrics-policy``          | ``wazuh-metrics-*``             | 20 GB or 200 million documents           | 30 days after the rollover |
+------------------------------------+---------------------------------+------------------------------------------+----------------------------+
| ``ai-assistant-sessions-policy``   | ``wazuh-ai-assistant-sessions`` | 1 day, 20 GB, or 200 million documents   | 7 days after the creation  |
+------------------------------------+---------------------------------+------------------------------------------+----------------------------+
| ``security-auditlogs-policy``      | ``security-auditlogs``          | 30 days, 20 GB, or 200 million documents | 90 days after the creation |
+------------------------------------+---------------------------------+------------------------------------------+----------------------------+

The minimum age for deletion is a floor, not a ceiling. The Wazuh indexer deletes a backing index only after the data stream rolls over, so an event is kept for the time its backing index takes to roll over, plus the minimum age for deletion. The time to roll over is at most the time the data stream takes to fill 20 GB per primary shard.

-  At high ingest rates, shards fill quickly and retention is about the minimum age for deletion. Plan disk space for this case: each active events category keeps about one day of its ingest, plus up to 40 GB for the write index and the rounding up to whole indices, doubled when a replica is allocated.
-  At low ingest rates, the data stream may never reach a rollover limit. The write index then stays in the ``hot`` state and is never deleted, so the data is kept indefinitely.

For this reason, the minimum ages for deletion can't be used as privacy or compliance statements. To delete data after a fixed time, add an age condition to the rollover in a custom policy. See :ref:`Creating a custom retention policy <wazuh_indexer_indices_creating_custom_retention_policy>`. The AI assistant sessions and security audit log policies already include one.

To check whether a backing index has rolled over, run the following in **Dev Tools**:

.. code-block:: none

   GET _plugins/_ism/explain/<index>

A response with ``"step": {"name": "attempt_rollover", "step_status": "condition_not_met"}`` and ``"rolled_over": false`` means the index hasn't met a rollover condition and isn't eligible for deletion yet.

The following diagram illustrates the lifecycle of a data stream:

.. thumbnail:: /images/manual/wazuh-indexer/data-stream-lifecycle.png
   :title: Data stream lifecycle
   :alt: Data stream lifecycle
   :align: center
   :width: 80%

.. note::

   Data stream rollover and retention are managed automatically through :ref:`Index State Management (ISM) <index_state_management>` policies. Don't edit the default policies. To change retention, see :ref:`Managing data retention <wazuh_indexer_indices_managing_data_retention>`.

Each lifecycle policy moves an index through two stages during its lifetime. When an index is first created, it enters the active stage, where it accepts new data. It remains in this stage until one of the configured rollover conditions, such as primary shard size or document count, is met. At that point, Wazuh creates a new active index, and the previous index stops accepting new data.

The previous index moves to the delete stage once its minimum age for deletion has passed since the rollover, and Wazuh permanently removes it. If the deletion fails, Wazuh automatically retries the operation up to three times with increasing delays between attempts.

The ISM policy below keeps matching indices in the hot state while they receive data. It rolls them over when they reach 200 million documents or a 20 GB primary shard size. Once the minimum age has passed since the rollover, the policy moves the index to the delete state and removes it. Failed actions are retried up to three times using exponential backoff. The following example shows a simplified version of the ``stream-findings-policy`` default policy. Other default policies differ only in the deletion age, index patterns and, for the AI assistant sessions and audit log policies, an additional ``min_index_age`` rollover condition and a ``min_index_age`` deletion condition, counted from the creation of the index, instead of ``min_rollover_age``. All default policies use an ``ism_template`` priority of ``0``, so a custom policy with a higher priority takes precedence for new backing indices.

.. code-block:: none
   :emphasize-lines: 4, 5

   {
     "policy": {
       "policy_id": "stream-findings-policy",
       "description": "<POLICY_DESCRIPTION>",
       "last_updated_time": <UNIX_TIMESTAMP_IN_MILLISECONDS>,
       "schema_version": 1,
       "default_state": "hot",
       "states": [
         {
           "name": "hot",
           "actions": [
             {
               "retry": {
                 "count": 3,
                 "backoff": "exponential",
                 "delay": "1m"
               },
               "rollover": {
                 "min_doc_count": 200000000,
                 "min_primary_shard_size": "20gb"
               }
             }
           ],
           "transitions": [
             {
               "state_name": "delete",
               "conditions": {
                 "min_rollover_age": "90d"
               }
             }
           ]
         },
         {
           "name": "delete",
           "actions": [
             {
               "retry": {
                 "count": 3,
                 "backoff": "exponential",
                 "delay": "1m"
               },
               "delete": {}
             }
           ],
           "transitions": []
         }
       ],
       "ism_template": [
         {
           "index_patterns": [
             ".ds-wazuh-findings-v5-*", "wazuh-findings-v5*"
           ],
           "priority": 0
         }
       ]
     }
   }

.. _wazuh_indexer_indices_managing_data_retention:

Managing data retention
-----------------------

The Wazuh indexer ships default ISM policies that control the retention of its data streams. This section explains why you must not edit them, how to replace them with a custom policy, and how policy changes reach existing indices.

Default ISM policies
^^^^^^^^^^^^^^^^^^^^

The seven policies in the Data stream lifecycle table are Wazuh's default ISM policies. The Wazuh indexer writes them again every time it starts, including after an upgrade, so that each release can deliver updated policies. This replaces any change made to a default policy, whether through the Wazuh dashboard or the ISM API. The policies are rewritten a few minutes after the Wazuh indexer starts, not immediately, so an edit may appear to persist right after a restart. ISM can't mark a policy as read-only, so nothing prevents the edit in the first place.

.. _wazuh_indexer_indices_creating_custom_retention_policy:

Creating a custom retention policy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ISM can't clone a policy, so a custom policy starts as a copy of the default one. Before you shorten retention, consider the following trade-offs:

-  Rolling over daily on a low-volume deployment creates many small backing indices. Each one adds its own shard overhead.
-  The Wazuh indexer deletes findings at the age you choose. This includes existing data, which a low-volume deployment might otherwise keep for months in a single shard, once you move existing indices to the new policy.

Follow the steps below to create a custom retention policy.

#. In the Wazuh dashboard, go to **Indexer management** > **Index Management** > **State management policies**.
#. Click the default policy that manages the indices you wish to clone, click **Edit**, and select **JSON editor**, and click **Continue**.
#. Copy the full JSON content, then click **Cancel** without saving.
#. On **State management policies**, click **Create policy**, select **JSON editor**, and click **Continue**.
#. Enter an ID for the custom policy in **Policy ID**.
#. Replace the content of the editor with the JSON you copied in step 3.
#. Inside the ``policy`` object, delete the ``policy_id``, ``last_updated_time``, ``schema_version``, and ``error_notification`` fields.
#. Make the following changes:

   -  Set ``description`` to a descriptive message for the policy. For example, ``Custom findings policy: deletes findings 30 days after their backing index is created.``
   -  In the ``rollover`` action of the first state, add ``"min_index_age": "<ROLLOVER_AGE>"``. Replace ``<ROLLOVER_AGE>`` with the age at which the write index rolls over, for example ``1d``. This makes the write index roll over daily, so it becomes eligible for deletion even if it never fills a shard. Keep this value shorter than the retention age.
   -  In the transition to the delete state, replace the ``min_rollover_age`` condition with ``"min_index_age": "<RETENTION_AGE>"`` inside ``conditions``. This is the deletion age. ISM measures it from the index creation date. A transition takes a single condition. Replace ``<RETENTION_AGE>`` with the age at which the Wazuh indexer deletes an index, for example ``30d``.
   -  In ``ism_template``, set ``"priority": 1``. This makes ISM attach new backing indices to this policy instead of the default policy, which uses priority ``0``.

#. Click **Create**. New findings matching the ISM policy now use the custom policy.

The ``ism_template`` applies only to indices created after you store the policy, so existing indices keep their current policy until you change it. Follow the steps below to move the existing indices to the new policy.

10. Go to **Indexer management** > **Index Management** > **Policy managed indexes** and click **Change policy**.
#. Under **Choose managed indices**, type the backing index pattern of the data streams, for example ``.ds-wazuh-findings-v5-*``. Select the wildcard entry that appears at the top of the list.
#. Under **Choose new policy**, select the custom policy and click **Change**.

Wait for the change to apply, then verify it. The change is asynchronous. It takes two ISM runs, which happen every 5 minutes by default. After the first run, the index shows the new policy and reports ``Attempting to change policy to <POLICY_ID>``. The switch completes on the following run. Allow 10 to 15 minutes for the change to complete. The following steps show how to verify the changes.

#. Go to **Indexer management** > **Index Management** > **Policy managed indexes**.
#. Turn on **Show data stream indexes** to list the ``.ds-`` backing indices.
#. Check that every targeted index shows the custom policy and no longer reports the pending change.

The ``index.plugins.index_state_management.policy_id`` setting of the indices still shows the default policy because the index template sets it. The policy shown on **Policy managed indexes** is the policy that ISM runs.

.. warning::

   Don't restart the Wazuh indexer until every index has switched to the new policy. If an ISM run is interrupted during the switch, the index can end in a failed state and stop being managed. See :ref:`Recovering indices in a failed state <wazuh_indexer_indices_recovering_failed_indices>`.

Restoring the default retention policy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To restore the default retention, perform the following steps:

#. Repeat steps 10 - 12 of :ref:`Creating a custom retention policy <wazuh_indexer_indices_creating_custom_retention_policy>`, selecting the default policy as the new policy.
#. Wait for the change to apply and verify it as described above.
#. Go to **Indexer management** > **Index Management** > **State management policies**, select the custom policy, and click **Delete**.

.. _wazuh_indexer_indices_recovering_failed_indices:

Recovering indices in a failed state
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

An index can end in a failed state if its ISM run is interrupted, for example by a Wazuh indexer restart while the index switches to a new policy. ISM stops managing an index in this state. To recover it, remove its policy and add the policy again. Follow the steps below to find the indices in a failed state and repair them.

#. Go to **Indexer management** > **Index Management** > **Policy managed indexes** and turn on **Show data stream indexes**.
#. Look for indices with a failed status. The info column shows the reason.
#. Remove the policy from each failed index. On **Policy managed indexes**, select the index and click **Remove policy**. Click **Remove** to confirm.
#. Go to **Indexer management** > **Index Management** > **Indexes** and turn on **Show data stream indexes**.
#. Select the index and click **Actions** > **Apply policy**.
#. Select the policy the index must run and click **Apply**.

Applying a new policy version to existing indices
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Each managed index runs its own copy of the policy, taken when ISM attached the index to the policy. Storing a new version of a policy, whether through an edit, a restart, or an upgrade, doesn't change the copy that existing indices run. Only backing indices created afterwards use the new version. To apply a new version to existing indices, change their policy to the same policy ID.

This also applies after an upgrade. If a release ships a new version of a default policy, existing backing indices keep running the previous version. On a low-volume deployment, the write index might never roll over, so it can run the previous version indefinitely.

Check which version each index runs. **Policy managed indexes** show the stored policy, not the copy each index runs.

#. Go to **Indexer management** > **Dev Tools**.
#. Run the following request and note the value of ``policy.last_updated_time``:

   .. code-block:: none

      GET _plugins/_ism/policies/<POLICY_ID>

#. Run the following request and check ``policy.last_updated_time`` for each index:

   .. code-block:: none

      GET _plugins/_ism/explain/<INDEX_PATTERN>?show_policy=true

   Where:

   -  ``<POLICY_ID>`` is the ID of the policy you want to apply again.
   -  ``<INDEX_PATTERN>`` is the pattern that matches the backing indices the policy manages. Backing indices of a data stream start with ``.ds-``.

   An index with an older value than the stored policy runs an older version.

   .. note::

      Don't compare ``_seq_no`` values. Every restart rewrites the default policies and increases their ``_seq_no``, even when their content doesn't change.

#. Move the existing indices to the current version. Follow steps 10 - 12 of :ref:`Creating a custom retention policy <wazuh_indexer_indices_creating_custom_retention_policy>`, selecting the same policy as the new policy.
#. Verify the switch as described in :ref:`Creating a custom retention policy <wazuh_indexer_indices_creating_custom_retention_policy>`.

.. _wazuh_indexer_indices_enabling_unclassified_events_storage:

Enabling unclassified events storage
------------------------------------

Wazuh agent collects logs from endpoints and forwards them to the Wazuh manager. The Wazuh manager normalizes, decodes, and enriches events and sends them to the Wazuh indexer for rule matching, indexing, and security analytics. The Wazuh dashboard allows teams to view and investigate findings, search historical events, and manage the platform. Events that match detection rules generate findings. Events that cannot be decoded or classified are stored in the ``wazuh-events-v5-unclassified`` index when unclassified event indexing is enabled for the relevant space.

Unclassified event indexing is configured per space. You can enable unclassified event indexing in the Draft or Standard space. Follow the steps below to enable the storage of unclassified events:

#. Navigate to the **Ruleset management** > **Overview**, select the space you want to enable unclassified events for, click the **Actions** drop-down menu, and select **Edit**:

   .. thumbnail:: /images/manual/wazuh-indexer/security-analytics-edit-space.png
      :title: Edit a Security Analytics space
      :alt: Edit a Security Analytics space
      :align: center
      :width: 80%

#. Toggle on **Index unclassified events**, and click **Save**:

   .. thumbnail:: /images/manual/wazuh-indexer/enable-unclassified-events-toggle.png
      :title: Enable Index unclassified events
      :alt: Enable Index unclassified events
      :align: center
      :width: 80%

If you edited the Draft space, promote the change to apply it. Click **Actions** > **Promote**, review the changes on the **Promote** page, and click **Promote**. In the confirmation dialog, type ``promote`` and click **Promote**. Then select the **Test** space and promote again the same way, so that the change reaches the **Custom** space. The **Standard** space can't be promoted, so changes to it are saved directly.

Verifying index templates
-------------------------

Index templates define the mappings, settings, and lifecycle policies applied to Wazuh indices and data streams.

To verify that the Wazuh templates are installed, query the Wazuh indexer from the Wazuh dashboard. Navigate to **Indexer management** > **Dev Tools** and run the query below:

.. code-block:: none

   GET /_index_template/wazuh-*

The response lists the index templates whose names start with ``wazuh-`` and the index patterns associated with each template. To list every index template, including the stateful index templates (``wazuh-states-*``) and internal ones such as ``settings``, run ``GET _cat/templates?v&s=name``.

.. code-block:: none
   :class: output

   {
     "index_templates": [
       {
         "name": "wazuh-findings-v5-network-activity-template",
         "index_template": {
           "index_patterns": [
             "wazuh-findings-v5-network-activity*"
           ],
           "template": {
             "settings": {
               "index": {
                 "codec": "zstd",
                 "mapping": {
                   "nested_fields": {
                     "limit": "50"
                   },
                   "total_fields": {
                     "limit": "1000"
                   }
                 },
                 "refresh_interval": "2s",
                 "number_of_shards": "1",
                 "auto_expand_replicas": "0-1",
                 "plugins": {
                   "index_state_management": {
                     "policy_id": "stream-findings-policy"
                   }
                 },
                 "max_docvalue_fields_search": "200",
                 "query": {
                   "default_field": [
                     "error.message",
                     "message",
                     "wazuh.agent.host.architecture",
                     "wazuh.agent.id",
                     "wazuh.agent.name",
                     "wazuh.agent.version",
                     "wazuh.cluster.name",
                     "wazuh.cluster.node",
                     "wazuh.schema.version"
                   ]
                 },
                 "number_of_replicas": "0"
               }
             }
           }
         }
       }
       ...
