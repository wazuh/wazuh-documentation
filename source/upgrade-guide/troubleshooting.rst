.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section contains common issues that might occur when upgrading central components and provides steps to resolve them.

Troubleshooting
===============

This section contains common issues that might occur when upgrading the Wazuh central components and provides steps to resolve them.

Wazuh-DB backup restoration
---------------------------

Wazuh by default performs automatic backups of the ``global.db`` database. These snapshots may be useful to recover critical information such as agent keys, agent synchronization information, and FIM event data among others. :doc:`Wazuh-DB </user-manual/reference/daemons/wazuh-db>` will restore the last backup available in case of failure during the upgrade. If this process also fails, the restoration must be done manually.

Manual restoration process
^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Stop the Wazuh manager.

   .. tabs::

      .. tab:: Systemd

         .. code-block:: console

            # systemctl stop wazuh-manager

      .. tab:: SysV init

         .. code-block:: console

            # service wazuh-manager stop

#. Locate the backup to restore. It is stored in ``/var/ossec/backup/db/`` with a name format similar to ``global.db-backup-TIMESTAMP-pre_upgrade.gz``.

   .. note::

      This process is valid for all the backups in the folder. Snapshot names containing the special tag ``pre_upgrade`` were created right before upgrading the Wazuh server. Any other snapshot is a periodic backup created according to the :doc:`backup </user-manual/reference/ossec-conf/wazuh-db-config>` setting.

#. Decompress the backup file. Always use the ``-k`` flag to preserve the original file:

   .. code-block:: console

      # gzip -dk WAZUH_HOME/backup/db/global.db-backup-TIMESTAMP-pre_upgrade.gz

#. Remove the current ``global.db`` database and move the backup to the right location:

   .. code-block:: console

      # rm  WAZUH_HOME/queue/db/global.db
      # mv  WAZUH_HOME/backup/db/global.db-backup-TIMESTAMP-pre_upgrade WAZUH_HOME/queue/db/global.db

#. Start the Wazuh manager.

   .. tabs::

      .. tab:: Systemd

         .. code-block:: console

            # systemctl start wazuh-manager

      .. tab:: SysV init

         .. code-block:: console

            # service wazuh-manager start

Wazuh dashboard server is not ready yet
---------------------------------------

This message typically appears right after starting or restarting the Wazuh dashboard. However, it may also indicate one of the following issues:

-  The Wazuh dashboard service is encountering an error and repeatedly restarting.
-  The Wazuh dashboard cannot communicate with the Wazuh indexer.
-  The Wazuh indexer service is not running or has encountered an error.

Steps to diagnose and fix the issue
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Ensure the Wazuh dashboard service is active. Run the following command on the Wazuh dashboard node to check the status:

   .. code-block:: console

      # systemctl status wazuh-dashboard

#. Check the Wazuh dashboard logs for errors. Run the following command on the Wazuh dashboard node:

   .. code-block:: console

      # journalctl -u wazuh-dashboard | grep -i -E "error|warn"

#. Ensure the Wazuh dashboard is correctly configured to communicate with the Wazuh indexer. Open the dashboard ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file and verify the Wazuh indexer IP address configured in the ``opensearch.hosts`` field:

   .. code-block:: yaml

      opensearch.hosts: https://<WAZUH_INDEXER_IP_ADDRESS>:9200

#. Check the connectivity between the Wazuh dashboard and the Wazuh indexer. Replace ``<WAZUH_INDEXER_IP_ADDRESS>`` and run the following command on the Wazuh dashboard node:

   .. code-block:: console

      # curl -v telnet://<WAZUH_INDEXER_IP_ADDRESS>:9200

#. Ensure the Wazuh indexer service is active. Run the following command on the Wazuh indexer node to check the status:

   .. code-block:: console

      # systemctl status wazuh-indexer

   If the service is down, investigate potential errors.

#. Replace ``<WAZUH_INDEXER_CLUSTER_NAME>`` and run the following command on the Wazuh indexer node to check the indexer logs for errors:

   .. code-block:: console

      # cat /var/log/wazuh-indexer/<WAZUH_INDEXER_CLUSTER_NAME>.log | grep -E "ERROR|WARN|Caused"

The 'vulnerability-detector' configuration is deprecated
--------------------------------------------------------

This warning occurs because upgrading the Wazuh manager does not modify the ``/var/ossec/etc/ossec.conf`` file, preserving the previous Wazuh Vulnerability Detection module configuration. Additionally, warnings about invalid configurations for ``interval``, ``min_full_scan_interval``, ``run_on_start`` and ``provider`` elements may appear. To resolve these issues, update the configuration as outlined in :doc:`/user-manual/capabilities/vulnerability-detection/configuring-scans`.

No username and password found in the keystore
----------------------------------------------

To ensure alerts and vulnerabilities are indexed and displayed on the Wazuh dashboard, add indexer credentials to the manager keystore.

Run the following commands to store the credentials securely:

.. code-block:: console

   # echo '<INDEXER_USERNAME>' | /var/ossec/bin/wazuh-keystore -f indexer -k username
   # echo '<INDEXER_PASSWORD>' | /var/ossec/bin/wazuh-keystore -f indexer -k password
   
If you've forgotten your Wazuh indexer password, refer to the :doc:`password management </user-manual/user-administration/password-management>` guide to reset it.

IndexerConnector initialization failed
--------------------------------------

This warning may indicate incorrect keystore credentials, a configuration issue, or a certificate error. Verify that the IP address, port, and certificate paths are correctly configured in the ``<indexer>`` section of ``/var/ossec/etc/ossec.conf``.

After resolving the issue and successfully connecting the Wazuh manager to the indexer, you should see a log like this:

.. code-block:: none

   INFO: IndexerConnector initialized successfully for index: ...

If the error persists, enable ``wazuh_modules.debug=2`` temporarily in ``/var/ossec/etc/local_internal_options.conf``  for more details.

Vulnerability detection seems to be disabled or has a problem
-------------------------------------------------------------

This warning suggests that the Wazuh Vulnerability Detection module might be disabled or misconfigured. To troubleshoot, follow these steps:

#. Ensure the ``vulnerability-detection`` module is enabled in ``/var/ossec/etc/ossec.conf``.
#. Locate the ``<indexer>`` block in ``/var/ossec/etc/ossec.conf`` and confirm there are no misconfigurations or duplicate ``<indexer>`` sections.
#. Verify the ``wazuh-states-vulnerabilities-*``  index is correctly created. Ensure it is present and its health status is green by navigating to **Indexer Management** > **Index Management** > **Indexes** on the Wazuh dashboard.
#. If the index wasn’t created, check the Wazuh manager logs for errors or warnings using the following command:

   .. code-block:: console

      # cat /var/ossec/logs/ossec.log | grep -i -E "error|warn"

Application Not Found
---------------------

If you see the message *Application Not Found* when accessing the Wazuh dashboard after upgrading, it may be because the configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` wasn’t updated with the latest changes.

To fix this issue, update the ``uiSettings.overrides.defaultRoute`` setting in the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file to the following value:

.. code-block:: none

   uiSettings.overrides.defaultRoute: /app/wz-home

SSO issue when upgrading from Wazuh 4.8 and earlier
------------------------------------------------------

If upgrading from Wazuh 4.8 or earlier, update the ``exchange_key`` value in ``/etc/wazuh-indexer/opensearch-security/config.yml``.

Previously, ``exchange_key`` was set by copying the X.509 Certificate blob, excluding the ``-----BEGIN CERTIFICATE-----`` and ``-----END CERTIFICATE-----`` lines.

Starting with Wazuh 4.9.0, ``exchange_key`` must be a 64-character random alphanumeric string.

For guidance, refer to the first step of the Wazuh indexer configuration in the :doc:`Single sign-on </user-manual/user-administration/single-sign-on/index>` (SSO) guides for platforms like :doc:`Okta </user-manual/user-administration/single-sign-on/administrator/okta>`, :doc:`Microsoft Entra ID </user-manual/user-administration/single-sign-on/administrator/microsoft-entra-id>`, :doc:`PingOne </user-manual/user-administration/single-sign-on/administrator/pingone>`, :doc:`Google </user-manual/user-administration/single-sign-on/administrator/google>`, :doc:`Jumpcloud </user-manual/user-administration/single-sign-on/administrator/jumpcloud>`, :doc:`OneLogin </user-manual/user-administration/single-sign-on/administrator/onelogin>`, and :doc:`Keycloack </user-manual/user-administration/single-sign-on/administrator/keycloak>`.

None of the above solutions are fixing my problem
-------------------------------------------------

We have a welcoming community ready to assist with most Wazuh deployment and usage issues. Visit any of the  `Wazuh community channels <https://wazuh.com/community>`_ for support.

You can also report issues directly on our GitHub repositories under the `Wazuh organization <https://github.com/wazuh>`_.

When reporting a problem, include detailed information such as the version, operating system, and relevant logs to help us assist you effectively.
