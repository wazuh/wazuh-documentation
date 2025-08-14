.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Test and verify rules providing log examples in a sandbox using the wazuh-logtest tool. Learn more about it in this section.

wazuh-logtest
=============

`wazuh-logtest` tool allows the testing and verification of rules against provided log examples inside a sandbox in `wazuh-analysisd`. Helpful when writing and debugging custom rules and decoders, troubleshooting false positives and negatives.

+-------------------------------------------+--------------------------------------------------------------------------------+
| **-d**                                    | Run as a Print debug output to the terminal.                                   |
+-------------------------------------------+--------------------------------------------------------------------------------+
| **-h**                                    | Display the help message.                                                      |
+-------------------------------------------+--------------------------------------------------------------------------------+
| **-U <rule-id:alert-level:decoder-name>** | This option will cause wazuh-logtest to return a zero exit status if the test  |
|                                           |                                                                                |
|                                           | results for the provided log line match the criteria in the arguments.         |
|                                           |                                                                                |
|                                           | Only one log line should be supplied for this to be useful.                    |
+-------------------------------------------+--------------------------------------------------------------------------------+
| **-l <location>**                         | Set custom location.                                                           |
+-------------------------------------------+--------------------------------------------------------------------------------+
| **-V**                                    | Display the version and license information for Wazuh and wazuh-logtest.       |
+-------------------------------------------+--------------------------------------------------------------------------------+
| **-q**                                    | Quiet execution.                                                               |
+-------------------------------------------+--------------------------------------------------------------------------------+
| **-v**                                    | Display the verbose results.                                                   |
+-------------------------------------------+--------------------------------------------------------------------------------+

.. note::

    -v is the key option to troubleshoot a rule or decoder problem.

Example
-------

Test decoding and rule matching for an SSH invalid login attempt:

.. code-block:: console

   # /var/ossec/bin/wazuh-logtest

.. code-block:: none
   :class: output

   Starting wazuh-logtest v4.12.0
   Type one log per line

.. code-block:: none

   Aug 04 08:07:00 linux-agent sshd[39245]: Invalid user baduser from 25.25.25.25 port 57238

.. code-block:: none
   :class: output

   **Phase 1: Completed pre-decoding.
           full event: 'Aug 04 08:07:00 linux-agent sshd[39245]: Invalid user baduser from 25.25.25.25 port 57238'
           timestamp: 'Aug 04 08:07:00'
           hostname: 'linux-agent'
           program_name: 'sshd'

   **Phase 2: Completed decoding.
           name: 'sshd'
           parent: 'sshd'
           srcip: '25.25.25.25'
           srcport: '57238'
           srcuser: 'baduser'

   **Phase 3: Completed filtering (rules).
           id: '5710'
           level: '5'
           description: 'sshd: Attempt to login using a non-existent user'
           groups: '['syslog', 'sshd', 'authentication_failed', 'invalid_login']'
           firedtimes: '1'
           gdpr: '['IV_35.7.d', 'IV_32.2']'
           gpg13: '['7.1']'
           hipaa: '['164.312.b']'
           mail: 'False'
           mitre.id: '['T1110.001', 'T1021.004']'
           mitre.tactic: '['Credential Access', 'Lateral Movement']'
           mitre.technique: '['Password Guessing', 'SSH']'
           nist_800_53: '['AU.14', 'AC.7', 'AU.6']'
           pci_dss: '['10.2.4', '10.2.5', '10.6.1']'
           tsc: '['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3']'
   **Alert to be generated.
