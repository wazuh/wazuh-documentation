.. Copyright (C) 2020 Wazuh, Inc.

.. _reference_ossec_agent_upgrade:

agent-upgrade
=============

.. topic:: XML section name

	.. code-block:: xml

		<agent-upgrade>
		</agent-upgrade>

The agent upgrade module is responsible for carrying out the entire agent upgrade process remotely, both downloading and/or sending the WPK from the manager to the agent as well as sending the response with the result of an upgrade from the agent to the manager. In the manager side, this module will be enabled always and cannot be deactivated. This section does not need to be defined but needs to be defined in order to change the default values.

Options
-------

Manager side
^^^^^^^^^^^^

- `chunk_size`_
- `wpk_repository`_

Agent side
^^^^^^^^^^

- `enabled`_
- `notification_wait_start`_
- `notification_wait_factor`_
- `notification_wait_max`_


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


enabled
^^^^^^^

Disabling this option will block the agent for upgrading.

+--------------------+----------+
| **Default value**  | yes      |
+--------------------+----------+
| **Allowed values** | yes, no  |
+--------------------+----------+
| **Required**       | no       |
+--------------------+----------+


notification_wait_start
^^^^^^^^^^^^^^^^^^^^^^^

Initial time that the agent will wait to retry sending the upgrade confirmation if the first attempt remains unanswered. Can use second, minute and hour format.

+--------------------+--------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 5m                                                                                                                       |
+--------------------+--------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit: s (seconds), m (minutes) or h (hours).  |
+--------------------+--------------------------------------------------------------------------------------------------------------------------+
| **Required**       | no                                                                                                                       |
+--------------------+--------------------------------------------------------------------------------------------------------------------------+


notification_wait_factor
^^^^^^^^^^^^^^^^^^^^^^^^

Time increase factor between successive notifications.

+--------------------+------------------------------+
| **Default value**  | 2.0                          |
+--------------------+------------------------------+
| **Allowed values** | Any number greater than 1.0  |
+--------------------+------------------------------+
| **Required**       | no                           |
+--------------------+------------------------------+


notification_wait_max
^^^^^^^^^^^^^^^^^^^^^

Maximum time allowed between successive notifications. Can use second, minute and hour format.

+--------------------+--------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1h                                                                                                                       |
+--------------------+--------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit: s (seconds), m (minutes) or h (hours).  |
+--------------------+--------------------------------------------------------------------------------------------------------------------------+
| **Required**       | no                                                                                                                       |
+--------------------+--------------------------------------------------------------------------------------------------------------------------+


Sample Configuration
--------------------

.. code-block:: xml

    <!-- On the manager side -->

    <agent-upgrade>
      <chunk_size>16384</chunk_size>
      <wpk_repository>packages.wazuh.com/wpk/</wpk_repository>
    </agent-upgrade>

    <!-- On the agent side -->
    <agent-upgrade>
      <enabled>yes</enabled>
      <notification_wait_start>60s</notification_wait_start>
      <notification_wait_factor>4</notification_wait_factor>
      <notification_wait_max>2h</notification_wait_max>
    </agent-upgrade>
