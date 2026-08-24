.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Recreate the supported Wazuh manager configuration when migrating from Wazuh 4.x to Wazuh 5.x.

Wazuh manager
=============

The Wazuh manager in Wazuh 5.x introduces changes to its configuration, installation layout, and capabilities. Although you can recreate supported settings from a Wazuh 4.x deployment, Wazuh 5.x removes, relocates, or replaces several configuration sections, options, and features.

Deploy a new Wazuh manager and recreate the supported configuration from the Wazuh 4.x deployment. Do not copy Wazuh 4.x configuration files directly into the new installation, because they contain settings that Wazuh 5.x no longer supports.

You can recreate the following Wazuh manager configuration in Wazuh 5.x:

-  Wazuh manager configuration
-  Internal configuration options
-  Wazuh manager API configuration
-  Cluster configuration

You cannot recreate custom rules, decoders, and lists by copying files into the Wazuh manager installation. In Wazuh 5.x, the Wazuh content management system manages custom detection content. Refer to the :doc:`Data analysis </user-manual/data-analysis/index>` documentation to learn how to create and manage custom rules, decoders, and lists.

.. _migration_wazuh_manager_configuration:

Wazuh manager configuration
-----------------------------

The Wazuh manager configuration defines how the manager operates, including agent communication, authentication, vulnerability detection, indexer connectivity, clustering, and other manager services.

Wazuh 4.x and Wazuh 5.x use different configuration structures and supported settings. Therefore, the Wazuh 4.x configuration serves as a reference for recreating the required settings in the corresponding Wazuh 5.x configuration files.

.. note::

   Do not copy configuration files directly from a Wazuh 4.x deployment, because Wazuh 5.x removes, relocates, or replaces several configuration options and manager-side capabilities.

The primary Wazuh manager configuration file has changed between Wazuh 4.x and Wazuh 5.x:

+-------------------------------+-----------------------------------------------+
| Wazuh 4.x                     | Wazuh 5.x                                     |
+===============================+===============================================+
| ``/var/ossec/etc/ossec.conf`` | ``/var/wazuh-manager/etc/wazuh-manager.conf`` |
+-------------------------------+-----------------------------------------------+

Configuration changes
------------------------

Review the following changes before you recreate the Wazuh manager configuration.

.. _migration_unsupported_configuration_sections:

Unsupported configuration sections
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh 5.x removes or relocates the following Wazuh manager configuration sections.

+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Configuration section           | Notes                                                                                                                                                                                                             |
+=================================+===================================================================================================================================================================================================================+
| ``<alerts>``                    | Alerts are now configured through the :ref:`Notification channel <notifications_and_alerting_configuration>` on the Wazuh dashboard.                                                                              |
+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<active-response>``           | Active Response configurations are no longer defined in the Wazuh manager configuration. Recreate the required response actions through the Active Response page on the Wazuh dashboard.                          |
+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<command>``                   | Commands are now configured through the Active Response page on the Wazuh dashboard.                                                                                                                              |
+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<ruleset>``                   | Custom rules, decoders, and lists are managed through the Wazuh content management system in Wazuh 5.x. For more information, refer to the :doc:`Data analysis </user-manual/data-analysis/index>` documentation. |
+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<rootcheck>``                 | Rootcheck functionality is now handled by the Wazuh agent.                                                                                                                                                        |
+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<syscheck>``                  | File Integrity Monitoring (FIM) functionality is now handled by the Wazuh agent.                                                                                                                                  |
+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<sca>``                       | Functionality moved to the Wazuh agent.                                                                                                                                                                           |
+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<wodle name="syscollector">`` | Syscollector functionality is now handled by the Wazuh agent.                                                                                                                                                     |
+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<localfile>``                 | Log collection moved to the Wazuh agent.                                                                                                                                                                          |
+---------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Do not recreate these sections in the Wazuh 5.x manager configuration. Use the corresponding Wazuh 5.x functionality described in the table where applicable.

Recreate Wazuh manager configuration
---------------------------------------

Perform the following steps to recreate the Wazuh manager configuration in the Wazuh 5.x deployment.

#. Stop the Wazuh 5.x manager service:

   .. code-block:: console

      # systemctl stop wazuh-manager

#. Review the existing Wazuh 4.x manager configuration in ``/var/ossec/etc/ossec.conf``.

#. Recreate the supported configuration manually in ``/var/wazuh-manager/etc/wazuh-manager.conf``. Do not copy the Wazuh 4.x file directly into the Wazuh 5.x installation.

#. Review and update any settings affected by changes in Wazuh 5.x, including renamed file paths and manager-side capabilities.

#. Save the updated configuration and start the Wazuh 5.x manager service:

   .. code-block:: console

      # systemctl start wazuh-manager

#. Verify that the Wazuh manager starts successfully and that the manager log reports no configuration errors.
