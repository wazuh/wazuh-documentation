.. _manual_agentless:


Agentless monitoring
======================

.. warning::
	Draft document.

Agentless monitoring allows you to monitorize devices or systems whihout having an agent installed, through ssh. Systems as:

- routers
- firewalls
- switches
- linux/bsd systems

Agentless monitoring lets users who have restrictions on software being installed on systems meet security and compliance needs.

It can alert onece checksum changes or doing diffs, and showing what exactly changed.

Agentless monitoring is configured in :ref:`ossec.conf <reference_ossec_conf>`, in the section :ref:`Agentless <reference_ossec_agentless>`.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        agentless-configuration
        agentless-examples
        agentless-faq


How it works
------------

1. Configuration
^^^^^^^^^^^^^^^^
Agentless monitoring works through ssh. Depending on the configuration you choose you will have a different behaviour.

All the options in the :ref:`configuration<agentless-configuration>` section,

2. Monitoring
^^^^^^^^^^^^^

You have different options available in order to monitorize your system:

- Integrity check BSD/Linux
	Wazuh will check all the configured directories on the remote box. This can be used on linux or bsd systems.

- Generic Diff
	With this configuration Wazuh server will execute certain commands with a configured frequency. Wazuh will monitor if the ouptut of the configured command changes.

- Pix Configuration
	Wazuh monitorize if the configuration of a Cisco PIX/router configuration changes.

3. Alert
^^^^^^^^
Once every is configured if something changes on the monitorized directories, commands or Cisco configurations, Wazuh will alert about those changes:

Integrity check BSD/Linux example alert::

	** Alert 1486811998.93230: - ossec,syscheck,pci_dss_11.5,
	2017 Feb 11 03:19:58 ubuntu->(ssh_integrity_check_linux) root@192.168.1.3->syscheck
	Rule: 550 (level 7) -> 'Integrity checksum changed.'
	Integrity checksum changed for: '/etc/.hidden'
	Size changed from '0' to '10'
	Old md5sum was: 'd41d8cd98f00b204e9800998ecf8427e'
	New md5sum is : 'cc7bd56aba1122d0d5f9c7ef7f96de23'
	Old sha1sum was: 'da39a3ee5e6b4b0d3255bfef95601890afd80709'
	New sha1sum is : 'b570fbdf7d6ad1d1e95ef57b74877926e2cdf196'

	File: /etc/.hidden
	Old size: 0
	New size: 10
	New permissions:   1204
	New user: 0
	New group: 0
	Old MD5: d41d8cd98f00b204e9800998ecf8427e
	New MD5: cc7bd56aba1122d0d5f9c7ef7f96de23
	Old SHA1: da39a3ee5e6b4b0d3255bfef95601890afd80709
	New SHA1: b570fbdf7d6ad1d1e95ef57b74877926e2cdf196



Generic Diff example alert::

	** Alert 1486811190.88243: - ossec,syscheck,agentless,pci_dss_11.5,pci_dss_10.6.1,
	2017 Feb 11 03:06:30 ubuntu->(ssh_generic_diff) root@192.168.1.3->agentless
	Rule: 555 (level 7) -> 'Integrity checksum for agentless device changed.'
	ossec: agentless: Change detected:
	3c3
	< drwxr-xr-x. 77 root root    8192 Feb 27 10:44 .
	---
	> drwxr-xr-x. 77 root root    8192 Feb 27 10:47 .
	176a177
	> -rw-r--r--.  1 root root       0 Feb 27 10:47 test
