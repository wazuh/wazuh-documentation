.. _wazuh_agent_rpm:

Install Wazuh agent with RPM packages
==========================================

The rpm package is suitable for installation on Red Hat, CentOS and other RPM-based systems.

Adding the Wazuh repository
-------------------------------------------

The first thing you need to do is to add the Wazuh repository to your host. Alternatively, if you prefer to download the wazuh-agent package directly, you can find it :ref:`here <packages>`.

Run the following command that corresponds to your specific Linux distribution:

    a) For CentOS::

        cat > /etc/yum.repos.d/wazuh.repo <<\EOF
        [wazuh_repo]
        gpgcheck=1
        gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
        enabled=1
        name=CentOS-$releasever - Wazuh
        baseurl=https://packages.wazuh.com/yum/el/$releasever/$basearch
        protect=1
        EOF

    b) For RHEL::

        cat > /etc/yum.repos.d/wazuh.repo <<\EOF
        [wazuh_repo]
        gpgcheck=1
        gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
        enabled=1
        name=RHEL-$releasever - Wazuh
        baseurl=https://packages.wazuh.com/yum/rhel/$releasever/$basearch
        protect=1
        EOF

    c) For Fedora::

        cat > /etc/yum.repos.d/wazuh.repo <<\EOF
        [wazuh_repo]
        gpgcheck=1
        gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
        name=Fedora-$releasever - Wazuh
        enabled=1
        baseurl=https://packages.wazuh.com/yum/fc/$releasever/$basearch
        protect=1
        EOF

Installing Wazuh agent
-------------------------------------------

On your terminal, install the Wazuh agent::

	yum install wazuh-agent

Edit file `/var/ossec/etc/ossec.conf` and replace the text *MANAGER_IP* with the manager's IP address. For example::

	<ossec_config>
	  <client>
	    <server-ip>1.2.3.4</server_ip>

Restart the agent to apply changes and check the agent status:

    a) For Systemd::

        systemctl restart wazuh-agent
        systemctl status wazuh-agent

    b) For SysV Init::

        service wazuh-agent restart
        service wazuh-agent status

Next steps
----------

At this point the Wazuh agent is installed and configured. Now we should :ref:`connect it to the manager <connecting_agents>`.
