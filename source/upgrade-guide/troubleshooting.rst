.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section collects common issues that might occur when upgrading central components and provides steps to resolve them.

Troubleshooting
===============

This section collects common issues that might occur when upgrading the Wazuh central components and provides steps to resolve them.

The 'vulnerability-detector' configuration is deprecated
--------------------------------------------------------

This warning appears because when upgrading the Wazuh manager, the ``/var/ossec/etc/ossec.conf`` file remains unchanged, retaining the previous configuration of the Wazuh Vulnerability Detection module. In addition, invalid configuration warnings might appear for the ``interval``, ``min_full_scan_interval``, ``run_on_start`` and ``provider`` elements. To resolve this issue, update the configuration as specified in :doc:`/user-manual/capabilities/vulnerability-detection/configuring-scans`.

No username and password found in the keystore
----------------------------------------------

To ensure that alerts and vulnerabilities detected by the Wazuh Vulnerability Detection module are indexed and displayed on the Wazuh dashboard, you need to add the credentials of the Wazuh indexer to the Wazuh manager keystore. In case you've forgotten your Wazuh indexer password, follow the :doc:`password management </user-manual/user-administration/password-management>` guide to reset the password.

.. code-block:: console

   # /var/ossec/bin/wazuh-keystore -f indexer -k username -v <INDEXER_USERNAME>
   # /var/ossec/bin/wazuh-keystore -f indexer -k password -v <INDEXER_PASSWORD>

IndexerConnector initialization failed
--------------------------------------

This warning might be due to incorrect keystore credentials or indicate a configuration or certificate error. To resolve this, ensure that the IP address, port, and certificate paths are configured correctly in the :doc:`indexer section</user-manual/reference/ossec-conf/indexer>` in ``/var/ossec/etc/ossec.conf``.

After fixing the error and successfully connecting the Wazuh manager to the Wazuh indexer, you can see a log similar to the following:

.. code-block:: none

   INFO: IndexerConnector initialized successfully for index: ...

To get more information if the error persists, temporarily enable ``wazuh_modules.debug=2`` in ``/var/ossec/etc/local_internal_options.conf``.

Vulnerability detection seems to be disabled or has a problem
-------------------------------------------------------------

This warning indicates that the Vulnerability Detection module might be disabled or there could be a configuration error. To troubleshoot:

#. Ensure that ``vulnerability-detection`` is enabled in ``/var/ossec/etc/ossec.conf``.
#. Search for ``<indexer>`` block in ``/var/ossec/etc/ossec.conf`` and ensure there are no misconfigurations or multiple blocks of the :doc:`indexer </user-manual/reference/ossec-conf/indexer>` section.
#. Verify that the vulnerability index ``wazuh-states-vulnerabilities-*`` has been correctly created. You can check this under **Indexer Management** > **Index Management** > **Indices** configuration.
#. If the index wasn't created, check the Wazuh manager logs for any errors or warnings, as the issue might be related to errors mentioned in previous sections:

   .. code-block:: console

      # cat /var/ossec/logs/ossec.log | grep -i -E "error|warn"

Application Not Found
---------------------

If you encounter the message *Application Not Found* when accessing the Wazuh dashboard after upgrading, it might be that the configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` wasn't overwritten with new changes. To resolve this issue, update the ``uiSettings.overrides.defaultRoute`` setting with the ``/app/wz-home`` value in the configuration file:

.. code-block:: none

   uiSettings.overrides.defaultRoute: /app/wz-home

SSO when upgrading from Wazuh v4.8.2 and earlier
------------------------------------------------

If you are upgrading from Wazuh v4.8.2 or earlier to v4.9.0 or later, the value of the ``exchange_key`` in the ``/etc/wazuh-indexer/opensearch-security/config.yml`` file may need to be updated.

In previous versions (v4.8.0 and earlier), the ``exchange_key`` was set by copying the X.509 Certificate blob, excluding the ``-----BEGIN CERTIFICATE-----`` and ``-----END CERTIFICATE-----`` lines.

Starting with v4.9.0, the ``exchange_key`` must be a 64-character random alphanumeric string.

Please review the relevant documentation, as our SSO guides have been updated. Particularly the first step of the wazuh-indexer configuration. (:doc:`Okta </user-manual/user-administration/single-sign-on/administrator/okta>`, :doc:`Microsoft Entra ID </user-manual/user-administration/single-sign-on/administrator/microsoft-entra-id>`, :doc:`PingOne </user-manual/user-administration/single-sign-on/administrator/pingone>`, :doc:`Google </user-manual/user-administration/single-sign-on/administrator/google>`, :doc:`Jumpcloud </user-manual/user-administration/single-sign-on/administrator/jumpcloud>`, :doc:`OneLogin </user-manual/user-administration/single-sign-on/administrator/onelogin>`, :doc:`Keycloack </user-manual/user-administration/single-sign-on/administrator/keycloak>`)

None of the above solutions are fixing my problem
-------------------------------------------------

We have a welcoming community that can help you with most of the problems you might have regarding Wazuh deployment and usage `<https://wazuh.com/community>`_.

Also, you can contact us for opening issues in our GitHub repositories under the `organization <https://github.com/wazuh>`_.

When reporting a problem, add as much information as possible, such as version, operating system or relevant logs.
