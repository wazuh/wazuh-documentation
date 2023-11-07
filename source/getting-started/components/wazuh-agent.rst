.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh agent is multi-platform and runs on monitored systems providing threat prevention, detection, and response capabilities.

Wazuh agent
===========

The Wazuh agent runs on Linux, Windows, macOS, Solaris, AIX, and other operating systems. It can be deployed to laptops, desktops, servers, cloud instances, containers, or virtual machines. The agent helps to protect your system by providing threat prevention, detection, and response capabilities. It is also used to collect different types of system and application data that it forwards to the :doc:`Wazuh server <wazuh-server>` through an encrypted and authenticated channel.

Agent architecture
------------------

The Wazuh agent has a modular architecture. Each component is in charge of its own tasks, including monitoring the file system, reading log messages, collecting inventory data, scanning the system configuration, and looking for malware. Users can manage agent modules via configuration settings, adapting the solution to their particular use cases.

The diagram below represents the agent architecture and components:

.. thumbnail:: /images/getting-started/agent-architecture.png 
   :title: Agent architecture
   :alt: Agent architecture
   :align: center
   :width: 80% 

.. _agents_modules: 

Agent modules
-------------

All agent modules are configurable and perform different security tasks. This modular architecture allows you to enable or disable each component according to your security needs. Below you can learn about the different purposes of all the agent modules.

-  **Log collector:** This agent component can read flat log files and Windows events, collecting operating system and application log messages. It supports XPath filters for Windows events and recognizes multi-line formats like Linux Audit logs. It can also enrich JSON events with additional metadata.

-  **Command execution:** Agents run authorized commands periodically, collecting their output and reporting it back to the Wazuh server for further analysis. You can use this module for different purposes, such as monitoring hard disk space left or getting a list of the last logged-in users.

-  **File Integrity Monitoring (FIM):** This module monitors the file system, reporting when files are created, deleted, or modified. It keeps track of changes in file attributes, permissions, ownership, and content. When an event occurs, it captures who, what, and when details in real time. Additionally, the FIM module builds and maintains a database with the state of the monitored files, allowing queries to be run remotely.

-  **Security configuration assessment (SCA):** This component provides continuous configuration assessment, utilizing out-of-the-box checks based on the Center of Internet Security (CIS) benchmarks. Users can also create their own SCA checks to monitor and enforce their security policies.

-  **System inventory:** This agent module periodically runs scans, collecting inventory data such as operating system version, network interfaces, running processes, installed applications, and a list of open ports. Scan results are stored in local SQLite databases that can be queried remotely.

-  **Malware detection:** Using a non-signature-based approach, this component is capable of detecting anomalies and the possible presence of rootkits. Also, it looks for hidden processes, hidden files, and hidden ports while monitoring system calls. 

-  **Active response:** This module runs automatic actions when threats are detected, triggering responses to block a network connection, stop a running process, or delete a malicious file. Users can also create custom responses when necessary and customize, for example, responses for running a binary in a sandbox, capturing network traffic, and scanning a file with an antivirus.

-  **Container security monitoring:** This agent module is integrated with the Docker Engine API to monitor changes in a containerized environment. For example, it detects changes to container images, network configuration, or data volumes. Besides, it alerts about containers running in privileged mode and about users executing commands in a running container.

-  **Cloud security monitoring:** This component monitors cloud providers such as Amazon AWS, Microsoft Azure, or Google GCP. It natively communicates with their APIs. It is capable of detecting changes to the cloud infrastructure (e.g., a new user is created, a security group is modified, a cloud instance is stopped, etc.) and collecting cloud services log data (e.g., AWS Cloudtrail, AWS Macie, AWS GuardDuty, Azure Active Directory, etc.)

Communication with Wazuh server
-------------------------------

The Wazuh agent communicates with the :doc:`Wazuh server <wazuh-server>` to ship collected data and security-related events. Besides, the agent sends operational data, reporting its configuration and status. Once connected, the agent can be upgraded, monitored, and configured remotely from the Wazuh server.

The communication of the agent with the server takes place through a secure channel (TCP or UDP), providing data encryption and compression in real time. Additionally, it includes flow control mechanisms to avoid flooding, queueing events when necessary, and protecting the network bandwidth.

You need to enroll the agent before connecting it to the server for the first time. This process provides the agent with a unique key used for authentication and data encryption. 
