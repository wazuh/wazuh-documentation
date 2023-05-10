.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to monitor system calls with Wazuh: its configuration, basic usage, how to monitor user actions, and more. 
  
.. _audit-configuration:

Configuration
=============

The Linux Audit system generates numerous events for write access, read access, execute access, attribute change, or system call rule. Wazuh uses the key argument in audit rules because it is difficult to distinguish audit events using rules and decoders alone. As previously explained, each audit rule can add a descriptive key value to identify what rule generated a particular audit log entry. We use a :doc:`CDB list </user-manual/ruleset/cdb-list>` to determine the types of audit rules fired. This list will have the following syntax:

   .. code-block:: console

      <KEY_NAME>:<VALUE>

where:

- ``<KEY_NAME>`` is the string you used in the argument *-k* of a file system or system call rule.
- ``<VALUE>`` is one of the following values:
   - write: File system rules with ``-p w``.
   - read: File system rules with ``-p r``.
   - execute: File system rules with ``-p x``.
   - attribute: File system rules with ``-p a``.
   - command: System call rules.

Wazuh server
------------

By default, Wazuh includes an audit CDB list. This CDB list contains audit keys that map against write, read, attribute change, execution, and command events.

Run the command below to view the content of the CDB list:

   .. code-block:: console

      # cat /var/ossec/etc/lists/audit-keys

   .. code-block:: console
      :class: output

      audit-wazuh-w:write
      audit-wazuh-r:read
      audit-wazuh-a:attribute
      audit-wazuh-x:execute
      audit-wazuh-c:command

