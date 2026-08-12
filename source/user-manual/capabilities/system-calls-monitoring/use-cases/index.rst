.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Discover Wazuh use cases for Linux system call monitoring, including detecting Audit daemon stop/start events, abnormal process termination, and promiscuous mode activation.

Use cases
=========

The use cases described below are performed on an Ubuntu 24.04 endpoint that has a Wazuh agent installed and enrolled in a Wazuh manager. The first four use cases do not need custom rules; the Linux kernel emits the ``ANOM_ABEND``, ``ANOM_PROMISCUOUS``, ``DAEMON_END``, and ``DAEMON_START`` records they rely on automatically.

.. toctree::
   :maxdepth: 1

   detect-when-the-audit-daemon-stops
   detect-when-the-audit-daemon-starts
   detect-abnormal-process-termination
   detect-a-network-interface-entering-promiscuous-mode
