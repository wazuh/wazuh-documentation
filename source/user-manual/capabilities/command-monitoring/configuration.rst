.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Discover how to configure the modules responsible for running and monitoring commands, executables, and scripts on endpoints.

Configuration
=============

This section of the documentation shows how to configure the modules responsible for running and monitoring commands, executables, and scripts on endpoints. It also provides the different configuration files available and suitable for different use cases.

Modules
-------

Wazuh provides two modules for monitoring the output of system commands executed on an endpoint. The Command and the Logcollector modules periodically run and monitor commands or executables on Windows, Linux, and macOS endpoints.

Command module
^^^^^^^^^^^^^^

We recommend using the Command module to run and monitor endpoint commands. It provides the following capabilities:

- **Checksum verification**: It verifies and validates the integrity of every executed system binary or script by comparing predefined MD5, SHA1, and SHA256 hashes. This procedure ensures that the binary has not been altered or replaced.

- **Encrypted communication**: All messages exchanged between the Wazuh server and agents are encrypted using AES encryption. This implies that every command output from the Wazuh agents is sent securely to the  Wazuh server.

- **Scheduling execution**: The Command module is flexible and can be configured to run commands on endpoints as follows:

   - Immediately after the Wazuh agent starts.

   - At specific time intervals (:ref:`interval <wodle_command_interval>`).

   - On a particular day of the month (:ref:`day <wodle_command_day>`) represented by the day's number.

   - On a specific day of the week (:ref:`wday <wodle_command_wday>`) represented by the day’s name.

   - At a particular time (:ref:`time <wodle_command_time>`) of the day represented in the format hh:mm.

A standard command configuration block looks like this:

.. code-block:: xml

   <wodle name="command">
     <disabled>no</disabled>
     <tag>test</tag>
     <command>/bin/bash /root/script.sh</command>
     <interval>1d</interval>
     <ignore_output>no</ignore_output>
     <run_on_start>yes</run_on_start>
     <timeout>0</timeout>
     <verify_md5>11227b11f565de042c48654a241e9d1c</verify_md5>
     <verify_sha1>be705c5a89d7bf74185c86c5c3c562608f6e6478</verify_sha1>
     <verify_sha256>292a188e498caea5c5fbfb0beca413c980e7a5edf40d47cf70e1dbc33e4f395e</verify_sha256>
   </wodle>


+--------------------+---------------+--------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
| Options            | Default value | Allowed values                                   | Description                                                                                                                                                                                                                                                                                       | Note                                                                                                                                  |
+====================+===============+==================================================+===================================================================================================================================================================================================================================================================================================+=======================================================================================================================================+
| **Main options**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
+--------------------+---------------+--------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
| disabled           | no            | yes, no                                          | Disables the Command module when set to ``yes``.                                                                                                                                                                                                                                                  |                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
| tag                | no            | N/A                                              | Tags the command with a descriptive name in the command output. For example, ``test`` in the configuration block above will be present in the command output.                                                                                                                                     |                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
|command             |               | - A command                                      | Specifies the path to a command, binary, or script to be executed.                                                                                                                                                                                                                                |                                                                                                                                       |
|                    |               | - Path to a binary                               |                                                                                                                                                                                                                                                                                                   |                                                                                                                                       |
|                    |               | - Path to a script                               |                                                                                                                                                                                                                                                                                                   |                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
|ignore_output       | no            | yes, no                                          | Specifies whether the output of a command is ignored. When this option is set to ``yes``, the command output is not forwarded to the Wazuh server.                                                                                                                                                |                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
|timeout             | N/A           | A positive number                                | Specifies the time (in seconds) for each command to wait for the completion of its execution. When this option is set to ``0``, it will wait indefinitely for the end of the process. If the timeout is any value other than ``0``, then the execution will finish when the set value expires.    |                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
|verify_md5          | N/A           | MD5 checksum                                     | Verifies the MD5 sum of the binary or the script to be executed against this value. If the checksum does not match, the command output is ignored.                                                                                                                                                | Verifies only the first argument of the command option if you passed two or more arguments.                                           |
+--------------------+---------------+--------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
|verify_sha1         | N/A           | SHA1 checksum                                    | Verifies the SHA1 sum of the binary or the script to be executed against this value. If the checksum does not match, the command output is ignored.                                                                                                                                               | Verifies only the first argument of the command option if you passed two or more arguments.                                           |
+--------------------+---------------+--------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
|verify_sha256       | N/A           | SHA256 checksum                                  | Verifies the SHA256 sum of the binary or the script to be executed against this value. If the checksum does not match, the command output is ignored.                                                                                                                                             | Verifies only the first argument of the command option if you passed two or more arguments.                                           |
+--------------------+---------------+--------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
|skip_verification   | N/A           | yes, no                                          | Runs the command defined even if the checksum does not match. When set to yes and there is a verification failure, the agent will log that the checksum verification failed but will run the specified command regardless of the failure.                                                         |                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
| **Scheduling options**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
+--------------------+---------------+--------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
| run_on_start       | yes           | yes, no                                          | Runs the configured command immediately when the Wazuh service starts.                                                                                                                                                                                                                            |                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
| interval           | 2s            | A positive number that should contain a suffix   | Specifies how often a defined command executes.                                                                                                                                                                                                                                                   |                                                                                                                                       |
|                    |               | character indicating a time unit, such as,       |                                                                                                                                                                                                                                                                                                   |                                                                                                                                       |
|                    |               | s (seconds), m (minutes), h (hours), d (days)    |                                                                                                                                                                                                                                                                                                   |                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
| day                | N/A           | Day of the month [1..31]                         | Day of the month to run the command configured.                                                                                                                                                                                                                                                   | When the ``day`` option is set, the interval value must be a multiple of months. By default, the interval is set to a month.          |
+--------------------+---------------+--------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
| wday               | N/A           |                                                  | Day of the week to run the command configured. This option is not compatible with the ``day`` option.                                                                                                                                                                                             | When the ``wday`` option is set, the interval value must be a multiple of weeks. By default, the interval is set to a week.           |
|                    |               | - sunday/sun                                     |                                                                                                                                                                                                                                                                                                   |                                                                                                                                       |
|                    |               | - monday/mon                                     |                                                                                                                                                                                                                                                                                                   |                                                                                                                                       |
|                    |               | - tuesday/tue                                    |                                                                                                                                                                                                                                                                                                   |                                                                                                                                       |
|                    |               | - wednesday/wed                                  |                                                                                                                                                                                                                                                                                                   |                                                                                                                                       |
|                    |               | - thursday/thu                                   |                                                                                                                                                                                                                                                                                                   |                                                                                                                                       |
|                    |               | - friday/fri                                     |                                                                                                                                                                                                                                                                                                   |                                                                                                                                       |
|                    |               | - saturday/sat                                   |                                                                                                                                                                                                                                                                                                   |                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------+
| time               | N/A           | Time of day [hh:mm]                              | When only the ``time`` option is set, the interval value must be a multiple of days or weeks. By default, the interval is set to a day.                                                                                                                                                           |                                                                                                                                       |
+--------------------+---------------+--------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------+

How to configure the Command module
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Command module configuration consists of the command or script, the status of the command, the interval of execution of the command, and the checksum of the script.

To use the Wazuh command monitoring capability, you first need to configure the system to monitor the command's output. This can be a central configuration on the Wazuh server or locally on the endpoints. Once the command is configured, you can then create custom rulesets to process the output and trigger an alert.

For example, we use the Command module to monitor running processes on a Windows endpoint and alert if the ``notepad.exe`` process is running. Follow the steps below to configure the module.

#. Create a batch script named ``tasklist.bat`` in the ``C:\`` root directory of the Windows endpoint and add the following content. The script adds a ``tasklist`` header to the output of the ``tasklist`` command:

   .. code-block:: console

      @Echo Off
      setlocal enableDelayedExpansion
      
      for /f "delims=" %%a in ('powershell -command "& tasklist"') do (
          echo tasklist: %%a
      )
      
      exit /b
    
#. Add the following configuration to the Wazuh agent ``C:\Program Files (x86)\ossec-agent\ossec.conf`` file:

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

   - The ``PowerShell.exe C:\tasklist.bat`` value in the ``<command>`` tag is the command to be executed by the Command module. The PowerShell program executes the ``C:\tasklist.bat`` script.

   - The value ``2m`` in the ``<interval>`` tag indicates that the Command module runs the command every 2 minutes.

   .. note:: You can use the :ref:`centralized configuration file <command_monitoring_centralized_configuration>` to distribute this setting across multiple monitored endpoints.

#. Restart the Wazuh agent to apply the changes, using PowerShell with administrator privileges:

   .. code-block:: PowerShell

      > Restart-Service -Name wazuh

Custom ruleset
~~~~~~~~~~~~~~

Configure the Wazuh server with a custom decoder and rule to analyze the events received from the Windows endpoint by following the steps below.

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

   .. code-block:: console

      $ sudo systemctl restart wazuh-manager    

Visit the Wazuh dashboard and navigate to the **Modules > Security events** tab to visualize the generated alert as shown below.

.. thumbnail:: /images/manual/command-monitoring/notepad-execution-alert.png
  :title: Notepad execution alert
  :alt: Notepad execution alert
  :align: center
  :width: 100%

Logcollector module
^^^^^^^^^^^^^^^^^^^

The Logcollector module receives logs through text files, Windows event logs, and also directly through syslog messages, which makes it suitable for firewalls and other such devices. In addition to its primary use as a log collector, it also functions as a viable alternative for running commands and processing the command outputs.

The Logcollector module offers the following features:

- **Formatting command output**: This allows you to format the output of a command by including fields like ``timestamp``, ``hostname``, ``program_name``, and more for better log identification and readability.

- **Reading multiline command output**: This allows the module to read a command output as one or more log messages depending on the ``command`` or ``full_command`` options configured on the module.

A basic Logcollector module configuration block looks like this:

   .. code-block:: xml

      <localfile>
        <log_format>full_command</log_format>
        <command><COMMAND></command>
        <frequency>120</frequency>
      </localfile>

Where:

- ``<log_format>`` specifies whether the command output is read as one or more log messages depending on ``command`` or ``full_command`` values.

   - ``full_command`` reads the output of an executed command as a single line entry.

   - ``command`` reads the output of an executed command as multiline entries.

- ``<COMMAND>`` specifies the endpoint command, script, or binary to execute.

- ``<frequency>`` specifies the time (in seconds) interval of running the configured command. When the frequency option is not specified, by default, the configured command runs every ``360 seconds`` (6 minutes).

Learn more about the different options to configure the Logcollector module in the :doc:`localfile section </user-manual/reference/ossec-conf/localfile>` of the documentation.

How to configure the Logcollector module
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A basic configuration for the Logcollector module requires the command to monitor, the frequency of execution of the command, and the log format of the executed command. 

For example, to monitor the percentage of memory available on a Linux endpoint every 120 seconds, perform the following steps on the Linux endpoint.

#. Add the configuration below within the ``</ossec_config>`` block of the Wazuh agent’s :ref:`local configuration file <command_monitoring_local_configuration>`, ``/var/ossec/etc/ossec.conf``:

   .. code-block:: xml

      <localfile>
        <log_format>full_command</log_format>
        <command>free -m | awk 'NR==2{printf "%.2f\t\t\n", $3*100/$2 }'</command>
        <alias>memory_utilization</alias>
        <frequency>120</frequency>
      </localfile>

   Where:

   - The ``full_command`` value in the ``<log_format>`` tag specifies the output of the command ``free -m | awk 'NR==2{printf "%.2f\t\t\n", $3*100/$2 }'`` is read as a single event.
   
   - The value ``free -m | awk 'NR==2{printf "%.2f\t\t\n", $3*100/$2 }'`` in the ``<command>`` tag is the command the Logcollector module executes.
   
   - The value ``memory_utilization`` of the ``<alias>`` tag is a string that represents the ``free -m | awk 'NR==2{printf "%.2f\t\t\n", $3*100/$2 }'`` command for better identification in creating rules.
   
   - The value ``120`` in the ``<frequency>`` tag implies the command runs every 120 seconds (2 minutes).

   .. note:: You can use the :ref:`centralized configuration file <command_monitoring_centralized_configuration>` to distribute this setting across multiple monitored endpoints.

#. Restart the Wazuh agent service to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

At this stage, the Logcollector module is configured to execute the specified command on the Linux endpoint and forward its output to the Wazuh server for analysis. The command output however needs to be analyzed to generate security alerts. Wazuh provides a default decoder called ``ossec`` to analyze command outputs from the Logcollector module.

Additionally, Wazuh provides a default rule definition with ID ``530`` that is triggered when it matches a command output of the Logcollector module. The rule level is set to ``0``, which means that it does not generate an alert by default when a command output triggers it. To generate security alerts for command outputs of the Logcollector module, you must create a custom rule with an increased level that inherits this base rule. 

Perform the following steps on the Wazuh server to generate alerts when Wazuh analyzes the output of the command ``free -m | awk 'NR==2{printf "%.2f\t\t\n", $3*100/$2``.

#. Add the custom rule below to the ``/var/ossec/etc/rules/local_rules.xml`` file:

   .. code-block:: xml

      <group name="memory_utilization,">
        <rule id="100012" level="6">
          <if_sid>530</if_sid>
          <match>^ossec: output: 'memory_utilization'</match>
          <description>Memory utilization metric.</description>
        </rule>
      </group>

#. Restart the Wazuh manager to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-manager

After you perform the steps above, the Wazuh server can now analyze the output of the command, ``free -m | awk 'NR==2{printf "%.2f\t\t\n", $3*100/$2``, and trigger security alerts every ``120`` seconds.

Visit the Wazuh dashboard and navigate to the **Modules > Security events** tab to visualize the generated alert as shown below.

.. thumbnail:: /images/manual/command-monitoring/memory-utilization-alert.png
  :title: Memory utilization alert
  :alt: Memory utilization alert
  :align: center
  :width: 100%

As shown in the figure above, the alert is expanded to show the available fields. The ``full_log`` field contains the message received from the Linux endpoint. The value ``76.42`` in the ``full_log`` field represents the percentage of memory utilized by the Linux endpoint. This value can be captured in a variable and displayed in the message description on the Wazuh dashboard. Visit the section on :ref:`Creating a custom ruleset <command_monitoring_creating_custom_ruleset>` to see how this is done.

Custom ruleset
~~~~~~~~~~~~~~

Wazuh provides an out-of-the-box decoder and rule to analyze the output of commands executed with the Logcollector module to generate security alerts.

The decoder is known as ``ossec`` as shown below and is available in the ``/var/ossec/ruleset/decoders/0200-ossec_decoders.xml`` file on the Wazuh server.

   .. code-block:: xml

      <decoder name="ossec">
        <prematch>^ossec: </prematch>
        <type>ossec</type>
      </decoder>

The rule is defined with ID ``530`` as shown below and is available in the ``/var/ossec/ruleset/rules/0015-ossec_rules.xml`` file on the Wazuh server.

   .. code-block:: xml

      <rule id="530" level="0">
        <if_sid>500</if_sid>
        <match>^ossec: output: </match>
        <description>OSSEC process monitoring rules.</description>
        <group>process_monitor,</group>
      </rule>

The rule level is set to ``0``, which means it does not generate an alert when it matches the expression ``ossec: output``: of the Logcollector module’s command output. To generate alerts for command outputs, you must create a custom rule that inherits this base rule with an increased level unless you have created custom decoders. For example, the ``df -P`` command output triggers the rule below when the disk usage of the ``/dev`` directory of a Linux endpoint is ``100%``.

   .. code-block:: xml
      :emphasize-lines: 1,2

      <rule id="531" level="7" ignore="7200">
        <if_sid>530</if_sid>
        <match>ossec: output: 'df -P': /dev/</match>
        <regex>100%</regex>
        <description>Partition usage reached 100% (disk space monitor).</description>
        <group>low_diskspace,pci_dss_10.6.1,gpg13_10.1,gdpr_IV_35.7.d,hipaa_164.312.b,nist_800_53_AU.6,tsc_CC7.2,tsc_CC7.3,</group>
      </rule>

From the rule definition above, you can see that rule ID ``531`` inherits from the base rule with ID ``530``. Additionally, the rule level has been increased from ``0`` to ``7`` to generate a security alert as highlighted.

The default decoder and rule are limited and do not provide coverage for all available scenarios. For this reason, Wazuh offers you the ability to create custom decoders and rules to meet your specific use case. Kindly visit the :ref:`Creating a custom ruleset <command_monitoring_creating_custom_ruleset>` section of this documentation for more information.

Configuration files
-------------------

Wazuh agents can be configured to run and monitor the output of commands in either one of the following ways:

- Locally on each Wazuh agent using the local configuration file.

- Centrally on the Wazuh server using the centralized configuration file.

.. _command_monitoring_local_configuration:

The local configuration file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The commands to run and monitor their output can be configured in the :doc:`local configuration (ossec.conf) </user-manual/reference/ossec-conf/index>` file of individual Wazuh agents on an endpoint. We use this file to manage the configuration of specified endpoints.

The local configuration file of agents is found in the following locations of the supported endpoints, as shown in the table below.

==========   =================================================
Endpoint     Location
==========   =================================================
Windows      ``C:\Program Files (x86)\ossec-agent\ossec.conf``
Linux        ``/var/ossec/etc/ossec.conf``
macOS        ``/Library/Ossec/etc/ossec.conf``
==========   =================================================

.. _command_monitoring_centralized_configuration:

The centralized configuration file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The centralized configuration file is used to remotely manage a group of endpoints. Unlike the local configuration file, it is used to manage one or more endpoints. The Wazuh server runs commands on monitored endpoints remotely using the ``Remoted`` daemon. We can enable this functionality by configuring the commands to be monitored in the appropriate configuration section of the :doc:`centralized configuration (agent.conf) </user-manual/reference/centralized-configuration>` file on the Wazuh server.

By default, the Wazuh agents can not accept remote commands configured on the Wazuh server. The remote command execution feature is disabled on the agents for security reasons. You must explicitly configure the Wazuh agents to accept remote commands from the Wazuh server. 

The configuration depends on the module in use, as described below:

- When using the Command module, add the configuration :ref:`wazuh_command.remote_commands <wazuh_command_remote_commands>` to the ``local_internal_options.conf`` file of the Wazuh agent on every monitored endpoint. This configuration enables the Wazuh agents to accept remote commands from the Wazuh server.

- When using the Logcollector module, add the configuration :ref:`logcollector.remote_commands <ossec_internal_logcollector>` to the ``local_internal_options.conf`` file of the Wazuh agent on every monitored endpoint. This configuration enables the Wazuh agents to accept remote commands from the Wazuh server.

.. warning:: Enable remote command execution with caution, as this action authorizes the Wazuh user to run commands with elevated privileges on the monitored endpoint.

The location for the Wazuh agent ``local_internal_options.conf`` file on each monitored endpoint is shown in the table below.

==========   ===================================================================
Endpoint     Location
==========   ===================================================================
Windows      ``C:\Program Files (x86)\ossec-agent\local_internal_options.conf``
Linux        ``/var/ossec/etc/local_internal_options.conf``
macOS        ``/Library/Ossec/local_internal_options.conf``
==========   ===================================================================

Example configuration
~~~~~~~~~~~~~~~~~~~~~

The configurations below shows how to enable and disable remote command execution on Wazuh agents in Linux endpoints.

.. note:: These configurations require you to restart the Wazuh agent to apply the changes.

- To enable the Wazuh agent to accept remote commands from a Wazuh server, add the configuration below to the ``/var/ossec/etc/local_internal_options.conf`` file on the Linux endpoint.

   - For the Command module:

      .. code-block:: xml

         wazuh_command.remote_commands=1

   - For the Logcollector module:

      .. code-block:: xml

         logcollector.remote_commands=1

- To disable remote command execution after explicitly enabling it, remove the configuration entirely or modify the appropriate value to ``0`` in the ``/var/ossec/etc/local_internal_options.conf`` file.

   - For the Command module:

      .. code-block:: xml

         wazuh_command.remote_commands=0

   - For the Logcollector module:

      .. code-block:: xml

         logcollector.remote_commands=0

