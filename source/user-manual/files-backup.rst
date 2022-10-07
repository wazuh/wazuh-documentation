.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to keep a backup of key files of your Wazuh installation.
  
Wazuh files backup
==================

In the following section you can find instructions on how to create a backup of your Wazuh installation.

Here you do this backup by copying key files to a folder. Later, you can move these files back to their corresponding locations to restore your Wazuh data, certificates, and configurations. Backing up Wazuh files is useful in cases such as moving your Wazuh installation to another system.

Wazuh with central components
-----------------------------

To create a backup of your Wazuh installation follow these steps.

#. Create the destination folder where to store the files. Use date and time references for the folder name. This keeps files separated from old backups you may have.

   .. code-block:: console

      # bkp_folder=~/wazuh_files_backup/$(date +%F_%H:%M)
      # mkdir -p $bkp_folder
      # echo $bkp_folder

#. Backup Wazuh indexer certificate and configuration files.

   .. code-block:: console

      # cp -r --parents \
      /etc/wazuh-indexer/certs/ \
      /etc/wazuh-indexer/jvm.options \
      /etc/wazuh-indexer/opensearch.yml \
      /usr/lib/sysctl.d/wazuh-indexer.conf $bkp_folder

#. Backup Wazuh dashboard certificate and configuration files

   .. code-block:: console

      # cp -r --parents \
      /etc/wazuh-dashboard/certs/ \
      /etc/wazuh-dashboard/opensearch_dashboards.yml \
      /usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml $bkp_folder

#. Stop the Wazuh manager service to prevent files modifications while copying Wazuh server files.

   .. include:: /_templates/common/stop_manager.rst

#. Backup Wazuh server data, certificate, and configuration files.

   .. code-block:: console

      # cp -r --parents \
      /etc/filebeat \
      /etc/postfix \
      /var/ossec/active-response/bin \
      /var/ossec/api/configuration/ \
      /var/ossec/etc/ \
      /var/ossec/integrations/ \
      /var/ossec/logs/ \
      /var/ossec/queue/ \
      /var/ossec/var/multigroups/ \
      /var/ossec/wodles $bkp_folder

#. Start the Wazuh manager service.

   .. include:: /_templates/common/start_manager.rst

#. Check everything is in place and working

   .. code-block:: console

      # find $bkp_folder -type f | sed "s|$bkp_folder/||" | less

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl status wazuh-manager

      .. group-tab:: SysV init

         .. code-block:: console

            # service wazuh-manager status

Wazuh with Elastic Stack basic
------------------------------

To create a backup of your Wazuh installation with Elastic Stack basic license follow these steps.

#. Create the destination folder where to store the files. Use date and time references for the folder name. This keeps files separated from old backups you may have.

   .. code-block:: console

      # bkp_folder=~/wazuh_files_backup/$(date +%F_%H:%M)
      # mkdir -p $bkp_folder
      # echo $bkp_folder

#. Backup Elasticsearch configuration files.

   .. code-block:: console

      # cp -r --parents \
      /etc/elasticsearch/jvm.options \
      /etc/elasticsearch/elasticsearch.yml \
      /usr/lib/sysctl.d/elasticsearch.conf $bkp_folder

   -  If your are using x-pack, save certificates and role mapping files.

#. Backup Kibana configuration files

   .. code-block:: console

      # cp -r --parents \
      /etc/kibana/kibana.yml \
      /usr/share/kibana/data/wazuh/config/wazuh.yml $bkp_folder

#. Stop the Wazuh manager service to prevent files modifications while copying Wazuh server files.

   .. include:: /_templates/common/stop_manager.rst

#. Backup Wazuh server data and configuration files.

   .. code-block:: console

      # cp -r --parents \
      /etc/filebeat \
      /etc/postfix \
      /var/ossec/active-response/bin \
      /var/ossec/api/configuration/ \
      /var/ossec/etc/ \
      /var/ossec/integrations/ \
      /var/ossec/logs/ \
      /var/ossec/queue/ \
      /var/ossec/var/multigroups/ \
      /var/ossec/wodles $bkp_folder

#. Start the Wazuh manager service.

   .. include:: /_templates/common/start_manager.rst

#. Check everything is in place and working

   .. code-block:: console

      # find $bkp_folder -type f | sed "s|$bkp_folder/||" | less

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl status wazuh-manager

      .. group-tab:: SysV init

         .. code-block:: console

            # service wazuh-manager status
