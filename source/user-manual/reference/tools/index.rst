.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out our User manual to see the available tools and their supported installations for configuring and using each of the Wazuh components.

.. _tools:

Tools
=====

The following command-line tools are available in Wazuh 5.0.

+----------------------------------------------------------+--------------------------------------------------------------------------------+--------------------------+
| Tool                                                     | Description                                                                    | Supported installation   |
+==========================================================+================================================================================+==========================+
| :doc:`agent_groups <agent-groups>`                       | Manages agent groups and group assignments.                                    | Wazuh manager            |
+----------------------------------------------------------+--------------------------------------------------------------------------------+--------------------------+
| :doc:`agent_upgrade <agent-upgrade>`                     | Lists outdated agents and performs remote agent upgrades.                      | Wazuh manager            |
+----------------------------------------------------------+--------------------------------------------------------------------------------+--------------------------+
| :doc:`cluster_control <cluster-control>`                 | Manages and retrieves information about the Wazuh manager cluster.             | Wazuh manager            |
+----------------------------------------------------------+--------------------------------------------------------------------------------+--------------------------+
| :doc:`rbac_control <rbac-control>`                       | Manages API role-based access control resources and the RBAC database.         | Wazuh manager            |
+----------------------------------------------------------+--------------------------------------------------------------------------------+--------------------------+
| :doc:`verify-agent-conf <verify-agent-conf>`             | Validates the centralized agent configuration.                                 | Wazuh manager            |
+----------------------------------------------------------+--------------------------------------------------------------------------------+--------------------------+
| :doc:`wazuh-control <wazuh-control>`                     | Manages the status of Wazuh agent services.                                    | Wazuh agent              |
+----------------------------------------------------------+--------------------------------------------------------------------------------+--------------------------+
| :doc:`wazuh-manager-control <wazuh-manager-control>`     | Manages the status of Wazuh manager services.                                  | Wazuh manager            |
+----------------------------------------------------------+--------------------------------------------------------------------------------+--------------------------+
| :doc:`wazuh-manager-keystore <wazuh-manager-keystore>`   | Stores and manages sensitive configuration values used by the Wazuh manager.   | Wazuh manager            |
+----------------------------------------------------------+--------------------------------------------------------------------------------+--------------------------+

.. toctree::
   :hidden:
   :maxdepth: 1

   agent-groups
   agent-upgrade
   cluster-control
   rbac-control
   verify-agent-conf
   wazuh-control
   wazuh-manager-control
   wazuh-manager-keystore
