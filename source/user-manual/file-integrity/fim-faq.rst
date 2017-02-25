.. _fim-faq:

FAQ 
===============================

1. `How often does syscheck run?`_
2. `What is the CPU usage like on the agents?`_
3. `Where are all the checksums stored?`_
4. `Can I ignore files in a directory?`_
5. `Can Wazuh report changes in the content of a text file?`_
6. `How does Wazuh verify the integrity of files?`_
7. `Does Wazuh monitor any directories by default?`_

``How often does syscheck run?``
--------------------------------
Syscheck frequency is configurable by the user with :ref:`frequency <reference_ossec_syscheck_frequency>`. By default is configured to run every 6 hours.

``What is the CPU usage like on the agents?``
---------------------------------------------------------

Syscheck scans are designed to run slowly to avoid too much CPU or memory use.

``Where are all the checksums stored?``
---------------------------------------

All the checksums are stored on the manager ``/var/ossec/queue/syscheck``

``Can I ignore files in a directory?``
--------------------------------------

Yes, you can use the :ref:`ignore <reference_ossec_syscheck_ignore>` option to avoid false positives. Example: :ref:`ignore-false-positives <how_to_fim_ignore>`

``Can Wazuh report changes in the content of a text file?``
-----------------------------------------------------------

Yes, this is posible with the ``report_changes`` option.  For ``directories`` only. This option gives us the exact content that has been changed in a text file. Be selective about which folders you use ``report_changes`` on, because this requires syscheck to copy every single file you want to monitor with ``report_changes`` to a private location for comparison purposes.
Example: :ref:`report changes <how_to_fim_report_changes>`

``How does Wazuh verify the integrity of files?``
--------------------------------------------------

Wazuh manager stores and looks for modifications to all the checksums and file attributes received from the agents for the monitored files. Wazuh manager compares the new checksums/attributes against the stored ones. An alert is generated if anything changes.

``Does Wazuh monitor any directories by default?``
--------------------------------------------------

Yes. By default Wazuh monitors ``/etc``, ``/usr/bin``, ``/usr/sbin``, ``/bin`` and ``/sbin`` on Unix-like systems and ``C:\Windows\System32`` on Windows.
