.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section collects common issues that might occur when upgrading central components and provides steps to resolve them.


Troubleshooting
===============

This section collects common issues that might occur when upgrading central components and provides steps to resolve them.

The 'vulnerability-detector' configuration is deprecated
--------------------------------------------------------

This warning appears because when upgrading the Wazuh manager, the ``/var/ossec/etc/ossec.conf`` file remains unchanged, retaining the previous configuration of the Vulnerability Detection module. In addition, invalid configuration warnings might appear for the ``interval``, ``min_full_scan_interval``, ``run_on_start`` and ``provider`` elements. To resolve this issue, update the configuration as specified in the :doc:`Vulnerability detection documentation </user-manual/capabilities/vulnerability-detection/configuring-scans>`.


No username and password found in the keystore
----------------------------------------------

To ensure that alerts and vulnerabilities detected by the Vulnerability Detection module are indexed and displayed on the Wazuh dashboard, you need to add the credentials of the Wazuh indexer to the Wazuh manager keystore.


.. code-block:: console

   # /var/ossec/bin/wazuh-keystore -f indexer -k username -v <INDEXER_USERNAME>
   # /var/ossec/bin/wazuh-keystore -f indexer -k password -v <INDEXER_PASSWORD>


IndexerConnector initialization failed
--------------------------------------

This warning might be due to incorrect keystore credentials or indicate a configuration or certificate error. To resolve this, ensure that the IP address, port, and certificate paths are configured correctly in the :doc:`indexer section</user-manual/reference/ossec-conf/indexer>` in ``/var/ossec/etc/ossec.conf``.

After fixing the error and successfully connecting the Wazuh manager to the Wazuh indexer, you can see a log similar to the following:

.. code-block:: none

   INFO: IndexerConnector initialized successfully for index: ...

If the error persists, temporarily enable ``wazuh_modules.debug=2`` in ``/var/ossec/etc/local_internal_options.conf`` to get more information on what may be causing the issue.


Vulnerability detection seems to be disabled or has a problem
-------------------------------------------------------------

This warning indicates that the Vulnerability Detection module might be disabled or there could be a configuration error. To find out the issue, first ensure that ``vulnerability-detection`` is enabled in ``/var/ossec/etc/ossec.conf``. If it's enabled, verify that the vulnerability index ``wazuh-states-vulnerabilities-*`` has been correctly created. You can check this under **Indexer Management** > **Index Management** > **Indices** configuration.

If the index hasn't been created, check the Wazuh manager logs for any errors or warnings, as the issue might be related to errors mentioned in previous sections:

.. code-block:: console

   # cat /var/ossec/logs/ossec.log | grep -i -E "error|warn"


Application Not Found
---------------------

If you encounter the message *Application Not Found* when accessing the Wazuh dashboard after upgrading, it might be that the configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` wasn't overwritten with new changes. To resolve this issue, add the following line in the configuration file:

.. code-block:: none

   uiSettings.overrides.defaultRoute: /app/wz-home


None of the above solutions are fixing my problem
-------------------------------------------------

We have a welcoming community that can help you with most of the problems you might have regarding Wazuh deployment and usage `<https://wazuh.com/community>`_.

Also, you can contact us for opening issues in our GitHub repositories under the `organization <https://github.com/wazuh>`_.

When reporting a problem, add as much information as possible, such as version, operating system or relevant logs.
