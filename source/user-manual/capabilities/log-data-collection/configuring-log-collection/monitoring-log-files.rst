.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Collecting logs from a file allows Wazuh to monitor specific events and ingest new log entries as they are written. Learn how to monitor a single log file, use wildcard patterns, and configure additional output sockets.

Collecting logs from a file
============================

Collecting logs from a file allows Wazuh to monitor specific events and ingest new log entries as they are written. Wazuh indexes a collected line when an integration decoder classifies it. For lines from your own applications, create a :doc:`custom decoder </user-manual/data-analysis/decoders>`, or enable :ref:`unclassified event storage <wazuh_indexer_indices_enabling_unclassified_events_storage>`.

.. _monitoring_single_log_file:

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
          <location>/PATH_TO_FILE/file.log</location>
          <log_format>syslog</log_format>
        </localfile>

   Where:

   -  ``location`` is the full path of the monitored file.
   -  ``log_format`` is the log format. Refer to the :ref:`log format documentation <reference_ossec_localfile_log_format>` to learn more about the different types of ``log_format`` you can configure.

   Refer to the :doc:`localfile documentation </user-manual/reference/ossec-conf/localfile>` to learn more about the options of the ``<localfile>`` configuration block. To apply the block to every agent in a group from the Wazuh dashboard, see :ref:`Using a centralized configuration from the Wazuh dashboard <using_centralized_configuration_manager>`.

#. Restart the Wazuh agent with root or administrator privileges to apply the configuration change:

   -  Linux: ``sudo systemctl restart wazuh-agent``
   -  Windows (PowerShell): ``Restart-Service -Name WazuhSvc``
   -  macOS: ``sudo /Library/Ossec/bin/wazuh-control restart``

#. .. _monitoring_single_log_file_test_line:

   On a Linux or macOS endpoint, append a test line to the monitored file. The following line uses the OpenSSH authentication failure format:

   .. code-block:: console

      # echo "Nov 12 10:15:02 web-01 sshd[2301]: Failed password for invalid user admin from 203.0.113.47 port 50155 ssh2" >> /PATH_TO_FILE/file.log

   On a Windows endpoint, run the following command in PowerShell as an administrator:

   .. code-block:: ps1con

      > "Nov 12 10:15:02 web-01 sshd[2301]: Failed password for invalid user admin from 203.0.113.47 port 50155 ssh2" | Out-File -FilePath C:\PATH_TO_FILE\file.log -Append -Encoding ascii

#. Navigate to **Explore** > **Discover** in the Wazuh dashboard and filter on the event where ``wazuh.protocol.location`` is ``/PATH_TO_FILE/file.log``. On a Windows endpoint, it is ``C:\PATH_TO_FILE\file.log``.

   The event shows ``wazuh.integration.name`` ``system-auth`` and ``wazuh.integration.category`` ``system-activity``. Wazuh also generates the ``Failed authentication attempt - admin`` finding.

   To also index lines that no integration classifies, go to **Ruleset management** > **Overview** and select **Space actions** > **Edit** for the **Standard** space. Switch on **Index unclassified events** and click **Save**. The change takes effect after the Wazuh manager synchronizes the space, about 2 minutes later. Wazuh then indexes these lines in ``wazuh-events-v5-unclassified``, and Discover shows them under the default ``wazuh-events-v5*`` index pattern.

.. _monitoring_log_files_wildcard:

Monitoring log files using wildcard patterns
----------------------------------------------

To monitor several files with one block, include the wildcard flag ``*`` in the ``<location>`` configuration.

Follow these steps to monitor every log file that starts with ``file`` and ends with ``.log`` in a monitored endpoint's directory.

#. Add the following settings in between the ``<ossec_config>`` tags of the Wazuh agent configuration file:

   -  Linux: ``/var/ossec/etc/ossec.conf``

     .. code-block:: xml

        <localfile>
          <location>/PATH_TO_FILE/file*.log</location>
          <log_format>syslog</log_format>
        </localfile>

   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``

     .. code-block:: xml

        <localfile>
          <location>C:\PATH_TO_FILE\file*.log</location>
          <log_format>syslog</log_format>
        </localfile>

   -  macOS: ``/Library/Ossec/etc/ossec.conf``

     .. code-block:: xml

        <localfile>
          <location>/PATH_TO_FILE/file*.log</location>
          <log_format>syslog</log_format>
        </localfile>

#. Restart the Wazuh agent with administrator or root privileges to apply the configuration change:

   -  Linux: ``sudo systemctl restart wazuh-agent``
   -  Windows (PowerShell): ``Restart-Service -Name WazuhSvc``
   -  macOS: ``sudo /Library/Ossec/bin/wazuh-control restart``

#. Append a test line to one of the matching files, such as ``/PATH_TO_FILE/file1.log``, as in step 3 of :ref:`Monitoring a single log file <monitoring_single_log_file_test_line>`.

#. Navigate to **Explore** > **Discover** in the Wazuh dashboard and filter on the event where ``wazuh.protocol.location`` is ``/PATH_TO_FILE/file1.log``. The field holds the path of the file that matched the pattern.

.. _configuring_sockets:

Configuring sockets
----------------------

A socket is a local communication endpoint that allows the Wazuh agent to send collected log data to another process. By default, the agent sends logs through its standard agent socket. You can configure an additional socket when another local process needs to read, filter, process, or forward the same logs. The Logcollector module sends logs to UNIX domain sockets on Linux and macOS endpoints.

You can use the ``<socket>`` tag to add new output sockets and then configure the Wazuh agent to output logs to that socket. You must create the new socket on your monitored endpoint before adding it to your Wazuh configuration file. You can create the socket with your custom application or with netcat.

Perform the following steps on the monitored endpoint to create a new output socket and forward logs from ``file.log`` to it:

#. Create the receiving socket with netcat before you add it to the Wazuh agent configuration:

   .. code-block:: console

      # nohup nc -lkU /var/run/custom.sock > /tmp/custom_socket_capture.log 2>&1 &

   Then, add the following configuration between the ``<ossec_config>`` tags of the Wazuh agent configuration file to add a new socket path:

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
   -  ``<mode>`` is the type of UNIX domain socket: ``tcp`` for a stream socket or ``udp`` for a datagram socket. The default is ``udp``. This field is optional. The ``nc -lkU`` command in this example creates a stream socket, so the configuration uses ``tcp``.
   -  ``<prefix>`` is a string placed before the message. This field is optional.

   Refer to the :ref:`socket documentation <reference_ossec_socket>` for more information about defining a socket.

#. Replace the ``<localfile>`` block that you added in :ref:`Monitoring a single log file <monitoring_single_log_file>` with the following block. It forwards logs from ``file.log`` to ``custom_socket``:

   .. code-block:: xml

      <localfile>
        <log_format>syslog</log_format>
        <location>/PATH_TO_FILE/file.log</location>
        <target>agent,custom_socket</target>
      </localfile>

   To keep the output on the default socket, specify ``agent`` as the target. Otherwise, the output is redirected only to the specified targets. If two ``<localfile>`` blocks monitor the same file, the Wazuh agent uses only one of them and logs the warning ``(1958): Log file '/PATH_TO_FILE/file.log' is duplicated``. If you also added the wildcard block from :ref:`Monitoring log files using wildcard patterns <monitoring_log_files_wildcard>`, remove it, or add the ``<target>`` element to it. Otherwise, the Wazuh agent reads ``file.log`` through the wildcard block, whatever the order of the blocks, and sends its lines only to the default socket.

#. Restart the Wazuh agent with administrator privileges to apply the configuration change:

   -  Linux: ``sudo systemctl restart wazuh-agent``
   -  macOS: ``sudo /Library/Ossec/bin/wazuh-control restart``

#. Append a test line to the monitored file:

   .. code-block:: console

      # echo "Nov 12 10:15:02 web-01 sshd[2301]: Failed password for invalid user admin from 203.0.113.47 port 50155 ssh2" >> /PATH_TO_FILE/file.log

#. Check that the socket received the line:

   .. code-block:: console

      # cat /tmp/custom_socket_capture.log

   Expected output:

   .. code-block:: none
      :class: output

      custom_syslog: Nov 12 10:15:02 web-01 sshd[2301]: Failed password for invalid user admin from 203.0.113.47 port 50155 ssh2

   The socket receives each line without a line break. If you append more than one test line, the lines appear joined in the capture file.
