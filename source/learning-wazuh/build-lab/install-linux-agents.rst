.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about how to prepare your Wazuh Lab Environment. In this section, we show you how to install the Wazuh agent for Linux. 

.. _build_lab_install_linux_agents:

Install the Wazuh agent on a Linux system
=========================================

Use the following procedure separately on your `Linux Agent` to install, register and configure it to connect to the Wazuh manager.

.. note:: To execute all the commands, root user privileges are required.

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

#. Edit the ``WAZUH_MANAGER`` variable to contain your Wazuh manager IP address or hostname and execute the following command to install and configure your Wazuh agent: 

   .. code-block:: console

      # WAZUH_MANAGER="172.30.0.10" WAZUH_REGISTRATION_PASSWORD="please123" \
      yum -y install wazuh-agent

#. Enable and start the Wazuh agent service.

   .. include:: ../../_templates/installations/wazuh/common/enable_wazuh_agent_service.rst    

#. Verify the agent has properly connected:

   .. code-block:: console

      # grep ^status /var/ossec/var/run/wazuh-agentd.state

   You should see output like this:

   .. code-block:: none
      :class: output

      status='connected'

.. note::
  The ``/var/ossec/var/run/wazuh-agentd.state`` file on Unix-like platforms and the ``C:\Program Files (x86)\ossec-agent\wazuh-agent.state`` file on Windows platforms contain several useful pieces of information about the state of the Wazuh agent connection with the Wazuh manager.  See the file content itself for more information.

Now disable the Wazuh repository in order to prevent a future unintended upgrade that may cause a version conflict with the current installation.

   .. code-block:: console

      # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo
