.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Explore Wazuh command monitoring: run commands or binaries on monitored endpoints and forward their output for analysis.

.. _manual_command_monitoring:

Command monitoring
==================

The Wazuh command monitoring capability runs commands or binaries on monitored endpoints at specified intervals and forwards their output to Wazuh for analysis.

Based on your needs, you can use the Wazuh Command module to run desired or custom commands that perform the following:

-  Checks that a critical service or process is running
-  Monitors disk space, memory, or CPU usage thresholds
-  Runs custom security or compliance checks (for example, verifying a configuration setting)
-  Detects the presence or absence of specific files, users, or packages
-  Integrates third-party scripts or health-check tools in Wazuh
-  Periodically checks network connectivity or port-reachability

The Security Configuration Assessment (:doc:`SCA </user-manual/capabilities/sec-config-assessment/index>`) and :doc:`Syscollector </user-manual/capabilities/system-inventory/configuration>` modules also cover part of these checks. The Command module runs checks at a finer interval, and detection rules turn its output into findings.

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        how-it-works
        requirements
        configuration
        security-considerations
        use-cases/index