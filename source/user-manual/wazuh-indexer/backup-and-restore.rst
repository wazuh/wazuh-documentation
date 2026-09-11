.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to create and restore a backup of your Wazuh indexer configuration files in this section of the documentation.

Backup and restore
==================

This guide explains how to create and restore a backup of your Wazuh indexer configuration files. The backup preserves the original file permissions, ownership, and directory structure. This allows you to restore the configuration on the same system or migrate it to another server running the same Wazuh version.

This backup procedure includes the Wazuh indexer configuration, certificates, security configuration, keystore, plugin configuration, and other required files. However, it does not back up the data stored in the Wazuh indexer.

.. note::

   This backup only restores the Wazuh indexer configuration files. To back up and restore indexed data, use Wazuh indexer snapshots.

Creating a backup
-----------------

This section explains how to create a backup of your Wazuh indexer configuration files. Perform these steps on every Wazuh indexer node that you want to back up.

.. note::

   You need root user privileges to execute the commands below.

Preparing the backup
^^^^^^^^^^^^^^^^^^^^

#. Backup the existing Wazuh indexer security configuration files.

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh --options "-backup /etc/wazuh-indexer/opensearch-security -icl -nhnv"

#. Create the destination folder to store the files. For version control, add the date and time of the backup to the name of the folder.

   .. code-block:: console

      # bkp_folder=~/wazuh_files_backup/$(date +%F_%H:%M)
      # mkdir -p $bkp_folder && echo $bkp_folder

#. Save the host information.

   .. code-block:: console

      # cat /etc/*release* > $bkp_folder/host-info.txt
      # echo -e "\n$(hostname): $(hostname -I)" >>$bkp_folder/host-info.txt

Backing up the Wazuh indexer and dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Back up the Wazuh indexer certificates and configuration files.

   .. code-block:: console

      # rsync -aREz \
      /etc/wazuh-indexer/certs/ \
      /etc/wazuh-indexer/jvm.options \
      /etc/wazuh-indexer/jvm.options.d \
      /etc/wazuh-indexer/log4j2.properties \
      /etc/wazuh-indexer/opensearch.yml \
      /etc/wazuh-indexer/opensearch.keystore \
      /etc/wazuh-indexer/opensearch-observability/ \
      /etc/wazuh-indexer/opensearch-security/ \
      /etc/wazuh-indexer/wazuh-indexer-notifications/ \
      /etc/wazuh-indexer/wazuh-indexer-notifications-core/ \
      /etc/wazuh-indexer/wazuh-indexer-reports-scheduler/ \
      /etc/wazuh-indexer/wazuh-indexer-security-analytics/ \
      /usr/lib/sysctl.d/wazuh-indexer.conf \
      "$bkp_folder"

#. Compress the backup files into a single archive before transferring them or storing them in a secure location.

   .. code-block:: console

      # tar -cvzf wazuh-indexer-backup.tar.gz $bkp_folder

Restoring Wazuh from backup
---------------------------

This guide explains how to restore a backup of your Wazuh indexer configuration files. Restoring Wazuh files can be useful when migrating your Wazuh installation to a different system. To carry out this restore process, you first need to back up the necessary files. Creating a backup documentation provides a guide that you can follow in creating a backup of the Wazuh indexer files.

.. note::

   This guide is designed specifically for restoration from a backup of the same version. For multi-node deployments, restore the corresponding backup on each Wazuh indexer node. You need root user privileges to run all the commands described below.

Preparing the data restoration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Move the compressed file to the root ``/`` directory of the new server:

   .. code-block:: console

      # mv wazuh-indexer-backup.tar.gz /
      # cd /

#. Decompress the backup files and change the current working directory to the directory based on the date and time of the backup files:

   .. code-block:: console

      # tar -xzvf wazuh-indexer-backup.tar.gz
      # cd ~/wazuh_files_backup/<DATE_TIME>

Restoring Wazuh indexer files
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps to restore Wazuh indexer files on the new server.

#. Stop the Wazuh indexer to prevent any modifications to the Wazuh indexer files during the restoration process:

   .. code-block:: console

      # systemctl stop wazuh-indexer

#. Restore the Wazuh indexer configuration files and change the file permissions and ownerships accordingly:

   .. code-block:: console

      # cp -r etc/wazuh-indexer/certs/ /etc/wazuh-indexer/certs/
      # cp etc/wazuh-indexer/jvm.options /etc/wazuh-indexer/jvm.options
      # cp -r etc/wazuh-indexer/jvm.options.d/ /etc/wazuh-indexer/jvm.options.d/
      # cp etc/wazuh-indexer/log4j2.properties /etc/wazuh-indexer/log4j2.properties
      # cp etc/wazuh-indexer/opensearch.yml /etc/wazuh-indexer/opensearch.yml
      # cp etc/wazuh-indexer/opensearch.keystore /etc/wazuh-indexer/opensearch.keystore
      # cp -r etc/wazuh-indexer/opensearch-observability/ /etc/wazuh-indexer/opensearch-observability/
      # cp -r etc/wazuh-indexer/opensearch-security/ /etc/wazuh-indexer/opensearch-security/
      # cp -r etc/wazuh-indexer/wazuh-indexer-reports-scheduler/ /etc/wazuh-indexer/wazuh-indexer-reports-scheduler/
      # cp -r etc/wazuh-indexer/wazuh-indexer-notifications/ /etc/wazuh-indexer/wazuh-indexer-notifications/
      # cp -r etc/wazuh-indexer/wazuh-indexer-notifications-core/ /etc/wazuh-indexer/wazuh-indexer-notifications-core/
      # cp -r etc/wazuh-indexer/wazuh-indexer-security-analytics/ /etc/wazuh-indexer/wazuh-indexer-security-analytics/
      # cp usr/lib/sysctl.d/wazuh-indexer.conf /usr/lib/sysctl.d/wazuh-indexer.conf
      # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs/
      # chown wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/jvm.options
      # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/jvm.options.d
      # chown wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/log4j2.properties
      # chown wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/opensearch.yml
      # chown wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/opensearch.keystore
      # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/opensearch-observability/
      # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/opensearch-security/
      # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/wazuh-indexer-reports-scheduler/
      # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/wazuh-indexer-notifications/
      # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/wazuh-indexer-notifications-core/
      # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/wazuh-indexer-security-analytics/
      # chown wazuh-indexer:wazuh-indexer /usr/lib/sysctl.d/wazuh-indexer.conf

#. Start the Wazuh indexer service:

   .. code-block:: console

      # systemctl start wazuh-indexer
