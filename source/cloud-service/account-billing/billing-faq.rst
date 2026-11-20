.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find answers to frequently asked questions about billing for Wazuh Cloud environments and Wazuh CTI feed subscriptions in Wazuh Console.

.. _cloud_billing_faq:

Billing FAQ
===========

This page answers common questions about how Wazuh charges for Wazuh Cloud environments and Wazuh CTI feed subscriptions.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

How am I billed?
----------------

Each Wazuh Cloud environment and each feed subscription is billed separately, either monthly or yearly. You choose the billing period when you create the environment or buy the subscription. Subscriptions renew automatically at the end of each billing period until you cancel them.

To see when each subscription renews, see :doc:`Subscriptions </cloud-service/account-billing/subscriptions>`.

Which payment methods and currencies are accepted?
--------------------------------------------------

You pay with a credit or debit card. All prices are in US dollars (USD). See :doc:`Payment methods </cloud-service/account-billing/payment-methods>`.

Is my card information safe?
----------------------------

Yes. Payments are processed securely by Stripe, and your card details are stored by Stripe, not by Wazuh.

Am I charged during the free trial?
-----------------------------------

No. A trial is free for 14 days, and adding a card is optional. If you add a card before the trial ends, the environment becomes a paid subscription when the trial ends and the card is charged. If you don't add a card, the environment is deleted when the trial ends. See :doc:`Start a trial </cloud-service/getting-started/start-trial>`.

What happens to my bill when I increase a setting of my environment?
--------------------------------------------------------------------

When you increase a setting with **Edit settings**, you pay a prorated amount for the rest of the current billing period. Wazuh charges this amount to your card right away, and the change applies a few minutes after the payment. From the next billing period, you pay the full price of the updated settings. See :doc:`Settings </cloud-service/your-environment/settings>`.

Can I lower a setting or change the billing period?
---------------------------------------------------

You can't lower a setting or change the billing period of an environment in Wazuh Console. To request either change, contact Wazuh. See :doc:`Support </cloud-service/support>`.

Can I use a discount code?
--------------------------

Yes. When you create an environment, buy a trial, or buy a feed subscription, enter the code under **Apply discount code** and click **Validate**. The order summary shows how much the discount takes off.

What happens if a payment fails?
--------------------------------

The subscription becomes **Past due**, Wazuh Console shows the amount due, and the Wazuh Cloud environment is suspended. The environment stays suspended for 7 days if it's billed monthly, or 14 days if it's billed yearly. If the payment is still missing at the end of the suspension, the environment is terminated and all its data is permanently deleted.

Pay the pending amount at any point to keep or reactivate the environment. See :doc:`Subscriptions </cloud-service/account-billing/subscriptions>`. If you need more time to pay, contact Wazuh.

How do I stop being charged?
----------------------------

Cancel the subscription at any time. A paid environment or feed subscription stays available until the end of the current billing period and isn't charged again. See :doc:`Cancel an environment </cloud-service/your-environment/cancel-environment>` and :doc:`Subscriptions </cloud-service/account-billing/subscriptions>`.

Can I get a refund?
-------------------

Charges are nonrefundable. If you want to stop using an environment or a feed subscription, you can cancel it at any time, and no further charges are incurred after the current billing period.

Where can I find my invoices?
-----------------------------

In the sidebar, under **Billing**, select **Invoices**. See :doc:`Invoices </cloud-service/account-billing/invoices>`.

Who can manage billing?
-----------------------

Only members with the Editor role can open the **Billing** pages, add cards, buy, pay, and cancel subscriptions. See :doc:`Members and invitations </cloud-service/organization/members>`.
