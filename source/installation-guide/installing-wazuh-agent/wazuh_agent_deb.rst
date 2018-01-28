.. _wazuh_agent_deb:

Install Wazuh agent with DEB packages
=====================================

The DEB packages are suitable for Debian, Ubuntu, and other Debian-based systems.

.. note:: Many of the commands described below need to be executed with root user privileges.

Adding the Wazuh repository
---------------------------

The first step to installing the Wazuh agent is to add the Wazuh repository to your server. Alternatively, if you prefer to download the wazuh-agent package directly, you can find it :ref:`here <packages>`.

1. To perform this procedure, the ``curl``, ``apt-transport-https`` and ``lsb-release`` packages must be installed on your system. If they are not already present, install them using the commands below:

	.. code-block:: console

		# apt-get install curl apt-transport-https lsb-release

2. Install the Wazuh repository GPG key:

	.. code-block:: console

		# curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -

3. Add the repository:

   .. code-block:: console

		# echo "deb https://packages.wazuh.com/3.x/apt/ stable main" | tee /etc/apt/sources.list.d/wazuh.list

4. Update the package information:

	.. code-block:: console

		# apt-get update

Installing Wazuh agent
----------------------

On your terminal, install the Wazuh agent:

	.. code-block:: console

		# apt-get install wazuh-agent

.. note:: Now that the agent is installed, the next step is to register and configure it to communicate with the manager. For more information about this process, please visit the user manual.
