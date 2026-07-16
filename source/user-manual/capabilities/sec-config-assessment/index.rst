.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out more about the Wazuh Security Configuration Assessment capability. What is SCA, how it works, how to configure it, create custom policies, and use cases.

.. _manual_sec_config_assessment:

Security Configuration Assessment
=================================

Security Configuration Assessment (SCA) is the process of verifying that systems conform to a set of predefined rules regarding configuration settings and approved application usage. One of the most reliable ways to secure endpoints is by reducing their vulnerability surface, a process known as hardening. Configuration assessment identifies weaknesses in your endpoints so you can patch them and reduce your attack surface.

The Wazuh SCA module scans monitored endpoints to detect misconfigurations and exposures and recommends remediation actions. These scans assess the endpoint configuration using policy files that contain rules to test against the endpoint's actual configuration. SCA policies can check for the existence of:

- The existence of files, directories, registry keys, and registry values
- Files inside directories, tested recursively
- Running processes
- The contents of files, command output, and registry value data

For example, the SCA module can assess whether you need to change password-related configuration, remove unnecessary software, disable unnecessary services, or audit the TCP/IP stack configuration. SCA policies are written in YAML, a human-readable format that is easy to understand. Wazuh ships with a set of out-of-the-box policies based mostly on the CIS benchmarks, a well-established standard for endpoint hardening. You can also write your own policies or extend existing ones to fit your needs.

.. toctree::
   :maxdepth: 2

   how-it-works
   available-sca-policies
   use-cases
