.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Review the platform support, permissions, custom script, and remote command execution requirements for Wazuh command monitoring.

Requirements
============

Before you configure command monitoring, verify that your environment meets the requirements below.

Supported platforms
--------------------

Command monitoring is supported on all major Wazuh agent platforms, including Linux, Windows, and macOS, without requiring additional packages. The commands executed are platform-specific using:

-  Shell utilities on Linux and macOS
-  Command Prompt (CMD) or PowerShell on Windows.

As a result, command monitoring configurations are not portable across operating systems and must be adapted for each platform.

Permissions
-----------

Monitored commands run with the privileges of the Wazuh agent. The agent runs as the ``root`` user on Linux and macOS endpoints, and as the ``Local System account`` on Windows endpoints.

You need root or administrator privileges to complete the configuration tasks:

-  Editing the :ref:`configuration files <command_monitoring_configuration_files>`
-  Placing custom scripts in protected directories
-  Restarting the Wazuh agent and the Wazuh manager

Custom scripts
--------------

A monitored command can point to a custom script. Every script must meet these conditions:

-  The script exists at the configured path on each monitored endpoint.
-  The script is executable and declares a valid interpreter.

Remote command execution
-------------------------

By default, Wazuh agents reject commands distributed through the centralized configuration. To run commands defined in a :ref:`centralized configuration <command_monitoring_centralized_configuration>` file, you must enable remote command execution on every target endpoint.
