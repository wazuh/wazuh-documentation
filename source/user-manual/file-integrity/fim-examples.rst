.. _fim-examples:

Examples
==========================

1. `Basic example`_
2. `Realtime monitoring`_
3. `Reporting changes`_
4. `Ignoring files`_
5. `Ignoring files via rules`_
6. `Changing severity`_

Basic example
-------------------------------------------
To configure syscheck, a list of files and directories must be provided. The check_all option checks md5, sha1, owner, and permissions of the file.

::

    <syscheck>
        <directories check_all="yes">/etc,/usr/bin,/usr/sbin</directories>
        <directories check_all="yes">/root/users.txt,/bsd,/root/db.html</directories>
    </syscheck>

Realtime monitoring
-------------------------------------------
Realtime monitoring is configured with the ``realtime`` option. This option only works with directories, no for individual files. Realtime option is not detecting any changes during a syscheck scan, the changes won't be detected in a realtime-manner until syscheck  finishes the scan.

::

	<syscheck>
		<directories check_all="yes" realtime="yes">c:/tmp</directories>
	</syscheck>

.. _how_to_fim_report_changes:

Reporting changes
-------------------------------------------

Using ``report_changes`` option, we can see what specifically changed. Be careful with the folders you set up to ``report_changes``, because in order to report changes, Wazuh copy every single file you want to monitorize into a private location.

::

	<syscheck>
		<directories check_all="yes" realtime="yes" report_changes="yes">/test</directories>
	</syscheck>

.. _how_to_fim_ignore:

Ignoring files
-------------------------------------------
Files and directories can be ignored using the ignore option (or registry_ignore for Windows registry entries):
In order to avoid false positives, syscheck can be configured to ignore certains files that we don't want to monitor with ``ignore`` tag (or registry_ignore for Windows registry entries).
::

    <syscheck>
        <ignore>/etc/random-seed</ignore>
        <ignore>/root/dir</ignore>
        <ignore type="sregex">.log$|.tmp</ignore>
    </syscheck>

Ignoring files via rules
-------------------------------------------
It is possible to ignore files using rules::

    <rule id="100345" level="0">
        <if_group>syscheck</if_group>
        <match>/var/www/htdocs</match>
        <description>Ignore changes to /var/www/htdocs</description>
    </rule>

Changing severity
-------------------------------------------
Creating a rule it is possible to alter the level of a syscheck alert::

    <rule id="100345" level="12">
        <if_group>syscheck</if_group>
        <match>/var/www/htdocs</match>
        <description>Changes to /var/www/htdocs - Critical file!</description>
    </rule>
