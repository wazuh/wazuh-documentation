.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh agent runs on Linux, Windows, and macOS endpoints. It collects system and application data, sends it to the Wazuh manager, and provides threat prevention, detection, and response capabilities.

Wazuh agent
===========

The Wazuh agent runs on Linux, Windows, and macOS. You can deploy it on laptops, desktops, servers, cloud instances, containers, and virtual machines.

The Wazuh agent collects system and application data and sends it to the :doc:`Wazuh manager <wazuh-manager>` through an encrypted and authenticated channel. It also provides threat prevention, detection, and response capabilities on monitored endpoints.

Wazuh agent architecture
------------------------

The Wazuh agent has a modular architecture. Each module is in charge of its own tasks, including monitoring the file system, reading log files, collecting inventory data, scanning the system configuration, and looking for malware. You can manage Wazuh agent modules through configuration settings, adapting the solution to your specific use cases.

The diagram below shows the Wazuh agent architecture and modules.

.. thumbnail:: /images/getting-started/agent-architecture.png
   :title: Agent architecture
   :alt: Agent architecture
   :align: center
   :width: 80%

.. _agents_modules:

Wazuh agent modules
-------------------

All agent modules are configurable and perform different security tasks. This modular architecture allows you to configure each module according to your security needs. The following list summarizes the purposes of the Wazuh agent modules.

-  **Log collector:** Reads flat log files and Windows events, collecting operating system and application log messages. It supports XPath filters for Windows events and recognizes multi-line formats such as Linux Audit logs.

-  **Command execution:** Runs authorized commands periodically, collecting their output and reporting it to the Wazuh manager. You can use this module for different purposes, such as monitoring available disk space or getting a list of recently logged-in users.

-  **File integrity monitoring (FIM):** Monitors the file system, reporting when files are created, deleted, or modified. It keeps track of changes in file attributes, permissions, ownership, and content. When an event occurs, it captures who, what, and when details in real time.

-  **Security configuration assessment (SCA):** Provides continuous configuration assessment, using out-of-the-box checks based on the Center for Internet Security (CIS) benchmarks. You can also create custom SCA checks to monitor and enforce your security policies.

-  **System inventory:** Periodically runs scans to collect inventory data such as the operating system version, network interfaces, running processes, installed applications, and open ports. The Wazuh agent stores the inventory locally to detect changes and synchronizes it with the Wazuh manager, which keeps the inventory state in the Wazuh indexer.

-  **Malware detection:** Uses a non-signature-based approach to detect anomalies and the possible presence of rootkits. It also looks for hidden processes, hidden files, and hidden ports while monitoring system calls.

-  **Active Response:** Retrieves response tasks from the Wazuh manager and runs the corresponding action, such as blocking a network connection, stopping a running process, or deleting a malicious file. You can also create custom responses, for example, running a binary in a sandbox, capturing network traffic, or scanning a file with an antivirus.

-  **Container security monitoring:** Integrates with the Docker Engine API to monitor changes in a containerized environment. For example, it detects changes to container images, network configuration, or data volumes. It reports containers running in privileged mode and users executing commands in a running container.

-  **Cloud security monitoring:** Monitors cloud providers such as Amazon Web Services, Microsoft Azure, and Google Cloud, communicating natively with their APIs. It detects changes to the cloud infrastructure, for example, when a new user is created, a security group is modified, or a cloud instance is stopped. It also collects cloud service log data such as AWS CloudTrail, Google Cloud Pub/Sub, and Microsoft Entra ID audit logs.

Communication with the Wazuh manager
------------------------------------

The Wazuh agent communicates with the :doc:`Wazuh manager <wazuh-manager>` to send collected data and security events. It also sends operational data, including its configuration and status. The Wazuh agent retrieves pending tasks from the Wazuh manager through the same channel, including upgrades, configuration changes, and active response commands.

The Wazuh agent communicates with the Wazuh manager through the HTTPS agent API on port 1517. TLS encrypts the communication, and the Wazuh agent authenticates requests using a signed bearer token. The Wazuh agent sends events in batches and queues them locally when the Wazuh manager is unreachable. Local queuing helps prevent event loss during temporary connection failures and reduces repeated connection attempts.

Wazuh 4.x agents use the legacy AES-encrypted TCP or UDP channel on port 1514. The ``remote`` section controls this legacy communication.

Install and enroll the Wazuh agent before its first connection to the Wazuh manager. Enrollment provides the Wazuh agent with a unique authentication key. The Wazuh agent uses this key to generate the bearer tokens that authenticate its requests.
