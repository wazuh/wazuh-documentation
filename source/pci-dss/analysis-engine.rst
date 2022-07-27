.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh analysis engine analyzes the log data received from agents. Learn more about it in this section.
  
.. _analysis_engine:

Analysis engine
===============

Log data received from devices, systems, and applications typically contain useful information that can give insight into the security and general state of the originating device, application, or system. The Wazuh analysis engine analyzes the log data received from agents. It performs decoding and rule matching on the data to process it and uses threat intelligence to look for indicators of compromise. 

The analysis engine can help meet the following PCI DSS requirement:

- **Requirement 10 - Log and Monitor All Access to System Components and Cardholder Data**: This control requires that user activities, including those by employees, contractors, consultants, and internal and external vendors, and other third parties are logged and monitored, and the log data stored for a specified period of time. Requirement 10.4 (Audit logs are reviewed to identify anomalies or suspicious activity) additionally specifies that audit logs are reviewed to identify anomalies or suspicious activity. These reviews can be automated by harvesting, parsing and alerting tools.
  
To help meet this requirement, Wazuh analysis engine collects logs from various sources and decodes it to extract relevant information from its fields. After that, the extracted information is compared to the ruleset to look for matches. Where the extracted information matches a rule, an alert is generated. More details on the Wazuh ruleset can be found in the documentation :doc:`here </user-manual/ruleset/index>`.


Use cases
---------

PCI DSS 10.4.1 requires that the following audit logs are reviewed at least once daily:

- All security events.
- Logs of all system components that store, process, or transmit cardholder data (CHD) and/or sensitive authentication data (SAD).
- Logs of all critical system components.
- Logs of all servers and system components that perform security functions (for example, network security controls, intrusion-detection systems/intrusion-prevention systems (IDS/IPS), authentication servers).

This requirement ensures that logs are analyzed for indicators of compromise at least once daily. The following are some Wazuh rules that may help in achieving this requirement:

- Rule 61138: New Windows Service Created. This rule generates an alert after the system logs from a Windows endpoint have been analyzed by the analysis engine and it has been determined that a new service was created.

.. thumbnail:: ../images/pci/new-windows-service-created.png
    :title: New Windows Service Created
    :align: center
    :width: 100%

- Rule 31168: Shellshock attack detected. This rule will generate an alert when logs indicating a shellshock attack from a WAF or web application are analyzed by the analysis engine.

.. thumbnail:: ../images/pci/shellshock-attack-detected.png
    :title: Shellshock attack detected
    :align: center
    :width: 100%

