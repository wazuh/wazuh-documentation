.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Migrate Wazuh agent registrations and agent groups from an existing Wazuh 4.x deployment to Wazuh 5.x.

Wazuh agents
============

The Wazuh agent identifies itself to the Wazuh manager using a unique agent ID and authentication key. When transitioning from Wazuh 4.x to Wazuh 5.x, you can migrate the existing agent registrations to the Wazuh 5.x manager, restore the required agent groups, reconnect the agents to the new deployment, and upgrade them to Wazuh 5.x. You run the export on the Wazuh 4.x manager, the import on the master node of the Wazuh 5.x manager, and the reconnection and upgrade steps on each Wazuh agent. For Docker or Kubernetes deployments, see :doc:`Docker and Kubernetes deployments <docker-kubernetes-deployments>`.

You can migrate the following Wazuh agent components:

-  Agent registrations
-  Agent groups

.. _migration_agent_registration:

Agent registration
------------------

The Wazuh manager 4.x stores agent registrations in the ``/var/ossec/etc/client.keys`` file and the Wazuh manager database. To preserve existing Wazuh agent identities during the transition, migrate the agent registrations to the Wazuh 5.x manager before reconnecting the agents. You can migrate them with the ``wazuh-migrate-identity.py`` migration tool or manually. Use the manual procedure to keep the registration dates.

The following table compares the two methods:

+----------------------------------------------+----------------------------------------+-------------------------------------+
| **Data**                                     | **Migration tool**                     | **Manual procedure**                |
+==============================================+========================================+=====================================+
| Agent IDs and keys                           | Kept                                   | Kept                                |
+----------------------------------------------+----------------------------------------+-------------------------------------+
| Group memberships                            | Kept                                   | Kept                                |
+----------------------------------------------+----------------------------------------+-------------------------------------+
| Registration dates                           | Set to the time of import              | Kept                                |
+----------------------------------------------+----------------------------------------+-------------------------------------+
| ``agent.conf`` of custom groups              | Migrated                               | Migrated                            |
+----------------------------------------------+----------------------------------------+-------------------------------------+
| Other files in group folders                 | Not migrated                           | Migrated                            |
+----------------------------------------------+----------------------------------------+-------------------------------------+
| Customized default ``agent.conf``            | Merge by hand                          | Merge by hand                       |
+----------------------------------------------+----------------------------------------+-------------------------------------+
| Enrollment password                          | Optional, with ``--with-password``     | Optional, by copying ``authd.pass`` |
+----------------------------------------------+----------------------------------------+-------------------------------------+
| Wazuh manager API users, roles, and policies | Optional, with ``--with-rbac``         | Not migrated                        |
+----------------------------------------------+----------------------------------------+-------------------------------------+

.. _migration_migrate_agent_registrations_tool:

Migrate agent registrations with the migration tool
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The ``wazuh-migrate-identity.py`` tool migrates agent registrations and keys, custom agent groups and their ``agent.conf`` files, and, optionally, the enrollment password and the Wazuh manager API users, roles, and policies. It recreates them through the Wazuh 5.x manager API and verifies the result.

Limitations
~~~~~~~~~~~

-  Registration dates: The tool sets each migrated agent's registration date to the time of import. To preserve the original dates, migrate agent registrations manually.
-  Group files: The tool migrates only ``agent.conf`` files from group folders. It doesn't migrate other files, such as SCA policies, which Wazuh 5.x agents still run. Copy the files that you need from ``/var/ossec/etc/shared/<GROUP>/`` on the Wazuh 4.x manager to ``/etc/wazuh-manager/shared/<GROUP>/`` on the Wazuh 5.x manager, owned by ``wazuh-manager``.
-  Customized default configuration: The tool doesn't migrate a customized ``shared/default/agent.conf``. Manually merge its settings into the Wazuh 5.x default group.
-  Unsupported options: After import, review each migrated group folder and remove any ``agent.conf`` options that Wazuh 5.x doesn't support, such as ``<labels>``, ``<scan_on_start>``, and ``<check_files>``.

Prerequisites
~~~~~~~~~~~~~

-  Run every command as root. Complete the import before any agent enrolls on or connects to the Wazuh 5.x manager, as described in :ref:`Prerequisites <migration_prerequisites>`.
-  The ``wazuh-migrate-identity.py`` tool supports exports from Wazuh 4.13.0 or later. For an older Wazuh 4.x manager, add ``--force`` to the export command and run the check command after import.
-  The Wazuh 5.x manager requires an enrollment password of at least 16 bytes. If the Wazuh 4.x password is shorter, either set a longer password on the Wazuh 4.x manager and its agents before exporting, or omit ``--with-password``.

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

   .. warning::

      The ``--with-rbac`` option replaces the Wazuh 5.x manager API users, roles, and policies with the Wazuh 4.x ones, including the passwords of the ``wazuh`` and ``wazuh-internal-client`` users. Use it only to keep custom Wazuh manager API users, roles, or policies. If you use it, reset both passwords to the values in ``/etc/wazuh-manager/export/credentials.env`` after the import, as described in the Wazuh 5.x manager steps. Otherwise, the Wazuh dashboard can't connect to the Wazuh manager API.

#. Export the Wazuh agent registrations:

   .. code-block:: console

      # ./wazuh-migrate-identity.py export --with-password --with-rbac /root/wazuh-4x-bundle

#. Start the Wazuh 4.x manager:

   .. code-block:: console

      # systemctl start wazuh-manager

#. Copy the ``/root/wazuh-4x-bundle/`` directory to the same path on the Wazuh 5.x manager using a secure method, such as ``scp``. The bundle contains agent keys and password hashes, and only ``root`` can read it. Run the copy as ``root`` or with ``sudo``. If root can't log in over SSH, copy the directory with another user. Then move it to ``/root/`` on the Wazuh 5.x manager with sudo, and keep it readable only by root.

Wazuh 5.x manager
~~~~~~~~~~~~~~~~~

Perform the following steps on the master node in the Wazuh manager cluster. The master node synchronizes the agent registrations and groups to the worker nodes.

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

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      Next: open the manager to the fleet, then run this tool's 'check'.

   Opening the manager to the fleet means letting the Wazuh agents connect, as described in :ref:`Reconnect the Wazuh agents <migration_reconnect_wazuh_agents>`. You can run the check before that.

#. If you used ``--with-rbac``, restart the Wazuh manager to apply the migrated Wazuh manager API users. After the restart, the ``wazuh`` and ``wazuh-internal-client`` users have their Wazuh 4.x passwords. The ``wazuh-internal-client`` user is the Wazuh 4.x ``wazuh-wui`` user, renamed. Set both users back to the passwords in ``/etc/wazuh-manager/export/credentials.env``. Otherwise, the Wazuh dashboard can't connect to the Wazuh manager API:

   .. code-block:: console

      # systemctl restart wazuh-manager
      # C=/etc/wazuh-manager/export/credentials.env
      # API=$(grep '^WAZUH_MANAGER_API_PASSWORD=' $C | cut -d= -f2-)
      # WUI=$(grep '^WAZUH_MANAGER_WUI_PASSWORD=' $C | cut -d= -f2-)
      # printf '{"wazuh": "%s", "wazuh-internal-client": "%s"}' "$API" "$WUI" | /var/wazuh-manager/bin/rbac_control change-password --passwords-file -

#. Verify the migration. The check compares the registrations on the Wazuh 5.x manager with the bundle, not the agent connections. When every agent and group is present, the output includes the line ``The target matches the bundle.`` Run the following command:

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps to migrate the Wazuh agent registrations from Wazuh 4.x to Wazuh 5.x. These steps replace the Wazuh 5.x ``client.keys`` file and any agent already registered with the same ID. Run them before any agent enrolls on the Wazuh 5.x manager.

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

   .. warning::

      The Wazuh 5.x manager doesn't start with an enrollment password shorter than 16 bytes. If the Wazuh 4.x password is shorter, set a longer one on the Wazuh 4.x manager and on the agents that enroll with it, or don't migrate it.

   .. code-block:: console

      # cp /var/ossec/etc/authd.pass /root/wazuh-4x-backup/

#. Start the Wazuh 4.x manager:

   .. code-block:: console

      # systemctl start wazuh-manager

#. Copy the ``/root/wazuh-4x-backup/`` directory to the same path on the Wazuh 5.x manager using a secure method, such as ``scp``. The backup files are readable only by ``root``. Run the copy as ``root`` or with ``sudo``. If root can't log in over SSH, copy the directory with another user. Then move it to ``/root/`` on the Wazuh 5.x manager with sudo, and keep it readable only by root.

Wazuh 5.x manager
~~~~~~~~~~~~~~~~~

#. Stop the Wazuh 5.x manager:

   .. code-block:: console

      # systemctl stop wazuh-manager

#. Restore the agent keys with the ownership and permissions that Wazuh 5.x requires:

   .. code-block:: console

      # install -m 660 -o wazuh-manager -g wazuh-manager /root/wazuh-4x-backup/client.keys /etc/wazuh-manager/client.keys

#. Copy the agent registrations and group memberships from the Wazuh 4.x database into the Wazuh 5.x database. Because Wazuh 5.x uses a different database schema, copy the records instead of replacing the database file:

   .. note::

      The command requires the ``sqlite3`` tool. If it isn't installed, install it: ``dnf install -y sqlite`` on RPM-based systems, or ``apt-get install -y sqlite3`` on Debian-based systems.

   .. code-block:: console

      # sqlite3 /var/wazuh-manager/queue/db/global.db <<'SQL'
      .bail on
      ATTACH '/root/wazuh-4x-backup/global.db' AS old;
      BEGIN;
      INSERT OR REPLACE INTO agent
        (id, name, ip, register_ip, internal_key, os_name, os_version, os_major, os_minor, os_type, os_platform, os_arch,
         version, date_add, last_keepalive, `group`, sync_status, connection_status,
         disconnection_time, status_code)
      SELECT id, name, ip, register_ip, internal_key, os_name, os_version, os_major, os_minor,
             CASE WHEN lower(os_platform) = 'windows' THEN 'windows'
                  WHEN lower(os_platform) = 'darwin' THEN 'macos'
                  WHEN os_platform IS NULL THEN NULL ELSE 'linux' END,
             os_platform, os_arch, version, date_add, last_keepalive, `group`, sync_status,
             'disconnected', 0, 0
      FROM old.agent WHERE id > 0;
      INSERT OR IGNORE INTO `group` (name) SELECT name FROM old.`group`;
      INSERT OR REPLACE INTO belongs (id_agent, id_group, priority)
      SELECT b.id_agent, g5.id, b.priority
      FROM old.belongs b JOIN old.`group` g4 ON g4.id = b.id_group JOIN `group` g5 ON g5.name = g4.name
      WHERE b.id_agent > 0;
      COMMIT;
      SQL
      # chown wazuh-manager:wazuh-manager /var/wazuh-manager/queue/db/global.db

#. Restore the custom agent groups:

   .. code-block:: console

      # tar -xzf /root/wazuh-4x-backup/groups.tar.gz -C /etc/wazuh-manager/
      # chown -R wazuh-manager:wazuh-manager /etc/wazuh-manager/shared/

   Review the restored ``agent.conf`` files and update or remove any settings that Wazuh 5.x doesn't support. For example, Wazuh 5.x agents ignore ``<labels>``, ``<scan_on_start>``, and ``<check_files>``. Also review the other files in each group folder.

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

   Replace ``<PASSWORD>`` with the ``WAZUH_MANAGER_API_PASSWORD`` value from ``/etc/wazuh-manager/export/credentials.env``. To print only the value, run ``grep '^WAZUH_MANAGER_API_PASSWORD=' /etc/wazuh-manager/export/credentials.env | cut -d= -f2-`` on the Wazuh 5.x manager.

   The agents appear as ``disconnected`` until they reconnect to the Wazuh 5.x manager.

   After you reconnect the agents and validate the migration, delete the ``/root/wazuh-4x-backup/`` directory from both Wazuh managers. It contains the agent keys.

.. _migration_reconnect_wazuh_agents:

Reconnect the Wazuh agents
^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps on each Wazuh agent after you migrate the agent registrations with the migration tool or manually. If the Wazuh agents connect to the Wazuh 4.x manager through a DNS name, you can point that name to the Wazuh 5.x manager instead of editing each agent. Make sure that the name is in the :ref:`certificate of the Wazuh 5.x manager <certificates_creation>`.

#. Update the manager address in the Wazuh agent configuration (``ossec.conf``) so that the Wazuh agent connects to the Wazuh 5.x manager. Add the Wazuh manager IP address or fully qualified domain name (FQDN) to the ``<address>`` setting in the ``<client><server>`` section.

   .. code-block:: xml
      :emphasize-lines: 3

      <client>
        <server>
          <address><WAZUH_MANAGER_IP></address>
        </server>
      </client>

   Replace ``<WAZUH_MANAGER_IP>`` with the IP address or FQDN of the Wazuh 5.x manager.

#. Restart the Wazuh agent for the changes to take effect.

   -  **Linux**

      .. code-block:: console

         # systemctl restart wazuh-agent

   -  **macOS**

      .. code-block:: console

         # /Library/Ossec/bin/wazuh-control restart

   -  **Windows** (PowerShell as Administrator)

      .. code-block:: ps1con

         > Restart-Service -Name WazuhSvc

   .. note::

      Upgrade the Wazuh agents to Wazuh 5.x to complete the transition. The migrated Wazuh 4.x agents send only log events and findings, without FIM, SCA, system inventory, or vulnerability detection data. They also don't run rootkit checks, because the Wazuh 5.x default group doesn't include the ``rootkit_files.txt`` and ``rootkit_trojans.txt`` files. To keep these checks until you upgrade the agents, copy the ``.txt`` files of ``/var/ossec/etc/shared/default/`` on the Wazuh 4.x manager to ``/etc/wazuh-manager/shared/default/`` on the Wazuh 5.x manager, owned by ``wazuh-manager``. Remove them after every agent runs Wazuh 5.x.

      A new Wazuh 4.x agent enrolls on port 1515 with the enrollment password of the Wazuh 5.x manager. Otherwise, the agent logs Invalid password. Unable to add an agent (from manager) and stays pending. Read the password from ``/etc/wazuh-manager/authd.pass`` on the Wazuh 5.x manager. Then set it in the ``WAZUH_REGISTRATION_PASSWORD`` variable when you install the agent.

.. _migration_upgrade_migrated_wazuh_agents:

Upgrade the migrated Wazuh agents
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can upgrade the Wazuh agents remotely, as described in :doc:`Upgrading the Wazuh agent </user-manual/agent/agent-management/remote-upgrading/upgrading-agent>`. Before you upgrade them, make sure that:

-  Each Wazuh agent runs Wazuh 4.14.0 or later. Upgrade older agents to the latest Wazuh 4.14 version first.
-  Each Wazuh agent reaches the Wazuh 5.x manager on port 1517/TCP. Otherwise, the agent doesn't install the upgrade. To check the connection, run ``nc -zv <WAZUH_MANAGER_IP> 1517`` on Linux and macOS agents, or ``Test-NetConnection -ComputerName <WAZUH_MANAGER_IP> -Port 1517`` in PowerShell on Windows agents. Keep port 1514 open until every agent runs Wazuh 5.x.
-  The certificate of every Wazuh manager node contains the address that the Wazuh agents connect to. To add an address, see :ref:`Certificate creation <certificates_creation>`.
-  ``<verification_mode>`` in the ``<remote><https>`` section of ``wazuh-manager.conf`` is ``none`` or not set. Otherwise, the Wazuh manager rejects the upgrade.
-  Linux agents have the ``openssl`` command. Otherwise, the upgraded agent runs with TLS verification disabled.

The upgrade keeps the Wazuh 4.x ``ossec.conf`` file of each Wazuh agent. The Wazuh agent ignores the settings that Wazuh 5.x doesn't support and logs a message for each one every time it reads its configuration. Update or remove the following settings in ``ossec.conf`` on each upgraded Wazuh agent. Except for ``<labels>``, the Wazuh 4.x default configuration contains all of them.

-  ``<client>``: rename the block to ``<agent>``, replace its ``<server>`` subsection with ``<manager><endpoint>``, and remove ``<time-reconnect>`` and ``<crypto_method>``, as in the example below. From a ``<client>`` block, the Wazuh agent reads only the Wazuh manager address and the ``<enrollment>`` subsection.
-  ``<client_buffer>``: Wazuh 5.x configures event batching in ``<agent><batch>``.
-  ``<labels>``: Wazuh 5.x doesn't support agent labels. Also remove ``<labels>`` from the ``agent.conf`` file of every group.
-  ``<scan_on_start>`` in ``<syscheck>``, and ``<max_eps>`` and ``<max_interval>`` in ``<syscheck><synchronization>``.
-  ``<max_eps>`` in the ``<synchronization>`` section of ``<wodle name="syscollector">``.
-  ``<check_files>``, ``<check_trojans>``, ``<rootkit_files>``, and ``<rootkit_trojans>`` in ``<rootcheck>``.
-  ``<skip_nfs>`` in ``<sca>``.
-  The ``<wodle name="cis-cat">`` and ``<wodle name="osquery">`` blocks. Wazuh 5.x doesn't include these modules. Use SCA instead of CIS-CAT, and system inventory instead of Osquery.

For example, change the following ``<client>`` block of a Wazuh 4.x agent:

.. code-block:: xml
   :emphasize-lines: 3

   <client>
     <server>
       <address><WAZUH_MANAGER_IP></address>
       <port>1514</port>
       <protocol>tcp</protocol>
     </server>
     <config-profile>ubuntu, ubuntu24, ubuntu24.04</config-profile>
     <notify_time>20</notify_time>
     <time-reconnect>60</time-reconnect>
     <auto_restart>yes</auto_restart>
     <crypto_method>aes</crypto_method>
   </client>

To the following ``<agent>`` block:

.. code-block:: xml
   :emphasize-lines: 3

   <agent>
     <manager>
       <endpoint><WAZUH_MANAGER_IP>:1517</endpoint>
     </manager>
     <config-profile>ubuntu, ubuntu24, ubuntu24.04</config-profile>
     <notify_time>20</notify_time>
     <auto_restart>yes</auto_restart>
   </agent>

Replace ``<WAZUH_MANAGER_IP>`` with the IP address or FQDN of the Wazuh 5.x manager. Then restart the Wazuh agent for the changes to take effect.

After the upgrade, navigate to **Agents management** > **Summary** and verify that every Wazuh agent is active and that none is marked **Outdated**. Then check that the migrated dashboards show data. To monitor the Wazuh manager hosts, install a Wazuh agent on every Wazuh manager node, as described in the :doc:`Wazuh agent installation guide </installation-guide/wazuh-agent/index>`.

.. note::

   Back up ``/etc/wazuh-manager/ca/`` on the Wazuh 5.x manager. The upgraded Wazuh agents trust only this CA. If you reinstall the Wazuh 5.x manager, restore this directory before the installation. Otherwise, the Wazuh agents can't reconnect.
