.. _vuls:

Vuls integration
=================

.. versionadded:: 3.1.0

The integration of Vuls project with Wazuh allows you to launch periodic vulnerability scan both in manager and agents. This avoids system administrators the task of daily analysis in search of vulnerable packages, being able to automate both this process and interpretation of vulnerabilities using Wazuh Ruleset.

- `What it is Vuls?`_
- `How it works?`_
- `How to configure it`_
- `Use case`_


What it is Vuls?
-----------------

Vuls is a tool created to automate the process of checking whether software installed on servers is being affected by a known vulnerability, whether any fixes have been published, their impact and others relevant information.

How it works?
--------------

The agent (or manager) being monitored will launch Vuls scans with the periodicity indicated in the configuration. This scan consists of the following steps:

1) Update of vulnerability databases. This step is optional but highly recommended to ensure the quality of the analysis.
2) Scan of the server software.
3) Check if the computer software is affected by any of the vulnerabilities of the databases.

After this, the agent will report to the manager the vulnerabilities found, and this will trigger alerts depending on the severity of the results.

How to configure it
-------------------

First of all, you must deploy Vuls. To do this, just run the deployment script (`/var/ossec/wodles/vuls/deploy_vuls.sh`) including the name of your operating system and version as parameters:

.. code-block:: console

    # /var/ossec/wodles/vuls/deploy_vuls.sh ubuntu 16

This script will install dependencies, download VULS, download CVE and OVAL databases, and configure VULS. The deployment supports the following operating systems:

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
    Your system requires 2 GB RAM or more to deploy VULS. 1 GB RAM and 1 GB SWAP memory is also enough.

To configure vulnerability scans you must add the following block to ``ossec. conf``:

.. code-block:: xml

    <wodle name="command">
      <tag>Wazuh-VULS</tag>
      <command>/usr/bin/python /var/ossec/wodles/vuls/vuls.py</command>
      <interval>1d</interval>
      <ignore_output>yes</ignore_output>
      <run_on_start>yes</run_on_start>
    </wodle>

The previous example would launch a simple VULS analysis every day. However, you can configure this analysis by adding the following parameters to the script call:

+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| Parameter              | Description                                                                                                                                               |
+========================+===========================================================================================================================================================+
|                        | Will not report vulnerabilities with a CVSS less than the indicated value. Default value is 0.                                                            |
+ **mincvss**            +-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                        | **Supported value** | A positive number.                                                                                                                  |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                        | Choose to extract information from the NVD or OVAL of system. By default, it will take the font that gives a higher score.                                |
+ **source**             +-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                        | **Supported value** | nvd, oval                                                                                                                           |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **updatenvd**          | Update NVD database.                                                                                                                                      |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                        | Indicates the year from which the NVD database will be downloaded if the ``updatenvd`` parameter is included. Default starts 10 years ago.                |
+ **nvd-year**           +-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                        | **Supported value** | A valid year.                                                                                                                       |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **updaterh**           | Update Redhat OVAL database.                                                                                                                              |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **updateub***          | Update Ubuntu OVAL database.                                                                                                                              |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **updatedeb**          | Update Debian OVAL database.                                                                                                                              |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **updateorac**         | Update Oracle OVAL database.                                                                                                                              |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                        | If a parameter is used to update an OVAL database, the OS version must be included with this parameter.                                                   |
+ **os-version**         +-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                        | **Supported value** | The operating system version.                                                                                                       |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **autoupdate**         | Detects the operating system, version, and updates its OVAL database.                                                                                     |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **onlyupdate**         | The script will only update.                                                                                                                              |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                        | It will trigger an alert if the detected vulnerability has been updated in less than the indicated days ago.                                              |
+ **antiquity-limit**    +-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|                        | **Supported value** | Maximum number of days to trigger the vulnerability update alert.                                                                   |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
|**disable-package-info**| Deactivates the reporting of detailed information on affected packages.                                                                                   |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **debug**              | Enables debug mode.                                                                                                                                       |
+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------+

Use case
---------

The following use case shows how to configure a daily vulnerability scan, which will not report alerts of level less than 5 unless its vulnerability has been updated within the last 20 days. We will also update the NVD (since 2016) and OVAL databases.

.. code-block:: xml

    <wodle name="command">
      <tag>Wazuh-VULS</tag>
      <command>/usr/bin/python /var/ossec/wodles/vuls/vuls.py --mincvss 5 --antiquity-limit 20 --updatenvd --nvd-year 2016 --autoupdate</command>
      <interval>1d</interval>
      <ignore_output>yes</ignore_output>
      <run_on_start>yes</run_on_start>
    </wodle>

Alerts examples:

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

Vuls may be specified in the :ref:`centralized configuration <reference_agent_conf>`:

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

When setting Vuls as shared agent configuration, **you must enable remote commands for Agent Modules**.
You can do it by adding the next line to the file *etc/local_internal_options.conf* in the agent:

.. code-block:: shell

    wazuh_command.remote_commands=1
