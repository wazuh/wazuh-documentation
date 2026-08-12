.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: This use case demonstrates how Wazuh detects when the Linux Audit daemon (auditd) starts on a monitored Linux endpoint.

Detect when the Audit daemon starts
====================================

This use case demonstrates how Wazuh detects when the Linux Audit daemon (auditd) starts. Monitoring Audit daemon startup events helps administrators verify that the auditing service is running and provides visibility into service restarts that may occur during system maintenance or after an unexpected interruption.

Ubuntu endpoint
---------------

Perform the following actions to test the configuration:

#. Start the Audit daemon:

   .. code-block:: console

      # systemctl start auditd

#. Verify that the service has started:

   .. code-block:: console

      # systemctl status auditd

Navigate to **Threat Intelligence > Threat Hunting > Findings** on the Wazuh dashboard to view the generated finding:

.. thumbnail:: /images/manual/system-calls-monitoring/audit-daemon-started-finding.png
  :title: Audit daemon started finding
  :alt: Audit daemon started finding
  :align: center
  :width: 80%
