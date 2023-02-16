.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about File Integrity Monitoring, one of the Wazuh capabilities. We show you some configuration examples to get the best out of Wazuh.

.. _fim-examples:

Configuration
=============

After the installation, the Wazuh manager and the Wazuh agent have defined a :ref:`default syscheck configuration <reference_ossec_syscheck_default_configuration>`, which should be reviewed and adjusted to the particular environment. This section presents configuration examples, helping to learn how to use it in different use cases:

#. `Configuring syscheck - basic usage`_
#. `Configuring scheduled scans`_
#. `Configuring real-time monitoring`_
#. `Configuring who-data monitoring`_
#. `Configuring Windows registry`_
#. `Configuring Windows directories`_
#. `Configuring reporting file and registry value changes`_
#. `Configuring ignoring files and Windows registry entries`_
#. `Configuring ignoring files via rules`_
#. `Configuring the alert severity for the monitored files`_
#. `Configuring maximum recursion level allowed`_
#. `Configuring syscheck process priority`_
#. `Configuring where the database is to be stored`_
#. `Configuring synchronization`_

Syscheck component is configured both in the Wazuh manager and in the Wazuh agent :ref:`ossec.conf <reference_ossec_conf>` file. This capability can be also configured remotely using centralized configuration and the :ref:`agent.conf <reference_agent_conf>` file.
The list of all syscheck configuration options is available in the :ref:`syscheck <reference_ossec_syscheck>` section.

Configuring syscheck - basic usage
----------------------------------

To configure syscheck, a list of files and directories must be identified. The ``check_all`` attribute of the :ref:`directories <reference_ossec_syscheck_directories>` option allows checks of the file size, permissions, owner, last modification date, inode, and all the hash sums (MD5, SHA1, and SHA256).
By default, syscheck scans selected directories, whose list depends on the :ref:`default configuration <reference_ossec_syscheck_default_configuration>` for the host's operating system.

.. note::

  If a directory is specified both in a :ref:`centralized configuration <reference_agent_conf>` and on the Wazuh agent's  ``ossec.conf``, the centralized configuration will take preference and override the local configuration.

.. code-block:: xml

  <syscheck>
    <directories check_all="yes">/etc,/usr/bin,/usr/sbin</directories>
    <directories check_all="yes">/root/users.txt,/bsd,/root/db.html</directories>
  </syscheck>

.. versionadded:: 4.3.0

FIM directories can be configured using ``*`` and ``?`` wildcards in the same way you would use them in a shell or cmd terminal for listing files.

.. code-block:: xml

  <syscheck>
    <directories check_all="yes">/home/*/Downloads</directories>
  </syscheck>

.. note::

  Directories and files that match the configured pattern and are created after the initial FIM scan will be added for monitoring after the next scheduled scan is run.

Configuring scheduled scans
---------------------------

For the scheduled scans, syscheck has an option to configure the :ref:`frequency <reference_ossec_syscheck_frequency>` of the system scans. In this example, syscheck is configured to run every 10 hours:

.. code-block:: xml

  <syscheck>
    <frequency>36000</frequency>
    <directories>/etc,/usr/bin,/usr/sbin</directories>
    <directories>/bin,/sbin</directories>
  </syscheck>

There is an alternative way to schedule the scans using the :ref:`scan_time <reference_ossec_syscheck_scan_time>` and the :ref:`scan_day <reference_ossec_syscheck_scan_day>` options. In this example, the scan will run every Saturday at the 10pm. Configuring syscheck that way might help, for example, to set up the scans outside the environment production hours:

.. code-block:: xml

  <syscheck>
    <scan_time>10pm</scan_time>
    <scan_day>saturday</scan_day>
    <directories>/etc,/usr/bin,/usr/sbin</directories>
    <directories>/bin,/sbin</directories>
  </syscheck>


Configuring real-time monitoring
--------------------------------

Real-time monitoring is configured with the ``realtime`` attribute of the :ref:`directories <reference_ossec_syscheck_directories>` option. This attribute only works with the directories rather than with the individual files. Real-time change detection is paused during periodic syscheck scans and reactivates as soon as these scans are complete:

.. code-block:: xml

  <syscheck>
    <directories check_all="yes" realtime="yes">c:/tmp</directories>
  </syscheck>

Configuring who-data monitoring
-------------------------------

Who-data monitoring is configured with the ``whodata`` attribute of the :ref:`directories <reference_ossec_syscheck_directories>` option. This attribute replaces the ``realtime`` attribute, which means that ``whodata`` implies real-time monitoring but adds the who-data information.
This functionality uses Linux Audit subsystem and the Microsoft Windows SACL, so additional configurations might be necessary. Check the :ref:`auditing who-data <auditing-whodata>` entry to get further information:

.. code-block:: xml

  <syscheck>
    <directories check_all="yes" whodata="yes">/etc</directories>
  </syscheck>


.. warning:: There is a known bug that affects versions 2.8.5 and 2.8.4 of ``audit`` that shows a directory as ``null`` when it has been moved adding a ``/`` at the end of the directory. This bug will cause that no alerts related to this directory will be shown until a new event related to this directory is triggered when ``whodata`` is enabled.

How to tune audit to deal with a huge amount of who-data events at the same time
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is possible to lose ``who-data`` events when a flood of events appears. The following options help the audit socket and dispatcher to deal with big amounts of events:

.. code-block:: none

 /etc/audit/auditd.conf  -> disp_qos = ["lossy", "lossless"]
 /etc/audisp/audisp.conf -> q_dephs  = [<Numerical value>]

The ``disp_qos`` sets blocking/lossless or non-blocking/lossy communication between the audit daemon and the dispatcher. There is a 128k buffer between the audit daemon and dispatcher. This is sufficient for most uses. If lossy is chosen, incoming events going to the dispatcher are discarded when the queue is full. In this case, events are still written to disk if ``log_format`` is not ``nolog``. Otherwise, the auditd daemon will wait for the queue to have an empty spot before logging to disk. The risk is that while the daemon is waiting for network IO, an event is not being recorded to disk. The recommended value is lossless.

The ``q_dephs`` is a numeric value, by default set to 80, that tells how big is the internal queue of the audit event dispatcher. A bigger queue handles flood of events better but could hold events that are not processed when the daemon is terminated. This value has to be increased if there are messages in the syslog indicating that the events are being dropped.

On the Wazuh side, the ``rt_delay`` variable from the :ref:`internal FIM configuration <ossec_internal_syscheck>` can help to prevent the loss of events:

.. code-block:: none

 /var/ossec/etc/internal_options.conf -> syscheck.rt_delay = [Numerical value]

It sets a delay between real-time alerts in milliseconds. The value has to be decreased to process who-data events faster.

.. _how_to_fim_alert_new_files:

Configuring reporting new files
-------------------------------

To report new files added to the system, syscheck can be configured with the :ref:`alert_new_files <reference_ossec_syscheck_alert_new_files>` option. By default, this feature is enabled on the monitored Wazuh agent, but the option is not present in the syscheck section of the configuration:

.. code-block:: xml

  <syscheck>
    <alert_new_files>yes</alert_new_files>
  </syscheck>

An example alert on a new file creation looks as follows:

.. code-block:: console

  ** Alert 1585943821.46978: - ossec,syscheck,pci_dss_11.5,gpg13_4.11,gdpr_II_5.1.f,hipaa_164.312.c.1,hipaa_164.312.c.2,nist_800_53_SI.7,
  2020 Apr 03 19:57:01 (agent) any->syscheck
  Rule: 554 (level 5) -> 'File added to the system.'
  File '/etc/new_file' added
  Mode: scheduledAttributes:
  - Size: 2
  - Permissions: rw-r--r--
  - Date: Fri Apr 3 19:56:50 2020
  - Inode: 23194
  - User: root (0)
  - Group: root (0)
  - MD5: 9a8ad92c50cae39aa2c5604fd0ab6d8c
  - SHA1: a9fcd54b25e7e863d72cd47c08af46e61b74b561
  - SHA256: 092fcfbbcfca3b5be7ae1b5e58538e92c35ab273ae13664fed0d67484c8e78a6


.. _how_to_fim_registries:

Configuring Windows registry
----------------------------

To configure the Windows registries, it is necessary to create a list of those registries to monitor. This is done in a similar manner to how we list directories and files, but using the label ```<windows_registry>``` instead. There are many attributes and options to specify, for example, all the basic checks can be enabled with the ``check_all`` attribute, the registry architecture to monitor can be specified with ``arch``, ``report_changes`` can be used to get information on the changes made to values, and so on. A list of all the supported attributes and options can be found here: :ref:`Windows registries <reference_ossec_syscheck_windows_registry>`.

.. code-block:: xml

  <syscheck>
    <windows_registry arch="both" check_all="yes">HKEY_LOCAL_MACHINE\SOFTWARE</windows_registry>
    <windows_registry arch="32bit" check_all="no" check_mtime="yes">HKEY_LOCAL_MACHINE\SYSTEM\Setup</windows_registry>
  </syscheck>

.. versionadded:: 4.5.0

Windows registries directories can be configured using ``*`` and ``?`` wildcards in the same way you would use them in a shell or cmd terminal for listing files.

.. code-block:: xml
    <windows_registry arch="both">HKEY_CURRENT_USER\Software\*</windows_registry>
    <windows_registry arch="both">HKEY_CURRENT_CONFIG\S?????</windows_registry>
    <windows_registry arch="both">HKEY_USERS\S-?-?-??\*</windows_registry>
    
.. note::

  Registers that match the configured pattern and are created after the initial FIM scan will be added for monitoring after the next scheduled scan is run.

Configuring Windows directories
-------------------------------

In 64-bit architecture systems, you can locate 32-bit and 64-bit DLLs in a special way.

-  ``System32`` is reserved for 64-bit DLLs.
-  ``SysWOW64`` is reserved for all 32-bit DLLs.

Furthermore, 32-bit processes running in 64-bit environments access ``Sytem32`` through a virtual folder called ``Sysnative``.

But we disabled this redirection and you can access ``System32`` directly. Monitoring ``%WINDIR%/System32`` and ``%WINDIR%/Sysnative`` directories is equivalent and Wazuh shows the path ``%WINDIR%/System32`` in the alerts. ``SysWOW64`` is a different directory. To monitor ``%WINDIR%/SysWOW64``, you must add it to the ``ossec.conf`` configuration file.

You can monitor the Windows special directories ``%WINDIR%/System32`` and ``%WINDIR%/SysWOW64`` directories configuring them with any of the FIM modes. For example:

-  Scheduled mode.

   .. code-block:: xml

      <syscheck>
        <directories>%WINDIR%/System32</directories>
        <directories>%WINDIR%/SysWOW64</directories>
      </syscheck>

-  Realtime mode.

   .. code-block:: xml

      <syscheck>
        <directories realtime="yes">%WINDIR%/System32</directories>
        <directories realtime="yes">%WINDIR%/SysWOW64</directories>
      </syscheck>

-  Whodata mode.

   .. code-block:: xml

      <syscheck>
        <directories whodata="yes">%WINDIR%/System32</directories>
        <directories whodata="yes">%WINDIR%/SysWOW64</directories>
      </syscheck>

.. _how_to_fim_report_changes:

Configuring reporting file and registry value changes
-----------------------------------------------------

To report the exact content changed in a text file or a Windows registry value, syscheck can be configured with the ``report_changes`` attribute of the :ref:`directories <reference_ossec_syscheck_directories>` or the :ref:`registries <reference_ossec_syscheck_windows_registry>` options. ``Report_changes`` should be used with caution as Wazuh copies every single monitored file to a private location.

In this example, by enabling the ``report_changes``, the alerts will show the changed content for all the text files in a listed directory and its subdirectories or for all values of a monitored Windows registry:

.. code-block:: xml

  <syscheck>
    <directories check_all="yes" realtime="yes" report_changes="yes">/test</directories>
    <windows_registry arch="64bit" report_changes="yes">HKEY_LOCAL_MACHINE\SYSTEM\Setup</windows_registry>
  </syscheck>

.. code-block:: console

  ** Alert 1585758628.156629: - ossec,syscheck,pci_dss_11.5,gpg13_4.11,gdpr_II_5.1.f,hipaa_164.312.c.1,hipaa_164.312.c.2,nist_800_53_SI.7,
  2020 Apr 01 16:30:28 (agent) any->syscheck
  Rule: 550 (level 7) -> 'Integrity checksum changed.'
  File '/test/file' modified
  Mode: real-time
  Changed attributes: size,mtime,inode,md5,sha1,sha256
  Size changed from '14' to '13'
  Old modification time was: '1585758615', now it is '1585758628'
  Old inode was: '23186', now it is '23188'
  Old md5sum was: 'f296597bd5a808e5d1ad8cc2ab09c9f3'
  New md5sum is : 'ab68c0f2af74dc4a1c482a83c0c5a3ec'
  Old sha1sum was: 'ba0fe43dcd9586c8c2703d8278a960a3aa4b4754'
  New sha1sum is : '3a686748bf79db0adbad15f22ef566212a13b6c8'
  Old sha256sum was: '53fe48bd127d4bf0e559f26b005ee40ee40d1bba4e971dd0437da6aa47759310'
  New sha256sum is : '40e29c160ea4e9911cafb9bcdbb2bcec21904a0c13a2871936c79145ff8085c7'Attributes:
  - Size: 13
  - Permissions: rw-r--r--
  - Date: Wed Apr 1 16:30:28 2020
  - Inode: 23188
  - User: root (0)
  - Group: root (0)
  - MD5: ab68c0f2af74dc4a1c482a83c0c5a3ec
  - SHA1: 3a686748bf79db0adbad15f22ef566212a13b6c8
  - SHA256: 40e29c160ea4e9911cafb9bcdbb2bcec21904a0c13a2871936c79145ff8085c7What changed:
  1c1
  < Original text
  ---
  > Altered text

.. code-block:: console

  {
      "type": "event",
      "data": {
          "path": "HKEY_LOCAL_MACHINE\\SYSTEM\\Setup",
          "mode": "scheduled",
          "type": "modified",
          "arch": "[x64]",
          "value_name": "test_value",
          "timestamp": 1606349371,
          "attributes": {
              "type": "registry_value",
              "value_type": "REG_SZ",
              "size": 12,
              "hash_md5": "96c15c2bb2921193bf290df8cd85e2ba",
              "hash_sha1": "ca527369d9e8c1e081558bd92f90f65c4eb77e21",
              "hash_sha256": "fe32608c9ef5b6cf7e3f946480253ff76f24f4ec0678f3d0f07f9844cbff9601",
              "checksum": "56a7cc798b98bcd92a3aa49bfa3943ce3b4f4725"
          },
          "changed_attributes": [
              "size",
              "md5",
              "sha1",
              "sha256"
          ],
          "old_attributes": {
              "type": "registry_value",
              "value_type": "REG_SZ",
              "size": 17,
              "hash_md5": "84b8bc6ddfb8c2032ae2eb44d162369b",
              "hash_sha1": "c1dab0c0864b6ac9bdd3743a1408d679f1acd823",
              "hash_sha256": "bf573149b23303cac63c2a359b53760d919770c5d070047e76de42e2184f1046",
              "checksum": "76538a04f4923b9688e50802e501771cb3c0508f"
          },
          "content_changes": "< original content\n---\n> new content\n"
      }
  }


If some sentive files exist in the monitored with ``report_changes`` path, :ref:`nodiff <reference_ossec_syscheck_nodiff>` option can be used. This option disables computing the diff for the listed files, avoiding data leaking by sending the files content changes through alerts:

.. code-block:: xml

 <syscheck>
   <directories check_all="yes" realtime="yes" report_changes="yes">/test</directories>
   <nodiff>/test/private</nodiff>
 </syscheck>

In this example, by adding :ref:`nodiff <reference_ossec_syscheck_nodiff>` option, syscheck will not compute the diff for a listed text file:

.. code-block:: console

  ** Alert 1585757658.154829: - ossec,syscheck,pci_dss_11.5,gpg13_4.11,gdpr_II_5.1.f,hipaa_164.312.c.1,hipaa_164.312.c.2,nist_800_53_SI.7,
  2020 Apr 01 16:14:18 (agent) any->syscheck
  Rule: 550 (level 7) -> 'Integrity checksum changed.'
  File '/test/private' modified
  Mode: real-time
  Changed attributes: size,mtime,inode,md5,sha1,sha256
  Size changed from '14' to '20'
  Old modification time was: '1585757413', now it is '1585757658'
  Old inode was: '23187', now it is '23185'
  Old md5sum was: 'ef4ad1a40d0a95ad2e1b72eccdca6d44'
  New md5sum is : '158ccd88359654ac4ffd0e3cecb79a49'
  Old sha1sum was: '5f34d30f7bdefe9e825bff388de047dacdc09853'
  New sha1sum is : '18dfef68273c00fc733e28ce9aa1830f5e8fabd8'
  Old sha256sum was: '211ae95d4e54cff5724a98f0bae0b505adfdafe1ed8b15e40570a5fe58d20c61'
  New sha256sum is : '60c2a08e66f02bacea882f7b437f9c983431d75a686b703661c34e288d36de9d'Attributes:
  - Size: 20
  - Permissions: rw-r--r--
  - Date: Wed Apr 1 16:14:18 2020
  - Inode: 23185
  - User: root (0)
  - Group: root (0)
  - MD5: 158ccd88359654ac4ffd0e3cecb79a49
  - SHA1: 18dfef68273c00fc733e28ce9aa1830f5e8fabd8
  - SHA256: 60c2a08e66f02bacea882f7b437f9c983431d75a686b703661c34e288d36de9dWhat changed:
  <Diff truncated because nodiff option>


.. _how_to_fim_ignore:

Configuring ignoring files and Windows registry entries
-------------------------------------------------------

In order to avoid false positives, syscheck can be configured to ignore certain files and directories that do not need to be monitored by using the :ref:`ignore <reference_ossec_syscheck_ignore>` option:

.. code-block:: xml

  <syscheck>
    <ignore>/etc/random-seed</ignore>
    <ignore>/root/dir</ignore>
    <ignore type="sregex">.log$|.tmp</ignore>
  </syscheck>

Similar functionality, but for the Windows registries can be achieved by using the :ref:`registry_ignore <reference_ossec_syscheck_registry_ignore>` option:

.. code-block:: xml

  <syscheck>
   <registry_ignore>HKEY_LOCAL_MACHINE\Security\Policy\Secrets</registry_ignore>
   <registry_ignore type="sregex">\Enum$</registry_ignore>
  </syscheck>

Configuring ignoring files via rules
------------------------------------

An alternative method to ignore specific files scanned by syscheck is by using rules and setting the rule level to 0. By doing that the alert will be silenced:

.. code-block:: xml

  <rule id="100345" level="0">
    <if_group>syscheck</if_group>
    <match>/var/www/htdocs</match>
    <description>Ignore changes to /var/www/htdocs</description>
  </rule>

Configuring the alert severity for the monitored files
------------------------------------------------------

With a custom rule, the level of a syscheck alert can be altered when changes to a specific file or file pattern are detected:

.. code-block:: xml

  <rule id="100345" level="12">
    <if_group>syscheck</if_group>
    <match>/var/www/htdocs</match>
    <description>Changes to /var/www/htdocs - Critical file!</description>
  </rule>

Configuring maximum recursion level allowed
-------------------------------------------

It is possible to configure the maximum recursion level allowed for a specific directory by using the ``recursion_level`` attribute of the :ref:`directories <reference_ossec_syscheck_directories>` option. ``recursion_level`` value must be an integer between 0 and 320.

An example configuration may look as follows:

.. code-block:: xml

  <syscheck>
    <directories check_all="yes">/etc,/usr/bin,/usr/sbin</directories>
    <directories check_all="yes">/root/users.txt,/bsd,/root/db.html</directories>
    <directories check_all="yes" recursion_level="3">folder_test</directories>
  </syscheck>

Using the following directory structure and ``recursion_level="3"``:

::

  folder_test
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

The alerts will be generated for all files up to ``folder_test/level_1/level_2/level_3/`` but not for any files in the directory deeper than ``level_3``.

To disable the recursion and generate the alerts only for the files in the monitored folder, the ``recursion_level`` value has to be set to 0.

.. warning::

  If ``recursion_level`` is not specified, it is set to the default value defined by ``syscheck.default_max_depth`` in the :ref:`internal options <reference_internal_options>` configuration file.

.. _how_to_fim_process_priority:

Configuring syscheck process priority
-------------------------------------

To adjust syscheck CPU usage on the monitored system, the :ref:`process_priority <reference_ossec_syscheck_process_priority>` option can be used. It sets the nice value for syscheck process. The default ``process_priority`` is set to 10.

Setting ``process_priority`` value higher than the default, will give syscheck lower priority, less CPU resources and make it run slower. In the example below the nice value for syscheck process is set to maximum:

.. code-block:: xml

  <syscheck>
    <process_priority>19</process_priority>
  </syscheck>

Setting ``process_priority`` value lower than the default, will give syscheck higher priority, more CPU resources and make it run faster. In the example below the nice value for syscheck process is set to minimum:

.. code-block:: xml

  <syscheck>
    <process_priority>-20</process_priority>
  </syscheck>

.. _how_to_fim_database:

Configuring where the database is to be stored
----------------------------------------------

When the Wazuh agent starts it performs a first scan and generates its database. By default, the database is created in disk:

.. code-block:: xml

  <syscheck>
    <database>disk</database>
  </syscheck>

Syscheck can be configured to store the database in memory instead by changing value of the :ref:`database <reference_ossec_syscheck_database>` option:

.. code-block:: xml

  <syscheck>
    <database>memory</database>
  </syscheck>

The main advantage of using in memory database is the performance as reading and writing operations are faster than performing them on disk. The corresponding disadvantage is that the memory must be sufficient to store the data.

.. _how_to_fim_synchronization:

Configuring synchronization
---------------------------

You can configure :ref:`synchronization <reference_ossec_syscheck_synchronization>` to change the synchronization interval, the maximum number of events per second, the queue size, the number of dedicated threads and the response timeout:

.. code-block:: xml

  <syscheck>
    <!-- Database synchronization settings -->
    <synchronization>
      <enabled>yes</enabled>
      <interval>5m</interval>
      <max_interval>1h</max_interval>
      <response_timeout>30</response_timeout>
      <queue_size>16384</queue_size>
      <thread_pool>1</thread_pool>
      <max_eps>10</max_eps>
    </synchronization>
  </syscheck>

If the Wazuh agent is upgraded to v3.12 and keeps its old configuration, the synchronization section will not be present in the ``ossec.conf`` file but the Wazuh agent will still use the default synchronization settings as shown above.
