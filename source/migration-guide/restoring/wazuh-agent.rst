.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to restore a backup of key files of your Wazuh agent installation.
  
Wazuh agent
===========

Restore your Wazuh agent installation by following these steps.

.. note::
   
   You need elevated privileges to execute the commands below.

Linux
-----

You need to have a new installation of the Wazuh agent on a Linux endpoint. Follow the :doc:`/installation-guide/wazuh-agent/wazuh-agent-package-linux` guide to perform a fresh Wazuh agent installation.

Preparing the data restoration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Compress the files generated after performing the :doc:`Wazuh files backup </migration-guide/creating/wazuh-agent>` and transfer them to the respective monitored endpoints.

   .. code-block:: console

      # tar -cvzf wazuh_agent.tar.gz ~/wazuh_files_backup/ 

#. Move the compressed file to the root ``/`` directory of your node:

   .. code-block:: console

      # mv wazuh_agent.tar.gz /
      # cd /

#. Decompress the backup files and change the current working directory to the directory based on the date and time of the backup files.

   .. code-block:: console

      # tar -xzvf wazuh_agent.tar.gz
      # cd ~/wazuh_files_backup/<DATE_TIME>

Restoring Wazuh agent files
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the steps below to restore the Wazuh agent files on a Linux endpoint.

#. Stop the Wazuh agent to prevent any modification to the Wazuh agent files during the restore process:

   .. code-block:: console

      # systemctl stop wazuh-agent

#. Restore Wazuh agent data, certificates, and configuration files, and change the file permissions and ownerships accordingly:

   .. code-block:: console

      # sudo cp var/ossec/etc/client.keys /var/ossec/etc/ 
      # chown wazuh:wazuh /var/ossec/etc/client.keys
      # sudo cp var/ossec/etc/ossec.conf /var/ossec/etc/
      # chown root:wazuh /var/ossec/etc/ossec.conf
      # sudo cp var/ossec/etc/internal_options.conf /var/ossec/etc/
      # chown root:wazuh /var/ossec/etc/internal_options.conf
      # sudo cp var/ossec/etc/local_internal_options.conf /var/ossec/etc/
      # chown root:wazuh /var/ossec/etc/local_internal_options.conf
      # sudo cp -r var/ossec/etc/*.pem /var/ossec/etc/
      # chown -R root:wazuh /var/ossec/etc/*.pem
      # sudo cp -r var/ossec/logs/* /var/ossec/logs/
      # chown -R wazuh:wazuh /var/ossec/logs/
      # sudo cp -r var/ossec/queue/rids/* /var/ossec/queue/rids/
      # chown -R wazuh:wazuh /var/ossec/queue/rids/

#. Restore your custom files such as local SCA policies, active response scripts, and wodle commands if there are any and change the file permissions. Adapt the following command accordingly. 

   .. code-block:: console

      # sudo cp var/ossec/etc/<SCA_DIRECTORY>/<CUSTOM_SCA_FILE> /var/ossec/etc/<SCA_DIRECTORY>/
      # chown wazuh:wazuh /var/ossec/etc/custom-sca-files/<CUSTOM_SCA_FILE>
      # sudo cp var/ossec/active-response/bin/<CUSTOM_ACTIVE_RESPONSE_SCRIPT> /var/ossec/active-response/bin/
      # chown root:wazuh /var/ossec/active-response/bin/<CUSTOM_ACTIVE_RESPONSE_SCRIPT> 
      # sudo cp var/ossec/wodles/<CUSTOM_WODLE_SCRIPT> /var/ossec/wodles/
      # chown root:wazuh /var/ossec/wodles/<CUSTOM_WODLE_SCRIPT>

#. Start the Wazuh agent service: 

   .. code-block:: console

      # systemctl start wazuh-agent

Windows
-------

You need to have a new installation of the Wazuh agent on a Windows endpoint. Follow the :doc:`/installation-guide/wazuh-agent/wazuh-agent-package-windows` guide to perform a fresh Wazuh agent installation.

Preparing the data restoration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Compress the files generated after performing the :doc:`Wazuh files backup <../creating/wazuh-agent>` and transfer them to the ``Downloads`` directory of the respective agent endpoints.

#. Decompress the file using `7-Zip <https://www.7-zip.org/>`__ or any of your preferred tools.

Restoring Wazuh agent files
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the steps below to restore Wazuh agent files on a Windows endpoint.

#. Stop the Wazuh agent to prevent any modification to the Wazuh agent files during the restore process by running the following command on PowerShell as an administrator:

   .. code-block:: ps1con

      > NET STOP WazuhSvc

#. Launch PowerShell as an administrator and navigate to the ``wazuh_files_backup/<DATE_TIME>`` folder that contains the backup files.

#. Run the following commands to copy the Wazuh agent data, certificates, and configurations:

   .. code-block:: ps1con

      > Copy-Item "$bkp_folder\client.keys" "C:\Program Files (x86)\ossec-agent" -Recurse -Force
      > Copy-Item "$bkp_folder\ossec.conf" "C:\Program Files (x86)\ossec-agent" -Recurse -Force
      > Copy-Item "$bkp_folder\internal_options.conf" "C:\Program Files (x86)\ossec-agent" -Recurse -Force
      > Copy-Item "$bkp_folder\local_internal_options.conf" "C:\Program Files (x86)\ossec-agent" -Recurse -Force
      > Copy-Item "$bkp_folder\*.pem" "C:\Program Files (x86)\ossec-agent" -Recurse -Force
      > Copy-Item "$bkp_folder\ossec.log" "C:\Program Files (x86)\ossec-agent" -Recurse -Force
      > Copy-Item "$bkp_folder\logs\*" "C:\Program Files (x86)\ossec-agent\logs" -Recurse -Force
      > Copy-Item "$bkp_folder\rids\*" "C:\Program Files (x86)\ossec-agent\rids" -Recurse -Force

   You can also copy these files using the *drag and drop* method.

#. Restore your custom files, such as local SCA policies, active response scripts, and wodle commands, if there are any. Adapt the following command accordingly.

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

#. Start the Wazuh agent service by running the following command on the Command Prompt as an administrator:

   .. code-block:: doscon

      NET START WazuhSvc

macOS
-----

You need to have a new installation of the Wazuh agent on a macOS endpoint. Follow the :doc:`/installation-guide/wazuh-agent/wazuh-agent-package-macos` guide to perform a fresh Wazuh agent installation.

Preparing the data restoration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Compress the files generated after performing the :doc:`Wazuh files backup <../creating/wazuh-agent>` and transfer them to the endpoint with the Wazuh agent installed.

   .. code-block:: console

      # tar -cvzf wazuh_agent.tar.gz ~/wazuh_files_backup/ 

#. Move the compressed file to the ``Downloads`` directory of your node:

   .. code-block:: console

      # mv wazuh_agent.tar.gz ~/Downloads
      # cd ~/Downloads

#. Decompress the backup files and change the current working directory to the directory based on the date and time of the backup files.

   .. code-block:: console

      # tar -xzvf wazuh_agent.tar.gz
      # cd wazuh_files_backup/<DATE_TIME>

Restoring Wazuh agent files
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the steps below to restore Wazuh agent files on a macOS endpoint.

#. Stop the Wazuh agent to prevent any modification to the Wazuh agent files during the restore process:

   .. code-block:: console

      # launchctl bootout system /Library/LaunchDaemons/com.wazuh.agent.plist

#. Restore Wazuh agent data, certificates, and configuration files:

   .. code-block:: console

      # cp Library/Ossec/etc/client.keys /Library/Ossec/etc/
      # cp Library/Ossec/etc/ossec.conf /Library/Ossec/etc/
      # cp Library/Ossec/etc/internal_options.conf /Library/Ossec/etc/
      # cp Library/Ossec/etc/local_internal_options.conf /Library/Ossec/etc/
      # cp -R Library/Ossec/etc/*.pem /Library/Ossec/etc/
      # cp -R Library/Ossec/logs/* /Library/Ossec/logs/
      # cp -R Library/Ossec/queue/rids/* /Library/Ossec/queue/rids/ 

#. Restore custom files, such as local SCA policies, active response, and wodle scripts, if there are any.

   .. code-block:: console

      # sudo cp Library/Ossec/<SCA_DIRECTORY>/<CUSTOM_SCA_FILE> /Library/Ossec/<SCA_DIRECTORY>/
      # sudo cp Library/Ossec/active-response/bin/<CUSTOM_ACTIVE_RESPONSE_SCRIPT> /Library/Ossec/active-response/bin/
      # sudo cp Library/Ossec/wodles/<CUSTOM_WODLE_SCRIPT> /Library/Ossec/wodles/

#. Start the Wazuh agent service:

   .. code-block:: console

      # launchctl bootstrap system /Library/LaunchDaemons/com.wazuh.agent.plist

Verifying data restoration
^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Run the command below on your Wazuh server to check if the Wazuh agent is connected and active:

   .. code-block:: console

      # /var/ossec/bin/agent_control -l

2. Using the Wazuh dashboard, navigate to **Active agents**. Select your Wazuh agent to see the data from the backup, such as **Threat Hunting**, **Vulnerability Detection**, **Configuration Assessment**, and others.
