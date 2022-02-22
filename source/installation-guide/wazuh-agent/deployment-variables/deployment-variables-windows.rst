.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn about the variables that facilitate the deployment of the Wazuh agent on Windows in this section of our documentation.

.. _deployment_variables_windows:

Deployment variables for Windows
================================

For an agent to be fully deployed and connected to the Wazuh server it needs to be installed, registered and configured. To make the process simple, the installers can use variables that allow the configuration provisioning.

Below you can find a table describing the variables used by Wazuh installers on Windows, and a few examples on how to use them.


+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
| Option                             | Description                                                                                                                  |
+====================================+==============================================================================================================================+
|   APPLICATIONFOLDER                |  Sets the installation path. Default C:\\Program Files (x86)\\ossec-agent\\.                                                 |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_MANAGER                    |  Specifies the managers IP address or hostname. This option also accepts a list of IPs or hostnames separated by semicolons. |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_MANAGER_PORT               |  Specifies the managers connection port.                                                                                     |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_PROTOCOL                   |  Sets the communication protocol between the manager and the agent. Accepts UDP and TCP. Default is TCP.                     |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_REGISTRATION_SERVER        |  Specifies the Authd IP address.                                                                                             |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_REGISTRATION_PORT          |  Specifies the Authd connection port.                                                                                        |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_REGISTRATION_PASSWORD      |  Sets the Authd password.                                                                                                    |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_KEEP_ALIVE_INTERVAL        |  Sets the time between manager checks.                                                                                       |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_TIME_RECONNECT             |  Sets the time in seconds until a reconnection attempt.                                                                      |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_REGISTRATION_CA            |  Specifies the certificate of authority path.                                                                                |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_REGISTRATION_CERTIFICATE   |  Specifies the certificate path.                                                                                             |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_REGISTRATION_KEY           |  Specifies the key path.                                                                                                     |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_AGENT_NAME                 |  Designates the agent's name. By default will be the computer name.                                                          |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_AGENT_GROUP                |  Assigns the agent to one or more existing groups (separated by commas).                                                     |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
|   \/l  installer.log               |  Generates a log of the installation process.                                                                                |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
| \/l\*v installer.log               |  Generates a log of the installation process, including verbose messages.                                                    |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+

Below there are some examples to install and register a Windows agent.

Registration with password::

    wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_REGISTRATION_PASSWORD="TopSecret" WAZUH_AGENT_NAME="W2012"

Registration with password and assigning a group::

    wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_REGISTRATION_PASSWORD="TopSecret" WAZUH_AGENT_GROUP="my-group"

Registration with relative path to CA. It will be searched at your `APPLICATIONFOLDER` folder::

    wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_AGENT_NAME="W2019" WAZUH_REGISTRATION_CA="rootCA.pem"

Absolute paths to CA, certificate or key that contain spaces can be written as shown below::

    wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_REGISTRATION_KEY="C:\Progra~2\sslagent.key" WAZUH_REGISTRATION_CERTIFICATE="C:\Progra~2\sslagent.cert"

The number "2" means that the file will be searched at the second occurrence of the "Progra" word, thus, the key and certificate would be searched at the folder "C:\\Program Files (x86)". In case this number was "1", it would be searched at "Program Files".

.. note::
    To verify agents via SSL, it's necessary to use both WAZUH_REGISTRATION_KEY and WAZUH_REGISTRATION_CERTIFICATE options. See the :ref:`verify hosts with SSL <enrollment_additional_security>` section.

Registration with protocol::

    wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_AGENT_NAME="W2016" WAZUH_PROTOCOL="udp"

.. warning::
    In Windows versions older than Windows Server 2008 or Windows 7, it's necessary to run the ``wazuh-authd`` program on the Wazuh manager with the ``-a`` flag or set the ``<ssl_auto_negotiate>`` option to ``yes`` on the :ref:`auth configuration <reference_ossec_auth>` to avoid compatibility errors.