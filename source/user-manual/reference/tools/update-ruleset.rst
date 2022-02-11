.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: The update-ruleset script updates decoders, rules, and rootchecks. Find out the arguments of this script in this section of the Wazuh documentation. 

.. _update_ruleset:

update_ruleset
=================

.. deprecated:: 4.2

The ``update-ruleset`` script updates decoders, rules and rootchecks.

+--------+-------------------------------------------------------------------------+
| **-r** | Restart Wazuh when needed.                                              |
+--------+-------------------------------------------------------------------------+
| **-R** | Do not restart Wazuh.                                                   |
+--------+-------------------------------------------------------------------------+
| **-b** | Restore the last backup.                                                |
+--------+-------------------------------------------------------------------------+
| **-h** | Display the help message.                                               |
+--------+-------------------------------------------------------------------------+
| **-f** | Force Wazuh to update the ruleset.                                      |
+--------+-------------------------------------------------------------------------+
| **-s** | Select ruleset source path (instead of downloading it).                 |
+--------+-------------------------------------------------------------------------+
| **-j** | JSON output. Must be used in conjunction with the '-s' option.          |
+--------+-------------------------------------------------------------------------+
| **-d** | Run in debug mode.                                                      |
+--------+-------------------------------------------------------------------------+
| **-n** | Branch name (default: stable).                                          |
+--------+-------------------------------------------------------------------------+
