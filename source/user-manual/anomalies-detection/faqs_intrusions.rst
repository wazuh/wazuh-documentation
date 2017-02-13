.. _faqs_intrusions:

FAQ
===================================

1. `How often does rootcheck run?`_
2. `How does rootcheck know the rootkit files to look for?`_
3. `Does rootcheck inspect the running process?`_
4. `What about the hidden files?`_


``How often does rootcheck run?``
-------------------------------------------------
Rootcheck frequency is configurable by the user with :ref:`frequency <reference_ossec_rootcheck_frequency>`. By default is configured to run every 2 hours.

``How does rootcheck know the rootkit files to look for?``
------------------------------------------------------------
Rootcheck engine has its own database of rootkits signatures: *rootkit_files.txt*, *rootkit_trojans.txt* and *win_malware_rcl.txt*. Unfortunately, the signatures are out of date.

``Does rootcheck inspect the running process?``
------------------------------------------------------------
Yes, rootcheck inspects the all the process looking for discrepancies with different system calls.

``What about the hidden files?``
-------------------------------------------------
Rootcheck engine scan the entire system comparing the differences between the *stat size* and the files size when using the *fopen* + *read* calls.  If any results do not match, you might have a malware installed.
