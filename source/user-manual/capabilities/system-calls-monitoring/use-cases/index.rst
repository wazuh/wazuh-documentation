.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Discover Wazuh use cases for Linux system call monitoring, including detecting Audit daemon stop/start events, abnormal process termination, and promiscuous mode activation.

Use cases
=========

The use cases described below are performed on an Ubuntu 24.04 endpoint that has a Wazuh agent installed and enrolled in a Wazuh manager. These use cases work without custom audit rules or custom detection rules. The Linux kernel emits the ``ANOM_ABEND`` and ``ANOM_PROMISCUOUS`` records, and the audit daemon writes the ``DAEMON_START`` and ``DAEMON_END`` records.

.. toctree::
   :maxdepth: 1

   detect-when-the-audit-daemon-stops
   detect-when-the-audit-daemon-starts
   detect-abnormal-process-termination
   detect-a-network-interface-entering-promiscuous-mode
