.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out more about the Wazuh Security Configuration Assessment capability. What is SCA, how it works, how to configure it, create custom policies, and use cases.

.. _manual_sec_config_assessment:

Security Configuration Assessment
=================================

Security Configuration Assessment (SCA) checks that your endpoints follow a set of rules for configuration settings and approved application usage. It identifies weaknesses that you can fix to reduce your attack surface.

The Wazuh SCA module scans monitored endpoints for misconfigurations and recommends remediation actions. It uses policy files that contain rules to test against the endpoint configuration. SCA policies can check the following:

- The existence of files, directories, registry keys, and registry values
- Files inside directories, tested recursively
- Running processes
- The contents of files, command output, and registry value data

For example, the SCA module can check password settings, unwanted software and services, and the TCP/IP stack configuration. Wazuh provides policies based mostly on the CIS benchmarks. You can also write your own policies in YAML or extend existing ones.

.. toctree::
   :maxdepth: 2

   how-it-works
   how-to-configure
   available-sca-policies
   use-cases
