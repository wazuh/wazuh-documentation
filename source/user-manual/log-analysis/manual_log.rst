.. _manual_log:

How it works
===============================

This diagram is a basic ilustration of the log flow, It will help you to understand how it works.

.. image:: ../../images/manual/log_analysis/log_flow.png
    :align: center
    :width: 100%

1. Collector
-------------
The log messages source can be:

Log files
^^^^^^^^^
Log Analysis engine can be configured to monitor specific files on the servers. This servers can be running windows or Linux.

Configuration Example:

Linux:
::

  <agent_config os="Linux">
    <localfile>
        <location>/var/log/example.log</location>
        <log_format>syslog</log_format>
    </localfile>
  </agent_config>

Windows:
::

  <agent_config os="Windows">
    <localfile>
        <location>C:\myapp\example.log</location>
        <log_format>syslog</log_format>
    </localfile>
  </agent_config>


Windows event log
^^^^^^^^^^^^^^^^^^

The component can also be configured to monitor the Event Log from windows, or Event Channel for Vista or newer versions:

Configuration Example:

Eventlog:
::

  <localfile>
    <location>Security</location>
    <log_format>eventlog</log_format>
  </localfile>

Eventchannel:
::

  <localfile>
    <location>Microsoft-Windows-PrintService/Operational</location>
    <log_format>eventchannel</log_format>
  </localfile>

Remote syslog
^^^^^^^^^^^^^^

For other devices like firewalls, you can configure Log Analysis component to receive log events through Syslog.

Configuration example:
::

  <ossec_config>
    <remote>
      <connection>syslog</connection>
      <allowed-ips>192.168.2.0/24</allowed-ips>
    </remote>
  <ossec_config>

``<connection>syslog</connection>`` indicate that we allow syslog messages from the device to the server, and ``<allowed-ips>192.168.2.0/24</allowed-ips>`` to define the network.

Log Example::

  2016-03-15T15:22:10.078830+01:00 tron su:pam_unix(su-l:auth):authentication failure;logname=tm uid=500 euid=0 tty=pts/0 ruser=tm rhost= user=root
  1265939281.764 1 172.16.167.228 TCP_DENIED /403 734 POST http://lbcore1.metacafe.com/test/SystemInfoManager.php - NONE/- text/html
  [Sun Mar 06 08:52:16 2016] [error] [client 187.172.181.57] Invalid URI in request GET: index.php HTTP/1.0

2. Decode
----------

Decode Phase extracts known fields from the log message and identifies/evaluate the content. Example of log and extracted info
::

  Feb 14 12:19:04 localhost sshd[25474]: Accepted password for leia from 192.168.1.133 port 49765 ssh2

Extracted information:
  - *program name*: sshd
  - *dstuser*: leia
  - *srcip*: 192.168.1.133

3. Analyze
----------

 Next step is to check if any of the rules that are internally stored, matches.

 For the previouse example, rule 5715 is matched::

  <rule id="5715" level="3">
    <if_sid>5700</if_sid>
    <match>^Accepted|authenticated.$</match>
    <description>sshd: authentication success.</description>
    <group>authentication_success,pci_dss_10.2.5,</group>
  </rule>

.. note::
  More information about :ref:`Wazuh Ruleset <ruleset>`

4. Alert
----------

Once the rule is matched, the manager will create an alert.

Example
::

  ** Alert 1487103546.21448: - syslog,sshd,authentication_success,pci_dss_10.2.5,
  2017 Feb 14 12:19:06 localhost->/var/log/secure
  Rule: 5715 (level 3) -> 'sshd: authentication success.'
  Src IP: 192.168.1.133
  User: leia
  Feb 14 12:19:04 localhost sshd[25474]: Accepted password for leia from 192.168.1.133 port 49765 ssh2



Log Retention Time
-------------------

By default, Wazuh will generate alerts on events that are important. Most of the events that came from the log messages are just informational and they will not be stored.

The log retention time is configurable by the user. This means that the individual entity, being a corporation or financial institution, needs to define its own log retention policy due to their legal and regulatory needs.

To store all the alerts, you need to enable the ``<log_all>`` option. The logs indefinitely until they are deleted manually. Wazuh uses log-rotation and stores the archived logs in ``/var/ossec/logs/archives/`` and creates an individual directory for each year and month.
