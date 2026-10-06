.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: List outdated agents and upgrade them using the agent_upgrade program. Learn more about it in this section of the Wazuh documentation.
  
.. _agent_upgrade:

agent_upgrade
==============

The agent_upgrade program allows you to list outdated agents and upgrade them.

.. note:: In case of having a multi-node Wazuh cluster, agent_upgrade must be executed on the node where the agent is connected.

.. note::

   Since v4.1.0, the upgrade procedure is performed by the :doc:`Agent upgrade module </user-manual/agent/agent-management/remote-upgrading/agent-upgrade-module>` and the agent_upgrade script can be executed on any node.


+--------------------------------------------+--------------------------------------------------------------------------------+
| Option                                     | Description                                                                    |
+============================================+================================================================================+
| -h, --help                                 | Displays the help message.                                                     |
+--------------------------------------------+--------------------------------------------------------------------------------+
| -l, --list_outdated                        | Generates a list with all outdated agents.                                     |
+--------------------------------------------+--------------------------------------------------------------------------------+
| -a AGENT_IDs, --agents AGENT_IDs           | Agent IDs to upgrade. When upgrading multiple agents, separate IDs with spaces.|
+--------------------------------------------+--------------------------------------------------------------------------------+
| -F, --force                                | Forces the agents to upgrade, ignoring version validations.                    |
+--------------------------------------------+--------------------------------------------------------------------------------+
| -s, --silent                               | Do not show output.                                                            |
+--------------------------------------------+--------------------------------------------------------------------------------+
| -v VERSION, --version VERSION              | Version to upgrade. [Default: latest Wazuh version]                            |
+--------------------------------------------+--------------------------------------------------------------------------------+
| -r REPOSITORY, --repository REPOSITORY     | Specify a repository URL. [Default: packages.wazuh.com/4.x/wpk/]               |
+--------------------------------------------+--------------------------------------------------------------------------------+
| -f FILE, --file FILE                       | Custom WPK filename.                                                           |
+--------------------------------------------+--------------------------------------------------------------------------------+
| -x EXECUTE, --execute EXECUTE              | Executable filename in the WPK custom file. [Default ``upgrade.sh``]           |
+--------------------------------------------+--------------------------------------------------------------------------------+
| --http                                     | Uses http protocol instead of https.                                           |
+--------------------------------------------+--------------------------------------------------------------------------------+

.. note:: By default, the timeout will be the maximum allowed by the agent with the ``execd.max_restart_lock`` option in :doc:`internal_options.conf<../internal-options>`.

Examples
----------

* List outdated agents:

.. code-block:: console

    # /var/ossec/bin/agent_upgrade -l

.. code-block:: none
    :class: output

    ID    Name                               Version
    002   VM_Debian9                         Wazuh v3.13.2
    003   VM_Debian8                         Wazuh v3.13.2
    009   VM_WinServ2016                     Wazuh v3.10.1

    Total outdated agents: 3


* Upgrade agent:

.. code-block:: console

    # /var/ossec/bin/agent_upgrade -a 002

.. code-block:: none
    :class: output

    Upgrading...

    Upgraded agents:
        Agent 002 upgraded: Wazuh v3.13.2 -> |WAZUH_CURRENT|


* Upgrade multiple agents:

.. code-block:: console

    # /var/ossec/bin/agent_upgrade -a 001 002

.. code-block:: none
   :class: output

   Upgrading...

   Upgraded agents:
       Agent 001 upgraded: Wazuh v4.2.0 -> |WAZUH_CURRENT|
       Agent 002 upgraded: Wazuh v4.0.0 -> |WAZUH_CURRENT|


* Upgrade agent using a custom repository:

.. code-block:: console

    # /var/ossec/bin/agent_upgrade -a 002 -v v4.0.0 -r http://mycompany.wpkrepo.com/

.. code-block:: none
    :class: output

    Upgrading...

    Upgraded agents:
        Agent 002 upgraded: Wazuh v3.13.2 -> 4.0.0


* Install custom WPK file:

.. code-block:: console

    # /var/ossec/bin/agent_upgrade -a 002 -d -f /root/upgrade_openscap_debian.wpk -x install.sh

.. code-block:: none
    :class: output

    Upgrading...

    Upgraded agents:
        Agent 002 upgraded: Wazuh v3.13.2 -> 4.0.0


.. note:: When the agent finishes updating, it is automatically restarted to apply the new configuration.
