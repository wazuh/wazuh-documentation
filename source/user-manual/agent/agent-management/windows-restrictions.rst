.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the path restrictions for Windows agents to prevent NetNTLMv2 vulnerability.

Windows agent path restrictions
===============================

The Windows agent restricts the use of network paths to prevent potential security vulnerabilities. This restriction affects UNC paths and mapped drives.

Restricted path types
---------------------

The Windows agent blocks the following types of paths:

- UNC paths (Universal Naming Convention): ``\\server\share\path``
- Mapped network drives: ``Z:\path``

Affected components
-------------------

The following components are affected by this restriction:

- Log collector: ``<location>`` configuration
- Syscheck: ``<directories>`` configuration
- Osquery wodle: ``<bin_path>``, ``<log_path>``, and ``<config_path>`` configurations
- Command wodle: ``<command>`` configuration

Warning messages
----------------

When a restricted path is detected, the agent generates warning messages:

Configuration warnings:
~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: none

    WARNING: (9801): Network path not allowed in configuration. 'directories': Z:\scheduled.
    WARNING: (9801): Network path not allowed in configuration. 'location': Z:/test.log.

Runtime warnings:
~~~~~~~~~~~~~~~~~

.. code-block:: none

    WARNING: (9800): File access denied. Network path usage is not allowed: '\\192.168.0.5\shared\scheduled'
    WARNING: Policy file '\\192.168.0.5\shared\scheduled' not found. Check your configuration.

Security considerations
-----------------------

This restriction prevents the NetNTLMv2 vulnerability that could occur during permission negotiations when accessing network files. The agent blocks these paths to ensure secure file access and prevent potential security risks. 