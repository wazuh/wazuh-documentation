.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_wazuh_server:

Upgrading Wazuh server
=======================

Follow these steps to update your ``Wazuh v1.x`` server to ``Wazuh v2.x``.

1. First, stop the processes:

  .. code-block:: console

    # /var/ossec/bin/ossec-control stop

2. **If you have a distributed architecture**, remove logstash-forwarder as it has been replaced by Filebeat:

  Deb systems:

  .. code-block:: console

    # apt-get remove logstash-forwarder

  RPM systems:

  .. code-block:: console

    # yum remove logstash-forwarder

3. Install the Wazuh server:

  You can upgrade your current installation by following the below installation guide for your specific operating system:

  - :ref:`Install Wazuh server with RPM packages <wazuh_server_installation>`

  Once the package is installed, review your ``/var/ossec/etc/ossec.conf`` file because your previous version will have been overwritten. The previous version has been saved as ``ossec.conf.rpmorig`` or ``ossec.conf.deborig``. It is recommended that you  compare the new file with the old one and import old settings where needed.

  A backup of your custom rules and decoders will also be saved at ``/var/ossec/etc/backup_ruleset``. You will need to reapply them. We recommend that you use ``/var/ossec/etc/decoders`` and ``/var/ossec/etc/rules`` for custom rules and decoders going forward as these directories will not be overwritten by future upgrades.

4. Run ``/var/ossec/bin/manage_agents -V`` to confirm that you are now running ``Wazuh v2.x``:

.. code-block:: console

    # /var/ossec/bin/manage_agents -V

.. code-block:: none
  	:class: output

  	Wazuh v2.0 - Wazuh Inc.

  	This program is free software; you can redistribute it and/or modify
  	it under the terms of the GNU General Public License (version 2) as
  	published by the Free Software Foundation.
