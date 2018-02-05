.. _ciscat_module:


CIS-CAT integration
===================

.. versionadded:: 3.1.0

The **CIS-CAT wodle** has been developed for the purpose of integrating CIS benchmark assessments into Wazuh agents.

- `What is CIS-CAT`_
- `How it works`_
- `Use case: Running a CIS evaluation`_

What is CIS-CAT
---------------

CIS (Center for Internet Security) is an entity dedicated to safeguard private and public organizations against cyber threats. This entity provides
CIS benchmarks guidelines, which are a recognized global standard and best practices for securing IT systems and data against cyberattacks.

In addition, CIS-CAT pro is a "cross-platform Java app" tool developed for scanning target systems and generating a report comparing the system settings to
the CIS benchmarks. There are more than 80 CIS benchmarks that cover nearly all OSs, providing different profiles depending on the specific need.

It is important to note that CIS-CAT pro is proprietary software which is required for the use of this integration.

How it works
------------

The CIS-CAT Wazuh module integrates CIS benchmark assessments into Wazuh agents and reports the results of each scan in the form of an alert.

CIS-CAT pro is written in Java, so it requires a Java Runtime Environment in order to execute it. Currently, the JRE versions supported in
CIS-CAT are JRE 6, 7, 8.

For running this integration, the CIS-CAT tool must reside on the local agent that runs the scans. However, the JRE can be located on
a removable disk or network drive for the purpose of sharing between multiple agents.

In addition, in Unix systems, the CIS-CAT script may need to be granted execute permissions. To do this, run the following command from the CIS-CAT directory:

.. code-block:: console

    # chmod +x CIS-CAT.sh

Once you have the requirements for running CIS evaluations, you can configure the wodle to check for specific benchmarks at a your chosen interval. The scan results from these checks are sent to the manager and can be included in the visualizations.

Use case: Running a CIS evaluation
----------------------------------

The following is an example of how to deploy the CIS-CAT integration:

1. In the configuration file, ``ossec.conf``, set up a section as follows:

.. code-block:: xml

  <wodle name="cis-cat">

    <disabled>no</disabled>
    <timeout>1800</timeout>
    <interval>1d</interval>
    <scan-on-start>yes</scan-on-start>

    <java_path>/usr/lib/jvm/java-1.8.0-openjdk-amd64/jre/bin</java_path>
    <ciscat_path>/var/ossec/wodles/ciscat</ciscat_path>

    <content type="xccdf" path="benchmarks/CIS_Ubuntu_Linux_16.04_LTS_Benchmark_v1.0.0-xccdf.xml">
      <profile>xccdf_org.cisecurity.benchmarks_profile_Level_2_-_Server</profile>
    </content>

  </wodle>

.. note::
    Make sure the paths are correct for the location of your Java and the CIS-CAT tool and the path to the selected benchmark is relative to the CIS-CAT tool path.

    If no profile is specified, the first one, which is usually the most permissive, will be selected.

2. After restarting the Wazuh agent, the benchmark checks will be executed at the specified interval, triggering alerts as shown below.

Information about the executed scan
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: console

   ** Alert 1513855072.2400: - ciscat,
   2017 Dec 21 03:17:52 ubuntu->wodle_cis-cat
   Rule: 87402 (level 3) -> 'CIS-CAT: assessment information for scan 75459013'
   {"type":"scan_info","scan_id":75459013,"cis-data":{"benchmark":"CIS Ubuntu Linux 16.04 LTS Benchmark","hostname":"ubuntu","timestamp":"2017-12-21T03:16:54.431-08:00","score":53}}
   type: scan_info
   scan_id: 75459013
   cis-data.benchmark: CIS Ubuntu Linux 16.04 LTS Benchmark
   cis-data.hostname: ubuntu
   cis-data.timestamp: 2017-12-21T03:16:54.431-08:00
   cis-data.score: 53

Information about the report overview
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: console

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


Information about a specific result
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: console

   ** Alert 1513855072.92242: - ciscat,
   2017 Dec 21 03:17:52 ubuntu->wodle_cis-cat
   Rule: 87409 (level 7) -> 'CIS-CAT: Monitor login and logout events. The parameters below track changes to files associated with login/logout events. The file /var/log/faillog tracks failed events from login. The file /var/log/lastlog maintain records of the last time a user successfully logged in. The file /var/log/tallylog maintains records of failures via the pam_tally2 module (not passed)'
   {"type":"scan_result","scan_id":75459013,"cis-data":{"rule_id":"4.1.8","rule_title":"Ensure login and logout events are collected","group":"Initial Setup","description":"Monitor login and logout events. The parameters below track changes to files associated with login/logout events. The file /var/log/faillog tracks failed events from login. The file /var/log/lastlog maintain records of the last time a user successfully logged in. The file /var/log/tallylog maintains records of failures via the pam_tally2 module","rationale":"Monitoring login/logout events could provide a system administrator with information associated with brute force attacks against user logins.","remediation":"Add the following lines to the /etc/audit/audit.rules file: -w /var/log/faillog -p wa -k logins-w /var/log/lastlog -p wa -k logins-w /var/log/tallylog -p wa -k logins","result":"fail"}}
   type: scan_result
   scan_id: 75459013
   cis-data.rule_id: 4.1.8
   cis-data.rule_title: Ensure login and logout events are collected
   cis-data.group: Initial Setup
   cis-data.description: Monitor login and logout events. The parameters below track changes to files associated with login/logout events. The file /var/log/faillog tracks failed events from login. The file /var/log/lastlog maintain records of the last time a user successfully logged in. The file /var/log/tallylog maintains records of failures via the pam_tally2 module
   cis-data.rationale: Monitoring login/logout events could provide a system administrator with information associated with brute force attacks against user logins.
   cis-data.remediation: Add the following lines to the /etc/audit/audit.rules file: -w /var/log/faillog -p wa -k logins-w /var/log/lastlog -p wa -k logins-w /var/log/tallylog -p wa -k logins
   cis-data.result: fail
