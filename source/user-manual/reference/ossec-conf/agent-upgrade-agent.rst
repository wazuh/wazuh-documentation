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

- On the agent side, it processes the received commands and sends a notification to the manager after an upgrade process has been accomplished.

This configuration section only needs to be defined in order to change the default values.

.. note:: It is also necessary to include agent-upgrade configuration on the manager side, check :ref:`here <reference_ossec_agent_upgrade_manager>`.

Options
-------

- `enabled`_
- `notification_wait_start`_
- `notification_wait_factor`_
- `notification_wait_max`_
- `ca_verification`_

.. note:: On the agent side, this module can be disabled, and doing so will block remote upgrading of that agent.


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
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit: s (seconds), m (minutes) or h (hours).  |
+--------------------+--------------------------------------------------------------------------------------------------------------------------+
| **Required**       | no                                                                                                                       |
+--------------------+--------------------------------------------------------------------------------------------------------------------------+


ca_verification
^^^^^^^^^^^^^^^

.. versionadded:: 4.1.0

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
|                           | **Allowed values** | Path to root CA certificate. It can be referred to a relative path under the Wazuh installation directory, or a full path.                                      |
+---------------------------+--------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+


Sample Configuration
--------------------

.. code-block:: xml

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
