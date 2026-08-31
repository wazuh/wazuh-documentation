.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Explore Log data collection use cases: monitor Sysmon events on a Windows endpoint, relay syslog through rsyslog on a Linux endpoint, and configure a custom socket output on a macOS endpoint.

Use cases
=========

The following use cases demonstrate how to configure Wazuh log collection for common endpoint and network monitoring scenarios, including Windows event monitoring, syslog relaying on Linux, and custom socket output on macOS.

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

      > Restart-Service -Name wazuh

Trigger a Sysmon event
^^^^^^^^^^^^^^^^^^^^^^^^^

#. Trigger a Sysmon event by launching ``whoami.exe``:

   .. code-block:: powershell

      > C:\Windows\System32\whoami.exe

Visualize the event
^^^^^^^^^^^^^^^^^^^^^^

#. Navigate to **Explore** > **Discover** and filter on the event:

   Where

   -  ``event.dataset`` is ``sysmon``
   -  ``process.executable`` is ``C:\Windows\System32\whoami.exe``

   .. thumbnail:: /images/manual/log-data-collection/sysmon-event-triggered.png
      :title: Image showing a triggered Sysmon event
      :alt: Image showing a triggered Sysmon event
      :align: center
      :width: 80%

.. _configuring_rsyslog_relay:

Configuring rsyslog on a Linux endpoint
-------------------------------------------

.. note::

   The Wazuh manager no longer accepts syslog events directly. To collect syslog from the network, configure rsyslog on a Linux endpoint with a Wazuh agent installed, write incoming messages to a log file, and monitor that file with the Logcollector module. The Wazuh manager has out-of-the-box decoders and rules to extract and analyze relevant fields from Linux events. You can create custom decoders and rules to parse and analyze Linux events.

Follow the steps below to configure a monitored Linux endpoint as an rsyslog relay and forward the received messages to the Wazuh manager:

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

#. Create the destination log:

   .. code-block:: console

      $ sudo touch /var/log/remote.log
      $ sudo chown syslog:adm /var/log/remote.log
      $ sudo chmod 640 /var/log/remote.log

#. Validate the configuration

   .. code-block:: console

      $ sudo rsyslogd -N1

#. Restart rsyslog:

   .. code-block:: console

      $ sudo systemctl restart rsyslog

#. Verify rsyslog is listening on port 514:

   .. code-block:: console

      $ sudo ss -lun | grep 514

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      UNCONN 0      0            0.0.0.0:514        0.0.0.0:*
      UNCONN 0      0               [::]:514           [::]:*

   Allow inbound UDP traffic on port 514 from your network devices at every point in the path: the host firewall (if enabled, for example ``ufw``), and any cloud security group, network ACL, or upstream firewall in front of the relay. Confirm the relay is receiving before moving on:

   .. code-block:: console

      $ sudo ufw allow from <NETWORK_CIDR> to any port 514 proto udp

   Ensure you replace ``<NETWORK_CIDR>`` with your specified network CIDR.

#. Configure the Wazuh agent to monitor that rsyslog output file using the Logcollector module:

   .. code-block:: xml

      <localfile>
        <location>/var/log/remote.log</location>
        <log_format>syslog</log_format>
      </localfile>

#. Restart the Wazuh agent.

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Test log injection from an rsyslog client
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps from another Linux endpoint on the same network as the rsyslog relay:

#. Send a test message directly to the relay IP address with the ``logger`` command:

   .. code-block:: console

      $ logger -n <RSYSLOG_SERVER_IP> -P 514 -d "TEST-RSYSLOG direct to remote.log from a monitored Wazuh agent"

Visualize the event
^^^^^^^^^^^^^^^^^^^^^^

#. Navigate to the **Explore** > **Discover** page on the Wazuh dashboard and use the filter to view the log:

   Where:

   ``wazuh.protocol.location`` is ``/var/log/remote.log``

   .. thumbnail:: /images/manual/log-data-collection/rsyslog-log-collection-linux.png
      :title: Image showing log collection on a monitored Linux endpoint
      :alt: Image showing log collection on a monitored Linux endpoint
      :align: center
      :width: 80%

Configuring a custom socket output on a macOS endpoint
-----------------------------------------------------------

Perform the following steps on the monitored macOS endpoint to create a new output socket, forward logs to it, and confirm delivery end-to-end.

#. Create the receiving socket with netcat before adding it to the Wazuh configuration:

   .. code-block:: console

      $ sudo nohup nc -lkU /var/run/custom.sock > /tmp/custom_socket_capture.log 2>&1 &

#. Create the log file that will be forwarded to the socket:

   .. code-block:: console

      $ sudo touch /var/log/socket-test.log
      $ sudo chmod 644 /var/log/socket-test.log

#. Add the following configuration between the ``<ossec_config>`` tags of the Wazuh agent ``/Library/Ossec/etc/ossec.conf`` file to add a new socket named ``custom_socket``:

   .. code-block:: xml

      <socket>
        <name>custom_socket</name>
        <location>/var/run/custom.sock</location>
        <mode>tcp</mode>
        <prefix>custom_syslog: </prefix>
      </socket>

#. Add the following to the agent configuration file to forward logs from ``socket-test.log`` to ``custom_socket``:

   .. code-block:: xml

      <localfile>
        <log_format>syslog</log_format>
        <location>/var/log/socket-test.log</location>
        <target>agent,custom_socket</target>
      </localfile>

#. Restart the Wazuh agent with administrator privileges to apply the configuration change:

   .. code-block:: console

      $ sudo /Library/Ossec/bin/wazuh-control restart

Test log forwarding to the custom socket (macOS)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on the same monitored endpoint:

#. Inject a distinctive test line into the monitored file:

   .. code-block:: console

      $ echo "TEST-SOCKET forwarding to custom_socket from a monitored Wazuh agent (macOS)" | sudo tee -a /var/log/socket-test.log

#. Confirm the socket receiver captured the forwarded message:

   .. code-block:: console

      $ cat /tmp/custom_socket_capture.log

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      custom_syslog: TEST-SOCKET forwarding to custom_socket from a monitored Wazuh agent (macOS)

#. Verify that the agent shows an established connection to the socket at the moment it forwards a log line:

   .. code-block:: console

      $ sudo lsof -U | grep custom.sock

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      nc           1234 root    3u  unix 0x0000000000000000      0t0      - /var/run/custom.sock
      wazuh-agentd 5678 root   12u  unix 0x0000000000000000      0t0      - /var/run/custom.sock

   The ``custom_syslog`` prefix confirms the ``<prefix>`` tag applied, and the second ``lsof`` line confirms the agent (not just the ``nc`` listener) held a connection to ``custom_socket`` at write time.

Visualize the event
^^^^^^^^^^^^^^^^^^^^^^

#. Navigate to the **Explore** > **Discover** page on the Wazuh dashboard and use the filter to view the monitored log file:

   Where:

   ``wazuh.protocol.location`` is ``/var/log/socket-test.log``

   .. thumbnail:: /images/manual/log-data-collection/custom-socket-log-collection-macos.png
      :title: Image showing a monitored log file
      :alt: Image showing a monitored log file
      :align: center
      :width: 80%
