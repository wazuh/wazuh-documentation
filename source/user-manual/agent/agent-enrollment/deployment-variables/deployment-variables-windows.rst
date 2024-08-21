.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the variables used by Wazuh agent packages on Windows and see examples of how to use them.

Deployment variables for Windows
================================

To fully deploy a Wazuh agent and connect it to the Wazuh server, you must install, enroll, and configure it. The Wazuh agent packages can simplify this process by using variables that allow configuration provisioning.

Below is a table describing the variables used by Wazuh agent packages on Windows and a few examples of how to use them.

+----------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Option                           | Description                                                                                                                                                                                          |
+==================================+======================================================================================================================================================================================================+
|   WAZUH_MANAGER                  |  This is the primary Wazuh manager that the Wazuh agent will connect to for ongoing communication and security data exchange. Specifies the Wazuh manager IP address or FQDN (Fully Qualified        |
|                                  |  Domain Name). If you want to specify multiple managers, you can add them separated by commas. See :ref:`address <server_address>`.                                                                  |
+----------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_MANAGER_PORT             |  Specifies the Wazuh manager connection port. See :ref:`port <server_port>`.                                                                                                                         |
+----------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_PROTOCOL                 |  Sets the communication protocol between the Wazuh manager and the Wazuh agent. Accepts UDP and TCP. The default is TCP. See :ref:`protocol <server_protocol>`.                                      |
+----------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_REGISTRATION_SERVER      |  Specifies the Wazuh enrollment server, used for the Wazuh agent enrollment. See :ref:`manager_address <enrollment_manager_address>`. If empty, the value set in ``WAZUH_MANAGER`` will be used.     |
+----------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_REGISTRATION_PORT        |  Specifies the port used by the Wazuh enrollment server. See :ref:`port <enrollment_manager_port>`.                                                                                                  |
+----------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_REGISTRATION_PASSWORD    |  Sets password used to authenticate during enrollment, stored in ``authd.pass`` file. See :ref:`authorization_pass_path <enrollment_authorization_pass_path>`.                                       |
+----------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_KEEP_ALIVE_INTERVAL      |  Sets the time between Wazuh agent checks for Wazuh manager connection. See :ref:`notify_time <notify_time>`.                                                                                        |
+----------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_TIME_RECONNECT           |  Sets the time interval for the Wazuh agent to reconnect with the Wazuh manager when connectivity is lost. See :ref:`time-reconnect  <time_reconnect>`.                                              |
+----------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_REGISTRATION_CA          |  Host SSL validation need of Certificate of Authority. This option specifies the CA path. See :ref:`server_ca_path <enrollment_server_ca_path>`.                                                     |
+----------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_REGISTRATION_CERTIFICATE |  The SSL agent verification needs a CA signed certificate and the respective key. This option specifies the certificate path. See :ref:`agent_certificate_path <enrollment_agent_certificate_path>`. |
+----------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_REGISTRATION_KEY         |  Specifies the key path completing the required variables with WAZUH_REGISTRATION_CERTIFICATE for the SSL agent verification process. See :ref:`agent_key_path <enrollment_agent_key_path>`.         |
+----------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_AGENT_NAME               |  Designates the Wazuh agent's name. By default, it will be the computer name. See :ref:`agent_name <enrollment_agent_name>`.                                                                         |
+----------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_AGENT_GROUP              |  Assigns the Wazuh agent to one or more existing groups (separated by commas). See :ref:`agent_groups <enrollment_agent_groups>`.                                                                    |
+----------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   ENROLLMENT_DELAY               |  Assigns the time that agentd should wait after a successful enrollment. See :ref:`delay_after_enrollment <enrollment_delay_after_enrollment>`.                                                      |
+----------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   \/l  installer.log             |  Generates a log of the installation process.                                                                                                                                                        |
+----------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   \/l\*v installer.log           |  Generates a log of the installation process, including verbose messages.                                                                                                                            |
+----------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

.. note::

   In PowerShell, use ``"""`` or ``'""`` if the deployment variable contains spaces. For example, ``WAZUH_REGISTRATION_PASSWORD="""TOP SECRET"""``

Below there are some examples to install and enroll a Windows agent.

Enrollment with password:

.. code-block:: doscon

   wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_REGISTRATION_PASSWORD="TopSecret" WAZUH_AGENT_NAME="W2012"

Enrollment with password and assigning a group:

.. code-block:: doscon

   wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_REGISTRATION_PASSWORD="TopSecret" WAZUH_AGENT_GROUP="my-group"

Enrollment with relative path to CA. It will be searched at your Wazuh installation folder:

.. code-block:: doscon

   wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_AGENT_NAME="W2019" WAZUH_REGISTRATION_CA="rootCA.pem"

Absolute paths to CA, certificate or key that contain spaces can be written as shown below:

.. code-block:: doscon

   wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_REGISTRATION_KEY="C:\Program Files (x86)\ossec-agent\sslagent.key" WAZUH_REGISTRATION_CERTIFICATE="C:\Program Files (x86)\ossec-agent\sslagent.cert"

.. note::

   It's necessary to use both ``WAZUH_REGISTRATION_KEY`` and ``WAZUH_REGISTRATION_CERTIFICATE`` options to verify Wazuh agents’ via SSL. See the :doc:`additional security options <../security-options/index>` section.

Enrollment with protocol:

.. code-block:: doscon

   Wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_AGENT_NAME="W2016" WAZUH_PROTOCOL="udp"

Enrollment and adding multiple addresses:

.. code-block:: doscon

   wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2,10.0.0.3" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_AGENT_NAME="W2016"

.. warning::

   To avoid compatibility issues when installing the Wazuh agent on Windows versions older than Windows Server 2008 or Windows 7, use either of these options.

   #. Run the ``/var/ossec/bin/wazuh-authd`` program on the Wazuh server with the ``-a`` flag. This enables compatibility mode for older Windows agents.
   #. Set the ``<ssl_auto_negotiate>`` option to ``yes`` in the :doc:`auth configuration </user-manual/reference/ossec-conf/auth>` section of the ``/var/ossec/etc/ossec.conf`` file on the Wazuh server. This allows automatic negotiation of the most compatible SSL/TLS version for communication with older Windows agents.

