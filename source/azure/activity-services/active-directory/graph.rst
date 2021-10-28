.. Copyright (C) 2021 Wazuh, Inc.

.. _azure_graph:

Using Microsoft Graph
=====================

This section shows how to configure an application from the Microsoft Azure portal to be able to use the **Microsoft Graph REST API**.

In order to know how the Wazuh Azure module works in conjunction with the **Microsoft Graph REST API**, first, it is important to understand what are the Azure AD activity reports and what kind of information can they provide. Wazuh can process the logs from the following Azure AD activity reports, each one of them requiring a different query to be executed:

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

.. note:: This section explains the creation of an application that will use the of Azure Log Analytics REST API. It is also possible to configure an existing application. If this is the case, skip this step.

In the ``Azure Active Directory`` section select the option ``App registrations`` and once inside, select ``New registration``.

.. thumbnail:: ../../../images/azure/graph1.png
    :title: Log Analytics App
    :align: center
    :width: 100%

Giving permissions to the application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1 - Access the ``Overview`` section. Save the ``application id`` for later authentication.

.. thumbnail:: ../../../images/azure/graph2.png
    :title: AAD
    :align: center
    :width: 75%

2 - In the ``API permissions`` section select the ``Add a permission`` option.

.. thumbnail:: ../../../images/azure/graph3.png
    :title: AAD
    :align: center
    :width: 100%

3 - Select the API by searching for "Microsoft Graph".

.. thumbnail:: ../../../images/azure/graph4.png
    :title: AAD
    :align: center
    :width: 100%

4 - Select the permissions in "Applications permissions" section that adapt to our infrastructure. In this case "AuditLogs" permissions will be granted.

.. thumbnail:: ../../../images/azure/graph5.png
    :title: AAD
    :align: center
    :width: 100%

5 - Grant admin consent for the tenant domain used for the permission added in the previous step. This must be done by an admin user.

.. thumbnail:: ../../../images/azure/graph6.png
    :title: AAD
    :align: center
    :width: 50%

.. thumbnail:: ../../../images/azure/graph7.png
    :title: AAD
    :align: center
    :width: 50%

Obtaining the application key for authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Select ``Keys`` and fill in the ``DESCRIPTION`` and ``EXPIRES`` fields. Copy the ``value`` once the key is saved. This is required to authenticate the application in order to use the Log Analytics API.

.. thumbnail:: ../../../images/azure/la_create_key.png
    :title: Log Analytics App
    :align: center
    :width: 100%

.. thumbnail:: ../../../images/azure/la_key_created.png
    :title: Log Analytics App
    :align: center
    :width: 100%


Wazuh configuration
-------------------

azure-logs module configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Proceed to configure the ``azure-logs`` module in the local configuration (``ossec.conf``). The **key and ID of the application** saved during the previous steps will be used here. In this case, both fields were saved in a **file** for authentication.

Here is an example on how to get the audit log of the Azure Active Directory using Microsoft Graph. This example configuration includes a representative ``tag`` and will be scheduled for every Monday at 02:00, using an offset of one days, which means only the log data from the last day will be parsed:

.. code-block:: xml

    <wodle name="azure-logs">

        <disabled>no</disabled>
        <wday>Friday</wday>
        <time>12:00</time>
        <run_on_start>no</run_on_start>

        <graph>

            <auth_path>/var/ossec/wodles/azure/credentials</auth_path>
            <tenantdomain>wazuh.onmicrosoft.com</tenantdomain>

            <request>
                <tag>azure-active_directory</tag>
                <query>auditLogs/directoryAudits</query>
                <time_offset>1d</time_offset>
            </request>

        </graph>

    </wodle>

Check the :ref:`azure-logs <wodle_azure_logs>` module reference for more information about how to use the different parameters available.

.. note:: If an authentication file is used, as in this example, its content must follow the format ``field = value``. Here is an example of this format:

  .. code-block:: none

    application_id = 317...764
    application_key = wUj...9cj

.. warning:: The field ``tenantdomain`` is mandatory. It can be obtain from the ``Overview`` section in the ``Azure Active Directory``

Microsoft Graph Use Case
------------------------

Here is an example of monitoring the Azure ADD activity using the previously mentioned configuration.

Wazuh Rules
^^^^^^^^^^^

In this example the records will be in ``.json`` format. The following rules are already included in Wazuh which means alerts will be generated for the logs in this example.

.. code-block:: xml

    <rule id="87802" level="3">
        <decoded_as>json</decoded_as>
        <field name="azure_tag">azure-ad-graph</field>
        <description>Azure: AD $(activity)</description>
    </rule>

Create a new user
^^^^^^^^^^^^^^^^^

Create a new user in Azure. If the creation is successful, a log will be written to reflect it. This log can be retrieved using the ``auditLogs/directoryAudits`` query.

.. thumbnail:: ../../../images/azure/new_user.png
    :title: AAD
    :align: center
    :width: 100%

Azure portal visualization
^^^^^^^^^^^^^^^^^^^^^^^^^^

The resulting log from the user creation can be checked in the ``Audit logs`` section of ``Azure Active Directory``.

.. thumbnail:: ../../../images/azure/portal_services.png
    :title: AAD
    :align: center
    :width: 100%

Kibana visualization
^^^^^^^^^^^^^^^^^^^^

Once the integration runs the results will be available in the Wazuh UI.

.. thumbnail:: ../../../images/azure/kibana_services1.png
    :title: AAD
    :align: center
    :width: 100%

.. thumbnail:: ../../../images/azure/kibana_services2.png
    :title: AAD
    :align: center
    :width: 100%
