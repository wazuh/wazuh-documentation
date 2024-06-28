.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh manager is responsible for data analysis and alerting. Learn more in this section of the documentation.

Wazuh manager
=============

The Wazuh manager is responsible for data analysis and alerting. It can forward alerts through syslog, emails, or integrated external APIs. See the :doc:`data analysis </user-manual/ruleset/index>` documentation for more information on how Wazuh performs data analysis.

The Wazuh manager comprises several services and components that are responsible for various functions. These include enrolling new Wazuh agents, aggregating security events, decoding logs, evaluating rules, and alerting. It is also responsible for other functions like validating the Wazuh agent’s identities and encrypting the communications between the Wazuh agent and the Wazuh server.

Agent enrollment service
------------------------

The agent enrollment service is used to enroll Wazuh agents to the Wazuh manager. The enrollment service simplifies the enrollment of  Wazuh agents and ensures that they are properly authenticated and configured to communicate securely with the Wazuh manager.  

When a Wazuh agent is installed and started on an endpoint, it automatically contacts the Wazuh manager to initiate the enrollment process. The Wazuh manager generates a unique authentication key that encrypts its communication with the Wazuh agent. You can configure additional security measures for the enrollment process such as password authentication, Wazuh manager identity verification, and Wazuh agent identity verification. Refer to the documentation on :doc:`Wazuh agent enrollment </user-manual/agent/agent-enrollment/index>` for more information on the enrollment process.

Configuration
^^^^^^^^^^^^^

The ``<auth>`` block below is the default agent enrollment service configuration on the ``/var/ossec/etc/ossec.conf`` file of the Wazuh server:

.. code-block:: xml

   <auth>
     <disabled>no</disabled>
     <remote_enrollment>yes</remote_enrollment>
     <port>1515</port>
     <use_source_ip>no</use_source_ip>
     <force>
       <enabled>yes</enabled>
       <disconnected_time enabled="yes">1h</disconnected_time>
       <after_registration_time>1h</after_registration_time>
       <key_mismatch>yes</key_mismatch>
     </force>
     <purge>yes</purge>
     <use_password>no</use_password>
     <ciphers>HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH</ciphers>
     <!-- <ssl_agent_ca></ssl_agent_ca> -->
     <ssl_verify_host>no</ssl_verify_host>
     <ssl_manager_cert>etc/sslmanager.cert</ssl_manager_cert>
     <ssl_manager_key>etc/sslmanager.key</ssl_manager_key>
     <ssl_auto_negotiate>no</ssl_auto_negotiate>
   </auth>

Where:

-  ``<disabled>`` enables or disables the process of the Wazuh agent enrolling and authenticating with the Wazuh manager. The default value is ``no``. The allowed values are ``yes`` and ``no``.
-  ``<remote_enrollment>`` enables the Wazuh manager to accept connections from new Wazuh agents using TLS encryption on port 1515 by default. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
-  ``<port>`` specifies the TCP port number for listening to connections. The default value is ``1515``. The allowed value is any port number between ``0`` and ``65535``.
-  ``<use_source_ip>`` defines whether to use the client’s source IP address or the use of “any” to add a Wazuh agent. The allowed values are ``yes`` and ``no``. When the value is no, the Wazuh agent can connect to the Wazuh manager even if the source IP used for enrollment changes. However, when the value is yes, the Wazuh agent cannot connect to the Wazuh manager if the source IP address changes.
-  ``<force>`` specifies the options to be configured for a Wazuh agent re-enrollment within its tag. For the re-enrollment to be successful, all the conditions must be met. The following options defines the settings for the ``force`` option:

   -  ``<enabled>`` specifies whether or not to force the insertion of a Wazuh agent if there is a duplicate name or IP address. If it is ``enabled``, it will remove the old Wazuh agent with the same name or IP address. The default value is ``yes``. The possible values are ``yes`` and ``no``.
   -  ``<disconnected_time>`` specifies whether a replacement will be performed for only Wazuh agents that have been disconnected longer than the value configured in the setting. The default value is ``1h`` (one hour). The allowed value is any number greater or equal to zero. It allows suffixes like ``s``, ``h``, ``m``, and ``d`` to represent second, hour, minute, and day. The attribute setting ``enabled`` has the default value of ``yes``, meaning replacement will only happen after the specified disconnection time is exceeded. The enabled attribute has two possibilities of ``yes`` and ``no``.
   -  ``<after_registration_time>`` specifies that the Wazuh agent replacement will be performed only when the time has passed since the Wazuh agent registration is greater than the value configured in the setting. The default value is ``1h``. The allowed value is any number greater or equal to zero. It allows suffixes like ``s``, ``h``, ``m``, and ``d`` to represent second, hour, minute, and day.
   -  ``<key_mismatch>`` defines that the Wazuh agent replacement occurs when the key held by the Wazuh agent differs from the one registered by the manager. The default value is ``yes``. The possible values are ``yes`` and ``no``.

-  ``<purge>`` specifies whether the client keys will be deleted when Wazuh agents are removed. When the value is ``no``, removed Wazuh agents will remain in the client keys file marked as removed. When the value is set to ``yes``, the client keys file will be purged. The default value is ``yes``. The possible values are ``yes`` and ``no``.
-  ``<use_password>`` determines the use of shared password authentication.  When the value is ``no``, this option is disabled. When the value is set to ``yes``, a shared password will be read from the ``/var/ossec/etc/authd.pass`` file. If this file does not exist, a random password will be generated and stored in the ``/var/ossec/logs/ossec.log`` file on the Wazuh server. See the :doc:`using password authentication </user-manual/agent/agent-enrollment/security-options/using-password-authentication>` documentation for more information.
-  ``<ciphers>`` sets the list of ciphers for network communication using SSL. The default value is ``HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH``.
-  ``<ssl_agent_ca>`` specifies the path to the CA certificate used to verify clients. It can be referred to as a relative path under the Wazuh installation directory or a full path. The possible value is any valid path.
-  ``<ssl_verify_host>`` toggles source host verification on and off when a CA certificate is specified. The client source IP address will be validated using the Common Name field. The default value is ``no``. The allowed values are ``yes`` and ``no``.
-  ``<ssl_manager_cert>`` specifies the path to the server SSL certificate. It can be referred to as a relative path under the Wazuh installation directory or a full path. The default value is etc/sslmanager.cert. The possible value is any valid path.
-  ``<ssl_manager_key>`` specifies the path to the server's SSL key. It can be referred to as a relative path under the Wazuh installation directory or a full path. The default value is etc/sslmanager.key. The possible value is any valid path.
-  ``<ssl_auto_negotiate>`` toggles whether or not to auto select the SSL/TLS method. By default, only TLS v1.2 is allowed. When set to ``yes``, the system will negotiate the most secure common method with the client. In older systems where the manager does not support TLS v1.2, this option will be enabled automatically. The default value is ``no``. The allowed values are ``yes`` and ``no``.

Restart the Wazuh manager via the command line interface with the following command whenever you make changes to the configuration file:

.. include:: /_templates/common/restart_manager.rst

Agent connection service
------------------------

The agent connection service listens for events from Wazuh agents to establish and maintain a persistent and secure communication channel. The Wazuh agent uses this secure channel to send security data to the Wazuh manager for analysis. By default, the service uses the ``TCP`` protocol to secure communication between the Wazuh agent and the Wazuh manager.

.. _agent_connection_service_configuration:

Configuration
^^^^^^^^^^^^^

The block below is the default connection service configuration on the Wazuh server ``/var/ossec/etc/ossec.conf`` configuration file:

.. code-block:: xml

   <ossec_config>
     <remote>
       <connection>secure</connection>
       <port>1514</port>
       <protocol>tcp</protocol>
       <queue_size>131072</queue_size>
     </remote>
   </ossec_config>

Where:

-  ``<connection>`` specifies the type of incoming connection to accept. The default value is secure. The allowed values are ``secure`` and ``syslog``.
-  ``<port>`` specifies the port to use to listen for events. The default port value is ``1514`` for secure connection and ``514`` for syslog connection. The allowed value is any port number between ``1`` and ``65535``.
-  ``<protocol>`` specifies the protocol to use for the connection. The default value is ``tcp``. The allowed values are ``tcp`` and udp``.
-  ``<queue_size>`` allows you to set the capacity of the remote daemon queue in the number of Wazuh agent events. The default value is ``131072``. The allowed value is an integer number between ``1`` and ``262144``. The remote queue is only available for Wazuh agent events, not syslog events. This option only works when the connection is set to secure. To learn more about this configuration setting, check our documentation on the :doc:`Wazuh queue <>`.

More options can be found in the :ref:`remote <reference_ossec_remote>` section of the Wazuh documentation.

Restart the Wazuh manager via the command line interface with the following command to implement changes, if changes are made:

.. include:: /_templates/common/restart_manager.rst

For example, you can verify the operation of the connection service during the enrollment of a Wazuh agent on a Windows endpoint (with IP address 192.168.71.125) to a Wazuh manager (with IP address 192.168.71.203) using netstat. Also, a Wazuh agent running on any Wazuh supported endpoint forwards security events to the Wazuh manager on port ``1514``.  It uses the configuration detailed in the agent connection service :ref:`configuration <agent_connection_service_configuration>` section above.

Perform the following steps to verify the operation of the connection service between the Wazuh manager and the Wazuh agent:

#. Launch the command prompt on the Windows endpoint and run the ``netstat -a`` commands to list the connections on the endpoint: 

   .. code-block:: doscon

      netstat -a

   .. code-block:: none
      :class: output
      :emphasize-lines: 10

      C:\Users\Tony>netstat -a

      Active Connections

        Proto  Local Address          Foreign Address        State
          TCP    192.168.71.125:51787   a23-53-42-162:https    ESTABLISHED
        TCP    192.168.71.125:51788   a-0003:https           ESTABLISHED
        TCP    192.168.71.125:51789   a-0003:https           ESTABLISHED
        TCP    192.168.71.125:51790   a23-53-42-162:https    ESTABLISHED
        TCP    192.168.71.125:51791   192.168.71.203:1514    SYN_SENT

   We can see that the Windows endpoint with IP address ``192.168.71.125`` has sent a TCP ``SYN_SENT`` packet and is waiting to establish a connection to the Wazuh server with IP address ``192.168.71.203`` on port ``1514``.

#. Run the ``netstat`` command to view when the Wazuh server establishes a connection with the Windows 10 endpoint.

   .. code-block:: doscon

      netstat

   .. code-block:: none
      :class: output
      :emphasize-lines: 7

      Active Connections

        Proto  Local Address          Foreign Address        State
        TCP    192.168.71.125:3389    192.168.71.1:25743     ESTABLISHED
        TCP    192.168.71.125:51572   a23-64-12-19:https     CLOSE_WAIT
        TCP    192.168.71.125:51573   192.229.221.95:http    CLOSE_WAIT
        TCP    192.168.71.125:51694   192.168.71.203:1514    ESTABLISHED
        TCP    192.168.71.125:51699   192.168.20.103:ms-do   SYN_SENT
        TCP    192.168.71.125:51701   192.168.20.101:ms-do   SYN_SENT
        TCP    192.168.71.125:51703   20.231.121.79:http     SYN_SENT
        TCP    192.168.71.125:51704   192.168.20.125:ms-do   SYN_SENT

   We can see that the Windows endpoint with IP address ``192.168.71.125`` is connected to the Wazuh server with IP address ``192.168.71.203`` on port ``1514``.

Analysis engine
---------------

The Wazuh analysis engine analyzes data on several log types such as Windows events, SSH logs, web server logs, and others. It uses decoders to identify the type of information being processed and rules to identify specific patterns in the decoded event. These rules could trigger alerts and response actions like blocking an IP address and removing malware.

Data sources
^^^^^^^^^^^^

Wazuh collects logs from various sources, allowing for comprehensive monitoring of all aspects of your IT infrastructure. This allows Wazuh to detect complex threats, reduce vulnerability exposure, ensure compliance with security policies, and respond swiftly to identified security incidents. Below are some of the common data sources supported by Wazuh:

-  **Operating system logs**: Wazuh collects logs generated by several operating systems, like :ref:`Windows <how-to-collect-windowslogs>`, :ref:`Linux <how-to-collect-linuxlogs>`, and :ref:`macOS <how-to-collect-macoslogs>`. It can collect a variety of logs from Linux endpoints, including syslog, auditd, application logs, and others. On Windows endpoints, Wazuh collects Windows event logs from System, Applications, and Security event channels by default. Wazuh collects logs on macOS endpoints by using the macOS unified logging system (ULS). The macOS ULS centralizes the management and storage of logs across all the system levels.
-  **Syslog events**: Wazuh collects logs from a variety of :doc:`syslog-enabled </user-manual/capabilities/log-data-collection/how-it-works>` devices, including Linux/Unix systems and network devices that do not require Wazuh agent installation.
-  **Agentless monitoring**: The Wazuh :doc:`agentless monitoring </user-manual/capabilities/agentless-monitoring/how-it-works>` capability monitors endpoints that do not support agent installation. It requires an SSH connection between the endpoint and the Wazuh server. This capability enables monitoring of files, directories, or configurations and running commands on the endpoint.
-  **Cloud provider logs**: Wazuh monitors cloud infrastructure by collecting logs and events directly from cloud service providers like :doc:`AWS </cloud-security/amazon/index>`, :doc:`Azure </cloud-security/azure/index>`, :doc:`Google Cloud </cloud-security/gcp/index>`, and :doc:`Office 365 </cloud-security/office365/index>`. These include logs from cloud services such as EC2 instances, S3 buckets, Azure VMs, and more.
-  **Custom logs**: You can configure  Wazuh to collect and parse logs from several applications and third-party security tools, including :doc:`VirusTotal </user-manual/capabilities/malware-detection/virus-total-integration>`, :doc:`Windows Defender </user-manual/capabilities/malware-detection/win-defender-logs-collection>`, :doc:`ClamAV </user-manual/capabilities/malware-detection/clam-av-logs-collection>`, and more.

Decoding
^^^^^^^^

Decoding is the process of analyzing structured or unstructured data, such as logs from different data sources, to extract meaningful information that can be used for monitoring and alerting. The main purpose of decoding in Wazuh is to transform raw data into a format that the Wazuh manager can interpret and process. It involves two processes:

-  **Pre-decoding phase**: In this phase, the log analysis engine extracts syslog-like information such as timestamp, hostname, and program name from the log header. The pre-decoding phase simplifies the log structure and prepares it for further analysis. Consider the following sample log entry to illustrate the process of pre-decoding:

   .. code-block:: none

      Feb 14 12:19:04 192.168.1.1 sshd[25474]: Accepted password for Stephen from 192.168.1.133 port 49765 ssh2

   We use the Wazuh Logtest tool to demonstrate the pre-decoding phase. Perform the steps below on the Wazuh server:

   #. Run the ``/var/ossec/bin/wazuh-logtest`` from command line on the Wazuh server
   #. Copy and paste the sample log above and click enter.

   The extracted information after the pre-decoding phase is shown below:

   .. code-block:: none

      Starting wazuh-logtest v4.8.0
      Type one log per line

      Feb 14 12:19:04 192.168.1.1 sshd[25474]: Accepted password for Stephen from 192.168.1.133 port 49765 ssh

      **Phase 1: Completed pre-decoding.
              full event: 'Feb 14 12:19:04 192.168.1.1 sshd[25474]: Accepted password for Stephen from 192.168.1.133 port 49765 ssh'
              timestamp: 'Feb 14 12:19:04'
              hostname: '192.168.1.1'
              program_name: 'sshd'

-  **Decoding**: In this phase, the Wazuh analysis engine applies a decoder that matches the log. Decoders extract fields such as user names, IP addresses, error codes, URLs, and any other relevant information contained in the logs. The decoders below match the sample log. These decoders are in the ``/var/ossec/rulesets/decoders/0310-ssh_decoders.xml`` file on the Wazuh server:

   .. code-block:: console

      <decoder name="sshd">
        <program_name>^sshd</program_name>
      </decoder>

      <decoder name="sshd-success">
        <parent>sshd</parent>
        <prematch>^Accepted</prematch>
        <regex offset="after_prematch">^ \S+ for (\S+) from (\S+) port (\S+)</regex>
        <order>user, srcip, srcport</order>
        <fts>name, user, location</fts>
      </decoder>

   The decoder ``sshd`` matches the program name ``sshd``, while the decoder ``ssh-success`` extracts ``Stephen``, ``192.168.1.133``, and ``49765`` from the sample log.

   We use the Wazuh Logtest tool to demonstrate the decoding phase. Perform the steps below on the Wazuh server:

   #. Run the ``/var/ossec/bin/wazuh-logtest`` from command line on the Wazuh server.
   #. Copy and paste the sample log above and click enter.

   The extracted information after the decoding phase is shown below:

   .. code-block:: none
      :emphasize-lines: 13-18

      Starting wazuh-logtest v4.7.5
      Type one log per line

      Feb 14 12:19:04 192.168.1.1 sshd[25474]: Accepted password for Stephen from 192.168.1.133 port 49765 ssh

      **Phase 1: Completed pre-decoding.
              full event: 'Feb 14 12:19:04 192.168.1.1 sshd[25474]: Accepted password for Stephen from 192.168.1.133 port 49765 ssh'
              timestamp: 'Feb 14 12:19:04'
              hostname: '192.168.1.1'
              program_name: 'sshd'

      **Phase 2: Completed decoding.
              name: 'sshd'
              parent: 'sshd'
              dstuser: 'Stephen'
              srcip: '192.168.1.133'
              srcport: '49765'

Rule evaluation and alerting
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
