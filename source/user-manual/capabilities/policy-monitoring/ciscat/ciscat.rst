.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The CIS-CAT wodle has been developed in order to integrate CIS benchmark assessments into Wazuh agents. Learn more about it. 

.. _ciscat_module:

CIS-CAT integration
===================

The **CIS-CAT wodle** has been developed for the purpose of integrating CIS benchmark assessments into Wazuh agents.

- `What is CIS-CAT`_
- `How it works`_
- `Use case: Running a CIS evaluation`_
- `Use case: Scheduling CIS-CAT executions`_

What is CIS-CAT
---------------

CIS (Center for Internet Security) is an entity dedicated to safeguarding private and public organizations against cyber threats. This entity provides CIS benchmarks guidelines, which are a recognized global standard and best practices for securing IT systems and data against cyberattacks.

In addition, CIS-CAT Pro is a "cross-platform Java app" tool developed for scanning target systems and generating a report comparing the system settings to the CIS benchmarks. There are more than 80 CIS benchmarks that cover nearly all OSs, providing different profiles depending on the specific need. CIS-CAT Pro includes `CIS-CAT Pro v3 <https://workbench.cisecurity.org/files/2255>`_ and `CIS-CAT Pro v4 <https://workbench.cisecurity.org/files/2151>`_. Now Wazuh supports both CIS-CAT Pro v3 and v4, see `Use case: Running a CIS evaluation`_ for more details.

How it works
------------

.. warning::
  This integration requires CIS-CAT Pro, which is proprietary software. You can learn more about this tool and how to download it at the `official CIS website <https://www.cisecurity.org/cybersecurity-tools/cis-cat-pro/>`_.

The CIS-CAT Wazuh module integrates CIS benchmark assessments into Wazuh agents and reports the results of each scan in the form of an alert.

CIS-CAT Pro is written in Java, so it requires a Java Runtime Environment in order to execute it. Currently, the JRE versions supported in CIS-CAT are JRE 6, 7, and 8. Follow these steps to install the OpenJDK platform:

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         # yum install java-1.8.0-openjdk

   .. group-tab:: APT

      .. code-block:: console

         # apt-get update && apt-get install openjdk-8-jre

   .. group-tab:: Windows
  
      1. Download the MSI-based installer of `OpenJDK 8 <https://developers.redhat.com/products/openjdk/download>`_ for your Windows architecture.
      
      2. Run the installer and follow the on-screen instructions to install OpenJDK 8.
      
      3. Set Environment Variables:
      
         - Go to Control Panel -> System and Security -> System -> Advanced system settings -> Environment Variables.
        
         - Under System Variables, create or edit ``JAVA_HOME`` variable and add the installation path of the JDK. Example: ``C:\Program Files\java-1.8.0``.
        
         - Apply changes.
        
         - Open up the Command Prompt and type ``java -version`` to check the newly installed version.


.. note::
  If version 8 of the Java Runtime Environment is not available for your operating system, use version 7 or 6 instead.

For running this integration, the CIS-CAT tool must reside on the local agent that runs the scans. However, the JRE can be located on a removable disk or network drive for the purpose of sharing between multiple agents.

In addition, in Unix systems, the CIS-CAT script may need to be granted execute permissions. To do this, run the following command from the CIS-CAT Pro v3 directory:

.. code-block:: console

    # chmod +x CIS-CAT.sh

or run the following command from the CIS-CAT Pro v4 directory:

.. code-block:: console

    # chmod +x Assessor-CLI.sh

Once you have the requirements for running CIS evaluations, you can configure the wodle to check for specific benchmarks at your chosen interval. The scan results from these checks are sent to the manager and can be included in the visualizations.

Use case: Running a CIS evaluation
----------------------------------

The following is an example of how to deploy the CIS-CAT integration:

.. note::
   You can choose CIS-CAT v3 (``CIS-CAT.sh`` on a UNIX environment or ``CIS-CAT.BAT`` on a Windows environment) or v4 (``Assessor-CLI.sh`` on a UNIX environment or ``Assessor-CLI.bat`` on a Windows environment) according to the ``ciscat_binary`` configuration. If you don't set the ``ciscat_binary`` configuration, Wazuh will choose CIS-CAT v3 by default.

1. In the configuration file, ``ossec.conf``, set up a section as follows:

    1.1 If you are using a UNIX environment:
        1.1.1 If you are using a UNIX environment with CIS-CAT Pro v3:

        .. code-block:: xml

          <wodle name="cis-cat">

            <disabled>no</disabled>
            <timeout>1800</timeout>
            <interval>1d</interval>
            <scan-on-start>yes</scan-on-start>

            <java_path>/usr/lib/jvm/java-1.8.0-openjdk-amd64/jre/bin</java_path>
            <ciscat_path>wodles/ciscat</ciscat_path>
            <ciscat_binary>CIS-CAT.sh</ciscat_binary>

            <content type="xccdf" path="benchmarks/CIS_Ubuntu_Linux_16.04_LTS_Benchmark_v1.0.0-xccdf.xml">
               <profile>xccdf_org.cisecurity.benchmarks_profile_Level_2_-_Server</profile>
            </content>

          </wodle>

        1.1.2 If you are using a UNIX environment with CIS-CAT Pro v4:

        .. code-block:: xml

          <wodle name="cis-cat">

            <disabled>no</disabled>
            <timeout>1800</timeout>
            <interval>1d</interval>
            <scan-on-start>yes</scan-on-start>

            <java_path>/usr/lib/jvm/java-1.8.0-openjdk-amd64/jre/bin</java_path>
            <ciscat_path>wodles/ciscat</ciscat_path>
            <ciscat_binary>Assessor-CLI.sh</ciscat_binary>

            <content type="xccdf" path="benchmarks/CIS_Ubuntu_Linux_16.04_LTS_Benchmark_v1.0.0-xccdf.xml">
               <profile>"Level 2 - Server"</profile>
            </content>

          </wodle>

    1.2 If you are using a Windows environment:
        1.2.1 If you are using a Windows environment with CIS-CAT Pro v3:

        .. code-block:: xml

          <wodle name="cis-cat">
            <disabled>no</disabled>
            <timeout>1800</timeout>
            <interval>1d</interval>
            <scan-on-start>yes</scan-on-start>

            <java_path>\\server\jre\bin</java_path>
            <ciscat_path>C:\cis-cat</ciscat_path>
            <ciscat_binary>CIS-CAT.BAT</ciscat_binary>

            <content type="xccdf" path="benchmarks\your_windows_benchmark_file_xccdf.xml">
               <profile>xccdf_org.cisecurity.benchmarks_profile_Level_2_-_Server</profile>
            </content>

          </wodle>


        1.2.2 If you are using a Windows environment with CIS-CAT Pro v4:

        .. code-block:: xml

          <wodle name="cis-cat">
            <disabled>no</disabled>
            <timeout>1800</timeout>
            <interval>1d</interval>
            <scan-on-start>yes</scan-on-start>

            <java_path>\\server\jre\bin</java_path>
            <ciscat_path>C:\cis-cat</ciscat_path>
            <ciscat_binary>Assessor-CLI.bat</ciscat_binary>

            <content type="xccdf" path="benchmarks\your_windows_benchmark_file_xccdf.xml">
               <profile>"Level 2 - Server"</profile>
            </content>

          </wodle>

    Make sure the paths are correct for the location of your Java and the CIS-CAT tool. For both cases, you could specify the full path, or a relative path to the Wazuh installation folder. Also, consider the following tips when configuring the ``content`` section:

    - The location of the selected benchmark file has to be indicated by the full path or by a relative path to the CIS-CAT installation folder.
    - If no profile is specified, the first one, which is usually the most permissive, will be selected.

2. After restarting the Wazuh agent, the benchmark checks will be executed at the specified interval, triggering alerts as shown below.

Information about the executed scan and report overview
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: none
   :class: output

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

Since Wazuh v3.5.0, the report summary is stored in the agent DB to query it by the Wazuh API. This allows knowing about the last scan every time the user wants to.

Information about a specific result
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: none
   :class: output

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

New scheduling options have been added for the CIS-CAT module which allows the user to decide when to launch CIS scans in every agent.

As it is described in the :doc:`CIS-CAT section <../../../reference/ossec-conf/wodle-ciscat>` of the reference documentation, there are available some new options that we could mix to reach the desired behavior.

The following sample blocks of the wodle configuration show the new possibilities to schedule when the module is launched. All of these options are independent of the ``scan-on-start`` option, which runs the scan
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
  <wday>monday</wday>
  <time>18:00</time>

.. code-block:: xml

  <!-- 18:00 every monday with three weeks of frequency -->
  <wday>monday</wday>
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
