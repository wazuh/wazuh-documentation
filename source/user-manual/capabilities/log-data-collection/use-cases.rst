.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Explore Log data collection use cases: monitor Sysmon events on a Windows endpoint, relay syslog through rsyslog on a Linux endpoint, and configure a custom socket output on a macOS endpoint.

Use cases
=========

The following use cases demonstrate how to configure Wazuh log collection for common endpoint and network monitoring scenarios, including Windows event monitoring, syslog relaying on Linux, and custom socket output on macOS.

.. _use_case_monitoring_sysmon_windows:

Monitoring Sysmon events on a Windows endpoint
-------------------------------------------------

To monitor specific Windows event channels using the Wazuh agent, include the channel name in the ``location`` field and set the log format as ``eventchannel`` within the ``localfile`` block in the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` file.

For example, perform the following steps to monitor Sysmon events using the ``Microsoft-Windows-Sysmon/Operational`` channel:

#. Download the latest version of Sysmon from the `Microsoft Sysinternals <https://docs.microsoft.com/en-us/sysinternals/downloads/sysmon>`__ page.

#. Extract the compressed Sysmon file to your preferred location.

   .. code-block:: powershell

      > Expand-Archive "<PATH>\Sysmon.zip"

   Replace ``<PATH>`` with the directory where the ``Sysmon.zip`` file was downloaded.

#. Download the `Sysmon configuration file <https://wazuh.com/resources/blog/emulation-of-attack-techniques-and-detection-with-wazuh/sysmonconfig.xml>`__ using PowerShell as an administrator. Replace ``<SYSMON_EXECUTABLE_PATH>`` with the path to your Sysmon executable:

   .. code-block:: powershell

      > wget -Uri https://wazuh.com/resources/blog/emulation-of-attack-techniques-and-detection-with-wazuh/sysmonconfig.xml -OutFile <SYSMON_EXECUTABLE_PATH>\sysmonconfig.xml

#. Switch to the folder containing the Sysmon executable. Run the command below to install and start Sysmon:

   .. code-block:: powershell

      > .\Sysmon64.exe -accepteula -i sysmonconfig.xml

   If you are on ARM64, use:

   .. code-block:: powershell

      > .\Sysmon64a.exe -accepteula -i sysmonconfig.xml

#. Add the following configuration between the ``<ossec_config>`` tags of the Wazuh agent ``C:\Program Files (x86)\ossec-agent\ossec.conf`` file:

   .. code-block:: xml

      <localfile>
        <location>Microsoft-Windows-Sysmon/Operational</location>
        <log_format>eventchannel</log_format>
      </localfile>

#. Restart the Wazuh agent via PowerShell with administrator privileges to apply the configuration change:

   .. code-block:: powershell

      > Restart-Service -Name WazuhSvc

Trigger a Sysmon event
^^^^^^^^^^^^^^^^^^^^^^^^^

#. Trigger a Sysmon event by launching ``whoami.exe``:

   .. code-block:: powershell

      > C:\Windows\System32\whoami.exe

Visualize the event
^^^^^^^^^^^^^^^^^^^^^^

#. Navigate to **Explore** > **Discover** in the Wazuh dashboard and filter on the event where ``event.dataset`` is ``sysmon`` and ``process.executable`` is ``C:\Windows\System32\whoami.exe``.

   .. thumbnail:: /images/manual/log-data-collection/sysmon-event-triggered.png
      :title: Image showing a triggered Sysmon event
      :alt: Discover in the Wazuh dashboard showing a Sysmon event from the WindowsServer2022 agent for C:\Windows\System32\whoami.exe.
      :align: center
      :width: 80%

.. _configuring_rsyslog_relay:

Configuring rsyslog on a Linux endpoint
-------------------------------------------

Use an rsyslog relay to collect syslog from devices that cannot run a Wazuh agent, such as firewalls, switches, and routers. Follow the steps below to configure a monitored Linux endpoint as an rsyslog relay and forward the received messages to the Wazuh manager:

#. Install rsyslog:

   .. code-block:: console

      $ sudo apt update
      $ sudo apt install rsyslog -y

#. Enable and start the rsyslog service:

   .. code-block:: console

      $ sudo systemctl enable rsyslog
      $ sudo systemctl start rsyslog

#. Create a dedicated configuration file ``/etc/rsyslog.d/10-remote.conf`` with the following content.

   .. code-block:: none

      module(load="imudp")
      input(type="imudp" port="514" ruleset="remote")

      template(name="TraditionalSyslogFormat" type="string"
               string="%timegenerated% %HOSTNAME% %syslogtag%%msg:::sp-if-no-1st-sp%%msg%\n")

      ruleset(name="remote") {
          action(type="omfile" file="/var/log/remote.log" template="TraditionalSyslogFormat")
          stop
      }

   The ``TraditionalSyslogFormat`` template writes the tag of an RFC 3164 message with its process ID and colon, such as ``sshd[2301]:``. The Wazuh decoders need the colon to classify the message. Messages in RFC 5424 format reach the file without it and stay unclassified. Configure your devices to send syslog in RFC 3164 format.

#. Create the destination log:

   .. code-block:: console

      $ sudo touch /var/log/remote.log
      $ sudo chown syslog:adm /var/log/remote.log
      $ sudo chmod 640 /var/log/remote.log

#. Validate the configuration:

   .. code-block:: console

      $ sudo rsyslogd -N1

   Expected output:

   .. code-block:: none
      :class: output

      rsyslogd: version <VERSION>, config validation run (level 1), master config /etc/rsyslog.conf
      rsyslogd: End of config validation run. Bye.

#. Restart rsyslog:

   .. code-block:: console

      $ sudo systemctl restart rsyslog

#. Verify rsyslog is listening on port 514:

   .. code-block:: console

      $ sudo ss -lun | grep 514

   Expected output:

   .. code-block:: none
      :class: output

      UNCONN 0      0            0.0.0.0:514        0.0.0.0:*
      UNCONN 0      0               [::]:514           [::]:*

   Allow inbound UDP port 514 from your network devices in every firewall in the path, including cloud security groups and network ACLs. If ufw is enabled on the relay, allow UDP port 514 from your network:

   .. code-block:: console

      $ sudo ufw allow from <NETWORK_CIDR> to any port 514 proto udp

   Ensure you replace ``<NETWORK_CIDR>`` with your specified network CIDR.

#. Add the following block between the ``<ossec_config>`` tags of the Wazuh agent ``/var/ossec/etc/ossec.conf`` file:

   .. code-block:: xml

      <localfile>
        <location>/var/log/remote.log</location>
        <log_format>syslog</log_format>
      </localfile>

#. Restart the Wazuh agent.

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

If a device sends only RFC 5424, receive its messages on a second UDP port with a template that adds the colon. Add the following to ``/etc/rsyslog.d/10-remote.conf``, and send only RFC 5424 messages to port ``5514``:

.. code-block:: none

   input(type="imudp" port="5514" ruleset="remote-rfc5424")

   template(name="RFC5424Format" type="string"
            string="%timegenerated% %HOSTNAME% %syslogtag%:%msg:::sp-if-no-1st-sp%%msg%\n")

   ruleset(name="remote-rfc5424") {
       action(type="omfile" file="/var/log/remote.log" template="RFC5424Format")
       stop
   }

Allow inbound UDP traffic on port ``5514`` in the same way as port ``514`` in step 7.

To test it, send an RFC 5424 test message to port ``5514`` with the ``logger`` command:

.. code-block:: console

   $ logger -n <RSYSLOG_SERVER_IP> -P 5514 -d -t sshd -i "Failed password for invalid user admin from 203.0.113.47 port 50155 ssh2"

Test log injection from an rsyslog client
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps from another Linux endpoint on the same network as the rsyslog relay:

#. Send an OpenSSH-format test message to the relay IP address with the ``logger`` command:

   .. code-block:: console

      $ logger --rfc3164 -n <RSYSLOG_SERVER_IP> -P 514 -d -t sshd -i "Failed password for invalid user admin from 203.0.113.47 port 50155 ssh2"

   The ``-d`` option sends the message over UDP, and ``--rfc3164`` sends it in the traditional syslog format that the relay template writes.

#. On the rsyslog relay, check that rsyslog wrote the message to ``/var/log/remote.log``:

   .. code-block:: console

      $ sudo tail -n 1 /var/log/remote.log

   Expected output:

   .. code-block:: none
      :class: output

      <TIMESTAMP> <CLIENT_HOSTNAME> sshd[<PID>]: Failed password for invalid user admin from 203.0.113.47 port 50155 ssh2

   rsyslog can hold back a message that repeats the previous one until a different message arrives. Change the message text when you send a test message again.

Visualize the event
^^^^^^^^^^^^^^^^^^^^^^

#. Navigate to **Explore** > **Discover** in the Wazuh dashboard and filter on the event where ``wazuh.protocol.location`` is ``/var/log/remote.log``.

   The event shows ``wazuh.integration.name`` ``system-auth``, ``wazuh.integration.category`` ``system-activity``, and the decoders ``decoder/core-wazuh-message/0``, ``decoder/syslog/0``, and ``decoder/system-auth/0``. Wazuh also generates the ``Failed authentication attempt - admin`` finding.

   .. thumbnail:: /images/manual/log-data-collection/rsyslog-log-collection-linux.png
      :title: Image showing log collection on a monitored Linux endpoint
      :alt: Discover in the Wazuh dashboard showing events relayed through rsyslog from /var/log/remote.log, with the integration name, category, and decoders columns.
      :align: center
      :width: 80%

   Wazuh indexes a relayed message when an integration decoder classifies it. For devices that no Wazuh integration covers, create a :doc:`custom decoder </user-manual/data-analysis/decoders>`, or enable :ref:`unclassified event storage <wazuh_indexer_indices_enabling_unclassified_events_storage>`, to see their messages in **Discover**.

Configuring a custom socket output on a macOS endpoint
-----------------------------------------------------------

To forward logs to a custom socket on a macOS endpoint, follow the steps in :ref:`Configuring sockets <configuring_sockets>`, which provide the macOS configuration file and restart command. Then run the checks below.

Test log forwarding to the custom socket (macOS)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on the same monitored endpoint:

#. Verify that the Wazuh agent is connected to the socket:

   .. code-block:: console

      $ sudo lsof -U | grep custom.sock

   Expected output:

   .. code-block:: none
      :class: output

      nc        1234 root    3u  unix 0x0000000000000000      0t0      /var/run/custom.sock
      nc        1234 root    4u  unix 0x0000000000000000      0t0      /var/run/custom.sock

   The first ``lsof`` line is the ``nc`` listener. The second line is the connection that ``nc`` accepted from the Wazuh agent. The agent opens it when it forwards the first log line and keeps it open until the agent stops.

Visualize the event
^^^^^^^^^^^^^^^^^^^^^^

#. Navigate to **Explore** > **Discover** in the Wazuh dashboard and filter on the event where ``wazuh.protocol.location`` is ``/PATH_TO_FILE/file.log``. The event shows ``wazuh.integration.name`` ``system-auth``, and Wazuh generates the Failed authentication attempt - admin finding. Wazuh receives the line because the ``<target>`` element keeps ``agent``.

   .. thumbnail:: /images/manual/log-data-collection/custom-socket-log-collection-macos.png
      :title: Image showing a monitored log file
      :alt: Discover in the Wazuh dashboard showing the TEST-SOCKET line from the macOS agent in the wazuh-events-v5-unclassified index.
      :align: center
      :width: 80%
