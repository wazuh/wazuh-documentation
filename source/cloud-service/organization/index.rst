.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: View and edit your organization in Wazuh Console, switch between the organizations you belong to, and manage members and API keys.

.. _cloud_organization:

Organization
============

An organization groups the people, Wazuh Cloud environments, deployments, subscriptions, and API keys that you manage together in Wazuh Console. This section describes how to view and edit your organization, switch between organizations, invite members, and manage API keys.

Wazuh Console creates an organization for you the first time you sign in, named after the **Company** you entered when you created your account. You can join other organizations when their members invite you. See :doc:`Members and invitations </cloud-service/organization/members>`.

Organization settings
---------------------

To open the settings of your organization:

#. In the sidebar, select **Organization**.

The **Organization settings** page shows the following details of the organization selected in the header:

+----------+--------------------------------------------------+
| Field    | Description                                      |
+==========+==================================================+
| **Name** | The name of the organization.                    |
+----------+--------------------------------------------------+
| **Type** | The type of organization. The value is           |
|          | **Company**.                                     |
+----------+--------------------------------------------------+

Below the details, the page has three tabs:

-  **API Keys**: The API keys that act on behalf of the organization. See :doc:`API keys </cloud-service/organization/api-keys>`.
-  **Members**: The people who belong to the organization and their roles. See :doc:`Members and invitations </cloud-service/organization/members>`.
-  **Pending Invitations**: The invitations that are not accepted yet. See :doc:`Members and invitations </cloud-service/organization/members>`.

Renaming your organization
--------------------------

You need the Editor role to rename the organization.

#. In the sidebar, select **Organization**.
#. Click **Edit Organization**.
#. Change the **Name**.
#. Click **Save Organization**.

Wazuh Console shows **Organization updated successfully** and displays the updated name in the header.

Switching organizations
-----------------------

If you belong to more than one organization, the organization selector in the header shows the name of the organization you are working in. Every page of Wazuh Console shows the data of that organization only.

#. In the header, click the name of the current organization.
#. In the **Organizations** dialog, find the organization. You can type part of its name in **Search organization** to filter the list.
#. Click the organization name.

Wazuh Console reloads the current page with the data of the selected organization. Your role can differ from one organization to another.

.. toctree::
   :maxdepth: 1

   members
   api-keys
