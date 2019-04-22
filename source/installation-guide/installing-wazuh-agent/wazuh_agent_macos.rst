.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_agent_macos:

Install Wazuh agent on Mac OS X
===============================

<<<<<<< HEAD
The Mac OS X agent can be downloaded from :doc:`packages list<../packages-list/index>`. You can install it by using the command line or following the GUI steps:
=======
The Mac OS X agent can be downloaded from :doc:`packages list<../packages-list/index>`. The current version has been tested on Mac OS X and should be compatible with other versions as well. You can install it by using the command line or following the GUI steps:
>>>>>>> 998b2944... Update wazuh_agent_macos.rst

  a) The command line::

     The following steps describe a simple installation.

     .. code-block:: console

            # installer -pkg wazuh-agent-3.9.0-1.pkg -target /

     You can automate the agent registration and configuration process and have a Wazuh Agent installed, registered and reporting using only one command line. In order to do this, we need to define some environment variables. The mandatory environment variable to be defined for the registration process is ``WAZUH_AUTHD_SERVER``. The mandatory environment variable to be defined for use it as Wazuh Manager is ``WAZUH_MANAGER_IP``. And, if you want the Wazuh agent registered and reporting you should use, at least, both variables. 

     There are other variables that can be used described as follows: 

     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     | Option                | Description                                                                                                                  |
     +=======================+==============================================================================================================================+
     |   WAZUH_MANAGER_IP    |  Specifies the managers IP address or hostname. You can add multiple values by commas.                                       |
     |                       |                                                                                                                              |
     |                       |  See `address <../../user-manual/reference/ossec-conf/client.html#address>`_                                                 |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_SERVER_PORT   |  Specifies the managers connection port.                                                                                     |
     |                       |                                                                                                                              |
     |                       |  See `server-port <../../user-manual/reference/ossec-conf/client.html#server-port>`_                                         |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_PROTOCOL      |  Sets the communication protocol between the manager and the agent. Accepts UDP and TCP. Default is UDP.                     |
     |                       |                                                                                                                              |
     |                       |  See `server-protocol <../../user-manual/reference/ossec-conf/client.html#server-protocol>`_                                 |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_AUTHD_SERVER  |  Specifies the Wazuh authentication server.                                                                                  |
     |                       |                                                                                                                              |
     |                       |  See `agent-auth options <../../user-manual/reference/tools/agent-auth.html>`_                                               |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_AUTHD_PORT    |  Specifies the port used by the Wazuh authentication server.                                                                 |
     |                       |                                                                                                                              |
     |                       |  See `agent-auth options <../../user-manual/reference/tools/agent-auth.html>`_                                               |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_PASSWORD      |  Sets the Wazuh authentication server.                                                                                       |
     |                       |                                                                                                                              |
     |                       |  See `agent-auth options <../../user-manual/reference/tools/agent-auth.html>`_                                               |    
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_NOTIFY_TIME   |  Sets the time between agent checks for manager connection.                                                                  |
     |                       |                                                                                                                              |    
     |                       |  See `notify-time <../../user-manual/reference/ossec-conf/client.html#notify-time>`_                                         |    
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_TIME_RECONNECT|  Sets the time in seconds until a reconnection attempt if the connection between agent and manager is lost.                  |
     |                       |                                                                                                                              |
     |                       |  See `time-reconnect <../../user-manual/reference/ossec-conf/client.html#time-reconnect>`_                                   |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_CERTIFICATE   |  Host SSL validation need of Certificate of Authority. This option specifies the CA path.                                    |
     |                       |                                                                                                                              |
     |                       |  See `agent-auth options <../../user-manual/reference/tools/agent-auth.html>`_                                               |   
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_PEM           |  The SSL agent verification needs a CA signed certificate and the respective key. This option specifies the certificate path.|
     |                       |                                                                                                                              |
     |                       |  See `agent-auth options <../../user-manual/reference/tools/agent-auth.html>`_                                               |    
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_KEY           |  Specifies the key path completing the required variables with WAZUH_PEM for the SSL agent verification process.             |
     |                       |                                                                                                                              |
     |                       |  See `agent-auth options <../../user-manual/reference/tools/agent-auth.html>`_                                               |    
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_AGENT_NAME    |  Designates the agent's name. By default it will be the computer name.                                                          |
     |                       |                                                                                                                              |
     |                       |  See `agent-auth options <../../user-manual/reference/tools/agent-auth.html>`_                                               |    
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_GROUP         |  Assigns the installed agent to a previously created group.                                                                  |
     |                       |                                                                                                                              |
     |                       |  See `agent-auth options <../../user-manual/reference/tools/agent-auth.html>`_                                               |    
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+

     To use any value from the table you must use the ``launchctl`` command as follows: ``launchctl setenv var_name var_value``. You can also set several variables in the same line. For example: ``launchctl setenv var_name1 var_value1 var_name2 var_value2``.

     Below are some examples for installing, registering and / or configuring a Mac OS X agent.

     Registration with password:

     .. code-block:: console

           # launchctl setenv WAZUH_MANAGER_IP "192.168.1.1" WAZUH_AUTHD_SERVER "192.168.1.1" \
                  WAZUH_PASSWORD "TopSecret" WAZUH_AGENT_NAME "macos_agent" && installer -pkg wazuh-agent-3.9.0-1.pkg -target /

     Registration with password and assigning a group:

     .. code-block:: console

           # launchctl setenv WAZUH_MANAGER_IP "192.168.1.1" WAZUH_AUTHD_SERVER "192.168.1.1" \
                  WAZUH_PASSWORD "TopSecret" WAZUH_GROUP "my-group" && installer -pkg wazuh-agent-3.9.0-1.pkg -target /

     If you want to use a Certificate of Authority in the registration process, it will be searched at your Wazuh installation folder:

     .. code-block:: console

           # launchctl setenv WAZUH_MANAGER_IP "192.168.1.1" WAZUH_AUTHD_SERVER "192.168.1.1" \
                  WAZUH_AGENT_NAME "macos_agent" WAZUH_CERTIFICATE "rootCA.pem" && installer -pkg wazuh-agent-3.9.0-1.pkg -target /

     Absolute paths to Certificate of Authority, certificate or key that contain spaces can be written like this:

     .. code-block:: console

           # launchctl setenv WAZUH_MANAGER_IP "192.168.1.1" WAZUH_AUTHD_SERVER "192.168.1.1" \
                   WAZUH_KEY "/var/ossec/etc/sslagent.key" WAZUH_PEM "/var/ossec/etc/sslagent.cert" && installer -pkg wazuh-agent-3.9.0-1.pkg -target /

     .. note::
           If you want to verify hosts using SSL and other advanced options, please see the :ref:`verify hosts with SSL <verify-hosts>` section.

     Registration with protocol:

     .. code-block:: console

           # launchctl setenv WAZUH_MANAGER_IP "192.168.1.1" WAZUH_AUTHD_SERVER "192.168.1.1" WAZUH_AGENT_NAME "macos_agent" \
                  WAZUH_PROTOCOL "tcp" && installer -pkg wazuh-agent-3.9.0-1.pkg -target /

  b) The GUI:

     Double click on the downloaded file and follow the wizard. If you are not sure how to respond to some of the prompts, simply use the default answers.

     .. thumbnail:: ../../images/installation/macos.png
         :align: center

By default, all agent files can be found at the following location: ``/Library/Ossec/``.

.. note:: Now that the agent is installed, if you didn't use the automatic configuration / registration method, you will now have to register and configure the agent to communicate with the manager. For more information about this process, please visit :doc:`user manual<../../user-manual/agents/registering/index>`.
