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
| ``/var/ossec/etc/ossec.conf`` | ``/etc/wazuh-manager/wazuh-manager.conf``     |
+-------------------------------+-----------------------------------------------+

Configuration changes
------------------------

Review the following changes before you recreate the Wazuh manager configuration. Wazuh 5.x uses ``<wazuh_config>`` as the root element of ``wazuh-manager.conf`` instead of ``<ossec_config>``.

.. _migration_unsupported_configuration_sections:

Unsupported and changed settings
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh 5.x removes, relocates, or changes the following Wazuh 4.x sections and options. Use the table to decide which values from the Wazuh 4.x configuration to set in the Wazuh 5.x file. The Wazuh manager doesn't start if ``wazuh-manager.conf`` contains an option that Wazuh 5.x doesn't support.

+---------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Wazuh 4.x setting               | Wazuh 5.x change                                                                                                                                                                                                             |
+=================================+==============================================================================================================================================================================================================================+
| ``<alerts>``                    | Removed. Wazuh 5.x has no replacement for this section.                                                                                                                                                                      |
+---------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<active-response>``           | Active Response configurations are no longer defined in the Wazuh manager configuration. Recreate the required response actions through the Active Response page on the Wazuh dashboard.                                     |
+---------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<command>``                   | Commands are now configured through the Active Response page on the Wazuh dashboard.                                                                                                                                         |
+---------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<ruleset>``                   | Custom rules, decoders, and lists are managed through the Wazuh content management system in Wazuh 5.x. For more information, refer to the :doc:`Data analysis </user-manual/data-analysis/index>` documentation.            |
+---------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<rootcheck>``                 | Rootcheck functionality is now handled by the Wazuh agent.                                                                                                                                                                   |
+---------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<syscheck>``                  | File Integrity Monitoring (FIM) functionality is now handled by the Wazuh agent.                                                                                                                                             |
+---------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<sca>``                       | Functionality moved to the Wazuh agent.                                                                                                                                                                                      |
+---------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<wodle name="syscollector">`` | Syscollector functionality is now handled by the Wazuh agent.                                                                                                                                                                |
+---------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<localfile>``                 | Log collection moved to the Wazuh agent.                                                                                                                                                                                     |
+---------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<global>``                    | Wazuh 5.x supports only ``<agents_disconnection_time>``. Other options, such as ``<jsonout_output>``, ``<alerts_log>``, ``<logall>``, ``<logall_json>``, ``<email_notification>``, and ``<update_check>``, aren't supported. |
+---------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Second ``<global>`` block       | Not supported. Wazuh 5.x accepts one ``<global>`` block, and ``<white_list>`` isn't a Wazuh 5.x option.                                                                                                                      |
+---------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<remote>``                    | Wazuh 5.x doesn't support ``<connection>``, ``<allowed-ips>``, or ``<denied-ips>``. Listener options, such as ``<port>``, ``<protocol>``, and ``<local_ip>``, go in a ``<legacy>`` block.                                    |
+---------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<auth>``                      | Wazuh 5.x doesn't support ``<ssl_auto_negotiate>``. The ``<ciphers>`` option accepts only TLS 1.3 cipher suite names, such as ``TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256``.                |
+---------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<vulnerability-detection>``   | Wazuh 5.x doesn't support ``<index-status>``.                                                                                                                                                                                |
+---------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<indexer>``                   | Wazuh 5.x doesn't support ``<enabled>``. The certificate paths point to the files in ``/etc/wazuh-manager/certs/``.                                                                                                          |
+---------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``<cluster>``                   | Wazuh 5.x doesn't support ``<disabled>``. Every Wazuh 5.x manager runs as a cluster node.                                                                                                                                    |
+---------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Other configuration files
^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh 5.x also changes the internal options, Wazuh manager API, and cluster configuration files. Recreate your customizations in the following Wazuh 5.x files.

+------------------------------------------------+----------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Wazuh 4.x file                                 | Wazuh 5.x file                                                 | Notes                                                                                                                                                                                                                                                      |
+================================================+================================================================+============================================================================================================================================================================================================================================================+
| ``/var/ossec/etc/local_internal_options.conf`` | ``/etc/wazuh-manager/wazuh-manager-internal-options.conf``     | Set only the options that Wazuh 5.x still reads. Wazuh 5.x ignores removed options. Rename ``monitord.*`` options to their ``wazuh_modules.manager_task_*`` equivalents, for example ``monitord.rotate_log`` to ``wazuh_modules.manager_task_log_rotate``. |
+------------------------------------------------+----------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``/var/ossec/api/configuration/api.yaml``      | ``/var/wazuh-manager/api/configuration/api.yaml``              | Wazuh 5.x doesn't support ``https.ssl_protocol``, ``experimental_features``, or ``upload_configuration.integrations``. The default certificate names change to ``apid.pem``, ``apid-key.pem``, and ``root-ca.pem``.                                        |
+------------------------------------------------+----------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``cluster.json``                               | ``cluster.json``                                               | Use the Wazuh 5.x file as the base. Reapply only the interval values that you changed.                                                                                                                                                                     |
+------------------------------------------------+----------------------------------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Recreate Wazuh manager configuration
---------------------------------------

Perform the following steps to recreate the Wazuh manager configuration in the Wazuh 5.x deployment.

#. Stop the Wazuh 5.x manager service:

   .. code-block:: console

      # systemctl stop wazuh-manager

#. Review the existing Wazuh 4.x manager configuration in ``/var/ossec/etc/ossec.conf``.

#. Recreate the supported configuration manually in ``/etc/wazuh-manager/wazuh-manager.conf``. Do not copy the Wazuh 4.x file directly into the Wazuh 5.x installation.

#. Review and update any settings affected by changes in Wazuh 5.x, including renamed file paths and manager-side capabilities.

#. Validate the recreated configuration. The command lists every option that Wazuh 5.x doesn't support, with its location in the file. Fix each reported error before you start the Wazuh manager:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-conf -f /etc/wazuh-manager/wazuh-manager.conf validate

#. Save the updated configuration and start the Wazuh 5.x manager service:

   .. code-block:: console

      # systemctl start wazuh-manager

#. Verify that the Wazuh manager starts successfully and that the manager log reports no configuration errors.
