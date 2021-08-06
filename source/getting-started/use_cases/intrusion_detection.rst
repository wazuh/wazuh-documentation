.. Copyright (C) 2021 Wazuh, Inc.

.. _intrusion_detection:

Intrusion detection
===================
Wazuh owns a highly effective set of capabilities, including :ref:`File Integrity Monitoring (FIM) <file_integrity>`, :ref:`Log Data Collection <log-data-collection>`, :ref:`Malware and Anomaly Detection <anomalies-detection>`, rootkits Detection or System Inventory to identify suspicious anomalies within files, ports, and processes.
 
Intrusion detection, also called Anomaly Detection, refers to finding unexpected patterns that vary significantly from the expected behavior of a system. Intrusion detection includes a set of increasingly relevant techniques in various industries to guarantee higher levels of security. Some of these essential anomaly detection techniques are the following:
  #. :ref:`Check unusual files and permissions <check-unusual-files-and-permissions>`
  #. :ref:`Monitor running processes <check-running-processes>`
  #. :ref:`Verify hidden ports <check-hidden-ports>`

Wazuh main components responsible for detecting anomalous behaviors within a system are Rootcheck and Syscheck. Below we will see these critical components in more detail. 

The Rootcheck and Syscheck components
Rootcheck is responsible for detecting abnormal behavior among processes, communication ports, and files. The Rootcheck engine checks if hidden processes are running or hidden ports are open. It also examines if the content of a file or Windows registry key contains a particular pattern or string.

In the case of Syscheck, it is in charge of the FIM module that monitors all the files within the selected directories during a scheduled scan. Syscheck also compares the current state of a given file with the information stored in the FIM baseline when the operating system reports that a particular file has changed.

You can take full advantage of Wazuh and strengthen the intrusion detection capabilities of your system. With Syscheck scanning for file-related anomalies and rootcheck detecting suspicious hidden processes or ports, you capitalize on both security components, making your security system even more robust.



.. toctree::

   rootkits_detection
   system_inventory
