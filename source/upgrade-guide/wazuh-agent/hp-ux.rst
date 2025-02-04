.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out how to upgrade the Wazuh agent to the latest available version remotely, using the agent_upgrade tool or the Wazuh API, or locally.


Upgrading Wazuh agents on HP-UX endpoints
=========================================

Follow the steps to upgrade the Wazuh agent on HP-UX endpoints.

#. Download the latest `HP-UX installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_HPUX|/hp-ux/wazuh-agent-|WAZUH_CURRENT_HPUX|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar.gz>`_.

#. Stop the Wazuh agent.

   .. code-block:: console

      # /var/ossec/bin/wazuh-control stop


#. Backup the ``/var/ossec/etc/ossec.conf`` and ``/var/ossec/etc/client.keys`` files:

   .. code-block:: console

      # cp /var/ossec/etc/ossec.conf ~/ossec.conf.bk
      # cp /var/ossec/etc/client.keys ~/client.keys.bk


#. **Only for upgrades from version 4.2.7 or lower**:

   #. Delete the ossec user and group.

      .. code-block:: console

         # groupdel ossec
         # userdel ossec

   #. Create the wazuh user and group.

      .. code-block:: console

         # groupadd wazuh
         # useradd -G wazuh wazuh

#. Deploy the Wazuh agent files.

   .. code-block:: console

      # gzip -d wazuh-agent-|WAZUH_CURRENT_HPUX|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar.gz
      # tar -xvf wazuh-agent-|WAZUH_CURRENT_HPUX|-|WAZUH_REVISION_HPUX|-hpux-11v3-ia64.tar


#. Restore the ``/var/ossec/etc/ossec.conf`` and ``/var/ossec/etc/client.keys`` files:

   .. code-block:: console

      # mv ~/ossec.conf.bk /var/ossec/etc/ossec.conf
      # chown root:wazuh /var/ossec/etc/ossec.conf
      # mv ~/client.keys.bk /var/ossec/etc/client.keys
      # chown root:wazuh /var/ossec/etc/client.keys


#. Start the wazuh-agent.

   .. code-block:: console

      # /var/ossec/bin/wazuh-control start
