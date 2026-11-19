.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to cancel a Wazuh Cloud trial or paid environment, resume a cancelled subscription, and delete an environment in Wazuh Console.

Cancel an environment
=====================

This page explains how to cancel a trial or a paid environment in Wazuh Console, how to undo the cancellation of a paid environment, and how to delete a cancelled environment before the end of its billing period.

You need the Editor role to cancel, resume, or delete an environment. You can cancel an environment while it is **Active**.

.. warning::

   When an environment is deleted, all its data is permanently deleted and can't be recovered. Download any archive data you want to keep before the environment is deleted. See :doc:`Archive data </cloud-service/archive-data/index>`.

Cancelling a trial
------------------

When you cancel a trial, its environment is deleted right away.

#. In the sidebar, under **Wazuh Cloud**, select **Environments**.
#. Open the options menu of the trial environment and select **Cancel**. You can also open the details page of the environment, click **Manage**, and select **Cancel Trial**.
#. Confirm the cancellation.

Cancelling a paid environment
-----------------------------

When you cancel a paid environment, its subscription doesn't renew. The environment stays available until the end of the current billing period and is then deleted.

#. In the sidebar, under **Wazuh Cloud**, select **Environments**.
#. Open the options menu of the environment and select **Cancel**.
#. Confirm the cancellation.

The environment shows a **Cancels** pill with the date when it stops.

You can also cancel the subscription from the billing pages:

#. In the sidebar, under **Billing**, select **Subscriptions**.
#. Select the **Cloud Subscriptions** tab.
#. Open the options menu of the subscription and select **Unsubscribe**.
#. In the **Cancel subscription** dialog, click **Unsubscribe**.

You can't cancel a subscription while it has a payment pending. Pay the amount due first.

Resuming a subscription
-----------------------

Until the end of the billing period, you can undo the cancellation of a paid environment. The subscription then renews as usual.

#. In the sidebar, under **Wazuh Cloud**, select **Environments**.
#. Open the options menu of the environment and select **Resume subscription**.

You can also select **Resume subscription** in the options menu of the subscription under **Billing** > **Subscriptions** > **Cloud Subscriptions**.

While a subscription is scheduled for cancellation, you can't upgrade the environment settings. Resume the subscription first.

Deleting a cancelled environment
--------------------------------

A cancelled paid environment stays available until its **Cancels** date. To delete it before that date:

#. In the sidebar, under **Wazuh Cloud**, select **Environments**.
#. Open the options menu of the environment and select **Delete**.
#. Confirm that you want to delete the environment now, without waiting for the period to end.

You can't delete an environment while its subscription has a payment pending.

.. TODO: Confirm with billing whether deleting a cancelled environment before the end of the period gives any refund for the remaining days.
