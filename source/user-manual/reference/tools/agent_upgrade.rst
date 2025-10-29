.. Copyright (C) 2020 Wazuh, Inc.

.. _agent_upgrade:

agent_upgrade
==============

The agent_upgrade program allows you to list outdated agents and upgrade them.

.. note:: In case of having a multi-node Wazuh cluster, agent_upgrade must be executed on the node where the agent is connected.

+--------------------------------------------+---------------------------------------------------------+
| ``-h, --help``                             | Display the help message.                               |
+--------------------------------------------+---------------------------------------------------------+
| ``-l, --list_outdated``                    | Generates a list with all outdated agents.              |
+--------------------------------------------+---------------------------------------------------------+
| ``-a AGENT_ID, --agent AGENT_ID``          | Agent ID to upgrade.                                    |
+--------------------------------------------+---------------------------------------------------------+
| ``-d, --debug``                            | Debug mode.                                             |
+--------------------------------------------+---------------------------------------------------------+
| ``-F, --force``                            | Allows reinstall same version and downgrade version.    |
+--------------------------------------------+---------------------------------------------------------+
| ``-s, --silent``                           | Do not show output.                                     |
+--------------------------------------------+---------------------------------------------------------+
| ``-v VERSION, --version VERSION``          | Version to install.                                     |
+--------------------------------------------+---------------------------------------------------------+
| ``-r REPOSITORY, --repository REPOSITORY`` | Specify a repository URL.                               |
+--------------------------------------------+---------------------------------------------------------+
| ``-f FILE, --file FILE``                   | Custom WPK filename.                                    |
+--------------------------------------------+---------------------------------------------------------+
| ``-x EXECUTE, --execute EXECUTE``          | Executable filename in the WPK custom file.             |
|                                            | By default it will try to launch upgrade.sh.            |
+--------------------------------------------+---------------------------------------------------------+
| ``-t TIMEOUT, --timeout TIMEOUT``          | Timeout where the agent cannot restart while updating.  |
+--------------------------------------------+---------------------------------------------------------+
| ``-c CHUNK_SIZE, --chunk_size CHUNK_SIZE`` | Chunk size sending WPK file. Allowed values: [1 - 64000]|
+--------------------------------------------+---------------------------------------------------------+

.. note:: By default, the timeout will be the maximum allowed by the agent with the ``execd.max_restart_lock`` option in :doc:`internal_options.conf<../internal-options>`.

Examples
----------

* List outdated agents:

.. code-block:: console

    # agent_upgrade -l

.. code-block:: none
    :class: output

    ID    Name                               Version
    002   VM_Debian9                         Wazuh v3.0.0
    003   VM_Debian8                         Wazuh v3.0.0
    009   VM_WinServ2016                     Wazuh v3.0.0

    Total outdated agents: 3


* Upgrade agent:

.. code-block:: console

    # agent_upgrade -a 002

.. code-block:: none
    :class: output

    Sending WPK: [=========================] 100%
    Upgrade procedure started... Please wait.
    Agent upgraded: Wazuh v3.0.0 -> Wazuh v3.1.0


* Downgrade agent using a custom repository:

.. code-block:: console

    # agent_upgrade -a 002 -dF -v v3.0.0 -r http://mycompany.wpkrepo.com/ -t 500

.. code-block:: none
    :class: output

    Manager version: v3.1.0
    Agent version: v3.1.0
    Agent new version: v3.0.0
    Downloading WPK file from: http://mycompany.wpkrepo.com/debian/9/x86_64/wazuh_agent_v3.0.0_debian_9_x86_64.wpk
    WPK file downloaded: /var/ossec/var/upgrade/wazuh_agent_v3.0.0_debian_9_x86_64.wpk - SHA1SUM: d6f6855b65839d8ce75cc6977ab8b492174699f6
    Upgrade PKG: wazuh_agent_v3.0.0_debian_9_x86_64.wpk (4151 KB)
    MSG SENT: 002 com open wb wazuh_agent_v3.0.0_debian_9_x86_64.wpk
    RESPONSE: ok
    MSG SENT: 002 com lock_restart 500
    RESPONSE: ok
    Sending: /var/ossec/var/upgrade/wazuh_agent_v3.0.0_debian_9_x86_64.wpk
    MSG SENT: 002 com close wazuh_agent_v3.0.0_debian_9_x86_64.wpk
    RESPONSE: ok
    MSG SENT: 002 com sha1 wazuh_agent_v3.0.0_debian_9_x86_64.wpk
    RESPONSE: ok d6f6855b65839d8ce75cc6977ab8b492174699f6
    WPK file sent
    MSG SENT: 002 com upgrade wazuh_agent_v3.0.0_debian_9_x86_64.wpk upgrade.sh
    RESPONSE: ok 0
    Upgrade procedure started
    MSG SENT: 002 com upgrade_result
    RESPONSE: ok 0
    Agent upgraded successfully


* Install custom WPK file:

.. code-block:: console

    # agent_upgrade -a 002 -d -f /root/upgrade_openscap_debian.wpk -x install.sh

.. code-block:: none
    :class: output

    Custom WPK file: upgrade_openscap_debian.wpk (852 KB)
    MSG SENT: 002 com open w upgrade_openscap_debian.wpk
    RESPONSE: ok
    MSG SENT: 002 com lock_restart -1
    RESPONSE: ok
    FILE SHA1: b47bb9807a1bb4ffea8d0528c81ff8fa64fa6355
    MSG SENT: 002 com close upgrade_openscap_debian.wpk
    RESPONSE: ok
    MSG SENT: 002 com sha1 upgrade_openscap_debian.wpk
    RESPONSE: ok b47bb9807a1bb4ffea8d0528c81ff8fa64fa6355
    WPK file sent
    MSG SENT: 002 com upgrade upgrade_openscap_debian.wpk install.sh
    RESPONSE: ok 0
    Installation started
    MSG SENT: 002 com upgrade_result
    RESPONSE: ok 0
    Agent upgraded successfully


.. note:: When the agent finishes updating, it is automatically restarted to apply the new configuration.
