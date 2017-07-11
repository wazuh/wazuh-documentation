.. _upgrading_manager:

Upgrading Wazuh server
======================

Follow next steps in order to update your ``Wazuh v1.X`` installation to ``Wazuh v2.0``.

1. First of all, stop running processes:

  .. code-block:: bash

    $ /var/ossec/bin/ossec-control stop
    $ systemctl stop wazuh-api

2. *Only if you have a distributed architecture*, remove logstash-forwarder (it's been replaced by Filebeat):

  Deb systems:

  .. code-block:: bash

    $ apt-get remove logstash-forwarder

  RPM systems:

  .. code-block:: bash

    $ yum remove logstash-forwarder

3. Install Wazuh server:

  You could upgrade your current installation by following our installation guide.

  - :ref:`Install Wazuh server with RPM packages <wazuh_server_rpm>`
  - :ref:`Install Wazuh server with Deb packages <wazuh_server_deb>`

  Once the package is installed, review your ``/var/ossec/etc/ossec.conf`` file, as it will be overwritten. The one that was previously in use has been saved as ``ossec.conf.rpmorig`` or ``ossec.conf.deborig``. It is recommended to compare the new file with the old one and import old settings when needed.

  A backup of your custom rules and decoders will be saved at ``/var/ossec/etc/backup_ruleset``. You need to reapply them again, we recommend use ``/var/ossec/etc/decoders`` and ``/var/ossec/etc/rules`` for custom rules and decoders, these directories won't be overwritten by future upgrades.

4. Run ``/var/ossec/bin/manage_agents -V`` to confirm that now you are running ``Wazuh v2.0``:

.. code-block:: bash

    $ /var/ossec/bin/manage_agents -V

  	Wazuh v2.0 - Wazuh Inc.

  	This program is free software; you can redistribute it and/or modify
  	it under the terms of the GNU General Public License (version 2) as
  	published by the Free Software Foundation.
