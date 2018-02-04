.. _vuls:

Vuls integration
================

.. versionadded:: 3.1.0

The integration of the Vuls project with Wazuh allows for the scheduling of periodic vulnerability scans in both the manager and the agents. This new addition allows system administrators the ability to automate the process of analyzing their systems for security vulnerabilities using the updated Wazuh Ruleset to interpret the VuLs scan results.

- `What it is Vuls?`_
- `How it works?`_
- `How to configure Vuls scans`_
- `Use case`_


What it is Vuls?
-----------------

Vuls is a tool that was created to automate the process of analyzing installed software on Linux servers for known security vulnerabilities. This tool also looks to see whether any fixes have been published, what the impact of the vulnerability is along with  other relevant information.

How it works?
--------------

The agent (or manager) being monitored will launch Vuls scans at the interval specified in the configuration. This scan consists of the following steps:

1. The update of the vulnerability databases. Though this step is optional, it is highly recommended to ensure the quality of the analysis.
2. A scan of the server software.
3. An analysis of the server software using the vulnerability databases to look for known vulnerabilities.

After this, the agent will report to the manager any vulnerabilities found and these will be assessed using the Wazuh Ruleset, triggering alerts based on the severity of the reported vulnerabilities.

How to configure VuLs scans
---------------------------

First of all, you must deploy Vuls by running the deployment script (`/var/ossec/wodles/vuls/deploy_vuls.sh`) including the name of your operating system and version as parameters:

.. code-block:: console

    # /var/ossec/wodles/vuls/deploy_vuls.sh ubuntu 16

This script will install dependencies, download VULS, download CVE and OVAL databases, and configure VULS. This deployment supports the following operating systems:

+---------+-------------+
| Distro  | Versions    |
+=========+=============+
| Redhat  | 5, 6, 7     |
+---------+-------------+
| Centos  | 5, 6, 7     |
+---------+-------------+
| Ubuntu  | 12, 14, 16  |
+---------+-------------+
| Debian  | 7, 8, 9, 10 |
+---------+-------------+
| Oracle  | 5, 6, 7     |
+---------+-------------+

.. note::
    Your system requires 2 GB RAM or more to deploy VULS, though it may also be deployed on systems with 1 GB RAM and 1 GB SWAP memory.

To configure vulnerability scans you must add the following block to ``ossec. conf``:

.. code-block:: xml

    <wodle name="command">
      <tag>Wazuh-VULS</tag>
      <command>/usr/bin/python /var/ossec/wodles/vuls/vuls.py</command>
      <interval>1d</interval>
      <ignore_output>yes</ignore_output>
      <run_on_start>yes</run_on_start>
    </wodle>

The previous example would launch a simple VULS analysis every day. You can configure this analysis further by adding the following parameters to the script call:

+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| Parameter              | Description                                                                                                                                               |
+========================+===========================================================================================================================================================+
|                        | Sets the CVSS threshold for reporting vulnerabilities. Default value is 0.                                                                                |
+ **mincvss**            +-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                        | **Supported value** | A positive number.                                                                                                                  |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                        | Allows for the selection of the NVD or OVAL database of the system from which to extract information. By default, it takes the source with a higher score.|
+ **source**             +-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                        | **Supported value** | nvd, oval                                                                                                                           |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **updatenvd**          | Updates the NVD database.                                                                                                                                 |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                        | Indicates the year from which the NVD database will be downloaded if the ``updatenvd`` parameter is included. Default starts 10 years ago.                |
+ **nvd-year**           +-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                        | **Supported value** | A valid year.                                                                                                                       |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **updaterh**           | Updates Redhat OVAL database.                                                                                                                             |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **updateub***          | Updates Ubuntu OVAL database.                                                                                                                             |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **updatedeb**          | Updates Debian OVAL database.                                                                                                                             |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **updateorac**         | Updates Oracle OVAL database.                                                                                                                             |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                        | Indicates the OS version.  This is required when a parameter is used to update an OVAL database.                                                          |
+ **os-version**         +-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                        | **Supported value** | The operating system version.                                                                                                       |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **autoupdate**         | Detects the operating system, version, and updates its OVAL database.                                                                                     |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **onlyupdate**         | Updates only the script.                                                                                                                                  |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                        | Triggers an alert if the detected vulnerability has been updated in less than the specified time-frame.                                                   |
+ **antiquity-limit**    +-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                        | **Supported value** | Maximum number of days to trigger the vulnerability update alert.                                                                   |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|**disable-package-info**| Deactivates the reporting of detailed information on affected packages.                                                                                   |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **debug**              | Enables debug mode.                                                                                                                                       |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+

Use case
---------

The following use case shows how to configure a daily vulnerability scan.  In this example, only alerts that are level 5 or higher will be reported, unless its vulnerability has been updated within the last 20 days. This configuration example is also set to update the NVD (since 2016) and OVAL databases.

.. code-block:: xml

    <wodle name="command">
      <tag>Wazuh-VULS</tag>
      <command>/usr/bin/python /var/ossec/wodles/vuls/vuls.py --mincvss 5 --antiquity-limit 20 --updatenvd --nvd-year 2016 --autoupdate</command>
      <interval>1d</interval>
      <ignore_output>yes</ignore_output>
      <run_on_start>yes</run_on_start>
    </wodle>

Alert examples:

.. code-block:: console
   :emphasize-lines: 3

   ** Alert 1514822251.14842332: - vuls,
   2018 Jan 01 16:57:31 (ttes) any->Wazuh-VULS
   Rule: 22403 (level 5) -> 'Low vulnerability CVE-2017-16649 detected in scanning launched on c with 100% reliability (OvalMatch). Score: $(vuls.core) (Ubuntu OVAL). Affected packages: linux-image-4.4.0-87-generic (Not fixable)'
   {"vuls": {"last_modified": "0001-01-01 00:00:00", "detection_method": "OvalMatch", "kernel_version": "4.4.0-87-generic", "scan_date": "2018-01-01 07:57:27", "affected_packages": "linux-image-4.4.0-87-generic (Not fixable)", "integration": "vuls", "os_version": "ubuntu 16.04", "score": 3.99, "link": "http://people.ubuntu.com/~ubuntu-security/cve/CVE-2017-16649", "source": "Ubuntu OVAL", "scanned_cve": "CVE-2017-16649", "tittle": "CVE-2017-16649 on Ubuntu 16.04 LTS (xenial) - low.", "assurance": "100%", "affected_packages_info": {"linux-image-4.4.0-87-generic": {"fixable": "No", "version": "4.4.0-87.110"}}}}
   vuls.last_modified: 0001-01-01 00:00:00
   vuls.detection_method: OvalMatch
   vuls.kernel_version: 4.4.0-87-generic
   vuls.scan_date: 2018-01-01 07:57:27
   vuls.affected_packages: linux-image-4.4.0-87-generic (Not fixable)
   vuls.integration: vuls
   vuls.os_version: ubuntu 16.04
   vuls.score: 3.990000
   vuls.link: http://people.ubuntu.com/~ubuntu-security/cve/CVE-2017-16649
   vuls.source: Ubuntu OVAL
   vuls.scanned_cve: CVE-2017-16649
   vuls.tittle: CVE-2017-16649 on Ubuntu 16.04 LTS (xenial) - low.
   vuls.assurance: 100%
   vuls.affected_packages_info.linux-image-4.4.0-87-generic.fixable: No
   vuls.affected_packages_info.linux-image-4.4.0-87-generic.version: 4.4.0-87.110

.. code-block:: console
   :emphasize-lines: 3

   ** Alert 1514818543.694640: - vuls,
   2018 Jan 01 15:55:43 (agent) any->Wazuh-VULS
   Rule: 22402 (level 7) -> 'CVE-2017-1000410 has a update date lower than 20 days.'
   {"vuls": {"last_modified": "2017-12-24 21:29:12", "detection_method": "OvalMatch", "ke$
   vuls.last_modified: 2017-12-24 21:29:12
   vuls.detection_method: OvalMatch
   vuls.kernel_version: 4.4.0-87-generic
   vuls.scan_date: 2018-01-01 06:55:41
   vuls.days: 20
   vuls.integration: vuls
   vuls.os_version: ubuntu 16.04
   vuls.score: 5
   vuls.link: https://nvd.nist.gov/vuln/detail/CVE-2017-1000410
   vuls.source: National Vulnerability Database
   vuls.scanned_cve: CVE-2017-1000410
   vuls.tittle: CVE-2017-1000410
   vuls.event: CVE-2017-1000410 has a update date lower than 20 days.
   vuls.assurance: 100%


Centralized configuration
-------------------------

The Vuls tool can be specified in the :ref:`centralized configuration <reference_agent_conf>` as follows:

.. code-block:: xml

    <agent_config>
      <wodle name="command">
        <tag>Wazuh-VULS</tag>
        <command>/usr/bin/python /var/ossec/wodles/vuls/vuls.py --mincvss 5 --antiquity-limit 20 --updatenvd --nvd-year 2016 --autoupdate</command>
        <interval>1d</interval>
        <ignore_output>yes</ignore_output>
        <run_on_start>yes</run_on_start>
      </wodle>
    </agent_config>

When setting up Vuls in a shared agent configuration, **you must enable remote commands for Agent Modules**.

This is enabled by adding the following line to the file *etc/local_internal_options.conf* in the agent:

.. code-block:: shell

    wazuh_command.remote_commands=1
