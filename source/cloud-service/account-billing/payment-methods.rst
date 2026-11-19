.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Add cards to your Wazuh Console organization, choose the default card for charges, and delete cards.

.. _cloud_billing_payment_methods:

Payment methods
===============

Your organization pays for Wazuh Cloud environments and Wazuh CTI feed subscriptions with a credit or debit card. This page describes how to add cards, choose the default card, and delete cards.

All prices are in US dollars (USD). Payments are processed securely by Stripe, and your card details are stored by Stripe, not by Wazuh. Charges appear on your statement as "Wazuh Inc."

You need the Editor role to manage payment methods.

Viewing your payment methods
----------------------------

#. In the sidebar, under **Billing**, select **Subscriptions**.
#. Select the **Payment Methods** tab.

The tab lists the cards of your organization. Each card shows its brand, its last four digits, and its expiration date. A card can also show the following badges:

.. TODO: Confirm with engineering whether renewals of existing subscriptions charge the organization default card or the card used for the original purchase.

-  **Default**: The card that Wazuh charges for renewals and other payments of the organization.
-  **Expired**: The card has passed its expiration date and can't be charged. Add a valid card and set it as the default.

If you never choose a default card, the most recently added card is used.

Adding a payment method
-----------------------

#. In the sidebar, under **Billing**, select **Subscriptions**.
#. Select the **Payment Methods** tab.
#. Click **New Payment Method**.
#. Fill in the billing details:

   +-----------------------------+------------------------------------------------------------+
   | Field                       | Description                                                |
   +=============================+============================================================+
   | **First name**              | The first name of the cardholder.                          |
   +-----------------------------+------------------------------------------------------------+
   | **Last name**               | The last name of the cardholder.                           |
   +-----------------------------+------------------------------------------------------------+
   | **Email**                   | The billing email address.                                 |
   +-----------------------------+------------------------------------------------------------+
   | **Address**                 | The billing address.                                       |
   +-----------------------------+------------------------------------------------------------+
   | **Zip or postal code**      | The postal code of the billing address.                    |
   +-----------------------------+------------------------------------------------------------+
   | **City**                    | The city of the billing address.                           |
   +-----------------------------+------------------------------------------------------------+
   | **Country**                 | The two-letter country code of the billing address, for    |
   |                             | example, ``US`` or ``ES``.                                 |
   +-----------------------------+------------------------------------------------------------+
   | **State**                   | Optional. The state of the billing address.                |
   +-----------------------------+------------------------------------------------------------+

#. Enter the card number, expiration date, and security code in the card field.
#. Click **Save**.

If your bank requires extra verification, follow its instructions to complete it. The card appears in the **Payment Methods** tab.

You can also add a card while you buy something in Wazuh Console, for example, when you create an environment, buy a trial, buy a feed subscription, or pay a pending amount.

Setting the default payment method
----------------------------------

#. In the sidebar, under **Billing**, select **Subscriptions**.
#. Select the **Payment Methods** tab.
#. Open the options menu of the card and select **Set as default**.

The card shows the **Default** badge.

Deleting a payment method
-------------------------

Deleting a card removes it from Stripe, so Wazuh can't charge it. This action can't be undone.

#. In the sidebar, under **Billing**, select **Subscriptions**.
#. Select the **Payment Methods** tab.
#. Open the options menu of the card and select **Delete**.
#. In the **Delete payment method?** dialog, click **Delete card**.

If you delete the default card, the most recently added card that remains becomes the default.

.. warning::

   Keep at least one valid card while your organization has active paid subscriptions. If a renewal payment fails, the subscription becomes past due. See :doc:`Subscriptions </cloud-service/account-billing/subscriptions>`.
