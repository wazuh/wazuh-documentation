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

The Wazuh manager 4.x stores agent registrations in the ``/var/ossec/etc/client.keys`` file and the Wazuh manager database. To preserve existing Wazuh agent identities during the migration, migrate the agent registrations to the Wazuh 5.x manager before reconnecting the agents. You can migrate them with the ``wazuh-migrate-identity.py`` migration tool or manually. Use the manual procedure to keep the registration dates and the exact group memberships.

.. _migration_migrate_agent_registrations_tool:

Migrate agent registrations with the migration tool
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The ``wazuh-migrate-identity.py`` tool migrates agent registrations and keys, custom agent groups and their ``agent.conf`` files, and, optionally, the enrollment password and the Wazuh manager API users, roles, and policies. It recreates them through the Wazuh 5.x manager API and verifies the result.

The tool doesn't keep the agent registration dates. The registration date of each migrated agent is the time of the import. The tool also adds every migrated agent to the ``default`` group, and doesn't migrate files in a group folder other than ``agent.conf``. To keep registration dates and the exact group memberships, migrate the agent registrations manually instead.

Run every command as ``root``. Don't enroll any agent on the Wazuh 5.x manager before the import, and don't point the Wazuh 4.x agents to the Wazuh 5.x manager until the import is complete.

The tool isn't installed with the Wazuh manager. You download it from the Wazuh source repository in the steps below. It has three commands, each taking the bundle directory as its argument: ``export`` runs on the stopped Wazuh 4.x manager, and ``import`` and ``check`` run on the running Wazuh 5.x manager. Its options are:

+-------------------------------+------------------------+----------------------------------------------------------------------------------------+
| Option                        | Commands               | Description                                                                            |
+===============================+========================+========================================================================================+
| ``--source-dir <DIR>``        | ``export``             | Wazuh 4.x installation directory. The default is ``/var/ossec``.                       |
+-------------------------------+------------------------+----------------------------------------------------------------------------------------+
| ``--with-password``           | ``export``, ``import`` | Includes the enrollment password, ``authd.pass``.                                      |
+-------------------------------+------------------------+----------------------------------------------------------------------------------------+
| ``--with-rbac``               | ``export``, ``import`` | Includes the Wazuh manager API users, roles, and policies.                             |
+-------------------------------+------------------------+----------------------------------------------------------------------------------------+
| ``--dry-run``                 | ``export``, ``import`` | Reports what would happen and changes nothing.                                         |
+-------------------------------+------------------------+----------------------------------------------------------------------------------------+
| ``--force``                   | ``export``, ``import`` | Continues past the safety checks.                                                      |
+-------------------------------+------------------------+----------------------------------------------------------------------------------------+
| ``--target-dir <DIR>``        | ``import``, ``check``  | Wazuh 5.x installation directory. The default is ``/var/wazuh-manager``.               |
+-------------------------------+------------------------+----------------------------------------------------------------------------------------+
| ``--target-conf-dir <DIR>``   | ``import``, ``check``  | Wazuh 5.x configuration directory. The default is ``/etc/wazuh-manager``.              |
+-------------------------------+------------------------+----------------------------------------------------------------------------------------+
| ``--api-url <URL>``           | ``import``, ``check``  | Wazuh manager API URL. The default is ``https://localhost:55000``.                     |
+-------------------------------+------------------------+----------------------------------------------------------------------------------------+
| ``--api-user <USER>``         | ``import``, ``check``  | Wazuh manager API user. The default is ``wazuh``.                                      |
+-------------------------------+------------------------+----------------------------------------------------------------------------------------+
| ``--api-password-file <FILE>``| ``import``, ``check``  | File with the API password, or ``-`` for the standard input. Without it, the tool      |
|                               |                        | reads the ``WAZUH_API_PASSWORD`` environment variable.                                 |
+-------------------------------+------------------------+----------------------------------------------------------------------------------------+
| ``--api-ca <FILE>``           | ``import``, ``check``  | CA certificate that verifies the Wazuh manager API. Required when ``--api-url`` isn't  |
|                               |                        | a loopback address. On loopback, the default is                                        |
|                               |                        | ``/etc/wazuh-manager/certs/root-ca.pem``.                                              |
+-------------------------------+------------------------+----------------------------------------------------------------------------------------+

Wazuh 4.x manager
~~~~~~~~~~~~~~~~~

#. Download the ``wazuh-migrate-identity.py`` tool:

   .. code-block:: console

      # curl -fsSLO https://raw.githubusercontent.com/wazuh/wazuh/5.0.0/tools/migration/wazuh-migrate-identity.py
      # chmod +x wazuh-migrate-identity.py

#. Stop the Wazuh 4.x manager. The tool doesn't export the data while the Wazuh manager is running:

   .. code-block:: console

      # systemctl stop wazuh-manager

#. Preview the export. Add ``--with-password`` to migrate the enrollment password, and ``--with-rbac`` to migrate the Wazuh manager API users, roles, and policies:

   .. code-block:: console

      # ./wazuh-migrate-identity.py export --with-password --with-rbac --dry-run /root/wazuh-4x-bundle

   The command output looks similar to this:

   .. code-block:: none
      :class: output

        agents   3
        groups   2 (dbservers, webservers)

      DRY RUN: nothing was written.
      WARNING: group 'webservers' holds files other than agent.conf (blocked-ips). They are recorded but not migrated: 5.0 compiles whatever is in a group folder and pushes it to its agents, and a 4.x list or rootcheck file has no meaning there.

   Review any warning about files in a group folder other than ``agent.conf``. The tool doesn't migrate them. Recreate the files you need on the Wazuh 5.x manager.

   .. warning::

      The ``--with-rbac`` option replaces the Wazuh 5.x manager API users, roles, and policies with the Wazuh 4.x ones, including the passwords of the ``wazuh`` and ``wazuh-internal-client`` users. Use it only to keep custom Wazuh manager API users, roles, or policies. If you use it, reset both passwords to the values in ``/etc/wazuh-manager/export/credentials.env`` after the import, as described in the Wazuh 5.x manager steps. Otherwise, the Wazuh dashboard can't connect to the Wazuh manager API.

#. Export the Wazuh agent registrations:

   .. code-block:: console

      # ./wazuh-migrate-identity.py export --with-password --with-rbac /root/wazuh-4x-bundle

#. Start the Wazuh 4.x manager:

   .. code-block:: console

      # systemctl start wazuh-manager

#. Copy the ``/root/wazuh-4x-bundle/`` directory to the same path on the Wazuh 5.x manager using a secure method, such as ``scp``. The bundle contains agent keys and password hashes, and only ``root`` can read it. Run the copy as ``root`` or with ``sudo``.

Wazuh 5.x manager
~~~~~~~~~~~~~~~~~

Perform the following steps with the Wazuh 5.x manager running.

#. Download the ``wazuh-migrate-identity.py`` tool:

   .. code-block:: console

      # curl -fsSLO https://raw.githubusercontent.com/wazuh/wazuh/5.0.0/tools/migration/wazuh-migrate-identity.py
      # chmod +x wazuh-migrate-identity.py

#. Preview the import. Use the same options as for the export:

   .. code-block:: console

      # ./wazuh-migrate-identity.py import --with-password --with-rbac --dry-run /root/wazuh-4x-bundle

#. Import the agent registrations:

   .. code-block:: console

      # ./wazuh-migrate-identity.py import --with-password --with-rbac /root/wazuh-4x-bundle

#. If you used ``--with-rbac``, restart the Wazuh manager to apply the migrated Wazuh manager API users. After the restart, the ``wazuh`` and ``wazuh-internal-client`` users have their Wazuh 4.x passwords. The ``wazuh-internal-client`` user is the Wazuh 4.x ``wazuh-wui`` user, renamed. Set both users back to the passwords in ``/etc/wazuh-manager/export/credentials.env``. Otherwise, the Wazuh dashboard can't connect to the Wazuh manager API:

   .. code-block:: console

      # systemctl restart wazuh-manager
      # C=/etc/wazuh-manager/export/credentials.env
      # API=$(grep '^WAZUH_MANAGER_API_PASSWORD=' $C | cut -d= -f2-)
      # WUI=$(grep '^WAZUH_MANAGER_WUI_PASSWORD=' $C | cut -d= -f2-)
      # printf '{"wazuh": "%s", "wazuh-internal-client": "%s"}' "$API" "$WUI" | /var/wazuh-manager/bin/rbac_control change-password --passwords-file -

#. Verify the migration. The output shows ``The target matches the bundle.`` when every agent and group is present:

   .. code-block:: console

      # ./wazuh-migrate-identity.py check /root/wazuh-4x-bundle

   The command output looks similar to this:

   .. code-block:: none
      :class: output

        api      password taken from /etc/wazuh-manager/export/credentials.env (WAZUH_MANAGER_API_PASSWORD)
      agents    3 of 3 present
      groups    2 of 2 present
      rbac.db   schema version 1

      The target matches the bundle.

   The Wazuh agents appear as ``never_connected`` until they reconnect to the Wazuh 5.x manager. Continue with :ref:`Reconnect the Wazuh agents <migration_reconnect_wazuh_agents>`. After you validate the migration, delete the ``/root/wazuh-4x-bundle/`` directory from both Wazuh managers.

.. _migration_migrate_agent_registrations:

Migrate agent registrations manually
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps to migrate the Wazuh agent registrations from Wazuh 4.x to 5.x. Do this before you enroll any agent on the Wazuh 5.x manager. These steps replace the Wazuh 5.x ``client.keys`` file and any agent already registered with the same ID.

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

   If the Wazuh 4.x manager requires an enrollment password, also back up the password file. Wazuh 4.x agents that enroll again, for example after you rebuild an endpoint, use this password:

   .. code-block:: console

      # cp /var/ossec/etc/authd.pass /root/wazuh-4x-backup/

#. Start the Wazuh 4.x manager:

   .. code-block:: console

      # systemctl start wazuh-manager

#. Copy the ``/root/wazuh-4x-backup/`` directory to the same path on the Wazuh 5.x manager using a secure method, such as ``scp``. The backup files are readable only by ``root``. Run the copy as ``root`` or with ``sudo``.

Wazuh 5.x manager
~~~~~~~~~~~~~~~~~

#. Stop the Wazuh 5.x manager:

   .. code-block:: console

      # systemctl stop wazuh-manager

#. Restore the agent keys with the ownership and permissions that Wazuh 5.x requires:

   .. code-block:: console

      # install -m 660 -o wazuh-manager -g wazuh-manager /root/wazuh-4x-backup/client.keys /etc/wazuh-manager/client.keys

#. Copy the agent registrations and group memberships from the Wazuh 4.x database into the Wazuh 5.x database. Wazuh 5.x uses a different database schema, so you can't replace the database file:

   .. note::

      The command requires the ``sqlite3`` tool. If it isn't installed, install it: ``dnf install -y sqlite`` on RPM-based systems, or ``apt-get install -y sqlite3`` on Debian-based systems.

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

#. Restore the custom agent groups:

   .. code-block:: console

      # tar -xzf /root/wazuh-4x-backup/groups.tar.gz -C /etc/wazuh-manager/
      # chown -R wazuh-manager:wazuh-manager /etc/wazuh-manager/shared/

   Review the restored ``agent.conf`` files and update or remove any settings that Wazuh 5.x doesn't support.

   If you backed up the enrollment password, restore it. Otherwise, the Wazuh 5.x manager generates a new password, and Wazuh 4.x agents that enroll again with the old one fail:

   .. code-block:: console

      # install -m 640 -o wazuh-manager -g wazuh-manager /root/wazuh-4x-backup/authd.pass /etc/wazuh-manager/authd.pass

#. Start the Wazuh 5.x manager:

   .. code-block:: console

      # systemctl start wazuh-manager

#. Verify that the agents keep their Wazuh 4.x IDs, groups, and registration dates:

   .. code-block:: console

      # TOKEN=$(curl -sk -u wazuh:<PASSWORD> -X POST "https://localhost:55000/security/user/authenticate?raw=true")
      # curl -sk "https://localhost:55000/agents?select=id,name,group,dateAdd" -H "Authorization: Bearer $TOKEN"

   Replace ``<PASSWORD>`` with the ``WAZUH_MANAGER_API_PASSWORD`` value from ``/etc/wazuh-manager/export/credentials.env``.

   To print only the value, run ``grep '^WAZUH_MANAGER_API_PASSWORD=' /etc/wazuh-manager/export/credentials.env | cut -d= -f2-`` on the Wazuh 5.x manager.

   The agents appear as ``disconnected`` until they reconnect to the Wazuh 5.x manager.

   After you reconnect the agents and validate the migration, delete the ``/root/wazuh-4x-backup/`` directory from both Wazuh managers. It contains the agent keys.

.. _migration_reconnect_wazuh_agents:

Reconnect the Wazuh agents
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on each Wazuh agent after you migrate the agent registrations with the migration tool or manually.

#. Update the manager address in the Wazuh agent configuration (``ossec.conf``) so that the Wazuh agent connects to the Wazuh 5.x manager. Add the Wazuh manager IP address or fully qualified domain name (FQDN) to the ``<address>`` setting in the ``<client><server>`` section.

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh 5.x agents verify the Wazuh manager certificate. A package upgrade doesn't install the Wazuh manager root certificate on the agent, so the upgraded agent connects with TLS verification disabled. Perform the following steps on each Linux agent that you upgrade with a package.

A Wazuh 5.x agent connects to one Wazuh manager address only. If the ``<client>`` block of a Wazuh 4.x agent lists several ``<server>`` addresses for failover, the upgraded agent connects only to the last one. Before the upgrade, keep one ``<server>`` address: a load balancer in front of the Wazuh manager nodes, or the node that the agent must use.

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

   If you already upgraded an agent without the root certificate, stop the agent and run ``/var/ossec/bin/wazuh-agent-auth --token-file <TOKEN_FILE> --certs-only``. Replace ``<TOKEN_FILE>`` with a file that contains an enrollment token generated on the Wazuh 5.x manager. You can create the token in **Agents management** > **Enrollment tokens** > **Create token**.

   .. note::

      Wazuh 4.x agents can connect to a Wazuh 5.x manager. However, File Integrity Monitoring (FIM), Security Configuration Assessment (SCA), System Inventory, Active Response, and Vulnerability Detection are not fully supported until the agents are upgraded to Wazuh 5.x. We recommend upgrading migrated agents to Wazuh 5.x to ensure full compatibility with Wazuh 5.x functionality.

      A new Wazuh 4.x agent enrolls on port ``1515`` with the enrollment password of the Wazuh 5.x manager. Otherwise, the agent logs ``Invalid password. Unable to add agent (from manager)`` and stays pending. Read the password from ``/etc/wazuh-manager/authd.pass`` on the Wazuh 5.x manager. Then set it in the ``WAZUH_REGISTRATION_PASSWORD`` variable when you install the agent.
