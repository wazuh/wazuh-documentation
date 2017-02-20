.. _how_to_log:

HOWTOs
==========================

1. `Disk space utilization`_

``Disk space utilization``
---------------------------------
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
