.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: This use case demonstrates how Wazuh detects when the Linux Audit daemon (auditd) stops unexpectedly on a monitored Linux endpoint.

Detect when the Audit daemon stops
===================================

This use case demonstrates how Wazuh detects when the Linux Audit daemon (auditd) stops unexpectedly. Stopping the audit daemon can prevent the system from recording security-relevant events and may indicate an attempt to evade auditing.

Ubuntu endpoint
---------------

Perform the following actions to test the configuration:

#. Stop the Audit daemon:

   .. code-block:: console

      # systemctl stop auditd

#. Verify that the service has stopped:

   .. code-block:: console

      # systemctl status auditd

Navigate to **Threat Intelligence > Threat Hunting > Findings** on the Wazuh dashboard to view the generated finding:

.. thumbnail:: /images/manual/system-calls-monitoring/audit-daemon-stopped-finding.png
  :title: Audit daemon stopped finding
  :alt: Audit daemon stopped finding
  :align: center
  :width: 80%
