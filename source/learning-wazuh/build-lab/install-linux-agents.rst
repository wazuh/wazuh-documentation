.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to prepare your Wazuh Lab Environment. In this section, we show you how to install the Linux Wazuh agent. 

.. _build_lab_install_linux_agents:

Install the Linux Wazuh agents
==============================

Use the following procedure separately on your **Linux Agent** and **Elastic Server**
instances to install, register and configure them to connect to the Wazuh manager.

Log in and sudo to root
-----------------------

Remember to do this on both your Linux Agent and on your Elastic Server:

    .. code-block:: console

        [user@user_machine]$ ssh -i Wazuh_Lab.pem centos@ELASTIC_SERVER_IP
        [root@elastic-server ~]$ sudo su -

        [user@user_machine]$ ssh -i Wazuh_Lab.pem centos@LINUX_AGENT_IP
        [centos@linux-agent ~]$ sudo su -

Add the Wazuh yum repository
----------------------------

     .. code-block:: console

         # cat > /etc/yum.repos.d/wazuh.repo <<\EOF
         [wazuh_repo]
         gpgcheck=1
         gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
         enabled=1
         name=Wazuh repository
         baseurl=https://packages.wazuh.com/4.x/yum/
         protect=1
         EOF


Install and connect Wazuh agent to Manager
------------------------------------------

Install and start the Wazuh agent software

  .. code-block:: console

    # WAZUH_MANAGER="172.30.0.10" WAZUH_REGISTRATION_PASSWORD="please123" \
    WAZUH_PROTOCOL="tcp" yum -y install wazuh-agent
    # systemctl start wazuh-agent

Verify the agent has properly connected:

  .. code-block:: console

    # grep ^status /var/ossec/var/run/wazuh-agentd.state

You should see output like this:

  .. code-block:: none
    :class: output

    status='connected'

.. note::
  The **/var/ossec/var/run/wazuh-agentd.state** file on Unix-like platforms and the
  **C:\\Program Files (x86)\\ossec-agent\\wazuh-agent.state** file on Windows
  platforms contain several useful pieces of information about the state of the
  Wazuh agent's connection with the Wazuh manager.  See the file content itself
  for more information.

Now disable the Wazuh repository in order to prevent a future unintended upgrade
that may cause a version conflict with the current installation.

  .. code-block:: console

    # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo
