.. _how_to_fim:

HOWTOs
==========================

``Ignore false positives``
-------------------------------------------
In order to avoid false positives, syscheck can be configured to ignore certains files that we don't want to monitor with ``ignore`` tag. For example, pdf files:

::

	<syscheck>
	    <ignore type="sregex">.pdf$</ignore>
	</syscheck>

``Realtime monitoring``
-------------------------------------------
Realtime monitoring is configured with the ``realtime`` option. This option only works with directories, no for individual files. Realtime option is not detecting any changes during a syscheck scan, the changes won't be detected in a realtime-manner until syscheck  finishes the scan.

::

	<syscheck>
		<directories check_all="yes" realtime="yes">c:/tmp</directories>
	</syscheck>

``Report changes``
-------------------------------------------

Using ``report_changes`` option, we can see what specifically changed. Be careful with the folders you set up to ``report_changes``, because in order to report changes, Wazuh copy every single file you want to monitorize into a private location.

::

	<syscheck>
		<directories check_all="yes" realtime="yes" report_changes="yes">/test</directories>
	</syscheck>
