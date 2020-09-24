.. Copyright (C) 2020 Wazuh, Inc.

.. _dev-wazuh-logtest:


Wazuh Logtest
=============

The Wazuh-Logtest solution is distributed by different components of the Wazuh environment:

**Core Logtest**

    The logtest core is part of the *Analysis daemon* (in manager). It has a session manager and shares its rules engine with Logtest.

**Wazuh RESTful API**

    Interact with Core Logtest, and provide an interface to test the rules and decoders remotely.

**Kibana: Wazuh APP**

    Wazuh application for Kibana uses RESTful API to support Logtest from the web interface.

**Wazuh Logtest Tool**

    Interact with Core Logtest to test the rules and decoders locally.


Wazuh API and Wazuh-Logtest Tool connect to the analysisd session manager, this acts as a sandbox with the rules engine, allowing to isolate different users with their own rules and decoders.
The below image illustrations how the user logs test flow through the Wazuh environment.

.. thumbnail:: ../images/development/logtest-flow.png
  :title: Wazuh Logtest
  :align: center
  :width: 100%



Sessions
--------

Wazuh-Logtest is based on the use of unique sessions, identified with a “token”. Each session stores its own history of events, rules and decoders loaded.
When the log evaluation is requested for the first time, the session manager creates a new session, processing and returning the result along with the identification of the new session.

Session lifetime
^^^^^^^^^^^^^^^^

Sessions have a default expiration time of 15 minutes. When a session remains idle, with no log processing requests during that period, the idle session collector closes the session.
Requests with an expired session token are also processed, generate a new session token and notify the user.

Idle session collector
^^^^^^^^^^^^^^^^^^^^^^

The idle session collector, runs every ``session_timeout`` seconds. This parameter is defined in the :ref:`rule_test <reference_ossec_rule_test>` section of the :ref:`ossec.conf <reference_ossec_conf>` file.
Every time the collector starts, it searches for sessions that have been idle for more than ``session_timeout`` seconds to close them.

The following illustration shows how the collector runs on T0, T1, T2 ... At the moment the session generates its last request, between T0 and T1, its timeout is between T1 and T2, then on T2 the collector closes the session.

.. code-block:: none

        ^                                      ^                                      ^
        |                                      |                                      |
        |                                      |                                      |
        |         session_timeout              |                                      |
        |<------------------------------------>|                                      |
        |                                      |                                      |
        |                                      |                                      |
        |                                      |                                      |
        |                                      |                                      |
    <-------------------------------------------------------------------------------------->
        T0              ^                      T1            ^                       T2
                        |--- last request                    |                        ^--- Closes session   
                        |       session_timeout              |
                        <------------------------------------>


