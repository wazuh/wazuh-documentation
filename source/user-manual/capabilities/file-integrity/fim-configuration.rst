.. Copyright (C) 2019 Wazuh, Inc.

.. _fim-examples:

Configuration
=============

#. `Basic usage`_
#. `Configuring scheduled scans`_
#. `Configuring real-time monitoring`_
#. `Configuring who-data monitoring`_
#. `Configure to report changes`_
#. `Configure to ignore files`_
#. `Configure maximum recursion level allowed`_
#. `Ignoring files via rules`_
#. `Changing severity`_
#. `Configuring synchronization`_

Basic usage
-----------
**Syscheck** is configured in the :ref:`ossec.conf <reference_ossec_conf>` file.  Generally this configuration is set using the following sections:

- :ref:`frequency <reference_ossec_syscheck_frequency>`
- :ref:`directories <reference_ossec_syscheck_directories>`
- :ref:`ignore <reference_ossec_syscheck_ignore>`
- :ref:`alert_new_files <reference_ossec_syscheck_alert_new_files>`
- :ref:`synchronization <reference_ossec_syscheck_synchronization>`

For detailed configuration options, go to :ref:`Syscheck <reference_ossec_syscheck>`.

To configure syscheck, a list of files and directories must be identified. The ``check_all`` option checks file size, permissions, owner, last modification date, inode and all the hash sums (MD5, SHA1 and SHA256).

.. note::
  If a directory is specified both in a :ref:`centralized configuration <reference_agent_conf>` and on the agent's  ``ossec.conf``, the centralized configuration will take precedence and override the local configuration.

.. code-block:: xml

  <syscheck>
    <directories check_all="yes">/etc,/usr/bin,/usr/sbin</directories>
    <directories check_all="yes">/root/users.txt,/bsd,/root/db.html</directories>
  </syscheck>

Syscheck can monitor directories/files that contain commas by scaping them.

.. code-block:: xml

  <syscheck>
    <directories check_all="yes">/comma\,folder</directories>
  </syscheck>

With this configuration, the folder ``/comma,folder`` will be monitored.

.. versionadded:: 4.0

Environment variables can be used to configure syscheck in Linux and Windows.

.. code-block:: xml

  <syscheck>
    <directories check_all="yes">$DIRECTORY</directories>
  </syscheck>

Under UNIX based systems, the variable must be added to the file ``/etc/ossec-init.conf`` if wazuh is restarted using systemd.
If wazuh is restarted using the ``ossec-control`` binary the variable must be owned by the root user.

.. code-block:: xml

  <syscheck>
    <directories check_all="yes">%CommonProgramFiles%</directories>
  </syscheck>

Under Windows, be sure that the variable is a system environment variable.

.. note::
  Wazuh runs as a 32 bit application, so the previous environment variable will be replaced by ``C:\Program Files (x86)\Common Files``. In order to specifically monitor ``C:\Program Files\Common Files``, the associate environment variable is: ``%CommonProgramW6432%``.

Configuring scheduled scans
---------------------------

**Syscheck** has an option to configure the ``frequency`` of the system scans. In this example, **syscheck** is configured to run every 10 hours.

.. code-block:: xml

  <syscheck>
    <frequency>36000</frequency>
    <directories>/etc,/usr/bin,/usr/sbin</directories>
    <directories>/bin,/sbin</directories>
  </syscheck>

Configuring real-time monitoring
--------------------------------
Real-time monitoring is configured with the ``realtime`` option. This option only works with directories rather than with individual files. Real-time change detection is paused during periodic **syscheck** scans and reactivates as soon as these scans are complete.

.. code-block:: xml

  <syscheck>
    <directories check_all="yes" realtime="yes">c:/tmp</directories>
  </syscheck>

Configuring who-data monitoring
-------------------------------

.. versionadded:: 3.4.0

Who-data monitoring is configured with the ``whodata`` option. This option replaces the ``realtime`` option, which means that ``whodata`` implies real-time monitoring but adding the who-data information.
This functionality uses Linux Audit subsystem and the Microsoft Windows SACL, so additional configurations might be necessary. Check the :ref:`Auditing who-data <auditing-whodata>` entry to get further information.

.. code-block:: xml

  <syscheck>
    <directories check_all="yes" whodata="yes">/etc</directories>
  </syscheck>


.. warning:: There is a known bug that affects to the versions 2.8.5 and 2.8.4 of ``audit`` that shows a directory as ``null`` when it has been moved adding a ``/`` at the end of the directory. This bug will cause that no alerts related with this directory will be shown until a new event related to this directory is triggered when ``whodata`` is enabled.


.. _how_to_fim_report_changes:

Configure to report changes
---------------------------

Using the ``report_changes`` option, we can see what specifically changed in text files. Be careful about which folders you set up to ``report_changes`` to, because in order to do this, Wazuh copies every single file you want to monitor to a private location.

.. code-block:: xml

  <syscheck>
    <directories check_all="yes" realtime="yes" report_changes="yes">/test</directories>
  </syscheck>

.. _how_to_fim_ignore:

Configure to ignore files
-------------------------

Files and directories can be omitted using the ignore option (or registry_ignore for Windows registry entries). In order to avoid false positives, **syscheck** can be configured to ignore certain files that don't need to be monitored.

.. code-block:: xml

  <syscheck>
    <ignore>/etc/random-seed</ignore>
    <ignore>/root/dir</ignore>
    <ignore type="sregex">.log$|.tmp</ignore>
  </syscheck>

Configure maximum recursion level allowed
-----------------------------------------

.. versionadded:: 3.6.0

It is possible to configure the maximum recursion level allowed for a specific directory by setting the ``recursion_level`` option. This option must be an integer between **0 and 320**. An example of use:

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

We will receive alerts for all files up to ``folder_test/level_1/level_2/level_3/`` but we won't receive alerts from any directory deeper than ``level_3``.

If we don't want any recursion (just get alerts from the files in the monitored folder), we must set ``recursion_level`` to 0.

.. warning::
  If ``recursion_level`` is not specified, it will be set to the default value defined by ``syscheck.default_max_depth`` in the :ref:`internal options <reference_internal_options>` configuration file.

Ignoring files via rules
------------------------

It is also possible to ignore files using rules, as in this example:

.. code-block:: xml

  <rule id="100345" level="0">
    <if_group>syscheck</if_group>
    <match>/var/www/htdocs</match>
    <description>Ignore changes to /var/www/htdocs</description>
  </rule>

Changing severity
-----------------

With a custom rule, the level of a **syscheck** alert can be altered when changes to a specific file or file pattern are detected.

.. code-block:: xml

  <rule id="100345" level="12">
    <if_group>syscheck</if_group>
    <match>/var/www/htdocs</match>
    <description>Changes to /var/www/htdocs - Critical file!</description>
  </rule>

.. _how_to_fim_synchronization:

Configuring synchronization
---------------------------

.. versionadded:: 3.12.0

Synchronization can be configured to change the synchronization interval, the number of events per second, the queue size and the response timeout.

.. code-block:: xml

  <syscheck>
    <synchronization>
      <enabled>yes</enabled>
      <interval>5m</interval>
      <max_interval>1h</max_interval>
      <response_timeout>30</response_timeout>
      <sync_queue_size>16384</sync_queue_size>
      <max_eps>10</max_eps>
    </synchronization>
  </syscheck>
