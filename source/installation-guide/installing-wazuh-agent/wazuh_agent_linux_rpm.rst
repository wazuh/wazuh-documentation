.. Copyright (C) 2019 Wazuh, Inc.

.. _wazuh_agent_linux_rpm:

Install Wazuh agent on CentOS/RHEL/Oracle Linux/Amazon Linux
============================================================

The RPM package is suitable for installation on Red Hat, CentOS and other RPM-based systems. In this page we will provide the instruction for:

- Centos/RHEL 6 or greater. 
- Oracle Linux
- Amazon Linux

For other RPM-based OS (Centos/RHEL 5, Fedora, Suse, OpenSUSE), please check the list: :doc:`OS list <wazuh_agent_linux>`. 

.. note:: All the commands described below need to be executed with root user privileges.

Installing Wazuh agent
----------------------

1. Adding the Wazuh repository

  .. code-block:: console

    # rpm --import http://packages.wazuh.com/key/GPG-KEY-WAZUH 
    # cat > /etc/yum.repos.d/wazuh.repo <<\EOF
    [wazuh_repo]
    gpgcheck=1
    gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
    enabled=1
    name=Wazuh repository
    baseurl=https://packages.wazuh.com/3.x/yum/
    protect=1
    EOF

2. On your terminal, install the Wazuh agent. You can choose standard installation or an installation with configuration provisioning:

  a) Standard installation:

    .. code-block:: console
   
      # yum install wazuh-agent
         
    Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the document: :doc:`user manual<../../user-manual/registering/index>`.

  b) Installation with configuration provisioning:

    You can automate the agent registration and configuration using variables. It is necessary to define at least the variable ``WAZUH_MANAGER_IP``. The agent will use this value to register and it will be the assigned manager for forwarding events. 

    .. code-block:: console

      # WAZUH_MANAGER_IP="10.0.0.2" yum install wazuh-agent 

    See the following document for additional automated deployment options: :doc:`deployment variables <deployment_variables>`.      

3. **(Optional)** Disable the Wazuh repository:

  We recommend maintaining the Wazuh Manager version greater or equal to that of the Wazuh Agents. f a Wazuh Agent has a greater version, it is possible that the message sent will be misunderstood by the Wazuh Manager because of some new feature. As a result, we recommended disabling the Wazuh repository in order to prevent accidental upgrades. To do this, use the following command:

    .. code-block:: console

      # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

