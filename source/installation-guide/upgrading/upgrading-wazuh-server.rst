.. _upgrading_manager:

Upgrading Wazuh server
=====================================

This section will update your current Wazuh 1.1 installation to Wazuh 2.0. Following the next guide, your current installation will be automatically update:

#. First of all, stop eveything:

	::

			/var/ossec/bin/ossec-control stop
			systemctl stop wazuh-api

#. If you have a distributed architecture, remove logstash-forwarder:

	    Deb systems::

	    	apt-get remove logstash-forwarder

	    RPM systems::

	    	yum remove logstash-forwarder

#. Install Wazuh server:

		If you follow our installation guide, your current installation will be updated.

			- :ref:`Install Wazuh server with RPM packages <wazuh_server_rpm>`
			- :ref:`Install Wazuh server with Deb packages <wazuh_server_deb>`

		Once everything is updated, review your ``ossec.conf``. The configuration file **/var/ossec/etc/ossec.conf will be overwritten**. The *old* configuration file from the current installation is saved as *ossec.conf.rpmorig* or *ossec.conf.deborig*. You should compare the new file with the old one.

		Also, a backup of your previous ruleset will be saved at */var/ossec/etc/backup_ruleset*. You need to review it in case you have created new rules/decoders in other file than *local_rules.xml* or *local_decoder.xml*.

		.. note::
			**Next upgrades (versions > 2.0) will not overwrite the file /var/ossec/etc/ossec.conf**. In these cases, the *new* configuration file from the update package is installed as *ossec.conf.rpmnew* or *ossec.conf.debnew* and might reflect new options or a new notion of best practices.


#. Run ``/var/ossec/bin/manage_agents -V`` to check that everything worked as expected::

	# /var/ossec/bin/manage_agents -V

	Wazuh v2.0 - Wazuh Inc.

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License (version 2) as
	published by the Free Software Foundation. For more details, go to
	http://www.ossec.net/main/license/
