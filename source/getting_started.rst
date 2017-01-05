.. _getting_started:

Getting started guide
=====================

Wazuh is an Open Source project for security visibility, compliance and infrastructure monitoring. It can be used to monitor both your hosts and endpoints, providing the following main capabilities:

- Log management and analysis
- File integrity monitoring 
- Intrusion and anomalies detection
- Policy and compliance monitoring

Wazuh relies on a multi-platform agent used to scan the monitored host looking for anomalies, indicators of compromise or applications that have not been hardened correctly (or are known to be vulnerable). The agent is also used to collect log messages, file hashes and other useful system information (e.g. applications installed, open ports, running processes).
  
Agents collected data is forwarded to a central manager, through a secure and authenticated channel, where it is analyzed and processed, resulting in security alerts. 

.. topic:: Documentation structure

   This document will help you understand Wazuh components, functionality, architecture and use cases.

.. toctree::
   :maxdepth: 2

   getting_started/components
   getting_started/architecture
   getting_started/use_cases
