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

Vuls (VULnerability Scanner) is a tool create to perform vulnerability analysis in your Linux systems automatically, looking for known vulnerabilities that affect to your software
in databases such as NVD (National Vulnerability Database).

The integration of this tool in Wazuh is made through the new `Command wodle` which allows you to run the necessary scripts for scheduling vulnerability scans in agents periodically, reporting the results
to the manager and triggering alerts in case of any vulnerability affects the scanned software.

You can see below an example where reporting a found vulnerability.

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

You can read more about this integration in the :doc:`Vuls integration section <../user-manual/capabilities/vuls>`.

CIS-CAT Wazuh module to scan CIS policies
-----------------------------------------

Another integration in form of Wazuh module has been developed for evaluating CIS benchmarks into Wazuh agents. This module allows agents to be compliance with
CIS policies and apply best security practices in your IT systems.

With the CIS-CAT wodle you are able to run assessments periodically, sending reports to manager and displaying results for each check as well as a report overview as you can see below.

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

For now, it is focused to Linux systems. However, it will be available for Windows agents in future versions.

In our dedicated section for :doc:`CIS-CAT integration<../user-manual/capabilities/policy-monitoring/ciscat/ciscat>` you can find more useful information about this new module.

New "Command" Wazuh module
--------------------------

It has been included a new Wazuh module for running commands asynchronously. Among its capabilities, it allows you to specify an interval for running the certain command, as well as an option
to ignore the output of it.

The complete configuration guide for this command can be found at :doc:`Command wodle configuration <../user-manual/reference/ossec-conf/wodle-command>`.

New rotation capabilities for alerts
------------------------------------

In large enviroments, the alerts file may take up a vast amount of disk space in managers. That is why Wazuh 3.1 includes support to rotate the following files by time or size:

- Alerts (plain-text and JSON).
- Archives (plain-text and JSON).
- Firewall events (plain-text).

So far, alert files were rotated once a day. Now, you have the possibility of rotate them setting the rotation interval (maximum one day), or specifying a maximum file size to trigger the rotation procedure.
Rotate files are compresses and signed, storing them as before.

In the ``<global>`` section of the :doc:`Local configuration <../user-manual/reference/ossec-conf/global>` can be found how to configure this feature.

Wazuh API
---------

The Wazuh API has been enhanced with new requests like the described below:

- New request for getting agent information by agent name.
- Request to purge `never connected` or `disconnected` agents more than a defined timeframe.
- New request to get purgeable agents.

In addition, more new features could be found in the `API changelog <https://github.com/wazuh/wazuh-api/blob/3.1/CHANGELOG.md>`_.

Ruleset
--------

The Ruleset has been improved along with the other components, including the necessary rules for the CIS-CAT and VULS integrations.

For getting more details about the included changes in the Ruleset you can visit its own `Ruleset changelog <https://github.com/wazuh/wazuh-ruleset/blob/3.1/CHANGELOG.md>`_.


More relevant features
----------------------

Additional features have been added to Wazuh 3.1.0 in order to improve its performance. Most relevant of them are the following:

- New field in JSON alerts including timestamp from predecoded logs.
- Possibility of refusing shared configuration in agents locally.
- Stop related daemon when disabling components in ossec-control.
- Let Syscheck report file changes on first scan.
- Fixed reported bugs.
