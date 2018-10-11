.. Copyright (C) 2018 Wazuh, Inc.

.. _azure_monitoring_services:

Monitoring Services
===================

`Azure Active Directory <https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-whatis>`_ is the identity and directory management service that combines basic directory services, application access management, and identity protection in a single solution.

.. thumbnail:: ../images/azure/graph_intro.png
    :title: AAD
    :align: center
    :width: 100%

Wazuh also allows to monitor services such as Azure Active Directory using the `Azure Active Directory Graph REST API <https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-graph-api-quickstart>`_, which provides access to Azure AD through REST API endpoints. Applications can use the Azure AD Graph API to perform read operations on directory data and objects.

Using Azure Active Directory Graph
----------------------------------

We're going to configure an application from the Microsoft Azure portal to be able to use the **Azure Active Directory Graph REST API**.

.. note:: The process explained below details the configuration of an application that will use the Active Directory Graph REST API. You can also create a new application, as the creation process is similar to the application for Azure Log Analytics.

1. Giving permissions to the application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1.1 - In the ``Azure Active Directory`` section, select the option ``App registrations`` and once inside, select ``New application registration``.

.. thumbnail:: ../images/azure/graph1.png
    :title: AAD
    :align: center
    :width: 100%

1.2 - Access the ``Settings`` section. Save the ``application id`` for later authentication.

.. thumbnail:: ../images/azure/graph2.png
    :title: AAD
    :align: center
    :width: 75%

1.3 - In the ``Required permissions`` section select the ``Add`` option.

.. thumbnail:: ../images/azure/graph3.png
    :title: AAD
    :align: center
    :width: 100%

1.4 - Select the API by searching for "Microsoft Graph".

.. thumbnail:: ../images/azure/graph4.png
    :title: AAD
    :align: center
    :width: 100%

1.5 - Select the permissions that adapt to our infrastructure.

.. thumbnail:: ../images/azure/graph5.png
    :title: AAD
    :align: center
    :width: 100%

1.6 - Select ``Done``.

.. thumbnail:: ../images/azure/graph6.png
    :title: AAD
    :align: center
    :width: 50%

2. Obtaining the application key for authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

2.1 - Select ``Keys`` and fill in the ``DESCRIPTION`` and ``EXPIRES`` fields. Once we ``save`` the key we will get its ``value``. This will be the key with which we will authenticate our application in order to use the API.

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

            <auth_path>/home/manager/Azure/graph_auth.txt</auth_path>
            <tenantdomain>wazuh.onmicrosoft.com</tenantdomain>

            <request>
                <tag>azure-active_directory</tag>
                <query>activities/audit?api-version=beta</query>
                <time_offset>1d</time_offset>
            </request>

        </graph>

    </wodle>

You can see the wodle reference :ref:`here <wodle_azure_logs>`.

The field ``tenantdomain`` is necessary and we can obtain it easily. In the azure portal, we can see it leaving the cursor in the upper right corner.

.. thumbnail:: ../images/azure/tenant.png
    :title: AAD
    :align: center
    :width: 100%

Azure Active Directory Graph Use Case
-------------------------------------

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

.. thumbnail:: ../images/azure/new_user1.png
    :title: AAD
    :align: center
    :width: 100%

.. thumbnail:: ../images/azure/new_user2.png
    :title: AAD
    :align: center
    :width: 30%

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
