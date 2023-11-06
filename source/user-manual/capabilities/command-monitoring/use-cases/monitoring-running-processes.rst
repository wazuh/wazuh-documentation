.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Configure Wazuh agents to monitor processes on Windows, Linux, and macOS. Create custom rules for alerting if a given process is running or not.

Monitoring running processes
=============================

In this use case, we configure Wazuh agents to run commands locally to monitor running processes on Windows, Linux, and macOS endpoints. Then, we create custom rules on the Wazuh server to generate alerts when a particular process is running or not.

Monitoring running processes on Windows endpoint
------------------------------------------------

We configure the Command module to monitor running processes on the Windows endpoint and alert if the ``notepad.exe`` process is running.

Configuration
^^^^^^^^^^^^^

Windows endpoint
~~~~~~~~~~~~~~~~

Perform the following steps to configure the Command module to run a batch script on the Windows endpoint.

#. Create a batch script named ``tasklist.bat`` in the ``C:\`` directory of the Windows endpoint and add the following content. The script adds a ``tasklist`` header to the output of the ``tasklist`` command:

   .. code-block:: console

      @Echo Off
      setlocal enableDelayedExpansion
      
      for /f "delims=" %%a in ('powershell -command "& tasklist"') do (
          echo tasklist: %%a
      )
      
      exit /b

#. Append the following configuration to the Wazuh agent’s ``C:\Program Files (x86)\ossec-agent\ossec.conf`` file. The ``tasklist`` command lists running processes on Windows endpoints:

   .. code-block:: xml

      <ossec_config>
        <wodle name="command">
          <disabled>no</disabled>
          <tag>tasklist</tag>
          <command>PowerShell.exe C:\tasklist.bat</command>
          <interval>2m</interval>
          <run_on_start>yes</run_on_start>
          <timeout>10</timeout>
        </wodle>
      </ossec_config>

   Where:

   - The ``PowerShell.exe C:\tasklist.bat`` value in the ``<command>`` tag is the command to be executed by the Command module. As seen, the PowerShell executable is used to execute the ``C:\tasklist.bat`` script.

   - The value ``2m`` in the ``<interval>`` tag indicates that the Command module runs the command every 2 minutes.

#. Restart the Wazuh agent to apply the changes, using PowerShell with administrator privileges:

   .. code-block:: PowerShell

      > Restart-Service -Name wazuh

Wazuh server
~~~~~~~~~~~~

Configure the Wazuh server with a custom decoder and rule to analyze the events received from the Windows endpoint using the steps below.

#. Add the following decoder to the ``/var/ossec/etc/decoders/local_decoder.xml`` file:

   .. code-block:: xml

      <decoder name="tasklist">
        <prematch>^tasklist: </prematch>
      </decoder>

#. Add the rule below to the ``/var/ossec/etc/rules/local_rules.xml`` file to generate an alert when the ``notepad.exe`` process is running:

   .. code-block:: xml

      <group name="process_monitor,">
        <rule id="100010" level="6">
          <decoded_as>tasklist</decoded_as>
          <regex type="pcre2">(?i)notepad.exe</regex>
          <description>Notepad.exe is running.</description>
        </rule>
      </group>

#. Restart the Wazuh manager to apply the changes:

   .. code-block:: PowerShell

      $ sudo systemctl restart wazuh-manager

Test the configuration
^^^^^^^^^^^^^^^^^^^^^^

Trigger the alert by launching the Notepad application on the Windows endpoint. 

Visualize the alerts
^^^^^^^^^^^^^^^^^^^^

Go to **Threat Hunting** tab on the Wazuh dashboard to visualize the generated alerts when the monitored command runs.      

.. thumbnail:: /images/manual/command-monitoring/notepad-is-running-alert.png
  :title: Notepad is running alert
  :alt: Notepad is running alert
  :align: center
  :width: 100%

Monitoring running processes on Linux endpoint
----------------------------------------------

Linux endpoints run a number of processes by default including the Cron daemon. For this endpoint, we monitor the running processes using the Logcollector module and alert if the ``/usr/sbin/cron`` process is not running as expected. We use the ``ps`` command to get the status of active processes on the Linux endpoint.

Configuration
^^^^^^^^^^^^^

Perform the following steps on the respective endpoints to check if the Cron daemon is not running as expected.

Linux endpoint
~~~~~~~~~~~~~~

Configure this endpoint to monitor the status of the running processes every two minutes and forward its output to the Wazuh server for analysis.

#. Append the Logcollector module configuration below to the Wazuh agent ``/var/ossec/etc/ossec.conf`` file:

   .. code-block:: xml

      <ossec_config>
        <localfile>
          <log_format>full_command</log_format>
          <command>ps -auxw</command>
          <frequency>120</frequency>
        </localfile>
      </ossec_config>

   Where:

   - The ``full_command`` value in the ``<log_format>`` tag specifies the output of the command is read as a single event.

   - The value ``ps -auxw`` in the ``<command>`` tag specifies the command the Logcollector module executes.

   - The value ``120`` in the ``<frequency>`` tag specifies the command runs every 120 seconds (2 minutes).

#. Restart the Wazuh agent service to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent    

Wazuh server
~~~~~~~~~~~~

Configure the Wazuh server with custom rules to analyze the events received from the Linux endpoint using the steps below.

#. Add the rules below to the ``/var/ossec/etc/rules/local_rules.xml`` file. The rules generate an alert when the ``/usr/sbin/cron`` process is not running as expected:

   .. code-block:: xml

      <group name="process_monitor,">
        <rule id="100012" level="6">
          <if_sid>530</if_sid>
          <match>^ossec: output: 'ps -auxw'</match>
          <description>Cron process not running.</description>
        </rule>

        <rule id="100013" level="0">
          <if_sid>100012</if_sid>
          <match>/usr/sbin/cron</match>
          <description>Cron process is running as expected.</description>
        </rule>
      </group>

   The first rule with ID ``100012`` generates an alert ("``Cron process not running.``") unless it is overridden by its child rule with ID ``100013`` that matches ``/usr/sbin/cron`` in the command output. You can add as many child rules as needed to enumerate all of the important processes you want to monitor.

#. Restart the Wazuh manager to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-manager

Test the configuration
^^^^^^^^^^^^^^^^^^^^^^

Trigger the alert by stopping the Cron process on the Linux endpoint with the command below:

.. code-block:: console

   $ sudo systemctl stop cron

Visualize the alerts
^^^^^^^^^^^^^^^^^^^^

Go to **Threat Hunting** tab on the Wazuh dashboard to visualize the generated alert when the Cron process is not running.

.. thumbnail:: /images/manual/command-monitoring/cron-process-not-running-alert.png
  :title: Cron process is not running alert
  :alt: Cron process is not running alert
  :align: center
  :width: 100%

Monitoring running processes on macOS endpoint
----------------------------------------------

Monitoring running processes on macOS endpoints is similar to that of Linux endpoints. For this use case, we monitor if a particular process is running using the Logcollector module. Unlike the configuration for the Windows and Linux endpoints which filters the command output using rules, the configuration for this endpoint filters the command output using the configured command itself. This method reduces the command output result and streamlines rule creation. The configuration also introduces the ``alias`` attribute of the Logcollector module.

Configuration
^^^^^^^^^^^^^

macOS endpoint
~~~~~~~~~~~~~~

Perform the following steps to configure the Wazuh Logcollector module to check if the calendar application ``Calendar.app`` or ``calendar.app`` is running.

#. Append the following configuration to the Wazuh agent ``/Library/Ossec/etc/ossec.conf`` file:

   .. code-block:: xml

      <ossec_config>
        <localfile>
          <log_format>full_command</log_format>
          <command>ps auxw | grep -i [C]alendar.app</command>
          <alias>check_calendar_status</alias>
          <frequency>120</frequency>
        </localfile>
      </ossec_config>

   Where:

   - The ``full_command`` value in the ``<log_format>`` tag specifies the output of the command is read as a single event.

   - The value ``ps auxw | grep -i [C]alendar.app`` in the ``<command>`` tag is the command the Logcollector module executes to check the state of the Calendar application.

   - The value ``check_calendar_status`` in the ``<alias>`` tag is a string that represents the ``ps auxw | grep -i [C]alendar.app`` command for better identification.

   - The value ``120`` in the ``<frequency>`` tag specifies the command runs every 120 seconds (2 minutes).

#. Restart the Wazuh agent service to apply the changes:

   .. code-block:: console

      # /Library/Ossec/bin/wazuh-control restart

Wazuh server
~~~~~~~~~~~~

Configure the Wazuh server with a custom rule to analyze the Calendar application events received from the macOS endpoint using the steps below.

#. Add the following rules to the ``/var/ossec/etc/rules/local_rules.xml`` file on the Wazuh server. The rule only matches the string ``ossec: output: 'check_calendar_status'`` in the command output as only one log is generated from the Logcollector configuration specified above:

   .. code-block:: xml

      <group name="process_monitor,">
        <rule id="100013" level="6">
          <if_sid>530</if_sid>
          <match>^ossec: output: 'check_calendar_status'</match>
          <description>Calendar is running.</description>
        </rule>
      </group>

#. Restart the Wazuh manager to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-manager

Test the configuration
^^^^^^^^^^^^^^^^^^^^^^

Trigger the alert by launching the Calendar application on the macOS endpoint.

Visualize the alerts
^^^^^^^^^^^^^^^^^^^^

Go to **Threat Hunting** tab on the Wazuh dashboard to visualize the generated alert.

.. thumbnail:: /images/manual/command-monitoring/calendar-is-running-alert.png
  :title: Calendar is running alert
  :alt: Calendar is running alert
  :align: center
  :width: 100%