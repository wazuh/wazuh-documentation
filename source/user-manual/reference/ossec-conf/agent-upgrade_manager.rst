.. Copyright (C) 2020 Wazuh, Inc.

.. _reference_ossec_agent_upgrade_manager:

agent-upgrade (Manager)
=======================

.. topic:: XML section name

	.. code-block:: xml

		<agent-upgrade>
		</agent-upgrade>

The agent upgrade module is responsible for carrying out the entire agent upgrade process remotely:

- On the manager side, it validates, downloads and/or sends the WPK files to the agents.

This configuration section only needs to be defined in order to change the default values.

.. note:: It is also necessary to include agent-upgrade configuration in the agent side, check :ref:`here <reference_ossec_agent_upgrade_agent>`.

Options
-------

- `chunk_size`_
- `wpk_repository`_
- `max_threads`_

.. note:: On the manager side, this module will be always enabled and cannot be deactivated.


chunk_size
^^^^^^^^^^

Size in KB of the chunk that will be used to send the WPK file.

+--------------------+----------------------------------+
| **Default value**  | 512                              |
+--------------------+----------------------------------+
| **Allowed values** | Any number between 64 and 32768  |
+--------------------+----------------------------------+
| **Required**       | no                               |
+--------------------+----------------------------------+


wpk_repository
^^^^^^^^^^^^^^

Repository where the WPK files will be downloaded.

+--------------------+--------------------------------------------------+
| **Default value**  | packages.wazuh.com/4.x/wpk/                      |
+--------------------+--------------------------------------------------+
| **Allowed values** | Any repository URL that contains the WPK files.  |
+--------------------+--------------------------------------------------+
| **Required**       | no                                               |
+--------------------+--------------------------------------------------+


max_threads
^^^^^^^^^^^

Maximum number of threads to process upgrades in parallel. Value 0 means number of CPU cores.

+--------------------+-------------------------------+
| **Default value**  | 8                             |
+--------------------+-------------------------------+
| **Allowed values** | Any number between 0 and 256  |
+--------------------+-------------------------------+
| **Required**       | no                            |
+--------------------+-------------------------------+


Sample Configuration
--------------------

.. code-block:: xml

    <!-- On the manager side -->

    <agent-upgrade>
      <chunk_size>16384</chunk_size>
      <wpk_repository>packages.wazuh.com/wpk/</wpk_repository>
      <max_threads>16</max_threads>
    </agent-upgrade>
