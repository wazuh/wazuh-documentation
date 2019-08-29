What is SCA
=================================

.. contents:: Table of Contents
   :depth: 10

One of the most certain ways to secure hosts is by reducing their vulnerability surface. That process is commonly
known as hardening, and configuration assessment is an effective way to determine opportunities where hosts could
have their attack surface reduced, and here is where SCA comes into play.

SCA performs scans in order to discover exposures or misconfigurations in monitored hosts. Those scans assess the
configuration of the hosts by means of policy files, that contains rules to be tested against the actual
configuration of host.
For example, SCA could assess whether it is necessary to change password related configuration, remove unnecessary
software, disable unnecessary services, or audit the TCP/IP stack configuration.

Policies for the SCA module are written in YAML format. This that was chosen due having human readability in mind,
which allows users to quickly understand and write their own policies or extend the existing ones to fit their needs.
Furthermore, Wazuh is distributed with a set of policies, most of them based on the CIS benchmarks, a well establish
standard for host hardening.

Overview of an SCA check
----------------------------------

Each check comprises some metadata information, a description of the purpose of the check, and its logical description
(fields **condition** and **rules**). On its metadata, it can contain an optional **compliance** field used to specify
if the check is relevant to any compliance specifications, and to which. Most of Wazuh policies, specially CIS policies,
already have their CIS and PCI-DSS controls mapped. See an example :ref:`example<check_overview>` below.


.. code-block:: yaml
    :name: check_overview
    :caption: Check example

    - id: 3006
      title: "Ensure nodev option set on /tmp partition"
      description: "The nodev mount option specifies that the filesystem cannot contain special devices."
      rationale: "Since the /tmp filesystem is not intended to support devices, set this option to ensure that users cannot attempt to create block or character special devices in /tmp."
      remediation: "Edit /etc/systemd/system/local-fs.target.wants/tmp.mount to configure the /tmp mount and run the following commands to enable systemd /tmp mounting: systemctl unmask tmp.mount systemctl enable tmp.mount"
      compliance:
        - cis: ["1.1.3"]
        - cis_csc: ["5.1"]
      condition: all
      rules:
        - 'c:mount -> r:\s/tmp\s && r:nodev'

Interpreting SCA scan results
----------------------------------

SCA scan results appear as :ref:`alerts<alert_example>` whenever a particular check changes its status between scans.
Moreover, Wazuh agents only send those events necessary to keep the global status of the scan updated, avoiding
potential event flooding.

.. code-block:: none
    :name: alert_example
    :caption: Alert example

    ** Alert 1556643969.400529: - sca,gdpr_IV_35.7.d
    2019 Apr 30 10:06:09 (centos) 192.168.0.97->sca
    Rule: 19008 (level 3) -> 'CIS Benchmark for Red Hat Enterprise Linux 7: Ensure address space layout randomization (ASLR) is enabled'
    {"type":"check","id":645241598,"policy":"CIS Benchmark for Red Hat Enterprise Linux 7","policy_id":"cis_rhel7","check":{"id":6523,"title":"Ensure address space layout randomization (ASLR) is enabled","description":"Address space layout randomization (ASLR) is an exploit mitigation technique which randomly arranges the address space of key data areas of a process.","rationale":"Randomly placing virtual memory regions will make it difficult to write memory page exploits as the memory placement will be consistently shifting.","remediation":"Set the following parameter in /etc/sysctl.conf or a /etc/sysctl.d/* file: kernel.randomize_va_space = 2 and set the active kernel parameter","compliance":{"cis":"1.5.3","cis_csc":"8.4"},"rules":["f:/proc/sys/kernel/randomize_va_space -> !r:^2$;"],"file":"/proc/sys/kernel/randomize_va_space","result":"passed"}}
    sca.type: check
    sca.scan_id: 645241598
    sca.policy: CIS Benchmark for Red Hat Enterprise Linux 7
    sca.check.id: 6523
    sca.check.title: Ensure address space layout randomization (ASLR) is enabled
    sca.check.description: Address space layout randomization (ASLR) is an exploit mitigation technique which randomly arranges the address space of key data areas of a process.
    sca.check.rationale: Randomly placing virtual memory regions will make it difficult to write memory page exploits as the memory placement will be consistently shifting.
    sca.check.remediation: Set the following parameter in /etc/sysctl.conf or a /etc/sysctl.d/* file: kernel.randomize_va_space = 2 and set the active kernel parameter
    sca.check.compliance.cis: 1.5.3
    sca.check.compliance.cis_csc: 8.4
    sca.check.file: ["/proc/sys/kernel/randomize_va_space"]
    sca.check.result: passed

Scan results summaries are then shown on the Wazuh App, within the *SCA* tab.

.. thumbnail:: ../../../images/sca/sca-agent.png
    :title: SCA summary
    :align: center
    :width: 100%

In addition, each result can be expanded to display additional information.

.. thumbnail:: ../../../images/sca/sca-check.png
    :title: SCA check list
    :align: center
    :width: 100%
