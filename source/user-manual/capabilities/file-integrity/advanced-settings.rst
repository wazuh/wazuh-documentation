.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section to learn about different advanced configuration options that can provide greater control and flexibility over how the FIM module works.

Advanced configuration
======================

This section describes advanced configuration options that provide greater control and flexibility over how the FIM module works.

.. _who-data-monitoring:

Who-data monitoring
---------------------

The who-data functionality lets the FIM module identify who modified a monitored file, capturing the user and the program or process responsible.

.. _file_integrity_advanced_settings_who_data_monitoring_on_linux:

Who-data monitoring on Linux
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh supports two modes for who-data monitoring on Linux endpoints:

-  :ref:`The audit mode <the_audit_mode>`
-  :ref:`The eBPF mode <the_ebpf_mode>`

.. _the_audit_mode:

The audit mode
~~~~~~~~~~~~~~~~

Who-data monitoring in audit mode uses the Linux Audit subsystem to identify who makes changes in a monitored directory. These changes produce audit events, which the FIM module processes and reports to the Wazuh manager. Audit mode extends the :ref:`real-time monitoring <real_time_monitoring>` by adding who-data information.

.. _who_data_audit_requirements:

Requirements
""""""""""""""

Install the audit daemon if you do not already have it on your endpoint.

-  In Red Hat-based systems:

   .. code-block:: console

      # yum install audit

   For audit version 3.1.1 and later, install the ``audispd-plugins`` package, which provides the ``audisp-af_unix`` plugin, and restart the audit service:

   .. code-block:: console

      # yum install audispd-plugins
      # service auditd restart

   If the ``service`` command isn't available, for example on Red Hat Enterprise Linux 9 without the ``initscripts-service`` package, restart the audit service with ``/usr/libexec/initscripts/legacy-actions/auditd/restart`` instead. The audit service refuses ``systemctl restart auditd``.

-  Debian-based systems:

   .. code-block:: console

      # apt-get install auditd

   For audit version 3.1.1 and later, the ``auditd`` package includes the ``audisp-af_unix`` plugin. Restart the audit service:

   .. code-block:: console

      # service auditd restart

Some systems include the default audit rule ``-a never,task``, which stops who-data reporting. Follow these steps to verify that auditing is not disabled. For more information, visit the `manual <https://man7.org/linux/man-pages/man8/auditctl.8.html#DISABLED_BY_DEFAULT>`__ for ``auditctl``.

#. Check the output of this command to find out if the auditd rules include the ``-a never,task`` rule:

   .. code-block:: console

      # auditctl -l | grep task

#. If the output displays the ``-a never,task`` rule, remove it from the ``/etc/audit/rules.d/audit.rules`` audit rules file.

#. Restart auditd and Wazuh agent to apply the changes:

   .. code-block:: console

      # service auditd restart
      # systemctl restart wazuh-agent

Configuration
""""""""""""""""

Perform the following steps to enable who-data monitoring using the audit mode. In this example, we configure who-data monitoring for the ``/etc`` directory.

#. Add the configuration below within the ``<ossec_config>`` block of the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file:

   .. code-block:: xml

      <syscheck>
        <directories check_all="yes" whodata="yes">/etc</directories>
        <whodata>
          <provider>audit</provider>
        </whodata>
      </syscheck>

#. Restart the Wazuh agent to apply the changes. This action adds an audit rule for the monitored directory.

   .. code-block:: console

      # systemctl restart wazuh-agent

#. Execute the following command to check if the audit rule for monitoring the selected directory is applied:

   .. code-block:: console

      # auditctl -l | grep wazuh_fim

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      -w /etc -p wa -k wazuh_fim

   From the output above, you can see the rule was added.

   .. note::

      When the Wazuh agent service stops, it removes the rule. You can use the same command to check that it removed the rule successfully.

Example: Monitor changes in the /etc/hosts.allow file on Linux
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

Perform the following steps to configure the FIM module to get the information about who makes changes to the ``/etc/hosts.allow`` file.

.. rubric:: Configuration

#. Append the configuration below to the ``/var/ossec/etc/ossec.conf`` file to monitor the ``/etc/hosts.allow`` file for changes:

   .. code-block:: xml

      <ossec_config>
        <syscheck>
          <directories check_all="yes" whodata="yes" report_changes="yes">/etc/hosts.allow</directories>
          <whodata>
            <provider>audit</provider>
          </whodata>
        </syscheck>
      </ossec_config>

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

.. rubric:: Test the configuration

#. Create the user ``smith`` on the Linux endpoint and give it sudo privileges. On Debian and Ubuntu, run:

   .. code-block:: console

      # adduser smith
      # usermod -aG sudo smith

   On Red Hat-based systems, run:

   .. code-block:: console

      # adduser smith
      # passwd smith
      # usermod -aG wheel smith

#. Log out of the Linux endpoint and log in as ``smith``.

#. Open the ``/etc/hosts.allow`` file with ``nano``, add a line such as ``ALL: 192.168.32.5``, then save the file and exit the editor.

   .. code-block:: console

      $ sudo nano /etc/hosts.allow

   If the finding shows ``Unable to calculate diff due to no previous data stored for this file.`` instead of the added line, repeat step 3 with another line, such as ``ALL: 192.168.32.6``. The default configuration already monitors ``/etc``, so the FIM module has no stored copy of ``/etc/hosts.allow`` for the first change after the restart. See :ref:`Report changes in file values <report_changes_in_file_values>`.

.. rubric:: Visualize the finding

Navigate to **Endpoint security** > **File Integrity Monitoring** > **Findings** on the Wazuh dashboard to view the finding generated when the monitored file is modified.

.. thumbnail:: /images/manual/fim/monitor-changes-finding.png
  :title: Monitor changes finding
  :alt: Monitor changes finding
  :align: center
  :width: 80%

Expand the finding to view more information. In the finding fields below, you can see that the user ``smith`` added a new IP address to the ``/etc/hosts.allow`` file using the nano text editor with root privileges.

.. thumbnail:: /images/manual/fim/monitor-changes-finding-expanded.png
  :title: Monitor changes finding expanded
  :alt: Monitor changes finding expanded
  :align: center
  :width: 80%

.. _the_ebpf_mode:

The eBPF mode
~~~~~~~~~~~~~~~

Who-data monitoring in eBPF mode extracts FIM events directly from eBPF programs, eliminating the need for external dependencies such as ``auditd``, for faster event extraction.

In eBPF mode, the ``process.name``, ``process.executable``, ``process.parent.name``, and ``process.parent.executable`` fields hold the task name that the Linux kernel keeps for each process, for example, ``bash``. The kernel limits this name to 15 characters and truncates longer program names. To match these fields in rules or searches, use the first 15 characters of the program name. In audit mode, these fields hold the full program name and path.

.. note::

   Who-data monitoring with eBPF requires a kernel that supports the BPF ring buffer and BTF. Upstream kernels support them from version 5.8, and some distributions backport them to older kernels, such as RHEL 8.10 (kernel 4.18). When the agent starts, the FIM module runs a health check of the eBPF provider and uses it only if the health check succeeds.

Configuration
""""""""""""""""

Configuring who-data in eBPF mode requires a ``provider`` option within the ``<whodata>`` tag. The ``<provider>`` tag accepts two values, ``audit`` and ``ebpf``. Use only one provider. If you configure both, the agent uses the last configured provider for every directory with ``whodata="yes"``.

.. note::

   -  If the ``<provider>`` tag is not configured, the FIM module uses the ``audit`` provider by default. To confirm which mode is in use, check the Wazuh agent log file ``/var/ossec/logs/ossec.log``.
   -  When the eBPF provider is configured and the eBPF health check succeeds, the agent logs this message ``(6048): Healthcheck for eBPF FIM whodata module success.``
   -  If the eBPF provider is configured but the health check fails, FIM falls back to the ``audit`` provider. The agent logs this message ``(6959): The eBPF healthcheck has failed. Switching all whodata eBPF configuration to audit.``
   -  If BPF LSM isn't active on the kernel, who-data monitoring keeps working. The Wazuh agent logs a message that starts with ``(6052): BPF LSM is not active``. No action is needed.

A configuration block of who-data in eBPF mode to monitor the ``/home/user/documents`` directory is shown below:

.. code-block:: xml

   <syscheck>
     <directories whodata="yes">/home/user/documents</directories>
     <whodata>
       <provider>ebpf</provider>
     </whodata>
   </syscheck>

Increase the ``queue_size`` of the :ref:`whodata <reference_ossec_syscheck_whodata>` option to handle large bursts of kernel events, such as a mass deletion, without losing events. A larger ``queue_size`` uses more memory on the monitored endpoint.

The configuration below enables who-data in eBPF mode to handle up to 50000 events:

.. code-block:: xml

   <whodata>
     <provider>ebpf</provider>
     <queue_size>50000</queue_size>
   </whodata>

You can learn more about the available configuration options in the :ref:`whodata <reference_ossec_syscheck_whodata>` reference section.

Example: Monitoring changes in configuration files
""""""""""""""""""""""""""""""""""""""""""""""""""""

Monitoring configuration files such as the ``sshd_config`` file on Linux endpoints can help detect unauthorized changes.

Perform the steps below to monitor changes made to the ``/etc/ssh/sshd_config`` configuration file on an Ubuntu endpoint using who-data in eBPF mode.

.. rubric:: Configuration

#. Append the configuration below to the ``/var/ossec/etc/ossec.conf`` configuration file on the Ubuntu endpoint:

   .. code-block:: xml

      <ossec_config>
        <syscheck>
          <directories whodata="yes">/etc/ssh/sshd_config</directories>
          <whodata>
            <provider>ebpf</provider>
            <queue_size>50000</queue_size>
          </whodata>
        </syscheck>
      </ossec_config>

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

.. rubric:: Test the configuration

Log in to the Ubuntu endpoint as a user with sudo privileges and switch to the ``root`` user. Then append a comment line to the ``/etc/ssh/sshd_config`` file. A comment line keeps the file valid for the SSH server:

.. code-block:: console

   $ sudo su -
   # echo "# eBPF test" >> /etc/ssh/sshd_config

.. rubric:: Visualize the finding

Navigate to **Endpoint security** > **File Integrity Monitoring** > **Findings** on the Wazuh dashboard to view the finding generated when the FIM module detects changes in the monitored file.

.. thumbnail:: /images/manual/fim/fim-detects-changes-2.png
  :title: FIM detects changes 2
  :alt: FIM detects changes 2
  :align: center
  :width: 80%

Expand the finding to view more information. In the finding fields below, you can see that the user ``ubuntu`` switched to ``root`` with ``su`` and added a line to the ``/etc/ssh/sshd_config`` file using ``bash``. The ``user.name`` field shows the user who logged in, and ``user.effective.name`` shows ``root``. When you finish the test, remove the line with ``sed -i '/^# eBPF test$/d' /etc/ssh/sshd_config``.

.. thumbnail:: /images/manual/fim/expand-the-finding.png
  :title: Expand the finding
  :alt: Expand the finding
  :align: center
  :width: 80%

Who-data monitoring on Windows
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

How it works
~~~~~~~~~~~~~~

The who-data monitoring functionality uses the Microsoft Windows auditing subsystem to identify who modifies a monitored directory. These changes produce audit events, which the FIM module processes and reports to the Wazuh manager. This feature works on every Windows version that the Wazuh agent supports.

Configuration
~~~~~~~~~~~~~~~

To enable the who-data feature, set the ``whodata`` attribute to ``yes`` in the ``<directories>`` option of the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file. Wazuh automatically configures the Local Audit Policies and System Access Control List (SACL) for each monitored directory.

.. code-block:: xml

   ...
   <syscheck>
     ...
     <directories check_all="yes" whodata="yes">C:\test</directories>
     ...
   </syscheck>
   ...

Other services can change the audit policies and SACLs and stop who-data from receiving events. When FIM detects the change, it switches the affected directories to real-time mode. The Wazuh agent log then shows ``(6021): The SACL of '<DIRECTORY>' has been modified and it is not valid for the real-time Whodata mode``.

Periodically, Wazuh checks that the Audit Policies and the SACLs are configured as expected. You can modify the frequency of this verification with :ref:`windows_audit_interval <reference_ossec_syscheck_windows_audit_interval>`.

If the system doesn't configure the audit policies automatically, configure them manually. See :ref:`Manual configuration of the Windows Audit Policies <manual_configuration_of_the_windows_audit_policies>`.

The following table establishes a correspondence between audit fields and their equivalent Wazuh Common Schema (WCS) fields in a finding when who-data is enabled:

+--------------+--------------------------+------------------------------------------------------------------------------------------------+
| Audit field  | WCS field                | Fields description                                                                             |
+==============+==========================+================================================================================================+
| User         | | ``user.name``          | Contains the name and ID of the user who started the process that modified the monitored       |
|              | | ``user.id``            | file. The ``related.user`` field lists this user and the file owner.                           |
+--------------+--------------------------+------------------------------------------------------------------------------------------------+
| Process id   | ``process.pid``          | Contains the ID of the process used to modify the monitored file.                              |
+--------------+--------------------------+------------------------------------------------------------------------------------------------+
| Process name | ``process.name``         | Contains the name of the process used to modify the monitored file.                            |
+--------------+--------------------------+------------------------------------------------------------------------------------------------+

Example: Monitor changes in a text file on Windows
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Perform the following steps to configure the FIM module to monitor changes to a text file and collect information about the user and process responsible for the changes.

#. Edit the Wazuh agent ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file and add the ``Documents`` directory for FIM monitoring inside the ``<ossec_config>`` block. Replace ``<USER_NAME>`` with the name of the user whose Documents folder you monitor. The configuration enables who-data monitoring for changes to monitored files:

   .. code-block:: xml

      <syscheck>
        <directories check_all="yes" whodata="yes">C:\Users\<USER_NAME>\Documents</directories>
      </syscheck>

#. Restart the Wazuh agent using PowerShell to apply the changes:

   .. code-block:: powershell

      > Restart-Service -Name WazuhSvc

Test the configuration
~~~~~~~~~~~~~~~~~~~~~~~~

#. Sign in to the endpoint as ``<USER_NAME>``. In PowerShell, create the ``audit_docu.txt`` file in the ``Documents`` folder:

   .. code-block:: powershell

      > New-Item -Path "$env:USERPROFILE\Documents\audit_docu.txt" -ItemType File

#. Add the text *Hello* to the file:

   .. code-block:: powershell

      > Add-Content -Path "$env:USERPROFILE\Documents\audit_docu.txt" -Value "Hello"

Visualize the finding
~~~~~~~~~~~~~~~~~~~~~~~

Navigate to **Endpoint security** > **File Integrity Monitoring** > **Findings** on the Wazuh dashboard and find the finding generated when the FIM module detects changes in the monitored directory.

.. thumbnail:: /images/manual/fim/windows-whodata-finding.png
  :title: Windows whodata finding
  :alt: Windows whodata finding
  :align: center
  :width: 80%

Expand the finding to view all the information. In the finding fields below, you can see that the ``test`` user modified the ``audit_docu.txt`` file with PowerShell (powershell.exe).

.. thumbnail:: /images/manual/fim/windows-whodata-finding-expanded.png
  :title: Windows whodata finding expanded
  :alt: Windows whodata finding expanded
  :align: center
  :width: 80%

.. _manual_configuration_of_the_windows_audit_policies:

Manual configuration of the Windows Audit Policies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Use these steps only when the Wazuh agent doesn't set the audit policies and the SACL itself.

Local Audit Policies in Windows
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To manually configure the audit policies needed to run FIM in who-data mode, activate the logging of successful events.

On the Run dialog box (**Win** + **R**), open the *Local Group Policy Editor* using the following command:

.. code-block:: none

   gpedit.msc

Configure the **Audit Events** field to **Success** for the following policies:

#. **Computer Configuration → Windows Settings → Security Settings → Advanced Audit Policy Configuration → Object Access → Audit File System**
#. **Computer Configuration → Windows Settings → Security Settings → Advanced Audit Policy Configuration → Object Access → Audit Handle Manipulation**

   .. thumbnail:: ../../../images/manual/fim/advanced-audit-policy-configuration-section.png
     :title: Advanced Audit Policy Configuration section
     :alt: Advanced Audit Policy Configuration section
     :align: center
     :width: 80%

If your system does not allow configuring subcategories through Advanced Audit Policy Configuration, configure the **Security Setting** field to **Success** for the following policy:

**Computer Configuration → Windows Settings → Security Settings → Local Policies → Audit Policy → Audit object access**

.. thumbnail:: ../../../images/manual/fim/audit-policy-section.png
  :title: Audit Policy section
  :alt: Audit Policy section
  :align: center
  :width: 80%

System Access Control List (SACL) in Windows
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A system access control list (SACL) enables administrators to log attempts to access a secured object. You can check and modify SACLs of each monitored directory through **Properties**, selecting the **Security** tab, and clicking **Advanced**:

.. thumbnail:: /images/manual/fim/click-on-advanced.png
  :title: click on Advanced
  :alt: click on Advanced
  :align: center
  :width: 80%

The **Auditing** tab must have a *Success* entry:

.. thumbnail:: /images/manual/fim/successful-entry-in-the-auditing-tab.png
  :title: Successful entry in the Auditing tab
  :alt: Successful entry in the Auditing tab
  :align: center
  :width: 80%

If there is no *Success* entry, click **Add** to create it with these **advanced permissions**:

.. thumbnail:: /images/manual/fim/click-on-add.png
  :title: Click on Add
  :alt: Click on Add
  :align: center
  :width: 80%

Windows installation directory monitoring
--------------------------------------------

In 64-bit architecture systems, you can specifically locate 32-bit and 64-bit DLLs.

-  ``System32`` is reserved for 64-bit DLLs.
-  ``SysWOW64`` is reserved for all 32-bit DLLs.

Monitoring ``%WINDIR%/System32`` and ``%WINDIR%/Sysnative`` directories is equivalent, and Wazuh shows the path ``%WINDIR%/System32`` in the findings. ``SysWOW64`` is a different directory. To monitor ``%WINDIR%/SysWOW64``, you must add it to the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file.

You can monitor the Windows special directories ``%WINDIR%/System32`` and ``%WINDIR%/SysWOW64`` by configuring them with any of the FIM modes. For example, add ``<directories whodata="yes">%WINDIR%/SysWOW64</directories>`` to monitor SysWOW64 in who-data mode.

.. _recursion_level_directories:

Recursion level
------------------

You can configure the maximum recursion level allowed for a specific directory by using the ``recursion_level`` option of the ``directories`` option. The ``recursion_level`` value must be an integer between 0 and 320.

The following configuration example sets the ``recursion_level`` of the monitored directory to 3. Replace ``<FILEPATH_OF_MONITORED_DIRECTORY>`` with your own file paths.

#. Add the following settings inside the ``<ossec_config>`` block of the Wazuh agent configuration file:

   -  Linux: ``/var/ossec/etc/ossec.conf``
   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   -  macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <syscheck>
        <directories check_all="yes" recursion_level="3"><FILEPATH_OF_MONITORED_DIRECTORY></directories>
      </syscheck>

#. Restart the Wazuh agent to apply any configuration change:

   -  Linux: ``systemctl restart wazuh-agent``
   -  Windows: ``Restart-Service -Name WazuhSvc``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``

If you have the following directory structure and the above setting with ``recursion_level="3"``, FIM then generates findings for ``file_3.txt`` and all files up to ``<FILEPATH_OF_MONITORED_DIRECTORY>/level_1/level_2/level_3/``, but not for any files in the directory deeper than ``level_3``.

.. code-block:: none

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

To disable the recursion and generate the findings only for the files in the monitored folder, you need to set the ``recursion_level`` value to ``0``.

If you don't set ``recursion_level``, the FIM module uses ``256``.

Process priority
-------------------

To adjust the CPU usage of the FIM module on a monitored endpoint, use the ``process_priority`` option in the agent configuration. This works on Windows, Linux, and macOS.

The process priority scale for the Wazuh FIM module ranges from -20 to 19 for each Wazuh agent. The default ``process_priority`` value is set to 10. Increasing this value lowers the priority of the FIM process, reducing its access to CPU resources and potentially slowing its execution.

You need to edit the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file to configure the process priority of the Wazuh FIM module.

In the configuration example below, the FIM module on the Wazuh agent is set to run with the minimum process priority:

#. Add the following settings inside the ``<ossec_config>`` block of the Wazuh agent configuration file:

   -  Linux: ``/var/ossec/etc/ossec.conf``
   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   -  macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <syscheck>
        <process_priority>19</process_priority>
      </syscheck>

#. Restart the Wazuh agent to apply any configuration change:

   -  Linux: ``systemctl restart wazuh-agent``
   -  Windows: ``Restart-Service -Name WazuhSvc``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``

To check the value on Linux, run ``ps -eLo pid,tid,ni,comm | grep wazuh-syscheckd``. The NI column shows the configured value on the ``wazuh-syscheckd`` threads that run the scans.

Setting the ``process_priority`` value lower than the default gives the FIM module higher priority, more CPU resources, and makes it run faster.

Database storage
-------------------

Wazuh uses a SQLite database to store information about FIM events, such as the creation, modification, and deletion of regular files. When the Wazuh agent starts, the FIM module performs a first scan and generates the agent's database. The Wazuh agent saves this database to disk at ``/var/ossec/queue/fim/db`` on Linux, ``C:\Program Files (x86)\ossec-agent\queue\fim\db`` on Windows, and ``/Library/Ossec/queue/fim/db`` on macOS.

The location is fixed. The ``database`` option of earlier versions is deprecated and has no effect. The Wazuh agent logs a warning when it finds it: ``The <database> option is deprecated and no longer has any effect.``

Synchronization
-------------------

The Wazuh agent synchronizes the state of monitored files with the Wazuh manager at regular intervals, so the **Inventory** tab stays up to date. If the Wazuh agent is offline, it synchronizes the changes when it reconnects.

You can see below the default ``synchronization`` setting on the ``/var/ossec/etc/ossec.conf`` configuration file:

.. code-block:: xml

   <syscheck>
     <synchronization>
       <enabled>yes</enabled>
       <interval>5m</interval>
       <integrity_interval>24h</integrity_interval>
     </synchronization>
   </syscheck>

The table below explains the supported attributes of the synchronization option:

+------------------------+-------------------+----------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Attribute              | Default value     | Allowed values                                                       | Description                                                                                                                                                                                                                                                                           |
+========================+===================+======================================================================+=======================================================================================================================================================================================================================================================================================+
| ``enabled``            | ``yes``           | yes, no                                                              | Enable or disable FIM synchronization.                                                                                                                                                                                                                                                |
+------------------------+-------------------+----------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``interval``           | ``5m``            | Any number greater than or equal to 1. Allowed suffixes (s, m, h, d) | Specifies how often the agent initiates a sync with the manager.                                                                                                                                                                                                                      |
+------------------------+-------------------+----------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``integrity_interval`` | ``24h``           | Any number greater than or equal to 1. Allowed suffixes (s, m, h, d) | Specifies how often the agent performs a full integrity validation by comparing checksums with the manager.                                                                                                                                                                           |
+------------------------+-------------------+----------------------------------------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
