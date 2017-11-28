.. _wazuh_agent_deb:

Install Wazuh agent with DEB packages
=====================================

The DEB package is suitable for Debian, Ubuntu, and other Debian-based systems.

.. note:: Many of the commands described below need to be executed with root user privileges.

Adding the Wazuh repository
---------------------------

The first thing you need is to add the Wazuh repository to your server. Alternatively, if you prefer to download the wazuh-agent package directly, you can find it :ref:`here <packages>`.

1. In order to perform this procedure properly, packages ``curl``, ``apt-transport-https`` and ``lsb-release`` must be present on your system. If they are not, install them:

	.. code-block:: console

		# apt-get install curl apt-transport-https lsb-release

2. Install the Wazuh repository GPG key:

	.. code-block:: console

		# curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -

3. Adding the repository:

   .. code-block:: console

		# echo "deb https://packages.wazuh.com/apt main" | tee /etc/apt/sources.list.d/wazuh.list

4. Update the package information:

	.. code-block:: console

		# apt-get update

Installing Wazuh agent
----------------------

On your terminal, install the Wazuh agent:

	.. code-block:: console

		# apt-get install wazuh-agent

.. note:: At this point your agent is installed and you just need to register and configure it to talk to your manager. For more information about this process please visit our user manual.
