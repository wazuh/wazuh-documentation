.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Create, view, copy, and delete organization API keys in Wazuh Console to authenticate requests to the Wazuh Cloud API.

.. _cloud_organization_api_keys:

API keys
========

API keys let your tools and scripts act on behalf of your organization. This page describes how to create, view, copy, and delete the API keys of your organization.

You use an API key to authenticate requests to the Wazuh Cloud API, for example, to get temporary credentials for the archive data of your Wazuh Cloud environments. Send the key in the ``Authorization`` header of each request as ``Bearer <API_KEY>``. See :doc:`Wazuh Cloud API </cloud-service/apis/index>` and :doc:`Access archive data </cloud-service/archive-data/access>`.

An API key belongs to the organization, not to the member who creates it. It works until an editor deletes it.

.. warning::

   Anyone who has an API key can act on behalf of your organization. Keep your API keys secret. Don't share them or store them in source code repositories, and delete any key that might be exposed.

Viewing API keys
----------------

#. In the sidebar, select **Organization**.
#. Select the **API Keys** tab.

The tab lists the API keys of the organization with the following columns:

-  **Name**: The name of the key.
-  **Value**: The key itself, hidden by default.
-  **Created at**: The date and time the key was created.

Use **Search API Key** to filter the list by name.

Creating an API key
-------------------

You need the Editor role to create API keys.

#. In the sidebar, select **Organization**.
#. In the **API Keys** tab, click **Create API key**.
#. In **Name**, enter a name that helps you identify where the key is used. The name must be between 3 and 255 characters long and different from the names of the other keys of the organization.
#. Click **Create API key**.

Wazuh Console shows **API key created successfully.** and adds the key to the list.

Showing and copying an API key
------------------------------

You need the Editor role to show or copy the value of an API key. You can do it at any time, not only right after you create the key.

#. In the sidebar, select **Organization**.
#. In the **API Keys** tab, find the key.
#. In the **Value** column:

   -  Click the eye icon (**Show API key**) to show the value. Click it again (**Hide API key**) to hide it.
   -  Click the clipboard icon (**Copy API key**) to copy the value to the clipboard. The tooltip changes to **API key copied**.

Deleting an API key
-------------------

You need the Editor role to delete API keys. Tools and scripts that use a deleted key stop working.

#. In the sidebar, select **Organization**.
#. In the **API Keys** tab, open the options menu of the key and select **Delete**.
#. Confirm the deletion.

Wazuh Console shows **API key deleted successfully.**
