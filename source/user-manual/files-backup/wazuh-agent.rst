.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to keep a backup of key files of your Wazuh agent installation.
  
Wazuh agent
===========

To create a backup of your Wazuh agent installation follow these steps.

Preparing the backup
--------------------

#. On the agent machine you're doing the back up, run the following commands to create the destination folder where to store the files. These commands use date and time references for the folder name to keep files separated from old backups you might have.

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

Backing up a Wazuh agent
------------------------

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
            /var/ossec/logs/ \
            /var/ossec/queue/rids/ $bkp_folder

      .. group-tab:: Windows

         .. code-block:: doscon

            > xcopy C:\Program Files (x86)\ossec-agent\client.keys %bkp_folder% /I /S /H /X /K
            > xcopy C:\Program Files (x86)\ossec-agent\ossec.conf %bkp_folder% /I /S /H /X /K
            > xcopy C:\Program Files (x86)\ossec-agent\ossec.log %bkp_folder% /I /S /H /X /K
            > xcopy C:\Program Files (x86)\ossec-agent\internal_options.conf %bkp_folder% /I /S /H /X /K
            > xcopy C:\Program Files (x86)\ossec-agent\local_internal_options.conf %bkp_folder% /I /S /H /X /K
            > xcopy C:\Program Files (x86)\ossec-agent\*.pem %bkp_folder% /I /S /H /X /K
            > xcopy C:\Program Files (x86)\ossec-agent\rids\*  %bkp_folder% /I /S /H /X /K

Checking the backup
-------------------

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
