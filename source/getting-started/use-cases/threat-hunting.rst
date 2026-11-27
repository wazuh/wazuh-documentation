.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh supports threat hunting with indicator of compromise matching, centralized telemetry, inventory baselines, MITRE ATT&CK mapping, and Sigma-based detection rules.

Threat hunting
==============

Threat hunting is a proactive security practice that searches for malicious activity that has evaded automated detection and preventive controls. Instead of waiting for a security finding, security teams analyze endpoint, network, cloud, and threat intelligence data. They search for indicators of compromise, suspicious behavior, and affected assets across their environment.

Wazuh supports threat hunting by collecting and correlating security telemetry from endpoints, cloud environments, network devices, and threat intelligence sources. Wazuh provides :doc:`system inventory </user-manual/capabilities/system-inventory/index>`, :doc:`log data collection </user-manual/capabilities/log-data-collection/index>`, :doc:`log data analysis </user-manual/capabilities/log-data-collection/log-data-analysis>`, :doc:`threat intelligence </wazuh-cti/index>`, :doc:`vulnerability detection </user-manual/capabilities/vulnerability-detection/index>`, and search capabilities. Security teams can use these capabilities to investigate suspicious activity, identify affected assets, and respond to threats.

Hunting for indicators of compromise
------------------------------------

Wazuh helps security teams proactively search for indicators of compromise (IoCs), including malicious IP addresses, domains, URLs, and file hashes. Wazuh uses information from the `Wazuh Cyber Threat Intelligence (CTI) <https://cti.wazuh.com/>`__ platform and custom :doc:`key-value databases (KVDBs) </user-manual/data-analysis/key-value-databases>` to match these indicators against endpoint security events. An indicator match identifies the systems that communicated with known malicious infrastructure.

The Wazuh normalization engine :doc:`enriches events </user-manual/data-analysis/enrichment>` during processing with IoC and GeoIP context. When an event matches an indicator from Wazuh CTI, the finding includes threat details. These details include the provider, confidence level, and associated malware family. GeoIP enrichment also adds geolocation information for IP addresses when available.

Security teams can use the **Discover** section of the Wazuh dashboard to search findings and historical telemetry for matching IoCs. They can identify affected endpoints and investigate potential threats across their environment.

The finding details show IoC enrichment from Wazuh CTI, including the matched indicator, provider, confidence level, and malware family.

.. thumbnail:: /images/getting-started/use-cases/threat-hunting/ioc-enrichment-details.png
   :title: Finding details showing Wazuh CTI IoC enrichment with the matched indicator, provider, confidence, and malware family
   :alt: Finding details showing Wazuh CTI IoC enrichment with the matched indicator, provider, confidence, and malware family
   :align: center
   :width: 80%

Hunting across security telemetry and logs
------------------------------------------

Effective threat hunting depends on collecting and searching security telemetry from across the environment. Wazuh centralizes logs from monitored endpoints, network devices, applications, cloud services, and systems that send their logs to monitored endpoints. This centralization gives security teams a single place to investigate suspicious activity.

Wazuh stores security events and findings in :doc:`dedicated data streams </user-manual/wazuh-indexer/wazuh-indexer-indices>`, and the current state of endpoint inventory, vulnerabilities, and file integrity in dedicated indices. This organized storage model allows security teams to hunt across historical and current telemetry without inspecting individual endpoints.

.. thumbnail:: /images/getting-started/use-cases/threat-hunting/wazuh-data-streams.png
   :title: Wazuh index patterns for security events, inventory, vulnerability findings, and file integrity state
   :alt: Wazuh index patterns for security events, inventory, vulnerability findings, and file integrity state
   :align: center
   :width: 80%

Wazuh normalizes collected logs into the :ref:`Wazuh Common Schema (WCS) <wazuh_common_schema>`, extracting fields such as timestamps, source and destination IP addresses, usernames, processes, and event types. This consistent data model allows threat hunters to search and correlate activity across multiple data streams in the **Discover** section of the Wazuh dashboard. For the query syntax of the **Discover** and **Threat Hunting** search bars, see :ref:`Searching findings and events with DQL <wazuh_dashboard_global_queries_searching_findings_and_events_with_dql>`.

The **Discover** section of the Wazuh dashboard lets security teams search and correlate data across Wazuh security events, inventory, vulnerability, and other telemetry.

.. thumbnail:: /images/getting-started/use-cases/threat-hunting/discover-section.png
   :title: Discover section of the Wazuh dashboard searching across Wazuh data streams
   :alt: Discover section of the Wazuh dashboard searching across Wazuh data streams
   :align: center
   :width: 80%

Hunting anomalies against an inventory baseline
-----------------------------------------------

Threat hunters need visibility into what is running across their environment. They can compare endpoint inventory against an approved baseline to identify unauthorized software, unexpected services, and other anomalies that might indicate compromise.

The Wazuh agent collects endpoint inventory through the :doc:`Syscollector module </user-manual/capabilities/system-inventory/index>`, including installed software, running processes, network ports, users, groups, services, and browser extensions. The Wazuh manager synchronizes this inventory to the Wazuh indexer, which provides a queryable view of the current endpoint state.

Security teams can query the inventory from the Wazuh dashboard or the :doc:`Wazuh indexer API </user-manual/indexer-api/index>`. They can use it to find endpoints with software outside the approved baseline or unexpected listening ports. They can also find unauthorized services and user accounts that don't match provisioning records.

The **Services** tab in the :doc:`IT Hygiene </user-manual/capabilities/system-inventory/viewing-system-inventory-data>` section of the Wazuh dashboard displays the installed services on an Ubuntu endpoint.

.. thumbnail:: /images/getting-started/use-cases/threat-hunting/services-inventory.png
   :title: Services tab of the IT Hygiene section listing installed services on an Ubuntu endpoint
   :alt: Services tab of the IT Hygiene section listing installed services on an Ubuntu endpoint
   :align: center
   :width: 80%

The :doc:`Rootcheck module </user-manual/capabilities/malware-detection/rootkit-detection>` complements inventory-based hunting by detecting anomalies that don't appear in standard inventory data. It identifies processes and network ports hidden from standard operating system tools. Hunters can then investigate activity that inventory queries alone might miss.

Hunting for unauthorized file and configuration changes
-------------------------------------------------------

Wazuh :doc:`file integrity monitoring (FIM) </user-manual/capabilities/file-integrity/index>` helps security teams hunt for unauthorized changes to critical files, directories, and Windows registry keys. Attackers commonly modify these locations to establish persistence. The FIM module records file additions, modifications, deletions, permission changes, and registry changes in these locations. It monitors them in real time when you enable the ``realtime`` or ``whodata`` attribute for them. By default, it scans monitored directories every 12 hours.

Attackers often establish persistence by modifying startup locations such as the Windows Run and RunOnce registry keys, scheduled tasks, cron entries, and startup folders. They can also modify web-accessible directories to deploy web shells. By default, Wazuh monitors the Windows Run and RunOnce keys, the Windows Startup folder, and the Linux ``/etc`` directory, which holds system cron entries. You add other locations, such as web directories, to the FIM configuration. Wazuh synchronizes the current file and registry state across monitored endpoints.

Threat hunters can investigate FIM findings in two ways. They can review recent findings to identify new or modified persistence locations. The *who-data* information shows the user and process responsible for each change. They can also query the synchronized FIM state to identify persistence artifacts that currently exist across all monitored endpoints, regardless of when they were created.

The ``report_changes`` attribute records the content added or modified in monitored text files. Security teams use it to tell legitimate configuration updates from injected payloads.

The Wazuh dashboard shows FIM findings for changes to monitored files and registry keys. Each finding includes the user, process, and modified content that *who-data* and *report_changes* record.

.. thumbnail:: /images/getting-started/use-cases/threat-hunting/file-and-registry-change-findings.png
   :title: FIM findings showing the user, process, and modified content of changed files and registry keys
   :alt: FIM findings showing the user, process, and modified content of changed files and registry keys
   :align: center
   :width: 80%

Hunting adversary techniques with MITRE
---------------------------------------

The MITRE ATT&CK framework offers a standardized approach to mapping attack tactics, techniques, and procedures (TTPs). Wazuh detection content carries MITRE ATT&CK metadata, so each finding identifies the technique behind the detected behavior. Instead of starting from raw events, the hunter starts from a technique. For example, a hunt for credential abuse starts with the findings mapped to Brute Force and Valid Accounts. The hunter then examines which endpoints and accounts concentrate that activity.

Technique frequency analysis extends this approach across time. The :ref:`MITRE ATT&CK <wazuh_dashboard_navigating_the_wazuh_dashboard_mitre_att_ck>` dashboard shows which techniques appear most in your environment, and a sudden spike in one technique is a hunting lead. A rise in autostart-related findings, for instance, prompts a persistence hunt on the affected endpoints. Technique frequency analysis lets you prioritize hunts by observed attacker behavior rather than by guesswork.

.. thumbnail:: /images/getting-started/use-cases/threat-hunting/mitre-attack-technique-trends.png
   :title: Wazuh dashboard showing the most frequent MITRE ATT&CK techniques in findings
   :alt: Wazuh dashboard showing the most frequent MITRE ATT&CK techniques in findings
   :align: center
   :width: 80%

Hunting with decoders and detection rules
-----------------------------------------

Wazuh provides detection content that helps threat hunters investigate suspicious activity and identify attack techniques across collected telemetry. Its :doc:`decoders </user-manual/data-analysis/decoders>` and :doc:`detection rules </user-manual/data-analysis/rules>` process diverse log sources and provide the fields and detection logic needed to identify malicious behavior.

Decoders parse incoming logs and extract meaningful fields from different data formats. Detection rules use these fields to identify patterns associated with authentication failures, malware, suspicious system activity, and other security events. Security teams can create :doc:`custom rules and decoders </user-manual/data-analysis/detection-workflow>` to adapt detection coverage to their environment and investigate activity that predefined content does not cover.

Wazuh detection rules are :doc:`Sigma-based </user-manual/wazuh-indexer/wazuh-sigma-rules>`, providing a standardized way to define detection logic for log events. Threat hunters can use Sigma-based rules to investigate specific attack techniques without creating detection logic from scratch. Effective rules can then become part of the organization's ongoing detection coverage for continuous monitoring.

The **Rules** and **Decoders** subsections of the :ref:`Ruleset Management <wazuh_dashboard_navigating_the_wazuh_dashboard_ruleset_management>` section in the Wazuh dashboard show the detection content in your environment. The **Rules** subsection displays predefined detection rules used to identify suspicious activity.

.. thumbnail:: /images/getting-started/use-cases/threat-hunting/ruleset-management-rules.png
   :title: Rules sub-section of Ruleset Management listing the detection rules available in the environment
   :alt: Rules sub-section of Ruleset Management listing the detection rules available in the environment
   :align: center
   :width: 80%

The **Decoders** subsection displays the decoders used to parse and extract fields from different log sources.

.. thumbnail:: /images/getting-started/use-cases/threat-hunting/security-analytics-decoders.png
   :title: Decoders sub-section of Ruleset Management listing the decoders used to parse log sources
   :alt: Decoders sub-section of Ruleset Management listing the decoders used to parse log sources
   :align: center
   :width: 80%

The **Threat Hunting** section of the Wazuh dashboard shows detection findings generated from a Sigma rule applied to security events.

.. thumbnail:: /images/getting-started/use-cases/threat-hunting/sigma-rule-findings.png
   :title: Threat Hunting section showing findings generated by a Sigma rule
   :alt: Threat Hunting section showing findings generated by a Sigma rule
   :align: center
   :width: 80%
