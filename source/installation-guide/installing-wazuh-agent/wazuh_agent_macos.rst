.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh_agent_macos:

Install Wazuh agent on Mac OS X
===============================

Mac OS X agent can be downloaded from our :doc:`packages list<../packages-list/index>`. The current version has been tested on Mac OS X 10.12 and should be compatible with other versions as well. You can install it by following the steps below:

  a) The command line:

     .. code-block:: console

            # installer -pkg wazuh-agent-3.9.0-1.pkg -target /


     You can automate the agent registration with authd using the following environment variables:

     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     | Option                | Description                                                                                                                  |
     +=======================+==============================================================================================================================+
     |   WAZUH_MANAGER_IP    |  Specifies the managers IP address or hostname. You can add multiple values separeted by commas.                             |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_SERVER_PORT   |  Specifies the managers connection port.                                                                                     |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_PROTOCOL      |  Sets the communication protocol between the manager and the agent. Accepts UDP and TCP. Default is UDP.                     |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_AUTHD_SERVER  |  Specifies the Authd IP address.                                                                                             |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_AUTHD_PORT    |  Specifies the Authd connection port.                                                                                        |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_PASSWORD      |  Sets the Authd password.                                                                                                    |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_NOTIFY_TIME   |  Sets the time between manager checks.                                                                                       |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_TIME_RECONNECT|  Sets the time in seconds until a reconnection attempt.                                                                      |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_CERTIFICATE   |  Specifies the certificate of authority path.                                                                                |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_PEM           |  Specifies the certificate path.                                                                                             |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_KEY           |  Specifies the key path.                                                                                                     |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_AGENT_NAME    |  Designates the agent's name. By default will be the computer name.                                                          |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
     |   WAZUH_GROUP         |  Assigns the specified group to the agent.                                                                                   |
     +-----------------------+------------------------------------------------------------------------------------------------------------------------------+

     To export any value from the table you must use ``launchctl``. To export them, run the following line with your variable and its value: ``launchctl setenv var_name var_value``. You can also set several variables in the same line. For example: ``launchctl setenv var_name1 var_value1 var_name2 var_value2``.

     Below there are some examples to install and register a Mac OS X agent.

     Registration with password:

     .. code-block:: console

           # launchctl setenv WAZUH_MANAGER_IP92.168.1.1" WAZUH_AUTHD_SERVER "192.168.1.1" WAZUH_PASSWORD "TopSecret" \
                  WAZUH_AGENT_NAME "macos_agent" && installer -pkg wazuh-agent-3.9.0-1.pkg -target /

     Registration with password and assigning a group:

     .. code-block:: console

           # launchctl setenv WAZUH_MANAGER_IP92.168.1.1" WAZUH_AUTHD_SERVER "192.168.1.1" WAZUH_PASSWORD "TopSecret" \
                  WAZUH_GROUP "my-group" && installer -pkg wazuh-agent-3.9.0-1.pkg -target /

     Registration with relative path to CA. It will be searched at your Wazuh installation folder:

     .. code-block:: console

           # launchctl setenv WAZUH_MANAGER_IP92.168.1.1" WAZUH_AUTHD_SERVER "192.168.1.1" WAZUH_AGENT_NAME "macos_agent" \
                  WAZUH_CERTIFICATE "rootCA.pem" && installer -pkg wazuh-agent-3.9.0-1.pkg -target /

     Absolute paths to CA, certificate or key that contain spaces can be written as shown below:

     .. code-block:: console

           # launchctl setenv WAZUH_MANAGER_IP92.168.1.1" WAZUH_AUTHD_SERVER "192.168.1.1" WAZUH_KEY "/var/ossec/etc/\
                  sslagent.key" WAZUH_PEM "/var/ossec/etc/sslagent.cert" && installer -pkg wazuh-agent-3.9.0-1.pkg -target /

     .. note::
           To verify agents via SSL, it's necessary to use both KEY and PEM options. See the :ref:`verify hosts with SSL <verify-hosts>` section.

     Registration with protocol:

     .. code-block:: console

           # launchctl setenv WAZUH_MANAGER_IP92.168.1.1" WAZUH_AUTHD_SERVER "192.168.1.1" WAZUH_AGENT_NAME "macos_agent" \
                  WAZUH_PROTOCOL "tcp" && installer -pkg wazuh-agent-3.9.0-1.pkg -target /

  b) The GUI:

     Double click on the downloaded file and follow the wizard. If you are not sure how to respond to some of the prompts, simply use the default answers.

     .. thumbnail:: ../../images/installation/macos.png
         :align: center

By default, all agent files can be found at the following location: ``/Library/Ossec/``.

.. note:: Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the :doc:`user manual<../../user-manual/agents/registering/index>`.
