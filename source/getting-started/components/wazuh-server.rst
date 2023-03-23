.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh server is a key component of our solution. It analyzes the data received from the agents and triggers alerts when threats are detected.

Wazuh server
============

The Wazuh server component analyzes the data received from the :doc:`agents <wazuh-agent>`, triggering alerts when threats or anomalies are detected. It is also used to manage the agents configuration remotely and monitor their status.

The Wazuh server uses threat intelligence sources to improve its detection capabilities. It also enriches alert data by using the `MITRE ATT&CK <https://attack.mitre.org//>`_ framework and regulatory compliance requirements such as PCI DSS, GDPR, HIPAA, CIS, and NIST 800-53, providing helpful context for security analytics.

Additionally, the Wazuh server can be integrated with external software, including ticketing systems such as `ServiceNow <https://www.servicenow.com/>`_, `Jira <https://www.atlassian.com/software/jira>`_, and `PagerDuty <https://www.pagerduty.com/>`_, as well as instant messaging platforms like `Slack <https://slack.com//>`_. These integrations are convenient for streamlining security operations.

Server architecture
-------------------

The Wazuh server runs the analysis engine, the Wazuh RESTful API, the agent enrollment service, the agent connection service, the Wazuh cluster daemon, and Filebeat. The server is installed on a Linux operating system and usually runs on a stand-alone physical machine, virtual machine, docker container, or cloud instance.

The diagram below represents the server architecture and components:

.. thumbnail:: /images/getting-started/wazuh-server-architecture.png
   :title: Wazuh server architecture
   :alt: Wazuh server architecture
   :align: center
   :width: 80%

Server components
-----------------

The Wazuh server comprises several components listed below that have different functions, such as enrolling new agents, validating each agent identity, and encrypting the communications between the Wazuh agent and the Wazuh server.

-  **Agent enrollment service:** It is used to enroll new agents. This service provides and distributes unique authentication keys to each agent. The process runs as a network service and supports authentication via TLS/SSL certificates or by providing a fixed password.

-  **Agent connection service:** This service receives data from the agents. It uses the keys shared by the enrollment service to validate each agent identity and encrypt the communications between the Wazuh agent and the Wazuh server. Additionally, this service provides centralized configuration management, enabling you to push new agent settings remotely.

-  **Analysis engine:** This is the server component that performs the data analysis. It uses decoders to identify the type of information being processed (Windows events, SSH logs, web server logs, and others). These decoders also extract relevant data elements from the log messages, such as source IP address, event ID, or username. Then, by using rules, the engine identifies specific patterns in the decoded events that could trigger alerts and possibly even call for automated countermeasures (e.g., banning an IP address, stopping a running process, or removing a malware artifact).

-  **Wazuh RESTful API:** This service provides an interface to interact with the Wazuh infrastructure. It is used to manage configuration settings of agents and servers, monitor the infrastructure status and overall health, manage and edit Wazuh decoders and rules, and query about the state of the monitored endpoints. The Wazuh dashboard also uses it.

-  **Wazuh cluster daemon:** This service is used to scale Wazuh servers horizontally, deploying them as a cluster. This kind of configuration, combined with a network load balancer, provides high availability and load balancing. The Wazuh cluster daemon is what Wazuh servers use to communicate with each other and to keep synchronized.

-  **Filebeat:** It is used to send events and alerts to the Wazuh indexer. It reads the output of the Wazuh analysis engine and ships events in real time. It also provides load balancing when connected to a multi-node Wazuh indexer cluster.
