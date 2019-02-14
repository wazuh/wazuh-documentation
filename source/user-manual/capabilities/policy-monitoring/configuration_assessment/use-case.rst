.. Copyright (C) 2019 Wazuh, Inc.

Use case: Getting an alert when a check changes its result value
================================================================

To configure the execution of the *configuration assessment* module with a policy file, it is necessary to set up the following section:

.. code-block:: none

    <configuration_assessment>
      <enabled>no</enabled>
      <scan_on_start>yes</scan_on_start>
      <interval>1m</interval>
      <skip_nfs>yes</skip_nfs>

      <policies>
          <policy>cis_debian_rcl.yml</policy>
      </policies>
    </configuration_assessment>

The profile field is the policy file desired to be executed. The complete path for it is by default */var/ossec/etc/rootcheck* on a Linux manager, */var/ossec/etc/rootcheck/shared* on a Linux agent environment and *C:\\Program files (x86)\\ossec-agent\\shared* when using Windows.

In this case, a Debian Linux check file has been set, but the user can choose any other that matches their operating system.
After restarting Wazuh on the machine where this module was set, it will start running. First, the new information will be stored
at the manager's side, then this data may match with some rules described at the *0570-policy_rules.xml* file and it will generate alerts if 
there is different information from the previous storage.

The policy file has a check set, for example, this one verifies that the ``nodev`` option is set on the ``/home`` partition:

.. code-block:: none

     - id: 1007
        title: "Ensure nodev option set on /home partition"
        cis_control: "1.1.14"
        description: "The nodev mount option specifies that the filesystem cannot contain special devices."
        rationale: "Since the user partitions are not intended to support devices, set this option to ensure that users cannot attempt to create block or character special devices."
        remediation: "Edit the /etc/fstab file and add nodev to the fourth field (mounting options) for the /home partition. See the fstab(5) manual page for more information. # mount -o remount,nodev /home"
        compliance:
            - cis: "5.1"
            - pci_dss: "2.2.4"
        condition: any
        rules:
            - 'f:/etc/fstab -> !r:^# && r:ext2|ext3 && r:/home && !r:nodev ;'

There is where the rule block describes the requirements needed to pass the check. In case it is the first scan and the check passes or fails, it will trigger the next alert:

.. code-block:: none

        ** Alert 1549608285.288281: - ossec,
        2019 Feb 08 07:44:45 my_pc->configuration-assessment
        Rule: 19003 (level 7) -> 'Check with id 1032 for policy CIS benchmark for Debian/Linux failed'
        {"type":"check","id":1163073902,"profile":"CIS benchmark for Debian/Linux","check":{"id":1032,"title":"Ensure IP forwarding is disabled","description":"The net.ipv4.ip_forward and net.ipv6.conf.all.forwarding flags are used to tell the system whether it can forward packets or not.","rationale":"Setting the flags to 0 ensures that a system with multiple interfaces (for example, a hard proxy), will never be able to forward packets, and therefore, never serve as a router.","remediation":"Set the following parameter in /etc/sysctl.conf or a /etc/sysctl.d/* file: net.ipv4.ip_forward = 0, net.ipv6.conf.all.forwarding = 0","compliance":{"cis_csc":5,"cis":"3.1.1"},"file":"/proc/sys/net/ipv4/ip_forward.","result":"failed"}}
        configuration_assessment.type: check
        configuration_assessment.scan_id: 1163073902
        configuration_assessment.policy: CIS benchmark for Debian/Linux
        configuration_assessment.check.id: 1032
        configuration_assessment.check.title: Ensure IP forwarding is disabled
        configuration_assessment.check.description: The net.ipv4.ip_forward and net.ipv6.conf.all.forwarding flags are used to tell the system whether it can forward packets or not.
        configuration_assessment.check.rationale: Setting the flags to 0 ensures that a system with multiple interfaces (for example, a hard proxy), will never be able to forward packets, and therefore, never serve as a router.
        configuration_assessment.check.remediation: Set the following parameter in /etc/sysctl.conf or a /etc/sysctl.d/* file: net.ipv4.ip_forward = 0, net.ipv6.conf.all.forwarding = 0
        configuration_assessment.check.compliance.cis_csc: 5
        configuration_assessment.check.compliance.cis: 3.1.1
        configuration_assessment.check.file: /proc/sys/net/ipv4/ip_forward.
        configuration_assessment.check.result: failed


This is the generated event that summarizes the result of the checking process:

.. code-block:: none


        ** Alert 1549608285.301707: - ossec,
        2019 Feb 08 07:44:45 my_pc->configuration-assessment
        Rule: 19001 (level 3) -> 'Configuration assessment summary: Passed checks: 39 Failed checks: 9 Score: 81'
        {"type":"summary","scan_id":1163073902,"name":"CIS benchmark for Debian/Linux","policy_id":"cis_debian","file":"cis_debian_linux_rcl.yml","description":"This document provides prescriptive guidance for establishing a secure configuration posture for Debian Linux systems running on x86 and x64 platforms. Many lists are included including filesystem types, services, clients, and network protocols. Not all items in these lists are guaranteed to exist on all distributions and additional similar items may exist which should be considered in addition to those explicitly mentioned.","references":"https://workbench.cisecurity.org/","passed":39,"failed":9,"score":81.25,"start_time":1549608285,"end_time":1549608285,"hash":"0f955725d7a267942ae5a1cab522d0b8"}
        configuration_assessment.type: summary
        configuration_assessment.scan_id: 1163073902
        configuration_assessment.name: CIS benchmark for Debian/Linux
        configuration_assessment.description: This document provides prescriptive guidance for establishing a secure configuration posture for Debian Linux systems running on x86 and x64 platforms. Many lists are included including filesystem types, services, clients, and network protocols. Not all items in these lists are guaranteed to exist on all distributions and additional similar items may exist which should be considered in addition to those explicitly mentioned.
        configuration_assessment.passed: 39
        configuration_assessment.failed: 9
        configuration_assessment.score: 81
        configuration_assessment.file: cis_debian_linux_rcl.yml

The check with id 1032 failed, it verifies if the file */proc/sys/net/ipv4/ip_forward* does not contain a value of "1". If we modify this file as follows:

::

    echo "0" > /proc/sys/net/ipv4/ip_forward


We get the next two alerts, one of them states that this check has changed its result and the other one summarizes this last process.
Notice that now we have 40 passed checks and 8 failed.

.. code-block:: none

        ** Alert 1549608524.314132: - ossec,
        2019 Feb 08 07:48:44 my_pc->configuration-assessment
        Rule: 19005 (level 3) -> 'Check with id 1032 for policy CIS benchmark for Debian/Linux has changed to passed'
        {"type":"check","id":1704901665,"profile":"CIS benchmark for Debian/Linux","check":{"id":1032,"title":"Ensure IP forwarding is disabled","description":"The net.ipv4.ip_forward and net.ipv6.conf.all.forwarding flags are used to tell the system whether it can forward packets or not.","rationale":"Setting the flags to 0 ensures that a system with multiple interfaces (for example, a hard proxy), will never be able to forward packets, and therefore, never serve as a router.","remediation":"Set the following parameter in /etc/sysctl.conf or a /etc/sysctl.d/* file: net.ipv4.ip_forward = 0, net.ipv6.conf.all.forwarding = 0","compliance":{"cis_csc":5,"cis":"3.1.1"},"file":"","result":"passed"}}
        configuration_assessment.type: check
        configuration_assessment.scan_id: 1704901665
        configuration_assessment.policy: CIS benchmark for Debian/Linux
        configuration_assessment.check.id: 1032
        configuration_assessment.check.title: Ensure IP forwarding is disabled
        configuration_assessment.check.description: The net.ipv4.ip_forward and net.ipv6.conf.all.forwarding flags are used to tell the system whether it can forward packets or not.
        configuration_assessment.check.rationale: Setting the flags to 0 ensures that a system with multiple interfaces (for example, a hard proxy), will never be able to forward packets, and therefore, never serve as a router.
        configuration_assessment.check.remediation: Set the following parameter in /etc/sysctl.conf or a /etc/sysctl.d/* file: net.ipv4.ip_forward = 0, net.ipv6.conf.all.forwarding = 0
        configuration_assessment.check.compliance.cis_csc: 5
        configuration_assessment.check.compliance.cis: 3.1.1
        configuration_assessment.check.result: passed
        configuration_assessment.check.previous_result: failed

        ** Alert 1549608524.316062: - ossec,
        2019 Feb 08 07:48:44 my_pc->configuration-assessment
        Rule: 19001 (level 3) -> 'Configuration assessment summary: Passed checks: 40 Failed checks: 8 Score: 83'
        {"type":"summary","scan_id":1704901665,"name":"CIS benchmark for Debian/Linux","policy_id":"cis_debian","file":"cis_debian_linux_rcl.yml","description":"This document provides prescriptive guidance for establishing a secure configuration posture for Debian Linux systems running on x86 and x64 platforms. Many lists are included including filesystem types, services, clients, and network protocols. Not all items in these lists are guaranteed to exist on all distributions and additional similar items may exist which should be considered in addition to those explicitly mentioned.","references":"https://workbench.cisecurity.org/","passed":40,"failed":8,"score":83.333328247070312,"start_time":1549608524,"end_time":1549608524,"hash":"b2f88b5d4960ae1d4febcea288d3a0bc"}
        configuration_assessment.type: summary
        configuration_assessment.scan_id: 1704901665
        configuration_assessment.name: CIS benchmark for Debian/Linux
        configuration_assessment.description: This document provides prescriptive guidance for establishing a secure configuration posture for Debian Linux systems running on x86 and x64 platforms. Many lists are included including filesystem types, services, clients, and network protocols. Not all items in these lists are guaranteed to exist on all distributions and additional similar items may exist which should be considered in addition to those explicitly mentioned.
        configuration_assessment.passed: 40
        configuration_assessment.failed: 8
        configuration_assessment.score: 83
        configuration_assessment.file: cis_debian_linux_rcl.yml

