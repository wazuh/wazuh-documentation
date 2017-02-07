.. _faqs_fim:

FAQs
===============================

1. `How often does syscheck run?`_
2. `Which is the CPU usage on the servers?`_
3. `Where are all the checksums stored?`_
4. `Can I ignore files on a directory?`_

``How often does syscheck run?``
-------------------------------------------------
Syscheck frequency is configurable by the user with `frequency option <../configuration-files/ossec-conf/syscheck.html#frequency>`_. By default is configured to run every 6 hours.

``Which is the CPU usage on the servers?``
---------------------------------------------------------
Syscheck scans are designed to run slowly to avoid too much CPU or memory use.

``Where are all the checksums stored?``
---------------------------------------------------------

All the checksums are stored on the manager ``/var/ossec/queue/syscheck``

``Can I ignore files on a directory?``
---------------------------------------------------------

Yes, you can use the `ignore option <../configuration-files/ossec-conf/syscheck.html#ignore>`_ in order to avoid false positives. Example: `ignore-false-positives <how_to_fim.html#ignore-false-positives>`_

``Can Wazuh report changes in the content of a text file?``
--------------------------------------------------------------

Yes. This is posible with the `report_changes option <../configuration-files/ossec-conf/syscheck.html#directories>`_ For ``directories`` . This option gives us the exact content that has been changed in a text file. Be careful with the folders you set up to ``report_changes`` , because what OSSEC does is to copy every single file you want to monitor into a private location.
Example: `Report Changes <how_to_fim.html#report-changes>`_
