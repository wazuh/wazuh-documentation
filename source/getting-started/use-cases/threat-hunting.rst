.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh provides multiple capabilities to aid security teams in threat hunting, empowering them to swiftly contain threats and prevent further damage. Explore this documentation section to learn more about effective threat hunting.

Threat hunting
==============

Threat hunting is a proactive approach that involves analyzing numerous data sources like logs, network traffic, and endpoint data to identify and eliminate cyber threats that have evaded traditional security measures. It aims to uncover potential threats that may have gone undetected in an IT environment. The process of threat hunting typically involves several steps: hypothesis generation, data collection, analysis, and response.

Wazuh offers several capabilities that assist security teams in hunting threats within their environment, empowering them to take rapid actions to contain the threat and prevent further damage.

Log data analysis
-----------------

Effective log data collection and analysis are essential for enhancing your threat hunting methodology. You can leverage the robust capabilities of Wazuh to optimize your threat hunting efforts. 

Wazuh as a unified XDR and SIEM platform offers centralized :doc:`log data collection </user-manual/capabilities/log-data-collection/index>`, allowing gathering of data from diverse sources such as endpoints, network devices, and applications. This centralized approach simplifies analysis and reduces the effort required to monitor multiple sources.

The image below shows the configuration settings on the Wazuh dashboard for collecting audit logs from a monitored endpoint.

.. thumbnail:: /images/getting-started/use-cases/threat-hunting/log-collection-settings.png
   :title: Log collection settings
   :alt: Log collection settings
   :align: center
   :width: 80%

Wazuh uses decoders to extract meaningful information from log data obtained from various sources. It breaks down raw log data into individual fields or attributes, such as timestamp, source IP address, destination IP address, event type, and others. The Index patterns tab on the Wazuh dashboard shows the ``wazuh-alerts-*`` index pattern and its fields.

.. thumbnail:: /images/getting-started/use-cases/threat-hunting/wazuh-alerts-index-pattern.png
   :title: wazuh-alerts-* index pattern
   :alt: wazuh-alerts-* index pattern
   :align: center
   :width: 80%

Wazuh offers :doc:`agentless monitoring </user-manual/capabilities/agentless-monitoring/index>` and :doc:`syslog log collection </user-manual/manager/alert-management/forwarding-alerts/manual-syslog-output>` for efficient log data handling. It ensures consistency and compatibility across various log formats. Wazuh indexing and querying capabilities facilitate quick search and access to specific log data, streamlining analysis and investigation. Wazuh uses its advanced parsing and real-time analysis to enhance threat hunting by proactively identifying and mitigating risks thereby enhancing security.

Wazuh archives
--------------

Wazuh provides a centralized storage location for archiving all collected logs from monitored endpoints. The Wazuh archives logs include those that do not trigger alerts on the Wazuh dashboard. Wazuh archives are disabled by default and can be easily enabled. The availability of detailed logs is crucial for effective threat hunting, providing comprehensive visibility into your environment.

:doc:`Wazuh archives </user-manual/manager/alert-management/wazuh-archives>` provide log retention, indexing, and querying capabilities that give concrete visibility to analyze events within specific monitored endpoints in your environment. This facilitates uncovering event causes, event locations, event communications, event timestamps, and related parent-child processes. The image below shows the archived logs in the **Discover** section on the Wazuh dashboard.

.. thumbnail:: /images/getting-started/use-cases/threat-hunting/discover-archives-logs.png
   :title: wazuh-archives logs in the Discover section
   :alt: wazuh-archives in the Discover section
   :align: center
   :width: 80%

MITRE ATT&CK mapping
--------------------

The MITRE ATT&CK framework offers a standardized approach to mapping and understanding cyber attack tactics, techniques, and procedures (TTPs). By utilizing the :doc:`Wazuh MITRE ATT&CK module </user-manual/ruleset/mitre>`, we can enhance our understanding of TTPs used by threat actors and proactively defend against them.

The Wazuh MITRE ATT&CK module maps TTPs to generated events, facilitating efficient threat hunting by promptly identifying patterns in attacker behavior. For instance, a suspicious login attempt can be associated with the “Credential Stuffing” technique in the MITRE ATT&CK framework. This empowers users to assess the frequency of such attacks and implement necessary measures to mitigate risks, such as enabling multi-factor authentication or rate-limiting login attempts. The **MITRE ATT&CK** module on the Wazuh dashboard allows you to view various techniques found within a monitored environment. 

.. thumbnail:: /images/getting-started/use-cases/threat-hunting/mitre.png
   :title: The MITRE ATT&CK module
   :alt: The MITRE ATT&CK module
   :align: center
   :width: 80%

This module generates reports and visualizations on the Wazuh dashboard, showcasing the frequency and severity of attacks utilizing specific TTP. These reports help track compliance with security standards and regulations while highlighting areas where security measures may require strengthening. The Wazuh **MITRE ATT&CK** module on the Wazuh dashboard has a customizable dashboard that displays an overview of TTPs found within a monitored environment as seen below.

.. thumbnail:: /images/getting-started/use-cases/threat-hunting/mitre-dashboard.png
   :title: The MITRE ATT&CK module dashboard
   :alt: The MITRE ATT&CK module dashboard
   :align: center
   :width: 80%

You can proactively protect your systems and data by leveraging insights from the MITRE ATT&CK framework. The integration of MITRE ATT&CK with Wazuh significantly enhances threat hunting and improves overall security.

Third-party integration
-----------------------

Wazuh integrates with :doc:`third-party solutions </user-manual/manager/manual-integration>` that enhance threat hunting capabilities. These integrations enable users to consolidate data from diverse sources and automate threat detection and response. Wazuh seamlessly integrates with popular open source platforms like VirusTotal, AlienVault, URLHaus, MISP, and many others. This integration allows users to cross-reference telemetry with threat intelligence feeds, improving detection and response to threats.

Third-party integrations play a crucial role in proactive threat hunting, encompassing threat intelligence and a range of collaborative tools. These integrations provide essential insights into both established and emerging threats, enabling a comprehensive and forward-looking approach to threat detection. By promoting the exchange of information among seasoned security teams, these integrations foster a collective defense strategy, enhancing the effectiveness of the overall threat hunting process.

Some third-party solutions that Wazuh integrates with to aid threat hunting are:

- **VirusTotal**: :doc:`Integrating VirusTotal </proof-of-concept-guide/detect-remove-malware-virustotal>` enhances threat detection by leveraging the VirusTotal malware database for accurate identification and faster incident response. The image below shows malware detection via the VirusTotal integration.

   .. thumbnail:: /images/getting-started/use-cases/threat-hunting/security-events.png
      :title: Malware detection via the VirusTotal integration
      :alt: Malware detection via the VirusTotal integration
      :align: center
      :width: 80%

- **URLHaus**: `Integrating URLHaus by abuse.ch <https://wazuh.com/blog/detecting-malicious-urls-using-wazuh-and-urlhaus/>`__ with Wazuh amplifies threat intelligence capabilities, empowering users to proactively detect and block malicious URLs in real-time.

- **osquery**: Wazuh provides a module for managing the osquery tool from the Wazuh agents. The osquery module allows security analysts to configure and collect information generated by the osquery. It provides an extra layer for threat hunting capabilities such as configuration management, data collection, custom alerts based on osquery query results, and SQL-like syntax queries.

- **MISP**: We can enrich Wazuh alerts by automating identifications of IOCs and integrating MISP with Wazuh.

Wazuh integrates with other tools that aid threat hunting beyond the above-mentioned. It supports third-party integrations for threat intelligence platforms, SIEMs, and messaging platforms using APIs and other integration methods.

Rules and decoders
------------------

Wazuh enhances threat hunting with robust rules, decoders, and pre-configured rules for diverse attack vectors and cyber activities.

The **Management** tab on the Wazuh dashboard presents both default and custom rules, covering a broad array of security events, including system anomalies, malware detection, authentication failures, and other potential threats as seen below.

.. thumbnail:: /images/getting-started/use-cases/threat-hunting/rules.png
   :title: Wazuh dashboard rules view
   :alt: Wazuh dashboard rules view
   :align: center
   :width: 80%

Wazuh allows you to customize and :doc:`create your own rules and decoders </user-manual/ruleset/index>`, tailored to your specific environment and threat landscape. This enables you to fine-tune detection, address unique requirements, and minimize blind spots.

Wazuh decoders play a vital role in normalizing and parsing diverse log formats and data sources. They ensure that collected information is presented in a standardized manner, facilitating effective analysis and correlation of data from various sources.

The **Management** tab on the Wazuh dashboard allows you to view default and custom **Decoders**. The image below shows details of the default decoder ``agent-upgrade``.

.. thumbnail:: /images/getting-started/use-cases/threat-hunting/decoders.png
   :title: Details of the default agent-upgrade decoder
   :alt: Details of the default agent-upgrade decoder
   :align: center
   :width: 80%

Leveraging Wazuh rules and decoders, security teams attain actionable insights, enabling them to swiftly detect IOCs, anomalous behavior, and potential breaches.

Refer to the :doc:`Wazuh ruleset documentation </user-manual/ruleset/index>` for detailed guidance on configuring custom rules and decoders.
