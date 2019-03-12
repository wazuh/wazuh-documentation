.. Copyright (C) 2018 Wazuh, Inc.

How it works
============

*Rootcheck* allows to define policies in order to check if the agents meet the requirement specified.

.. thumbnail:: ../../../../images/manual/policy-compliance/rootcheck-compliance.png
  :title: Rootcheck policies
  :align: center
  :width: 100%

The *rootcheck* engine can perform the following checks:

- check if a process is running
- check if a file is present
- check if the content of a file contains a pattern, or if a Windows registry key contains a string or is simply present.

Using these checks, the following policies have been developed:

- cis_debian_linux_rcl.txt
- cis_rhel5_linux_rcl.txt
- cis_rhel6_linux_rcl.txt
- cis_rhel7_linux_rcl.txt
- cis_rhel_linux_rcl.txt
- cis_sles11_linux_rcl.txt
- cis_sles12_linux_rcl.txt
- system_audit_rcl.txt
- system_audit_ssh.txt
- win_audit_rcl.txt
- win_applications_rcl.txt

To download those files, follow this steps:

1. Go to the `CIS benchmarks signin page. <https://learn.cisecurity.org/benchmarks>`_

2. Fill the form with the user's personal data.

  .. thumbnail:: ../../../../images/manual/rootcheck/cis_benchmark_2.png
    :align: center
    :width: 70%

3. Click the "Access PDFs" in the received e-mail.

4. The user will be redirected to a page. Introduce your e-mail in the "Look up" box there.

5. It will redirect the user to the downloading page.

6. To finish, choose the policy file that the user needs between the before mentioned and click the "Download PDF" button to start the download.

  .. thumbnail:: ../../../../images/manual/rootcheck/cis_benchmark_1.png
    :align: center
    :width: 70%

.. warning::
  Since the last update, CIS benchmarks associates a personal token to every account, making necessary to SignUp in their page to be able to download the files.

Alerts related to policy monitoring:

- 512: Windows Audit
- 514: Windows Application
- 516: Unix Audit

The policy and compliance monitoring databases are normally maintained on the manager, which distributes them to all the agents.

Example of an existing policy rule::

 # PermitRootLogin not allowed
 # PermitRootLogin indicates if the root user can log in via ssh.
 $sshd_file=/etc/ssh/sshd_config;

 [SSH Configuration - 1: Root can log in] [any] [1]
 f:$sshd_file -> !r:^# && r:PermitRootLogin\.+yes;
 f:$sshd_file -> r:^#\s*PermitRootLogin;

Alert example::

 ** Alert 1487185712.51190: - ossec,rootcheck,
 2017 Feb 15 11:08:32 localhost->rootcheck
 Rule: 516 (level 3) -> 'System Audit event.'
 System Audit: CIS - RHEL7 - 6.2.9 - SSH Configuration - Empty passwords permitted {CIS: 6.2.9 RHEL7} {PCI_DSS: 4.1}. File: /etc/ssh/sshd_config. Reference: https://benchmarks.cisecurity.org/tools2/linux/CIS_Red_Hat_Enterprise_Linux_7_Benchmark_v1.1.0.pdf .
 title: CIS - RHEL7 - 6.2.9 - SSH Configuration - Empty passwords permitted
 file: /etc/ssh/sshd_config
