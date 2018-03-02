.. _build_lab_install_linux_agents:

Install the Linux Wazuh agents
==============================

Use the following procedure separately on your Linux Agent and Elastic Server instances to register and connect them to the Wazuh Manager.

Log in and sudo to root
-----------------------

    .. code-block:: console

        # sudo su -

Add the Wazuh yum repository
----------------------------

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


Install and connect Wazuh Agent to Manager
------------------------------------------

Install the Wazuh Agent software

  .. code-block:: console

    # yum -y install wazuh-agent


Configure Wazuh Agent to reach out to the Wazuh Manager's IP via tcp.

  .. code-block:: console

    # egrep "<protocol>udp|<address>MANAGER_IP" -B3 -A1 /var/ossec/etc/ossec.conf
    # sed -i 's/MANAGER_IP/172.30.0.10/' /var/ossec/etc/ossec.conf
    # sed -i 's/<protocol>udp/<protocol>tcp/' /var/ossec/etc/ossec.conf
    # egrep "<protocol>tcp|<address>172.30.0.10" -B3 -A1 /var/ossec/etc/ossec.conf


Make Wazuh Agent register itself with the Wazuh Manager, presenting the required password.

  .. code-block:: console

    # agent-auth -m 172.30.0.10 -P please123


Restart Wazuh Agent and confirm it successfully connected with the Manager.  Run this on the Wazuh Agent side.

  .. code-block:: console

    # ossec-control restart
    # grep ^status /var/ossec/var/run/ossec-agentd.state

You should see output like this:

  .. code-block:: console

    status='connected'

.. note:: 
  The **/var/ossec/var/run/ossec-agentd.state** file on \*NIX platforms and the **C:\\Program Files (x86)\\ossec-agent\\ossec-agent.state**
  file on Windows platforms contain several useful pieces of information about the state of the Wazuh agent's connection with the Wazuh 
  manager.  See the file content itself for more information.  
