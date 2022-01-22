.. Copyright (C) 2022 Wazuh, Inc.
.. meta::
  :description: Learn more about how to manually restore a Wazuh-DB backup in the Wazuh server administration section of our documentation.

.. _manual_backup_restore:

Wazuh-DB backup restoration
===========================

Wazuh by default performs automatic backups of the **global.db** database. These snapshots may be useful to recover critical information.
Wazuh-DB will restore the last backup available in case of an upgrade failure, but if this process also fails, the restore must be done manually.

Manual restore process
----------------------

The first step is to turn of Wazuh manager:

  a. For Systemd:

  .. code-block:: console

    # systemctl stop wazuh-manager

  b. For SysV Init:

  .. code-block:: console

    # service wazuh-manager stop

Then, locate the backup to restore. It is stored in ``WAZUH_HOME/backup/db`` with a name format similar to ``global.db-backup-TIMESTAMP-pre_upgrade.gz``.

.. note::
  This process is valid for all the backups in the folder. Some snapshots names may contain special tags, like `pre_upgrade` or `pre_restore`.

Decompress it. Always use the **-k** flag to preserve the original file and some special characters like ``:`` may have to be escaped in your terminal:

  .. code-block:: console

    # gzip -dk WAZUH_HOME/backup/db/global.db-backup-TIMESTAMP-pre_upgrade.gz

Remove the current **global.db** database and move the backup to the right location:

  .. code-block:: console

     # rm  WAZUH_HOME/queue/db/global.db
     # mv  WAZUH_HOME/backup/db/global.db-backup-TIMESTAMP-pre_upgrade WAZUH_HOME/queue/db/global.db

And finally, start Wazuh:

  a. For Systemd:

  .. code-block:: console

    # systemctl start wazuh-manager

  b. For SysV Init:

  .. code-block:: console

    # service wazuh-manager start
