.. _faqs_fim:

FAQ
===============================

1. `How often does syscheck run?`_
2. `Which is the CPU usage on the servers?`_
3. `Where are all the checksums stored?`_
4. `Can I ignore files on a directory?`_
5. `How does Wazuh verify the integrity of files?`_
6. `Does Wazuh monitor any directories by default?`_

``How often does syscheck run?``
-------------------------------------------------
Syscheck frequency is configurable by the user with :ref:`frequency <reference_ossec_syscheck_frequency>`. By default is configured to run every 6 hours.

``Which is the CPU usage on the servers?``
---------------------------------------------------------
Syscheck scans are designed to run slowly to avoid too much CPU or memory use.

``Where are all the checksums stored?``
---------------------------------------------------------

All the checksums are stored on the manager ``/var/ossec/queue/syscheck``

``Can I ignore files on a directory?``
---------------------------------------------------------

Yes, you can use the :ref:`ignore <reference_ossec_syscheck_ignore>` in order to avoid false positives. Example: :ref:`ignore-false-positives <how_to_fim_ignore>`

``Can Wazuh report changes in the content of a text file?``
--------------------------------------------------------------

Yes. This is posible with the :ref:`directories <reference_ossec_syscheck_directories>` For ``directories`` . This option gives us the exact content that has been changed in a text file. Be careful with the folders you set up to ``report_changes`` , because what OSSEC does is to copy every single file you want to monitor into a private location.
Example: :ref:`report changes <how_to_fim_report_changes>`

``How does Wazuh verify the integrity of files?``
--------------------------------------------------
Wazuh manager stores and looks for modification to all the checksums received from the agents for the monitored files. Wazuh manager compares the new checksums against the stored ones. Alert is sent if anything changes.

``Does Wazuh monitor any directories by default?``
--------------------------------------------------
Yes. By default Wazuh monitorize ``/etc``, ``/usr/bin``, ``/usr/sbin``, ``/bin`` and ``/sbin`` on unix like systems and ``C:\Windows\System32`` directory on Windows.
