.. _manual_roocheck_policy:

Rootcheck
=================================

The *rootcheck* engine has the capability to do the following checks:

- if a process is running or not
- if a file is present
- if the contents of a file contains a pattern, or if a Windows registry key contains a string or is present.

Using these checks, the following policies have been developed:

+--------------------------+--------------------------------------------------------------------+
| Policy                   | Description                                                        |
+==========================+====================================================================+
| cis_debian_linux_rcl.txt | Based on CIS Benchmark for Debian Linux v1.0                       |
+--------------------------+--------------------------------------------------------------------+
| cis_rhel5_linux_rcl.txt  | Based on CIS Benchmark for Red Hat Enterprise Linux 5 v2.1.0       |
+--------------------------+--------------------------------------------------------------------+
| cis_rhel6_linux_rcl.txt  | Based on CIS Benchmark for Red Hat Enterprise Linux 6 v1.3.0       |
+--------------------------+--------------------------------------------------------------------+
| cis_rhel7_linux_rcl.txt  | Based on CIS Benchmark for Red Hat Enterprise Linux 7 v1.1.0       |
+--------------------------+--------------------------------------------------------------------+
| cis_rhel_linux_rcl.txt   | Based on CIS Benchmark for Red Hat Enterprise Linux v1.0.5         |
+--------------------------+--------------------------------------------------------------------+
| cis_sles11_linux_rcl.txt | Based on CIS Benchmark for SUSE Linux Enterprise Server 11 v1.1.0  |
+--------------------------+--------------------------------------------------------------------+
| cis_sles12_linux_rcl.txt | Based on CIS Benchmark for SUSE Linux Enterprise Server 12 v1.0.0  |
+--------------------------+--------------------------------------------------------------------+
| system_audit_rcl.txt     | Web vulnerabilities and exploits                                   |
+--------------------------+--------------------------------------------------------------------+
| win_audit_rcl.txt        | Check registry values                                              |
+--------------------------+--------------------------------------------------------------------+
| system_audit_ssh.txt     | SSH Hardening                                                      |
+--------------------------+--------------------------------------------------------------------+
| win_applications_rcl.txt | Check if malicious applications are installed                      |
+--------------------------+--------------------------------------------------------------------+


Alerts related to policy monitoring:

- 512: Windows Audit
- 514: Windows Application
- 516: Unix Audit
