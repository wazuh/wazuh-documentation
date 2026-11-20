.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Review the self-hosted Wazuh deployments registered to your Wazuh Console organization, rename or delete them, and assign feed subscriptions.

.. _cloud_cti_deployments:

Managing deployments
====================

The **Deployments** page lists the self-hosted Wazuh deployments registered to your organization and the subscription each one has. This page describes how to read the list, assign subscriptions, rename deployments, and delete them.

All members can view the list. You need the Editor role to register, rename, or delete deployments, and to assign subscriptions.

Viewing your deployments
------------------------

#. In the sidebar, under **CTI**, select **Deployments**.

The page shows your deployments as cards. Click the **Table view** icon to show them as a table, and the **Card view** icon to show them as cards again.

Each deployment shows the following information:

+---------------------------+---------------------------------------------------------------------------+
| Field                     | Description                                                               |
+===========================+===========================================================================+
| **Name**                  | The name of the deployment.                                               |
+---------------------------+---------------------------------------------------------------------------+
| **ID**                    | The unique identifier of the deployment. Click the clipboard icon         |
|                           | (**Copy deployment ID**) to copy it.                                      |
+---------------------------+---------------------------------------------------------------------------+
| **Last seen at**          | The last time the deployment reported to Wazuh Console. **Not seen**      |
|                           | means that it hasn't reported since it was registered.                    |
+---------------------------+---------------------------------------------------------------------------+
| **Registered**            | The date the deployment was registered.                                   |
+---------------------------+---------------------------------------------------------------------------+
| **Subscription**          | The plan of the deployment. For a paid subscription, the card also shows  |
|                           | its **Status**, the date it was **Acquired**, and when it renews,         |
|                           | cancels, suspends, or ended. In the table view, this information is in    |
|                           | the **Subscription coverage** column.                                     |
+---------------------------+---------------------------------------------------------------------------+

The subscription status uses the same states as the **Subscriptions** page. See :doc:`Subscriptions </cloud-service/account-billing/subscriptions>`.

Unassigned subscriptions
^^^^^^^^^^^^^^^^^^^^^^^^

When your organization has paid feed subscriptions that aren't assigned to any deployment, the page shows a **You have <N> paid subscriptions unassigned** badge next to **Register Deployment**. Deployments without a paid subscription are highlighted and show the **Subscription waiting** badge with an **Assign subscription** button.

Assigning a subscription
------------------------

A paid subscription covers one deployment and has no effect until you assign it. The deployment receives the Professional Feed after you assign it a paid subscription.

#. In the sidebar, under **CTI**, select **Deployments**.
#. Find the deployment and click **Assign subscription**. If the deployment already has a paid subscription, click **Change subscription**. In the table view, open the options menu of the deployment and select **Change subscription**.
#. In the dialog, select the subscription to use. Each option shows its **Plan** and, for paid subscriptions, its **Acquisition Date** and **Renovation Date**. Select **Free** to move the deployment back to the Open Feed.
#. Click **Confirm**.

Wazuh Console shows **Subscription updated**.

If you have no paid subscriptions to assign, the dialog shows **There are no subscriptions available to be assigned.** Click **Buy Subscription** to buy one. See :doc:`Feeds </cloud-service/cti/feeds>`.

If the subscription already covers as many deployments as it allows, Wazuh Console shows **This subscription has reached its environment limit**.

Renaming a deployment
---------------------

#. In the sidebar, under **CTI**, select **Deployments**.
#. Find the deployment and click **Edit**. In the table view, open the options menu of the deployment and select **Edit**.
#. In the **Edit Environment** dialog, change the **Name**.
#. Click **Save name**.

Wazuh Console shows **Environment updated successfully**.

Deleting a deployment
---------------------

Deleting a deployment removes it from your organization.

#. In the sidebar, under **CTI**, select **Deployments**.
#. Find the deployment and click **Delete**. In the table view, open the options menu of the deployment and select **Delete**.
#. Confirm the deletion.

To connect the deployment again, register it again. See :doc:`Registering a deployment </cloud-service/cti/register-deployment>`.
