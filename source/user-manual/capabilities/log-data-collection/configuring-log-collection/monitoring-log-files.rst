.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Collecting logs from a file allows Wazuh to monitor specific events and ingest new log entries as they are written. Learn how to monitor a single log file, use wildcard patterns, and configure additional output sockets.

Collecting logs from a file
============================

Collecting logs from a file allows Wazuh to monitor specific events and ingest new log entries as they are written. This helps you track application activity, system events, and security-relevant changes in near real-time.

Monitoring a single log file
------------------------------

Configure the Wazuh agent configuration file on Windows, Linux, and macOS endpoints to monitor basic log files. For example, follow these steps to monitor ``file.log``.

#. Add the following settings between the ``<ossec_config>`` tags of the Wazuh agent configuration file:

   -  Linux: ``/var/ossec/etc/ossec.conf``

     .. code-block:: xml

        <localfile>
          <location>/PATH_TO_FILE/file.log</location>
          <log_format>syslog</log_format>
        </localfile>

   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``

     .. code-block:: xml

        <localfile>
          <location>C:\PATH_TO_FILE\file.log</location>
          <log_format>syslog</log_format>
        </localfile>

   -  macOS: ``/Library/Ossec/etc/ossec.conf``

     .. code-block:: xml

        <localfile>
          <location>/PATH_TO_FILE/file</location>
          <log_format>syslog</log_format>
        </localfile>

   For best results on macOS, omit the ``.log`` extension from the filename (for example, ``/PATH_TO_FILE/``) or use a different ``log_format``, such as macOS ULS logs where appropriate.

   Where:

   -  ``location`` is the full path of the monitored file.
   -  ``log_format`` is the log format. Refer to the log format documentation to learn more about the different types of ``log_format`` you can configure.

   Refer to the localfile documentation to learn more about the options of the ``<localfile>`` configuration block.

#. Restart the Wazuh agent with root or administrator privileges to apply the configuration change:

   -  Linux: ``sudo systemctl restart wazuh-agent``
   -  Windows (PowerShell): ``Restart-Service -Name wazuh``
   -  macOS: ``sudo /Library/Ossec/bin/wazuh-control restart``

Monitoring log files using wildcard patterns
----------------------------------------------

Wazuh supports wildcard patterns when monitoring log files, enabling flexible file selection. You can monitor all files starting with and ending with a specific name variable within a monitored endpoint's directory, such as ``file1.log`` and ``file2.log``. To do this, include the wildcard flag ``*`` in the ``<location>`` configuration.

Follow these steps to monitor every log file that starts with ``file`` and ends with ``.log`` in a monitored endpoint's directory.

#. Add the following settings in between the ``<ossec_config>`` tags of the Wazuh agent configuration file:

   -  Linux: ``/var/ossec/etc/ossec.conf``
   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   -  macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <localfile>
        <location>/PATH_TO_FILE/file*.log</location>
        <log_format>syslog</log_format>
      </localfile>

#. Restart the Wazuh agent with administrator or root privileges to apply the configuration change:

   -  Linux: ``sudo systemctl restart wazuh-agent``
   -  Windows (PowerShell): ``Restart-Service -Name wazuh``
   -  macOS: ``sudo /Library/Ossec/bin/wazuh-control restart``

Configuring sockets
----------------------

A socket is a local communication endpoint that allows the Wazuh agent to send collected log data to another process. By default, the agent sends logs through its standard agent socket, but you can configure an additional socket when another local process needs to read, filter, process, or forward the same logs. The Logcollector module supports UNIX, TCP, and UDP sockets on Linux and macOS endpoints.

You can use the ``<socket>`` tag to add new output sockets and then configure the Wazuh agent to output logs to that socket. You must create the new socket on your monitored endpoint before adding it to your Wazuh configuration file. You can create the socket with your custom application or with netcat. For example, the command ``nc -lkU /var/run/custom.sock`` creates a new socket ``/var/run/custom.sock``, which you can forward logs to.

Perform the following steps on the monitored endpoint to create a new output socket and forward logs from ``file.log`` to it:

#. Add the following configuration between the ``<ossec_config>`` tags of the Wazuh agent configuration file to add a new socket path:

   -  Linux: ``/var/ossec/etc/ossec.conf``
   -  macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <socket>
        <name>custom_socket</name>
        <location>/var/run/custom.sock</location>
        <mode>tcp</mode>
        <prefix>custom_syslog: </prefix>
      </socket>

   Where:

   -  ``<name>`` is the name of the socket. This field is required.
   -  ``<location>`` is the socket path. This field is required.
   -  ``<mode>`` is the socket communication protocol; UDP by default. The allowed values are ``tcp`` or ``udp``. This field is optional.
   -  ``<prefix>`` is a string placed before the message. This field is optional.

   Refer to the socket documentation for more information about defining a socket.

#. Add the following to the agent configuration file to forward logs from ``file.log`` to ``custom_socket``:

   .. code-block:: xml

      <localfile>
        <log_format>syslog</log_format>
        <location>/PATH_TO_FILE/file.log</location>
        <target>agent,custom_socket</target>
      </localfile>

   To keep the output on the default socket, specify ``agent`` as the target. Otherwise, the output is redirected only to the specified targets.

#. Restart the Wazuh agent with administrator privileges to apply the configuration change:

   -  Linux: ``sudo systemctl restart wazuh-agent``
   -  macOS: ``sudo /Library/Ossec/bin/wazuh-control restart``
