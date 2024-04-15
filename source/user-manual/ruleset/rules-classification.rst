.. Copyright (C) 2015, Wazuh, Inc.
.. Original content from the OSSEC documentation, available at http://www.ossec.net/docs/manual/rules-decoders/rule-levels.html

.. meta::
  :description: The rules are classified into multiple levels, from 0 to 16. Learn more about Wazuh and Rules classification in this section. 

.. _rules_classification:

Rules classification
====================

The rules are classified in multiple levels, from the lowest (0) to the maximum (16). Some levels are not used at this moment. The following table describes each one, which can be useful to understand the severity of each triggered alert or creating custom rules.

+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| Level | Title                            | Description                                                                                                        |
+=======+==================================+====================================================================================================================+
| 0     | Ignored                          | No action taken. Used to avoid false positives.                                                                    |
|       |                                  |                                                                                                                    |
|       |                                  | These rules are scanned before all the others.                                                                     |
|       |                                  |                                                                                                                    |
|       |                                  | Include events with no security relevance.                                                                         |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 2     | System low priority notification | System notification or status messages. These have no security relevance.                                          |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 3     | Successful/Authorized events     | These include successful login attempts, firewall allow events, etc.                                               |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 4     | System low priority error        | Errors related to bad configurations or unused devices/applications.                                               |
|       |                                  |                                                                                                                    |
|       |                                  | These have no security relevance and are usually caused by default installations or software testing.              |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 5     | User generated error             | These include missed passwords, denied actions, etc. By themselves, these have no security relevance.              |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 6     | Low relevance attack             | These indicate a worm or a virus that have no affect to the system (like code red for apache servers, etc).        |
|       |                                  |                                                                                                                    |
|       |                                  | These also include frequently IDS events and frequently errors.                                                    |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 7     | "Bad word" matching              | These include words like "bad", "error", etc.                                                                      |
|       |                                  |                                                                                                                    |
|       |                                  | These events are most of the time unclassified and may have some security relevance.                               |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 8     | First time seen                  | Include first time seen events. First time an IDS event is fired or the first time a user logged in.               |
|       |                                  |                                                                                                                    |
|       |                                  | It also includes security relevant actions (like the starting of a sniffer or something like that).                |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 9     | Error from invalid source        | Include attempts to login as an unknown user or from an invalid source.                                            |
|       |                                  |                                                                                                                    |
|       |                                  | May have security relevance (specially if repeated).                                                               |
|       |                                  |                                                                                                                    |
|       |                                  | These also include errors regarding the "admin" (root) account.                                                    |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 10    | Multiple user generated errors   | These include multiple bad passwords, multiple failed logins, etc.                                                 |
|       |                                  |                                                                                                                    |
|       |                                  | These may indicate an attack or may just be that a user just forgot his credentials.                               |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 11    | Integrity checking warning       | These include messages regarding the modification of binaries or the presence of rootkits (by Rootcheck).          |
|       |                                  |                                                                                                                    |
|       |                                  | These may indicate a successful attack. Also included IDS events that will be ignored (high number of repetitions).|
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 12    | High importance event            | These include error or warning messages from the system, kernel, etc.                                              |
|       |                                  |                                                                                                                    |
|       |                                  | These may indicate an attack against a specific application.                                                       |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 13    | Unusual error (high importance)  | Most of the times it matches a common attack pattern.                                                              |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 14    | High importance security event   | Most of the times done with correlation and it indicates an attack.                                                |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
| 15    | Severe attack                    | No chances of false positives. Immediate attention is necessary.                                                   |
+-------+----------------------------------+--------------------------------------------------------------------------------------------------------------------+
