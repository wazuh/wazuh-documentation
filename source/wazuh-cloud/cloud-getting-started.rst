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

Connect network devices (Syslog) 
--------------------------------

Linux
`````
You need to mount a Syslog server. Syslog writes the logs to a file and the agent reads from that file and sends the information to the manager.

Windows
```````
In case of Windows this is done with Logstash. You have to install a Syslog plugin in Logstash with which you will save the information in a file from where the agent will read the information and send it to the manager.

Next steps
----------

After following all these steps, the user owns a Wazuh Cloud infrastructure totally operative, working and with the number of agents the user registered.
Now, it's time to add other Wazuh features to improve the level of monitoring the system does.
Some of these features are:

    * `Puppet <https://documentation.wazuh.com/current/deploying-with-puppet/index.html>`_
    * `Splunk <https://documentation.wazuh.com/current/installing-splunk/index.html>`_ 
    * `Docker <https://documentation.wazuh.com/current/docker-monitor/index.html>`_