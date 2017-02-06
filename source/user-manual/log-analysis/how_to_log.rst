.. _how_to_log:

HOWTOs
==========================

Monitor running processes
^^^^^^^^^^^^^^^^^^^^^^^^^^
Imagine you want to monitor the running proccess and alert if an important one is not running.

Example with notepad.exe:

1. Configure the agent to accept remote commands from the manager (Agent ossec-agent/internal_options.conf)
::

  # Logcollector - If it should accept remote commands from the manager
  logcollector.remote_commands=1

2. Configure the command to list the running processes (Manager agent.conf)
::

  <localfile>
       <log_format>full_command</log_format>
       <command>tasklist</command>
       <frequency>120</frequency>
   </localfile>

Frequency defines how often the command will be run (in seconds).

3. Define the rules
::

  <rule id="100010" level="6">
    <if_sid>530</if_sid>
    <match>^ossec: output: 'tasklist'</match>
    <description>Important process not running.</description>
    <group>process_monitor,</group>
  </rule>
  <rule id="100011" level="0">
    <if_sid>100010</if_sid>
    <match>notepad.exe</match>
    <description>Processes running as expected</description>
    <group>process_monitor,</group>
  </rule>

First rule will create an alert "Important procces not running", unless the output matches `notepad.exe` (on second rule).

Disk space utilization
^^^^^^^^^^^^^^^^^^^^^^^^^^
You can use the Log Analysis capability in order to be alerted if any partition reached 100%

1. Configure the command to be monitored
::

  <localfile>
    <log_format>command</log_format>
    <command>df -h</command>
  </localfile>

2. You will be alerted when any partition reached 100% because of the rule already included on Wazuh
::

  <rule id="531" level="7" ignore="7200">
    <if_sid>530</if_sid>
    <match>ossec: output: 'df -P': /dev/</match>
    <regex>100%</regex>
    <description>Partition usage reached 100% (disk space monitor).</description>
    <group>low_diskspace,</group>
  </rule>

Alert Example:
::

  ** Alert 1257451341.28290: mail - ossec,low_diskspace,
  2017 Feb 03 16:02:21 (ubuntu-agent) 192.168.0.0->df -h

  Rule: 531 (level 7) -> "Partition usage reached 100% (disk space monitor)."
  Src IP: (none)
  User: (none)
  ossec: output: 'df -h': /dev/sdb1 24G 12G 11G 100% /var/backup
