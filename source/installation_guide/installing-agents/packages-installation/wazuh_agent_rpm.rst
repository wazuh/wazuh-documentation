.. _wazuh_agent_rpm:

Install Wazuh agent with RPM packages
==========================================

The rpm package is suitable for installation on Red Hat, CentOS and other RPM-based systems.  Alternatively, if you prefer to download the wazuh-agent package directly, you can find it :ref:`here <packages>`.

**1.** First install the Wazuh repository on the system where you want to install the agent. Run the following command that corresponds to your specific Linux distribution: 

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

**2.** Install the Wazuh agent package::

	yum install wazuh-agent

Once the process is complete, you can check the state with

	a) For Systemd::

			systemctl status wazuh-agent

	b) For SysV Init::

			service wazuh-agent status

**3.** Edit file `/var/ossec/etc/ossec.conf` and replace the text *MANAGER_IP* with the manager's IP address. For example::

	<ossec_config>
	  <client>
	    <server-ip>1.2.3.4</server_ip>

Next steps
----------

At this point the Wazuh agent is installed and configured. Now we should :ref:`connect it to the manager <connecting_agents>`.
