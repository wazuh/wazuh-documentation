.. Copyright (C) 2019 Wazuh, Inc.

.. _cloud_getting_started:

Getting Started
===============

By following this guide, we will create a Wazuh monitoring structure allocated in the Wazuh Cloud.


Sign up
-------

1. To sign up, go to Wazuh CLoud Service page:

    .. thumbnail:: ../images/wazuh-cloud/wazuh-cloud-1.png
        :title: Signing up form.
        :align: center
        :width: 100%

2. Fill every field with the required data.

3. From the list of options, select *Request a free trial*.

4. The user will receive an e-mail with a link. When clicking on that link, the registration process will be finished and the user will receive another e-mail that contains a file with all the necessary information to use the Cloud Service.

.. note::
    The verification e-mail can be stored in the *spam* folder.

Access Wazuh Cloud
------------------

When the sign up process is complete, the user will receive a PDF file with all the necessary data to access the cloud services.
In this PDF there is important information you need to access the user interface or register an agent. Be careful to keep this information confidential.

+------------------------------+-----------------------------------------------------------------------------------------+
|                               Wazuh cloud information summary                                                          |
+==============================+=========================================================================================+
| Web user interface           | It is the address with which you can access the user interface.                         |
+------------------------------+-----------------------------------------------------------------------------------------+
| Web user credentials         | It is the credentials you need to access the user interface.                            |
+------------------------------+-----------------------------------------------------------------------------------------+
| Agent registration server    | It is the address of the Agent Registration Server.                                     |
+------------------------------+-----------------------------------------------------------------------------------------+
| Agent registration port      | It is the port through which the agent communicates with the agent registration service.|
+------------------------------+-----------------------------------------------------------------------------------------+
| Agent registration password  | It is the password you need to register an agent.                                       |
+------------------------------+-----------------------------------------------------------------------------------------+
| Agent manager server         | It is the Wazuh manager adress.                                                         |
+------------------------------+-----------------------------------------------------------------------------------------+
| Agent manager port           | It is the port to which the agent sends the collected data.                             |
+------------------------------+-----------------------------------------------------------------------------------------+



Agent deployment 
----------------

The Wazuh agent runs on the hosts that you want to monitor. It is multi-platform and provides the following capabilities:

- log and data collection,
- file integrity monitoring,
- rootkit and malware detection, and
- security policy monitoring.

In addition, it communicates with the Wazuh manager, sending data in near real-time through an encrypted and authenticated channel.

**Agent deployment on Linux RPM based systems**
```````````````````````````````````````````````

Adding the Wazuh repository:

.. code-block:: console

    # cat > /etc/yum.repos.d/Wazuh.repo <<\EOF
    [wazuh_repo]
    gpgcheck=1gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
    enabled=1name=Wazuh repository
    baseurl=https://packages.wazuh.com/3.x/yum/
    protect=1
    EOF

Installing Wazuh agent:

.. code-block:: console

    # yum install wazuh-agent-3.8.2-1

Registering agent:

.. code-block:: console

    # /var/ossec/bin/agent-auth -m <Agent registration server> -P <Agent registration password>


Point agent to your Wazuh cloud infrastructure:

Edit /var/ossec/etc/ossec.conf, to set the configuration for your manager server:

.. code-block:: console
    
    <server>
          <address><Agent manager server></address>
          <port><Agent manager port></port>      
          <protocol>tcp</protocol>
    </server>

Make sure the protocol is set to TCP.

Restart Wazuh agent:

.. code-block:: console

    # systemctl restart wazuh-agent


**Agent deployment on Linux DEB based systems**
```````````````````````````````````````````````

1.Adding the Wazuh repository:

.. code-block:: console
    
    # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -

.. code-block:: console
    
    # cat > /etc/apt/sources.list.d/wazuh.list <<\EOF
    deb https://packages.wazuh.com/3.x/apt/ stable main
    EOF

.. code-block:: console

    apt-get update


2.Installing Wazuh agent:

.. code-block:: console

    # apt-get install wazuh-agent=3.8.2-1

3.Registering agent:

.. code-block:: console
    
    # /var/ossec/bin/agent-auth -m <Agent registration server> -P <Agent registration password>

4.Point agent to your Wazuh cloud infrastructure:

Edit /var/ossec/etc/ossec.conf, to set the configuration for your manager server:

.. code-block:: console

    <server>
          <address><Agent manager server></address>
          <port><Agent manager port></port>      
          <protocol>tcp</protocol>
    </server>

Make sure the protocol is set to TCP.

5.Restart Wazuh agent:

.. code-block:: console

    # systemctl restart wazuh-agent

**Agent deployment on Windows systems**
```````````````````````````````````````

Windows installer can take care of the installing, registering and configuring the agent using a single command line (you need administrator privileges).

1.Download Wazuh agent package:

2.Installing Wazuh agent:

.. code-block:: console

    # wazuh-agent-3.8.2-1.msi /q ADDRESS="<Agent manager server>" AUTHD_SERVER="<Agent registration server>" PASSWORD="<Agent registration password>" PROTOCOL="TCP"


**Agent deployment on Mac OS systems**
``````````````````````````````````````

1.Download Wazuh agent package:

    https://packages.wazuh.com/3.x/osx/wazuh-agent-3.8.2-1.pkg

2.Installing Wazuh agent:

.. code-block:: console

    # installer -pkg wazuh-agent-3.8.2-1.pkg -target /

3.Registering agent:

.. code-block:: console

    # /Library/Ossec/bin/agent-auth -m <Agent registration server> -P <Agent registration password>

4.Point agent to your Wazuh infrastructure:

Edit /Library/Ossec/etc/ossec.conf, to set the configuration for your manager server;

.. code-block:: console

    <server>
          <address><Agent manager server></address>
          <port><Agent manager port></port>      
          <protocol>tcp</protocol>
    </server>

5.Restart Wazuh agent:

.. code-block:: console

    # /Library/Ossec/bin/ossec-control restart

Sending messages to a remote Server
-----------------------------------

Wazuh agents can run in a wide range of operating systems, but when it is not possible to install an agent due to software incompatibilities or business restrictions, you can forward Syslog events to Wazuh Cloud. This is a common use case for network devices such as routers or firewalls.

Since every communication with Wazuh Cloud is performed trough the Wazuh agent, we will configure the agent to forward the Syslog events. The configuration depends on the operating system, but it involves the following steps:

    1. Setup the syslog listener (rsyslog or Logstash).
    2. Configure the syslog listener to forward the events to a file.
    3. Configure the Wazuh agent to read the previous file.

Forward Syslog events to a Linux agent (via rsyslog)
````````````````````````````````````````````````````

Follow the next steps to receive the syslog events in a Wazuh Linux agent and forward them to the Wazuh Cloud.

1. Configure rsyslog to receive syslog events.

Enable the TCP or UDP settings by editing: /etc/rsyslog.conf

TCP:

.. code-block:: console

    $ModLoad imtcp
    $InputTCPServerRun <PORT>

UDP:

.. code-block:: console

    $ModLoad imudp
    $InputUDPServerRun <PORT>

.. warning::

    Review your firewall/SeLinux configuration to allow this communication.

2. Configure rsyslog to forward events to a file.

Edit /etc/rsyslog.conf:

.. code-block:: console

    # Storing Messages from a remote system into a specific file
    if $fromhost-ip startswith 'xxx.xxx.xxx.' then /var/log/<file_name.log>
    & ~


3.  Deploy a Wazuh agent on the same host that has rsyslog.

4.  Configure the agent to read the syslog output file.

Edit /var/ossec/etc/ossec.conf

.. code-block:: console

    <localfile>
      <log_format>syslog</log_format>
      <location>/var/log/<file_name.log></location>
    </localfile>

4.  Restart rsyslog:

.. code-block:: console

    # systemctl restart rsyslog

5.  Restart wazuh-agent:

.. code-block:: console

   # systemctl restart wazuh-agent

Forward Syslog events to a Windows agent (via Logstash)
```````````````````````````````````````````````````````
Follow the next steps to receive the syslog events in a Wazuh Window agent and forward them to the Wazuh Cloud.

1.   Pre-requisites:

    - Windows fully updated.
    - Java JRE https://www.java.com/es/download/windows-64bit.jsp

2.   Configuring JDK in Windows.

    - Click Start, search for "Environment Variables" and open the system properties applet. The advanced tab of the "System Properties" applet should appear.
    - Click the Environment Variables button.
    - Under System variables click "New".
    - Enter the variable name JAVA_HOME and browse to the JRE install directory and click OK. In variable value it should show the JRE directory. For example, ``C:\Program Files\Java\jre1.8.0_201``

3.   Install Logstash

    - Download the Logstash ZIP package from here https://www.elastic.co/downloads/logstash.
    - Extract the ZIP contents to a local folder. For example, to ``C:\logstash\``.

4.   Install logstash-input-syslog and logstash-output-file plugins:

    ``C:\logstash\bin>logstash-plugin install logstash-input-syslog``
    ``C:\logstash\bin>logstash-plugin install logstash-output-file``

5.   Create a configuration file in ``C:\logstash\bin\logstash.conf``.

    Create a blank file from the command line:

    
    ``copy con C:\logstash\bin\logstash.conf``

    ``^Z``

    ``Enter``

    Write this configuration in logstash.conf:

    .. code-block:: console

        input {
          syslog {
            port => <PORT>
          }
        }

        output {
          file {
            path => “C:\logstash\logs\<file_name.log>”
          }
        }

6.   Deploy a Wazuh agent on the same host that has rsyslog.

7.   Edit the agent configuration file to read the logs from the created file:

.. code-block:: console

    <localfile>
       <log_format>syslog</log_format>
       <location>C:\logstash\logs\<file_name.log></location>
    </localfile>

8.   Restart Wazuh agent and run Logstash:

    a. Running Logstash from the shell.

    ``C:\logstash\bin\logstash.bat -f C:\logstash\bin\logstash.conf``

    b. Installing Logstash as a Windows service.

    - Download NSSM: http://nssm.cc/download       
    - Extract the EXE to the BIN directory of the Logstash location.
    - Navigate to the Logstash BIN directory of the Logstash location:
    
            .. code-block:: console

                .\nssm.exe install logstash

        **Path:** Full path of where the LOGSTASH.BAT file is located.

            For example, ``C:\logstash\bin\logstash.bat``

        **Startup Directory:** Full path of the BIN directory.

            For example, ``C:\logstash\bin\``

        **Arguments:** Include the '-f' flag with the path of the logstash config file.

            For example, ``-f C:\logstash\bin\logstash.conf``

        On the details tab ensure the service is set to start up automatically.
        Also on the details tab, ensure the service is set to use a service account.

        Click "Install Service".

    - Start the service: ``C:\logstash\bin\nssm start logstash``

Next steps
----------

After following all these steps, the user owns a Wazuh Cloud infrastructure totally operative, working and with the number of agents the user registered.
Now, it's time to add other Wazuh features to improve the level of monitoring the system does.
Some of these features are:

    * `Puppet <https://documentation.wazuh.com/current/deploying-with-puppet/index.html>`_
    * `Splunk <https://documentation.wazuh.com/current/installing-splunk/index.html>`_ 
    * `Docker <https://documentation.wazuh.com/current/docker-monitor/index.html>`_