.. _manual_log:

How it works
===============================

Log analysis engine takes a log message and:

1. Extract important fields
2. Identify & evaluate the content
3. Categorize it by matching specific rules
4. Generate an alert for the log message.

The memory and CPU usage of the agent is insignificant because it only forwards events to the manager, however on the master CPU and memory consumption can increase quickly depending on the events per second (EPS) that the master has to analyze.

This diagram is a basic ilustration of the log flow, It will help you to understand how it works.

.. image:: ../../images/manual/log_analysis/log_flow.png
    :align: center
    :width: 100%

Wazuh Agent

  - **Collector** recopile all the logs from the server. The logs monitored logs are user defined.

Wazuh Manager

  The Manager monitorize everything in real time. Inside the manager, three phases can be distinguished:

  - **Decode**: that extracts known fields from the log message, identifies key information (SRC IP, username...).
  - **Analyze**: next step is to check if any of the rules that are internally stored, matches.
  - **Alert**: once the rule is matched, the manager will create an alert.

.. note::
    More information about :ref:`Wazuh Ruleset <ruleset>`

Messages source
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh can read logs messages from:

Log files
---------

.. image:: ../../images/manual/log_analysis/logfile.png
  :align: center
  :width: 50%

Wazuh can be configured to monitor specific files on the servers. This servers can be running windos or Linux.

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
-----------------

Wazuh can also be configured to monitor the Event Log from windows, or Event Channel for Vista or newer versions:

.. image:: ../../images/manual/log_analysis/eventlog.png
  :align: center
  :width: 50%

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
-------------

For other devices like firewalls, you can configure Wazuh to receive log events through Syslog.

.. image:: ../../images/manual/log_analysis/syslog.png
  :align: center
  :width: 50%

Configuration example:
::

  <ossec_config>
    <remote>
      <connection>syslog</connection>
      <allowed-ips>192.168.2.0/24</allowed-ips>
    </remote>
  <ossec_config>

``<connection>syslog</connection>`` indicate that we allow syslog messages from the device to the server, and ``<allowed-ips>192.168.2.0/24</allowed-ips>`` to define the network.

Log Retention Time
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By default, Wazuh will generate alerts on events that are important. Most of the events that came from the log messages are just informational and they will not be stored.

The log retention time is configurable by the user. This means that the individual entity, being a corporation or financial institution, needs to define its own log retention policy due to their legal and regulatory needs.

To store all the alerts, you need to enable the ``<log_all>`` option. The logs indefinitely until they are deleted manually. Wazuh uses log-rotation and stores the archived logs in ``/var/ossec/logs/archives/`` and creates an individual directory for each year and month.


Example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Example of the alerts generated on a bruteforce attack:
::

  [root@manager logs]# tail -f /var/ossec/alerts/alerts.log
  ** Alert 1459515987.48334: - syslog,sshd,invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1, 2016 Apr 01 13:06:27 manager->/var/log/secure
  Rule: 5710 (level 5) -> 'Attempt to login using a non-existent user'
  Src IP: 212.186.126.139
  Apr 1 13:06:27 manager sshd[513]: Invalid user admin from 212.186.126.139
  ** Alert 1459515991.48672: - syslog,sshd,invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1, 2016 Apr 01 13:06:31 manager->/var/log/secure
  Rule: 5710 (level 5) -> 'Attempt to login using a non-existent user'
  Src IP: 212.186.126.139
  Apr 1 13:06:30 manager sshd[515]: Invalid user admin from 212.186.126.139
  ** Alert 1459516007.50362: - syslog,sshd,invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1, 2016 Apr 01 13:06:47 manager->/var/log/secure
  Rule: 5710 (level 5) -> 'Attempt to login using a non-existent user'
  Src IP: 212.186.126.139
  Apr 1 13:06:47 manager sshd[535]: Invalid user admin from 212.186.126.139
  ** Alert 1459516011.50700: mail - syslog,sshd,authentication_failures,pci_dss_11.4,pci_dss_10.2.4,pci_dss_10.2.5,
  2016 Apr 01 13:06:51 manager->/ var/log/secure
  Rule: 5712 (level 10) -> 'SSHD brute force trying to get access to the system.'
  Src IP: 212.186.126.139
