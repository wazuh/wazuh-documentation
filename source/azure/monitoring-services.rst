.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
    :description: Learn more about how to use Wazuh to monitor Microsoft Azure. In this section, you can learn more about the monitoring services. 
    
.. _azure_monitoring_services:

Monitoring Services
===================

`Azure Active Directory <https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-whatis>`_ is the identity and directory management service that combines basic directory services, application access management, and identity protection in a single solution.

.. thumbnail:: ../images/azure/graph_intro.png
    :title: AAD
    :align: center
    :width: 100%

Wazuh also allows to monitor services such as Azure Active Directory using the `Microsoft Graph REST API <https://docs.microsoft.com/en-us/graph/overview>`_, which provides access to Azure AD through REST API endpoints. Applications can use the Microsoft Graph API to perform read operations on directory data and objects.

Using Microsoft Graph
---------------------

We're going to configure an application from the Microsoft Azure portal to be able to use the **Microsoft Graph REST API**.

.. note:: The process explained below details the configuration of an application that will use the Microsoft Graph REST API. You can also create a new application, as the creation process is similar to the application for Azure Log Analytics.

1. Giving permissions to the application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1.1 - In the ``Azure Active Directory`` section, select the option ``App registrations`` and once inside, select ``New application registration``.

.. thumbnail:: ../images/azure/graph1.png
    :title: AAD
    :align: center
    :width: 100%

1.2 - Access the ``Overview`` section. Save the ``application id`` for later authentication.

.. thumbnail:: ../images/azure/graph2.png
    :title: AAD
    :align: center
    :width: 75%

1.3 - In the ``API permissions`` section select the ``Add a permission`` option.

.. thumbnail:: ../images/azure/graph3.png
    :title: AAD
    :align: center
    :width: 100%

1.4 - Select the API by searching for "Microsoft Graph".

.. thumbnail:: ../images/azure/graph4.png
    :title: AAD
    :align: center
    :width: 100%

1.5 - Select the permissions in "Applications permissions" section that adapt to our infrastructure. In this example we are going to grant "AuditLogs" permissions.

.. thumbnail:: ../images/azure/graph5.png
    :title: AAD
    :align: center
    :width: 100%

1.6 - Select ``Grant admin consent`` to request consent for the permissions. This must be done by an admin user.

.. thumbnail:: ../images/azure/graph6.png
    :title: AAD
    :align: center
    :width: 50%

.. thumbnail:: ../images/azure/graph7.png
    :title: AAD
    :align: center
    :width: 50%

2. Obtaining the application key for authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

2.1 - Select ``New client secret`` in ``Certificates & secrets`` and fill in the ``DESCRIPTION`` and ``EXPIRES`` fields. Once we ``save`` the new secret copy its ``value``. This will be the key with which we will authenticate our application in order to use the API.

.. thumbnail:: ../images/azure/la_create_key.png
    :title: AAD
    :align: center
    :width: 100%

.. thumbnail:: ../images/azure/la_key_created.png
    :title: AAD
    :align: center
    :width: 100%

Wazuh configuration
-------------------

Next we will see the options we have for configuring the integration.

3. azure-logs module configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note:: When we choose to use a file for authentication, its content must be ``field = value``. For example:

  .. code-block:: none

    application_id = 8b7...c14
    application_key = w22...91x

3.1 - We opted for the following example configuration. The integration will be executed every **Friday** at **12:00**. Authentication will be carried out by reading the file containing the credentials. We add a representative ``tag`` and set the search for the ``activities/audit?api-version=beta`` `query <https://msdn.microsoft.com/en-us/library/azure/ad/graph/howto/azure-ad-graph-api-common-queries>`_ to give us the results of the previous day.

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

You can see the wodle reference :ref:`here <wodle_azure_logs>`.

.. note::
    The field ``tenantdomain`` is not necessary as it will be obtained from the token obtained using the id and secret.

Microsoft Graph Use Case
------------------------

Using the configuration prepared above, we will show an example of use.

Wazuh Rules
^^^^^^^^^^^

As the records are in ``.json`` format, with this rule, already included in the integration, we can start generating alerts:

.. code-block:: xml

	<rule id="87802" level="3">
		<decoded_as>json</decoded_as>
		<field name="azure_tag">azure-ad-graph</field>
		<description>Azure: AD $(activity)</description>
	</rule>

Create a new user
^^^^^^^^^^^^^^^^^

Proceed to create a new user. If the creation is successful, a log will be written to reflect it.

.. thumbnail:: ../images/azure/new_user.png
    :title: AAD
    :align: center
    :width: 100%

Azure portal visualization
^^^^^^^^^^^^^^^^^^^^^^^^^^

From the ``Azure Active Directory`` entry select the ``Audit logs`` entry and we can see the creation of our user.

.. thumbnail:: ../images/azure/portal_services.png
    :title: AAD
    :align: center
    :width: 100%

Kibana visualization
^^^^^^^^^^^^^^^^^^^^

When our integration performs the query, we will be able to see the results in Kibana. As we can see through the rule ``87802`` the dates of the events coincide (taking into consideration the time difference between computers).

.. thumbnail:: ../images/azure/kibana_services1.png
    :title: AAD
    :align: center
    :width: 100%

.. thumbnail:: ../images/azure/kibana_services2.png
    :title: AAD
    :align: center
    :width: 100%
