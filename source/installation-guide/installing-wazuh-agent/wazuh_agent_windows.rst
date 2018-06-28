.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh_agent_windows:

Install Wazuh agent on Windows
==============================

.. note:: You will need administrator privileges to perform this installation.

The first step to installing the Wazuh agent on a Windows machine is to download the Windows installer from the :doc:`packages list<../packages-list/index>`. Once this is downloaded, the Windows agent can be installed in one of two ways:

- `Using the GUI`_
- `Using the command line`_

Using the GUI
-------------

To install the Windows agent from the GUI, run the downloaded file and follow the steps in the installation wizard. If you are not sure how to respond to some of the prompts, simply use the default answers.

Once installed, the agent uses a graphical user interface for configuration, opening the log file or starting and stopping the service.

  .. thumbnail:: ../../images/manual/windows-agent.png
      :align: center
      :width: 320 px

By default, all agent files will be found in: ``C:\Program Files(x86)\ossec-agent``.

.. note:: Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the :doc:`user manual<../../user-manual/registering/index>`.

Using the command line
----------------------

To install the Windows agent from the command line, run the installer using the following command (the ``/q`` argument is used for unattended installations)::

    wazuh-agent-3.3.1-1.msi /q

You can automate the agent registration with authd using the following parameters:

+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
| Option                | Description                                                                                                                  |
+=======================+==============================================================================================================================+
|   APPLICATIONFOLDER   |  Sets the installation path. Default C:\Program Files (x86)\ossec-agent\.                                                    |
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
|   CERTIFICATE         |  Specifies th certificate path.                                                                                              |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
|   AGENT_NAME          |  Designates the agent's name. By default will be the computer name.                                                          |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
|   \/l  installer.log  |  Generates a log of the installation process.                                                                                |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+
|   /l*v installer.log  |  Generates a log of the installation process, including verbose messages.                                                    |
+-----------------------+------------------------------------------------------------------------------------------------------------------------------+


Usage example::

    wazuh-agent-3.3.1-1.msi /q ADDRESS="192.168.1.1" AUTHD_SERVER="192.168.1.1" PASSWORD="TopSecret" AGENT_NAME="W2012"

.. note:: Unattended installations must be run with administrator permissions.
