.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_agent_aix:

Install Wazuh agent on AIX
==============================

The Wazuh agent for AIX can be downloaded from our :doc:`packages list<../packages-list/index>`. Once the RPM package is downloaded, install it as follows:

.. code-block:: console

    # rpm -ivh wazuh-agent-3.9.0-1.aix.ppc.rpm

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

Below there are some examples to install and register a RPM-based linux agent.

Registration with password:

.. code-block:: console

        # WAZUH_MANAGER_IP="192.168.1.1" WAZUH_AUTHD_SERVER="192.168.1.1" WAZUH_PASSWORD="TopSecret" \
            WAZUH_AGENT_NAME="centos7" rpm -ivh wazuh-agent-3.9.0-1.aix.ppc.rpm

Registration with password and assigning a group:

.. code-block:: console

        # WAZUH_MANAGER_IP="192.168.1.1" WAZUH_AUTHD_SERVER="192.168.1.1" WAZUH_PASSWORD="TopSecret" \
            WAZUH_GROUP="my-group" rpm -ivh wazuh-agent-3.9.0-1.aix.ppc.rpm

Registration with relative path to CA. It will be searched at your Wazuh installation folder:

.. code-block:: console

        # WAZUH_MANAGER_IP="192.168.1.1" WAZUH_AUTHD_SERVER="192.168.1.1" WAZUH_AGENT_NAME="centos7" \
            WAZUH_CERTIFICATE="rootCA.pem" rpm -ivh wazuh-agent-3.9.0-1.aix.ppc.rpm

Absolute paths to CA, certificate or key that contain spaces can be written as shown below:

.. code-block:: console

        # WAZUH_MANAGER_IP="192.168.1.1" WAZUH_AUTHD_SERVER="192.168.1.1" WAZUH_KEY="/var/ossec/etc/sslagent.key" \
            WAZUH_PEM="/var/ossec/etc/sslagent.cert" rpm -ivh wazuh-agent-3.9.0-1.aix.ppc.rpm

.. note::
    To verify agents via SSL, it's necessary to use both KEY and PEM options. See the :ref:`verify hosts with SSL <verify-hosts>` section.

Registration with protocol:

.. code-block:: console

        # WAZUH_MANAGER_IP="192.168.1.1" WAZUH_AUTHD_SERVER="192.168.1.1" WAZUH_AGENT_NAME="centos7" \
            WAZUH_PROTOCOL="tcp" rpm -ivh wazuh-agent-3.9.0-1.aix.ppc.rpm

Registration and adding multiple address:

.. code-block:: console

        # WAZUH_MANAGER_IP="192.168.1.1,192.168.1.2" WAZUH_AUTHD_SERVER="192.168.1.1" \
            WAZUH_AGENT_NAME="centos7" rpm -ivh wazuh-agent-3.9.0-1.aix.ppc.rpm


.. note:: Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the :doc:`user manual<../../user-manual/agents/registering/index>`.
