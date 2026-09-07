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

ca_verification
^^^^^^^^^^^^^^^^

Configures CA certificate validation for WPK packages.

``enabled`` — This option enables or disables validation of WPK packages using the configured root CA certificate. If this parameter is set to ``no`` the agent will accept any WPK package coming from the Wazuh manager.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

``ca_store`` — Path to a CA certificate file used to verify the WPK signature. The tag can be repeated to accept multiple CAs. Only effective when ``ca_verification`` is enabled.

+----------------------+-----------------------------+
| **Default value**    | etc/wpk_root.pem            |
+----------------------+-----------------------------+
| **Allowed values**   | Valid absolute paths        |
+----------------------+-----------------------------+

Deprecated options
^^^^^^^^^^^^^^^^^^^

``notification_wait_start``, ``notification_wait_factor``, ``notification_wait_max`` are still accepted for backward compatibility with 4.x configuration files, but ignored by the current implementation. Each occurrence logs a deprecation warning at startup. Safe to remove from configuration.

Sample Configuration
---------------------

.. code-block:: xml

   <agent-upgrade>
     <enabled>yes</enabled>
     <ca_verification>
       <enabled>yes</enabled>
       <ca_store>etc/wpk_root.pem</ca_store>
     </ca_verification>
   </agent-upgrade>
