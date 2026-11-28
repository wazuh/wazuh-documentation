.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh FIM module scans the Windows Registry periodically and triggers a finding when it detects changes in the entries. Learn more about it in this section.

Windows Registry monitoring
===========================

The Windows Registry is a vital part of the Windows operating system. It is a database that stores configuration information for programs and hardware installed on Microsoft Windows operating systems. When you install a program, Windows creates a new subkey in the registry. This subkey contains information such as the program location, version, and startup instructions.

An unauthorized or unexpected change to the registry might result in system instability, application failures, and security breaches. Attackers might modify registry keys to execute malicious code or to maintain persistence on the system.

The Wazuh FIM module scans the Windows Registry periodically and triggers a finding when it detects changes in the entries.

How it works
------------

The FIM module stores checksums and other attributes of monitored Windows Registry entries in a dedicated database on the endpoint. During scans, it compares current values against previously stored ones to identify changes, then reports them to the Wazuh manager, which processes and forwards them to the Wazuh indexer. If an event matches a detection rule, Wazuh generates a security finding.

The Wazuh agent also synchronizes the current state of the monitored Windows Registry entries with the Wazuh manager, which stores it in the ``wazuh-states-fim-registry-keys`` and ``wazuh-states-fim-registry-values`` indices of the Wazuh indexer.

.. thumbnail:: /images/manual/fim/registry-how-it-works.png
  :title: Registry how it works
  :alt: Registry how it works
  :align: center
  :width: 80%

Configuration
-------------

To configure the FIM module, specify the registry keys that FIM must monitor for creation, modification, and deletion. You can do this similarly to how you list directories and files, but using the ``<windows_registry>`` option instead. By default, the FIM module monitors the 32-bit registry view. Keys under ``HKEY_LOCAL_MACHINE\SOFTWARE`` have a separate 64-bit view, so add ``arch="64bit"`` or ``arch="both"`` to monitor them.

You can modify the default FIM configuration on the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file of the Wazuh agent to specify the Windows Registry keys to monitor. You can also configure this capability remotely by using centralized configuration.

You can find a list of all the supported attributes and options in the :ref:`windows_registry <reference_ossec_syscheck_windows_registry>` section of the documentation.

Record Windows Registry attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can specify the Windows Registry keys to monitor using the ``windows_registry`` option. This option supports several attributes. This section explains the following attributes.

-  ``check_all``: The allowed values for the ``check_all`` option are ``yes`` and ``no``. This option is enabled by default. Records:

   -  Value size
   -  Value type
   -  Owner, group, and permissions of the key
   -  Last modification date
   -  MD5, SHA-1, and SHA-256 hash sums

-  ``check_sum``: Records the MD5, SHA-1, and SHA-256 hashes of the Windows Registry values. The allowed values for the ``check_sum`` option are ``yes`` and ``no``. This option is enabled by default.
-  ``check_mtime``: The ``check_mtime`` option allows the FIM module to record the modification time of the Windows Registry keys and values. The allowed values for the ``check_mtime`` option are ``yes`` and ``no``. This option is enabled by default.

The following example shows how to configure different attribute checks for monitored Windows Registry keys:

-  Record the last modification date and all the hashes of the ``HKEY_LOCAL_MACHINE\Software\Classes\batfile\TestKey1`` registry key.
-  Disable the recording of hashes (MD5, SHA-1, and SHA-256) of the ``HKEY_LOCAL_MACHINE\Software\Classes\batfile\TestKey2`` registry key.
-  Disable the recording of the modification time of the ``HKEY_LOCAL_MACHINE\Software\Classes\batfile\TestKey3`` registry key.

Before you start, create the three test keys with one value each. Run this command in PowerShell as an administrator:

.. code-block:: powershell

   > 'TestKey1','TestKey2','TestKey3' | ForEach-Object { New-Item -Path "HKLM:\Software\Classes\batfile\$_" -Force; New-ItemProperty -Path "HKLM:\Software\Classes\batfile\$_" -Name Test -Value test -Force }

.. thumbnail:: /images/manual/fim/registry-keys-inventory.png
   :title: Registry keys inventory
   :alt: Registry keys tab of the FIM inventory listing the three test keys
   :align: center
   :width: 80%

.. thumbnail:: /images/manual/fim/registry-values-inventory.png
   :title: Registry values inventory
   :alt: Registry values tab of the FIM inventory listing the test values
   :align: center
   :width: 80%

#. Edit the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file and add the following settings inside the ``<ossec_config>`` block:

   .. code-block:: xml

      <syscheck>
        <windows_registry>HKEY_LOCAL_MACHINE\Software\Classes\batfile\TestKey1</windows_registry>
        <windows_registry check_sum="no">HKEY_LOCAL_MACHINE\Software\Classes\batfile\TestKey2</windows_registry>
        <windows_registry check_mtime="no">HKEY_LOCAL_MACHINE\Software\Classes\batfile\TestKey3</windows_registry>
      </syscheck>

#. Restart the Wazuh agent using PowerShell to apply the changes:

   .. code-block:: powershell

      > Restart-Service -Name WazuhSvc

After you restart the Wazuh agent in step 2, the three keys and their values appear in **Endpoint security** > **File Integrity Monitoring** > **Inventory**, on the **Registry keys** and **Registry values** tabs.

.. _recursion_level_windows_registry:

Recursion level
^^^^^^^^^^^^^^^

You can configure the maximum recursion level allowed for a Windows Registry entity with the ``recursion_level`` option of the ``windows_registry`` option. The allowed values for this option are any integer between 0 and 512.

Follow these steps to set the ``recursion_level`` of ``HKEY_LOCAL_MACHINE\SYSTEM\Setup`` to 3.

#. Edit the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file and add the configuration below inside the ``<ossec_config>`` block:

   .. code-block:: xml

      <syscheck>
        <windows_registry recursion_level="3">HKEY_LOCAL_MACHINE\SYSTEM\Setup</windows_registry>
      </syscheck>

#. After setting the recursion level, restart the Wazuh agent to apply the configuration:

   .. code-block:: powershell

      > Restart-Service -Name WazuhSvc

When using the following registry structure and ``recursion_level="3"``, FIM generates findings for the keys down to ``level_3``, which include ``Subkey_0``, ``Subkey_1``, and ``Subkey_2``, and for the values they contain. It doesn't generate findings for ``Subkey_3``, ``level_4``, or any key below them, because they are four levels below ``HKEY_LOCAL_MACHINE\SYSTEM\Setup``. Each subkey counts as a level, like a directory. Values work like files: FIM reports the values in ``level_3``, but not the subkeys inside it.

.. code-block:: none

   HKEY_LOCAL_MACHINE\SYSTEM\Setup
   ├── Subkey_0
   └── level_1
       ├── Subkey_1
       └── level_2
           ├── Subkey_2
           └── level_3
               ├── Subkey_3
               └── level_4
                   ├── Subkey_4
                   └── level_5
                       └── Subkey_5

To disable the recursion and generate findings only for the registry values in the monitored registry, you need to set the ``recursion_level`` value to 0.

If you don't set ``recursion_level``, the FIM module uses ``512`` for Windows Registry entries.

.. _reporting-changes-in-registry-values:

Reporting changes in registry values
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To report the exact content changed in a Windows Registry value, you can configure the FIM module with the ``report_changes`` option of the ``windows_registry`` option. The allowed values are ``yes`` and ``no``, and the supported registry value types are:

-  ``REG_SZ``
-  ``REG_EXPAND_SZ``
-  ``REG_MULTI_SZ``
-  ``REG_DWORD``
-  ``REG_DWORD_BIG_ENDIAN``
-  ``REG_QWORD``

You must use the ``report_changes`` option with caution. Wazuh copies the data of every monitored registry value to the ``C:\Program Files (x86)\ossec-agent\queue\diff\registry`` folder, and this increases storage usage.

Follow these steps to configure the FIM module to report changes made to ``HKEY_LOCAL_MACHINE\SYSTEM\Setup`` key.

#. Open Registry Editor, create a subkey named ``Custom Key`` under the ``HKEY_LOCAL_MACHINE\SYSTEM\Setup`` registry key, and add a string value named ``FIM`` with the data ``cmd``.

   .. thumbnail:: /images/manual/fim/create-custom-key.png
      :title: Create custom key
      :alt: Create custom key
      :align: center
      :width: 80%

#. Edit the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file and add the configuration below inside the ``<ossec_config>`` block:

   .. code-block:: xml

      <syscheck>
        <frequency>300</frequency>
        <windows_registry report_changes="yes">HKEY_LOCAL_MACHINE\SYSTEM\Setup</windows_registry>
      </syscheck>

   .. note::

      The ``<frequency>`` option is a global setting that defines the scan interval for all registry keys monitored in scheduled mode.

#. Restart the Wazuh agent to apply the configuration:

   .. code-block:: powershell

      > Restart-Service -Name WazuhSvc

#. Change the data of the ``FIM`` string value in the ``Custom Key`` subkey from ``cmd`` to ``powershell``. FIM reports the content of changed values only, not of new values.

   .. thumbnail:: /images/manual/fim/modify-custom-key.png
      :title: Add new string value and data
      :alt: Add new string value and data
      :align: center
      :width: 80%

#. Wait for *5* minutes, which is the time configured for the FIM scan.

Navigate to **Endpoint security** > **File Integrity Monitoring** > **Findings** on the Wazuh dashboard to view the finding generated when the FIM module detects a modification of the monitored registry value.

.. thumbnail:: /images/manual/fim/modification-of-the-monitored-registry-value.png
   :title: Modification of the monitored registry value
   :alt: Modification of the monitored registry value
   :align: center
   :width: 80%

Expand the finding. The ``event.reason`` field lists the changed attributes, and the ``content_changes`` entry in the ``event.original`` field shows the old and new data of the value.

.. thumbnail:: /images/manual/fim/changed-fields-expanded-alert.png
   :title: Changed fields expanded finding
   :alt: Changed fields expanded finding
   :align: center
   :width: 80%

Adding exclusions
^^^^^^^^^^^^^^^^^

You can configure the FIM module to ignore certain Windows Registry keys with the ``registry_ignore`` option. Each line excludes one entry. Add a line for each entry.

Follow these steps to configure the FIM module to ignore the ``HKEY_LOCAL_MACHINE\Security\Policy`` and any Windows Registry entry that matches the simple regex pattern ``\Enum$`` from FIM results.

#. Add this configuration to the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file of the Wazuh agent inside the ``<ossec_config>`` block:

   .. code-block:: xml

      <syscheck>
        <registry_ignore>HKEY_LOCAL_MACHINE\Security\Policy</registry_ignore>
        <registry_ignore type="sregex">\Enum$</registry_ignore>
      </syscheck>

#. Restart the Wazuh agent to apply the configuration:

   .. code-block:: powershell

      > Restart-Service -Name WazuhSvc

Use case: Detect malware persistence in Windows Registry
--------------------------------------------------------

Malware persistence in the Windows Registry is a technique attackers use to ensure their malicious program runs every time the system starts or restarts. The malicious program is commonly added to the "``Run``" and "``RunOnce``" keys in the Registry.

With the Wazuh FIM module, you can detect suspicious or unknown programs added to the startup registry keys and remove them before they cause harm to your system.

Use case description
^^^^^^^^^^^^^^^^^^^^

+----------------+-----------------------------------------------------------------+
| Endpoint       | Description                                                     |
+================+=================================================================+
| **Windows 11** | The FIM module monitors startup registry keys on this endpoint. |
+----------------+-----------------------------------------------------------------+

Configuration
^^^^^^^^^^^^^

Wazuh monitors the startup registry keys by default, without requiring any special user action or configuration. The FIM module's default scan frequency is ``43200`` seconds (12 hours), so changes to these keys may not appear as a finding for up to 12 hours.

In the default ``<syscheck>`` block of the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` file, change the ``<frequency>`` value from ``43200`` to ``300`` to scan every 5 minutes for this use case. The default ``<syscheck>`` block already monitors the ``Run`` and ``RunOnce`` keys with ``arch="both"``, so you change only the frequency. The ``<frequency>`` option is global, so the FIM module also scans the monitored directories every 5 minutes. The ``arch`` attribute sets the registry view to monitor: ``32bit`` (default), ``64bit``, or ``both``.

Restart the Wazuh agent using PowerShell to apply the changes:

.. code-block:: powershell

   > Restart-Service -Name WazuhSvc

Test the configuration
^^^^^^^^^^^^^^^^^^^^^^

.. note::

   You must carry this out in a sandbox environment. After the test, delete the ``DemoValue`` value from the ``Run`` and ``RunOnce`` keys. Don't delete the keys.

#. Open Registry Editor, then add the string value name ``DemoValue`` and registry value data ``cmd`` to the ``HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Run`` key.

   .. thumbnail:: /images/manual/fim/add-to-run-key.png
      :title: Add string value and data
      :alt: Add string value and data
      :align: center
      :width: 80%

#. Open Registry Editor, then add the string value name ``DemoValue`` and registry value data ``cmd`` to the ``HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\RunOnce`` registry key.

   .. thumbnail:: /images/manual/fim/add-to-run-once-key.png
      :title: Add string value and data 2
      :alt: Add string value and data 2
      :align: center
      :width: 80%

#. Wait for 5 minutes, which is the time configured for the FIM scan.

Visualize the finding
^^^^^^^^^^^^^^^^^^^^^

Navigate to **Endpoint security** > **File Integrity Monitoring** > **Findings** on the Wazuh dashboard to view the finding generated when the FIM module detects changes in the Windows startup registries. Wazuh generates a ``Wazuh FIM - Registry created`` finding for each new value, such as ``Wazuh FIM - Registry created - HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Run\DemoValue``, and a ``Wazuh FIM - Registry modified`` finding for each key that changed. The ``registry.path`` field shows the key path and the value name.

.. thumbnail:: /images/manual/fim/changed-windows-startup-registries.png
   :title: Changes in the Windows startup registries
   :alt: Changes in the Windows startup registries
   :align: center
   :width: 80%
