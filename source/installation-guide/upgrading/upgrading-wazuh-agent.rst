Update Wazuh Agents
===================

This section will update your current Wazuh 1.1 installation to Wazuh 2.0. Following the next guide, your current installation will be automatically update:

#. First of all, stop eveything:

	::

			/var/ossec/bin/ossec-control stop

#. Install Wazuh agent:

		- :ref:`Install Wazuh agent with RPM packages <wazuh_agent_rpm>`
		- :ref:`Install Wazuh agent with Deb packages <wazuh_agent_deb>`

#. Run ``/var/ossec/bin/manage_agents -V`` to check that everything worked as expected::

	# /var/ossec/bin/manage_agents -V

	Wazuh v2.0 - Wazuh Inc.

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License (version 2) as
	published by the Free Software Foundation. For more details, go to
	http://www.ossec.net/main/license/
