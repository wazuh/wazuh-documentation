.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to keep a backup of key files of your Wazuh installation.
  
Wazuh files backup
==================

In the following section you find instructions on how to create a backup of your Wazuh installation. Here, you do this backup by copying key files to a folder. Later, you can move this folder contents back to the corresponding location to restore your Wazuh data, certificates, and configurations. Backing up Wazuh files is useful in cases such as moving your Wazuh installation to another system.

To create a backup of your Wazuh installation follow these steps.

Preparations
------------

#. On the cluster nodes and endpoints you're backing up, run the following commands to create the destination folder where to store the files. These commands use date and time references for the folder name to keep files separated from old backups you might have.

   .. tabs::

      .. group-tab:: Linux

         .. code-block:: console

            # bkp_folder=~/wazuh_files_backup/$(date +%F_%H:%M)
            # mkdir --parents $bkp_folder
            # echo $bkp_folder

      .. group-tab:: Windows

         .. code-block:: doscon

            > set bkp_folder=%userprofile%\\wazuh_files_backup\\%date:~10%%date:~4,2%%date:~7,2%%time:~0,2%%time:~3,2%
            > mkdir %bkp_folder%
            > echo %bkp_folder%

Wazuh server
------------

#. Backup Wazuh server data, certificate and configuration files.

   .. code-block:: console

      # cp -rp --parents \
      /var/ossec/api/configuration/* \
      /var/ossec/etc/client.keys \
      /var/ossec/etc/sslmanager* \
      /var/ossec/etc/*.pem \
      /var/ossec/etc/ossec.conf \
      /var/ossec/etc/internal_options.conf \
      /var/ossec/etc/local_internal_options.conf \
      /var/ossec/etc/rules/local_rules.xml \
      /var/ossec/etc/decoders/local_decoder.xml \
      /var/ossec/etc/shared/* \
      /var/ossec/logs/* \
      /var/ossec/queue/agent-groups/* \
      /var/ossec/queue/agentless/* \
      /var/ossec/queue/agents-timestamp/* \
      /var/ossec/queue/db/* \
      /var/ossec/queue/fts/* \
      /var/ossec/queue/rids/* \
      /var/ossec/stats/* \
      /var/ossec/var/db/agents/* \
      /var/ossec/var/multigroups/* $bkp_folder

#. Backup your custom files. Adjust the command using the names of your own custom files.

   .. code-block:: console

      # cp -rp --parents \
      /var/ossec/etc/lists/<user_cdb_list>.cdb \
      /var/ossec/integrations/<custom_integration_script> $bkp_folder

#. Backup Wazuh databases which hold collected data from agents. These files must be saved with the Wazuh manager service stopped to prevent modification attempts while copying.

   .. include:: /_templates/common/stop_manager.rst

   .. code-block:: console

      # cp -rp --parents \
      /var/ossec/queue/db/* $bkp_folder

   .. include:: /_templates/common/start_manager.rst


Wazuh indexer and dashboard
---------------------------

#. Backup Wazuh indexer certificate and configuration files.

   .. code-block:: console

      # cp -rp --parents \
      /etc/wazuh-indexer/certs/ \
      /etc/wazuh-indexer/jvm.options \
      /etc/wazuh-indexer/opensearch.yml \
      /usr/lib/sysctl.d/wazuh-indexer.conf $bkp_folder

#. Backup Wazuh dashboard certificate and configuration files

   .. code-block:: console

      # cp -rp --parents \
      /etc/wazuh-dashboard/certs/ \
      /etc/wazuh-dashboard/opensearch_dashboards.yml \
      /usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml $bkp_folder

Wazuh agents
------------

#. Backup Wazuh agent data, certificate and configuration files.

   .. tabs::

      .. group-tab:: Linux

         .. code-block:: console

            # cp -rp --parents \
            /var/ossec/etc/client.keys \
            /var/ossec/etc/ossec.conf \
            /var/ossec/etc/internal_options.conf \
            /var/ossec/etc/local_internal_options.conf \
            /var/ossec/etc/*.pem \
            /var/ossec/logs/* \
            /var/ossec/queue/rids/* $bkp_folder

      .. group-tab:: Windows

         .. code-block:: doscon

            > xcopy C:\Program Files (x86)\ossec-agent\client.keys %bkp_folder% /I /S /H /X /K
            > xcopy C:\Program Files (x86)\ossec-agent\ossec.conf %bkp_folder% /I /S /H /X /K
            > xcopy C:\Program Files (x86)\ossec-agent\ossec.log %bkp_folder% /I /S /H /X /K
            > xcopy C:\Program Files (x86)\ossec-agent\internal_options.conf %bkp_folder% /I /S /H /X /K
            > xcopy C:\Program Files (x86)\ossec-agent\local_internal_options.conf %bkp_folder% /I /S /H /X /K
            > xcopy C:\Program Files (x86)\ossec-agent\*.pem %bkp_folder% /I /S /H /X /K
            > xcopy C:\Program Files (x86)\ossec-agent\rids\*  %bkp_folder% /I /S /H /X /K

Check the backup
----------------

#. Check everything is in place and working


   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl status wazuh-manager

      .. group-tab:: SysV init

         .. code-block:: console

            # service wazuh-manager status

   .. tabs::

      .. group-tab:: Linux

         .. code-block:: console

            # find $bkp_folder -type f | sed "s|$bkp_folder/||" | less

      .. group-tab:: Windows

         .. code-block:: doscon

            > type $bkp_folder | more

.. toctree::
    :hidden:
    :maxdepth: 1

    /user-manual/files-backup/wazuh-with-elastic-stack-basic
