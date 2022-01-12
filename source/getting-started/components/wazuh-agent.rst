.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: The Wazuh agent is one of the components of our solution. Learn about its architecture, modules, and how it communicates with the Wazuh manager.

.. _wazuh_agent:

Wazuh agent
===========

The Wazuh agent runs on Linux, Windows, macOS, Solaris, AIX, and other operating systems. It can be deployed to laptops, desktops, servers, cloud instances, containers, or virtual machines. It provides threats prevention, detection, and response capabilities. It is also used to collect different types of system and application data, that it forwards to the :ref:`Wazuh server <wazuh_server>` through an encrypted and authenticated channel.

Agent architecture
------------------

The Wazuh agent has a modular architecture, where different components take care of their own tasks: monitoring the file system, reading log messages, collecting inventory data, scanning system configuration, looking for malware, etc. Users can enable or disable agent modules via configuration settings, adapting the solution to their particular use cases.

The diagram below represents the agent architecture and components:

.. thumbnail:: ../../images/getting_started/architecture_agent.png
   :alt: Wazuh agent architecture
   :align: center
   :wrap_image: No


.. _agents_modules: 

Agent modules
-------------

All agent modules have different purposes and settings. Here is a brief description of what they do:

- **Log collector:** This agent component can read flat log files and Windows events, collecting operating system and application log messages. It does support XPath filters for Windows events and recognizes multi-line formats (e.g. Linux Audit logs). It can also enrich JSON events with additional metadata.

- **Command execution:** Agents can run authorized commands periodically, collecting their output and reporting it back to the Wazuh server for further analysis. This module can be used to meet different purposes (e.g. monitoring hard disk space left, getting a list of last logged in users, etc.).

- **File integrity monitoring (FIM):** This module monitors the file system, reporting when files are created, deleted, or modified. It keeps track of file attributes, permissions, ownership, and content. When an event occurs, it captures *who*, *what*, and *when* details in real time. Additionally, this module builds and maintains a database with the state of the monitored files, allowing queries to be run remotely.

- **Security configuration assessment (SCA):** This component provides continuous configuration assessment, utilizing out-of-the-box checks based on the Center of Internet Security (CIS) benchmarks. Users can also create their own SCA checks to monitor and enforce their security policies.

- **System inventory:** This agent module periodically runs scans, collecting inventory data such as operating system version, network interfaces, running processes, installed applications, and a list of open ports. Scan results are stored into local SQLite databases that can be queried remotely.

- **Malware detection:** Using a non-signature based approach, this component is capable of detecting anomalies and possible presence of rootkits. Monitoring system calls, it looks for hidden processes, hidden files, and hidden ports. 

- **Active response:** This module runs automatic actions when threats are detected. Among other things, it can block a network connection, stop a running process, or delete a malicious file. Custom responses can also be created by users when necessary (e.g. run a binary in a sandbox, capture a network connection traffic, scan a file with an antivirus, etc.).

- **Containers security monitoring:** This agent module is integrated with the Docker Engine API in order to monitor changes in a containerized environment. For example, it detects changes to container images, network configuration, or data volumes. Besides, it alerts on containers running in privileged mode and on users executing commands in a running container.

- **Cloud security monitoring:** This component monitors cloud providers such as Amazon AWS, Microsoft Azure, or Google GCP. It natively communicates with their APIs. It is capable of detecting changes to the cloud infrastructure (e.g. a new user is created, a security group is modified, a cloud instance is stopped, etc.), and collecting cloud services log data (e.g. AWS Cloudtrail, AWS Macie, AWS GuardDuty, Azure Active Directory, etc.)

Communication with Wazuh server
-------------------------------

The Wazuh agent communicates with the :ref:`Wazuh server <wazuh_server>` in order to ship collected data and security-related events. Besides, the agent sends operational data, reporting its configuration and status. Once connected, the agent can be upgraded, monitored, and configured remotely from the Wazuh server.

The Wazuh agent communication with the server takes place through a secure channel (TCP or UDP), providing data encryption and compression in real time. Additionally, it includes flow control mechanisms to avoid flooding, queueing events when necessary and protecting the network bandwidth.

The registration of the Wazuh agent is necessary prior to connecting it to the server for the first time. This process provisions the agent with a unique pre-shared key that is used for authentication and data encryption. 
