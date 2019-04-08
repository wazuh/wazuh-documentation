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


Sending messages to a remote Server
-----------------------------------

It is possible to forward logs from a remote machine, routers, firewalls, etc, to a server. This server stores the logs received from a remote system in a specific file. Then, a Wazuh agent installed on that server will be configured to read the written file and send the logs to the Wazuh manager.
There are different ways of doing it:

- Linux + Syslog
- Linux + Logstash
- Windows + Logstash

**Linux + Syslog**
``````````````````

Syslog is the protocol and software that Linux and most networking devices use to log messages. 
Syslog has the option to log to a remote server and to act as a remote log server (that receives logs). 
Rsyslog is the most popular daemon for centralizing your log data because it's installed by default in most common distributions of Linux. 
By configuring Rsyslog it is possible to write the logs received from a remote machine to a file.  

1. Edit Rsyslog configuration file.

Edit the listen port of your Syslog server. You need to select the protocol best suitable for your use case. If in doubt, TCP is a decent choice.

.. warning::

    Make sure ports are opened in the firewall, and Selinux if it is activated in your server.

Edit /etc/rsyslog.conf:

In order to listen TCP communications on port <PORT>:

.. code-block:: console

    $ModLoad imtcp
    $InputTCPServerRun <PORT>

In order to listen UDP communications on port <PORT>:

.. code-block:: console

    $ModLoad imudp
    $InputUDPServerRun <PORT>

With the next rule all the logs of the devices with xxx.xxx.xxx.* IP will been written in var/log/<file_name>.log.
Write this in front of the local/regular rules:

.. code-block:: console

    # Storing Messages from a remote system into a specific file
    if $fromhost-ip startswith 'xxx.xxx.xxx.' then /var/log/<file_name.log>
    & ~


2.  Deploy the agent as explained earlier in this documentation.

3.  Edit the agent configuration file to read the logs from the created file:

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


**Linux + Logstash**
````````````````````

If you do not use Syslog, one of the ways to redirect the logs to the server is using Logstash.

1.  Install Oracle Java JRE 8.

RPM-based systems:

.. code-block:: console

    # curl -Lo jre-8-linux-x64.rpm --header "Cookie: oraclelicense=accept-securebackup-cookie" "https://download.oracle.com/otn-pub/java/jdk/8u202-b08/1961070e4c9b4e26a04e7f5a083f551e/jre-8u202-linux-x64.rpm"

    # rpm -qlp jre-8-linux-x64.rpm > /dev/null 2>&1 && echo "Java package downloaded successfully" || echo "Java package did not download successfully"

    # yum -y install jre-8-linux-x64.rpm

    # rm -f jre-8-linux-x64.rpm

Debian-based systems:

a) For Debian >= 8/Jessie or Ubuntu >= 16.04/Xenial:

.. code-block:: console

    # apt-get update

    # apt-get install openjdk-8-jre

b) For Debian < 8/Jessie:

.. code-block:: console

    # echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" | tee /etc/apt/sources.list.d/webupd8team-java.list

    # apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys EEA14886

    # apt-get update

    # apt-get install oracle-java8-installer

c) For Ubuntu < 16.04/Xenial:

.. code-block:: console

    # add-apt-repository ppa:webupd8team/java

    # apt-get update

    # apt-get install oracle-java8-installer

2.  Install the Elastic repository and its GPG key:

RPM-based systems.

.. code-block:: console

    # rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch

    # cat > /etc/yum.repos.d/elastic.repo << EOF
    [elasticsearch-6.x]
    name=Elasticsearch repository for 6.x packages
    baseurl=https://artifacts.elastic.co/packages/6.x/yum
    gpgcheck=1
    gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
    enabled=1
    autorefresh=1
    type=rpm-md
    EOF

Debian-based systems:

.. code-block:: console

    # apt-get install curl apt-transport-https

    # curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -

    # echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-6.x.list

    # apt-get update

3.  Install the Logstash package:
RPM-based systems.

.. code-block:: console

    # yum install logstash-6.7.1
 
Debian-based systems:

.. code-block:: console
    
    # apt-get install logstash=1:6.7.1-1

4.  Enable and start the Logstash service:

.. code-block:: console

    # systemctl daemon-reload
    # systemctl enable logstash.service
    # systemctl start logstash.service

5.  Install logstash-input-syslog and logstash-output-file plugins.

.. code-block:: console

    # /usr/share/logstash/bin/logstash-plugin install logstash-input-syslog
    # /usr/share/logstash/bin/logstash-plugin install logstash-output-file

6.  Create a configuration file in /etc/logstash/conf.d/logstash.conf:

.. code-block:: console

    input {
        syslog {
        port => <PORT>
        }
    }

    output {
        file {
        path => “/var/log/logstash/<file_name.log>”
        }
    }

7.  Deploy the agent as explained earlier in this documentation.

8.  Edit the agent configuration file to read the logs from the created file:

.. code-block:: console

    <localfile>
        <log_format>syslog</log_format>
        <location>/var/log/logstash/<file_name.log></location>
    </localfile>

9.  Restart rsyslog:

.. code-block:: console

 	# systemctl restart rsyslog

10.  Restart wazuh-agent:

.. code-block:: console

	# systemctl restart wazuh-agent

**Windows + Logstash**
``````````````````````
If you use Windows download and configure Logstash.

1.   Pre-requisites:

    - Windows fully updated.
    - Oracle Java Development Kit v8 (1.8.x) installed. https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

2.   Configuring JDK in Windows.

    - Search for "Environment Variables" and create a variable under system variables.
    - Enter the variable name JAVA_HOME and browse to the JDK install directory and click OK.

3.   Install Logstash

    - Download the Logstash ZIP package from here https://www.elastic.co/downloads/logstash.
    - Extract the ZIP contents to a local folder. For example, to C:\logstash\.

4.   Install logstash-input-syslog and logstash-output-file plugins:

    ``C:\logstash\bin>logstash-plugin install logstash-input-syslog``
    ``C:\logstash\bin>logstash-plugin install logstash-output-file``

5.   Create a configuration file in C:\ logstash\bin\logstash.conf

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

6.   Deploy the agent as explained earlier in this documentation.

7.   Edit the agent configuration file to read the logs from the created file:

.. code-block:: console

    <localfile>
       <log_format>syslog</log_format>
       <location>C:\logstash\logs\<file_name.log></location>
    </localfile>

8.   Restart Wazuh agent and run Logstash:

    ``C:\logstash\bin\logstash.bat -f C:\logstash\bin\logstash.conf``

Next steps
----------

After following all these steps, the user owns a Wazuh Cloud infrastructure totally operative, working and with the number of agents the user registered.
Now, it's time to add other Wazuh features to improve the level of monitoring the system does.
Some of these features are:

    * `Puppet <https://documentation.wazuh.com/current/deploying-with-puppet/index.html>`_
    * `Splunk <https://documentation.wazuh.com/current/installing-splunk/index.html>`_ 
    * `Docker <https://documentation.wazuh.com/current/docker-monitor/index.html>`_