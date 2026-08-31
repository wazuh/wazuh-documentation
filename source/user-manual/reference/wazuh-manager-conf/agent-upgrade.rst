.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the agent-upgrade configuration section of wazuh-manager.conf, which configures remote Wazuh agent upgrades.

.. _reference_wazuh_manager_conf_agent_upgrade:

agent-upgrade
=============

.. topic:: XML section name

   .. code-block:: xml

      <agent-upgrade>
      </agent-upgrade>

The ``<agent-upgrade>`` section configures remote Wazuh agent upgrades. It manages WPK package retrieval, package transfer to agents, and upgrade execution.

This section works with ``<task-manager>``, which manages upgrade task status, timeouts, and record cleanup.

Options
-------

- `enabled`_
- `wpk_repository`_
- `chunk_size`_
- `max_threads`_

enabled
^^^^^^^

Enables or disables remote Wazuh agent upgrades.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

wpk_repository
^^^^^^^^^^^^^^^

Base URL from which WPK upgrade packages are downloaded. A trailing ``/`` is added automatically at runtime if absent. If not set, the manager constructs the URL as ``packages.wazuh.com/<major>.x/wpk/`` using the manager's own major version.

+----------------------+-------------------------------------------------------------------------------------+
| **Default value**    | None. The repository URL is derived automatically from the Wazuh manager version.   |
+----------------------+-------------------------------------------------------------------------------------+
| **Allowed values**   | Any valid URL                                                                       |
+----------------------+-------------------------------------------------------------------------------------+

chunk_size
^^^^^^^^^^^

Specifies the size, in bytes, of each chunk transferred to an agent during a WPK package transfer.

+----------------------+----------------------------+
| **Default value**    | 32768                      |
+----------------------+----------------------------+
| **Allowed values**   | Integer from 64 to 60000   |
+----------------------+----------------------------+

max_threads
^^^^^^^^^^^^

Specifies the maximum number of agent upgrade operations that can run concurrently.

Set this option to ``0`` to use the number of available CPU cores.

+----------------------+------------------------------------------+
| **Default value**    | 8                                        |
+----------------------+------------------------------------------+
| **Allowed values**   | 0 (CPU count) or integer from 1 to 256   |
+----------------------+------------------------------------------+

Sample configuration
---------------------

.. code-block:: xml

   <agent-upgrade>
     <enabled>yes</enabled>
     <chunk_size>32768</chunk_size>
     <max_threads>8</max_threads>
   </agent-upgrade>
