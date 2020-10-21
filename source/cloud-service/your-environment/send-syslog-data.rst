.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_your_environment_send_syslog:

.. meta::
  :description: Learn about your environment

Forward syslog events to Wazuh
==============================

Wazuh agents can run in a wide range of operative systems, but when it is not possible due to software incompabilities or business restricions, you can forward Syslog events to Wazuh Cloud. This is a common use case for network devices such as routers or firewalls.



Since every communication with Wazuh Cloud is performed through the Wazuh agent, you will have to configure the agent to forward the Syslog events. To do so, you have several options:

- `Rsyslog on Linux`_

- `Logstash on Windows`_

Rsyslog on Linux
^^^^^^^^^^^^^^^^

- Use **rsyslog on a Linux host** with a Wazuh agent to log to a file and send those logs to the environment.

1. Configure rsyslog to receive syslog events. Enable the TCP or UDP settings by editing ``/etc/rsyslog.conf``.

For TCP:

.. code-block::

   $ModLoad imtcp
   $InputTCPServerRun <PORT>

For UDP:

.. code-block::

   $ModLoad imudp
   $UDPServerRun <PORT>

Mind to review your firewall/SeLinux configuration to allow this communication.
 
2. Configure rsyslog to forward events to a file by editing ``/etc/rsyslog.conf``.

.. code-block::

   # Storing Messages from a Remote System into a specific File
   if $fromhost-ip startswith 'xxx.xxx.xxx.' then /var/log/<file_name.log>
   & ~

3. Deploy a Wazuh agent on the same host that has rsyslog.

4. Configure the agent to read the syslog output file editing ``/var/ossec/etc/ossec.conf``.

.. code-block:: XML

   <localfile>
     <log_format>syslog</log_format>
     <location>/var/log/<file_name.log></location>
   </localfile>

5. Restart rsyslog and wazuh agent.

.. code-block::

   # systemctl restart rsyslog
   # systemctl restart wazuh-agent
   
Logstash on Windows
^^^^^^^^^^^^^^^^^^^
   
- Use **Logstash on a Windows host** with a Wazuh agent to receive syslog and log to a file and send those logs to the environment.

1. Make sure Windows is fully updated and `Java JRE <https://www.java.com/en/download/windows-64bit.jsp>`_ is installed.

2. Configure JRE.

   • Click Start, search for "Edit the system environment variables" and open the system properties applet.
   • Click the Environment Variables button.
   • Under System variables click "New".
   • Enter the variable name JAVA_HOME and browse to the JRE install directory and click OK. In the variable value the JRE directory should be displayed. For example, ``C:\Program Files\Java\jre1.8.0_201``.

You may need to reopen your terminal to apply changes

3. Install Logstash.

   • Download the Logstash ZIP package from https://www.elastic.co/downloads/logstash.
   • Extract the ZIP contents to a local folder. For example, to ``C:\logstash\``.

4. Install logstash-input-syslog and logstash-output-file plugins.

   • ``C:\logstash\bin>logstash-plugin install logstash-input-syslog``
   • ``C:\logstash\bin>logstash-plugin install logstash-output-file``

If you are using PowerShell remember to type ``.\`` before the executable: ``.\logstash-plugin``

5. Configure Logstash.

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

6. Deploy a Wazuh agent on the same host that has Logstash.
   
7. Configure the agent to read the Logstash output file.

Edit ``C:\Program Files (x86)\ossec-agent\ossec.conf`` to add the following:

.. code-block:: XML

   <ossec_config>
     <localfile>
       <log_format>syslog</log_format>
       <location>C:\logstash\logs\<file_name.log></location>
     </localfile>
   </ossec_config>

8. Restart Logstash.

Run Logstash from the command line: ``C:\logstash\bin\logstash.bat -f C:\logstash\config\logstash.conf``

And `install Logstash as a Windows Service <https://www.elastic.co/guide/en/logstash/current/running-logstash-windows.html#running-logstash-windows>`_ either using NSSM or Windows Task Manager.

9. Restart Wazuh Agent.

By running in Powershell: ``Restart-Service OssecSvc``
