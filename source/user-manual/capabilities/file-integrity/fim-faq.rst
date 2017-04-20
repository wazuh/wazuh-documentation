.. _fim-faq:

FAQ
===

#. `How often does syscheck run?`_
#. `What is the CPU usage like on the agents?`_
#. `Where are all the checksums stored?`_
#. `Can I ignore files in a directory?`_
#. `Can Wazuh report changes in the content of a text file?`_
#. `How does Wazuh verify the integrity of files?`_
#. `Does Wazuh monitor any directories by default?`_
#. `Can I force an inmediate syscheck scan?`_
#. `Does Syscheck start when Wazuh start?`_
#. `Does Wazuh alert when a new file is created?`_

How often does syscheck run?
--------------------------------
Syscheck frequency is configurable by the user with :ref:`frequency <reference_ossec_syscheck_frequency>`. By default is configured to run every 6 hours.

What is the CPU usage like on the agents?
---------------------------------------------------------

Syscheck scans are designed to run slowly to avoid too much CPU or memory use.

Where are all the checksums stored?
---------------------------------------

All the checksums are stored on the manager ``/var/ossec/queue/syscheck``

Can I ignore files in a directory?
--------------------------------------

Yes, you can use the :ref:`ignore <reference_ossec_syscheck_ignore>` option to avoid false positives. Example: :ref:`ignore-false-positives <how_to_fim_ignore>`

Can Wazuh report changes in the content of a text file?
-----------------------------------------------------------

Yes, this is posible with the ``report_changes`` option.  For ``directories`` only. This option gives us the exact content that has been changed in a text file. Be selective about which folders you use ``report_changes`` on, because this requires syscheck to copy every single file you want to monitor with ``report_changes`` to a private location for comparison purposes.
Example: :ref:`report changes <how_to_fim_report_changes>`

How does Wazuh verify the integrity of files?
--------------------------------------------------

Wazuh manager stores and looks for modifications to all the checksums and file attributes received from the agents for the monitored files. Wazuh manager compares the new checksums/attributes against the stored ones. An alert is generated if anything changes.

Does Wazuh monitor any directories by default?
--------------------------------------------------

Yes. By default Wazuh monitors ``/etc``, ``/usr/bin``, ``/usr/sbin``, ``/bin`` and ``/sbin`` on Unix-like systems and ``C:\Windows\System32`` on Windows.

Can I force an inmediate syscheck scan?
--------------------------------------------------

Yes, you can force an agent to perform a system integrity check with ::
  /var/ossec/bin/agent_control -r -a
  /var/ossec/bin/agent_control -r -u <agent_id>

More info at :ref:`Ossec control section <ossec-control>`

Does Syscheck start when Wazuh start?
-------------------------------------

By defult syscheck scan when Wazuh start, but you can change this with the :ref:`scan_on_start option<reference_ossec_syscheck_scan_start>`

Does Wazuh alert when a new file is created?
--------------------------------------------

Yes, but you need to configure it. Use the :ref:`alert_new_files option<reference_ossec_syscheck_alert_new_files>`
