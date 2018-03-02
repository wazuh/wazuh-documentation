.. _release_3_2_1:

3.2.1 Release Notes
===================

This release is a bug fix release. This section shows the most relevant improvements and fixes of Wazuh v3.2.1. You will find more detailed information in our `changelog <https://github.com/wazuh/wazuh/blob/3.2/CHANGELOG.md>`_ file.

- `Wazuh modules`_
- `Cluster`_
- `Agents management`_
- `OpenSSL library`_

Wazuh modules
-------------
Fixed some bugs in Wazuh modules that affected performance and functionality. Verification has also been improved when setting up these modules remotely.

In vulnerability-detector module the following bugs have been fixed: problems detecting agents with supported operating systems, duplicate alerts and RAM consumption. Furthermore, the module is no longer included in the agents, reducing package size and preventing errors.

In syscollector module the agent software collection has been improved and some bugs in its configuration fixed. The creation of zombie processes is also prevented.

Finally, CIS-CAT has improved the JAVA selection, updated its rules, fixed memory leaks and added support for relative/full/network paths in its configuration

Cluster
-------
Several bugs have been fixed in the cluster. It has improved ``cluster-control`` to give more information about type of nodes and now is possible to enable a debug mode.

Agents management
-----------------

At the agent level, the bug that did not recognize correctly the version of some operating systems has been fixed.

The API call ``GET/agents/purgeable/: timeframe`` has been restructured to add a new field, totalItems. This field contains the number of agents that can be removed.

OpenSSL library
---------------
OpenSSL library is updated from 1.0.21 to `1.1.0g <https://www.openssl.org/news/changelog.html#x1>`_ . This version fixes two security vulnerabilities:

- `CVE-2017-3736 <https://www.openssl.org/news/secadv/20171102.txt>`_ : It can allow an attacker to recover the encryption keys used to protect communications.
- `CVE-2017-3735 <https://www.openssl.org/news/secadv/20170828.txt>`_ : It can allow a malicious user to do a one-byte overread.
