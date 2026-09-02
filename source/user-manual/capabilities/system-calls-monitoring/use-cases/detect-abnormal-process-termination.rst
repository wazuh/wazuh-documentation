.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This use case demonstrates how Wazuh detects processes that terminate unexpectedly on a monitored Linux endpoint.

Detect abnormal process termination
====================================

This use case demonstrates how Wazuh detects processes that terminate unexpectedly. Abnormal process termination can indicate application crashes, exploitation attempts, memory corruption, or malicious attempts to terminate processes.

Ubuntu endpoint
---------------

Run the following command to intentionally trigger a segmentation fault:

.. code-block:: console

   # python3 -c "import ctypes; ctypes.string_at(0)"

The command terminates the Python process with a segmentation fault, causing the Linux Audit subsystem to generate an ``ANOM_ABEND`` audit event.

Navigate to **Threat Intelligence > Threat Hunting > Findings** on the Wazuh dashboard to view the generated finding:

.. thumbnail:: /images/manual/system-calls-monitoring/process-ended-abnormally-finding.png
   :title: Process ended abnormally finding
   :alt: Process ended abnormally finding
   :align: center
   :width: 80%
