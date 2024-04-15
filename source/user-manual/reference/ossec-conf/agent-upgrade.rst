.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The agent-upgrade module is responsible for carrying out the entire agent upgrade process remotely. Learn more about it in this section.
  
.. _reference_ossec_agent_upgrade:

agent-upgrade
=============

.. topic:: XML section name

	.. code-block:: xml

		<agent-upgrade>
		</agent-upgrade>

The agent upgrade module is responsible for carrying out the entire agent upgrade process remotely:

- On the manager side, it validates, downloads and/or sends the WPK files to the agents.
- On the agent side, it processes the received commands and sends a notification to the manager after an upgrade process has been accomplished.

This configuration section only needs to be defined in order to change the default values.

Options
-------

Manager side
^^^^^^^^^^^^

- `chunk_size`_
- `wpk_repository`_
- `max_threads`_

.. note:: On the manager side, this module will be always enabled and cannot be deactivated.

Agent side
^^^^^^^^^^

- `enabled`_
- `notification_wait_start`_
- `notification_wait_factor`_
- `notification_wait_max`_
- `ca_verification`_

.. note:: On the agent side, this module can be disabled, and doing so will block remote upgrading of that agent.


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

Maximum number of threads to process upgrades in parallel. Value 0 means the number of CPU cores.

+--------------------+-------------------------------+
| **Default value**  | 8                             |
+--------------------+-------------------------------+
| **Allowed values** | Any number between 0 and 256  |
+--------------------+-------------------------------+
| **Required**       | no                            |
+--------------------+-------------------------------+


enabled
^^^^^^^

Disabling this option will block the agent from upgrading.

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
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit: s (seconds), m (minutes), or h (hours). |
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
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit: s (seconds), m (minutes), or h (hours). |
+--------------------+--------------------------------------------------------------------------------------------------------------------------+
| **Required**       | no                                                                                                                       |
+--------------------+--------------------------------------------------------------------------------------------------------------------------+


ca_verification
^^^^^^^^^^^^^^^

Configuration block to specify CA certificates to validate WPK files.

+---------------------------+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                           | This option enables or disables the WPK validation using the root CA certificate. If this parameter is set to ``no`` the agent will accept any WPK package coming from the manager.  |
|                           +--------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
|  **enabled**              | **Default value**  | yes                                                                                                                                                             |
|                           +--------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                           | **Allowed values** | yes, no                                                                                                                                                         |
+---------------------------+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                           | Indicates the path to the root CA certificate. The agent needs the certificate with which the WPK was signed in order to be updated.                                                 |
|                           +--------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
|  **ca_store**             | **Default value**  | etc/wpk_root.pem                                                                                                                                                |
|                           +--------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                           | **Allowed values** | Path to root CA certificate. It can be referred to a relative path under the Wazuh installation directory or a full path.                                       |
+---------------------------+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+


Sample Configuration
--------------------

.. code-block:: xml

    <!-- On the manager side -->

    <agent-upgrade>
      <chunk_size>16384</chunk_size>
      <wpk_repository>packages.wazuh.com/4.x/wpk/</wpk_repository>
      <max_threads>16</max_threads>
    </agent-upgrade>

    <!-- On the agent side -->
    <agent-upgrade>
      <enabled>yes</enabled>
      <notification_wait_start>60s</notification_wait_start>
      <notification_wait_factor>4</notification_wait_factor>
      <notification_wait_max>2h</notification_wait_max>
      <ca_verification>
        <enabled>yes</enabled>
        <ca_store>etc/wpk_root.pem</ca_store>
      </ca_verification>
    </agent-upgrade>
