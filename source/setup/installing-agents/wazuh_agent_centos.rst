.. _wazuh_agent_centos:

Install Wazuh agent on CentOS
=============================

1. First we'll install the Wazuh repository. Run the following command depending on your operating system:

	a) For RHEL or CentOS::

		cat > /etc/yum.repos.d/wazuh.repo <<\EOF
		[wazuh_repo]
		gpgcheck=1
		gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
		enabled=1
		name=RHEL-$releasever - Wazuh
		baseurl=https://packages.wazuh.com/yum/el/$releasever/$basearch
		protect=1
		EOF

	b) For Fedora::

		cat > /etc/yum.repos.d/wazuh.repo <<\EOF
		[wazuh_repo]
		gpgcheck=1
		gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
		name=Fedora-$releasever - Wazuh
		enabled=1
		baseurl=https://packages.wazuh.com/yum/fc/$releasever/$basearch
		protect=1
		EOF

2. Install the Wazuh packages::

	yum install wazuh-agent

3. Edit file `/var/ossec/etc/ossec.conf` and replace the text *MANAGER_IP* for the manager's IP address. For example::

	<ossec_config>
	  <client>
	    <server-ip>1.2.3.4</server_ip>

Next steps
----------

At this point the Wazuh agent is installed and configured. Now we should :ref:`connect it to the manager <wazuh_agent_connect>`.
