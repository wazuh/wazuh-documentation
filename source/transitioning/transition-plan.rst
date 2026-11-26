.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Review the supported transition scenarios, known limitations, and prerequisites before transitioning from an existing Wazuh 4.x deployment to Wazuh 5.x.

Transition planning
===================

Before transitioning to Wazuh 5.x, review the supported transition scenarios, limitations, and prerequisites. This helps you determine which components and data you can migrate or recreate and prepare the Wazuh 5.x environment for the transition. Keep the existing Wazuh 4.x environment running until you complete and validate the transition to Wazuh 5.x.

.. note::

   This guide covers package-based Wazuh deployments, all-in-one and distributed. You can't upgrade a Wazuh 4.x virtual machine (OVA) or Amazon Machine Image (AMI) in place. Deploy a Wazuh 5.x virtual machine or AMI, then transition the Wazuh agents and settings as this guide describes for an all-in-one deployment. For Ansible deployments, deploy Wazuh 5.x with the Wazuh 5.0 playbooks, then follow this guide. The Wazuh 5.0 roles have no variables for the Wazuh manager configuration. They only set the Wazuh indexer hosts and the cluster settings in ``wazuh-manager.conf``, and keep your other changes to the file. For Docker or Kubernetes deployments of Wazuh 4.x, see :doc:`Docker and Kubernetes deployments <docker-kubernetes-deployments>`.

Transition scope
----------------

The following table summarizes the Wazuh data and configurations that you can migrate or recreate when transitioning from Wazuh 4.x to Wazuh 5.x.

+---------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------+
| **Data or configuration**                                                                   | **Notes**                                                                                  |
+=============================================================================================+============================================================================================+
| :ref:`Wazuh indexer configuration <migration_wazuh_indexer_configuration>`                  | Recreate the configuration in the Wazuh 5.x deployment.                                    |
+---------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------+
| :ref:`Wazuh manager configuration <migration_wazuh_manager_configuration>`                  | Review and recreate supported configuration settings.                                      |
+---------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------+
| :ref:`Wazuh dashboard configuration <migration_wazuh_dashboard_configuration>`              | Review and recreate supported configuration settings.                                      |
+---------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------+
| :ref:`Security configuration <migration_wazuh_indexer_security_configuration>`              | Recreate users, roles, role mappings, and authentication settings.                         |
+---------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------+
| :ref:`Custom dashboards and visualizations <migration_custom_dashboards_and_visualization>` | Export from Wazuh 4.x and import into Wazuh 5.x.                                           |
+---------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------+
| :ref:`Agent registration <migration_agent_registration>`                                    | Migrate existing Wazuh agent registrations to the Wazuh 5.x manager while preserving their |
|                                                                                             | agent IDs and authentication keys. Only the manual procedure keeps the registration dates. |
+---------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------+
| :ref:`Agent groups <migration_migrate_agent_registrations>`                                 | Migrated with the agent registrations, including group configuration. The                  |
|                                                                                             | ``wazuh-migrate-identity.py`` migration tool migrates only the ``agent.conf`` file of each |
|                                                                                             | group.                                                                                     |
+---------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------+

Limitations
-----------

Wazuh 5.x introduces architectural and configuration changes that require you to recreate or replace some Wazuh 4.x components instead of migrating them directly. Review the following before you start the transition:

-  Wazuh 5.x uses new configuration files. Use your Wazuh 4.x settings as a reference and recreate the supported configuration in the corresponding Wazuh 5.x configuration files.

-  Wazuh 5.x doesn't use the Wazuh 4.x XML format for rules and decoders. Recreate the custom detection content that you need using the Wazuh 5.x :ref:`content management <content_management>`. Refer to the :doc:`Data analysis </user-manual/data-analysis/data-analysis-components>` documentation to learn how to create and manage custom rules, decoders, and lists. Wazuh 5.x decoders write only Wazuh Common Schema (WCS) fields and temporary fields. Map each custom Wazuh 4.x decoder field to a WCS field, or drop it. In rule titles, replace ``$(field)`` references with ``{{ <WCS_FIELD> }}`` placeholders.

-  Because Wazuh 5.x uses new index schemas, your Wazuh 4.x indexed data stays in the Wazuh 4.x environment. Keep that environment, optionally read-only, for as long as you need its historical data.

-  The Wazuh 5.x manager doesn't monitor its own host as ``agent 000``, as Wazuh 4.x did. To keep collecting the Wazuh manager host's logs, inventory, SCA, and FIM data, install a Wazuh agent on every Wazuh manager node. Enroll each agent with a token for its node's own address. Install the agents after you migrate the agent registrations, so that their agent IDs don't conflict with migrated agents. For the steps, see the :doc:`Wazuh agent installation guide </installation-guide/wazuh-agent/index>`.

-  Wazuh 5.x uses Alerting monitors instead of frequency rules, such as the Wazuh 4.x rule ``5712`` for SSH brute force. Wazuh 5.x rules don't use ``if_sid``, and an event produces a finding for every rule it matches. To alert on repeated events, create an :doc:`Alerting monitor </user-manual/wazuh-indexer/modules/alerting>` that counts the findings.

-  Wazuh 4.x agents can connect to the Wazuh 5.x manager right away and send log events and findings. Their FIM, SCA, system inventory, and vulnerability detection data appears after you upgrade the agents to Wazuh 5.x. Plan the agent upgrade as part of the transition.

-  A Wazuh 5.x agent connects to one Wazuh manager address. If a Wazuh 4.x agent lists several ``<server>`` addresses for failover, the upgraded agent uses the last one. For failover, use a load balancer in front of the Wazuh manager nodes.

-  Download the Wazuh 4.x PDF reports that you want to keep before you retire the Wazuh 4.x deployment. Previously generated reports aren't carried over to Wazuh 5.x.

.. _migration_prerequisites:

Prerequisites
-------------

Before transitioning to Wazuh 5.x, complete the following prerequisites:

-  Deploy a new Wazuh 5.x environment that matches your deployment architecture. Don't reuse or upgrade an existing Wazuh 4.x deployment in place. Refer to the :doc:`Wazuh installation guide </installation-guide/index>` for your deployment. On Kubernetes, don't apply the Wazuh 5.x manifests to the ``wazuh`` namespace of a running Wazuh 4.x deployment. They use the same object names and replace the Wazuh 4.x components.

   Install the Wazuh 5.x manager on a host that doesn't have a Wazuh 4.x manager. The package refuses such a host:

   .. code-block:: none
      :class: output

      ERROR: A Wazuh manager older than 5.0 is installed on this host: Wazuh manager 5.x can neither upgrade it nor be installed beside it.

-  Verify network connectivity between the Wazuh 4.x and Wazuh 5.x environments. The transition uses SSH (TCP 22) between the Wazuh 4.x and Wazuh 5.x managers. The Wazuh 4.x agents connect to the Wazuh 5.x manager, or its load balancer, on TCP 1514 and 1515, and on TCP 1517 after you upgrade them. In a distributed deployment, the Wazuh dashboard connects to the Wazuh manager API on TCP 55000.

-  Back up your existing Wazuh 4.x deployment before starting the transition to preserve the current configuration and data. For the steps on your Wazuh 4.x version, see the `Backup guide <https://documentation.wazuh.com/4.14/migration-guide/creating/index.html>`__. This migration reads the Wazuh manager ``client.keys``, ``global.db``, and ``authd.pass`` files, the agent group folders, and the configuration files.

-  Plan to stop the Wazuh 4.x manager while exporting agent data, as both agent registration procedures require it to be stopped.

-  Don't enroll any Wazuh agent on the Wazuh 5.x manager, and keep the Wazuh 4.x agents connected to the Wazuh 4.x manager, until you import the agent registrations and verify the import. An agent that enrolls before the import can conflict with a migrated agent ID.

-  If the Wazuh 5.x deployment has several Wazuh manager nodes, set up a load balancer in front of them, or choose the node that each agent must use, before you upgrade any Wazuh agent.
