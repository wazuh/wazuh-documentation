.. _pci_dss_policy_monitoring:

Policy monitoring
=================

The OSSEC rootcheck module can be used to enforce and monitor your security policy. This is the process of verifying that all systems conform to a set of pre-defined rules surrounding configuration settings and approved application usage.

There are several PCI DSS requirements to verify that systems are properly hardened. An example would be:

| **2.2**: Develop configuration standards for all system components. Assure that these standards address all known security vulnerabilities and are consistent with industry-accepted system hardening standards.
| Sources of industry-accepted system hardening standards may include, but are not limited to: Center for Internet Security (CIS), International Organization for Standardization (ISO), SysAdmin Audit Network Security (SANS), Institute National Institute of Standards Technology (NIST).
|

Wazuh includes out-of-the-box CIS baselines for Debian and Redhat and other baselines could be created for other systems or applications, just by adding the corresponding rootcheck file:

.. code-block:: xml

    <rootcheck>
      <system_audit>/var/ossec/etc/shared/cis_debian_linux_rcl.txt</system_audit>
      <system_audit>/var/ossec/etc/shared/cis_rhel_linux_rcl.txt</system_audit>
      <system_audit>/var/ossec/etc/shared/cis_rhel5_linux_rcl.txt</system_audit>
    </rootcheck>

Other PCI DSS requirements will ask us to check that applications (especially network services) are configured in a secure way. One example is the following control:

| **2.2.4**: Configure system security parameters to prevent misuse.
|

The following are good examples of rootcheck rules developed to check the configuration of SSH services:

::

    [SSH Configuration - Protocol version 1 enabled {PCI_DSS: 2.2.4}] [any]
    f:/etc/ssh/sshd_config -> !r:^# && r:Protocol\.+1;

    [SSH Configuration - Root login allowed {PCI_DSS: 2.2.4}] [any]
    f:/etc/ssh/sshd_config -> !r:^# && r:PermitRootLogin\.+yes;

In our :ref:`OSSEC Wazuh fork <installation>`, the rootcheck rules use this syntax in the rootcheck name: **{PCI_DSS: X.Y.Z}**. Meaning that all rootchecks already have the PCI DSS requirement tag.

Use cases
---------

In order to check the security parameters of SSH (and meet the requirement 2.2.4), we have developed the rootchecks ``system_audit_ssh``. In our example, when OSSEC runs the rootcheck scan, it is able to detect some errors in the SSH configuration.

.. code-block:: console

    [root@manager ossec]# cat etc/ossec.conf | grep system_audit_ssh -B 4 -A 2

.. code-block:: xml

    <rootcheck>
        <rootkit_files>/var/ossec/etc/shared/rootkit_files.txt</rootkit_files>
        <rootkit_trojans>/var/ossec/etc/shared/rootkit_trojans.txt</rootkit_trojans>
        <system_audit>/var/ossec/etc/shared/system_audit_rcl.txt<system_audit>
        <system_audit>/var/ossec/etc/shared/ssh/system_audit_ssh.txt<system_audit>
    </rootcheck>

.. code-block:: console

    [root@manager ossec]# tail -f logs/archives/archives.log
    2016 Jan 29 12:58:02 manager->rootcheck Ending rootcheck scan.
    2016 Jan 29 13:07:18 manager->ossec-monitord ossec: Ossec started.
    2016 Jan 29 13:08:34 manager->rootcheck Starting rootcheck scan.
    2016 Jan 29 13:08:36 manager->rootcheck System Audit: SSH Hardening - 3: Root can log in {PCI_DSS: 2.2.4}. File: /etc/ssh/sshd_config. Reference: 3 .
    2016 Jan 29 13:08:36 manager->rootcheck System Audit: SSH Hardening - 4: No Public Key autentication {PCI_DSS: 2.2.4}. File: /etc/sshd/sshd_config. Reference: 4 .
    2016 Jan 29 13:08:36 manager->rootcheck System Audit: SSH Hardening - 5: Password Authentication {PCI_DSS: 2.2.4}. File: /etc/sshd/sshd_config. Reference: 5 .
    2016 Jan 29 13:08:36 manager->rootcheck System Audit: SSH Hardening - 6: Empty passwords allowed {PCI_DSS: 2.2.4}. File: /etc/sshd/sshd_config. Reference: 6 .
    2016 Jan 29 13:08:36 manager->rootcheck System Audit: SSH Hardening - 7: Rhost or shost used for authentication {PCI_DSS: 2.2.4}. File: /etc/sshd/sshd_config. Reference: 7 .
    2016 Jan 29 13:08:36 manager->rootcheck System Audit: SSH Hardening - 8: Wrong Grace Time {PCI_DSS: 2.2.4}. File: /etc/sshd/sshd_config. Reference: 8 .
    2016 Jan 29 13:08:36 manager->rootcheck System Audit: SSH Hardening - 9: Wrong Maximum number of authentication attempts {PCI_DSS: 2.2.4}. File: /etc/sshd/sshd_config. Reference: 9 .

.. code-block:: console

    [root@manager ossec]# tail -n 1 logs/alerts/alerts.json | pjson

.. code-block:: json

    {
        "decoder": {
            "fts": 4096,
            "name": "rootcheck"
        },
        "full_log": "System Audit: SSH Hardening - 9: Wrong Maximum number of authentication attempts {PCI_DSS: 2.2.4}. File: /etc/sshd/sshd_config. Reference: 9 .",
        "hostname": "manager",
        "location": "rootcheck",
        "rule": {
            "pci_dss": [
                "2.2.4"
            ],
            "comment": "System Audit event.",
            "firedtimes": 7,
            "groups": [
                "ossec",
                "rootcheck"
            ],
            "level": 3,
            "sidid": 516
        },
        "timestamp": "2016 Jan 29 13:08:36"
    }




Kibana shows the full information about the alert.

.. thumbnail:: ../images/pci/policy_monitoring_1.png
    :title: Alert visualization on Kibana Discover
    :align: center
    :width: 100%

.. thumbnail:: ../images/pci/policy_monitoring_2.png
    :title: Wazuh PCI DSS dashboard showing PCI DSS 2. alerts
    :align: center
    :width: 100%
