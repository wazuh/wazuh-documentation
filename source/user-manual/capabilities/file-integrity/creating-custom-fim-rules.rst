.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh includes out-of-the-box rules that trigger alerts on the creation, modification, or deletion of monitored files. Learn more about it in this section. 
  
Creating custom FIM rules
=========================

Wazuh includes out-of-the-box rules that trigger alerts on the creation, modification, or deletion of monitored files. The image below shows alerts for file addition, modification, and deletion.

.. thumbnail:: ../../../images/manual/fim/fim-alerts.png
  :title: FIM alerts
  :alt: FIM alerts
  :align: center
  :width: 80%

You can use custom Wazuh FIM rules to monitor changes to files and directories based on specific criteria such as filename, permissions, and content. For example, you can create a custom rule to detect changes to a critical system file or configuration file. Whenever a user or process modifies the file, Wazuh triggers a specific alert indicating the change and the details of the modification.

Creating custom FIM rules can extend the out-of-the-box detection capability of the Wazuh FIM module. This makes it easier to identify and respond to security incidents such as data breaches, insider threats, and other cyberattacks that involve file manipulation or modification. 

This section shows you how to use the fields decoded from FIM events in custom rules. It explains what the decoded FIM events fields represent in the Wazuh alert fields.

Mapping FIM fields to Wazuh alerts
----------------------------------

Fields are information that the Wazuh decoder extracts  from events the Wazuh server receives.  Each event type has specific fields. The decoder identifies them with a field name. The Wazuh server translates these fields into alert fields  and sends them to the Wazuh indexer for storage. 

FIM alerts: fields correspondence
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following table establishes a correspondence between the decoded FIM fields and their equivalent field in an alert.

  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  |  FIM field          | Alert field                            | Field description                                                                      |                                                                                                                                                                         
  +=====================+========================================+========================================================================================+
  | file                | path                                   | File path in the current event                                                         |                                                                                                                                      
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | size                | size_after                             | File size in the current event                                                         |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | hard_links          | hard_links                             | List of hard links of the file                                                         |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | mode                | mode                                   | FIM event mode                                                                         |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | perm                | perm_after,win_perm_after              | File permissions                                                                       |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | uid                 | uid_after                              | User ID of the owner of the file                                                       |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | gid                 | gid_after                              | Group ID of the group that shares ownership of the file                                |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | uname               | uname_after                            | User name of the owner of the file                                                     |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | gname               | gname_after                            | Group name of the group that shares ownership of the file                              |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | md5                 | md5_after                              | MD5 hash of the file in the current event after changes                                |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | sha1                | sha1_after                             | SHA1 hash of the file in the current event after changes                               |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | sha256              | sha256_after                           | SHA256 hash of the file in the current event after changes                             |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | mtime               | mtime_after                            | Timestamp of the file changes                                                          |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | inode               | inode_after                            | Inode of the file in the current event                                                 |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | changed_content     | diff                                   | Reported changes on the file of the current event                                      |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | changed_fields      | changed_attributes                     | Changed fields in the file such as permissions, content, and other related attributes  |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | win_attributes      | attrs_after                            | File attributes such as hidden, read-only, and other related attributes                |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | tag                 | tag                                    | Custom tags to be added to one specific event                                          |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | user_id             | audit.user.id                          | The actual ID of the user that triggered the event                                     |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | user_name           | audit.user.name                        | The actual name of the user that triggered the event                                   |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | group_id            | audit.group.id                         | The actual group ID of the user that triggered the event                               |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | group_name          | audit.group.name                       | The actual group name of the user that triggered the event                             |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | process_name        | audit.process.name                     | The name of the process run by a user that triggered the event                         |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | process_id          | audit.process.id                       | The ID of the process run by a user that triggered the event                           |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | ppid                | audit.process.ppid                     | The parent ID of the process that triggered the event                                  |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | effective_uid       | audit.effective.user_id                | Effective user ID used by the process triggering the event                             |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | effective_name      | audit.effective_user.name              | Effective user name used by the process triggering the event                           |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | parent_name         | audit.process.parent_name              | The process name of the parent of the process triggering the event                     |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | cwd                 | audit.process.cwd                      | Current work directory of the process triggering the event                             |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | parent_cwd          | audit.process.parent_cwd               | Current work directory of the parent process                                           |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | audit_uid           | audit.login_user.id                    | The ID of the user logged in to the system that triggered the event                    |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | audit_name          | audit.login_user.name                  | The name of the user logged in to the system that triggered the event                  |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | arch                | arch                                   | Registry architecture (32 or 64 bits)                                                  |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | value_name          | value_name                             | Registry value name                                                                    |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | value_type          | value_type                             | Registry value type                                                                    |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
  | entry_type          | entry_type                             | Registry entry type                                                                    |                                                                                                                                                                                                     
  +---------------------+----------------------------------------+----------------------------------------------------------------------------------------+
 
Custom FIM rules examples
-------------------------

In the following examples, we demonstrate how you can customize the default FIM rules of Wazuh. You can see how to create custom rules with the decoded FIM fields and what their equivalent Wazuh alert fields are.

Trigger alerts when execute permission is added to a script
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If a script contains malicious code, such as commands to delete or modify important files or data, then the execution of that code might result in serious damage or data loss. Therefore, you have to be careful when granting execute permission to shell scripts, and only do so for scripts that are trusted and thoroughly reviewed.

Wazuh already has an out-of-the-box rule that generates an alert when a file permission is modified. However, in this example, you can see how to create a custom FIM rule to further customize this alert.  

Use case description
~~~~~~~~~~~~~~~~~~~~

  +---------------------+-----------------------------------------------------------------------------------------------+
  | Endpoint            | Description                                                                                   |
  +=====================+===============================================================================================+
  | Ubuntu 20.04        | The FIM module monitors scripts in a directory on this endpoint to detect permission changes. |                                                                                                                               
  +---------------------+-----------------------------------------------------------------------------------------------+


Wazuh server
~~~~~~~~~~~~

Perform the following steps on the Wazuh server.

#. Create a file ``fim_specialdir3.xml`` in the ``/var/ossec/etc/rules/`` directory for the custom rule:

   .. code-block:: console

      # touch /var/ossec/etc/rules/fim_specialdir3.xml

#. Add the following rule definition to ``/var/ossec/etc/rules/fim_specialdir3.xml``. This rule triggers an alert when execute permission is added to a shell script in a monitored directory:

   .. code-block:: xml

      <group name="syscheck">
        <rule id="100002" level="8">
          <if_sid>550</if_sid>
          <field name="file">.sh$</field>
          <field name="changed_fields">^permission$</field>
          <field name="perm" type="pcre2">\w\wx</field>
          <description>Execute permission added to shell script.</description>
          <mitre>
            <id>T1222.002</id>
          </mitre>
        </rule>
      </group>


#. Restart the Wazuh server to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-manager

Ubuntu endpoint
~~~~~~~~~~~~~~~

Perform the following steps to configure the Wazuh FIM module to monitor the ``/specialdir3`` directory.

#. Create the ``/specialdir3`` directory:

   .. code-block:: console

      # mkdir /specialdir3

#. Edit the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file and add the directory for monitoring:

   .. code-block:: xml

      <syscheck>
         <directories realtime="yes">/specialdir3</directories>
      </syscheck>

#. Restart the Wazuh agent to apply the configuration changes:
   
   .. code-block:: console

      # systemctl restart wazuh-agent

Test the configuration
~~~~~~~~~~~~~~~~~~~~~~

#. Create a shell script file ``fim.sh`` in the monitored directory:
   
   .. code-block:: console

      # touch /specialdir3/fim.sh

#. Add execute permission to the script:
   
   .. code-block:: console

      # chmod +x /specialdir3/fim.sh

Visualize the alert
~~~~~~~~~~~~~~~~~~~

Navigate to **File Integrity Monitoring** on the Wazuh dashboard to view the alert generated when the FIM module detects the addition of the execute permission.

.. thumbnail:: ../../../images/manual/fim/visualize-the-alert.png
  :title: Visualize the alert
  :alt: Visualize the alert
  :align: center
  :width: 80%

You can see the alert fields that correspond to the decoded FIM fields in the alert data below:

   .. code-block:: json
      :emphasize-lines: 15,17,18,22
      
      {
        "_index": "wazuh-alerts-4.x-2023.03.02",
        "_type": "_doc",
        "_id": "dJbsooYBhj2oQFX8xGM5",
        "_version": 1,
        "_score": null,
        "_source": {
          "syscheck": {
            "perm_before": "r--r--r--",
            "uname_after": "root",
            "mtime_after": "2023-03-02T17:40:16",
            "size_after": "4",
            "gid_after": "0",
            "mode": "realtime",
            "path": "/specialdir3/fim.sh",
            "sha1_after": "084d24bbed96773031b898def2a3fb8c46134944",
            "changed_attributes": [
              "permission"
            ],
            "gname_after": "root",
            "uid_after": "0",
            "perm_after": "r-xr-xr-x",
            "event": "modified",
            "md5_after": "eb4585ad9fe0426781ed7c49252f8225",
            "sha256_after": "5040625b1fb6fa4af07226683f6e6003b29e5e70b16f8cfb24be7a752393f0ee",
            "inode_after": 1709981
          },
          "input": {
            "type": "log"
          },
          "agent": {
            "ip": "192.168.33.157",
            "name": "Ubuntu20.04",
            "id": "014"
          },
          "manager": {
            "name": "wazuh"
          },
          "rule": {
            "firedtimes": 2,
            "mail": false,
            "level": 8,
            "description": "Execute permission added to shell script.",
            "groups": [
              "syscheck"
            ],
            "mitre": {
              "technique": [
                "Linux and Mac File and Directory Permissions Modification"
              ],
              "id": [
                "T1222.002"
              ],
              "tactic": [
                "Defense Evasion"
              ]
            },
            "id": "100002"
          },
          "location": "syscheck",
          "decoder": {
            "name": "syscheck_integrity_changed"
          },
          "id": "1677770668.1123062",
          "full_log": "File '/specialdir3/fim.sh' modified\nMode: realtime\nChanged attributes: permission\nPermissions changed from 'r--r--r--' to 'r-xr-xr-x'\n",
          "timestamp": "2023-03-02T18:24:28.047+0300"
        },
        "fields": {
          "syscheck.mtime_after": [
            "2023-03-02T17:40:16.000Z"
          ],
          "timestamp": [
            "2023-03-02T15:24:28.047Z"
          ]
        },
        "highlight": {
          "agent.id": [
      }

Trigger file deletion alerts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Deleting a file can result in loss of important data or system files when done accidentally or without authorization. If an attacker gains access to a system and deletes critical files, it can render the system unusable, causing data loss or downtime for the organization.

Wazuh has an out-of-the-box rule that generates an alert when a monitored file is deleted or when a file in a monitored directory is deleted. In this example, we create a custom FIM rule that triggers an alert indicating the user and the application that deleted the file.

Use case description
~~~~~~~~~~~~~~~~~~~~

  +---------------------+-----------------------------------------------------------------------------------------------+
  | Endpoint            | Description                                                                                   |
  +=====================+===============================================================================================+
  | Windows 10          | The FIM module monitors a folder on this endpoint for file deletions.                         |                                                                                                                               
  +---------------------+-----------------------------------------------------------------------------------------------+

Wazuh server
~~~~~~~~~~~~

Perform the following steps on the Wazuh server.

#. Create a file ``fim_win_test.xml`` in the ``/var/ossec/etc/rules/`` directory:

   .. code-block:: console

      # touch /var/ossec/etc/rules/fim_win_test.xml

#. Add the following rule definition to the ``/var/ossec/etc/rules/fim_win_test.xml`` file. This rule triggers alerts when a user deletes files with File Explorer. Replace ``<USER>`` with the username of your Windows endpoint:

   .. code-block:: xml
      :emphasize-lines: 4,5

      <group name="syscheck">
        <rule id="100003" level="8">
          <if_sid>553</if_sid>
          <field name="process_name">explorer.exe$</field>
          <field name="uname"><USER>$</field>
          <match>deleted</match>
          <description>The user "$(uname)" deleted a monitored file with File Explorer</description>
          <mitre>
            <id>T1070.004</id>
            <id>T1485</id>
          </mitre>
        </rule>
      </group>

#. Restart the Wazuh server to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-manager

Windows endpoint
~~~~~~~~~~~~~~~~

Perform the following steps to configure the Wazuh FIM module to monitor file deletion in the ``C:\test`` directory.

#. Create the ``C:\test`` directory on the endpoint:

   .. code-block:: console

      mkdir C:\test 

#. Edit the Wazuh agent ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file of the Wazuh agent. Add the ``C:\test`` directory for monitoring:

   .. code-block:: xml

      <syscheck>
         <directories whodata="yes">C:\test</directories>
      </syscheck>

#. Restart the Wazuh agent using Powershell with administrator privilege to apply the changes:

   .. code-block:: console

      Restart-Service -Name wazuh

Test the configuration
~~~~~~~~~~~~~~~~~~~~~~

#. Create a text file with Notepad and save the file in the ``C:\test`` directory  as ``hello.txt``.

#. Delete the ``hello.txt`` file with Windows File Explorer.

Visualize the alert
~~~~~~~~~~~~~~~~~~~

Navigate to **File Integrity Monitoring** on the Wazuh dashboard to view the alert generated when the FIM module detects the deletion of files in the monitored directory.

.. thumbnail:: ../../../images/manual/fim/deleted-file-alert.png
  :title: Deleted file alert
  :alt: Deleted file alert
  :align: center
  :width: 80%

You can see the alert fields that correspond to the decoded FIM fields in the alert data below:

   .. code-block:: json
      :emphasize-lines: 80,81,82,85,86

      {
        "_index": "wazuh-alerts-4.x-2023.02.13",
        "_type": "_doc",
        "_id": "AJERS4YB6Ki-QqEQBORx",
        "_version": 1,
        "_score": null,
        "_source": {
          "syscheck": {
            "uname_after": "wazuh",
            "mtime_after": "2023-02-13T16:55:18",
            "size_after": "0",
            "win_perm_after": [
              {
                "allowed": [
                  "DELETE",
                  "READ_CONTROL",
                  "WRITE_DAC",
                  "WRITE_OWNER",
                  "SYNCHRONIZE",
                  "READ_DATA",
                  "WRITE_DATA",
                  "APPEND_DATA",
                  "READ_EA",
                  "WRITE_EA",
                  "EXECUTE",
                  "READ_ATTRIBUTES",
                  "WRITE_ATTRIBUTES"
                ],
                "name": "Administrators"
              },
              {
                "allowed": [
                  "DELETE",
                  "READ_CONTROL",
                  "WRITE_DAC",
                  "WRITE_OWNER",
                  "SYNCHRONIZE",
                  "READ_DATA",
                  "WRITE_DATA",
                  "APPEND_DATA",
                  "READ_EA",
                  "WRITE_EA",
                  "EXECUTE",
                  "READ_ATTRIBUTES",
                  "WRITE_ATTRIBUTES"
                ],
                "name": "SYSTEM"
              },
              {
                "allowed": [
                  "READ_CONTROL",
                  "SYNCHRONIZE",
                  "READ_DATA",
                  "READ_EA",
                  "EXECUTE",
                  "READ_ATTRIBUTES"
                ],
                "name": "Users"
              },
              {
                "allowed": [
                  "DELETE",
                  "READ_CONTROL",
                  "SYNCHRONIZE",
                  "READ_DATA",
                  "WRITE_DATA",
                  "APPEND_DATA",
                  "READ_EA",
                  "WRITE_EA",
                  "EXECUTE",
                  "READ_ATTRIBUTES",
                  "WRITE_ATTRIBUTES"
                ],
                "name": "Authenticated Users"
              }
            ],
            "mode": "whodata",
            "path": "c:\\test\\hello.txt",
            "sha1_after": "da39a3ee5e6b4b0d3255bfef95601890afd80709",
            "audit": {
              "process": {
                "name": "C:\\Windows\\explorer.exe",
                "id": "7480"
              },
              "user": {
                "name": "wazuh",
                "id": "S-1-5-21-3321418754-1060537631-2258373948-1002"
              }
            },
            "attrs_after": [
              "ARCHIVE"
            ],
            "uid_after": "S-1-5-21-3321418754-1060537631-2258373948-1002",
            "event": "deleted",
            "md5_after": "d41d8cd98f00b204e9800998ecf8427e",
            "sha256_after": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
          },
          "input": {
            "type": "log"
          },
          "agent": {
            "ip": "192.168.33.129",
            "name": "Windows",
            "id": "010"
          },
          "manager": {
            "name": "wazuh"
          },
          "rule": {
            "firedtimes": 1,
            "mail": false,
            "level": 8,
            "description": "The user \"wazuh\" deleted a monitored file with  File Explorer",
            "groups": [
              "syscheck"
            ],
            "mitre": {
              "technique": [
                "File Deletion",
                "Data Destruction"
              ],
              "id": [
                "T1070.004",
                "T1485"
              ],
              "tactic": [
                "Defense Evasion",
                "Impact"
              ]
            },
            "id": "100003"
          },
          "location": "syscheck",
          "decoder": {
            "name": "syscheck_deleted"
          },
          "id": "1676296648.685388",
          "full_log": "File 'c:\\test\\hello.txt' deleted\nMode: whodata\n",
          "timestamp": "2023-02-13T16:57:28.958+0300"
        },
        "fields": {
          "syscheck.mtime_after": [
            "2023-02-13T16:55:18.000Z"
          ],
          "timestamp": [
            "2023-02-13T13:57:28.958Z"
          ]
        },
      }

Change alert severity for sensitive files
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

With a custom rule, you can alter the level of an FIM alert when detecting changes to a specific file or file pattern. In the following example, the custom rule raises the FIM alert level to *12* when a user or process modifies a critical file. 

Use case description
~~~~~~~~~~~~~~~~~~~~

  +---------------------+---------------------------------------------------------------------------------------------------+
  | Endpoint            | Description                                                                                       |
  +=====================+===================================================================================================+
  | macOS Monterey      | The FIM module monitors a file on this endpoint and raises the alert severity when it’s modified. |                                                                                                                               
  +---------------------+---------------------------------------------------------------------------------------------------+

Wazuh server
~~~~~~~~~~~~

Perform the following steps on the Wazuh server.

#. Create a file ``fim_alert.xml`` in the ``/var/ossec/etc/rules/`` directory on the Wazuh server:

   .. code-block:: console

      # touch /var/ossec/etc/rules/fim_alert.xml

#. Add the following rule definition to the ``/var/ossec/etc/rules/fim_alert.xml`` file. This rule raises the FIM alert level to 12 when a user or process modifies a critical file:

   .. code-block:: xml  
      :emphasize-lines: 2

      <group name="syscheck">
      <rule id="100005" level="12">
        <if_sid>550</if_sid>
        <field name="file">customer_details.rtf</field>
        <match>modified</match>
        <description>Customer details file modified!</description>
      </rule>
      </group>

#. Restart the Wazuh server to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-manager

macOS endpoint
~~~~~~~~~~~~~~

#. Use TextEdit to create a file ``customer_details.rtf``. Then, save it in the ``Documents`` directory.
   
#. Edit the Wazuh agent ``/Library/Ossec/etc/ossec.conf`` configuration file and add the ``customer_details.rtf`` file for monitoring: 

   .. code-block:: xml  

      <syscheck>
        <frequency>300</frequency>
        <directories>/Users/*/Documents/customer_details.rtf</directories>
      </syscheck>

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: console

      /Library/Ossec/bin/wazuh-control restart

Test the configuration
~~~~~~~~~~~~~~~~~~~~~~

#. Add text to the ``customer_details.rtf`` file with TextEdit. Wait for 5 minutes. This is the time configured for the FIM scan.

Visualize the alert
~~~~~~~~~~~~~~~~~~~

Navigate to **File Integrity Monitoring** on the Wazuh dashboard to view the alert. In this example, you can see an alert with a severity of 12 on the Wazuh dashboard when the FIM module detects changes in the monitored file.

.. thumbnail:: ../../../images/manual/fim/severity-of-12-alert.png
  :title: Severity of 12 alert
  :alt: Severity of 12 alert
  :align: center
  :width: 80%