.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section to learn about different advanced settings that can provide greater control and flexibility over how the FIM module works. 
  
Advanced settings
=================

In this section, we describe different advanced settings that can provide greater control and flexibility over how the FIM module works.

.. _who-data-monitoring:

Who-data monitoring
-------------------

The who-data functionality allows the FIM module to obtain information about who made modifications to a monitored file. This information contains the user who made the changes to the monitored files and the program name or process used.

.. _who-data-monitoring-linux:

Who-data monitoring on Linux
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

How it works
~~~~~~~~~~~~

The who-data monitoring functionality uses the Linux Audit subsystem to get information about who makes the changes in a monitored directory. These changes produce audit events. The FIM module processes the audit events and reports them to the Wazuh server. This functionality expands on the ``realtime`` attribute replacing it. This means that ``whodata`` is real-time monitoring with the who-data information added. 

Configuration
~~~~~~~~~~~~~

You need to install the audit daemon if you don’t have it already installed on your endpoint.

.. tabs::

   .. group-tab:: Red Hat-based

      .. code-block:: console

         # yum install audit
      
      For Audit 3.1.1 and later, install the audispd af_unix plugin and restart the Audit service.

      .. code-block:: console

         # yum install audispd-plugins
         # systemctl restart auditd

   .. group-tab:: Debian-based

      .. code-block:: console

         # apt-get install auditd

      For Audit 3.1.1 and later, install the audispd af_unix plugin and restart the Audit service.

      .. code-block:: console

         # apt-get install audispd-plugins
         # systemctl restart auditd

   .. group-tab:: Alpine Linux

      .. code-block:: console

         # apk add audit=3.1.1-r0
         # rc-update add auditd default
         # cp /usr/sbin/audisp-af_unix /sbin/audisp-af_unix
         # rc-service auditd restart

In most systems, auditd includes a rule to skip processing of every audit rule by default. This setting prevents the reporting of any whodata-related information. To ensure that auditd is not `DISABLED BY DEFAULT <https://man7.org/linux/man-pages/man8/auditctl.8.html#DISABLED_BY_DEFAULT>`__, follow these steps.

#. Check the output of this command to find out if the auditd rules include the ``-a never,task`` rule.

   Link to auditd Linux manual: https://man7.org/linux/man-pages/man8/auditctl.8.html#DISABLED_BY_DEFAULT
 
   Check auditd rules:
 
   .. code-block:: console
 
      # auditctl -l | grep task
 
#. If the output displays the ``-a never,task`` rule, add the following filter rule in ``/etc/audit/rules.d/audit.rules``. Make sure to place it before the mentioned rule.
 
   .. code-block:: none
      :emphasize-lines: 1
 
      -a always,task -F exe=‘/var/ossec/bin/wazuh-syscheckd’
      -a never,task
 
#. After that, restart auditd and Wazuh agent to apply the changes:
 
   .. code-block:: console
 
      # systemctl restart auditd
      # systemctl restart wazuh-agent
 
Next, perform the following steps to enable who-data monitoring. In this example, you configure who-data monitoring for the ``/etc/`` directory.

#. Edit the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file and add the configuration below:

   .. code-block:: xml 

      <syscheck>
         <directories check_all="yes" whodata="yes">/etc</directories>
      </syscheck>

#. Once you add this configuration, restart the Wazuh agent to apply the changes. This will add an audit rule for the monitored directory:

   .. code-block:: console

      # systemctl restart wazuh-agent

#. Execute the following command to check if the audit rule for monitoring the selected directory is applied:

   .. code-block:: console

      # auditctl -l | grep wazuh_fim

   From the output, you can see the rule was added:

   .. code-block:: console
      :class: output

      auditctl -w /etc -p wa -k wazuh_fim

   .. note::

      When the Wazuh agent service stops, it removes the rule. You can use the same command to check that it removed the rule successfully. 

Alert fields
~~~~~~~~~~~~

The following table establishes a correspondence between audit fields and their equivalent fields in an alert when who-data is enabled.

  +----------------+---------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | Audit field    | Alert field               | Fields description                                                                                                                                                                                                                            |                                                                                                                                                                         
  +================+===========================+===============================================================================================================================================================================================================================================+
  | User           | audit.user.id             | Contain information about who started the process that modified the monitored file.                                                                                                                                                           |                                                                                                                                      
  |                |                           |                                                                                                                                                                                                                                               |                                                                                                                                      
  |                | audit.user.name           |                                                                                                                                                                                                                                               |                                                                                                                                      
  +----------------+---------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | Login user     | audit.login_user.id       | Contain information about the user who started the session. They correspond respectively to the login UID and login name. Upon login, this ID is assigned to a user and is inherited by every process, even when the user's identity changes. |                                                                                                                                      
  |                |                           |                                                                                                                                                                                                                                               |                                                                                                                                      
  |                | audit.login_user.name     |                                                                                                                                                                                                                                               |                                                                                                                                      
  +----------------+---------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | Effective user | audit.effective_user.id   | Contain the effective ID and name of the user who started the process that modified the monitored file. When a user executes a command using sudo, the effective user ID changes to 0 and the effective user name becomes root.               |                                                                                                                                      
  |                |                           |                                                                                                                                                                                                                                               |                                                                                                                                      
  |                | audit.effective_user.name |                                                                                                                                                                                                                                               |                                                                                                                                      
  +----------------+---------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | Group          | audit.group.id            | Contain the group ID and group name of the user who started the process that modified the monitored file.                                                                                                                                     |                                                                                                                                      
  |                |                           |                                                                                                                                                                                                                                               |                                                                                                                                      
  |                | audit.group.name          |                                                                                                                                                                                                                                               |                                                                                                                                      
  +----------------+---------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | Process ID     | audit.process.id          | Contains the ID of the process used to modify the monitored file.                                                                                                                                                                             |                                                                                                                                      
  +----------------+---------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | Process name   | audit.process.name        | Contains the name of the process used to modify the monitored file.                                                                                                                                                                           |                                                                                                                                      
  +----------------+---------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | Process ppid   | audit.process.ppid        | Contains the parent process ID of the process used to modify the monitored file.                                                                                                                                                              |                                                                                                                                      
  +----------------+---------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Example: Monitor changes in the ``/etc/hosts.allow`` file on Linux
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps to configure the FIM module to get the information about who makes changes to ``/etc/hosts.allow`` file.

#. Edit the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file and add the ``/etc/hosts.allow`` file  for monitoring:

   .. code-block:: xml

      ...
      <syscheck>
        ...
        <directories check_all="yes" whodata="yes" report_changes="yes">/etc/hosts.allow</directories>
        ...
      </syscheck>
      ...

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

Test the configuration
~~~~~~~~~~~~~~~~~~~~~~

#. Create the user ``smith`` on a Linux endpoint:

   .. code-block:: console

      # useradd smith

#. Log out of the Linux endpoint and log in as ``smith``.

#. Add a new IP address, such as ``192.168.32.5`` in ``/etc/hosts.allow`` file on the Linux endpoint.

   .. code-block:: console

      # nano /etc/hosts.allow

Visualize the alert
~~~~~~~~~~~~~~~~~~~

Navigate to **File Integrity Monitoring** on the Wazuh dashboard to view the alert generated when the FIM module detects changes in the monitored file.

.. thumbnail:: ../../../images/manual/fim/fim-detects-changes.png
  :title: FIM detects changes
  :alt: FIM detects changes
  :align: center
  :width: 80%

Expand the alert to view more information. In the alert fields below, you can see the user ``smith`` added a new IP address to the ``/etc/hosts.allow`` file using the ``nano`` text editor with root privileges.

.. thumbnail:: ../../../images/manual/fim/expand-the-alert.png
  :title: Expand the alert
  :alt: Expand the alert
  :align: center
  :width: 80%

Alert in JSON:

   .. code-block:: json
      :emphasize-lines: 9,28,32,33,36,37,40,41        

      {
        "syscheck": {
          "size_before": "411",
          "uname_after": "root",
          "mtime_after": "2023-02-06T18:21:50",
          "size_after": "423",
          "gid_after": "0",
          "md5_before": "d0cfb796d371b0182cd39d589b1c1ce3",
          "diff": "10c10\n< \n---\n> 192.168.32.5\n",
          "sha256_before": "9eadbcd7ec16f4e5961ad2035c0228de7c22b2ba0f6761df63b1b3d9bad9d0a7",
          "mtime_before": "2023-02-06T18:21:33",
          "mode": "whodata",
          "path": "/etc/hosts.allow",
          "sha1_after": "a488ebb6fb615aa58c3cbf2363fd50e6f12b1990",
          "changed_attributes": [
            "size",
            "mtime",
            "md5",
            "sha1",
            "sha256"
          ],
          "gname_after": "root",
          "audit": {
            "process": {
              "parent_name": "/usr/bin/bash",
              "cwd": "/home/smith",
              "parent_cwd": "/home/smith",
              "name": "/usr/bin/nano",
              "id": "18451",
              "ppid": "13824"
            },
            "login_user": {
              "name": "smith",
              "id": "1001"
            },
            "effective_user": {
              "name": "root",
              "id": "0"
            },
            "user": {
              "name": "root",
              "id": "0"
            },
            "group": {
              "name": "root",
              "id": "0"
            }
          },
          "uid_after": "0",
          "perm_after": "rw-r--r--",
          "event": "modified",
          "md5_after": "56bf94e8c0b0ff9c5efb258d85d68bba",
          "sha1_before": "2964c8d9f69c7261de20877392bc7393d471f4ed",
          "sha256_after": "be0f64dc44ddc87f6ba4922e124078071cd65d27d9e25f988d5c9b4c8fa60ca0",
          "inode_after": 263955
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
          "mail": false,
          "level": 7,
          "description": "Integrity checksum changed.",
          "groups": [
            "ossec",
            "syscheck",
            "syscheck_entry_modified",
            "syscheck_file"
          ],
          "nist_800_53": [
            "SI.7"
          ],
          "gdpr": [
            "II_5.1.f"
          ],
          "firedtimes": 171,
          "mitre": {
            "technique": [
              "Stored Data Manipulation"
            ],
            "id": [
              "T1565.001"
            ],
            "tactic": [
              "Impact"
            ]
          },
          "id": "550",
          "gpg13": [
            "4.11"
          ]
        },
        "decoder": {
          "name": "syscheck_integrity_changed"
        },
        "full_log": "File '/etc/hosts.allow' modified\nMode: whodata\nChanged attributes: size,mtime,md5,sha1,sha256\nSize changed from '411' to '423'\nOld modification time was: '1675696893', now it is '1675696910'\nOld md5sum was: 'd0cfb796d371b0182cd39d589b1c1ce3'\nNew md5sum is : '56bf94e8c0b0ff9c5efb258d85d68bba'\nOld sha1sum was: '2964c8d9f69c7261de20877392bc7393d471f4ed'\nNew sha1sum is : 'a488ebb6fb615aa58c3cbf2363fd50e6f12b1990'\nOld sha256sum was: '9eadbcd7ec16f4e5961ad2035c0228de7c22b2ba0f6761df63b1b3d9bad9d0a7'\nNew sha256sum is : 'be0f64dc44ddc87f6ba4922e124078071cd65d27d9e25f988d5c9b4c8fa60ca0'\n",
      }

.. _who-data-monitoring-windows:

Who-data monitoring on Windows
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

How it works
~~~~~~~~~~~~

The who-data monitoring functionality uses the Microsoft Windows auditing subsystem. It gets the related information about who makes modifications in a monitored directory. These changes produce audit events. The FIM module processes these events and reports them to the Wazuh server. This feature is only compatible with Windows operating systems later than Windows Vista.

Configuration
~~~~~~~~~~~~~

To enable the who-data feature, you must declare the tag ``whodata="yes"`` within the directories block in the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file. You need to properly configure the Local Audit Policies and the System Access Control List (SACLs) of each monitored directory. Wazuh automatically performs these configurations for the directory to monitor.

   .. code-block:: xml

      ...
      <syscheck>
        ...
        <directories check_all="yes" whodata="yes">C:\test</directories>
        ...
      </syscheck>
      ...


The FIM module configures the required Local Audit Policies and SACLs when launched. However, other services might change this configuration which would prevent who-data from receiving the monitored events. To overcome this, FIM detects this configuration change and switches all the directories monitoring with who-data to real-time mode. The two available mechanisms to detect these configuration changes are:

#. Wazuh monitors specific events (ID 4719) that Windows generates when one of the Audit Policies is modified (Success removed).

#. Periodically, Wazuh checks that the Audit Policies and the SACLs are configured as expected. You can modify the frequency of this verification with :ref:`windows_audit_interval <reference_ossec_syscheck_windows_audit_interval>`.

If your Windows OS version is later than Windows Vista but the system didn’t automatically configure the audit policies, see the :ref:`manual_configuration_of_the_local_audit_policies_in_windows` guide. 

The following table establishes a correspondence between audit fields and their equivalent fields in an alert when who-data is enabled:

  +---------------------+------------------------+--------------------------------------------------------------------------------------------------+
  | Audit field         | Alert field            | Fields description                                                                               |                                                                                                                                                                                                                                                                                                                                     
  +=====================+========================+==================================================================================================+
  | User                | audit.user.id          | Contain the ID and name of the user who started the process that modified the monitored file.    |                                                                                                                                                                                                                                                                                                 
  |                     | audit.user.name        |                                                                                                  |                                                                                                                                      
  +---------------------+------------------------+--------------------------------------------------------------------------------------------------+
  | Process id          | audit.process.id       | Contain the ID of the process used to modify the monitored file.                                 |                                                                                                                                                                                                                                                                                                 
  +---------------------+------------------------+--------------------------------------------------------------------------------------------------+
  | Process name        | audit.process.name     | Contain the name of the process used to modify the monitored file.                               |                                                                                                                                                                                                                                                                                                 
  +---------------------+------------------------+--------------------------------------------------------------------------------------------------+

Example: Monitor changes in a text file on Windows
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps to configure the FIM module. This configuration gets the information about the user and the process that modified the monitored file.

#. Edit the Wazuh agent ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file and add the ``Documents`` directory for FIM monitoring. The configuration ensures that the FIM module records who-data information and also reports the exact changes made to text files:

   .. code-block:: xml

      <syscheck>
        <directories check_all="yes" whodata="yes" report_changes="yes">C:\Users\*\Documents</directories>
      </syscheck>

#. Restart the Wazuh agent using PowerShell with administrator privileges to apply the changes:

   .. code-block:: console

      Restart-Service -Name wazuh

Test the configuration
~~~~~~~~~~~~~~~~~~~~~~

#. Create a text file ``audit_docu.txt`` in the ``Documents`` folder using Notepad. 

#. Add the text *“Hello”* and save the changes.

Visualize the alert
~~~~~~~~~~~~~~~~~~~

Navigate to **File Integrity Monitoring** on the Wazuh dashboard and find the alert generated when the FIM module detects changes in the monitored directory.

.. thumbnail:: ../../../images/manual/fim/test-the-configuration.png
   :title: Test the configuration
   :alt: Test the configuration
   :align: center
   :width: 80%

Expand the alert with ``rule.id:550`` to view all the information. In the alert fields below, you can see the user ``wazuh`` added the word *“Hello”* to the ``audit_docu.txt`` file using the ``Notepad`` text editor.

.. thumbnail:: ../../../images/manual/fim/expand-the-alert-with-rule.id-550.png
   :title: Expand the alert with rule.id:550
   :alt: Expand the alert with rule.id:550
   :align: center
   :width: 80%

Alert in JSON:

   .. code-block:: json
      :emphasize-lines: 13,73,83,84,87,88        

      {
        "_index": "wazuh-alerts-4.x-2023.04.18",
        "_id": "ZcS6lIcB57JzuUZxyH13",
        "_version": 1,
        "_score": null,
        "_source": {
          "syscheck": {
            "size_before": "0",
            "uname_after": "wazuh",
            "mtime_after": "2023-04-18T17:17:58",
            "size_after": "5",
            "md5_before": "d41d8cd98f00b204e9800998ecf8427e",
            "diff": "---\n> Hello\n",
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
                "name": "SYSTEM"
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
                "name": "wazuh"
              }
            ],
            "sha256_before": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            "mtime_before": "2023-04-18T17:17:54",
            "mode": "whodata",
            "path": "c:\\users\\wazuh\\documents\\audit_docu.txt",
            "sha1_after": "f7ff9e8b7bb2e09b70935a5d785e0cc5d9d0abf0",
            "changed_attributes": [
              "size",
              "mtime",
              "md5",
              "sha1",
              "sha256"
            ],
            "audit": {
              "process": {
                "name": "C:\\Windows\\System32\\notepad.exe",
                "id": "5672"
              },
              "user": {
                "name": "wazuh",
                "id": "S-1-5-21-1189703717-396825564-3703043190-1000"
              }
            },
            "attrs_after": [
              "ARCHIVE"
            ],
            "uid_after": "S-1-5-21-1189703717-396825564-3703043190-1000",
            "event": "modified",
            "md5_after": "8b1a9953c4611296a827abf8c47804d7",
            "sha1_before": "da39a3ee5e6b4b0d3255bfef95601890afd80709",
            "sha256_after": "185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969"
          },
          "input": {
            "type": "log"
          },
          "agent": {
            "ip": "192.168.33.132",
            "name": "Windows10",
            "id": "021"
          },
          "manager": {
            "name": "wazuh"
          },
          "rule": {
            "mail": false,
            "level": 7,
            "pci_dss": [
              "11.5"
            ],
            "hipaa": [
              "164.312.c.1",
              "164.312.c.2"
            ],
            "tsc": [
              "PI1.4",
              "PI1.5",
              "CC6.1",
              "CC6.8",
              "CC7.2",
              "CC7.3"
            ],
            "description": "Integrity checksum changed.",
            "groups": [
              "ossec",
              "syscheck",
              "syscheck_entry_modified",
              "syscheck_file"
            ],
            "nist_800_53": [
              "SI.7"
            ],
            "gdpr": [
              "II_5.1.f"
            ],
            "firedtimes": 2,
            "mitre": {
              "technique": [
                "Stored Data Manipulation"
              ],
              "id": [
                "T1565.001"
              ],
              "tactic": [
                "Impact"
              ]
            },
            "id": "550",
            "gpg13": [
              "4.11"
            ]
          },
          "location": "syscheck",
          "decoder": {
            "name": "syscheck_integrity_changed"
          },
          "id": "1681827479.1689265",
          "full_log": "File 'c:\\users\\wazuh\\documents\\audit_docu.txt' modified\nMode: whodata\nChanged attributes: size,mtime,md5,sha1,sha256\nSize changed from '0' to '5'\nOld modification time was: '1681827474', now it is '1681827478'\nOld md5sum was: 'd41d8cd98f00b204e9800998ecf8427e'\nNew md5sum is : '8b1a9953c4611296a827abf8c47804d7'\nOld sha1sum was: 'da39a3ee5e6b4b0d3255bfef95601890afd80709'\nNew sha1sum is : 'f7ff9e8b7bb2e09b70935a5d785e0cc5d9d0abf0'\nOld sha256sum was: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'\nNew sha256sum is : '185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969'\n",
          "timestamp": "2023-04-18T17:17:59.498+0300"
        },
        "fields": {
          "syscheck.mtime_after": [
            "2023-04-18T17:17:58.000Z"
          ],
          "syscheck.mtime_before": [
            "2023-04-18T17:17:54.000Z"
          ],
          "timestamp": [
            "2023-04-18T14:17:59.498Z"
          ]
        },
      }


.. _manual_configuration_of_the_local_audit_policies_in_windows:

Manual configuration of the Windows Audit Policies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For Windows versions later than Windows Vista and Windows Server 2008, when you monitor a file or directory with the ``whodata`` option, Wazuh automatically configures the Local Audit Policies and the System Access Control List (SACL) for the file or directory. If this is not done automatically or you have an earlier version of Windows such as Windows Vista and Windows Server 2008, you have to manually configure the audit policies and the SACL.

Local Audit Policies in Windows
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To manually configure the audit policies needed to run FIM in who-data mode, you need to activate the logging of successful events. 

On the Run dialog box (**win** + **R**), open the *Local Group Policy Editor* using the following command:

   .. code-block:: console

      gpedit.msc

Configure the **Audit Events** field to **Success** for the following policies:

-  **Computer Configuration > Windows Settings > Security Settings > Advanced Audit Policy Configuration > Object Access > Audit File System**

-  **Computer Configuration > Windows Settings > Security Settings > Advanced Audit Policy Configuration > Object Access > Audit Handle Manipulation**

.. thumbnail:: ../../../images/manual/fim/advanced-audit-policy-configuration-section.png
   :title: Advanced Audit Policy Configuration section
   :alt: Advanced Audit Policy Configuration section
   :align: center
   :width: 80%

If your system doesn't allow configuring subcategories through Advanced Audit Policy Configuration, configure the **Security Setting** field to **Success** for the following policy:

-  **Computer Configuration > Windows Settings > Security Settings > Local Policies > Audit Policy > Audit object access**

.. thumbnail:: ../../../images/manual/fim/audit-policy-section.png
   :title: Audit Policy section
   :alt: Audit Policy section
   :align: center
   :width: 80%

System Access Control List (SACL) in Windows
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A system access control list (SACL) enables administrators to log attempts to access a secured object. You can check and modify SACLs of each monitored directory through **Properties**, selecting the **Security** tab, and clicking on **Advanced**:

.. thumbnail:: /images/manual/fim/click-on-advanced.png
   :title: click on Advanced
   :alt: click on Advanced
   :align: center
   :width: 100%

It's necessary to have a *Success* entry in the Auditing tab:

.. thumbnail:: /images/manual/fim/successful-entry-in-the-auditing-tab.png
   :title: Successful entry in the Auditing tab
   :alt: Successful entry in the Auditing tab
   :align: center
   :width: 100%

If there is no *Success* entry, click on **Add**, to create it with these **advanced permissions**:

.. thumbnail:: /images/manual/fim/click-on-add.png
   :title: Click on Add
   :alt: Click on Add
   :align: center
   :width: 80%

Tuning audit to deal with a flood of who-data events
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

On the Wazuh side, the ``syscheck.rt_delay`` variable in the :ref:`internal FIM configuration <ossec_internal_syscheck>` helps to prevent the loss of events by setting a delay between alerts. You can configure this variable in the ``/var/ossec/etc/internal_options.conf`` file on the Wazuh server. The allowed value for this variable is a numerical value. You must set the delay in milliseconds. To process who-data events faster, decrease this numerical value.

Windows installation directory monitoring
-----------------------------------------

In 64-bit architecture systems, you can locate 32-bit and 64-bit DLLs in a special way.

- ``System32`` is reserved for 64-bit DLLs.
- ``SysWOW64`` is reserved for all 32-bit DLLs.

Furthermore, 32-bit processes running in 64-bit environments access ``System32`` through a virtual folder called ``Sysnative``. 

We disabled this redirection and you can access ``System32`` directly. Monitoring ``%WINDIR%/System32`` and ``%WINDIR%/Sysnative`` directories is equivalent and Wazuh shows the path ``%WINDIR%/System32`` in the alerts. ``SysWOW64`` is a different directory. To monitor ``%WINDIR%/SysWOW64``, you must add it to the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file.

You can monitor the Windows special directories ``%WINDIR%/System32`` and ``%WINDIR%/SysWOW64`` directories by configuring them with any of the FIM modes. For example:

- **Scheduled scan**

   .. code-block:: xml

      <syscheck>
        <directories>%WINDIR%/System32</directories>
        <directories>%WINDIR%/SysWOW64</directories>
      </syscheck>

- **Real-time**

   .. code-block:: xml

      <syscheck>
        <directories realtime="yes">%WINDIR%/System32</directories>
        <directories realtime="yes">%WINDIR%/SysWOW64</directories>
      </syscheck>

- **Who-data**

   .. code-block:: xml

      <syscheck>
        <directories whodata="yes">%WINDIR%/System32</directories>
        <directories whodata="yes">%WINDIR%/SysWOW64</directories>
      </syscheck>

Recursion level
---------------

You can configure the maximum recursion level allowed for a specific directory by using the ``recursion_level`` attribute of the :ref:`directories <reference_ossec_syscheck_directories>`   option. The ``recursion_level`` value must be an integer between 0 and 320.

In the configuration example below, you can see how to set the ``recursion_level`` of the ``folder_test``  directory to 3. Replace ``<FILEPATH_OF_MONITORED_DIRECTORY>`` with your own file paths.

#. Add the following settings to the Wazuh agent configuration file:

   - Linux: ``/var/ossec/etc/ossec.conf``
   - Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   - macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml
      :emphasize-lines: 2

      <syscheck>
         <directories check_all="yes" recursion_level="3"><FILEPATH_OF_MONITORED_DIRECTORY></directories>
      </syscheck>

#. Restart the Wazuh agent with administrator privilege to apply any configuration change:
 
   - Linux: ``systemctl restart wazuh-agent``
   - Windows: ``Restart-Service -Name wazuh``
   - macOS: ``/Library/Ossec/bin/wazuh-control restart``

If you have the following directory structure and the above setting with ``recursion_level="3"``, FIM then generates alerts for ``file_3.txt`` and all files up to ``<FILEPATH_OF_MONITORED_DIRECTORY>/level_1/level_2/level_3/`` but not for any files in the directory deeper than ``level_3``.

   .. code-block:: console
  
      <FILEPATH_OF_MONITORED_DIRECTORY>
      ├── file_0.txt
      └── level_1
          ├── file_1.txt
          └── level_2
              ├── file_2.txt
              └── level_3
                  ├── file_3.txt
                  └── level_4
                      ├── file_4.txt
                      └── level_5
                          └── file_5.txt


To disable the recursion and generate the alerts only for the files in the monitored folder, you need to set the ``recursion_level`` value to ``0``.

If you don’t specify ``recursion_level``, it’s set to 256. This is the default value defined by ``syscheck.default_max_depth`` in the :doc:`internal options </user-manual/reference/internal-options>` configuration file.

Process priority
----------------

To adjust the CPU usage of the FIM module on the monitored endpoint, use the :ref:`process_priority <reference_ossec_syscheck_process_priority>` option in the agent configuration. You can configure process priority on Windows, Linux, and macOS operating systems. 

The process priority scale for the Wazuh FIM module ranges from -20 to 19 for each agent. The default ``process_priority`` value is set to 10. Setting the ``process_priority`` value in an agent higher than the default, gives its FIM module lower priority, fewer CPU resources, and makes it run slower. 

You need to edit the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file to configure the process priority of the Wazuh FIM module. 

In the configuration example below the FIM module of the agent gets the minimum process priority:

#. Add the following settings to the Wazuh agent configuration file:

   - Linux: ``/var/ossec/etc/ossec.conf``
   - Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   - macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <syscheck>
         <process_priority>19</process_priority>
      </syscheck>

#. Restart the Wazuh agent with administrator privilege to apply any configuration change:

   - Linux: ``systemctl restart wazuh-agent``
   - Windows: ``Restart-Service -Name wazuh``
   - macOS: ``/Library/Ossec/bin/wazuh-control restart``

Setting the ``process_priority`` value lower than the default gives the FIM module higher priority, more CPU resources, and makes it run faster. In the configuration example below the  FIM module has the maximum process priority.

#. Add the following settings to the Wazuh agent configuration file:

   - Linux: ``/var/ossec/etc/ossec.conf``
   - Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   - macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <syscheck>
         <process_priority>-20</process_priority>
      </syscheck>

#. Restart the Wazuh agent with administrator privilege to apply any configuration change:
 
   - Linux: ``systemctl restart wazuh-agent``
   - Windows: ``Restart-Service -Name wazuh``
   - macOS: ``/Library/Ossec/bin/wazuh-control restart``

Database storage
----------------

Wazuh uses a SQLite database to store information related to FIM events such as information about creation, modification, and deletion of regular files. When the Wazuh agent starts, the FIM module performs a first scan and generates the database for the agent. By default, the database on the agent is saved on disk to the file ``/var/ossec/queue/fim/db``. 

You can configure the database storage options by using the :ref:`database <reference_ossec_syscheck_database>` attribute. The allowed values for the database attribute are ``disk`` and ``memory``. These storage options are available on Windows, macOS, and Linux operating systems. 

In the configuration example below, we set the database location to memory.

#. Add the following settings to the Wazuh agent configuration file:
      
   - Linux: ``/var/ossec/etc/ossec.conf``
   - Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   - macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <syscheck>
         <database>memory</database>
      </syscheck>

#. Restart the Wazuh agent with administrator privilege to apply any configuration change:

   - Linux: ``systemctl restart wazuh-agent``
   - Windows: ``Restart-Service -Name wazuh``
   - macOS: ``/Library/Ossec/bin/wazuh-control restart``

In the configuration example below, we set the database location to disk.

#. Add the following settings to the Wazuh agent configuration file:

   - Linux: ``/var/ossec/etc/ossec.conf``
   - Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   - macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <syscheck>
         <database>disk</database>
      </syscheck>

#. Restart the Wazuh agent with administrator privilege to apply any configuration change:

   - Linux: ``systemctl restart wazuh-agent``
   - Windows: ``Restart-Service -Name wazuh``
   - macOS: ``/Library/Ossec/bin/wazuh-control restart``

The main advantage of using an in-memory database is the performance, as reading and writing operations are faster than performing them on disk. The corresponding disadvantage is that the memory must be sufficient to store the data.

Synchronization
---------------

The FIM module keeps the Wazuh agent and the Wazuh server databases synchronized with each other through synchronization messages. It always updates the file inventory in the Wazuh server with the data available to the Wazuh agent.

Whenever the Wazuh agent service restarts, the module rebuilds the FIM database of the agent, runs a full scan, and synchronizes the result updating the file inventory in the Wazuh server. The module synchronizes directories monitored with the ``realtime`` or ``whodata`` options immediately, while others require a full scan before synchronization takes place. The module doesn’t report to the Wazuh server changes in the monitored files performed while the service was not running. If you restart the agent after the last scheduled scan, it also discards any event before the restart.

You can see below the default :ref:`synchronization <reference_ossec_syscheck_synchronization>` setting on the ``/var/ossec/etc/ossec.conf`` configuration file:

   .. code-block:: xml

      <syscheck>
        <synchronization>
          <enabled>yes</enabled>
          <interval>5m</interval>
          <max_interval>1h</max_interval>
          <response_timeout>30</response_timeout>
          <queue_size>16384</queue_size>
          <max_eps>10</max_eps>
        </synchronization>
      </syscheck>

The table below explains the supported attributes of the synchronization option:

  +---------------------+----------------------+---------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | Attribute           | Default value        | Allowed values                                                                              | Description                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                     
  +=====================+======================+=============================================================================================+=========================================================================================================================================================================================================+
  | enabled             | yes                  | yes, no                                                                                     | Enables FIM database synchronizations.                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                     
  +---------------------+----------------------+---------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | interval            | 5m                   | Any number greater than or equal to 0. Allowed suffixes (s, m, h, d)                        | Sets the starting number of seconds to wait for a new database synchronization attempt. If synchronization fails the value gets duplicated up to the ``max_interval`` value.                            |                                                                                                                                                                                                                                                                                                                                     
  +---------------------+----------------------+---------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | max_interval        | 1h                   | Any number greater than or equal to the interval. Allowed suffixes (s, m, h, d).            | Specifies the maximum number of seconds to wait between every inventory synchronization attempt.                                                                                                        |                                                                                                                                                                                                                                                                                                                                     
  +---------------------+----------------------+---------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | response_timeout    | 30                   | Any number greater than or equal to 0.                                                      | Specifies the minimum time in seconds that must elapse before considering a message sent to the manager as timed-out. If the agent message times out, the module starts a new synchronization session.  |                                                                                                                                                                                                                                                                                                                                     
  +---------------------+----------------------+---------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | queue_size          | 16384                | Integer number between 2 and 1000000.                                                       | Specifies the queue size of the manager synchronization responses.                                                                                                                                      |                                                                                                                                                                                                                                                                                                                                     
  +---------------------+----------------------+---------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | response_timeout    | 10                   | Integer number between 0 and 1000000. 0 means disabled.                                     | Sets the maximum synchronization message throughput.                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                     
  +---------------------+----------------------+---------------------------------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
