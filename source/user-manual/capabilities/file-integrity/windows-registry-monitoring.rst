.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh FIM module scans the Windows Registry periodically and triggers an alert when it detects changes in the entries. Learn more about it in this section.

Windows Registry monitoring
===========================

The Windows Registry is a vital part of the Windows operating system. It’s a database that stores configuration information for programs and hardware installed on Microsoft Windows operating systems. When you install a program, Windows creates a new subkey in the registry. This subkey contains information such as the program location, version, and startup instructions.

An unauthorized or unexpected change to the registry might result in system instability, application failures, and security breaches. Attackers might modify registry keys to execute malicious code or to maintain persistence on the system. In addition, legitimate software and system updates might also modify the registry. It's essential to track these changes to ensure system stability and security.

The Wazuh FIM module scans the Windows Registry periodically and triggers an alert when it detects changes in the entries.

How it works
------------

The FIM module runs periodic scans of monitored Windows Registry entries and stores their checksums and other attributes in a local FIM database. You can specify which registry entries to monitor in the configuration of the Wazuh agent.

Upon a scan, the Wazuh agent reports any changes the FIM module finds in the monitored registry entries to the Wazuh server. The FIM module looks for file modifications by comparing the checksums of a registry entry to its stored checksums and attribute values. It generates an alert if it finds discrepancies.

The Wazuh FIM module uses two databases to collect FIM event data, such as registry entry creation, modification, and deletion data. One is a local SQLite-based database on the monitored endpoint that stores the data in  ``C:\Program Files (x86)\ossec-agent\queue\fim\db``. The other is an agent database on the Wazuh server stored at ``/var/ossec/queue/db``.

.. thumbnail:: /images/manual/fim/synchronization-diagram.png
  :title: Synchronization diagram
  :alt: Synchronization diagram
  :align: center
  :width: 80%

The FIM module synchronization mechanism ensures synchronization between the Wazuh agent and the Wazuh server databases. It always updates the file inventory in the Wazuh server with the data available to  the Wazuh agent. This allows for servicing FIM-related API queries regarding the Wazuh agents.

Configuration
-------------

To configure the FIM module, it’s necessary to specify the registry keys that FIM must monitor for creation, modification, and deletion. You can do  this similarly to how you list directories and files, but using the label ``<windows_registry>`` instead.

You can modify the :ref:`default FIM configuration <reference_ossec_syscheck_default_configuration>` on the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file of the  Wazuh agent to specify the Windows Registry keys to monitor. You can also configure this capability remotely by using :ref:`centralized configuration <reference_agent_conf>`.

.. versionadded:: 4.6.0

You can use ``*`` and ``?`` wildcards when configuring Windows registry keys. Use them in the same way you would in a shell or Windows command prompt (cmd) terminal for listing files. For example:

.. code-block:: xml

   <syscheck>
     <windows_registry arch="both">HKEY_LOCAL_MACHINE\SOFTWARE\*</windows_registry>
     <windows_registry arch="both">HKEY_CURRENT_CONFIG\S?????</windows_registry>
     <windows_registry arch="both">HKEY_USERS\S-?-?-??\*</windows_registry>
   </syscheck>

.. note::

   Registry keys matching your configuration might be created after the initial FIM scan. Wazuh scans these new keys only in the next scheduled FIM scan.

The FIM module supports several configuration options for monitoring Windows Registry entries. For example, you can enable all the basic checks with the ``check_all`` attribute, or find the information about the specific change made to a registry entry with the ``report_changes`` attribute. You can find a list of all the supported attributes and options in the :ref:`windows_registry <reference_ossec_syscheck_windows_registry>` section of the documentation.

In this guide, you can see different configuration options that you can apply to monitor the Windows Registry.

Record Windows Registry attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can specify the Windows Registry keys to monitor using the :ref:`windows_registry <reference_ossec_syscheck_windows_registry>` option. This option supports several attributes. This section explains the following attributes.

- ``check_all``: The allowed values for the ``check_all`` attribute are ``yes`` and ``no``. This option is enabled by default. Records:

   - File size
   - Last modification date
   - MD5, SHA1, and SHA256 hash sums

- ``check_sum``:  Records the MD5, SHA1, and SHA256 hashes of the Windows Registry values. The allowed values for the ``check_sum`` attribute are ``yes`` and ``no``.
- ``check_mtime``: The ``check_mtime`` attribute allows the FIM module to record the modification time of the Windows Registry keys and values. The allowed values for the ``check_mtime`` attribute are ``yes`` and ``no``.

Follow these steps to configure the FIM module with the following settings:

- Record last modification date and all the file hashes of the ``HKEY_LOCAL_MACHINE\Software\Classes\batfile\TestKey1`` registry key.
- Disable the recording of file hashes (MD5, SHA1, and SHA256) of the ``HKEY_LOCAL_MACHINE\Software\Classes\batfile\TestKey2`` registry key.
- Disable the recording of the modification time of the ``HKEY_LOCAL_MACHINE\Software\Classes\batfile\TestKey3`` registry key.

#. Edit the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file:

   .. code-block:: xml

      <syscheck>
        <windows_registry>HKEY_LOCAL_MACHINE\Software\Classes\batfile\TestKey1</windows_registry>
        <windows_registry check_sum="no">HKEY_LOCAL_MACHINE\Software\Classes\batfile\TestKey2</windows_registry>
        <windows_registry check_mtime="no">HKEY_LOCAL_MACHINE\Software\Classes\batfile\TestKey3</windows_registry>
      </syscheck>

#. After configuring these attributes, restart the Wazuh agent using PowerShell with administrator privileges to apply the changes:

   .. code-block:: console

      Restart-Service -Name wazuh

Recursion level
^^^^^^^^^^^^^^^

You can configure the maximum recursion level allowed for a Windows Registry entity  with the ``recursion_level`` attribute of the :ref:`windows_registry <reference_ossec_syscheck_windows_registry>` option. The allowed values for this attribute are any integer between 0 and 512.

Follow these steps to set the ``recursion_level`` of ``HKEY_LOCAL_MACHINE\SYSTEM\Setup`` to 3.

#. Edit the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file and add the configuration below:

   .. code-block:: xml

      <syscheck>
        <windows_registry recursion_level="3">HKEY_LOCAL_MACHINE\SYSTEM\Setup</windows_registry>
      </syscheck>

#. After setting the recursion level, restart the Wazuh agent to apply the configuration:

   .. code-block:: console

      Restart-Service -Name wazuh

When using the following registry structure and ``recursion_level="3"``, FIM generates alerts for ``Subkey_3`` and all registry subkeys or values up to ``HKEY_LOCAL_MACHINE\SYSTEM\Setup\level_1\level_2\level_3\`` but not for any registry subkeys or values deeper than ``level_3``.

   .. code-block:: console

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

To disable the recursion and generate alerts only for the registry values in the monitored registry, you need to set the ``recursion_level`` value to 0.

If you don’t specify a value for ``recursion_level``, it’s set to the default value defined by ``syscheck.default_max_depth`` in the :ref:`internal options <reference_internal_options>` configuration file.

.. _reporting-changes-in-registry-values:

Reporting changes in registry values
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To report the exact content changed in a Windows Registry value, you can configure the FIM module with the ``report_changes`` attribute of the :ref:`windows_registry <reference_ossec_syscheck_windows_registry>` option. The allowed values are ``yes`` and ``no`` and the supported registry value types are:

- ``REG_SZ``
- ``REG_MULTI_SZ``
- ``REG_DWORD``
- ``REG_DWORD_BIG_ENDIAN``

You must use the ``report_changes`` attribute with caution. Wazuh copies every single monitored file to a ``C:\Program Files (x86)\ossec-agent\queue\diff\registry`` and this increases storage usage.

Follow these steps to configure the FIM module to report changes made to ``HKEY_LOCAL_MACHINE\SYSTEM\Setup`` key.

#. Create a subkey ``Custom Key`` under the ``HKEY_LOCAL_MACHINE\SYSTEM\Setup`` registry key.

#. Edit the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file and add the configuration below:

   .. code-block:: xml

      <syscheck>
        <frequency>300</frequency>
        <windows_registry  report_changes="yes">HKEY_LOCAL_MACHINE\SYSTEM\Setup</windows_registry>
      </syscheck>

#. Restart the Wazuh agent to apply the configuration:

   .. code-block:: console

      Restart-Service -Name wazuh

#. Modify the ``Custom Key`` subkey and add a new string value ``FIM`` and data ``cmd``.

#. Wait for 5 minutes which is the time configured for the FIM scan.

Navigate to **Modules > Integrity monitoring** on the Wazuh dashboard to view the alert generated when the FIM module detects a modification of the monitored registry value.

.. thumbnail:: /images/manual/fim/modification-of-the-monitored-registry-value.png
  :title: Modification of the monitored registry value
  :alt: Modification of the monitored registry value
  :align: center
  :width: 80%

Expand the alert to see the changed fields.

.. thumbnail:: /images/manual/fim/changed-fields-expanded-alert.png
  :title: Changed fields expanded alert
  :alt: Changed fields expanded alert
  :align: center
  :width: 80%

Adding exclusions
^^^^^^^^^^^^^^^^^

You can configure the FIM module to ignore certain Windows Registry keys with the :ref:`registry_ignore <reference_ossec_syscheck_registry_ignore>` option. It allows declaring only a single Windows Registry entry. However, you can specify multiple lines to declare multiple registry entries.

Follow these steps to configure the FIM module to ignore the ``HKEY_LOCAL_MACHINE\Security\Policy`` and any Windows Registry entry that matches the simple regex pattern ``\Enum$`` from FIM results.

#. Add this configuration to the ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file of the Wazuh agent:

   .. code-block:: xml

      <syscheck>
        <registry_ignore>HKEY_LOCAL_MACHINE\Security\Policy\Secrets</registry_ignore>
        <registry_ignore type="sregex">\Enum$</registry_ignore>
      </syscheck>

#. Restart the Wazuh agent to apply the configuration:

   .. code-block:: console

      Restart-Service -Name wazuh

Use case: Detect malware persistence in Windows Registry
--------------------------------------------------------

Malware persistence in the Windows Registry is a technique attackers use to ensure that their malicious program runs every time the system starts or restarts. The malicious program is commonly added to the "Run" and "RunOnce" keys in the Registry.

With the Wazuh FIM module, you can detect any suspicious or unknown programs added to the startup registry keys. This allows you to take appropriate action to remove them before they cause harm to your system.

Use case description
^^^^^^^^^^^^^^^^^^^^

  +---------------------+-----------------------------------------------------------------------------------------------+
  | Endpoint            | Description                                                                                   |
  +=====================+===============================================================================================+
  | Windows 10          | The FIM module monitors startup registry keys on this endpoint.                               |
  +---------------------+-----------------------------------------------------------------------------------------------+

Configuration
^^^^^^^^^^^^^

Wazuh monitors the startup registry keys automatically, out-of-the-box, without requiring any user special action or configuration. By default, the Wazuh agent configuration file at ``C:\Program Files (x86)\ossec-agent\ossec.conf`` uses the following setting to monitor the startup registry keys:

   .. code-block:: xml

      <syscheck>
        <frequency>300</frequency>
        <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Run</windows_registry>
        <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\RunOnce</windows_registry>
      </syscheck>

Test the configuration
^^^^^^^^^^^^^^^^^^^^^^

.. warning::

   You must carry this out in a sandbox environment. Delete the added registry keys after running the test.

#. Add the registry value name ``DemoValue`` and registry value data ``cmd`` to the ``HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Run`` key.

#. Add the registry value name ``DemoValue`` and registry value data ``cmd`` to the ``HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\RunOne`` registry keys.

#. Wait for 5 minutes which is the time configured for the FIM scan.

Visualize the alert
^^^^^^^^^^^^^^^^^^^

Navigate to **Modules > Integrity monitoring** on the Wazuh dashboard to view the alert generated when the FIM module detects changes in the Windows startup registries.

.. thumbnail:: /images/manual/fim/changed-windows-startup-registries.png
  :title: Changes in the Windows startup registries
  :alt: Changes in the Windows startup registries
  :align: center
  :width: 80%
