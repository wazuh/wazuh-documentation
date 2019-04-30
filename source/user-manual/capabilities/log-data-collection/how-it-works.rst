.. Copyright (C) 2018 Wazuh, Inc.

How it works
============

The below image illustrations how events flow through the Wazuh environment.

.. thumbnail:: ../../../images/manual/log_analysis/log-analysis-flow.png
    :title: Log analysis flow
    :align: center
    :width: 100%

Log collection
--------------

Log files
^^^^^^^^^

The Log analysis engine can be configured to monitor specific files on the servers.

- Linux:

  .. code-block:: xml

      <localfile>
        <location>/var/log/example.log</location>
        <log_format>syslog</log_format>
      </localfile>

- Windows:

  .. code-block:: xml

      <localfile>
        <location>C:\myapp\example.log</location>
        <log_format>syslog</log_format>
      </localfile>


Windows event logs
^^^^^^^^^^^^^^^^^^

Wazuh can monitor classic Windows event logs, as well as the newer Windows event channels.

- Event log:

  .. code-block:: xml

    <localfile>
      <location>Security</location>
      <log_format>eventlog</log_format>
    </localfile>

- Event channel:

  .. code-block:: xml

    <localfile>
      <location>Microsoft-Windows-PrintService/Operational</location>
      <log_format>eventchannel</log_format>
    </localfile>

Remote syslog
^^^^^^^^^^^^^

On other devices, like firewalls, for instance, the log analysis component can be configured to receive log events through syslog.

- Sample configuration:

  .. code-block:: xml

    <ossec_config>
      <remote>
        <connection>syslog</connection>
        <allowed-ips>192.168.2.0/24</allowed-ips>
      </remote>
    <ossec_config>

``<connection>syslog</connection>`` indicates that the manager will accept incoming syslog messages from across the network and ``<allowed-ips>192.168.2.0/24</allowed-ips>`` defines the network from which syslog messages will be accepted.

Log Example::

  2016-03-15T15:22:10.078830+01:00 tron su:pam_unix(su-l:auth):authentication failure;logname=tm uid=500 euid=0 tty=pts/0 ruser=tm rhost= user=root
  1265939281.764 1 172.16.167.228 TCP_DENIED /403 734 POST http://lbcore1.metacafe.com/test/SystemInfoManager.php - NONE/- text/html
  [Sun Mar 06 08:52:16 2016] [error] [client 187.172.181.57] Invalid URI in request GET: index.php HTTP/1.0

Analysis
--------

Pre-decoding
^^^^^^^^^^^^

In the pre-decoding phase of analysis, static information from well-known fields all that is extracted from the log header.

::

  Feb 14 12:19:04 localhost sshd[25474]: Accepted password for rromero from 192.168.1.133 port 49765 ssh2

Extracted information:
  - *hostname*: 'localhost'
  - *program_name*: 'sshd'

Decoding
^^^^^^^^

In the decoding phase, the log message is evaluated to identify what type of log it is and known fields for that specific log type are then extracted.

Sample log and its extracted info:

::

  Feb 14 12:19:04 localhost sshd[25474]: Accepted password for rromero from 192.168.1.133 port 49765 ssh2

Extracted information:
  - *program name*: sshd
  - *dstuser*: rromero
  - *srcip*: 192.168.1.133

Rule matching
^^^^^^^^^^^^^

In the next phase, the extracted log information is compared to the ruleset to look for matches:

For the previous example, rule 5715 is matched:

.. code-block:: xml

  <rule id="5715" level="3">
    <if_sid>5700</if_sid>
    <match>^Accepted|authenticated.$</match>
    <description>sshd: authentication success.</description>
    <group>authentication_success,pci_dss_10.2.5,</group>
  </rule>

.. note::

  For more information, see the :ref:`Wazuh Ruleset <ruleset>`

Alert
-----

Once a rule is matched, the manager will create an alert as below::

  ** Alert 1487103546.21448: - syslog,sshd,authentication_success,pci_dss_10.2.5,
  2017 Feb 14 12:19:06 localhost->/var/log/secure
  Rule: 5715 (level 3) -> 'sshd: authentication success.'
  Src IP: 192.168.1.133
  User: rromero
  Feb 14 12:19:04 localhost sshd[25474]: Accepted password for rromero from 192.168.1.133 port 49765 ssh2

By default, alerts will be generated on events that are important or of security relevance. To store all events even if they do not match a rule, enable the ``<log_all>`` option.

Alerts will be stored at ``/var/ossec/logs/alerts/alerts.(json|log)`` and events at ``/var/ossec/logs/archives/archives.(json|log)``. Logs are rotated and an individual directory is created for each month and year.

.. note:: Archived logs are not automatically deleted by default.  You can choose when to manually or automatically (e.g., cron job) delete logs according to your own legal and regulatory requirements.
