.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Here you can see how the Log Data Collection capability of Wazuh works and learn how to collect log files and Windows event logs.

How it works
============

The below image illustrates how events flow through the Wazuh environment.

.. thumbnail:: ../../../images/manual/log-analysis/log-analysis-flow.png
    :title: Log analysis flow
    :alt: Log analysis flow
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


macOS ULS logs
^^^^^^^^^^^^^^

Wazuh can monitor logs from the macOS Unified Logging System.

  .. code-block:: xml

    <localfile>
      <location>macos</location>
      <log_format>macos</log_format>
      <query type="log,activity" level="debug">process == "sshd" OR message CONTAINS "invalid"</query>
    </localfile>

.. note::

  These logs are acquired in `Syslog` format. For more information, see the :ref:`How to collect macOS ULS logs <how-to-collect-macoslogs>`.

.. _remote_syslog:

Remote syslog
^^^^^^^^^^^^^

To integrate network devices such as routers and firewalls, among others, the log analysis component can be configured to receive log events through syslog. To do that, we have two methods available:

- Receiving syslog logs in a custom port
- Storing syslog logs in a plaintext file and monitoring it with Wazuh

Receiving syslog logs in a custom port
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Configure Wazuh as follows to receive logs in a given port: 

    .. code-block:: xml

      <ossec_config>
        <remote>
          <connection>syslog</connection>
          <port>513</port>
          <protocol>tcp</protocol>
          <allowed-ips>192.168.2.0/24</allowed-ips>
        </remote>
      </ossec_config>

    - ``<connection>syslog</connection>`` indicates that the manager will accept incoming syslog messages from across the network.
    - ``<port>513</port>`` defines the port that Wazuh will listen to retrieve the logs. The port must be free.
    - ``<protocol>tcp</protocol>`` defines the protocol to listen the port. It can be UDP or TCP.
    - ``<allowed-ips>192.168.2.0/24</allowed-ips>`` defines the network or IP address from which syslog messages will be accepted.

    .. note::

      The ``allowed-ips`` label is mandatory, without it the configuration will not take effect. 

Storing syslog logs in a plaintext file and monitoring it with Wazuh
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This method consists of storing the logs in a plaintext file and monitoring that file. If a ``/etc/rsyslog.conf`` configuration file is being used and we have defined where to store the syslog logs, we can monitor them with Wazuh by configuring a ``<localfile>`` block with ``syslog`` as the log format.

    .. code-block:: xml

      <localfile>
        <log_format>syslog</log_format>
        <location>/custom/file/path</location>
      </localfile>

    - ``<log_format>syslog</log_format>`` indicates the source log format, in this case, syslog format.
    - ``<location>/custom/file/path</location>`` indicates where we have stored the syslog logs.

    .. note::

      For more information about the ``localfile`` label, see the :ref:`Local configuration localfile <reference_ossec_localfile>`.

Analysis
--------

Pre-decoding
^^^^^^^^^^^^

In the pre-decoding phase of analysis, the log analysis extracts Syslog-like information such as timestamp, hostname, and program name from the log header.

.. code-block:: none
  :class: output

  Feb 14 12:19:04 localhost sshd[25474]: Accepted password for rromero from 192.168.1.133 port 49765 ssh2

Extracted information:

-  *timestamp*: ``Feb 14 12:19:04``
-  *hostname*: ``localhost``
-  *program_name*: ``sshd``

Decoding
^^^^^^^^

In the decoding phase, the analysis engine looks for a decoder matching the log. The matching decoder then extracts defined fields from that specific log.

Sample log and its extracted info:

.. code-block:: none
  :class: output

  Feb 14 12:19:04 localhost sshd[25474]: Accepted password for rromero from 192.168.1.133 port 49765 ssh2

Extracted information:

-  *dstuser*: ``rromero``
-  *srcip*: ``192.168.1.133``

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

  For more information, see the :doc:`Wazuh Ruleset </user-manual/ruleset/index>`

Alert
-----

Once a rule is matched, the manager will create an alert as below:

.. code-block:: none
  :class: output

  ** Alert 1487103546.21448: - syslog,sshd,authentication_success,pci_dss_10.2.5,
  2017 Feb 14 12:19:06 localhost->/var/log/secure
  Rule: 5715 (level 3) -> 'sshd: authentication success.'
  Src IP: 192.168.1.133
  User: rromero
  Feb 14 12:19:04 localhost sshd[25474]: Accepted password for rromero from 192.168.1.133 port 49765 ssh2

By default, alerts will be generated on events that are important or of security relevance. To store all events even if they do not match a rule, enable the ``<logall>`` option.

Alerts will be stored at ``/var/ossec/logs/alerts/alerts.(json|log)`` and events at ``/var/ossec/logs/archives/archives.(json|log)``. Logs are rotated and an individual directory is created for each month and year.

.. note:: Archived logs are not automatically deleted by default.  You can choose when to manually or automatically (e.g., cron job) delete logs according to your own legal and regulatory requirements.
