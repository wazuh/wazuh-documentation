.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
   :description: Wazuh intrusion detection, also called anomaly detection, refers to finding unexpected patterns that differ from the expected behavior of a system.  
  
 
.. _intrusion_detection:


Intrusion detection
===================

Wazuh owns a highly effective group of tools to perform intrusion detection within user's systems. These set of capabilities include :ref:`File Integrity monitoring (FIM) <file_integrity>`, :ref:`Log data analysis <log_analysis>`, :ref:`Rootkits detection <rootkits_detection>`, and :ref:`System inventory <system_inventory>`. Which are useful to identify suspicious anomalies within files, processes, and ports.

Intrusion detection is sometimes called anomaly detection and refers to finding unexpected patterns that differ from the expected behavior of a system. Within intrusion detection, users can find a set of relevant techniques to guarantee higher levels of security. 

Some of these essential anomaly detection techniques are the following:

- Scan files created, deleted, or modified in the monitored directories
- Log collection, log analysis, and alert creation
- Check unusual files and permissions
- Monitor running processes
- Verify hidden ports


The Rootcheck and Syscheck components
-------------------------------------

Rootcheck and Syscheck are the Wazuh main components responsible for detecting malware and anomalous behaviors. 

:ref:`Rootcheck <reference_ossec_rootcheck>` detects abnormal behavior among files, processes, and ports. The Rootcheck engine checks hidden processes and ports. It also scans the content of files or registry keys looking for particular patterns or strings.

:ref:`Syscheck <reference_ossec_syscheck>` is responsible for the FIM module that watches the files within the monitored directories during a scheduled scan. Syscheck also compares the actual state of the file with the information stored in the FIM baseline when the operating system reports that a particular file has changed.

Users can strengthen their systems intrusion detection capabilities by using Syscheck to scan for file-related anomalies and Rootcheck to detect suspicious hidden processes or ports. 

.. thumbnail:: ../../images/getting_started/screenshot_02_intrusion_detection.png
    :alt: Data flow
    :align: center
    :wrap_image: No


.. toctree::

   rootkits_detection
   system_inventory




