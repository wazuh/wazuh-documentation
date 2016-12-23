.. _wazuh_agent_debian:

Install Wazuh agent on Debian
=============================

1. Install the GPG key::

	curl -s https://packages.wazuh.com/key/RPM-GPG-KEY-WAZUH | apt-key add -

2. Add the Wazuh repository depending on your operating system:

	- Debian 7 "Wheezy"::

		echo "deb http://packages.wazuh.com/apt/debian wheezy main" | tee /etc/apt/sources.list.d/wazuh.list

	- Debian 8 "Jessie"::

		echo "deb http://packages.wazuh.com/apt/debian jessie main" | tee /etc/apt/sources.list.d/wazuh.list

	- Debian "stretch" (testing)::

		echo "deb http://packages.wazuh.com/apt/debian stretch main" | tee /etc/apt/sources.list.d/wazuh.list

	- Debian "sid" (unstable)::

		echo "deb http://packages.wazuh.com/apt/debian sid main" | tee /etc/apt/sources.list.d/wazuh.list

	- Ubuntu 12.04 "Precise Pangolin"::

		echo "deb http://packages.wazuh.com/apt/ubuntu precise main" | tee /etc/apt/sources.list.d/wazuh.list

	- Ubuntu 14.04 "Trusty Tahr"::

		echo "deb http://packages.wazuh.com/apt/ubuntu trusty main" | tee /etc/apt/sources.list.d/wazuh.list

	- Ubuntu 15.04 "Vivid Vervet"::

		echo "deb http://packages.wazuh.com/apt/ubuntu vivid main" | tee /etc/apt/sources.list.d/wazuh.list

	- Ubuntu 15.10 "Wily Werewolf"::

		echo "deb http://packages.wazuh.com/apt/ubuntu wily main" | tee /etc/apt/sources.list.d/wazuh.list

	- Ubuntu 16.04 "Xenial Xerus"::

		echo "deb http://packages.wazuh.com/apt/ubuntu xenial main" | tee /etc/apt/sources.list.d/wazuh.list

	- Ubuntu 16.10 "Yakkety Yak"::

		echo "deb http://packages.wazuh.com/apt/ubuntu yakkety main" | tee /etc/apt/sources.list.d/wazuh.list

3. Update the package information and install the Wazuh packages::

	apt-get update
	apt-get install wazuh-agent
