.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to keep a backup of key files of your Wazuh agent installation.
  
Wazuh agent
===========

To create a backup of your Wazuh agent installation follow these steps.

.. note::

   You need elevated privileges to execute the commands below.

Preparing the backup
--------------------

#. On the agent machine you're doing the back up for, run the following commands to create the destination folder where to store the files. These commands use date and time references for the folder name to keep files separated from old backups you might have.

   .. tabs::

      .. group-tab:: Linux

         .. code-block:: console

            # bkp_folder=~/wazuh_files_backup/$(date +%F_%H:%M)
            # mkdir -p $bkp_folder && echo $bkp_folder

      .. group-tab:: Windows (Powershell Admin)

         .. code-block:: ps1con

            > set datetime=%date%-%time%
            > set datetime=%datetime: =_%
            > set datetime=%datetime:/=-%
            > set datetime=%datetime::=_%
            > set datetime=%datetime:.=_%
            > set bkp_folder=%userprofile%\wazuh_files_backup\%datetime%
            > mkdir %bkp_folder% ; echo %bkp_folder%
            > $bkp_folder = "C:\ossec_backup"

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

      .. group-tab:: Windows (Powershell Admin)

         .. code-block:: ps1con

            > New-Item -Path $bkp_folder -ItemType Directory -Force | Out-Null
            > Write-Output $bkp_folder
            > Copy-Item "C:\Program Files (x86)\ossec-agent\client.keys" $bkp_folder -Recurse -Force
            > Copy-Item "C:\Program Files (x86)\ossec-agent\ossec.conf" $bkp_folder -Recurse -Force
            > Copy-Item "C:\Program Files (x86)\ossec-agent\internal_options.conf" $bkp_folder -Recurse -Force
            > Copy-Item "C:\Program Files (x86)\ossec-agent\local_internal_options.conf" $bkp_folder -Recurse -Force
            > Copy-Item "C:\Program Files (x86)\ossec-agent\*.pem" $bkp_folder -Recurse -Force
            > Copy-Item "C:\Program Files (x86)\ossec-agent\ossec.log" $bkp_folder -Recurse -Force
            > Copy-Item "C:\Program Files (x86)\ossec-agent\logs\*"  "$bkp_folder\logs\" -Recurse -Force
            > Copy-Item "C:\Program Files (x86)\ossec-agent\rids" "$bkp_folder\rids" -Recurse -Force

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

   .. tabs::

      .. group-tab:: Linux

         .. code-block:: console

            # rsync -aREz /var/ossec/etc/<SCA_DIRECTORY>/<CUSTOM_SCA_FILE> $bkp_folder
            # rsync -aREz /var/ossec/active-response/bin/<CUSTOM_ACTIVE_RESPONSE_SCRIPT> $bkp_folder
            # rsync -aREz /var/ossec/wodles/<CUSTOM_WODLE_SCRIPT> $bkp_folder

      .. group-tab:: Windows (Powershell Admin)

         .. code-block:: powershell

            # Example variables - replace with your actual file names and folders

            $SCA_DIRECTORY = "sca"
            $CUSTOM_SCA_FILE = "custom_sca.yml"
            $CUSTOM_ACTIVE_RESPONSE_SCRIPT = "my_response.ps1"
            $CUSTOM_WODLE_SCRIPT = "custom_wodle.py"

         .. code-block:: ps1con

            > Copy-Item "$SCA_DIRECTORY\$CUSTOM_SCA_FILE" "C:\Program Files (x86)\ossec-agent\$SCA_DIRECTORY" -Recurse -Force
            > Copy-Item "active-response\bin\$CUSTOM_ACTIVE_RESPONSE_SCRIPT" "C:\Program Files (x86)\ossec-agent\active-response\bin" -Recurse -Force
            > Copy-Item "wodles\$CUSTOM_WODLE_SCRIPT" "C:\Program Files (x86)\ossec-agent\wodles" -Recurse -Force

      .. group-tab:: macOS

         .. code-block:: console

            # rsync -aREz /Library/Ossec/etc/<SCA_DIRECTORY>/<CUSTOM_SCA_FILE> $bkp_folder 
            # rsync -aREz /Library/Ossec/active-response/bin/<CUSTOM_ACTIVE_RESPONSE_SCRIPT> $bkp_folder
            # rsync -aREz /Library/Ossec/wodles/<CUSTOM_WODLE_SCRIPT> $bkp_folder

Checking the backup
-------------------

#. Check everything is in place and working


   .. tabs::

      .. group-tab:: Linux

         .. code-block:: console

            # find $bkp_folder -type f | sed "s|$bkp_folder/||" | less

      .. group-tab:: Windows (Powershell Admin)

         .. code-block:: ps1con

            > cd C:\
            > tree ossec_backup /f

      .. group-tab:: macOS

         .. code-block:: console

            # find $bkp_folder -type f | sed "s|$bkp_folder/||" | less
