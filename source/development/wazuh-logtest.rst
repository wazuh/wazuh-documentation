.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh-Logtest solution is distributed by different components of the Wazuh environment: core logtest, wazuh RESTful API, and wazuh-logtest tool. 

Wazuh-Logtest
=============

The Wazuh Logtest tool is designed to help users test and validate decoders, rules, and event parsing logic. It allows security engineers and developers to simulate how Wazuh will interpret specific log messages without needing to inject them into a live agent or production environment. This tool is particularly helpful when writing and debugging custom rules and decoders, as well as when troubleshooting false positives and false negatives, ensuring more accurate and reliable alerting.

The Wazuh-Logtest tool is accessible across different components within the Wazuh ecosystem:

- Core Logtest engine: This is the underlying engine that powers Wazuh log testing. It is integrated directly into the :ref:`wazuh-analysisd <wazuh-analysisd>` daemon, which is responsible for log analysis and rule evaluation.

- Wazuh Server API: This provides a remote interface to the Core Logtest engine, allowing users to send sample log messages and receive parsing results. This is particularly useful for automating rule testing or integrating with external tools.

- Wazuh CLI Logtest tool: This is a command-line utility that provides a user-friendly way to test log messages locally, leveraging the same Core Logtest engine used by the Wazuh server API.

Wazuh server API and :doc:`Wazuh-Logtest tool </user-manual/reference/tools/wazuh-logtest>` connect to the wazuh-analysisd session manager. This session manager works as a sandbox with the rules engine, isolating different users with their own rules and decoders.

 The image below illustrates how the user logs test flow through the Wazuh environment.

.. thumbnail:: ../images/development/logtest-flow.png
  :title: Wazuh Logtest
  :align: center
  :width: 100%

Sessions
--------

Wazuh-Logtest is based on the use of isolated sessions, identified with a "token". Each session stores its own history of events, rules and decoders loaded. When the log evaluation is requested for the first time, the session manager creates a new session, processing and returning the result along with the alphanumeric token as identification of the new session.

Idle session collector
^^^^^^^^^^^^^^^^^^^^^^

The idle session collector runs every ``session_timeout`` seconds. This parameter is defined in the :ref:`rule_test <reference_ossec_rule_test>` section of the :ref:`ossec.conf <reference_ossec_conf>` file. Every time the collector starts, it searches for sessions that have been idle longer than the time specified in ``session_timeout`` to close them.

The following illustration shows how the collector runs on T0, T1, T2 ... At the moment the session generates its last request, between T0 and T1, its timeout is between T1 and T2, then on T2 the collector closes the session.

.. thumbnail:: ../images/manual/wazuh-logtest/logtest-session-collector.png
  :title: Idle session collector
  :align: center
  :width: 100%



Session lifetime
^^^^^^^^^^^^^^^^

Sessions have a default expiration time of 15 minutes. When a session remains idle with no log processing requests during that period, the idle session collector closes the session. Requests with an expired session token are also processed, generate a new session token and notify the user.
