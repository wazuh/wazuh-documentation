.. _wazuh_agent_windows:

Install Wazuh agent on Windows
==============================

.. note:: You will need administrator privilege to install using the next guide.

Download the Windows installer from our :doc:`packages list<../packages-list/index>`. You can install it via:

- `Using the GUI`_
- `Using the command line`_

Using the GUI
-------------

Double click on the downloaded file and follow the wizard. If unsure, leave default answers.

Once installed, the agent includes a graphical user interface that can be used to configure it, opening the log file or to start/stop the service.

  .. thumbnail:: ../../images/manual/windows-agent.png
      :align: center
      :width: 320 px

By default all agent files can be found at the following location: ``C:\Program Files(x86)\ossec-agent``.

.. note:: At this point your agent is installed and you just need to register and configure it to talk to your manager. For more information about this process please visit our user manual.

Using the command line
----------------------

Run the installer on a command line (the ``/q`` argument is used for unattended installations)::

    wazuh-agent-3.0.0-1.msi /q

You can automate the agent registration with authd using the following parameters:

+-----------------------+-------------------------------------------------------------------------------------------------------+
| Option                | Description                                                                                           |
+=======================+=======================================================================================================+
|   APPLICATIONFOLDER   |  Installation path. Default C:\Program Files (x86)\ossec-agent\.                                      |
+-----------------------+-------------------------------------------------------------------------------------------------------+
|   ADDRESS             |  Manager IP address or hostname. Optionally accepts a list of IPs or hostnames separated by commas.   |
+-----------------------+-------------------------------------------------------------------------------------------------------+
|   SERVER_PORT         |  Manager connection port.                                                                             |
+-----------------------+-------------------------------------------------------------------------------------------------------+
|   PROTOCOL            |  Communication protocol. Accepts UDP and TCP. Default is UDP.                                         |
+-----------------------+-------------------------------------------------------------------------------------------------------+
|   AUTHD_SERVER        |  Authd IP address.                                                                                    |
+-----------------------+-------------------------------------------------------------------------------------------------------+
|   AUTHD_PORT          |  Authd connection port.                                                                               |
+-----------------------+-------------------------------------------------------------------------------------------------------+
|   PASSWORD            |  Authd password.                                                                                      |
+-----------------------+-------------------------------------------------------------------------------------------------------+
|   NOTIFY_TIME         |  Time between manager checks.                                                                         |
+-----------------------+-------------------------------------------------------------------------------------------------------+
|   TIME_RECONNECT      |  Time in seconds until a reconnection attempt.                                                        |
+-----------------------+-------------------------------------------------------------------------------------------------------+
|   CERTIFICATE         |  Certificate path.                                                                                    |
+-----------------------+-------------------------------------------------------------------------------------------------------+
|   AGENT_NAME          |  Agent's name. By default will be the computer name.                                                  |
+-----------------------+-------------------------------------------------------------------------------------------------------+
|   /l*v installer.log  |  Generates a log of the installation process.                                                         |
+-----------------------+-------------------------------------------------------------------------------------------------------+


Usage example::

    wazuh-agent-3.0.0-1.msi /q ADDRESS="192.168.1.1" AUTHD_SERVER="192.168.1.1" PASSWORD="TopSecret" AGENT_NAME="W2012"

.. note:: Unattended installations must be launched with administrator permissions.
