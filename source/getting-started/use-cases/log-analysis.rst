.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh collects, normalizes, analyzes, indexes, and visualizes log data from endpoints, network devices, applications, and cloud services.

Log data analysis
=================

Log data analysis helps organizations detect security events, investigate suspicious activity, and understand what is happening across their infrastructure. Logs collected and analyzed from multiple systems give you visibility into authentication activity, application behavior, network events, configuration changes, and other security-relevant operations.

The Wazuh :doc:`log data collection </user-manual/capabilities/log-data-collection/index>` capability centralizes logs from monitored endpoints, network devices, applications, cloud services, and containers. The Wazuh manager enriches and normalizes this telemetry into the :ref:`Wazuh Common Schema (WCS) <wazuh_common_schema>` and forwards the processed events to the Wazuh indexer for analysis. Wazuh rules and decoders support :doc:`log data analysis </user-manual/data-analysis/index>`, threat detection, and response. Centralized logs enable security teams to search, correlate, and investigate security events from a single interface.

Collecting and centralizing security logs
-----------------------------------------

Security events originate from operating systems, applications, network devices, cloud services, and other infrastructure components. Wazuh centralizes log collection across these sources, giving security teams a single location to search, correlate, and investigate security events.

The :doc:`Logcollector module </user-manual/capabilities/log-data-collection/how-it-works>` collects log files on :ref:`Linux <how-to-collect-linuxlogs>`, :ref:`Windows <how-to-collect-windowslogs>`, and :ref:`macOS <how-to-collect-macoslogs>` operating systems. It also monitors Windows Event Channels, collects logs from the macOS Unified Logging System (ULS), and reads the systemd journal through the journald collector. The Wazuh agent forwards collected logs to the Wazuh manager. The Wazuh manager normalizes and processes the logs before forwarding them to the Wazuh indexer. The Wazuh indexer analyzes the logs and stores them in dedicated data streams for centralized analysis.

Wazuh also collects logs from syslog-enabled devices through a Wazuh agent on a relay endpoint, from cloud providers, and from third-party applications. A new log source requires a configuration change on the Wazuh agent. Integrations such as AWS, Azure, and Docker are disabled by default, so you also enable them on the Wazuh dashboard.

The **Discover** section of the Wazuh dashboard centralizes security events collected from monitored endpoints, applications, network devices, and cloud services.

.. thumbnail:: /images/getting-started/use-cases/log-data-analysis/centralized-security-events.png
   :title: Discover section showing security events collected from endpoints, applications, network devices, and cloud services
   :alt: Discover section showing security events collected from endpoints, applications, network devices, and cloud services
   :align: center
   :width: 80%

Normalizing diverse log formats into a single schema
----------------------------------------------------

Different technologies record the same security activity in different log formats. For example, a firewall log, a Windows logon event, and a web server access log represent network activity using different fields and structures. Wazuh normalizes these events into the :ref:`Wazuh Common Schema (WCS) <wazuh_common_schema>`, providing a consistent representation of security data across all supported sources.

The :doc:`Wazuh normalization engine </user-manual/manager/wazuh-normalization-engine>` uses YAML-based decoders to parse raw logs and map their fields to WCS. As a result, common attributes use the same field names regardless of the original log source. These attributes include the source and destination IP addresses, username, process, and event type.

A consistent schema simplifies log analysis, threat hunting, and detection engineering. Security teams can use the same search query, dashboard panel, or detection rule across multiple log sources without adapting it to each log format. For applications with proprietary or custom log formats, Wazuh supports :ref:`custom decoders <data_analysis_custom_decoders>` that integrate into the same normalization pipeline.

The **Decoders** subsection of the **Ruleset Management** section in the Wazuh dashboard shows the decoders used to normalize log sources into the WCS.

.. thumbnail:: /images/getting-started/use-cases/log-data-analysis/wcs-decoders.png
   :title: Decoders sub-section of Ruleset Management showing decoders that normalize logs into the WCS
   :alt: Decoders sub-section of Ruleset Management showing decoders that normalize logs into the WCS
   :align: center
   :width: 80%

Detecting threats from normalized logs
--------------------------------------

Wazuh evaluates normalized events against out-of-the-box :ref:`detection rules <data_analysis_rules>` in the Wazuh indexer and generates findings when rule conditions match. Each rule matches log fields, values, or patterns that might indicate a security threat. These rules cover detections such as authentication failures, privilege escalation, malware activity, file integrity events, network anomalies, and other security events.

Each finding includes additional context, such as MITRE ATT&CK tactics and techniques, severity, and compliance mappings for supported frameworks. This information helps security teams understand the detected activity and prioritize investigation.

The Wazuh indexer stores generated findings in a dedicated data stream. Security teams can extend detection coverage by creating custom rules or adding :doc:`Sigma-based rules </user-manual/wazuh-indexer/wazuh-sigma-rules>` without changing how logs are collected or normalized. The **Rules** subsection of the **Ruleset Management** section in the Wazuh dashboard lets you view the default and custom detection rules.

.. thumbnail:: /images/getting-started/use-cases/log-data-analysis/detection-rule-details.png
   :title: Detection rule details including MITRE ATT&CK and compliance mappings
   :alt: Detection rule details including MITRE ATT&CK and compliance mappings
   :align: center
   :width: 80%

For example, the rule below is triggered when shell history is cleared on a Linux endpoint. Additionally, rules enrich events with technique identifiers from the MITRE ATT&CK framework and map them to regulatory compliance controls.

.. code-block:: json

   {
     "id": "77a9994e-d0db-535f-876c-fefdf7913d38",
     "level": "high",
     "detection": {
       "condition": "selection and not filter_windows_eventlog",
       "filter_windows_eventlog": {
         "event.code": [
           "1102",
           "104"
         ],
         "event.dataset": [
           "security",
           "system"
         ]
       },
       "selection": {
         "event.action": "security-log-cleared",
         "event.category|contains": "configuration"
       }
     },
     "tags": [
       {
         "value": "attack.defense-evasion"
       },
       {
         "value": "attack.t1070.003"
       }
     ],
     "mitre": {
       "subtechnique": {
         "id": [
           "T1070.003"
         ],
         "name": [
           "Clear Command History"
         ]
       },
       "tactic": {
         "id": [
           "TA0005"
         ],
         "name": [
           "Stealth"
         ]
       },
       "technique": {
         "id": [
           "T1070"
         ],
         "name": [
           "Indicator Removal"
         ]
       }
     },
     "compliance": {
       "fedramp": [
         "AU-9"
       ],
       "gdpr": [
         "Article 32",
         "Article 33",
         "Article 5"
       ],
       "nist_800_53": [
         "AU-9"
       ],
       "pci_dss": [
         "10.2.1.3"
       ]
     }
   }

The **Findings** tab in the **Threat Hunting** section of the Wazuh dashboard shows the findings generated after normalized logs are evaluated against Wazuh detection rules.

.. thumbnail:: /images/getting-started/use-cases/log-data-analysis/findings-from-normalized-logs.png
   :title: Findings tab of the Threat Hunting section showing findings generated from normalized logs
   :alt: Findings tab of the Threat Hunting section showing findings generated from normalized logs
   :align: center
   :width: 80%

Indexing and storing log data
-----------------------------

The :doc:`Wazuh indexer </user-manual/wazuh-indexer/index>` stores and indexes security events, findings, endpoint state, and other data collected and generated by Wazuh. The Wazuh indexer stores data as JSON documents and provides distributed search and analytics across the Wazuh environment.

The Wazuh indexer organizes data into indices and data streams and distributes their shards across cluster nodes. Replicas provide redundancy for indexed data, while adding nodes can increase storage capacity and support higher query workloads.

Wazuh uses multiple :ref:`stateful indices <wazuh_indexer_indices_stateful_indices>` and :ref:`data streams <wazuh_indexer_indices_data_streams>` for different types of data. The primary data streams used for log analysis are:

-  **Events**: Stores normalized security events collected from monitored endpoints and other sources. The **Discover** section of the Wazuh dashboard shows these events by default for searching and analysis.

   .. thumbnail:: /images/getting-started/use-cases/log-data-analysis/normalized-events.png
      :title: Discover section showing normalized events from the wazuh-events-v5* data stream
      :alt: Discover section showing normalized events from the wazuh-events-v5* data stream
      :align: center
      :width: 80%

-  **Raw events**: Stores the raw events that the Wazuh manager receives, including events that don't generate findings. Wazuh uses this data for long-term log retention and analysis. Raw event indexing is disabled by default because storing every collected event requires significant storage capacity.

   .. thumbnail:: /images/getting-started/use-cases/log-data-analysis/raw-events.png
      :title: Discover section showing raw events from the wazuh-events-raw-v5* data stream
      :alt: Discover section showing raw events from the wazuh-events-raw-v5* data stream
      :align: center
      :width: 80%

-  **Agent metrics**: Stores the connection state of each Wazuh agent over time. The state is one of ``active``, ``disconnected``, ``pending``, or ``never_connected``. Use this information to find Wazuh agents that have stopped reporting to the Wazuh manager and need investigation. The image below shows the connection status of the agents on the Wazuh dashboard.

   .. thumbnail:: /images/getting-started/use-cases/log-data-analysis/wazuh-agent-state-metrics.png
      :title: Wazuh agent state data from the wazuh-metrics-agents* data stream
      :alt: Wazuh agent state data from the wazuh-metrics-agents* data stream
      :align: center
      :width: 80%

-  **Communication metrics**: Stores Wazuh agent communication metrics, such as received events, sent and received bytes, queue usage, and TCP sessions.
-  **Findings**: Stores findings generated when normalized events match detection rules.

Querying and viewing security telemetry
---------------------------------------

Wazuh provides query and dashboard capabilities that help security teams analyze security telemetry across monitored endpoints, applications, network devices, cloud services, and other data sources. The Wazuh dashboard supports real-time searches, filtering, and drill-down analysis across collected events and findings, such as failed logins, malware detections, and system anomalies.

Wazuh also includes predefined dashboards for security monitoring, compliance, endpoint security, cloud security, vulnerability detection, and other use cases. These dashboards show security telemetry in charts, tables, timelines, and other widgets. Analysts use them to identify trends, anomalies, and security activity across their environment.

Security teams can create custom dashboards to monitor organization-specific security metrics, key performance indicators (KPIs), and operational telemetry. Custom dashboards provide a centralized view of security events and support continuous monitoring across different environments.

The :ref:`Threat Hunting <wazuh_dashboard_navigating_the_wazuh_dashboard_threat_hunting>` dashboard summarizes findings by level over time. It also shows the most active agents, integrations, and rules, and the most frequent MITRE ATT&CK techniques. For compliance, see the :ref:`Regulatory Compliance <wazuh_dashboard_navigating_the_wazuh_dashboard_regulatory_compliance>` dashboard.

.. thumbnail:: /images/getting-started/use-cases/log-data-analysis/querying-and-viewing-security-telemetry.png
   :title: Querying and viewing security telemetry
   :alt: Querying and viewing security telemetry
   :align: center
   :width: 80%
