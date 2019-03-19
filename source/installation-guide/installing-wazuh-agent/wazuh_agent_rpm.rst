.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh_agent_rpm:

Install Wazuh agent with RPM packages
=====================================

The RPM package is suitable for installation on Red Hat, CentOS and other RPM-based systems.

.. note:: Many of the commands described below need to be executed with root user privileges.

Adding the Wazuh repository
---------------------------

The first step to installing the Wazuh agent is to add the Wazuh repository to your server.  Alternatively, if you want to download the wazuh-agent package directly, or check the compatible versions, you can do it from :ref:`here <packages>`.

Set up the repository by running the following commands according to your distribution:

CentOS 6/RHEL 6, CentOS 7/RHEL 7, Fedora 22 or greater and Amazon Linux
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  .. code-block:: console

    # cat > /etc/yum.repos.d/wazuh.repo <<\EOF
    [wazuh_repo]
    gpgcheck=1
    gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
    enabled=1
    name=Wazuh repository
    baseurl=https://packages.wazuh.com/3.x/yum/
    protect=1
    EOF


CentOS 5/RHEL 5
^^^^^^^^^^^^^^^

  .. code-block:: console

    # cat > /etc/yum.repos.d/wazuh.repo <<\EOF
    [wazuh_repo]
    gpgcheck=1
    gpgkey=http://packages.wazuh.com/key/GPG-KEY-WAZUH-5
    enabled=1
    name=Wazuh repository
    baseurl=http://packages.wazuh.com/3.x/yum/5/$basearch/
    protect=1
    EOF

SUSE 12
^^^^^^^

  .. code-block:: console

    # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH
    # cat > /etc/zypp/repos.d/wazuh.repo <<\EOF
    [wazuh_repo]
    gpgcheck=1
    gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
    enabled=1
    name=Wazuh repository
    baseurl=https://packages.wazuh.com/3.x/yum/
    protect=1
    EOF

SUSE 11
^^^^^^^

  .. code-block:: console

    # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH-5
    # cat > /etc/zypp/repos.d/wazuh.repo <<\EOF
    [wazuh_repo]
    gpgcheck=1
    gpgkey=http://packages.wazuh.com/key/GPG-KEY-WAZUH-5
    enabled=1
    name=Wazuh repository
    baseurl=http://packages.wazuh.com/3.x/yum/5/$basearch/
    protect=1
    EOF


Installing Wazuh agent
----------------------

1. On your terminal, install the Wazuh agent as follows:

  * Using the ``yum`` package manager:

    .. code-block:: console

      # yum install wazuh-agent

  * Using the ``zypper`` package manager:

    .. code-block:: console

      # zypper install wazuh-agent

  You can automate the agent registration with authd using the following environment variables:

  +-----------------------+------------------------------------------------------------------------------------------------------------------------------+
  | Option                | Description                                                                                                                  |
  +=======================+==============================================================================================================================+
  |   WAZUH_ADDRESS       |  Specifies the managers IP address or hostname.                                                                              |
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

  Registration with password::
  
      WAZUH_ADDRESS="192.168.1.1" WAZUH_AUTHD_SERVER="192.168.1.1" WAZUH_PASSWORD="TopSecret" WAZUH_AGENT_NAME="centos7" yum install wazuh-agent
    
  Registration with password and assigning a group::
  
      WAZUH_ADDRESS="192.168.1.1" WAZUH_AUTHD_SERVER="192.168.1.1" WAZUH_PASSWORD="TopSecret" WAZUH_GROUP="my-group" yum install wazuh-agent
    
  Registration with relative path to CA. It will be searched at your Wazuh installation folder::
  
      WAZUH_ADDRESS="192.168.1.1" WAZUH_AUTHD_SERVER="192.168.1.1" WAZUH_AGENT_NAME="centos7" WAZUH_CERTIFICATE="rootCA.pem" yum install wazuh-agent
    
  Absolute paths to CA, certificate or key that contain spaces can be written as shown below::
  
      WAZUH_ADDRESS="192.168.1.1" WAZUH_AUTHD_SERVER="192.168.1.1" WAZUH_KEY="/var/ossec/etc/sslagent.key" WAZUH_PEM="/var/ossec/etc/sslagent.cert" yum install wazuh-agent
    
  .. note::
      To verify agents via SSL, it's necessary to use both KEY and PEM options. See the :ref:`verify hosts with SSL <verify-hosts>` section.
    
  Registration with protocol::
    
      WAZUH_ADDRESS="192.168.1.1" WAZUH_AUTHD_SERVER="192.168.1.1" WAZUH_AGENT_NAME="centos7" WAZUH_PROTOCOL="TCP" yum install wazuh-agent


2. (Optional) Disable the Wazuh repository:

  It is recommended that the Wazuh repository be disabled in order to prevent accidental upgrades. To do this, use the following command:

  * Using the ``yum`` package manager:

    .. code-block:: console

      # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

  * Using the ``zypper`` package manager:

    .. code-block:: console

      # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo

.. note:: Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the :doc:`user manual<../../user-manual/agents/registering/index>`.
