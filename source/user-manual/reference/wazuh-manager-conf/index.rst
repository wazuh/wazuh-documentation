.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the Wazuh manager local configuration file, wazuh-manager.conf, including its configuration sections in this section of our documentation.

.. _reference_wazuh_manager_conf:

Wazuh manager local configuration (wazuh-manager.conf)
========================================================

The ``/var/wazuh-manager/etc/wazuh-manager.conf`` file is the main local configuration file for the Wazuh manager. In Wazuh 5.0 and later, this file replaces the manager-side ``/var/ossec/etc/ossec.conf`` file from earlier versions.

We recommend that you back up the file before editing it. An invalid configuration might prevent Wazuh manager services from starting.

The ``wazuh-manager.conf`` file uses XML syntax. Enclose all Wazuh manager configuration sections within the ``<wazuh_config>`` element.

The following example shows the placement of the ``<global>`` configuration section:

.. code-block:: xml

   <wazuh_config>
     <global>
       <!--
       Global options here
       -->
     </global>
   </wazuh_config>

To manage agent configuration centrally, use the ``/var/wazuh-manager/etc/shared/<GROUP_NAME>/agent.conf`` file. The ``agent.conf`` file distributes supported configuration settings to all agents assigned to the specified group.

Configuration sections
-----------------------

The following table lists the configuration sections available in ``wazuh-manager.conf``.

+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| Section                                                    | Description                                                                       |
+============================================================+===================================================================================+
| :doc:`global <global>`                                     | Configures global Wazuh manager settings, including agent disconnection timing.   |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| :doc:`logging <logging>`                                   | Configures the format of Wazuh manager internal logs.                             |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| :doc:`remote <remote>`                                     | Configures communication between Wazuh agents and the Wazuh manager.              |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| :doc:`auth <auth>`                                         | Configures Wazuh agent enrollment.                                                |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| :doc:`indexer <indexer>`                                   | Configures communication with the Wazuh indexer.                                  |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| :doc:`vulnerability-detection <vulnerability-detection>`   | Configures vulnerability detection and vulnerability feed updates.                |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| :doc:`agent-upgrade <agent-upgrade>`                       | Configures remote Wazuh agent upgrades.                                           |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| :doc:`task-manager <task-manager>`                         | Configures remote task scheduling and lifecycle management.                       |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| :doc:`wdb <wdb>`                                           | Configures Wazuh database backup settings.                                        |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+
| :doc:`cluster <cluster>`                                   | Configures Wazuh manager cluster communication and synchronization.               |
+------------------------------------------------------------+-----------------------------------------------------------------------------------+

.. toctree::
   :hidden:
   :maxdepth: 1

   global
   logging
   remote
   auth
   indexer
   vulnerability-detection
   agent-upgrade
   task-manager
   wdb
   cluster
