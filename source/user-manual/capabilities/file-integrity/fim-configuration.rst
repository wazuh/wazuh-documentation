.. Copyright (C) 2018 Wazuh, Inc.

.. _fim-examples:

Configuration
=============

#. `Basic usage`_
#. `Configuring scheduled scans`_
#. `Configuring real-time monitoring`_
#. `Configure to report changes`_
#. `Configure to ignore files`_
#. `Ignoring files via rules`_
#. `Changing severity`_

Basic usage
-----------
**Syscheck** is configured in the :ref:`ossec.conf <reference_ossec_conf>` file.  Generally this configuration is set using the following sections:

- :ref:`frequency <reference_ossec_syscheck_frequency>`,
- :ref:`directories <reference_ossec_syscheck_directories>`,
- :ref:`ignore <reference_ossec_syscheck_ignore>`, and
- :ref:`alert_new_files <reference_ossec_syscheck_alert_new_files>`.

For detailed configuration options, go to :ref:`Syscheck <reference_ossec_syscheck>`.

To configure syscheck, a list of files and directories must be identified. The ``check_all`` option checks md5, sha1, owner, and permissions of the file.

::

    <syscheck>
      <directories check_all="yes">/etc,/usr/bin,/usr/sbin</directories>
      <directories check_all="yes">/root/users.txt,/bsd,/root/db.html</directories>
    </syscheck>

Configuring scheduled scans
---------------------------

**Syscheck** has an option to configure the ``frequency`` of the system scans. In this example, **syscheck** is configured to run every 10 hours.

::

  <syscheck>
    <frequency>36000</frequency>
    <directories>/etc,/usr/bin,/usr/sbin</directories>
    <directories>/bin,/sbin</directories>
  </syscheck>

Configuring real-time monitoring
--------------------------------
Real-time monitoring is configured with the ``realtime`` option. This option only works with directories rather than with individual files. Real-time change detection is paused during periodic **syscheck** scans and reactivates as soon as these scans are complete.

::

    <syscheck>
      <directories check_all="yes" realtime="yes">c:/tmp</directories>
    </syscheck>

Configuring who-data monitoring
--------------------------------
Who-data monitoring is configured with the ``whodata`` option. This option only works with directories rather than with individual files.

::

    <syscheck>
      <directories check_all="yes" whodata="yes">/etc</directories>
    </syscheck>

.. _how_to_fim_report_changes:

Configure to report changes
---------------------------

Using the ``report_changes`` option, we can see what specifically changed in text files. Be careful about which folders you set up to ``report_changes`` to, because in order to do this, Wazuh copies every single file you want to monitor to a private location.

::

    <syscheck>
      <directories check_all="yes" realtime="yes" report_changes="yes">/test</directories>
    </syscheck>

.. _how_to_fim_ignore:

Configure to ignore files
-------------------------

Files and directories can be omitted using the ignore option (or registry_ignore for Windows registry entries). In order to avoid false positives, **syscheck** can be configured to ignore certain files that don't need to be monitored.

::

    <syscheck>
      <ignore>/etc/random-seed</ignore>
      <ignore>/root/dir</ignore>
      <ignore type="sregex">.log$|.tmp</ignore>
    </syscheck>

Ignoring files via rules
------------------------

It is also possible to ignore files using rules, as in this example::

    <rule id="100345" level="0">
      <if_group>syscheck</if_group>
      <match>/var/www/htdocs</match>
      <description>Ignore changes to /var/www/htdocs</description>
    </rule>

Changing severity
-----------------

With a custom rule, the level of a **syscheck** alert can be altered when changes to a specific file or file pattern are detected.

::

    <rule id="100345" level="12">
      <if_group>syscheck</if_group>
      <match>/var/www/htdocs</match>
      <description>Changes to /var/www/htdocs - Critical file!</description>
    </rule>
