.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: 

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
~~~~~~~~~~~~~~~~~~~~~~

Trigger the alert by launching the Notepad application on the Windows endpoint. 

Visualize the alerts
~~~~~~~~~~~~~~~~~~~~

Go to **Modules > Security events** tab on the Wazuh dashboard to visualize the generated alerts when the monitored command runs.      

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

