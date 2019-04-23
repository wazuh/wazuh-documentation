.. Copyright (C) 2018 Wazuh, Inc.

.. _command-examples:

Configuration
=============

#. `Basic usage`_
#. `Monitor running Windows processes`_
#. `Disk space utilization`_
#. `Check if the output changed`_
#. `Load average`_
#. `Detect USB Storage`_

Basic usage
-----------

Command monitoring is configured in the :ref:`localfile section<reference_ossec_localfile>` of :ref:`ossec.conf <reference_ossec_conf>`. It can be also be centrally configured in :ref:`agent.conf<reference_agent_conf>`.

Monitor running Windows processes
---------------------------------
Let's say you want to monitor running processes and alert if an important process is not running.

Example with notepad.exe as the important process to monitor:

1. Configure the agent in the agent's **local_internal_options.conf** file to accept remote commands from the manager.

.. code-block:: console

  # Logcollector - Whether or not to accept remote commands from the manager
  logcollector.remote_commands=1

2. Define the command in the group's **agent.conf** file to list running processes.

.. code-block:: xml

  <localfile>
       <log_format>full_command</log_format>
       <command>tasklist</command>
       <frequency>120</frequency>
  </localfile>

The ``<frequency>`` tag defines how often the command will be run in seconds.

3. Define the rules.

.. code-block:: xml

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

The first rule (100010) will generate an alert ("Important process not running"), unless it is overridden by its child rule (100011) that matches `notepad.exe` in the command output.  You may add as many child rules as needed to enumerate all of the important processes you want to monitor.  You can also adapt this example to monitor Linux processes by changing the ``<command>`` from ``tasklist`` to a Linux command that lists processes, like ``ps -auxw``.

Disk space utilization
----------------------

The ``df`` command helps here to check the available disk space for file systems.

This can be configured in either the ``agent.conf`` file or the ``ossec.conf`` file:

.. code-block:: xml

  <localfile>
      <log_format>command</log_format>
      <command>df -P</command>
  </localfile>

Wazuh already has a rule to monitor this

.. code-block:: xml

  <rule id="531" level="7" ignore="7200">
    <if_sid>530</if_sid>
    <match>ossec: output: 'df -P': /dev/</match>
    <regex>100%</regex>
    <description>Partition usage reached 100% (disk space monitor).</description>
    <group>low_diskspace,pci_dss_10.6.1,</group>
  </rule>


The system will alert once the disk space usage on any partition reaches 100%.

Check if the output changed
---------------------------

In this case, the Linux "netstat" command is used along with the :ref:`check_diff option <rules_check_diff>` to monitor for changes in listening tcp sockets.

This can be configured in either the ``agent.conf`` file or the ``ossec.conf`` file:

.. code-block:: xml

  <localfile>
    <log_format>full_command</log_format>
    <command>netstat -tulpn | sed 's/\([[:alnum:]]\+\)\ \+[[:digit:]]\+\ \+[[:digit:]]\+\ \+\(.*\):\([[:digit:]]*\)\ \+\([0-9\.\:\*]\+\).\+\ \([[:digit:]]*\/[[:alnum:]\-]*\).*/\1 \2 == \3 == \4 \5/' | sort -k 4 -g | sed 's/ == \(.*\) ==/:\1/' | sed 1,2d</command>
    <alias>netstat listening ports</alias>
    <frequency>360</frequency>
  </localfile>

Wazuh already has a rule to monitor this:

.. code-block:: xml

  <rule id="533" level="7">
    <if_sid>530</if_sid>
    <match>ossec: output: 'netstat listening ports</match>
    <check_diff />
    <description>Listened ports status (netstat) changed (new port opened or closed).</description>
    <group>pci_dss_10.2.7,pci_dss_10.6.1,gpg13_10.1,gdpr_IV_35.7.d,</group>
  </rule>

If the output changes, the system will generate an alert indicating a network listener has disappeared or a new one has appeared. This may indicate something is broken or a network backdoor has been installed.

Load average
------------

Wazuh can be configured to monitor the Linux ``uptime`` command and alert when it is higher than a given threshold, like two load averages in this example.

This can be configured in ``agent.conf`` or ``ossec.conf``:

.. code-block:: xml

  <localfile>
      <log_format>command</log_format>
      <command>uptime</command>
  </localfile>

And the custom rule to alert when "uptime" is higher than two load averages:

.. code-block:: xml

  <rule id="100101" level="7" ignore="7200">
    <if_sid>530</if_sid>
    <match>ossec: output: 'uptime': </match>
    <regex>load averages: 2.</regex>
    <description>Load average reached 2..</description>
  </rule>

Detect USB Storage
------------------

Wazuh can be configured to alert when a USB storage device is connected. This example is for a Windows agent.

Configure your agent to monitor the USBSTOR registry entry by adding the following to the group's ``agent.conf``:

.. code-block:: xml

  <agent_config os="Windows">
    <localfile>
        <log_format>full_command</log_format>
        <command>reg QUERY HKLM\SYSTEM\CurrentControlSet\Enum\USBSTOR</command>
    </localfile>
  </agent_config>

Next create a custom rule:

.. code-block:: xml

  <rule id="140125" level="7">
      <if_sid>530</if_sid>
      <match>ossec: output: 'reg QUERY</match>
      <check_diff />
      <description>New USB device connected</description>
  </rule>
