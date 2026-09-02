.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The agent_upgrade tool remotely upgrades Wazuh agents. Learn more about it in this section of the documentation.

.. _agent_upgrade:

agent_upgrade
=============

The ``agent_upgrade`` tool remotely upgrades Wazuh agents.

Use this tool to upgrade one or more Wazuh agents to a newer version, list outdated agents, or install a custom WPK package.

Options
-------

+------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
| Option                                                                 | Description                                                                              |
+========================================================================+==========================================================================================+
| -a <agent_id> [<agent_id> ...], --agents <agent_id> [<agent_id> ...]   | Specifies one or more agent IDs to upgrade.                                              |
+------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
| -d, --debug                                                            | Runs the tool in debug mode.                                                             |
+------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
| -f <file>, --file <file>                                               | Specifies a custom WPK package file.                                                     |
+------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
| -F, --force                                                            | Forces the upgrade, ignoring version validation checks.                                  |
+------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
| -h, --help                                                             | Displays the help message and exits.                                                     |
+------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
| --http                                                                 | Uses HTTP instead of HTTPS to download the upgrade package.                              |
+------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
| -l, --list_outdated                                                    | Lists all outdated agents.                                                               |
+------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
| --package_type <type>                                                  | Specifies the Linux package type to use (rpm or deb).                                    |
+------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
| -r <repository>, --repository <repository>                             | Specifies the repository URL used to download upgrade packages.                          |
+------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
| -s, --silent                                                           | Suppresses command output.                                                               |
+------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
| -v <version>, --version <version>                                      | Specifies the Wazuh version to install. The default is the latest available version.     |
+------------------------------------------------------------------------+------------------------------------------------------------------------------------------+
| -x <file>, --execute <file>                                            | Specifies the executable contained in a custom WPK package. The default is upgrade.sh.   |
+------------------------------------------------------------------------+------------------------------------------------------------------------------------------+

Examples
--------

List outdated agents:

.. code-block:: console

   # /var/wazuh-manager/bin/agent_upgrade -l

The command output looks similar to this:

.. code-block:: none
   :class: output

   ID    Name                                Version
   005   MacOS                               v4.14.5
   011   ubuntu2004                          v4.14.7
   Total outdated agents: 2

Upgrade agent:

.. code-block:: console

   # /var/wazuh-manager/bin/agent_upgrade -a 011

The command output looks similar to this:

.. code-block:: none
   :class: output

   Upgrading...
   Upgraded agents:
     Agent 011 upgraded: Wazuh v4.14.7 -> 5.0.0
