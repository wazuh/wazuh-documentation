.. _wazuh_agent_deb:

Install Wazuh agent with DEB packages
=====================================

The DEB package is suitable for Debian, Ubuntu, and other Debian-based systems.

Adding the Wazuh repository
---------------------------

The first thing you need to do is to add the Wazuh repository to your host. Alternatively, if you prefer to download the wazuh-agent package directly, you can find it :ref:`here <packages>`.

1. In order to perform this procedure properly, packages ``curl``, ``apt-transport-https`` and ``lsb-release`` must be present on your system. If they are not, install them::

	apt-get install curl apt-transport-https lsb-release

2. Install the Wazuh repository GPG key::

	curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -

3. Getting the distribution codename and adding the repository:

   .. code-block:: bash

	CODENAME=$(lsb_release -cs)
	echo "deb https://packages.wazuh.com/apt $CODENAME main" \
	| tee /etc/apt/sources.list.d/wazuh.list

These are the supported codename values:

	- For Debian: wheezy, jessie, stretch and sid
	- For Ubuntu: trusty, vivid, wily, xenial and yakkety

4. Update the package information::

	apt-get update

Installing Wazuh agent
----------------------

On your terminal, install the Wazuh agent::

	apt-get install wazuh-agent

.. note:: At this point your agent is installed and you just need to register and configure it to talk to your manager. For more information about this process please visit our user manual.
