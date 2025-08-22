.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The manage_agents program is available for agent installations. Learn more about it in this section of the Wazuh documentation.

manage_agents
=============

The manage_agents program is available for agent installations.

The purpose of manage_agents is to provide an easy-to-use interface to handle authentication
keys for Wazuh agents. These authentication keys are required for secure (encrypted and
authenticated) communication between the Wazuh server and its affiliated agent instances.

Usage
-----

.. code-block:: none

    manage_agents -[Vhj] [-i id]

Options
-------
+---------------+-----------------------------------------------------------------------+
| **-V**        | Version and license message.                                          |
+---------------+-----------------------------------------------------------------------+
| **-h**        | This help message.                                                    |
+---------------+-----------------------------------------------------------------------+
| **-j**        | Use JSON output.                                                      |
+---------------+-----------------------------------------------------------------------+
| **-i <id>**   | Import authentication key.                                            |
+---------------+-----------------------------+-----------------------------------------+
