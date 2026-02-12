.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh agent is multi-platform and runs on monitored systems providing threat prevention, detection, and response capabilities.

Wazuh agent
===========

The Wazuh agent runs on Linux, Windows, and macOS operating systems. It can be deployed to laptops, desktops, servers, cloud instances, containers, or virtual machines. The Wazuh agent helps to protect your system by providing threat prevention, detection, and response capabilities. It is also used to collect different types of system and application data that it forwards to the :doc:`Wazuh server <wazuh-server>` through an encrypted and authenticated channel.

Agent architecture
------------------

The Wazuh agent has a modular architecture. Each module is in charge of its own tasks, including monitoring the file system, reading log files, collecting inventory data, scanning the system configuration, and looking for malware. Users can manage agent modules through configuration settings, adapting the solution to their specific use cases.

The diagram below shows the agent architecture and modules.

.. thumbnail:: /images/getting-started/agent-architecture.png
   :title: Agent architecture
   :alt: Agent architecture
   :align: center
   :width: 80%

.. _agents_modules:

Wazuh agent modules
-------------------

All agent modules are configurable and perform different security tasks. This modular architecture allows you to configure each module according to your security needs. The following list summarizes the purposes of the Wazuh agent modules.

-  **Log collector:** Reads flat log files and Windows events, collecting operating system and application log messages. It supports XPath filters for Windows events and recognizes multi-line formats like Linux Audit logs. It can also enrich JSON events with additional metadata.

-  **Command execution:** Runs authorized commands periodically, collecting their output and reporting it back to the Wazuh server for further analysis. You can use this module for different purposes, such as monitoring available disk space or getting a list of recently logged-in users.

-  **File integrity monitoring (FIM):** Monitors the file system, reporting when files are created, deleted, or modified. It keeps track of changes in file attributes, permissions, ownership, and content. When an event occurs, it captures who, what, and when details in real time.

-  **Security configuration assessment (SCA):** Provides continuous configuration assessment, utilizing out-of-the-box checks based on the Center of Internet Security (CIS) benchmarks. Users can also create their own SCA checks to monitor and enforce their security policies.

-  **System inventory:** Periodically runs scans to collect inventory data such as operating system version, network interfaces, running processes, installed applications, and a list of open ports. Scan results are stored in local SQLite databases that can be queried remotely.

-  **Malware detection:** Uses a non-signature-based approach to detect anomalies and the possible presence of rootkits. It also looks for hidden processes, hidden files, and hidden ports while monitoring system calls.

-  **Active Response:** Runs automatic actions when threats are detected, triggering responses to block a network connection, stop a running process, or delete a malicious file. Users can also create custom responses when required, for example, responses for running a binary in a sandbox, capturing network traffic, and scanning a file with an antivirus.

-  **Container security monitoring:** Integrates with the Docker Engine API to monitor changes in a containerized environment. For example, it detects changes to container images, network configuration, or data volumes. It alerts about containers running in privileged mode and about users executing commands in a running container.

-  **Cloud security monitoring:** Monitors cloud providers such as Amazon Web Services, Microsoft Azure, or Google GCP, communicating natively with their APIs. It detects changes to the cloud infrastructure, for example, when a new user is created, a security group is modified, or a cloud instance is stopped. Additionally, it collects cloud services log data such as AWS CloudTrail, GCP Pub/Sub, and Azure Active Directory.

Communication with Wazuh server
-------------------------------

The Wazuh agent communicates with the :doc:`Wazuh server <wazuh-server>` to ship collected data and security-related events. The Wazuh agent also sends operational data, reporting its configuration and status. Once connected, the agent can be upgraded, monitored, and configured remotely from the Wazuh server.

The communication between the Wazuh agent and the Wazuh server takes place through a secure channel (TCP or UDP), providing data encryption and compression in real time. Additionally, it includes flow control mechanisms to avoid flooding, queueing events when necessary, and protecting the network bandwidth.

You need to enroll the Wazuh agent before connecting it to the Wazuh server for the first time. This process provides the agent with a unique key used for authentication and data encryption.
