.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to keep a backup of key files of your Wazuh central components installation.
  
Wazuh central components
========================

To create a backup of the central components of your Wazuh installation, follow these steps. Repeat them on every cluster node you want to back up. 

.. note::

   You need root user privileges to execute the commands below.

Preparing the backup
--------------------

#. Create the destination folder to store the files. For version control, add the date and time of the backup to the name of the folder.

   .. code-block:: console

      # bkp_folder=~/wazuh_files_backup/$(date +%F_%H:%M)
      # mkdir -p $bkp_folder && echo $bkp_folder

#. Save the host information.

   .. code-block:: console

      # cat /etc/*release* > $bkp_folder/host-info.txt
      # echo -e "\n$(hostname): $(hostname -I)" >> $bkp_folder/host-info.txt

Backing up the Wazuh server
---------------------------

#. Back up the Wazuh server data and configuration files.

   .. code-block:: console

      # rsync -aREz \
      /etc/filebeat/ \
      /etc/postfix/ \
      /var/ossec/api/configuration/ \
      /var/ossec/etc/client.keys \
      /var/ossec/etc/sslmanager* \
      /var/ossec/etc/ossec.conf \
      /var/ossec/etc/internal_options.conf \
      /var/ossec/etc/local_internal_options.conf \
      /var/ossec/etc/rules/local_rules.xml \
      /var/ossec/etc/decoders/local_decoder.xml \
      /var/ossec/etc/shared/ \
      /var/ossec/logs/ \
      /var/ossec/queue/agent-groups/ \
      /var/ossec/queue/agentless/ \
      /var/ossec/queue/agents-timestamp \
      /var/ossec/queue/fts/ \
      /var/ossec/queue/rids/ \
      /var/ossec/stats/ \
      /var/ossec/var/db/agents/ \
      /var/ossec/var/multigroups/ $bkp_folder

#. If present, back up certificates and additional configuration files.

   .. code-block:: console

      # rsync -aREz \
      /var/ossec/etc/*.pem \
      /var/ossec/etc/authd.pass $bkp_folder
   
#. Back up your custom files. If you have custom active responses, CDB lists, integrations, or wodles, adapt the following command accordingly.

   .. code-block:: console

      # rsync -aREz \
      /var/ossec/active-response/bin/<custom_AR_script> \
      /var/ossec/etc/lists/<user_cdb_list>.cdb \
      /var/ossec/integrations/<custom_integration_script> \
      /var/ossec/wodles/<custom_wodle_script> $bkp_folder

#. Stop the Wazuh manager service to prevent modification attempts while copying the Wazuh databases.

   .. include:: /_templates/common/stop_manager.rst

#. Back up the Wazuh databases. They hold collected data from agents.

   .. code-block:: console

      # rsync -aREz \
      /var/ossec/queue/db/ $bkp_folder

#. Start the Wazuh manager service.

   .. include:: /_templates/common/start_manager.rst

Backing up the Wazuh indexer and dashboard
------------------------------------------

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
      /etc/wazuh-indexer/opensearch-reports-scheduler/ \
      /usr/share/wazuh-indexer/plugins/opensearch-security/tools/config.yml \
      /usr/lib/sysctl.d/wazuh-indexer.conf $bkp_folder

#. Back up the Wazuh dashboard certificates and configuration files.

   .. code-block:: console

      # rsync -aREz \
      /etc/wazuh-dashboard/certs/ \
      /etc/wazuh-dashboard/opensearch_dashboards.yml \
      /usr/share/wazuh-dashboard/config/opensearch_dashboards.keystore \
      /usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml $bkp_folder

#. If present, back up your downloads and custom images.

   .. code-block:: console

      # rsync -aREz \
      /usr/share/wazuh-dashboard/data/wazuh/downloads/ \
      /usr/share/wazuh-dashboard/plugins/wazuh/public/assets/custom/images/ $bkp_folder

.. note::

   While you're already backing up alert files, consider backing up the cluster indices and state as well. State includes cluster settings, node information, index metadata, and shard allocation.

Check the backup
----------------

#. Verify that the Wazuh manager is active and list all the backed up files:  

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl status wazuh-manager

      .. group-tab:: SysV init

         .. code-block:: console

            # service wazuh-manager status

   .. code-block:: console

      # find $bkp_folder -type f | sed "s|$bkp_folder/||" | less
