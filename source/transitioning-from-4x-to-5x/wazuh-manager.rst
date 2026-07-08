.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Recreate the supported Wazuh manager configuration and agent groups when transitioning from Wazuh 4.x to Wazuh 5.x.

Wazuh manager
=============

The Wazuh manager in Wazuh 5.x changes its configuration, installation layout, and manager-side capabilities. You can recreate many settings from Wazuh 4.x, but Wazuh 5.x removes, relocates, or replaces several configuration sections, options, and features.

Deploy a new Wazuh manager and recreate the supported configuration from the Wazuh 4.x deployment. Do not copy Wazuh 4.x configuration files directly into the new installation, because they contain settings that Wazuh 5.x no longer supports.

You can recreate the following Wazuh manager components in Wazuh 5.x:

-  Wazuh manager configuration
-  Internal configuration options
-  Wazuh manager API configuration
-  Cluster configuration
-  Agent groups

You cannot recreate custom rules, decoders, and lists by copying files into the Wazuh manager installation. In Wazuh 5.x, the Wazuh content management system manages these assets.

Wazuh manager configuration
---------------------------

The Wazuh manager configuration defines how the manager operates, including agent communication, authentication, vulnerability detection, indexer connectivity, clustering, and other manager services.

Review the existing Wazuh 4.x configuration and recreate the supported settings manually in the Wazuh 5.x files.

.. note::

   Do not copy configuration files directly from a Wazuh 4.x deployment, because Wazuh 5.x removes, relocates, or replaces several configuration options and manager-side capabilities.

The primary Wazuh manager configuration file has changed between Wazuh 4.x and Wazuh 5.x.

+-------------------------------+-----------------------------------------------+
| Wazuh 4.x                     | Wazuh 5.x                                     |
+===============================+===============================================+
| ``/var/ossec/etc/ossec.conf`` | ``/var/wazuh-manager/etc/wazuh-manager.conf`` |
+-------------------------------+-----------------------------------------------+

Configuration changes
---------------------

Review the following changes before you recreate the Wazuh manager configuration.

**Unsupported configuration options**

Wazuh 5.x no longer supports the following configuration options. Do not include them in ``wazuh-manager.conf``.

+--------------------------+---------+
| Option                   | Notes   |
+==========================+=========+
| ``<jsonout_output>``     | Removed |
+--------------------------+---------+
| ``<alerts_log>``         | Removed |
+--------------------------+---------+
| ``<logall>``             | Removed |
+--------------------------+---------+
| ``<logall_json>``        | Removed |
+--------------------------+---------+
| ``<email_notification>`` | Removed |
+--------------------------+---------+
| ``<smtp_server>``        | Removed |
+--------------------------+---------+
| ``<email_from>``         | Removed |
+--------------------------+---------+
| ``<email_to>``           | Removed |
+--------------------------+---------+
| ``<email_maxperhour>``   | Removed |
+--------------------------+---------+
| ``<email_log_source>``   | Removed |
+--------------------------+---------+
| ``<update_check>``       | Removed |
+--------------------------+---------+

**Unsupported configuration sections**

Wazuh 5.x removes or relocates the following Wazuh manager configuration sections.

+---------------------------------+-----------------------------------------------------+
| Configuration section           | Notes                                               |
+=================================+=====================================================+
| ``<alerts>``                    | Removed                                             |
+---------------------------------+-----------------------------------------------------+
| ``<command>``                   | Command handling changed in Wazuh 5.x               |
+---------------------------------+-----------------------------------------------------+
| ``<ruleset>``                   | Ruleset management moved to the Wazuh Engine        |
+---------------------------------+-----------------------------------------------------+
| ``<rootcheck>``                 | Functionality moved to the agent                    |
+---------------------------------+-----------------------------------------------------+
| ``<syscheck>``                  | Functionality moved to the agent                    |
+---------------------------------+-----------------------------------------------------+
| ``<wodle name="syscollector">`` | Functionality moved to the agent                    |
+---------------------------------+-----------------------------------------------------+
| ``<localfile>``                 | Log collection moved to the agent                   |
+---------------------------------+-----------------------------------------------------+
| ``<wodle name="open-scap">``    | Replaced by Security Configuration Assessment (SCA) |
+---------------------------------+-----------------------------------------------------+

Some unsupported options and sections can prevent Wazuh manager 5.x from starting if they remain in the configuration. Review and remove all unsupported entries before you start the manager.

Configuration procedure
-----------------------

Perform the following steps to recreate the Wazuh manager configuration in the Wazuh 5.x deployment.

#. Stop the Wazuh manager service.

   .. code-block:: console

      # systemctl stop wazuh-manager

#. Review the existing Wazuh 4.x manager configuration in ``/var/ossec/etc/ossec.conf``.

#. Recreate the supported configuration manually in ``/var/wazuh-manager/etc/wazuh-manager.conf``. Do not copy the Wazuh 4.x file directly into the Wazuh 5.x installation.

#. Place the required TLS certificate files under ``/var/wazuh-manager/etc/certs/`` and update the corresponding certificate paths in ``/var/wazuh-manager/etc/wazuh-manager.conf``.

#. Review and update any settings affected by changes in Wazuh 5.x, including renamed file paths and manager-side capabilities.

#. Save the updated configuration and start the Wazuh manager service.

   .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable wazuh-manager
      # systemctl start wazuh-manager

#. Verify that the Wazuh manager starts successfully and that the manager log reports no configuration errors.

Agent groups
------------

You can recreate agent groups in Wazuh 5.x by restoring the existing group configuration and enrolling Wazuh agents with the appropriate group assignments.

In Wazuh 5.x, group configuration files still reside in the shared directory, but the manager installation path has changed from ``/var/ossec/`` to ``/var/wazuh-manager/``.

.. note::

   Agent enrollment now determines group assignment. The manager no longer infers an agent's group from its previous configuration. Each agent must declare their group during enrollment; otherwise, the manager assigns them to the default group.

Configuration procedure
-----------------------

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

      Review the restored ``agent.conf`` files and remove or update any settings that Wazuh 5.x no longer supports before you restart the Wazuh manager.

#. Restart the Wazuh manager service to load the restored group configuration.

   .. code-block:: console

      # systemctl restart wazuh-manager

#. On each Wazuh agent, verify that the required group is configured in ``ossec.conf``.

   .. code-block:: xml

      <enrollment>
        <enabled>yes</enabled>
        <groups><GROUP_NAME></groups>
      </enrollment>

#. Re-enroll the Wazuh agents. Remove the existing client key and start the Wazuh agent service.

   .. code-block:: console

      # rm -f /var/ossec/etc/client.keys
      # systemctl start wazuh-agent

#. On the Wazuh dashboard, navigate to **Agents management** > **Summary** and confirm that each Wazuh agent is assigned to the expected group.
