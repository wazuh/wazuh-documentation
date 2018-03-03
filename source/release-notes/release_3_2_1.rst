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

Several bugs has been fixed in this release, improving the performance of the Wazuh modules.

First of all, it has been established a maximum of events sent per sencond for every module in order to avoid the agent flooding.
This limit is configurable by the ``wazuh_modules.max_eps`` parameter of the internal configuration.

For the vulnerability-detector module several bugs have been fixed related to duplicated alerts and RAM consumption.
Furthermore, this module is no longer included in the agents, reducing package size and preventing errors.

In addition, a bug that made it impossible to set the centralized configuration of the agents software collector has been solved.

For the CIS-CAT wodle it has been improved the JAVA binary selection, updated its rules, added support for relative/full/network paths in its configuration.

Finally, some memory leaks and other bugs reported by Coverity have been solved.

Cluster
-------
Several bugs have been fixed in the cluster. It has improved ``cluster-control`` to give more information about type of nodes and now it is possible to enable a debug mode.

Agents management
-----------------

At the agent level, a bug that did not recognize correctly the version of some operating systems has been fixed.

The API call ``GET/agents/purgeable/: timeframe`` has been restructured to add a new field called ``totalItems``. This field contains the number of agents that can be removed.

OpenSSL library
---------------
OpenSSL library has been updated from 1.0.2k to `1.1.0g <https://www.openssl.org/news/changelog.html#x1>`_ . This version fixes two security vulnerabilities:

- `CVE-2017-3736 <https://www.openssl.org/news/secadv/20171102.txt>`_ : It can allow an attacker to recover the encryption keys used to protect communications.
- `CVE-2017-3735 <https://www.openssl.org/news/secadv/20170828.txt>`_ : It can allow a malicious user to do a one-byte overread.
