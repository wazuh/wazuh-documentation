.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to create a paid Wazuh Cloud environment in Wazuh Console and how to find your environments on the Environments page.

.. _cloud_your_environment_create_environment:

Create an environment
=====================

This page explains how to create a paid Wazuh Cloud environment in Wazuh Console and how to find your environments on the **Environments** page. To try Wazuh Cloud at no cost first, see :doc:`Start a trial </cloud-service/getting-started/start-trial>`.

You need the Editor role to create an environment.

Creating a paid environment
---------------------------

#. In the sidebar, under **Wazuh Cloud**, select **Create Environment**. You can also select **Environments** and then **Create Environment**.

   The **Create Cloud Environment** dialog opens.

#. Under **Settings**, enter a name in **Name your new environment** and select a **Region**. The region can't be changed after the environment is created.

#. Select the capacity of the environment:

   -  **Active Agents**
   -  **EPS**
   -  **Indexed Data Retention**
   -  **Indexed Data Capacity**
   -  **Archive Data Retention**
   -  **Support Plan**: **Standard Support** or **Premium Support**.

   For **EPS**, **Indexed Data Capacity**, and **Archive Data Retention**, the dialog shows a **Recommended value** based on your other choices and applies it while **Apply recommended** is on. Selecting a different value turns **Apply recommended** off. **EPS** and **Indexed Data Capacity** must be at least half of the recommended value. See :doc:`Settings </cloud-service/your-environment/settings>` for what each setting means and the values you can choose.

#. Optionally, under **Apply discount code**, enter your code in **Discount code** and click **Validate**. When the code is valid, the dialog shows it as applied, its name, and how long the discount lasts. Click **Remove** to take it off.

#. Under **Select your pricing**, select **Monthly** or **Yearly**. Each option shows the price per month and the total per year. The price updates as you change the settings.

#. Select the checkbox to accept the `terms and conditions <https://wazuh.com/legal-resources/>`__ of the Wazuh Cloud services.

#. Click **Continue to payment**. The **Confirm Cloud Environment** step opens with your **Selected Settings** and the **Price**.

#. Under **Payment Information**, choose how to pay:

   -  **Existing Payment Method**: select one of your organization's saved cards.
   -  **New Payment Method**: enter the details of a card. The card is saved to your organization and selected for this purchase.

   To change the settings, click **Back**.

#. Click **Confirm purchase**. The dialog shows **Processing your purchase…** and then **Confirming your payment…** while the payment is processed.

#. After the payment is confirmed, the dialog shows **Provisioning your environment…**. Provisioning continues if you close the dialog, and the environment appears on the **Environments** page.

#. When the environment is ready, the dialog shows **Environment ready**. Click **Go to environment** to open its :doc:`details page </cloud-service/your-environment/environment-details>`.

Payments are processed securely by Stripe. To manage your saved cards, see :doc:`Payment methods </cloud-service/account-billing/payment-methods>`.

.. note::

   If the payment goes through but the environment can't be created, the **Environments** page shows a message. Your subscription stays active, so you don't need to pay again. Wazuh keeps retrying and the Wazuh team is notified. If you prefer not to wait, or if the message says retries have stopped, write to `cs@wazuh.com <mailto:cs@wazuh.com>`__.

Prefilled links from Wazuh sales
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh sales team can share a link that opens the **Create Cloud Environment** dialog with the settings already filled in. You can review and change them before you continue. If a value in the link isn't valid, the dialog resets that setting to its default and shows a warning that lists the settings it reset.

The Environments page
---------------------

To see your organization's environments, in the sidebar, under **Wazuh Cloud**, select **Environments**. The **Cloud Environments** page lists every environment of your organization.

-  Use the **Card view** and **Table view** icons to switch between cards and a table.
-  Select **Hide terminated and cancelled environments** to show only the environments that are still in use.

Each card shows:

-  The environment name, and a **Cancels** pill with the date when a cancelled environment stops.
-  **Status**. A **Trial** pill marks trial environments. See :ref:`Environment statuses <cloud_environment_details_statuses>`.
-  **Version**: the Wazuh version of the environment.
-  **Region**.
-  **Open XDR**: opens the Wazuh dashboard of the environment in a new tab.
-  **Active Agents**, **EPS**, **Support Plan**, **Billing**, **Indexed Data Capacity**, **Archive Data Retention**, and **Indexed Data Retention**.
-  **See detail**: opens the :doc:`details page </cloud-service/your-environment/environment-details>`.
-  **Buy**: for trial environments, opens the purchase of the trial.

The table shows the **Name**, **Status**, **Version**, **Region**, **Agents**, **EPS**, and **Billing** columns. Click a row to open the details page.

Options menu
^^^^^^^^^^^^

While an environment is active, its options menu shows the actions available for it. Actions that change the environment are visible only to members with the Editor role.

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Option
     - Action
   * - **See credentials**
     - Shows the default credentials of the Wazuh dashboard. See :doc:`Access the Wazuh dashboard </cloud-service/getting-started/access-wazuh-wui>`.
   * - **Open XDR**
     - Opens the Wazuh dashboard. In the card view, use the **Open XDR** button on the card.
   * - **Edit trial**
     - Changes the settings of a trial. See :doc:`Settings </cloud-service/your-environment/settings>`.
   * - **Edit**
     - Opens the upgrade of a paid environment. See :doc:`Settings </cloud-service/your-environment/settings>`.
   * - **Buy**
     - Buys a trial environment so it continues as a paid environment.
   * - **Cancel**
     - Cancels the trial or the paid environment. See :doc:`Cancel an environment </cloud-service/your-environment/cancel-environment>`.
   * - **Resume subscription**
     - Undoes the cancellation of a paid environment before the end of the billing period.
   * - **Delete**
     - Deletes a cancelled environment before the end of the billing period.
