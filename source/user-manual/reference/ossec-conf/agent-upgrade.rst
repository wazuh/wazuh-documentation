.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the agent-upgrade configuration section of ossec.conf, which configures the remote upgrade behavior of the Wazuh agent.

.. _reference_ossec_agent_upgrade:

agent-upgrade
=============

.. topic:: XML section name

   .. code-block:: xml

      <agent-upgrade>
      </agent-upgrade>

The ``<agent-upgrade>`` section configures the remote upgrade behavior of the Wazuh agent. It controls whether the agent accepts remote upgrade requests, how it retries upgrade notifications, and how it validates signed WPK packages. Define this section only when you need to override the default settings.

Options
-------

- `enabled`_
- `notification_wait_start`_
- `notification_wait_factor`_
- `notification_wait_max`_
- `ca_verification`_

enabled
^^^^^^^

Enables or disables remote upgrades on the agent. Setting this option to ``no`` prevents the agent from accepting remote upgrade requests.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+
| **Required**         | no        |
+----------------------+-----------+

notification_wait_start
^^^^^^^^^^^^^^^^^^^^^^^^

Defines the initial delay before the agent retries an unanswered upgrade confirmation. Can use second, minute and hour format.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | 5m                                                                                           |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | A positive number that should contain a suffix character indicating a time unit: s           |
|                      | (seconds), m (minutes), or h (hours).                                                        |
+----------------------+----------------------------------------------------------------------------------------------+
| **Required**         | no                                                                                           |
+----------------------+----------------------------------------------------------------------------------------------+

notification_wait_factor
^^^^^^^^^^^^^^^^^^^^^^^^^

Defines the multiplication factor applied to the delay between successive upgrade confirmation retries.

+----------------------+-------------------------------+
| **Default value**    | 2.0                           |
+----------------------+-------------------------------+
| **Allowed values**   | Any number greater than 1.0   |
+----------------------+-------------------------------+
| **Required**         | no                            |
+----------------------+-------------------------------+

notification_wait_max
^^^^^^^^^^^^^^^^^^^^^^^

Defines the maximum delay between successive upgrade confirmation retries. Can use second, minute and hour format.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | 1h                                                                                           |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | A positive number that should contain a suffix character indicating a time unit: s           |
|                      | (seconds), m (minutes), or h (hours).                                                        |
+----------------------+----------------------------------------------------------------------------------------------+
| **Required**         | no                                                                                           |
+----------------------+----------------------------------------------------------------------------------------------+

ca_verification
^^^^^^^^^^^^^^^^

Configures CA certificate validation for WPK packages.

``enabled`` — This option enables or disables validation of WPK packages using the configured root CA certificate. If this parameter is set to ``no`` the agent will accept any WPK package coming from the Wazuh manager.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

``ca_store`` — Indicates the path to the root CA certificate. The agent needs the certificate with which the WPK was signed in order to be updated.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | etc/wpk_root.pem                                                                             |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | Path to root CA certificate. It can be referred to a relative path under the Wazuh           |
|                      | installation directory or a full path.                                                       |
+----------------------+----------------------------------------------------------------------------------------------+

Sample Configuration
---------------------

.. code-block:: xml

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
