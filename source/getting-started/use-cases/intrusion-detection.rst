.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about the rootkit component of Wazuh. The Wazuh agent periodically scans the monitored system to detect rootkits both at the kernel and the user space level.  

  
 
.. _intrusion_detection:


Intrusion detection
===================

Wazuh owns a highly effective array of tools to perform intrusion detection within users’ systems. This set of tools includes :ref:`File Integrity Monitoring (FIM) <file_integrity>`, :ref:`Log data analysis <log_analysis>`, :ref:`rootkits detection <rootkits_detection>`, and :ref:`system inventory <system_inventory>` which are useful to identify suspicious anomalies within files, processes, and ports.

Intrusion detection is sometimes called anomaly detection and refers to finding unexpected patterns that differ from the expected behavior of a system. Within intrusion detection, users can find a set of relevant techniques to guarantee higher levels of security. 

Some of these essential anomaly detection techniques are the following:

- Scanning files created, deleted, or modified in the monitored directories
- Log collection, log analysis, and alert creation
- Checking unusual files and permissions
- Monitoring running processes
- Verifying hidden ports



The Rootcheck and Syscheck components
-------------------------------------

Rootcheck and Syscheck are the Wazuh main components responsible for detecting malware and anomalous behaviors. 

:ref:`Rootcheck <reference_ossec_rootcheck>` detects abnormal behavior among files, processes, and ports. The Rootcheck engine checks hidden processes and ports. It also scans the content of files or registry keys, looking for particular patterns or strings.

:ref:`Syscheck <reference_ossec_syscheck>` is responsible for the FIM module that watches the files within the monitored directories during a scheduled scan. Syscheck also compares the actual state of the file with the information stored in the FIM baseline when the operating system reports that a particular file has changed.

Users can strengthen their system's intrusion detection capacities by using Syscheck to scan for file-related anomalies and Rootcheck to detect suspicious hidden processes or ports. 

.. _rootkits_detection:

Rootkits detection
------------------

The :ref:`Wazuh agent <wazuh_agent>` periodically scans the monitored system to detect rootkits both at the kernel and the user space level. This kind of malware usually replaces or changes the components of the existing operating system to alter the system's behavior. Rootkits can hide other processes, files, and network connections.

Wazuh uses different detection mechanisms to search for system anomalies or well-known intrusions. The *Rootcheck* component does this periodically:

+-------------------------------+---------------------------------+---------+-------------+
| Action                        | Detection mechanism             | Binary  | System call |
+===============================+=================================+=========+=============+
| Detection of hidden processes | Comparing output of system      | ps      | setsid      |
+                               +                                 +         +-------------+
|                               | binaries and system calls       |         | getpgid     |
+                               +                                 +         +-------------+
|                               |                                 |         | kill        |
+-------------------------------+---------------------------------+---------+-------------+
| Detection of hidden files     | Comparing output of system      | ls      | stat        |
+                               +                                 +         +-------------+
|                               | binaries and system calls       |         | opendir     |
+                               +                                 +         +-------------+
|                               |                                 |         | readdir     |
+                               +---------------------------------+---------+-------------+
|                               | Scanning /dev                   | ls      | opendir     |
+-------------------------------+---------------------------------+---------+-------------+
| Detection of hidden ports     | Comparing output of system      | netstat | bind        |
+                               +                                 +         +             +
|                               | binaries and system calls       |         |             |
+-------------------------------+---------------------------------+---------+-------------+
| Detection of known rootkits   | Using a malicious file database | \-      | stat        |
+                               +                                 +         +-------------+
|                               |                                 |         | fopen       |
+                               +                                 +         +-------------+
|                               |                                 |         | opendir     |
+                               +---------------------------------+---------+-------------+
|                               | Inspecting files content using  | \-      | fopen       |
+                               +                                 +         +             +
|                               | signatures                      |         |             |
+                               +---------------------------------+---------+-------------+
|                               | Detecting file permission and   | \-      | stat        |
+                               +                                 +         +             +
|                               | ownership anomalies             |         |             |
+-------------------------------+---------------------------------+---------+-------------+

Expand the output to see an example of an alert generated when a hidden process is found. In this case, the affected system is running a Linux kernel-level rootkit (named Diamorphine):

.. code-block:: json
  :emphasize-lines: 10,12
  :class: output accordion-output

  {
    "agent": {
        "id": "1030",
        "ip": "10.0.0.59",
        "name": "diamorphine-POC"
    },
    "decoder": {
        "name": "rootcheck"
    },
    "full_log": "Process '562' hidden from /proc. Possible kernel level rootkit.",
    "rule": {
        "description": "Host-based anomaly detection event (rootcheck).",
        "id": "510",
        "level": 7
    },
    "timestamp": "2020-07-12T18:07:00-0800"
  }

More information on how Wazuh detects rootkits can be found in the :ref:`user manual <manual_anomaly_detection>`.



.. _system_inventory:

System inventory
----------------

The :ref:`Wazuh agent <wazuh_agent>` system inventory module collects hardware and software information from the monitored system. This tool helps to identify assets and evaluate the efficacy of patch management.

The collected inventory data, for each of the monitored endpoints, can be queried via the Wazuh RESTful API and from the web user interface. This includes memory usage, disk space, CPU specs, network interfaces, open ports, running processes, and a list of installed applications.

In order to gather the data, the Wazuh agent runs periodic scans (the time interval is configurable). Once a scan is completed, the agent compares the new inventory data with the old one from the previous scan. This way the agent identifies system events, for example when a new port has been opened, a process has been stopped, or a new application has been installed.

Example of hardware inventory, network interfaces, open ports, and network settings:

.. thumbnail:: /images/getting-started/use-case-inventory-1.png
    :align: center
    :wrap_image: No

.. thumbnail:: /images/getting-started/use-case-inventory-2.png
    :align: center
    :wrap_image: No

Example of software inventory:

.. thumbnail:: /images/getting-started/use-case-inventory-3.png
    :align: center
    :wrap_image: No

Example of running processes:

.. thumbnail:: /images/getting-started/use-case-inventory-4.png
    :align: center
    :wrap_image: No

More information about the Wazuh system inventory module can be found in the :ref:`user manual <syscollector>`.
