.. _wazuh_server_deb:

Install Wazuh manager (deb)
===============================

The deb package is suitable for Debian, Ubuntu, and other Debian-based systems.

1. In order to perform this procedure properly, packages ``curl`` and ``apt-transport-https`` must be installed into your system. If they are not, install them::

	apt-get install curl apt-transport-https

2. Install the GPG key::

	curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -

3. Add the Wazuh repository depending on your operating system:

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

4. Update the package information and install the Wazuh packages::

	apt-get update
	apt-get install wazuh-manager wazuh-api

Next steps
----------

Once you've installed the Wazuh manager, you may want to :ref:`Install Filebeat <filebeat_deb>`.
