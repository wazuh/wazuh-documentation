.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Learn more about the command monitoring configuration. Check out the basic usage, how to monitor running Windows processes, and more. 

.. _command-examples:

Configuration
=============

.. contents:: :local:

Basic usage configuration
-------------------------

The command monitoring capability is configured either locally or centrally:

*  Locally through the :ref:`ossec.conf <reference_ossec_conf>` local configuration file.
*  Centrally through the :ref:`agent.conf<reference_agent_conf>` group configuration file.

The configuration options are defined in the :ref:`localfile <reference_ossec_localfile>` section of the configuration file, under the ``<localfile>`` section tag.

.. code-block:: xml

  <localfile>
      <log_format><!-- `command` or `full_command` options--></log_format>
      <command><!-- Command and arguments go here --></command>
      <frequency><!-- Interval in seconds goes here--></frequency>
  </localfile>

The configuration options are as follows:

*  ``<log_format>``: The ``full_command`` option used to turn the command's output into a single log message. With the ``command`` option, each line of output is treated as a separate log.
*  ``<command>``: The command and arguments whose output is going to be monitored.
*  ``<frequency>``: The time interval to wait between executions. This value is expressed in seconds. By default, the command runs every 360 seconds.

Additionally, when central configuration is used, an explicit consent on the monitored system is required. This permission is granted in the agent's :ref:`local_internal_options.conf<reference_internal_options>` configuration file by enabling remote commands on the :ref:`Logcollector<ossec_internal_logcollector>`.

.. code-block:: pkgconfig

  # Logcollector - Toggles whether to accept remote commands from the manager
  # 1: Enable remote commands
  # 0: Disable remote commands
  logcollector.remote_commands=1

Depending on the specific application, :ref:`custom rules<ruleset_custom>` might need to be added.

Running processes monitoring
----------------------------
The command monitoring capability can be used to alert about the missing execution of a given process.

As an example, we configure ``<localfile>`` to check periodically the `clamd.exe` process execution on a monitored Windows system. To do this, we use the command ``tasklist`` and set it to run repeatedly once every 120 seconds.

.. code-block:: xml

  <localfile>
      <log_format>full_command</log_format>
      <command>tasklist</command>
      <frequency>120</frequency>
  </localfile>


We add two rules:

*  One level 6 rule to generate an alert about the process not running. This is a fallback rule and is going to be triggered whenever the monitored process is not found within the `tasklist` command's output.

.. code-block:: xml

  <rule id="100010" level="6">
    <if_sid>530</if_sid>
    <match>^ossec: output: 'tasklist'</match>
    <description>clamd.exe not running.</description>
    <group>process_monitor,</group>
  </rule>

*  One level 0 child rule to watch specifically for the presence of the process `clamd.exe` in the command's output. If found, no action will be taken.

.. code-block:: xml

  <rule id="100011" level="0">
    <if_sid>100010</if_sid>
    <match>clamd.exe</match>
    <description>clamd.exe running as expected.</description>
    <group>process_monitor,</group>
  </rule>

In this example, unless there is a match for `clamd.exe` found in the `tasklist` command's output, `rule id 100010` will trip a level 6 alert. Likewise, new rules similar to rules `id 100010` and `id 100011` above can be added to watch for other processes as well.

In the case of monitoring Linux processes, this example can be adapted by changing the ``<command>`` option from ``tasklist`` to a Linux command that lists processes, like ``ps -auxw``.

Load average monitoring
-----------------------

Wazuh can be configured to monitor the Linux `uptime` command's output and alert when its reported load average reaches a given threshold.

The output of `uptime` looks like this:

.. code-block:: PowerShell

  # uptime
  09:50:11 up 6 days, 48 min, 2 users, load average: 0.22, 0.41, 0.32

..
  used PowerShell syntax instead of sh due to bad highlighting

We configure the :ref:`localfile <reference_ossec_localfile>` section of the configuration file to run the ``uptime`` command.

.. code-block:: xml

  <localfile>
      <log_format>command</log_format>
      <command>uptime</command>
      <frequency>60</frequency>
  </localfile>

In this example, we define a level 7 rule and use the regular expression ``load average: 2.`` to alert when the load average reaches a value of `2` in the last minute.

.. code-block:: xml

  <rule id="100101" level="7" ignore="7200">
    <if_sid>530</if_sid>
    <match>ossec: output: 'uptime': </match>
    <regex>load average: 2.</regex>
    <description>Load average reached a value of 2.</description>
  </rule>

USB storage detection
---------------------

Wazuh can be configured to alert when a USB storage device is connected.

In this example, we configure Windows agents to monitor the `USBSTOR` registry entry by adding the following command to the group's `agent.conf` configuration file.

.. code-block:: xml

  <agent_config os="Windows">
    <localfile>
        <log_format>full_command</log_format>
        <command>reg QUERY HKLM\SYSTEM\CurrentControlSet\Enum\USBSTOR</command>
    </localfile>
  </agent_config>

We create a custom level 7 rule to monitor for changes using the :ref:`check_diff option <rules_check_diff>`.

.. code-block:: xml

  <rule id="140125" level="7">
      <if_sid>530</if_sid>
      <match>ossec: output: 'reg QUERY</match>
      <check_diff />
      <description>New USB device connected.</description>
  </rule>

Disk space usage monitoring
---------------------------
After installing Wazuh, a configuration for disk space usage monitoring is set by default on the manager and agents for Linux systems. This configuration is set to use the ``df`` command to check the available disk space for file systems as follows:

.. code-block:: xml

  <localfile>
    <log_format>command</log_format>
    <command>df -P</command>
    <frequency>360</frequency>
  </localfile>

It also defines a rule to trip an alert once the disk space usage on any partition reaches 100%.

.. code-block:: xml

  <rule id="531" level="7" ignore="7200">
    <if_sid>530</if_sid>
    <match>ossec: output: 'df -P': /dev/</match>
    <regex>100%</regex>
    <description>Partition usage reached 100% (disk space monitor).</description>
    <group>low_diskspace,pci_dss_10.6.1,</group>
  </rule>

Network connections monitoring
------------------------------

After installing Wazuh, a configuration for network connections monitoring is set by default on the manager and agents for Linux systems. The ``netstat`` command is used along with the :ref:`check_diff <rules_check_diff>` option to monitor for changes in listening TCP sockets. If the output changes, the system will generate an alert.

.. code-block:: xml

  <localfile>
    <log_format>full_command</log_format>
    <command>netstat -tulpn | sed 's/\([[:alnum:]]\+\)\ \+[[:digit:]]\+\ \+[[:digit:]]\+\ \+\(.*\):\([[:digit:]]*\)\ \+\ ([0-9\.\:\*]\+\).\+\ \([[:digit:]]*\/[[:alnum:]\-]*\).*/\1 \2 == \3 == \4 \5/' | sort -k 4 -g | sed 's/ == \(.*\) ==/:\1 /' | sed 1,2d</command>
    <alias>netstat listening ports</alias>
    <frequency>360</frequency>
  </localfile>

A rule to alert when a network listener disappears or a new one appears is also defined by default. These changes may indicate something is broken or a network backdoor has been installed.

.. code-block:: xml

  <rule id="533" level="7">
    <if_sid>530</if_sid>
    <match>ossec: output: 'netstat listening ports</match>
    <check_diff />
    <description>Listened ports status (netstat) changed (new port opened or closed).</description>
    <group>pci_dss_10.2.7,pci_dss_10.6.1,gpg13_10.1,gdpr_IV_35.7.d,</group>
  </rule>
