.. Copyright (C) 2018 Wazuh, Inc.

.. _ciscat_module:

CIS-CAT integration
===================

.. versionadded:: 3.1.0

The **CIS-CAT wodle** has been developed for the purpose of integrating CIS benchmark assessments into Wazuh agents.

- `What is CIS-CAT`_
- `How it works`_
- `Use case: Running a CIS evaluation`_
- `Use case: Scheduling CIS-CAT executions`_

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

  1.1 If you are using a UNIX environment:

  .. code-block:: xml

    <wodle name="cis-cat">

      <disabled>no</disabled>
      <timeout>1800</timeout>
      <interval>1d</interval>
      <scan-on-start>yes</scan-on-start>

      <java_path>/usr/lib/jvm/java-1.8.0-openjdk-amd64/jre/bin</java_path>
      <ciscat_path>wodles/ciscat</ciscat_path>

      <content type="xccdf" path="benchmarks/CIS_Ubuntu_Linux_16.04_LTS_Benchmark_v1.0.0-xccdf.xml">
        <profile>xccdf_org.cisecurity.benchmarks_profile_Level_2_-_Server</profile>
      </content>

    </wodle>


  1.2 If you are using a Windows environment:

  .. code-block:: xml

    <wodle name="cis-cat">
      <disabled>no</disabled>
      <timeout>1800</timeout>
      <interval>1d</interval>
      <scan-on-start>yes</scan-on-start>

      <java_path>\\server\jre\bin</java_path>
      <ciscat_path>C:\cis-cat</ciscat_path>

      <content type="xccdf" path="benchmarks\your_windows_benchmark_file_xccdf.xml">
        <profile>xccdf_org.cisecurity.benchmarks_profile_Level_2_-_Server</profile>
      </content>

    </wodle>

  Make sure the paths are correct for the location of your Java and the CIS-CAT tool. For both cases, you could specify the full path, or a relative path to the Wazuh installation folder. Also, consider the following tips when configuring the ``content`` section:

  - The location of the selected benchmark file have to be indicated by the full path, or by a relative path to the CIS-CAT installation folder.
  - If no profile is specified, the first one, which is usually the most permissive, will be selected.

2. After restarting the Wazuh agent, the benchmark checks will be executed at the specified interval, triggering alerts as shown below.

Information about the executed scan and report overview
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: console

   ** Alert 1518119251.42536: - ciscat,
   2018 Feb 08 11:47:31 ubuntu->wodle_cis-cat
   Rule: 87411 (level 5) -> 'CIS-CAT Report overview: Score less than 80% (53%)'
   {"type":"scan_info","scan_id":1701467600,"cis":{"benchmark":"CIS Ubuntu Linux 16.04 LTS Benchmark","profile":"xccdf_org.cisecurity.benchmarks_profile_Level_2_-_Server","hostname":"ubuntu","timestamp":"2018-02-08T11:47:28.066-08:00","pass":98,"fail":85,"error":0,"unknown":1,"notchecked":36,"score":"53%"}}
   type: scan_info
   scan_id: 1701467600
   cis.benchmark: CIS Ubuntu Linux 16.04 LTS Benchmark
   cis.profile: xccdf_org.cisecurity.benchmarks_profile_Level_2_-_Server
   cis.hostname: ubuntu
   cis.timestamp: 2018-02-08T11:47:28.066-08:00
   cis.pass: 98
   cis.fail: 85
   cis.error: 0
   cis.unknown: 1
   cis.notchecked: 36
   cis.score: 53%

Since Wazuh v3.5.0, the report summary is stored in the agents DB with the purpose to query it by the API. This allows to know about the last scan every time the user wants to.

Information about a specific result
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: console

   ** Alert 1518119251.125999: - ciscat,
   2018 Feb 08 11:47:31 ubuntu->wodle_cis-cat
   Rule: 87409 (level 7) -> 'CIS-CAT: Ensure login and logout events are collected (failed)'
   {"type":"scan_result","scan_id":1701467600,"cis":{"rule_id":"4.1.8","rule_title":"Ensure login and logout events are collected","group":"Logging and Auditing","description":"Monitor login and logout events. The parameters below track changes to files associated with login/logout events. The file /var/log/faillog tracks failed events from login. The file /var/log/lastlog maintain records of the last time a user successfully logged in. The file /var/log/tallylog maintains records of failures via the pam_tally2 module","rationale":"Monitoring login/logout events could provide a system administrator with information associated with brute force attacks against user logins.","remediation":"Add the following lines to the /etc/audit/audit.rules file: -w /var/log/faillog -p wa -k logins-w /var/log/lastlog -p wa -k logins-w /var/log/tallylog -p wa -k logins","result":"fail"}}
   type: scan_result
   scan_id: 1701467600
   cis.rule_id: 4.1.8
   cis.rule_title: Ensure login and logout events are collected
   cis.group: Logging and Auditing
   cis.description: Monitor login and logout events. The parameters below track changes to files associated with login/logout events. The file /var/log/faillog tracks failed events from login. The file /var/log/lastlog maintain records of the last time a user successfully logged in. The file /var/log/tallylog maintains records of failures via the pam_tally2 module
   cis.rationale: Monitoring login/logout events could provide a system administrator with information associated with brute force attacks against user logins.
   cis.remediation: Add the following lines to the /etc/audit/audit.rules file: -w /var/log/faillog -p wa -k logins-w /var/log/lastlog -p wa -k logins-w /var/log/tallylog -p wa -k logins
   cis.result: fail

Use case: Scheduling CIS-CAT executions
---------------------------------------

.. versionadded:: 3.5.0

New scheduling options have been added for the CIS-CAT module which allows the user to decide when to launch CIS scans in every agent.

As it is described in the :doc:`CIS-CAT section <../../../reference/ossec-conf/wodle-ciscat>` of the reference documentation, there are available some new options that we could mix to reach the desired behavior.

The following sample blocks of the wodle configuration show the new possibilities to schedule when the module is launched. All of these options are independent to the ``scan-on-start`` option, which runs the scan
always when the service is started.

Scheduling executions by an interval since the start of the service
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: xml

  <!-- Every 5 minutes from start -->
  <interval>5m</interval>

Scheduling executions by time of day
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: xml

  <!-- 18:00 every day -->
  <time>18:00</time>

.. code-block:: xml

  <!-- 5:00 every four days -->
  <time>5:00</time>
  <interval>4d</interval>

Scheduling executions by day of the week
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: xml

  <!-- 00:00 every monday -->
  <wday>monday</wday>

.. code-block:: xml

  <!-- 18:00 every monday -->
  <wday>monday</monday>
  <time>18:00</time>

.. code-block:: xml

  <!-- 18:00 every monday with three weeks of frequency -->
  <wday>monday</monday>
  <time>18:00</time>
  <interval>3w</interval>

Scheduling executions by day of the month
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: xml

  <!-- 00:00 every 20th of the month -->
  <day>20</day>

.. code-block:: xml

  <!-- 18:00 every 20th of the month -->
  <day>20</day>
  <time>18:00</time>

.. code-block:: xml

  <!-- 18:00,  20th every two months-->
  <day>20</day>
  <time>18:00</time>
  <interval>2M</interval>
