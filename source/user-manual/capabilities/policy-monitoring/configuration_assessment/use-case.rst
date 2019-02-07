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
      <profile>cis_debian_linux_rcl.yml</profile>
    </configuration_assessment>

The profile field is the policy file desired to be executed. The complete path for it is by default */var/ossec/etc/rootcheck* on a Linux manager, */var/ossec/etc/rootcheck/shared* on a Linux agent environment and *C:\\Program files (x86)\\ossec-agent\\shared* when using Windows.

In this case, we have set a Debian Linux check file, but you can choose any other that matches your operating system.
After restarting Wazuh on the machine where this module was set, it will start running. First, the new information will be stored
at the manager's side, then this data may match with some rules described at the *0570-policy_rules.xml* file and it will generate alerts if 
there is different information from the previous storage.

The policy file has a check set, for example, this one verifies that the nodev option is set on the /home partition:

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

Where the rules block describes the requirements needed to pass the check. In case it is the first scan and the check passes or fails, it will trigger the next alert:

.. code-block:: none

        ** Alert 1549530872.114774: - ossec,
        2019 Feb 07 10:14:32 misi->policy-monitoring
        Rule: 19004 (level 3) -> 'Check with id 1007 for profile CIS benchmark for Debian/Linux passed'
        {"type":"check","id":632712261,"profile":"CIS benchmark for Debian/Linux","check":{"id":1007,"title":"Ensure nodev option set on /home partition","cis_control":"1.1.14","description":"The nodev mount option specifies that the filesystem cannot contain special devices.","rationale":"Since the user partitions are not intended to support devices, set this option to ensure that users cannot attempt to create block or character special devices.","remediation":"Edit the /etc/fstab file and add nodev to the fourth field (mounting options) for the /home partition. See the fstab(5) manual page for more information. # mount -o remount,nodev /home","compliance":{"cis":5,"pci_dss":"2.2.4"},"file":"","result":"passed"}}
        pm.type: check
        pm.scan_id: 632712261
        pm.policy: CIS benchmark for Debian/Linux
        pm.check.id: 1007
        pm.check.title: Ensure nodev option set on /home partition
        pm.check.cis_control: 1.1.14
        pm.check.description: The nodev mount option specifies that the filesystem cannot contain special devices.
        pm.check.rationale: Since the user partitions are not intended to support devices, set this option to ensure that users cannot attempt to create block or character special devices.
        pm.check.remediation: Edit the /etc/fstab file and add nodev to the fourth field (mounting options) for the /home partition. See the fstab(5) manual page for more information. # mount -o remount,nodev /home
        pm.check.compliance.cis: 5
        pm.check.compliance.pci_dss: 2.2.4
        pm.check.result: passed

This is the generated event that summarizes the result of the checking process:

.. code-block:: json

    {
        "type":"summary",
        "scan_id":998245167,
        "name":"CIS benchmark for Debian/Linux",
        "policy_id":"cis_debian",
        "file":"cis_debian_linux_rcl.yml",
        "description":"This document provides prescriptive guidance for establishing a secure configuration posture for Debian Linux systems running on x86 and x64 platforms. Many lists are included including filesystem types, services, clients, and network protocols. Not all items in these lists are guaranteed to exist on all distributions and additional similar items may exist which should be considered in addition to those explicitly mentioned.",
        "references":"https://workbench.cisecurity.org/",
        "passed":39,
        "failed":9,
        "score":81.25,
        "start_time":1549552673,
        "end_time":1549552673,
        "hash":"e85cc9dcb5cf7b67cebbb79eab341ecc"
    }
