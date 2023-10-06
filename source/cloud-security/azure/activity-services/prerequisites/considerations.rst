.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn considerations for configuring multiple services with the Wazuh Azure module in this section of the Wazuh documentation.

.. _azure_considerations:

Considerations for configuration
================================

Reparse
-------

.. warning::

   Using the ``reparse`` option will fetch and process all the logs from the starting date until the present. This process may generate duplicate alerts.

To fetch and process older logs, you need to manually run the module using the ``--reparse`` option.

The ``la_time_offset`` value sets the time as an offset for the starting point. If you don't provide an ``la_time_offset`` value, the module goes back to the date of the first file processed.

Find an example of running the module on a manager using the ``--reparse`` option. ``/var/ossec`` is the Wazuh installation path.

.. code-block:: console

  # /var/ossec/wodles/azure/azure-logs --log_analytics --la_auth_path credentials_example --la_tenant_domain 'wazuh.example.domain' --la_tag azure-activity --la_query "AzureActivity" --workspace example-workspace --la_time_offset 50d --debug 2 --reparse

The ``--debug 2`` parameter gets a verbose output. This is useful to show the script is working, specially when handling a large amount of data.


Configuring multiple services
-----------------------------

It is possible to add more than one ``request`` block at the same time in the same configuration. Each request will be processed sequentially. Here is an example configuration:

.. code-block:: xml

    <wodle name="azure-logs">
        <disabled>no</disabled>
        <run_on_start>yes</run_on_start>

        <log_analytics>
            <auth_path>/var/ossec/wodles/credentials/log_analytics_credentials</auth_path>
            <tenantdomain>wazuh.onmicrosoft.com</tenantdomain>

            <request>
                <tag>azure-activity</tag>
                <query>AzureActivity | where SubscriptionId == 2d7...61d </query>
                <workspace>d6b...efa</workspace>
                <time_offset>36h</time_offset>
            </request>

            <request>
                <tag>azure-activity</tag>
                <query>AzureActivity | where SubscriptionId == 3f5...21g </query>
                <workspace>d6b...efa</workspace>
                <time_offset>2d</time_offset>
            </request>

        </log_analytics>

        <graph>
            <auth_path>/var/ossec/wodles/credentials/graph_credentials</auth_path>
            <tenantdomain>wazuh.onmicrosoft.com</tenantdomain>

            <request>
                <tag>azure-active_directory-1</tag>
                <query>auditLogs/directoryAudits</query>
                <time_offset>1d</time_offset>
            </request>

            <request>
                <tag>azure-active_directory-2</tag>
                <query>auditLogs/directoryAudits</query>
                <time_offset>1d</time_offset>
            </request>

        </graph>

        <storage>
            <auth_path>/var/ossec/wodles/credentials/storage_credentials</auth_path>
            <tag>azure-activity</tag>

            <container name="insights-operational-logs">
                <blobs>.json</blobs>
                <content_type>json_inline</content_type>
                <time_offset>24h</time_offset>
                <path>info-logs</path>
            </container>

            <container name="insights-operational-logs">
                <blobs>.txt</blobs>
                <content_type>json_inline</content_type>
                <time_offset>24h</time_offset>
                <path>info-logs</path>
            </container>

        </storage>
    </wodle>