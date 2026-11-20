.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Start a free 14-day Wazuh Cloud trial from Wazuh Console, edit its settings, buy it before it ends, and learn what happens when it expires.

.. _cloud_getting_started_start_trial:

Starting a trial
================

A trial gives your organization a Wazuh Cloud environment for 14 days at no cost. This page explains how to start a trial, change its settings, buy it, and what happens when it ends. You need the **Editor** role to start, edit, buy, or cancel a trial.

Trial conditions
----------------

-  The trial lasts 14 days. We don't charge you during the trial.
-  A payment method is not required to start a trial.
-  Your organization can't have two active trials at the same time.
-  Your organization can start another trial 90 days after the previous one started. Until then, **Create Trial** is disabled and shows the date when you can start another one.
-  An agent must connect to the environment within 4 days of the start of the trial. Otherwise, the trial is cancelled and the environment is terminated.
-  AI reports are not available during the trial.

If all trial slots are in use, Wazuh Console shows **All trial slots are in use right now. Please try again later.**

Creating a trial
----------------

#. In the sidebar, under **Wazuh Cloud**, select **Environments**.
#. Select **Create Trial**. If your organization has no environments yet, select **Start free 14-day trial**. You can also start a trial from the **Overview** page.
#. Under **Settings**, fill in the following fields:

   -  **Name your new environment**.
   -  **Region**: Where your environment and its data are hosted. You can't change it later. If you are not sure, select the region closest to your endpoints.
   -  **Active Agents**, **EPS**, **Indexed Data Retention**, **Indexed Data Capacity**, **Archive Data Retention**, and **Support Plan**. Wazuh Console applies the recommended **EPS** and **Indexed Data Capacity** values for the number of agents and the retention you choose. See :doc:`Settings </cloud-service/your-environment/settings>`.

#. Optionally, under **Apply discount code**, enter your **Discount code** and select **Validate**.
#. Under **Select your pricing**, select **Monthly** or **Yearly**. This is the price you pay after the trial ends if you add a payment method.
#. Select **Proceed to Confirmation**.
#. In the **Confirm Trial** window, under **Payment Information (optional)**, you can select a card from **Existing Payment Method** or add one in **New Payment Method**. You can also leave it empty and add a payment method later.
#. Review the **Selected Settings** and the **Price**.
#. Select the checkbox to accept the terms and conditions of the Wazuh Cloud services.
#. Select **Create Trial**.

Wazuh Console shows **Trial ready** while it creates your environment. Select **Go to environment** to follow its status. The environment appears in the **Environments** list with the **Trial** label. You receive an email when your trial is ready.

Available regions:

.. include:: /_templates/cloud-service-regions.rst

When the environment is active, :doc:`access the Wazuh dashboard </cloud-service/getting-started/access-wazuh-wui>` and :doc:`enroll your agents </cloud-service/getting-started/enroll-agents>`.

Editing a trial
---------------

You can change the settings of a trial environment while it is active. The name, region, and billing period can't be changed.

#. In the sidebar, under **Wazuh Cloud**, select **Environments**.
#. Open the options menu of the trial environment and select **Edit trial**. On the environment details page, you can also select **Manage** > **Edit trial**, or **Edit settings** in the **Settings** card.
#. Change the settings. The **Current Price** and the updated price are shown on the right.
#. Select **Proceed to Confirmation**.
#. Optionally, select or add a payment method under **Payment Information (optional)**.
#. Select the checkbox to accept the terms and conditions, and select **Save Changes**.

After the trial ends, your invoices include charges according to the updated pricing. To switch between monthly and yearly billing, contact support.

.. _cloud_getting_started_start_trial_buy:

Buying a trial
--------------

You can turn a trial into a paid environment before the trial ends. The environment keeps its name, region, and data.

#. In the sidebar, under **Wazuh Cloud**, select **Environments**.
#. Select **Buy** on the trial environment. On the environment details page, **Buy** is in the **Settings** card.
#. In the **Buy Trial** window, review the settings. The name and region can't be changed. You can change the other settings, the billing period, and the discount code.
#. Select the checkbox to accept the terms and conditions, and select **Continue to payment**.
#. In the **Confirm Cloud Environment** window, under **Payment Information**, select a card from **Existing Payment Method** or add one in **New Payment Method**.
#. Select **Confirm purchase**.

When the payment is confirmed, Wazuh Console shows **Subscription active** and the environment becomes a paid environment. Payments are processed securely by Stripe.

**Buy** is available while the trial environment is **Active**.

When the trial ends
-------------------

We send you reminder emails 7 days and 2 days before the trial ends. What happens at the end depends on whether the trial has a payment method:

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Situation
     - Result
   * - With a payment method
     - The trial becomes a paid environment with the settings, billing period, and discount code you chose. We charge the payment method. If the payment fails, complete it from :doc:`Subscriptions </cloud-service/account-billing/subscriptions>`. If it remains unpaid, the environment is terminated.
   * - Without a payment method
     - The trial ends and the environment and its data are deleted.
   * - No agent connected within 4 days
     - The trial is cancelled and the environment is terminated, even before the 14 days end.

To keep your environment, :ref:`buy it <cloud_getting_started_start_trial_buy>` or add a payment method with **Edit trial** before the trial ends.

To end a trial now, open the environment details page and select **Manage** > **Cancel Trial**. The environment is deleted right away. See :doc:`Cancel an environment </cloud-service/your-environment/cancel-environment>`.

Requesting assistance
---------------------

During a trial, or after it ends, you can ask the Wazuh team for help with your trial environment.

#. In the sidebar, under **Help**, select **Support** and select **Contact us**. While the trial is active, you can also open the environment details page and select **Manage** > **Request assistance**.
#. Select the **Cloud environment**.
#. Write your question in **Message**.
#. Select **Send request**.

Our team contacts you by email. To talk to sales, see :doc:`Support </cloud-service/support>`.
