.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to keep a backup of key files of your Wazuh agent installation.
  
Wazuh agent
===========

To create a backup of your Wazuh agent installation follow these steps.

.. note::

   You need root user privileges to execute the commands below.

Preparing the backup
--------------------

#. On the agent machine you're doing the back up for, run the following commands to create the destination folder where to store the files. These commands use date and time references for the folder name to keep files separated from old backups you might have.

   .. tabs::

      .. group-tab:: Linux

         .. code-block:: console

            # bkp_folder=~/wazuh_files_backup/$(date +%F_%H:%M)
            # mkdir -p $bkp_folder && echo $bkp_folder

      .. group-tab:: Windows

         .. code-block:: doscon

            > set datetime=%date%-%time%
            > set datetime=%datetime: =_%
            > set datetime=%datetime:/=-%
            > set datetime=%datetime::=_%
            > set datetime=%datetime:.=_%
            > set bkp_folder=%userprofile%\wazuh_files_backup\%datetime%
            > mkdir %bkp_folder% && echo %bkp_folder%
      
      .. group-tab:: macOS

         .. code-block:: console

            # bkp_folder=~/wazuh_files_backup/$(date +%F_%H:%M)
            # mkdir -p $bkp_folder && echo $bkp_folder

Backing up a Wazuh agent
------------------------

#. Back up Wazuh agent data, certificates, and configuration files.

   .. tabs::

      .. group-tab:: Linux

         .. code-block:: console

            # rsync -aREz \
            /var/ossec/etc/client.keys \
            /var/ossec/etc/ossec.conf \
            /var/ossec/etc/internal_options.conf \
            /var/ossec/etc/local_internal_options.conf \
            /var/ossec/etc/*.pem \
            /var/ossec/logs/ \
            /var/ossec/queue/rids/ $bkp_folder

      .. group-tab:: Windows

         .. code-block:: doscon

            > xcopy "C:\Program Files (x86)\ossec-agent\client.keys" %bkp_folder% /H /I /K /S /X
            > xcopy "C:\Program Files (x86)\ossec-agent\ossec.conf" %bkp_folder% /H /I /K /S /X
            > xcopy "C:\Program Files (x86)\ossec-agent\internal_options.conf" %bkp_folder% /H /I /K /S /X
            > xcopy "C:\Program Files (x86)\ossec-agent\local_internal_options.conf" %bkp_folder% /H /I /K /S /X
            > xcopy "C:\Program Files (x86)\ossec-agent\*.pem" %bkp_folder% /H /I /K /S /X
            > xcopy "C:\Program Files (x86)\ossec-agent\ossec.log" %bkp_folder% /H /I /K /S /X
            > xcopy "C:\Program Files (x86)\ossec-agent\logs\*"  %bkp_folder%\logs\ /H /I /K /S /X
            > xcopy "C:\Program Files (x86)\ossec-agent\rids\*"  %bkp_folder%\rids\ /H /I /K /S /X

      .. group-tab:: macOS

         .. code-block:: console

            # rsync -aREz \
            /Library/Ossec/etc/client.keys \
            /Library/Ossec/etc/ossec.conf \
            /Library/Ossec/etc/internal_options.conf \
            /Library/Ossec/etc/local_internal_options.conf \
            /Library/Ossec/etc/*.pem \
            /Library/Ossec/logs/ \
            /Library/Ossec/queue/rids/ $bkp_folder

#. Back up your custom files such as local SCA policies, active response scripts, and wodles.

Checking the backup
-------------------

#. Check everything is in place and working


   .. tabs::

      .. group-tab:: Linux

         .. code-block:: console

            # find $bkp_folder -type f | sed "s|$bkp_folder/||" | less

      .. group-tab:: Windows

         .. code-block:: doscon

            > tree %bkp_folder% /f

      .. group-tab:: macOS

         .. code-block:: console

            # find $bkp_folder -type f | sed "s|$bkp_folder/||" | less
