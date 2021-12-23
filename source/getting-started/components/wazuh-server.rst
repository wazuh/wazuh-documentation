.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: The Wazuh server is a key component of our solution. It analyzes the data received from the agents and triggers alerts when threats are detected.

.. _wazuh_server:

Wazuh server
============

The Wazuh server component is in charge of analyzing the data received from the :ref:`agents <wazuh_agent>`, triggering alerts when threats or anomalies are detected. It is also used to manage the agents configuration remotely and to monitor their status.

The Wazuh server uses threat intelligence sources to improve its detection capabilities. It also enriches alert data by making use of the `MITRE ATT&CK <https://attack.mitre.org//>`_ framework and regulatory compliance requirements such as PCI DSS, GDPR, HIPAA, CIS, and NIST 800-53, providing useful context for threat detection.

Additionally, the Wazuh server can be integrated with external software, including ticketing systems such as `ServiceNow <https://www.servicenow.com/>`_, `Jira <https://www.atlassian.com/software/jira>`_, and `PagerDuty <https://www.pagerduty.com/>`_ as well as instant messaging platforms like `Slack <https://slack.com//>`_. This is convenient for streamlining security operations.

Server architecture
-------------------

The Wazuh server runs the analysis engine, the Wazuh RESTful API, the agents registration service, the agents connection service, the Wazuh cluster daemon, and Filebeat. The server is installed on a Linux operating system and usually runs on a stand-alone physical machine, virtual machine, docker container, or cloud instance. 

The diagram below represents the server architecture and components:

.. thumbnail:: ../../images/getting_started/architecture_server.png
   :alt: Wazuh server architecture
   :align: center
   :wrap_image: No


Server components
^^^^^^^^^^^^^^^^^

- **Agents registration service:** It is used to register new agents by provisioning and distributing pre-shared authentication keys that are unique to each agent. This process runs as a network service and supports authentication via TLS/SSL certificates or by providing a fixed password.

- **Agents connection service:** This is the service that receives data from the agents. It makes use of the pre-shared keys to validate each agent's identity and to encrypt the communications between the agent and the Wazuh server. Additionally, this service is used to provide centralized configuration management, enabling you to push new agent settings remotely.

- **Analysis engine:** This is the server component that performs the data analysis. It employs *decoders* to identify the type of information being processed (Windows events, SSHD logs, web server logs, and others). These decoders also extract relevant data elements from the log messages such as source IP address, event ID, or username. Then, by using *rules*, the engine identifies specific patterns in the decoded events that could trigger alerts and possibly even call for automated countermeasures, like banning an IP on the firewall, for example.

- **Wazuh RESTful API:** This service provides an interface to interact with the Wazuh infrastructure. It is used to manage configuration settings of agents and servers, to monitor the infrastructure status and overall health, to manage and edit Wazuh decoders and rules, and to query about the state of the monitored endpoints. It is also used by the Wazuh dashboard.

- **Wazuh cluster daemon:** This service is used to scale Wazuh servers horizontally, deploying them as a cluster. This kind of configuration, in combination with a network load balancer, provides high availability and load balancing. The Wazuh cluster daemon is what Wazuh servers use to communicate with each other and to keep synchronized.

- **Filebeat:** It is used to send events and alerts to Wazuh indexer. It reads the output of the Wazuh analysis engine and ships events in real time. It also provides load balancing when connected to a multi-node Wazuh indexer cluster.
