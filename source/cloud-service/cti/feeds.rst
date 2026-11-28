.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Compare the Wazuh CTI Open Feed and Professional Feed in Wazuh Console, buy Professional Feed seats, and assign them to your deployments.

.. _cloud_cti_feeds:

Feeds
=====

A feed is a stream of threat intelligence that your Wazuh deployments pull from Wazuh CTI. This page describes the available feeds and how to buy Professional Feed subscriptions for your self-hosted deployments.

To open the **Feeds** page:

#. In the sidebar, under **CTI**, select **Feeds**.

The page shows the following cards:

-  **Getting started**: The steps left to start using feeds, such as registering a deployment or buying a seat. The card disappears when you complete them.
-  **Your deployments**: The number of **Registered deployments**, and how many are **On the Open Feed**, **On the Professional Feed**, and **Without a feed**. Click **Manage deployments** to open the **Deployments** page. If you have no deployments, the **Start using Wazuh** card appears instead, with the **Register Deployment** and **Buy subscription** buttons.
-  **Open Feed** and **Professional Feed**: The features of each feed and the price of the Professional Feed.

If your organization has paid subscriptions that aren't assigned to any deployment, the page shows a warning with a link to **Deployments**. See :doc:`Managing deployments </cloud-service/cti/deployments>`.

Open Feed and Professional Feed
-------------------------------

Every registered deployment receives the **Open Feed** at no cost. A **Professional Feed** subscription gives a deployment instant access to all content.

+------------------------------+------------------+-----------------------+
| Feature                      | Open Feed        | Professional Feed     |
+==============================+==================+=======================+
| **Vulnerability CVE Stream** | 7 days delay     | Instant access        |
+------------------------------+------------------+-----------------------+
| **IOC Intelligence Stream**  | 14 days delay    | Instant access        |
+------------------------------+------------------+-----------------------+
| **Ruleset Service**          | 30 days delay    | Instant access        |
+------------------------------+------------------+-----------------------+
| **Critical CVEs**            | Instant access   | Instant access        |
+------------------------------+------------------+-----------------------+
| **Released content updates** | Instant access   | Instant access        |
+------------------------------+------------------+-----------------------+

Each Wazuh Cloud environment includes a Professional Feed seat for that environment. You don't need to buy a seat for your Wazuh Cloud environments.

Buying a Professional Feed subscription
---------------------------------------

Each Professional Feed subscription seat covers one deployment. You can buy several seats at once, and you can buy them before you register any deployment. Seats wait until you assign them.

You need the Editor role to buy subscriptions.

#. In the sidebar, under **CTI**, select **Feeds**.
#. In the **Professional Feed** card, click **Buy Subscription**. You can also click **Buy Subscription** in the **Deployments** page, or **Buy Feed Subscription** in **Billing** > **Subscriptions**.
#. In the **Buy a feed subscription** dialog, configure your order:

   #. Under **Feed**, select the feed.
   #. In **Deployments covered**, enter the number of deployments to upgrade. The hint below the field shows how many deployments you have registered and how many are already covered.
   #. Optional: If you have a discount code, enter it under **Apply discount code** and click **Validate**.
   #. Under **Billing period**, select **Monthly** or **Yearly**, if the feed offers both.
   #. Review the **Order summary** and **Total today**.
   #. Select the checkbox to accept the terms and conditions of the Wazuh Cloud services.

#. Click **Continue to payment**.
#. In the **Confirm your subscription** dialog, choose the card to charge:

   -  **Saved methods**: Select one of your saved cards.
   -  **New card**: Add a card. See :doc:`Payment methods </cloud-service/account-billing/payment-methods>`.

#. Review **You are buying** and click **Confirm purchase**. Wazuh Console shows **Processing your purchase…** and then **Confirming your payment…** while it completes the payment.

After the payment is confirmed, the dialog shows that your subscriptions are ready.

Payments are processed securely by Stripe and appear on your statement as "Wazuh Inc." The subscription renews automatically until you cancel it. See :doc:`Subscriptions </cloud-service/account-billing/subscriptions>`.

If the payment fails, the dialog shows the reason. Try again or use a different card.

Assigning the seats after buying
--------------------------------

If you have deployments without a Professional Feed seat, the dialog lists them after the purchase:

#. Select the deployments to upgrade. You can select as many deployments as seats you bought. The dialog shows how many deployments are left to pick.
#. Click **Assign <N> deployments**. To assign the seats later, click **Do this later**.

Wazuh Console shows, for example, **Purchase complete. 2 deployments upgraded.**

If you have no deployments to upgrade, the dialog shows that the seats are waiting in **Deployments**. Click **Go to deployments** to open the page. You can assign or change the seats at any time. See :doc:`Managing deployments </cloud-service/cti/deployments>`.
