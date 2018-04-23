.. Copyright (C) 2018 Wazuh, Inc.

.. _release_3_2_1:

3.2.1 Release Notes
===================

This release is a bug fix release. This section shows the most relevant improvements and fixes of Wazuh v3.2.1. You will find more detailed information in the `changelog <https://github.com/wazuh/wazuh/blob/3.2/CHANGELOG.md#v321>`_ file.

- `Wazuh modules`_
- `Cluster`_
- `Agents management`_
- `OpenSSL library`_

Wazuh modules
-------------

The Wazuh modules include several fixes in this release to improve their performance and reliability. The most relevant changes are described in this section.

To avoid the agent flooding, a maximum of events sent per second has been established for every module.
This limit is configurable by the ``wazuh_modules.max_eps`` parameter of the internal configuration.

For the vulnerability-detector module the following bugs have been fixed: a problem when detecting agents with supported operating systems, and another ones related to duplicated alerts and RAM consumption.
Furthermore, this module is no longer included in the agents, reducing package size and preventing errors.

In addition, a bug that made it impossible to set the centralized configuration of the agents software collector has been solved.

For the CIS-CAT wodle it has been improved the JAVA binary selection, updated its rules, and added support for relative/full/network paths in its configuration.

Finally, some memory leaks and other bugs reported by Coverity have been solved.

Cluster
-------
Several bugs have been fixed in the Wazuh cluster, among them, dealing with too long file paths.

The ``cluster-control`` tool was improved to retrieve more information about type of nodes, as well as adding the possibility to enable a debug mode for it.

Agents management
-----------------

Related to the agents management, the Operating System name detection in macOS and old Linux distributions has been fixed, retrieving the needed information correctly.

In addition, agent labels are also inserted in JSON archives even when the event doesn`t match any rule.

The API call ``GET/agents/purgeable/: timeframe`` has been restructured to add a new field called ``totalItems``. This field contains the number of agents that can be removed.

OpenSSL library
---------------
OpenSSL library has been updated from 1.0.2k to `1.1.0g <https://www.openssl.org/news/changelog.html#x1>`_ . This version fixes two security vulnerabilities:

- `CVE-2017-3736 <https://www.openssl.org/news/secadv/20171102.txt>`_ : It can allow an attacker to recover the encryption keys used to protect communications.
- `CVE-2017-3735 <https://www.openssl.org/news/secadv/20170828.txt>`_ : It can allow a malicious user to do a one-byte overread.
