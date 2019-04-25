.. Copyright (C) 2019 Wazuh, Inc.

.. _release_3_1_0:

3.1.0 Release Notes
===================

This section shows the most relevant new features of Wazuh v3.1.0. You will find more detailed information in our `changelog <https://github.com/wazuh/wazuh/blob/3.1/CHANGELOG.md>`_ file.

**New features:**

- `VULS integration`_
- `CIS-CAT Wazuh module to scan CIS policies`_
- `New "Command" Wazuh module`_
- `New rotation capabilities for alerts`_
- `Wazuh API`_
- `Ruleset`_
- `More relevant features`_

VULS integration
----------------

Vuls (VULnerability Scanner) is a tool that was created for analyzing the vulnerability of Linux systems. This tool looks for known vulnerabilities referenced in databases such as the National Vulnerability Database (NVD).

This integration is achieved through the use of the new `Command wodle`.  This module allows you to run a command at a specified interval or to ignore the output of the command.  The Vuls script is designed run Vuls on the agent and send results directly back to the manager and triggering alerts when a vulnerability is identified.

Below is an example of results where a vulnerability is identified:

.. code-block:: console
   :emphasize-lines: 3

   ** Alert 1513880084.806869: - vuls,
   2017 Dec 21 18:14:44 ip-172-31-42-67->Wazuh-VULS
   Rule: 22405 (level 10) -> 'High vulnerability CVE-2017-16649 detected in scanning launched on 2017-12-21 18:14:36 with 100% reliability (OvalMatch). Score: 7.200000 (National Vulnerability Database). Affected packages: linux-aws (Not fixable)'
   {"KernelVersion": "4.4.0-1044-aws", "Source": "National Vulnerability Database", "LastModified": "2017-11-28 14:05:55", "AffectedPackagesInfo": {"linux-aws": {"Repository": "", "NewVersion": "", "Version": "4.4.0-1044.53", "NewRelease": "", "Release": "", "Fixable": "No", "Arch": ""}}, "integration": "vuls", "ScannedCVE": "CVE-2017-16649", "AffectedPackages": "linux-aws (Not fixable)", "DetectionMethod": "OvalMatch", "Score": 7.2, "Link": "https://nvd.nist.gov/vuln/detail/CVE-2017-16649", "OSversion": "ubuntu 16.04", "Assurance": "100%", "ScanDate": "2017-12-21 18:14:36"}
   KernelVersion: 4.4.0-1044-aws
   Source: National Vulnerability Database
   LastModified: 2017-11-28 14:05:55
   AffectedPackagesInfo.linux-aws.Repository: Update
   AffectedPackagesInfo.linux-aws.NewVersion:
   AffectedPackagesInfo.linux-aws.Version: 4.4.0-1044.53
   AffectedPackagesInfo.linux-aws.NewRelease:
   AffectedPackagesInfo.linux-aws.Release:
   AffectedPackagesInfo.linux-aws.Fixable: No
   AffectedPackagesInfo.linux-aws.Arch:
   integration: vuls
   ScannedCVE: CVE-2017-16649
   AffectedPackages: linux-aws (Not fixable)
   DetectionMethod: OvalMatch
   Score: 7.200000
   Link: https://nvd.nist.gov/vuln/detail/CVE-2017-16649
   OSversion: ubuntu 16.04
   Assurance: 100%
   ScanDate: 2017-12-21 18:14:36

CIS-CAT Wazuh module to scan CIS policies
-----------------------------------------

The new CIS-CAT module was developed for evaluating CIS benchmarks in Wazuh agents. This module assesses an agent's compliance with CIS policies to ensure the application of the best practices in in the security of your IT systems.

With the CIS-CAT wodle assessments can be scheduled to run periodically, sending reports to the manager and displaying results for each check.  A report overview is also displayed as in the example below:

.. code-block:: console
   :emphasize-lines: 3

   ** Alert 1513886205.7639319: - ciscat,
   2017 Dec 21 11:56:45 ubuntu->wodle_cis-cat
   Rule: 87411 (level 5) -> 'CIS-CAT Report overview: Score less than 80 % (53 %)'
   {"type":"scan_info","scan_id":1222716123,"cis-data":{"benchmark":"CIS Ubuntu Linux 16.04 LTS Benchmark","hostname":"ubuntu","timestamp":"2017-12-21T11:55:50.143-08:00","score":53}}
   type: scan_info
   scan_id: 1222716123
   cis-data.benchmark: CIS Ubuntu Linux 16.04 LTS Benchmark
   cis-data.hostname: ubuntu
   cis-data.timestamp: 2017-12-21T11:55:50.143-08:00
   cis-data.score: 53

Currently, this module is focused only on Linux systems, however, this will also be available for Windows systems in future versions.

You will find further information about this new module in the :doc:`CIS-CAT integration<../user-manual/capabilities/policy-monitoring/ciscat/ciscat>` section.

New "Command" Wazuh module
--------------------------

The new `Command wodle` has been included in this version to allow commands to be run asynchronously. This module allows commands to be run at specified intervals and includes an option to ignore the output.

The complete configuration guide for this command can be found at :doc:`Command wodle configuration <../user-manual/reference/ossec-conf/wodle-command>`.

New rotation capabilities for alerts
------------------------------------

In large environments, the alerts file may take up a large amount of disk space. To address this, Wazuh 3.1 includes support for rotating the following files by time or size:

- alerts (plain-text and JSON),
- archives (plain-text and JSON), and
- firewall events (plain-text).

Until this release, alert files were rotated once a day. With this release, you now have the ability to set a more frequent rotation interval (maximum one day) and specify a maximum file size that will trigger the rotation procedure. Rotated files are compresses and signed and stored in the same way they were previously.

In the ``<global>`` section of the :doc:`Local configuration <../user-manual/reference/ossec-conf/global>` you will find information on how to configure this feature.

Wazuh API
---------

The Wazuh API has been enhanced with new requests, such as:

- a request for getting agent information by agent name,
- a request for purging `never connected` or `disconnected` agents after a defined time-frame, and
- a request for getting purgeable agents.

In addition, more new features can be found in the `API changelog <https://github.com/wazuh/wazuh-api/blob/3.1/CHANGELOG.md>`_.

Ruleset
--------

The Ruleset has been improved to include the necessary rules for the CIS-CAT and VULS integrations.

More information on changes to the Ruleset can be found on the `Ruleset changelog <https://github.com/wazuh/wazuh-ruleset/blob/3.1/CHANGELOG.md>`_.


More relevant features
----------------------

Additional features have been added to Wazuh 3.1.0 in order to improve its performance, including, but not limited to:

- a new field in JSON alerts including timestamp from predecoded logs,
- the ability to refuse shared configuration in agents locally using the ``agent.remote_conf`` option as explained in the :doc:`Internal configuration<../user-manual/reference/internal-options>` section,
- When ossec is used to disable a component, the relevant daemon is now immediately stopped,
- The Syscheck reporting_changes feature formerly suppressed inclusion of file change details in alerts if the changes were detected during the first Syscheck scan after an agent restarted.  Now, file changes will be included every time textual file change data is available, and
- fixes to reported bugs.
