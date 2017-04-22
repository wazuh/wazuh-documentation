.. _upgrading_manager:

Upgrading Wazuh server
======================

Follow next steps in order to update your ``Wazuh 1.X`` installation to ``Wazuh 2.0``.

#. First of all, stop running processes::

    /var/ossec/bin/ossec-control stop
    systemctl stop wazuh-api

#. *Only if you have a distributed architecture*, remove logstash-forwarder (as it will be substituted by Filebeat):

  Deb systems::

    apt-get remove logstash-forwarder

  RPM systems::

    yum remove logstash-forwarder

#. Install Wazuh server:

  If you follow our installation guide, your current installation will be updated.

  - :ref:`Install Wazuh server with RPM packages <wazuh_server_rpm>`
  - :ref:`Install Wazuh server with Deb packages <wazuh_server_deb>`

  Once the package is installed, review your ``/var/ossec/etc/ossec.conf`` file, as it will be overwritten. The one that was previously in use has been saved as ``ossec.conf.rpmorig`` or ``ossec.conf.deborig``. It is recommended to compare the new file with the old one and import old settings when needed.

  In addition, a backup of your previous rules will be saved at ``/var/ossec/etc/backup_ruleset``. If these files contain any kind of customization, you will need to do them again. It is recommended to use ``/var/ossec/etc/decoders`` and ``/var/ossec/etc/rules`` for custom rules and decoders. These directories won't be overwritten by future upgrades.

#. Run ``/var/ossec/bin/manage_agents -V`` to confirm that now you are running ``Wazuh v2.0``::

    /var/ossec/bin/manage_agents -V

	Wazuh v2.0 - Wazuh Inc.

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License (version 2) as
	published by the Free Software Foundation. For more details, go to
	http://www.ossec.net/main/license/
