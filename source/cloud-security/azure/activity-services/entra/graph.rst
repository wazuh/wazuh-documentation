.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how the Wazuh Azure module works in conjunction with the Microsoft Graph REST API in this section of the documentation.

.. _azure_graph:

Using Microsoft Graph
=====================

Learn how to configure an application from the Microsoft Azure portal to be able to use the `Microsoft Graph REST API`. In this section you will find:

- `Azure configuration`_
- `Wazuh configuration`_
- `Microsoft Graph use case`_

In order to know how the Wazuh Azure module works in conjunction with the `Microsoft Graph REST API`, it is important to understand first what are the Microsoft Entra ID activity reports and what kind of information they provide. Wazuh can process the logs from the following Microsoft Entra ID activity reports, each one of them requiring a different query to be executed:

+---------------------------------------------------------------------------------------------------------------------------+-------------------------------+
| **Report type**                                                                                                           | **Query**                     |
+---------------------------------------------------------------------------------------------------------------------------+-------------------------------+
| `Directory audits <https://docs.microsoft.com/en-us/graph/api/directoryaudit-list?view=graph-rest-1.0&tabs=http>`_        | ``auditLogs/directoryaudits`` |
+---------------------------------------------------------------------------------------------------------------------------+-------------------------------+
| `Sign-ins <https://docs.microsoft.com/en-us/graph/api/signin-list?view=graph-rest-1.0&tabs=http>`_                        | ``auditLogs/signIns``         |
+---------------------------------------------------------------------------------------------------------------------------+-------------------------------+
| `Provisioning <https://docs.microsoft.com/en-us/graph/api/provisioningobjectsummary-list?view=graph-rest-1.0&tabs=http>`_ | ``auditLogs/provisioning``    |
+---------------------------------------------------------------------------------------------------------------------------+-------------------------------+


Azure configuration
-------------------

Creating the application
^^^^^^^^^^^^^^^^^^^^^^^^

This section explains the creation of an application that will use the Azure Log Analytics REST API. It is also possible to configure an existing application. If this is the case, skip this step.

In the **Microsoft Entra ID** panel, select the option **App registrations**. Then, select **New registration**.

.. thumbnail:: /images/cloud-security/azure/graph-1.png
    :title: Log Analytics App
    :align: center
    :width: 100%

Giving permissions to the application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Go to the **Overview** section and save the **Application (client) ID** for later authentication.

    .. thumbnail:: /images/cloud-security/azure/graph-2.png
        :title: AAD
        :align: center
        :width: 75%

#. Go to the **API permissions** section and select the **Add a permission** option.

    .. thumbnail:: /images/cloud-security/azure/graph-3.png
        :title: AAD
        :align: center
        :width: 100%

#. Select the API by searching for "Microsoft Graph".

    .. thumbnail:: /images/cloud-security/azure/graph-4.png
        :title: AAD
        :align: center
        :width: 100%

#. Select the permissions in **Applications permissions** that adapt to our infrastructure. In this case, **AuditLog** permissions will be granted. Then, click **Add permissions**.

    .. thumbnail:: /images/cloud-security/azure/graph-5.png
        :title: AAD
        :align: center
        :width: 100%

#. Grant admin consent for the tenant domain used for the permission added in the previous step. This must be done by an admin user.

    .. thumbnail:: /images/cloud-security/azure/graph-6.png
        :title: AAD
        :align: center
        :width: 100%

    .. thumbnail:: /images/cloud-security/azure/graph-7.png
        :title: AAD
        :align: center
        :width: 100%

Obtaining the application key for authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Select **Certificates & secrets** and fill in the **Description** and **Expires** fields. Copy the **value** once the key is saved. This is required to authenticate the application in order to use the Log Analytics API.

.. thumbnail:: /images/cloud-security/azure/log-analytics-create-key.png
    :title: Log Analytics App
    :align: center
    :width: 100%

.. thumbnail:: /images/cloud-security/azure/log-analytics-key-created.png
    :title: Log Analytics App
    :align: center
    :width: 100%


Wazuh configuration
-------------------

azure-logs module configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Proceed with configuring the ``azure-logs`` module in the local configuration (``ossec.conf``). The `key and ID of the application` saved during the previous steps will be used here. In this case, both fields were saved in a `file` for authentication.

Here is an example of how to get the audit log of the Microsoft Entra ID using Microsoft Graph. This example configuration includes a representative ``tag`` and is scheduled for every Monday at 02:00, using an offset of one day, which means only the log data from the last day is parsed:

.. code-block:: xml

    <wodle name="azure-logs">

        <disabled>no</disabled>
        <wday>Monday</wday>
        <time>2:00</time>
        <run_on_start>no</run_on_start>

        <graph>

            <auth_path>/var/ossec/wodles/azure/credentials</auth_path>
            <tenantdomain>wazuh.onmicrosoft.com</tenantdomain>

            <request>
                <tag>microsoft-entra_id</tag>
                <query>auditLogs/directoryAudits</query>
                <time_offset>1d</time_offset>
            </request>

        </graph>

    </wodle>

Check the :doc:`azure-logs </user-manual/reference/ossec-conf/wodle-azure-logs>` module reference for more information about how to use the different parameters available.

.. note:: If an authentication file is used, as in this example, its content must follow the format ``field = value``. Here is an example of this format:

  .. code-block:: none

    application_id = 317...764
    application_key = wUj...9cj

.. warning:: The field ``tenantdomain`` is mandatory. It can be obtained from the **Overview** section in Microsoft Entra ID.

Microsoft Graph use case
------------------------

Here is an example of monitoring Microsoft Entra ID activity using the configuration described above.

Wazuh Rules
^^^^^^^^^^^

In this example, the records are in ``.json`` format. The following rules are already included in Wazuh which means alerts will be generated for the logs in this example.

.. code-block:: xml

    <rule id="87802" level="3">
        <decoded_as>json</decoded_as>
        <field name="azure_tag">azure-ad-graph</field>
        <description>Azure: AD $(activityDisplayName)</description>
    </rule>

Create a new user
^^^^^^^^^^^^^^^^^

Create a new user in Azure. If the creation is successful, a log will be written to reflect it. This log can be retrieved using the ``auditLogs/directoryAudits`` query.

.. thumbnail:: /images/cloud-security/azure/new-user.png
    :title: AAD
    :align: center
    :width: 100%

Azure portal visualization
^^^^^^^^^^^^^^^^^^^^^^^^^^

The resulting log from the user creation can be checked in the **Audit logs** section of Microsoft Entra ID.

.. thumbnail:: /images/cloud-security/azure/portal-services.png
    :title: AAD
    :align: center
    :width: 100%

Wazuh dashboard visualization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once the integration is running, the results will be available in the Wazuh dashboard.

.. thumbnail:: /images/cloud-security/azure/kibana-services-1.png
    :title: AAD
    :align: center
    :width: 90%

.. thumbnail:: /images/cloud-security/azure/kibana-services-2.png
    :title: AAD
    :align: center
    :width: 80%
