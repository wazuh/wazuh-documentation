.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh_agent_windows:

Install Wazuh agent on Windows
==============================

.. note:: You will need administrator privileges to perform this installation.

The first step to installing the Wazuh agent on a Windows machine is to download the appropiate Windows installer for your processor architecture from the :doc:`packages list<../packages-list/index>`. Once this is downloaded, the Windows agent can be installed in one of two ways:

- `Using the GUI`_
- `Using the command line`_

Using the GUI
-------------

To install the Windows agent from the GUI, run the downloaded file and follow the steps in the installation wizard. If you are not sure how to respond to some of the prompts, simply use the default answers.

Once installed, the agent uses a graphical user interface for configuration, opening the log file or starting and stopping the service.

  .. thumbnail:: ../../images/manual/windows-agent.png
      :align: center
      :width: 320 px

By default, all agent files will be found in: ``C:\Program Files\ossec-agent``.

.. note:: Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the :doc:`user manual<../../user-manual/registering/index>`.

Using the command line
----------------------

.. note:: Unattended installations must be run with administrator permissions.

.. note:: For the following steps, replace the MSI package filename with the one matching your processor architecture.

To install the Windows agent from the command line, run the installer using the following command (the ``/q`` argument is used for unattended installations)::

    wazuh-agent-3.8.2-1.msi /q

To uninstall the agent, the original MSI file will be needed to perform the unattended process::

    msiexec.exe /x wazuh-agent-3.8.2-1.msi /qn

You can automate the agent registration with authd using the following parameters:

+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
| Option                | Description                                                                                                                  |
+=======================+==============================================================================================================================+
|   APPLICATIONFOLDER   |  Sets the installation path. Default C:\\Program Files\\ossec-agent\\.                                                 |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
|   ADDRESS             |  Specifies the managers IP address or hostname. This option also accepts a list of IPs or hostnames separated by semicolons. |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
|   SERVER_PORT         |  Specifies the managers connection port.                                                                                     |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
|   PROTOCOL            |  Sets the communication protocol between the manager and the agent. Accepts UDP and TCP. Default is UDP.                     |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
|   AUTHD_SERVER        |  Specifies the Authd IP address.                                                                                             |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
|   AUTHD_PORT          |  Specifies the Authd connection port.                                                                                        |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
|   PASSWORD            |  Sets the Authd password.                                                                                                    |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
|   NOTIFY_TIME         |  Sets the time between manager checks.                                                                                       |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
|   TIME_RECONNECT      |  Sets the time in seconds until a reconnection attempt.                                                                      |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
|   CERTIFICATE         |  Specifies the certificate of authority path.                                                                                |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
|   PEM                 |  Specifies the certificate path.                                                                                             |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
|   KEY                 |  Specifies the key path.                                                                                                     |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
|   AGENT_NAME          |  Designates the agent's name. By default will be the computer name.                                                          |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
|   GROUP               |  Assigns the specified group to the agent.                                                                                   |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
|   \/l  installer.log  |  Generates a log of the installation process.                                                                                |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
| \/l\*v installer.log  |  Generates a log of the installation process, including verbose messages.                                                    |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+

Below there are some examples to install and register a Windows agent.

Registration with password::

    wazuh-agent-3.8.2-1.msi /q ADDRESS="192.168.1.1" AUTHD_SERVER="192.168.1.1" PASSWORD="TopSecret" AGENT_NAME="W2012"

Registration with password and assigning a group::

    wazuh-agent-3.8.2-1.msi /q ADDRESS="192.168.1.1" AUTHD_SERVER="192.168.1.1" PASSWORD="TopSecret" GROUP="my-group"

Registration with relative path to CA. It will be searched at your `APPLICATIONFOLDER` folder::

    wazuh-agent-3.8.2-1.msi /q ADDRESS="192.168.1.1" AUTHD_SERVER="192.168.1.1" AGENT_NAME="W2019" CERTIFICATE="rootCA.pem"

Absolute paths to CA, certificate or key that contain spaces can be written as shown below::

    wazuh-agent-3.8.2-1.msi /q ADDRESS="192.168.1.1" AUTHD_SERVER="192.168.1.1" KEY="C:\Program Files\sslagent.key" PEM="C:\Program Files\sslagent.cert"

.. note::
    To verify agents via SSL, it's necessary to use both KEY and PEM options. See the :ref:`verify hosts with SSL <verify-hosts>` section.

Registration with protocol::

    wazuh-agent-3.8.2-1.msi /q ADDRESS="192.168.1.1" AUTHD_SERVER="192.168.1.1" AGENT_NAME="W2016" PROTOCOL="TCP"

.. warning::
    In Windows versions older than Windows Server 2008 or Windows 7, it's necessary to run the ``ossec-authd`` program on the Wazuh manager with the ``-a`` flag or set the ``<ssl_auto_negotiate>`` option to ``yes`` on the :ref:`auth configuration <reference_ossec_auth>` to avoid compatibility errors.
