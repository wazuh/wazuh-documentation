.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Wazuh helps enterprises and smaller organizations to perform Security Analytics using a complete set of data analysis tools. 


.. _security_analytics:

Security analytics
==================

Wazuh delivers a set of strong security analytics tools that include file integrity monitoring (FIM), rule-based analysis of log events, and anomaly detection, among others. Wazuh analyzes thread events and improves the detection of attacks in real-time by deploying a complete set of security analytics tools.

Users can perform complex security actions such as file modifications and registry keys detection, Illicit activity identification, or anomaly and malware detection. Wazuh generates alerts and events, fetching data from the endpoints where the agents are installed. Its agent modular architecture allows Wazuh to collect security data from different components.

**File integrity monitoring (FIM)** reports when files are created, deleted, or modified in the monitored directories. 

**Log collector** reads flat log files, collecting operating system and application log messages.

**Malware detection** looks for hidden processes, files, and ports to detect anomalies and the possible presence of rootkits. 

**Command execution** can be used to achieve different purposes such as monitoring hard disk space left, getting a list of last logged-in users, etc.

**System inventory** systematically runs scans, collecting inventory data including network interfaces, operating system version, installed applications, running processes, and a list of open ports. 

**Security configuration assessment (SCA)** provides configuration assessment based on the Center of Internet Security (CIS) benchmarks.

**Active response** runs automatic actions when threats are detected, and it can block a network connection, stop a running process, or delete a malicious file. 
 
**Container security monitoring** watches for changes in a containerized environment and is integrated with the Docker Engine API. 

**Cloud security monitoring** collects log data within cloud providers such as AWS, Microsoft Azure, or Google Cloud. 


