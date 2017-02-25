.. _wazuh_agent_deb:

Install Wazuh agent with Deb packages
======================================

The deb package is suitable for Debian, Ubuntu, and other Debian-based systems.

Adding the Wazuh repository
-------------------------------------------

The first thing you need to do is to add the Wazuh repository to your host. Alternatively, if you prefer to download the wazuh-agent package directly, you can find it :ref:`here <packages>`.

1. In order to perform this procedure properly, packages ``curl`` and ``apt-transport-https`` must be present on your system. If they are not, install them::

	apt-get install curl apt-transport-https

2. Install the Wazuh repository GPG key::

	curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -

3. Add the Wazuh repository that corresponds to your operating system:

.. note::
	To check your version, you can use: ``lsb_release -a``

- Debian 7 "Wheezy"::

    echo "deb https://packages.wazuh.com/apt wheezy main" | tee /etc/apt/sources.list.d/wazuh.list

- Debian 8 "Jessie"::

    echo "deb https://packages.wazuh.com/apt jessie main" | tee /etc/apt/sources.list.d/wazuh.list

- Debian "stretch"::

    echo "deb https://packages.wazuh.com/apt stretch main" | tee /etc/apt/sources.list.d/wazuh.list

- Debian "sid"::

    echo "deb https://packages.wazuh.com/apt sid main" | tee /etc/apt/sources.list.d/wazuh.list

- Ubuntu 12.04 "Precise Pangolin"::

    echo "deb https://packages.wazuh.com/apt precise main" | tee /etc/apt/sources.list.d/wazuh.list

- Ubuntu 14.04 "Trusty Tahr"::

    echo "deb https://packages.wazuh.com/apt trusty main" | tee /etc/apt/sources.list.d/wazuh.list

- Ubuntu 15.04 "Vivid Vervet"::

    echo "deb https://packages.wazuh.com/apt vivid main" | tee /etc/apt/sources.list.d/wazuh.list

- Ubuntu 15.10 "Wily Werewolf"::

    echo "deb https://packages.wazuh.com/apt wily main" | tee /etc/apt/sources.list.d/wazuh.list

- Ubuntu 16.04 "Xenial Xerus"::

    echo "deb https://packages.wazuh.com/apt xenial main" | tee /etc/apt/sources.list.d/wazuh.list

- Ubuntu 16.10 "Yakkety Yak"::

    echo "deb https://packages.wazuh.com/apt yakkety main" | tee /etc/apt/sources.list.d/wazuh.list

4. Update the package information::

	apt-get update

Installing Wazuh agent
-------------------------------------------

On your terminal, install the Wazuh agent::

	apt-get install wazuh-agent

Edit file `/var/ossec/etc/ossec.conf` and replace the text *MANAGER_IP* with the manager's IP address. For example::

	<ossec_config>
	  <client>
	    <server-ip>1.2.3.4</server_ip>

At this point, you need to :ref:`register the agent in the manager <connecting_agents>`.

Restart the agent to apply changes and check the agent status:

    a) For Systemd::

        systemctl restart wazuh-agent
        systemctl status wazuh-agent

    b) For SysV Init::

        service wazuh-agent restart
        service wazuh-agent status
