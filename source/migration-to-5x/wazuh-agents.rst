.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Migrate Wazuh agent registrations and agent groups from an existing Wazuh 4.x deployment to Wazuh 5.x.

Wazuh agents
============

The Wazuh agent identifies itself to the Wazuh manager using a unique agent ID and authentication key. When migrating from 4.x to 5.x, you can migrate the existing agent registrations to the Wazuh 5.x manager, restore the required agent groups, and update the agents to communicate with the new deployment.

You can migrate the following Wazuh agent components:

-  Agent registrations
-  Agent groups

.. _migration_agent_registration:

Agent registration
-------------------

The Wazuh manager 4.x stores agent registrations in the ``/var/ossec/etc/client.keys`` file and the Wazuh manager database. To preserve existing Wazuh agent identities during the migration, migrate the agent registrations to the Wazuh 5.x manager before reconnecting the agents.

.. _migration_migrate_agent_registrations:

Migrate agent registrations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps to migrate the Wazuh agent registrations from Wazuh 4.x to 5.x.

Wazuh 4.x manager
~~~~~~~~~~~~~~~~~

#. Stop the Wazuh 4.x manager so that the agent database doesn't change while you copy it:

   .. code-block:: console

      # systemctl stop wazuh-manager

#. Back up the agent keys, the agent registry, and the custom agent groups. The archive excludes the ``default`` group, because the Wazuh 5.x manager provides its own:

   .. code-block:: console

      # mkdir -p /root/wazuh-4x-backup
      # cp /var/ossec/etc/client.keys /var/ossec/queue/db/global.db /root/wazuh-4x-backup/
      # cd /var/ossec/etc && tar -czf /root/wazuh-4x-backup/groups.tar.gz --exclude='shared/default' --exclude='*/merged.mg' shared/*/

   If you customized ``shared/default/agent.conf``, merge its settings into the Wazuh 5.x ``default`` group manually.

#. Start the Wazuh 4.x manager:

   .. code-block:: console

      # systemctl start wazuh-manager

#. Copy the ``/root/wazuh-4x-backup/`` directory to the same path on the Wazuh 5.x manager using a secure method, such as ``scp``. The backup files are readable only by ``root``, run the copy as ``root`` or with ``sudo``.

Wazuh 5.x manager
~~~~~~~~~~~~~~~~~

#. Stop the Wazuh 5.x manager:

   .. code-block:: console

      # systemctl stop wazuh-manager

#. Restore the agent keys with the ownership and permissions that Wazuh 5.x requires:

   .. code-block:: console

      # install -m 660 -o wazuh-manager -g wazuh-manager /root/wazuh-4x-backup/client.keys /etc/wazuh-manager/client.keys

#. Copy the agent registrations and group memberships from the Wazuh 4.x database into the Wazuh 5.x database. Wazuh 5.x uses a different database schema, so you can't replace the database file:

   .. code-block:: console

      # sqlite3 /var/wazuh-manager/queue/db/global.db <<'SQL'
      ATTACH '/root/wazuh-4x-backup/global.db' AS old;
      INSERT OR REPLACE INTO agent
        (id, name, ip, register_ip, internal_key, os_name, os_version, os_major, os_minor, os_type, os_platform, os_arch,
         version, date_add, last_keepalive, `group`, group_hash, group_sync_status, sync_status, connection_status,
         disconnection_time, status_code)
      SELECT id, name, ip, register_ip, internal_key, os_name, os_version, os_major, os_minor,
             CASE WHEN lower(os_platform) = 'windows' THEN 'windows'
                  WHEN lower(os_platform) = 'darwin' THEN 'macos'
                  WHEN os_platform IS NULL THEN NULL ELSE 'linux' END,
             os_platform, os_arch, version, date_add, last_keepalive, `group`, group_hash, group_sync_status, sync_status,
             'disconnected', 0, status_code
      FROM old.agent WHERE id > 0;
      INSERT OR IGNORE INTO `group` (name) SELECT name FROM old.`group`;
      INSERT OR REPLACE INTO belongs (id_agent, id_group, priority)
      SELECT b.id_agent, g5.id, b.priority
      FROM old.belongs b JOIN old.`group` g4 ON g4.id = b.id_group JOIN `group` g5 ON g5.name = g4.name
      WHERE b.id_agent > 0;
      SQL
      # chown wazuh-manager:wazuh-manager /var/wazuh-manager/queue/db/global.db

   The command requires the ``sqlite3`` tool. If it isn't installed, install it, or run the same SQL statements with the Python interpreter included with the Wazuh manager, ``/var/wazuh-manager/framework/python/bin/python3``.

#. Restore the custom agent groups:

   .. code-block:: console

      # tar -xzf /root/wazuh-4x-backup/groups.tar.gz -C /etc/wazuh-manager/
      # chown -R wazuh-manager:wazuh-manager /etc/wazuh-manager/shared/*

   Review the restored ``agent.conf`` files and update or remove any settings that Wazuh 5.x doesn't support.

#. Start the Wazuh 5.x manager:

   .. code-block:: console

      # systemctl start wazuh-manager

#. Verify that the agents keep their Wazuh 4.x IDs, groups, and registration dates:

   .. code-block:: console

      # TOKEN=$(curl -sk -u wazuh:<PASSWORD> -X POST "https://localhost:55000/security/user/authenticate?raw=true")
      # curl -sk "https://localhost:55000/agents?select=id,name,group,dateAdd" -H "Authorization: Bearer $TOKEN"

   Replace ``<PASSWORD>`` with the ``WAZUH_MANAGER_API_PASSWORD`` value from ``/etc/wazuh/credentials.env``. The agents appear as ``disconnected`` until they reconnect to the Wazuh 5.x manager.

Wazuh agent
~~~~~~~~~~~

#. Update the manager address in the Wazuh agent configuration so that the Wazuh agent connects to the Wazuh 5.x manager. Add the Wazuh manager IP address or fully qualified domain name (FQDN) to the ``<address>`` setting in the ``<client><server>`` section.

   .. code-block:: xml
      :emphasize-lines: 3

      <client>
        <server>
          <address><WAZUH_MANAGER_IP></address>
        </server>
      </client>

   Replace ``<WAZUH_MANAGER_IP>`` with the IP address of the Wazuh 5.x manager.

#. Restart the Wazuh agent for the changes to take effect.

   -  **Linux**

      .. code-block:: console

         # systemctl restart wazuh-agent

   -  **macOS**

      .. code-block:: console

         # /Library/Ossec/bin/wazuh-control restart

   -  **Windows** (PowerShell as Administrator)

      .. code-block:: powershell

         > Restart-Service -Name WazuhSvc

   .. note::

      Although migrated Wazuh agents can continue communicating with the Wazuh 5.x manager, we recommend upgrading them to the corresponding Wazuh 5.x agent to ensure full compatibility and access to the latest features and improvements.

Upgrade the migrated Wazuh agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Wazuh 5.x agents verify the Wazuh manager certificate. A package upgrade doesn't install the Wazuh manager root certificate on the agent, so the upgraded agent connects with TLS verification disabled. Perform the following steps on each Linux agent that you upgrade with a package.

#. Copy ``/etc/wazuh-manager/certs/root-ca.pem`` from the Wazuh 5.x manager to the agent. Then create the ``certs`` directory and install the file with the required ownership and permissions:

   .. code-block:: console

      # mkdir -p /var/ossec/etc/certs
      # install -m 640 -o root -g wazuh root-ca.pem /var/ossec/etc/certs/root-ca.pem

#. Upgrade the Wazuh agent package. On Debian-based systems, add ``--force-confold`` so that the upgrade doesn't stop at the configuration file prompt:

   .. code-block:: console

      # dpkg -i --force-confold wazuh-agent_<VERSION>_amd64.deb

   If an earlier ``dpkg -i`` run stopped at the configuration file prompt, complete it with the following command. Running ``dpkg -i`` again overwrites the agent key and configuration.

   .. code-block:: console

      # dpkg --configure --force-confold wazuh-agent

#. Verify that the agent log doesn't report ``TLS verification is DISABLED``:

   .. code-block:: console

      # grep "TLS verification" /var/ossec/logs/ossec.log

   If you already upgraded an agent without the root certificate, stop the agent and run ``/var/ossec/bin/wazuh-agent-auth --token-file <TOKEN_FILE> --certs-only``. Replace ``<TOKEN_FILE>`` with a file that contains an enrollment token generated on the Wazuh 5.x manager.

   .. note::

      Wazuh 4.x agents can connect to a Wazuh 5.x manager. However, File Integrity Monitoring (FIM), Security Configuration Assessment (SCA), System Inventory, Active Response, and Vulnerability Detection are not fully supported until the agents are upgraded to Wazuh 5.x. We recommend upgrading migrated agents to Wazuh 5.x to ensure full compatibility with Wazuh 5.x functionality.
