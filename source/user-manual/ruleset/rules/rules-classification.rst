.. Copyright (C) 2015, Wazuh, Inc.
.. Original content from the OSSEC documentation, available at http://www.ossec.net/docs/manual/rules-decoders/rule-levels.html

.. meta::
   :description: 

Rules classification
====================

Rules are categorized into multiple levels, ranging from the lowest (0) to the maximum (16). The table below outlines each level, providing insight into the severity of each triggered alert and aiding in the creation of custom rules.

+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| Level | Title                            | Description                                                                                                        |
+=======+==================================+====================================================================================================================+
| 0     | Ignored                          | No action taken. Used to avoid false positives.                                                                    |
|       |                                  |                                                                                                                    |
|       |                                  | These rules are scanned before all the others, include events with no security relevance and do not appear in the  |
|       |                                  | security event dashboard.                                                                                          |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 2     | System low priority notification | System notification or status messages. These have no security relevance and do not appear in the security event   |
|       |                                  | dashboard.                                                                                                         |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 3     | Successful/Authorized events     | These include successful login attempts, firewall allow events, etc.                                               |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 4     | System low priority error        | Errors related to bad configurations or unused devices/applications.                                               |
|       |                                  |                                                                                                                    |
|       |                                  | These have no security relevance and are usually caused by default installations or software testing.              |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 5     | User generated error             | These include missed passwords, denied actions, etc. By themselves, these have no security relevance.              |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 6     | Low relevance attack             | These indicate a worm or a virus that has no effect on the system (like code red for Apache servers, etc).         |
|       |                                  |                                                                                                                    |
|       |                                  | These also include frequent IDS events and frequent errors.                                                        |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 7     | "Bad word" matching              | These include words like "bad", "error", etc.                                                                      |
|       |                                  |                                                                                                                    |
|       |                                  | These events are most of the time unclassified and may have some security relevance.                               |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 8     | First time seen                  | Include first time seen events. First time an IDS event is fired or the first time a user logs in.                 |
|       |                                  |                                                                                                                    |
|       |                                  | It also includes security relevant actions such as the activation of a sniffer or similar activities.              |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 9     | Error from invalid source        | Include attempts to login as an unknown user or from an invalid source.                                            |
|       |                                  |                                                                                                                    |
|       |                                  | May have security relevance (especially if repeated).                                                              |
|       |                                  |                                                                                                                    |
|       |                                  | These also include errors regarding the "admin" (root) account.                                                    |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 10    | Multiple user generated errors   | These include multiple bad passwords, multiple failed logins, etc.                                                 |
|       |                                  |                                                                                                                    |
|       |                                  | These may indicate an attack or simply signal that a user has forgotten their credentials.                         |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 11    | Integrity checking warning       | These include messages regarding the modification of binaries or the presence of rootkits (by Rootcheck).          |
|       |                                  |                                                                                                                    |
|       |                                  | These may indicate a successful attack. Also included IDS events that will be ignored (high number of repetitions).|
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 12    | High importance event            | These include error or warning messages from the system, kernel, etc.                                              |
|       |                                  |                                                                                                                    |
|       |                                  | These may indicate an attack against a specific application.                                                       |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 13    | Unusual error (high importance)  | It matches a common attack pattern most of the time.                                                               |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 14    | High importance security event   | It is triggered with correlation most of the time, and it indicates an attack.                                     |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 15    | Severe attack                    | No chances of false positives. Immediate attention is necessary.                                                   |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
