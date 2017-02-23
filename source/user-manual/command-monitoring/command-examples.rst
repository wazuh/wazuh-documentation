.. _command-examples:

HOWTOs
=================================

1. `Monitor running processes`_
2. `Disk space utilization`_
3. `Check if the output changed`_

Monitor running processes
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

Disk space utilization
--------------------------

We need to configure the ``dh`` command on the :ref:`ossec.conf<reference_ossec_conf>` configuration file::

  <localfile>
      <log_format>command</log_format>
      <command>df -P</command>
  </localfile>

Wazuh already incorpore a rule to monitor this::

  <rule id="531" level="7" ignore="7200">
    <if_sid>530</if_sid>
    <match>ossec: output: 'df -P': /dev/</match>
    <regex>100%</regex>
    <description>Partition usage reached 100% (disk space monitor).</description>
    <group>low_diskspace,pci_dss_10.6.1,</group>
  </rule>

The system will alert once the disk space reache 100%

Check if the output changed
-------------------------------

In this case we use the :ref:`check_dif option <rules_check_diff>`

Configuration on the ossec.conf file::

  <localfile>
    <log_format>full_command</log_format>
    <command>netstat -tan |grep LISTEN|grep -v 127.0.0.1</command>
  </localfile>

Wazuh already incorpore a rule to monitor this::

  <rule id="533" level="7">
    <if_sid>530</if_sid>
    <match>ossec: output: 'netstat -tan</match>
    <check_diff />
    <description>Listened ports status (netstat) changed (new port opened or closed).</description>
    <group>pci_dss_10.2.7,pci_dss_10.6.1,</group>
  </rule>

If the output change, the system will generate an alert.
