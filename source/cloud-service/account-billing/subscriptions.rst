.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Review your Wazuh Cloud and Wazuh CTI feed subscriptions in Wazuh Console, pay pending amounts, and cancel or resume subscriptions.

.. _cloud_billing_subscriptions:

Subscriptions
=============

The **Subscriptions and Payments** page shows what your organization is subscribed to and the cards it pays with. This page describes how to read your subscriptions, pay a pending amount, and cancel or resume a subscription.

You need the Editor role to open this page.

#. In the sidebar, under **Billing**, select **Subscriptions**.

The page has the following tabs:

-  **Deployment Subscriptions**: The Wazuh CTI feed subscriptions of your organization, which you assign to your self-hosted Wazuh deployments. Click **Buy Feed Subscription** to buy more. See :doc:`Feeds </cloud-service/cti/feeds>`.
-  **Cloud Subscriptions**: The subscriptions of your Wazuh Cloud environments. Click **Create Environment** to create one. See :doc:`Create an environment </cloud-service/your-environment/create-environment>`.
-  **Payment Methods**: The cards of your organization. See :doc:`Payment methods </cloud-service/account-billing/payment-methods>`.

Reading a subscription
----------------------

The **Deployment Subscriptions** and **Cloud Subscriptions** tabs show the following columns:

+--------------------+---------------------------------------------------------------------------+
| Column             | Description                                                               |
+====================+===========================================================================+
| **Environment**    | Only in **Cloud Subscriptions**. The name of the Wazuh Cloud environment. |
+--------------------+---------------------------------------------------------------------------+
| **Plan**           | The plan of the subscription. In **Cloud Subscriptions**, it also shows   |
|                    | the region, the billing period, the support plan, the number of active    |
|                    | agents, and the events per second (EPS) of the environment.               |
+--------------------+---------------------------------------------------------------------------+
| **Amount**         | The price per billing period, for example, ``/ month`` or ``/ year``.     |
|                    | When a discount applies, the amount shows how much it takes off. **Free** |
|                    | means the subscription has no cost, and **-** means it has no price of    |
|                    | its own.                                                                  |
+--------------------+---------------------------------------------------------------------------+
| **State**          | The state of the subscription. See `Subscription states`_. A              |
|                    | **<AMOUNT> due** badge means that a payment is pending.                   |
+--------------------+---------------------------------------------------------------------------+
| **Started at**     | The date the subscription started.                                        |
+--------------------+---------------------------------------------------------------------------+
| **Renews or ends** | The next change of the subscription and its date: **renews**, **ends**,   |
|                    | **cancels**, **trial ends**, **suspends**, **suspended**, **terminates**, |
|                    | or **ended**.                                                             |
+--------------------+---------------------------------------------------------------------------+

Subscription states
^^^^^^^^^^^^^^^^^^^

+-------------------------+---------------------------------------------------------------------------+
| State                   | Description                                                               |
+=========================+===========================================================================+
| **Pending**             | The subscription is waiting for its first payment to be confirmed.        |
+-------------------------+---------------------------------------------------------------------------+
| **Trialing**            | The Wazuh Cloud environment is in its free trial.                         |
+-------------------------+---------------------------------------------------------------------------+
| **Active**              | The subscription is paid and renews automatically at the end of each      |
|                         | billing period.                                                           |
+-------------------------+---------------------------------------------------------------------------+
| **Canceling**           | The subscription is canceled. It stays active until the end of the        |
|                         | current billing period and doesn't renew.                                 |
+-------------------------+---------------------------------------------------------------------------+
| **Past due**            | A payment failed. The Wazuh Cloud environment is suspended until you pay  |
|                         | the pending amount.                                                       |
+-------------------------+---------------------------------------------------------------------------+
| **Suspended**           | The subscription is suspended.                                            |
+-------------------------+---------------------------------------------------------------------------+
| **Canceled**            | The subscription ended.                                                   |
+-------------------------+---------------------------------------------------------------------------+
| **Expired**             | The subscription reached its end date.                                    |
+-------------------------+---------------------------------------------------------------------------+

Paying a pending amount
-----------------------

When a payment fails, the subscription shows a **<AMOUNT> due** badge, its state changes to **Past due**, and the Wazuh Cloud environment is suspended. The environment stays suspended for 7 days if it's billed monthly, or 14 days if it's billed yearly. If the pending amount is still unpaid at the end of the suspension, the environment is terminated, all its data is permanently deleted, and the subscription is canceled.

The **Renews or ends** column shows the date of the next step. While a payment is pending, you can't cancel the subscription. To pay the pending amount:

#. In the sidebar, under **Billing**, select **Subscriptions**.
#. Select the **Deployment Subscriptions** or **Cloud Subscriptions** tab.
#. Click the **<AMOUNT> due** badge of the subscription, or open its options menu and select **Pay**.
#. In the **Payment required** dialog, select the card to charge:

   -  **Existing Payment Method**: Select one of your saved cards.
   -  **New Payment Method**: Add a card. See :doc:`Payment methods </cloud-service/account-billing/payment-methods>`.

#. Click **Pay <AMOUNT>**.

After the payment is confirmed, the subscription is active again. If you need more time to pay, contact Wazuh. See :doc:`Support </cloud-service/support>`.

Canceling a subscription
------------------------

When you cancel a subscription, it stays active until the end of the current billing period and doesn't renew.

#. In the sidebar, under **Billing**, select **Subscriptions**.
#. Select the **Deployment Subscriptions** or **Cloud Subscriptions** tab.
#. Open the options menu of the subscription and select **Unsubscribe**.
#. In the **Cancel subscription** dialog, click **Unsubscribe**. To keep the subscription, click **Keep subscription**.

Wazuh Console shows **Your subscription will not renew and will remain active until the end of the current billing period.** The state of the subscription changes to **Canceling**.

To cancel a Wazuh Cloud environment from its own page, see :doc:`Cancel an environment </cloud-service/your-environment/cancel-environment>`.

Resuming a subscription
-----------------------

While a subscription is **Canceling**, you can call off the cancellation.

#. In the sidebar, under **Billing**, select **Subscriptions**.
#. Select the **Deployment Subscriptions** or **Cloud Subscriptions** tab.
#. Open the options menu of the subscription and select **Resume subscription**.
#. In the **Resume subscription** dialog, click **Resume subscription**. To keep the cancellation, click **Keep cancellation**.

Wazuh Console shows **Your subscription will renew as usual.** The subscription renews at the end of the current billing period.

When no action is available
---------------------------

If a subscription has no available actions, its options menu shows the reason:

+-------------------------------------------------------------------------+-----------------------------------------------------------+
| Message                                                                 | Meaning                                                   |
+=========================================================================+===========================================================+
| **Waiting for the first payment to be confirmed.**                      | The first payment is being processed.                     |
+-------------------------------------------------------------------------+-----------------------------------------------------------+
| **Nothing to do until the trial ends.**                                 | The environment is in its free trial. To cancel the trial |
|                                                                         | or buy the environment, use its environment page.         |
+-------------------------------------------------------------------------+-----------------------------------------------------------+
| **This subscription has ended.**                                        | The subscription is canceled.                             |
+-------------------------------------------------------------------------+-----------------------------------------------------------+
| **This subscription has expired.**                                      | The subscription reached its end date.                    |
+-------------------------------------------------------------------------+-----------------------------------------------------------+
| **This subscription is not billed, so there is nothing to cancel.**     | The subscription has no charges, for example, the         |
|                                                                         | Professional Feed seat included with a Wazuh Cloud        |
|                                                                         | environment.                                              |
+-------------------------------------------------------------------------+-----------------------------------------------------------+
| **Nothing to do on this subscription.**                                 | No action applies to the subscription in its current      |
|                                                                         | state.                                                    |
+-------------------------------------------------------------------------+-----------------------------------------------------------+
