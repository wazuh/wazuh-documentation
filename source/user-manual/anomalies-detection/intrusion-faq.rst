.. _intrusion-faq:

FAQ
===================================

1. `How often does rootcheck run?`_
2. `How does rootcheck know the rootkit files to look for?`_
3. `Does rootcheck inspect running processes?`_
4. `What about hidden files?`_


How often does rootcheck run?
-------------------------------------------------
The rootcheck scan frequency is configurable with :ref:`frequency <reference_ossec_rootcheck_frequency>`. By default it runs every 2 hours.

How does rootcheck know the rootkit files to look for?
------------------------------------------------------------
The rootcheck engine has databases of rootkit signatures: *rootkit_files.txt*, *rootkit_trojans.txt* and *win_malware_rcl.txt*. Unfortunately, the signatures are out of date.

Does rootcheck inspect running processes?
------------------------------------------------------------
Yes, rootcheck inspects all running processes looking for discrepancies with different system calls.

What about hidden files?
-------------------------------------------------
The rootcheck engine scans the entire system comparing the differences between the *stat size* and the files size when using the *fopen* + *read* calls.  If any results do not match, you might have a malware installed.
