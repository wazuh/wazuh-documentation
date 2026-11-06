.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out our User manual to see the available tools and their supported installations for configuring and using each of the Wazuh components.

.. _tools:

Tools
=====

The following command-line tools are available in Wazuh 5.0. The ``agent_control`` tool was removed in Wazuh 5.0: use the Wazuh manager API, for example ``GET /agents``, or the Wazuh dashboard to list and manage agents.

+------------------------------------------------------------------------------+--------------------------------------------------------------------------------+------------------------+
| Tool                                                                         | Description                                                                    | Supported installation |
+==============================================================================+================================================================================+========================+
| :doc:`agent_groups <agent-groups>`                                           | Manages agent groups and group assignments.                                    | Wazuh manager          |
+------------------------------------------------------------------------------+--------------------------------------------------------------------------------+------------------------+
| :doc:`agent_upgrade <agent-upgrade>`                                         | Lists outdated agents and performs remote agent upgrades.                      | Wazuh manager          |
+------------------------------------------------------------------------------+--------------------------------------------------------------------------------+------------------------+
| :doc:`cluster_control <cluster-control>`                                     | Manages and retrieves information about the Wazuh manager cluster.             | Wazuh manager          |
+------------------------------------------------------------------------------+--------------------------------------------------------------------------------+------------------------+
| :doc:`manage_agents <manage-agents>`                                         | Imports a client key on a Wazuh agent with ``-i <KEY>``.                       | Wazuh agent            |
+------------------------------------------------------------------------------+--------------------------------------------------------------------------------+------------------------+
| :doc:`rbac_control <rbac-control>`                                           | Manages API role-based access control resources and the RBAC database.         | Wazuh manager          |
+------------------------------------------------------------------------------+--------------------------------------------------------------------------------+------------------------+
| :doc:`resolve-credentials <resolve-credentials>`                             | Sets up and checks the passwords, certificate authority and certificates of    | Wazuh dashboard        |
|                                                                              | the Wazuh dashboard.                                                           |                        |
+------------------------------------------------------------------------------+--------------------------------------------------------------------------------+------------------------+
| :doc:`verify-agent-conf <verify-agent-conf>`                                 | Validates the centralized agent configuration.                                 | Wazuh manager          |
+------------------------------------------------------------------------------+--------------------------------------------------------------------------------+------------------------+
| :doc:`wazuh-agent-auth <wazuh-agent-auth>`                                   | Enrolls a Wazuh agent with an enrollment token, enrolls it again, or refreshes | Wazuh agent            |
|                                                                              | its trust anchor and Wazuh manager address.                                    |                        |
+------------------------------------------------------------------------------+--------------------------------------------------------------------------------+------------------------+
| :doc:`wazuh-control <wazuh-control>`                                         | Manages the status of Wazuh agent services.                                    | Wazuh agent            |
+------------------------------------------------------------------------------+--------------------------------------------------------------------------------+------------------------+
| :doc:`wazuh-manager-certs <wazuh-manager-certs>`                             | Inspects, checks and updates the CA bundle the Wazuh manager serves to Wazuh   | Wazuh manager          |
|                                                                              | agents.                                                                        |                        |
+------------------------------------------------------------------------------+--------------------------------------------------------------------------------+------------------------+
| :doc:`wazuh-manager-conf <wazuh-manager-conf>`                               | Validates the Wazuh manager configuration file and prints the effective        | Wazuh manager          |
|                                                                              | configuration.                                                                 |                        |
+------------------------------------------------------------------------------+--------------------------------------------------------------------------------+------------------------+
| :doc:`wazuh-manager-control <wazuh-manager-control>`                         | Manages the status of Wazuh manager services.                                  | Wazuh manager          |
+------------------------------------------------------------------------------+--------------------------------------------------------------------------------+------------------------+
| :doc:`wazuh-manager-keystore <wazuh-manager-keystore>`                       | Stores and manages sensitive configuration values used by the Wazuh manager.   | Wazuh manager          |
+------------------------------------------------------------------------------+--------------------------------------------------------------------------------+------------------------+
| :doc:`wazuh-manager-resolve-credentials <wazuh-manager-resolve-credentials>` | Sets up and checks the passwords, certificate authority and certificates of    | Wazuh manager          |
|                                                                              | the Wazuh manager.                                                             |                        |
+------------------------------------------------------------------------------+--------------------------------------------------------------------------------+------------------------+
| :doc:`wazuh-manager-service-control <wazuh-manager-service-control>`         | Restarts or reloads the Wazuh manager service. ``reload`` keeps agent          | Wazuh manager          |
|                                                                              | connections active.                                                            |                        |
+------------------------------------------------------------------------------+--------------------------------------------------------------------------------+------------------------+

.. toctree::
   :hidden:
   :maxdepth: 1

   agent-groups
   agent-upgrade
   cluster-control
   manage-agents
   rbac-control
   resolve-credentials
   verify-agent-conf
   wazuh-agent-auth
   wazuh-control
   wazuh-manager-certs
   wazuh-manager-conf
   wazuh-manager-control
   wazuh-manager-keystore
   wazuh-manager-resolve-credentials
   wazuh-manager-service-control
