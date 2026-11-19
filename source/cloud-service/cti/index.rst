.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Connect your self-hosted Wazuh deployments to Wazuh Console to receive Wazuh CTI feeds, and manage your deployments and feed subscriptions.

.. _cloud_cti:

Wazuh CTI
=========

.. TODO: Confirm with engineering that the CTI section of the sidebar (Deployments and Feeds) is visible in the production Wazuh Console at release time.

Wazuh Console lets you connect the Wazuh deployments that you run on your own infrastructure to Wazuh Cyber Threat Intelligence (CTI), and manage the feeds they receive. This section describes how to register a deployment, manage your deployments, and buy feed subscriptions.

Wazuh CTI provides detection content, indicators of compromise (IoCs), and vulnerability intelligence to Wazuh. To learn how Wazuh uses this content, see :doc:`Wazuh CTI </wazuh-cti/index>`.

Key concepts
------------

-  **Deployment**: A Wazuh installation that runs on your own infrastructure and is registered to your organization in Wazuh Console.
-  **Feed**: A stream of threat intelligence that your deployments pull from Wazuh CTI. Every registered deployment receives the **Open Feed** at no cost. A paid subscription upgrades a deployment to the **Professional Feed**.
-  **Seat**: A Professional Feed subscription covers one deployment. You buy as many seats as deployments you want to upgrade, and assign each seat to a deployment.

Each Wazuh Cloud environment includes a Professional Feed seat for that environment, so you don't need to buy a seat for your Wazuh Cloud environments.

In the sidebar, the **CTI** group has the following pages:

-  **Deployments**: Register deployments, rename or delete them, and assign subscriptions to them.
-  **Feeds**: Compare the feeds, see how many of your deployments are on each feed, and buy feed subscriptions.

Feed subscriptions also appear in the **Deployment Subscriptions** tab of **Billing** > **Subscriptions**. See :doc:`Subscriptions </cloud-service/account-billing/subscriptions>`.

.. toctree::
   :maxdepth: 1

   register-deployment
   deployments
   feeds
