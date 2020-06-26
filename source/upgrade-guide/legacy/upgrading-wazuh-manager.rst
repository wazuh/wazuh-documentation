.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrading_wazuh_server_legacy:

Upgrading the Wazuh server
==========================

Follow these steps to update the Wazuh v1.x server to the Wazuh v2.x.

#. Stop the processes:

    .. code-block:: console

      # /var/ossec/bin/ossec-control stop
      # systemctl stop wazuh-api

#. In case of having a multitier server, remove logstash-forwarder as it has been replaced by Filebeat:

    .. tabs::

      .. group-tab:: YUM

        .. code-block:: console

          # yum remove logstash-forwarder

      .. group-tab:: APT

        .. code-block:: console

          # apt-get remove logstash-forwarder

#. Install the Wazuh server:

    The current installation can be upgraded by following the :ref:`installation guide <installation_guide>` for the specific operating system.

    Once the package is installed, review the ``/var/ossec/etc/ossec.conf`` configuration file since it will be overwritten. The previous version can be found at the ``ossec.conf.rpmorig`` file or the ``ossec.conf.deborig`` file. It is recommended to compare the new file with its old version and import previous settings where needed.

    A backup of the custom rules and decoders will be saved at ``/var/ossec/etc/backup_ruleset``. The custom ruleset has to be reapplied. It is recommended to use the ``/var/ossec/etc/decoders`` folder and the ``/var/ossec/etc/rules`` folder for custom rules and decoders as these directories will not be overwritten by future upgrades.

#. To confirm that the Wazuh server is in v2.x use the ``manage_agents`` utility:

    .. code-block:: console

        # /var/ossec/bin/manage_agents -V

    .. code-block:: none
      	:class: output

      	Wazuh v2.0 - Wazuh Inc.

      	This program is free software; you can redistribute it and/or modify
      	it under the terms of the GNU General Public License (version 2) as
      	published by the Free Software Foundation.
