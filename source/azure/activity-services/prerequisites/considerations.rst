.. Copyright (C) 2015, Wazuh, Inc.

.. _azure_considerations:

Considerations for configuration
================================

Reparse
-------

.. warning::
  Using the ``reparse`` option will fetch and process every log from the starting date until the present. This process may generate duplicate alerts.

To process older logs, it's necessary to manually execute the module using the ``--reparse`` option. Executing the module with this option will use the ``la_time_offset`` value provided to fetch and process every log starting from the described offset. If no ``la_time_offset`` value was provided, it will use the date of the first file processed.

Below there is an example of a manual execution of the module using the ``--reparse`` option on a manager, being ``/var/ossec`` the Wazuh installation path:

.. code-block:: console

  # cd /var/ossec/wodles/azure
  # ./azure-logs --log_analytics --la_auth_path credentials_example --la_tenant_domain 'wazuh.example.domain' --la_tag azure-activity --la_query "AzureActivity" --workspace example-workspace --la_time_offset 50d --debug 2 --reparse

The ``--debug 2`` parameter was used to get a verbose output since by default the script won't print anything on the terminal, and it could seem like it's not working when it could be handling a great amount of data instead.


Configuring multiple services
-----------------------------

It is possible to add more than one ``request`` block at the same time in the same configuration. Each request will be processed sequentially. Here is an example configuration:

.. code-block:: xml

    <wodle name="azure-logs">
        <disabled>no</disabled>
        <run_on_start>yes</run_on_start>

        <log_analytics>
            <application_id>8b7...c14</application_id>
            <application_key>w22...91x</application_key>
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
            <auth_path>/Azure/graph_auth.txt</auth_path>
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
            <auth_path>/home/manager/Azure/storage_auth.txt</auth_path>
            <tag>azure-activity</tag>

            <container name="insights-operational-logs">
                <blobs>.json</blobs>
                <content_type>json_inline</content_type>
                <time_offset>24h</time_offset>
            </container>

            <container name="insights-operational-logs">
                <blobs>.txt</blobs>
                <content_type>json_inline</content_type>
                <time_offset>24h</time_offset>
            </container>

        </storage>
    </wodle>