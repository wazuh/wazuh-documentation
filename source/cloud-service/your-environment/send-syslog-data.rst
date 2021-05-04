.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_your_environment_send_syslog:

.. meta::
  :description: Learn about your environment

Forward syslog events
=====================

Wazuh agents can run on a wide range of operative systems, but when it is not possible due to software incompatibilities or business restrictions, you can forward syslog events to your environment. This is a common use case for network devices such as routers or firewalls.

Since every communication with your environment is performed through the Wazuh agent, you have to configure the agent to forward the syslog events. To do so, you have several options:

- `rsyslog on Linux`_

- `Logstash on Windows`_

rsyslog on Linux
^^^^^^^^^^^^^^^^

Use rsyslog on a Linux host with a Wazuh agent to log to a file and send those logs to the environment.

1. Configure rsyslog to receive syslog events and enable the TCP or UDP settings by editing ``/etc/rsyslog.conf``.

- For TCP:

   .. code-block::

      $ModLoad imtcp
      $InputTCPServerRun <PORT>

- For UDP:

   .. code-block::

      $ModLoad imudp
      $UDPServerRun <PORT>

   Make sure to review your firewall/SELinux configuration to allow this communication.
 
2. Configure rsyslog to forward events to a file by editing ``/etc/rsyslog.conf``.

   .. code-block::

      # Storing Messages from a Remote System into a specific File
      if $fromhost-ip startswith 'xxx.xxx.xxx.' then /var/log/<file_name.log>
      & ~

To perform the following steps, make sure to replace ``<file_name.log>`` with the name chosen for this log.

3. Deploy a Wazuh agent on the same host that has rsyslog.

4. Configure the agent to read the syslog output file editing ``/var/ossec/etc/ossec.conf``.

   .. code-block:: XML

      <localfile>
      <log_format>syslog</log_format>
      <location>/var/log/<file_name.log></location>
      </localfile>

5. Restart rsyslog and wazuh agent.

   .. code-block:: console

      # systemctl restart rsyslog
      # systemctl restart wazuh-agent
   
Logstash on Windows
^^^^^^^^^^^^^^^^^^^
   
Use Logstash on a Windows host with a Wazuh agent to receive syslog, log to a file, and send those logs to the environment. To perform this action sucessfully, make sure that Windows is fully updated and `Java JRE <https://www.java.com/en/download/windows-64bit.jsp>`_ is installed.

1. Configure JRE.

   #. On the taskbar of your computer desktop, click **Start** to open the menu, search for "Edit the system environment variables", and open the system properties applet.
   #. On the Advanced tab pane, click **Environment Variables...**.
   #. Under **System variables**, click **New...**.
   #. Enter the variable name JAVA_HOME and browse to the JRE install directory, then click **OK** to confirm the action. In the variable value, the JRE directory should be displayed. For example, ``C:\Program Files\Java\jre1.8.0_201``.
   
      You might need to reopen your terminal to apply changes.

2. Install Logstash.

   #. Download the Logstash ZIP package from https://www.elastic.co/downloads/logstash.
   #. Extract the ZIP contents into a local folder. For example, to ``C:\logstash\``.

3. Install ``logstash-input-syslog`` and ``logstash-output-file`` plugins.

   .. code-block::
      
      C:\logstash\bin>logstash-plugin install logstash-input-syslog

   .. code-block::
               
      C:\logstash\bin>logstash-plugin install logstash-output-file

   If you are using PowerShell, make sure to add ``.\`` before the executable: ``.\logstash-plugin``

4. Configure Logstash.

   Create the following file: ``C:\logstash\config\logstash.conf``

   .. code-block::

      input {
      syslog {
         port => <PORT>
      }
      }
      
      output {
      file {
         path => “C:\logstash\logs\<file_name.log>”
         codec => “line“
      }
      }

To perform the following steps, make sure to replace ``<file_name.log>`` with the name chosen for this log.

5. Deploy a Wazuh agent on the same host that has Logstash.
   
6. Configure the agent to read the Logstash output file.

   Edit ``C:\Program Files (x86)\ossec-agent\ossec.conf`` to add the following:

   .. code-block:: XML

      <ossec_config>
      <localfile>
         <log_format>syslog</log_format>
         <location>C:\logstash\logs\<file_name.log></location>
      </localfile>
      </ossec_config>

8. Restart Logstash.

   #. Run Logstash from the command line:

      .. code-block:: console
   
         C:\logstash\bin\logstash.bat -f C:\logstash\config\logstash.conf
   
   #. `install Logstash as a Windows Service <https://www.elastic.co/guide/en/logstash/current/running-logstash-windows.html#running-logstash-windows>`_ either using `NSSM <https://www.elastic.co/guide/en/logstash/current/running-logstash-windows.html#running-logstash-windows-nssm>`_ or `Windows Task Scheduler <https://www.elastic.co/guide/en/logstash/current/running-logstash-windows.html#running-logstash-windows-scheduledtask>`_.

9. Restart Wazuh Agent. If you are running PowerShell, use the following command:

   .. code-block:: console
      
      Restart-Service OssecSvc
