.. _how_to_command:

HOWTOs
=================================

1. `Monitor running processes`_

``Monitor running processes``
---------------------------------
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
