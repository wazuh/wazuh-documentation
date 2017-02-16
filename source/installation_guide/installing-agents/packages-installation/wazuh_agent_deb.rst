.. _wazuh_agent_deb:

Install Wazuh agent with RPM packages
======================================

The deb package is suitable for Debian, Ubuntu, and other Debian-based systems.

**1.** In order to perform this procedure properly, packages ``curl`` and ``apt-transport-https`` must be installed into your system. If they are not, install them::

	apt-get install curl apt-transport-https

**2.** Install the GPG key::

	curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -

**3.** Add the Wazuh repository depending on your operating system:

.. note::
	To check your version, you can use: ``lsb_release -a``, ``cat /etc/issue`` or ``uname -a``

- Debian 7 "Wheezy"::

    echo "deb https://packages.wazuh.com/apt wheezy main" | tee /etc/apt/sources.list.d/wazuh.list

- Debian 8 "Jessie"::

    echo "deb https://packages.wazuh.com/apt jessie main" | tee /etc/apt/sources.list.d/wazuh.list

- Debian "stretch" (testing)::

    echo "deb https://packages.wazuh.com/apt stretch main" | tee /etc/apt/sources.list.d/wazuh.list

- Debian "sid" (unstable)::

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

**4.** Update the package information and install the Wazuh packages::

	apt-get update
	apt-get install wazuh-agent

Once the process is completed, you can check the state with

		a) For Systemd::

				systemctl status wazuh-agent

		b) For SysV Init::

				service wazuh-agent status

Next steps
----------

At this point the Wazuh agent is installed and configured. Now we should :ref:`connect it to the manager <connecting_agents>`.
