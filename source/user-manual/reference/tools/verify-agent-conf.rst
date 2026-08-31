.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The verify-agent-conf tool validates the syntax of centralized agent.conf configuration files. Learn more about it in this section of the documentation.

.. _verify_agent_conf:

verify-agent-conf
==================

The ``verify-agent-conf`` tool validates the syntax of centralized ``agent.conf`` configuration files.

Use this tool to identify syntax errors before deploying centralized configuration to Wazuh agents.

Options
-------

+-------------+----------------------------------------------------------------------------------------------+
| Option      | Description                                                                                  |
+=============+==============================================================================================+
| -f <file>   | Specifies the full path to the agent.conf file to validate. If omitted, the tool validates   |
|             | all agent.conf files in the shared configuration directory.                                  |
+-------------+----------------------------------------------------------------------------------------------+
| -h          | Displays the help message and exits.                                                         |
+-------------+----------------------------------------------------------------------------------------------+

Example
-------

.. code-block:: console

   # /var/wazuh-manager/bin/verify-agent-conf

The command output looks similar to this:

.. code-block:: none
   :class: output

   verify-agent-conf: Verifying [etc/shared/default/agent.conf]
   verify-agent-conf: OK
   verify-agent-conf: Verifying [etc/shared/macOS/agent.conf]
   verify-agent-conf: OK
   verify-agent-conf: Verifying [etc/shared/Windows/agent.conf]
   verify-agent-conf: OK
   verify-agent-conf: Verifying [etc/shared/Linux/agent.conf]
   verify-agent-conf: OK
