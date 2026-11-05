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

Wazuh also collects logs from syslog-enabled devices through a Wazuh agent that reads them, from cloud providers, and from third-party applications. A new log source requires only a configuration change on the Wazuh agent or Wazuh manager, depending on the integration.

The **Discover** section of the Wazuh dashboard centralizes security events collected from monitored endpoints, applications, network devices, and cloud services.

.. thumbnail:: /images/getting-started/use-cases/log-data-analysis/centralized-security-events.png
   :title: Discover section showing security events collected from endpoints, applications, network devices, and cloud services
   :alt: Discover section showing security events collected from endpoints, applications, network devices, and cloud services
   :align: center
   :width: 80%

Normalizing diverse log formats into a single schema
----------------------------------------------------

Different technologies record the same security activity in different log formats. For example, a firewall log, a Windows logon event, and a web server access log represent network activity using different fields and structures. Wazuh normalizes these events into the :ref:`Wazuh Common Schema (WCS) <wazuh_common_schema>`, providing a consistent representation of security data across all supported sources.

The :doc:`Wazuh normalization engine </user-manual/manager/wazuh-normalization-engine>` uses YAML-based decoders to parse raw logs and map their fields to WCS. As a result, common attributes such as source IP address, destination IP address, username, process, and event type use the same field names regardless of the original log source.

A consistent schema simplifies log analysis, threat hunting, and detection engineering. Security teams can use the same search query, dashboard visualization, or detection rule across multiple log sources without adapting it to each log format. For applications with proprietary or custom log formats, Wazuh supports :ref:`custom decoders <data_analysis_custom_decoders>` that integrate into the same normalization pipeline.

The **Decoders** sub-section of the **Ruleset Management** section in the Wazuh dashboard shows the decoders used to normalize log sources into the WCS.

.. thumbnail:: /images/getting-started/use-cases/log-data-analysis/wcs-decoders.png
   :title: Decoders sub-section of Ruleset Management showing decoders that normalize logs into the WCS
   :alt: Decoders sub-section of Ruleset Management showing decoders that normalize logs into the WCS
   :align: center
   :width: 80%

Detecting threats from normalized logs
--------------------------------------

Wazuh evaluates normalized events against out-of-the-box :ref:`detection rules <data_analysis_rules>` in the Wazuh indexer and generates findings when rule conditions match. Each rule matches log fields, values, or patterns that might indicate a security threat. These rules cover detections such as authentication failures, privilege escalation, malware activity, file integrity events, network anomalies, and other security events.

Each finding includes additional context, such as MITRE ATT&CK tactics and techniques, severity, and compliance mappings for supported frameworks. This information helps security teams understand the detected activity and prioritize investigation.

The Wazuh indexer stores generated findings in the ``wazuh-findings-v5*`` data stream. Security teams can extend detection coverage by creating custom rules or adding Sigma-based rules without changing how logs are collected or normalized. The **Rules** sub-section of the **Ruleset Management** section in the Wazuh dashboard lets you view the default and custom detection rules.

.. thumbnail:: /images/getting-started/use-cases/log-data-analysis/detection-rule-details.png
   :title: Detection rule details including MITRE ATT&CK and compliance mappings
   :alt: Detection rule details including MITRE ATT&CK and compliance mappings
   :align: center
   :width: 80%

For example, the rule below is triggered when a security audit log, shell history, or cloud audit trail is cleared. Additionally, rules enrich events with technique identifiers from the MITRE ATT&CK framework and map them to regulatory compliance controls.

.. code-block:: json

   {
     "id": "77a9994e-d0db-535f-876c-fefdf7913d38",
     "level": "high",
     "category": "configuration",
     "status": "stable",
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
     "false_positives": [
       {
         "value": "An interactive shell writing its history file at exit when the history file is under an audit write watch (bash appends ~/.bash_history on every exit)"
       },
       {
         "value": "A shell configuration that empties the history file by design (HISTFILESIZE=0, a ~/.bash_logout that truncates it)"
       },
       {
         "value": "Account deprovisioning or home directory cleanup that deletes or empties *_history files"
       },
       {
         "value": "Authorised log management and archival procedures"
       }
     ],
     "log_source": {
       "category": "configuration",
       "product": "wazuh-generic-1"
     },
     "metadata": {
       "author": "Wazuh, Inc.",
       "date": "2026-04-01",
       "description": "Detects when a security audit log, shell history, or cloud audit trail is cleared. Log clearing is a common anti-forensics technique used by attackers to cover their tracks after a compromise. On Linux this fires on bash/shell history truncation, which corresponds to Clear Command History, not Windows Event Log clearing.\n",
       "documentation": "Blind spots: Windows Security 1102 (event.dataset security) and the System channel 104 (event.dataset system) are excluded by event.dataset plus event.code; the Windows rule c21c2a72 owns Windows event log clearing. The filter is a cross product of the two lists, so security with 104 and system with 1102 are also excluded; neither pair is written by any decoder at offset 1787. On Linux the only producer is decoder/auditd/0, which writes security-log-cleared when the delivered audit event (the agent joins SYSCALL, PATH and PROCTITLE records into one event) carries a file.name containing _history; a PATH record alone decodes as file-referenced. The default Wazuh audit rules record execve only, so a history truncation raises nothing unless an audit watch covers the history file. unset HISTFILE before exit writes no file and is never seen. history -c clears only the shell's memory; it is seen only when the shell later writes the history file at exit and a write watch covers that file, and that write is indistinguishable from an ordinary exit append. The decoder does not check the syscall or the access type: any audited access to a *_history file matches, including an ordinary append at shell exit. Cloud audit trail deletion does not decode to security-log-cleared at offset 1787 and is not covered, although the description names it.",
       "modified": "2026-10-06",
       "references": [
         "https://attack.mitre.org/techniques/T1070/003/"
       ],
       "title": "Security audit log cleared",
       "supports": []
     },
     "enabled": true,
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
     },
     "rule": "",
     "queries": [],
     "query_field_names": []
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

-  ``wazuh-events-v5*`` stores normalized security events collected from monitored endpoints and other sources. The **Discover** section of the Wazuh dashboard can display these events for searching and analysis. The index pattern is set to ``wazuh-events-v5*`` by default.

   .. thumbnail:: /images/getting-started/use-cases/log-data-analysis/normalized-events.png
      :title: Discover section showing normalized events from the wazuh-events-v5* data stream
      :alt: Discover section showing normalized events from the wazuh-events-v5* data stream
      :align: center
      :width: 80%

-  ``wazuh-events-raw-v5*`` stores raw events received by the Wazuh manager, including events that do not generate findings. Wazuh uses this data to support long-term log retention and analysis. This data stream is disabled by default because storing all collected events can require significant storage capacity.

   .. thumbnail:: /images/getting-started/use-cases/log-data-analysis/raw-events.png
      :title: Discover section showing raw events from the wazuh-events-raw-v5* data stream
      :alt: Discover section showing raw events from the wazuh-events-raw-v5* data stream
      :align: center
      :width: 80%

-  The ``wazuh-metrics-agents*`` data stream stores data about the state of Wazuh agents over a period of time. The state of the Wazuh agent can be ``active``, ``disconnected``, ``pending``, or ``never_connected``. Use this information to find Wazuh agents that have stopped reporting to the Wazuh manager and need investigation. The image below shows the connection status of the agents on the Wazuh dashboard.

   .. thumbnail:: /images/getting-started/use-cases/log-data-analysis/wazuh-agent-state-metrics.png
      :title: Wazuh agent state data from the wazuh-metrics-agents* data stream
      :alt: Wazuh agent state data from the wazuh-metrics-agents* data stream
      :align: center
      :width: 80%

-  ``wazuh-metrics-comms*`` stores agent communication metrics, such as received events, sent and received bytes, queue usage, and TCP sessions.
-  ``wazuh-findings-v5*`` stores findings generated when normalized events match detection rules.

Querying and visualizing security telemetry
-------------------------------------------

Wazuh provides querying and visualization capabilities that help security teams analyze security telemetry across monitored endpoints, applications, network devices, cloud services, and other data sources. The Wazuh dashboard supports real-time searches, filtering, and drill-down analysis across collected events and findings, such as failed logins, malware detections, and system anomalies.

Wazuh also includes predefined dashboards for security monitoring, compliance, endpoint security, cloud security, vulnerability detection, and other use cases. These dashboards show security telemetry in charts, tables, timelines, and other widgets. Analysts use them to identify trends, anomalies, and security activity across their environment.

Security teams can create custom dashboards to monitor organization-specific security metrics, key performance indicators (KPIs), and operational telemetry. Custom dashboards provide a centralized view of security events and support continuous monitoring across different environments.

The **Threat Hunting** dashboard provides an overview of findings, including their levels over time, the most active agents, integrations, and rules, and the most frequent MITRE ATT&CK techniques. For compliance, see the **Regulatory Compliance** dashboard.

.. thumbnail:: /images/getting-started/use-cases/log-data-analysis/threat-hunting-dashboard.png
   :title: Threat Hunting dashboard showing event trends, compliance summaries, and severity distribution
   :alt: Threat Hunting dashboard showing event trends, compliance summaries, and severity distribution
   :align: center
   :width: 80%

