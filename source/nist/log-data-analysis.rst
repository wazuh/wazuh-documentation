.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The log data analysis module collects and analyzes logs from applications, systems, network devices, and cloud workloads. Learn more about it in this section.

Log data analysis
=================

The Wazuh log data analysis module collects and analyzes logs from various sources, such as applications, systems, network devices, and cloud workloads. This data helps in resource monitoring, threat detection, and automated response. 

The Wazuh :doc:`Log data analysis </user-manual/capabilities/log-data-collection/index>` module helps comply with the following NIST 800-53 controls:

- **IA-4 Identifier management**: *“Common device identifiers include Media Access Control (MAC) addresses, Internet Protocol (IP) addresses, or device-unique token identifiers. The management of individual identifiers is not applicable to shared system accounts. Typically, individual identifiers are the usernames of the system accounts assigned to those individuals. In such instances, the account management activities of AC-2 use account names provided by IA-4. Identifier management also addresses individual identifiers not necessarily associated with system accounts. Preventing the reuse of identifiers implies preventing the assignment of previously used individual, group, role, service, or device identifiers to different individuals, groups, roles, services, or devices.”*

- **SI-4 System monitoring**: *“System monitoring includes external and internal monitoring. External monitoring includes the observation of events occurring at external interfaces to the system. Internal monitoring includes the observation of events occurring within the system. Organizations monitor systems by observing audit activities in real-time or by observing other system aspects such as access patterns, characteristics of access, and other actions. The monitoring objectives guide and inform the determination of the events. System monitoring capabilities are achieved through a variety of tools and techniques, including intrusion detection and prevention systems, malicious code protection software, scanning tools, audit record monitoring software, and network monitoring software.”*

The above NIST 800-53 controls require you to monitor system activities in your organization. Analysis of these activities helps you keep track of security incidents and occurrences within your infrastructure. The Wazuh log data analysis module analyzes logs and generates alerts when it detects suspicious activities. 

Use case: Failed authentication attempts on a Windows endpoint 
--------------------------------------------------------------

This use case shows how Wazuh helps meet the **IA-4 Identifier management** requirement by using the IP address label as an example identifier. In this scenario, Wazuh detects failed login attempts on a monitored Windows 10 endpoint. 

#. Enable RDP on the Windows 10 endpoint. Select **Start > Settings > System > Remote Desktop**, and turn on **Enable Remote Desktop**. Please note that some Windows versions might not support **Remote Desktop**.

#. Open the Remote Desktop Connection application from another Windows endpoint on the same network. Perform five failed login attempts against the monitored Windows endpoint. .

   .. thumbnail:: /images/nist/open-remote-desktop.png    
      :title: Open the Remote Desktop
      :alt: Open the Remote Desktop
      :align: center
      :width: 80%


#. Expand one of the rule ID ``60204`` alerts on the Wazuh dashboard. This allows finding more information about the multiple logon failure event. For example, target username, device identifiers such as source IP address, and the NIST 800-53 control the event is related to. 
 
   .. thumbnail:: /images/nist/expand-alert.png    
      :title: Expand an alert on the Wazuh dashboard
      :alt: Expand an alert on the Wazuh dashboard
      :align: center
      :width: 80%