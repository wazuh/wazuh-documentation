.. Copyright (C) 2022 Wazuh, Inc.
.. meta::
  :description: Learn more about how you can detect anomalies and malware using Wazuh in this section of our documentation. 
  
.. _manual_anomaly_detection:

Anomaly and malware detection
=============================

Anomaly detection refers to the action of finding patterns in the system that do not match the expected behavior. Once malware (e.g., a rootkit) is installed on a system, it modifies the system to hide itself from the user. Although malware uses a variety of techniques to accomplish this, Wazuh uses a broad spectrum approach to finding anomalous patterns that indicate possible intruders.

The main component responsible for this task is **rootcheck**, however, **Syscheck** also plays an important role.

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        how-it-works
        anomaly-configuration
        anomaly-faq
