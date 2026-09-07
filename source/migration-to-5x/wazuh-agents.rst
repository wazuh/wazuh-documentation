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

Migrate agent registrations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps to migrate the Wazuh agent registrations from Wazuh 4.x to 5.x.

Wazuh 5.x manager
~~~~~~~~~~~~~~~~~~

#. Copy the ``/var/ossec/etc/client.keys`` file from the Wazuh 4.x manager to the Wazuh 5.x manager:

   .. code-block:: console

      # scp root@<WAZUH_4_MANAGER_IP>:/var/ossec/etc/client.keys /<WORKING_DIRECTORY>/client.keys

   Where

   -  ``<WAZUH_4_MANAGER_IP>``: IP address or hostname of the Wazuh 4.x manager from which you are migrating the agent registrations.
   -  ``<WORKING_DIRECTORY>``: Directory on the Wazuh 5.x manager where you temporarily store the copied ``client.keys`` file. Ensure that the directory is accessible only to authorized users because ``client.keys`` contains agent authentication keys.

#. Generate an API authentication token for the Wazuh 5.x manager. The token authorizes the API requests used to import the existing Wazuh agent registrations:

   .. code-block:: console

      # TOKEN=$(curl -sk -u <USERNAME>:<PASSWORD> \
        -X POST \
        "https://<WAZUH_MANAGER_IP>:55000/security/user/authenticate?raw=true")

   Replace

   -  ``<WAZUH_MANAGER_IP>`` with the IP address of the Wazuh 5.x manager.
   -  ``<USERNAME>:<PASSWORD>`` with the username and password of the Wazuh 5.x. manager API credentials.

   .. note::

      The default credentials for the Wazuh manager API are ``wazuh:wazuh``.

#. Run the script below to import the Wazuh agent registrations from the ``client.keys`` file:

   .. code-block:: console

      # while read -r id name ip key; do
          [ "${id#!}" = "$id" ] || continue
          curl -sk \
            -H "Authorization: Bearer $TOKEN" \
            -H "Content-Type: application/json" \
            -X POST \
            "https://<WAZUH_MANAGER_IP>:55000/agents/insert" \
            -d "{
              \"id\":\"$id\",
              \"name\":\"$name\",
              \"ip\":\"$ip\",
              \"key\":\"$key\"
            }"
          echo
        done < <WORKING_DIRECTORY>/client.keys

   Replace ``<WAZUH_MANAGER_IP>`` with the IP address of the Wazuh 5.x manager.

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      "data":{"id":"005","key":"MDA1IFdpbmRvd3MtMTIgYW55IDAwYmFhYjMwZmJlZTg0M2MxYWFhYTc2NzMwOWNhMWFkNmUwYTBmNDczYWM1ZDU4NWM5YzU2NWM3MjUwMWZkMTQ="},"error":0}
      {"data":{"id":"006","key":"MDA2IFdpbmRvd3MtMTMgYW55IDAwYmFhYjMwZmJlZTg0M2MxYWFhYTc2NzMwOWNhMWFkNmUw..."},"error":0}

   .. warning::

      If a Wazuh agent with the same ID already exists on the Wazuh 5.x manager, the import fails with an error indicating the Wazuh agent ID is already in use. Delete the existing agent registration before rerunning the import script.

   .. note::

      The API authentication token has a limited lifetime. For deployments with a large number of agents, import the registrations in batches and generate a new token before each batch to prevent token expiration during the migration.

Wazuh agent
~~~~~~~~~~~

#. Update the manager address in the Wazuh agent configuration so that the Wazuh agent connects to the Wazuh 5.x manager. Add the Wazuh manager IP address or fully qualified domain name (FQDN) to the ``<endpoint>`` setting in the ``<agent><manager>`` section.

   .. code-block:: xml

      <agent>
        <manager>
          <endpoint><WAZUH_MANAGER_IP></endpoint>
        </manager>
      </agent>

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

.. _migration_agent_groups:

Agent groups
-------------

You can migrate existing agent group configurations to Wazuh 5.x by restoring the group directories from the Wazuh 4.x manager. After migrating the agent registrations, assign the migrated agents to their corresponding groups in the Wazuh 5.x deployment.

In Wazuh 5.x, group configuration files still reside in the shared directory, but the manager installation path has changed from ``/var/ossec/etc`` to ``/var/wazuh-manager/etc``.

Migrate agent groups
^^^^^^^^^^^^^^^^^^^^^

Perform the following steps to recreate the Wazuh agent groups in the Wazuh 5.x deployment.

#. On the Wazuh 4.x manager, archive the group directories under ``shared/``, excluding the runtime-generated ``merged.mg`` files.

   .. code-block:: console

      # cd /var/ossec/etc
      # tar -cvzf /tmp/wazuh_groups_backup.tar.gz \
        --exclude='*/merged.mg' \
        shared/*/

#. After you install the Wazuh 5.x manager, restore the backup to the new installation.

   .. code-block:: console

      # tar -xvzf /tmp/wazuh_groups_backup.tar.gz \
        -C /var/wazuh-manager/etc/
      # chown -R wazuh-manager:wazuh-manager \
        /var/wazuh-manager/etc/shared/

   .. note::

      Review the restored ``agent.conf`` files and :ref:`remove <migration_unsupported_configuration_sections>` or update any settings that Wazuh 5.x no longer supports before you restart the Wazuh manager.

#. Restart the Wazuh manager service to load the restored group configuration:

   .. code-block:: console

      # systemctl restart wazuh-manager

#. Assign each migrated Wazuh agent to its corresponding group in the Wazuh 5.x manager. For more information refer to the :ref:`Wazuh agent administration <assigning_agents_to_a_group>` documentation.

   .. note::

      Wazuh 4.x agents can connect to a Wazuh 5.x manager. However, File Integrity Monitoring (FIM), Security Configuration Assessment (SCA), System Inventory, Active Response, and Vulnerability Detection are not fully supported until the agents are upgraded to Wazuh 5.x. We recommend upgrading migrated agents to Wazuh 5.x to ensure full compatibility with Wazuh 5.x functionality.
